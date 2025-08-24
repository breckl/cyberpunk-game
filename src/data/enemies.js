const enemies = [
  // Level 1 Enemies
  {
    id: "simstim_junkie",
    name: "Simstim Junkie",
    description: "Neural-feed addict, violent but fragile",
    type: "Thug",
    level: 1,
    baseHp: 25,
    attack: 4,
    defense: 5, // 5% armor bonus
    exp: 15,
    region: "Chiba Alleys",
    credits: 20,
    armor: {
      name: "None",
      rating: 0, // 0 = no bonus
    },
    weapon: {
      name: "Rusty Knife",
      damage: 4, // ±2 variance applied in combat
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
    baseHp: 28,
    attack: 5,
    defense: 5,
    exp: 16,
    region: "Iron Maze",
    credits: 25,
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Broken Bottle",
      damage: 5,
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
    baseHp: 30,
    attack: 6,
    defense: 6,
    exp: 18,
    region: "Iron Maze",
    credits: 30,
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Switchblade",
      damage: 6,
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
    baseHp: 24,
    attack: 4,
    defense: 4,
    exp: 14,
    region: "Chiba Market",
    credits: 15,
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Pocket Shiv",
      damage: 4,
      attacks: [
        "pulls out a hidden shiv",
        "makes a desperate thrust",
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
    baseHp: 30,
    attack: 6,
    defense: 5,
    exp: 16,
    region: "Chiba Bars",
    credits: 20,
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Bare Fists",
      damage: 6,
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
    baseHp: 28,
    attack: 5,
    defense: 5,
    exp: 18,
    region: "Chiba Alleys",
    credits: 25,
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Stun Rig",
      damage: 5,
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
    baseHp: 26,
    attack: 5,
    defense: 6,
    exp: 16,
    region: "Iron Maze Rooftops",
    credits: 22,
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Sling Blade",
      damage: 5,
      attacks: [
        "swings their sling blade",
        "makes a quick strike",
        "darts in and out",
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
    baseHp: 35,
    attack: 7,
    defense: 8,
    exp: 22,
    region: "Sprawl Streets",
    credits: 35,
    armor: {
      name: "Leather Jacket",
      rating: 1, // 1 = 10% bonus
    },
    weapon: {
      name: "Pipe Wrench",
      damage: 7,
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
    baseHp: 34,
    attack: 7,
    defense: 7,
    exp: 20,
    region: "Dog Solitude",
    credits: 30,
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Scrap Club",
      damage: 7,
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
    baseHp: 40,
    attack: 8,
    defense: 10,
    exp: 25,
    region: "Chiba Clinics",
    credits: 40,
    armor: {
      name: "Padded Vest",
      rating: 1,
    },
    weapon: {
      name: "Shock Baton",
      damage: 8,
      attacks: [
        "swings their shock baton",
        "delivers an electric strike",
        "charges with the baton",
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
    baseHp: 42,
    attack: 9,
    defense: 12,
    exp: 30,
    region: "Chiba Clinics",
    credits: 50,
    armor: {
      name: "Light Vest",
      rating: 1,
    },
    weapon: {
      name: "Restraint Gun",
      damage: 9,
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
    baseHp: 44,
    attack: 10,
    defense: 12,
    exp: 32,
    region: "Glass Quarter",
    credits: 55,
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Combat Knife",
      damage: 10,
      attacks: [
        "makes a precise stab",
        "swings their combat knife",
        "charges with deadly intent",
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
    baseHp: 50,
    attack: 13,
    defense: 15,
    exp: 40,
    region: "Chiba Shadows",
    credits: 70,
    armor: {
      name: "Leather Armor",
      rating: 2,
    },
    weapon: {
      name: "Razor Claws",
      damage: 13,
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
    baseHp: 55,
    attack: 13,
    defense: 16,
    exp: 44,
    region: "Iron Maze",
    credits: 75,
    armor: {
      name: "Dermal Plating I",
      rating: 2,
    },
    weapon: {
      name: "Spiked Gauntlets",
      damage: 13,
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
    baseHp: 65,
    attack: 15,
    defense: 20,
    exp: 62,
    region: "Chiba Docks",
    credits: 90,
    armor: {
      name: "Kevlar Armor",
      rating: 2,
    },
    weapon: {
      name: "Katana",
      damage: 15,
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
    baseHp: 68,
    attack: 16,
    defense: 22,
    exp: 65,
    region: "Sprawl Hubs",
    credits: 95,
    armor: {
      name: "Combat Armor",
      rating: 2,
    },
    weapon: {
      name: "Heavy Pistol",
      damage: 16,
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
    baseHp: 72,
    attack: 16,
    defense: 22,
    exp: 70,
    region: "Highspire Towers",
    credits: 110,
    armor: {
      name: "Tactical Vest",
      rating: 2,
    },
    weapon: {
      name: "Shock Staff",
      damage: 16,
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
    baseHp: 68,
    attack: 17,
    defense: 18,
    exp: 72,
    region: "Chiba Shadows",
    credits: 105,
    armor: {
      name: "Kevlar Mesh",
      rating: 2,
    },
    weapon: {
      name: "Silenced Pistol",
      damage: 17,
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

// Area-specific enemy functions
export const getCombatEnemies = () => {
  return getRandomEnemy(null, null, null, 1, 3); // Level 1-3 for general combat
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

export default enemies;
