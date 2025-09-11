
'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import {
  sortableKeyboardCoordinates,
  arrayMove,
} from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { ArrowLeft, Lightbulb, CheckCircle, XCircle, Award } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ecoSlogans } from '@/lib/mock-data';

const Word = ({ word, id, isDragging }: { word: string; id: string, isDragging?: boolean }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data: { word },
    });
    
    const style = transform
        ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
        : {};

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={cn(
                'px-4 py-2 bg-accent text-accent-foreground rounded-lg shadow cursor-grab touch-none select-none',
                isDragging && 'opacity-50'
            )}
        >
            {word}
        </div>
    );
};

const DropZone = ({ children, id }: { children: React.ReactNode, id: string }) => {
    const { isOver, setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={cn(
                'min-h-[6rem] w-full bg-background rounded-lg border-2 border-dashed p-4 flex flex-wrap gap-2 items-center justify-center',
                isOver ? 'border-primary' : 'border-border'
            )}
        >
            {children}
        </div>
    );
};

const shuffleArray = <T,>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

export default function EcoSloganScramblePage() {
  const [sloganIndex, setSloganIndex] = useState(0);
  const [jumbledWords, setJumbledWords] = useState<{id: string, word: string}[]>([]);
  const [arrangedWords, setArrangedWords] = useState<{id: string, word: string}[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] =<'correct' | 'wrong' | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentSlogan = useMemo(() => ecoSlogans[sloganIndex], [sloganIndex]);

  useEffect(() => {
    if (isClient && currentSlogan) {
      const words = currentSlogan.split(' ').map((word, index) => ({ id: `jumbled-${word}-${index}`, word }));
      setJumbledWords(shuffleArray([...words]));
      setArrangedWords([]);
      setFeedback(null);
      setAttempts(0);
    }
  }, [sloganIndex, currentSlogan, isClient]);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { over, active } = event;

    if (!over) return;
    
    const activeWord = jumbledWords.find(w => w.id === active.id) || arrangedWords.find(w => w.id === active.id);

    if (!activeWord) return;

    // Moving from jumbled to arranged
    if (over.id === 'dropzone' && jumbledWords.some(w => w.id === active.id)) {
        setJumbledWords(prev => prev.filter(w => w.id !== active.id));
        setArrangedWords(prev => [...prev, activeWord]);
    } 
    // Moving from arranged back to jumbled
    else if (over.id === 'jumblezone' && arrangedWords.some(w => w.id === active.id)) {
        setArrangedWords(prev => prev.filter(w => w.id !== active.id));
        setJumbledWords(prev => [...prev, activeWord]);
    }
    // Reordering within the arranged zone
    else if (over.id === 'dropzone' && arrangedWords.some(w => w.id === active.id)) {
        const oldIndex = arrangedWords.findIndex(w => w.id === active.id);
        const overIndex = arrangedWords.findIndex(w => w.id === over.id);
        
        if (oldIndex !== overIndex) {
            setArrangedWords(prev => arrayMove(prev, oldIndex, overIndex));
        }
    }
  };

  const handleResetAttempt = () => {
    const words = currentSlogan.split(' ').map((word, index) => ({ id: `jumbled-${word}-${index}`, word }));
    setJumbledWords(shuffleArray([...words]));
    setArrangedWords([]);
  }

  const handleSubmit = () => {
    const userAnswer = arrangedWords.map(w => w.word).join(' ');
    if (userAnswer === currentSlogan) {
      setFeedback('correct');
    } else {
      setAttempts(prev => prev + 1);
      setFeedback('wrong');
    }
  };

  const handleNext = () => {
    if (sloganIndex < ecoSlogans.length - 1) {
      setSloganIndex(prev => prev + 1);
    } else {
      setIsGameOver(true);
      localStorage.setItem('game-eco-slogans-completed', 'true');
    }
  };

  if (!isClient) return null;
  
  if (isGameOver) {
      return (
         <div className="max-w-md mx-auto text-center">
            <Card>
                <CardHeader>
                    <div className="flex justify-center">
                        <Award className="h-16 w-16 text-yellow-500" />
                    </div>
                    <CardTitle className="text-2xl">Congratulations!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">You've successfully unscrambled all the slogans. You're an Eco-Hero!</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => { setSloganIndex(0); setIsGameOver(false); }} className="w-full">
                        Play Again
                    </Button>
                </CardFooter>
            </Card>
        </div>
      )
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className="max-w-2xl mx-auto">
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
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Lightbulb className="h-8 w-8 text-yellow-400" />
              Eco Slogan Scramble
            </CardTitle>
            <CardDescription>
              Arrange the words to form a correct environmental slogan. You have {3 - attempts} tries left.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <DropZone id="jumblezone">
                {jumbledWords.map(({id, word}) => (
                    <Word key={id} id={id} word={word} />
                ))}
                 {!jumbledWords.length && <p className="text-muted-foreground">Well done!</p>}
             </DropZone>
            
            <p className="text-center text-muted-foreground">Drag the words into the box below</p>
            
            <DropZone id="dropzone">
                {arrangedWords.map(({id, word}) => (
                   <Word key={id} id={id} word={word} />
                ))}
                {!arrangedWords.length && <p className="text-muted-foreground">Drop words here</p>}
            </DropZone>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button onClick={handleSubmit} className="w-full" disabled={feedback === 'correct' || attempts >= 3}>
              Check Slogan
            </Button>
            <Button onClick={handleResetAttempt} variant="outline" className="w-full">
              Reset
            </Button>
          </CardFooter>
        </Card>

        {feedback && (
          <Card className="mt-4">
            <CardContent className="p-6 text-center space-y-4">
              {feedback === 'correct' && (
                <>
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold text-green-500">Correct!</h3>
                  <Button onClick={handleNext} className="w-full">Next Slogan</Button>
                </>
              )}
              {feedback === 'wrong' && (
                <>
                  <XCircle className="h-12 w-12 text-red-500 mx-auto" />
                  <h3 className="text-2xl font-bold text-red-500">Not Quite!</h3>
                  {attempts < 3 ? (
                    <p>Try again! You have {3 - attempts} tries left.</p>
                  ) : (
                    <div className="space-y-4">
                        <p>You've used all your attempts. The correct slogan is:</p>
                        <p className="font-bold text-lg text-primary">"{currentSlogan}"</p>
                        <Button onClick={handleNext} className="w-full">Next Slogan</Button>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      <DragOverlay>
        {activeId ? <Word id="overlay" word={activeId.split('-')[1]} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
}
