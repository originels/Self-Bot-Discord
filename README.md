# Discord Self-Bot in JavaScript

### <strong>I take no responsibility for blocked Discord accounts that have used this module.</strong>
### <strong>Using this on a user account is prohibited by the [Discord TOS](https://discord.com/terms) and may lead to account suspension.</strong>

## Getting Started

To set up a local copy of this self-bot and get it running, follow the steps below.

### Prerequisites

Here’s what you need to use the self-bot and how to install it:

### How to Get the Token?

- Run this code in the Discord console - [Ctrl + Shift + I]

  ```js
  window.webpackChunkdiscord_app.push([
    [Math.random()],
    {},
    req => {
      if (!req.c) return;
      for (const m of Object.keys(req.c)
        .map(x => req.c[x].exports)
        .filter(x => x)) {
        if (m.default && m.default.getToken !== undefined) {
          return copy(m.default.getToken());
        }
        if (m.getToken !== undefined) {
          return copy(m.getToken());
        }
      }
    },
  ]);
  console.log('%cWorked!', 'font-size: 50px');
  console.log(`%cYou now have your token in the clipboard!`, 'font-size: 16px');
  ```

- **Node.js**  
  To install Node.js, go to [nodejs.org](https://nodejs.org/) and download the latest stable version. Once installed, you can verify that Node.js and NPM are correctly installed by running:

  **Node.js 16.6.0 or newer is required.**

  > Recommended Node.js version: 18+ (LTS)
  ```sh
  node -v
  npm -v
  ```

### Installation

1. **Clone the repository**  
   Use the following command to clone the GitHub repository:

   ```sh
   git clone https://github.com/originels/Discord-Self-Bot.git
   ```

2. **Install NPM dependencies**  
   Run the following command to install the necessary packages via NPM:

   ```sh
   npm install
   ```

3. **Configure your bot**  
   Create a `config.json` file in the project directory and enter your Discord token and prefix:

   ```json
   {
     "token": "YOUR_DISCORD_TOKEN",
     "prefix": "YOUR_PREFIX"
   }
   ```

### Running the Bot

To start the bot, execute the following command:

   ```sh
   node index.js
   ```

### Features

   - [x] **Whitelist Management**: Add or remove users from the whitelist.
   - [x] **Automatic Group Exit**: Enable or disable a module that allows automatic exit from groups if the owner is not on the whitelist.
   - [x] **Connection Detection**: Detects when a device connects to the Discord account and alerts you automatically.
   - [ ] **Fortnite Dances**: Perform Fortnite dances on your Discord account.

### If you followed all my instructions, you should see this message without any issues.

   ```js
   ┌──────────────────────────────────────────────────────────────────────┐
   │                  • UwUhq Edition 0.0.0 •                             │
   │                 (SB session client tools)                            │
   │                                                                      │
   │  > Self-Bot session to seth@uwuhq                                    │
   │    - Command : ∞                                                     │
   │    - Event   : ∞                                                     │
   │    - Error   : 0                                                     │
   │                                                                      │
   │  > For more information, type help or visit github.                  │
   └──────────────────────────────────────────────────────────────────────┘

   seth@uwuhq:~$
   ```

### Warning

Using self-bots on Discord violates their terms of service and may result in account suspension. Use this self-bot at your own risk.

### Help and Support

For any questions or issues, please open an issue on GitHub.
