// Start the video stream from the front-facing camera
async function startVideo() {
  const videoElement = document.getElementById('video');

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
    videoElement.srcObject = stream;
  } catch (error) {
    console.error('Error accessing camera:', error);
  }
}

// Start the eye tracking
async function startEyeTracking() {
  const videoElement = document.getElementById('video');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const keyboard = document.getElementById('keyboard');
  const keys = keyboard.getElementsByClassName('key');

  const model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
    { maxFaces: 1 }
  );

  function highlightKey(index) {
    for (let i = 0; i < keys.length; i++) {
      if (i === index) {
        keys[i].classList.add('active');
      } else {
        keys[i].classList.remove('active');
      }
    }
  }

  function detectEyes(landmarks) {
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    const eyesCenterX = (leftEye[0][0] + rightEye[3][0]) / 2;
    const eyesCenterY = (leftEye[0][1] + rightEye[3][1]) / 2;

    highlightKey(getKeyIndex(eyesCenterX, eyesCenterY));
  }

  function getKeyIndex(x, y) {
    const keyboardRect = keyboard.getBoundingClientRect();
    const keyWidth = keyboardRect.width / 10;
    const keyHeight = keyboardRect.height / 4;

    const relativeX = x - keyboardRect.left;
    const relativeY = y - keyboardRect.top;

    const col = Math.floor(relativeX / keyWidth);
    const row = Math.floor(relativeY / keyHeight);

    return row * 10 + col;
  }

  function handleTap(event) {
    const tappedElement = document.elementFromPoint(event.clientX, event.clientY);

    if (tappedElement.classList.contains('key')) {
      const keyValue = tappedElement.dataset.key;
      const textbox = document.getElementById('textbox');
      textbox.value += keyValue;
    }
  }

  function processFrame() {
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const image = tf.browser.fromPixels(canvas);
    const predictions = model.estimateFaces({ input: image, returnTensors: false });
    image.dispose();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (predictions.length > 0) {
      const landmarks = predictions[0].scaledMesh;
      detectEyes(landmarks);
    }

    requestAnimationFrame(processFrame);
  }

  canvas.width = videoElement.width;
  canvas.height = videoElement.height;

  document.addEventListener('click', handleTap);

  processFrame();
}

// Call the startVideo function when the page loads
window.addEventListener('DOMContentLoaded', () => {
  startVideo();
  startEyeTracking();
});
