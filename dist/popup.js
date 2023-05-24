/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateAnswers: () => (/* binding */ generateAnswers)
/* harmony export */ });
/* harmony import */ var _chatgpt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chatgpt */ "./src/chatgpt.ts");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

console.debug("background.js running");
var lastTitle = null;
var startTime = null;
var timeTracker = new Map();
function generateAnswers(port, question) {
  return __awaiter(this, void 0, void 0, function () {
    var token, provider, controller, cleanup;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, (0,_chatgpt__WEBPACK_IMPORTED_MODULE_0__.getChatGPTAccessToken)()];
        case 1:
          token = _a.sent();
          provider = new _chatgpt__WEBPACK_IMPORTED_MODULE_0__.ChatGPTProvider(token);
          controller = new AbortController();
          return [4 /*yield*/, provider.generateAnswer({
            prompt: question,
            signal: controller.signal,
            onEvent: function (event) {
              if (event.type === 'done') {
                port.postMessage({
                  event: 'DONE'
                });
                return;
              }
              port.postMessage({
                action: 'printPopup',
                text: event.data.text
              });
              // console.debug("debug", event.data.text)
            }
          })];

        case 2:
          cleanup = _a.sent().cleanup;
          port.onDisconnect.addListener(function () {
            controller.abort();
            cleanup === null || cleanup === void 0 ? void 0 : cleanup();
          });
          return [2 /*return*/];
      }
    });
  });
}

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    return __awaiter(void 0, void 0, void 0, function () {
      var str, instruction, err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            console.debug('background received msg', msg);
            if (!(msg.action === 'printMap')) return [3 /*break*/, 1];
            // Call the printMap function here
            printMap(timeTracker);
            port.postMessage({
              action: 'printPopup',
              text: toString(timeTracker)
            });
            return [3 /*break*/, 7];
          case 1:
            if (!(msg.action === 'generate')) return [3 /*break*/, 6];
            str = toString(timeTracker);
            console.debug("toString TimeTracker: ", str);
            instruction = "in the perspective of a mentor or guru to allow the user to understand what the user's focus is on and what the user roughly accomplished today make sure to NOT include the seconds of usage but instead just use the seconds for your own reference to the user's focus. limit to 100-200 words and make necessary suggestions on what to do to make user improve: ";
            _a.label = 2;
          case 2:
            _a.trys.push([2, 4,, 5]);
            return [4 /*yield*/, generateAnswers(port, instruction + str)];
          case 3:
            _a.sent();
            return [3 /*break*/, 5];
          case 4:
            err_1 = _a.sent();
            console.log("ERROR: ", err_1);
            return [3 /*break*/, 5];
          case 5:
            return [3 /*break*/, 7];
          case 6:
            if (msg.action === 'cleanTimeTracker') {
              cleanMap(timeTracker, msg.minTime);
            }
            _a.label = 7;
          case 7:
            return [2 /*return*/];
        }
      });
    });
  });
});

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
    var currentTime = Date.now();
    if (!lastTitle) {
      // If there was no previous tab title, initialize the start time
      lastTitle = tabTitle;
      startTime = currentTime;
    } else {
      var elapsedTime = (currentTime - startTime) / 1000;
      if (timeTracker.has(lastTitle)) {
        // If the previous tab title is already in the timeTracker map,
        // update the total time by adding the elapsed time
        var totalTime = timeTracker.get(lastTitle) + elapsedTime;
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
  map.forEach(function (value, key) {
    console.debug(key + ' => ' + value);
  });
}
function toString(map) {
  var arr = [];
  map.forEach(function (value, key) {
    arr.push(key + " used for " + value + " seconds");
  });
  return arr.join(', ');
}
function cleanMap(timeTracker, minTime) {
  for (var _i = 0, timeTracker_1 = timeTracker; _i < timeTracker_1.length; _i++) {
    var _a = timeTracker_1[_i],
      key = _a[0],
      value = _a[1];
    if (value < minTime) {
      timeTracker.delete(key);
    }
  }
}

/***/ }),

/***/ "./src/chatgpt.ts":
/*!************************!*\
  !*** ./src/chatgpt.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChatGPTProvider: () => (/* binding */ ChatGPTProvider),
/* harmony export */   getChatGPTAccessToken: () => (/* binding */ getChatGPTAccessToken),
/* harmony export */   sendMessageFeedback: () => (/* binding */ sendMessageFeedback),
/* harmony export */   setConversationProperty: () => (/* binding */ setConversationProperty)
/* harmony export */ });
/* harmony import */ var expiry_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! expiry-map */ "./node_modules/expiry-map/dist/index.js");
/* harmony import */ var expiry_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(expiry_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _fetch_sse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch-sse */ "./src/fetch-sse.ts");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};



function request(token, method, path, data) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2 /*return*/, fetch("https://chat.openai.com/backend-api".concat(path), {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(token)
        },
        body: data === undefined ? undefined : JSON.stringify(data)
      })];
    });
  });
}
function sendMessageFeedback(token, data) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, request(token, 'POST', '/conversation/message_feedback', data)];
        case 1:
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
}

function setConversationProperty(token, conversationId, propertyObject) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, request(token, 'PATCH', "/conversation/".concat(conversationId), propertyObject)];
        case 1:
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
}

var KEY_ACCESS_TOKEN = 'accessToken';
var cache = new (expiry_map__WEBPACK_IMPORTED_MODULE_1___default())(10 * 1000);
function getChatGPTAccessToken() {
  return __awaiter(this, void 0, void 0, function () {
    var resp, data;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (cache.get(KEY_ACCESS_TOKEN)) {
            return [2 /*return*/, cache.get(KEY_ACCESS_TOKEN)];
          }
          return [4 /*yield*/, fetch('https://chat.openai.com/api/auth/session')];
        case 1:
          resp = _a.sent();
          if (resp.status === 403) {
            throw new Error('CLOUDFLARE');
          }
          return [4 /*yield*/, resp.json().catch(function () {
            return {};
          })];
        case 2:
          data = _a.sent();
          if (!data.accessToken) {
            throw new Error('UNAUTHORIZED');
          }
          cache.set(KEY_ACCESS_TOKEN, data.accessToken);
          return [2 /*return*/, data.accessToken];
      }
    });
  });
}
var ChatGPTProvider = /** @class */function () {
  function ChatGPTProvider(token) {
    this.token = token;
    this.token = token;
  }
  ChatGPTProvider.prototype.fetchModels = function () {
    return __awaiter(this, void 0, void 0, function () {
      var resp;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, request(this.token, 'GET', '/models').then(function (r) {
              return r.json();
            })];
          case 1:
            resp = _a.sent();
            return [2 /*return*/, resp.models];
        }
      });
    });
  };
  ChatGPTProvider.prototype.getModelName = function () {
    return __awaiter(this, void 0, void 0, function () {
      var models, err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);
            return [4 /*yield*/, this.fetchModels()];
          case 1:
            models = _a.sent();
            return [2 /*return*/, models[0].slug];
          case 2:
            err_1 = _a.sent();
            console.error(err_1);
            return [2 /*return*/, 'text-davinci-002-render'];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };

  ChatGPTProvider.prototype.generateAnswer = function (params) {
    return __awaiter(this, void 0, void 0, function () {
      var conversationId, cleanup, modelName;
      var _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            cleanup = function () {
              if (conversationId) {
                setConversationProperty(_this.token, conversationId, {
                  is_visible: false
                });
              }
            };
            return [4 /*yield*/, this.getModelName()];
          case 1:
            modelName = _a.sent();
            console.debug('Using model:', modelName);
            return [4 /*yield*/, (0,_fetch_sse__WEBPACK_IMPORTED_MODULE_0__.fetchSSE)('https://chat.openai.com/backend-api/conversation', {
              method: 'POST',
              signal: params.signal,
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer ".concat(this.token)
              },
              body: JSON.stringify({
                action: 'next',
                messages: [{
                  id: (0,uuid__WEBPACK_IMPORTED_MODULE_2__["default"])(),
                  role: 'user',
                  content: {
                    content_type: 'text',
                    parts: [params.prompt]
                  }
                }],
                model: modelName,
                parent_message_id: (0,uuid__WEBPACK_IMPORTED_MODULE_2__["default"])()
              }),
              onMessage: function (message) {
                var _a, _b, _c;
                // console.debug('sse message', message)
                if (message === '[DONE]') {
                  params.onEvent({
                    type: 'done'
                  });
                  cleanup();
                  return;
                }
                var data;
                try {
                  data = JSON.parse(message);
                } catch (err) {
                  console.error(err);
                  return;
                }
                var text = (_c = (_b = (_a = data.message) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.parts) === null || _c === void 0 ? void 0 : _c[0];
                if (text) {
                  conversationId = data.conversation_id;
                  params.onEvent({
                    type: 'answer',
                    data: {
                      text: text,
                      messageId: data.message.id,
                      conversationId: data.conversation_id
                    }
                  });
                }
              }
            })];
          case 2:
            _a.sent();
            return [2 /*return*/, {
              cleanup: cleanup
            }];
        }
      });
    });
  };
  return ChatGPTProvider;
}();


/***/ }),

/***/ "./src/fetch-sse.ts":
/*!**************************!*\
  !*** ./src/fetch-sse.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchSSE: () => (/* binding */ fetchSSE)
/* harmony export */ });
/* harmony import */ var eventsource_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! eventsource-parser */ "./node_modules/eventsource-parser/dist/index.js");
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash-es */ "./node_modules/lodash-es/isEmpty.js");
/* harmony import */ var _stream_async_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stream-async-iterable */ "./src/stream-async-iterable.ts");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var __asyncValues = undefined && undefined.__asyncValues || function (o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
    i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
};



function fetchSSE(resource, options) {
  var _a, e_1, _b, _c;
  return __awaiter(this, void 0, void 0, function () {
    var onMessage, fetchOptions, resp, error, parser, _d, _e, _f, chunk, str, e_1_1;
    return __generator(this, function (_g) {
      switch (_g.label) {
        case 0:
          onMessage = options.onMessage, fetchOptions = __rest(options, ["onMessage"]);
          return [4 /*yield*/, fetch(resource, fetchOptions)];
        case 1:
          resp = _g.sent();
          if (!!resp.ok) return [3 /*break*/, 3];
          return [4 /*yield*/, resp.json().catch(function () {
            return {};
          })];
        case 2:
          error = _g.sent();
          throw new Error(!(0,lodash_es__WEBPACK_IMPORTED_MODULE_1__["default"])(error) ? JSON.stringify(error) : "".concat(resp.status, " ").concat(resp.statusText));
        case 3:
          parser = (0,eventsource_parser__WEBPACK_IMPORTED_MODULE_2__.createParser)(function (event) {
            if (event.type === 'event') {
              onMessage(event.data);
            }
          });
          _g.label = 4;
        case 4:
          _g.trys.push([4, 9, 10, 15]);
          _d = true, _e = __asyncValues((0,_stream_async_iterable__WEBPACK_IMPORTED_MODULE_0__.streamAsyncIterable)(resp.body));
          _g.label = 5;
        case 5:
          return [4 /*yield*/, _e.next()];
        case 6:
          if (!(_f = _g.sent(), _a = _f.done, !_a)) return [3 /*break*/, 8];
          _c = _f.value;
          _d = false;
          try {
            chunk = _c;
            str = new TextDecoder().decode(chunk);
            parser.feed(str);
          } finally {
            _d = true;
          }
          _g.label = 7;
        case 7:
          return [3 /*break*/, 5];
        case 8:
          return [3 /*break*/, 15];
        case 9:
          e_1_1 = _g.sent();
          e_1 = {
            error: e_1_1
          };
          return [3 /*break*/, 15];
        case 10:
          _g.trys.push([10,, 13, 14]);
          if (!(!_d && !_a && (_b = _e.return))) return [3 /*break*/, 12];
          return [4 /*yield*/, _b.call(_e)];
        case 11:
          _g.sent();
          _g.label = 12;
        case 12:
          return [3 /*break*/, 14];
        case 13:
          if (e_1) throw e_1.error;
          return [7 /*endfinally*/];
        case 14:
          return [7 /*endfinally*/];
        case 15:
          return [2 /*return*/];
      }
    });
  });
}

