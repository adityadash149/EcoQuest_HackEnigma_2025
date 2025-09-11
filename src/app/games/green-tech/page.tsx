
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
  Building2,
  DollarSign,
  Mountain,
  Users,
  Info,
  XCircle,
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
  DialogFooter,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const buildingTypes = {
    'solar': { icon: Sun, name: 'Solar Farm', cost: 1500, power: 25, pollution: -5, requires: [] },
    'wind': { icon: Wind, name: 'Wind Turbine', cost: 2000, power: 35, pollution: -8, requires: [] },
    'residential': { icon: Building, name: 'Residential Zone', cost: 1000, population: 100, powerDemand: 10, pollution: 5 },
    'commercial': { icon: Building2, name: 'Commercial Zone', cost: 1200, population: 50, powerDemand: 15, pollution: 8 },
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

const initialGridSize = 10;
const initialBudget = 12000;
const populationGoal = 700;
const pollutionMax = 25;

export default function GreenTechCityPage() {
  const [grid, setGrid] = useState<PlacedBuilding[]>([]);
  const [budget, setBudget] = useState(initialBudget);
  const [population, setPopulation] = useState(0);
  const [power, setPower] = useState({ generated: 0, demand: 0 });
  const [pollution, setPollution] = useState(0);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(null);
  const [quiz, setQuiz] = useState<{question: CityBuildingQuestion, onCorrect: () => void} | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  const [gameOverMessage, setGameOverMessage] = useState({title: '', description: ''});

  const { toast } = useToast();

  const cheapestBuildingCost = Math.min(...Object.values(buildingTypes).map(b => b.cost));

  const checkEndGameConditions = useCallback(() => {
    // Win condition
    if (population >= populationGoal && pollution < pollutionMax && power.generated >= power.demand) {
        setGameOverMessage({ title: 'Sustainable City Built!', description: "You've successfully built a thriving, green city. You're an Eco-Planner!" });
        setIsGameOver(true);
        localStorage.setItem('game-green-tech-completed', 'true');
        return;
    }

    // Lose condition
    if (budget < cheapestBuildingCost && !isGameOver) {
       setGameOverMessage({ title: 'Out of Funds!', description: "You've run out of budget before reaching the city's goals. Plan more carefully next time!" });
       setIsGameOver(true);
    }
  }, [population, pollution, power, budget, cheapestBuildingCost, isGameOver]);

  const calculateStats = useCallback(() => {
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
  }, [grid]);
  
  useEffect(() => {
    calculateStats();
  }, [grid, calculateStats]);

  useEffect(() => {
    // Check end game conditions after each stat update.
    checkEndGameConditions();
  }, [population, pollution, power.generated, power.demand, budget, checkEndGameConditions]);

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
    if ((grid.length + 1) % 4 === 0 && grid.length > 0) {
        const randomQuestion = cityBuildingQuestions[Math.floor(Math.random() * cityBuildingQuestions.length)];
        setQuiz({
            question: randomQuestion,
            onCorrect: () => setBudget(b => b + 1000)
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
        toast({ title: "Correct!", description: "You've earned a $1000 budget bonus!", variant: 'default'});
    } else {
        toast({ title: "Not quite!", description: "That's okay, let's keep building.", variant: 'destructive'});
    }
    setQuiz(null);
  }
  
  const resetGame = () => {
    setGrid([]);
    setBudget(initialBudget);
    setPopulation(0);
    setPower({ generated: 0, demand: 0 });
    setPollution(0);
    setSelectedBuilding(null);
    setQuiz(null);
    setIsGameOver(false);
    setGameOverMessage({title: '', description: ''});
    setIsWelcomeOpen(true);
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
      const isWin = gameOverMessage.title.includes('Sustainable');
      return (
        <div className="max-w-md mx-auto text-center">
            <Card>
                <CardHeader>
                    <div className="flex justify-center">
                        {isWin ? <Award className="h-16 w-16 text-yellow-500" /> : <XCircle className="h-16 w-16 text-red-500" />}
                    </div>
                    <CardTitle className="text-2xl">{gameOverMessage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">{gameOverMessage.description}</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={resetGame} className="w-full">
                        Play Again
                    </Button>
                </CardFooter>
            </Card>
        </div>
      )
  }

  return (
    <div className="max-w-7xl mx-auto">
        <Dialog open={isWelcomeOpen} onOpenChange={setIsWelcomeOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">Welcome to Green Tech City Builder!</DialogTitle>
                    <DialogDescription className="text-base py-4 space-y-2">
                        <p>Your mission is to build a sustainable city. You'll need to balance budget, population growth, power needs, and pollution.</p>
                        <p><strong>Goal:</strong> Reach a population of <strong>{populationGoal}</strong>, keep pollution below <strong>{pollutionMax}</strong>, and generate enough power for your citizens!</p>
                        <p>Select buildings from the panel and place them on the grid. Keep an eye on your stats, and answer pop quizzes correctly for budget boosts. Good luck, Eco-Planner!</p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => setIsWelcomeOpen(false)}>Let's Build!</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

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
                        <div className="p-3 bg-blue-900/10 rounded-lg border border-blue-500/20 text-center">
                            <p className="font-bold text-blue-300">GOAL</p>
                            <p className="text-sm text-muted-foreground">
                                Pop: {populationGoal} | Power: Positive | Pollution: &lt; {pollutionMax}
                            </p>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2 text-lg"><DollarSign /> Budget:</span>
                            <span className="font-bold text-green-500">${budget}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2"><Users /> Population:</span>
                            <span className="font-bold">{population} / {populationGoal}</span>
                        </div>
                         <Progress value={(population / populationGoal) * 100} />

                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2"><Zap /> Power:</span>
                            <span className={cn("font-bold", power.generated < power.demand ? 'text-red-500': 'text-yellow-400')}>{power.generated} / {power.demand} MW</span>
                        </div>
                         <Progress value={(power.generated / (power.demand || 1)) * 100} className="[&>div]:bg-yellow-400" />
                        
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2"><Mountain /> Pollution:</span>
                            <span className={cn("font-bold", pollution > pollutionMax ? 'text-red-500': 'text-green-400')}>{pollution} / {pollutionMax}</span>
                        </div>
                         <Progress value={(pollution / (pollutionMax * 1.5)) * 100} className="[&>div]:bg-red-500" />
                    </CardContent>
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
