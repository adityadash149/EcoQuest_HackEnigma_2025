
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Award,
  Leaf,
  Droplet,
  BookOpen,
  ArrowRight,
  Trophy,
  Cloud,
} from 'lucide-react';
import { EcoQuestLogo } from '@/components/icons';
import { quotes } from '@/lib/mock-data';
import type { Quote } from '@/lib/types';
import Image from 'next/image';


export default function HomePage() {
  const ecoPoints = 1250;
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);

  useEffect(() => {
    // Select a random quote on component mount (client-side)
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="space-y-8">
      <section className="relative w-full rounded-lg overflow-hidden border bg-sky-200 dark:bg-sky-900/50 text-card-foreground shadow-sm min-h-[350px] md:min-h-[400px] flex flex-col justify-between p-6">
        {/* Animated Cloud Background */}
        <div className="absolute inset-0 z-0 opacity-80">
            <Cloud className="absolute top-16 left-1/4 h-16 w-24 text-white/80 animate-cloud-slow" />
            <Cloud className="absolute top-24 left-3/4 h-20 w-32 text-white/70 animate-cloud-fast" />
            <Cloud className="absolute top-5 left-1/2 h-12 w-20 text-white/90 animate-cloud-medium" />
            <Cloud className="absolute bottom-16 left-1/3 h-16 w-24 text-white/60 animate-cloud-medium" style={{animationDelay: '8s'}} />
            <Cloud className="absolute bottom-24 left-2/3 h-20 w-32 text-white/50 animate-cloud-slow" style={{animationDelay: '15s'}} />
        </div>
        
        {/* Foreground Content */}
        <div className="relative z-10 text-left">
          <div className="flex items-center gap-3 mb-4">
            <EcoQuestLogo className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-white drop-shadow-lg">
              EcoQuest
            </h1>
          </div>
          {randomQuote && (
            <blockquote className="border-l-4 border-primary bg-black/50 backdrop-blur-sm p-4 rounded-r-lg max-w-md">
              <p className="text-lg italic text-white/90">
                "{randomQuote.text}"
              </p>
              <footer className="text-sm text-white/70 mt-2">
                — {randomQuote.author}
              </footer>
            </blockquote>
          )}
        </div>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Welcome back, Alex!</CardTitle>
            <CardDescription>
              Ready to save the planet? Continue your journey and become an Eco
              Champion!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Eco-Points
                  </CardTitle>
                  <Leaf className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{ecoPoints}</div>
                  <p className="text-xs text-muted-foreground">
                    +120 this month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Badges Earned
                  </CardTitle>
                  <Award className="h-4 w-4 text-accent-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex -space-x-2">
                    <Badge
                      variant="default"
                      className="rounded-full p-2 border-2 border-background"
                    >
                      <Leaf className="h-4 w-4" />
                    </Badge>
                    <Badge
                      variant="default"
                      className="rounded-full p-2 border-2 border-background"
                    >
                      <Droplet className="h-4 w-4" />
                    </Badge>
                    <Badge
                      variant="default"
                      className="rounded-full p-2 border-2 border-background"
                    >
                      <BookOpen className="h-4 w-4" />
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">3 badges total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Leaderboard Rank
                  </CardTitle>
                  <Trophy className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">#5</div>
                  <p className="text-xs text-muted-foreground">In your class</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col justify-center items-center bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors">
                <CardContent className="pt-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">
                    Continue Your Quest
                  </h3>
                  <Button asChild>
                    <Link href="/lessons">
                      Latest Lesson <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
