import { app, BrowserWindow, shell, ipcMain, globalShortcut } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import { getOrInitializeSettings, UserSettings } from '../services/settings'
import Store from 'electron-store';

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '../')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')
const splashHtml = join(__dirname, '../../public/splash.html')

const store = new Store();

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    // frame: false,
    minWidth: 400,
    minHeight: 400, 
    show: false,
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: true,
    },
  });
  win.setMenu(null);

  var splash = new BrowserWindow({
    width: 640, 
    height: 402,
    transparent: true, 
    frame: false, 
    alwaysOnTop: true 
  });
  splash.loadFile(splashHtml);

  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url);
    // Open devTool if the app is not packaged
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }

  win.webContents.on('did-finish-load', () => {
    registerListeners(win);
    setTimeout(() => {
      win?.show();
      splash?.destroy();
    }, 500)
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady()
  .then(() => {
    store.delete('overlayOpacity');
    getOrInitializeSettings(store);
  })
  .then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

let overlayState = false;

const registerListeners = (window: BrowserWindow) : void => {

  ipcMain.on('retrieve-settings', (event) => {
    const canvasBackgroundColor = store.get('canvasBackgroundColor') as string;
    const overlayOpacity = store.get('overlayOpacity') as number;

    event.reply('load-settings', {
      canvasBackgroundColor,
      overlayOpacity: overlayOpacity,
    })
  });

  ipcMain.on('save-settings', (event, userSettings: UserSettings) => {
    const { canvasBackgroundColor, overlayOpacity } = userSettings;

    if (canvasBackgroundColor)
      store.set('canvasBackgroundColor', canvasBackgroundColor);
    if (overlayOpacity)
      store.set('overlayOpacity', overlayOpacity);
  });

  globalShortcut.register('Alt+CommandOrControl+O', () => {

    if (overlayState) {
      win.setIgnoreMouseEvents(false);
      win.setAlwaysOnTop(false);
      win.setFocusable(true);
      win.setOpacity(1)
      win.setTitle('Peek Canvas');
      win.webContents.send('overlay-state', false);
    } else {
      const opacity = store.get('overlayOpacity') as number;
      win.setIgnoreMouseEvents(true);
      win.setAlwaysOnTop(true);
      win.setFocusable(false);
      win.setOpacity(opacity / 100)
      win.setTitle('Peek Canvas (Overlay Mode)');
      win.webContents.send('overlay-state', true);
    }
    overlayState = !overlayState;
  })
}