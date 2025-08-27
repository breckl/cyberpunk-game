import ProgressionCalculator from "../utils/progressionCalculator.js";

const enemies = [
  // Level 1 Enemies
  {
    id: "simstim_junkie",
    name: "Simstim Junkie",
    description: "Neural-feed addict, violent but fragile",
    type: "Thug",
    level: 1,
    exp: ProgressionCalculator.calculateEnemyStats(1, "Thug").expReward,
    region: "Chiba Alleys",
    credits: ProgressionCalculator.calculateEnemyStats(1, "Thug").creditReward,
    armor: {
      name: "None",
      rating: 0, // 0 = no bonus
    },
    weapon: {
      name: "Rusty Knife",
      damage: ProgressionCalculator.calculateWeaponDamage(1, "Power") * 0.2, // Scaled down for level 1
      attacks: [
        "lunges with their rusty knife",
        "makes a desperate slash",
        "stabs wildly",
      ],
    },
  },
  {
    id: "street_punk",
    name: "Street Punk",
    description: "Loud, brash, easily put down",
    type: "Thug",
    level: 1,
    exp: ProgressionCalculator.calculateEnemyStats(1, "Thug").expReward,
    region: "Iron Maze",
    credits: ProgressionCalculator.calculateEnemyStats(1, "Thug").creditReward,
    armor: {
      name: "Black Hoodie",
      rating: ProgressionCalculator.calculateArmorDefense(1, "Light"),
    },
    weapon: {
      name: "Broken Bottle",
      damage: ProgressionCalculator.calculateWeaponDamage(1, "Power") * 0.5,
      attacks: [
        "swings their broken bottle",
        "makes a reckless charge",
        "throws glass shards",
      ],
    },
  },
  {
    id: "neon_jackal",
    name: "Neon Jackal",
    description: "Low-level gang member, thrives in chaos",
    type: "Thug",
    level: 1,
    exp: ProgressionCalculator.calculateEnemyStats(1, "Thug").expReward,
    region: "Iron Maze",
    credits: ProgressionCalculator.calculateEnemyStats(1, "Thug").creditReward,
    armor: {
      name: "Leather Vest",
      rating: ProgressionCalculator.calculateArmorDefense(1, "Light"),
    },
    weapon: {
      name: "Switchblade",
      damage: ProgressionCalculator.calculateWeaponDamage(1, "Power") * 0.7,
      attacks: [
        "flicks open their switchblade",
        "makes a quick stab",
        "slashes in an arc",
      ],
    },
  },
  {
    id: "noodle_thief",
    name: "Noodle Thief",
    description: "Desperate vagrant, steals food, lashes out",
    type: "Thug",
    level: 1,
    exp: ProgressionCalculator.calculateEnemyStats(1, "Thug").expReward,
    region: "Chiba Market",
    credits: ProgressionCalculator.calculateEnemyStats(1, "Thug").creditReward,
    armor: {
      name: "Heavy Coat",
      rating: ProgressionCalculator.calculateArmorDefense(1, "Light"),
    },
    weapon: {
      name: "Bare Fists",
      damage: 0,
      attacks: [
        "swings a wild punch",
        "makes a desperate swing",
        "swings wildly",
      ],
    },
  },
  {
    id: "bar_brawler",
    name: "Bar Brawler",
    description: "Drunk, fists flying, unpredictable",
    type: "Thug",
    level: 1,
    exp: ProgressionCalculator.calculateEnemyStats(1, "Thug").expReward,
    region: "Chiba Bars",
    credits: ProgressionCalculator.calculateEnemyStats(1, "Thug").creditReward,
    armor: {
      name: "Heavy Coat",
      rating: ProgressionCalculator.calculateArmorDefense(1, "Light"),
    },
    weapon: {
      name: "Bare Fists",
      damage: ProgressionCalculator.calculateWeaponDamage(1, "Power") * 0.6,
      attacks: [
        "swings a wild haymaker",
        "charges with drunken rage",
        "throws a clumsy punch",
      ],
    },
  },
  {
    id: "data_rat",
    name: "Data Rat",
    description: "Wannabe decker, uses cheap stun device",
    type: "Hacker",
    level: 1,
    exp: ProgressionCalculator.calculateEnemyStats(1, "Hacker").expReward,
    region: "Chiba Alleys",
    credits: ProgressionCalculator.calculateEnemyStats(1, "Hacker")
      .creditReward,
    armor: {
      name: "Leather Vest",
      rating: ProgressionCalculator.calculateArmorDefense(1, "Light"),
    },
    weapon: {
      name: "Stun Rig",
      damage: ProgressionCalculator.calculateWeaponDamage(1, "Tech") * 0.5,
      attacks: [
        "launches a neural spike",
        "overloads your cyberware",
        "sends shock feedback",
      ],
    },
  },
  {
    id: "rooftop_sneak",
    name: "Rooftop Sneak",
    description: "Agile petty thief, quick but weak",
    type: "Thug",
    level: 1,
    exp: ProgressionCalculator.calculateEnemyStats(1, "Thug").expReward,
    region: "Iron Maze Rooftops",
    credits: ProgressionCalculator.calculateEnemyStats(1, "Thug").creditReward,
    armor: {
      name: "Heavy Coat",
      rating: ProgressionCalculator.calculateArmorDefense(1, "Light"),
    },
    weapon: {
      name: "Sling Blade",
      damage: ProgressionCalculator.calculateWeaponDamage(1, "Power") * 0.3,
      attacks: [
        "swings their sling blade",
        "makes a quick strike",
        "darts in and out",
      ],
    },
  },
  {
    id: "drunken_chiba_port_sailor",
    name: "Drunken Chiba Port Sailor",
    description: "Brawler fresh off the docks, sloppy but strong when cornered",
    type: "Thug",
    level: 1,
    exp: ProgressionCalculator.calculateEnemyStats(1, "Thug").expReward,
    region: "Ninsei Strip",
    credits: ProgressionCalculator.calculateEnemyStats(1, "Thug").creditReward,
    armor: {
      name: "Heavy Jacket",
      rating: ProgressionCalculator.calculateArmorDefense(1, "Light"),
    },
    weapon: {
      name: "Broken Bottle",
      damage: ProgressionCalculator.calculateWeaponDamage(1, "Power") * 0.6,
      attacks: [
        "swings their broken bottle",
        "makes a drunken charge",
        "throws glass shards",
      ],
    },
  },
  {
    id: "chatsubo_drunk",
    name: "Chatsubo Drunk",
    description: "Regular at the bar, staggers with sudden swings",
    type: "Thug",
    level: 1,
    exp: ProgressionCalculator.calculateEnemyStats(1, "Thug").expReward,
    region: "Ninsei / Chatsubo",
    credits: ProgressionCalculator.calculateEnemyStats(1, "Thug").creditReward,
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Bar Stool Leg",
      damage: ProgressionCalculator.calculateWeaponDamage(1, "Power") * 0.2,
      attacks: [
        "swings the stool leg wildly",
        "charges with drunken rage",
        "throws the broken furniture",
      ],
    },
  },
  {
    id: "simstim_burnout",
    name: "Simstim Burnout",
    description: "Addict fried on neural feeds, lashes out unpredictably",
    type: "Thug",
    level: 1,
    exp: ProgressionCalculator.calculateEnemyStats(1, "Thug").expReward,
    region: "Ninsei Alley",
    credits: ProgressionCalculator.calculateEnemyStats(1, "Thug").creditReward,
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Rusty Shiv",
      damage: ProgressionCalculator.calculateWeaponDamage(1, "Power") * 0.3,
      attacks: [
        "lunges with their rusty shiv",
        "makes a desperate slash",
        "stabs wildly",
      ],
    },
  },

  // Level 2 Enemies
  {
    id: "sprawl_ganger",
    name: "Sprawl Ganger",
    description: "Generic gang soldier, fights in numbers",
    type: "Thug",
    level: 2,
    exp: ProgressionCalculator.calculateEnemyStats(2, "Thug").expReward,
    region: "Sprawl Streets",
    credits: ProgressionCalculator.calculateEnemyStats(2, "Thug").creditReward,
    armor: {
      name: "Leather Jacket",
      rating: ProgressionCalculator.calculateArmorDefense(2, "Light"),
    },
    weapon: {
      name: "Pipe Wrench",
      damage: ProgressionCalculator.calculateWeaponDamage(2, "Power"),
      attacks: [
        "swings their pipe wrench",
        "makes a heavy strike",
        "charges with the wrench",
      ],
    },
  },
  {
    id: "alley_scav",
    name: "Alley Scav",
    description: "Scrapper with improvised gear",
    type: "Thug",
    level: 2,
    exp: ProgressionCalculator.calculateEnemyStats(2, "Thug").expReward,
    region: "Dog Solitude",
    credits: ProgressionCalculator.calculateEnemyStats(2, "Thug").creditReward,
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Scrap Club",
      damage: ProgressionCalculator.calculateWeaponDamage(2, "Power") * 0.8,
      attacks: [
        "swings their scrap club",
        "makes a desperate strike",
        "charges with the club",
      ],
    },
  },
  {
    id: "clinic_bouncer",
    name: "Clinic Bouncer",
    description: "Black clinic guard, simple muscle",
    type: "Heavy",
    level: 2,
    exp: ProgressionCalculator.calculateEnemyStats(2, "Heavy").expReward,
    region: "Chiba Clinics",
    credits: ProgressionCalculator.calculateEnemyStats(2, "Heavy").creditReward,
    armor: {
      name: "Padded Vest",
      rating: ProgressionCalculator.calculateArmorDefense(2, "Medium"),
    },
    weapon: {
      name: "Shock Baton",
      damage: ProgressionCalculator.calculateWeaponDamage(2, "Tech"),
      attacks: [
        "swings their shock baton",
        "delivers an electric strike",
        "charges with the baton",
      ],
    },
  },
  {
    id: "ninsei_strip_hustler",
    name: "Ninsei Hustler",
    description: "Smooth-talking fixer, fights dirty when deals go bad",
    type: "Thug",
    level: 2,
    exp: ProgressionCalculator.calculateEnemyStats(2, "Thug").expReward,
    region: "Ninsei Strip",
    credits: ProgressionCalculator.calculateEnemyStats(2, "Thug").creditReward,
    armor: {
      name: "Leather Jacket",
      rating: ProgressionCalculator.calculateArmorDefense(2, "Light"),
    },
    weapon: {
      name: "Concealed Pistol",
      damage: ProgressionCalculator.calculateWeaponDamage(2, "Power"),
      attacks: [
        "draws their concealed pistol",
        "takes a quick shot",
        "fires from the hip",
      ],
    },
  },
  {
    id: "pachinko_ganger",
    name: "Pachinko Ganger",
    description: "Runs a backroom parlor, defends turf with a blade",
    type: "Thug",
    level: 2,
    exp: ProgressionCalculator.calculateEnemyStats(2, "Thug").expReward,
    region: "Ninsei / Pachinko Parlor",
    credits: ProgressionCalculator.calculateEnemyStats(2, "Thug").creditReward,
    armor: {
      name: "Reinforced Jacket",
      rating: ProgressionCalculator.calculateArmorDefense(2, "Medium"),
    },
    weapon: {
      name: "Switchblade",
      damage: ProgressionCalculator.calculateWeaponDamage(2, "Power"),
      attacks: [
        "flicks open their switchblade",
        "makes a quick stab",
        "slashes in an arc",
      ],
    },
  },
  {
    id: "chatsubo_bouncer",
    name: "Chatsubo Bouncer",
    description: "Keeps order at Ratz's bar; heavy fists and thicker skin",
    type: "Heavy",
    level: 2,
    exp: ProgressionCalculator.calculateEnemyStats(2, "Heavy").expReward,
    region: "Ninsei / Chatsubo",
    credits: ProgressionCalculator.calculateEnemyStats(2, "Heavy").creditReward,
    armor: {
      name: "Padded Vest",
      rating: ProgressionCalculator.calculateArmorDefense(2, "Medium"),
    },
    weapon: {
      name: "Shock Baton",
      damage: ProgressionCalculator.calculateWeaponDamage(2, "Tech"),
      attacks: [
        "swings their shock baton",
        "delivers an electric strike",
        "charges with the baton",
      ],
    },
  },
  {
    id: "street_snatcher",
    name: "Street Snatcher",
    description: "Grabs purses and chips, fights when cornered",
    type: "Thug",
    level: 2,
    exp: ProgressionCalculator.calculateEnemyStats(2, "Thug").expReward,
    region: "Ninsei Alley",
    credits: ProgressionCalculator.calculateEnemyStats(2, "Thug").creditReward,
    armor: {
      name: "Hoodie",
      rating: 0,
    },
    weapon: {
      name: "Shiv",
      damage: ProgressionCalculator.calculateWeaponDamage(2, "Power") * 0.8,
      attacks: [
        "lunges with their shiv",
        "makes a desperate slash",
        "stabs wildly",
      ],
    },
  },

  // Level 3 Enemies
  {
    id: "clinic_repoman",
    name: "Clinic Repoman",
    description: "Tracks debtors, extracts implants",
    type: "Heavy",
    level: 3,
    exp: ProgressionCalculator.calculateEnemyStats(3, "Heavy").expReward,
    region: "Chiba Clinics",
    credits: ProgressionCalculator.calculateEnemyStats(3, "Heavy").creditReward,
    armor: {
      name: "Light Vest",
      rating: ProgressionCalculator.calculateArmorDefense(3, "Light"),
    },
    weapon: {
      name: "Restraint Gun",
      damage: ProgressionCalculator.calculateWeaponDamage(3, "Tech"),
      attacks: [
        "fires a restraint net",
        "takes aim with precision",
        "launches a capture device",
      ],
    },
  },
  {
    id: "syndicate_runner",
    name: "Syndicate Runner",
    description: "Courier for syndicate, quick & armed",
    type: "Thug",
    level: 3,
    exp: ProgressionCalculator.calculateEnemyStats(3, "Thug").expReward,
    region: "Glass Quarter",
    credits: ProgressionCalculator.calculateEnemyStats(3, "Thug").creditReward,
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Combat Knife",
      damage: ProgressionCalculator.calculateWeaponDamage(3, "Power"),
      attacks: [
        "makes a precise stab",
        "swings their combat knife",
        "charges with deadly intent",
      ],
    },
  },
  {
    id: "black_clinic_security",
    name: "Black Clinic Security",
    description: "Guards for a ripperdoc, loyal and armed",
    type: "Heavy",
    level: 3,
    exp: ProgressionCalculator.calculateEnemyStats(3, "Heavy").expReward,
    region: "Ninsei / Black Clinic",
    credits: ProgressionCalculator.calculateEnemyStats(3, "Heavy").creditReward,
    armor: {
      name: "Kevlar Vest",
      rating: ProgressionCalculator.calculateArmorDefense(3, "Medium"),
    },
    weapon: {
      name: "SMG",
      damage: ProgressionCalculator.calculateWeaponDamage(3, "Power"),
      attacks: [
        "fires a burst from their SMG",
        "takes aim with precision",
        "sprays bullets",
      ],
    },
  },
  {
    id: "biosoft_heavy",
    name: "Biosoft Heavy",
    description:
      "Syndicate-backed, defends biosoft shipments with chrome muscle",
    type: "Heavy",
    level: 3,
    exp: ProgressionCalculator.calculateEnemyStats(3, "Heavy").expReward,
    region: "Ninsei Warehouses",
    credits: ProgressionCalculator.calculateEnemyStats(3, "Heavy").creditReward,
    armor: {
      name: "Dermal Plating I",
      rating: ProgressionCalculator.calculateArmorDefense(3, "Heavy"),
    },
    weapon: {
      name: "Cyber Fist",
      damage: ProgressionCalculator.calculateWeaponDamage(3, "Tech"),
      attacks: [
        "swings their cyber fist",
        "delivers a crushing blow",
        "charges with chrome-enhanced strength",
      ],
    },
  },

  // Level 4 Enemies
  {
    id: "razorgirl",
    name: "Razorgirl",
    description: "Augmented street fighter with cyberclaws",
    type: "Assassin",
    level: 4,
    exp: ProgressionCalculator.calculateEnemyStats(4, "Assassin").expReward,
    region: "Chiba Shadows",
    credits: ProgressionCalculator.calculateEnemyStats(4, "Assassin")
      .creditReward,
    armor: {
      name: "Leather Armor",
      rating: ProgressionCalculator.calculateArmorDefense(4, "Medium"),
    },
    weapon: {
      name: "Razor Claws",
      damage: ProgressionCalculator.calculateWeaponDamage(4, "Tech"),
      attacks: [
        "slashes with cyberclaws",
        "makes a precision strike",
        "unleashes a flurry of cuts",
      ],
    },
  },
  {
    id: "pit_fighter",
    name: "Pit Fighter",
    description: "Arena-trained cyber brawler",
    type: "Heavy",
    level: 4,
    exp: ProgressionCalculator.calculateEnemyStats(4, "Heavy").expReward,
    region: "Iron Maze",
    credits: ProgressionCalculator.calculateEnemyStats(4, "Heavy").creditReward,
    armor: {
      name: "Dermal Plating I",
      rating: ProgressionCalculator.calculateArmorDefense(4, "Heavy"),
    },
    weapon: {
      name: "Spiked Gauntlets",
      damage: ProgressionCalculator.calculateWeaponDamage(4, "Power"),
      attacks: [
        "swings spiked gauntlets",
        "delivers a crushing blow",
        "charges with cyber-enhanced strength",
      ],
    },
  },

  // Level 5 Enemies
  {
    id: "yakuza_enforcer",
    name: "Yakuza Enforcer",
    description: "Syndicate soldier, disciplined",
    type: "Heavy",
    level: 5,
    exp: ProgressionCalculator.calculateEnemyStats(5, "Heavy").expReward,
    region: "Chiba Docks",
    credits: ProgressionCalculator.calculateEnemyStats(5, "Heavy").creditReward,
    armor: {
      name: "Kevlar Armor",
      rating: ProgressionCalculator.calculateArmorDefense(5, "Medium"),
    },
    weapon: {
      name: "Katana",
      damage: ProgressionCalculator.calculateWeaponDamage(5, "Power"),
      attacks: [
        "draws their katana with precision",
        "makes a swift strike",
        "unleashes a deadly combo",
      ],
    },
  },
  {
    id: "mercenary",
    name: "Mercenary",
    description: "Professional freelance fighter",
    type: "Heavy",
    level: 5,
    exp: ProgressionCalculator.calculateEnemyStats(5, "Heavy").expReward,
    region: "Sprawl Hubs",
    credits: ProgressionCalculator.calculateEnemyStats(5, "Heavy").creditReward,
    armor: {
      name: "Combat Armor",
      rating: ProgressionCalculator.calculateArmorDefense(5, "Medium"),
    },
    weapon: {
      name: "Heavy Pistol",
      damage: ProgressionCalculator.calculateWeaponDamage(5, "Power"),
      attacks: [
        "takes aim with military precision",
        "fires a controlled burst",
        "uses tactical positioning",
      ],
    },
  },

  // Level 6+ Enemies (High-level examples)
  {
    id: "bodyguard",
    name: "Bodyguard",
    description: "Corporate protector, intercepts blows",
    type: "Heavy",
    level: 6,
    exp: ProgressionCalculator.calculateEnemyStats(6, "Heavy").expReward,
    region: "Highspire Towers",
    credits: ProgressionCalculator.calculateEnemyStats(6, "Heavy").creditReward,
    armor: {
      name: "Tactical Vest",
      rating: ProgressionCalculator.calculateArmorDefense(6, "Heavy"),
    },
    weapon: {
      name: "Shock Staff",
      damage: ProgressionCalculator.calculateWeaponDamage(6, "Tech"),
      attacks: [
        "swings their shock staff",
        "delivers an electric strike",
        "uses defensive positioning",
      ],
    },
  },
  {
    id: "assassin",
    name: "Assassin",
    description: "Precision killer, stealth-based",
    type: "Assassin",
    level: 6,
    exp: ProgressionCalculator.calculateEnemyStats(6, "Assassin").expReward,
    region: "Chiba Shadows",
    credits: ProgressionCalculator.calculateEnemyStats(6, "Assassin")
      .creditReward,
    armor: {
      name: "Kevlar Mesh",
      rating: ProgressionCalculator.calculateArmorDefense(6, "Light"),
    },
    weapon: {
      name: "Silenced Pistol",
      damage: ProgressionCalculator.calculateWeaponDamage(6, "Power"),
      attacks: [
        "takes a silent shot",
        "makes a precision strike",
        "uses stealth tactics",
      ],
    },
  },
];

