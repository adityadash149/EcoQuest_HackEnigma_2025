import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { quizzes } from "@/lib/mock-data";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function QuizzesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Quizzes</h1>
        <p className="text-muted-foreground">
          Test your knowledge and see how much you've learned.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Link href={quiz.href} key={quiz.id}>
            <Card className="h-full hover:bg-card/80 transition-colors hover:shadow-lg">
                <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                        <div className="bg-accent/50 rounded-full p-3">
                          <quiz.icon className="h-8 w-8 text-accent-foreground" />
                        </div>
                        <Badge variant="secondary">{quiz.subject}</Badge>
                    </div>
                </CardHeader>
                <CardHeader className="pt-0">
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardDescription>{quiz.description}</CardDescription>
                </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
