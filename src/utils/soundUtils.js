/**
 * Global Sound Utilities
 * Centralized sound management for the cyberpunk text game
 */

// Global sound state - will be set by SoundContext
let globalSoundsEnabled = true;

/**
 * Set the global sound state
 * @param {boolean} enabled - Whether sounds should be enabled
 */
export const setGlobalSoundState = (enabled) => {
  globalSoundsEnabled = enabled;
};

/**
 * Check if sounds are globally enabled
 * @returns {boolean} - Whether sounds are enabled
 */
export const areSoundsEnabled = () => {
  return globalSoundsEnabled;
};

/**
 * Play a click sound effect
 * @param {number} volume - Volume level (0.0 to 1.0), defaults to 0.4
 */
export const playClickSound = (volume = 0.4) => {
  if (!areSoundsEnabled()) return;
  const audio = new Audio("/sfx/mouse-click.mp3");
  audio.volume = volume;
  audio.play().catch((e) => console.log("Audio play failed:", e));
};

export const playCashRegisterSound = (volume = 0.4) => {
  if (!areSoundsEnabled()) return;
  console.log("playCashRegisterSound called with volume:", volume);
  const audio = new Audio("/sfx/cash-register.mp3");
  audio.volume = volume;
  audio.play().catch((e) => console.log("Cash register audio play failed:", e));
};

export const playBeepSound = (volume = 0.4) => {
  if (!areSoundsEnabled()) return;
  const audio = new Audio("/sfx/beep.mp3");
  audio.volume = volume;
  audio.play().catch((e) => console.log("Audio play failed:", e));
};

/**
 * Play a spacebar sound effect
 * @param {number} volume - Volume level (0.0 to 1.0), defaults to 0.4
 */
export const playSpacebarSound = (volume = 0.4) => {
  if (!areSoundsEnabled()) return;
  // Randomly choose between two spacebar sounds for variety
  const soundFiles = ["/sfx/spacebar-1.mp3", "/sfx/spacebar-2.mp3"];
  const randomSound = soundFiles[Math.floor(Math.random() * soundFiles.length)];

  const audio = new Audio(randomSound);
  audio.volume = volume;
  audio.play().catch((e) => console.log("Audio play failed:", e));
};

/**
 * Play a random victory sound effect
 * @param {number} volume - Volume level (0.0 to 1.0), defaults to 0.6
 */
export const playVictorySound = (volume = 0.6) => {
  if (!areSoundsEnabled()) return;
  // Randomly choose between 8 victory sounds
  const soundNumber = Math.floor(Math.random() * 8) + 1;
  const soundPath = `/sfx/win-${soundNumber}.mp3`;

  const audio = new Audio(soundPath);
  audio.volume = volume;
  audio.play().catch((e) => console.log("Audio play failed:", e));
};

/**
 * Play level up sound effect
 * @param {number} volume - Volume level (0.0 to 1.0), defaults to 0.6
 */
export const playLevelUpSound = (volume = 0.6) => {
  if (!areSoundsEnabled()) return;
  const audio = new Audio("/sfx/level-up-2.mp3");
  audio.volume = volume;
  audio.play().catch((e) => console.log("Audio play failed:", e));
};

/**
 * Play a random defeat sound effect
 * @param {number} volume - Volume level (0.0 to 1.0), defaults to 0.6
 */
export const playDefeatSound = (volume = 0.6) => {
  if (!areSoundsEnabled()) return;
  // Randomly choose between 3 defeat sounds
  const soundNumber = Math.floor(Math.random() * 3) + 1;
  const soundPath = `/sfx/defeat-${soundNumber}.mp3`;

  const audio = new Audio(soundPath);
  audio.volume = volume;
  audio.play().catch((e) => console.log("Audio play failed:", e));
};

/**
 * Play a generic sound effect
 * @param {string} soundPath - Path to the sound file
 * @param {number} volume - Volume level (0.0 to 1.0), defaults to 0.4
 */
export const playSound = (soundPath, volume = 0.4) => {
  if (!areSoundsEnabled()) return;
  const audio = new Audio(soundPath);
  audio.volume = volume;
  audio.play().catch((e) => console.log("Audio play failed:", e));
};

/**
 * Play a sound with fade in effect
 * @param {string} soundPath - Path to the sound file
 * @param {number} volume - Target volume level (0.0 to 1.0), defaults to 0.4
 * @param {number} fadeInDuration - Fade in duration in milliseconds, defaults to 200
 */
export const playSoundWithFadeIn = (
  soundPath,
  volume = 0.4,
  fadeInDuration = 200
) => {
  const audio = new Audio(soundPath);
  audio.volume = 0;

  audio.play().catch((e) => console.log("Audio play failed:", e));

  // Fade in effect
  const fadeInInterval = setInterval(() => {
    if (audio.volume < volume) {
      audio.volume = Math.min(
        audio.volume + volume / (fadeInDuration / 10),
        volume
      );
    } else {
      clearInterval(fadeInInterval);
    }
  }, 10);
};

/**
 * Play a sound with fade out effect
 * @param {string} soundPath - Path to the sound file
 * @param {number} volume - Initial volume level (0.0 to 1.0), defaults to 0.4
 * @param {number} fadeOutDuration - Fade out duration in milliseconds, defaults to 500
 */
export const playSoundWithFadeOut = (
  soundPath,
  volume = 0.4,
  fadeOutDuration = 500
) => {
  const audio = new Audio(soundPath);
  audio.volume = volume;

  audio.play().catch((e) => console.log("Audio play failed:", e));

  // Fade out effect
  const fadeOutInterval = setInterval(() => {
    if (audio.volume > 0) {
      audio.volume = Math.max(
        audio.volume - volume / (fadeOutDuration / 10),
        0
      );
    } else {
      clearInterval(fadeOutInterval);
      audio.pause();
    }
  }, 10);
};
