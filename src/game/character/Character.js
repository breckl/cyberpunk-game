const classes = require("./classes");

class Character {
  constructor(name, characterClass) {
    this.name = name;
    this.class = characterClass;
    this.level = 1;
    this.experience = 0;
    this.credits = 25;

    // Copy base stats from class template
    this.stats = { ...classes[characterClass].baseStats };
    this.maxHp = this.stats.hp;
    this.maxEnergy = this.stats.energy;
    this.hp = this.maxHp;
    this.energy = this.maxEnergy;

    // Initialize inventory with starting gear
    this.inventory = classes[characterClass].startingGear.map((item) => ({
      name: item,
      equipped: false,
    }));

    // Initialize abilities
    this.abilities = classes[characterClass].specialAbilities.map(
      (ability) => ({
        ...ability,
        currentCooldown: 0,
      })
    );

    // Status effects and cybernetics
    this.statusEffects = [];
    this.cybernetics = [];

    // Reputation with different factions
    this.reputation = {
      corporates: 0,
      gangs: 0,
      hackers: 0,
      blackMarket: 0,
    };

    // Daily action limits
    this.dailyActions = {
      total: 10,
      remaining: 10,
      lastRefresh: new Date(),
    };
  }

  // Experience and leveling
  gainExperience(amount) {
    this.experience += amount;
    const nextLevelThreshold = this.level * 1000;

    if (this.experience >= nextLevelThreshold) {
      this.levelUp();
    }
  }

  levelUp() {
    this.level++;
    this.experience -= (this.level - 1) * 1000;

    // Stat increases
    this.stats.hp += 10;
    this.stats.energy += 10;
    this.maxHp = this.stats.hp;
    this.maxEnergy = this.stats.energy;

    // Random stat boost
    const stats = ["hack", "combat", "stealth", "charm", "tech"];
    const randomStat = stats[Math.floor(Math.random() * stats.length)];
    this.stats[randomStat] += 1;

    return {
      level: this.level,
      statIncreased: randomStat,
    };
  }

  // Combat methods
  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
    return this.hp <= 0;
  }

  heal(amount) {
    this.hp = Math.min(this.maxHp, this.hp + amount);
  }

  useEnergy(amount) {
    if (this.energy < amount) return false;
    this.energy -= amount;
    return true;
  }

  restoreEnergy(amount) {
    this.energy = Math.min(this.maxEnergy, this.energy + amount);
  }

  // Ability management
  useAbility(abilityName, target) {
    const ability = this.abilities.find((a) => a.name === abilityName);
    if (!ability) return { success: false, message: "Ability not found" };
    if (ability.currentCooldown > 0)
      return { success: false, message: "Ability on cooldown" };
    if (!this.useEnergy(ability.energyCost))
      return { success: false, message: "Not enough energy" };

    ability.currentCooldown = ability.cooldown;
    return { success: true, ability };
  }

  updateCooldowns() {
    this.abilities.forEach((ability) => {
      ability.currentCooldown = Math.max(0, ability.currentCooldown - 1);
    });
  }

  // Inventory management
  addItem(item) {
    this.inventory.push({
      name: item.name,
      equipped: false,
      ...item,
    });
  }

  removeItem(itemName) {
    const index = this.inventory.findIndex((i) => i.name === itemName);
    if (index >= 0) {
      return this.inventory.splice(index, 1)[0];
    }
    return null;
  }

  equipItem(itemName) {
    const item = this.inventory.find((i) => i.name === itemName);
    if (!item) return false;
    item.equipped = true;
    return true;
  }

  // Cybernetic enhancements
  installCybernetic(cybernetic) {
    // Check if slot is available
    const existingInSlot = this.cybernetics.find(
      (c) => c.slot === cybernetic.slot
    );
    if (existingInSlot) {
      return { success: false, message: "Slot already occupied" };
    }

    // Apply stat modifications
    Object.entries(cybernetic.statModifiers || {}).forEach(([stat, value]) => {
      this.stats[stat] = (this.stats[stat] || 0) + value;
    });

    this.cybernetics.push(cybernetic);
    return { success: true, cybernetic };
  }

  removeCybernetic(cyberneticName) {
    const index = this.cybernetics.findIndex((c) => c.name === cyberneticName);
    if (index >= 0) {
      const cybernetic = this.cybernetics[index];
      // Remove stat modifications
      Object.entries(cybernetic.statModifiers || {}).forEach(
        ([stat, value]) => {
          this.stats[stat] -= value;
        }
      );
      this.cybernetics.splice(index, 1);
      return true;
    }
    return false;
  }

  // Reputation management
  changeReputation(faction, amount) {
    if (faction in this.reputation) {
      this.reputation[faction] = Math.max(
        -100,
        Math.min(100, this.reputation[faction] + amount)
      );
      return true;
    }
    return false;
  }

  // Credit management
  gainCredits(amount, reason = "Unknown") {
    this.credits += amount;
    return {
      amountGained: amount,
      reason: reason,
      totalCredits: this.credits,
    };
  }

  loseCredits(amount, reason = "Unknown") {
    const oldCredits = this.credits;
    this.credits = Math.max(0, this.credits - amount);
    const actualLoss = oldCredits - this.credits;

    return {
      amountLost: actualLoss,
      reason: reason,
      remainingCredits: this.credits,
    };
  }

  // Daily actions
  refreshDailyActions() {
    const now = new Date();
    const lastRefresh = new Date(this.dailyActions.lastRefresh);

    if (
      now.getDate() !== lastRefresh.getDate() ||
      now.getMonth() !== lastRefresh.getMonth() ||
      now.getFullYear() !== lastRefresh.getMonth()
    ) {
      this.dailyActions.remaining = this.dailyActions.total;
      this.dailyActions.lastRefresh = now;
      return true;
    }
    return false;
  }

  useAction(amount = 1) {
    if (this.dailyActions.remaining < amount) return false;
    this.dailyActions.remaining -= amount;
    return true;
  }

  // Status effects
  addStatusEffect(effect) {
    this.statusEffects.push({
      ...effect,
      duration: effect.duration || 1,
    });
  }

  updateStatusEffects() {
    this.statusEffects = this.statusEffects
      .map((effect) => ({ ...effect, duration: effect.duration - 1 }))
      .filter((effect) => effect.duration > 0);
  }

  // Save/Load
  toJSON() {
    return {
      name: this.name,
      class: this.class,
      level: this.level,
      experience: this.experience,
      stats: this.stats,
      hp: this.hp,
      maxHp: this.maxHp,
      energy: this.energy,
      maxEnergy: this.maxEnergy,
      inventory: this.inventory,
      abilities: this.abilities,
      cybernetics: this.cybernetics,
      statusEffects: this.statusEffects,
      reputation: this.reputation,
      dailyActions: this.dailyActions,
      credits: this.credits,
    };
  }

  static fromJSON(data) {
    const character = new Character(data.name, data.class);
    Object.assign(character, data);
    return character;
  }
}

module.exports = Character;
