
'use client';

import React, { useState, useEffect } from 'react';
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
  Zap,
  Wind,
  Sun,
  Car,
  Bus,
  Building,
  DollarSign,
  Mountain,
  Users,
  Info
} from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { cityBuildingQuestions } from '@/lib/mock-data';
import type { CityBuildingQuestion } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const buildingTypes = {
    'solar': { icon: Sun, name: 'Solar Farm', cost: 1500, power: 20, pollution: -5, requires: [] },
    'wind': { icon: Wind, name: 'Wind Turbine', cost: 2000, power: 30, pollution: -8, requires: [] },
    'residential': { icon: Building, name: 'Residential Zone', cost: 1000, population: 100, powerDemand: 10, pollution: 5 },
    'commercial': { icon: Building, name: 'Commercial Zone', cost: 1200, population: 50, powerDemand: 15, pollution: 8 },
    'ev': { icon: Car, name: 'EV Charging Station', cost: 800, pollution: -5, requires: ['residential'] },
    'bus': { icon: Bus, name: 'Public Transit Hub', cost: 2500, pollution: -10, requires: ['residential', 'commercial'] }
};

type BuildingType = keyof typeof buildingTypes;

interface PlacedBuilding {
  id: string;
  type: BuildingType;
  top: number;
  left: number;
}

const initialGridSize = 12;

