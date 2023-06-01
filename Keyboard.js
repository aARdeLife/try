// Function to start eye tracking
async function startEyeTracking() {
  const videoElement = document.getElementById('video');
  
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
    videoElement.srcObject = stream;
    
    const gazeTracker = new xgaze.GazeTracker();
    await gazeTracker.load();
    gazeTracker.start(videoElement);
    
    // Listen for gaze updates
    gazeTracker.onGazeUpdate((gazeData) => {
      highlightKey(gazeData.x, gazeData.y);
    });
  } catch (error) {
    console.error('Error accessing camera:', error);
  }
}

// Function to highlight the key based on gaze position
function highlightKey(x, y) {
  const keys = document.querySelectorAll('.key');
  keys.forEach((key) => {
    const keyRect = key.getBoundingClientRect();
    
    if (x >= keyRect.left && x <= keyRect.right && y >= keyRect.top && y <= keyRect.bottom) {
      key.classList.add('highlighted');
    } else {
      key.classList.remove('highlighted');
    }
  });
}

// Call the startVideo function when the page loads
window.addEventListener('DOMContentLoaded', startVideo);

// Call the startEyeTracking function when the video stream is ready
videoElement.addEventListener('loadeddata', startEyeTracking);
