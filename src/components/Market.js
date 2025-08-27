import React, { useState, useEffect } from "react";
import market from "../data/market";
import "../styles/Market.css";
import { getCurrentLevel } from "../data/levels.js";

function Market({ character, onExit, onUpdateCharacter, onNavigate }) {
  const [selectedTab, setSelectedTab] = useState("weapons");
  const [localCharacter, setLocalCharacter] = useState(character);
  const [confirmingPurchase, setConfirmingPurchase] = useState(null);

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
      } else if (key === "I") {
        onNavigate("inventory");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onExit, onNavigate]);

  const formatCredits = (amount) => {
    return new Intl.NumberFormat().format(amount);
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
    const categories = ["weapons", "armor", "cyberware", "netgear"];

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

  const handlePurchase = (item) => {
    if (localCharacter.credits >= item.price) {
      setConfirmingPurchase({ ...item, action: "buy" });
    }
  };

  const handleSell = (item) => {
    setConfirmingPurchase({ ...item, action: "sell" });
  };

  const confirmPurchase = (item) => {
    console.log("confirmPurchase called with item:", item);

    // Add type to the item for inventory categorization
    const getItemType = () => {
      if (selectedTab === "weapons") {
        return "weapon";
      } else if (selectedTab === "netgear") {
        return "netgear";
      } else if (selectedTab === "armor") {
        return "armor";
      } else if (selectedTab === "cyberware") {
        return "cyberware";
      } else {
        return selectedTab; // fallback
      }
    };

    const itemWithType = {
      ...item,
      type: getItemType(),
      equipped: false,
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

    console.log("Credit result:", creditResult);
    console.log("Final character state:", updatedCharacter);

    onUpdateCharacter(updatedCharacter);
    setConfirmingPurchase(null);
  };

  const confirmSell = (item) => {
    const sellPrice = Math.floor(item.price * 0.1); // 10% of purchase price

    // Use safe credit management
    const updatedCharacter = {
      ...localCharacter,
      inventory: localCharacter.inventory.filter(
        (invItem) => invItem.id !== item.id
      ),
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

  const renderItemList = (items, categoryName) => (
    <div className="store-section">
      <div className="item-list">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <div className="item-header">
              <span className="item-name">{item.name}</span>
              <span className="item-price">${formatCredits(item.price)}</span>
            </div>
            <div className="item-description">{item.description}</div>
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
                const sellPrice = Math.floor(item.price * 0.1); // 10% of purchase price
                return (
                  <button
                    className="sell-button"
                    onClick={() => handleSell(item)}
                  >
                    Sell for ${formatCredits(sellPrice)}
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
                    className={`purchase-button ${
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
    </div>
  );

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
          <h3>Are you sure?</h3>
          <p>
            Do you want to {actionText} {confirmingPurchase.name} for{" "}
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

  const renderContent = () => {
    switch (selectedTab) {
      case "weapons":
        // Get all weapons and sort by price
        const allWeapons = Object.values(market.weapons).flat();
        const sortedWeapons = allWeapons.sort((a, b) => a.price - b.price);

        return (
          <div className="store-section">
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
                        <span className="stat-badge level">
                          LVL {item.level}
                        </span>
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
                          className="sell-button"
                          onClick={() => handleSell(item)}
                        >
                          Sell for ${formatCredits(sellPrice)}
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
                          className={`purchase-button ${
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
          </div>
        );
      case "armor":
        return renderItemList(market.armor, "ARMOR");
      case "cyberware":
        return renderItemList(market.cyberware, "CYBERWARE");
      case "netgear":
        return renderItemList(market.netgear, "NETRUNNER GEAR");
      default:
        // Get all weapons and sort by price for default view
        const defaultWeapons = Object.values(market.weapons).flat();
        const defaultSortedWeapons = defaultWeapons.sort(
          (a, b) => a.price - b.price
        );
        return renderItemList(defaultSortedWeapons, "WEAPONS");
    }
  };

  return (
    <div className="market">
      <div className="market-header">
        <h2>Market</h2>
        <div className="header-buttons">
          <span className="back-button" onClick={() => onNavigate("inventory")}>
            <span className="key">(I)</span>nventory
          </span>
          <span className="back-button" onClick={onExit}>
            <span className="key">(B)</span>ack
          </span>
        </div>
      </div>
      {renderTabs()}
      <div className="market-content">{renderContent()}</div>
      {renderConfirmationDialog()}
    </div>
  );
}

export default Market;
