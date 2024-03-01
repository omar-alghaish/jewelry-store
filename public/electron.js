/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path'); // Add this line

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: isDev
        ? path.join(app.getAppPath(), './public/preload.js') // Loading it from the public folder for dev
        : path.join(app.getAppPath(), './build/preload.js'), // Loading it from the build folder for production
      worldSafeExecuteJavaScript: true, // If you're using Electron 12+, this should be enabled by default and does not need to be added here.
      contextIsolation: true, // Isolating context so our app is not exposed to random javascript executions making it safer.

      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  // Load the ReactJS app.

  // eslint-disable-next-line no-undef
  const indexPath = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '/index.html')}`;
  win.loadURL(indexPath);
  // win.loadFile(`file://${path.join(__dirname, '/index.html')}`);
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

app.setPath(
  'userData',
  isDev
    ? path.join(app.getAppPath(), 'userdata/') // In development it creates the userdata folder where package.json is
    : path.join(process.resourcesPath, 'userdata/') // In production it creates userdata folder in the resources folder
);

app.whenReady().then(async () => {
  await createWindow(); // Create the mainWindow

  // If you want to add React Dev Tools
  if (isDev) {
    await session.defaultSession
      .loadExtension(
        path.join(__dirname, `../userdata/extensions/react-dev-tools`) // This folder should have the chrome extension for React Dev Tools. Get it online or from your Chrome extensions folder.
      )
      .then((name) => console.log('Dev Tools Loaded'))
      .catch((err) => console.log(err));
  }
});
app.on('window-all-closed', () => {
  // eslint-disable-next-line no-undef
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
