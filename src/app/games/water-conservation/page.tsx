
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, CloudRain, ArrowLeft, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const GAME_DURATION = 30000; // 30 seconds
const LEAK_INTERVAL = 2000; // New leak every 2 seconds
const RAINDROP_INTERVAL = 500; // New raindrop every 0.5 seconds

function FaucetIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M14.3 16.9c1.2-1.2 1.1-3.1-.1-4.2-1.2-1.1-3.1-1.1-4.2.1-1.2 1.2-1.1 3.1.1 4.2 1.2 1.1 3.1 1.1 4.2-.1z" />
        <path d="M16 14h2c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-2" />
        <path d="M4 14h2c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2H4" />
        <path d="M12 12V4" />
        <path d="M12 4H8" />
      </svg>
    );
  }

export default function WaterConservationPage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION / 1000);
  const [leaks, setLeaks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [raindrops, setRaindrops] = useState<{ id: number; x: number }[]>([]);
  const [bucketPosition, setBucketPosition] = useState(50);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION / 1000);
    setLeaks([]);
    setRaindrops([]);
    setIsGameActive(true);
    setIsGameOver(false);
  };
  
  // Game Timer
  useEffect(() => {
    if (!isGameActive) return;
    if (timeLeft <= 0) {
        setIsGameActive(false);
        setIsGameOver(true);
        return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isGameActive]);

  // Leak generator
  useEffect(() => {
    if (!isGameActive) return;
    const leakGenerator = setInterval(() => {
      setLeaks(prev => [...prev, { id: Date.now(), x: Math.random() * 90 + 5, y: Math.random() * 50 + 10 }]);
    }, LEAK_INTERVAL);
    return () => clearInterval(leakGenerator);
  }, [isGameActive]);

  // Raindrop generator
  useEffect(() => {
    if (!isGameActive) return;
    const dropGenerator = setInterval(() => {
        setRaindrops(prev => [...prev, { id: Date.now(), x: Math.random() * 90 + 5}])
    }, RAINDROP_INTERVAL);
    return () => clearInterval(dropGenerator);
  }, [isGameActive]);

  // Raindrop collector
  useEffect(() => {
    const checkCollisions = () => {
        setRaindrops(prevDrops => {
            const newDrops: typeof raindrops = [];
            for (const drop of prevDrops) {
                // Approximate bucket width is 10%
                if (drop.x > bucketPosition - 5 && drop.x < bucketPosition + 5) {
                    setScore(s => s + 5); // +5 for collecting rain
                } else {
                    newDrops.push(drop);
                }
            }
            return newDrops;
        })
    }
    const collisionInterval = setInterval(checkCollisions, 100);
    return () => clearInterval(collisionInterval);
  }, [bucketPosition, raindrops]);


  const handleFixLeak = (id: number) => {
    setLeaks(prev => prev.filter(leak => leak.id !== id));
    setScore(s => s + 10); // +10 for fixing leak
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if(!isGameActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
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
                    <p className="text-muted-foreground mb-4">You did a great job conserving water!</p>
                    <p className="text-4xl font-bold text-primary mb-6">{score} Points</p>
                    <Button onClick={startGame} className="w-full">
                        Play Again
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
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-headline flex items-center justify-center gap-2">
              <Droplets className="h-8 w-8" />
              Water Conservation
            </CardTitle>
            <div className="text-right">
                <div className="text-2xl font-bold text-primary">{score}</div>
                <div className="text-sm text-muted-foreground">Time Left: {timeLeft}s</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            {!isGameActive ? (
                <div className="text-center h-96 flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-semibold mb-2">Game Rules</h2>
                    <ul className="list-disc list-inside text-muted-foreground mb-6">
                        <li>Click on leaking taps to fix them (+10 points).</li>
                        <li>Move the bucket to collect rainwater (+5 points).</li>
                        <li>The game lasts for 30 seconds.</li>
                    </ul>
                    <Button onClick={startGame} size="lg">Start Game</Button>
                </div>
            ) : (
                <div className="relative w-full h-96 bg-blue-100 dark:bg-blue-900/30 rounded-lg overflow-hidden" onMouseMove={handleMouseMove}>
                    {/* Leaking Taps */}
                    {leaks.map(leak => (
                        <button key={leak.id} style={{ left: `${leak.x}%`, top: `${leak.y}%`}} className="absolute text-blue-500 animate-pulse" onClick={() => handleFixLeak(leak.id)}>
                            <FaucetIcon className="h-8 w-8"/>
                            <Droplets className="h-4 w-4 absolute -bottom-3 left-2 animate-drip" />
                        </button>
                    ))}
                    {/* Raindrops */}
                    {raindrops.map(drop => (
                        <div key={drop.id} className="absolute animate-fall" style={{ left: `${drop.x}%`}}>
                            <CloudRain className="h-4 w-4 text-cyan-400" />
                        </div>
                    ))}
                    {/* Bucket */}
                    <div className="absolute bottom-0 h-16 w-20 bg-gray-500 rounded-t-lg" style={{ left: `${bucketPosition}%`, transform: 'translateX(-50%)' }} />
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}

// Add animation keyframes to globals.css if they don't exist
// In tailwind.config.ts -> theme.extend.animation:
// 'drip': 'drip 1s infinite',
// 'fall': 'fall 2s linear infinite',
// In tailwind.config.ts -> theme.extend.keyframes:
// drip: { '0%, 100%': { transform: 'translateY(0)', opacity: '1' }, '100%': { transform: 'translateY(20px)', opacity: '0' }, },
// fall: { '0%': { transform: 'translateY(-20px)', opacity: '1' }, '100%': { transform: 'translateY(calc(100vh - 50px))', opacity: '0' } }
// This is a comment, the implementation should handle this. I will update tailwind.config.ts

    