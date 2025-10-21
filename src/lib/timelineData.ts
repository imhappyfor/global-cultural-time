export interface Civilization {
  id: string;
  name: string;
  startYear: number;
  endYear: number | null;
  color: string;
  parentId?: string;
  description: string;
  culturalHighlights: string[];
  region: string;
}

export const civilizations: Civilization[] = [
  {
    id: "mesopotamia",
    name: "Mesopotamia",
    startYear: -3500,
    endYear: -539,
    color: "oklch(0.45 0.12 35)",
    description: "The cradle of civilization, birthplace of writing, law, and urban culture.",
    culturalHighlights: [
      "Cuneiform writing system",
      "Code of Hammurabi",
      "Ziggurats and monumental architecture",
      "Advanced astronomy and mathematics"
    ],
    region: "Middle East"
  },
  {
    id: "ancient-egypt",
    name: "Ancient Egypt",
    startYear: -3100,
    endYear: -30,
    color: "oklch(0.50 0.13 45)",
    description: "Unified kingdom along the Nile, renowned for pyramids, pharaohs, and hieroglyphs.",
    culturalHighlights: [
      "Pyramids and monumental tombs",
      "Hieroglyphic writing",
      "Advanced mummification",
      "Papyrus and literature"
    ],
    region: "North Africa"
  },
  {
    id: "indus-valley",
    name: "Indus Valley",
    startYear: -3300,
    endYear: -1300,
    color: "oklch(0.48 0.11 55)",
    description: "Sophisticated urban planning with advanced drainage systems and standardized weights.",
    culturalHighlights: [
      "Urban planning and grid cities",
      "Advanced drainage systems",
      "Standardized weights and measures",
      "Undeciphered script"
    ],
    region: "South Asia"
  },
  {
    id: "ancient-china",
    name: "Ancient China",
    startYear: -2070,
    endYear: -221,
    color: "oklch(0.52 0.14 30)",
    description: "Early dynasties that developed Chinese philosophy, writing, and statecraft.",
    culturalHighlights: [
      "Chinese characters",
      "Bronze casting",
      "Confucianism and Taoism",
      "The Mandate of Heaven"
    ],
    region: "East Asia"
  },
  {
    id: "ancient-greece",
    name: "Ancient Greece",
    startYear: -800,
    endYear: -146,
    color: "oklch(0.55 0.10 240)",
    description: "Foundation of Western philosophy, democracy, and classical arts.",
    culturalHighlights: [
      "Democracy and philosophy",
      "Olympic Games",
      "Greek theater and mythology",
      "Classical architecture"
    ],
    region: "Southern Europe"
  },
  {
    id: "persian-empire",
    name: "Persian Empire",
    startYear: -550,
    endYear: -330,
    color: "oklch(0.47 0.11 40)",
    parentId: "mesopotamia",
    description: "Vast empire connecting East and West, known for tolerance and administrative innovation.",
    culturalHighlights: [
      "Royal Road infrastructure",
      "Zoroastrianism",
      "Cyrus Cylinder (human rights)",
      "Satrap administrative system"
    ],
    region: "Middle East"
  },
  {
    id: "roman-empire",
    name: "Roman Empire",
    startYear: -27,
    endYear: 476,
    color: "oklch(0.53 0.09 250)",
    parentId: "ancient-greece",
    description: "Dominant Mediterranean power that shaped law, engineering, and governance.",
    culturalHighlights: [
      "Roman law and governance",
      "Aqueducts and roads",
      "Latin language",
      "Architectural innovations (concrete, arches)"
    ],
    region: "Southern Europe"
  },
  {
    id: "han-china",
    name: "Han Dynasty",
    startYear: -206,
    endYear: 220,
    color: "oklch(0.54 0.15 25)",
    parentId: "ancient-china",
    description: "Golden age of Chinese culture, establishing the Silk Road and Civil Service.",
    culturalHighlights: [
      "Silk Road trade",
      "Paper invention",
      "Civil service examinations",
      "Historical records (Records of the Grand Historian)"
    ],
    region: "East Asia"
  },
  {
    id: "byzantine",
    name: "Byzantine Empire",
    startYear: 330,
    endYear: 1453,
    color: "oklch(0.52 0.10 260)",
    parentId: "roman-empire",
    description: "Eastern continuation of Rome, preserving classical knowledge and Christian traditions.",
    culturalHighlights: [
      "Orthodox Christianity",
      "Justinian Code",
      "Hagia Sophia",
      "Preservation of Greek texts"
    ],
    region: "Eastern Europe"
  },
  {
    id: "islamic-caliphate",
    name: "Islamic Caliphates",
    startYear: 632,
    endYear: 1258,
    color: "oklch(0.48 0.12 38)",
    parentId: "persian-empire",
    description: "Rapid expansion creating centers of learning that advanced science, mathematics, and arts.",
    culturalHighlights: [
      "Islamic Golden Age",
      "Algebra and algorithms",
      "Preservation of classical texts",
      "Islamic art and architecture"
    ],
    region: "Middle East"
  },
  {
    id: "tang-china",
    name: "Tang Dynasty",
    startYear: 618,
    endYear: 907,
    color: "oklch(0.56 0.16 20)",
    parentId: "han-china",
    description: "Cosmopolitan golden age of arts, poetry, and international trade.",
    culturalHighlights: [
      "Poetry and literature",
      "Woodblock printing",
      "Porcelain perfection",
      "Buddhist art flourishing"
    ],
    region: "East Asia"
  },
  {
    id: "medieval-europe",
    name: "Medieval Europe",
    startYear: 800,
    endYear: 1500,
    color: "oklch(0.50 0.08 255)",
    parentId: "byzantine",
    description: "Feudal Christian kingdoms, Gothic cathedrals, and scholastic philosophy.",
    culturalHighlights: [
      "Gothic architecture",
      "Universities and scholasticism",
      "Chivalric culture",
      "Illuminated manuscripts"
    ],
    region: "Western Europe"
  },
  {
    id: "mongol-empire",
    name: "Mongol Empire",
    startYear: 1206,
    endYear: 1368,
    color: "oklch(0.49 0.13 30)",
    description: "Largest contiguous land empire, facilitating unprecedented cultural exchange.",
    culturalHighlights: [
      "Pax Mongolica trade",
      "Religious tolerance",
      "Postal system (Yam)",
      "Cultural exchange across Eurasia"
    ],
    region: "Central Asia"
  },
  {
    id: "renaissance-italy",
    name: "Renaissance Italy",
    startYear: 1300,
    endYear: 1600,
    color: "oklch(0.58 0.12 50)",
    parentId: "medieval-europe",
    description: "Rebirth of classical learning, humanistic philosophy, and artistic innovation.",
    culturalHighlights: [
      "Humanist philosophy",
      "Perspective in art",
      "Scientific revolution beginnings",
      "Masterworks of da Vinci, Michelangelo"
    ],
    region: "Southern Europe"
  },
  {
    id: "ottoman-empire",
    name: "Ottoman Empire",
    startYear: 1299,
    endYear: 1922,
    color: "oklch(0.46 0.11 42)",
    parentId: "islamic-caliphate",
    description: "Powerful Islamic empire bridging Europe and Asia for six centuries.",
    culturalHighlights: [
      "Ottoman architecture",
      "Multicultural administration",
      "Miniature painting",
      "Coffee culture spread"
    ],
    region: "Middle East"
  },
  {
    id: "ming-china",
    name: "Ming Dynasty",
    startYear: 1368,
    endYear: 1644,
    color: "oklch(0.57 0.17 15)",
    parentId: "tang-china",
    description: "Restoration of Chinese rule, famous for porcelain, the Forbidden City, and maritime expeditions.",
    culturalHighlights: [
      "Forbidden City construction",
      "Blue and white porcelain",
      "Zheng He's voyages",
      "Great Wall expansion"
    ],
    region: "East Asia"
  },
  {
    id: "mughal-india",
    name: "Mughal Empire",
    startYear: 1526,
    endYear: 1857,
    color: "oklch(0.51 0.13 50)",
    parentId: "mongol-empire",
    description: "Synthesis of Persian, Indian, and Islamic cultures creating unique artistic traditions.",
    culturalHighlights: [
      "Taj Mahal",
      "Miniature painting",
      "Indo-Islamic architecture",
      "Urdu language development"
    ],
    region: "South Asia"
  },
  {
    id: "enlightenment-europe",
    name: "Enlightenment Europe",
    startYear: 1650,
    endYear: 1800,
    color: "oklch(0.60 0.10 260)",
    parentId: "renaissance-italy",
    description: "Age of reason emphasizing science, individual rights, and social progress.",
    culturalHighlights: [
      "Scientific method",
      "Social contract theory",
      "Encyclopedia",
      "Separation of powers"
    ],
    region: "Western Europe"
  },
  {
    id: "modern-europe",
    name: "Modern Europe",
    startYear: 1800,
    endYear: null,
    color: "oklch(0.62 0.08 265)",
    parentId: "enlightenment-europe",
    description: "Industrial revolution, nationalism, and democratic movements shaping contemporary society.",
    culturalHighlights: [
      "Industrial Revolution",
      "Romantic and Modernist movements",
      "Democratic reforms",
      "European Union formation"
    ],
    region: "Europe"
  },
  {
    id: "modern-usa",
    name: "United States",
    startYear: 1776,
    endYear: null,
    color: "oklch(0.61 0.09 268)",
    parentId: "enlightenment-europe",
    description: "Democratic republic founded on Enlightenment principles, becoming global cultural force.",
    culturalHighlights: [
      "Constitutional democracy",
      "Jazz and blues music",
      "Hollywood film industry",
      "Technological innovation"
    ],
    region: "North America"
  },
  {
    id: "modern-china",
    name: "Modern China",
    startYear: 1949,
    endYear: null,
    color: "oklch(0.59 0.18 10)",
    parentId: "ming-china",
    description: "People's Republic emerging as major economic and cultural power.",
    culturalHighlights: [
      "Economic reform and opening",
      "Contemporary Chinese cinema",
      "High-speed rail and infrastructure",
      "Digital innovation"
    ],
    region: "East Asia"
  },
  {
    id: "modern-india",
    name: "Modern India",
    startYear: 1947,
    endYear: null,
    color: "oklch(0.53 0.14 55)",
    parentId: "mughal-india",
    description: "Independent democratic nation blending ancient traditions with technological advancement.",
    culturalHighlights: [
      "World's largest democracy",
      "Bollywood film industry",
      "IT and software services",
      "Yoga and wellness globalization"
    ],
    region: "South Asia"
  },
  {
    id: "modern-japan",
    name: "Modern Japan",
    startYear: 1868,
    endYear: null,
    color: "oklch(0.58 0.15 5)",
    parentId: "tang-china",
    description: "Rapid modernization while maintaining cultural identity, influential in technology and pop culture.",
    culturalHighlights: [
      "Meiji Restoration modernization",
      "Anime and manga",
      "Technological innovation",
      "Zen aesthetic in design"
    ],
    region: "East Asia"
  }
];

export const timePeriods = [
  { name: "ANCIENT", startYear: -4000, endYear: -500, color: "oklch(0.45 0.12 35)" },
  { name: "CLASSICAL", startYear: -500, endYear: 500, color: "oklch(0.50 0.11 40)" },
  { name: "MEDIEVAL", startYear: 500, endYear: 1400, color: "oklch(0.52 0.09 250)" },
  { name: "RENAISSANCE", startYear: 1400, endYear: 1650, color: "oklch(0.58 0.12 50)" },
  { name: "ENLIGHTENMENT", startYear: 1650, endYear: 1800, color: "oklch(0.60 0.10 260)" },
  { name: "MODERN", startYear: 1800, endYear: 2000, color: "oklch(0.62 0.08 265)" },
  { name: "CONTEMPORARY", startYear: 2000, endYear: 2100, color: "oklch(0.65 0.06 270)" }
];
