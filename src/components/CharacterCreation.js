import React, { useState, useEffect, useCallback } from "react";
import "../styles/CharacterCreation.css";
import { getLevelInfo } from "../data/levels.js";

const classes = {
  N: {
    key: "N",
    name: "Netrunner",
    description:
      "Elite hackers who specialize in breaching security systems and manipulating the digital world.",
  },
  S: {
    key: "S",
    name: "Street Samurai",
    description:
      "Cybernetically enhanced warriors who excel in combat and intimidation.",
  },
  T: {
    key: "T",
    name: "Tech Doctor",
    description:
      "Underground medical experts combining traditional medicine with cutting-edge technology.",
  },
  C: {
    key: "C",
    name: "Corporate Agent",
    description:
      "Ex-corporate operatives skilled in manipulation, stealth, and high-tech gadgets.",
  },
};

function CharacterCreation({ onCreateCharacter }) {
  const [step, setStep] = useState("class"); // class, name, confirm
  const [selectedClass, setSelectedClass] = useState(null);
  const [name, setName] = useState("");

  // Handle class selection via clicks
  const handleClassSelect = (classInfo) => {
    setSelectedClass(classInfo);
    setStep("name");
  };

  // Handle confirmation via clicks
  const handleConfirm = useCallback(() => {
    const character = {
      name: name.trim(),
      class: selectedClass.name,
      level: 1,
      experience: 0,
      credits: 25,
      inventory: [],
    };
    onCreateCharacter(character);
  }, [name, selectedClass, onCreateCharacter]);

  const handleStartOver = () => {
    setStep("class");
    setSelectedClass(null);
    setName("");
  };

  // Simple keyboard handling for name input and confirmation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (step === "confirm") {
        const key = e.key.toUpperCase();
        if (key === "Y") {
          handleConfirm();
        } else if (key === "N") {
          handleStartOver();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, handleConfirm]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setStep("confirm");
    }
  };

  const renderClassSelection = () => (
    <div className="creation-screen">
      <div className="screen-header">
        <h2>Choose Your Class</h2>
      </div>

      <div className="screen-description">
        Select your specialization in Night City. Each class offers unique
        advantages and challenges.
      </div>

      <div className="options-grid">
        {Object.values(classes).map((classInfo) => (
          <div
            key={classInfo.key}
            className="menu-item clickable"
            onClick={() => handleClassSelect(classInfo)}
          >
            {classInfo.name}
          </div>
        ))}
      </div>
    </div>
  );

  const renderNameSelection = () => (
    <div className="creation-screen">
      <div className="screen-header">
        <h2>Choose Your Name</h2>
      </div>

      <div className="screen-description">
        Selected Class: {selectedClass.name}
        <br />
        {selectedClass.description}
      </div>

      <form onSubmit={handleNameSubmit} className="name-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your name..."
          maxLength={20}
          autoFocus
        />
        <button type="submit">Confirm</button>
      </form>
    </div>
  );

  const renderConfirmation = () => {
    const getBaseStats = () => {
      const level1Stats = getLevelInfo(1);
      return `Attack ${level1Stats.attack}, Defense ${level1Stats.defense}, Hacking ${level1Stats.hacking}`;
    };

    return (
      <div className="creation-screen">
        <div className="screen-header">
          <h2>Confirm Character</h2>
        </div>

        <div className="character-summary">
          <div className="summary-row">
            <span className="label">Name: </span>
            <span className="value">{name}</span>
          </div>
          <div className="summary-row">
            <span className="label">Class: </span>
            <span className="value">{selectedClass.name}</span>
          </div>
          <div className="starting-info">
            <p>Starting Level: 1</p>
            <p>Starting Credits: $25</p>
            <p>Base Stats: {getBaseStats()}</p>
          </div>
        </div>

        <div className="options-grid">
          <div className="menu-item option-row" onClick={handleConfirm}>
            Confirm Character
          </div>
          <div className="menu-item clickable" onClick={handleStartOver}>
            Start Over
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="character-creation">
      {step === "class" && renderClassSelection()}
      {step === "name" && renderNameSelection()}
      {step === "confirm" && renderConfirmation()}
    </div>
  );
}

export default CharacterCreation;
