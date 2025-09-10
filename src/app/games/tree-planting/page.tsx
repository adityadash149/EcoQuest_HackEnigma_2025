
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Shovel, HandPlatter, Droplets, Sun, ArrowLeft, Award, Leaf, TreePine, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { treePlantingQuestions } from '@/lib/mock-data';
import type { QuizQuestion } from '@/lib/types';
import { Progress } from '@/components/ui/progress';

const ANIMATION_STAGES = 4;

export default function TreePlantingPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  const currentQuestion = treePlantingQuestions[currentQuestionIndex];
  
  useEffect(() => {
    if (currentQuestion) {
      setShuffledAnswers(
        [...currentQuestion.options].sort(() => Math.random() - 0.5)
      );
    }
  }, [currentQuestion]);
  
  const treeGrowth = (correctAnswersCount / treePlantingQuestions.length) * 100;
  const animationStage = Math.floor((correctAnswersCount / treePlantingQuestions.length) * ANIMATION_STAGES);

  const handleAnswer = (answer: string) => {
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setCorrectAnswersCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setAnswered(false);
    setSelectedAnswer(null);
    setIsCorrect(null);

    if (currentQuestionIndex < treePlantingQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameComplete(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setAnswered(false);
    setCorrectAnswersCount(0);
    setGameComplete(false);
  };

  if (!currentQuestion) {
    return null; // or a loading state
  }

  if (gameComplete) {
    return (
        <div className="max-w-md mx-auto text-center">
            <Card>
                <CardHeader>
                    <div className="flex justify-center">
                        <Award className="h-16 w-16 text-yellow-500" />
                    </div>
                    <CardTitle className="text-2xl">Tree Planted!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        You've successfully answered the questions and planted a tree. You're a true Eco-Hero!
                    </p>
                    <div className="flex justify-center items-center gap-4 my-4">
                        <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                            <Leaf className="h-6 w-6"/>
                            <span>+{correctAnswersCount * 10} Points</span>
                        </div>
                    </div>
                    <Button onClick={handlePlayAgain} className="w-full">
                        Plant Another
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
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
      <Card className="text-center mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center justify-center gap-2">
            <TreePine className="h-8 w-8" />
            Tree Planting Game
          </CardTitle>
          <CardDescription>Answer the questions correctly to plant and grow your tree!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-80 bg-sky-200 dark:bg-sky-900/30 rounded-lg mb-6 flex flex-col justify-end items-center overflow-hidden">
            <Sun className={cn("h-16 w-16 text-yellow-400 absolute top-4 right-4 transition-opacity duration-1000", animationStage >= 3 ? 'opacity-100' : 'opacity-0')} />
            <div className="absolute bottom-0 h-1/4 w-full bg-green-800/60" />
            <div className={cn("absolute bottom-1/4 w-2 h-2 rounded-full bg-yellow-700 transition-all duration-1000 ease-out", animationStage >= 1 ? 'opacity-100' : 'opacity-0')} />
            <div
              className={cn(
                "absolute bottom-1/4 w-4 bg-yellow-900 transition-all duration-1000 ease-out",
                animationStage < 2 ? "h-0" : ""
              )}
              style={{ height: `${treeGrowth * 0.7}%` }} // Tree grows up to 70% of the container height
            >
                {animationStage >= 2 && (
                     <div className={cn("absolute -top-4 -left-3 w-10 h-10 rounded-full bg-green-600 transition-all duration-500", animationStage >= 2 ? 'opacity-100' : 'opacity-0')} style={{ transform: `scale(${treeGrowth / 100})`}}/>
                )}
            </div>
            {animationStage >= 2 && <Droplets className={cn("h-8 w-8 text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 transition-opacity duration-1000 animate-drip", animationStage === 2 ? "opacity-100" : "opacity-0")} />}
            
          </div>
          <Progress value={(currentQuestionIndex / treePlantingQuestions.length) * 100} className="mb-4"/>
          <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {treePlantingQuestions.length}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shuffledAnswers.map((answer) => (
                <Button 
                    key={answer}
                    onClick={() => handleAnswer(answer)}
                    disabled={answered}
                    className="h-auto text-wrap py-3 justify-start"
                    variant={selectedAnswer === answer ? (isCorrect ? 'default' : 'destructive') : 'outline'}
                >
                    {selectedAnswer === answer && (
                        isCorrect ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />
                    )}
                    {answer}
                </Button>
            ))}
        </CardContent>
        {answered && (
            <CardFooter className="flex-col items-start gap-4 mt-4">
                <div className='text-left'>
                    <h3 className="font-bold">{isCorrect ? "Correct!" : "Not quite!"}</h3>
                    {!isCorrect && <p className="text-muted-foreground">The correct answer is: {currentQuestion.correctAnswer}</p>}
                </div>
                <Button onClick={handleNext} className="w-full">
                    {currentQuestionIndex < treePlantingQuestions.length - 1 ? 'Next Question' : 'Finish Game'}
                </Button>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}

    