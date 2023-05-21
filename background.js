// background.js

// Array to store visited tab URLs
let visitedTabs = [];

// Add message listener
chrome.runtime.onMessage.addListener(handleMessage);

// Function to handle messages from content script
function handleMessage(message, sender, sendResponse) {
  visitedTabs.push(message);
  console.log('Visited Tabs:', visitedTabs);
}
