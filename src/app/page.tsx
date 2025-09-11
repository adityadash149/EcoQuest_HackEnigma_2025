
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  Leaf,
  Droplet,
  BookOpen,
  ArrowRight,
  Trophy,
} from 'lucide-react';
import { EcoQuestLogo } from '@/components/icons';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="relative w-full rounded-lg overflow-hidden border bg-card text-card-foreground shadow-sm">
        <div className="absolute inset-0 h-full w-full">
          <Image
            src="https://picsum.photos/seed/hero-bg/1200/400"
            alt="Lush green forest"
            fill
            className="object-cover"
            data-ai-hint="lush forest background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20 md:bg-gradient-to-r md:from-background/90 md:to-transparent" />
        </div>
        <div className="relative p-6 md:p-10 flex flex-col justify-center min-h-[300px] md:w-3/5 lg:w-1/2">
          <div className="flex items-center gap-3 mb-4">
            <EcoQuestLogo className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline">
              EcoQuest
            </h1>
          </div>
          <blockquote className="border-l-4 border-primary pl-4">
            <p className="text-lg italic text-foreground/80">
              "The Earth is what we all have in common."
            </p>
            <footer className="text-sm text-muted-foreground mt-2">
              — Wendell Berry
            </footer>
          </blockquote>
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
                  <div className="text-2xl font-bold">1,250</div>
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
