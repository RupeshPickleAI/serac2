const { app, BrowserWindow, ipcMain ,contextBridge} = require('electron');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

let mainWindow;
const usersFilePath = path.join(__dirname, 'users.json');

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'assets', 'indus_logo_dev.png'), // Set application icon
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            webSecurity: false
        },
    });

    mainWindow.loadFile('login.html');
}

ipcMain.handle('authenticate-user', async (event, username, password) => {
    try {
        const rawData = fs.readFileSync(usersFilePath);
        const usersData = JSON.parse(rawData);

        const user = usersData.users.find(u => u.username === username && u.password === password);

        if (user) {
            return { success: true };
        } else {
            return { success: false, message: 'Invalid username or password' };
        }
    } catch (error) {
        console.error('Error reading user data:', error);
        return { success: false, message: 'Error reading user data' };
    }
});

ipcMain.handle('run-python-script', async (event, pythonPath, scriptPath) => {
    return new Promise((resolve, reject) => {
        const formattedScriptPath = `"${scriptPath}"`;
        const command = `start cmd.exe /k "${pythonPath} ${formattedScriptPath}"`;

        console.log(`Executing command: ${command}`);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Execution error: ${stderr || error.message}`);
                reject(`Error: ${stderr || error.message}`);
                return;
            }
            console.log(`Execution output: ${stdout}`);
            resolve(stdout || 'Script executed successfully');
        });
    });
});

// Handler for the original config file method
ipcMain.handle('run-config-file', async (event, configPath) => {
    try {
        console.log(`Running config file: ${configPath}`);
        
        // You might want to do additional processing here
        // For now, we'll just return success
        return { success: true, message: 'Config file processed' };
    } catch (error) {
        console.error('Error running config file:', error);
        return { success: false, message: `Error: ${error.message}` };
    }
});

// New handler for SKU Python config
ipcMain.handle('run-sku-python-config', async (event, skuNumber) => {
    return new Promise((resolve, reject) => {
        // Path to Python and the SKU config script
        const pythonPath = 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe';
        const scriptPath = path.join(__dirname, 'sku_config_script.py');

        const command = `"${pythonPath}" "${scriptPath}" ${skuNumber}`;

        console.log(`Updating SKU config and executing: ${command}`);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`SKU config execution error: ${stderr || error.message}`);
                reject(`Error: ${stderr || error.message}`);
                return;
            }
            console.log(`SKU config execution output: ${stdout}`);
            resolve(true); // Return success after JSON config is updated
        });
    });
});


// Handle writing to config file
ipcMain.handle('write-config-file', async (event, filePath, content) => {
    try {
        await fs.promises.writeFile(filePath, content);
        return true;
    } catch (error) {
        console.error('Error writing config file:', error);
        return false;
    }
});

ipcMain.handle('get-random-images', async (event, folderPath) => {
    if (!folderPath) {
        console.error("Error: folderPath is undefined");
        return [];
    }
    try {
        console.log("Reading images from:", folderPath);
        const files = fs.readdirSync(folderPath);
        const imageFiles = files
            .filter(file => ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase()))
            .map(file => path.join(folderPath, file));

        return imageFiles;
    } catch (error) {
        console.error('Error reading images:', error);
        return [];
    }
});

ipcMain.on('login-success', () => {
    mainWindow.loadFile('index.html');
});

ipcMain.on('logout-user', () => {
    mainWindow.loadFile('login.html');
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});