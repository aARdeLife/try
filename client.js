document.addEventListener('DOMContentLoaded', () => {
  const videoElement = document.getElementById('video');
  const canvasElement = document.getElementById('overlay');
  const canvasContext = canvasElement.getContext('2d');

  // Request permission to access the camera
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
    .then((stream) => {
      videoElement.srcObject = stream;
    })
    .catch((error) => {
      console.error('Error accessing camera:', error);
    });

  // Periodically send video frames to the server for eye tracking analysis
  setInterval(() => {
    canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
    const dataUrl = canvasElement.toDataURL('image/jpeg');

    // Send the dataUrl to the server for eye tracking analysis
    fetch('/eye-tracking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: dataUrl }),
    })
      .then((response) => response.json())
      .then((eyeData) => {
        // Process the eyeData received from the server and update the overlay
        // Add your code here to handle the eyeData and update the overlay on the web page
      })
      .catch((error) => {
        console.error('Error sending data to the server:', error);
      });
  }, 100);
});
