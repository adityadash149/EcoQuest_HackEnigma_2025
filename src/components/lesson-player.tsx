
"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Lesson, Scenario } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import Image from 'next/image';
import { CheckCircle, XCircle, Award, Leaf, Wand, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { generateLessonAnimation } from '@/ai/flows/generate-lesson-animation';

interface LessonPlayerProps {
  lesson: Lesson;
}

export function LessonPlayer({ lesson }: LessonPlayerProps) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isLessonComplete, setIsLessonComplete] = useState(false);
  const [scenarioImage, setScenarioImage] = useState(lesson.image);
  const [isGenerating, setIsGenerating] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const { toast } = useToast();
  const [hydrated, setHydrated] = useState(false);

  const currentScenario = lesson.scenarios[currentScenarioIndex];
  const progress = ((currentScenarioIndex + 1) / lesson.scenarios.length) * 100;

  useEffect(() => {
    // This effect ensures shuffling only happens on the client-side
    // to prevent hydration mismatches.
    if (currentScenario) {
      const answers = [...currentScenario.incorrectAnswers, currentScenario.correctAnswer];
      setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
      setHydrated(true);
    }
  }, [currentScenario]);


  const handleAnswer = async (answer: string) => {
    if (showExplanation) return;
    setSelectedAnswer(answer);
    const correct = answer === currentScenario.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      setScore(score + 10);
    } else {
        toast({
            title: "Not quite...",
            description: "That's okay, let's learn why.",
            variant: "destructive",
        })
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    if (currentScenarioIndex < lesson.scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      setIsLessonComplete(true);
    }
  };

  if (!currentScenario || !hydrated) {
    return null; // or a loading skeleton
  }

  return (
    <div>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            Scenario {currentScenarioIndex + 1} of {lesson.scenarios.length}
          </p>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{currentScenario.scenarioTitle}</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                <Image src={scenarioImage} layout="fill" objectFit="cover" alt={currentScenario.scenarioTitle} data-ai-hint={currentScenario.animationUpdate} />
                {isGenerating && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                        <Loader className="animate-spin h-12 w-12 mb-4" />
                        <p>Enhancing scene with AI...</p>
                    </div>
                )}
                {isCorrect !== null && !isGenerating && (
                    <div className={cn("absolute inset-0 flex items-center justify-center transition-opacity", isCorrect ? 'bg-green-500/30' : 'bg-red-500/30')}>
                        {isCorrect ? <CheckCircle className="h-24 w-24 text-white" /> : <XCircle className="h-24 w-24 text-white" />}
                    </div>
                )}
             </div>
            <p className="text-muted-foreground">{currentScenario.scenarioDescription}</p>
          </CardContent>
        </Card>

        <div>
        <Card>
          <CardHeader>
            <CardTitle>Question</CardTitle>
            <CardDescription>{currentScenario.question}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {shuffledAnswers.map((answer, index) => (
              <Button
                key={index}
                variant={selectedAnswer === answer ? (isCorrect ? 'default' : 'destructive') : 'outline'}
                className="w-full justify-start h-auto text-wrap py-3"
                onClick={() => handleAnswer(answer)}
                disabled={showExplanation}
              >
                <span className="text-left">{answer}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
        {showExplanation && (
            <Card className="mt-4 border-accent">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        {isCorrect ? <CheckCircle className="text-green-500 mr-2" /> : <XCircle className="text-red-500 mr-2" />}
                        Explanation
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">{currentScenario.explanation}</p>
                    <Badge variant="outline" className="text-accent-foreground border-accent flex items-center gap-2">
                        <Wand className="h-4 w-4" />
                        <span>{currentScenario.animationUpdate}</span>
                    </Badge>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleNext} className="w-full" disabled={isGenerating}>
                        {isGenerating && <Loader className="animate-spin mr-2"/>}
                        {currentScenarioIndex < lesson.scenarios.length - 1 ? 'Next Scenario' : 'Finish Lesson'}
                    </Button>
                </CardFooter>
            </Card>
        )}
        </div>
      </div>
      <AlertDialog open={isLessonComplete} onOpenChange={setIsLessonComplete}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <div className="flex justify-center">
                <Award className="h-16 w-16 text-yellow-500" />
            </div>
            <AlertDialogTitle className="text-center text-2xl">Lesson Complete!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
                Great job! You've learned about {lesson.title}.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex justify-center items-center gap-4 my-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                    <Leaf className="h-6 w-6"/>
                    <span>+{score} Points</span>
                </div>
                <div className="flex items-center gap-2 text-lg font-semibold text-yellow-500">
                    <Award className="h-6 w-6"/>
                    <span>+1 Badge</span>
                </div>
            </div>
            <AlertDialogFooter>
            <AlertDialogAction onClick={() => window.location.href = '/lessons'} className="w-full">
                Back to Lessons
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
