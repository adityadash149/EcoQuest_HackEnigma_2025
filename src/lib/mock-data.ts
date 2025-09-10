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
  Trash2,
  Leaf,
  HelpCircle,
  Gamepad2,
} from 'lucide-react';
import type {
  Lesson,
  Game,
  Quiz,
  LeaderboardEntry,
  Ngo,
  ExternalGame,
  RecyclingItem,
  Bin,
  QuizQuestion,
} from './types';

export const lessons: Lesson[] = [
  {
    id: 'amazon-fire-2024',
    title: 'The Amazon Rainforest Fire',
    subject: 'Science',
    description: 'Explore the causes and effects of the 2024 Amazon rainforest fire and learn how to prevent such disasters.',
    gradeLevel: 'Middle School',
    image: 'https://picsum.photos/seed/lesson1/600/400',
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
    image: 'https://picsum.photos/seed/lesson2/600/400',
    scenarios: [
      {
        scenarioTitle: 'A Day at the Beach',
        scenarioDescription: 'You and your family are having a picnic at the beach. When it\'s time to go, you see a plastic bottle, a plastic bag, and an apple core left on the sand.',
        question: 'What should you do with the plastic items to protect the ocean?',
        correctAnswer: 'Pick them up and put them in a recycling bin.',
        incorrectAnswers: [
          'Leave them on the beach, the waves will wash them away.',
          'Bury them in the sand.',
          'Throw them into the ocean for the fish to play with.',
        ],
        explanation: 'Plastic left on the beach can be washed into the ocean, where it harms marine animals. Recycling plastic allows it to be made into new things! The apple core can be composted.',
        animationUpdate: 'The beach becomes clean and the plastic bottle appears in a recycling bin.',
      },
      {
        scenarioTitle: 'A Turtle\'s Trouble',
        scenarioDescription: 'In the ocean, a sea turtle sees a floating plastic bag. It looks a lot like a jellyfish, which is the turtle\'s favorite food.',
        question: 'What is the danger for the sea turtle?',
        correctAnswer: 'The turtle might eat the bag and get very sick.',
        incorrectAnswers: [
          'The turtle will get a fun new toy to play with.',
          'The plastic bag will give the turtle superpowers.',
          'The bag will help the turtle float.',
        ],
        explanation: 'Sea turtles and other marine animals often mistake plastic bags for food. Eating plastic can make them very sick and block their stomachs, which is very dangerous for them.',
        animationUpdate: 'The plastic bag disappears and a jellyfish swims by. The turtle happily eats the jellyfish.',
      },
      {
        scenarioTitle: 'The Solution at Home',
        scenarioDescription: 'You are at the grocery store with your parent. You see them choosing between buying water in a plastic bottle or using a reusable water bottle from home.',
        question: 'What is the best choice to help reduce ocean plastic?',
        correctAnswer: 'Use a reusable water bottle.',
        incorrectAnswers: [
          'Buy the plastic bottle, it\'s easier.',
          'Drink water directly from the store\'s fountain.',
          'Ask for a paper bag for the plastic bottle.',
        ],
        explanation: 'Using a reusable bottle is the best way to reduce the amount of new plastic we create. The less plastic we use, the less can end up in our oceans. Every small choice makes a big difference!',
        animationUpdate: 'A person is shown happily filling a reusable bottle from a water tap.',
      },
    ],
  },
];

export const games: Game[] = [
  { id: 'recycling', title: 'Recycling Game', description: 'Drag & drop waste into the correct bins.', subject: 'Science', icon: Recycle, href: '/games/recycling' },
  { id: 'tree-planting', title: 'Tree Planting Game', description: 'Follow the steps to plant and grow a tree!', subject: 'Social Studies', icon: TreePine, href: '/games/tree-planting' },
  { id: 'water-conservation', title: 'Water Conservation', description: 'Fix leaks and collect rainwater to save water.', subject: 'Science', icon: Droplet, href: '/games/water-conservation' },
];

