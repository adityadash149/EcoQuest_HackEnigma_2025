export interface Scenario {
  scenarioTitle: string;
  scenarioDescription: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  explanation: string;
  animationUpdate: string;
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  description: string;
  gradeLevel: string;
  scenarios: Scenario[];
  image: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  subject: string;
  icon: any; // Lucide icon
  href: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  icon: any;
  href:string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  school: string;
}

export interface Ngo {
  id: string;
  name: string;
  city: string;
  website: string;
  image: string;
}

export interface ExternalGame {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface RecyclingItem {
    id: string;
    name: string;
    type: 'recycling' | 'compost' | 'trash' | 'hazardous';
}

export interface Bin {
    id: string;
    name: string;
    accepts: string[];
    icon: any;
}
