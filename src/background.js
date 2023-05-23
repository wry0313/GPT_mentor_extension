let lastTitle = null;
let startTime = null;
const timeTracker = new Map();

import { ChatGPTProvider, getChatGPTAccessToken } from './chatgpt.js';

console.log("hello this is background.js");

async function testCode() {
  try {
    const token = await getChatGPTAccessToken();
    const provider = new ChatGPTProvider(token);
    provider.generateAnswer("just say ok")
  } catch (error) {
    console.log('Error:', error);
  }
}
testCode();

function handleActiveTabChange() {
  // Query the currently active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    // Access the active tab object
    var activeTab = tabs[0];

    // Extract relevant information
    // var tabUrl = activeTab.url;
    var tabTitle = activeTab.title;

    const currentTime = Date.now();
    if (!lastTitle) {
      // If there was no previous tab title, initialize the start time
      lastTitle = tabTitle;
      startTime = currentTime;
    } else {
      const elapsedTime = (currentTime - startTime) / 1000;
      if (timeTracker.has(lastTitle)) {
        // If the previous tab title is already in the timeTracker map,
        // update the total time by adding the elapsed time
        const totalTime = timeTracker.get(lastTitle) + elapsedTime;
        timeTracker.set(lastTitle, totalTime);
        // console.log(lastTitle, totalTime);
      } else {
        // If the previous tab title is not in the timeTracker map,
        // create a new entry with the elapsed time
        timeTracker.set(lastTitle, elapsedTime);
        // console.log(lastTitle, elapsedTime);
      }
      // Update the lastTitle and startTime for the new tab
      lastTitle = tabTitle;
      startTime = currentTime;
    }
  });
}

// Event listener for tab activation change
chrome.tabs.onActivated.addListener(handleActiveTabChange);

// Event listener for tab title update
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.title) {
    // If the tab title is updated, call the handleActiveTabChange function
    handleActiveTabChange();
  }
});

function extractHostname(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
}

function printMap(map) {
  map.forEach((value, key) => {
    console.log(key + ' => ' + value);
  });
}

function cleanMap(timeTracker, minTime) {
  for (let [key, value] of timeTracker) {
    if (value < minTime) {
      timeTracker.delete(key);
    }
  }
}

// Add event listener to the button

// Add message listener in background.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'print') {
    // Call the printMap function here
    printMap(timeTracker); // Replace `timeTracker` with your actual map variable
  } 
  if (message.action === 'clean') {
    cleanMap(timeTracker, message.minTime)
  }
});