// Random events that can occur between fights in the Sprawl universe
//
// How to adjust level scaling:
// - Import: import { updateLevelScaling, getLevelScalingConfig } from '../data/randomEvents.js'
// - Update: updateLevelScaling({ baseRewardAmount: 150, basePenaltyAmount: 75, rewardPerLevel: 0.3, penaltyPerLevel: 0.2, variability: 0.25 })
// - Check: getLevelScalingConfig() to see current values
//
// Current scaling:
// - Base reward amount: 100 credits
// - Base penalty amount: 50 credits
// - Rewards: +20% per level (0.2)
// - Penalties: +15% per level (0.15)
// - Variability: ±20% from base amount (0.2)
// - Event multipliers: 0.6x to 2.0x (handles variance between events)
export const randomEvents = [
  {
    id: "biosoft_chip",
    message:
      "You find a discarded biosoft chip in a dark alley. It's still functional and worth some credits.",
    reward: { type: "credits", multiplier: 1.0 },
    probability: 1.0,
  },
  {
    id: "wizards_castle",
    message:
      "You get distracted by Wizard's Castle at the local arcade. The game is addictive and you spend the rest of the day there.",
    penalty: { type: "credits", multiplier: 0.8 },
    probability: 1.0,
  },
  {
    id: "tank_war_europe",
    message:
      "You challenge someone to Tank War Europe at the arcade and win! Your reflexes are still sharp.",
    reward: { type: "credits", multiplier: 1.2 },
    probability: 1.0,
  },
  {
    id: "hacked_bar",
    message:
      "On your way to the bar, you get hacked by a script kiddie. They drain some of your credits before you can counter-hack.",
    penalty: { type: "credits", multiplier: 1.1 },
    probability: 1.0,
  },
  {
    id: "police_drones",
    message:
      "Mobile police drones stop you for a random scan. They find some contraband and confiscate it along with some credits.",
    penalty: { type: "credits", multiplier: 1.3 },
    probability: 1.0,
  },
  {
    id: "simstim_lost",
    message:
      "You find a simstim cassette in the trash. Curiosity gets the better of you and you get lost in the matrix for the rest of the day.",
    penalty: { type: "credits", multiplier: 0.7 },
    probability: 1.0,
  },
  {
    id: "simstim_popular",
    message:
      "You find a popular simstim cassette that's been discontinued. It fetches a good price on the black market.",
    reward: { type: "credits", multiplier: 1.5 },
    probability: 1.0,
  },
  {
    id: "courier_pack",
    message:
      "You stumble upon a lost courier pack. The contents are valuable and you manage to sell them.",
    reward: { type: "credits", multiplier: 1.8 },
    probability: 1.0,
  },
  {
    id: "black_clinic",
    message:
      "You pass a black clinic and decide to sell a vestigial organ. The procedure is quick and profitable.",
    reward: { type: "credits", multiplier: 2.0 },
    probability: 1.0,
  },
  {
    id: "microbionics",
    message:
      "You find discarded microbionics in the trash. They're still functional and worth selling.",
    reward: { type: "credits", multiplier: 0.9 },
    probability: 1.0,
  },
  {
    id: "ai_billboard",
    message:
      "An AI billboard locks onto you, spamming tailored ads. You get pickpocketed for some credits while distracted.",
    penalty: { type: "credits", multiplier: 0.6 },
    probability: 1.0,
  },
  {
    id: "courier_gig",
    message:
      "A shopkeeper slips you a small package to drop off nearby. Low pay, but it builds connections in the underground network.",
    reward: { type: "credits", multiplier: 0.8 },
    probability: 1.0,
  },
  {
    id: "armor_find",
    message:
      "You stumble upon discarded armor in a back alley. It's still functional and fetches a decent price from a fence.",
    reward: { type: "credits", multiplier: 1.1 },
    probability: 1.0,
  },
  {
    id: "weapon_find",
    message:
      "You discover a discarded weapon in the trash. It's in good condition and sells well on the black market.",
    reward: { type: "credits", multiplier: 1.3 },
    probability: 1.0,
  },
  {
    id: "simstim_celebrity",
    message:
      "A simstim celebrity passes through the area, drawing crowds of distracted onlookers. You take advantage of the chaos to pick a few pockets.",
    reward: { type: "credits", multiplier: 1.4 },
    probability: 1.0,
  },
];

// Random headers for different event types
const REWARD_HEADERS = ["GOOD FORTUNE", "LUCKY BREAK", "FORTUNE SMILES"];

const PENALTY_HEADERS = ["MURPHY'S LAW", "TOUGH BREAK", "GLITCH HAPPENS"];

// Function to get a random event
export const getRandomEvent = () => {
  const randomIndex = Math.floor(Math.random() * randomEvents.length);
  const event = randomEvents[randomIndex];

  // Add a random header based on event type
  if (event.reward) {
    const headerIndex = Math.floor(Math.random() * REWARD_HEADERS.length);
    event.header = REWARD_HEADERS[headerIndex];
  } else if (event.penalty) {
    const headerIndex = Math.floor(Math.random() * PENALTY_HEADERS.length);
    event.header = PENALTY_HEADERS[headerIndex];
  }

  return event;
};

// Configuration for level scaling - adjust these values to change how much events scale with level
const LEVEL_SCALING_CONFIG = {
  baseRewardAmount: 10, // Base amount for all rewards
  basePenaltyAmount: 5, // Base amount for all penalties
  rewardPerLevel: 0.25, // 20% increase per level for rewards
  penaltyPerLevel: 0.25, // 15% increase per level for penalties
  variability: 0.2, // 20% +/- variability
};

// Function to calculate reward or penalty amount based on player level
export const calculateEventAmount = (event, playerLevel = 1) => {
  if (event.reward) {
    const { multiplier = 1.0 } = event.reward;
    const baseAmount = LEVEL_SCALING_CONFIG.baseRewardAmount;

    // Add 20% variability (+/- 10% from base)
    const variability =
      (Math.random() - 0.5) * 2 * LEVEL_SCALING_CONFIG.variability; // -0.2 to +0.2
    const variedAmount = baseAmount * (1 + variability);

    // Apply event multiplier and level scaling
    const levelScaledAmount = Math.floor(
      variedAmount *
        multiplier *
        (1 + (playerLevel - 1) * LEVEL_SCALING_CONFIG.rewardPerLevel)
    );

    return Math.max(1, levelScaledAmount); // Ensure minimum of 1 credit
  } else if (event.penalty) {
    const { multiplier = 1.0 } = event.penalty;
    const baseAmount = LEVEL_SCALING_CONFIG.basePenaltyAmount;

    // Add 20% variability (+/- 10% from base)
    const variability =
      (Math.random() - 0.5) * 2 * LEVEL_SCALING_CONFIG.variability; // -0.2 to +0.2
    const variedAmount = baseAmount * (1 + variability);

    // Apply event multiplier and level scaling
    const levelScaledAmount = Math.floor(
      variedAmount *
        multiplier *
        (1 + (playerLevel - 1) * LEVEL_SCALING_CONFIG.penaltyPerLevel)
    );

    return Math.max(1, levelScaledAmount); // Ensure minimum of 1 credit
  }
  return 0;
};

// Function to update level scaling configuration
export const updateLevelScaling = (newConfig) => {
  Object.assign(LEVEL_SCALING_CONFIG, newConfig);
};

// Function to get current level scaling configuration
export const getLevelScalingConfig = () => {
  return { ...LEVEL_SCALING_CONFIG };
};
