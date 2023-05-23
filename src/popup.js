// Add event listener to the button
document.addEventListener('DOMContentLoaded', function () {
    const printButton = document.getElementById('printButton');
    const cleanButton = document.getElementById('cleanButton');
    const minTime = 10; 
  
    // Attach click event handler to the button
    printButton.addEventListener('click', function () {
      // Send a message to background.js
      chrome.runtime.sendMessage({ action: 'print' });
    });
    
    cleanButton.addEventListener('click', function () {
        // Send a message to background.js
        chrome.runtime.sendMessage({ action: 'clean', minTime });
      });
  });
  