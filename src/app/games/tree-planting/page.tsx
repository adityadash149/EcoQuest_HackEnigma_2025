
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shovel, HandPlatter, Droplets, Sun, ArrowLeft, Award, Leaf, TreePine } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const steps = [
  { name: 'Dig', icon: Shovel, duration: 1000 },
  { name: 'Seed', icon: HandPlatter, duration: 1000 },
  { name: 'Water', icon: Droplets, duration: 1500 },
  { name: 'Grow', icon: Sun, duration: 2000 },
];

export default function TreePlantingPage() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [treeGrowth, setTreeGrowth] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const stepDuration = steps[currentStep].duration;
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setIsAnimating(false);
            if (currentStep === steps.length - 1) {
              setGameComplete(true);
            } else {
              setTreeGrowth(g => g + 25);
            }
            return 100;
          }
          return p + 1;
        });
      }, stepDuration / 100);
      return () => clearInterval(interval);
    }
  }, [isAnimating, currentStep]);

  const handleAction = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setProgress(0);
      setIsAnimating(true);
    }
  };
  
  const getButtonText = () => {
    if (currentStep === -1) return "Start Planting";
    if (isAnimating) return `Performing: ${steps[currentStep].name}...`;
    if (currentStep < steps.length - 1) return `Next: ${steps[currentStep + 1].name}`;
    return "Plant Another Tree!";
  }

  const handlePlayAgain = () => {
    setCurrentStep(-1);
    setProgress(0);
    setIsAnimating(false);
    setTreeGrowth(0);
    setGameComplete(false);
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
                        You've successfully planted a tree. You're helping make the world a greener place!
                    </p>
                    <div className="flex justify-center items-center gap-4 my-4">
                        <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                            <Leaf className="h-6 w-6"/>
                            <span>+50 Points</span>
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
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center justify-center gap-2">
            <TreePine className="h-8 w-8" />
            Tree Planting Game
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-80 bg-green-100 dark:bg-green-900/30 rounded-lg mb-6 flex flex-col justify-end items-center overflow-hidden">
            <div className="absolute bottom-0 h-1/4 w-full bg-yellow-800/50" />
            <div
              className={cn(
                "absolute bottom-1/4 w-4 bg-yellow-900 transition-all duration-1000 ease-out",
              )}
              style={{ height: `${treeGrowth}%` }}
            >
                {treeGrowth > 25 && (
                     <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-green-600 transition-all duration-500" style={{ transform: `scale(${treeGrowth / 100})`, opacity: treeGrowth > 25 ? 1 : 0}}/>
                )}
            </div>
          </div>
          
          <div className="mb-4">
            {currentStep > -1 && <Progress value={progress} />}
          </div>

          <Button onClick={handleAction} disabled={isAnimating || gameComplete} size="lg" className="w-full md:w-1/2">
            {getButtonText()}
          </Button>

          <div className="flex justify-center gap-4 md:gap-8 mt-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isDone = index < currentStep;
              return (
                <div key={step.name} className="flex flex-col items-center gap-2 text-muted-foreground">
                   <div className={cn("rounded-full p-4 border-2 transition-colors", 
                    isActive ? "bg-accent border-accent-foreground text-accent-foreground" : "",
                    isDone ? "bg-primary border-primary text-primary-foreground" : "bg-card"
                   )}>
                     <Icon className="h-8 w-8" />
                   </div>
                  <span className={cn("font-medium transition-colors", (isActive || isDone) && "text-foreground")}>{step.name}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
