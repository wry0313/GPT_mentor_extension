document.addEventListener('DOMContentLoaded', function () {
    const printButton = document.getElementById('printButton');
    const cleanButton = document.getElementById('cleanButton');
    const minTime = 10; 
  
    printButton.addEventListener('click', function () {
      chrome.runtime.sendMessage({ action: 'print' });
    });
    
    cleanButton.addEventListener('click', function () {
        chrome.runtime.sendMessage({ action: 'clean', minTime });
      });
  });
  