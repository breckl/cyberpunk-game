import React, { useState } from "react";
import marketData from "../data/marketData";
import "../styles/NightMarket.css";

function NightMarket({ character, onExit, onUpdateCharacter }) {
  const [currentMenu, setCurrentMenu] = useState("main");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showInventory, setShowInventory] = useState(false);

  const formatCredits = (amount) => {
    return new Intl.NumberFormat().format(amount);
  };

  const handlePurchase = (item) => {
    if (character.credits >= item.price) {
      // Add type to the item for inventory categorization
      const getItemType = () => {
        if (currentMenu === "weapons") {
          return "weapon";
        } else if (currentMenu === "netgear") {
          return "netgear";
        } else {
          return currentMenu.slice(0, -1); // remove 's' from end
        }
      };

      const itemWithType = {
        ...item,
        type: getItemType(),
        equipped: false,
      };
      const updatedCharacter = {
        ...character,
        credits: character.credits - item.price,
        inventory: [...character.inventory, itemWithType],
      };
      onUpdateCharacter(updatedCharacter);
    }
  };

  const handleSell = (item) => {
    const sellPrice = Math.floor(item.price * 0.4);
    // Remove the item by ID instead of index to ensure we remove the correct one
    const updatedInventory = character.inventory.filter(
      (invItem) => invItem.id !== item.id
    );

    const updatedCharacter = {
      ...character,
      credits: character.credits + sellPrice,
      inventory: updatedInventory,
    };
    onUpdateCharacter(updatedCharacter);
  };

  const renderMainMenu = () => (
    <>
      <div className="menu-header">NIGHT MARKET</div>
      <div className="credits-display">
        Credits: ¥{formatCredits(character.credits)}
      </div>
      <div className="menu-options">
        <div className="option-row">
          <span className="menu-item" onClick={() => setCurrentMenu("armor")}>
            <span className="key">(A)</span>rmor
          </span>
        </div>
        <div className="option-row">
          <span className="menu-item" onClick={() => setCurrentMenu("weapons")}>
            <span className="key">(W)</span>eapons
          </span>
        </div>
        <div className="option-row">
          <span
            className="menu-item"
            onClick={() => setCurrentMenu("cyberware")}
          >
            <span className="key">(C)</span>yberware
          </span>
        </div>
        <div className="option-row">
          <span className="menu-item" onClick={() => setCurrentMenu("netgear")}>
            <span className="key">(N)</span>etrunner Gear
          </span>
        </div>
        <div className="option-row">
          <span className="menu-item" onClick={() => setShowInventory(true)}>
            <span className="key">(I)</span>nventory
          </span>
        </div>
        <div className="option-row">
          <span className="menu-item" onClick={onExit}>
            <span className="key">(Q)</span>uit
          </span>
        </div>
      </div>
    </>
  );

  const renderWeaponCategories = () => (
    <>
      <div className="menu-header">WEAPONS</div>
      <div className="credits-display">
        Credits: ¥{formatCredits(character.credits)}
      </div>
      <div className="menu-options">
        <div className="option-row">
          <span
            className="menu-item"
            onClick={() => setSelectedCategory("standard")}
          >
            <span className="key">(S)</span>tandard
          </span>
        </div>
        <div className="option-row">
          <span
            className="menu-item"
            onClick={() => setSelectedCategory("energy")}
          >
            <span className="key">(E)</span>nergy
          </span>
        </div>
        <div className="option-row">
          <span
            className="menu-item"
            onClick={() => setSelectedCategory("heavy")}
          >
            <span className="key">(H)</span>eavy
          </span>
        </div>
        <div className="option-row">
          <span className="menu-item" onClick={() => setCurrentMenu("main")}>
            <span className="key">(B)</span>ack
          </span>
        </div>
      </div>
    </>
  );

  const renderItemList = (items, categoryName) => (
    <div className="store-section">
      <div className="section-header">
        <h2>{categoryName}</h2>
        <span
          className="menu-item"
          onClick={() => {
            setSelectedCategory(null);
            setCurrentMenu("main");
          }}
        >
          <span className="key">(B)</span>ack
        </span>
      </div>
      <div className="item-list">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <div className="item-header">
              <span className="item-name">{item.name}</span>
              <span className="item-price">¥{formatCredits(item.price)}</span>
            </div>
            <div className="item-description">{item.description}</div>
            {item.rating && (
              <div className="item-stat">Armor Rating: {item.rating}</div>
            )}
            {item.damage && (
              <div className="item-stat">Damage: {item.damage}</div>
            )}
            <button
              className={`purchase-button ${
                character.credits >= item.price ? "" : "disabled"
              }`}
              onClick={() => handlePurchase(item)}
              disabled={character.credits < item.price}
            >
              {character.credits >= item.price
                ? "Purchase"
                : "Not Enough Credits"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const handleEquip = (item) => {
    // If the item is already equipped, unequip it
    if (item.equipped) {
      const updatedInventory = character.inventory.map((invItem) => {
        if (invItem.id === item.id) {
          return { ...invItem, equipped: false };
        }
        return invItem;
      });

      const updatedCharacter = {
        ...character,
        inventory: updatedInventory,
      };
      onUpdateCharacter(updatedCharacter);
      return;
    }

    // Otherwise, unequip any items of the same type and equip this one
    const updatedInventory = character.inventory.map((invItem) => {
      if (invItem.type === item.type) {
        // Unequip all items of the same type
        return { ...invItem, equipped: false };
      }
      if (invItem.id === item.id) {
        // Equip the selected item
        return { ...invItem, equipped: true };
      }
      return invItem;
    });

    const updatedCharacter = {
      ...character,
      inventory: updatedInventory,
    };
    onUpdateCharacter(updatedCharacter);
  };

  const renderEquippedItems = () => {
    const equipped = {
      weapon: character.inventory.find(
        (item) => item.type === "weapon" && item.equipped
      ),
      armor: character.inventory.find(
        (item) => item.type === "armor" && item.equipped
      ),
      cyberware: character.inventory.find(
        (item) => item.type === "cyberware" && item.equipped
      ),
      netgear: character.inventory.find(
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
    const groupedItems = character.inventory.reduce((acc, item) => {
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
                  onClick={() => handleSell(item, index)}
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

  const renderInventory = () => (
    <>
      <div className="menu-header">INVENTORY</div>
      <div className="credits-display">
        Credits: ¥{formatCredits(character.credits)}
      </div>
      {renderEquippedItems()}
      <div className="inventory-content">
        {character.inventory.length === 0 ? (
          <div className="empty-inventory">Your inventory is empty.</div>
        ) : (
          renderInventoryByType()
        )}
      </div>
      <div className="option-row">
        <span
          className="menu-item"
          onClick={() => {
            setShowInventory(false);
            setCurrentMenu("main");
          }}
        >
          <span className="key">(B)</span>ack
        </span>
      </div>
    </>
  );

  const renderContent = () => {
    if (showInventory) {
      return renderInventory();
    }

    switch (currentMenu) {
      case "weapons":
        return selectedCategory
          ? renderItemList(
              marketData.weapons[selectedCategory],
              selectedCategory.toUpperCase() + " WEAPONS"
            )
          : renderWeaponCategories();
      case "armor":
        return renderItemList(marketData.armor, "ARMOR");
      case "cyberware":
        return renderItemList(marketData.cyberware, "CYBERWARE");
      case "netgear":
        return renderItemList(marketData.netgear, "NETRUNNER GEAR");
      default:
        return renderMainMenu();
    }
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
    const key = e.key.toUpperCase();

    if (showInventory) {
      if (key === "B") {
        setShowInventory(false);
        setCurrentMenu("main");
      }
      return;
    }

    if (currentMenu === "weapons" && selectedCategory) {
      if (key === "B") {
        setSelectedCategory(null);
      }
      return;
    }

    switch (currentMenu) {
      case "main":
        switch (key) {
          case "A":
            setCurrentMenu("armor");
            break;
          case "W":
            setCurrentMenu("weapons");
            break;
          case "C":
            setCurrentMenu("cyberware");
            break;
          case "N":
            setCurrentMenu("netgear");
            break;
          case "I":
            setShowInventory(true);
            break;
          case "Q":
            onExit();
            break;
          default:
            break;
        }
        break;
      case "weapons":
        switch (key) {
          case "S":
            setSelectedCategory("standard");
            break;
          case "E":
            setSelectedCategory("energy");
            break;
          case "H":
            setSelectedCategory("heavy");
            break;
          case "B":
            setCurrentMenu("main");
            break;
          default:
            break;
        }
        break;
      default:
        if (key === "B") {
          setCurrentMenu("main");
        }
        break;
    }
  };

  return (
    <div className="night-market" onKeyDown={handleKeyDown} tabIndex="0">
      {renderContent()}
    </div>
  );
}

export default NightMarket;
