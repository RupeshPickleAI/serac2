//  preload.js - Updated for WebSocket (no main process changes needed)
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    runPythonScript: (pythonPath, scriptPath) => ipcRenderer.invoke('run-python-script', pythonPath, scriptPath),
    getRandomImages: (folderPath) => ipcRenderer.invoke('get-random-images', folderPath),
    loginSuccess: () => ipcRenderer.send('login-success'),
    authenticateUser: (username, password) => ipcRenderer.invoke('authenticate-user', username, password),
    logoutUser: () => ipcRenderer.send('logout-user'),
    runConfigFile: (configPath) => ipcRenderer.invoke('run-config-file', configPath),
    runSkuPythonConfig: (skuNumber) => ipcRenderer.invoke('run-sku-python-config', skuNumber),
    writeConfigFile: (filePath, content) => ipcRenderer.invoke('write-config-file', filePath, content),
    updateToggleJson: (data) => ipcRenderer.send('update-toggle-json', data),
    onToggleJsonUpdated: (callback) => ipcRenderer.on('toggle-json-updated', (event, result) => callback(result)),
    getSkuButtons: () => ipcRenderer.invoke('get-sku-buttons')

    // ⚠️ REMOVED: sendSocketMessage
    // WebSocket will now be handled entirely in the frontend (script.js) using WebSocket API
});
