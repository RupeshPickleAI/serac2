let cameraInterval = null;
let statusInterval = null;
let currentPage = 1;
let imagesPerPage = 10;
let allImages = [];
// Define folder paths
const imageFolders = {
    "1": "C:/Users/Rupesh/OneDrive/Pictures/Screenshots",
    "2": "C:/Users/Rupesh/OneDrive/Pictures/Photos",
    "3": "C:/Users/Rupesh/Downloads"
};

const machineScripts = {
    1: { 
        pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe', 
        scriptPath: 'C:/Users/Rupesh/OneDrive/Documents/main.py' 
    },
    2: { 
        pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe', 
        scriptPath: 'd:/Electron_Project zip/Electron_Project/main1.py'
    },
    3: {
        pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe',
        scriptPath: 'd:/Electron_Project zip/Electron_Project/main1.py'
    },
    4: {
        pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe',
        scriptPath: 'd:/Electron_Project zip/Electron_Project/main1.py'
    },
    5: {
        pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe',
        scriptPath: 'd:/Electron_Project zip/Electron_Project/main1.py'
    },
    6: {
        pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe',
        scriptPath: 'd:/Electron_Project zip/Electron_Project/main1.py'
    },
    7: {
        pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe',
        scriptPath: 'd:/Electron_Project zip/Electron_Project/main1.py'
    },
    8: {
        pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe',
        scriptPath: 'd:/Electron_Project zip/Electron_Project/main1.py'
    },
    9: {
        pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe',
        scriptPath: 'd:/Electron_Project zip/Electron_Project/main1.py'
    },
    10: {
        pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe',
        scriptPath: 'd:/Electron_Project zip/Electron_Project/main1.py'
    },
    11: {
        pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe',
        scriptPath: 'd:/Electron_Project zip/Electron_Project/main1.py'
    },
    12: {
        pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe',
        scriptPath: 'd:/Electron_Project zip/Electron_Project/main1.py'
    },
    13: {
        pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe',
        scriptPath: 'd:/Electron_Project zip/Electron_Project/main1.py'
    },
    14: {
        pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe',
        scriptPath: 'd:/Electron_Project zip/Electron_Project/main1.py'
    },
    15: {
        pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe',
        scriptPath: 'd:/Electron_Project zip/Electron_Project/main1.py'
    },
    16: {
        pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe',
        scriptPath: 'd:/Electron_Project zip/Electron_Project/main1.py'
    }
};







const cameraConfigPaths = {
    "camera1": "C:/Users/Rupesh/OneDrive/Desktop/config1.json",
    "camera2": "C:/Users/Rupesh/OneDrive/Desktop/config2.json",
    "camera3": "D:/Electron_Project zip/config3.json",
    "camera4": "D:/Electron_Project zip/config4.json",
    "camera5": "C:/Users/Rupesh/OneDrive/Desktop/config5.json",
    "camera6": "C:/Users/Rupesh/OneDrive/Desktop/config6.json",
    "camera7": "C:/Users/Rupesh/OneDrive/Desktop/config7.json",
    "camera8": "C:/Users/Rupesh/OneDrive/Desktop/config8.json",
    "camera9": "C:/Users/Rupesh/OneDrive/Desktop/config9.json"
};

const machineStatusPath = "C:/Users/Rupesh/OneDrive/Desktop/machine_status.json";

const dummyImages = [
    '/api/placeholder/640/480',
    '/api/placeholder/640/480',
    '/api/placeholder/640/480',
    '/api/placeholder/640/480',
    '/api/placeholder/640/480',
    '/api/placeholder/640/480',
    '/api/placeholder/640/480',
    '/api/placeholder/640/480',
    '/api/placeholder/640/480'
];

function reloadGallery() {
    if (currentFolder) {
        currentPage = 1; // Reset page to the first one
        allImages = []; // Clear previously loaded images
        document.getElementById("imageGrid").innerHTML = ""; // Clear existing images
        loadImagesFromFolder(currentFolder, activeButtonId);
        window.scrollTo(0, 0); // Scroll to top
    }
}

