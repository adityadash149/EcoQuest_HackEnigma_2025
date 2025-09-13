
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { lessons } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LessonsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Lessons</h1>
        <p className="text-muted-foreground">
          Interactive, scenario-based learning about real-world environmental issues.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="flex flex-col overflow-hidden">
            <div className="relative h-48 w-full">
              {lesson.imageType === 'video' ? (
                 <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${lesson.id === 'amazon-fire-2024' ? 'tDOswhAUwKI' : '70G0kG1S_zE'}`}
                    title={lesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
              ) : (
                <Image
                    src={lesson.image}
                    alt={lesson.title}
                    fill
                    className="object-cover"
                    data-ai-hint="environmental topic"
                />
              )}
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="mb-1">{lesson.title}</CardTitle>
                    <CardDescription>{lesson.subject}</CardDescription>
                  </div>
                  <Badge variant="secondary">{lesson.gradeLevel}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{lesson.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/lessons/${lesson.id}`}>
                  Start Lesson <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
