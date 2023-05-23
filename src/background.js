import { ChatGPTProvider, getChatGPTAccessToken, sendMessageFeedback } from './chatgpt'

let lastTitle = null;
let startTime = null;
const timeTracker = new Map();

async function generateAnswers (question) { 
  const token = await getChatGPTAccessToken()
  const provider = new ChatGPTProvider(token)
  const controller = new AbortController()

  // port.onDisconnect.addListener(() => {
  //   controller.abort()
  //   cleanup?.()
  // })
  const { cleanup } = await provider.generateAnswer({
    prompt: question,
    signal: controller.signal,
    onEvent(event) {
      if (event.type === 'done') {
        // port.postMessage({ event: 'DONE' })
        return
      }
      // port.postMessage(event.data);
      console.log(event.data.text)
    },
  })
}

console.log("background.js running");
// generateAnswers("hi?");

function handleActiveTabChange() {
  // Query the currently active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
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
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
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

function toString(map) {
  const arr = [];
  map.forEach((value, key) => {
    arr.push(key + " used for " + value + " seconds");
  });
  return arr.join(', ');
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
    printMap(timeTracker);
    const str = toString(timeTracker);
    console.log("str: ",str);
    const instruction = "in the perspective of a mentor or guru to allow the user to understand what the user's focus is on and what the user roughly accomplished today make sure to NOT include the seconds of usage but instead just use the seconds for your own reference to the user's focus. limit to 100-200 words and make necessary suggestions on what to do to make user improve: ";
    generateAnswers(instruction + str);
  }
  if (message.action === 'clean') {
    cleanMap(timeTracker, message.minTime)
  }
});