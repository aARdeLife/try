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
