import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  Leaf,
  Droplet,
  BookOpen,
  Atom,
  Users,
  Palette,
  Cpu,
  Newspaper,
  Trophy,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section>
        <Card className="w-full overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
              <h1 className="text-3xl md:text-5xl font-bold font-headline text-primary-foreground mb-4">
                Welcome back, Alex!
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                Ready to save the planet? Continue your journey and become an
                Eco Champion!
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg">
                  <Link href="/lessons">Continue Lesson</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/subjects">Explore Subjects</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <Image
                src="https://picsum.photos/seed/hero/800/600"
                alt="Boy cleaning the street illustration"
                fill
                className="object-cover"
                data-ai-hint="clean environment illustration"
              />
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eco-Points</CardTitle>
            <Leaf className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">+120 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
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
            <CardTitle className="text-sm font-medium">Last Played</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">Recycling Game</div>
            <p className="text-xs text-muted-foreground">
              Mastered on June 15
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
      </section>
    </div>
  );
}
