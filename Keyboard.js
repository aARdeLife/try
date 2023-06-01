// Function to start the video stream from the front-facing camera
async function startVideo() {
  const videoElement = document.getElementById('video');
  
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
    videoElement.srcObject = stream;
  } catch (error) {
    console.error('Error accessing camera:', error);
  }
}

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

// Function to handle tapping on the screen and select the highlighted key
function handleTap(event) {
  const tappedElement = document.elementFromPoint(event.clientX, event.clientY);
  const textbox = document.getElementById('textbox');
  
  if (tappedElement.classList.contains('key') && tappedElement.classList.contains('highlighted')) {
    const keyValue = tappedElement.dataset.key;

    if (keyValue === 'Space') {
      textbox.value += ' ';
    } else if (keyValue === 'Delete') {
      textbox.value = textbox.value.slice(0, -1);
    } else if (keyValue === 'Enter') {
      textbox.value += '\n';
    } else if (keyValue === 'Ctrl') {
      // Handle Ctrl key functionality
      // Add your code here
    } else if (keyValue === 'Voice') {
      // Handle Voice key functionality
      // Add your code here
    } else {
      textbox.value += keyValue;
    }
  }
}

// Call the startVideo function when the page loads
window.addEventListener('DOMContentLoaded', startVideo);

// Call the startEyeTracking function when the page loads
window.addEventListener('DOMContentLoaded', startEyeTracking);

// Add an event listener to the document to handle tapping on the screen
document.addEventListener('click', handleTap);


// Call the startVideo function when the page loads
window.addEventListener('DOMContentLoaded', startVideo);

// Call the startEyeTracking function when the video stream is ready
videoElement.addEventListener('loadeddata', startEyeTracking);
