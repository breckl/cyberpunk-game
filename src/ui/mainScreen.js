const blessed = require("blessed");
const gradient = require("gradient-string");
const figlet = require("figlet");

class MainScreen {
  constructor() {
    this.screen = blessed.screen({
      smartCSR: true,
      title: "Burning Chrome",
    });

    // Create the main layout
    this.layout = {
      // Stats panel (top-left)
      stats: blessed.box({
        parent: this.screen,
        top: 0,
        left: 0,
        width: "25%",
        height: "40%",
        label: " Character Stats ",
        border: {
          type: "line",
          fg: "cyan",
        },
        style: {
          border: {
            fg: "cyan",
          },
        },
      }),

      // Main view (center)
      mainView: blessed.box({
        parent: this.screen,
        top: 0,
        left: "25%",
        width: "50%",
        height: "80%",
        label: " Night City ",
        border: {
          type: "line",
          fg: "magenta",
        },
        style: {
          border: {
            fg: "magenta",
          },
        },
      }),

      // Daily events & news (right)
      events: blessed.box({
        parent: this.screen,
        top: 0,
        right: 0,
        width: "25%",
        height: "60%",
        label: " Daily Events ",
        border: {
          type: "line",
          fg: "green",
        },
        style: {
          border: {
            fg: "green",
          },
        },
      }),

      // Inventory (bottom-left)
      inventory: blessed.box({
        parent: this.screen,
        bottom: 0,
        left: 0,
        width: "25%",
        height: "60%",
        label: " Inventory ",
        border: {
          type: "line",
          fg: "yellow",
        },
        style: {
          border: {
            fg: "yellow",
          },
        },
        scrollable: true,
        alwaysScroll: true,
        scrollbar: {
          ch: "║",
          fg: "yellow",
        },
      }),

      // Input/command area (bottom)
      input: blessed.textbox({
        parent: this.screen,
        bottom: 0,
        left: "25%",
        width: "50%",
        height: 3,
        inputOnFocus: true,
        border: {
          type: "line",
          fg: "white",
        },
        style: {
          fg: "cyan",
          focus: {
            fg: "brightCyan",
          },
        },
      }),

      // Combat log/messages (bottom-right)
      log: blessed.log({
        parent: this.screen,
        bottom: 0,
        right: 0,
        width: "25%",
        height: "40%",
        label: " Combat Log ",
        border: {
          type: "line",
          fg: "red",
        },
        style: {
          border: {
            fg: "red",
          },
        },
        scrollable: true,
        alwaysScroll: true,
        scrollbar: {
          ch: "║",
          fg: "red",
        },
      }),
    };

    // Key bindings
    this.screen.key(["escape", "q", "C-c"], () => {
      process.exit(0);
    });

    this.layout.input.key(["enter"], () => {
      const command = this.layout.input.getValue();
      this.handleCommand(command);
      this.layout.input.clearValue();
      this.layout.input.focus();
      this.screen.render();
    });

    // Initial focus
    this.layout.input.focus();
  }

  // Update the stats display
  updateStats(character) {
    this.layout.stats.setContent(
      `Name: ${character.name}\n` +
        `Class: ${character.class}\n` +
        `Level: ${character.level}\n` +
        `HP: ${character.hp}/${character.maxHp}\n` +
        `Energy: ${character.energy}/${character.maxEnergy}\n` +
        `Credits: ${character.credits}¥\n\n` +
        `Hack: ${character.stats.hack}\n` +
        `Combat: ${character.stats.combat}\n` +
        `Stealth: ${character.stats.stealth}\n` +
        `Charm: ${character.stats.charm}\n` +
        `Tech: ${character.stats.tech}\n`
    );
  }

  // Update the main view
  updateMainView(content) {
    this.layout.mainView.setContent(content);
  }

  // Add an event to the events list
  addEvent(event) {
    const currentContent = this.layout.events.getContent();
    this.layout.events.setContent(currentContent + "\n" + event);
  }

  // Update inventory display
  updateInventory(items) {
    this.layout.inventory.setContent(
      items
        .map(
          (item, index) =>
            `${index + 1}. ${item.name} ${item.equipped ? "[E]" : ""}`
        )
        .join("\n")
    );
  }

  // Add a message to the combat log
  addLog(message) {
    this.layout.log.log(message);
  }

  // Handle user commands
  setCommandHandler(handler) {
    this.commandHandler = handler;
  }

  handleCommand(command) {
    if (this.commandHandler) {
      this.commandHandler(command);
    }
    this.addLog(`> ${command}`);
  }

  // Display the title screen
  showTitleScreen() {
    const title = figlet.textSync("Neon Nights", {
      font: "Standard",
      horizontalLayout: "full",
    });

    const titleBox = blessed.box({
      parent: this.screen,
      top: "center",
      left: "center",
      width: "80%",
      height: "60%",
      content:
        gradient.rainbow(title) +
        "\n\n" +
        "Welcome to Night City, where chrome meets flesh.\n\n" +
        "Press any key to jack in...",
      border: {
        type: "line",
        fg: "cyan",
      },
      style: {
        fg: "cyan",
        border: {
          fg: "cyan",
        },
      },
    });

    this.screen.render();
  }

  // Render the screen
  render() {
    this.screen.render();
  }
}

module.exports = MainScreen;