// Helper functions for enemy management
export const getEnemiesByLevel = (level) => {
  return enemies.filter((enemy) => enemy.level === level);
};

export const getEnemiesByType = (type) => {
  return enemies.filter((enemy) => enemy.type === type);
};

export const getEnemiesByRegion = (region) => {
  return enemies.filter((enemy) => enemy.region === region);
};

export const getRandomEnemy = (
  level = null,
  type = null,
  region = null,
  minLevel = 1,
  maxLevel = 3
) => {
  let filteredEnemies = enemies;

  // Filter by level range (default: level 1-3 for combat)
  filteredEnemies = filteredEnemies.filter(
    (enemy) => enemy.level >= minLevel && enemy.level <= maxLevel
  );

  if (level !== null) {
    filteredEnemies = filteredEnemies.filter((enemy) => enemy.level === level);
  }

  if (type !== null) {
    filteredEnemies = filteredEnemies.filter((enemy) => enemy.type === type);
  }

  if (region !== null) {
    filteredEnemies = filteredEnemies.filter(
      (enemy) => enemy.region === region
    );
  }

  if (filteredEnemies.length === 0) {
    return enemies[0]; // Fallback to first enemy
  }

  return filteredEnemies[Math.floor(Math.random() * filteredEnemies.length)];
};

