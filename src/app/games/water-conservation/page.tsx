
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Droplet, ArrowLeft, Award, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { waterGameQuestions } from '@/lib/mock-data';
import type { WaterGameQuestion } from '@/lib/types';


const GAME_DURATION = 30000; // 30 seconds
const RAINDROP_INTERVAL = 300; // New raindrop every 0.3 seconds
const MAX_SCORE = 100; // Represents the bucket being full

type Raindrop = {
  id: number;
  x: number;
  y: number;
  splashed: boolean;
};

const RaindropEl = ({ y }: { y: number }) => (
    <div className="w-1 h-6 bg-blue-400 rounded-full" style={{ transform: `translateY(${y}px)` }} />
);

const SplashEl = () => (
    <div className="w-4 h-4 rounded-full border-2 border-blue-300/80 bg-transparent animate-splash" />
)

const Bucket = ({ x, waterLevel }: { x: number, waterLevel: number }) => (
    <div 
        className="absolute bottom-4 h-24 w-32 rounded-t-lg shadow-lg"
        style={{ 
            left: `${x}%`, 
            transform: 'translateX(-50%)',
            background: 'linear-gradient(to top, #888, #ccc, #888)'
        }}
    >
        <div className="absolute top-0 w-full h-3 bg-gradient-to-b from-gray-600 to-gray-500 rounded-t-md" />
        <div 
            className="absolute bottom-0 w-full bg-blue-500/70 transition-all duration-300 ease-out"
            style={{ height: `${waterLevel}%` }}
        >
             <div className="absolute top-0 w-full h-1 bg-blue-400/80 animate-ripple" />
        </div>
    </div>
);

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

