import React, { useState, useEffect } from "react";
import "../styles/Inventory.css";

function Inventory({ character, onUpdateCharacter, onExit, onNavigate }) {
  const [localCharacter, setLocalCharacter] = useState(character);
  const [selectedTab, setSelectedTab] = useState("all");

  // Update local character when prop changes
  useEffect(() => {
    setLocalCharacter(character);
  }, [character]);

  // Simple keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();

      if (key === "B") {
        onExit();
      } else if (key === "M") {
        onNavigate("market");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onExit, onNavigate]);

  const formatCredits = (amount) => {
    return new Intl.NumberFormat().format(amount);
  };

  const handleSell = (item) => {
    const sellPrice = Math.floor(item.price * 0.4);
    const updatedInventory = localCharacter.inventory.filter(
      (invItem) => invItem.id !== item.id
    );

    const updatedCharacter = {
      ...localCharacter,
      credits: localCharacter.credits + sellPrice,
      inventory: updatedInventory,
    };

    onUpdateCharacter(updatedCharacter);
  };

  const handleEquip = (item) => {
    let updatedInventory = [...localCharacter.inventory];

    if (item.equipped) {
      // Unequip the item
      updatedInventory = updatedInventory.map((invItem) => {
        if (invItem.id === item.id) {
          return { ...invItem, equipped: false };
        }
        return invItem;
      });
    } else {
      // Unequip any items of the same type and equip this one
      updatedInventory = updatedInventory.map((invItem) => {
        if (invItem.type === item.type && invItem.id !== item.id) {
          return { ...invItem, equipped: false };
        }
        if (invItem.id === item.id) {
          return { ...invItem, equipped: true };
        }
        return invItem;
      });
    }

    const updatedCharacter = {
      ...localCharacter,
      inventory: updatedInventory,
    };

    onUpdateCharacter(updatedCharacter);
    setLocalCharacter(updatedCharacter);
  };

  const playClickSound = () => {
    const audio = new Audio("/sfx/mouse-click.mp3");
    audio.volume = 0.4;
    audio.play().catch((e) => console.log("Audio play failed:", e));
  };

  const handleTabClick = (category) => {
    setSelectedTab(category);
    playClickSound();
  };

  const renderTabs = () => {
    const categories = ["all", "weapon", "armor", "cyberware", "netgear"];

    return (
      <div className="inventory-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`tab-button ${selectedTab === category ? "active" : ""}`}
            onClick={() => handleTabClick(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    );
  };

  const renderEquippedItems = () => {
    const equipped = {
      weapon: localCharacter.inventory.find(
        (item) => item.type === "weapon" && item.equipped
      ),
      armor: localCharacter.inventory.find(
        (item) => item.type === "armor" && item.equipped
      ),
      cyberware: localCharacter.inventory.find(
        (item) => item.type === "cyberware" && item.equipped
      ),
      netgear: localCharacter.inventory.find(
        (item) => item.type === "netgear" && item.equipped
      ),
    };

    return (
      <div className="equipped-items">
        <h3>Equipped Items</h3>

        <div className="equipped-grid">
          <div className="equipped-slot">
            <span className="slot-label">Weapon:</span>
            <span className="slot-item">{equipped.weapon?.name || "None"}</span>
          </div>
          <div className="equipped-slot">
            <span className="slot-label">Armor:</span>
            <span className="slot-item">{equipped.armor?.name || "None"}</span>
          </div>
          <div className="equipped-slot">
            <span className="slot-label">Cyberware:</span>
            <span className="slot-item">
              {equipped.cyberware?.name || "None"}
            </span>
          </div>
          <div className="equipped-slot">
            <span className="slot-label">Netgear:</span>
            <span className="slot-item">
              {equipped.netgear?.name || "None"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderInventoryByType = () => {
    let filteredInventory = localCharacter.inventory;

    if (selectedTab !== "all") {
      filteredInventory = localCharacter.inventory.filter(
        (item) => item.type === selectedTab
      );
    }

    if (filteredInventory.length === 0) {
      return <div className="empty-inventory">No items in this category.</div>;
    }

    const groupedItems = filteredInventory.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    }, {});

    return Object.entries(groupedItems).map(([type, items]) => (
      <div key={type} className="inventory-section">
        <div className="item-grid">
          {items.map((item, index) => (
            <div key={`${item.id}-${index}`} className="item-card">
              <div className="item-header">
                <span className="item-name">{item.name}</span>
                <span className="item-price">
                  Sell: ${formatCredits(Math.floor(item.price * 0.4))}
                </span>
              </div>
              <div className="item-description">{item.description}</div>
              {item.defense && (
                <div className="item-stat">
                  Reduces damage by {item.defense}%
                </div>
              )}
              {item.damage && (
                <div className="item-stat">Damage: {item.damage}</div>
              )}
              <div className="item-buttons">
                <button
                  className="sell-button"
                  onClick={() => handleSell(item)}
                >
                  Sell
                </button>
                <button
                  className={`equip-button ${item.equipped ? "equipped" : ""}`}
                  onClick={() => handleEquip(item)}
                >
                  {item.equipped ? "Equipped" : "Equip"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="inventory-screen">
      <div className="inventory-header">
        <h2>Inventory</h2>
        <div className="header-buttons">
          <span className="back-button" onClick={() => onNavigate("market")}>
            <span className="key">(M)</span>arket
          </span>
          <span className="back-button" onClick={onExit}>
            <span className="key">(B)</span>ack
          </span>
        </div>
      </div>
      {renderEquippedItems()}
      {renderTabs()}
      <div className="inventory-content">
        {localCharacter.inventory.length === 0 ? (
          <div className="empty-inventory">Your inventory is empty.</div>
        ) : (
          renderInventoryByType()
        )}
      </div>
    </div>
  );
}

export default Inventory;
