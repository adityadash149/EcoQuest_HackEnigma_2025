
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Atom, Users, Cpu, Palette, BookCopy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const subjects = [
    {
        name: "Science",
        icon: Atom,
        topics: [
            { name: "Pollution", details: "Air, water, soil, noise" },
            { name: "Waste Management", details: "Reduce, reuse, recycle, composting", gameHref: "/games/recycling" },
            { name: "Climate Change", details: "Greenhouse gases, global warming, carbon footprint" },
        ]
    },
    {
        name: "Social Studies",
        icon: Users,
        topics: [
            { name: "Deforestation & Afforestation", details: "Learn about the importance of forests and how to restore them.", gameHref: "/games/tree-planting" },
            { name: "Water Conservation", details: "Saving water, rainwater harvesting, watershed management", gameHref: "/games/water-conservation" },
            { name: "Cultural Practices & Nature", details: "How traditions protect the environment" },
            { name: "Sustainable Development Goals (SDGs)", details: "" },
            { name: "Environmental Laws & Policies", details: "Clean India Mission, Paris Agreement basics" },
        ]
    },
    {
        name: "Technology / Computer Science",
        icon: Cpu,
        topics: [
            { name: "Green Technology", details: "EVs, solar panels, AI in climate prediction" },
        ]
    },
    {
        name: "Arts & Creativity",
        icon: Palette,
        topics: [
            { name: "Design posters on 'Save Earth'", details: "" },
            { name: "Create eco-slogans or short poems", details: "" },
        ]
    }
]

export default function SubjectsPage() {
  return (
    <div>
        <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline flex items-center gap-3">
                <BookCopy className="h-10 w-10 text-primary" />
                Subjects
            </h1>
            <p className="text-muted-foreground">
                Explore environmental topics across different subjects.
            </p>
        </div>

        <div className="space-y-6">
            {subjects.map((subject) => (
                <Card key={subject.name}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <div className="bg-accent/50 rounded-full p-3">
                                <subject.icon className="h-8 w-8 text-accent-foreground" />
                            </div>
                            <span className="text-2xl">{subject.name}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {subject.topics.map((topic, index) => (
                                <AccordionItem value={`item-${index}`} key={topic.name}>
                                    <AccordionTrigger className="text-lg font-semibold">{topic.name}</AccordionTrigger>
                                    <AccordionContent>
                                       <div className="space-y-4 pl-4">
                                            {topic.details ? (
                                                <p className="text-muted-foreground">{topic.details}</p>
                                            ) : (
                                                <p className="text-muted-foreground">Explore lessons and activities related to {topic.name}.</p>
                                            )}
                                            {topic.gameHref && (
                                                 <Button asChild>
                                                    <Link href={topic.gameHref}>
                                                        Play Game <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            )}
                                       </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
