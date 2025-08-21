import React, { useState, useEffect } from "react";
import marketData from "../data/marketData";
import "../styles/NightMarket.css";

function NightMarket({ character, onExit, onUpdateCharacter }) {
  const [currentMenu, setCurrentMenu] = useState("main");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [localCharacter, setLocalCharacter] = useState(character);

  // Update local character when prop changes
  useEffect(() => {
    setLocalCharacter(character);
  }, [character]);

  // Simple keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();

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
            case "B":
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

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentMenu, selectedCategory, onExit]);

  const formatCredits = (amount) => {
    return new Intl.NumberFormat().format(amount);
  };

  const handlePurchase = (item) => {
    if (localCharacter.credits >= item.price) {
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
        ...localCharacter,
        credits: localCharacter.credits - item.price,
        inventory: [...localCharacter.inventory, itemWithType],
      };
      onUpdateCharacter(updatedCharacter);
    }
  };

  const renderMainMenu = () => (
    <>
      <div className="section-header">
        <h2>Night Market</h2>
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
          <span className="menu-item" onClick={onExit}>
            <span className="key">(B)</span>ack to Streets
          </span>
        </div>
      </div>
    </>
  );

  const renderWeaponCategories = () => (
    <>
      <div className="section-header">
        <h2>Weapons</h2>
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
                localCharacter.credits >= item.price ? "" : "disabled"
              }`}
              onClick={() => handlePurchase(item)}
              disabled={localCharacter.credits < item.price}
            >
              {localCharacter.credits >= item.price
                ? "Purchase"
                : "Not Enough Credits"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
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

  return <div className="night-market">{renderContent()}</div>;
}

export default NightMarket;
