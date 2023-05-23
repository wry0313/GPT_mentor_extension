/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/chatgpt.js":
/*!************************!*\
  !*** ./src/chatgpt.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChatGPTProvider: () => (/* binding */ ChatGPTProvider),
/* harmony export */   getChatGPTAccessToken: () => (/* binding */ getChatGPTAccessToken)
/* harmony export */ });
const ExpiryMap = __webpack_require__(/*! expiry-map */ "./node_modules/expiry-map/dist/index.js");
const cache = new ExpiryMap(10 * 1000);
const KEY_ACCESS_TOKEN = 'accessToken';
async function request(token, method, path, data = undefined) {
  return fetch(`https://chat.openai.com/backend-api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: data === undefined ? undefined : JSON.stringify(data)
  });
}

// async function fetchSSE(
//   resource, options
// )

async function getChatGPTAccessToken() {
  if (cache.get(KEY_ACCESS_TOKEN)) {
    return cache.get(KEY_ACCESS_TOKEN);
  }
  const resp = await fetch('https://chat.openai.com/api/auth/session');
  if (resp.status === 403) {
    throw new Error('CLOUDFLARE');
  }
  const data = await resp.json().catch(() => ({}));
  if (!data.accessToken) {
    throw new Error('UNAUTHORIZED');
  }
  cache.set(KEY_ACCESS_TOKEN, data.accessToken);
  return data.accessToken;
}
class ChatGPTProvider {
  constructor(token) {
    this.token = token;
  }
  async fetchModels() {
    const resp = await request(this.token, 'GET', '/models').then(r => r.json());
    return resp.models;
  }
  async getModelName() {
    try {
      const models = await this.fetchModels();
      return models[0].slug;
    } catch (err) {
      console.error(err);
      return 'text-davinci-002-render';
    }
  }
  async generateAnswer(prompt) {
    const modelName = await this.getModelName();
    console.debug('Using model:', modelName);
    const response = await fetch('https://chat.openai.com/backend-api/conversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      },
      body: JSON.stringify({
        action: 'next',
        messages: [{
          id: "aaa2511b-7914-421d-bf0d-c4d977e3a337",
          author: {
            role: 'user'
          },
          content: {
            content_type: 'text',
            parts: [prompt]
          }
        }],
        model: modelName,
        parent_message_id: "e6e170be-5a4a-411d-863e-3e48ebd7d2d7"
      })
    });
    console.debug(response);
    if (response.ok) {
      const responseBody = await response.text();
      console.log(responseBody);
      console.log();
    } else {
      const errorText = await response.text();
      console.log('Request failed:', response.status);
      console.log('Response body:', errorText);
    }
  }
}

/***/ }),

/***/ "./node_modules/expiry-map/dist/index.js":
/*!***********************************************!*\
  !*** ./node_modules/expiry-map/dist/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const mapAgeCleaner = __webpack_require__(/*! map-age-cleaner */ "./node_modules/map-age-cleaner/dist/index.js");
class ExpiryMap {
    constructor(maxAge, data) {
        this.maxAge = maxAge;
        this[Symbol.toStringTag] = 'Map';
        this.data = new Map();
        // Bootstrap the cleanup process which frees up memory when an item expires
        mapAgeCleaner(this.data);
        if (data) { // tslint:disable-line:early-exit
            for (const [key, value] of data) {
                this.set(key, value);
            }
        }
    }
    get size() {
        return this.data.size;
    }
    clear() {
        this.data.clear();
    }
    delete(key) {
        return this.data.delete(key);
    }
    has(key) {
        return this.data.has(key);
    }
    get(key) {
        const value = this.data.get(key);
        if (value) {
            return value.data;
        }
        return;
    }
    set(key, value) {
        this.data.set(key, {
            maxAge: Date.now() + this.maxAge,
            data: value
        });
        return this;
    }
    values() {
        return this.createIterator(item => item[1].data);
    }
    keys() {
        return this.data.keys();
    }
    entries() {
        return this.createIterator(item => [item[0], item[1].data]);
    }
    forEach(callbackfn, thisArg) {
        for (const [key, value] of this.entries()) {
            callbackfn.apply(thisArg, [value, key, this]);
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    *createIterator(projection) {
        for (const item of this.data.entries()) {
            yield projection(item);
        }
    }
}
module.exports = ExpiryMap;


/***/ }),

/***/ "./node_modules/map-age-cleaner/dist/index.js":
/*!****************************************************!*\
  !*** ./node_modules/map-age-cleaner/dist/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const pDefer = __webpack_require__(/*! p-defer */ "./node_modules/p-defer/index.js");
function mapAgeCleaner(map, property = 'maxAge') {
    let processingKey;
    let processingTimer;
    let processingDeferred;
    const cleanup = async () => {
        if (processingKey !== undefined) {
            // If we are already processing an item, we can safely exit
            return;
        }
        const setupTimer = async (item) => {
            processingDeferred = pDefer();
            const delay = item[1][property] - Date.now();
            if (delay <= 0) {
                // Remove the item immediately if the delay is equal to or below 0
                map.delete(item[0]);
                processingDeferred.resolve();
                return;
            }
            // Keep track of the current processed key
            processingKey = item[0];
            processingTimer = setTimeout(() => {
                // Remove the item when the timeout fires
                map.delete(item[0]);
                if (processingDeferred) {
                    processingDeferred.resolve();
                }
            }, delay);
            // tslint:disable-next-line:strict-type-predicates
            if (typeof processingTimer.unref === 'function') {
                // Don't hold up the process from exiting
                processingTimer.unref();
            }
            return processingDeferred.promise;
        };
        try {
            for (const entry of map) {
                await setupTimer(entry);
            }
        }
        catch (_a) {
            // Do nothing if an error occurs, this means the timer was cleaned up and we should stop processing
        }
        processingKey = undefined;
    };
    const reset = () => {
        processingKey = undefined;
        if (processingTimer !== undefined) {
            clearTimeout(processingTimer);
            processingTimer = undefined;
        }
        if (processingDeferred !== undefined) { // tslint:disable-line:early-exit
            processingDeferred.reject(undefined);
            processingDeferred = undefined;
        }
    };
    const originalSet = map.set.bind(map);
    map.set = (key, value) => {
        if (map.has(key)) {
            // If the key already exist, remove it so we can add it back at the end of the map.
            map.delete(key);
        }
        // Call the original `map.set`
        const result = originalSet(key, value);
        // If we are already processing a key and the key added is the current processed key, stop processing it
        if (processingKey && processingKey === key) {
            reset();
        }
        // Always run the cleanup method in case it wasn't started yet
        cleanup(); // tslint:disable-line:no-floating-promises
        return result;
    };
    cleanup(); // tslint:disable-line:no-floating-promises
    return map;
}
module.exports = mapAgeCleaner;


/***/ }),

/***/ "./node_modules/p-defer/index.js":
/*!***************************************!*\
  !*** ./node_modules/p-defer/index.js ***!
  \***************************************/
/***/ ((module) => {


module.exports = () => {
	const ret = {};

	ret.promise = new Promise((resolve, reject) => {
		ret.resolve = resolve;
		ret.reject = reject;
	});

	return ret;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chatgpt_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chatgpt.js */ "./src/chatgpt.js");
let lastTitle = null;
let startTime = null;
const timeTracker = new Map();

console.log("hello this is background.js");
async function testCode() {
  try {
    const token = await (0,_chatgpt_js__WEBPACK_IMPORTED_MODULE_0__.getChatGPTAccessToken)();
    const provider = new _chatgpt_js__WEBPACK_IMPORTED_MODULE_0__.ChatGPTProvider(token);
    provider.generateAnswer("just say ok");
  } catch (error) {
    console.log('Error:', error);
  }
}
testCode();
function handleActiveTabChange() {
  // Query the currently active tab
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
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
    cleanMap(timeTracker, message.minTime);
  }
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNwQyxPQUFPLElBQUk7RUFDYjtBQUNGO0FBRUEsU0FBU3FELFFBQVFBLENBQUNDLEdBQUcsRUFBRTtFQUNyQkEsR0FBRyxDQUFDQyxPQUFPLENBQUMsQ0FBQ0MsS0FBSyxFQUFFQyxHQUFHLEtBQUs7SUFDMUIxRCxPQUFPLENBQUNvQixHQUFHLENBQUNzQyxHQUFHLEdBQUcsTUFBTSxHQUFHRCxLQUFLLENBQUM7RUFDbkMsQ0FBQyxDQUFDO0FBQ0o7QUFFQSxTQUFTRSxRQUFRQSxDQUFDbkMsV0FBVyxFQUFFb0MsT0FBTyxFQUFFO0VBQ3RDLEtBQUssSUFBSSxDQUFDRixHQUFHLEVBQUVELEtBQUssQ0FBQyxJQUFJakMsV0FBVyxFQUFFO0lBQ3BDLElBQUlpQyxLQUFLLEdBQUdHLE9BQU8sRUFBRTtNQUNuQnBDLFdBQVcsQ0FBQ3FDLE1BQU0sQ0FBQ0gsR0FBRyxDQUFDO0lBQ3pCO0VBQ0Y7QUFDRjs7QUFFQTs7QUFFQTtBQUNBN0IsTUFBTSxDQUFDaUMsT0FBTyxDQUFDQyxTQUFTLENBQUNuQixXQUFXLENBQUMsVUFBVW9CLE9BQU8sRUFBRUMsTUFBTSxFQUFFQyxZQUFZLEVBQUU7RUFDNUUsSUFBSUYsT0FBTyxDQUFDekQsTUFBTSxLQUFLLE9BQU8sRUFBRTtJQUM5QjtJQUNBK0MsUUFBUSxDQUFDOUIsV0FBVyxDQUFDLENBQUMsQ0FBQztFQUN6Qjs7RUFDQSxJQUFJd0MsT0FBTyxDQUFDekQsTUFBTSxLQUFLLE9BQU8sRUFBRTtJQUM5Qm9ELFFBQVEsQ0FBQ25DLFdBQVcsRUFBRXdDLE9BQU8sQ0FBQ0osT0FBTyxDQUFDO0VBQ3hDO0FBQ0YsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vc3JjL2NoYXRncHQuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9leHBpcnktbWFwL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9tYXAtYWdlLWNsZWFuZXIvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL3AtZGVmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9zcmMvYmFja2dyb3VuZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBFeHBpcnlNYXAgPSByZXF1aXJlKCdleHBpcnktbWFwJyk7XG5cbmNvbnN0IGNhY2hlID0gbmV3IEV4cGlyeU1hcCgxMCoxMDAwKTtcbmNvbnN0IEtFWV9BQ0NFU1NfVE9LRU4gPSAnYWNjZXNzVG9rZW4nO1xuXG5hc3luYyBmdW5jdGlvbiByZXF1ZXN0KHRva2VuLCBtZXRob2QsIHBhdGgsIGRhdGEgPSB1bmRlZmluZWQpIHtcbiAgcmV0dXJuIGZldGNoKGBodHRwczovL2NoYXQub3BlbmFpLmNvbS9iYWNrZW5kLWFwaSR7cGF0aH1gLCB7XG4gICAgbWV0aG9kLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICB9LFxuICAgIGJvZHk6IGRhdGEgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICB9KTtcbn1cblxuLy8gYXN5bmMgZnVuY3Rpb24gZmV0Y2hTU0UoXG4vLyAgIHJlc291cmNlLCBvcHRpb25zXG4vLyApXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDaGF0R1BUQWNjZXNzVG9rZW4oKSB7XG4gIGlmIChjYWNoZS5nZXQoS0VZX0FDQ0VTU19UT0tFTikpIHtcbiAgICByZXR1cm4gY2FjaGUuZ2V0KEtFWV9BQ0NFU1NfVE9LRU4pO1xuICB9XG4gIGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9jaGF0Lm9wZW5haS5jb20vYXBpL2F1dGgvc2Vzc2lvbicpO1xuICBpZiAocmVzcC5zdGF0dXMgPT09IDQwMykge1xuICAgIHRocm93IG5ldyBFcnJvcignQ0xPVURGTEFSRScpO1xuICB9XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKTtcbiAgaWYgKCFkYXRhLmFjY2Vzc1Rva2VuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVTkFVVEhPUklaRUQnKTtcbiAgfVxuICBjYWNoZS5zZXQoS0VZX0FDQ0VTU19UT0tFTiwgZGF0YS5hY2Nlc3NUb2tlbik7XG4gIHJldHVybiBkYXRhLmFjY2Vzc1Rva2VuO1xufVxuXG5leHBvcnQgY2xhc3MgQ2hhdEdQVFByb3ZpZGVyIHtcbiAgY29uc3RydWN0b3IodG9rZW4pIHtcbiAgICB0aGlzLnRva2VuID0gdG9rZW47XG4gIH1cblxuICBhc3luYyBmZXRjaE1vZGVscygpIHtcbiAgICBjb25zdCByZXNwID0gYXdhaXQgcmVxdWVzdCh0aGlzLnRva2VuLCAnR0VUJywgJy9tb2RlbHMnKS50aGVuKChyKSA9PiByLmpzb24oKSk7XG4gICAgcmV0dXJuIHJlc3AubW9kZWxzO1xuICB9XG5cbiAgYXN5bmMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtb2RlbHMgPSBhd2FpdCB0aGlzLmZldGNoTW9kZWxzKCk7XG4gICAgICByZXR1cm4gbW9kZWxzWzBdLnNsdWc7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICByZXR1cm4gJ3RleHQtZGF2aW5jaS0wMDItcmVuZGVyJztcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZW5lcmF0ZUFuc3dlcihwcm9tcHQpIHtcbiAgICBjb25zdCBtb2RlbE5hbWUgPSBhd2FpdCB0aGlzLmdldE1vZGVsTmFtZSgpXG4gICAgY29uc29sZS5kZWJ1ZygnVXNpbmcgbW9kZWw6JywgbW9kZWxOYW1lKVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9jaGF0Lm9wZW5haS5jb20vYmFja2VuZC1hcGkvY29udmVyc2F0aW9uJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLnRva2VufWAsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBhY3Rpb246ICduZXh0JyxcbiAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJhYWEyNTExYi03OTE0LTQyMWQtYmYwZC1jNGQ5NzdlM2EzMzdcIixcbiAgICAgICAgICAgIGF1dGhvcjoge3JvbGU6ICd1c2VyJ30sXG4gICAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICAgIGNvbnRlbnRfdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICBwYXJ0czogW3Byb21wdF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIG1vZGVsOiBtb2RlbE5hbWUsXG4gICAgICAgIHBhcmVudF9tZXNzYWdlX2lkOiBcImU2ZTE3MGJlLTVhNGEtNDExZC04NjNlLTNlNDhlYmQ3ZDJkN1wiLFxuICAgICAgfSksXG4gICAgfSk7XG4gICAgY29uc29sZS5kZWJ1ZyhyZXNwb25zZSk7XG4gICAgXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zdCByZXNwb25zZUJvZHkgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUJvZHkpXG4gICAgICBjb25zb2xlLmxvZygpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGVycm9yVGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdSZXF1ZXN0IGZhaWxlZDonLCByZXNwb25zZS5zdGF0dXMpO1xuICAgICAgY29uc29sZS5sb2coJ1Jlc3BvbnNlIGJvZHk6JywgZXJyb3JUZXh0KTtcbiAgICB9ICAgIFxuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmNvbnN0IG1hcEFnZUNsZWFuZXIgPSByZXF1aXJlKFwibWFwLWFnZS1jbGVhbmVyXCIpO1xuY2xhc3MgRXhwaXJ5TWFwIHtcbiAgICBjb25zdHJ1Y3RvcihtYXhBZ2UsIGRhdGEpIHtcbiAgICAgICAgdGhpcy5tYXhBZ2UgPSBtYXhBZ2U7XG4gICAgICAgIHRoaXNbU3ltYm9sLnRvU3RyaW5nVGFnXSA9ICdNYXAnO1xuICAgICAgICB0aGlzLmRhdGEgPSBuZXcgTWFwKCk7XG4gICAgICAgIC8vIEJvb3RzdHJhcCB0aGUgY2xlYW51cCBwcm9jZXNzIHdoaWNoIGZyZWVzIHVwIG1lbW9yeSB3aGVuIGFuIGl0ZW0gZXhwaXJlc1xuICAgICAgICBtYXBBZ2VDbGVhbmVyKHRoaXMuZGF0YSk7XG4gICAgICAgIGlmIChkYXRhKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6ZWFybHktZXhpdFxuICAgICAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLnNpemU7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmRhdGEuY2xlYXIoKTtcbiAgICB9XG4gICAgZGVsZXRlKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmRlbGV0ZShrZXkpO1xuICAgIH1cbiAgICBoYXMoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuaGFzKGtleSk7XG4gICAgfVxuICAgIGdldChrZXkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmRhdGEuZ2V0KGtleSk7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmRhdGEuc2V0KGtleSwge1xuICAgICAgICAgICAgbWF4QWdlOiBEYXRlLm5vdygpICsgdGhpcy5tYXhBZ2UsXG4gICAgICAgICAgICBkYXRhOiB2YWx1ZVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlSXRlcmF0b3IoaXRlbSA9PiBpdGVtWzFdLmRhdGEpO1xuICAgIH1cbiAgICBrZXlzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmtleXMoKTtcbiAgICB9XG4gICAgZW50cmllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlSXRlcmF0b3IoaXRlbSA9PiBbaXRlbVswXSwgaXRlbVsxXS5kYXRhXSk7XG4gICAgfVxuICAgIGZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZykge1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiB0aGlzLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgY2FsbGJhY2tmbi5hcHBseSh0aGlzQXJnLCBbdmFsdWUsIGtleSwgdGhpc10pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRyaWVzKCk7XG4gICAgfVxuICAgICpjcmVhdGVJdGVyYXRvcihwcm9qZWN0aW9uKSB7XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLmRhdGEuZW50cmllcygpKSB7XG4gICAgICAgICAgICB5aWVsZCBwcm9qZWN0aW9uKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBFeHBpcnlNYXA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbmNvbnN0IHBEZWZlciA9IHJlcXVpcmUoXCJwLWRlZmVyXCIpO1xuZnVuY3Rpb24gbWFwQWdlQ2xlYW5lcihtYXAsIHByb3BlcnR5ID0gJ21heEFnZScpIHtcbiAgICBsZXQgcHJvY2Vzc2luZ0tleTtcbiAgICBsZXQgcHJvY2Vzc2luZ1RpbWVyO1xuICAgIGxldCBwcm9jZXNzaW5nRGVmZXJyZWQ7XG4gICAgY29uc3QgY2xlYW51cCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKHByb2Nlc3NpbmdLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gSWYgd2UgYXJlIGFscmVhZHkgcHJvY2Vzc2luZyBhbiBpdGVtLCB3ZSBjYW4gc2FmZWx5IGV4aXRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZXR1cFRpbWVyID0gYXN5bmMgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHByb2Nlc3NpbmdEZWZlcnJlZCA9IHBEZWZlcigpO1xuICAgICAgICAgICAgY29uc3QgZGVsYXkgPSBpdGVtWzFdW3Byb3BlcnR5XSAtIERhdGUubm93KCk7XG4gICAgICAgICAgICBpZiAoZGVsYXkgPD0gMCkge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgaXRlbSBpbW1lZGlhdGVseSBpZiB0aGUgZGVsYXkgaXMgZXF1YWwgdG8gb3IgYmVsb3cgMFxuICAgICAgICAgICAgICAgIG1hcC5kZWxldGUoaXRlbVswXSk7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2luZ0RlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBLZWVwIHRyYWNrIG9mIHRoZSBjdXJyZW50IHByb2Nlc3NlZCBrZXlcbiAgICAgICAgICAgIHByb2Nlc3NpbmdLZXkgPSBpdGVtWzBdO1xuICAgICAgICAgICAgcHJvY2Vzc2luZ1RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBpdGVtIHdoZW4gdGhlIHRpbWVvdXQgZmlyZXNcbiAgICAgICAgICAgICAgICBtYXAuZGVsZXRlKGl0ZW1bMF0pO1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzaW5nRGVmZXJyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2luZ0RlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBkZWxheSk7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6c3RyaWN0LXR5cGUtcHJlZGljYXRlc1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9jZXNzaW5nVGltZXIudW5yZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAvLyBEb24ndCBob2xkIHVwIHRoZSBwcm9jZXNzIGZyb20gZXhpdGluZ1xuICAgICAgICAgICAgICAgIHByb2Nlc3NpbmdUaW1lci51bnJlZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NpbmdEZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBtYXApIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBzZXR1cFRpbWVyKGVudHJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoX2EpIHtcbiAgICAgICAgICAgIC8vIERvIG5vdGhpbmcgaWYgYW4gZXJyb3Igb2NjdXJzLCB0aGlzIG1lYW5zIHRoZSB0aW1lciB3YXMgY2xlYW5lZCB1cCBhbmQgd2Ugc2hvdWxkIHN0b3AgcHJvY2Vzc2luZ1xuICAgICAgICB9XG4gICAgICAgIHByb2Nlc3NpbmdLZXkgPSB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICAgICAgcHJvY2Vzc2luZ0tleSA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHByb2Nlc3NpbmdUaW1lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQocHJvY2Vzc2luZ1RpbWVyKTtcbiAgICAgICAgICAgIHByb2Nlc3NpbmdUaW1lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvY2Vzc2luZ0RlZmVycmVkICE9PSB1bmRlZmluZWQpIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTplYXJseS1leGl0XG4gICAgICAgICAgICBwcm9jZXNzaW5nRGVmZXJyZWQucmVqZWN0KHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBwcm9jZXNzaW5nRGVmZXJyZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IG9yaWdpbmFsU2V0ID0gbWFwLnNldC5iaW5kKG1hcCk7XG4gICAgbWFwLnNldCA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChtYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBrZXkgYWxyZWFkeSBleGlzdCwgcmVtb3ZlIGl0IHNvIHdlIGNhbiBhZGQgaXQgYmFjayBhdCB0aGUgZW5kIG9mIHRoZSBtYXAuXG4gICAgICAgICAgICBtYXAuZGVsZXRlKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2FsbCB0aGUgb3JpZ2luYWwgYG1hcC5zZXRgXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG9yaWdpbmFsU2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAvLyBJZiB3ZSBhcmUgYWxyZWFkeSBwcm9jZXNzaW5nIGEga2V5IGFuZCB0aGUga2V5IGFkZGVkIGlzIHRoZSBjdXJyZW50IHByb2Nlc3NlZCBrZXksIHN0b3AgcHJvY2Vzc2luZyBpdFxuICAgICAgICBpZiAocHJvY2Vzc2luZ0tleSAmJiBwcm9jZXNzaW5nS2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWx3YXlzIHJ1biB0aGUgY2xlYW51cCBtZXRob2QgaW4gY2FzZSBpdCB3YXNuJ3Qgc3RhcnRlZCB5ZXRcbiAgICAgICAgY2xlYW51cCgpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBjbGVhbnVwKCk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICByZXR1cm4gbWFwO1xufVxubW9kdWxlLmV4cG9ydHMgPSBtYXBBZ2VDbGVhbmVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG5cdGNvbnN0IHJldCA9IHt9O1xuXG5cdHJldC5wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHJldC5yZXNvbHZlID0gcmVzb2x2ZTtcblx0XHRyZXQucmVqZWN0ID0gcmVqZWN0O1xuXHR9KTtcblxuXHRyZXR1cm4gcmV0O1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwibGV0IGxhc3RUaXRsZSA9IG51bGw7XG5sZXQgc3RhcnRUaW1lID0gbnVsbDtcbmNvbnN0IHRpbWVUcmFja2VyID0gbmV3IE1hcCgpO1xuXG5pbXBvcnQgeyBDaGF0R1BUUHJvdmlkZXIsIGdldENoYXRHUFRBY2Nlc3NUb2tlbiB9IGZyb20gJy4vY2hhdGdwdC5qcyc7XG5cbmNvbnNvbGUubG9nKFwiaGVsbG8gdGhpcyBpcyBiYWNrZ3JvdW5kLmpzXCIpO1xuXG5hc3luYyBmdW5jdGlvbiB0ZXN0Q29kZSgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldENoYXRHUFRBY2Nlc3NUb2tlbigpO1xuICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IENoYXRHUFRQcm92aWRlcih0b2tlbik7XG4gICAgcHJvdmlkZXIuZ2VuZXJhdGVBbnN3ZXIoXCJqdXN0IHNheSBva1wiKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKCdFcnJvcjonLCBlcnJvcik7XG4gIH1cbn1cbnRlc3RDb2RlKCk7XG5cbmZ1bmN0aW9uIGhhbmRsZUFjdGl2ZVRhYkNoYW5nZSgpIHtcbiAgLy8gUXVlcnkgdGhlIGN1cnJlbnRseSBhY3RpdmUgdGFiXG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uKHRhYnMpIHtcbiAgICAvLyBBY2Nlc3MgdGhlIGFjdGl2ZSB0YWIgb2JqZWN0XG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICAvLyBFeHRyYWN0IHJlbGV2YW50IGluZm9ybWF0aW9uXG4gICAgLy8gdmFyIHRhYlVybCA9IGFjdGl2ZVRhYi51cmw7XG4gICAgdmFyIHRhYlRpdGxlID0gYWN0aXZlVGFiLnRpdGxlO1xuXG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGlmICghbGFzdFRpdGxlKSB7XG4gICAgICAvLyBJZiB0aGVyZSB3YXMgbm8gcHJldmlvdXMgdGFiIHRpdGxlLCBpbml0aWFsaXplIHRoZSBzdGFydCB0aW1lXG4gICAgICBsYXN0VGl0bGUgPSB0YWJUaXRsZTtcbiAgICAgIHN0YXJ0VGltZSA9IGN1cnJlbnRUaW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBlbGFwc2VkVGltZSA9IChjdXJyZW50VGltZSAtIHN0YXJ0VGltZSkgLyAxMDAwO1xuICAgICAgaWYgKHRpbWVUcmFja2VyLmhhcyhsYXN0VGl0bGUpKSB7XG4gICAgICAgIC8vIElmIHRoZSBwcmV2aW91cyB0YWIgdGl0bGUgaXMgYWxyZWFkeSBpbiB0aGUgdGltZVRyYWNrZXIgbWFwLFxuICAgICAgICAvLyB1cGRhdGUgdGhlIHRvdGFsIHRpbWUgYnkgYWRkaW5nIHRoZSBlbGFwc2VkIHRpbWVcbiAgICAgICAgY29uc3QgdG90YWxUaW1lID0gdGltZVRyYWNrZXIuZ2V0KGxhc3RUaXRsZSkgKyBlbGFwc2VkVGltZTtcbiAgICAgICAgdGltZVRyYWNrZXIuc2V0KGxhc3RUaXRsZSwgdG90YWxUaW1lKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobGFzdFRpdGxlLCB0b3RhbFRpbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgdGhlIHByZXZpb3VzIHRhYiB0aXRsZSBpcyBub3QgaW4gdGhlIHRpbWVUcmFja2VyIG1hcCxcbiAgICAgICAgLy8gY3JlYXRlIGEgbmV3IGVudHJ5IHdpdGggdGhlIGVsYXBzZWQgdGltZVxuICAgICAgICB0aW1lVHJhY2tlci5zZXQobGFzdFRpdGxlLCBlbGFwc2VkVGltZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGxhc3RUaXRsZSwgZWxhcHNlZFRpbWUpO1xuICAgICAgfVxuICAgICAgLy8gVXBkYXRlIHRoZSBsYXN0VGl0bGUgYW5kIHN0YXJ0VGltZSBmb3IgdGhlIG5ldyB0YWJcbiAgICAgIGxhc3RUaXRsZSA9IHRhYlRpdGxlO1xuICAgICAgc3RhcnRUaW1lID0gY3VycmVudFRpbWU7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gRXZlbnQgbGlzdGVuZXIgZm9yIHRhYiBhY3RpdmF0aW9uIGNoYW5nZVxuY2hyb21lLnRhYnMub25BY3RpdmF0ZWQuYWRkTGlzdGVuZXIoaGFuZGxlQWN0aXZlVGFiQ2hhbmdlKTtcblxuLy8gRXZlbnQgbGlzdGVuZXIgZm9yIHRhYiB0aXRsZSB1cGRhdGVcbmNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcihmdW5jdGlvbih0YWJJZCwgY2hhbmdlSW5mbywgdGFiKSB7XG4gIGlmIChjaGFuZ2VJbmZvLnRpdGxlKSB7XG4gICAgLy8gSWYgdGhlIHRhYiB0aXRsZSBpcyB1cGRhdGVkLCBjYWxsIHRoZSBoYW5kbGVBY3RpdmVUYWJDaGFuZ2UgZnVuY3Rpb25cbiAgICBoYW5kbGVBY3RpdmVUYWJDaGFuZ2UoKTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGV4dHJhY3RIb3N0bmFtZSh1cmwpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXJzZWRVcmwgPSBuZXcgVVJMKHVybCk7XG4gICAgcmV0dXJuIHBhcnNlZFVybC5ob3N0bmFtZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdJbnZhbGlkIFVSTDonLCBlcnJvcik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJpbnRNYXAobWFwKSB7XG4gIG1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgY29uc29sZS5sb2coa2V5ICsgJyA9PiAnICsgdmFsdWUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY2xlYW5NYXAodGltZVRyYWNrZXIsIG1pblRpbWUpIHtcbiAgZm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIHRpbWVUcmFja2VyKSB7XG4gICAgaWYgKHZhbHVlIDwgbWluVGltZSkge1xuICAgICAgdGltZVRyYWNrZXIuZGVsZXRlKGtleSk7XG4gICAgfVxuICB9XG59XG5cbi8vIEFkZCBldmVudCBsaXN0ZW5lciB0byB0aGUgYnV0dG9uXG5cbi8vIEFkZCBtZXNzYWdlIGxpc3RlbmVyIGluIGJhY2tncm91bmQuanNcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSAncHJpbnQnKSB7XG4gICAgLy8gQ2FsbCB0aGUgcHJpbnRNYXAgZnVuY3Rpb24gaGVyZVxuICAgIHByaW50TWFwKHRpbWVUcmFja2VyKTsgLy8gUmVwbGFjZSBgdGltZVRyYWNrZXJgIHdpdGggeW91ciBhY3R1YWwgbWFwIHZhcmlhYmxlXG4gIH0gXG4gIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gJ2NsZWFuJykge1xuICAgIGNsZWFuTWFwKHRpbWVUcmFja2VyLCBtZXNzYWdlLm1pblRpbWUpXG4gIH1cbn0pOyJdLCJuYW1lcyI6WyJFeHBpcnlNYXAiLCJyZXF1aXJlIiwiY2FjaGUiLCJLRVlfQUNDRVNTX1RPS0VOIiwicmVxdWVzdCIsInRva2VuIiwibWV0aG9kIiwicGF0aCIsImRhdGEiLCJ1bmRlZmluZWQiLCJmZXRjaCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZXRDaGF0R1BUQWNjZXNzVG9rZW4iLCJnZXQiLCJyZXNwIiwic3RhdHVzIiwiRXJyb3IiLCJqc29uIiwiY2F0Y2giLCJhY2Nlc3NUb2tlbiIsInNldCIsIkNoYXRHUFRQcm92aWRlciIsImNvbnN0cnVjdG9yIiwiZmV0Y2hNb2RlbHMiLCJ0aGVuIiwiciIsIm1vZGVscyIsImdldE1vZGVsTmFtZSIsInNsdWciLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJnZW5lcmF0ZUFuc3dlciIsInByb21wdCIsIm1vZGVsTmFtZSIsImRlYnVnIiwicmVzcG9uc2UiLCJhY3Rpb24iLCJtZXNzYWdlcyIsImlkIiwiYXV0aG9yIiwicm9sZSIsImNvbnRlbnQiLCJjb250ZW50X3R5cGUiLCJwYXJ0cyIsIm1vZGVsIiwicGFyZW50X21lc3NhZ2VfaWQiLCJvayIsInJlc3BvbnNlQm9keSIsInRleHQiLCJsb2ciLCJlcnJvclRleHQiLCJsYXN0VGl0bGUiLCJzdGFydFRpbWUiLCJ0aW1lVHJhY2tlciIsIk1hcCIsInRlc3RDb2RlIiwicHJvdmlkZXIiLCJoYW5kbGVBY3RpdmVUYWJDaGFuZ2UiLCJjaHJvbWUiLCJ0YWJzIiwicXVlcnkiLCJhY3RpdmUiLCJjdXJyZW50V2luZG93IiwiYWN0aXZlVGFiIiwidGFiVGl0bGUiLCJ0aXRsZSIsImN1cnJlbnRUaW1lIiwiRGF0ZSIsIm5vdyIsImVsYXBzZWRUaW1lIiwiaGFzIiwidG90YWxUaW1lIiwib25BY3RpdmF0ZWQiLCJhZGRMaXN0ZW5lciIsIm9uVXBkYXRlZCIsInRhYklkIiwiY2hhbmdlSW5mbyIsInRhYiIsImV4dHJhY3RIb3N0bmFtZSIsInVybCIsInBhcnNlZFVybCIsIlVSTCIsImhvc3RuYW1lIiwicHJpbnRNYXAiLCJtYXAiLCJmb3JFYWNoIiwidmFsdWUiLCJrZXkiLCJjbGVhbk1hcCIsIm1pblRpbWUiLCJkZWxldGUiLCJydW50aW1lIiwib25NZXNzYWdlIiwibWVzc2FnZSIsInNlbmRlciIsInNlbmRSZXNwb25zZSJdLCJzb3VyY2VSb290IjoiIn0=