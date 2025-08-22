import React, { useState, useEffect } from "react";
import marketData from "../data/marketData";
import "../styles/NightMarket.css";

function NightMarket({ character, onExit, onUpdateCharacter }) {
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
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onExit]);

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
    const updatedCharacter = {
      ...localCharacter,
      credits: localCharacter.credits - item.price,
      inventory: [...localCharacter.inventory, itemWithType],
    };
    onUpdateCharacter(updatedCharacter);
    setConfirmingPurchase(null);
  };

  const confirmSell = (item) => {
    const sellPrice = Math.floor(item.price * 0.6); // 60% of purchase price
    const updatedCharacter = {
      ...localCharacter,
      credits: localCharacter.credits + sellPrice,
      inventory: localCharacter.inventory.filter(
        (invItem) => invItem.id !== item.id
      ),
    };
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
              {item.rating && (
                <div className="item-stat">Armor Rating: {item.rating}</div>
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
                const sellPrice = Math.floor(item.price * 0.6);
                return (
                  <button
                    className="sell-button"
                    onClick={() => handleSell(item)}
                  >
                    Sell for ${formatCredits(sellPrice)}
                  </button>
                );
              } else {
                return (
                  <button
                    className={`purchase-button ${
                      localCharacter.credits >= item.price ? "" : "disabled"
                    }`}
                    onClick={() => handlePurchase(item)}
                    disabled={localCharacter.credits < item.price}
                  >
                    {localCharacter.credits >= item.price
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
      : `$${formatCredits(Math.floor(confirmingPurchase.price * 0.6))}`;
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
        const allWeapons = Object.values(marketData.weapons).flat();
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
                          DMG {item.damage}
                        </span>
                      )}
                    </div>
                  </div>
                  {(() => {
                    const isInInventory = localCharacter.inventory.some(
                      (invItem) => invItem.id === item.id
                    );

                    if (isInInventory) {
                      const sellPrice = Math.floor(item.price * 0.6);
                      return (
                        <button
                          className="sell-button"
                          onClick={() => handleSell(item)}
                        >
                          Sell for ${formatCredits(sellPrice)}
                        </button>
                      );
                    } else {
                      return (
                        <button
                          className={`purchase-button ${
                            localCharacter.credits >= item.price
                              ? ""
                              : "disabled"
                          }`}
                          onClick={() => handlePurchase(item)}
                          disabled={localCharacter.credits < item.price}
                        >
                          {localCharacter.credits >= item.price
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
        return renderItemList(marketData.armor, "ARMOR");
      case "cyberware":
        return renderItemList(marketData.cyberware, "CYBERWARE");
      case "netgear":
        return renderItemList(marketData.netgear, "NETRUNNER GEAR");
      default:
        // Get all weapons and sort by price for default view
        const defaultWeapons = Object.values(marketData.weapons).flat();
        const defaultSortedWeapons = defaultWeapons.sort(
          (a, b) => a.price - b.price
        );
        return renderItemList(defaultSortedWeapons, "WEAPONS");
    }
  };

  return (
    <div className="night-market">
      <h2>Night Market</h2>
      {renderTabs()}
      <div className="market-content">{renderContent()}</div>
      <div className="option-row">
        <span className="menu-item" onClick={onExit}>
          <span className="key">(B)</span>ack to Streets
        </span>
      </div>
      {renderConfirmationDialog()}
    </div>
  );
}

export default NightMarket;
