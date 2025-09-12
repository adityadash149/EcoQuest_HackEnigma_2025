
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
  Cpu,
  Building2,
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
  CityBuildingQuestion,
  Quote,
} from './types';

export const lessons: Lesson[] = [
  {
    id: 'amazon-fire-2024',
    title: 'The Amazon Rainforest Fire',
    subject: 'Science',
    description: 'Explore the causes and effects of the 2024 Amazon rainforest fire and learn how to prevent such disasters.',
    gradeLevel: 'Middle School',
    image: 'https://youtube.com/shorts/tDOswhAUwKI?si=n_Vcbdkjn4H9o60Q',
    imageType: 'video',
    scenarios: [
      {
        scenarioTitle: 'The Underlying Cause',
        scenarioDescription: 'The Amazon is experiencing more frequent and intense droughts, making the forest drier and more flammable than ever before.',
        question: 'What is the primary driver of these increasingly severe droughts in the Amazon?',
        correctAnswer: 'Global climate change altering weather patterns.',
        incorrectAnswers: [
          'The natural cycle of the rainforest.',
          'Too many trees absorbing water.',
          'Recent volcanic activity in the Andes.',
        ],
        explanation: 'Global climate change is a major factor, leading to warmer temperatures and shifting rainfall patterns, which result in longer and more severe dry seasons in the Amazon.',
        animationUpdate: 'The vibrant green forest fades to a slightly browner, drier look.',
      },
      {
        scenarioTitle: 'Human Activity',
        scenarioDescription: 'Large areas of the rainforest are being cleared to make way for other activities. This deforestation is a major contributor to fire risk.',
        question: 'What is the leading cause of deforestation in the Amazon rainforest?',
        correctAnswer: 'Clearing land for cattle ranching and agriculture.',
        incorrectAnswers: [
          'Building cities and roads.',
          'Sustainable logging by local communities.',
          'Natural forest decay.',
        ],
        explanation: 'The vast majority of deforestation in the Amazon is driven by the global demand for beef and agricultural products like soy, which requires clearing huge swaths of forest for pasture and cropland.',
        animationUpdate: 'A patch of green trees disappears, replaced by empty brown land.',
      },
      {
        scenarioTitle: 'The Spark',
        scenarioDescription: 'A farmer, using the "slash-and-burn" method to clear his land, loses control of a small fire. A sudden gust of wind carries embers into the parched, vulnerable forest.',
        question: 'What immediate action would be most effective in preventing this initial spark from spreading?',
        correctAnswer: 'Creating and maintaining wide firebreaks around agricultural zones.',
        incorrectAnswers: [
          'Hoping for rain to start.',
          'Banning all farming activities.',
          'Using a single fire extinguisher.',
        ],
        explanation: 'Firebreaks (wide gaps in vegetation) are a crucial preventative measure that can stop fires from jumping from agricultural areas to the dense forest, especially during dry seasons.',
        animationUpdate: 'A small fire starts on the edge of the brown patch, but a green buffer zone appears, stopping its immediate spread into the main forest.',
      },
      {
        scenarioTitle: 'The Fire Spreads',
        scenarioDescription: 'Despite initial efforts, the fire finds a path into the dense forest. The dry conditions and wind cause it to grow rapidly, creating a massive wall of flames.',
        question: 'What factor most significantly contributes to the rapid spread of a forest fire?',
        correctAnswer: 'Strong winds and low humidity.',
        incorrectAnswers: [
          'The presence of large rivers.',
          'The noise from wildlife.',
          'The time of day.',
        ],
        explanation: 'Strong winds provide more oxygen to the fire and push it across the landscape at high speeds, while low humidity (dry air) makes the fuel (trees, leaves) more likely to ignite.',
        animationUpdate: 'The fire grows larger and more intense, with orange flames covering a portion of the forest.',
      },
      {
        scenarioTitle: 'Impact on Wildlife',
        scenarioDescription: 'The fire rages through the habitat of countless species. Slower-moving animals and those living in the trees are unable to escape the flames and smoke.',
        question: 'What is the most direct and devastating impact of the fire on wildlife?',
        correctAnswer: 'Massive loss of habitat and life.',
        incorrectAnswers: [
          'Animals migrate to cities.',
          'Animals learn to live with fire.',
          'It creates new, open spaces for them to live.',
        ],
        explanation: 'Wildfires destroy the homes, food sources, and populations of countless species, leading to immediate death and long-term ecosystem disruption. The loss of habitat is a critical threat to biodiversity.',
        animationUpdate: 'Silhouettes of animals are seen fleeing from the encroaching fire.',
      },
      {
        scenarioTitle: 'A Global Concern',
        scenarioDescription: 'As the Amazon burns, it releases enormous amounts of carbon dioxide into the atmosphere. This smoke can travel thousands of miles, affecting air quality in distant cities.',
        question: 'Why is the burning of the Amazon considered a problem for the entire planet?',
        correctAnswer: 'It releases huge amounts of CO2, accelerating climate change.',
        incorrectAnswers: [
          'It makes the sky prettier during sunsets.',
          'It only affects South America.',
          'It reduces the amount of oxygen in Brazil.',
        ],
        explanation: 'The Amazon is a massive carbon sink. Burning it not only stops it from absorbing CO2 but also releases centuries of stored carbon, which significantly contributes to global warming and affects the entire planet.',
        animationUpdate: 'Gray smoke rises from the fire and forms a dark cloud layer in the sky.',
      },
      {
        scenarioTitle: 'The Response Begins',
        scenarioDescription: 'Local and international firefighting teams are mobilized. They face a monumental task, battling heat, difficult terrain, and the sheer scale of the blaze.',
        question: 'What is the most effective technology for fighting a large-scale, remote forest fire?',
        correctAnswer: 'Firefighting aircraft (like planes and helicopters) dropping water.',
        incorrectAnswers: [
          'Teams with standard fire hoses.',
          'Building a giant wall to stop the fire.',
          'Asking volunteers to bring buckets of water.',
        ],
        explanation: 'For massive, inaccessible fires, aerial firefighting is essential. Aircraft can drop thousands of gallons of water or fire retardant directly onto the flames and monitor the fire\'s movement from above.',
        animationUpdate: 'A small airplane flies across the scene, and the intensity of the flames it passes over is visibly reduced.',
      },
      {
        scenarioTitle: 'Turning the Tide',
        scenarioDescription: 'After weeks of relentless effort and with the help of changing weather patterns (lower winds and some rainfall), the firefighters finally begin to gain control and contain the fire.',
        question: 'Besides firefighting, what natural event is most helpful in stopping a wildfire?',
        correctAnswer: 'A sustained period of heavy rainfall.',
        incorrectAnswers: [
          'A very hot, sunny day.',
          'A strong, windy day.',
          'An earthquake.',
        ],
        explanation: 'Rain is the most effective natural force for extinguishing a wildfire. It raises humidity, dampens fuel, and can put out flames directly over a wide area.',
        animationUpdate: 'Rain starts to fall from the dark clouds, and the large fire begins to shrink, leaving behind blackened earth.',
      },
      {
        scenarioTitle: 'The Aftermath & Recovery',
        scenarioDescription: 'The fire is out, but a vast, charred landscape remains. The long and difficult process of healing the forest and helping affected communities now begins.',
        question: 'What is the best approach for the long-term recovery of the burnt forest?',
        correctAnswer: 'Planting a diverse range of native tree species and protecting the area.',
        incorrectAnswers: [
          'Building a shopping mall to help the economy.',
          'Planting only fast-growing, non-native eucalyptus trees.',
          'Leaving the area completely alone and hoping for the best.',
        ],
        explanation: 'Active reforestation with a variety of native species is crucial to restore biodiversity, rebuild the ecosystem, and make the forest more resilient to future fires. Simply leaving it may not be enough for such large-scale damage.',
        animationUpdate: 'Small, green saplings begin to sprout from the blackened ground.',
      },
      {
        scenarioTitle: 'Preventing Future Tragedies',
        scenarioDescription: 'To prevent future fires, governments and organizations must work together on policy changes, sustainable practices, and community education.',
        question: 'What is the most effective long-term strategy to prevent future Amazon fires?',
        correctAnswer: 'Combating illegal deforestation and promoting sustainable livelihoods.',
        incorrectAnswers: [
          'Placing a giant dome over the rainforest.',
          'Banning all human activity in the Amazon.',
          'Teaching everyone how to fight fires.',
        ],
        explanation: 'The root cause of most fires is deforestation. By enforcing laws against illegal land clearing and providing local people with sustainable economic alternatives to slash-and-burn agriculture, we can significantly reduce the risk of future catastrophic fires.',
        animationUpdate: 'The entire scene transforms back into a vibrant, healthy, and expansive green rainforest, teeming with life.',
      },
    ],
  },
  {
    id: 'ocean-plastic',
    title: 'Plastic Pollution in Our Oceans',
    subject: 'Environmental Studies',
    description: 'Understand the journey of plastic from our homes to the ocean and its impact on marine life.',
    gradeLevel: 'Elementary',
    image: 'https://picsum.photos/seed/lesson2/600/400',
    scenarios: [
      {
        scenarioTitle: 'The Single-Use Choice',
        scenarioDescription: 'At a cafe, you are thirsty. You see a fridge full of drinks in plastic bottles.',
        question: 'What is the best choice to make to create the least amount of plastic waste?',
        correctAnswer: 'Ask for a glass of tap water or use your own reusable bottle.',
        incorrectAnswers: [
          'Buy a plastic bottle of water.',
          'Buy a plastic bottle of juice.',
          'Ask for the drink in a plastic cup with a plastic straw.',
        ],
        explanation: 'The best way to fight plastic pollution is to not create waste in the first place. Using a reusable bottle or simply drinking from a glass avoids using a new piece of plastic that might end up in the environment.',
        animationUpdate: 'A plastic bottle on a table disappears and is replaced by a person filling a reusable bottle.',
      },
      {
        scenarioTitle: 'The Overflowing Bin',
        scenarioDescription: 'At a park, a public trash can is completely full. A plastic bottle sits on top. A light breeze starts to blow.',
        question: 'What is likely to happen to the plastic bottle?',
        correctAnswer: 'The wind can blow it into a nearby stream or river.',
        incorrectAnswers: [
          'It will magically disappear.',
          'A park ranger will immediately pick it up.',
          'It will stay there forever.',
        ],
        explanation: 'Litter that is not secured in a bin can easily be blown by wind or washed by rain into storm drains, rivers, and streams. These waterways often lead directly to the ocean.',
        animationUpdate: 'A plastic bottle is blown by the wind from next to a trash can into a small stream.',
      },
      {
        scenarioTitle: 'The River Journey',
        scenarioDescription: 'The plastic bottle floats down the stream, joining other pieces of plastic litter. The stream flows into a larger river, which carries everything towards the sea.',
        question: 'What is the main way that plastic from inland areas gets into the ocean?',
        correctAnswer: 'Through rivers and waterways.',
        incorrectAnswers: [
          'People carry it to the beach on purpose.',
          'Birds drop it into the water.',
          'It falls from airplanes.',
        ],
        explanation: 'Rivers are like highways for plastic pollution. They collect litter from land and carry it over long distances, eventually depositing it into the ocean.',
        animationUpdate: 'The plastic bottle is shown floating in a river along with other trash, moving towards a wide-open ocean.',
      },
      {
        scenarioTitle: 'Into the Ocean',
        scenarioDescription: 'The bottle has reached the ocean. Ocean currents and waves carry it far from shore, where it joins a massive, swirling collection of floating plastic debris.',
        question: 'What are these large areas of ocean plastic called?',
        correctAnswer: 'Garbage Patches or Gyres.',
        incorrectAnswers: [
          'Plastic Islands.',
          'The Ocean Landfill.',
          'Trash Continents.',
        ],
        explanation: 'Ocean currents, called gyres, trap plastic waste in large, rotating systems. The Great Pacific Garbage Patch is the most famous example, but there are several others in our oceans.',
        animationUpdate: 'The single plastic bottle is now shown amidst a huge, dense area of floating plastic debris in the middle of the ocean.',
      },
      {
        scenarioTitle: 'A Turtle\'s Mistake',
        scenarioDescription: 'A hungry sea turtle is searching for food. It sees a floating plastic bag, which looks exactly like a delicious jellyfish.',
        question: 'Why is this a dangerous situation for the turtle?',
        correctAnswer: 'The turtle might eat the plastic bag and get very sick.',
        incorrectAnswers: [
          'The plastic bag is a new friend for the turtle.',
          'The bag will taste bad and the turtle will spit it out.',
          'The bag will help the turtle float better.',
        ],
        explanation: 'Sea turtles and other animals cannot tell the difference between plastic bags and their food. Eating plastic can cause blockages in their stomach and lead to starvation.',
        animationUpdate: 'The plastic bag disappears and a jellyfish swims by. The turtle happily eats the jellyfish.',
      },
      {
        scenarioTitle: 'The Problem of Microplastics',
        scenarioDescription: 'Over time, the sun and waves break the large plastic bottle into tiny pieces that are almost invisible. These are called microplastics.',
        question: 'Why are these tiny microplastics a problem?',
        correctAnswer: 'Small fish eat them, and then bigger fish eat those fish.',
        incorrectAnswers: [
          'They are so small they are not harmful.',
          'They dissolve in the water.',
          'They make the ocean sparkly.',
        ],
        explanation: 'Microplastics get into the food chain. Small animals eat them, and then larger animals (including us, if we eat seafood) eat them, which can be very harmful to health.',
        animationUpdate: 'A small fish is shown swallowing tiny, colorful dots (microplastics). Then a bigger fish eats the small fish.',
      },
      {
        scenarioTitle: 'A Beach Cleanup',
        scenarioDescription: 'A group of volunteers, including kids and adults, arrives at a beach that is covered in plastic litter washed ashore.',
        question: 'What is the goal of a beach cleanup?',
        correctAnswer: 'To remove trash from the coast before it harms animals or breaks down.',
        incorrectAnswers: [
          'To find cool treasures in the trash.',
          'To get a nice tan at the beach.',
          'To move the trash from one side of the beach to the other.',
        ],
        explanation: 'Beach cleanups are a direct way to remove plastic pollution from the environment, protecting coastal wildlife and preventing the trash from being washed back into the sea.',
        animationUpdate: 'A littered beach becomes perfectly clean, with volunteers holding bags of collected trash.',
      },
      {
        scenarioTitle: 'Innovations to Help',
        scenarioDescription: 'Scientists and engineers are creating new technologies to help solve the plastic problem. One idea is a large, floating barrier system designed to collect plastic from the ocean surface.',
        question: 'How can technology help us clean the oceans?',
        correctAnswer: 'By creating new ways to collect plastic that is already there.',
        incorrectAnswers: [
          'By inventing a machine that turns fish into plastic.',
          'Technology cannot help with this problem.',
          'By building bigger ships to dump more trash.',
        ],
        explanation: 'Innovations like giant ocean cleanup systems, river barriers, and even trash-collecting drones are being developed to help remove the vast amount of plastic already in our waterways.',
        animationUpdate: 'A large, floating barrier is shown in the ocean, and floating plastic debris is being funneled towards it and collected.',
      },
      {
        scenarioTitle: 'The Power of Recycling',
        scenarioDescription: 'The collected plastic bottles from the beach cleanup are taken to a special facility. Here, they are sorted, cleaned, shredded, and melted.',
        question: 'What happens to the plastic in the recycling facility?',
        correctAnswer: 'It gets turned into pellets to make new things, like benches or clothes.',
        incorrectAnswers: [
          'It gets burned for energy.',
          'It gets buried in the ground.',
          'It gets sent back to the ocean.',
        ],
        explanation: 'Recycling gives plastic a new life. Instead of becoming waste, it becomes a valuable resource used to manufacture a wide range of new products, reducing the need to create new plastic.',
        animationUpdate: 'The collected plastic bottles are shown going into a machine and coming out as new items, like a park bench and a t-shirt.',
      },
      {
        scenarioTitle: 'Your Role in the Solution',
        scenarioDescription: 'Back at home, you are helping your family with the groceries. You remember everything you\'ve learned about the journey of plastic.',
        question: 'What is the most powerful thing YOU can do every day to stop ocean plastic pollution?',
        correctAnswer: 'Reduce, Reuse, and Recycle: Use less plastic and sort waste properly.',
        incorrectAnswers: [
          'Never go to the beach again.',
          'Only blame big companies for the problem.',
          'Assume someone else will take care of it.',
        ],
        explanation: 'The fight against plastic pollution starts with our daily choices. By reducing the amount of single-use plastic we use, reusing items whenever possible, and recycling correctly, we can all make a huge difference.',
        animationUpdate: 'The entire ocean scene becomes bright, clean, and filled with happy marine life like turtles, fish, and whales.',
      },
    ],
  },
];

