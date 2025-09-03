import React, { useState, useEffect } from "react";
import "./styles/App.css";
import MainMenu from "./components/MainMenu";
import GameScreen from "./components/GameScreen";
import { saveCharacter, loadCharacter } from "./utils/localStorage";

function App() {
  const [gameState, setGameState] = useState({
    screen: "main-menu", // main-menu, game
    character: null,
    location: "streets",
    gameLog: [],
  });

  // Load character from localStorage on app start
  useEffect(() => {
    const savedCharacter = loadCharacter();
    if (savedCharacter) {
      setGameState((prev) => ({
        ...prev,
        character: savedCharacter,
        screen: "game",
        gameLog: [`Welcome back to Night City. Your journey continues...`],
      }));
    }
  }, []);

  const handleStartGame = () => {
    // Create default character without class/name selection
    const defaultCharacter = {
      level: 1,
      experience: 0,
      credits: 25,
      inventory: [],
    };

    // Save character to localStorage
    saveCharacter(defaultCharacter);

    setGameState((prev) => ({
      ...prev,
      screen: "game",
      character: defaultCharacter,
      gameLog: [`Welcome to Night City. Your journey begins...`],
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
      case "main-menu":
        return <MainMenu onStartGame={handleStartGame} />;
      case "game":
        return (
          <GameScreen
            gameState={gameState}
            setGameState={setGameState}
            onUpdateCharacter={handleUpdateCharacter}
          />
        );
      default:
        return <MainMenu onStartGame={handleStartGame} />;
    }
  };

  return <div className="App">{renderScreen()}</div>;
}

export default App;
