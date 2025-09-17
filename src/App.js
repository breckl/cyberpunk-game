import React, { useState, useEffect } from "react";
import "./styles/App.css";
import RegistrationScreen from "./components/RegistrationScreen";
import MainMenu from "./components/MainMenu";
import CharacterCreation from "./components/CharacterCreation";
import GameScreen from "./components/GameScreen";
import { saveCharacter, loadCharacter } from "./utils/localStorage";
import { SoundProvider } from "./contexts/SoundContext";

function App() {
  const [gameState, setGameState] = useState({
    screen: "registration", // registration, main-menu, character-creation, game
    character: null,
    location: "streets",
    gameLog: [],
  });

  // Check registration status and load character on app start
  useEffect(() => {
    const isRegistered = localStorage.getItem("cyberpunk_registered");
    const savedCharacter = loadCharacter();

    if (isRegistered) {
      if (savedCharacter) {
        // Ensure character has all required fields with proper defaults
        const validatedCharacter = {
          name: savedCharacter.name || "Unknown",
          class: savedCharacter.class || "Street Samurai",
          level:
            typeof savedCharacter.level === "number" ? savedCharacter.level : 1,
          experience:
            typeof savedCharacter.experience === "number"
              ? savedCharacter.experience
              : 0,
          credits:
            typeof savedCharacter.credits === "number"
              ? savedCharacter.credits
              : 50,
          inventory: Array.isArray(savedCharacter.inventory)
            ? savedCharacter.inventory
            : [],
          ...savedCharacter, // Keep any other properties
        };

        setGameState((prev) => ({
          ...prev,
          character: validatedCharacter,
          screen: "game",
          gameLog: [`Welcome back to Night City. Your journey continues...`],
        }));
      } else {
        setGameState((prev) => ({
          ...prev,
          screen: "main-menu",
        }));
      }
    } else {
      setGameState((prev) => ({
        ...prev,
        screen: "registration",
      }));
    }
  }, []);

  const handleRegistrationComplete = () => {
    setGameState((prev) => ({
      ...prev,
      screen: "main-menu",
    }));
  };

  const handleStartGame = () => {
    setGameState((prev) => ({
      ...prev,
      screen: "character-creation",
    }));
  };

  const handleCreateCharacter = (character) => {
    // Save character to localStorage
    saveCharacter(character);

    setGameState((prev) => ({
      ...prev,
      screen: "game",
      character: character,
      gameLog: [
        `Welcome to Night City, ${character.name}. Your journey begins...`,
      ],
    }));
  };

  const handleUpdateCharacter = (updatedCharacter) => {
    // Save updated character to localStorage
    saveCharacter(updatedCharacter);

    setGameState((prev) => ({
      ...prev,
      character: updatedCharacter,
    }));
  };

  const renderScreen = () => {
    switch (gameState.screen) {
      case "registration":
        return (
          <RegistrationScreen
            onRegistrationComplete={handleRegistrationComplete}
          />
        );
      case "main-menu":
        return <MainMenu onStartGame={handleStartGame} />;
      case "character-creation":
        return <CharacterCreation onCreateCharacter={handleCreateCharacter} />;
      case "game":
        return (
          <GameScreen
            gameState={gameState}
            setGameState={setGameState}
            onUpdateCharacter={handleUpdateCharacter}
          />
        );
      default:
        return (
          <RegistrationScreen
            onRegistrationComplete={handleRegistrationComplete}
          />
        );
    }
  };

  return (
    <SoundProvider>
      <div className="App">{renderScreen()}</div>
    </SoundProvider>
  );
}

export default App;