export default function WaterConservationPage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION / 1000);
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);
  const [bucketPosition, setBucketPosition] = useState(50);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [quiz, setQuiz] = useState<{question: WaterGameQuestion, options: string[]} | null>(null);
  const [shuffledQuizQuestions, setShuffledQuizQuestions] = useState<WaterGameQuestion[]>([]);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const { toast } = useToast();
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  
  const waterLevel = (score / MAX_SCORE) * 100;
  
  useEffect(() => {
    setShuffledQuizQuestions(shuffleArray(waterGameQuestions));
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION / 1000);
    setRaindrops([]);
    setBucketPosition(50);
    setIsGameActive(true);
    setIsGameOver(false);
    setQuiz(null);
    setQuizQuestionIndex(0);
    setShuffledQuizQuestions(shuffleArray(waterGameQuestions));
  };
  
  useEffect(() => {
    if (!isGameActive) return;
    if (timeLeft <= 0) {
        setIsGameActive(false);
        setIsGameOver(true);
        if(requestRef.current) cancelAnimationFrame(requestRef.current);
        return;
    }
    const timer = setTimeout(() => {
      const newTimeLeft = timeLeft - 1;
      setTimeLeft(newTimeLeft);
      // Trigger quiz every 10 seconds
      if ((GAME_DURATION / 1000 - newTimeLeft) % 10 === 0 && newTimeLeft > 0 && !quiz) {
        const nextQuestion = shuffledQuizQuestions[quizQuestionIndex % shuffledQuizQuestions.length];
        setQuiz({
            question: nextQuestion,
            options: shuffleArray(nextQuestion.options)
        });
        setQuizQuestionIndex(p => p + 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isGameActive, quizQuestionIndex, shuffledQuizQuestions, quiz]);

  useEffect(() => {
      if(isGameOver) {
          localStorage.setItem('game-water-conservation-completed', 'true');
      }
  }, [isGameOver]);

  useEffect(() => {
    if (!isGameActive || quiz) return;
    const dropGenerator = setInterval(() => {
        setRaindrops(prev => [...prev, { id: Date.now(), x: Math.random() * 95 + 2.5, y: -20, splashed: false }]);
    }, RAINDROP_INTERVAL);
    return () => clearInterval(dropGenerator);
  }, [isGameActive, quiz]);

  const gameLoop = useCallback(() => {
    if (!isGameActive || !gameAreaRef.current || !!quiz) {
      if(requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    };
    
    const gameAreaHeight = gameAreaRef.current.offsetHeight;
    const bucketWidth = 7; 

    setRaindrops(prevDrops => {
        let updatedDrops = prevDrops.map(drop => {
            if (drop.splashed) return drop;
            let newY = drop.y + 6; // Rain speed
            return { ...drop, y: newY };
        });

        const bucketBottom = gameAreaHeight - 16;
        const bucketTop = bucketBottom - 96;

        let collectedCount = 0;
        updatedDrops = updatedDrops.map(drop => {
            if (drop.splashed || drop.y < bucketTop) return drop;

            if (drop.y >= bucketTop && drop.y <= bucketBottom) {
                const dropX = drop.x;
                const bucketLeft = bucketPosition - bucketWidth / 2;
                const bucketRight = bucketPosition + bucketWidth / 2;
                if (dropX >= bucketLeft && dropX <= bucketRight) {
                    collectedCount++;
                    return { ...drop, splashed: true };
                }
            }
            return drop;
        });

        if (collectedCount > 0) {
            setScore(s => Math.min(s + collectedCount, MAX_SCORE + 20)); // Allow some overflow for feel
        }
        
        // Filter out drops that are off-screen or have finished their splash animation
        return updatedDrops.filter(drop => drop.y < gameAreaHeight + 50);
    });

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [isGameActive, bucketPosition, quiz]);

  useEffect(() => {
    if (isGameActive && !quiz) {
      requestRef.current = requestAnimationFrame(gameLoop);
      return () => {
        if(requestRef.current) cancelAnimationFrame(requestRef.current)
      };
    }
  }, [isGameActive, gameLoop, quiz]);


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if(!isGameActive || !gameAreaRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newPosition = (x / rect.width) * 100;
    setBucketPosition(Math.max(5, Math.min(95, newPosition)));
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
      if(!isGameActive || !gameAreaRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const newPosition = (x / rect.width) * 100;
      setBucketPosition(Math.max(5, Math.min(95, newPosition)));
  }
  
  const handleQuizAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
        setScore(s => s + 20);
        toast({ title: "Correct!", description: "You've earned 20 bonus points!", variant: 'default'});
    } else {
        toast({ title: "Not quite!", description: "That's okay, let's keep saving water.", variant: 'destructive'});
    }
    setQuiz(null);
  }


  if (isGameOver) {
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
                    <CardTitle className="text-2xl">Time's Up!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">You did a great job saving water!</p>
                    <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-600 mb-2">{score} Liters Saved</p>
                    <p className="text-sm text-muted-foreground">Way to go, Eco-Hero!</p>
                </CardContent>
                 <CardFooter>
                    <Button onClick={startGame} className="w-full">
                        Play Again
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
  }
  
  const FluffyCloud = ({ className }: { className?: string }) => (
    <div className={cn("absolute w-40 h-24", className)}>
        <div className="absolute w-20 h-20 bg-white/90 rounded-full bottom-0 left-5 shadow-inner" />
        <div className="absolute w-24 h-24 bg-white/90 rounded-full bottom-0 left-12 shadow-inner" />
        <div className="absolute w-16 h-16 bg-white/80 rounded-full bottom-0 left-0 shadow-inner" />
        <div className="absolute w-16 h-16 bg-white/80 rounded-full bottom-0 right-0 shadow-inner" />
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
       <div className="mb-4 flex justify-between items-center">
        <Button asChild variant="ghost">
          <Link href="/games">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Games
          </Link>
        </Button>
        {!isGameActive && !isGameOver && (
            <Button onClick={startGame} size="lg">Start Game</Button>
        )}
        {isGameActive && (
            <div className="flex items-center gap-6">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-600 flex items-center gap-2">
                    <Droplet className="h-6 w-6 fill-current"/> {score}
                </div>
                <div className="text-2xl font-mono bg-gray-900 text-cyan-300 p-2 rounded-md border-2 border-gray-700 shadow-inner">
                    {`0:${timeLeft.toString().padStart(2, '0')}`}
                </div>
            </div>
        )}
      </div>
      <Card>
        <CardContent className="p-0">
            <div 
                ref={gameAreaRef} 
                className="relative w-full h-[600px] bg-gradient-to-b from-blue-300 to-cyan-100 rounded-lg overflow-hidden cursor-pointer shadow-inner" 
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
            >
                {isGameActive ? (
                    <>
                        <div className="absolute inset-0 bg-black/10 vignette"/>
                        <Sun className="absolute top-10 left-1/2 -translate-x-1/2 h-20 w-20 text-yellow-300/80 animate-glow" />
                        <FluffyCloud className="top-10 left-[10%] animate-drift-slow" />
                        <FluffyCloud className="top-20 left-[70%] animate-drift-fast" />
                        <FluffyCloud className="top-5 left-[40%] animate-drift-medium" />

                        {raindrops.map(drop => (
                             <div key={drop.id} className="absolute top-0 z-10" style={{ left: `${drop.x}%`}}>
                                {drop.splashed ? <SplashEl /> : <RaindropEl y={drop.y} />}
                            </div>
                        ))}
                        <Bucket x={bucketPosition} waterLevel={waterLevel} />
                    </>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-black/30 z-20 relative">
                        <h2 className="text-3xl font-bold text-white mb-4">Rain Water Harvesting</h2>
                        <ul className="list-disc list-inside text-white/90 mb-6">
                            <li>Move the bucket to collect falling rainwater.</li>
                            <li>Collect as much as you can in 30 seconds!</li>
                            <li>Answer pop quizzes to earn bonus points.</li>
                        </ul>
                         <Button onClick={startGame} size="lg">Start Game</Button>
                    </div>
                )}
            </div>
        </CardContent>
      </Card>
      
        {quiz && (
            <Dialog open={!!quiz} onOpenChange={(open) => !open && setQuiz(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Pop Quiz!</DialogTitle>
                        <DialogDescription>{quiz.question.question}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-2">
                        {quiz.options.map(option => (
                             <Button key={option} variant="outline" onClick={() => handleQuizAnswer(option === quiz.question.correctAnswer)}>
                                {option}
                            </Button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        )}
    </div>
  );
}