/***/ }),

/***/ "./src/stream-async-iterable.ts":
/*!**************************************!*\
  !*** ./src/stream-async-iterable.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   streamAsyncIterable: () => (/* binding */ streamAsyncIterable)
/* harmony export */ });
var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __await = undefined && undefined.__await || function (v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
};
var __asyncGenerator = undefined && undefined.__asyncGenerator || function (thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
    i,
    q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;
  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
};
function streamAsyncIterable(stream) {
  return __asyncGenerator(this, arguments, function streamAsyncIterable_1() {
    var reader, _a, done, value;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          reader = stream.getReader();
          _b.label = 1;
        case 1:
          _b.trys.push([1,, 9, 10]);
          _b.label = 2;
        case 2:
          if (false) {}
          return [4 /*yield*/, __await(reader.read())];
        case 3:
          _a = _b.sent(), done = _a.done, value = _a.value;
          if (!done) return [3 /*break*/, 5];
          return [4 /*yield*/, __await(void 0)];
        case 4:
          return [2 /*return*/, _b.sent()];
        case 5:
          return [4 /*yield*/, __await(value)];
        case 6:
          return [4 /*yield*/, _b.sent()];
        case 7:
          _b.sent();
          return [3 /*break*/, 2];
        case 8:
          return [3 /*break*/, 10];
        case 9:
          reader.releaseLock();
          return [7 /*endfinally*/];
        case 10:
          return [2 /*return*/];
      }
    });
  });
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./static/popup.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./static/popup.css ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n    height: 400px;\n    width: 500px;\n    background-color: rgb(75, 83, 149);\n}", "",{"version":3,"sources":["webpack://./static/popup.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,YAAY;IACZ,kCAAkC;AACtC","sourcesContent":["body {\n    height: 400px;\n    width: 500px;\n    background-color: rgb(75, 83, 149);\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

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

/***/ "./static/popup.css":
/*!**************************!*\
  !*** ./static/popup.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./popup.css */ "./node_modules/css-loader/dist/cjs.js!./static/popup.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

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

/***/ }),

/***/ "./node_modules/eventsource-parser/dist/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/eventsource-parser/dist/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createParser: () => (/* binding */ createParser)
/* harmony export */ });
function createParser(onParse) {
  let isFirstChunk;
  let buffer;
  let startingPosition;
  let startingFieldLength;
  let eventId;
  let eventName;
  let data;
  reset();
  return {
    feed,
    reset
  };
  function reset() {
    isFirstChunk = true;
    buffer = "";
    startingPosition = 0;
    startingFieldLength = -1;
    eventId = void 0;
    eventName = void 0;
    data = "";
  }
  function feed(chunk) {
    buffer = buffer ? buffer + chunk : chunk;
    if (isFirstChunk && hasBom(buffer)) {
      buffer = buffer.slice(BOM.length);
    }
    isFirstChunk = false;
    const length = buffer.length;
    let position = 0;
    let discardTrailingNewline = false;
    while (position < length) {
      if (discardTrailingNewline) {
        if (buffer[position] === "\n") {
          ++position;
        }
        discardTrailingNewline = false;
      }
      let lineLength = -1;
      let fieldLength = startingFieldLength;
      let character;
      for (let index = startingPosition; lineLength < 0 && index < length; ++index) {
        character = buffer[index];
        if (character === ":" && fieldLength < 0) {
          fieldLength = index - position;
        } else if (character === "\r") {
          discardTrailingNewline = true;
          lineLength = index - position;
        } else if (character === "\n") {
          lineLength = index - position;
        }
      }
      if (lineLength < 0) {
        startingPosition = length - position;
        startingFieldLength = fieldLength;
        break;
      } else {
        startingPosition = 0;
        startingFieldLength = -1;
      }
      parseEventStreamLine(buffer, position, fieldLength, lineLength);
      position += lineLength + 1;
    }
    if (position === length) {
      buffer = "";
    } else if (position > 0) {
      buffer = buffer.slice(position);
    }
  }
  function parseEventStreamLine(lineBuffer, index, fieldLength, lineLength) {
    if (lineLength === 0) {
      if (data.length > 0) {
        onParse({
          type: "event",
          id: eventId,
          event: eventName || void 0,
          data: data.slice(0, -1)
          // remove trailing newline
        });

        data = "";
        eventId = void 0;
      }
      eventName = void 0;
      return;
    }
    const noValue = fieldLength < 0;
    const field = lineBuffer.slice(index, index + (noValue ? lineLength : fieldLength));
    let step = 0;
    if (noValue) {
      step = lineLength;
    } else if (lineBuffer[index + fieldLength + 1] === " ") {
      step = fieldLength + 2;
    } else {
      step = fieldLength + 1;
    }
    const position = index + step;
    const valueLength = lineLength - step;
    const value = lineBuffer.slice(position, position + valueLength).toString();
    if (field === "data") {
      data += value ? "".concat(value, "\n") : "\n";
    } else if (field === "event") {
      eventName = value;
    } else if (field === "id" && !value.includes("\0")) {
      eventId = value;
    } else if (field === "retry") {
      const retry = parseInt(value, 10);
      if (!Number.isNaN(retry)) {
        onParse({
          type: "reconnect-interval",
          value: retry
        });
      }
    }
  }
}
const BOM = [239, 187, 191];
function hasBom(buffer) {
  return BOM.every((charCode, index) => buffer.charCodeAt(index) === charCode);
}

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/lodash-es/_DataView.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/_DataView.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getNative_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getNative.js */ "./node_modules/lodash-es/_getNative.js");
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_root.js */ "./node_modules/lodash-es/_root.js");



/* Built-in method references that are verified to be native. */
var DataView = (0,_getNative_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_root_js__WEBPACK_IMPORTED_MODULE_1__["default"], 'DataView');

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataView);


/***/ }),

/***/ "./node_modules/lodash-es/_Map.js":
/*!****************************************!*\
  !*** ./node_modules/lodash-es/_Map.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getNative_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getNative.js */ "./node_modules/lodash-es/_getNative.js");
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_root.js */ "./node_modules/lodash-es/_root.js");



/* Built-in method references that are verified to be native. */
var Map = (0,_getNative_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_root_js__WEBPACK_IMPORTED_MODULE_1__["default"], 'Map');

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Map);


/***/ }),

/***/ "./node_modules/lodash-es/_Promise.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/_Promise.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getNative_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getNative.js */ "./node_modules/lodash-es/_getNative.js");
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_root.js */ "./node_modules/lodash-es/_root.js");



/* Built-in method references that are verified to be native. */
var Promise = (0,_getNative_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_root_js__WEBPACK_IMPORTED_MODULE_1__["default"], 'Promise');

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Promise);


/***/ }),

/***/ "./node_modules/lodash-es/_Set.js":
/*!****************************************!*\
  !*** ./node_modules/lodash-es/_Set.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getNative_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getNative.js */ "./node_modules/lodash-es/_getNative.js");
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_root.js */ "./node_modules/lodash-es/_root.js");



/* Built-in method references that are verified to be native. */
var Set = (0,_getNative_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_root_js__WEBPACK_IMPORTED_MODULE_1__["default"], 'Set');

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Set);


/***/ }),

/***/ "./node_modules/lodash-es/_Symbol.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash-es/_Symbol.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_root.js */ "./node_modules/lodash-es/_root.js");


/** Built-in value references. */
var Symbol = _root_js__WEBPACK_IMPORTED_MODULE_0__["default"].Symbol;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Symbol);


/***/ }),

/***/ "./node_modules/lodash-es/_WeakMap.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/_WeakMap.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getNative_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getNative.js */ "./node_modules/lodash-es/_getNative.js");
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_root.js */ "./node_modules/lodash-es/_root.js");



/* Built-in method references that are verified to be native. */
var WeakMap = (0,_getNative_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_root_js__WEBPACK_IMPORTED_MODULE_1__["default"], 'WeakMap');

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WeakMap);


/***/ }),

/***/ "./node_modules/lodash-es/_baseGetTag.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_baseGetTag.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_Symbol.js */ "./node_modules/lodash-es/_Symbol.js");
/* harmony import */ var _getRawTag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_getRawTag.js */ "./node_modules/lodash-es/_getRawTag.js");
/* harmony import */ var _objectToString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_objectToString.js */ "./node_modules/lodash-es/_objectToString.js");




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? _Symbol_js__WEBPACK_IMPORTED_MODULE_0__["default"].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? (0,_getRawTag_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value)
    : (0,_objectToString_js__WEBPACK_IMPORTED_MODULE_2__["default"])(value);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseGetTag);


/***/ }),

/***/ "./node_modules/lodash-es/_baseIsArguments.js":
/*!****************************************************!*\
  !*** ./node_modules/lodash-es/_baseIsArguments.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_baseGetTag.js */ "./node_modules/lodash-es/_baseGetTag.js");
/* harmony import */ var _isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObjectLike.js */ "./node_modules/lodash-es/isObjectLike.js");



/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return (0,_isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value) && (0,_baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value) == argsTag;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseIsArguments);


/***/ }),

/***/ "./node_modules/lodash-es/_baseIsNative.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash-es/_baseIsNative.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isFunction.js */ "./node_modules/lodash-es/isFunction.js");
/* harmony import */ var _isMasked_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isMasked.js */ "./node_modules/lodash-es/_isMasked.js");
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObject.js */ "./node_modules/lodash-es/isObject.js");
/* harmony import */ var _toSource_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_toSource.js */ "./node_modules/lodash-es/_toSource.js");





/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!(0,_isObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value) || (0,_isMasked_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value)) {
    return false;
  }
  var pattern = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(value) ? reIsNative : reIsHostCtor;
  return pattern.test((0,_toSource_js__WEBPACK_IMPORTED_MODULE_3__["default"])(value));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseIsNative);


/***/ }),

/***/ "./node_modules/lodash-es/_baseIsTypedArray.js":
/*!*****************************************************!*\
  !*** ./node_modules/lodash-es/_baseIsTypedArray.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseGetTag_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_baseGetTag.js */ "./node_modules/lodash-es/_baseGetTag.js");
/* harmony import */ var _isLength_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isLength.js */ "./node_modules/lodash-es/isLength.js");
/* harmony import */ var _isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObjectLike.js */ "./node_modules/lodash-es/isObjectLike.js");




/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return (0,_isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value) &&
    (0,_isLength_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value.length) && !!typedArrayTags[(0,_baseGetTag_js__WEBPACK_IMPORTED_MODULE_2__["default"])(value)];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseIsTypedArray);


/***/ }),

/***/ "./node_modules/lodash-es/_baseKeys.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/_baseKeys.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isPrototype_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isPrototype.js */ "./node_modules/lodash-es/_isPrototype.js");
/* harmony import */ var _nativeKeys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_nativeKeys.js */ "./node_modules/lodash-es/_nativeKeys.js");



/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!(0,_isPrototype_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object)) {
    return (0,_nativeKeys_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseKeys);


/***/ }),

/***/ "./node_modules/lodash-es/_baseUnary.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/_baseUnary.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseUnary);


/***/ }),

/***/ "./node_modules/lodash-es/_coreJsData.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_coreJsData.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_root.js */ "./node_modules/lodash-es/_root.js");


/** Used to detect overreaching core-js shims. */
var coreJsData = _root_js__WEBPACK_IMPORTED_MODULE_0__["default"]["__core-js_shared__"];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (coreJsData);


/***/ }),

/***/ "./node_modules/lodash-es/_freeGlobal.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_freeGlobal.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (freeGlobal);


/***/ }),

