const dailyEvents = {
  locations: {
    nightMarket: {
      name: "Night Market",
      description:
        "A bustling black market where anything can be bought or sold... for the right price.",
      dailyActions: 3,
      events: [
        {
          name: "Haggle with Vendors",
          description: "Try to get better prices on gear and cybernetics",
          rewards: {
            credits: { min: 100, max: 1000 },
            items: ["Random Cybernetic", "Weapon Mod", "Tech Part"],
          },
          risks: {
            combat: 0.2, // 20% chance of combat
            theft: 0.1, // 10% chance of losing credits
          },
        },
        {
          name: "Information Trading",
          description: "Exchange data and secrets with info brokers",
          rewards: {
            exp: { min: 50, max: 200 },
            intel: true,
            questChance: 0.3,
          },
          risks: {
            reputation: 0.1, // Chance of reputation loss
          },
        },
      ],
    },
    hackNet: {
      name: "HackNet Terminals",
      description:
        "Public terminals where netrunners gather to hack and trade code.",
      dailyActions: 2,
      events: [
        {
          name: "System Raid",
          description: "Attempt to breach a corporate system",
          rewards: {
            credits: { min: 500, max: 3000 },
            exp: { min: 100, max: 400 },
            hackingTools: true,
          },
          risks: {
            trace: 0.4, // Chance of being traced
            systemDamage: 0.2, // Chance of taking neural damage
          },
        },
        {
          name: "Code Trading",
          description: "Share and sell custom hack programs",
          rewards: {
            exp: { min: 25, max: 150 },
            programs: true,
          },
        },
      ],
    },
    streetClinic: {
      name: "Street Clinic",
      description:
        "Underground medical facility for cybernetic upgrades and healing.",
      dailyActions: 2,
      events: [
        {
          name: "Heal Up",
          description: "Restore health and fix damaged cybernetics",
          cost: { min: 100, max: 500 },
          effects: {
            healing: true,
            repairCyber: true,
          },
        },
        {
          name: "Install Upgrades",
          description: "Get new cybernetic enhancements",
          cost: { min: 1000, max: 5000 },
          effects: {
            newCybernetic: true,
            recovery: -1, // Lose one daily action while recovering
          },
        },
      ],
    },
    combatZone: {
      name: "Combat Zone",
      description:
        "Dangerous district where gangs and mercenaries test their skills.",
      dailyActions: 3,
      events: [
        {
          name: "Street Fight",
          description: "Enter an underground fighting ring",
          rewards: {
            credits: { min: 200, max: 2000 },
            exp: { min: 100, max: 300 },
            reputation: true,
          },
          risks: {
            injury: 0.4, // High chance of taking damage
            death: 0.05, // Small chance of fatal injury
          },
        },
        {
          name: "Gang Warfare",
          description: "Participate in territory disputes",
          rewards: {
            credits: { min: 500, max: 1500 },
            exp: { min: 150, max: 450 },
            territory: true,
          },
          risks: {
            injury: 0.6,
            reputation: 0.2, // Chance of reputation change with other gangs
          },
        },
      ],
    },
  },

  randomEvents: [
    {
      name: "Corporate Raid",
      description:
        "A mega-corp is vulnerable. Gather a team for a high-stakes hack.",
      minLevel: 5,
      rewards: {
        credits: { min: 5000, max: 20000 },
        exp: { min: 500, max: 1000 },
        rareItems: true,
      },
      risks: {
        death: 0.1,
        wanted: 0.3, // Chance of getting corporate bounty
        trace: 0.4,
      },
    },
    {
      name: "Rogue AI",
      description:
        "An AI has gone rogue in the local network. Contain or profit?",
      minLevel: 3,
      rewards: {
        credits: { min: 1000, max: 5000 },
        exp: { min: 200, max: 600 },
        aiFragment: true,
      },
      risks: {
        systemDamage: 0.5,
        dataLoss: 0.2,
      },
    },
    {
      name: "Street War",
      description:
        "Gang warfare has erupted. Pick a side or profit from chaos.",
      minLevel: 2,
      rewards: {
        credits: { min: 500, max: 3000 },
        exp: { min: 150, max: 450 },
        territory: true,
      },
      risks: {
        injury: 0.7,
        reputation: 0.5,
      },
    },
  ],

  // Special events that occur at specific player levels or conditions
  milestones: {
    firstCybernetic: {
      level: 2,
      description: "Ready for your first major cyber upgrade?",
      reward: "Free basic cybernetic installation",
    },
    corporateAttention: {
      level: 5,
      description: "You've caught the attention of the mega-corps",
      effect: "Opens corporate missions but adds random pursuit events",
    },
    undergroundLegend: {
      level: 10,
      description: "Your reputation precedes you in the underground",
      effect: "Better prices, new quest lines, but more enemies",
    },
  },
};

module.exports = dailyEvents;
