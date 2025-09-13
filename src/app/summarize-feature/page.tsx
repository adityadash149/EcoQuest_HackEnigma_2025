
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wrench } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FeatureUnderDevelopmentPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <Card className="max-w-md mx-auto text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Wrench className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl">Feature Under Development</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Our team is working hard to bring this feature to you. Please check back later!
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.back()} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
