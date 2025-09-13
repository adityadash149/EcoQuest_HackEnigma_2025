
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
  ArrowRight,
  Trophy,
} from 'lucide-react';
import { EcoQuestLogo } from '@/components/icons';
import { quotes, badges as allBadges } from '@/lib/mock-data';
import type { Quote } from '@/lib/types';
import { useUserData } from '@/hooks/use-user-data';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from '@/lib/utils';

export default function HomePage() {
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const { points, currentBadge } = useUserData();

  useEffect(() => {
    // Select a random quote on component mount (client-side)
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="space-y-8">
      <section className="relative w-full rounded-lg overflow-hidden border bg-black text-card-foreground shadow-sm min-h-[350px] md:min-h-[400px] flex flex-col justify-between p-6">
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
            <iframe 
                className="absolute top-1/2 left-1/2 w-full h-full min-w-[200%] min-h-[200%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                src="https://www.youtube.com/embed/k4sSo2csris?autoplay=1&mute=1&loop=1&playlist=k4sSo2csris&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&rel=0"
                frameBorder="0"
                allow="autoplay; encrypted-media"
            ></iframe>
            <div className="absolute inset-0 bg-black/50 z-10"></div>
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
            <blockquote className="border-l-4 border-primary bg-black/60 backdrop-blur-sm p-4 rounded-r-lg max-w-md">
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
                  <div className="text-2xl font-bold">{points}</div>
                   <p className="text-xs text-muted-foreground">
                    Your eco-journey score
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Badges
                  </CardTitle>
                  <Award className="h-4 w-4 text-accent-foreground" />
                </CardHeader>
                <CardContent>
                    <TooltipProvider>
                        <div className="flex items-center -space-x-2">
                            {allBadges.map(badge => {
                                const isEarned = points >= badge.minPoints;
                                return (
                                    <Tooltip key={badge.name}>
                                        <TooltipTrigger>
                                            <div
                                                className={cn(
                                                    'p-2 rounded-full bg-muted border-2 border-background transition-all',
                                                    !isEarned && 'grayscale opacity-60'
                                                )}
                                            >
                                                <badge.icon className="h-5 w-5" />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="font-semibold">{badge.name}</p>
                                            {!isEarned && <p className="text-xs text-muted-foreground">Unlock at {badge.minPoints} points</p>}
                                        </TooltipContent>
                                    </Tooltip>
                                );
                            })}
                        </div>
                    </TooltipProvider>
                     <p className="text-xs text-muted-foreground mt-1">
                        Current Badge: <span className="font-semibold">{currentBadge.name}</span>
                    </p>
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