export const games: Game[] = [
  { id: 'recycling', title: 'Recycling Game', description: 'Drag & drop waste into the correct bins.', subject: 'Science', icon: Recycle, href: '/games/recycling' },
  { id: 'tree-planting', title: 'Tree Planting Challenge', description: 'Answer questions to plant and grow a tree!', subject: 'Environmental Studies', icon: TreePine, href: '/games/tree-planting' },
  { id: 'water-conservation', title: 'Water Conservation', description: 'Fix leaks and collect rainwater to save water.', subject: 'Science', icon: Droplet, href: '/games/water-conservation' },
  { id: 'eco-slogans', title: 'Eco Slogan Creator', description: 'Craft catchy slogans for environmental topics.', subject: 'Arts & Creativity', icon: Paintbrush, href: '/games/eco-slogans' },
  { id: 'green-tech', title: 'Green Tech City', description: 'Build a sustainable city with green technology.', subject: 'Technology', icon: Cpu, href: '/games/green-tech' },
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
            correctAnswer: 'The Goldman EnvironmentalPrize',
            explanation: 'The Goldman Environmental Prize is a prestigious award given annually to grassroots environmental activists, one from each of the world\'s six geographic regions.'
        }
    ]
  },
  {
    id: 'eco-activists',
    title: 'Famous Activists',
    description: 'Who are the heroes of the eco-movement?',
    subject: 'Environmental Studies',
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

export const cityBuildingQuestions: CityBuildingQuestion[] = [
    {
      question: "What is a major benefit of using solar panels for energy?",
      options: ["They work at night", "They don't produce greenhouse gases", "They are very cheap to make", "They use a lot of water"],
      correctAnswer: "They don't produce greenhouse gases",
    },
    {
      question: "Which of these is a form of 'public transit'?",
      options: ["Personal Car", "Bicycle", "Electric Bus", "Motorcycle"],
      correctAnswer: "Electric Bus",
    },
    {
      question: "What does 'EV' in 'EV Charging Station' stand for?",
      options: ["Eco Vehicle", "Electric Vehicle", "Energy Vehicle", "Efficient Vehicle"],
      correctAnswer: "Electric Vehicle",
    }
]

export const ecoSlogans: string[] = [
  "Don’t be a drip, save every drop.",
  "Waste water today, live in a desert tomorrow.",
  "Water is the new oil. Don’t waste it.",
  "Go green, go clean.",
  "Give Earth a hand, it’s our only land.",
  "Our planet, our future.",
  "The Earth is what we all have in common.",
  "What we do to the forests of the world is but a mirror reflection of what we do to ourselves and to one another.",
  "Mother Earth is our life support system, let’s treat her right."
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
    { id: '1', name: 'Books for All', city: 'New York', address: '123 Literacy Lane, New York, NY 10001', website: '#', image: 'https://picsum.photos/seed/ngo1/300/200' },
    { id: '2', name: 'Readers Future', city: 'London', address: '45 Bookworm Boulevard, London, UK W1A 1AA', website: '#', image: 'https://picsum.photos/seed/ngo2/300/200' },
    { id: '3', name: 'The Book Bridge', city: 'Toronto', address: '789 Chapter Crescent, Toronto, ON M5V 2H1', website: '#', image: 'https://picsum.photos/seed/ngo3/300/200' },
];

export const externalGames: ExternalGame[] = [
    { id: '1', title: 'NASA Climate Kids', description: 'Play games and learn about Earth\'s climate.', href: 'https://climatekids.nasa.gov/menu/play/', image: 'https://picsum.photos/seed/game1/300/200' },
]

export const recyclingItems: RecyclingItem[] = [
    { id: 'item-1', name: 'Plastic Bottle', type: 'recycling', image: 'https://picsum.photos/seed/bottle/100/100' },
    { id: 'item-2', name: 'Apple Core', type: 'compost', image: 'https://picsum.photos/seed/apple-core/100/100' },
    { id: 'item-3', name: 'Newspaper', type: 'recycling', image: 'https://picsum.photos/seed/newspaper/100/100' },
    { id: 'item-4', name: 'Styrofoam Cup', type: 'trash', image: 'https://picsum.photos/seed/styrofoam-cup/100/100' },
    { id: 'item-5', name: 'Glass Jar', type: 'recycling', image: 'https://picsum.photos/seed/glass-jar/100/100' },
    { id: 'item-6', name: 'Banana Peel', type: 'compost', image: 'https://picsum.photos/seed/banana-peel/100/100' },
    { id: 'item-7', name: 'Chip Bag', type: 'trash', image: 'https://picsum.photos/seed/chip-bag/100/100' },
    { id: 'item-8', name: 'Aluminum Can', type: 'recycling', image: 'https://picsum.photos/seed/aluminum-can/100/100' },
    { id: 'item-9', name: 'Cardboard Box', type: 'recycling', image: 'https://picsum.photos/seed/cardboard-box/100/100' },
    { id: 'item-10', name: 'Egg Shells', type: 'compost', image: 'https://picsum.photos/seed/egg-shells/100/100' },
    { id: 'item-11', name: 'Used Battery', type: 'hazardous', image: 'https://picsum.photos/seed/used-battery/100/100' },
    { id: 'item-12', name: 'Plastic Bag', type: 'trash', image: 'https://picsum.photos/seed/plastic-bag/100/100' },
    { id: 'item-13', name: 'Light Bulb', type: 'hazardous', image: 'https://picsum.photos/seed/light-bulb/100/100' },
    { id: 'item-14', name: 'Coffee Grounds', type: 'compost', image: 'https://picsum.photos/seed/coffee-grounds/100/100' },
    { id: 'item-15', name: 'Pizza Box', type: 'trash', image: 'https://picsum.photos/seed/pizza-box/100/100' },
];

export const bins: Bin[] = [
    { id: 'bin-1', name: 'Recycle', accepts: ['recycling'], icon: Recycle, color: 'bg-blue-600' },
    { id: 'bin-2', name: 'Compost', accepts: ['compost'], icon: Leaf, color: 'bg-green-700' },
    { id: 'bin-3', name: 'Trash', accepts: ['trash'], icon: Trash2, color: 'bg-black' },
    { id: 'bin-4', name: 'Hazardous', accepts: ['hazardous'], icon: HelpCircle, color: 'bg-red-600' },
];

export const quotes: Quote[] = [
    {
        text: "The Earth is what we all have in common.",
        author: "Wendell Berry",
    },
    {
        text: "He that plants trees loves others besides himself.",
        author: "Thomas Fuller",
    },
    {
        text: "The environment is where we all meet; where we all have a mutual interest; it is the one thing all of us share.",
        author: "Lady Bird Johnson",
    },
    {
        text: "To leave the world a bit better, whether by a healthy child, a garden patch, or a redeemed social condition... to know even one life has breathed easier because you have lived. This is to have succeeded.",
        author: "Ralph Waldo Emerson",
    },
    {
        text: "What we are doing to the forests of the world is but a mirror reflection of what we are doing to ourselves and to one another.",
        author: "Mahatma Gandhi",
    }
];