export const quizzes: Quiz[] = [
  {
    id: 'earth-day',
    title: 'Earth Day Special',
    description: 'Test your knowledge on this important day.',
    subject: 'Current Affairs',
    icon: Calendar,
    href: '/quizzes/earth-day',
    questions: [
      {
        question: 'When is Earth Day celebrated?',
        options: ['March 22', 'April 22', 'June 5', 'October 4'],
        correctAnswer: 'April 22',
      },
      {
        question: 'What is the theme for Earth Day 2024?',
        options: ['Restore Our Earth', 'Invest In Our Planet', 'Planet vs. Plastics', 'Protect Our Species'],
        correctAnswer: 'Planet vs. Plastics',
      },
    ],
  },
  {
    id: 'green-awards',
    title: 'Environmental Awards',
    description: 'Learn about the Nobel prizes of green work.',
    subject: 'Current Affairs',
    icon: Award,
    href: '/quizzes/green-awards',
    questions: [
        {
            question: 'Which award is often referred to as the "Nobel Prize for the Environment"?',
            options: ['The Goldman Environmental Prize', 'The Blue Planet Prize', 'Champions of the Earth', 'The Tyler Prize for Environmental Achievement'],
            correctAnswer: 'The Goldman Environmental Prize'
        }
    ]
  },
  {
    id: 'eco-activists',
    title: 'Famous Activists',
    description: 'Who are the heroes of the eco-movement?',
    subject: 'Social Studies',
    icon: Users,
    href: '/quizzes/eco-activists',
    questions: [
        {
            question: 'Which young activist is known for starting the "Fridays for Future" movement?',
            options: ['Greta Thunberg', 'Malala Yousafzai', 'Autumn Peltier', 'Xiuhtezcatl Martinez'],
            correctAnswer: 'Greta Thunberg'
        }
    ]
  },
];

export const schoolLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Greenwood High', avatar: 'https://picsum.photos/seed/school1/40/40', points: 15400, school: 'Greenwood High' },
  { rank: 2, name: 'Riverside Academy', avatar: 'https://picsum.photos/seed/school2/40/40', points: 12800, school: 'Riverside Academy' },
  { rank: 3, name: 'Oakridge International', avatar: 'https://picsum.photos/seed/school3/40/40', points: 11950, school: 'Oakridge International' },
  { rank: 4, name: 'Valley Public School', avatar: 'https://picsum.photos/seed/school4/40/40', points: 9800, school: 'Valley Public School' },
];

export const classLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Emily', avatar: 'https://picsum.photos/seed/student1/40/40', points: 1850, school: 'Greenwood High' },
  { rank: 2, name: 'David', avatar: 'https://picsum.photos/seed/student2/40/40', points: 1720, school: 'Greenwood High' },
  { rank: 3, name: 'Sophia', avatar: 'https://picsum.photos/seed/student3/40/40', points: 1680, school: 'Greenwood High' },
  { rank: 4, name: 'James', avatar: 'https://picsum.photos/seed/student4/40/40', points: 1500, school: 'Greenwood High' },
  { rank: 5, name: 'Alex', avatar: 'https://picsum.photos/seed/student5/40/40', points: 1250, school: 'Greenwood High' },
];


export const ngos: Ngo[] = [
    { id: '1', name: 'Books for All', city: 'New York', website: '#', image: 'https://picsum.photos/seed/ngo1/300/200' },
    { id: '2', name: 'Readers Future', city: 'London', website: '#', image: 'https://picsum.photos/seed/ngo2/300/200' },
    { id: '3', name: 'The Book Bridge', city: 'Toronto', website: '#', image: 'https://picsum.photos/seed/ngo3/300/200' },
];

export const externalGames: ExternalGame[] = [
    { id: '1', title: 'NASA Climate Kids', description: 'Play games and learn about Earth\'s climate.', href: '#', image: 'https://picsum.photos/seed/game1/300/200' },
    { id: '2', title: 'National Geographic Kids', description: 'Explore the world with fun games and quizzes.', href: '#', image: 'https://picsum.photos/seed/game2/300/200' },
    { id: '3', title: 'PBS Kids Nature Games', description: 'Go on adventures with your favorite characters.', href: '#', image: 'https://picsum.photos/seed/game3/300/200' },
]

export const recyclingItems: RecyclingItem[] = [
    { id: 'item-1', name: 'Plastic Bottle', type: 'recycling' },
    { id: 'item-2', name: 'Apple Core', type: 'compost' },
    { id: 'item-3', name: 'Newspaper', type: 'recycling' },
    { id: 'item-4', name: 'Styrofoam Cup', type: 'trash' },
    { id: 'item-5', name: 'Glass Jar', type: 'recycling' },
    { id: 'item-6', name: 'Banana Peel', type: 'compost' },
    { id: 'item-7', name: 'Chip Bag', type: 'trash' },
    { id: 'item-8', name: 'Aluminum Can', type: 'recycling' },
];

export const bins: Bin[] = [
    { id: 'bin-1', name: 'Recycling', accepts: ['recycling'], icon: Recycle },
    { id: 'bin-2', name: 'Compost', accepts: ['compost'], icon: Leaf },
    { id: 'bin-3', name: 'Trash', accepts: ['trash'], icon: Trash2 },
    { id: 'bin-4', name: 'Hazardous', accepts: ['hazardous'], icon: HelpCircle },
];
