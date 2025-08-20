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

export const hasSavedCharacter = () => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};
