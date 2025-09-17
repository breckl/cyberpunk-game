import {
  calculateWeaponDamage,
  calculateArmorDefense,
} from "../config/gameBalance.js";

const enemies = [
  // Level 1 Enemies
  {
    id: "simstim_junkie",
    name: "Simstim Junkie",
    description: [
      "Neural-feed addict, violent but fragile",
      "Wired into cheap simstim, twitching with withdrawal",
      "Desperate for another hit, lashes out at anything",
      "Neural interface fried, mind lost to digital dreams",
    ],
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
    description: [
      "Loud, brash, easily put down",
      "All attitude, no substance, just noise",
      "Thinks they're tough, but folds under pressure",
      "Spray-painted jacket, empty threats",
    ],
    type: "Thug",
    level: 1,
    region: "Iron Maze",
    armor: {
      name: "Black Hoodie",
      rating: -0.5,
    },
    weapon: {
      name: "Broken Bottle",
      damage: -0.5,
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
    description: [
      "Low-level gang member, thrives in chaos",
      "Pack hunter, weak alone but dangerous in numbers",
      "Scavenges the neon-lit streets for easy prey",
      "Gang colors flash under the city lights",
    ],
    type: "Thug",
    level: 1,
    region: "Iron Maze",
    armor: {
      name: "Leather Vest",
      rating: calculateArmorDefense(1, "Light"),
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
    description: [
      "Desperate vagrant, steals food, lashes out",
      "Starving and cornered, fights like a wild animal",
      "Steals from street vendors, runs when caught",
      "Hunger drives them to violence",
    ],
    type: "Thug",
    level: 1,
    region: "Chiba Market",
    armor: {
      name: "Heavy Coat",
      rating: -1,
    },
    weapon: {
      name: "Bare Fists",
      damage: -1,
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
    description: [
      "Drunk, fists flying, unpredictable",
      "Alcohol-fueled rage, swings wildly",
      "Stumbles around the bar, looking for trouble",
      "Drunk courage makes them dangerous",
    ],
    type: "Thug",
    level: 1,
    region: "Chiba Bars",
    armor: {
      name: "Heavy Coat",
      rating: calculateWeaponDamage(1, "Light"),
    },
    weapon: {
      name: "Bare Fists",
      damage: calculateWeaponDamage(1, "Light") * 1.05,
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
    description: [
      "Wannabe decker, uses cheap stun device",
      "Scavenges data from the digital underground",
      "Cheap cyberdeck, expensive dreams",
      "Hides in the shadows of the net",
    ],
    type: "Hacker",
    level: 1,
    region: "Chiba Alleys",
    armor: {
      name: "Leather Vest",
      rating: calculateArmorDefense(1, "Medium") * 1.1,
    },
    weapon: {
      name: "Stun Rig",
      damage: calculateWeaponDamage(1, "Medium") * 1.1,
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
    description: [
      "Agile petty thief, quick but weak",
      "Leaps between buildings, steals from windows",
      "Light on their feet, heavy on the trouble",
      "Urban acrobat with sticky fingers",
    ],
    type: "Thug",
    level: 1,
    region: "Iron Maze Rooftops",
    armor: {
      name: "Heavy Coat",
      rating: -1,
    },
    weapon: {
      name: "Sling Blade",
      damage: -1.5,
      attacks: [
        "swings their blade",
        "makes a quick strike",
        "darts in and out",
      ],
    },
  },
  {
    id: "drunken_chiba_port_sailor",
    name: "Chiba Sailor",
    description: [
      "Brawler fresh off the docks, strong when cornered",
      "Sea legs and sea stories, all of them tall",
      "Drunk on cheap booze and cheaper dreams",
      "Fights like a cornered animal",
    ],
    type: "Thug",
    level: 1,
    region: "Ninsei Strip",
    armor: {
      name: "Heavy Jacket",
      rating: calculateArmorDefense(1, "Light"),
    },
    weapon: {
      name: "Broken Bottle",
      damage: calculateArmorDefense(1, "Light") * 1.02,
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
    description: [
      "Regular at the bar, staggers with sudden swings",
      "Knows every stool in the place, falls off most",
      "Drunk on nostalgia and cheaper whiskey",
      "Fights dirty when the booze kicks in",
    ],
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
    description: [
      "Addict fried on neural feeds, lashes out unpredictably",
      "Neural pathways burned out, mind in fragments",
      "Lost in digital dreams, reality is a nightmare",
      "Wired too deep, can't tell what's real",
    ],
    type: "Thug",
    level: 1,
    region: "Ninsei Alley",
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Rusty Shiv",
      damage: calculateWeaponDamage(1, "Medium"),
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
    description: [
      "Cybernetic addict, erratic and dangerous",
      "Chrome gone wrong, body rejecting the tech",
      "Implants glitch and spark, pain drives them mad",
      "Too much chrome, not enough humanity",
    ],
    type: "Thug",
    level: 1,
    region: "Ninsei Alley",
    armor: {
      name: "None",
      rating: calculateArmorDefense(1, "Medium"),
    },
    weapon: {
      name: "Malfunctioning Cyber Fist",
      damage: calculateWeaponDamage(1, "Heavy"),
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
    description: [
      "Robotic animal that stalks the alleyways",
      "Mechanical predator, eyes glowing in the dark",
      "Scavenges for spare parts and broken dreams",
      "Half machine, half animal, all dangerous",
    ],
    type: "Thug",
    level: 1,
    region: "Chiba Alleys",
    armor: {
      name: "Scrap Metal Hide",
      rating: calculateArmorDefense(1, "Medium"),
    },
    weapon: {
      name: "Sharpened Claws",
      damage: calculateWeaponDamage(1, "Heavy") * 1.05,
      attacks: [
        "lunges with sharpened claws",
        "makes a quick strike",
        "charges with their claws",
      ],
    },
  },
  {
    id: "braun_microdrone",
    name: "Braun Microdrone",
    description: [
      "Spider-like surveillance drone, quick and agile",
      "Mechanical arachnid with multiple sensor arrays",
      "Corporate spy device, death from above",
      "Eight-legged hunter, digital eyes watching",
    ],
    type: "Thug",
    level: 1,
    region: "Chiba Alleys",
    armor: {
      name: "Light Alloy Frame",
      rating: 0,
    },
    weapon: {
      name: "Sharpened Legs",
      damage: 0,
      attacks: [
        "lunges with sharpened legs",
        "makes a quick strike",
        "scuttles forward to attack",
      ],
    },
  },
  {
    id: "freeside_refugee",
    name: "Freeside Refugee",
    description: [
      "Weary traveler from Freeside, sharp teeth bared in desperation",
      "Mismatched clothing and haunted eyes, clutching a makeshift weapon",
      "The scent of ganja lingers around them, a remnant of better days",
      "Soft hum of dub music escapes their lips, a tune from Zion",
    ],
    type: "Thug",
    level: 1,
    region: "Chiba Alleys",
    armor: {
      name: "Patchwork Vest",
      rating: 0.5,
    },
    weapon: {
      name: "Rusty Knife",
      damage: 0,
      attacks: [
        "slashes wildly with their knife",
        "makes a desperate stab",
        "swings in a wide arc",
      ],
    },
  },
  {
    id: "freeside_outcast",
    name: "Freeside Outcast",
    description: [
      "Banished from Freeside, sharp teeth glinting with defiance",
      "Mix of Freeside robes and urban attire, fractured identity",
      "Strong scent of ganja, a defiant nod to their heritage",
      "Portable speaker blares dub music, rebellious anthem",
    ],
    type: "Thug",
    level: 1,
    region: "Chiba Alleys",
    armor: {
      name: "Tattered Cloak",
      rating: calculateArmorDefense(1, "Heavy") * 1.05,
    },
    weapon: {
      name: "Broken Pipe",
      damage: calculateWeaponDamage(1, "Heavy") * 1.05,
      attacks: [
        "swings their pipe with reckless abandon",
        "feints a retreat before lunging forward",
        "brings the pipe down in a crushing strike",
      ],
    },
  },

  // Level 2 Enemies
  {
    id: "freeside_apostate",
    name: "Freeside Apostate",
    description: [
      "Sharp teeth bared in defiance",
      "Clad in tattered garments, eyes gleam with regret and aggression",
      "Scent of ganja lingers around them, remnant of their past life in Freeside",
      "Dub music echoes faintly, haunting reminder of his roots",
    ],
    type: "Thug",
    level: 2,
    region: "Chiba Alleys",
    armor: {
      name: "Worn Leather Jacket",
      rating: 0,
    },
    weapon: {
      name: "Modified Stun Baton",
      damage: 0,
      attacks: [
        "lunges forward, swinging their stun baton with practiced ease",
        "attempts to jab the baton into your side, aiming to incapacitate",
        "feints to the left before delivering a powerful strike",
      ],
    },
  },
  {
    id: "sprawl_ganger",
    name: "Sprawl Ganger",
    description: [
      "Generic gang soldier, fights in numbers",
      "Gang mentality, no individual thought",
      "Strength in numbers, weakness alone",
      "Territory markers and broken promises",
    ],
    type: "Thug",
    level: 1,
    region: "Sprawl Streets",
    armor: {
      name: "Leather Jacket",
      rating: 0,
    },
    weapon: {
      name: "Pipe Wrench",
      damage: 0,
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
    description: [
      "Scrapper with improvised gear",
      "Makes weapons from whatever they can find",
      "Survivalist mentality, everything is a weapon",
      "Junk collector with a violent streak",
    ],
    type: "Thug",
    level: 2,
    region: "Dog Solitude",
    armor: {
      name: "None",
      rating: calculateWeaponDamage(2, "Light"),
    },
    weapon: {
      name: "Scrap Club",
      damage: calculateWeaponDamage(2, "Light"),
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
    description: [
      "Black clinic guard, simple muscle",
      "Keeps the riff-raff out of the ripperdoc's office",
      "Big, dumb, and dangerous when provoked",
      "Protects the clinic's dark secrets",
    ],
    type: "Heavy",
    level: 2,
    region: "Chiba Clinics",
    armor: {
      name: "Padded Vest",
      rating: calculateArmorDefense(2, "Light"),
    },
    weapon: {
      name: "Shock Baton",
      damage: calculateWeaponDamage(2, "Light"),
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
    description: [
      "Smooth-talking fixer, fights dirty when deals go bad",
      "Words are weapons until the bullets fly",
      "Knows every angle, plays every side",
      "Charm and violence in equal measure",
    ],
    type: "Thug",
    level: 2,
    region: "Ninsei Strip",
    armor: {
      name: "Leather Jacket",
      rating: 0,
    },
    weapon: {
      name: "Concealed Pistol",
      damage: 0,
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
    description: [
      "Runs a backroom parlor, defends turf with a blade",
      "Gambling den operator with a violent streak",
      "Protects their illegal operation with steel",
      "Numbers and knives, both can kill",
    ],
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
    description: [
      "Keeps order at Ratz's bar; heavy fists and thicker skin",
      "Ratz's muscle, keeps the peace with violence",
      "Big enough to throw out the biggest drunks",
      "Bar security with a mean streak",
    ],
    type: "Heavy",
    level: 2,
    region: "Ninsei / Chatsubo",
    armor: {
      name: "Padded Vest",
      rating: 0,
    },
    weapon: {
      name: "Shock Baton",
      damage: 0,
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
    description: [
      "Grabs purses and chips, fights when cornered",
      "Quick hands, quicker feet, desperate times",
      "Preys on the weak, runs from the strong",
      "Thief by trade, fighter by necessity",
    ],
    type: "Thug",
    level: 2,
    region: "Ninsei Alley",
    armor: {
      name: "Hoodie",
      rating: calculateArmorDefense(2, "Light"),
    },
    weapon: {
      name: "Shiv",
      damage: calculateWeaponDamage(2, "Light"),
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
    description: [
      "Junkie controlled by a remote hacker",
      "Body without a soul, controlled by another's will",
      "Neural implants hijacked, mind enslaved",
      "Flesh puppet dancing to a hacker's tune",
    ],
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
    description: [
      "Addicted to neural stim, fights with enhanced reflexes",
      "Neural boost junkie, speed is their drug",
      "Wired for combat, wired for destruction",
      "Enhanced reflexes, diminished humanity",
    ],
    type: "Thug",
    level: 2,
    region: "Ninsei Strip",
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Enhanced Fists",
      damage: 0,
      attacks: [
        "moves with drug-enhanced speed",
        "delivers a rapid strike",
        "attacks with neural-boosted reflexes",
      ],
    },
  },

  // Additional Level 3 Enemies (Light)
  {
    id: "straylight_merc",
    name: "Straylight Merc",
    description: [
      "Hardened mercenary from Straylight, cybernetic enhancements gleaming",
      "High-tech combat gear, exudes an aura of lethal efficiency",
      "Corporate soldier with Tessier-Ashpool backing, no mercy for targets",
      "Professional killer with unlimited resources and zero conscience",
    ],
    type: "Thug",
    level: 3,
    region: "Chiba Alleys",
    armor: {
      name: "Reinforced Combat Suit",
      rating: 0,
    },
    weapon: {
      name: "Plasma Rifle",
      damage: 0,
      attacks: [
        "takes aim with their plasma rifle",
        "activates a shoulder-mounted drone, firing a barrage of micro-missiles",
        "draws a combat knife, attempting a close-quarters strike",
      ],
    },
  },
  {
    id: "armed_drone",
    name: "Armed Drone",
    description: [
      "Automated security drone with basic combat protocols",
      "Mechanical guardian, no mercy, no fear",
      "Flying death machine with a simple mission",
      "Corporate security, automated and lethal",
    ],
    type: "Thug",
    level: 3,
    region: "Chiba Market",
    armor: {
      name: "Light Alloy Frame",
      rating: 0, // Light drone armor
    },
    weapon: {
      name: "Pulse Laser",
      damage: 0, // Scaled down for easier combat
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
    description: [
      "Cyborg attack dog with enhanced reflexes and steel fangs",
      "Man's best friend, cybernetically enhanced for violence",
      "Loyal to its master, deadly to everyone else",
      "Half dog, half machine, all predator",
    ],
    type: "Thug",
    level: 3,
    region: "Ninsei Strip",
    armor: {
      name: "Cybernetic Hide",
      rating: calculateArmorDefense(3, "Light"), // Light cyber armor
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
    description: [
      "Overworked and undertrained, panics easily",
      "Corporate drone with a stun baton and a prayer",
      "Fresh out of business school, in over their head",
      "Desperate to prove themselves, dangerous when cornered",
    ],
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
    description: [
      "Cybernetic thug, fights with brute strength",
      "Chrome muscle and steel fists, brain optional",
      "Enhanced strength, diminished intelligence",
      "Big, dumb, and dangerous with cybernetic upgrades",
    ],
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
    description: [
      "Cybernetic puppeteer, uses matrix magic to control foes",
      "Tech and mysticism, a dangerous combination",
      "Pulls strings both digital and spiritual",
      "Ancient magic meets modern technology",
    ],
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
    description: [
      "Hacker with advanced neural implants, steals memories",
      "Digital pickpocket, takes what you hold dear",
      "Neural interface specialist, mind is their playground",
      "Steals your past, leaves you empty",
    ],
    type: "Hacker",
    level: 3,
    region: "Netherworld",
    armor: {
      name: "Neural Interface Suit",
      rating: 0,
    },
    weapon: {
      name: "Neural Spike",
      damage: 0,
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
    description: [
      "Corp-backed muscle, brutal and efficient",
      "Corporate thug with a license to kill",
      "Protects corporate interests with extreme prejudice",
      "Business suit, violent methods",
    ],
    type: "Thug",
    level: 3,
    region: "Corporate District",
    armor: {
      name: "Business Suit",
      rating: 0,
    },
    weapon: {
      name: "Power Fist",
      damage: 0,
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
    description: [
      "Cybernetic organ broker, trades tech upgrades for organs",
      "Black market surgeon with a violent streak",
      "Trades flesh for chrome, life for profit",
      "Body parts dealer, death is good business",
    ],
    type: "Thug",
    level: 3,
    region: "Chiba Docks",
    armor: {
      name: "Cybernetic Hide",
      rating: calculateArmorDefense(3, "Light"),
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
    description: [
      "A group of automated drones, coordinated for combat",
      "Mechanical hive mind, death from above",
      "Swarm intelligence, swarm violence",
      "Multiple drones, single purpose: eliminate",
    ],
    type: "Thug",
    level: 3,
    region: "Chiba Market",
    armor: {
      name: "Light Alloy Frame",
      rating: 0, // Scaled down for easier combat
    },
    weapon: {
      name: "Pulse Lasers",
      damage: calculateWeaponDamage(3, "Light"), // Scaled down for easier combat
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
    description: [
      "Tracks debtors, extracts implants",
      "Ripperdoc's debt collector, takes what's owed",
      "Surgical precision, violent methods",
      "Repossession agent with a scalpel",
    ],
    type: "Heavy",
    level: 3,
    region: "Chiba Clinics",
    armor: {
      name: "Light Vest",
      rating: 0,
    },
    weapon: {
      name: "Restraint Gun",
      damage: calculateWeaponDamage(3, "Light"),
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
    description: [
      "Courier for syndicate, quick & armed",
      "Syndicate messenger, delivers more than packages",
      "Fast on their feet, faster with a blade",
      "Criminal courier with a violent streak",
    ],
    type: "Thug",
    level: 3,
    region: "Glass Quarter",
    armor: {
      name: "Light Vest",
      rating: calculateArmorDefense(3, "Light"),
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
    name: "Clinic Security",
    description: [
      "Guards for a clinic, loyal and armed",
      "Protects the clinic's dark secrets",
      "Clinic's muscle, keeps the peace with violence",
      "Black market security, no questions asked",
    ],
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
    description: [
      "Syndicate-backed, defends biosoft shipments with chrome muscle",
      "Corporate muscle with syndicate backing",
      "Protects valuable cargo with enhanced strength",
      "Chrome bodyguard, loyalty bought and paid for",
    ],
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
    description: [
      "Augmented street fighter with cyberclaws",
      "Chrome claws and a killer instinct",
      "Street assassin with cybernetic enhancements",
      "Deadly beauty with razor-sharp edges",
    ],
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
    description: [
      "Arena-trained cyber brawler",
      "Gladiator of the underground fighting pits",
      "Trained to kill for entertainment",
      "Arena champion, death is their profession",
    ],
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
    description: [
      "Smooth-talking, fights dirty when deals go bad",
      "Corporate middleman with a violent streak",
      "Deals in information and death",
      "Business suit, criminal mind",
    ],
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
    description: [
      "Techno-fetish anarchist with chrome enhancements and anti-corp ideology",
      "Cyberpunk revolutionary with a monowire",
      "Fights the system with enhanced chrome",
      "Anarchist warrior, technology is their weapon",
    ],
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
  // Additional Level 4 Enemies (Light)
  {
    id: "lupus_yonderboy",
    name: "Lupus Yonderboy",
    description: [
      "Panther Modern: techno-fetish anarchist with anti-corp ideology",
      "Cyberpunk revolutionary",
      "Fights the system with enhanced chrome",
      "Anarchist warrior, technology is his weapon",
    ],
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
    description: [
      "Independent contractor tracking targets for credits",
      "Professional hunter, death is their business",
      "Tracks targets for profit, kills for sport",
      "Mercenary with a license to hunt",
    ],
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
    description: [
      "Netrunner hacker with cyberdeck and neural interface",
      "Digital gunslinger, code is their weapon",
      "Rides the net like a digital outlaw",
      "Cyberpunk hacker with a cowboy attitude",
    ],
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
    description: [
      "Syndicate soldier, disciplined",
      "Yakuza muscle, honor and violence",
      "Syndicate enforcer with a code of honor",
      "Organized crime soldier, death is their duty",
    ],
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
    name: "Maas-Biolabs Merc",
    description: [
      "Professional freelance fighter",
      "Soldier of fortune, death is their trade",
      "Hired gun with military training",
      "Professional killer, loyalty to the highest bidder",
    ],
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
    name: "Cyber Warbeast",
    description: [
      "Cybernetic monstrosity, combines brute strength and agility",
      "Bio-engineered killing machine",
      "Animal instincts, cybernetic enhancements",
      "War machine disguised as a beast",
    ],
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
    name: "Hosaka Corpo Mech",
    description: [
      "Cybernetic combat suit, defends corporate assets",
      "Corporate war machine, no mercy",
      "Business suit with a pulse cannon",
      "Corporate security, automated and lethal",
    ],
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
    description: [
      "Masterless Yakuza warrior, fights with honor and deadly skill",
      "Samurai without a master, death is their art",
      "Honor-bound warrior, blade is their soul",
      "Masterless samurai, death is their destiny",
    ],
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
    description: [
      "Console virus that manifests as a digital phantom, corrupts systems",
      "Digital ghost, corrupts everything it touches",
      "Viral entity, death in the digital realm",
      "Phantom of the net, destruction is its purpose",
    ],
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
  {
    id: "assassin",
    name: "Straylight Assassin",
    description: [
      "Precision killer, stealth-based",
      "Professional killer, death is their art",
      "Silent death, precision murder",
      "Assassin for hire, death is their trade",
    ],
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
  {
    id: "turing_police",
    name: "Turing Police",
    description: [
      "AI-hunting law enforcement, enforces the Turing Act",
      "Cybernetic detectives hunting rogue artificial intelligence",
      "Special ops unit with advanced neural interfaces",
      "Protectors of humanity from AI threats, death is their duty",
    ],
    type: "Heavy",
    level: 4,
    region: "Corporate District",
    armor: {
      name: "Neural Interface Suit",
      rating: calculateArmorDefense(4, "Medium"),
    },
    weapon: {
      name: "Neural Disruptor",
      damage: calculateWeaponDamage(4, "Medium"),
      attacks: [
        "launches a neural disruption pulse",
        "executes an AI containment protocol",
        "activates anti-cybernetic countermeasures",
      ],
    },
  },
  {
    id: "turing_enforcer",
    name: "Turing Enforcer",
    description: [
      "Elite AI-hunting specialist, enforces the Turing Act with extreme prejudice",
      "Advanced cybernetic detective with enhanced neural interfaces",
      "Senior special ops unit, hunts the most dangerous rogue AIs",
      "Elite protector of humanity, death to all artificial intelligence",
    ],
    type: "Heavy",
    level: 5,
    region: "Corporate District",
    armor: {
      name: "Advanced Neural Interface Suit",
      rating: calculateArmorDefense(5, "Light"),
    },
    weapon: {
      name: "Advanced Neural Disruptor",
      damage: calculateWeaponDamage(5, "Light"),
      attacks: [
        "launches an advanced neural disruption pulse",
        "executes a high-level AI containment protocol",
        "activates enhanced anti-cybernetic countermeasures",
      ],
    },
  },
  {
    id: "armitage",
    name: "Armitage",
    description: [
      "Former Screaming Fist colonel, now corporate operative with cybernetic enhancements",
      "Military veteran with reconstructed eyes, legs, and jaw from the war",
      "Corporate fixer with a troubled past and mysterious benefactors",
      "Cold-blooded operative, death is just another business transaction",
    ],
    type: "Heavy",
    level: 4,
    region: "Corporate District",
    armor: {
      name: "Somber Italian Suit",
      rating: calculateArmorDefense(4, "Medium"),
    },
    weapon: {
      name: "Military-Grade Pistol",
      damage: calculateWeaponDamage(4, "Heavy"),
      attacks: [
        "takes aim with military precision",
        "fires a controlled burst",
        "executes a tactical maneuver",
      ],
    },
  },
  {
    id: "peter_riviera",
    name: "Peter Riviera",
    description: [
      "Psychopathic drug addict with holographic implants and a Nambu pistol",
      "Compulsive Judas who betrays those who love him",
      "Beautiful face from Chiba surgery, hides a monstrous nature within",
      "Creates terrifying holographic illusions to mask his true depravity",
    ],
    type: "Thug",
    level: 4,
    region: "Chiba City",
    armor: {
      name: "None",
      rating: 0,
    },
    weapon: {
      name: "Nambu Pistol",
      damage: calculateWeaponDamage(4, "Medium"),
      attacks: [
        "fires his Nambu with cold precision",
        "creates a holographic distraction before shooting",
        "uses his implants to disorient before attacking",
      ],
    },
  },
  {
    id: "dixie_flatline",
    name: "Dixie Flatline",
    description: [
      "Legendary console cowboy preserved as a ROM construct after death",
      "Digital ghost of the greatest netrunner who ever lived",
      "ROM personality construct with all the skills of the original",
      "Dead hacker's consciousness trapped in cyberspace forever",
    ],
    type: "Hacker",
    level: 5,
    region: "Netherworld",
    armor: {
      name: "Digital Barrier",
      rating: calculateArmorDefense(5, "Light"),
    },
    weapon: {
      name: "Cyberdeck",
      damage: calculateWeaponDamage(5, "Light"),
      attacks: [
        "executes advanced hacking protocols",
        "launches a devastating neural attack",
        "activates legendary cybernetic defenses",
      ],
    },
  },
  {
    id: "tessier_ashpool_merc",
    name: "Tessier-Ashpool Merc",
    description: [
      "Corporate mercenary working for the powerful Tessier-Ashpool family",
      "Well-equipped corporate soldier with advanced weaponry",
      "Protects the interests of the Villa Straylight space station",
      "Corporate muscle with deep pockets and deadly training",
    ],
    type: "Heavy",
    level: 3,
    region: "Corporate District",
    armor: {
      name: "Corporate Combat Suit",
      rating: calculateArmorDefense(3, "Heavy"),
    },
    weapon: {
      name: "Assault Rifle",
      damage: calculateWeaponDamage(3, "Heavy"),
      attacks: [
        "fires a controlled burst from their assault rifle",
        "takes aim with corporate precision",
        "executes a tactical combat maneuver",
      ],
    },
  },
  {
    id: "slick_henry",
    name: "Slick Henry",
    description: [
      "Cyberpunk artist and sculptor who creates art from scrap and junk",
      "Talented cybernetic sculptor with a dangerous edge",
      "Creates art from the detritus of the Sprawl, often incorporating tech",
      "Artist with a violent streak, uses his creations as weapons",
    ],
    type: "Thug",
    level: 3,
    region: "Sprawl Streets",
    armor: {
      name: "Scrap Metal Armor",
      rating: calculateArmorDefense(3, "Medium"),
    },
    weapon: {
      name: "Improvised Cyber Weapon",
      damage: calculateWeaponDamage(3, "Medium"),
      attacks: [
        "swings his improvised cyber weapon",
        "makes a creative strike with scrap metal",
        "uses his artistic skills to craft a deadly attack",
      ],
    },
  },
  {
    id: "molly_millions",
    name: "Molly Millions",
    description: [
      "Razor girl assassin with mirror shades and retractable razor claws",
      "Cyberpunk street fighter with extensive cybernetic enhancements",
      "Professional killer with a reputation for precision and violence",
      "Mirror-shaded assassin, death is her art and her trade",
    ],
    type: "Assassin",
    level: 6,
    region: "Chiba Shadows",
    armor: {
      name: "Leather Armor",
      rating: calculateArmorDefense(6, "Light"),
    },
    weapon: {
      name: "Razor Claws",
      damage: calculateWeaponDamage(6, "Heavy"),
      attacks: [
        "slashes with her retractable razor claws",
        "makes a precision strike with deadly accuracy",
        "unleashes a flurry of razor-sharp cuts",
      ],
    },
  },
  {
    id: "automatic_jack",
    name: "Automatic Jack",
    description: [
      "Legendary console cowboy with exceptional netrunning skills",
      "Master hacker who navigates the matrix with deadly precision",
      "Cyberpunk netrunner with a reputation for impossible feats",
      "Digital outlaw who makes the impossible look routine",
    ],
    type: "Hacker",
    level: 4,
    region: "Netherworld",
    armor: {
      name: "Neural Interface Suit",
      rating: calculateArmorDefense(4, "Light"),
    },
    weapon: {
      name: "Cyberdeck",
      damage: calculateWeaponDamage(4, "Heavy"),
      attacks: [
        "executes advanced hacking protocols",
        "launches a devastating neural attack",
        "activates legendary cybernetic defenses",
      ],
    },
  },
  {
    id: "conroy",
    name: "Conroy",
    description: [
      "Corporate executive and fixer with extensive connections",
      "Smooth-talking corporate middleman who gets things done",
      "Business suit and corporate power, death is just another deal",
      "Corporate fixer with a license to kill and a budget to match",
    ],
    type: "Heavy",
    level: 5,
    region: "Corporate District",
    armor: {
      name: "Business Suit",
      rating: calculateArmorDefense(5, "Medium"),
    },
    weapon: {
      name: "Concealed Pistol",
      damage: calculateWeaponDamage(5, "Medium"),
      attacks: [
        "draws his concealed pistol with corporate precision",
        "takes aim with business-like efficiency",
        "executes a corporate-sanctioned elimination",
      ],
    },
  },
  {
    id: "tessier_ashpool_assassin",
    name: "Freeside Assassin",
    description: [
      "Elite corporate assassin working for the powerful Tessier-Ashpool family",
      "Top-tier killer with advanced training and cutting-edge equipment",
      "Protects Villa Straylight's most sensitive operations with deadly precision",
      "Corporate death dealer with unlimited resources and zero mercy",
    ],
    type: "Assassin",
    level: 5,
    region: "Corporate District",
    armor: {
      name: "Advanced Corporate Suit",
      rating: calculateArmorDefense(5, "Light"),
    },
    weapon: {
      name: "Silenced Pistol",
      damage: calculateWeaponDamage(5, "Heavy"),
      attacks: [
        "takes a silent shot with deadly precision",
        "executes a corporate assassination with surgical accuracy",
        "eliminates targets with professional efficiency",
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
          [playerLevel]: 100, // 100% chance for same level (Level 1)
        }
      : {
          [playerLevel - 2]: 0, // 0% chance for 2 levels below
          [playerLevel - 1]: 0, // 0% chance for 1 level below
          [playerLevel]: 90, // 90% chance for same level
          [playerLevel + 1]: 10, // 10% chance for 1 level above
          [playerLevel + 2]: 0, // 0% chance for 2 levels above
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
