import { lessons } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import { LessonPlayer } from '@/components/lesson-player';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LessonPage({ params }: { params: { lessonId: string } }) {
  const lesson = lessons.find((l) => l.id === params.lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
        <div className="mb-4">
            <Button asChild variant="ghost">
                <Link href="/lessons">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Lessons
                </Link>
            </Button>
        </div>
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-headline">{lesson.title}</CardTitle>
              <CardDescription>{lesson.subject}</CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">{lesson.gradeLevel}</Badge>
          </div>
        </CardHeader>
      </Card>
      <LessonPlayer lesson={lesson} />
    </div>
  );
}
