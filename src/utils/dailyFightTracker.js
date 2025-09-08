const DAILY_FIGHT_LIMIT = 1000;
const FIGHT_TRACKER_KEY = "cyberpunk_daily_fights";
const LAST_FIGHT_DAY_KEY = "cyberpunk_last_fight_day";

// Get current date as YYYY-MM-DD string
const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().split("T")[0];
};

// Get fight data from localStorage
const getFightData = () => {
  try {
    const fightData = localStorage.getItem(FIGHT_TRACKER_KEY);
    const lastDay = localStorage.getItem(LAST_FIGHT_DAY_KEY);

    return {
      fightCount: fightData ? parseInt(fightData, 10) : 0,
      lastFightDay: lastDay || null,
    };
  } catch (error) {
    console.error("Error reading fight data from localStorage:", error);
    return { fightCount: 0, lastFightDay: null };
  }
};

// Save fight data to localStorage
const saveFightData = (fightCount, lastFightDay) => {
  try {
    localStorage.setItem(FIGHT_TRACKER_KEY, fightCount.toString());
    localStorage.setItem(LAST_FIGHT_DAY_KEY, lastFightDay);
  } catch (error) {
    console.error("Error saving fight data to localStorage:", error);
  }
};

// Check if it's a new day and reset counter if needed
const checkAndResetDailyCounter = () => {
  const currentDate = getCurrentDate();
  const { fightCount, lastFightDay } = getFightData();

  // If it's a new day, reset the counter
  if (lastFightDay !== currentDate) {
    saveFightData(0, currentDate);
    return { fightCount: 0, isNewDay: true };
  }

  return { fightCount, isNewDay: false };
};

// Increment fight counter
export const incrementFightCount = () => {
  const { fightCount } = checkAndResetDailyCounter();
  const newCount = fightCount + 1;
  const currentDate = getCurrentDate();

  saveFightData(newCount, currentDate);
  return newCount;
};

// Check if daily limit has been exceeded
export const isDailyLimitExceeded = () => {
  const { fightCount } = checkAndResetDailyCounter();
  return fightCount >= DAILY_FIGHT_LIMIT;
};

// Get current fight count for the day
export const getCurrentFightCount = () => {
  const { fightCount } = checkAndResetDailyCounter();
  return fightCount;
};

// Get remaining fights for the day
export const getRemainingFights = () => {
  const currentCount = getCurrentFightCount();
  return Math.max(0, DAILY_FIGHT_LIMIT - currentCount);
};

// Get daily limit constant
export const getDailyFightLimit = () => DAILY_FIGHT_LIMIT;

// Reset fight counter (for testing purposes)
export const resetFightCounter = () => {
  const currentDate = getCurrentDate();
  saveFightData(0, currentDate);
};
