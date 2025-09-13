
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
  Shield,
  Star,
  Trophy,
  Sun,
  Sprout
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
  WaterGameQuestion,
  BadgeInfo,
} from './types';

export const badges: BadgeInfo[] = [
    { name: 'Eco Enthusiast', minPoints: 0, icon: Sprout },
    { name: 'Green Volunteer', minPoints: 100, icon: Leaf },
    { name: 'Environment Champion', minPoints: 200, icon: Shield },
    { name: 'Conservation Leader', minPoints: 300, icon: Star },
    { name: 'Eco Visionary', minPoints: 400, icon: Trophy },
];

export const lessons: Lesson[] = [
  {
    id: 'amazon-fire-2024',
    title: 'The Amazon Rainforest Fire',
    subject: 'Science',
    gradeLevel: 'Middle School',
    description: 'Explore the causes and effects of the 2024 Amazon rainforest fire and learn how to prevent such disasters.',
    image: 'https://www.greenpeace.org/static/planet4-international-stateless/2022/09/fbc851c4-gp1szphr_.jpg',
    coverImage: 'https://www.greenpeace.org/static/planet4-international-stateless/2022/09/fbc851c4-gp1szphr_.jpg',
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
    gradeLevel: 'Elementary',
    description: 'Understand the journey of plastic from our homes to the ocean and its impact on marine life.',
    image: 'https://ocean.si.edu/sites/default/files/styles/full_width_overview/public/2023-11/sargassum-oil-deepwater-horizon.jpg.webp?itok=yeTdGfWP',
    coverImage: 'https://ocean.si.edu/sites/default/files/styles/full_width_overview/public/2023-11/sargassum-oil-deepwater-horizon.jpg.webp?itok=yeTdGfWP',
    imageType: 'image',
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
        animationUpdate: 'The plastic bottle is now shown floating in a river along with other trash, moving towards a wide-open ocean.',
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
        animationUpdate: 'A large, floating barrier is shown in the ocean, and floating plastic debris is being funneled towards it and being collected.',
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
  {
    id: 'israel-yatir-forest',
    title: 'Israel’s Yatir Forest and Negev Desert Greening',
    subject: 'Environmental Studies',
    gradeLevel: 'High School',
    description: 'Discover how Israel is combating desertification by planting forests and greening the desert.',
    image: 'https://picsum.photos/seed/yatir/600/400',
    coverImage: 'https://picsum.photos/seed/yatir/600/400',
    imageType: 'image',
    scenarios: [
      {
        scenarioTitle: 'The Challenge of the Desert',
        scenarioDescription: 'The Negev Desert is a vast, arid region. A scientist proposes a bold plan: plant a large forest at the edge of the desert to see if it can thrive and halt desert expansion.',
        question: 'What is the biggest challenge for growing a forest in a desert?',
        correctAnswer: 'Extreme lack of water and high temperatures.',
        incorrectAnswers: [
          'Too many wild animals.',
          'The soil is too sandy.',
          'Not enough sunlight.',
        ],
        explanation: 'Arid and semi-arid regions like the Negev are defined by their minimal rainfall and intense heat, making it incredibly difficult for non-native trees to survive without significant intervention.',
        animationUpdate: 'A barren, sandy landscape is shown under a harsh sun.',
      },
      {
        scenarioTitle: 'The Right Trees for the Job',
        scenarioDescription: 'To succeed, the project needs to use trees that can handle the harsh conditions. Researchers are testing various species.',
        question: 'What type of tree is best suited for planting in a hot, dry environment?',
        correctAnswer: 'Drought-resistant species like pine and cypress trees.',
        incorrectAnswers: [
          'Water-loving trees like willows.',
          'Tropical rainforest trees.',
          'Fruit trees like apple and orange.',
        ],
        explanation: 'Yatir Forest primarily uses hardy conifer species like Aleppo Pine and Italian Cypress because they are exceptionally well-adapted to survive with little water and in high temperatures.',
        animationUpdate: 'A small, hardy pine tree appears in the sandy landscape.',
      },
      {
        scenarioTitle: 'Water is Life: Drip Irrigation',
        scenarioDescription: 'A revolutionary Israeli invention, drip irrigation, is used to deliver tiny, precise amounts of water directly to the roots of each sapling.',
        question: 'What is the main advantage of drip irrigation over traditional sprinklers?',
        correctAnswer: 'It minimizes water loss from evaporation.',
        incorrectAnswers: [
          'It is cheaper to install.',
          'It washes the leaves of the trees.',
          'It creates beautiful water arcs.',
        ],
        explanation: 'By delivering water directly to the soil at the base of the plant, drip irrigation prevents the massive water loss that occurs when water is sprayed into the hot, dry air, making it extremely efficient.',
        animationUpdate: 'Thin black tubes appear, running to the base of the pine tree, with a single drop of water forming at the root.',
      },
      {
        scenarioTitle: 'Creating a Microclimate',
        scenarioDescription: 'As thousands of trees grow, they begin to change their own environment. The shade from the trees cools the ground, and their fallen needles create a new layer of soil.',
        question: 'What is this effect called, where a forest creates its own local environment?',
        correctAnswer: 'Creating a microclimate.',
        incorrectAnswers: [
          'Global warming.',
          'A weather phenomenon.',
          'Desert amplification.',
        ],
        explanation: 'The trees create a cooler, more humid microclimate underneath their canopy. This effect makes it easier for more plants to grow and for the forest to sustain itself.',
        animationUpdate: 'More trees appear, and the ground beneath them becomes darker and less sandy. The harsh sun is now dappled by shade.',
      },
      {
        scenarioTitle: 'The Forest as a Carbon Sink',
        scenarioDescription: 'The thriving Yatir Forest is now being studied by scientists globally. They discovered it absorbs a surprising amount of carbon dioxide from the atmosphere.',
        question: 'Why is it surprising that a desert forest is such an effective "carbon sink"?',
        correctAnswer: 'Scientists previously thought only lush, wet forests could absorb significant CO2.',
        incorrectAnswers: [
          'Desert trees are known to release CO2.',
          'The sand was thought to block CO2 absorption.',
          'There is no CO2 in the desert air.',
        ],
        explanation: 'The Yatir Forest research proved that even in extreme conditions, afforestation is a powerful tool for fighting climate change, challenging previous assumptions and showing that such projects can be successful carbon sinks.',
        animationUpdate: 'Arrows representing CO2 are shown being drawn down from the sky into the growing forest.',
      },
    ]
  },
  {
    id: 'aravalli-green-wall',
    title: 'India: Aravalli Green Wall Project',
    subject: 'Geography',
    gradeLevel: 'Middle School',
    description: 'Learn about India\'s ambitious plan to create a green wall to combat desertification and land degradation.',
    image: 'https://picsum.photos/seed/aravalli/600/400',
    coverImage: 'https://picsum.photos/seed/aravalli/600/400',
    imageType: 'image',
    scenarios: [
      {
        scenarioTitle: 'The Spreading Desert',
        scenarioDescription: 'The Thar Desert in western India is expanding. Dust storms are becoming more common, and fertile land is becoming barren. A plan is proposed to create a "Great Green Wall".',
        question: 'What is the primary goal of the Aravalli Green Wall Project?',
        correctAnswer: 'To stop the eastward expansion of the Thar Desert.',
        incorrectAnswers: [
          'To create a new national park.',
          'To build a wall to keep animals out.',
          'To create a tourist attraction.',
        ],
        explanation: 'The main objective is to create a massive ecological barrier of trees and vegetation to halt desertification, prevent dust storms, and restore degraded land.',
        animationUpdate: 'A barren, dusty landscape is shown on one side, with green, fertile land on the other. A dotted line appears between them.',
      },
      {
        scenarioTitle: 'Choosing the Right Plants',
        scenarioDescription: 'The Aravalli range has a unique, dry climate. To succeed, the project must use plants and trees that can survive here.',
        question: 'Which types of plants are most suitable for the Aravalli Green Wall?',
        correctAnswer: 'Native, drought-tolerant shrubs and trees.',
        incorrectAnswers: [
          'Coconut trees from coastal areas.',
          'Apple trees from the Himalayas.',
          'Imported decorative flowers.',
        ],
        explanation: 'Using native species like the Khejri, Babool, and various shrubs is crucial. They are already adapted to the local climate, require less water, and provide the best support for local wildlife.',
        animationUpdate: 'A small, thorny Khejri tree sprouts on the dotted line.',
      },
      {
        scenarioTitle: 'More Than Just Trees',
        scenarioDescription: 'The project isn\'t just about planting trees. It also involves restoring water bodies and improving the soil quality.',
        question: 'How does restoring small water bodies (johads) help the green wall?',
        correctAnswer: 'It recharges groundwater, making water available for the plants.',
        incorrectAnswers: [
          'It provides a place for boating.',
          'It attracts rain clouds.',
          'It makes the area look prettier.',
        ],
        explanation: 'By digging ponds and restoring traditional water harvesting structures, the project helps capture monsoon rainwater. This water seeps into the ground, raising the water table and providing a crucial lifeline for the new trees and vegetation during the dry season.',
        animationUpdate: 'A small pond of blue water appears next to the growing trees. The ground around it becomes greener.',
      },
      {
        scenarioTitle: 'Community Power',
        scenarioDescription: 'Local villagers are being trained and employed to plant the saplings, care for them, and manage the restored water bodies.',
        question: 'Why is involving local communities essential for the project\'s success?',
        correctAnswer: 'It provides them with jobs and makes them guardians of the forest.',
        incorrectAnswers: [
          'It is cheaper than hiring professionals.',
          'They know the best places to take photos.',
          'They can work longer hours.',
        ],
        explanation: 'When local communities have a stake in the project—through employment and the direct benefits of a healthier environment—they are more likely to protect and sustain it for the long term.',
        animationUpdate: 'Silhouettes of people appear, planting small saplings along the green wall.',
      },

      {
        scenarioTitle: 'A Healthier Future',
        scenarioDescription: 'Years later, the green wall is thriving. The air is cleaner, the dust storms are less severe, and biodiversity is returning.',
        question: 'What is a major benefit of the completed Aravalli Green Wall?',
        correctAnswer: 'Improved air quality and restored ecosystems.',
        incorrectAnswers: [
          'It blocks the view of the desert.',
          'It creates a new path for highways.',
          'It makes the area warmer.',
        ],
        explanation: 'The green wall acts as a massive natural filter, trapping dust and pollutants from the desert winds. It also provides a habitat for birds and animals, restoring the ecological balance of the region.',
        animationUpdate: 'The entire scene transforms into a lush green belt of trees, with birds flying overhead and the dusty desert contained on one side.',
      },
    ]
  },
];

export const games: Game[] = [
  { id: 'recycling', title: 'Recycling Game', description: 'Drag & drop waste into the correct bins.', subject: 'Science', icon: Recycle, href: '/games/recycling' },
  { id: 'tree-planting', title: 'Tree Planting Challenge', description: 'Answer questions to plant and grow a tree!', subject: 'Environmental Studies', icon: TreePine, href: '/games/tree-planting' },
  { id: 'water-conservation', title: 'Rain Water Harvesting', description: 'Fix leaks and collect rainwater to save water.', subject: 'Science', icon: Droplet, href: '/games/water-conservation' },
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
            correctAnswer: 'The Goldman Environmental Prize',
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

export const waterGameQuestions: WaterGameQuestion[] = [
    {
        question: "What percentage of the Earth's water is fresh water?",
        options: ["10%", "3%", "25%", "50%"],
        correctAnswer: "3%",
    },
    {
        question: "Which of these household activities uses the most water?",
        options: ["Washing dishes by hand", "Taking a 10-minute shower", "Flushing a toilet", "Brushing your teeth"],
        correctAnswer: "Taking a 10-minute shower",
    },
    {
        question: "What is the main benefit of rainwater harvesting?",
        options: ["It cleans the rain", "It provides a free source of water", "It makes the garden look nice", "It cools down the house"],
        correctAnswer: "It provides a free source of water",
    }
];

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
  { rank: 1, name: 'Delhi Public School, R.K. Puram', avatar: 'https://picsum.photos/seed/school1/40/40', points: 15400, school: 'Delhi Public School, R.K. Puram' },
  { rank: 2, name: 'The Doon School, Dehradun', avatar: 'https://picsum.photos/seed/school2/40/40', points: 12800, school: 'The Doon School, Dehradun' },
  { rank: 3, name: 'Bombay Scottish School, Mahim', avatar: 'https://picsum.photos/seed/school3/40/40', points: 11950, school: 'Bombay Scottish School, Mahim' },
  { rank: 4, name: 'ODM Public School', avatar: 'https://picsum.photos/seed/school4/40/40', points: 9800, school: 'ODM Public School' },
];

export const classLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Subhashree M', avatar: 'https://picsum.photos/seed/student1/40/40', points: 1850, school: 'Delhi Public School' },
  { rank: 2, name: 'Swayam M', avatar: 'https://picsum.photos/seed/student2/40/40', points: 1720, school: 'The Doon School' },
  { rank: 3, name: 'Varun P', avatar: 'https://picsum.photos/seed/student3/40/40', points: 1680, school: 'Bombay Scottish School' },
  { rank: 4, name: 'Aditya D', avatar: 'https://picsum.photos/seed/student4/40/40', points: 1500, school: 'Venkateswar English Medium School' },
  { rank: 5, name: 'Manshaya P', avatar: 'https://picsum.photos/seed/student5/40/40', points: 1250, school: 'ODM Public School' },
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
    { id: 'item-1', name: 'Plastic Bottle', type: 'recycling', image: '' },
    { id: 'item-2', name: 'Apple Core', type: 'compost', image: '' },
    { id: 'item-3', name: 'Newspaper', type: 'recycling', image: '' },
    { id: 'item-4', name: 'Styrofoam Cup', type: 'trash', image: '' },
    { id: 'item-5', name: 'Glass Jar', type: 'recycling', image: '' },
    { id: 'item-6', name: 'Banana Peel', type: 'compost', image: '' },
    { id: 'item-7', name: 'Chip Bag', type: 'trash', image: '' },
    { id: 'item-8', name: 'Aluminum Can', type: 'recycling', image: '' },
    { id: 'item-9', name: 'Cardboard Box', type: 'recycling', image: '' },
    { id: 'item-10', name: 'Egg Shells', type: 'compost', image: '' },
    { id: 'item-11', name: 'Used Battery', type: 'hazardous', image: '' },
    { id: 'item-12', name: 'Plastic Bag', type: 'trash', image: '' },
    { id: 'item-13', name: 'Light Bulb', type: 'hazardous', image: '' },
    { id: 'item-14', name: 'Coffee Grounds', type: 'compost', image: '' },
    { id: 'item-15', name: 'Pizza Box', type: 'trash', image: '' },
];

export const bins: Bin[] = [
    { id: 'bin-recycling', name: 'Recycle', accepts: ['recycling'], icon: Recycle, color: 'bg-green-800' },
    { id: 'bin-compost', name: 'Compost', accepts: ['compost'], icon: Leaf, color: 'bg-purple-700' },
    { id: 'bin-trash', name: 'Trash', accepts: ['trash'], icon: Trash2, color: 'bg-black' },
    { id: 'bin-hazardous', name: 'Hazardous', accepts: ['hazardous'], icon: HelpCircle, color: 'bg-red-600' },
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


    

    
