const STORAGE_KEY = "cyberpunk_character";

export const saveCharacter = (character) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
    return true;
  } catch (error) {
    console.error("Failed to save character to localStorage:", error);
    return false;
  }
};

export const loadCharacter = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  } catch (error) {
    console.error("Failed to load character from localStorage:", error);
    return null;
  }
};

export const clearCharacter = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Failed to clear character from localStorage:", error);
    return false;
  }
};

// Welcome dialog tracking
const WELCOME_SHOWN_KEY = "cyberpunk_welcome_shown";

export const hasSeenWelcome = () => {
  try {
    return localStorage.getItem(WELCOME_SHOWN_KEY) === "true";
  } catch (error) {
    console.error("Failed to check welcome status:", error);
    return false;
  }
};

export const markWelcomeAsSeen = () => {
  try {
    localStorage.setItem(WELCOME_SHOWN_KEY, "true");
    return true;
  } catch (error) {
    console.error("Failed to mark welcome as seen:", error);
    return false;
  }
};

export const hasSavedCharacter = () => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};
