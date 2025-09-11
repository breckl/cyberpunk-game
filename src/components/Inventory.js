import React, { useState, useEffect } from "react";
import "../styles/Inventory.css";
import { FaArrowLeft } from "react-icons/fa";
import {
  playClickSound,
  playCashRegisterSound,
  playBeepSound,
} from "../utils/soundUtils.js";

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
    console.log("Attempting to play cash register sound...");
    playCashRegisterSound();
    const sellPrice = Math.floor(item.price * 0.1); // 10% of purchase price
    const updatedInventory = localCharacter.inventory.filter((invItem) => {
      // Use inventoryId if available, otherwise fall back to id
      if (item.inventoryId && invItem.inventoryId) {
        return invItem.inventoryId !== item.inventoryId;
      } else {
        return invItem.id !== item.id;
      }
    });

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
    playBeepSound();
    if (item.equipped) {
      // Unequip the item
      updatedInventory = updatedInventory.map((invItem) => {
        // Use inventoryId if available, otherwise fall back to id
        const isMatch =
          item.inventoryId && invItem.inventoryId
            ? invItem.inventoryId === item.inventoryId
            : invItem.id === item.id;

        if (isMatch) {
          return { ...invItem, equipped: false };
        }
        return invItem;
      });
    } else {
      // Unequip any items of the same type and equip this one
      updatedInventory = updatedInventory.map((invItem) => {
        // Use inventoryId if available, otherwise fall back to id
        const isMatch =
          item.inventoryId && invItem.inventoryId
            ? invItem.inventoryId === item.inventoryId
            : invItem.id === item.id;

        if (invItem.type === item.type && !isMatch) {
          return { ...invItem, equipped: false };
        }
        if (isMatch) {
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

  const handleTabClick = (category) => {
    setSelectedTab(category);
    playClickSound();
  };

  const renderTabs = () => {
    const categories = ["all", "weapon", "armor"];

    return (
      <div className="content-tabs">
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
          <p>
            Are you sure you want to sell {confirmingSell.name} for $
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
      <div key={type}>
        <div className="item-list">
          {items.map((item, index) => (
            <div key={`${item.id}-${index}`} className="item-card">
              <div className="item-header">
                <span className="item-name">{item.name}</span>
              </div>
              <div className="item-description">
                <em>{item.description}</em>
              </div>
              {item.defense && (
                <div className="item-stat">
                  Reduces damage by {item.defense}%
                </div>
              )}
              {item.damage && (
                <div className="item-stat">
                  Damage: {Math.round(item.damage * 100) / 100}
                </div>
              )}
              <div className="item-buttons">
                <button
                  className={`item-button equip-button ${
                    item.equipped ? "equipped" : ""
                  }`}
                  onClick={() => handleEquip(item)}
                >
                  {item.equipped ? "EQUIPPED" : "EQUIP"}
                </button>
                <button
                  className="item-button sell-button"
                  onClick={() => handleSell(item)}
                >
                  SELL FOR ${formatCredits(Math.floor(item.price * 0.1))}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="page-containers">
      <div className="back-button-row">
        <button className="back-button" onClick={onExit}>
          <FaArrowLeft />
          Back
        </button>
      </div>

      <div className="header-bar">
        <h2>Inventory</h2>
        <div className="header-credits">
          ${formatCredits(localCharacter.credits)}
        </div>
      </div>
      {renderEquippedItems()}
      {renderTabs()}
      <div className="content-area">
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