export const getEnemyById = (id) => {
  return enemies.find((enemy) => enemy.id === id);
};

// New function to generate balanced enemies dynamically
export const generateBalancedEnemy = (level, type = "Thug", region = null) => {
  const stats = ProgressionCalculator.calculateEnemyStats(level, type);

  return {
    id: `generated_${type.toLowerCase()}_${level}`,
    name: `Level ${level} ${type}`,
    description: `Generated ${type.toLowerCase()} for testing balance`,
    type: type,
    level: level,
    exp: stats.expReward,
    region: region || "Generated",
    credits: stats.creditReward,
    armor: {
      name: "Generated Armor",
      rating: ProgressionCalculator.calculateArmorDefense(level, "Light"),
    },
    weapon: {
      name: "Generated Weapon",
      damage: ProgressionCalculator.calculateWeaponDamage(level, "Power"),
      attacks: [
        "attacks with their weapon",
        "makes a strike",
        "charges forward",
      ],
    },
  };
};

// Area-specific enemy functions
export const getCombatEnemies = (locationId = null) => {
  if (locationId) {
    // Import locations dynamically to avoid circular imports
    import("./locations.js").then(({ getLocationEnemies }) => {
      const locationEnemies = getLocationEnemies(locationId);
      if (locationEnemies) {
        // Use location-specific enemy probabilities and IDs
        return getLocationBasedEnemy(locationEnemies);
      }
    });
  }

  // Fallback to default level 1-3 enemies
  return getRandomEnemy(null, null, null, 1, 3);
};

