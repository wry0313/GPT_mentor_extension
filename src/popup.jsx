import { getChatGPTAccessToken } from './background'
import '../static/tailwind.css'
import React from "react";
import ReactDOM from "react-dom/client"

function Popup() {
  return (
    <div className="my-2 w-96 flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-center text-blue-500 mb-10">
        <span className="text-cyan-500">Daily</span> <span className="text-blue-500">Guru</span>
      </h1>
      <button id="printButton" type="button"
        className="px-6 py-3 mb-4 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg">
        Print Website Usages
      </button>
      <button id="generateButton"
        className="px-6 py-3 mb-4 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg">
        Generate Report
      </button>
      <button id="cleanButton"
        className="px-6 py-3 mb-4 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg">
    Record only 10 sec
      </button>
      <div id="messageContainer" className="text-center text-gray-700 text-lg">
        Waiting for input....
      </div>
    </div>
  )
}

const port = chrome.runtime.connect();

document.addEventListener('DOMContentLoaded', function () {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Popup />)
 
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




 // try{
  //   console.debug("hi", await getChatGPTAccessToken());
  // } catch(e) {
  //   if (e.message = 'UNATHORIZED') {
  //       // const errorMessage = document.createElement('p');
  //       // errorMessage.textContent = 'Hi! Unauthorized access. Please authorize by visiting chat.openai.com.';
  //       // document.body.appendChild(errorMessage);
  //   }
  // }