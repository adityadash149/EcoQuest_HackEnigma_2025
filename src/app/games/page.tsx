import { Card, CardDescription, CardHeader, CardTitle, CardFooter, CardContent } from "@/components/ui/card";
import { games } from "@/lib/mock-data";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gamepad2 } from "lucide-react";
import Image from "next/image";

export default function GamesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline flex items-center gap-3">
          <Gamepad2 className="h-10 w-10 text-primary" />
          Games
        </h1>
        <p className="text-muted-foreground">
          Play and learn! Engage with interactive games to understand environmental concepts.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
            <Card key={game.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                        <div className="bg-accent/50 rounded-full p-3">
                          <game.icon className="h-8 w-8 text-accent-foreground" />
                        </div>
                        <Badge variant="secondary">{game.subject}</Badge>
                    </div>
                </CardHeader>
                <CardHeader className="pt-0">
                    <CardTitle>{game.title}</CardTitle>
                    <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                    <Button asChild className="w-full">
                        <Link href={game.href}>
                            Play Game <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