function loadContent(section, event) {
    const mainContent = document.getElementById('mainContent');
    document.querySelectorAll('.nav-button').forEach(button => button.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');

    if (section === 'images') {
        mainContent.innerHTML = `
            <div id="images-section" class="content-section active">
                <div class="section-header">
                    <h1 class="section-title">Product Image Gallery</h1>
                    <p class="section-subtitle">Browse through product images from different categories.</p>
                </div>
                
                <div class="image-buttons">
                    <button class="folder-button" id="screenshotsBtn" onclick="loadImagesFromFolder(imageFolders['1'], 'screenshotsBtn')">
                        <i class="fa-solid fa-robot"></i> 1
                    </button>
                    <button class="folder-button" id="photosBtn" onclick="loadImagesFromFolder(imageFolders['2'], 'photosBtn')">
                        <i class="fa-solid fa-robot"></i> 2
                    </button>
                    <button class="folder-button" id="downloadsBtn" onclick="loadImagesFromFolder(imageFolders['3'], 'downloadsBtn')">
                        <i class="fa-solid fa-robot"></i> 3
                    </button>
                </div>
                
                <div class="image-grid-container" id="imageGridContainer">
                    <div class="image-grid" id="imageGrid"></div>
                </div>

                <button class="refresh-button" onclick="reloadGallery()">
                    <i class="fas fa-sync-alt"></i>
                </button>
            </div>`;
        loadRandomImages();
    }
    else if (section === 'code') {
        mainContent.innerHTML = `
            <div id="code-section" class="content-section active">
                <div class="section-header">
                    <h1 class="section-title">Machine Control Panel</h1>
                </div>
                <div class="buttons-grid">
                    <button class="run-button" onclick="openComfortPage()">
                        <div class="button-logo">
                            <img src="https://eimkeia.stripocdn.email/content/guids/CABINET_8270216c780e362a1fbcd636b59c67ae376eb446dc5f95e17700b638b8c3f618/images/unileverremovebgpreview.png">
                        </div>
                      SERAC 2
                    </button>
                </div>
            </div>`;
    }
  
    else if (section === 'camera') {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div id="camera-section" class="content-section active">
                <div class="camera-header">
                    <h1><i class="fas fa-video"></i> Live Camera Feed</h1>
                    <p>Real-time surveillance monitoring system for all production units.</p>
                </div>
                <div class="camera-grid">
                    ${Object.keys(cameraConfigPaths).map(cameraKey => `
                        <div class="camera-container">
                            <div class="camera-title">
                                <i class="fas fa-video"></i> ${cameraKey.replace('camera', 'Camera ')}
                            </div>
                            <div class="camera-feed">
                                <img src="${dummyImages[0]}" alt="${cameraKey}" id="${cameraKey}">
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>`;
    
        startCameraUpdates();
    }
    else if (section === "machine_status") {
        initializeMachineStatus();
        startStatusUpdates();
    }
}


// Function to load images when a folder button is clicked
async function loadImagesFromFolder(folderPath, buttonId) {
    if (!folderPath) {
        console.error("Error: folderPath is undefined");
        return;
    }

    try {
        console.log("Loading images from:", folderPath);
        currentFolder = folderPath; // Store selected folder
        activeButtonId = buttonId;  // Track active button

        const response = await window.electron.getRandomImages(folderPath);

        if (!response || response.length === 0) {
            console.error("No images received from Electron API");
            document.getElementById('imageGrid').innerHTML = '<p>No images found.</p>';
            return;
        }

        allImages = response;

        // Reset button colors and highlight selected button
        document.querySelectorAll('.folder-button').forEach(button => {
            button.style.backgroundColor = '#3498db';
        });
        document.getElementById(buttonId).style.backgroundColor = '#2ecc71';

        displayImages();
        window.scrollTo(0, 0); // Scroll to top
    } catch (error) {
        console.error("Error loading images:", error);
        document.getElementById('imageGrid').innerHTML = '<p>Error loading images.</p>';
    }
}

// Function to display images
function displayImages() {
    const imageGrid = document.getElementById('imageGrid');
    if (!imageGrid) return;

    if (allImages.length === 0) {
        imageGrid.innerHTML = '<p>No images found.</p>';
        return;
    }

    imageGrid.innerHTML = allImages.map((fileName, index) => {
        const imagePath = `file:///${fileName.replace(/\\/g, '/')}`;
        return `
            <div class="image-container">
                <img src="${imagePath}" class="gallery-image" alt="Image ${index + 1}">
                <div class="image-info">
                    <div class="image-title">${fileName.split('/').pop()}</div>
                </div>
            </div>`;
    }).join('');
}

function changePage(direction) {
    const totalPages = Math.ceil(allImages.length / imagesPerPage);

    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    }

    displayCurrentPage();
}


function initializeMachineStatus() {
    const container = document.getElementById('mainContent');
    container.innerHTML = `
        <div id="machine-status-section" class="content-section active">
            <div class="machine-status-header">
                <h1><i class="fas fa-industry"></i> Machine Status Monitor</h1>
                <p>Real-time monitoring dashboard displaying the operational status of all production units.</p>
            </div>
            <div class="status-list" id="statusList"></div>
        </div>
    `;
    updateMachineStatus();
}

function updateMachineStatus() {
    fetch('file:///' + machineStatusPath)
        .then(response => response.json())
        .then(data => {
            const statusList = document.getElementById('statusList');
            if (!statusList) return;

            statusList.innerHTML = data.map(machine => {
                const statusText = machine.status === 0 ? 'Running' : 'Idle';
                const statusClass = machine.status === 0 ? 'status-running' : 'status-idle';
                const statusIcon = machine.status === 0 ? 'fa-spin fa-gear' : 'fa-pause';
                return `
                    <div class="machine-item">
                        <div class="machine-name">
                            <i class="fas fa-robot"></i>
                            ${machine.machine_name}
                        </div>
                        <div class="status-indicator ${statusClass}">
                            <i class="fas ${statusIcon}"></i>
                            ${statusText}
                        </div>
                    </div>
                `;
            }).join('');
        })
        .catch(error => console.error('Error loading machine status:', error));
}

// Function to start updating cameras at intervals
function startCameraUpdates() {
    updateCameras(); // Initial update
    cameraInterval = setInterval(updateCameras, 200); // Update every 2 seconds
}

function startStatusUpdates() {
    updateMachineStatus();
    statusInterval = setInterval(updateMachineStatus, 500);
}

function updateCameras() {
    Object.entries(cameraConfigPaths).forEach(([cameraKey, filePath]) => {
        fetch(`file:///${filePath}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.cameraImage) {
                    const imgElement = document.getElementById(cameraKey);
                    if (imgElement) {
                        imgElement.src = data.cameraImage.startsWith('data:image/')
                            ? data.cameraImage
                            : `data:image/jpeg;base64,${data.cameraImage}`;
                    }
                } else {
                    console.error(`Invalid data format in ${filePath}`);
                }
            })
            .catch(error => console.error(`Error fetching ${cameraKey} from ${filePath}:`, error));
    });
}



async function openComfortPage() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div id="comfort-section" class="content-section active">
            <div class="comfort-header">
                <h1>Defect Detection Bleach Bottles</h1>
            </div>
            
            <div class="sku-buttons-grid">
                ${[
                    "Comfort Blue Morning Fresh 860ml",
                    "Comfort Pink Lily Fresh",
                    "Comfort Green Garden Fresh",
                    "Comfort Black Royale",
                    "Comfort Black Desire",
                    "Surf Excel Matic Top Load 1ltr",
                    "Surf Excel Matic Front Load 1ltr",
                    "Surf Excel Matic Top Load 500ml",
                    "Surf Excel Matic Front Load 500ml",
                    "Surf Excel Easy Wash 1ltr",
                    "Surf Excel Easy Wash 500ml",
                    "Surf Excel Quick Wash 1ltr",
                    "Surf Excel Quick Wash 500ml",
                    "Rin Matic Front Load 1ltr",
                    "Rin Matic Top Load 1ltr",
                    "STOP CODE"
                ].map((label, index) => `
                    <button class="sku-button ${index === 15 ? 'stop-code-button' : ''}" onclick="runPythonScript(${index + 1})">
                        ${label}
                    </button>
                `).join('')}
            </div>
        </div>`;
}


async function runPythonScript(scriptNumber) {
    try {
        const script = machineScripts[scriptNumber];
        if (!script) {
            console.error(`Script configuration not found for script number ${scriptNumber}`);
            return;
        }

        console.log(`Updating config for SKU ${scriptNumber}...`);

        // Step 1: Update Config File before running the script
        const configUpdated = await window.electron.runSkuPythonConfig(scriptNumber);
        if (!configUpdated) {
            console.error("Config update failed! Aborting script execution.");
            return;
        }

        console.log(`Config updated successfully for SKU ${scriptNumber}. Running Python script...`);

        // Step 2: Run Python script after config is updated
        await window.electron.runPythonScript(script.pythonPath, script.scriptPath);
        
        console.log("Python script executed.");
    } catch (error) {
        console.error("Error running script:", error);
    }
}


// Cleanup intervals when changing sections
function cleanupIntervals() {
    if (cameraInterval) {
        clearInterval(cameraInterval);
        cameraInterval = null;
    }
    if (statusInterval) {
        clearInterval(statusInterval);
        statusInterval = null;
    }
}

// Add event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for navigation buttons
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', (event) => {
            cleanupIntervals();
            const section = event.currentTarget.getAttribute('data-section');
            loadContent(section, event);
        });
    });
    
    // Load default content
    loadContent('code');
});

function logout() {
    window.electron.logoutUser(); // Call the function to return to login page
}