/***/ "./node_modules/lodash-es/_getNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/_getNative.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseIsNative_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_baseIsNative.js */ "./node_modules/lodash-es/_baseIsNative.js");
/* harmony import */ var _getValue_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getValue.js */ "./node_modules/lodash-es/_getValue.js");



/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = (0,_getValue_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, key);
  return (0,_baseIsNative_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value) ? value : undefined;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getNative);


/***/ }),

/***/ "./node_modules/lodash-es/_getRawTag.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/_getRawTag.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_Symbol.js */ "./node_modules/lodash-es/_Symbol.js");


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? _Symbol_js__WEBPACK_IMPORTED_MODULE_0__["default"].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getRawTag);


/***/ }),

/***/ "./node_modules/lodash-es/_getTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash-es/_getTag.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DataView_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_DataView.js */ "./node_modules/lodash-es/_DataView.js");
/* harmony import */ var _Map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_Map.js */ "./node_modules/lodash-es/_Map.js");
/* harmony import */ var _Promise_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_Promise.js */ "./node_modules/lodash-es/_Promise.js");
/* harmony import */ var _Set_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_Set.js */ "./node_modules/lodash-es/_Set.js");
/* harmony import */ var _WeakMap_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_WeakMap.js */ "./node_modules/lodash-es/_WeakMap.js");
/* harmony import */ var _baseGetTag_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_baseGetTag.js */ "./node_modules/lodash-es/_baseGetTag.js");
/* harmony import */ var _toSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_toSource.js */ "./node_modules/lodash-es/_toSource.js");








/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = (0,_toSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_DataView_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
    mapCtorString = (0,_toSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_Map_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
    promiseCtorString = (0,_toSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_Promise_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
    setCtorString = (0,_toSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_Set_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
    weakMapCtorString = (0,_toSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_WeakMap_js__WEBPACK_IMPORTED_MODULE_5__["default"]);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = _baseGetTag_js__WEBPACK_IMPORTED_MODULE_6__["default"];

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((_DataView_js__WEBPACK_IMPORTED_MODULE_1__["default"] && getTag(new _DataView_js__WEBPACK_IMPORTED_MODULE_1__["default"](new ArrayBuffer(1))) != dataViewTag) ||
    (_Map_js__WEBPACK_IMPORTED_MODULE_2__["default"] && getTag(new _Map_js__WEBPACK_IMPORTED_MODULE_2__["default"]) != mapTag) ||
    (_Promise_js__WEBPACK_IMPORTED_MODULE_3__["default"] && getTag(_Promise_js__WEBPACK_IMPORTED_MODULE_3__["default"].resolve()) != promiseTag) ||
    (_Set_js__WEBPACK_IMPORTED_MODULE_4__["default"] && getTag(new _Set_js__WEBPACK_IMPORTED_MODULE_4__["default"]) != setTag) ||
    (_WeakMap_js__WEBPACK_IMPORTED_MODULE_5__["default"] && getTag(new _WeakMap_js__WEBPACK_IMPORTED_MODULE_5__["default"]) != weakMapTag)) {
  getTag = function(value) {
    var result = (0,_baseGetTag_js__WEBPACK_IMPORTED_MODULE_6__["default"])(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? (0,_toSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTag);


/***/ }),

/***/ "./node_modules/lodash-es/_getValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/_getValue.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getValue);


/***/ }),

/***/ "./node_modules/lodash-es/_isMasked.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/_isMasked.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _coreJsData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_coreJsData.js */ "./node_modules/lodash-es/_coreJsData.js");


/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData_js__WEBPACK_IMPORTED_MODULE_0__["default"] && _coreJsData_js__WEBPACK_IMPORTED_MODULE_0__["default"].keys && _coreJsData_js__WEBPACK_IMPORTED_MODULE_0__["default"].keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isMasked);


/***/ }),

/***/ "./node_modules/lodash-es/_isPrototype.js":
/*!************************************************!*\
  !*** ./node_modules/lodash-es/_isPrototype.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isPrototype);


/***/ }),

/***/ "./node_modules/lodash-es/_nativeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_nativeKeys.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _overArg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_overArg.js */ "./node_modules/lodash-es/_overArg.js");


/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = (0,_overArg_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Object.keys, Object);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nativeKeys);


/***/ }),

/***/ "./node_modules/lodash-es/_nodeUtil.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/_nodeUtil.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_freeGlobal.js */ "./node_modules/lodash-es/_freeGlobal.js");


/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__["default"].process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nodeUtil);


/***/ }),

/***/ "./node_modules/lodash-es/_objectToString.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash-es/_objectToString.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (objectToString);


/***/ }),

/***/ "./node_modules/lodash-es/_overArg.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/_overArg.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (overArg);


/***/ }),

/***/ "./node_modules/lodash-es/_root.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash-es/_root.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_freeGlobal.js */ "./node_modules/lodash-es/_freeGlobal.js");


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__["default"] || freeSelf || Function('return this')();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (root);


/***/ }),

/***/ "./node_modules/lodash-es/_toSource.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/_toSource.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toSource);


/***/ }),

/***/ "./node_modules/lodash-es/isArguments.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/isArguments.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseIsArguments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_baseIsArguments.js */ "./node_modules/lodash-es/_baseIsArguments.js");
/* harmony import */ var _isObjectLike_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isObjectLike.js */ "./node_modules/lodash-es/isObjectLike.js");



/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = (0,_baseIsArguments_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function() { return arguments; }()) ? _baseIsArguments_js__WEBPACK_IMPORTED_MODULE_0__["default"] : function(value) {
  return (0,_isObjectLike_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isArguments);


/***/ }),

/***/ "./node_modules/lodash-es/isArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash-es/isArray.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isArray);


/***/ }),

/***/ "./node_modules/lodash-es/isArrayLike.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/isArrayLike.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFunction.js */ "./node_modules/lodash-es/isFunction.js");
/* harmony import */ var _isLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isLength.js */ "./node_modules/lodash-es/isLength.js");



/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && (0,_isLength_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value.length) && !(0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isArrayLike);


/***/ }),

/***/ "./node_modules/lodash-es/isBuffer.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/isBuffer.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_root.js */ "./node_modules/lodash-es/_root.js");
/* harmony import */ var _stubFalse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stubFalse.js */ "./node_modules/lodash-es/stubFalse.js");



/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root_js__WEBPACK_IMPORTED_MODULE_0__["default"].Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || _stubFalse_js__WEBPACK_IMPORTED_MODULE_1__["default"];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isBuffer);


/***/ }),

/***/ "./node_modules/lodash-es/isEmpty.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash-es/isEmpty.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseKeys_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./_baseKeys.js */ "./node_modules/lodash-es/_baseKeys.js");
/* harmony import */ var _getTag_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_getTag.js */ "./node_modules/lodash-es/_getTag.js");
/* harmony import */ var _isArguments_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isArguments.js */ "./node_modules/lodash-es/isArguments.js");
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isArray.js */ "./node_modules/lodash-es/isArray.js");
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isArrayLike.js */ "./node_modules/lodash-es/isArrayLike.js");
/* harmony import */ var _isBuffer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isBuffer.js */ "./node_modules/lodash-es/isBuffer.js");
/* harmony import */ var _isPrototype_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_isPrototype.js */ "./node_modules/lodash-es/_isPrototype.js");
/* harmony import */ var _isTypedArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isTypedArray.js */ "./node_modules/lodash-es/isTypedArray.js");









/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if ((0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value) &&
      ((0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        (0,_isBuffer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(value) || (0,_isTypedArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(value) || (0,_isArguments_js__WEBPACK_IMPORTED_MODULE_4__["default"])(value))) {
    return !value.length;
  }
  var tag = (0,_getTag_js__WEBPACK_IMPORTED_MODULE_5__["default"])(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if ((0,_isPrototype_js__WEBPACK_IMPORTED_MODULE_6__["default"])(value)) {
    return !(0,_baseKeys_js__WEBPACK_IMPORTED_MODULE_7__["default"])(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isEmpty);


/***/ }),

/***/ "./node_modules/lodash-es/isFunction.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/isFunction.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_baseGetTag.js */ "./node_modules/lodash-es/_baseGetTag.js");
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObject.js */ "./node_modules/lodash-es/isObject.js");



/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!(0,_isObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = (0,_baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isFunction);


/***/ }),

/***/ "./node_modules/lodash-es/isLength.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/isLength.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isLength);


/***/ }),

/***/ "./node_modules/lodash-es/isObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/isObject.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isObject);


/***/ }),

/***/ "./node_modules/lodash-es/isObjectLike.js":
/*!************************************************!*\
  !*** ./node_modules/lodash-es/isObjectLike.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isObjectLike);


/***/ }),

/***/ "./node_modules/lodash-es/isTypedArray.js":
/*!************************************************!*\
  !*** ./node_modules/lodash-es/isTypedArray.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseIsTypedArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_baseIsTypedArray.js */ "./node_modules/lodash-es/_baseIsTypedArray.js");
/* harmony import */ var _baseUnary_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_baseUnary.js */ "./node_modules/lodash-es/_baseUnary.js");
/* harmony import */ var _nodeUtil_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_nodeUtil.js */ "./node_modules/lodash-es/_nodeUtil.js");




/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil_js__WEBPACK_IMPORTED_MODULE_0__["default"] && _nodeUtil_js__WEBPACK_IMPORTED_MODULE_0__["default"].isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? (0,_baseUnary_js__WEBPACK_IMPORTED_MODULE_1__["default"])(nodeIsTypedArray) : _baseIsTypedArray_js__WEBPACK_IMPORTED_MODULE_2__["default"];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isTypedArray);


/***/ }),

/***/ "./node_modules/lodash-es/stubFalse.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/stubFalse.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stubFalse);


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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _background__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./background */ "./src/background.js");
/* harmony import */ var _static_popup_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../static/popup.css */ "./static/popup.css");


