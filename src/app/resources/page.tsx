
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { externalGames } from "@/lib/mock-data";
import { MapPin, Search, ArrowRight, BookHeart, Loader, Sprout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { findNearbyNgos } from '@/ai/flows/find-nearby-ngos';
import { useToast } from '@/hooks/use-toast';

interface Ngo {
  name: string;
  address: string;
  description: string;
}

export default function ResourcesPage() {
  const [filteredNgos, setFilteredNgos] = useState<Ngo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!navigator.geolocation) {
      toast({
        title: 'Geolocation Not Supported',
        description: 'Your browser does not support geolocation.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    setFilteredNgos([]);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const result = await findNearbyNgos({ location: `${latitude},${longitude}` });
          if (result.ngos && result.ngos.length > 0) {
            setFilteredNgos(result.ngos);
          } else {
            toast({ title: 'No Results', description: 'Could not find any environmental clubs or centers near you.', variant: 'default' });
          }
        } catch (error) {
          console.error("Failed to find NGOs:", error);
          toast({ title: 'Error', description: 'Could not fetch information. Please try again.', variant: 'destructive' });
          setFilteredNgos([]);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        toast({
          title: 'Location Error',
          description: 'Could not retrieve your location. Please ensure location services are enabled.',
          variant: 'destructive',
        });
        setFilteredNgos([]);
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="space-y-12">
      <section>
        <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline flex items-center gap-2">
                <Sprout className="w-10 h-10 text-primary" />
                <span>Environmental Club Finder</span>
            </h1>
            <p className="text-muted-foreground">
                Find nearby environmental clubs, exhibition centers, and earth-friendly places.
            </p>
        </div>
        <div className="max-w-xl">
            <div className="flex gap-2 mb-8">
                <Button size="lg" className="h-12 w-full text-lg" onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? <Loader className="mr-2 h-5 w-5 animate-spin" /> : <MapPin className="mr-2 h-5 w-5" />}
                    Find Clubs Near Me
                </Button>
            </div>
        </div>

        {isLoading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <div className="h-40 w-full bg-muted rounded-t-lg" />
                        <CardHeader>
                            <div className="h-6 w-3/4 bg-muted rounded" />
                            <div className="h-4 w-full bg-muted rounded" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-4 w-5/6 bg-muted rounded" />
                        </CardContent>
                        <CardFooter>
                            <div className="h-10 w-full bg-muted rounded" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        )}

        {!isLoading && hasSearched && filteredNgos.length === 0 && (
            <Card className="mt-6">
                <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">No organizations found near you. Try searching in a larger city.</p>
                </CardContent>
            </Card>
        )}

        {!isLoading && filteredNgos.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredNgos.map((ngo, index) => {
                    const mapQuery = encodeURIComponent(`${ngo.name}, ${ngo.address}`);
                    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
                    const embedMapUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed&z=15&t=k`;
                    return (
                        <Card key={index} className="flex flex-col overflow-hidden">
                            <div className="relative h-48 w-full">
                                <iframe
                                    className="absolute inset-0 w-full h-full border-0"
                                    loading="lazy"
                                    allowFullScreen
                                    src={embedMapUrl}>
                                </iframe>
                            </div>
                            <CardHeader>
                                <CardTitle>{ngo.name}</CardTitle>
                                <CardDescription className="flex items-start gap-1"><MapPin className="h-4 w-4 mt-1 shrink-0" /> {ngo.address}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground">{ngo.description}</p>
                            </CardContent>
                            <CardFooter>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href={mapUrl} target="_blank">
                                        Visit <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        )}
      </section>

      <section>
        <div className="mb-8">
            <h2 className="text-3xl font-bold font-headline">External Educational Games</h2>
            <p className="text-muted-foreground">
                Explore more fun learning resources from our partners.
            </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {externalGames.map((game) => (
             <Card key={game.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-40 w-full">
                    <Image src={game.image} alt={game.title} fill className="object-cover" data-ai-hint="educational game" />
                </div>
                <CardHeader>
                    <CardTitle>{game.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">{game.description}</p>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href={game.href} target="_blank">
                            Play Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
