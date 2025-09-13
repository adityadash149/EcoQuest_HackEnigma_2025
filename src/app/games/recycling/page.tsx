
"use client";

import { useState, useMemo, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable, closestCenter, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Card, CardHeader, CardTitle, CardFooter, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, XCircle, Award } from 'lucide-react';
import { recyclingItems as initialItems, bins as binData } from '@/lib/mock-data';
import type { RecyclingItem, Bin } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useUserData } from '@/hooks/use-user-data';
import { useToast } from '@/hooks/use-toast';

const DraggableItem = ({ item, isDragging }: { item: RecyclingItem; isDragging?: boolean }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: item,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 10,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "touch-none cursor-grab px-3 py-1.5 bg-background text-foreground rounded-lg shadow-md hover:scale-105 transition-transform",
        isDragging && 'opacity-50'
      )}
    >
      <p className="text-sm font-medium select-none">{item.name}</p>
    </div>
  );
};

const DroppableBin = ({ bin, children, isOver }: { bin: Bin; children: React.ReactNode; isOver: boolean }) => {
  const { setNodeRef } = useDroppable({ id: bin.id, data: { type: 'bin', accepts: bin.accepts } });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'w-full min-h-[12rem] rounded-lg flex flex-col items-center p-4 transition-all duration-300',
        bin.color,
        isOver ? 'scale-105 shadow-2xl' : 'shadow-md'
      )}
    >
      <h3 className="text-white font-bold text-xl uppercase tracking-wider">{bin.name}</h3>
      <div className="mt-2 w-full h-full relative grid grid-cols-3 gap-2 items-start content-start">
        {children}
      </div>
    </div>
  );
};

const DroppedItemFeedback = ({ item, isCorrect }: { item: RecyclingItem, isCorrect: boolean | null }) => {
  return (
    <div className="relative bg-white/20 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
      <span>{item.name}</span>
      {isCorrect === true && <CheckCircle className="h-3 w-3 text-green-400" />}
      {isCorrect === false && <XCircle className="h-3 w-3 text-red-400" />}
    </div>
  )
}

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

