let lastTitle = '';
let startTime = null;

const HOW_MANY_SEC_TO_RECORD = 10

// Function to send page title and time spent to the background script
function sendPageData() {
    const pageTitle = document.head.querySelector('title').textContent;
    const currentTime = Date.now();
    if (startTime == null) {
        lastTitle = pageTitle;
        startTime = currentTime;    
    } else {
        const elapsedTime = (currentTime - startTime) / 1000;
        if (pageTitle != lastTitle) {
            if ( elapsedTime > HOW_MANY_SEC_TO_RECORD ) {
                chrome.runtime.sendMessage({ lastTitle, elapsedTime });
            }
            lastTitle = pageTitle;
            startTime = currentTime;   
        }
    }
}

// Send initial page data on content script injection
sendPageData();

// Listen for changes in the page title
const titleObserver = new MutationObserver(sendPageData);
titleObserver.observe(document.head, { subtree: true, childList: true });
