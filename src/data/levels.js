const levels = {
  1: {
    xp: 0,
    hp: 30,
    attack: 2,
    defense: 0,
    hacking: 4,
  },
  2: {
    xp: 100,
    hp: 40,
    attack: 4,
    defense: 2,
    hacking: 6,
  },
  3: {
    xp: 250,
    hp: 50,
    attack: 6,
    defense: 4,
    hacking: 8,
  },
  4: {
    xp: 500,
    hp: 60,
    attack: 8,
    defense: 6,
    hacking: 10,
  },
  5: {
    xp: 900,
    hp: 70,
    attack: 10,
    defense: 8,
    hacking: 12,
  },
  6: {
    xp: 1400,
    hp: 80,
    attack: 12,
    defense: 10,
    hacking: 14,
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

export default levels;