export default function RecyclingGamePage() {
  const [items, setItems] = useState<RecyclingItem[]>([]);
  const [droppedItems, setDroppedItems] = useState<Record<string, RecyclingItem[]>>({});
  const [feedback, setFeedback] = useState<Record<string, boolean | null>>({});
  const [score, setScore] = useState(0);
  const [activeDragItem, setActiveDragItem] = useState<RecyclingItem | null>(null);
  const [overBinId, setOverBinId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);

  const { addPoints } = useUserData();
  const { toast } = useToast();
  const { setNodeRef: itemAreaRef } = useDroppable({ id: 'item-area' });

  useEffect(() => {
    setIsClient(true);
    setItems(shuffleArray(initialItems));
  }, []);
  
  const remainingItems = useMemo(() => items.filter(item => !Object.values(droppedItems).flat().some(dropped => dropped.id === item.id)), [items, droppedItems]);
  const gameFinished = remainingItems.length === 0 && Object.values(droppedItems).flat().length > 0;
  
  const allSortedCorrectly = useMemo(() => {
      if (!gameFinished) return false;
      return Object.values(feedback).every(f => f === true);
  }, [gameFinished, feedback]);

  useEffect(() => {
    if (gameFinished && !isGameComplete) {
      if (allSortedCorrectly) {
        addPoints(score);
        toast({ title: "Perfectly Sorted!", description: `You earned ${score} points!` });
        setIsGameComplete(true);
      }
    }
  }, [gameFinished, allSortedCorrectly, score, addPoints, toast, isGameComplete]);

  const handleDragStart = (event: any) => {
    const activeItem = items.find(i => i.id === event.active.id);
    if(activeItem) {
        setActiveDragItem(activeItem);
    }
  }

  const handleDragOver = (event: any) => {
    const { over } = event;
    setOverBinId(over ? over.id : null);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setActiveDragItem(null);
    setOverBinId(null);

    if (over && over.id !== 'item-area') {
      const item = items.find(i => i.id === active.id) as RecyclingItem;
      const binId = over.id as string;
      const binAccepts = over.data.current?.accepts as string[];

      const isCorrect = binAccepts.includes(item.type);

      setFeedback(prev => ({ ...prev, [item.id]: isCorrect }));

      if (isCorrect) {
        setScore(s => s + 10);
      } else {
        setScore(s => s > 0 ? s - 5 : 0);
      }

      setDroppedItems(prev => {
        const newDroppedItems = { ...prev };
        Object.keys(newDroppedItems).forEach(key => {
          newDroppedItems[key] = newDroppedItems[key].filter(i => i.id !== item.id);
        });

        if (!newDroppedItems[binId]) {
          newDroppedItems[binId] = [];
        }
        newDroppedItems[binId] = [...newDroppedItems[binId], item];
        return newDroppedItems;
      });
    } else { // Dragged back to the item area
        const item = items.find(i => i.id === active.id);
        if (!item) return;

        setDroppedItems(prev => {
            const newDroppedItems = { ...prev };
            Object.keys(newDroppedItems).forEach(key => {
              newDroppedItems[key] = newDroppedItems[key].filter(i => i.id !== item.id);
            });
            return newDroppedItems;
        });
        setFeedback(prev => {
            const newFeedback = {...prev};
            delete newFeedback[item.id];
            return newFeedback;
        })
    }
  };
  
  const handlePlayAgain = () => {
    setItems(shuffleArray(initialItems));
    setDroppedItems({});
    setFeedback({});
    setScore(0);
    setIsGameComplete(false);
  }
  
  if (!isClient) return null;

  if (isGameComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <div className="flex justify-center">
              <Award className="h-16 w-16 text-yellow-500" />
            </div>
            <CardTitle className="text-2xl">Great Job!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">You've sorted all the items correctly. You're a Recycling Pro!</p>
            <p className="text-4xl font-bold text-primary mb-6">{score} Points</p>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button onClick={handlePlayAgain} className="w-full">Play Again</Button>
            <Button asChild variant="ghost"><Link href="/games">Back to Games</Link></Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        <div className="flex justify-between items-center">
          <Button asChild variant="ghost">
            <Link href="/games">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Games
            </Link>
          </Button>
          <div className='text-right'>
            <p className="text-2xl font-bold text-primary">{score} Points</p>
            <p className="text-sm text-muted-foreground">{remainingItems.length} items left</p>
          </div>
        </div>

        <div 
          ref={itemAreaRef}
          className="relative min-h-[300px] w-full bg-green-200/50 dark:bg-green-900/30 rounded-lg p-4 border-2 border-dashed border-green-600/50 flex flex-wrap gap-4 items-center justify-center"
        >
          <h2 className="absolute top-4 left-4 text-lg font-bold text-green-800 dark:text-green-200">Drag Items from Here</h2>
            {remainingItems.map(item => (
              <DraggableItem key={item.id} item={item} />
            ))}
            {items.length > 0 && remainingItems.length === 0 && !isGameComplete && (
                <p className="text-2xl font-bold text-muted-foreground">All items sorted! Check your work below.</p>
            )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {binData.map(bin => (
            <DroppableBin key={bin.id} bin={bin} isOver={overBinId === bin.id}>
              {droppedItems[bin.id]?.map(item => (
                <DroppedItemFeedback key={item.id} item={item} isCorrect={gameFinished ? feedback[item.id] : null} />
              ))}
            </DroppableBin>
          ))}
        </div>
        
        {gameFinished && !allSortedCorrectly && (
             <Card className="border-red-500">
                <CardHeader>
                    <CardTitle className="text-red-500 flex items-center gap-2"><XCircle /> Not Quite!</CardTitle>
                    <p className="text-muted-foreground">Some items are in the wrong bin. Items with a red 'X' are incorrect. Try dragging them to the right bin!</p>
                </CardHeader>
            </Card>
        )}

      </div>

      <DragOverlay>
        {activeDragItem ? <DraggableItem item={activeDragItem} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
}