// Helper function to get enemies based on location probabilities
const getLocationBasedEnemy = (locationEnemies) => {
  const { probabilities, enemyIds } = locationEnemies;

  // Generate random number for probability check
  const rand = Math.random() * 100;
  let cumulativeProb = 0;
  let selectedLevel = 1;

  // Find which level bracket the random number falls into
  for (const [level, probability] of Object.entries(probabilities)) {
    cumulativeProb += probability;
    if (rand <= cumulativeProb) {
      selectedLevel = parseInt(level);
      break;
    }
  }

  // Filter enemies by selected level and available IDs
  const availableEnemies = enemies.filter(
    (enemy) => enemy.level === selectedLevel && enemyIds.includes(enemy.id)
  );

  if (availableEnemies.length === 0) {
    // Fallback to any enemy of the selected level
    const fallbackEnemies = enemies.filter(
      (enemy) => enemy.level === selectedLevel
    );
    return fallbackEnemies[Math.floor(Math.random() * fallbackEnemies.length)];
  }

  return availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
};

export const getStreetEnemies = () => {
  return getRandomEnemy(null, null, null, 1, 2); // Level 1-2 for street encounters
};

export const getDowntownEnemies = () => {
  return getRandomEnemy(null, null, null, 2, 4); // Level 2-4 for downtown
};

