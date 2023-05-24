import { generateAnswers } from './background'
import '../static/tailwind.css'

const port = chrome.runtime.connect();

document.addEventListener('DOMContentLoaded', function () {
  const printButton = document.getElementById('printButton');
  const cleanButton = document.getElementById('cleanButton');
  const generateButton = document.getElementById('generateButton');
  const messageContainer = document.getElementById('messageContainer');

  const minTime = 10;

  printButton.addEventListener('click', function () {
    port.postMessage({ action: 'printMap' });
  });

  cleanButton.addEventListener('click', function () {
    port.postMessage({ action: 'cleanTimeTracker', minTime });
  });

  generateButton.addEventListener('click', function () {
    port.postMessage({ action: 'generate' });
  });
});

port.onMessage.addListener(function (msg) {
  if (msg.action === 'printPopup') {
    if (messageContainer && msg.text) {
      messageContainer.textContent = msg.text;
    }
  }
})




