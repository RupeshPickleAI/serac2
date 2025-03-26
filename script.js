let cameraInterval = null;
let statusInterval = null;
let currentPage = 1;
let imagesPerPage = 10;
let allImages = [];


const machineScripts = {
    1: { 
        pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe ', 
        scriptPath: 'c:/Users/Rupesh/Projects/serac1/Electron_Project/main.py' 
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







// const cameraConfigPaths = {
//     "camera1": "C:Users/Rupesh/demoprojects/Electron_Project/camera.json",
//     "camera2": "C:/Users/Rupesh/OneDrive/Desktop/config2.json",
//     "camera3": "D:/Electron_Project zip/config3.json",
//     "camera4": "D:/Electron_Project zip/config4.json",
//     "camera5": "C:/Users/Rupesh/OneDrive/Desktop/config5.json",
//     "camera6": "C:/Users/Rupesh/OneDrive/Desktop/config6.json",
//     "camera7": "C:/Users/Rupesh/OneDrive/Desktop/config7.json",
//     "camera8": "C:/Users/Rupesh/OneDrive/Desktop/config8.json",
//     "camera9": "C:/Users/Rupesh/OneDrive/Desktop/config9.json"
// };


const machineStatusPath = "C:/Users/Rupesh/OneDrive/Desktop/machine_status.json";

// const dummyImages = [
//     '/api/placeholder/640/480',
//     '/api/placeholder/640/480',
//     '/api/placeholder/640/480',
//     '/api/placeholder/640/480',
//     '/api/placeholder/640/480',
//     '/api/placeholder/640/480',
//     '/api/placeholder/640/480',
//     '/api/placeholder/640/480',
//     '/api/placeholder/640/480'
// ];



function loadContent(section, event) {
    const mainContent = document.getElementById('mainContent');
    document.querySelectorAll('.nav-button').forEach(button => button.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');

    if (section === 'images') {
        mainContent.innerHTML = `
            <div id="images-section" class="content-section active">
                <div class="section-header">
                    <h1 class="section-title">Defect Turn ON or OFF</h1>
                </div>
                
                <div class="toggle-container" id="toggleContainer">
                    <!-- Toggles will be dynamically loaded here -->
                </div>
    
                <div class="image-grid-container" id="imageGridContainer">
                    <div class="image-grid" id="imageGrid"></div>
                </div>
            </div>`;
        
        loadDefectToggles();
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
                    ${[1,2,3,4,5].map(num => `
                        <div class="camera-container">
                            <div class="camera-title">
                                <i class="fas fa-video"></i> Camera ${num}
                            </div>
                            <div class="camera-feed">
                                <img src="/api/placeholder/640/480" alt="camera${num}" id="camera${num}">
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



const toggleJsonPath = "C:/Users/Rupesh/Projects/serac1/Electron_Project/toggle.json"; // Define the correct path

// Object to store updated toggle states before submitting
let updatedToggles = {};


async function loadDefectToggles() {
    try {
        const response = await fetch("file:///" + toggleJsonPath);
        const data = await response.json();

        const toggleContainer = document.getElementById("toggleContainer");
        if (!toggleContainer) return;

        let toggleHTML = Object.keys(data.defects)
            .map((key, index) => `
                <div class="toggle-wrapper">
                    <label class="toggle-label">Defect ${index + 1}</label>
                    <label class="switch">
                        <input type="checkbox" id="${key}" ${data.defects[key] ? "checked" : ""} onchange="updateToggleState('${key}')">
                        <span class="slider round"></span>
                    </label>
                </div>
            `)
            .join('');

        toggleHTML += `<button class="submit-button" onclick="submitToggles()">Submit</button>`;

        toggleContainer.innerHTML = toggleHTML;
    } catch (error) {
        console.error("Error loading defect toggles:", error);
    }
}


// Function to store changes in `updatedToggles` object
function updateToggleState(key) {
    const checkbox = document.getElementById(key);
    updatedToggles[key] = checkbox.checked;
}

// Function to submit and update `toggle.json`
async function submitToggles() {
    try {
        if (Object.keys(updatedToggles).length === 0) {
            alert("No changes made.");
            return;
        }

        // Fetch the existing toggle.json data
        const response = await fetch("file:///" + toggleJsonPath);
        const data = await response.json();

        // Update defects based on modified toggles
        Object.keys(updatedToggles).forEach(key => {
            data.defects[key] = updatedToggles[key];
        });

        // Send updated data to Electron main process to write it to file
        window.electron.updateToggleJson(data);

        alert("Defect toggles updated successfully!");

        updatedToggles = {}; // Reset after submission
        loadDefectToggles(); // Reload toggles to reflect changes
    } catch (error) {
        console.error("Error updating defect toggle:", error);
    }
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



function startStatusUpdates() {
    updateMachineStatus();
    statusInterval = setInterval(updateMachineStatus, 500);
}



const cameraJsonPath = "C:/Users/Rupesh/demoprojects/Electron_Project/camera.json"

// Function to update the camera images
function updateCameras() {
    // Fetch camera config (camera.json) to get the base64 image data
    fetch(`file:///${cameraJsonPath}`)
        .then(response => response.json())
        .then(data => {
            const cameras = data.cameraImage; // Assuming cameraImage contains the camera data
            if (!cameras) {
                console.error("Invalid camera image data format.");
                return;
            }

            // Iterate over each camera and update the image
            Object.entries(cameras).forEach(([cameraKey, base64Image]) => {
                const imgElement = document.getElementById(cameraKey); // Get the image element
                if (imgElement) {
                    console.log(`Updating image for ${cameraKey}`);
                    // Directly update image source without any caching mechanism
                    imgElement.src = `data:image/jpeg;base64,${base64Image}`;
                } else {
                    console.error(`Image element for ${cameraKey} not found.`);
                }
            });
        })
        .catch(error => console.error("Error fetching camera.json:", error));
}


// Start updating the cameras every 100ms (10fps)
function startCameraUpdates() {
    updateCameras(); // Initial update
    cameraInterval = setInterval(updateCameras, 100); // Update every 100ms (10fps)
}

// Stop the camera updates if needed (for cleanup)
function stopCameraUpdates() {
    if (cameraInterval) {
        clearInterval(cameraInterval);
        cameraInterval = null;
    }
}


async function openComfortPage() {
    const skuList = await window.electron.getSkuButtons();
    const mainContent = document.getElementById('mainContent');

    mainContent.innerHTML = `
        <div id="comfort-section" class="content-section active">
            <div class="comfort-header">
                <h1>Defect Detection Bleach Bottles</h1>
            </div>
            <div class="sku-buttons-grid">
                ${skuList.map((label, index) => `
                    <button class="sku-button ${label === "STOP CODE" ? 'stop-code-button' : ''}" onclick="runPythonScript(${index + 1})">
                        ${label}
                    </button>
                `).join('')}
            </div>
        </div>`;
}


function openDashboard() {
    window.open("https://hul.indusvision.ai", "_blank"); // Opens in a new tab
}

let currentRunningScript = null; // Store the currently running script


async function runPythonScript(scriptNumber) {
    try {
        const script = machineScripts[scriptNumber];
        if (!script) return console.error("Script not found");

        const skuList = await window.electron.getSkuButtons();
        const message = `START: ${skuList[scriptNumber - 1]}`;

        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(message);
            console.log(" Sent over WebSocket:", message);
        } else {
            console.warn(" WebSocket not connected. Retrying...");
        }

        const configUpdated = await window.electron.runSkuPythonConfig(scriptNumber);
        if (!configUpdated) return console.error("Config update failed");

        await window.electron.runPythonScript(script.pythonPath, script.scriptPath);
    } catch (error) {
        console.error("Error:", error);
    }
}

let ws = null;

function initWebSocket() {
    ws = new WebSocket("ws://localhost:5005");

    ws.onopen = () => {
        console.log(" WebSocket connected");
    };

    ws.onmessage = (event) => {
        console.log(" Message from WebSocket Server:", event.data);
    };

    ws.onerror = (err) => {
        console.error(" WebSocket error:", err);
    };

    ws.onclose = () => {
        console.warn(" WebSocket disconnected, retrying in 3s...");
        setTimeout(initWebSocket, 3000);
    };
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
    loadContent('defect_toggle');
    initWebSocket();
});

function logout() {
    window.electron.logoutUser(); // Call the function to return to login page
}