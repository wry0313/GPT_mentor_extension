import { getChatGPTAccessToken } from './background'
import '../static/tailwind.css'

const port = chrome.runtime.connect();

document.addEventListener('DOMContentLoaded', function () {
  // try{
  //   console.debug("hi", await getChatGPTAccessToken());
  // } catch(e) {
  //   if (e.message = 'UNATHORIZED') {
  //       // const errorMessage = document.createElement('p');
  //       // errorMessage.textContent = 'Hi! Unauthorized access. Please authorize by visiting chat.openai.com.';
  //       // document.body.appendChild(errorMessage);
  //   }
  // }
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
      messageContainer.innerHTML = '';
      const lines = msg.text.split('\n'); 
      lines.forEach(line => {
        if (line.trim() !== '') {
          const listItem = document.createElement('li'); // Create <li> element
          listItem.textContent = line; // Set the line text as the content of the <li>
          messageContainer.appendChild(listItem); // Append the <li> to the container
        } else {
          const lineBreak = document.createElement('br'); // Create <br> element
          messageContainer.appendChild(lineBreak); // Append the <br> to the container
        }
      });
      
    }
  }
})




