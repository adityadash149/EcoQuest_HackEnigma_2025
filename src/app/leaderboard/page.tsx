import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { schoolLeaderboard, classLeaderboard } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Leaderboard</h1>
        <p className="text-muted-foreground">
          See who is leading the charge in making our world greener!
        </p>
      </div>
      <Tabs defaultValue="class">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="class">Class Leaderboard</TabsTrigger>
          <TabsTrigger value="school">School Leaderboard</TabsTrigger>
        </TabsList>
        <TabsContent value="class">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Rank</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead className="text-right">Eco-Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classLeaderboard.map((entry) => (
                  <TableRow key={entry.rank}>
                    <TableCell className="font-medium text-lg">
                      <div className="flex items-center gap-2">
                        {entry.rank === 1 && <Crown className="h-5 w-5 text-yellow-500" />}
                        <span>{entry.rank}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={entry.avatar} alt={entry.name} data-ai-hint="student avatar" />
                          <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{entry.name}</p>
                          <p className="text-sm text-muted-foreground">{entry.school}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-bold text-lg text-primary">{entry.points.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </TabsContent>
        <TabsContent value="school">
        <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Rank</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead className="text-right">Total Eco-Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schoolLeaderboard.map((entry) => (
                  <TableRow key={entry.rank}>
                    <TableCell className="font-medium text-lg">
                      <div className="flex items-center gap-2">
                        {entry.rank === 1 && <Crown className="h-5 w-5 text-yellow-500" />}
                        <span>{entry.rank}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={entry.avatar} alt={entry.name} data-ai-hint="school logo"/>
                          <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{entry.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-bold text-lg text-primary">{entry.points.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
