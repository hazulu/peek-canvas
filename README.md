## Overview

Have you ever needed to overlay images on top of your screen?

If you have, you might have used other programs currently available. This isn't really a problem, but they generally control *other* windows, which means you need to BYOC (bring your own canvas). This can lead to a lot of set-up that Peek Canvas aims to solve.

Peek Canvas is designed to streamline your overlaying experience:

1. Open and resize Peek Canvas to cover where you want the overlay.
2. Import images into the canvas (Pasting, Dragging Over, or Attaching), and position as desired.
3. Activate Overlay Mode with: **Alt + Ctrl/Command + O**.

📦 Ready out of the box  
🎯 Based on the official [template-react-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts), project structure will be familiar to you  
🌱 Easily extendable and customizable  
💪 Supports Node.js API in the renderer process  
🔩 Supports C/C++ native addons  
🐞 Debugger configuration included  
🖥 Easy to implement multiple windows  

## 🛫 Quick start

```sh
npm create electron-vite
```

![electron-vite-react.gif](/public/electron-vite-react.gif)

## 🐞 Debug

![electron-vite-react-debug.gif](/public/electron-vite-react-debug.gif)

## 📂 Directory structure

Familiar React application structure, just with `electron` folder on the top :wink:  
*Files in this folder will be separated from your React application and built into `dist-electron`*  

```tree
├── electron                                 Electron-related code
│   ├── main                                 Main-process source code
│   └── preload                              Preload-scripts source code
│
├── release                                  Generated after production build, contains executables
│   └── {version}
│       ├── {os}-{os_arch}                   Contains unpacked application executable
│       └── {app_name}_{version}.{ext}       Installer for the application
│
├── public                                   Static assets
└── src                                      Renderer source code, your React application
```

## 🚨 Be aware

This template integrates Node.js API to the renderer process by default. If you want to follow **Electron Security Concerns** you might want to disable this feature. You will have to expose needed API by yourself.  

## ⌨️ Keybind Shortcuts
- **Alt + Ctrl/Command + O**: Activate Overlay Mode
- **Delete**: Remove Selected Layer
- **[**: Down One Layer
- **]**: Up One Layer
- **V**: Select Move Tool
- **T**: Select Transform Tool