import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { games } from "@/lib/mock-data";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function GamesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Games</h1>
        <p className="text-muted-foreground">
          Play and learn! Earn Eco-Points by completing fun challenges.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Link href={game.href} key={game.id}>
            <Card className="h-full hover:bg-card/80 transition-colors hover:shadow-lg">
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
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
