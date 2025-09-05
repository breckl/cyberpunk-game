import React, { createContext, useContext, useState, useEffect } from "react";

const SoundContext = createContext();

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};

export const SoundProvider = ({ children }) => {
  const [soundsEnabled, setSoundsEnabled] = useState(() => {
    // Check localStorage for saved sound preference
    const saved = localStorage.getItem("cyberpunk_sounds_enabled");
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Save sound preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(
      "cyberpunk_sounds_enabled",
      JSON.stringify(soundsEnabled)
    );
  }, [soundsEnabled]);

  const toggleSounds = () => {
    setSoundsEnabled((prev) => !prev);
  };

  const value = {
    soundsEnabled,
    toggleSounds,
  };

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
};
