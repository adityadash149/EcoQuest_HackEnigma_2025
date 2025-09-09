import {
  BookOpen,
  Recycle,
  TreePine,
  Droplet,
  Factory,
  Lightbulb,
  Paintbrush,
  Calendar,
  Award,
  Users,
} from 'lucide-react';
import type {
  Lesson,
  Game,
  Quiz,
  LeaderboardEntry,
  Ngo,
  ExternalGame,
} from './types';

export const lessons: Lesson[] = [
  {
    id: 'amazon-fire-2024',
    title: 'The Amazon Rainforest Fire',
    subject: 'Science',
    description: 'Explore the causes and effects of the 2024 Amazon rainforest fire and learn how to prevent such disasters.',
    gradeLevel: 'Middle School',
    image: 'https://picsum.photos/600/400',
    scenarios: [
      {
        scenarioTitle: 'The Spark',
        scenarioDescription: 'A prolonged drought has left the Amazon rainforest incredibly dry. A farmer decides to clear a small patch of land for agriculture using the traditional "slash-and-burn" method. A sudden gust of wind carries embers to the parched forest.',
        question: 'What is the most immediate action to prevent a large-scale fire?',
        correctAnswer: 'Establish wider firebreaks around agricultural zones.',
        incorrectAnswers: [
          'Wait for the rainy season to start.',
          'Ban all farming activities in the region.',
          'Start a backfire without professional supervision.',
        ],
        explanation: 'Creating firebreaks (gaps in vegetation) is a crucial preventative measure that can contain the spread of fires from agricultural areas to the forest, especially during dry seasons. Banning all farming is not feasible for local economies, and waiting for rain is too risky.',
        animationUpdate: 'A green buffer zone appears, stopping the fire from spreading.',
      },
      {
        scenarioTitle: 'The Response',
        scenarioDescription: 'The fire has now spread to a significant area, threatening local wildlife and indigenous communities. Emergency services are overwhelmed. An international aid organization offers help.',
        question: 'What is the most effective use of international aid in this situation?',
        correctAnswer: 'Deploying firefighting aircraft and providing satellite imagery.',
        incorrectAnswers: [
          'Sending volunteers with buckets.',
          'Donating bottled water.',
          'Organizing a fundraising concert.',
        ],
        explanation: 'Advanced technology like firefighting aircraft and satellite imagery for monitoring fire movement are the most effective tools for combating large-scale wildfires. While well-intentioned, other efforts are less impactful for immediate containment.',
        animationUpdate: 'An airplane flies over, dropping water and reducing the flames.',
      },
      {
        scenarioTitle: 'The Aftermath & Reforestation',
        scenarioDescription: 'The fire is finally under control, but a vast area of the rainforest has been destroyed. The ecosystem is fragile, and the land is barren.',
        question: 'What is the best approach for long-term recovery of the forest?',
        correctAnswer: 'Planting a diverse range of native tree species.',
        incorrectAnswers: [
          'Building a theme park to boost tourism.',
          'Planting only fast-growing, non-native trees.',
          'Leaving the area completely untouched forever.',
        ],
        explanation: 'Reforestation with a variety of native species is essential to restore biodiversity and create a resilient ecosystem. Monocultures of non-native trees can harm the local environment, and while natural regeneration is part of the process, active planting is needed for large-scale damage.',
        animationUpdate: 'Small, diverse saplings begin to grow in the burnt area.',
      },
    ],
  },
  {
    id: 'ocean-plastic',
    title: 'Plastic Pollution in Our Oceans',
    subject: 'Social Studies',
    description: 'Understand the journey of plastic from our homes to the ocean and its impact on marine life.',
    gradeLevel: 'Elementary',
    image: 'https://picsum.photos/600/400',
    scenarios: [],
  },
];

export const games: Game[] = [
  { id: 'recycling', title: 'Recycling Game', description: 'Drag & drop waste into the correct bins.', subject: 'Science', icon: Recycle, href: '/games' },
  { id: 'tree-planting', title: 'Tree Planting Game', description: 'Dig, seed, water, and watch it grow!', subject: 'Social Studies', icon: TreePine, href: '/games' },
  { id: 'water-conservation', title: 'Water Conservation', description: 'Tap to close leaks and collect rainwater.', subject: 'Science', icon: Droplet, href: '/games' },
  { id: 'pollution-control', title: 'Pollution Control', description: 'Upgrade factories to reduce smoke.', subject: 'Technology', icon: Factory, href: '/games' },
  { id: 'green-tech', title: 'Green Tech Game', description: 'Choose between EVs, solar panels, etc.', subject: 'Technology', icon: Lightbulb, href: '/games' },
  { id: 'poster-creator', title: 'Poster Creator', description: 'Design posters for environmental awareness.', subject: 'Arts', icon: Paintbrush, href: '/games' },
];

export const quizzes: Quiz[] = [
  { id: 'earth-day', title: 'Earth Day Special', description: 'Test your knowledge on this important day.', subject: 'Current Affairs', icon: Calendar, href: '/quizzes' },
  { id: 'green-awards', title: 'Environmental Awards', description: 'Learn about the Nobel prizes of green work.', subject: 'Current Affairs', icon: Award, href: '/quizzes' },
  { id: 'eco-activists', title: 'Famous Activists', description: 'Who are the heroes of the eco-movement?', subject: 'Social Studies', icon: Users, href: '/quizzes' },
];

export const schoolLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Greenwood High', avatar: 'https://picsum.photos/40/40', points: 15400, school: 'Greenwood High' },
  { rank: 2, name: 'Riverside Academy', avatar: 'https://picsum.photos/41/41', points: 12800, school: 'Riverside Academy' },
  { rank: 3, name: 'Oakridge International', avatar: 'https://picsum.photos/42/42', points: 11950, school: 'Oakridge International' },
  { rank: 4, name: 'Valley Public School', avatar: 'https://picsum.photos/43/43', points: 9800, school: 'Valley Public School' },
];

export const classLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Emily', avatar: 'https://picsum.photos/44/44', points: 1850, school: 'Greenwood High' },
  { rank: 2, name: 'David', avatar: 'https://picsum.photos/45/45', points: 1720, school: 'Greenwood High' },
  { rank: 3, name: 'Sophia', avatar: 'https://picsum.photos/46/46', points: 1680, school: 'Greenwood High' },
  { rank: 4, name: 'James', avatar: 'https://picsum.photos/47/47', points: 1500, school: 'Greenwood High' },
  { rank: 5, name: 'Alex', avatar: 'https://picsum.photos/40/40', points: 1250, school: 'Greenwood High' },
];


export const ngos: Ngo[] = [
    { id: '1', name: 'Books for All', city: 'New York', website: '#', image: 'https://picsum.photos/300/200' },
    { id: '2', name: 'Readers Future', city: 'London', website: '#', image: 'https://picsum.photos/301/200' },
    { id: '3', name: 'The Book Bridge', city: 'Toronto', website: '#', image: 'https://picsum.photos/300/201' },
];

export const externalGames: ExternalGame[] = [
    { id: '1', title: 'NASA Climate Kids', description: 'Play games and learn about Earth\'s climate.', href: '#', image: 'https://picsum.photos/302/200' },
    { id: '2', title: 'National Geographic Kids', description: 'Explore the world with fun games and quizzes.', href: '#', image: 'https://picsum.photos/300/202' },
    { id: '3', title: 'PBS Kids Nature Games', description: 'Go on adventures with your favorite characters.', href: '#', image: 'https://picsum.photos/302/202' },
]
