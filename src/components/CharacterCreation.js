import React, { useState, useCallback } from "react";
import "../styles/CharacterCreation.css";

function CharacterCreation({ onCreateCharacter }) {
  const [name, setName] = useState("");

  // Handle name input
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle character creation
  const handleCreateCharacter = useCallback(() => {
    if (name.trim()) {
      const character = {
        name: name.trim(),
        class: "Street Samurai", // Default class
        level: 1,
        experience: 0,
        credits: 50,
        inventory: [],
      };
      onCreateCharacter(character);
    }
  }, [name, onCreateCharacter]);

  // Check if form is valid
  const isFormValid = name.trim().length > 0;

  return (
    <div className="character-creation">
      <div className="creation-screen">
        <h2>ENTER YOUR NAME</h2>

        {/* Name Input */}
        <div className="name-selection">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Type your name..."
            maxLength={20}
            className="name-input"
          />
        </div>

        {/* Character Summary */}
        {name.trim() && (
          <div className="character-summary">
            <h3>Character Summary</h3>
            <div className="summary-info">
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Level:</strong> 1
              </p>
              <p>
                <strong>Starting Credits:</strong> $50
              </p>
            </div>
          </div>
        )}

        {/* Create Character Button */}
        <div className="create-button-container">
          <button
            className={`create-character-btn ${
              isFormValid ? "enabled" : "disabled"
            }`}
            onClick={handleCreateCharacter}
            disabled={!isFormValid}
          >
            Create Character
          </button>
        </div>
      </div>
    </div>
  );
}

export default CharacterCreation;
