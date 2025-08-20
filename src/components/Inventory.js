import React, { useState, useEffect } from "react";
import "../styles/Inventory.css";

function Inventory({ character, onUpdateCharacter, onExit }) {
  const [localCharacter, setLocalCharacter] = useState(character);

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
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onExit]);

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
        if (invItem.type === item.type) {
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
        <h3>EQUIPPED ITEMS:</h3>
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
    const groupedItems = localCharacter.inventory.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    }, {});

    return Object.entries(groupedItems).map(([type, items]) => (
      <div key={type} className="inventory-section">
        <h3>{type.toUpperCase()}</h3>
        <div className="item-grid">
          {items.map((item, index) => (
            <div key={`${item.id}-${index}`} className="item-card">
              <div className="item-header">
                <span className="item-name">{item.name}</span>
                <span className="item-price">
                  Sell: ¥{formatCredits(Math.floor(item.price * 0.4))}
                </span>
              </div>
              <div className="item-description">{item.description}</div>
              {item.rating && (
                <div className="item-stat">Armor Rating: {item.rating}</div>
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
      <div className="menu-header">INVENTORY</div>
      <div className="credits-display">
        Credits: ¥{formatCredits(localCharacter.credits)}
      </div>
      {renderEquippedItems()}
      <div className="inventory-content">
        {localCharacter.inventory.length === 0 ? (
          <div className="empty-inventory">Your inventory is empty.</div>
        ) : (
          renderInventoryByType()
        )}
      </div>
      <div className="option-row">
        <span className="menu-item" onClick={onExit}>
          <span className="key">(B)</span>ack
        </span>
      </div>
    </div>
  );
}

export default Inventory;