export const getUptownEnemies = () => {
  return getRandomEnemy(null, null, null, 3, 5); // Level 3-5 for uptown
};

export const getCorporateEnemies = () => {
  return getRandomEnemy(null, null, null, 4, 6); // Level 4-6 for corporate areas
};

export const getNetherworldEnemies = () => {
  return getRandomEnemy(null, null, null, 2, 5); // Level 2-5 for netherworld
};

// New function for level-based enemy selection with probability distribution
export const getLevelBasedEnemy = (playerLevel) => {
  // Define probability distribution for enemy levels
  const levelProbabilities = {
    [playerLevel - 2]: 5, // 5% chance for 2 levels below
    [playerLevel - 1]: 20, // 20% chance for 1 level below
    [playerLevel]: 50, // 50% chance for same level
    [playerLevel + 1]: 20, // 20% chance for 1 level above
    [playerLevel + 2]: 5, // 5% chance for 2 levels above
  };

  // Generate random number for probability check
  const rand = Math.random() * 100;
  let cumulativeProb = 0;
  let selectedLevel = playerLevel; // Default to same level

  // Find which level bracket the random number falls into
  for (const [level, probability] of Object.entries(levelProbabilities)) {
    cumulativeProb += probability;
    if (rand <= cumulativeProb) {
      selectedLevel = parseInt(level);
      break;
    }
  }

  // Ensure selected level is within valid range (1-10)
  selectedLevel = Math.max(1, Math.min(10, selectedLevel));

  // Filter enemies by selected level
  const availableEnemies = enemies.filter(
    (enemy) => enemy.level === selectedLevel
  );

  if (availableEnemies.length === 0) {
    // Fallback to any enemy of the selected level, or generate one if none exist
    const fallbackEnemies = enemies.filter(
      (enemy) => enemy.level === selectedLevel
    );

    if (fallbackEnemies.length > 0) {
      return fallbackEnemies[
        Math.floor(Math.random() * fallbackEnemies.length)
      ];
    } else {
      // Generate a balanced enemy if none exist for this level
      return generateBalancedEnemy(selectedLevel, "Thug", "Generated");
    }
  }

  return availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
};

export default enemies;
