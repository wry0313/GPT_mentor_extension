import { ChatGPTProvider, getChatGPTAccessToken } from './chatgpt'
console.debug("background.js running");

let lastTitle = null;
let startTime = null;
let timeTracker = new Map();

// Load existing time tracker data from local storage, if available
chrome.storage.local.get('timeTracker', (result) => {
  if (result.timeTracker) {
    timeTracker = new Map(result.timeTracker);
  }
});

// Save time tracker data to local storage whenever it is updated
function saveTimeTracker() {
  console.log("set")
  chrome.storage.local.set({ 'timeTracker': Array.from(timeTracker) });
}

export async function generateAnswers(port, question) {
  const token = await getChatGPTAccessToken()
  const provider = new ChatGPTProvider(token)
  const controller = new AbortController()
  port.onDisconnect.addListener(() => {
    console.debug("generate answer PORT DISCONNECTED")
    controller.abort()
    cleanup?.();
  })

  const { cleanup } = await provider.generateAnswer({
    prompt: question,
    signal: controller.signal,
    onEvent(event) {
      if (event.type === 'done') {
        port.postMessage({ event: 'DONE' })
        console.log("done sent")
        return
      }
      port.postMessage({ mentorOutput: event.data.text });
    },
  })
}


chrome.runtime.onConnect.addListener((port) => {
  console.debug("PORT CONNECTED")
  port.onMessage.addListener(async (msg) => {
    console.debug('background received msg', msg)
    if (msg.action === 'print map') {
      printMap(timeTracker);
      port.postMessage({ timeTracker: Array.from(timeTracker) });
    }
    else if (msg.action === 'generate') {
      const instruction = "in the perspective of a mentor, help the user to understand what the user's focus is on and what the user roughly accomplished today. limit to 100-200 words and make necessary suggestions on what to do to make user improve and also give a productivity rating out of 100: ";
      try {
        await generateAnswers(port, instruction + toString(timeTracker))
      } catch (err) {
        console.debug(err);
        try {
          port.postMessage({ error: err.message })
        } catch (_) {
          console.log('Error: Port is disconnected');
        }
      }
    }
    else if (msg.action === 'clean time tracker') {
      let count = cleanMap(msg.minTime)
      port.postMessage({ mapCleanedText: "map cleaned " + count + " items" });
    } 
    else if (msg.action === 'reset') {
      let count = resetMap();
      port.postMessage({ mapCleanedText: "map cleaned " + count + " items" });
    }
  });
  port.onDisconnect.addListener((port) => {
    console.debug("PORT DISCONNECTED")
  });  
});

function handleActiveTabChange() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    var tabTitle = activeTab.title;
    const currentTime = Date.now();
    if (!lastTitle) {
      lastTitle = tabTitle;
      startTime = currentTime;
    } else {
      const elapsedTime = (currentTime - startTime) / 1000;
      if (timeTracker.has(lastTitle)) {
        const totalTime = timeTracker.get(lastTitle) + elapsedTime;
        timeTracker.set(lastTitle, totalTime);
      } else {
        timeTracker.set(lastTitle, elapsedTime);
      }
      lastTitle = tabTitle;
      startTime = currentTime;
    }
  });
  saveTimeTracker();
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

export function toString(map) {
  console.log(map);
  const arr = [];
  map.forEach((value, key) => {
    arr.push(key + " used for " + value + " seconds");
  });
  if (arr.length) {
    return arr.join('\n');
  } else {
    return "no tab recorded";
  }
}


function cleanMap(minTime) {
  let count = 0;
  timeTracker.forEach((value, key) => {
    if (value < minTime) {
      timeTracker.delete(key);
      count += 1;
    }
  });
  saveTimeTracker();
  return count;
}

function resetMap() {
  let count = timeTracker.size
  timeTracker = new Map();
  saveTimeTracker();
  return count;
}

