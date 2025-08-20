import React, { useState, useEffect } from "react";
import marketData from "../data/marketData";
import "../styles/NightMarket.css";

function NightMarket({ character, onExit, onUpdateCharacter }) {
  const [currentMenu, setCurrentMenu] = useState("main");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showInventory, setShowInventory] = useState(false);
  const [localCharacter, setLocalCharacter] = useState(character);

  // Update local character when prop changes
  useEffect(() => {
    setLocalCharacter(character);
  }, [character]);

  // Simple keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
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
  }, [currentMenu, selectedCategory, showInventory, onExit]);

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

  const handleSell = (item) => {
    const sellPrice = Math.floor(item.price * 0.4);
    // Remove the item by ID instead of index to ensure we remove the correct one
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

  const renderMainMenu = () => (
    <>
      <div className="menu-header">NIGHT MARKET</div>
      <div className="credits-display">
        Credits: ¥{formatCredits(localCharacter.credits)}
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
            <span className="key">(B)</span>ack to Streets
          </span>
        </div>
      </div>
    </>
  );

  const renderWeaponCategories = () => (
    <>
      <div className="menu-header">WEAPONS</div>
      <div className="credits-display">
        Credits: ¥{formatCredits(localCharacter.credits)}
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

  const handleEquip = (item) => {
    console.log("=== EQUIP DEBUG ===");
    console.log("Item to equip:", item);
    console.log("Item ID:", item.id);
    console.log("Item type:", item.type);
    console.log("Current inventory:", localCharacter.inventory);

    // Create a local copy of the inventory to work with
    let updatedInventory = [...localCharacter.inventory];
    console.log("Initial updatedInventory:", updatedInventory);

    // If the item is already equipped, unequip it
    if (item.equipped) {
      console.log("Item is already equipped, unequipping...");
      updatedInventory = updatedInventory.map((invItem) => {
        if (invItem.id === item.id) {
          console.log("Unequipping item:", invItem.name);
          return { ...invItem, equipped: false };
        }
        return invItem;
      });
    } else {
      console.log("Item is not equipped, equipping...");
      // Otherwise, unequip any items of the same type and equip this one
      updatedInventory = updatedInventory.map((invItem) => {
        if (invItem.type === item.type) {
          // Unequip all items of the same type
          if (invItem.equipped) {
            console.log(
              "Unequipping existing item of same type:",
              invItem.name
            );
          }
          return { ...invItem, equipped: false };
        }
        if (invItem.id === item.id) {
          // Equip the selected item
          console.log("Equipping item:", invItem.name);
          return { ...invItem, equipped: true };
        }
        return invItem;
      });
    }

    console.log("Final updatedInventory:", updatedInventory);

    // Check if any items are now equipped
    const equippedItems = updatedInventory.filter((item) => item.equipped);
    console.log("Equipped items after update:", equippedItems);

    const updatedCharacter = {
      ...localCharacter,
      inventory: updatedInventory,
    };

    console.log("Updated character (equip):", updatedCharacter);
    console.log("Updated inventory items:", updatedInventory);

    // Update the character state
    onUpdateCharacter(updatedCharacter);

    // Also update local state immediately for responsive UI
    // This ensures the component re-renders with the new equipped state
    setLocalCharacter(updatedCharacter);
    console.log("=== END EQUIP DEBUG ===");
  };

  const renderEquippedItems = () => {
    console.log("=== RENDER EQUIPPED DEBUG ===");
    console.log(
      "Rendering equipped items. Inventory:",
      localCharacter.inventory
    );

    // Check each item individually
    localCharacter.inventory.forEach((item, index) => {
      console.log(`Item ${index}:`, {
        name: item.name,
        type: item.type,
        equipped: item.equipped,
        id: item.id,
      });
    });

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

    console.log("Found equipped items:", equipped);
    console.log("=== END RENDER EQUIPPED DEBUG ===");

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

  return <div className="night-market">{renderContent()}</div>;
}

export default NightMarket;
