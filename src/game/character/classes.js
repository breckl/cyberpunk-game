const classes = {
  netrunner: {
    name: "Netrunner",
    description:
      "Elite hackers who can breach any system, manipulate the digital realm, and turn security against itself.",
    baseStats: {
      hack: 8,
      combat: 3,
      stealth: 6,
      charm: 4,
      tech: 7,
      hp: 80,
      energy: 120,
    },
    startingGear: [
      "Neural Interface Mk1",
      "Datajack",
      "Stealth Program v1.0",
      "Credstick (1000¥)",
    ],
    specialAbilities: [
      {
        name: "System Breach",
        description: "Bypass security systems and hack enemy cybernetics",
        energyCost: 20,
        cooldown: 2,
      },
      {
        name: "Data Siphon",
        description: "Steal credits or information during combat",
        energyCost: 15,
        cooldown: 3,
      },
    ],
  },
  streetSamurai: {
    name: "Street Samurai",
    description:
      "Cybernetically enhanced warriors who excel in combat and intimidation.",
    baseStats: {
      hack: 2,
      combat: 8,
      stealth: 4,
      charm: 3,
      tech: 5,
      hp: 120,
      energy: 90,
    },
    startingGear: [
      "Cyber-Enhanced Reflexes",
      "Armored Jacket",
      "Mono-Katana",
      "Credstick (800¥)",
    ],
    specialAbilities: [
      {
        name: "Blade Rush",
        description:
          "Multiple rapid sword strikes with increased critical chance",
        energyCost: 25,
        cooldown: 3,
      },
      {
        name: "Combat Stims",
        description: "Temporarily boost combat stats and healing",
        energyCost: 30,
        cooldown: 4,
      },
    ],
  },
  corporateAgent: {
    name: "Corporate Agent",
    description:
      "Ex-corporate operatives skilled in manipulation, stealth, and high-tech gadgets.",
    baseStats: {
      hack: 5,
      combat: 5,
      stealth: 7,
      charm: 8,
      tech: 4,
      hp: 90,
      energy: 100,
    },
    startingGear: [
      "Stealth Suite",
      "Corporate ID Pass",
      "Smart-Linked Pistol",
      "Credstick (2000¥)",
    ],
    specialAbilities: [
      {
        name: "Corporate Override",
        description:
          "Use corporate credentials to bypass security or manipulate NPCs",
        energyCost: 15,
        cooldown: 2,
      },
      {
        name: "Shadow Protocol",
        description:
          "Become nearly invisible and gain bonus to stealth actions",
        energyCost: 20,
        cooldown: 3,
      },
    ],
  },
  techDoctor: {
    name: "Tech Doctor",
    description:
      "Underground medical experts who combine traditional medicine with cutting-edge technology.",
    baseStats: {
      hack: 4,
      combat: 3,
      stealth: 5,
      charm: 6,
      tech: 8,
      hp: 85,
      energy: 110,
    },
    startingGear: [
      "Med-Tech Kit",
      "Nano-Injector",
      "Diagnostic Scanner",
      "Credstick (1500¥)",
    ],
    specialAbilities: [
      {
        name: "Emergency Protocol",
        description: "Rapidly heal yourself or allies during combat",
        energyCost: 30,
        cooldown: 3,
      },
      {
        name: "Combat Stims",
        description: "Inject performance-enhancing nanites",
        energyCost: 25,
        cooldown: 4,
      },
    ],
  },
};

module.exports = classes;
