import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

function Help({ onExit }) {
  const [activeTopic, setActiveTopic] = useState("getting-started");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Helper function to clear localStorage and reset character
  const resetPlayerData = () => {
    if (
      window.confirm("This will clear all saved player data. Are you sure?")
    ) {
      // Clear the main character data
      localStorage.removeItem("cyberpunk_character");

      // Also clear any other potential old data keys
      const keysToRemove = [
        "cyberpunk_character",
        "cyberpunk_save",
        "character_data",
        "game_state",
        "cyberpunk_welcome_shown", // Reset welcome dialog
      ];

      keysToRemove.forEach((key) => {
        if (localStorage.getItem(key)) {
          localStorage.removeItem(key);
        }
      });

      alert("Player data cleared! The game will now reload.");
      window.location.reload();
    }
  };

  const helpTopics = [
    { key: "getting-started", label: "Getting Started" },
    { key: "combat", label: "Combat System" },
    { key: "inventory", label: "Inventory & Equipment" },
    { key: "market", label: "Black Market" },
    { key: "character", label: "Character Progression" },
    { key: "support", label: "Support & Feedback" },
  ];

  const helpContent = {
    "getting-started": {
      title: "Getting Started",
      content: (
        <div>
          <p>
            Night City: the world of William Gibson's Sprawl Trilogy where
            you'll navigate the neon-lit streets of corporate intrigue and where
            only the strong survive.
          </p>

          <h3>Your Journey Begins</h3>
          <p>
            Start by exploring the Black Market and then venture into the Combat
            Zone. If you put in the work, you'll level, can upgrade your gear
            and meet various characters from Neuromancer, Count Zero, and Mona
            Lisa Overdrive.
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
            Begin by visiting the Black Market to see what equipment is
            available, then try some combat to earn your first credits and
            experience.
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
              <strong>Attack:</strong> Deal damage to your enemy
            </li>
            <li>
              <strong>Run:</strong> Attempt to escape combat (costs credits)
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
          <p>
            <em>
              Example: Level 3 character with +2 damage weapon = 5 total attack,
              dealing 3-7 damage per hit.
            </em>
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

          <h3>Fleeing from Combat</h3>
          <p>
            You can run from combat at any time, but it costs credits. The
            penalty depends on:
          </p>
          <ul>
            <li>
              <strong>Your level:</strong> Higher level = higher base penalty
            </li>
            <li>
              <strong>Combat duration:</strong> Longer fights = higher penalty
            </li>
            <li>
              <strong>Enemy level:</strong> Fighting higher level enemies =
              lower penalty
            </li>
          </ul>
          <p>
            <strong>Flee Penalty Examples:</strong>
          </p>
          <ul>
            <li>Level 1: ~$10-15 penalty</li>
            <li>Level 3: ~$25-35 penalty</li>
            <li>Level 5: ~$40-55 penalty</li>
          </ul>
          <p>
            <em>
              Tip: Fleeing early in combat costs less than fleeing after a long
              fight.
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
              <strong>Victory:</strong> Gain credits and experience based on
              enemy level
            </li>
            <li>
              <strong>Defeat:</strong> Lose credits as a penalty (10-50% of your
              credits)
            </li>
            <li>
              <strong>Escape:</strong> Lose credits based on combat duration and
              your level
            </li>
          </ul>

          <h3>Combat Tips</h3>
          <ul>
            <li>Better weapons increase your damage output significantly</li>
            <li>Better armor reduces incoming damage by percentage</li>
            <li>
              Higher level enemies are more dangerous but give better rewards
            </li>
            <li>
              You can run from combat before it starts for minimal penalty
            </li>
            <li>Balance offense and defense for optimal survivability</li>
            <li>
              Consider fleeing if you're low on HP rather than risking defeat
            </li>
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
          </ul>

          <h3>Equipping Items</h3>
          <p>
            Visit your Inventory to equip weapons and armor. Only one weapon and
            one armor piece can be equipped at a time.
          </p>

          <h3>Item Quality</h3>
          <p>
            Items come in different quality levels that affect their stats and
            prices. Higher quality items provide better bonuses.
          </p>

          <h3>Inventory Management</h3>
          <ul>
            <li>Items you're not using remain in your inventory</li>
            <li>You can sell unwanted items at the Black Market</li>
            <li>Some items may have special properties or requirements</li>
          </ul>
        </div>
      ),
    },
    market: {
      title: "Black Market",
      content: (
        <div>
          <p>
            The Black Market is where you buy and sell equipment to improve your
            character.
          </p>

          <h3>Buying Items</h3>
          <ul>
            <li>Browse available weapons and armor</li>
            <li>Check item stats and prices before purchasing</li>
            <li>Make sure you have enough credits</li>
            <li>Items have level requirements - check before buying</li>
          </ul>

          <h3>Selling Items</h3>
          <p>
            You can sell items from your inventory to get credits back. Items
            sell for 10% of their purchase price.
          </p>

          <h3>Item Categories</h3>
          <ul>
            <li>
              <strong>Weapons:</strong> Increase your attack damage
            </li>
            <li>
              <strong>Armor:</strong> Reduce incoming damage by percentage
            </li>
          </ul>

          <h3>Market Tips</h3>
          <ul>
            <li>Compare item stats before buying</li>
            <li>Save credits for significant upgrades</li>
            <li>Consider selling old equipment when upgrading</li>
            <li>
              Higher level items are more expensive but much more effective
            </li>
            <li>
              Check your level before buying - you can't use items above your
              level
            </li>
          </ul>

          <h3>Credit Management</h3>
          <p>
            Credits are earned through combat victories and can be lost through
            defeats or fleeing. Manage your finances carefully!
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
            equipment. Understanding how stats work is crucial for success.
          </p>

          <h3>Experience & Levels</h3>
          <ul>
            <li>Gain experience through combat victories</li>
            <li>Level up to increase your base stats</li>
            <li>Higher levels unlock access to better equipment</li>
            <li>Each level requires more experience than the last</li>
          </ul>

          <h3>Character Stats Explained</h3>
          <ul>
            <li>
              <strong>HP:</strong> Your health points - when they reach 0,
              you're defeated and lose credits
            </li>
            <li>
              <strong>Attack:</strong> Base damage you deal in combat (increases
              with level)
            </li>
            <li>
              <strong>Defense:</strong> Reduces incoming damage by percentage
              (increases with level)
            </li>
            <li>
              <strong>Level:</strong> Determines your base stats and equipment
              requirements
            </li>
          </ul>

          <h3>How Stats Scale with Level</h3>
          <p>Your base stats increase significantly with each level:</p>
          <ul>
            <li>
              <strong>HP:</strong> Increases by ~15-20 points per level
            </li>
            <li>
              <strong>Attack:</strong> Increases by ~1-2 points per level
            </li>
            <li>
              <strong>Defense:</strong> Increases by ~1-2% per level
            </li>
          </ul>

          <h3>Equipment vs Level Stats</h3>
          <p>Equipment provides bonuses on top of your base stats:</p>
          <ul>
            <li>
              <strong>Weapons:</strong> Add damage to your base attack
            </li>
            <li>
              <strong>Armor:</strong> Add defense percentage to your base
              defense
            </li>
            <li>
              <strong>Higher level equipment:</strong> Provides much larger
              bonuses
            </li>
          </ul>

          <h3>Progression Tips</h3>
          <ul>
            <li>Focus on combat to gain experience quickly</li>
            <li>Invest in better equipment as you level up</li>
            <li>Balance offense and defense for optimal survivability</li>
            <li>Higher level equipment is exponentially more effective</li>
            <li>Don't waste credits on equipment you'll outlevel quickly</li>
          </ul>
        </div>
      ),
    },
    support: {
      title: "Support & Feedback",
      content: (
        <div>
          <p>
            Need help with the game or have feedback to share? We'd love to hear
            from you!
          </p>

          <h3>Contact Support</h3>
          <p>
            For technical issues, bug reports, suggestions, or general feedback,
            please reach out to us at:
          </p>

          <div className="support-contact">
            <a
              href="mailto:countingsheepmusic@gmail.com"
              className="support-email-link"
            >
              countingsheepmusic@gmail.com
            </a>
          </div>

          <h3>What to Include</h3>
          <p>When contacting support, please include:</p>
          <ul>
            <li>Description of the issue or feedback</li>
            <li>Your character level and current progress</li>
            <li>Steps to reproduce any bugs (if applicable)</li>
            <li>Browser and device information (if relevant)</li>
          </ul>

          <h3>Response Time</h3>
          <p>
            We typically respond to support requests within 24-48 hours. Thank
            you for helping us improve the game!
          </p>

          <h3>Reset Player Data</h3>
          <p>
            If you're experiencing persistent issues or want to start fresh, you
            can reset all your saved player data below.
          </p>

          <div className="reset-section">
            <button
              className="reset-player-data-button"
              onClick={resetPlayerData}
              title="Clear all saved player data and restart the game"
            >
              Reset Player Data
            </button>
            <p className="reset-warning">
              ⚠️ This will permanently delete all your progress, credits, and
              character data.
            </p>
          </div>
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
    <div className="page-container">
      {/* Back Button Row */}
      <div className="back-button-row">
        <button className="back-button" onClick={onExit}>
          <FaArrowLeft />
          Back
        </button>
      </div>

      <div className="header-bar">
        <h2>Help & Instructions</h2>
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

      {/* Content Area with Scrolling */}
      <div className="content-area help-content">
        <div className="help-topic-content">
          <h3>{helpContent[activeTopic].title}</h3>
          <div className="help-text">{helpContent[activeTopic].content}</div>
        </div>
      </div>
    </div>
  );
}

export default Help;
