
"use client";

import { useState, useMemo, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, XCircle, Award } from 'lucide-react';
import { recyclingItems as initialItems, bins as binData } from '@/lib/mock-data';
import type { RecyclingItem, Bin } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

const DraggableItem = ({ item, isDropped, isCorrect }: { item: RecyclingItem; isDropped: boolean; isCorrect: boolean | null }) => {
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
  
  const [position, setPosition] = useState<{ top: string; left: string } | null>(null);

  useEffect(() => {
    // Only set random position on client-side to avoid hydration mismatch
    setPosition({
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
    });
  }, []);

  if (isDropped || !position) return null;

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, position: 'absolute', top: position.top, left: position.left }}
      {...listeners}
      {...attributes}
      className="touch-none cursor-grab"
    >
      <div className="relative group">
        <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-lg shadow-md hover:scale-110 transition-transform" data-ai-hint="recyclable item" />
        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-white text-xs text-center font-bold">{item.name}</p>
        </div>
      </div>
    </div>
  );
};

const DroppableBin = ({ bin, children, isOver }: { bin: Bin; children: React.ReactNode; isOver: boolean }) => {
  const { setNodeRef } = useDroppable({ id: bin.id, data: { type: 'bin', accepts: bin.accepts } });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'w-full h-48 rounded-lg flex flex-col items-center justify-end p-4 transition-all duration-300',
        bin.color,
        isOver ? 'scale-105 shadow-2xl' : 'shadow-md'
      )}
    >
      <h3 className="text-white font-bold text-xl uppercase tracking-wider">{bin.name}</h3>
      <div className="mt-2 w-full h-full relative">{children}</div>
    </div>
  );
};

const DroppedItemFeedback = ({ item, isCorrect }: {item: RecyclingItem, isCorrect: boolean | null}) => {
    return (
        <div className="relative w-10 h-10 -ml-2 first:ml-0">
            <Image src={item.image} alt={item.name} width={40} height={40} className="rounded-full border-2 border-white" data-ai-hint="sorted item" />
            {isCorrect === true && <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-green-400 bg-white rounded-full" />}
            {isCorrect === false && <XCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-red-500 bg-white rounded-full" />}
        </div>
    )
}

export default function RecyclingGamePage() {
  const [items, setItems] = useState(initialItems);
  const [droppedItems, setDroppedItems] = useState<Record<string, RecyclingItem[]>>({});
  const [feedback, setFeedback] = useState<Record<string, boolean | null>>({});
  const [score, setScore] = useState(0);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [overBinId, setOverBinId] = useState<string | null>(null);

  const remainingItems = useMemo(() => items.filter(item => !Object.values(droppedItems).flat().some(dropped => dropped.id === item.id)), [items, droppedItems]);
  const isGameComplete = remainingItems.length === 0;

  const handleDragStart = (event: any) => {
    setActiveDragId(event.active.id);
  }

  const handleDragOver = (event: any) => {
    const { over } = event;
    setOverBinId(over ? over.id : null);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setActiveDragId(null);
    setOverBinId(null);

    if (over) {
      const item = items.find(i => i.id === active.id) as RecyclingItem;
      const binId = over.id as string;
      const binAccepts = over.data.current?.accepts as string[];

      const isCorrect = binAccepts.includes(item.type);

      setFeedback(prev => ({ ...prev, [item.id]: isCorrect }));

      if(isCorrect) {
          setScore(s => s + 10);
      } else {
          setScore(s => s > 0 ? s - 5: 0);
      }

      setDroppedItems(prev => {
        const newDroppedItems = { ...prev };
        // Ensure bin array exists
        if (!newDroppedItems[binId]) {
          newDroppedItems[binId] = [];
        }
        
        // Remove item from any bin it might already be in
        Object.keys(newDroppedItems).forEach(key => {
            newDroppedItems[key] = newDroppedItems[key].filter(i => i.id !== item.id);
        });
        
        // Add item to the new bin
        newDroppedItems[binId] = [...newDroppedItems[binId], item];
        
        return newDroppedItems;
      });
    }
  };

  const handlePlayAgain = () => {
    setItems(initialItems);
    setDroppedItems({});
    setFeedback({});
    setScore(0);
  }
  
  if (isGameComplete) {
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
                    <CardTitle className="text-2xl">Great Job!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">You've sorted all the items. You're an Eco-Hero!</p>
                    <p className="text-4xl font-bold text-primary mb-6">{score} Points</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={handlePlayAgain} className="w-full">
                        Play Again
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-4 flex justify-between items-center">
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
        
        <div className="relative h-[500px] w-full bg-green-200/50 dark:bg-green-900/30 rounded-lg mb-8 p-4 border-2 border-dashed border-green-600/50">
            <h2 className="text-center text-lg font-bold text-green-800 dark:text-green-200 mb-4">Drag Items from Here</h2>
            {items.map(item => (
                <DraggableItem 
                    key={item.id} 
                    item={item} 
                    isDropped={Object.values(droppedItems).flat().some(i => i.id === item.id)}
                    isCorrect={feedback[item.id]}
                />
            ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {binData.map(bin => (
            <DroppableBin key={bin.id} bin={bin} isOver={overBinId === bin.id}>
               <div className="flex flex-wrap items-center justify-center p-2 rounded-md h-full w-full">
                {droppedItems[bin.id]?.map(item => (
                  <DroppedItemFeedback key={item.id} item={item} isCorrect={feedback[item.id]} />
                ))}
              </div>
            </DroppableBin>
          ))}
        </div>
      </div>
    </DndContext>
  );
}
