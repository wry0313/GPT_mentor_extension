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
/* harmony import */ var expiry_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! expiry-map */ "./node_modules/expiry-map/dist/index.js");
/* harmony import */ var expiry_map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(expiry_map__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");


const cache = new (expiry_map__WEBPACK_IMPORTED_MODULE_0___default())(10 * 1000);
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
          id: (0,uuid__WEBPACK_IMPORTED_MODULE_1__["default"])(),
          author: {
            role: 'user'
          },
          content: {
            content_type: 'text',
            parts: [prompt]
          }
        }],
        model: modelName,
        parent_message_id: (0,uuid__WEBPACK_IMPORTED_MODULE_1__["default"])()
      })
    });
    console.debug(response);
    if (response.ok) {
      const responseBody = await response.text();
      console.log(responseBody);
      processData(responseBody);
    } else {
      const errorText = await response.text();
      console.log('Request failed:', response.status);
      console.log('Response body:', errorText);
    }
  }
}
function processData(data) {
  let lines = data.split('\n');
  // console.log(lines);
  while (!lines.pop().includes('DONE')) {
    lines.pop();
    // console.log("pop")
  }

  const lastLine = lines[lines.length - 2];
  // console.log(lastLine);
  // console.log("hello")

  let lastData;
  try {
    lastData = JSON.parse(lastLine.replace('data: ', ''));
    console.log(lastData.message.content.parts[0]);
  } catch (err) {
    console.error(err);
    return;
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


/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
    provider.generateAnswer("write a code that can solve floodfill");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFBVXZCLE9BQU8sRUFBRTJDLE1BQU0sRUFBRUMsWUFBWSxFQUFFO0VBQzVFLElBQUk1QyxPQUFPLENBQUN6QixNQUFNLEtBQUssT0FBTyxFQUFFO0lBQzlCO0lBQ0EwRCxRQUFRLENBQUM5QixXQUFXLENBQUMsQ0FBQyxDQUFDO0VBQ3pCOztFQUNBLElBQUlILE9BQU8sQ0FBQ3pCLE1BQU0sS0FBSyxPQUFPLEVBQUU7SUFDOUIrRCxRQUFRLENBQUNuQyxXQUFXLEVBQUVILE9BQU8sQ0FBQ3VDLE9BQU8sQ0FBQztFQUN4QztBQUNGLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL3NyYy9jaGF0Z3B0LmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvZXhwaXJ5LW1hcC9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbWFwLWFnZS1jbGVhbmVyL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9wLWRlZmVyL2luZGV4LmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y0LmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9zcmMvYmFja2dyb3VuZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXhwaXJ5TWFwIGZyb20gJ2V4cGlyeS1tYXAnXG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJ1xuXG5jb25zdCBjYWNoZSA9IG5ldyBFeHBpcnlNYXAoMTAqMTAwMCk7XG5jb25zdCBLRVlfQUNDRVNTX1RPS0VOID0gJ2FjY2Vzc1Rva2VuJztcblxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdCh0b2tlbiwgbWV0aG9kLCBwYXRoLCBkYXRhID0gdW5kZWZpbmVkKSB7XG4gIHJldHVybiBmZXRjaChgaHR0cHM6Ly9jaGF0Lm9wZW5haS5jb20vYmFja2VuZC1hcGkke3BhdGh9YCwge1xuICAgIG1ldGhvZCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgfSxcbiAgICBib2R5OiBkYXRhID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgfSk7XG59XG5cbi8vIGFzeW5jIGZ1bmN0aW9uIGZldGNoU1NFKFxuLy8gICByZXNvdXJjZSwgb3B0aW9uc1xuLy8gKVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q2hhdEdQVEFjY2Vzc1Rva2VuKCkge1xuICBpZiAoY2FjaGUuZ2V0KEtFWV9BQ0NFU1NfVE9LRU4pKSB7XG4gICAgcmV0dXJuIGNhY2hlLmdldChLRVlfQUNDRVNTX1RPS0VOKTtcbiAgfVxuICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vY2hhdC5vcGVuYWkuY29tL2FwaS9hdXRoL3Nlc3Npb24nKTtcbiAgaWYgKHJlc3Auc3RhdHVzID09PSA0MDMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NMT1VERkxBUkUnKTtcbiAgfVxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcC5qc29uKCkuY2F0Y2goKCkgPT4gKHt9KSk7XG4gIGlmICghZGF0YS5hY2Nlc3NUb2tlbikge1xuICAgIHRocm93IG5ldyBFcnJvcignVU5BVVRIT1JJWkVEJyk7XG4gIH1cbiAgY2FjaGUuc2V0KEtFWV9BQ0NFU1NfVE9LRU4sIGRhdGEuYWNjZXNzVG9rZW4pO1xuICByZXR1cm4gZGF0YS5hY2Nlc3NUb2tlbjtcbn1cblxuZXhwb3J0IGNsYXNzIENoYXRHUFRQcm92aWRlciB7XG4gIGNvbnN0cnVjdG9yKHRva2VuKSB7XG4gICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICB9XG5cbiAgYXN5bmMgZmV0Y2hNb2RlbHMoKSB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IHJlcXVlc3QodGhpcy50b2tlbiwgJ0dFVCcsICcvbW9kZWxzJykudGhlbigocikgPT4gci5qc29uKCkpO1xuICAgIHJldHVybiByZXNwLm1vZGVscztcbiAgfVxuXG4gIGFzeW5jIGdldE1vZGVsTmFtZSgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbW9kZWxzID0gYXdhaXQgdGhpcy5mZXRjaE1vZGVscygpO1xuICAgICAgcmV0dXJuIG1vZGVsc1swXS5zbHVnO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuICd0ZXh0LWRhdmluY2ktMDAyLXJlbmRlcic7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2VuZXJhdGVBbnN3ZXIocHJvbXB0KSB7XG4gICAgY29uc3QgbW9kZWxOYW1lID0gYXdhaXQgdGhpcy5nZXRNb2RlbE5hbWUoKVxuICAgIGNvbnNvbGUuZGVidWcoJ1VzaW5nIG1vZGVsOicsIG1vZGVsTmFtZSlcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vY2hhdC5vcGVuYWkuY29tL2JhY2tlbmQtYXBpL2NvbnZlcnNhdGlvbicsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy50b2tlbn1gLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYWN0aW9uOiAnbmV4dCcsXG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6IHV1aWR2NCgpLFxuICAgICAgICAgICAgYXV0aG9yOiB7cm9sZTogJ3VzZXInfSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgY29udGVudF90eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgIHBhcnRzOiBbcHJvbXB0XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgbW9kZWw6IG1vZGVsTmFtZSxcbiAgICAgICAgcGFyZW50X21lc3NhZ2VfaWQ6IHV1aWR2NCgpLFxuICAgICAgfSksXG4gICAgfSk7XG4gICAgY29uc29sZS5kZWJ1ZyhyZXNwb25zZSk7XG4gICAgXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zdCByZXNwb25zZUJvZHkgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUJvZHkpXG4gICAgICBwcm9jZXNzRGF0YShyZXNwb25zZUJvZHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBlcnJvclRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICBjb25zb2xlLmxvZygnUmVxdWVzdCBmYWlsZWQ6JywgcmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgIGNvbnNvbGUubG9nKCdSZXNwb25zZSBib2R5OicsIGVycm9yVGV4dCk7XG4gICAgfSAgICBcbiAgfVxufVxuXG5mdW5jdGlvbiBwcm9jZXNzRGF0YShkYXRhKSB7XG4gIGxldCBsaW5lcyA9IGRhdGEuc3BsaXQoJ1xcbicpO1xuICAvLyBjb25zb2xlLmxvZyhsaW5lcyk7XG4gIHdoaWxlICghbGluZXMucG9wKCkuaW5jbHVkZXMoJ0RPTkUnKSkge1xuICAgIGxpbmVzLnBvcCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwicG9wXCIpXG4gIH1cbiAgY29uc3QgbGFzdExpbmUgPSBsaW5lc1tsaW5lcy5sZW5ndGggLSAyXTtcbiAgLy8gY29uc29sZS5sb2cobGFzdExpbmUpO1xuICAvLyBjb25zb2xlLmxvZyhcImhlbGxvXCIpXG4gIFxuICBsZXQgbGFzdERhdGE7XG4gIHRyeSB7XG4gICAgbGFzdERhdGEgPSBKU09OLnBhcnNlKGxhc3RMaW5lLnJlcGxhY2UoJ2RhdGE6ICcsICcnKSk7XG4gICAgY29uc29sZS5sb2cobGFzdERhdGEubWVzc2FnZS5jb250ZW50LnBhcnRzWzBdKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIHJldHVybjtcbiAgfVxuICBcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCBtYXBBZ2VDbGVhbmVyID0gcmVxdWlyZShcIm1hcC1hZ2UtY2xlYW5lclwiKTtcbmNsYXNzIEV4cGlyeU1hcCB7XG4gICAgY29uc3RydWN0b3IobWF4QWdlLCBkYXRhKSB7XG4gICAgICAgIHRoaXMubWF4QWdlID0gbWF4QWdlO1xuICAgICAgICB0aGlzW1N5bWJvbC50b1N0cmluZ1RhZ10gPSAnTWFwJztcbiAgICAgICAgdGhpcy5kYXRhID0gbmV3IE1hcCgpO1xuICAgICAgICAvLyBCb290c3RyYXAgdGhlIGNsZWFudXAgcHJvY2VzcyB3aGljaCBmcmVlcyB1cCBtZW1vcnkgd2hlbiBhbiBpdGVtIGV4cGlyZXNcbiAgICAgICAgbWFwQWdlQ2xlYW5lcih0aGlzLmRhdGEpO1xuICAgICAgICBpZiAoZGF0YSkgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmVhcmx5LWV4aXRcbiAgICAgICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGRhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zaXplO1xuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5kYXRhLmNsZWFyKCk7XG4gICAgfVxuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kZWxldGUoa2V5KTtcbiAgICB9XG4gICAgaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmhhcyhrZXkpO1xuICAgIH1cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5kYXRhLmdldChrZXkpO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5kYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNldChrZXksIHtcbiAgICAgICAgICAgIG1heEFnZTogRGF0ZS5ub3coKSArIHRoaXMubWF4QWdlLFxuICAgICAgICAgICAgZGF0YTogdmFsdWVcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUl0ZXJhdG9yKGl0ZW0gPT4gaXRlbVsxXS5kYXRhKTtcbiAgICB9XG4gICAga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5rZXlzKCk7XG4gICAgfVxuICAgIGVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUl0ZXJhdG9yKGl0ZW0gPT4gW2l0ZW1bMF0sIGl0ZW1bMV0uZGF0YV0pO1xuICAgIH1cbiAgICBmb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcpIHtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgdGhpcy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrZm4uYXBwbHkodGhpc0FyZywgW3ZhbHVlLCBrZXksIHRoaXNdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50cmllcygpO1xuICAgIH1cbiAgICAqY3JlYXRlSXRlcmF0b3IocHJvamVjdGlvbikge1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5kYXRhLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgeWllbGQgcHJvamVjdGlvbihpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gRXhwaXJ5TWFwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCBwRGVmZXIgPSByZXF1aXJlKFwicC1kZWZlclwiKTtcbmZ1bmN0aW9uIG1hcEFnZUNsZWFuZXIobWFwLCBwcm9wZXJ0eSA9ICdtYXhBZ2UnKSB7XG4gICAgbGV0IHByb2Nlc3NpbmdLZXk7XG4gICAgbGV0IHByb2Nlc3NpbmdUaW1lcjtcbiAgICBsZXQgcHJvY2Vzc2luZ0RlZmVycmVkO1xuICAgIGNvbnN0IGNsZWFudXAgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmIChwcm9jZXNzaW5nS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGFyZSBhbHJlYWR5IHByb2Nlc3NpbmcgYW4gaXRlbSwgd2UgY2FuIHNhZmVseSBleGl0XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2V0dXBUaW1lciA9IGFzeW5jIChpdGVtKSA9PiB7XG4gICAgICAgICAgICBwcm9jZXNzaW5nRGVmZXJyZWQgPSBwRGVmZXIoKTtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gaXRlbVsxXVtwcm9wZXJ0eV0gLSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKGRlbGF5IDw9IDApIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGl0ZW0gaW1tZWRpYXRlbHkgaWYgdGhlIGRlbGF5IGlzIGVxdWFsIHRvIG9yIGJlbG93IDBcbiAgICAgICAgICAgICAgICBtYXAuZGVsZXRlKGl0ZW1bMF0pO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NpbmdEZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gS2VlcCB0cmFjayBvZiB0aGUgY3VycmVudCBwcm9jZXNzZWQga2V5XG4gICAgICAgICAgICBwcm9jZXNzaW5nS2V5ID0gaXRlbVswXTtcbiAgICAgICAgICAgIHByb2Nlc3NpbmdUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgaXRlbSB3aGVuIHRoZSB0aW1lb3V0IGZpcmVzXG4gICAgICAgICAgICAgICAgbWFwLmRlbGV0ZShpdGVtWzBdKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc2luZ0RlZmVycmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NpbmdEZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnN0cmljdC10eXBlLXByZWRpY2F0ZXNcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvY2Vzc2luZ1RpbWVyLnVucmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgLy8gRG9uJ3QgaG9sZCB1cCB0aGUgcHJvY2VzcyBmcm9tIGV4aXRpbmdcbiAgICAgICAgICAgICAgICBwcm9jZXNzaW5nVGltZXIudW5yZWYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzaW5nRGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgbWFwKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2V0dXBUaW1lcihlbnRyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGFuIGVycm9yIG9jY3VycywgdGhpcyBtZWFucyB0aGUgdGltZXIgd2FzIGNsZWFuZWQgdXAgYW5kIHdlIHNob3VsZCBzdG9wIHByb2Nlc3NpbmdcbiAgICAgICAgfVxuICAgICAgICBwcm9jZXNzaW5nS2V5ID0gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgICAgIHByb2Nlc3NpbmdLZXkgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChwcm9jZXNzaW5nVGltZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHByb2Nlc3NpbmdUaW1lcik7XG4gICAgICAgICAgICBwcm9jZXNzaW5nVGltZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2Nlc3NpbmdEZWZlcnJlZCAhPT0gdW5kZWZpbmVkKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6ZWFybHktZXhpdFxuICAgICAgICAgICAgcHJvY2Vzc2luZ0RlZmVycmVkLnJlamVjdCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgcHJvY2Vzc2luZ0RlZmVycmVkID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBvcmlnaW5hbFNldCA9IG1hcC5zZXQuYmluZChtYXApO1xuICAgIG1hcC5zZXQgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAobWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUga2V5IGFscmVhZHkgZXhpc3QsIHJlbW92ZSBpdCBzbyB3ZSBjYW4gYWRkIGl0IGJhY2sgYXQgdGhlIGVuZCBvZiB0aGUgbWFwLlxuICAgICAgICAgICAgbWFwLmRlbGV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhbGwgdGhlIG9yaWdpbmFsIGBtYXAuc2V0YFxuICAgICAgICBjb25zdCByZXN1bHQgPSBvcmlnaW5hbFNldChrZXksIHZhbHVlKTtcbiAgICAgICAgLy8gSWYgd2UgYXJlIGFscmVhZHkgcHJvY2Vzc2luZyBhIGtleSBhbmQgdGhlIGtleSBhZGRlZCBpcyB0aGUgY3VycmVudCBwcm9jZXNzZWQga2V5LCBzdG9wIHByb2Nlc3NpbmcgaXRcbiAgICAgICAgaWYgKHByb2Nlc3NpbmdLZXkgJiYgcHJvY2Vzc2luZ0tleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICByZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFsd2F5cyBydW4gdGhlIGNsZWFudXAgbWV0aG9kIGluIGNhc2UgaXQgd2Fzbid0IHN0YXJ0ZWQgeWV0XG4gICAgICAgIGNsZWFudXAoKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgY2xlYW51cCgpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgcmV0dXJuIG1hcDtcbn1cbm1vZHVsZS5leHBvcnRzID0gbWFwQWdlQ2xlYW5lcjtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuXHRjb25zdCByZXQgPSB7fTtcblxuXHRyZXQucHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRyZXQucmVzb2x2ZSA9IHJlc29sdmU7XG5cdFx0cmV0LnJlamVjdCA9IHJlamVjdDtcblx0fSk7XG5cblx0cmV0dXJuIHJldDtcbn07XG4iLCJjb25zdCByYW5kb21VVUlEID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLnJhbmRvbVVVSUQgJiYgY3J5cHRvLnJhbmRvbVVVSUQuYmluZChjcnlwdG8pO1xuZXhwb3J0IGRlZmF1bHQge1xuICByYW5kb21VVUlEXG59OyIsImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbmxldCBnZXRSYW5kb21WYWx1ZXM7XG5jb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc2xpY2UoMSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgcmV0dXJuIChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICBjb25zdCB1dWlkID0gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0KTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgbmF0aXZlIGZyb20gJy4vbmF0aXZlLmpzJztcbmltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHsgdW5zYWZlU3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBpZiAobmF0aXZlLnJhbmRvbVVVSUQgJiYgIWJ1ZiAmJiAhb3B0aW9ucykge1xuICAgIHJldHVybiBuYXRpdmUucmFuZG9tVVVJRCgpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gdW5zYWZlU3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwibGV0IGxhc3RUaXRsZSA9IG51bGw7XG5sZXQgc3RhcnRUaW1lID0gbnVsbDtcbmNvbnN0IHRpbWVUcmFja2VyID0gbmV3IE1hcCgpO1xuXG5pbXBvcnQgeyBDaGF0R1BUUHJvdmlkZXIsIGdldENoYXRHUFRBY2Nlc3NUb2tlbiB9IGZyb20gJy4vY2hhdGdwdC5qcyc7XG5cbmNvbnNvbGUubG9nKFwiaGVsbG8gdGhpcyBpcyBiYWNrZ3JvdW5kLmpzXCIpO1xuXG5hc3luYyBmdW5jdGlvbiB0ZXN0Q29kZSgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldENoYXRHUFRBY2Nlc3NUb2tlbigpO1xuICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IENoYXRHUFRQcm92aWRlcih0b2tlbik7XG4gICAgcHJvdmlkZXIuZ2VuZXJhdGVBbnN3ZXIoXCJ3cml0ZSBhIGNvZGUgdGhhdCBjYW4gc29sdmUgZmxvb2RmaWxsXCIpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coJ0Vycm9yOicsIGVycm9yKTtcbiAgfVxufVxudGVzdENvZGUoKTtcblxuZnVuY3Rpb24gaGFuZGxlQWN0aXZlVGFiQ2hhbmdlKCkge1xuICAvLyBRdWVyeSB0aGUgY3VycmVudGx5IGFjdGl2ZSB0YWJcbiAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24odGFicykge1xuICAgIC8vIEFjY2VzcyB0aGUgYWN0aXZlIHRhYiBvYmplY3RcbiAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgIC8vIEV4dHJhY3QgcmVsZXZhbnQgaW5mb3JtYXRpb25cbiAgICAvLyB2YXIgdGFiVXJsID0gYWN0aXZlVGFiLnVybDtcbiAgICB2YXIgdGFiVGl0bGUgPSBhY3RpdmVUYWIudGl0bGU7XG5cbiAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgaWYgKCFsYXN0VGl0bGUpIHtcbiAgICAgIC8vIElmIHRoZXJlIHdhcyBubyBwcmV2aW91cyB0YWIgdGl0bGUsIGluaXRpYWxpemUgdGhlIHN0YXJ0IHRpbWVcbiAgICAgIGxhc3RUaXRsZSA9IHRhYlRpdGxlO1xuICAgICAgc3RhcnRUaW1lID0gY3VycmVudFRpbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGVsYXBzZWRUaW1lID0gKGN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lKSAvIDEwMDA7XG4gICAgICBpZiAodGltZVRyYWNrZXIuaGFzKGxhc3RUaXRsZSkpIHtcbiAgICAgICAgLy8gSWYgdGhlIHByZXZpb3VzIHRhYiB0aXRsZSBpcyBhbHJlYWR5IGluIHRoZSB0aW1lVHJhY2tlciBtYXAsXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdG90YWwgdGltZSBieSBhZGRpbmcgdGhlIGVsYXBzZWQgdGltZVxuICAgICAgICBjb25zdCB0b3RhbFRpbWUgPSB0aW1lVHJhY2tlci5nZXQobGFzdFRpdGxlKSArIGVsYXBzZWRUaW1lO1xuICAgICAgICB0aW1lVHJhY2tlci5zZXQobGFzdFRpdGxlLCB0b3RhbFRpbWUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhsYXN0VGl0bGUsIHRvdGFsVGltZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiB0aGUgcHJldmlvdXMgdGFiIHRpdGxlIGlzIG5vdCBpbiB0aGUgdGltZVRyYWNrZXIgbWFwLFxuICAgICAgICAvLyBjcmVhdGUgYSBuZXcgZW50cnkgd2l0aCB0aGUgZWxhcHNlZCB0aW1lXG4gICAgICAgIHRpbWVUcmFja2VyLnNldChsYXN0VGl0bGUsIGVsYXBzZWRUaW1lKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobGFzdFRpdGxlLCBlbGFwc2VkVGltZSk7XG4gICAgICB9XG4gICAgICAvLyBVcGRhdGUgdGhlIGxhc3RUaXRsZSBhbmQgc3RhcnRUaW1lIGZvciB0aGUgbmV3IHRhYlxuICAgICAgbGFzdFRpdGxlID0gdGFiVGl0bGU7XG4gICAgICBzdGFydFRpbWUgPSBjdXJyZW50VGltZTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBFdmVudCBsaXN0ZW5lciBmb3IgdGFiIGFjdGl2YXRpb24gY2hhbmdlXG5jaHJvbWUudGFicy5vbkFjdGl2YXRlZC5hZGRMaXN0ZW5lcihoYW5kbGVBY3RpdmVUYWJDaGFuZ2UpO1xuXG4vLyBFdmVudCBsaXN0ZW5lciBmb3IgdGFiIHRpdGxlIHVwZGF0ZVxuY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKGZ1bmN0aW9uKHRhYklkLCBjaGFuZ2VJbmZvLCB0YWIpIHtcbiAgaWYgKGNoYW5nZUluZm8udGl0bGUpIHtcbiAgICAvLyBJZiB0aGUgdGFiIHRpdGxlIGlzIHVwZGF0ZWQsIGNhbGwgdGhlIGhhbmRsZUFjdGl2ZVRhYkNoYW5nZSBmdW5jdGlvblxuICAgIGhhbmRsZUFjdGl2ZVRhYkNoYW5nZSgpO1xuICB9XG59KTtcblxuZnVuY3Rpb24gZXh0cmFjdEhvc3RuYW1lKHVybCkge1xuICB0cnkge1xuICAgIGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwodXJsKTtcbiAgICByZXR1cm4gcGFyc2VkVXJsLmhvc3RuYW1lO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0ludmFsaWQgVVJMOicsIGVycm9yKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcmludE1hcChtYXApIHtcbiAgbWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICBjb25zb2xlLmxvZyhrZXkgKyAnID0+ICcgKyB2YWx1ZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjbGVhbk1hcCh0aW1lVHJhY2tlciwgbWluVGltZSkge1xuICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgdGltZVRyYWNrZXIpIHtcbiAgICBpZiAodmFsdWUgPCBtaW5UaW1lKSB7XG4gICAgICB0aW1lVHJhY2tlci5kZWxldGUoa2V5KTtcbiAgICB9XG4gIH1cbn1cblxuLy8gQWRkIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBidXR0b25cblxuLy8gQWRkIG1lc3NhZ2UgbGlzdGVuZXIgaW4gYmFja2dyb3VuZC5qc1xuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09ICdwcmludCcpIHtcbiAgICAvLyBDYWxsIHRoZSBwcmludE1hcCBmdW5jdGlvbiBoZXJlXG4gICAgcHJpbnRNYXAodGltZVRyYWNrZXIpOyAvLyBSZXBsYWNlIGB0aW1lVHJhY2tlcmAgd2l0aCB5b3VyIGFjdHVhbCBtYXAgdmFyaWFibGVcbiAgfSBcbiAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSAnY2xlYW4nKSB7XG4gICAgY2xlYW5NYXAodGltZVRyYWNrZXIsIG1lc3NhZ2UubWluVGltZSlcbiAgfVxufSk7Il0sIm5hbWVzIjpbIkV4cGlyeU1hcCIsInY0IiwidXVpZHY0IiwiY2FjaGUiLCJLRVlfQUNDRVNTX1RPS0VOIiwicmVxdWVzdCIsInRva2VuIiwibWV0aG9kIiwicGF0aCIsImRhdGEiLCJ1bmRlZmluZWQiLCJmZXRjaCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZXRDaGF0R1BUQWNjZXNzVG9rZW4iLCJnZXQiLCJyZXNwIiwic3RhdHVzIiwiRXJyb3IiLCJqc29uIiwiY2F0Y2giLCJhY2Nlc3NUb2tlbiIsInNldCIsIkNoYXRHUFRQcm92aWRlciIsImNvbnN0cnVjdG9yIiwiZmV0Y2hNb2RlbHMiLCJ0aGVuIiwiciIsIm1vZGVscyIsImdldE1vZGVsTmFtZSIsInNsdWciLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJnZW5lcmF0ZUFuc3dlciIsInByb21wdCIsIm1vZGVsTmFtZSIsImRlYnVnIiwicmVzcG9uc2UiLCJhY3Rpb24iLCJtZXNzYWdlcyIsImlkIiwiYXV0aG9yIiwicm9sZSIsImNvbnRlbnQiLCJjb250ZW50X3R5cGUiLCJwYXJ0cyIsIm1vZGVsIiwicGFyZW50X21lc3NhZ2VfaWQiLCJvayIsInJlc3BvbnNlQm9keSIsInRleHQiLCJsb2ciLCJwcm9jZXNzRGF0YSIsImVycm9yVGV4dCIsImxpbmVzIiwic3BsaXQiLCJwb3AiLCJpbmNsdWRlcyIsImxhc3RMaW5lIiwibGVuZ3RoIiwibGFzdERhdGEiLCJwYXJzZSIsInJlcGxhY2UiLCJtZXNzYWdlIiwibGFzdFRpdGxlIiwic3RhcnRUaW1lIiwidGltZVRyYWNrZXIiLCJNYXAiLCJ0ZXN0Q29kZSIsInByb3ZpZGVyIiwiaGFuZGxlQWN0aXZlVGFiQ2hhbmdlIiwiY2hyb21lIiwidGFicyIsInF1ZXJ5IiwiYWN0aXZlIiwiY3VycmVudFdpbmRvdyIsImFjdGl2ZVRhYiIsInRhYlRpdGxlIiwidGl0bGUiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJub3ciLCJlbGFwc2VkVGltZSIsImhhcyIsInRvdGFsVGltZSIsIm9uQWN0aXZhdGVkIiwiYWRkTGlzdGVuZXIiLCJvblVwZGF0ZWQiLCJ0YWJJZCIsImNoYW5nZUluZm8iLCJ0YWIiLCJleHRyYWN0SG9zdG5hbWUiLCJ1cmwiLCJwYXJzZWRVcmwiLCJVUkwiLCJob3N0bmFtZSIsInByaW50TWFwIiwibWFwIiwiZm9yRWFjaCIsInZhbHVlIiwia2V5IiwiY2xlYW5NYXAiLCJtaW5UaW1lIiwiZGVsZXRlIiwicnVudGltZSIsIm9uTWVzc2FnZSIsInNlbmRlciIsInNlbmRSZXNwb25zZSJdLCJzb3VyY2VSb290IjoiIn0=