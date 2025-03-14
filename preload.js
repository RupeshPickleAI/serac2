const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    runPythonScript: (pythonPath, scriptPath) => ipcRenderer.invoke('run-python-script', pythonPath, scriptPath),
    getRandomImages: (folderPath) => ipcRenderer.invoke('get-random-images', folderPath),
    loginSuccess: () => ipcRenderer.send('login-success'), // Notify main process about login
    authenticateUser: (username, password) => ipcRenderer.invoke('authenticate-user', username, password), // Validate login credentials
    logoutUser: () => ipcRenderer.send('logout-user'), // Notify main process to return to login page
    runConfigFile: (configPath) => ipcRenderer.invoke('run-config-file', configPath), // Original config file method
     // New method for SKU config update + execution
     runSkuPythonConfig: (skuNumber) => ipcRenderer.invoke('run-sku-python-config', skuNumber),
    
    writeConfigFile: (filePath, content) => ipcRenderer.invoke('write-config-file', filePath, content)
});




