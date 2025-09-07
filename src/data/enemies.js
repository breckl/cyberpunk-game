import {
  calculateWeaponDamage,
  calculateArmorDefense,
} from "../config/gameBalance.js";

const enemies = [
  // Level 1 Enemies
  {
    id: "simstim_junkie",
    name: "Simstim Junkie",
    description: "Neural-feed addict, violent but fragile",
    type: "Thug",
    level: 1,
    region: "Chiba Alleys",
    armor: {
      name: "None",
      rating: 0, // 0 = no bonus
    },
    weapon: {
      name: "Rusty Knife",
      damage: 0,
      attacks: [
        "lunges with their knife",
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
    region: "Iron Maze",
    armor: {
      name: "Black Hoodie",
      rating: 0,
    },
    weapon: {
      name: "Broken Bottle",
      damage: 0,
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
    region: "Iron Maze",
    armor: {
      name: "Leather Vest",
      rating: 0,
    },
    weapon: {
      name: "Switchblade",
      damage: calculateWeaponDamage(1, "Light"),
      attacks: ["makes a quick stab", "slashes in an arc"],
    },
  },
  {
    id: "noodle_thief",
    name: "Noodle Thief",
    description: "Desperate vagrant, steals food, lashes out",
    type: "Thug",
    level: 1,
    region: "Chiba Market",
    armor: {
      name: "Heavy Coat",
      rating: 0,
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
    region: "Chiba Bars",
    armor: {
      name: "Heavy Coat",
      rating: 0,
    },
    weapon: {
      name: "Bare Fists",
      damage: calculateWeaponDamage(1, "Light"),
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
    region: "Chiba Alleys",
    armor: {
      name: "Leather Vest",
      rating: calculateArmorDefense(1, "Light"),
    },
    weapon: {
      name: "Stun Rig",
      damage: 0,
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
    region: "Iron Maze Rooftops",
    armor: {
      name: "Heavy Coat",
      rating: calculateArmorDefense(1, "Light"),
    },
    weapon: {
      name: "Sling Blade",
      damage: 0,
      attacks: [
        "swings their blade",
        "makes a quick strike",
        "darts in and out",
      ],
    },
  },
  {
    id: "drunken_chiba_port_sailor",
    name: "Drunken Sailor",
    description: "Brawler fresh off the docks, sloppy but strong when cornered",
    type: "Thug",
    level: 1,
    region: "Ninsei Strip",
    armor: {
      name: "Heavy Jacket",
      rating: calculateArmorDefense(1, "Light"),
    },
    weapon: {
      name: "Broken Bottle",
      damage: 0,
      attacks: [
        "swings their bottle",
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
    region: "Ninsei / Chatsubo",
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Bar Stool Leg",
      damage: calculateWeaponDamage(1, "Light"),
      attacks: [
        "swings a stool leg",
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
    region: "Ninsei Alley",
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Rusty Shiv",
      damage: calculateWeaponDamage(1, "Heavy"),
      attacks: [
        "lunges with their shiv",
        "makes a desperate slash",
        "stabs wildly",
      ],
    },
  },
  {
    id: "augment_burnout",
    name: "Augment Burnout",
    description:
      "Cybernetic addict whose implants are failing, erratic and dangerous",
    type: "Thug",
    level: 1,
    region: "Ninsei Alley",
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Malfunctioning Cyber Fist",
      damage: calculateWeaponDamage(1, "Medium"),
      attacks: [
        "swings a cyber fist",
        "makes a glitchy strike",
        "attacks with erratic movements",
      ],
    },
  },
  {
    id: "cyber_scav",
    name: "Cyber Scav",
    description: "Robotic animal that stalks the alleyways, hunting for scrap",
    type: "Thug",
    level: 1,
    region: "Chiba Alleys",
    armor: {
      name: "Scrap Metal Hide",
      rating: 0,
    },
    weapon: {
      name: "Sharpened Claws",
      damage: calculateWeaponDamage(1, "Light"),
      attacks: [
        "lunges with sharpened claws",
        "makes a quick strike",
        "charges with their claws",
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
    region: "Sprawl Streets",
    armor: {
      name: "Leather Jacket",
      rating: calculateArmorDefense(2, "Light"),
    },
    weapon: {
      name: "Pipe Wrench",
      damage: calculateWeaponDamage(2, "Light"),
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
    region: "Dog Solitude",
    armor: {
      name: "None",
      rating: calculateWeaponDamage(2, "Medium"),
    },
    weapon: {
      name: "Scrap Club",
      damage: calculateWeaponDamage(2, "Medium"),
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
    region: "Chiba Clinics",
    armor: {
      name: "Padded Vest",
      rating: calculateArmorDefense(2, "Medium"),
    },
    weapon: {
      name: "Shock Baton",
      damage: calculateWeaponDamage(2, "Medium"),
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
    region: "Ninsei Strip",
    armor: {
      name: "Leather Jacket",
      rating: calculateArmorDefense(2, "Light"),
    },
    weapon: {
      name: "Concealed Pistol",
      damage: calculateWeaponDamage(2, "Light"),
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
    region: "Ninsei / Pachinko Parlor",
    armor: {
      name: "Reinforced Jacket",
      rating: calculateArmorDefense(2, "Medium"),
    },
    weapon: {
      name: "Switchblade",
      damage: calculateWeaponDamage(2, "Heavy"),
      attacks: [
        "flicks their switchblade",
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
    region: "Ninsei / Chatsubo",
    armor: {
      name: "Padded Vest",
      rating: calculateArmorDefense(2, "Heavy"),
    },
    weapon: {
      name: "Shock Baton",
      damage: calculateWeaponDamage(2, "Heavy"),
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
    region: "Ninsei Alley",
    armor: {
      name: "Hoodie",
      rating: calculateArmorDefense(2, "Medium"),
    },
    weapon: {
      name: "Shiv",
      damage: calculateWeaponDamage(2, "Medium"),
      attacks: [
        "lunges with their shiv",
        "makes a desperate slash",
        "stabs wildly",
      ],
    },
  },
  {
    id: "meat_puppet",
    name: "Meat Puppet",
    description:
      "Junkie controlled by a remote hacker, moves with unnatural precision",
    type: "Thug",
    level: 2,
    region: "Ninsei Alley",
    armor: {
      name: "Tattered Clothes",
      rating: calculateArmorDefense(2, "Heavy"),
    },
    weapon: {
      name: "Hacker-Controlled Fists",
      damage: calculateWeaponDamage(2, "Heavy"),
      attacks: [
        "moves with unnatural precision",
        "executes a calculated strike",
        "performs a hacker-directed attack",
      ],
    },
  },
  {
    id: "simstim_fanatic",
    name: "Simstim Fanatic",
    description:
      "Addicted to neural stimulation, fights with enhanced reflexes",
    type: "Thug",
    level: 2,
    region: "Ninsei Strip",
    armor: {
      name: "None",
      rating: calculateArmorDefense(2, "Medium"),
    },
    weapon: {
      name: "Enhanced Fists",
      damage: calculateWeaponDamage(2, "Heavy"),
      attacks: [
        "moves with drug-enhanced speed",
        "delivers a rapid strike",
        "attacks with neural-boosted reflexes",
      ],
    },
  },

  // Additional Level 3 Enemies (Light)
  {
    id: "armed_drone",
    name: "Armed Drone",
    description: "Automated security drone with basic combat protocols",
    type: "Thug",
    level: 3,
    region: "Chiba Market",
    armor: {
      name: "Light Alloy Frame",
      rating: calculateArmorDefense(3, "Light"), // Light drone armor
    },
    weapon: {
      name: "Pulse Laser",
      damage: calculateWeaponDamage(3, "Light"), // Scaled down for easier combat
      attacks: [
        "fires a pulse laser burst",
        "takes aim with mechanical precision",
        "executes a combat protocol sequence",
      ],
    },
  },
  {
    id: "slamhound",
    name: "Slamhound",
    description:
      "Cyborg attack dog with enhanced reflexes and cybernetic fangs",
    type: "Thug",
    level: 3,
    region: "Ninsei Strip",
    armor: {
      name: "Cybernetic Hide",
      rating: calculateArmorDefense(3, "Medium"), // Light cyber armor
    },
    weapon: {
      name: "Cyber Fangs",
      damage: calculateWeaponDamage(3, "Light"), // Scaled down for easier combat
      attacks: [
        "lunges with cybernetic fangs",
        "makes a quick snap attack",
        "charges with enhanced speed",
      ],
    },
  },
  {
    id: "corporate_intern",
    name: "Corporate Intern",
    description: "Overworked and undertrained, panics easily",
    type: "Thug",
    level: 3,
    region: "Corporate District",
    armor: {
      name: "Business Suit",
      rating: calculateArmorDefense(3, "Medium"), // Minimal protection
    },
    weapon: {
      name: "Stun Baton",
      damage: calculateWeaponDamage(3, "Medium"), // Reduced tech damage
      attacks: [
        "swings their stun baton nervously",
        "makes a panicked strike",
        "fumbles with the weapon controls",
      ],
    },
  },
  {
    id: "cyber_bruiser",
    name: "Cyber Bruiser",
    description: "Cybernetic muscle-bound thug, fights with brute strength",
    type: "Thug",
    level: 3,
    region: "Chiba Docks",
    armor: {
      name: "Cybernetic Armor",
      rating: calculateArmorDefense(3, "Heavy"),
    },
    weapon: {
      name: "Power Fist",
      damage: calculateWeaponDamage(3, "Heavy"),
      attacks: [
        "charges with cyber-enhanced strength",
        "delivers a crushing blow",
        "punches with brute force",
      ],
    },
  },
  {
    id: "voodoo_construct",
    name: "Voodoo Construct",
    description: "Cybernetic puppeteer, uses dark magic to control foes",
    type: "Thug",
    level: 3,
    region: "Ninsei Alley",
    armor: {
      name: "Tattered Robes",
      rating: calculateArmorDefense(3, "Medium"),
    },
    weapon: {
      name: "Dark Energy Blade",
      damage: calculateWeaponDamage(3, "Medium"),
      attacks: [
        "swings a blade of dark energy",
        "creates a spectral aura",
        "siphons life force",
      ],
    },
  },
  {
    id: "memory_thief",
    name: "Memory Thief",
    description: "Hacker with advanced neural implants, steals memories",
    type: "Hacker",
    level: 3,
    region: "Netherworld",
    armor: {
      name: "Neural Interface Suit",
      rating: calculateArmorDefense(3, "Light"),
    },
    weapon: {
      name: "Neural Spike",
      damage: calculateWeaponDamage(3, "Medium"),
      attacks: [
        "launches a neural spike",
        "overloads your cyberware",
        "sends shock feedback",
      ],
    },
  },
  {
    id: "street_enforcer",
    name: "Street Enforcer",
    description: "Corp-backed muscle, brutal and efficient",
    type: "Thug",
    level: 3,
    region: "Corporate District",
    armor: {
      name: "Business Suit",
      rating: calculateArmorDefense(3, "Medium"),
    },
    weapon: {
      name: "Power Fist",
      damage: calculateWeaponDamage(3, "Light"),
      attacks: [
        "charges with cyber-enhanced strength",
        "delivers a crushing blow",
        "punches with brute force",
      ],
    },
  },
  {
    id: "organ_broker",
    name: "Organ Broker",
    description:
      "Cybernetic organ broker, trades cybernetic enhancements for organs",
    type: "Thug",
    level: 3,
    region: "Chiba Docks",
    armor: {
      name: "Cybernetic Hide",
      rating: calculateArmorDefense(3, "Medium"),
    },
    weapon: {
      name: "Cyber Fangs",
      damage: calculateWeaponDamage(3, "Light"),
      attacks: [
        "lunges with cybernetic fangs",
        "makes a quick snap attack",
        "charges with enhanced speed",
      ],
    },
  },
  {
    id: "drone_swarm",
    name: "Drone Swarm",
    description: "A group of automated drones, coordinated for combat",
    type: "Thug",
    level: 3,
    region: "Chiba Market",
    armor: {
      name: "Light Alloy Frame",
      rating: calculateArmorDefense(3, "Light"), // Scaled down for easier combat
    },
    weapon: {
      name: "Pulse Lasers",
      damage: calculateWeaponDamage(3, "Medium"), // Scaled down for easier combat
      attacks: [
        "fires a coordinated burst of pulse lasers",
        "takes aim with mechanical precision",
        "executes a combat protocol sequence",
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
    region: "Chiba Clinics",
    armor: {
      name: "Light Vest",
      rating: calculateArmorDefense(3, "Light"),
    },
    weapon: {
      name: "Restraint Gun",
      damage: calculateWeaponDamage(3, "Medium"),
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
    region: "Glass Quarter",
    armor: {
      name: "Light Vest",
      rating: calculateArmorDefense(3, "Medium"),
    },
    weapon: {
      name: "Combat Knife",
      damage: calculateWeaponDamage(3, "Medium"),
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
    region: "Ninsei / Black Clinic",
    armor: {
      name: "Kevlar Vest",
      rating: calculateArmorDefense(3, "Heavy"),
    },
    weapon: {
      name: "SMG",
      damage: calculateWeaponDamage(3, "Heavy"),
      attacks: [
        "fires a burst from their SMG",
        "takes aim with precision",
        "sprays bullets",
      ],
    },
  },
  {
    id: "biosoft_heavy",
    name: "Augmented Heavy",
    description:
      "Syndicate-backed, defends biosoft shipments with chrome muscle",
    type: "Heavy",
    level: 3,
    region: "Ninsei Warehouses",
    armor: {
      name: "Dermal Plating I",
      rating: calculateArmorDefense(3, "Heavy"),
    },
    weapon: {
      name: "Cyber Fist",
      damage: calculateWeaponDamage(3, "Heavy"),
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
    region: "Chiba Shadows",
    armor: {
      name: "Leather Armor",
      rating: calculateArmorDefense(4, "Medium"),
    },
    weapon: {
      name: "Razor Claws",
      damage: calculateWeaponDamage(4, "Medium"),
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
    region: "Iron Maze",
    armor: {
      name: "Dermal Plating I",
      rating: calculateArmorDefense(4, "Heavy"),
    },
    weapon: {
      name: "Spiked Gauntlets",
      damage: calculateWeaponDamage(4, "Light"),
      attacks: [
        "swings spiked gauntlets",
        "delivers a crushing blow",
        "charges with cyber-enhanced strength",
      ],
    },
  },
  {
    id: "corpo_fixer",
    name: "Corpo Fixer",
    description:
      "Smooth-talking, well-connected fixer, fights dirty when deals go bad",
    type: "Thug",
    level: 4,
    region: "Corporate District",
    armor: {
      name: "Leather Jacket",
      rating: calculateArmorDefense(4, "Light"),
    },
    weapon: {
      name: "Concealed Pistol",
      damage: calculateWeaponDamage(4, "Light"),
      attacks: [
        "draws their concealed pistol",
        "takes a quick shot",
        "fires from the hip",
      ],
    },
  },

  // Additional Level 4 Enemies (Light)
  {
    id: "panther_modern",
    name: "Panther Modern",
    description:
      "Techno-fetish anarchist with chrome enhancements and anti-corp ideology",
    type: "Thug",
    level: 4,
    region: "Ninsei Strip",
    armor: {
      name: "Chrome Mesh",
      rating: calculateArmorDefense(4, "Light"), // Light chrome armor
    },
    weapon: {
      name: "Monowire",
      damage: calculateWeaponDamage(4, "Medium"), // Scaled down damage
      attacks: [
        "whips their monowire with precision",
        "makes a calculated slice",
        "executes a cyber-enhanced strike",
      ],
    },
  },
  {
    id: "bounty_hunter",
    name: "Bounty Hunter",
    description: "Independent contractor tracking targets for credits",
    type: "Thug",
    level: 4,
    region: "Downtown",
    armor: {
      name: "Tactical Vest",
      rating: calculateArmorDefense(4, "Light"), // Light tactical armor
    },
    weapon: {
      name: "Combat Rifle",
      damage: calculateWeaponDamage(4, "Light"), // Scaled down damage
      attacks: [
        "fires a controlled burst",
        "takes aim with professional precision",
        "executes a tactical maneuver",
      ],
    },
  },
  {
    id: "console_cowboy",
    name: "Console Cowboy",
    description: "Netrunner hacker with cyberdeck and neural interface",
    type: "Thug",
    level: 4,
    region: "Netherworld",
    armor: {
      name: "Neural Interface Suit",
      rating: calculateArmorDefense(4, "Light"), // Light neural armor
    },
    weapon: {
      name: "Cyberdeck",
      damage: calculateWeaponDamage(4, "Medium"), // Scaled down damage
      attacks: [
        "executes a hacking protocol",
        "launches a neural attack",
        "activates cybernetic defenses",
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
    region: "Chiba Docks",
    armor: {
      name: "Kevlar Armor",
      rating: calculateArmorDefense(5, "Medium"),
    },
    weapon: {
      name: "Katana",
      damage: calculateWeaponDamage(5, "Light"),
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
    region: "Sprawl Hubs",
    armor: {
      name: "Combat Armor",
      rating: calculateArmorDefense(5, "Medium"),
    },
    weapon: {
      name: "Heavy Pistol",
      damage: calculateWeaponDamage(5, "Light"),
      attacks: [
        "takes aim with military precision",
        "fires a controlled burst",
        "uses tactical positioning",
      ],
    },
  },
  {
    id: "cyber_war_beast",
    name: "Cyber War Beast",
    description: "Cybernetic monstrosity, combines brute strength and agility",
    type: "Heavy",
    level: 5,
    region: "Chiba Docks",
    armor: {
      name: "Cybernetic Hide",
      rating: calculateArmorDefense(5, "Heavy"), // Heavy cyber armor
    },
    weapon: {
      name: "Power Fist",
      damage: calculateWeaponDamage(5, "Light"),
      attacks: [
        "charges with cyber-enhanced strength",
        "delivers a crushing blow",
        "punches with brute force",
      ],
    },
  },
  {
    id: "corporate_mech",
    name: "Corporate Mech",
    description: "Cybernetic combat suit, defends corporate assets",
    type: "Heavy",
    level: 5,
    region: "Corporate District",
    armor: {
      name: "Cybernetic Armor",
      rating: calculateArmorDefense(5, "Heavy"), // Heavy cyber armor
    },
    weapon: {
      name: "Pulse Cannon",
      damage: calculateWeaponDamage(5, "Heavy"),
      attacks: [
        "fires a pulse laser burst",
        "takes aim with mechanical precision",
        "executes a combat protocol sequence",
      ],
    },
  },
  {
    id: "yakuza_ronin",
    name: "Yakuza Ronin",
    description:
      "Masterless Yakuza warrior, fights with honor and deadly skill",
    type: "Heavy",
    level: 5,
    region: "Chiba Docks",
    armor: {
      name: "Traditional Armor",
      rating: calculateArmorDefense(5, "Medium"),
    },
    weapon: {
      name: "Masterwork Katana",
      damage: calculateWeaponDamage(5, "Light"),
      attacks: [
        "draws their masterwork katana",
        "executes a perfect strike",
        "unleashes a deadly combo",
      ],
    },
  },
  {
    id: "ice_phantom",
    name: "ICE Phantom",
    description:
      "Console virus that manifests as a digital phantom, corrupts systems",
    type: "Hacker",
    level: 5,
    region: "Netherworld",
    armor: {
      name: "Digital Barrier",
      rating: calculateArmorDefense(5, "Light"),
    },
    weapon: {
      name: "Viral Code",
      damage: calculateWeaponDamage(5, "Medium"),
      attacks: [
        "executes viral code injection",
        "corrupts your cyberware",
        "launches a digital assault",
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
    region: "Highspire Towers",
    armor: {
      name: "Tactical Vest",
      rating: calculateArmorDefense(6, "Heavy"),
    },
    weapon: {
      name: "Shock Staff",
      damage: calculateWeaponDamage(6, "Medium"),
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
    region: "Chiba Shadows",
    armor: {
      name: "Kevlar Mesh",
      rating: calculateArmorDefense(6, "Light"),
    },
    weapon: {
      name: "Silenced Pistol",
      damage: calculateWeaponDamage(6, "Light"),
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
  return {
    id: `generated_${type.toLowerCase()}_${level}`,
    name: `Level ${level} ${type}`,
    description: `Generated ${type.toLowerCase()} for testing balance`,
    type: type,
    level: level,
    region: region || "Generated",
    armor: {
      name: "Generated Armor",
      rating: calculateArmorDefense(level, "Light"),
    },
    weapon: {
      name: "Generated Weapon",
      damage: calculateWeaponDamage(level, "Light"),
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

// New function for level-based enemy selection with probability distribution
export const getLevelBasedEnemy = (playerLevel) => {
  // Define probability distribution for enemy levels
  const levelProbabilities =
    playerLevel === 1
      ? {
          [playerLevel]: 75, // 75% chance for same level (Level 1)
          [playerLevel + 1]: 25, // 25% chance for 1 level above (Level 2)
        }
      : {
          [playerLevel - 2]: 0, // 5% chance for 2 levels below
          [playerLevel - 1]: 20, // 20% chance for 1 level below
          [playerLevel]: 60, // 50% chance for same level
          [playerLevel + 1]: 20, // 20% chance for 1 level above
          [playerLevel + 2]: 0, // 5% chance for 2 levels above
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
