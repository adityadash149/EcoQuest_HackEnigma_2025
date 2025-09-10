
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Shovel, HandPlatter, Droplets, Sun, ArrowLeft, Award, Leaf, TreePine } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const STEPS = [
  { name: 'Dig', icon: Shovel, description: "First, we need to dig a hole for our new tree." },
  { name: 'Plant', icon: HandPlatter, description: "Now, let's carefully place the seed in the hole." },
  { name: 'Water', icon: Droplets, description: "Great! Let's give our seed some water to help it grow." },
  { name: 'Grow', icon: Sun, description: "With soil, water, and sun, the tree will now grow tall." },
];

export default function TreePlantingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const handleNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setGameComplete(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentStep(0);
    setGameComplete(false);
  };
  
  const progress = (currentStep / (STEPS.length -1)) * 100;
  const CurrentIcon = STEPS[currentStep].icon;

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
                        You've successfully planted a tree. You're a true Eco-Hero!
                    </p>
                    <div className="flex justify-center items-center gap-4 my-4">
                        <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                            <Leaf className="h-6 w-6"/>
                            <span>+100 Points</span>
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
          <CardDescription>Follow the steps to plant and grow your very own tree!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-80 bg-sky-200 dark:bg-sky-900/30 rounded-lg mb-6 flex flex-col justify-end items-center overflow-hidden">
            <Sun className={cn("h-16 w-16 text-yellow-400 absolute top-4 right-4 transition-opacity duration-1000", currentStep >= 3 ? 'opacity-100' : 'opacity-0')} />
            <div className="absolute bottom-0 h-1/4 w-full bg-green-800/60" />

            {/* Hole */}
            <div className={cn("absolute bottom-[23%] w-24 h-8 bg-black/30 rounded-[50%] transition-opacity duration-500", currentStep >= 1 ? 'opacity-100' : 'opacity-0')} />
            
            {/* Seed */}
            <div className={cn("absolute bottom-1/4 w-2 h-2 rounded-full bg-yellow-700 transition-all duration-1000 ease-out", currentStep >= 2 ? 'opacity-100' : 'opacity-0')} />
            
            {/* Watering */}
            {currentStep === 2 && <Droplets className={cn("h-12 w-12 text-blue-500 absolute top-1/2 left-1/2 -translate-x-8 transition-opacity duration-1000 animate-drip")} />}

            {/* Tree */}
            <div
              className={cn(
                "absolute bottom-1/4 w-4 bg-yellow-900 transition-all duration-1000 ease-out origin-bottom",
                currentStep < 3 ? "scale-y-0" : ""
              )}
              style={{ height: `70%`, transform: `scaleY(${gameComplete ? 1 : progress / 100 * 0.7})`}}
            >
                {currentStep >= 3 && (
                     <div 
                        className={cn("absolute -top-4 -left-3 w-10 h-10 rounded-full bg-green-600 transition-all duration-500 origin-bottom", currentStep >= 3 ? 'opacity-100' : 'opacity-0')} 
                        style={{ transform: `scale(${progress/100})`}}
                     />
                )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-3">
                <div className="bg-accent/50 rounded-full p-3">
                    <CurrentIcon className="h-8 w-8 text-accent-foreground" />
                </div>
                <span>Step {currentStep + 1}: {STEPS[currentStep].name}</span>
            </CardTitle>
            <CardDescription className="pl-16">{STEPS[currentStep].description}</CardDescription>
        </CardHeader>
        
        <CardFooter className="flex-col items-start gap-4 mt-4">
            <Button onClick={handleNextStep} className="w-full" size="lg">
                {STEPS[currentStep].name}
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
