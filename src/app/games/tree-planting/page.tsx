
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
import { treePlantingQuestions as allQuestions } from '@/lib/mock-data';
import type { QuizQuestion } from '@/lib/types';

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

export default function TreePlantingPage() {
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    setShuffledQuestions(shuffleArray(allQuestions));
  }, []);

  const currentQuestion = useMemo(() => shuffledQuestions[currentQuestionIndex], [currentQuestionIndex, shuffledQuestions]);
  const questionsCorrect = score / 10;
  const totalQuestions = shuffledQuestions.length;
  const progress = totalQuestions > 0 ? (questionsCorrect / totalQuestions) * 100 : 0;

  useEffect(() => {
    // Prevents hydration error by shuffling on client
    if (currentQuestion) {
      const options = [
        ...currentQuestion.options
      ];
      setShuffledOptions(shuffleArray(options));
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (gameComplete) {
        localStorage.setItem('game-tree-planting-completed', 'true');
    }
  }, [gameComplete]);


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

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setGameComplete(true);
    }
  };

  const handlePlayAgain = () => {
    setShuffledQuestions(shuffleArray(allQuestions));
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
              You've successfully answered the questions. You're a true Eco-Hero!
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
  
  if (!currentQuestion) {
      return null; // Or a loading state
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

                {/* Tree Structure */}
                <div
                  className="absolute bottom-[15%] flex items-end justify-center transition-all duration-1000 ease-out origin-bottom z-20"
                  style={{ height: '80%', width: '100%' }}
                >
                  {/* Trunk */}
                  <div
                    className={cn(
                      'w-3 bg-yellow-950/80 rounded-t-md transition-all duration-1000 ease-out origin-bottom',
                      questionsCorrect > 0 ? 'scale-y-100' : 'scale-y-0'
                    )}
                    style={{ height: `${Math.min(100, progress * 1.5)}%` }}
                  />

                  {/* Branches & Leaves */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    {/* Branch 1 (Left) */}
                    {questionsCorrect >= (totalQuestions * 0.2) && (
                      <div
                        className="absolute bottom-[20%] left-[calc(50%-0.75rem)] w-12 h-1 bg-yellow-950/80 transition-all duration-500 origin-right -rotate-45"
                        style={{ transform: 'translateX(-100%) rotate(-45deg)', opacity: questionsCorrect >= (totalQuestions * 0.2) ? 1 : 0 }}
                      >
                          {questionsCorrect >= (totalQuestions * 0.3) && <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-green-600 animate-in fade-in zoom-in" />}
                      </div>
                    )}

                    {/* Branch 2 (Right) */}
                    {questionsCorrect >= (totalQuestions * 0.4) && (
                      <div
                        className="absolute bottom-[40%] right-[calc(50%-0.75rem)] w-16 h-1 bg-yellow-950/80 transition-all duration-500 origin-left rotate-45"
                         style={{ transform: 'translateX(100%) rotate(45deg)', opacity: questionsCorrect >= (totalQuestions * 0.4) ? 1 : 0 }}
                      >
                         {questionsCorrect >= (totalQuestions * 0.5) && <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-green-700 animate-in fade-in zoom-in delay-200" />}
                      </div>
                    )}
                     
                    {/* Branch 3 (Left) */}
                    {questionsCorrect >= (totalQuestions * 0.6) && (
                      <div
                        className="absolute bottom-[60%] left-[calc(50%-0.75rem)] w-14 h-1 bg-yellow-950/80 transition-all duration-500 origin-right -rotate-30"
                        style={{ transform: 'translateX(-100%) rotate(-30deg)', opacity: questionsCorrect >= (totalQuestions * 0.6) ? 1 : 0 }}
                      >
                         {questionsCorrect >= (totalQuestions * 0.7) && <div className="absolute -top-4 -left-3 w-10 h-10 rounded-full bg-green-600 animate-in fade-in zoom-in delay-300" />}
                      </div>
                    )}

                     {/* Canopy */}
                     {questionsCorrect >= (totalQuestions * 0.8) && <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-green-500 animate-in fade-in zoom-in-50 duration-500" />}
                     {questionsCorrect >= (totalQuestions * 0.9) && <div className="absolute top-[0%] left-[calc(50%-2rem)] -translate-x-1/2 w-14 h-14 rounded-full bg-green-600 animate-in fade-in zoom-in-50 duration-500 delay-200" />}
                     {questionsCorrect >= totalQuestions && <div className="absolute top-[0%] left-[calc(50%+2rem)] -translate-x-1/2 w-14 h-14 rounded-full bg-green-700 animate-in fade-in zoom-in-50 duration-500 delay-400" />}
                  </div>
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
                Question {currentQuestionIndex + 1} / {shuffledQuestions.length}
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
                  {currentQuestionIndex < shuffledQuestions.length - 1
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
