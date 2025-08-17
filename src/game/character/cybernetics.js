const cybernetics = {
  // Neural Implants (Head slot)
  neuralImplants: {
    basicNeuralLink: {
      name: "Basic Neural Link",
      slot: "head",
      tier: 1,
      cost: 1000,
      description: "Standard neural interface for basic cybernetic integration",
      statModifiers: {
        hack: 1,
        tech: 1
      },
      requirements: {
        level: 1
      }
    },
    combatOptix: {
      name: "Combat Optix",
      slot: "head",
      tier: 2,
      cost: 2500,
      description: "Enhanced visual processing for combat situations",
      statModifiers: {
        combat: 2,
        stealth: 1
      },
      abilities: [{
        name: "Tactical Scan",
        description: "Analyze enemy weaknesses",
        cooldown: 3
      }],
      requirements: {
        level: 3
      }
    },
    netrunnerSuite: {
      name: "Netrunner Suite",
      slot: "head",
      tier: 3,
      cost: 5000,
      description: "Advanced hacking and neural processing unit",
      statModifiers: {
        hack: 3,
        tech: 2
      },
      abilities: [{
        name: "Deep Dive",
        description: "Enhanced hacking capabilities",
        cooldown: 4
      }],
      requirements: {
        level: 5,
        stats: {
          hack: 5
        }
      }
    }
  },

  // Arm Augmentations
  arms: {
    hydraulicGrip: {
      name: "Hydraulic Grip",
      slot: "arms",
      tier: 1,
      cost: 1500,
      description: "Enhanced strength and grip control",
      statModifiers: {
        combat: 1,
        tech: 1
      },
      requirements: {
        level: 2
      }
    },
    mantisBlades: {
      name: "Mantis Blades",
      slot: "arms",
      tier: 3,
      cost: 6000,
      description: "Retractable cyber-weapons",
      statModifiers: {
        combat: 4
      },
      abilities: [{
        name: "Blade Fury",
        description: "Multiple rapid strikes",
        cooldown: 5,
        damageMultiplier: 1.5
      }],
      requirements: {
        level: 6,
        stats: {
          combat: 6
        }
      }
    },
    hackingPorts: {
      name: "Hacking Ports",
      slot: "arms",
      tier: 2,
      cost: 3000,
      description: "Direct neural interface ports for enhanced hacking",
      statModifiers: {
        hack: 2,
        tech: 2
      },
      requirements: {
        level: 4,
        stats: {
          hack: 4
        }
      }
    }
  },

  // Leg Enhancements
  legs: {
    springHeels: {
      name: "Spring Heels",
      slot: "legs",
      tier: 1,
      cost: 2000,
      description: "Enhanced jumping and landing capabilities",
      statModifiers: {
        stealth: 1,
        combat: 1
      },
      requirements: {
        level: 2
      }
    },
    velocitySystem: {
      name: "Velocity System",
      slot: "legs",
      tier: 2,
      cost: 4000,
      description: "Advanced movement and evasion system",
      statModifiers: {
        stealth: 2,
        combat: 2
      },
      abilities: [{
        name: "Rapid Retreat",
        description: "Quick tactical repositioning",
        cooldown: 4
      }],
      requirements: {
        level: 4,
        stats: {
          stealth: 4
        }
      }
    }
  },

  // Core Systems
  core: {
    subdermalArmor: {
      name: "Subdermal Armor",
      slot: "core",
      tier: 2,
      cost: 3500,
      description: "Reinforced dermal layers for enhanced protection",
      statModifiers: {
        hp: 20,
        combat: 1
      },
      requirements: {
        level: 3
      }
    },
    reflexBooster: {
      name: "Reflex Booster",
      slot: "core",
      tier: 2,
      cost: 4500,
      description: "Enhanced neural response time",
      statModifiers: {
        combat: 2,
        stealth: 2
      },
      abilities: [{
        name: "Combat Reflexes",
        description: "Temporary boost to combat capabilities",
        cooldown: 5
      }],
      requirements: {
        level: 5
      }
    },
    energyCore: {
      name: "Energy Core",
      slot: "core",
      tier: 3,
      cost: 6000,
      description: "Advanced power system for cybernetic enhancements",
      statModifiers: {
        energy: 30,
        tech: 2
      },
      requirements: {
        level: 6,
        stats: {
          tech: 5
        }
      }
    }
  },

  // Operating Systems
  os: {
    basicOS: {
      name: "Basic OS v1.0",
      slot: "os",
      tier: 1,
      cost: 1000,
      description: "Standard operating system for cybernetic integration",
      statModifiers: {
        tech: 1
      },
      requirements: {
        level: 1
      }
    },
    combatOS: {
      name: "Combat OS v2.0",
      slot: "os",
      tier: 2,
      cost: 3500,
      description: "Specialized combat processing system",
      statModifiers: {
        combat: 2,
        tech: 1
      },
      abilities: [{
        name: "Combat Algorithms",
        description: "Enhanced combat performance",
        cooldown: 6
      }],
      requirements: {
        level: 4,
        stats: {
          combat: 4
        }
      }
    },
    netrunnerOS: {
      name: "Netrunner OS v2.0",
      slot: "os",
      tier: 2,
      cost: 4000,
      description: "Advanced hacking and network interface system",
      statModifiers: {
        hack: 2,
        tech: 2
      },
      abilities: [{
        name: "System Override",
        description: "Enhanced hacking capabilities",
        cooldown: 5
      }],
      requirements: {
        level: 4,
        stats: {
          hack: 4
        }
      }
    }
  }
};

