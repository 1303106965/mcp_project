import { app, BrowserWindow, ipcMain } from 'electron';
import { runAgent } from './agent/agent';
import { initVector } from './db/vector';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadURL('http://localhost:5173');
}

app.whenReady().then(async () => {
  await initVector();
  createWindow();
});

ipcMain.handle('chat', async (_, msg) => {
  console.log('收到消息:', msg)
  return await runAgent(msg);
});