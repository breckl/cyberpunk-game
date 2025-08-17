class MissionGenerator {
  constructor() {
    this.missionTypes = {
      hack: {
        name: "Data Heist",
        description: "Infiltrate corporate systems and steal valuable data",
        baseReward: 1000,
        primaryStat: "hack",
        locations: ["corporate_server", "research_lab", "secure_datacenter"],
        objectives: [
          "Bypass security",
          "Locate target data",
          "Extract data package",
          "Cover tracks"
        ]
      },
      combat: {
        name: "Street Violence",
        description: "Handle a violent situation in the combat zones",
        baseReward: 800,
        primaryStat: "combat",
        locations: ["gang_territory", "combat_zone", "black_market"],
        objectives: [
          "Eliminate targets",
          "Secure area",
          "Retrieve package",
          "Protect client"
        ]
      },
      stealth: {
        name: "Shadow Run",
        description: "Complete objectives without being detected",
        baseReward: 1200,
        primaryStat: "stealth",
        locations: ["corporate_office", "private_residence", "secure_facility"],
        objectives: [
          "Infiltrate facility",
          "Plant evidence",
          "Extract target",
          "Sabotage systems"
        ]
      },
      investigation: {
        name: "Digital Trail",
        description: "Track down targets through the digital and physical world",
        baseReward: 900,
        primaryStat: "tech",
        locations: ["hacker_den", "underground_market", "info_broker_office"],
        objectives: [
          "Gather intel",
          "Track target",
          "Analyze data",
          "Report findings"
        ]
      }
    };

    this.complications = [
      {
        name: "Security Response",
        description: "Additional security forces arrive",
        difficultyIncrease: 2,
        rewardMultiplier: 1.5
      },
      {
        name: "System Lockdown",
        description: "Security systems enter lockdown state",
        difficultyIncrease: 1,
        rewardMultiplier: 1.3
      },
      {
        name: "Rival Operation",
        description: "Another team is attempting the same mission",
        difficultyIncrease: 2,
        rewardMultiplier: 1.4
      },
      {
        name: "Double Cross",
        description: "Client attempts to eliminate loose ends",
        difficultyIncrease: 3,
        rewardMultiplier: 2.0
      }
    ];

    this.clients = [
      {
        type: "corporation",
        names: ["Arasaka", "Militech", "Biotechnica", "Petrochem"],
        reputationRequirement: 0,
        paymentMultiplier: 1.2
      },
      {
        type: "gang",
        names: ["Steel Dragons", "Chrome Hunters", "Net Runners", "Street Kings"],
        reputationRequirement: -20,
        paymentMultiplier: 0.8
      },
      {
        type: "fixer",
        names: ["Mr. Johnson", "The Broker", "Shadow", "The Contact"],
        reputationRequirement: -10,
        paymentMultiplier: 1.0
      }
    ];
  }

  generateMission(character, preferredType = null) {
    // Select mission type
    const type = preferredType || this.selectMissionType(character);
    const missionTemplate = this.missionTypes[type];

    // Calculate difficulty and rewards
    const difficulty = this.calculateDifficulty(character, missionTemplate);
    const client = this.selectClient(character);
    const location = this.selectLocation(missionTemplate);
    const objectives = this.generateObjectives(missionTemplate, difficulty);
    const complications = this.generateComplications(difficulty);
    const rewards = this.calculateRewards(missionTemplate, difficulty, client, complications);

    return {
      type: type,
      name: this.generateMissionName(type, client),
      description: missionTemplate.description,
      difficulty: difficulty,
      client: client,
      location: location,
      objectives: objectives,
      complications: complications,
      rewards: rewards,
      timeLimit: this.calculateTimeLimit(difficulty),
      requirements: {
        minimumLevel: Math.max(1, difficulty - 2),
        recommendedStats: {
          [missionTemplate.primaryStat]: difficulty * 2
        }
      }
    };
  }

  selectMissionType(character) {
    // Weight mission types based on character stats
    const weights = {
      hack: character.stats.hack * 2,
      combat: character.stats.combat * 2,
      stealth: character.stats.stealth * 2,
      investigation: character.stats.tech * 2
    };

    // Random selection with weights
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    let random = Math.random() * total;

    for (const [type, weight] of Object.entries(weights)) {
      random -= weight;
      if (random <= 0) return type;
    }

    return Object.keys(this.missionTypes)[0];
  }

  calculateDifficulty(character, missionTemplate) {
    // Base difficulty scaled to character level
    let difficulty = Math.floor(character.level * 0.7);

    // Adjust for primary stat
    const primaryStatValue = character.stats[missionTemplate.primaryStat];
    difficulty += Math.max(0, Math.floor((primaryStatValue - difficulty) * 0.5));

    // Random variation
    difficulty += Math.floor(Math.random() * 3) - 1;

    return Math.max(1, Math.min(10, difficulty));
  }

  selectClient(character) {
    // Filter clients by reputation requirement
    const availableClients = this.clients.filter(clientType =>
      character.reputation[clientType.type] >= clientType.reputationRequirement
    );

    // Select random client type
    const clientType = availableClients[Math.floor(Math.random() * availableClients.length)];
    
    // Select specific client name
    const clientName = clientType.names[Math.floor(Math.random() * clientType.names.length)];

    return {
      name: clientName,
      type: clientType.type,
      paymentMultiplier: clientType.paymentMultiplier
    };
  }

  selectLocation(missionTemplate) {
    const location = missionTemplate.locations[
      Math.floor(Math.random() * missionTemplate.locations.length)
    ];

    return {
      name: location,
      description: this.generateLocationDescription(location)
    };
  }

  generateObjectives(missionTemplate, difficulty) {
    const numObjectives = Math.min(
      Math.floor(difficulty / 2) + 1,
      missionTemplate.objectives.length
    );

    const objectives = [];
    const shuffled = [...missionTemplate.objectives]
      .sort(() => Math.random() - 0.5);

    for (let i = 0; i < numObjectives; i++) {
      objectives.push({
        description: shuffled[i],
        completed: false,
        optional: i >= Math.ceil(numObjectives * 0.7)
      });
    }

    return objectives;
  }

  generateComplications(difficulty) {
    const numComplications = Math.floor(difficulty / 3);
    if (numComplications === 0) return [];

    const complications = [];
    const shuffled = [...this.complications]
      .sort(() => Math.random() - 0.5);

    for (let i = 0; i < numComplications; i++) {
      complications.push(shuffled[i]);
    }

    return complications;
  }

  calculateRewards(missionTemplate, difficulty, client, complications) {
    // Base reward scaled by difficulty
    let credits = missionTemplate.baseReward * (1 + (difficulty * 0.5));

    // Apply client multiplier
    credits *= client.paymentMultiplier;

    // Apply complications multiplier
    const complicationMultiplier = complications.reduce(
      (mult, comp) => mult * comp.rewardMultiplier,
      1
    );
    credits *= complicationMultiplier;

    // Calculate experience reward
    const experience = Math.floor(credits * 0.1);

    // Generate item rewards
    const items = this.generateItemRewards(difficulty, missionTemplate.primaryStat);

    return {
      credits: Math.floor(credits),
      experience,
      items,
      reputation: {
        [client.type]: 5 + Math.floor(difficulty / 2)
      }
    };
  }

  generateItemRewards(difficulty, primaryStat) {
    const items = [];
    const itemChance = 0.3 + (difficulty * 0.1);

    if (Math.random() < itemChance) {
      items.push(this.generateRewardItem(difficulty, primaryStat));
    }

    return items;
  }

  generateRewardItem(difficulty, primaryStat) {
    const itemTypes = {
      hack: ["Cyberdeck", "ICE Breaker", "Neural Implant"],
      combat: ["Weapon", "Armor", "Combat Implant"],
      stealth: ["Stealth Suite", "Cloaking Device", "Silence Mod"],
      tech: ["Tech Tool", "Engineering Kit", "Diagnostic System"]
    };

    const type = itemTypes[primaryStat][
      Math.floor(Math.random() * itemTypes[primaryStat].length)
    ];

    return {
      name: `${this.generateItemPrefix(difficulty)} ${type}`,
      type: type.toLowerCase(),
      quality: Math.min(5, Math.floor(difficulty / 2)),
      statBonus: {
        [primaryStat]: Math.floor(difficulty / 3)
      }
    };
  }

  generateItemPrefix(difficulty) {
    const prefixes = [
      "Basic",
      "Advanced",
      "Prototype",
      "Military-Grade",
      "Experimental"
    ];

    return prefixes[Math.min(prefixes.length - 1, Math.floor(difficulty / 2))];
  }

  calculateTimeLimit(difficulty) {
    // Base time of 30 minutes
    let time = 30;

    // Adjust for difficulty
    time += difficulty * 10;

    // Random variation
    time += Math.floor(Math.random() * 20) - 10;

    return Math.max(20, time);
  }

  generateMissionName(type, client) {
    const adjectives = {
      hack: ["Digital", "Cyber", "Neural", "Data"],
      combat: ["Steel", "Chrome", "Blood", "Shadow"],
      stealth: ["Silent", "Ghost", "Dark", "Midnight"],
      investigation: ["Hidden", "Lost", "Encrypted", "Phantom"]
    };

    const nouns = {
      hack: ["Breach", "Infiltration", "Override", "Protocol"],
      combat: ["Strike", "Operation", "Assault", "Intervention"],
      stealth: ["Extraction", "Infiltration", "Heist", "Operation"],
      investigation: ["Trail", "Mystery", "Case", "Investigation"]
    };

    const adj = adjectives[type][Math.floor(Math.random() * adjectives[type].length)];
    const noun = nouns[type][Math.floor(Math.random() * nouns[type].length)];

    return `Operation ${adj} ${noun}`;
  }

  generateLocationDescription(location) {
    const descriptions = {
      corporate_server: "A heavily fortified server farm with state-of-the-art ICE",
      research_lab: "High-security research facility with valuable prototype data",
      secure_datacenter: "Underground data storage with military-grade security",
      gang_territory: "Neon-lit streets controlled by heavily armed gang members",
      combat_zone: "Lawless district where violence is the only language",
      black_market: "Hidden marketplace dealing in illegal goods and information",
      corporate_office: "High-rise office complex with tight security",
      private_residence: "Luxury apartment with private security systems",
      secure_facility: "Restricted access facility with guard patrols",
      hacker_den: "Underground hub of illegal cyber operations",
      underground_market: "Secret marketplace for illegal tech and data",
      info_broker_office: "Front business hiding valuable information networks"
    };

    return descriptions[location] || "A dangerous location in Night City";
  }
}

module.exports = MissionGenerator;
