# 🐈 Running Cat – Minimal Animated Menubar Companion

**Running Cat** is a pixel-art inspired menubar app that adds a touch of calm to your workspace.  
It lives quietly in your Mac or Windows tray — a looping animation of a cat running across the menubar — with a cozy aesthetic popup window inspired by rainy evenings and study vibes.

---

## ✨ Features

- 🐾 **Animated Menubar Icon:** A pixel-art cat that continuously runs in your tray.
- 🌗 **Auto Light/Dark Mode:** Switches between light and dark cat sprites based on system theme.
- 🎞️ **Smooth 10 FPS Animation:** Lightweight and efficient icon animation loop.
- 💻 **Compact Popup Window:** Displays a cozy “study room in rain” background with a simple UI.
- 🔘 **Quit Button:** Easily exit the app from within the popup.
- 🪶 **Fully Offline:** No internet or external API calls required.
- 🧩 **Cross-Platform:** Works on both macOS (menubar) and Windows (system tray).

---

## 🧠 Tech Stack

- **Electron.js** — for building the menubar/tray application  
- **HTML + TailwindCSS** — for the popup window UI  
- **JavaScript (ES6)** — for logic and animation  
- **Pixel Art Assets** — custom-made background and animated cat frames

---

## 📂 Project Structure
  Running Cat/
├── assets/                # All images (cat frames, background)
│   ├── dark_cat_0.png
│   ├── light_cat_0.png
│   ├── background.jpg
│   └── …
├── main.js                # Main Electron process, animation logic
├── preload.js             # Secure IPC bridge
├── index.html             # Popup window layout
├── styles/output.css      # Tailwind-generated CSS
├── package.json           # App metadata & build config
└── README.md              # The Documentation of the Heavens

---

## 🧩 Installation

### 💻 macOS

#### Option 1 – Unsigned (Free & Simple)
1. Download the latest `.dmg` or `.zip` from the [Releases](#) page.  
2. Drag **Running Cat.app** to your `Applications` folder.
3. On first launch, macOS may show a warning:
   - Right-click the app → **Open**
   - Confirm again → “Open”
4. From now on, it will open normally from the menu bar.

#### Option 2 – (Optional) Signed + Notarized  
If you have an Apple Developer ID, you can sign and notarize the app to remove all security prompts.

---

### 🪟 Windows

1. Download `Running Cat Setup.exe` or `Running Cat-win32-x64.zip`.
2. Run the installer or extract and open `Running Cat.exe`.
3. The app icon will appear in your system tray.
4. Click the cat icon to toggle the popup window or quit.

---

## 🧰 Developer Setup

If you’d like to modify or build the app yourself:

```bash
# Clone repo
git clone https://github.com/yourusername/running-cat.git
cd running-cat

# Install dependencies
npm install

# Run in dev mode
npm start

# Build production app (macOS / Windows)
npm run dist

### 🕯️🕯️

