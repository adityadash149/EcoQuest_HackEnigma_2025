
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
  { id: 'tree-planting', title: 'Tree Planting Challenge', description: 'Answer questions to plant and grow a tree!', subject: 'Social Studies', icon: TreePine, href: '/games/tree-planting' },
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
        explanation: 'Earth Day is an annual event on April 22 to demonstrate support for environmental protection.'
      },
      {
        question: 'What is the theme for Earth Day 2024?',
        options: ['Restore Our Earth', 'Invest In Our Planet', 'Planet vs. Plastics', 'Protect Our Species'],
        correctAnswer: 'Planet vs. Plastics',
        explanation: 'The theme for Earth Day 2024 is "Planet vs. Plastics," which calls to advocate for widespread awareness on the health risk of plastics.'
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
            correctAnswer: 'The Goldman Environmental Prize',
            explanation: 'The Goldman Environmental Prize is a prestigious award given annually to grassroots environmental activists, one from each of the world\'s six geographic regions.'
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
            correctAnswer: 'Greta Thunberg',
            explanation: 'Greta Thunberg, a Swedish environmental activist, initiated the "Fridays for Future" school climate strike movement in 2018.'
        }
    ]
  },
];

export const treePlantingQuestions: QuizQuestion[] = [
  {
    question: "What is the first step in planting a tree?",
    options: ["Watering the spot", "Adding fertilizer", "Digging a hole", "Putting the seed in"],
    correctAnswer: "Digging a hole",
    explanation: "You need to dig a hole that is wide and deep enough for the tree's root ball."
  },
  {
    question: "Why are trees important for the air we breathe?",
    options: ["They absorb carbon dioxide and produce oxygen", "They create wind", "They cool the air", "They clean the dust from the air"],
    correctAnswer: "They absorb carbon dioxide and produce oxygen",
    explanation: "Through photosynthesis, trees take in carbon dioxide from the atmosphere and release oxygen, which is essential for human and animal life."
  },
  {
    question: "What is deforestation?",
    options: ["Planting new forests", "The clearing of forests for other land uses", "A disease that affects trees", "A type of tree"],
    correctAnswer: "The clearing of forests for other land uses",
    explanation: "Deforestation is the permanent removal of trees to make room for something besides forest. This can include clearing the land for agriculture or grazing, or using the timber for fuel, construction or manufacturing."
  },
  {
    question: "What does a young tree need to grow strong?",
    options: ["Lots of shade", "Water, sunlight, and nutrients", "Very cold weather", "Salty water"],
    correctAnswer: "Water, sunlight, and nutrients",
    explanation: "Like most plants, trees need a combination of water, sunlight for photosynthesis, and nutrients from the soil to grow healthy and strong."
  },
  {
    question: "What is the benefit of planting native trees?",
    options: ["They grow faster than any other tree", "They require more water", "They provide the best food and shelter for local wildlife", "They are more resistant to all diseases"],
    correctAnswer: "They provide the best food and shelter for local wildlife",
    explanation: "Native trees are adapted to the local climate and soil conditions, and they have co-evolved with local wildlife, providing essential habitat and food sources."
  },
  {
    question: "How do tree roots help the soil?",
    options: ["They make the soil looser", "They hold the soil in place and prevent erosion", "They add salt to the soil", "They remove all water from the soil"],
    correctAnswer: "They hold the soil in place and prevent erosion",
    explanation: "The network of tree roots acts like a net, binding the soil together and preventing it from being washed or blown away by water and wind."
  },
  {
    question: "What is the process of planting trees called?",
    options: ["Deforestation", "Gardening", "Afforestation", "Agriculture"],
    correctAnswer: "Afforestation",
    explanation: "Afforestation is the establishment of a forest or stand of trees in an area where there was no previous tree cover."
  },
  {
    question: "Which of these is NOT a direct product from trees?",
    options: ["Paper", "Apples", "Lumber", "Plastic"],
    correctAnswer: "Plastic",
    explanation: "Paper, fruits like apples, and lumber for building are all products that come from trees. Plastic is derived from petroleum."
  },
  {
    question: "What is a 'carbon footprint'?",
    options: ["The shape of a leaf", "The total amount of greenhouse gases generated by our actions", "A type of tree fertilizer", "The shadow a tree casts"],
    correctAnswer: "The total amount of greenhouse gases generated by our actions",
    explanation: "Our carbon footprint is a measure of our impact on the environment. Planting trees is a great way to help reduce this footprint."
  },
  {
    question: "What is the best time of year to plant most trees?",
    options: ["Peak of summer", "Autumn, after leaves drop, or early spring", "Middle of winter", "Any time is fine"],
    correctAnswer: "Autumn, after leaves drop, or early spring",
    explanation: "Planting in the fall or early spring gives the tree's roots time to establish themselves before the stress of summer heat or winter cold."
  }
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
    { id: 'item-1', name: 'Plastic Bottle', type: 'recycling', image: 'https://picsum.photos/seed/bottle/100/100' },
    { id: 'item-2', name: 'Apple Core', type: 'compost', image: 'https://picsum.photos/seed/apple/100/100' },
    { id: 'item-3', name: 'Newspaper', type: 'recycling', image: 'https://picsum.photos/seed/newspaper/100/100' },
    { id: 'item-4', name: 'Styrofoam Cup', type: 'trash', image: 'https://picsum.photos/seed/styrofoam/100/100' },
    { id: 'item-5', name: 'Glass Jar', type: 'recycling', image: 'https://picsum.photos/seed/jar/100/100' },
    { id: 'item-6', name: 'Banana Peel', type: 'compost', image: 'https://picsum.photos/seed/banana/100/100' },
    { id: 'item-7', name: 'Chip Bag', type: 'trash', image: 'https://picsum.photos/seed/chips/100/100' },
    { id: 'item-8', name: 'Aluminum Can', type: 'recycling', image: 'https://picsum.photos/seed/can/100/100' },
    { id: 'item-9', name: 'Cardboard Box', type: 'recycling', image: 'https://picsum.photos/seed/box/100/100' },
    { id: 'item-10', name: 'Egg Shells', type: 'compost', image: 'https://picsum.photos/seed/eggs/100/100' },
    { id: 'item-11', name: 'Used Battery', type: 'hazardous', image: 'https://picsum.photos/seed/battery/100/100' },
    { id: 'item-12', name: 'Plastic Bag', type: 'trash', image: 'https://picsum.photos/seed/bag/100/100' },
    { id: 'item-13', name: 'Light Bulb', type: 'hazardous', image: 'https://picsum.photos/seed/bulb/100/100' },
    { id: 'item-14', name: 'Coffee Grounds', type: 'compost', image: 'https://picsum.photos/seed/coffee/100/100' },
    { id: 'item-15', name: 'Pizza Box', type: 'trash', image: 'https://picsum.photos/seed/pizza/100/100' },
];

export const bins: Bin[] = [
    { id: 'bin-1', name: 'Recycle', accepts: ['recycling'], icon: Recycle, color: 'bg-blue-600' },
    { id: 'bin-2', name: 'Compost', accepts: ['compost'], icon: Leaf, color: 'bg-green-700' },
    { id: 'bin-3', name: 'Trash', accepts: ['trash'], icon: Trash2, color: 'bg-black' },
    { id: 'bin-4', name: 'Hazardous', accepts: ['hazardous'], icon: HelpCircle, color: 'bg-red-600' },
];

    
