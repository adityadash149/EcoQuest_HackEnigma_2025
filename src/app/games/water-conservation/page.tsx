
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Droplet, ArrowLeft, Award, Cloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const GAME_DURATION = 30000; // 30 seconds
const RAINDROP_INTERVAL = 300; // New raindrop every 0.3 seconds

type Raindrop = {
  id: number;
  x: number;
  y: number;
  bounced: boolean;
};

const Raindrop = ({ y }: { y: number }) => (
    <div className="w-1 h-4 bg-blue-400 rounded-full" style={{ transform: `translateY(${y}px)` }} />
);

const Bucket = ({ x }: { x: number }) => (
    <div 
        className="absolute bottom-4 h-20 w-28 bg-gray-400 border-4 border-gray-600 rounded-t-lg"
        style={{ left: `${x}%`, transform: 'translateX(-50%)' }}
    >
        <div className="w-full h-2 bg-gray-600 rounded-t-sm" />
    </div>
);


export default function WaterConservationPage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION / 1000);
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);
  const [bucketPosition, setBucketPosition] = useState(50);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION / 1000);
    setRaindrops([]);
    setBucketPosition(50);
    setIsGameActive(true);
    setIsGameOver(false);
  };
  
  // Game Timer
  useEffect(() => {
    if (!isGameActive) return;
    if (timeLeft <= 0) {
        setIsGameActive(false);
        setIsGameOver(true);
        if(requestRef.current) cancelAnimationFrame(requestRef.current);
        return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isGameActive]);

  // Raindrop generator
  useEffect(() => {
    if (!isGameActive) return;
    const dropGenerator = setInterval(() => {
        setRaindrops(prev => [...prev, { id: Date.now(), x: Math.random() * 95 + 2.5, y: -20, bounced: false }]);
    }, RAINDROP_INTERVAL);
    return () => clearInterval(dropGenerator);
  }, [isGameActive]);

  // Main game loop for animations and collision
  const gameLoop = useCallback(() => {
    if (!isGameActive || !gameAreaRef.current) return;
    
    const gameAreaHeight = gameAreaRef.current.offsetHeight;
    const roofHeight = gameAreaHeight * 0.4;
    const bucketWidth = 7; // 7% of game area width approx.

    setRaindrops(prevDrops => {
        const updatedDrops = prevDrops.map(drop => {
            let newY = drop.y + 5; // Rain speed
            let bounced = drop.bounced;

            // Bounce logic
            if (!bounced && newY >= roofHeight) {
                newY = roofHeight;
                bounced = true;
            }

            return { ...drop, y: newY, bounced };
        }).filter(drop => drop.y < gameAreaHeight); // Remove drops that are off-screen

        // Collision detection
        const bucketBottom = gameAreaHeight - 16;
        const bucketTop = bucketBottom - 80;

        const dropsInBucket = updatedDrops.filter(drop => {
            if (drop.y >= bucketTop && drop.y <= bucketBottom) {
                const dropX = drop.x;
                const bucketLeft = bucketPosition - bucketWidth / 2;
                const bucketRight = bucketPosition + bucketWidth / 2;
                return dropX >= bucketLeft && dropX <= bucketRight;
            }
            return false;
        });

        if (dropsInBucket.length > 0) {
            setScore(s => s + dropsInBucket.length);
            // Remove collected drops
            return updatedDrops.filter(drop => !dropsInBucket.find(d => d.id === drop.id));
        }

        return updatedDrops;
    });

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [isGameActive, bucketPosition]);

  useEffect(() => {
    if (isGameActive) {
      requestRef.current = requestAnimationFrame(gameLoop);
      return () => {
        if(requestRef.current) cancelAnimationFrame(requestRef.current)
      };
    }
  }, [isGameActive, gameLoop]);


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
                    <p className="text-4xl font-bold text-primary mb-2">{score} Liters Saved</p>
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

  return (
    <div className="max-w-4xl mx-auto">
       <div className="mb-4 flex justify-between items-center">
        <Button asChild variant="ghost">
          <Link href="/games">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Games
          </Link>
        </Button>
        {!isGameActive && (
            <Button onClick={startGame} size="lg">Start Game</Button>
        )}
        {isGameActive && (
            <div className="text-right">
                <div className="text-2xl font-bold text-primary flex items-center gap-2">
                    <Droplet className="h-6 w-6"/> {score} Liters
                </div>
                <div className="text-sm text-muted-foreground">Time Left: {timeLeft}s</div>
            </div>
        )}
      </div>
      <Card>
        <CardContent className="p-0">
            <div 
                ref={gameAreaRef} 
                className="relative w-full h-[500px] bg-sky-300 dark:bg-sky-800 rounded-lg overflow-hidden cursor-pointer" 
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
            >
                {/* Environment */}
                <Cloud className="absolute top-10 left-1/4 h-24 w-48 text-white/80" />
                <Cloud className="absolute top-20 right-1/4 h-16 w-32 text-white/70" />
                <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white/90 text-sky-700 font-bold px-3 py-1 rounded-full text-sm">
                    Water Conservation
                </div>
                
                <div className="absolute top-[40%] left-0 w-full h-4 bg-gray-700" />
                <div 
                    className="absolute top-[calc(40%+1rem)] left-0 w-0 h-0 border-l-[50vw] border-l-transparent border-r-[50vw] border-r-transparent border-b-[10vh] border-b-gray-600"
                />


                {isGameActive ? (
                    <>
                        {/* Raindrops */}
                        {raindrops.map(drop => (
                             <div key={drop.id} className="absolute top-0 animate-fall-roof" style={{ left: `${drop.x}%`}}>
                                <Raindrop y={drop.y} />
                            </div>
                        ))}
                        {/* Bucket */}
                        <Bucket x={bucketPosition} />

                        <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/80 text-xs font-semibold">
                            Collect rainwater to understand the importance of Water Conservation!
                        </p>
                    </>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-black/30">
                        <h2 className="text-3xl font-bold text-white mb-4">Water Conservation</h2>
                        <ul className="list-disc list-inside text-white/90 mb-6">
                            <li>Drag the bucket to collect falling rainwater.</li>
                            <li>Each drop you collect saves water.</li>
                            <li>Collect as much as you can in 30 seconds!</li>
                        </ul>
                         <Button onClick={startGame} size="lg">Start Game</Button>
                    </div>
                )}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
