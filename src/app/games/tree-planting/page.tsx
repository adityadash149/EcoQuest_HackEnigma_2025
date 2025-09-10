
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import {
  ArrowLeft,
  Award,
  Leaf,
  TreePine,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { treePlantingQuestions } from '@/lib/mock-data';
import type { QuizQuestion } from '@/lib/types';

export default function TreePlantingPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const currentQuestion = treePlantingQuestions[currentQuestionIndex];
  const progress = (score / (treePlantingQuestions.length * 10)) * 100;

  useEffect(() => {
    // Prevents hydration error by shuffling on client
    if (currentQuestion) {
      const options = [
        ...currentQuestion.options
      ];
      setShuffledOptions(options.sort(() => Math.random() - 0.5));
    }
  }, [currentQuestion]);


  const handleAnswerSelect = (answer: string) => {
    if (showExplanation) return;

    const correct = answer === currentQuestion.correctAnswer;
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      setScore((prev) => prev + 10);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);

    if (currentQuestionIndex < treePlantingQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setGameComplete(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
    setGameComplete(false);
  };

  if (gameComplete) {
    return (
      <div className="max-w-md mx-auto text-center">
         <div className="mb-4">
          <Button asChild variant="ghost">
            <Link href="/games">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Games
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <div className="flex justify-center">
              <Award className="h-16 w-16 text-yellow-500" />
            </div>
            <CardTitle className="text-2xl">Tree Planted!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You've successfully planted a tree. You're a true Eco-Hero!
            </p>
            <div className="flex justify-center items-center gap-4 my-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                <Leaf className="h-6 w-6" />
                <span>Your Score: {score} Points</span>
              </div>
            </div>
            <Button onClick={handlePlayAgain} className="w-full">
              Plant Another
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Button asChild variant="ghost">
          <Link href="/games">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Games
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-headline flex items-center justify-center gap-2">
                <TreePine className="h-8 w-8" />
                Tree Planting Challenge
              </CardTitle>
              <CardDescription>
                Answer questions correctly to grow your tree!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-80 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex flex-col justify-end items-center overflow-hidden p-4">
                {/* Ground */}
                <div className="absolute bottom-0 left-0 w-full h-1/4 bg-green-800/40 z-0" />
                <div className="absolute bottom-0 left-0 w-full h-1/6 bg-yellow-900/30 z-10" />

                {/* Tree */}
                <div
                  className={cn(
                    'absolute bottom-[15%] w-2 bg-yellow-900/80 rounded-t-sm transition-all duration-1000 ease-out origin-bottom z-20',
                    progress < 5 ? 'scale-y-0' : ''
                  )}
                  style={{ height: `${progress * 0.7}%` }}
                >
                  {/* Leaves */}
                  {progress > 40 && (
                    <div
                      className="absolute -top-4 -left-3 w-10 h-10 rounded-full bg-green-600 transition-all duration-500 origin-bottom"
                      style={{ transform: `scale(${progress / 100})` }}
                    />
                  )}
                   {progress > 60 && (
                    <div
                      className="absolute -top-8 -right-4 w-12 h-12 rounded-full bg-green-700 transition-all duration-500 delay-200 origin-bottom"
                       style={{ transform: `scale(${progress / 100})` }}
                    />
                  )}
                   {progress > 80 && (
                    <div
                      className="absolute -top-12 left-0 w-10 h-10 rounded-full bg-green-500 transition-all duration-500 delay-500 origin-bottom"
                       style={{ transform: `scale(${progress / 100})` }}
                    />
                  )}
                </div>
                <Progress value={progress} className="absolute bottom-4 w-11/12" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                Question {currentQuestionIndex + 1} / {treePlantingQuestions.length}
              </CardTitle>
              <CardDescription className="text-lg pt-2">
                {currentQuestion.question}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              {shuffledOptions.map((option) => (
                <Button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showExplanation}
                  className={cn(
                    'h-auto text-wrap py-3 justify-start',
                    showExplanation && selectedAnswer === option
                      ? isCorrect
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-red-600 hover:bg-red-700'
                      : 'variant-outline'
                  )}
                >
                  {option}
                </Button>
              ))}
            </CardContent>
          </Card>
          {showExplanation && (
            <Card
              className={cn(
                'border-2',
                isCorrect ? 'border-green-500' : 'border-red-500'
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {isCorrect ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <XCircle className="text-red-500" />
                  )}
                  {isCorrect ? 'Correct!' : 'Not Quite!'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {currentQuestion.explanation}
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={handleNext} className="w-full">
                  {currentQuestionIndex < treePlantingQuestions.length - 1
                    ? 'Next Question'
                    : 'Finish Game'}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

    