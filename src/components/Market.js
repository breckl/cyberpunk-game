import React, { useState, useEffect } from "react";
import market from "../data/market";
import { getCurrentLevel } from "../data/levels.js";
import { FaArrowLeft } from "react-icons/fa";
import {
  playClickSound,
  playCashRegisterSound,
  playBeepSound,
} from "../utils/soundUtils.js";

function Market({ character, onExit, onUpdateCharacter, onNavigate }) {
  const [selectedTab, setSelectedTab] = useState("weapons");
  const [localCharacter, setLocalCharacter] = useState(character);
  const [confirmingPurchase, setConfirmingPurchase] = useState(null);
  const [confirmingEquip, setConfirmingEquip] = useState(null);

  // Update local character when prop changes
  useEffect(() => {
    setLocalCharacter(character);
  }, [character]);

  const formatCredits = (amount) => {
    return new Intl.NumberFormat().format(amount);
  };

  const renderTabs = () => {
    const categories = ["weapons", "armor"];

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

  const handleTabClick = (category) => {
    setSelectedTab(category);
    playClickSound();
  };

  const handlePurchase = (item) => {
    if (localCharacter.credits >= item.price) {
      // Start the fill animation instead of immediately showing confirmation
      setConfirmingPurchase({ ...item, action: "buy" });
    }
  };

  const handleSell = (item) => {
    setConfirmingPurchase({ ...item, action: "sell" });
  };

  const confirmPurchase = (item) => {
    playCashRegisterSound();
    // Add type to the item for inventory categorization
    const getItemType = () => {
      if (selectedTab === "weapons") {
        return "weapon";
      } else if (selectedTab === "armor") {
        return "armor";
      } else {
        return selectedTab; // fallback
      }
    };

    const itemWithType = {
      ...item,
      type: getItemType(),
      equipped: false,
      inventoryId: `inv_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`, // Unique inventory ID
    };

    console.log("Item with type:", itemWithType);

    // Use safe credit management
    const updatedCharacter = {
      ...localCharacter,
      inventory: [...localCharacter.inventory, itemWithType],
    };

    console.log("Updated character inventory:", updatedCharacter.inventory);

    // Apply credit deduction safely
    updatedCharacter.loseCredits =
      localCharacter.loseCredits ||
      function (amount, reason) {
        const oldCredits = this.credits;
        this.credits = Math.max(0, this.credits - amount);
        return {
          amountLost: oldCredits - this.credits,
          reason: reason,
          remainingCredits: this.credits,
        };
      };

    const creditResult = updatedCharacter.loseCredits.call(
      updatedCharacter,
      item.price,
      `Purchased ${item.name}`
    );
    updatedCharacter.credits = creditResult.remainingCredits;

    onUpdateCharacter(updatedCharacter);
    setLocalCharacter(updatedCharacter);
    setConfirmingPurchase(null);

    // Show equip confirmation for weapons and armor
    if (itemWithType.type === "weapon" || itemWithType.type === "armor") {
      setConfirmingEquip(itemWithType);
    }
  };

  const confirmSell = (item) => {
    playCashRegisterSound();
    const sellPrice = Math.floor(item.price * 0.25); // 25% of purchase price

    // Use safe credit management
    const updatedCharacter = {
      ...localCharacter,
      inventory: localCharacter.inventory.filter((invItem) => {
        // Use inventoryId if available, otherwise fall back to id
        if (item.inventoryId && invItem.inventoryId) {
          return invItem.inventoryId !== item.inventoryId;
        } else {
          return invItem.id !== item.id;
        }
      }),
    };

    // Apply credit gain safely
    updatedCharacter.gainCredits =
      localCharacter.gainCredits ||
      function (amount, reason) {
        this.credits += amount;
        return {
          amountGained: amount,
          reason: reason,
          totalCredits: this.credits,
        };
      };

    const creditResult = updatedCharacter.gainCredits.call(
      updatedCharacter,
      sellPrice,
      `Sold ${item.name}`
    );
    updatedCharacter.credits = creditResult.totalCredits;

    onUpdateCharacter(updatedCharacter);
    setConfirmingPurchase(null);
  };

  const cancelPurchase = () => {
    setConfirmingPurchase(null);
  };

  const handleEquip = (item) => {
    let updatedInventory = [...localCharacter.inventory];

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
    setConfirmingEquip(null);
  };

  const confirmEquip = () => {
    if (confirmingEquip) {
      playBeepSound();
      handleEquip(confirmingEquip);
    }
  };

  const cancelEquip = () => {
    setConfirmingEquip(null);
  };

  const renderItemList = (items, categoryName) => {
    // Sort items by level first, then by price
    const sortedItems = [...items].sort((a, b) => {
      const levelA = a.level || 1;
      const levelB = b.level || 1;

      // First sort by level
      if (levelA !== levelB) {
        return levelA - levelB;
      }

      // If levels are equal, sort by price
      return a.price - b.price;
    });

    return (
      <div className="item-list">
        {sortedItems.map((item) => (
          <div key={item.id} className="item-card">
            <div className="item-header">
              <span className="item-name">{item.name}</span>
              <span className="item-price">${formatCredits(item.price)}</span>
            </div>
            <div className="item-description">
              <em>{item.description}</em>
            </div>
            <div className="item-stats">
              {item.defense && (
                <div className="item-stat">
                  Reduces damage by {item.defense}%
                </div>
              )}
              <div className="item-stat-row">
                {item.level && (
                  <span className="stat-badge level">LVL {item.level}</span>
                )}
                {item.damage && (
                  <span className="stat-badge damage">DMG {item.damage}</span>
                )}
              </div>
            </div>
            {(() => {
              const isInInventory = localCharacter.inventory.some(
                (invItem) => invItem.id === item.id
              );

              if (isInInventory) {
                const sellPrice = Math.floor(item.price * 0.25); // 25% of purchase price
                return (
                  <button
                    className="item-button sell-button"
                    onClick={() => handleSell(item)}
                  >
                    SELL FOR ${formatCredits(sellPrice)}
                  </button>
                );
              } else {
                // Check level requirement
                const characterLevel = getCurrentLevel(
                  localCharacter.experience
                );
                const itemLevel = item.level || 1;
                const meetsLevelRequirement = characterLevel >= itemLevel;

                return (
                  <button
                    className={`item-button purchase-button ${
                      localCharacter.credits >= item.price &&
                      meetsLevelRequirement
                        ? ""
                        : "disabled"
                    }`}
                    onClick={() => handlePurchase(item)}
                    disabled={
                      localCharacter.credits < item.price ||
                      !meetsLevelRequirement
                    }
                  >
                    {!meetsLevelRequirement
                      ? `Requires Level ${itemLevel}`
                      : localCharacter.credits >= item.price
                      ? "Buy"
                      : "Not Enough Credits"}
                  </button>
                );
              }
            })()}
          </div>
        ))}
      </div>
    );
  };

  const renderConfirmationDialog = () => {
    if (!confirmingPurchase) return null;

    const isBuying = confirmingPurchase.action === "buy";
    const actionText = isBuying ? "buy" : "sell";
    const priceText = isBuying
      ? `$${formatCredits(confirmingPurchase.price)}`
      : `$${formatCredits(Math.floor(confirmingPurchase.price * 0.1))}`; // 10% of purchase price
    const confirmFunction = isBuying
      ? () => confirmPurchase(confirmingPurchase)
      : () => confirmSell(confirmingPurchase);

    return (
      <div className="confirmation-overlay">
        <div className="confirmation-dialog">
          <p>
            Are you sure you want to {actionText} {confirmingPurchase.name} for{" "}
            {priceText}?
          </p>
          <div className="confirmation-buttons">
            <button className="confirm-button" onClick={confirmFunction}>
              Yes
            </button>
            <button className="cancel-button" onClick={cancelPurchase}>
              No
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderEquipConfirmationDialog = () => {
    if (!confirmingEquip) return null;

    return (
      <div className="confirmation-overlay">
        <div className="confirmation-dialog">
          <p>Do you want to equip {confirmingEquip.name}?</p>
          <div className="confirmation-buttons">
            <button className="confirm-button" onClick={confirmEquip}>
              YES
            </button>
            <button className="cancel-button" onClick={cancelEquip}>
              NO
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "weapons":
        // Get all weapons and sort by level first, then by price
        const allWeapons = Object.values(market.weapons).flat();
        const sortedWeapons = allWeapons.sort((a, b) => {
          const levelA = a.level || 1;
          const levelB = b.level || 1;

          // First sort by level
          if (levelA !== levelB) {
            return levelA - levelB;
          }

          // If levels are equal, sort by price
          return a.price - b.price;
        });

        return (
          <div className="item-list">
            {sortedWeapons.map((item) => (
              <div key={item.id} className="item-card">
                <div className="item-header">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">
                    ${formatCredits(item.price)}
                  </span>
                </div>
                <div className="item-description">{item.description}</div>
                <div className="item-stats">
                  <div className="item-stat-row">
                    {item.level && (
                      <span className="stat-badge level">LVL {item.level}</span>
                    )}
                    {item.damage && (
                      <span className="stat-badge damage">
                        DMG {item.damage.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                {(() => {
                  const isInInventory = localCharacter.inventory.some(
                    (invItem) => invItem.id === item.id
                  );

                  if (isInInventory) {
                    const sellPrice = Math.floor(item.price * 0.1); // 10% of purchase price
                    return (
                      <button
                        className="item-button sell-button"
                        onClick={() => handleSell(item)}
                      >
                        SELL FOR ${formatCredits(sellPrice)}
                      </button>
                    );
                  } else {
                    // Check level requirement
                    const characterLevel = getCurrentLevel(
                      localCharacter.experience
                    );
                    const itemLevel = item.level || 1;
                    const meetsLevelRequirement = characterLevel >= itemLevel;

                    return (
                      <button
                        className={`item-button purchase-button ${
                          localCharacter.credits >= item.price &&
                          meetsLevelRequirement
                            ? ""
                            : "disabled"
                        }`}
                        onClick={() => handlePurchase(item)}
                        disabled={
                          localCharacter.credits < item.price ||
                          !meetsLevelRequirement
                        }
                      >
                        {!meetsLevelRequirement
                          ? `Requires Level ${itemLevel}`
                          : localCharacter.credits >= item.price
                          ? "BUY"
                          : "Not Enough Credits"}
                      </button>
                    );
                  }
                })()}
              </div>
            ))}
          </div>
        );
      case "armor":
        return renderItemList(market.armor, "ARMOR");
      default:
        // Get all weapons and sort by level first, then by price for default view
        const defaultWeapons = Object.values(market.weapons).flat();
        const defaultSortedWeapons = defaultWeapons.sort((a, b) => {
          const levelA = a.level || 1;
          const levelB = b.level || 1;

          // First sort by level
          if (levelA !== levelB) {
            return levelA - levelB;
          }

          // If levels are equal, sort by price
          return a.price - b.price;
        });
        return renderItemList(defaultSortedWeapons, "WEAPONS");
    }
  };

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
        <h2>Black Market</h2>
        <div className="header-credits">
          ${formatCredits(localCharacter.credits)}
        </div>
      </div>
      {renderTabs()}
      <div className="content-area">{renderContent()}</div>
      {renderConfirmationDialog()}
      {renderEquipConfirmationDialog()}
    </div>
  );
}

export default Market;
