import React, { useState } from "react";
import "../styles/GameScreen.css";
import StatsPanel from "./StatsPanel";
import CombatScreen from "./CombatScreen";
import Market from "./Market";
import Inventory from "./Inventory";
import Help from "./Help";
import StreetsMenu from "./menus/StreetsMenu";
import { FaBars } from "react-icons/fa";

function GameScreen({ gameState, setGameState, onUpdateCharacter }) {
  const [currentScreen, setCurrentScreen] = useState("streets");
  const [showInventory, setShowInventory] = useState(false);
  const [showMobileStats, setShowMobileStats] = useState(false);

  const handleNavigate = (destination) => {
    setCurrentScreen(destination);
  };

  const handleShowInventory = () => {
    setShowInventory(!showInventory);
  };

  const handleToggleMobileStats = () => {
    setShowMobileStats(!showMobileStats);
  };

  const handleCombatEnd = (result, rewards) => {
    console.log("Combat ended with result:", result, "and rewards:", rewards);
    console.log(
      "Current character credits before update:",
      gameState.character?.credits
    );

    setCurrentScreen("streets");
    if (result === "victory" && rewards) {
      console.log("Processing victory rewards...");
      setGameState((prev) => {
        const updatedCharacter = {
          ...prev.character,
          experience: prev.character.experience + rewards.exp,
        };

        // Use safe credit management
        if (prev.character.gainCredits) {
          const creditResult = prev.character.gainCredits.call(
            updatedCharacter,
            rewards.credits,
            "Combat victory"
          );
          updatedCharacter.credits = creditResult.totalCredits;
        } else {
          // Fallback if gainCredits method doesn't exist
          updatedCharacter.credits = prev.character.credits + rewards.credits;
        }

        console.log("Updated character credits:", updatedCharacter.credits);
        console.log(
          "Updated character experience:",
          updatedCharacter.experience
        );
        return {
          ...prev,
          character: updatedCharacter,
        };
      });
    }
  };

  const handleCharacterUpdate = (updatedCharacter) => {
    // Use the passed onUpdateCharacter function to save to localStorage
    if (onUpdateCharacter) {
      onUpdateCharacter(updatedCharacter);
    }

    setGameState((prev) => ({
      ...prev,
      character: updatedCharacter,
    }));
  };

  const renderLocation = () => {
    switch (currentScreen) {
      case "combat":
        return (
          <CombatScreen
            character={gameState.character}
            onCombatEnd={handleCombatEnd}
            onUpdateCharacter={handleCharacterUpdate}
          />
        );

      case "market":
        return (
          <Market
            character={gameState.character}
            onExit={() => handleNavigate("streets")}
            onUpdateCharacter={handleCharacterUpdate}
            onNavigate={handleNavigate}
          />
        );

      case "inventory":
        return (
          <Inventory
            character={gameState.character}
            onExit={() => handleNavigate("streets")}
            onUpdateCharacter={handleCharacterUpdate}
            onNavigate={handleNavigate}
          />
        );

      case "help":
        return <Help onExit={() => handleNavigate("streets")} />;

      case "streets":
        return (
          <StreetsMenu
            character={gameState.character}
            onNavigate={handleNavigate}
            onShowInventory={handleShowInventory}
            onToggleMobileStats={handleToggleMobileStats}
            showMobileStats={showMobileStats}
          />
        );

      // Chiba City - Black Clinic
      case "black-clinic":
        return (
          <div className="location-screen">
            <div className="location-header">
              <h2>Black Clinic</h2>
            </div>
            <div className="location-description">
              The infamous cluster on Chiba's Ninsei strip, where illegal
              cybernetic surgery thrives (Ratz the bartender sends Case to one)
            </div>
            <div className="options-grid">
              <div className="option-row">
                <span
                  className="menu-item"
                  onClick={() => handleNavigate("ninsei-strip")}
                >
                  Back to Ninsei Strip
                </span>
              </div>
            </div>
          </div>
        );

      // Chiba City - The Chatsubo
      case "chatsubo":
        return (
          <div className="location-screen">
            <div className="location-header">
              <h2>The Chatsubo</h2>
            </div>
            <div className="location-description">
              Inside, the air tastes of soy and cigarettes, screens stutter
              simstim loops behind rows of bottles, and Ratz leans on the bar
              with his Soviet prosthetic ticking. Console cowboys, hustlers, and
              drifters crowd the shadows, swapping chips and stolen decks under
              the throb of broken Eurobeat. Deals are whispered, eyes linger too
              long, and everything feels like it could turn quick.
            </div>
            <div className="location-quote">
              <em>
                "The Chatsubo was a bar for professional expatriates; you could
                drink there for a week and never hear two words in Japanese.
                Ratz was tending bar, his prosthetic arm jerking monotonously as
                he filled a tray of glasses with draft Kirin." ~William Gibson,
                Neuromancer
              </em>
            </div>
            <div className="options-grid">
              <div className="option-row">
                <span
                  className="menu-item"
                  onClick={() => handleNavigate("ninsei-strip")}
                >
                  Back to Ninsei Strip
                </span>
              </div>
            </div>
          </div>
        );

      // Chiba City - Chiba Docks
      case "chiba-docks":
        return (
          <div className="location-screen">
            <div className="location-header">
              <h2>Chiba Docks</h2>
            </div>
            <div className="location-description">
              The Chiba docks burn all night under quartz-halogen floods, cranes
              swinging like steel giants over the bay. Tokyo Bay lies black and
              slick with waste, gulls skimming the surface while hover-tugs
              cough smoke into the rain. Containers shift, heavy with contraband
              biosofts and chrome, bound inland for the clinics. Fixers linger
              in the sodium light, deals whispered in Russian, Japanese, Sprawl
              slang. Every shadow promises work or trouble, and the air tastes
              like oil, salt, and change. This is the edge—where you arrive raw,
              and where the city begins to remake you.
            </div>
            <div className="location-quote">
              <em>
                "The docks... quartz‑halogen floodlights that illuminate the
                docks all night like vast stages. Tokyo Bay lies as a black
                expanse with drifting shoals of waste…"
              </em>
            </div>
            <div className="options-grid">
              <div className="option-row">
                <span
                  className="menu-item"
                  onClick={() => handleNavigate("ninsei-strip")}
                >
                  Back to Ninsei Strip
                </span>
              </div>
            </div>
          </div>
        );

      // Chiba City - Jarre de Thé
      case "jarre-de-the":
        return (
          <div className="location-screen">
            <div className="location-header">
              <h2>Jarre de Thé</h2>
            </div>
            <div className="location-description">
              Two blocks west of the pastel decay of the Chatsubo, the Jarre de
              Thé stands compressed between neon glare and fog. Inside, red‑neon
              frames encase mirrored walls that refract every cigarette glow and
              twitch of motion. The décor: a pale, retro fusion of Japanese
              minimalism and Milanese plastics—everything coated in a film of
              longing. Case orders a double espresso with his cheap Brazilian
              dex, the cup's hiss echoing in the hush. There's a weight to the
              place, like a wound that won't heal, the scent of grounds thick in
              the air. For a moment, you forget the street outside—that constant
              pressure of failing systems and broken deals. The Jarre is where
              time stores its breath, waiting to exhale.
            </div>
            <div className="location-quote">
              <em>
                "The Jarre was walled with mirrors, each panel framed in red
                neon."
              </em>
            </div>
            <div className="options-grid">
              <div className="option-row">
                <span
                  className="menu-item"
                  onClick={() => handleNavigate("ninsei-strip")}
                >
                  Back to Ninsei Strip
                </span>
              </div>
            </div>
          </div>
        );

      // Chiba City - Cheap Hotel
      case "cheap-hotel":
        return (
          <div className="location-screen">
            <div className="location-header">
              <h2>Cheap Hotel</h2>
            </div>
            <div className="location-description">
              The Cheap Hotel slumps over Ninsei, paint flaking, hallways sour
              with mildew and stale smoke. Rooms are coffin-sized, just enough
              space for a bunk and the hum of tired fluorescents. Blinds hang
              crooked, neon bleeding through every crack, turning the walls into
              restless color. Tenants drift like shadows between doors that
              barely latch, the whole place groaning with the weight of lives on
              pause. It isn't safety—just a cheap box to shut your eyes while
              the city keeps breathing outside.
            </div>
            <div className="options-grid">
              <div className="option-row">
                <span
                  className="menu-item"
                  onClick={() => handleNavigate("ninsei-strip")}
                >
                  Back to Ninsei Strip
                </span>
              </div>
            </div>
          </div>
        );

      // Chiba City - Ninsei Streets (Combat Zone)
      case "ninsei-streets":
        return (
          <div className="location-screen">
            <div className="location-header">
              <h2>The Streets - Combat Zone</h2>
            </div>
            <div className="location-description">
              Ninsei Strip hums with rain and neon, smoke from stalls mixing
              with ozone off cheap grids. Signs for clinics stutter promises in
              kanji, while hustlers and drunks drift through the glow. Gangers
              watch from shadowed doorways, knives or chrome ready. Every step
              feels wired—like the street itself is waiting to cut.
            </div>
            <div className="options-grid">
              <div className="option-row">
                <span
                  className="menu-item"
                  onClick={() => handleNavigate("combat")}
                >
                  <span className="key">(F)</span>ight
                </span>
                <span
                  className="menu-item"
                  onClick={() => handleNavigate("ninsei-strip")}
                >
                  Back to Ninsei Strip
                </span>
              </div>
            </div>
          </div>
        );

      // Chiba City - Corporate Black Clinic
      case "corporate-black-clinic":
        return (
          <div className="location-screen">
            <div className="location-header">
              <h2>Black Clinic</h2>
            </div>
            <div className="location-description">
              More slick and polished and expensive than other clinics. The
              corporate version offers premium cybernetic enhancements with
              corporate backing, sterile environments, and top-tier surgeons.
              The prices reflect the quality, but so does the risk—corporate
              clinics have their own agendas.
            </div>
            <div className="options-grid">
              <div className="option-row">
                <span
                  className="menu-item"
                  onClick={() => handleNavigate("corporate-district")}
                >
                  Back to Corporate District
                </span>
              </div>
            </div>
          </div>
        );

      // Chiba City - Mega Corp Towers
      case "mega-corp-towers":
        return (
          <div className="location-screen">
            <div className="location-header">
              <h2>Mega Corp Towers</h2>
            </div>
            <div className="location-description">
              MegaCorp Towers rise like obsidian monoliths, sheer glass
              reflecting neon sprawl below. Floodlit perimeters and drones guard
              their bases, keeping streets away. Inside, climate-sealed
              corridors smell of ozone, silence broken by server hum and
              executive whispers. Lives unfold within—housing, clinics,
              markets—sealed ecosystems owned outright. At night their logos
              blaze like corporate gods, dominion in light. From street level,
              they seem untouchable, as though the very air rejects the city's
              chaos.
            </div>
            <div className="options-grid">
              <div className="option-row">
                <span
                  className="menu-item"
                  onClick={() => handleNavigate("corporate-district")}
                >
                  Back to Corporate District
                </span>
              </div>
            </div>
          </div>
        );

      // Chiba City - Hosaka Facility
      case "hosaka-facility":
        return (
          <div className="location-screen">
            <div className="location-header">
              <h2>Hosaka Corporate Facility</h2>
            </div>
            <div className="location-description">
              Hosaka Headquarters is an engine, a fortress of glass and steel in
              the corporate grid. Security saturates the place—biometric gates,
              drones, men in suits with dead smiles. Inside, offices and data
              vaults pulse with research, deals, and black code. Executives pass
              like packets, insulated and unknowable. Outside, the logo glows
              sterile against dark, a beacon of inevitability. Hosaka doesn't
              just occupy space—it colonizes it, shaping each breath into
              corporate property.
            </div>
            <div className="options-grid">
              <div className="option-row">
                <span
                  className="menu-item"
                  onClick={() => handleNavigate("corporate-district")}
                >
                  Back to Corporate District
                </span>
              </div>
            </div>
          </div>
        );

      // Chiba City - Corporate Streets (Combat Zone)
      case "corporate-streets":
        return (
          <div className="location-screen">
            <div className="location-header">
              <h2>The Streets - Combat Zone</h2>
            </div>
            <div className="location-description">
              Corporate District streets are clean, well-lit, and heavily
              patrolled. Security drones hover overhead, and corporate security
              forces maintain order. The streets here are safer than the sprawl
              below, but crossing the wrong corporate entity can have serious
              consequences.
            </div>
            <div className="options-grid">
              <div className="option-row">
                <span
                  className="menu-item"
                  onClick={() => handleNavigate("combat")}
                >
                  <span className="key">(F)</span>ight
                </span>
                <span
                  className="menu-item"
                  onClick={() => handleNavigate("corporate-district")}
                >
                  Back to Corporate District
                </span>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="location-screen">
            <div className="location-header">
              <h2>Unknown Location</h2>
            </div>
            <div className="location-description">
              This area of Night City hasn't been fully mapped yet. The
              corporate data feeds are corrupted, and local intel is scarce. You
              could be anywhere - a restricted zone, a corporate black site, or
              somewhere that doesn't officially exist. Best to head back to
              familiar territory before you stumble into something you can't
              handle.
            </div>
            <div className="options-grid">
              <div className="option-row">
                <span
                  className="menu-item"
                  onClick={() => handleNavigate("streets")}
                >
                  Back to Streets
                </span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="game-screen">
      <div className="game-layout">
        <div className="main-content">
          {/* Mobile Stats Toggle Button */}
          <div className="stats-toggle">
            <button
              className="stats-button"
              onClick={handleToggleMobileStats}
              title="Toggle Stats Panel"
            >
              <FaBars />
            </button>
          </div>
          {renderLocation()}
        </div>
        <StatsPanel
          character={gameState.character}
          onUpdateCharacter={handleCharacterUpdate}
          showMobileStats={showMobileStats}
          onNavigate={handleNavigate}
          onCloseMobileStats={() => setShowMobileStats(false)}
        />
      </div>
    </div>
  );
}

export default GameScreen;