var port = chrome.runtime.connect();
document.addEventListener('DOMContentLoaded', function () {
  var printButton = document.getElementById('printButton');
  var cleanButton = document.getElementById('cleanButton');
  var generateButton = document.getElementById('generateButton');
  var messageContainer = document.getElementById('messageContainer');
  var minTime = 10;
  printButton.addEventListener('click', function () {
    port.postMessage({
      action: 'printMap'
    });
  });
  cleanButton.addEventListener('click', function () {
    port.postMessage({
      action: 'cleanTimeTracker',
      minTime: minTime
    });
  });
  generateButton.addEventListener('click', function () {
    port.postMessage({
      action: 'generate'
    });
  });
});
port.onMessage.addListener(function (msg) {
  if (msg.action === 'printPopup') {
    if (messageContainer && msg.text) {
      messageContainer.textContent = msg.text;
    }
  }
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VixNQUFNLEtBQUssWUFBWSxFQUFFO0lBQzdCLElBQUk2SixnQkFBZ0IsSUFBSW5KLEdBQUcsQ0FBQ1QsSUFBSSxFQUFFO01BQzlCNEosZ0JBQWdCLENBQUNDLFdBQVcsR0FBR3BKLEdBQUcsQ0FBQ1QsSUFBSTtJQUMzQztFQUNKO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vc3JjL2JhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL3NyYy9jaGF0Z3B0LnRzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9zcmMvZmV0Y2gtc3NlLnRzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9zcmMvc3RyZWFtLWFzeW5jLWl0ZXJhYmxlLnRzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9zdGF0aWMvcG9wdXAuY3NzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2V4cGlyeS1tYXAvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL21hcC1hZ2UtY2xlYW5lci9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvcC1kZWZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vc3RhdGljL3BvcHVwLmNzcz81NTg2Iiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbmF0aXZlLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9ldmVudHNvdXJjZS1wYXJzZXIvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fRGF0YVZpZXcuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX01hcC5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU2V0LmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1dlYWtNYXAuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VJc0FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzTmF0aXZlLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNUeXBlZEFycmF5LmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlS2V5cy5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVVuYXJ5LmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jb3JlSnNEYXRhLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXROYXRpdmUuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFJhd1RhZy5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0VGFnLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRWYWx1ZS5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNNYXNrZWQuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2lzUHJvdG90eXBlLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19uYXRpdmVLZXlzLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19ub2RlVXRpbC5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX292ZXJBcmcuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Jvb3QuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3RvU291cmNlLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJndW1lbnRzLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNBcnJheUxpa2UuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNCdWZmZXIuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNFbXB0eS5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc0Z1bmN0aW9uLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzTGVuZ3RoLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0LmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0TGlrZS5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1R5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvc3R1YkZhbHNlLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9zcmMvcG9wdXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuaW1wb3J0IHsgQ2hhdEdQVFByb3ZpZGVyLCBnZXRDaGF0R1BUQWNjZXNzVG9rZW4sIHNlbmRNZXNzYWdlRmVlZGJhY2sgfSBmcm9tICcuL2NoYXRncHQnO1xuY29uc29sZS5kZWJ1ZyhcImJhY2tncm91bmQuanMgcnVubmluZ1wiKTtcbnZhciBsYXN0VGl0bGUgPSBudWxsO1xudmFyIHN0YXJ0VGltZSA9IG51bGw7XG52YXIgdGltZVRyYWNrZXIgPSBuZXcgTWFwKCk7XG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVBbnN3ZXJzKHBvcnQsIHF1ZXN0aW9uKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdG9rZW4sIHByb3ZpZGVyLCBjb250cm9sbGVyLCBjbGVhbnVwO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCBnZXRDaGF0R1BUQWNjZXNzVG9rZW4oKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIgPSBuZXcgQ2hhdEdQVFByb3ZpZGVyKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcHJvdmlkZXIuZ2VuZXJhdGVBbnN3ZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21wdDogcXVlc3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkV2ZW50OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdkb25lJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7IGV2ZW50OiAnRE9ORScgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7IGFjdGlvbjogJ3ByaW50UG9wdXAnLCB0ZXh0OiBldmVudC5kYXRhLnRleHQgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGVidWcoXCJkZWJ1Z1wiLCBldmVudC5kYXRhLnRleHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGNsZWFudXAgPSAoX2Euc2VudCgpKS5jbGVhbnVwO1xuICAgICAgICAgICAgICAgICAgICBwb3J0Lm9uRGlzY29ubmVjdC5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhbnVwID09PSBudWxsIHx8IGNsZWFudXAgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5jaHJvbWUucnVudGltZS5vbkNvbm5lY3QuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHBvcnQpIHtcbiAgICBwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAobXNnKSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3RyLCBpbnN0cnVjdGlvbiwgZXJyXzE7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ2JhY2tncm91bmQgcmVjZWl2ZWQgbXNnJywgbXNnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEobXNnLmFjdGlvbiA9PT0gJ3ByaW50TWFwJykpIHJldHVybiBbMyAvKmJyZWFrKi8sIDFdO1xuICAgICAgICAgICAgICAgICAgICAvLyBDYWxsIHRoZSBwcmludE1hcCBmdW5jdGlvbiBoZXJlXG4gICAgICAgICAgICAgICAgICAgIHByaW50TWFwKHRpbWVUcmFja2VyKTtcbiAgICAgICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7IGFjdGlvbjogJ3ByaW50UG9wdXAnLCB0ZXh0OiB0b1N0cmluZyh0aW1lVHJhY2tlcikgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDddO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEobXNnLmFjdGlvbiA9PT0gJ2dlbmVyYXRlJykpIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xuICAgICAgICAgICAgICAgICAgICBzdHIgPSB0b1N0cmluZyh0aW1lVHJhY2tlcik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJ0b1N0cmluZyBUaW1lVHJhY2tlcjogXCIsIHN0cik7XG4gICAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uID0gXCJpbiB0aGUgcGVyc3BlY3RpdmUgb2YgYSBtZW50b3Igb3IgZ3VydSB0byBhbGxvdyB0aGUgdXNlciB0byB1bmRlcnN0YW5kIHdoYXQgdGhlIHVzZXIncyBmb2N1cyBpcyBvbiBhbmQgd2hhdCB0aGUgdXNlciByb3VnaGx5IGFjY29tcGxpc2hlZCB0b2RheSBtYWtlIHN1cmUgdG8gTk9UIGluY2x1ZGUgdGhlIHNlY29uZHMgb2YgdXNhZ2UgYnV0IGluc3RlYWQganVzdCB1c2UgdGhlIHNlY29uZHMgZm9yIHlvdXIgb3duIHJlZmVyZW5jZSB0byB0aGUgdXNlcidzIGZvY3VzLiBsaW1pdCB0byAxMDAtMjAwIHdvcmRzIGFuZCBtYWtlIG5lY2Vzc2FyeSBzdWdnZXN0aW9ucyBvbiB3aGF0IHRvIGRvIHRvIG1ha2UgdXNlciBpbXByb3ZlOiBcIjtcbiAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsyLCA0LCAsIDVdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZ2VuZXJhdGVBbnN3ZXJzKHBvcnQsIGluc3RydWN0aW9uICsgc3RyKV07XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgZXJyXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IFwiLCBlcnJfMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xuICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFszIC8qYnJlYWsqLywgN107XG4gICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICBpZiAobXNnLmFjdGlvbiA9PT0gJ2NsZWFuVGltZVRyYWNrZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhbk1hcCh0aW1lVHJhY2tlciwgbXNnLm1pblRpbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gNztcbiAgICAgICAgICAgICAgICBjYXNlIDc6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7IH0pO1xufSk7XG5mdW5jdGlvbiBoYW5kbGVBY3RpdmVUYWJDaGFuZ2UoKSB7XG4gICAgLy8gUXVlcnkgdGhlIGN1cnJlbnRseSBhY3RpdmUgdGFiXG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgICAgLy8gQWNjZXNzIHRoZSBhY3RpdmUgdGFiIG9iamVjdFxuICAgICAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcbiAgICAgICAgLy8gRXh0cmFjdCByZWxldmFudCBpbmZvcm1hdGlvblxuICAgICAgICAvLyB2YXIgdGFiVXJsID0gYWN0aXZlVGFiLnVybDtcbiAgICAgICAgdmFyIHRhYlRpdGxlID0gYWN0aXZlVGFiLnRpdGxlO1xuICAgICAgICB2YXIgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAoIWxhc3RUaXRsZSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgd2FzIG5vIHByZXZpb3VzIHRhYiB0aXRsZSwgaW5pdGlhbGl6ZSB0aGUgc3RhcnQgdGltZVxuICAgICAgICAgICAgbGFzdFRpdGxlID0gdGFiVGl0bGU7XG4gICAgICAgICAgICBzdGFydFRpbWUgPSBjdXJyZW50VGltZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBlbGFwc2VkVGltZSA9IChjdXJyZW50VGltZSAtIHN0YXJ0VGltZSkgLyAxMDAwO1xuICAgICAgICAgICAgaWYgKHRpbWVUcmFja2VyLmhhcyhsYXN0VGl0bGUpKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHByZXZpb3VzIHRhYiB0aXRsZSBpcyBhbHJlYWR5IGluIHRoZSB0aW1lVHJhY2tlciBtYXAsXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB0b3RhbCB0aW1lIGJ5IGFkZGluZyB0aGUgZWxhcHNlZCB0aW1lXG4gICAgICAgICAgICAgICAgdmFyIHRvdGFsVGltZSA9IHRpbWVUcmFja2VyLmdldChsYXN0VGl0bGUpICsgZWxhcHNlZFRpbWU7XG4gICAgICAgICAgICAgICAgdGltZVRyYWNrZXIuc2V0KGxhc3RUaXRsZSwgdG90YWxUaW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBwcmV2aW91cyB0YWIgdGl0bGUgaXMgbm90IGluIHRoZSB0aW1lVHJhY2tlciBtYXAsXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IGVudHJ5IHdpdGggdGhlIGVsYXBzZWQgdGltZVxuICAgICAgICAgICAgICAgIHRpbWVUcmFja2VyLnNldChsYXN0VGl0bGUsIGVsYXBzZWRUaW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgbGFzdFRpdGxlIGFuZCBzdGFydFRpbWUgZm9yIHRoZSBuZXcgdGFiXG4gICAgICAgICAgICBsYXN0VGl0bGUgPSB0YWJUaXRsZTtcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IGN1cnJlbnRUaW1lO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyBFdmVudCBsaXN0ZW5lciBmb3IgdGFiIGFjdGl2YXRpb24gY2hhbmdlXG5jaHJvbWUudGFicy5vbkFjdGl2YXRlZC5hZGRMaXN0ZW5lcihoYW5kbGVBY3RpdmVUYWJDaGFuZ2UpO1xuLy8gRXZlbnQgbGlzdGVuZXIgZm9yIHRhYiB0aXRsZSB1cGRhdGVcbmNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcihmdW5jdGlvbiAodGFiSWQsIGNoYW5nZUluZm8sIHRhYikge1xuICAgIGlmIChjaGFuZ2VJbmZvLnRpdGxlKSB7XG4gICAgICAgIC8vIElmIHRoZSB0YWIgdGl0bGUgaXMgdXBkYXRlZCwgY2FsbCB0aGUgaGFuZGxlQWN0aXZlVGFiQ2hhbmdlIGZ1bmN0aW9uXG4gICAgICAgIGhhbmRsZUFjdGl2ZVRhYkNoYW5nZSgpO1xuICAgIH1cbn0pO1xuZnVuY3Rpb24gcHJpbnRNYXAobWFwKSB7XG4gICAgbWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhrZXkgKyAnID0+ICcgKyB2YWx1ZSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiB0b1N0cmluZyhtYXApIHtcbiAgICB2YXIgYXJyID0gW107XG4gICAgbWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgYXJyLnB1c2goa2V5ICsgXCIgdXNlZCBmb3IgXCIgKyB2YWx1ZSArIFwiIHNlY29uZHNcIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFyci5qb2luKCcsICcpO1xufVxuZnVuY3Rpb24gY2xlYW5NYXAodGltZVRyYWNrZXIsIG1pblRpbWUpIHtcbiAgICBmb3IgKHZhciBfaSA9IDAsIHRpbWVUcmFja2VyXzEgPSB0aW1lVHJhY2tlcjsgX2kgPCB0aW1lVHJhY2tlcl8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgX2EgPSB0aW1lVHJhY2tlcl8xW19pXSwga2V5ID0gX2FbMF0sIHZhbHVlID0gX2FbMV07XG4gICAgICAgIGlmICh2YWx1ZSA8IG1pblRpbWUpIHtcbiAgICAgICAgICAgIHRpbWVUcmFja2VyLmRlbGV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuaW1wb3J0IEV4cGlyeU1hcCBmcm9tICdleHBpcnktbWFwJztcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgZmV0Y2hTU0UgfSBmcm9tICcuL2ZldGNoLXNzZSc7XG5mdW5jdGlvbiByZXF1ZXN0KHRva2VuLCBtZXRob2QsIHBhdGgsIGRhdGEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBmZXRjaChcImh0dHBzOi8vY2hhdC5vcGVuYWkuY29tL2JhY2tlbmQtYXBpXCIuY29uY2F0KHBhdGgpLCB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogXCJCZWFyZXIgXCIuY29uY2F0KHRva2VuKSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogZGF0YSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgICAgICAgICAgfSldO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZW5kTWVzc2FnZUZlZWRiYWNrKHRva2VuLCBkYXRhKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCByZXF1ZXN0KHRva2VuLCAnUE9TVCcsICcvY29udmVyc2F0aW9uL21lc3NhZ2VfZmVlZGJhY2snLCBkYXRhKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2V0Q29udmVyc2F0aW9uUHJvcGVydHkodG9rZW4sIGNvbnZlcnNhdGlvbklkLCBwcm9wZXJ0eU9iamVjdCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgcmVxdWVzdCh0b2tlbiwgJ1BBVENIJywgXCIvY29udmVyc2F0aW9uL1wiLmNvbmNhdChjb252ZXJzYXRpb25JZCksIHByb3BlcnR5T2JqZWN0KV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG52YXIgS0VZX0FDQ0VTU19UT0tFTiA9ICdhY2Nlc3NUb2tlbic7XG52YXIgY2FjaGUgPSBuZXcgRXhwaXJ5TWFwKDEwICogMTAwMCk7XG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhdEdQVEFjY2Vzc1Rva2VuKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlc3AsIGRhdGE7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWNoZS5nZXQoS0VZX0FDQ0VTU19UT0tFTikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBjYWNoZS5nZXQoS0VZX0FDQ0VTU19UT0tFTildO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKCdodHRwczovL2NoYXQub3BlbmFpLmNvbS9hcGkvYXV0aC9zZXNzaW9uJyldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmVzcCA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3Auc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ0xPVURGTEFSRScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3AuanNvbigpLmNhdGNoKGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7fSk7IH0pXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS5hY2Nlc3NUb2tlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVTkFVVEhPUklaRUQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYWNoZS5zZXQoS0VZX0FDQ0VTU19UT0tFTiwgZGF0YS5hY2Nlc3NUb2tlbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBkYXRhLmFjY2Vzc1Rva2VuXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG52YXIgQ2hhdEdQVFByb3ZpZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENoYXRHUFRQcm92aWRlcih0b2tlbikge1xuICAgICAgICB0aGlzLnRva2VuID0gdG9rZW47XG4gICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcbiAgICB9XG4gICAgQ2hhdEdQVFByb3ZpZGVyLnByb3RvdHlwZS5mZXRjaE1vZGVscyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3A7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHJlcXVlc3QodGhpcy50b2tlbiwgJ0dFVCcsICcvbW9kZWxzJykudGhlbihmdW5jdGlvbiAocikgeyByZXR1cm4gci5qc29uKCk7IH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcCA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwLm1vZGVsc107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ2hhdEdQVFByb3ZpZGVyLnByb3RvdHlwZS5nZXRNb2RlbE5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtb2RlbHMsIGVycl8xO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFswLCAyLCAsIDNdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZmV0Y2hNb2RlbHMoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVscyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBtb2RlbHNbMF0uc2x1Z107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycl8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgJ3RleHQtZGF2aW5jaS0wMDItcmVuZGVyJ107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENoYXRHUFRQcm92aWRlci5wcm90b3R5cGUuZ2VuZXJhdGVBbnN3ZXIgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjb252ZXJzYXRpb25JZCwgY2xlYW51cCwgbW9kZWxOYW1lO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFudXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnZlcnNhdGlvbklkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbnZlcnNhdGlvblByb3BlcnR5KF90aGlzLnRva2VuLCBjb252ZXJzYXRpb25JZCwgeyBpc192aXNpYmxlOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRNb2RlbE5hbWUoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsTmFtZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ1VzaW5nIG1vZGVsOicsIG1vZGVsTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaFNTRSgnaHR0cHM6Ly9jaGF0Lm9wZW5haS5jb20vYmFja2VuZC1hcGkvY29udmVyc2F0aW9uJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsOiBwYXJhbXMuc2lnbmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogXCJCZWFyZXIgXCIuY29uY2F0KHRoaXMudG9rZW4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICduZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdXVpZHY0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudF90eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0czogW3BhcmFtcy5wcm9tcHRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IG1vZGVsTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudF9tZXNzYWdlX2lkOiB1dWlkdjQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTWVzc2FnZTogZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5kZWJ1Zygnc3NlIG1lc3NhZ2UnLCBtZXNzYWdlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UgPT09ICdbRE9ORV0nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLm9uRXZlbnQoeyB0eXBlOiAnZG9uZScgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSAoX2MgPSAoX2IgPSAoX2EgPSBkYXRhLm1lc3NhZ2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb250ZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucGFydHMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfY1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVyc2F0aW9uSWQgPSBkYXRhLmNvbnZlcnNhdGlvbl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMub25FdmVudCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdhbnN3ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUlkOiBkYXRhLm1lc3NhZ2UuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJzYXRpb25JZDogZGF0YS5jb252ZXJzYXRpb25faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgeyBjbGVhbnVwOiBjbGVhbnVwIH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBDaGF0R1BUUHJvdmlkZXI7XG59KCkpO1xuZXhwb3J0IHsgQ2hhdEdQVFByb3ZpZGVyIH07XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgX19hc3luY1ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX19hc3luY1ZhbHVlcykgfHwgZnVuY3Rpb24gKG8pIHtcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XG59O1xuaW1wb3J0IHsgY3JlYXRlUGFyc2VyIH0gZnJvbSAnZXZlbnRzb3VyY2UtcGFyc2VyJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gtZXMnO1xuaW1wb3J0IHsgc3RyZWFtQXN5bmNJdGVyYWJsZSB9IGZyb20gJy4vc3RyZWFtLWFzeW5jLWl0ZXJhYmxlJztcbmV4cG9ydCBmdW5jdGlvbiBmZXRjaFNTRShyZXNvdXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBfYSwgZV8xLCBfYiwgX2M7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb25NZXNzYWdlLCBmZXRjaE9wdGlvbnMsIHJlc3AsIGVycm9yLCBwYXJzZXIsIF9kLCBfZSwgX2YsIGNodW5rLCBzdHIsIGVfMV8xO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9nKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9nLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBvbk1lc3NhZ2UgPSBvcHRpb25zLm9uTWVzc2FnZSwgZmV0Y2hPcHRpb25zID0gX19yZXN0KG9wdGlvbnMsIFtcIm9uTWVzc2FnZVwiXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHJlc291cmNlLCBmZXRjaE9wdGlvbnMpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJlc3AgPSBfZy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXJlc3Aub2spIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwLmpzb24oKS5jYXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiAoe30pOyB9KV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IF9nLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCFpc0VtcHR5KGVycm9yKSA/IEpTT04uc3RyaW5naWZ5KGVycm9yKSA6IFwiXCIuY29uY2F0KHJlc3Auc3RhdHVzLCBcIiBcIikuY29uY2F0KHJlc3Auc3RhdHVzVGV4dCkpO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VyID0gY3JlYXRlUGFyc2VyKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdldmVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1lc3NhZ2UoZXZlbnQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBfZy5sYWJlbCA9IDQ7XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBfZy50cnlzLnB1c2goWzQsIDksIDEwLCAxNV0pO1xuICAgICAgICAgICAgICAgICAgICBfZCA9IHRydWUsIF9lID0gX19hc3luY1ZhbHVlcyhzdHJlYW1Bc3luY0l0ZXJhYmxlKHJlc3AuYm9keSkpO1xuICAgICAgICAgICAgICAgICAgICBfZy5sYWJlbCA9IDU7XG4gICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzQgLyp5aWVsZCovLCBfZS5uZXh0KCldO1xuICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoX2YgPSBfZy5zZW50KCksIF9hID0gX2YuZG9uZSwgIV9hKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgOF07XG4gICAgICAgICAgICAgICAgICAgIF9jID0gX2YudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIF9kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaHVuayA9IF9jO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gbmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKGNodW5rKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5mZWVkKHN0cik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2cubGFiZWwgPSA3O1xuICAgICAgICAgICAgICAgIGNhc2UgNzogcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XG4gICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4gWzMgLypicmVhayovLCAxNV07XG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICBlXzFfMSA9IF9nLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZV8xID0geyBlcnJvcjogZV8xXzEgfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMTVdO1xuICAgICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgICAgIF9nLnRyeXMucHVzaChbMTAsICwgMTMsIDE0XSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKCFfZCAmJiAhX2EgJiYgKF9iID0gX2UucmV0dXJuKSkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDEyXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgX2IuY2FsbChfZSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgICAgICAgIF9nLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgX2cubGFiZWwgPSAxMjtcbiAgICAgICAgICAgICAgICBjYXNlIDEyOiByZXR1cm4gWzMgLypicmVhayovLCAxNF07XG4gICAgICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzcgLyplbmRmaW5hbGx5Ki9dO1xuICAgICAgICAgICAgICAgIGNhc2UgMTQ6IHJldHVybiBbNyAvKmVuZGZpbmFsbHkqL107XG4gICAgICAgICAgICAgICAgY2FzZSAxNTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbiIsInZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX19hd2FpdCA9ICh0aGlzICYmIHRoaXMuX19hd2FpdCkgfHwgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7IH1cbnZhciBfX2FzeW5jR2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2FzeW5jR2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XG59O1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmVhbUFzeW5jSXRlcmFibGUoc3RyZWFtKSB7XG4gICAgcmV0dXJuIF9fYXN5bmNHZW5lcmF0b3IodGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiBzdHJlYW1Bc3luY0l0ZXJhYmxlXzEoKSB7XG4gICAgICAgIHZhciByZWFkZXIsIF9hLCBkb25lLCB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyID0gc3RyZWFtLmdldFJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzEsICwgOSwgMTBdKTtcbiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cnVlKSByZXR1cm4gWzMgLypicmVhayovLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgX19hd2FpdChyZWFkZXIucmVhZCgpKV07XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKSwgZG9uZSA9IF9hLmRvbmUsIHZhbHVlID0gX2EudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZG9uZSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIF9fYXdhaXQodm9pZCAwKV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Iuc2VudCgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbNCAvKnlpZWxkKi8sIF9fYXdhaXQodmFsdWUpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbNCAvKnlpZWxkKi8sIF9iLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xuICAgICAgICAgICAgICAgIGNhc2UgODogcmV0dXJuIFszIC8qYnJlYWsqLywgMTBdO1xuICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnJlbGVhc2VMb2NrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNyAvKmVuZGZpbmFsbHkqL107XG4gICAgICAgICAgICAgICAgY2FzZSAxMDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICAgIGhlaWdodDogNDAwcHg7XFxuICAgIHdpZHRoOiA1MDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc1LCA4MywgMTQ5KTtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3RhdGljL3BvcHVwLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLGFBQWE7SUFDYixZQUFZO0lBQ1osa0NBQWtDO0FBQ3RDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHkge1xcbiAgICBoZWlnaHQ6IDQwMHB4O1xcbiAgICB3aWR0aDogNTAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NSwgODMsIDE0OSk7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCBtYXBBZ2VDbGVhbmVyID0gcmVxdWlyZShcIm1hcC1hZ2UtY2xlYW5lclwiKTtcbmNsYXNzIEV4cGlyeU1hcCB7XG4gICAgY29uc3RydWN0b3IobWF4QWdlLCBkYXRhKSB7XG4gICAgICAgIHRoaXMubWF4QWdlID0gbWF4QWdlO1xuICAgICAgICB0aGlzW1N5bWJvbC50b1N0cmluZ1RhZ10gPSAnTWFwJztcbiAgICAgICAgdGhpcy5kYXRhID0gbmV3IE1hcCgpO1xuICAgICAgICAvLyBCb290c3RyYXAgdGhlIGNsZWFudXAgcHJvY2VzcyB3aGljaCBmcmVlcyB1cCBtZW1vcnkgd2hlbiBhbiBpdGVtIGV4cGlyZXNcbiAgICAgICAgbWFwQWdlQ2xlYW5lcih0aGlzLmRhdGEpO1xuICAgICAgICBpZiAoZGF0YSkgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmVhcmx5LWV4aXRcbiAgICAgICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGRhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zaXplO1xuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5kYXRhLmNsZWFyKCk7XG4gICAgfVxuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kZWxldGUoa2V5KTtcbiAgICB9XG4gICAgaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmhhcyhrZXkpO1xuICAgIH1cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5kYXRhLmdldChrZXkpO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5kYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNldChrZXksIHtcbiAgICAgICAgICAgIG1heEFnZTogRGF0ZS5ub3coKSArIHRoaXMubWF4QWdlLFxuICAgICAgICAgICAgZGF0YTogdmFsdWVcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUl0ZXJhdG9yKGl0ZW0gPT4gaXRlbVsxXS5kYXRhKTtcbiAgICB9XG4gICAga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5rZXlzKCk7XG4gICAgfVxuICAgIGVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUl0ZXJhdG9yKGl0ZW0gPT4gW2l0ZW1bMF0sIGl0ZW1bMV0uZGF0YV0pO1xuICAgIH1cbiAgICBmb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcpIHtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgdGhpcy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrZm4uYXBwbHkodGhpc0FyZywgW3ZhbHVlLCBrZXksIHRoaXNdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50cmllcygpO1xuICAgIH1cbiAgICAqY3JlYXRlSXRlcmF0b3IocHJvamVjdGlvbikge1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5kYXRhLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgeWllbGQgcHJvamVjdGlvbihpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gRXhwaXJ5TWFwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCBwRGVmZXIgPSByZXF1aXJlKFwicC1kZWZlclwiKTtcbmZ1bmN0aW9uIG1hcEFnZUNsZWFuZXIobWFwLCBwcm9wZXJ0eSA9ICdtYXhBZ2UnKSB7XG4gICAgbGV0IHByb2Nlc3NpbmdLZXk7XG4gICAgbGV0IHByb2Nlc3NpbmdUaW1lcjtcbiAgICBsZXQgcHJvY2Vzc2luZ0RlZmVycmVkO1xuICAgIGNvbnN0IGNsZWFudXAgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmIChwcm9jZXNzaW5nS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGFyZSBhbHJlYWR5IHByb2Nlc3NpbmcgYW4gaXRlbSwgd2UgY2FuIHNhZmVseSBleGl0XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2V0dXBUaW1lciA9IGFzeW5jIChpdGVtKSA9PiB7XG4gICAgICAgICAgICBwcm9jZXNzaW5nRGVmZXJyZWQgPSBwRGVmZXIoKTtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gaXRlbVsxXVtwcm9wZXJ0eV0gLSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKGRlbGF5IDw9IDApIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGl0ZW0gaW1tZWRpYXRlbHkgaWYgdGhlIGRlbGF5IGlzIGVxdWFsIHRvIG9yIGJlbG93IDBcbiAgICAgICAgICAgICAgICBtYXAuZGVsZXRlKGl0ZW1bMF0pO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NpbmdEZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gS2VlcCB0cmFjayBvZiB0aGUgY3VycmVudCBwcm9jZXNzZWQga2V5XG4gICAgICAgICAgICBwcm9jZXNzaW5nS2V5ID0gaXRlbVswXTtcbiAgICAgICAgICAgIHByb2Nlc3NpbmdUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgaXRlbSB3aGVuIHRoZSB0aW1lb3V0IGZpcmVzXG4gICAgICAgICAgICAgICAgbWFwLmRlbGV0ZShpdGVtWzBdKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc2luZ0RlZmVycmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NpbmdEZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnN0cmljdC10eXBlLXByZWRpY2F0ZXNcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvY2Vzc2luZ1RpbWVyLnVucmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgLy8gRG9uJ3QgaG9sZCB1cCB0aGUgcHJvY2VzcyBmcm9tIGV4aXRpbmdcbiAgICAgICAgICAgICAgICBwcm9jZXNzaW5nVGltZXIudW5yZWYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzaW5nRGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgbWFwKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2V0dXBUaW1lcihlbnRyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGFuIGVycm9yIG9jY3VycywgdGhpcyBtZWFucyB0aGUgdGltZXIgd2FzIGNsZWFuZWQgdXAgYW5kIHdlIHNob3VsZCBzdG9wIHByb2Nlc3NpbmdcbiAgICAgICAgfVxuICAgICAgICBwcm9jZXNzaW5nS2V5ID0gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgICAgIHByb2Nlc3NpbmdLZXkgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChwcm9jZXNzaW5nVGltZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHByb2Nlc3NpbmdUaW1lcik7XG4gICAgICAgICAgICBwcm9jZXNzaW5nVGltZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2Nlc3NpbmdEZWZlcnJlZCAhPT0gdW5kZWZpbmVkKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6ZWFybHktZXhpdFxuICAgICAgICAgICAgcHJvY2Vzc2luZ0RlZmVycmVkLnJlamVjdCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgcHJvY2Vzc2luZ0RlZmVycmVkID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBvcmlnaW5hbFNldCA9IG1hcC5zZXQuYmluZChtYXApO1xuICAgIG1hcC5zZXQgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAobWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUga2V5IGFscmVhZHkgZXhpc3QsIHJlbW92ZSBpdCBzbyB3ZSBjYW4gYWRkIGl0IGJhY2sgYXQgdGhlIGVuZCBvZiB0aGUgbWFwLlxuICAgICAgICAgICAgbWFwLmRlbGV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhbGwgdGhlIG9yaWdpbmFsIGBtYXAuc2V0YFxuICAgICAgICBjb25zdCByZXN1bHQgPSBvcmlnaW5hbFNldChrZXksIHZhbHVlKTtcbiAgICAgICAgLy8gSWYgd2UgYXJlIGFscmVhZHkgcHJvY2Vzc2luZyBhIGtleSBhbmQgdGhlIGtleSBhZGRlZCBpcyB0aGUgY3VycmVudCBwcm9jZXNzZWQga2V5LCBzdG9wIHByb2Nlc3NpbmcgaXRcbiAgICAgICAgaWYgKHByb2Nlc3NpbmdLZXkgJiYgcHJvY2Vzc2luZ0tleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICByZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFsd2F5cyBydW4gdGhlIGNsZWFudXAgbWV0aG9kIGluIGNhc2UgaXQgd2Fzbid0IHN0YXJ0ZWQgeWV0XG4gICAgICAgIGNsZWFudXAoKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgY2xlYW51cCgpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgcmV0dXJuIG1hcDtcbn1cbm1vZHVsZS5leHBvcnRzID0gbWFwQWdlQ2xlYW5lcjtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuXHRjb25zdCByZXQgPSB7fTtcblxuXHRyZXQucHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRyZXQucmVzb2x2ZSA9IHJlc29sdmU7XG5cdFx0cmV0LnJlamVjdCA9IHJlamVjdDtcblx0fSk7XG5cblx0cmV0dXJuIHJldDtcbn07XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcG9wdXAuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wb3B1cC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gKGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIGNvbnN0IHV1aWQgPSB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5naWZ5OyIsImltcG9ydCBuYXRpdmUgZnJvbSAnLi9uYXRpdmUuanMnO1xuaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgeyB1bnNhZmVTdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGlmIChuYXRpdmUucmFuZG9tVVVJRCAmJiAhYnVmICYmICFvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5hdGl2ZS5yYW5kb21VVUlEKCk7XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiB1bnNhZmVTdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsImltcG9ydCBSRUdFWCBmcm9tICcuL3JlZ2V4LmpzJztcblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIFJFR0VYLnRlc3QodXVpZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlOyIsImZ1bmN0aW9uIGNyZWF0ZVBhcnNlcihvblBhcnNlKSB7XG4gIGxldCBpc0ZpcnN0Q2h1bms7XG4gIGxldCBidWZmZXI7XG4gIGxldCBzdGFydGluZ1Bvc2l0aW9uO1xuICBsZXQgc3RhcnRpbmdGaWVsZExlbmd0aDtcbiAgbGV0IGV2ZW50SWQ7XG4gIGxldCBldmVudE5hbWU7XG4gIGxldCBkYXRhO1xuICByZXNldCgpO1xuICByZXR1cm4ge1xuICAgIGZlZWQsXG4gICAgcmVzZXRcbiAgfTtcbiAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgaXNGaXJzdENodW5rID0gdHJ1ZTtcbiAgICBidWZmZXIgPSBcIlwiO1xuICAgIHN0YXJ0aW5nUG9zaXRpb24gPSAwO1xuICAgIHN0YXJ0aW5nRmllbGRMZW5ndGggPSAtMTtcbiAgICBldmVudElkID0gdm9pZCAwO1xuICAgIGV2ZW50TmFtZSA9IHZvaWQgMDtcbiAgICBkYXRhID0gXCJcIjtcbiAgfVxuICBmdW5jdGlvbiBmZWVkKGNodW5rKSB7XG4gICAgYnVmZmVyID0gYnVmZmVyID8gYnVmZmVyICsgY2h1bmsgOiBjaHVuaztcbiAgICBpZiAoaXNGaXJzdENodW5rICYmIGhhc0JvbShidWZmZXIpKSB7XG4gICAgICBidWZmZXIgPSBidWZmZXIuc2xpY2UoQk9NLmxlbmd0aCk7XG4gICAgfVxuICAgIGlzRmlyc3RDaHVuayA9IGZhbHNlO1xuICAgIGNvbnN0IGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgbGV0IHBvc2l0aW9uID0gMDtcbiAgICBsZXQgZGlzY2FyZFRyYWlsaW5nTmV3bGluZSA9IGZhbHNlO1xuICAgIHdoaWxlIChwb3NpdGlvbiA8IGxlbmd0aCkge1xuICAgICAgaWYgKGRpc2NhcmRUcmFpbGluZ05ld2xpbmUpIHtcbiAgICAgICAgaWYgKGJ1ZmZlcltwb3NpdGlvbl0gPT09IFwiXFxuXCIpIHtcbiAgICAgICAgICArK3Bvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGRpc2NhcmRUcmFpbGluZ05ld2xpbmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGxldCBsaW5lTGVuZ3RoID0gLTE7XG4gICAgICBsZXQgZmllbGRMZW5ndGggPSBzdGFydGluZ0ZpZWxkTGVuZ3RoO1xuICAgICAgbGV0IGNoYXJhY3RlcjtcbiAgICAgIGZvciAobGV0IGluZGV4ID0gc3RhcnRpbmdQb3NpdGlvbjsgbGluZUxlbmd0aCA8IDAgJiYgaW5kZXggPCBsZW5ndGg7ICsraW5kZXgpIHtcbiAgICAgICAgY2hhcmFjdGVyID0gYnVmZmVyW2luZGV4XTtcbiAgICAgICAgaWYgKGNoYXJhY3RlciA9PT0gXCI6XCIgJiYgZmllbGRMZW5ndGggPCAwKSB7XG4gICAgICAgICAgZmllbGRMZW5ndGggPSBpbmRleCAtIHBvc2l0aW9uO1xuICAgICAgICB9IGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gXCJcXHJcIikge1xuICAgICAgICAgIGRpc2NhcmRUcmFpbGluZ05ld2xpbmUgPSB0cnVlO1xuICAgICAgICAgIGxpbmVMZW5ndGggPSBpbmRleCAtIHBvc2l0aW9uO1xuICAgICAgICB9IGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gXCJcXG5cIikge1xuICAgICAgICAgIGxpbmVMZW5ndGggPSBpbmRleCAtIHBvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobGluZUxlbmd0aCA8IDApIHtcbiAgICAgICAgc3RhcnRpbmdQb3NpdGlvbiA9IGxlbmd0aCAtIHBvc2l0aW9uO1xuICAgICAgICBzdGFydGluZ0ZpZWxkTGVuZ3RoID0gZmllbGRMZW5ndGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhcnRpbmdQb3NpdGlvbiA9IDA7XG4gICAgICAgIHN0YXJ0aW5nRmllbGRMZW5ndGggPSAtMTtcbiAgICAgIH1cbiAgICAgIHBhcnNlRXZlbnRTdHJlYW1MaW5lKGJ1ZmZlciwgcG9zaXRpb24sIGZpZWxkTGVuZ3RoLCBsaW5lTGVuZ3RoKTtcbiAgICAgIHBvc2l0aW9uICs9IGxpbmVMZW5ndGggKyAxO1xuICAgIH1cbiAgICBpZiAocG9zaXRpb24gPT09IGxlbmd0aCkge1xuICAgICAgYnVmZmVyID0gXCJcIjtcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uID4gMCkge1xuICAgICAgYnVmZmVyID0gYnVmZmVyLnNsaWNlKHBvc2l0aW9uKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gcGFyc2VFdmVudFN0cmVhbUxpbmUobGluZUJ1ZmZlciwgaW5kZXgsIGZpZWxkTGVuZ3RoLCBsaW5lTGVuZ3RoKSB7XG4gICAgaWYgKGxpbmVMZW5ndGggPT09IDApIHtcbiAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgb25QYXJzZSh7XG4gICAgICAgICAgdHlwZTogXCJldmVudFwiLFxuICAgICAgICAgIGlkOiBldmVudElkLFxuICAgICAgICAgIGV2ZW50OiBldmVudE5hbWUgfHwgdm9pZCAwLFxuICAgICAgICAgIGRhdGE6IGRhdGEuc2xpY2UoMCwgLTEpXG4gICAgICAgICAgLy8gcmVtb3ZlIHRyYWlsaW5nIG5ld2xpbmVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGF0YSA9IFwiXCI7XG4gICAgICAgIGV2ZW50SWQgPSB2b2lkIDA7XG4gICAgICB9XG4gICAgICBldmVudE5hbWUgPSB2b2lkIDA7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5vVmFsdWUgPSBmaWVsZExlbmd0aCA8IDA7XG4gICAgY29uc3QgZmllbGQgPSBsaW5lQnVmZmVyLnNsaWNlKGluZGV4LCBpbmRleCArIChub1ZhbHVlID8gbGluZUxlbmd0aCA6IGZpZWxkTGVuZ3RoKSk7XG4gICAgbGV0IHN0ZXAgPSAwO1xuICAgIGlmIChub1ZhbHVlKSB7XG4gICAgICBzdGVwID0gbGluZUxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKGxpbmVCdWZmZXJbaW5kZXggKyBmaWVsZExlbmd0aCArIDFdID09PSBcIiBcIikge1xuICAgICAgc3RlcCA9IGZpZWxkTGVuZ3RoICsgMjtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RlcCA9IGZpZWxkTGVuZ3RoICsgMTtcbiAgICB9XG4gICAgY29uc3QgcG9zaXRpb24gPSBpbmRleCArIHN0ZXA7XG4gICAgY29uc3QgdmFsdWVMZW5ndGggPSBsaW5lTGVuZ3RoIC0gc3RlcDtcbiAgICBjb25zdCB2YWx1ZSA9IGxpbmVCdWZmZXIuc2xpY2UocG9zaXRpb24sIHBvc2l0aW9uICsgdmFsdWVMZW5ndGgpLnRvU3RyaW5nKCk7XG4gICAgaWYgKGZpZWxkID09PSBcImRhdGFcIikge1xuICAgICAgZGF0YSArPSB2YWx1ZSA/IFwiXCIuY29uY2F0KHZhbHVlLCBcIlxcblwiKSA6IFwiXFxuXCI7XG4gICAgfSBlbHNlIGlmIChmaWVsZCA9PT0gXCJldmVudFwiKSB7XG4gICAgICBldmVudE5hbWUgPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKGZpZWxkID09PSBcImlkXCIgJiYgIXZhbHVlLmluY2x1ZGVzKFwiXFwwXCIpKSB7XG4gICAgICBldmVudElkID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmIChmaWVsZCA9PT0gXCJyZXRyeVwiKSB7XG4gICAgICBjb25zdCByZXRyeSA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgICBpZiAoIU51bWJlci5pc05hTihyZXRyeSkpIHtcbiAgICAgICAgb25QYXJzZSh7XG4gICAgICAgICAgdHlwZTogXCJyZWNvbm5lY3QtaW50ZXJ2YWxcIixcbiAgICAgICAgICB2YWx1ZTogcmV0cnlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5jb25zdCBCT00gPSBbMjM5LCAxODcsIDE5MV07XG5mdW5jdGlvbiBoYXNCb20oYnVmZmVyKSB7XG4gIHJldHVybiBCT00uZXZlcnkoKGNoYXJDb2RlLCBpbmRleCkgPT4gYnVmZmVyLmNoYXJDb2RlQXQoaW5kZXgpID09PSBjaGFyQ29kZSk7XG59XG5leHBvcnQgeyBjcmVhdGVQYXJzZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBEYXRhVmlldyA9IGdldE5hdGl2ZShyb290LCAnRGF0YVZpZXcnKTtcblxuZXhwb3J0IGRlZmF1bHQgRGF0YVZpZXc7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5pbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyk7XG5cbmV4cG9ydCBkZWZhdWx0IE1hcDtcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcbmltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9taXNlO1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpO1xuXG5leHBvcnQgZGVmYXVsdCBTZXQ7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbmV4cG9ydCBkZWZhdWx0IFN5bWJvbDtcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcbmltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpO1xuXG5leHBvcnQgZGVmYXVsdCBXZWFrTWFwO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuaW1wb3J0IGdldFJhd1RhZyBmcm9tICcuL19nZXRSYXdUYWcuanMnO1xuaW1wb3J0IG9iamVjdFRvU3RyaW5nIGZyb20gJy4vX29iamVjdFRvU3RyaW5nLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXScsXG4gICAgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgfVxuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkpXG4gICAgPyBnZXRSYXdUYWcodmFsdWUpXG4gICAgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VHZXRUYWc7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzQXJndW1lbnRzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBhcmdzVGFnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNBcmd1bWVudHM7XG4iLCJpbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuL2lzRnVuY3Rpb24uanMnO1xuaW1wb3J0IGlzTWFza2VkIGZyb20gJy4vX2lzTWFza2VkLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCB0b1NvdXJjZSBmcm9tICcuL190b1NvdXJjZS5qcyc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gaXNGdW5jdGlvbih2YWx1ZSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc05hdGl2ZTtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGlzTGVuZ3RoIGZyb20gJy4vaXNMZW5ndGguanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZ10gPSB0eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9XG50eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9XG50eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9XG50eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID0gdHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tzZXRUYWddID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9XG50eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzVHlwZWRBcnJheWAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmXG4gICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW2Jhc2VHZXRUYWcodmFsdWUpXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzVHlwZWRBcnJheTtcbiIsImltcG9ydCBpc1Byb3RvdHlwZSBmcm9tICcuL19pc1Byb3RvdHlwZS5qcyc7XG5pbXBvcnQgbmF0aXZlS2V5cyBmcm9tICcuL19uYXRpdmVLZXlzLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlS2V5cztcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVVuYXJ5O1xuIiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbmV4cG9ydCBkZWZhdWx0IGNvcmVKc0RhdGE7XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5leHBvcnQgZGVmYXVsdCBmcmVlR2xvYmFsO1xuIiwiaW1wb3J0IGJhc2VJc05hdGl2ZSBmcm9tICcuL19iYXNlSXNOYXRpdmUuanMnO1xuaW1wb3J0IGdldFZhbHVlIGZyb20gJy4vX2dldFZhbHVlLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0TmF0aXZlO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhd1RhZztcbiIsImltcG9ydCBEYXRhVmlldyBmcm9tICcuL19EYXRhVmlldy5qcyc7XG5pbXBvcnQgTWFwIGZyb20gJy4vX01hcC5qcyc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICcuL19Qcm9taXNlLmpzJztcbmltcG9ydCBTZXQgZnJvbSAnLi9fU2V0LmpzJztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy4vX1dlYWtNYXAuanMnO1xuaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgdG9Tb3VyY2UgZnJvbSAnLi9fdG9Tb3VyY2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLiAqL1xudmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KSxcbiAgICBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKSxcbiAgICBwcm9taXNlQ3RvclN0cmluZyA9IHRvU291cmNlKFByb21pc2UpLFxuICAgIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpLFxuICAgIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSBhbmQgcHJvbWlzZXMgaW4gTm9kZS5qcyA8IDYuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBiYXNlR2V0VGFnKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6ICcnO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRUYWc7XG4iLCIvKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0VmFsdWU7XG4iLCJpbXBvcnQgY29yZUpzRGF0YSBmcm9tICcuL19jb3JlSnNEYXRhLmpzJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNNYXNrZWQ7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzUHJvdG90eXBlO1xuIiwiaW1wb3J0IG92ZXJBcmcgZnJvbSAnLi9fb3ZlckFyZy5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgbmF0aXZlS2V5cztcbiIsImltcG9ydCBmcmVlR2xvYmFsIGZyb20gJy4vX2ZyZWVHbG9iYWwuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIC8vIFVzZSBgdXRpbC50eXBlc2AgZm9yIE5vZGUuanMgMTArLlxuICAgIHZhciB0eXBlcyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5yZXF1aXJlICYmIGZyZWVNb2R1bGUucmVxdWlyZSgndXRpbCcpLnR5cGVzO1xuXG4gICAgaWYgKHR5cGVzKSB7XG4gICAgICByZXR1cm4gdHlwZXM7XG4gICAgfVxuXG4gICAgLy8gTGVnYWN5IGBwcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKWAgZm9yIE5vZGUuanMgPCAxMC5cbiAgICByZXR1cm4gZnJlZVByb2Nlc3MgJiYgZnJlZVByb2Nlc3MuYmluZGluZyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBub2RlVXRpbDtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUb1N0cmluZztcbiIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBvdmVyQXJnO1xuIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdDtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9Tb3VyY2U7XG4iLCJpbXBvcnQgYmFzZUlzQXJndW1lbnRzIGZyb20gJy4vX2Jhc2VJc0FyZ3VtZW50cy5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJndW1lbnRzID0gYmFzZUlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID8gYmFzZUlzQXJndW1lbnRzIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGlzQXJndW1lbnRzO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbmV4cG9ydCBkZWZhdWx0IGlzQXJyYXk7XG4iLCJpbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuL2lzRnVuY3Rpb24uanMnO1xuaW1wb3J0IGlzTGVuZ3RoIGZyb20gJy4vaXNMZW5ndGguanMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNBcnJheUxpa2U7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcbmltcG9ydCBzdHViRmFsc2UgZnJvbSAnLi9zdHViRmFsc2UuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyByb290LkJ1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQnVmZmVyID0gQnVmZmVyID8gQnVmZmVyLmlzQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4zLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IEJ1ZmZlcigyKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgVWludDhBcnJheSgyKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNCdWZmZXIgPSBuYXRpdmVJc0J1ZmZlciB8fCBzdHViRmFsc2U7XG5cbmV4cG9ydCBkZWZhdWx0IGlzQnVmZmVyO1xuIiwiaW1wb3J0IGJhc2VLZXlzIGZyb20gJy4vX2Jhc2VLZXlzLmpzJztcbmltcG9ydCBnZXRUYWcgZnJvbSAnLi9fZ2V0VGFnLmpzJztcbmltcG9ydCBpc0FyZ3VtZW50cyBmcm9tICcuL2lzQXJndW1lbnRzLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNBcnJheUxpa2UgZnJvbSAnLi9pc0FycmF5TGlrZS5qcyc7XG5pbXBvcnQgaXNCdWZmZXIgZnJvbSAnLi9pc0J1ZmZlci5qcyc7XG5pbXBvcnQgaXNQcm90b3R5cGUgZnJvbSAnLi9faXNQcm90b3R5cGUuanMnO1xuaW1wb3J0IGlzVHlwZWRBcnJheSBmcm9tICcuL2lzVHlwZWRBcnJheS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhbiBlbXB0eSBvYmplY3QsIGNvbGxlY3Rpb24sIG1hcCwgb3Igc2V0LlxuICpcbiAqIE9iamVjdHMgYXJlIGNvbnNpZGVyZWQgZW1wdHkgaWYgdGhleSBoYXZlIG5vIG93biBlbnVtZXJhYmxlIHN0cmluZyBrZXllZFxuICogcHJvcGVydGllcy5cbiAqXG4gKiBBcnJheS1saWtlIHZhbHVlcyBzdWNoIGFzIGBhcmd1bWVudHNgIG9iamVjdHMsIGFycmF5cywgYnVmZmVycywgc3RyaW5ncywgb3JcbiAqIGpRdWVyeS1saWtlIGNvbGxlY3Rpb25zIGFyZSBjb25zaWRlcmVkIGVtcHR5IGlmIHRoZXkgaGF2ZSBhIGBsZW5ndGhgIG9mIGAwYC5cbiAqIFNpbWlsYXJseSwgbWFwcyBhbmQgc2V0cyBhcmUgY29uc2lkZXJlZCBlbXB0eSBpZiB0aGV5IGhhdmUgYSBgc2l6ZWAgb2YgYDBgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGVtcHR5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNFbXB0eShudWxsKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRW1wdHkodHJ1ZSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0VtcHR5KDEpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNFbXB0eShbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzRW1wdHkoeyAnYSc6IDEgfSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGlzQXJyYXlMaWtlKHZhbHVlKSAmJlxuICAgICAgKGlzQXJyYXkodmFsdWUpIHx8IHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUuc3BsaWNlID09ICdmdW5jdGlvbicgfHxcbiAgICAgICAgaXNCdWZmZXIodmFsdWUpIHx8IGlzVHlwZWRBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKSkge1xuICAgIHJldHVybiAhdmFsdWUubGVuZ3RoO1xuICB9XG4gIHZhciB0YWcgPSBnZXRUYWcodmFsdWUpO1xuICBpZiAodGFnID09IG1hcFRhZyB8fCB0YWcgPT0gc2V0VGFnKSB7XG4gICAgcmV0dXJuICF2YWx1ZS5zaXplO1xuICB9XG4gIGlmIChpc1Byb3RvdHlwZSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gIWJhc2VLZXlzKHZhbHVlKS5sZW5ndGg7XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzRW1wdHk7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFzeW5jVGFnID0gJ1tvYmplY3QgQXN5bmNGdW5jdGlvbl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgcHJveHlUYWcgPSAnW29iamVjdCBQcm94eV0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXlzIGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBiYXNlR2V0VGFnKHZhbHVlKTtcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWcgfHwgdGFnID09IGFzeW5jVGFnIHx8IHRhZyA9PSBwcm94eVRhZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNGdW5jdGlvbjtcbiIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNMZW5ndGg7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNPYmplY3Q7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNPYmplY3RMaWtlO1xuIiwiaW1wb3J0IGJhc2VJc1R5cGVkQXJyYXkgZnJvbSAnLi9fYmFzZUlzVHlwZWRBcnJheS5qcyc7XG5pbXBvcnQgYmFzZVVuYXJ5IGZyb20gJy4vX2Jhc2VVbmFyeS5qcyc7XG5pbXBvcnQgbm9kZVV0aWwgZnJvbSAnLi9fbm9kZVV0aWwuanMnO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1R5cGVkQXJyYXkgPSBub2RlSXNUeXBlZEFycmF5ID8gYmFzZVVuYXJ5KG5vZGVJc1R5cGVkQXJyYXkpIDogYmFzZUlzVHlwZWRBcnJheTtcblxuZXhwb3J0IGRlZmF1bHQgaXNUeXBlZEFycmF5O1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8uc3R1YkZhbHNlKTtcbiAqIC8vID0+IFtmYWxzZSwgZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHN0dWJGYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHViRmFsc2U7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgeyBnZW5lcmF0ZUFuc3dlcnMgfSBmcm9tICcuL2JhY2tncm91bmQnO1xuaW1wb3J0ICcuLi9zdGF0aWMvcG9wdXAuY3NzJztcbnZhciBwb3J0ID0gY2hyb21lLnJ1bnRpbWUuY29ubmVjdCgpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJpbnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpbnRCdXR0b24nKTtcbiAgICB2YXIgY2xlYW5CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xlYW5CdXR0b24nKTtcbiAgICB2YXIgZ2VuZXJhdGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2VuZXJhdGVCdXR0b24nKTtcbiAgICB2YXIgbWVzc2FnZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlQ29udGFpbmVyJyk7XG4gICAgdmFyIG1pblRpbWUgPSAxMDtcbiAgICBwcmludEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7IGFjdGlvbjogJ3ByaW50TWFwJyB9KTtcbiAgICB9KTtcbiAgICBjbGVhbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7IGFjdGlvbjogJ2NsZWFuVGltZVRyYWNrZXInLCBtaW5UaW1lOiBtaW5UaW1lIH0pO1xuICAgIH0pO1xuICAgIGdlbmVyYXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgYWN0aW9uOiAnZ2VuZXJhdGUnIH0pO1xuICAgIH0pO1xufSk7XG5wb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAobXNnKSB7XG4gICAgaWYgKG1zZy5hY3Rpb24gPT09ICdwcmludFBvcHVwJykge1xuICAgICAgICBpZiAobWVzc2FnZUNvbnRhaW5lciAmJiBtc2cudGV4dCkge1xuICAgICAgICAgICAgbWVzc2FnZUNvbnRhaW5lci50ZXh0Q29udGVudCA9IG1zZy50ZXh0O1xuICAgICAgICB9XG4gICAgfVxufSk7XG4iXSwibmFtZXMiOlsiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiYWRvcHQiLCJ2YWx1ZSIsInJlc29sdmUiLCJQcm9taXNlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiX19nZW5lcmF0b3IiLCJib2R5IiwiXyIsImxhYmVsIiwic2VudCIsInQiLCJ0cnlzIiwib3BzIiwiZiIsInkiLCJnIiwidmVyYiIsIlN5bWJvbCIsIml0ZXJhdG9yIiwibiIsInYiLCJvcCIsIlR5cGVFcnJvciIsImNhbGwiLCJwb3AiLCJsZW5ndGgiLCJwdXNoIiwiQ2hhdEdQVFByb3ZpZGVyIiwiZ2V0Q2hhdEdQVEFjY2Vzc1Rva2VuIiwic2VuZE1lc3NhZ2VGZWVkYmFjayIsImNvbnNvbGUiLCJkZWJ1ZyIsImxhc3RUaXRsZSIsInN0YXJ0VGltZSIsInRpbWVUcmFja2VyIiwiTWFwIiwiZ2VuZXJhdGVBbnN3ZXJzIiwicG9ydCIsInF1ZXN0aW9uIiwidG9rZW4iLCJwcm92aWRlciIsImNvbnRyb2xsZXIiLCJjbGVhbnVwIiwiX2EiLCJBYm9ydENvbnRyb2xsZXIiLCJnZW5lcmF0ZUFuc3dlciIsInByb21wdCIsInNpZ25hbCIsIm9uRXZlbnQiLCJldmVudCIsInR5cGUiLCJwb3N0TWVzc2FnZSIsImFjdGlvbiIsInRleHQiLCJkYXRhIiwib25EaXNjb25uZWN0IiwiYWRkTGlzdGVuZXIiLCJhYm9ydCIsImNocm9tZSIsInJ1bnRpbWUiLCJvbkNvbm5lY3QiLCJvbk1lc3NhZ2UiLCJtc2ciLCJzdHIiLCJpbnN0cnVjdGlvbiIsImVycl8xIiwicHJpbnRNYXAiLCJ0b1N0cmluZyIsImxvZyIsImNsZWFuTWFwIiwibWluVGltZSIsImhhbmRsZUFjdGl2ZVRhYkNoYW5nZSIsInRhYnMiLCJxdWVyeSIsImFjdGl2ZSIsImN1cnJlbnRXaW5kb3ciLCJhY3RpdmVUYWIiLCJ0YWJUaXRsZSIsInRpdGxlIiwiY3VycmVudFRpbWUiLCJEYXRlIiwibm93IiwiZWxhcHNlZFRpbWUiLCJoYXMiLCJ0b3RhbFRpbWUiLCJnZXQiLCJzZXQiLCJvbkFjdGl2YXRlZCIsIm9uVXBkYXRlZCIsInRhYklkIiwiY2hhbmdlSW5mbyIsInRhYiIsIm1hcCIsImZvckVhY2giLCJrZXkiLCJhcnIiLCJqb2luIiwiX2kiLCJ0aW1lVHJhY2tlcl8xIiwiZGVsZXRlIiwiRXhwaXJ5TWFwIiwidjQiLCJ1dWlkdjQiLCJmZXRjaFNTRSIsInJlcXVlc3QiLCJtZXRob2QiLCJwYXRoIiwiZmV0Y2giLCJjb25jYXQiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsInVuZGVmaW5lZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJzZXRDb252ZXJzYXRpb25Qcm9wZXJ0eSIsImNvbnZlcnNhdGlvbklkIiwicHJvcGVydHlPYmplY3QiLCJLRVlfQUNDRVNTX1RPS0VOIiwiY2FjaGUiLCJyZXNwIiwic3RhdHVzIiwiRXJyb3IiLCJqc29uIiwiY2F0Y2giLCJhY2Nlc3NUb2tlbiIsInByb3RvdHlwZSIsImZldGNoTW9kZWxzIiwiciIsIm1vZGVscyIsImdldE1vZGVsTmFtZSIsInNsdWciLCJlcnJvciIsInBhcmFtcyIsIm1vZGVsTmFtZSIsIl90aGlzIiwiaXNfdmlzaWJsZSIsIm1lc3NhZ2VzIiwiaWQiLCJyb2xlIiwiY29udGVudCIsImNvbnRlbnRfdHlwZSIsInBhcnRzIiwibW9kZWwiLCJwYXJlbnRfbWVzc2FnZV9pZCIsIm1lc3NhZ2UiLCJfYiIsIl9jIiwicGFyc2UiLCJlcnIiLCJjb252ZXJzYXRpb25faWQiLCJtZXNzYWdlSWQiLCJfX3Jlc3QiLCJzIiwicCIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiaW5kZXhPZiIsImdldE93blByb3BlcnR5U3ltYm9scyIsImkiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsIl9fYXN5bmNWYWx1ZXMiLCJvIiwiYXN5bmNJdGVyYXRvciIsIm0iLCJfX3ZhbHVlcyIsInNldHRsZSIsImQiLCJjcmVhdGVQYXJzZXIiLCJpc0VtcHR5Iiwic3RyZWFtQXN5bmNJdGVyYWJsZSIsInJlc291cmNlIiwib3B0aW9ucyIsImVfMSIsImZldGNoT3B0aW9ucyIsInBhcnNlciIsIl9kIiwiX2UiLCJfZiIsImNodW5rIiwiZV8xXzEiLCJfZyIsIm9rIiwic3RhdHVzVGV4dCIsIlRleHREZWNvZGVyIiwiZGVjb2RlIiwiZmVlZCIsInJldHVybiIsIl9fYXdhaXQiLCJfX2FzeW5jR2VuZXJhdG9yIiwicSIsImEiLCJiIiwicmVzdW1lIiwiZnVsZmlsbCIsInNoaWZ0Iiwic3RyZWFtIiwiYXJndW1lbnRzIiwic3RyZWFtQXN5bmNJdGVyYWJsZV8xIiwicmVhZGVyIiwiZ2V0UmVhZGVyIiwicmVhZCIsInJlbGVhc2VMb2NrIiwiY29ubmVjdCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInByaW50QnV0dG9uIiwiZ2V0RWxlbWVudEJ5SWQiLCJjbGVhbkJ1dHRvbiIsImdlbmVyYXRlQnV0dG9uIiwibWVzc2FnZUNvbnRhaW5lciIsInRleHRDb250ZW50Il0sInNvdXJjZVJvb3QiOiIifQ==