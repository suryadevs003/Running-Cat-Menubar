// main.js
const path = require("path");
const { app, nativeImage, nativeTheme, ipcMain } = require("electron");
const { menubar } = require("menubar");

let trayRef; // Keep tray reference alive
let animationTimer = null;
let frameIndex = 0;

// Detect dev vs packaged for correct asset paths
const isDev = !app.isPackaged;
const APP_DIR = isDev ? __dirname : path.join(process.resourcesPath);
const assetsDir = path.join(APP_DIR, "assets");

// Load cat frames
const darkFrames = ["dark_cat_0.png", "dark_cat_1.png", "dark_cat_2.png", "dark_cat_3.png", "dark_cat_4.png"]
  .map(f => path.join(assetsDir, f));
const lightFrames = ["light_cat_0.png", "light_cat_1.png", "light_cat_2.png", "light_cat_3.png", "light_cat_4.png"]
  .map(f => path.join(assetsDir, f));

let currentFrames = nativeTheme.shouldUseDarkColors ? darkFrames : lightFrames;

const FRAME_INTERVAL_MS = 120;

// Menubar setup
const mb = menubar({
  index: `file://${path.join(__dirname, "index.html")}`,
  icon: darkFrames[0],
  tooltip: "Running Cat",
  browserWindow: {
    width: 280,
    height: 260,
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    show: false,
    useContentSize: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  },
});

// --- Animation ---
function updateIcon() {
  if (!mb.tray) return;
  const framePath = currentFrames[frameIndex % currentFrames.length];
  const img = nativeImage.createFromPath(framePath);

  // Resize to tray size for macOS menu bar visibility
  const smallImg = img.resize({ width: 36, height: 36 });
  smallImg.setTemplateImage(false);
  mb.tray.setImage(smallImg);

  frameIndex++;
}

function startAnimation() {
  if (animationTimer) clearInterval(animationTimer);
  frameIndex = 0;
  animationTimer = setInterval(updateIcon, FRAME_INTERVAL_MS);
}

// --- Events ---
mb.on("ready", () => {
  trayRef = mb.tray;
  console.log("🐈 Ready");

  startAnimation();

  // Position the popup after it's created and tray is ready
  mb.on("ready", () => {
  trayRef = mb.tray;
  console.log("🐈 Ready");

  startAnimation();

  // Wait a bit before positioning the popup to ensure tray is initialized
  mb.on("after-create-window", () => {
    setTimeout(() => {
      try {
        if (mb.positioner && mb.tray) {
          mb.positioner.move("trayCenter");
          console.log("✅ Positioned under tray");
        } else {
          throw new Error("Tray or positioner not ready");
        }
      } catch (e) {
        console.warn("⚠️ Positioner still not ready:", e.message);
        const { width, height } = mb.window.getBounds();
        const { width: sw, height: sh } = require("electron").screen.getPrimaryDisplay().workAreaSize;
        mb.window.setPosition(Math.floor(sw / 2 - width / 2), Math.floor(sh / 4));
      }
    }, 400); // delay ensures tray geometry exists
  });

  nativeTheme.on("updated", () => {
    currentFrames = nativeTheme.shouldUseDarkColors ? darkFrames : lightFrames;
    startAnimation();
  });
});

  nativeTheme.on("updated", () => {
    currentFrames = nativeTheme.shouldUseDarkColors ? darkFrames : lightFrames;
    startAnimation();
  });
});

if (app.dock && typeof app.dock.hide === "function") {
  app.dock.hide();
}

ipcMain.on("quit-app", () => {
  app.quit();
});

app.on("before-quit", () => {
  if (animationTimer) clearInterval(animationTimer);
});