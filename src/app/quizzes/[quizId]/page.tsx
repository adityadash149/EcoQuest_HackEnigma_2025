
'use client';

import { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { quizzes } from '@/lib/mock-data';
import type { QuizQuestion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function QuizPage() {
  const params = useParams();
  const quizId = params.quizId as string;
  const quiz = quizzes.find((q) => q.id === quizId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) {
    notFound();
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getScore = () => {
    return quiz.questions.reduce((score, question, index) => {
      return selectedAnswers[index] === question.correctAnswer ? score + 1 : score;
    }, 0);
  };
  
  const score = getScore();

  if (submitted) {
    return (
        <div className="max-w-2xl mx-auto">
             <div className="mb-4">
                <Button asChild variant="ghost">
                    <Link href="/quizzes">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Quizzes
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Quiz Results</CardTitle>
                    <CardDescription>You scored {score} out of {quiz.questions.length}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {quiz.questions.map((question, index) => (
                        <div key={index}>
                            <h4 className="font-semibold">{index + 1}. {question.question}</h4>
                            <p className={`flex items-center gap-2 text-sm ${selectedAnswers[index] === question.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
                                {selectedAnswers[index] === question.correctAnswer ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                                Your answer: {selectedAnswers[index] || 'No answer'}
                            </p>
                            {selectedAnswers[index] !== question.correctAnswer && (
                                <p className="text-sm text-muted-foreground">Correct answer: {question.correctAnswer}</p>
                            )}
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button onClick={() => window.location.reload()} className="w-full">
                        Try Again
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
       <div className="mb-4">
        <Button asChild variant="ghost">
          <Link href="/quizzes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Quizzes
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{quiz.title}</CardTitle>
          <CardDescription>
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold text-lg mb-4">{currentQuestion.question}</h3>
          <RadioGroup
            value={selectedAnswers[currentQuestionIndex] || ''}
            onValueChange={(value) => handleAnswerSelect(currentQuestionIndex, value)}
            className="space-y-2"
          >
            {currentQuestion.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${currentQuestionIndex}-${option}`} />
                <Label htmlFor={`${currentQuestionIndex}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleBack} disabled={currentQuestionIndex === 0}>
            Back
          </Button>
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}