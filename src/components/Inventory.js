import React, { useState, useEffect } from "react";
import "../styles/Inventory.css";
import { FaArrowLeft } from "react-icons/fa";

function Inventory({ character, onUpdateCharacter, onExit, onNavigate }) {
  const [localCharacter, setLocalCharacter] = useState(character);
  const [selectedTab, setSelectedTab] = useState("all");
  const [confirmingSell, setConfirmingSell] = useState(null);

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
    setConfirmingSell(item);
  };

  const confirmSell = (item) => {
    const sellPrice = Math.floor(item.price * 0.1); // 10% of purchase price
    const updatedInventory = localCharacter.inventory.filter(
      (invItem) => invItem.id !== item.id
    );

    const updatedCharacter = {
      ...localCharacter,
      inventory: updatedInventory,
    };

    // Use safe credit management
    if (localCharacter.gainCredits) {
      const creditResult = localCharacter.gainCredits.call(
        updatedCharacter,
        sellPrice,
        `Sold ${item.name}`
      );
      updatedCharacter.credits = creditResult.totalCredits;
    } else {
      // Fallback if gainCredits method doesn't exist
      updatedCharacter.credits = localCharacter.credits + sellPrice;
    }

    onUpdateCharacter(updatedCharacter);
    setLocalCharacter(updatedCharacter);
    setConfirmingSell(null);
  };

  const cancelSell = () => {
    setConfirmingSell(null);
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
    const categories = ["all", "weapon", "armor"];

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
      <div className="inventory-equipped-items">
        <h3>Equipped Items</h3>

        <div className="equipped-grid">
          <div className="equipped-slot">
            <span className="slot-label">Weapon</span>
            <span className="slot-item">{equipped.weapon?.name || "None"}</span>
          </div>
          <div className="equipped-slot">
            <span className="slot-label">Armor</span>
            <span className="slot-item">{equipped.armor?.name || "None"}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderConfirmationDialog = () => {
    if (!confirmingSell) return null;

    const sellPrice = Math.floor(confirmingSell.price * 0.1);

    return (
      <div className="confirmation-overlay">
        <div className="confirmation-dialog">
          <h3>Are you sure?</h3>
          <p>
            Do you want to sell {confirmingSell.name} for $
            {formatCredits(sellPrice)}?
          </p>
          <div className="confirmation-buttons">
            <button
              className="confirm-button"
              onClick={() => confirmSell(confirmingSell)}
            >
              Yes, Sell
            </button>
            <button className="cancel-button" onClick={cancelSell}>
              No, Keep
            </button>
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
                  Sell for ${formatCredits(Math.floor(item.price * 0.1))}
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
      {/* Mobile Back Button Row */}
      <div className="mobile-back-row">
        <button className="mobile-back-button" onClick={onExit}>
          <FaArrowLeft />
          Back
        </button>
      </div>

      <div className="inventory-header">
        <h2>Inventory</h2>
        <div className="header-buttons">
          <span
            className="back-button desktop-only"
            onClick={() => onNavigate("market")}
          >
            <span className="key">M</span>arket
          </span>
          <span className="back-button desktop-only" onClick={onExit}>
            <span className="key">B</span>ack
          </span>
        </div>
      </div>
      {renderEquippedItems()}
      {renderTabs()}
      <div className="inventory-content">
        {localCharacter.inventory.length === 0 ? (
          <div className="empty-inventory">
            Your inventory is empty. Hit the streets, slacker!
          </div>
        ) : (
          renderInventoryByType()
        )}
      </div>
      {renderConfirmationDialog()}
    </div>
  );
}

export default Inventory;