export default function GreenTechCityPage() {
  const [grid, setGrid] = useState<PlacedBuilding[]>([]);
  const [budget, setBudget] = useState(10000);
  const [population, setPopulation] = useState(0);
  const [power, setPower] = useState({ generated: 0, demand: 0 });
  const [pollution, setPollution] = useState(0);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(null);
  const [quiz, setQuiz] = useState<{question: CityBuildingQuestion, onCorrect: () => void} | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const { toast } = useToast();

  const calculateStats = () => {
    let newPopulation = 0;
    let newPowerDemand = 0;
    let newPowerGenerated = 0;
    let newPollution = 0;

    grid.forEach(building => {
        const stats = buildingTypes[building.type];
        if ('population' in stats) newPopulation += stats.population;
        if ('powerDemand' in stats) newPowerDemand += stats.powerDemand;
        if ('power' in stats) newPowerGenerated += stats.power;
        if ('pollution' in stats) newPollution += stats.pollution;
    });
    setPopulation(newPopulation);
    setPower({ generated: newPowerGenerated, demand: newPowerDemand });
    setPollution(newPollution);

    if (newPopulation >= 500 && newPollution < 20 && newPowerGenerated >= newPowerDemand) {
        setIsGameOver(true);
        localStorage.setItem('game-green-tech-completed', 'true');
    }
  };
  
  useEffect(calculateStats, [grid]);

  const handlePlaceBuilding = (rowIndex: number, colIndex: number) => {
    if (!selectedBuilding) return;
    const buildingInfo = buildingTypes[selectedBuilding];
    if (budget < buildingInfo.cost) {
      toast({ title: "Not enough budget!", variant: 'destructive'});
      return;
    }

    const position = { top: rowIndex, left: colIndex };
    const newBuilding: PlacedBuilding = {
      id: `building-${Date.now()}`,
      type: selectedBuilding,
      ...position
    };
    
    setGrid(prev => [...prev, newBuilding]);
    setBudget(prev => prev - buildingInfo.cost);
    setSelectedBuilding(null);

    // Trigger quiz event
    if (grid.length % 3 === 0) {
        const randomQuestion = cityBuildingQuestions[Math.floor(Math.random() * cityBuildingQuestions.length)];
        setQuiz({
            question: randomQuestion,
            onCorrect: () => setBudget(b => b + 500)
        });
    }
  };

  const isOccupied = (row: number, col: number) => {
    return grid.some(b => b.top === row && b.left === col);
  }
  
  const handleSelectBuilding = (type: BuildingType) => {
      const buildingInfo = buildingTypes[type];
      const hasResidential = grid.some(b => b.type === 'residential');
      const hasCommercial = grid.some(b => b.type === 'commercial');

      if (buildingInfo.requires?.includes('residential') && !hasResidential || buildingInfo.requires?.includes('commercial') && !hasCommercial) {
          toast({ title: 'Requirement not met!', description: `You need to build a ${buildingInfo.requires.join(' & ')} first.`, variant: 'destructive'});
          return;
      }
      setSelectedBuilding(type);
  }

  const handleQuizAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
        quiz?.onCorrect();
        toast({ title: "Correct!", description: "You've earned a budget bonus!", variant: 'default'});
    } else {
        toast({ title: "Not quite!", description: "That's okay, let's keep building.", variant: 'destructive'});
    }
    setQuiz(null);
  }

  const renderGrid = () => {
    return Array.from({ length: initialGridSize }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex">
        {Array.from({ length: initialGridSize }).map((_, colIndex) => {
          const placed = grid.find(b => b.top === rowIndex && b.left === colIndex);
          return (
            <div
              key={colIndex}
              className={cn(
                'w-12 h-12 border border-green-800/20 flex items-center justify-center cursor-pointer hover:bg-green-500/50',
                isOccupied(rowIndex, colIndex) && 'cursor-not-allowed',
                selectedBuilding && !isOccupied(rowIndex, colIndex) && 'bg-green-500/30'
              )}
              onClick={() => !isOccupied(rowIndex, colIndex) && handlePlaceBuilding(rowIndex, colIndex)}
            >
              {placed && React.createElement(buildingTypes[placed.type].icon, { className: 'w-8 h-8 text-white' })}
            </div>
          )
        })}
      </div>
    ));
  }
  
  if(isGameOver) {
      return (
        <div className="max-w-md mx-auto text-center">
            <Card>
                <CardHeader>
                    <div className="flex justify-center">
                        <Award className="h-16 w-16 text-yellow-500" />
                    </div>
                    <CardTitle className="text-2xl">Sustainable City Built!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">You've successfully built a thriving, green city. You're an Eco-Planner!</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => window.location.reload()} className="w-full">
                        Build Another City
                    </Button>
                </CardFooter>
            </Card>
        </div>
      )
  }

  return (
    <div className="max-w-7xl mx-auto">
        <div className="mb-4">
            <Button asChild variant="ghost">
                <Link href="/games">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Games
                </Link>
            </Button>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Green Tech City Builder</CardTitle>
                        <CardDescription>Build a sustainable city by placing buildings on the grid.</CardDescription>
                    </CardHeader>
                    <CardContent className="bg-green-800/80 p-4 rounded-lg overflow-auto">
                        <div className="inline-block">{renderGrid()}</div>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>City Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2 text-lg"><DollarSign /> Budget:</span>
                            <span className="font-bold text-green-500">${budget}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2"><Users /> Population:</span>
                            <span className="font-bold">{population} / 500</span>
                        </div>
                         <Progress value={(population / 500) * 100} />

                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2"><Zap /> Power:</span>
                            <span className={cn("font-bold", power.generated < power.demand ? 'text-red-500': 'text-yellow-400')}>{power.generated} / {power.demand} MW</span>
                        </div>
                         <Progress value={(power.generated / (power.demand || 1)) * 100} className="[&>div]:bg-yellow-400" />
                        
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2"><Mountain /> Pollution:</span>
                            <span className={cn("font-bold", pollution > 20 ? 'text-red-500': 'text-green-400')}>{pollution} units</span>
                        </div>
                         <Progress value={(pollution / 40) * 100} className="[&>div]:bg-red-500" />
                    </CardContent>
                    <CardFooter>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Info className="h-4 w-4" /> Goal: 500 population, positive power, & under 20 pollution.</p>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Building Panel</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        {Object.entries(buildingTypes).map(([type, info]) => (
                            <Button key={type} variant={selectedBuilding === type ? 'default': 'outline'} className="h-20 flex-col" onClick={() => handleSelectBuilding(type as BuildingType)}>
                                <info.icon className="h-6 w-6 mb-1" />
                                <span>{info.name}</span>
                                <span className="text-xs text-muted-foreground">${info.cost}</span>
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>

        {quiz && (
            <Dialog open={!!quiz} onOpenChange={() => setQuiz(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Pop Quiz!</DialogTitle>
                        <DialogDescription>{quiz.question.question}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-2">
                        {quiz.question.options.map(option => (
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
