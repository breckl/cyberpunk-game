import ProgressionCalculator from "../utils/progressionCalculator.js";

const levels = {
  1: {
    xp: 0,
    hp: ProgressionCalculator.calculatePlayerStats(1).hp,
    attack: ProgressionCalculator.calculatePlayerStats(1).attack,
    defense: ProgressionCalculator.calculatePlayerStats(1).defense,
    hacking: ProgressionCalculator.calculatePlayerStats(1).hacking,
  },
  2: {
    xp: 200,
    hp: ProgressionCalculator.calculatePlayerStats(2).hp,
    attack: ProgressionCalculator.calculatePlayerStats(2).attack,
    defense: ProgressionCalculator.calculatePlayerStats(2).defense,
    hacking: ProgressionCalculator.calculatePlayerStats(2).hacking,
  },
  3: {
    xp: 400,
    hp: ProgressionCalculator.calculatePlayerStats(3).hp,
    attack: ProgressionCalculator.calculatePlayerStats(3).attack,
    defense: ProgressionCalculator.calculatePlayerStats(3).defense,
    hacking: ProgressionCalculator.calculatePlayerStats(3).hacking,
  },
  4: {
    xp: 800,
    hp: ProgressionCalculator.calculatePlayerStats(4).hp,
    attack: ProgressionCalculator.calculatePlayerStats(4).attack,
    defense: ProgressionCalculator.calculatePlayerStats(4).defense,
    hacking: ProgressionCalculator.calculatePlayerStats(4).hacking,
  },
  5: {
    xp: 1600,
    hp: ProgressionCalculator.calculatePlayerStats(5).hp,
    attack: ProgressionCalculator.calculatePlayerStats(5).attack,
    defense: ProgressionCalculator.calculatePlayerStats(5).defense,
    hacking: ProgressionCalculator.calculatePlayerStats(5).hacking,
  },
  6: {
    xp: 3200,
    hp: ProgressionCalculator.calculatePlayerStats(6).hp,
    attack: ProgressionCalculator.calculatePlayerStats(6).attack,
    defense: ProgressionCalculator.calculatePlayerStats(6).defense,
    hacking: ProgressionCalculator.calculatePlayerStats(6).hacking,
  },
  7: {
    xp: 6400,
    hp: ProgressionCalculator.calculatePlayerStats(7).hp,
    attack: ProgressionCalculator.calculatePlayerStats(7).attack,
    defense: ProgressionCalculator.calculatePlayerStats(7).defense,
    hacking: ProgressionCalculator.calculatePlayerStats(7).hacking,
  },
  8: {
    xp: 12800,
    hp: ProgressionCalculator.calculatePlayerStats(8).hp,
    attack: ProgressionCalculator.calculatePlayerStats(8).attack,
    defense: ProgressionCalculator.calculatePlayerStats(8).defense,
    hacking: ProgressionCalculator.calculatePlayerStats(8).hacking,
  },
  9: {
    xp: 25600,
    hp: ProgressionCalculator.calculatePlayerStats(9).hp,
    attack: ProgressionCalculator.calculatePlayerStats(9).attack,
    defense: ProgressionCalculator.calculatePlayerStats(9).defense,
    hacking: ProgressionCalculator.calculatePlayerStats(9).hacking,
  },
  10: {
    xp: 51200,
    hp: ProgressionCalculator.calculatePlayerStats(10).hp,
    attack: ProgressionCalculator.calculatePlayerStats(10).attack,
    defense: ProgressionCalculator.calculatePlayerStats(10).defense,
    hacking: ProgressionCalculator.calculatePlayerStats(10).hacking,
  },
};

// Helper functions for level calculations
export const getLevelInfo = (level) => {
  return levels[level] || null;
};

export const getCurrentLevel = (xp) => {
  let currentLevel = 1;

  for (let level = 1; level <= Object.keys(levels).length; level++) {
    if (xp >= levels[level].xp) {
      currentLevel = level;
    } else {
      break;
    }
  }

  return currentLevel;
};

export const getNextLevelXP = (currentLevel) => {
  const nextLevel = currentLevel + 1;
  return levels[nextLevel] ? levels[nextLevel].xp : null;
};

export const getXPProgress = (xp, currentLevel) => {
  const currentLevelXP = levels[currentLevel].xp;
  const nextLevelXP = getNextLevelXP(currentLevel);

  if (!nextLevelXP) return 100; // Max level reached

  const xpInCurrentLevel = xp - currentLevelXP;
  const xpNeededForNextLevel = nextLevelXP - currentLevelXP;

  return Math.floor((xpInCurrentLevel / xpNeededForNextLevel) * 100);
};

export const getLevelUpRewards = (newLevel) => {
  const levelInfo = levels[newLevel];
  if (!levelInfo) return null;

  return {
    hp: levelInfo.hp,
    attack: levelInfo.attack,
    defense: levelInfo.defense,
    hacking: levelInfo.hacking,
  };
};

// New helper function to get progression info
export const getProgressionInfo = (level) => {
  if (!levels[level]) return null;

  return {
    ...levels[level],
    nextLevelStats: levels[level + 1]
      ? {
          hpIncrease: levels[level + 1].hp - levels[level].hp,
          attackIncrease: levels[level + 1].attack - levels[level].attack,
          defenseIncrease: levels[level + 1].defense - levels[level].defense,
          hackingIncrease: levels[level + 1].hacking - levels[level].hacking,
        }
      : null,
  };
};

export default levels;
