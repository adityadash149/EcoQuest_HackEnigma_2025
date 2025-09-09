
"use client";

import { useState } from 'react';
import { DndContext, useDraggable, useDroppable, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, XCircle, Trash2, Recycle, Leaf, HelpCircle } from 'lucide-react';
import { recyclingItems, bins as binData } from '@/lib/mock-data';
import type { RecyclingItem, Bin } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function Draggable({ item }: { item: RecyclingItem }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: item,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="touch-none">
      <Badge variant="outline" className="text-lg p-3 cursor-grab bg-card">
        {item.name}
      </Badge>
    </div>
  );
}

function Droppable({ bin, children }: { bin: Bin; children: React.ReactNode }) {
    const { isOver, setNodeRef } = useDroppable({
      id: bin.id,
      data: { type: 'bin', accepts: bin.accepts },
    });
  
    const Icon = bin.icon;

    return (
      <Card
        ref={setNodeRef}
        className={cn(
          'w-full h-64 border-2 border-dashed flex flex-col items-center justify-center transition-colors',
          isOver ? 'bg-accent border-accent-foreground' : ''
        )}
      >
        <Icon className="h-16 w-16 text-muted-foreground mb-4" />
        <CardTitle>{bin.name}</CardTitle>
        <div className="mt-4 p-4 space-y-2 w-full">{children}</div>
      </Card>
    );
  }

export default function RecyclingGamePage() {
  const [items, setItems] = useState(recyclingItems);
  const [droppedItems, setDroppedItems] = useState<{[key: string]: RecyclingItem[]}>({});
  const [feedback, setFeedback] = useState<{[key: string]: boolean | null}>({});

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over) {
        const item = items.find(i => i.id === active.id) as RecyclingItem;
        const binId = over.id as string;
        const binAccepts = over.data.current?.accepts as string[];

        const isCorrect = binAccepts.includes(item.type);

        setFeedback(prev => ({...prev, [item.id]: isCorrect}));
        
        setDroppedItems(prev => {
            const newDroppedItems = {...prev};
            if(!newDroppedItems[binId]) {
                newDroppedItems[binId] = [];
            }
            // remove from other bins if it exists
            Object.keys(newDroppedItems).forEach(key => {
                newDroppedItems[key] = newDroppedItems[key].filter(i => i.id !== item.id);
            })

            newDroppedItems[binId].push(item);
            return newDroppedItems;
        });

        setItems(prev => prev.filter(i => i.id !== active.id));
    }
  };

  const remainingItems = items.filter(item => !Object.values(droppedItems).flat().some(dropped => dropped.id === item.id));

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <div className="max-w-6xl mx-auto">
            <div className="mb-4">
                <Button asChild variant="ghost">
                    <Link href="/games">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Games
                    </Link>
                </Button>
            </div>
            <Card className="mb-8 text-center">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline flex items-center justify-center gap-2">
                        <Recycle className="h-8 w-8"/>
                        Recycling Game
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Drag and drop the items into the correct recycling bins.</p>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Items to Sort</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    {remainingItems.length > 0 ? remainingItems.map(item => <Draggable key={item.id} item={item} />) : <p className="text-muted-foreground">All items sorted!</p>}
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {binData.map(bin => (
                    <Droppable key={bin.id} bin={bin}>
                        <div className="space-y-2">
                        {droppedItems[bin.id]?.map(item => (
                             <div key={item.id} className="flex items-center justify-between bg-card p-2 rounded-md border">
                                <span>{item.name}</span>
                                {feedback[item.id] === true && <CheckCircle className="h-5 w-5 text-green-500" />}
                                {feedback[item.id] === false && <XCircle className="h-5 w-5 text-red-500" />}
                             </div>
                        ))}
                        </div>
                    </Droppable>
                ))}
            </div>
            {remainingItems.length === 0 && (
                <div className="text-center mt-8">
                    <h2 className="text-2xl font-bold text-primary">Well Done!</h2>
                    <p className="text-muted-foreground">You've sorted all the items. Great job for the environment!</p>
                    <Button onClick={() => window.location.reload()} className="mt-4">Play Again</Button>
                </div>
            )}
        </div>
    </DndContext>
  );
}
