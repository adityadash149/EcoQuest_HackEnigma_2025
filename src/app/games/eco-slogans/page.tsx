
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader, Lightbulb, ThumbsUp, ThumbsDown, Wand2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { evaluateSlogan, type EvaluateSloganOutput } from '@/ai/flows/evaluate-slogan';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

const topics = [
    'Deforestation',
    'Water Conservation',
    'Recycling',
    'Climate Change',
    'Plastic Pollution',
    'Renewable Energy',
];

export default function EcoSloganCreatorPage() {
  const [topic, setTopic] = useState(topics[0]);
  const [slogan, setSlogan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EvaluateSloganOutput | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!slogan.trim()) {
      toast({
        title: 'Slogan is empty',
        description: 'Please write a slogan before submitting.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const res = await evaluateSlogan({ topic, slogan });
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not evaluate the slogan. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNewTopic = () => {
    let newTopic = topic;
    while(newTopic === topic) {
        newTopic = topics[Math.floor(Math.random() * topics.length)];
    }
    setTopic(newTopic);
    setSlogan('');
    setResult(null);
  }

  return (
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
            Eco Slogan Creator
          </CardTitle>
          <CardDescription>
            Craft a catchy slogan for the topic: <span className="font-bold text-primary">{topic}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
            placeholder={`e.g., "Don't be a punk, recycle your junk!"`}
            className="text-lg"
            rows={3}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
            {isLoading ? <Loader className="animate-spin mr-2" /> : <Wand2 className="mr-2" />}
            Evaluate Slogan
          </Button>
          <Button onClick={handleNewTopic} variant="outline" className="w-full">
            Try Another Topic
          </Button>
        </CardFooter>
      </Card>

      {isLoading && (
        <Card className="mt-4">
          <CardContent className="p-6 flex items-center justify-center">
            <Loader className="animate-spin mr-4 h-8 w-8 text-primary" />
            <p className="text-muted-foreground">AI is thinking...</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="mt-4">
            <CardHeader>
                 <CardTitle className={cn("flex items-center gap-2", result.isGoodSlogan ? "text-green-600" : "text-red-500")}>
                    {result.isGoodSlogan ? <ThumbsUp /> : <ThumbsDown />}
                    AI Feedback
                </CardTitle>
            </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground italic">"{result.feedback}"</p>
            <div>
                <Label>Score: {result.score}/10</Label>
                <Progress value={result.score * 10} className={cn(result.isGoodSlogan ? "[&>div]:bg-green-500" : "[&>div]:bg-red-500")} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
