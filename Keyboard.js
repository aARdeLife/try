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

// Function to handle tapping on the screen and select the highlighted key
function handleTap(event) {
  const tappedElement = document.elementFromPoint(event.clientX, event.clientY);
  
  if (tappedElement.classList.contains('key')) {
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

// Add an event listener to the document to handle tapping on the screen
document.addEventListener('click', handleTap);

// Add the remaining code from your previous implementation here
document.addEventListener('DOMContentLoaded', () => {
  const keys = document.querySelectorAll('.key');
  const textbox = document.getElementById('textInput');
  const voiceButton = document.getElementById('voiceButton');

  keys.forEach((key) => {
    key.addEventListener('click', () => {
      const keyValue = key.dataset.key;

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
    });
  });

  voiceButton.addEventListener('click', () => {
    // Handle voice typing functionality here
    // Add your code to start voice recognition
  });
});
