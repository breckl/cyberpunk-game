import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

function Help({ onExit }) {
  const [activeTopic, setActiveTopic] = useState("getting-started");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const helpTopics = [
    { key: "getting-started", label: "Getting Started" },
    { key: "combat", label: "Combat System" },
    { key: "inventory", label: "Inventory & Equipment" },
    { key: "market", label: "Market & Trading" },
    { key: "travel", label: "Travel & Locations" },
    { key: "character", label: "Character Progression" },
    { key: "controls", label: "Controls & Navigation" },
  ];

  const helpContent = {
    "getting-started": {
      title: "Getting Started",
      content: (
        <div>
          <p>
            Welcome to Cyberpunk Text Adventure! You're a street operative in
            Night City, navigating the neon-lit streets and corporate intrigue.
          </p>

          <h3>Your Journey Begins</h3>
          <p>
            Start by exploring the Night City Streets. You'll find various
            locations to visit, each offering different opportunities and
            challenges.
          </p>

          <h3>Basic Goals</h3>
          <ul>
            <li>Gain experience through combat and missions</li>
            <li>Earn credits to buy better equipment</li>
            <li>Level up your character to access new areas</li>
            <li>Survive the dangerous streets of Night City</li>
          </ul>

          <h3>Starting Out</h3>
          <p>
            Begin by visiting the Market to see what equipment is available,
            then try some combat to earn your first credits and experience.
          </p>
        </div>
      ),
    },
    combat: {
      title: "Combat System",
      content: (
        <div>
          <p>
            Combat is turn-based and relies on your character's stats and
            equipment. Understanding the mechanics will help you survive the
            dangerous streets of Night City.
          </p>

          <h3>Combat Actions</h3>
          <ul>
            <li>
              <strong>Attack (A key or click):</strong> Deal damage to your
              enemy
            </li>
            <li>
              <strong>Run (R key or click):</strong> Attempt to escape combat
            </li>
          </ul>

          <h3>How Attack & Damage Works</h3>
          <p>
            Your attack power comes from two sources: your character's base
            attack (determined by level) and your equipped weapon's damage
            bonus.
          </p>
          <p>
            <strong>Attack Formula:</strong> Total Attack = Base Attack (from
            level) + Weapon Damage Bonus
          </p>
          <p>
            <strong>Damage Range:</strong> Final Damage = Total Attack ± 2
            (random variance)
          </p>

          <h3>How Armor & Defense Works</h3>
          <p>
            Armor reduces incoming damage by a percentage. Your total defense
            comes from your character's base defense (from level) plus your
            equipped armor's defense rating.
          </p>
          <p>
            <strong>Defense Formula:</strong> Total Defense = Base Defense (from
            level) + Armor Defense Rating
          </p>
          <p>
            <strong>Damage Reduction:</strong> Final Damage = Raw Damage × (100
            - Total Defense) ÷ 100
          </p>
          <p>
            <em>
              Example: If you have 20% total defense and take 10 raw damage,
              you'll only take 8 damage (10 × 0.8 = 8).
            </em>
          </p>

          <h3>Health Points (HP)</h3>
          <p>
            Your HP is determined by your character level. When your HP reaches
            0, you're defeated and lose credits. Your HP is displayed as a bar
            and shows current/maximum values.
          </p>

          <h3>Combat Rewards</h3>
          <ul>
            <li>
              <strong>Victory:</strong> Gain credits and experience
            </li>
            <li>
              <strong>Defeat:</strong> Lose credits as a penalty
            </li>
            <li>
              <strong>Escape:</strong> May lose some credits depending on combat
              rounds
            </li>
          </ul>

          <h3>Combat Tips</h3>
          <ul>
            <li>Better weapons increase your damage output</li>
            <li>Better armor reduces incoming damage significantly</li>
            <li>
              Higher level enemies are more dangerous but give better rewards
            </li>
            <li>You can run from combat before it starts without penalty</li>
            <li>Balance offense and defense for optimal survivability</li>
          </ul>
        </div>
      ),
    },
    inventory: {
      title: "Inventory & Equipment",
      content: (
        <div>
          <p>
            Manage your gear and equipment to improve your character's
            capabilities.
          </p>

          <h3>Equipment Types</h3>
          <ul>
            <li>
              <strong>Weapons:</strong> Increase your attack damage
            </li>
            <li>
              <strong>Armor:</strong> Reduce incoming damage
            </li>
            <li>
              <strong>Cybernetics:</strong> Provide various bonuses and
              abilities
            </li>
          </ul>

          <h3>Equipping Items</h3>
          <p>
            Visit your Inventory to equip weapons and armor. Only one weapon and
            one armor piece can be equipped at a time.
          </p>

          <h3>Item Rarity</h3>
          <p>
            Items come in different quality levels that affect their stats and
            prices. Higher quality items provide better bonuses.
          </p>

          <h3>Inventory Management</h3>
          <ul>
            <li>Items you're not using remain in your inventory</li>
            <li>You can sell unwanted items at the Market</li>
            <li>Some items may have special properties or requirements</li>
          </ul>
        </div>
      ),
    },
    market: {
      title: "Market & Trading",
      content: (
        <div>
          <p>
            The Market is where you buy and sell equipment to improve your
            character.
          </p>

          <h3>Buying Items</h3>
          <ul>
            <li>Browse available weapons, armor, and cybernetics</li>
            <li>Check item stats and prices before purchasing</li>
            <li>Make sure you have enough credits</li>
          </ul>

          <h3>Selling Items</h3>
          <p>
            You can sell items from your inventory to get credits back. Items
            typically sell for less than their purchase price.
          </p>

          <h3>Market Tips</h3>
          <ul>
            <li>Compare item stats before buying</li>
            <li>Save credits for significant upgrades</li>
            <li>Consider selling old equipment when upgrading</li>
            <li>Some items may be rare or limited availability</li>
          </ul>

          <h3>Credit Management</h3>
          <p>
            Credits are earned through combat victories and can be lost through
            defeats. Manage your finances carefully!
          </p>
        </div>
      ),
    },
    travel: {
      title: "Travel & Locations",
      content: (
        <div>
          <p>
            The travel system in this game is currently designed as a love
            letter to William Gibson's Sprawl trilogy novels (Neuromancer, Count
            Zero, and Mona Lisa Overdrive). At the moment, travel is primarily
            for exploring the rich cyberpunk world that Gibson created.
          </p>

          <h3>About the Sprawl</h3>
          <p>
            The locations you can visit are inspired by Gibson's vision of a
            future where technology and humanity have merged in complex ways.
            From the neon-lit streets of Night City to the corporate towers of
            Chiba City, each area reflects the themes and atmosphere of the
            original novels.
          </p>

          <h3>Current Travel Features</h3>
          <p>
            While travel is currently focused on world exploration and
            atmospheric storytelling, you can still find combat opportunities
            and basic services in various districts. The main gameplay loop
            (combat, equipment, progression) is centered around the Night City
            Streets area.
          </p>

          <h3>Future Development</h3>
          <p>
            Travel may be expanded in future updates to include more gameplay
            mechanics, but for now, it serves as an immersive way to experience
            the cyberpunk world that inspired this text adventure.
          </p>
        </div>
      ),
    },
    character: {
      title: "Character Progression",
      content: (
        <div>
          <p>
            Your character grows stronger through experience and better
            equipment.
          </p>

          <h3>Experience & Levels</h3>
          <ul>
            <li>Gain experience through combat victories</li>
            <li>Level up to increase your base stats</li>
            <li>Higher levels unlock access to better equipment and areas</li>
          </ul>

          <h3>Character Stats</h3>
          <ul>
            <li>
              <strong>HP:</strong> Your health points - when they reach 0,
              you're defeated
            </li>
            <li>
              <strong>Attack:</strong> Base damage you deal in combat
            </li>
            <li>
              <strong>Defense:</strong> Reduces incoming damage
            </li>
            <li>
              <strong>Level:</strong> Determines your base stats and available
              content
            </li>
          </ul>

          <h3>Progression Tips</h3>
          <ul>
            <li>Focus on combat to gain experience quickly</li>
            <li>Invest in better equipment as you level up</li>
            <li>Balance offense and defense for optimal survivability</li>
            <li>Higher levels open up more dangerous but rewarding areas</li>
          </ul>
        </div>
      ),
    },
    controls: {
      title: "Controls & Navigation",
      content: (
        <div>
          <p>
            Learn how to navigate the game interface and use keyboard shortcuts.
          </p>

          <h3>Keyboard Shortcuts</h3>
          <ul>
            <li>
              <strong>Esc:</strong> Open global menu for quick access to main
              features
            </li>
            <li>
              <strong>A:</strong> Attack in combat
            </li>
            <li>
              <strong>R:</strong> Run from combat
            </li>
            <li>
              <strong>N:</strong> Next fight (after combat ends)
            </li>
            <li>
              <strong>L:</strong> Leave combat area
            </li>
            <li>
              <strong>Enter:</strong> Confirm selections and continue
            </li>
          </ul>

          <h3>Mouse Controls</h3>
          <ul>
            <li>Click on menu items to navigate</li>
            <li>Click on combat buttons to perform actions</li>
            <li>Click on inventory items to equip/use them</li>
            <li>Click on market items to buy them</li>
          </ul>

          <h3>Navigation Tips</h3>
          <ul>
            <li>Use the global menu (Esc) for quick access to key features</li>
            <li>Most actions can be performed with either keyboard or mouse</li>
            <li>Pay attention to highlighted keys in menus for shortcuts</li>
            <li>Use the back buttons to return to previous screens</li>
          </ul>
        </div>
      ),
    },
  };

  const handleTopicSelect = (topicKey) => {
    setActiveTopic(topicKey);
    setIsDropdownOpen(false);
  };

  const currentTopic = helpTopics.find((topic) => topic.key === activeTopic);

  return (
    <div className="location-screen">
      {/* Mobile Back Button Row */}
      <div className="mobile-back-row">
        <button className="mobile-back-button" onClick={onExit}>
          <FaArrowLeft />
          Back
        </button>
      </div>

      <div className="location-header">
        <h2>Help & Instructions</h2>
        <div className="header-buttons">
          <span className="back-button desktop-only" onClick={onExit}>
            <span className="key">B</span>ack
          </span>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className="help-mobile-dropdown">
        <button
          className="help-dropdown-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{currentTopic?.label || "Select Topic"}</span>
          <span className="dropdown-arrow">{isDropdownOpen ? "▲" : "▼"}</span>
        </button>

        {isDropdownOpen && (
          <div className="help-dropdown-menu">
            {helpTopics.map((topic) => (
              <button
                key={topic.key}
                className={`help-dropdown-item ${
                  activeTopic === topic.key ? "active" : ""
                }`}
                onClick={() => handleTopicSelect(topic.key)}
              >
                {topic.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="help-layout">
        <div className="help-sidebar desktop-only">
          <div className="help-topics">
            {helpTopics.map((topic) => (
              <div key={topic.key} className="help-topic">
                <span
                  className={`help-topic-item ${
                    activeTopic === topic.key ? "active" : ""
                  }`}
                  onClick={() => setActiveTopic(topic.key)}
                >
                  {topic.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="help-content">
          <div className="help-topic-content">
            <h3>{helpContent[activeTopic].title}</h3>
            <div className="help-text">{helpContent[activeTopic].content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