// Utility functions for cybernetics
const cyberneticUtils = {
  // Check if character meets requirements for cybernetic
  checkRequirements(character, cybernetic) {
    // Level requirement
    if (cybernetic.requirements.level > character.level) {
      return {
        met: false,
        reason: `Requires level ${cybernetic.requirements.level}`
      };
    }

    // Stat requirements
    if (cybernetic.requirements.stats) {
      for (const [stat, value] of Object.entries(cybernetic.requirements.stats)) {
        if (character.stats[stat] < value) {
          return {
            met: false,
            reason: `Requires ${stat} ${value}`
          };
        }
      }
    }

    // Check if slot is available
    const existingInSlot = character.cybernetics.find(
      c => c.slot === cybernetic.slot
    );
    if (existingInSlot) {
      return {
        met: false,
        reason: `Slot ${cybernetic.slot} is occupied by ${existingInSlot.name}`
      };
    }

    return { met: true };
  },

  // Calculate installation cost including medical fees
  calculateInstallationCost(cybernetic, character) {
    let cost = cybernetic.cost;
    
    // Higher tier = higher installation cost
    cost += cybernetic.tier * 500;
    
    // Discount based on tech skill
    const techDiscount = character.stats.tech * 50;
    cost = Math.max(cost - techDiscount, cost * 0.7); // Maximum 30% discount
    
    return Math.floor(cost);
  },

  // Calculate recovery time
  calculateRecoveryTime(cybernetic) {
    // Base recovery of 1 day
    let recovery = 1;
    
    // Add days based on tier
    recovery += cybernetic.tier - 1;
    
    // Additional day for core systems
    if (cybernetic.slot === 'core') {
      recovery += 1;
    }
    
    return recovery;
  },

  // Get available upgrades for an installed cybernetic
  getAvailableUpgrades(cybernetic, character) {
    const upgrades = [];
    
    // Only tier 1 and 2 cybernetics can be upgraded
    if (cybernetic.tier >= 3) return upgrades;
    
    // Find next tier in same category
    const category = Object.values(cybernetics).find(cat => 
      Object.values(cat).some(c => c.name === cybernetic.name)
    );
    
    if (category) {
      const nextTier = Object.values(category).find(c => 
        c.tier === cybernetic.tier + 1 &&
        c.slot === cybernetic.slot
      );
      
      if (nextTier) {
        upgrades.push({
          current: cybernetic,
          upgrade: nextTier,
          cost: nextTier.cost - cybernetic.cost,
          requirements: this.checkRequirements(character, nextTier)
        });
      }
    }
    
    return upgrades;
  }
};

module.exports = {
  cybernetics,
  cyberneticUtils
};
