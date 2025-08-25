#!/usr/bin/env node

/**
 * Test script for Purchase Flow Debugging
 * Run with: node test_purchase_flow.js
 */

// Mock data structures to test the purchase flow
const mockMarket = {
  weapons: {
    power: [
      {
        id: "w1",
        name: "Rusty Knife",
        description: "Cracked blade scavenged from junk",
        actionDescription: "stab",
        damage: 4,
        price: 50,
        level: 1,
        type: "Power",
      },
    ],
  },
};

const mockCharacter = {
  name: "TestPlayer",
  credits: 1000,
  experience: 0,
  inventory: [],

  loseCredits(amount, reason) {
    const oldCredits = this.credits;
    this.credits = Math.max(0, this.credits - amount);
    return {
      amountLost: oldCredits - this.credits,
      reason: reason,
      remainingCredits: this.credits,
    };
  },
};

// Simulate the purchase flow
console.log("🔍 TESTING PURCHASE FLOW\n");
console.log("=" * 50);

console.log("1. Initial Character State:");
console.log(`   Credits: ${mockCharacter.credits}`);
console.log(`   Inventory items: ${mockCharacter.inventory.length}`);
console.log(`   Inventory:`, mockCharacter.inventory);

console.log("\n2. Market Item:");
const testItem = mockMarket.weapons.power[0];
console.log(`   Item: ${testItem.name}`);
console.log(`   Price: ${testItem.price}`);
console.log(`   Original type: ${testItem.type}`);

console.log("\n3. Simulating Purchase Process:");
console.log("   - Checking credits (should be sufficient)");
console.log(
  `   - Character has ${mockCharacter.credits} credits, item costs ${testItem.price}`
);

if (mockCharacter.credits >= testItem.price) {
  console.log("   ✅ Credits sufficient, proceeding with purchase");

  // Simulate the confirmPurchase function
  const selectedTab = "weapons";

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
      return selectedTab;
    }
  };

  const itemWithType = {
    ...testItem,
    type: getItemType(),
    equipped: false,
  };

  console.log("\n4. Item Type Assignment:");
  console.log(`   Original item type: ${testItem.type}`);
  console.log(`   Selected tab: ${selectedTab}`);
  console.log(`   Assigned type: ${itemWithType.type}`);
  console.log(`   Final item:`, itemWithType);

  // Simulate credit deduction
  const creditResult = mockCharacter.loseCredits(
    testItem.price,
    `Purchased ${testItem.name}`
  );
  console.log("\n5. Credit Deduction:");
  console.log(`   Credits before: ${mockCharacter.credits + testItem.price}`);
  console.log(`   Credits after: ${mockCharacter.credits}`);
  console.log(`   Amount lost: ${creditResult.amountLost}`);

  // Simulate inventory update
  const updatedCharacter = {
    ...mockCharacter,
    inventory: [...mockCharacter.inventory, itemWithType],
  };

  console.log("\n6. Inventory Update:");
  console.log(`   Inventory before: ${mockCharacter.inventory.length} items`);
  console.log(`   Inventory after: ${updatedCharacter.inventory.length} items`);
  console.log(`   New inventory:`, updatedCharacter.inventory);

  // Test inventory filtering
  console.log("\n7. Inventory Filtering Test:");
  const weaponItems = updatedCharacter.inventory.filter(
    (item) => item.type === "weapon"
  );
  const allItems = updatedCharacter.inventory.filter(
    (item) => item.type === "all"
  );

  console.log(`   Items with type 'weapon': ${weaponItems.length}`);
  console.log(`   Items with type 'all': ${allItems.length}`);
  console.log(`   Weapon items:`, weaponItems);

  // Test if item would show up in inventory display
  console.log("\n8. Inventory Display Test:");
  if (weaponItems.length > 0) {
    console.log("   ✅ Item would be visible in weapon tab");
    weaponItems.forEach((item) => {
      console.log(`   - ${item.name} (${item.type}) - Damage: ${item.damage}`);
    });
  } else {
    console.log("   ❌ Item would NOT be visible in weapon tab");
  }

  // Check for potential issues
  console.log("\n9. Potential Issues Check:");
  if (itemWithType.type !== "weapon") {
    console.log(
      `   ⚠️  Item type mismatch: expected 'weapon', got '${itemWithType.type}'`
    );
  }

  if (!itemWithType.id) {
    console.log("   ⚠️  Item missing ID");
  }

  if (!itemWithType.name) {
    console.log("   ⚠️  Item missing name");
  }

  console.log("\n10. Summary:");
  console.log(
    `   Purchase successful: ${
      updatedCharacter.inventory.length > 0 ? "Yes" : "No"
    }`
  );
  console.log(
    `   Item in inventory: ${
      updatedCharacter.inventory.length > 0 ? "Yes" : "No"
    }`
  );
  console.log(
    `   Item would be visible: ${weaponItems.length > 0 ? "Yes" : "No"}`
  );
} else {
  console.log("   ❌ Insufficient credits");
}

console.log("\n🔍 Debugging complete!");
console.log("\nCommon issues to check:");
console.log("1. Item type assignment (should be 'weapon' not 'Power')");
console.log("2. Inventory state updates");
console.log("3. Character state persistence");
console.log("4. Tab filtering logic");
console.log("5. Console errors in browser");
