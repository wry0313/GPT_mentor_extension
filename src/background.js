import { ChatGPTProvider, getChatGPTAccessToken, sendMessageFeedback } from './chatgpt'
console.debug("background.js running");

let lastTitle = null;
let startTime = null;
const timeTracker = new Map();


export async function generateAnswers(port, question) {
  const token = await getChatGPTAccessToken()
  const provider = new ChatGPTProvider(token)
  const controller = new AbortController()

  const { cleanup } = await provider.generateAnswer({
    prompt: question,
    signal: controller.signal,
    onEvent(event) {
      if (event.type === 'done') {
        port.postMessage({ event: 'DONE' })
        return
      }
      port.postMessage({ action: 'printPopup', text: event.data.text });
      // console.debug("debug", event.data.text)
    },
  })
  port.onDisconnect.addListener(() => {
    controller.abort()
   cleanup?.();
  })
}

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(async (msg) => {
    console.debug('background received msg', msg)
    if (msg.action === 'printMap') {
      // Call the printMap function here
      printMap(timeTracker);
      port.postMessage({ action: 'printPopup', text: toString(timeTracker) });
    }
    else if (msg.action === 'generate') {
      const str = toString(timeTracker);
      console.debug("toString TimeTracker: ", str);
      const instruction = "in the perspective of a mentor or guru to allow the user to understand what the user's focus is on and what the user roughly accomplished today make sure to NOT include the seconds of usage but instead just use the seconds for your own reference to the user's focus. limit to 100-200 words and make necessary suggestions on what to do to make user improve: ";
      try {
        await generateAnswers(port, instruction + str)
      } catch (err) {
        console.log("ERROR: ", err);
      }
    }
    else if (msg.action === 'cleanTimeTracker') {
      let count = cleanMap(timeTracker, msg.minTime)
      port.postMessage({ action: 'printPopup', text: "map cleaned " + count + " items" });
    }
  });
});

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
      } else {
        // If the previous tab title is not in the timeTracker map,
        // create a new entry with the elapsed time
        timeTracker.set(lastTitle, elapsedTime);
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

function printMap(map) {
  map.forEach((value, key) => {
    console.debug(key + ' => ' + value);
  });
}

function toString(map) {
  const arr = [];
  map.forEach((value, key) => {
    arr.push(key + " used for " + value + " seconds");
  });
  if (arr.length) {
    return arr.join(', ');
  } else {
    return "no tab recorded";
  }
  
}


function cleanMap(map, minTime) {
  let count = 0;
  map.forEach((value, key) => {
    if (value < minTime) {
      timeTracker.delete(key);
      count += 1;
    }
  });
  return count;
}

