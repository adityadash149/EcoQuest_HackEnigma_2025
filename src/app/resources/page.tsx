
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ngos as allNgos, externalGames } from "@/lib/mock-data";
import { MapPin, Search, ArrowRight, BookHeart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Ngo } from '@/lib/types';

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNgos, setFilteredNgos] = useState<Ngo[]>(allNgos);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
    if (!searchQuery.trim()) {
      setFilteredNgos(allNgos);
      return;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    const results = allNgos.filter(ngo => 
        ngo.city.toLowerCase().includes(lowerCaseQuery) || 
        ngo.address.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredNgos(results);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className="space-y-12">
      <section>
        <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline flex items-center gap-2">
                <BookHeart className="w-10 h-10 text-primary" />
                <span>NGO Book Donation Finder</span>
            </h1>
            <p className="text-muted-foreground">
                Find nearby NGOs to donate books and support education.
            </p>
        </div>
        <div className="max-w-xl">
            <div className="flex gap-2 mb-8">
                <div className="relative flex-grow">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Enter your city or zip code" 
                        className="pl-10 h-12 text-lg" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <Button size="lg" className="h-12" onClick={handleSearch}>
                    <Search className="mr-2 h-5 w-5" />
                    Find
                </Button>
            </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNgos.map((ngo) => {
            const mapQuery = encodeURIComponent(`${ngo.name}, ${ngo.address}`);
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
            return (
                <Card key={ngo.id} className="flex flex-col overflow-hidden">
                    <div className="relative h-40 w-full">
                        <Image src={ngo.image} alt={ngo.name} fill className="object-cover" data-ai-hint="charity organization" />
                    </div>
                    <CardHeader>
                        <CardTitle>{ngo.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {ngo.address}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        {/* Add a short description if available */}
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
        {hasSearched && filteredNgos.length === 0 && (
            <Card className="mt-6">
                <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">No NGOs found for your search. Please try a different city or zip code.</p>
                </CardContent>
            </Card>
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
