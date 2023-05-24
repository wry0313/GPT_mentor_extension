/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
                  console.log("ERROR:", err);
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
      var str, instruction, err_1, count;
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
            instruction = "in the perspective of a mentor or guru to allow the user to understand what the user's focus is on and what the user roughly accomplished today. limit to 100-200 words and make necessary suggestions on what to do to make user improve and also give a productivity rating out of 100: ";
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
              count = cleanMap(timeTracker, msg.minTime);
              port.postMessage({
                action: 'printPopup',
                text: "map cleaned " + count + " items"
              });
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
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    var activeTab = tabs[0];
    var tabTitle = activeTab.title;
    var currentTime = Date.now();
    if (!lastTitle) {
      lastTitle = tabTitle;
      startTime = currentTime;
    } else {
      var elapsedTime = (currentTime - startTime) / 1000;
      if (timeTracker.has(lastTitle)) {
        var totalTime = timeTracker.get(lastTitle) + elapsedTime;
        timeTracker.set(lastTitle, totalTime);
      } else {
        timeTracker.set(lastTitle, elapsedTime);
      }
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
  if (arr.length) {
    return arr.join('\n');
  } else {
    return "no tab recorded";
  }
}
function cleanMap(map, minTime) {
  var count = 0;
  map.forEach(function (value, key) {
    if (value < minTime) {
      timeTracker.delete(key);
      count += 1;
    }
  });
  return count;
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUksQ0FBQztFQUN6QixDQUFDLE1BQ0k7SUFDRCxPQUFPLGlCQUFpQjtFQUM1QjtBQUNKO0FBQ0EsU0FBU3pCLFFBQVFBLENBQUNxQixHQUFHLEVBQUVwQixPQUFPLEVBQUU7RUFDNUIsSUFBSUosS0FBSyxHQUFHLENBQUM7RUFDYndCLEdBQUcsQ0FBQ0MsT0FBTyxDQUFDLFVBQVU1TSxLQUFLLEVBQUU2TSxHQUFHLEVBQUU7SUFDOUIsSUFBSTdNLEtBQUssR0FBR3VMLE9BQU8sRUFBRTtNQUNqQnJCLFdBQVcsQ0FBQzhDLE1BQU0sQ0FBQ0gsR0FBRyxDQUFDO01BQ3ZCMUIsS0FBSyxJQUFJLENBQUM7SUFDZDtFQUNKLENBQUMsQ0FBQztFQUNGLE9BQU9BLEtBQUs7QUFDaEIsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9zcmMvY2hhdGdwdC50cyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vc3JjL2ZldGNoLXNzZS50cyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vc3JjL3N0cmVhbS1hc3luYy1pdGVyYWJsZS50cyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2V4cGlyeS1tYXAvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL21hcC1hZ2UtY2xlYW5lci9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvcC1kZWZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2V2ZW50c291cmNlLXBhcnNlci9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19EYXRhVmlldy5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fTWFwLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19Qcm9taXNlLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TZXQuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1N5bWJvbC5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fV2Vha01hcC5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldFRhZy5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzQXJndW1lbnRzLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNOYXRpdmUuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VJc1R5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VLZXlzLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlVW5hcnkuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NvcmVKc0RhdGEuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldE5hdGl2ZS5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRUYWcuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFZhbHVlLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc01hc2tlZC5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNQcm90b3R5cGUuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX25hdGl2ZUtleXMuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX25vZGVVdGlsLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcm9vdC5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fdG9Tb3VyY2UuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNBcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNBcnJheS5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc0FycmF5TGlrZS5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc0J1ZmZlci5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc0VtcHR5LmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNMZW5ndGguanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3QuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzVHlwZWRBcnJheS5qcyIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5Ly4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9zdHViRmFsc2UuanMiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jaGF0Z3B0LWV4dGVuc2lvbi1kYWlseS1zdW1tZXJ5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hhdGdwdC1leHRlbnNpb24tZGFpbHktc3VtbWVyeS8uL3NyYy9iYWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbmltcG9ydCBFeHBpcnlNYXAgZnJvbSAnZXhwaXJ5LW1hcCc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcbmltcG9ydCB7IGZldGNoU1NFIH0gZnJvbSAnLi9mZXRjaC1zc2UnO1xuZnVuY3Rpb24gcmVxdWVzdCh0b2tlbiwgbWV0aG9kLCBwYXRoLCBkYXRhKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgZmV0Y2goXCJodHRwczovL2NoYXQub3BlbmFpLmNvbS9iYWNrZW5kLWFwaVwiLmNvbmNhdChwYXRoKSwge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IFwiQmVhcmVyIFwiLmNvbmNhdCh0b2tlbiksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGRhdGEgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2VuZE1lc3NhZ2VGZWVkYmFjayh0b2tlbiwgZGF0YSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgcmVxdWVzdCh0b2tlbiwgJ1BPU1QnLCAnL2NvbnZlcnNhdGlvbi9tZXNzYWdlX2ZlZWRiYWNrJywgZGF0YSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNldENvbnZlcnNhdGlvblByb3BlcnR5KHRva2VuLCBjb252ZXJzYXRpb25JZCwgcHJvcGVydHlPYmplY3QpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHJlcXVlc3QodG9rZW4sICdQQVRDSCcsIFwiL2NvbnZlcnNhdGlvbi9cIi5jb25jYXQoY29udmVyc2F0aW9uSWQpLCBwcm9wZXJ0eU9iamVjdCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxudmFyIEtFWV9BQ0NFU1NfVE9LRU4gPSAnYWNjZXNzVG9rZW4nO1xudmFyIGNhY2hlID0gbmV3IEV4cGlyeU1hcCgxMCAqIDEwMDApO1xuZXhwb3J0IGZ1bmN0aW9uIGdldENoYXRHUFRBY2Nlc3NUb2tlbigpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXNwLCBkYXRhO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGUuZ2V0KEtFWV9BQ0NFU1NfVE9LRU4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgY2FjaGUuZ2V0KEtFWV9BQ0NFU1NfVE9LRU4pXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaCgnaHR0cHM6Ly9jaGF0Lm9wZW5haS5jb20vYXBpL2F1dGgvc2Vzc2lvbicpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJlc3AgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NMT1VERkxBUkUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwLmpzb24oKS5jYXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiAoe30pOyB9KV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVU5BVVRIT1JJWkVEJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FjaGUuc2V0KEtFWV9BQ0NFU1NfVE9LRU4sIGRhdGEuYWNjZXNzVG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgZGF0YS5hY2Nlc3NUb2tlbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxudmFyIENoYXRHUFRQcm92aWRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaGF0R1BUUHJvdmlkZXIodG9rZW4pIHtcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICAgICAgICB0aGlzLnRva2VuID0gdG9rZW47XG4gICAgfVxuICAgIENoYXRHUFRQcm92aWRlci5wcm90b3R5cGUuZmV0Y2hNb2RlbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCByZXF1ZXN0KHRoaXMudG9rZW4sICdHRVQnLCAnL21vZGVscycpLnRoZW4oZnVuY3Rpb24gKHIpIHsgcmV0dXJuIHIuanNvbigpOyB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3AgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzcC5tb2RlbHNdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENoYXRHUFRQcm92aWRlci5wcm90b3R5cGUuZ2V0TW9kZWxOYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbW9kZWxzLCBlcnJfMTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMCwgMiwgLCAzXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoTW9kZWxzKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbHMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbW9kZWxzWzBdLnNsdWddO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sICd0ZXh0LWRhdmluY2ktMDAyLXJlbmRlciddO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDaGF0R1BUUHJvdmlkZXIucHJvdG90eXBlLmdlbmVyYXRlQW5zd2VyID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY29udmVyc2F0aW9uSWQsIGNsZWFudXAsIG1vZGVsTmFtZTtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhbnVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb252ZXJzYXRpb25JZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDb252ZXJzYXRpb25Qcm9wZXJ0eShfdGhpcy50b2tlbiwgY29udmVyc2F0aW9uSWQsIHsgaXNfdmlzaWJsZTogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2V0TW9kZWxOYW1lKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbE5hbWUgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdVc2luZyBtb2RlbDonLCBtb2RlbE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2hTU0UoJ2h0dHBzOi8vY2hhdC5vcGVuYWkuY29tL2JhY2tlbmQtYXBpL2NvbnZlcnNhdGlvbicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbDogcGFyYW1zLnNpZ25hbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IFwiQmVhcmVyIFwiLmNvbmNhdCh0aGlzLnRva2VuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAnbmV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHV1aWR2NCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRfdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydHM6IFtwYXJhbXMucHJvbXB0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBtb2RlbE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRfbWVzc2FnZV9pZDogdXVpZHY0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1lc3NhZ2U6IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGVidWcoJ3NzZSBtZXNzYWdlJywgbWVzc2FnZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlID09PSAnW0RPTkVdJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5vbkV2ZW50KHsgdHlwZTogJ2RvbmUnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUjpcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IChfYyA9IChfYiA9IChfYSA9IGRhdGEubWVzc2FnZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbnRlbnQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wYXJ0cykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJzYXRpb25JZCA9IGRhdGEuY29udmVyc2F0aW9uX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5vbkV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Fuc3dlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlSWQ6IGRhdGEubWVzc2FnZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiBkYXRhLmNvbnZlcnNhdGlvbl9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB7IGNsZWFudXA6IGNsZWFudXAgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIENoYXRHUFRQcm92aWRlcjtcbn0oKSk7XG5leHBvcnQgeyBDaGF0R1BUUHJvdmlkZXIgfTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBfX2FzeW5jVmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX2FzeW5jVmFsdWVzKSB8fCBmdW5jdGlvbiAobykge1xuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cbn07XG5pbXBvcnQgeyBjcmVhdGVQYXJzZXIgfSBmcm9tICdldmVudHNvdXJjZS1wYXJzZXInO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaC1lcyc7XG5pbXBvcnQgeyBzdHJlYW1Bc3luY0l0ZXJhYmxlIH0gZnJvbSAnLi9zdHJlYW0tYXN5bmMtaXRlcmFibGUnO1xuZXhwb3J0IGZ1bmN0aW9uIGZldGNoU1NFKHJlc291cmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIF9hLCBlXzEsIF9iLCBfYztcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvbk1lc3NhZ2UsIGZldGNoT3B0aW9ucywgcmVzcCwgZXJyb3IsIHBhcnNlciwgX2QsIF9lLCBfZiwgY2h1bmssIHN0ciwgZV8xXzE7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2cpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2cubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIG9uTWVzc2FnZSA9IG9wdGlvbnMub25NZXNzYWdlLCBmZXRjaE9wdGlvbnMgPSBfX3Jlc3Qob3B0aW9ucywgW1wib25NZXNzYWdlXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2gocmVzb3VyY2UsIGZldGNoT3B0aW9ucyldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmVzcCA9IF9nLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhcmVzcC5vaykgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3AuanNvbigpLmNhdGNoKGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7fSk7IH0pXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gX2cuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIWlzRW1wdHkoZXJyb3IpID8gSlNPTi5zdHJpbmdpZnkoZXJyb3IpIDogXCJcIi5jb25jYXQocmVzcC5zdGF0dXMsIFwiIFwiKS5jb25jYXQocmVzcC5zdGF0dXNUZXh0KSk7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBwYXJzZXIgPSBjcmVhdGVQYXJzZXIoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2V2ZW50Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTWVzc2FnZShldmVudC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIF9nLmxhYmVsID0gNDtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIF9nLnRyeXMucHVzaChbNCwgOSwgMTAsIDE1XSk7XG4gICAgICAgICAgICAgICAgICAgIF9kID0gdHJ1ZSwgX2UgPSBfX2FzeW5jVmFsdWVzKHN0cmVhbUFzeW5jSXRlcmFibGUocmVzcC5ib2R5KSk7XG4gICAgICAgICAgICAgICAgICAgIF9nLmxhYmVsID0gNTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbNCAvKnlpZWxkKi8sIF9lLm5leHQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICBpZiAoIShfZiA9IF9nLnNlbnQoKSwgX2EgPSBfZi5kb25lLCAhX2EpKSByZXR1cm4gWzMgLypicmVhayovLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgX2MgPSBfZi52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgX2QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNodW5rID0gX2M7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUoY2h1bmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLmZlZWQoc3RyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfZy5sYWJlbCA9IDc7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiByZXR1cm4gWzMgLypicmVhayovLCA1XTtcbiAgICAgICAgICAgICAgICBjYXNlIDg6IHJldHVybiBbMyAvKmJyZWFrKi8sIDE1XTtcbiAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgIGVfMV8xID0gX2cuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBlXzEgPSB7IGVycm9yOiBlXzFfMSB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAxNV07XG4gICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgX2cudHJ5cy5wdXNoKFsxMCwgLCAxMywgMTRdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoIV9kICYmICFfYSAmJiAoX2IgPSBfZS5yZXR1cm4pKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMTJdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBfYi5jYWxsKF9lKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgX2cuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBfZy5sYWJlbCA9IDEyO1xuICAgICAgICAgICAgICAgIGNhc2UgMTI6IHJldHVybiBbMyAvKmJyZWFrKi8sIDE0XTtcbiAgICAgICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgICAgICBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNyAvKmVuZGZpbmFsbHkqL107XG4gICAgICAgICAgICAgICAgY2FzZSAxNDogcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE1OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwidmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfX2F3YWl0ID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0KSB8fCBmdW5jdGlvbiAodikgeyByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTsgfVxudmFyIF9fYXN5bmNHZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fYXN5bmNHZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cbn07XG5leHBvcnQgZnVuY3Rpb24gc3RyZWFtQXN5bmNJdGVyYWJsZShzdHJlYW0pIHtcbiAgICByZXR1cm4gX19hc3luY0dlbmVyYXRvcih0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uIHN0cmVhbUFzeW5jSXRlcmFibGVfMSgpIHtcbiAgICAgICAgdmFyIHJlYWRlciwgX2EsIGRvbmUsIHZhbHVlO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICByZWFkZXIgPSBzdHJlYW0uZ2V0UmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgLCA5LCAxMF0pO1xuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRydWUpIHJldHVybiBbMyAvKmJyZWFrKi8sIDhdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBfX2F3YWl0KHJlYWRlci5yZWFkKCkpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIF9hID0gX2Iuc2VudCgpLCBkb25lID0gX2EuZG9uZSwgdmFsdWUgPSBfYS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkb25lKSByZXR1cm4gWzMgLypicmVhayovLCA1XTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgX19hd2FpdCh2b2lkIDApXTtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovLCBfYi5zZW50KCldO1xuICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFs0IC8qeWllbGQqLywgX19hd2FpdCh2YWx1ZSldO1xuICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFs0IC8qeWllbGQqLywgX2Iuc2VudCgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XG4gICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4gWzMgLypicmVhayovLCAxMF07XG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVsZWFzZUxvY2soKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcbiAgICAgICAgICAgICAgICBjYXNlIDEwOiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCBtYXBBZ2VDbGVhbmVyID0gcmVxdWlyZShcIm1hcC1hZ2UtY2xlYW5lclwiKTtcbmNsYXNzIEV4cGlyeU1hcCB7XG4gICAgY29uc3RydWN0b3IobWF4QWdlLCBkYXRhKSB7XG4gICAgICAgIHRoaXMubWF4QWdlID0gbWF4QWdlO1xuICAgICAgICB0aGlzW1N5bWJvbC50b1N0cmluZ1RhZ10gPSAnTWFwJztcbiAgICAgICAgdGhpcy5kYXRhID0gbmV3IE1hcCgpO1xuICAgICAgICAvLyBCb290c3RyYXAgdGhlIGNsZWFudXAgcHJvY2VzcyB3aGljaCBmcmVlcyB1cCBtZW1vcnkgd2hlbiBhbiBpdGVtIGV4cGlyZXNcbiAgICAgICAgbWFwQWdlQ2xlYW5lcih0aGlzLmRhdGEpO1xuICAgICAgICBpZiAoZGF0YSkgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmVhcmx5LWV4aXRcbiAgICAgICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGRhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zaXplO1xuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5kYXRhLmNsZWFyKCk7XG4gICAgfVxuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kZWxldGUoa2V5KTtcbiAgICB9XG4gICAgaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmhhcyhrZXkpO1xuICAgIH1cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5kYXRhLmdldChrZXkpO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5kYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNldChrZXksIHtcbiAgICAgICAgICAgIG1heEFnZTogRGF0ZS5ub3coKSArIHRoaXMubWF4QWdlLFxuICAgICAgICAgICAgZGF0YTogdmFsdWVcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUl0ZXJhdG9yKGl0ZW0gPT4gaXRlbVsxXS5kYXRhKTtcbiAgICB9XG4gICAga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5rZXlzKCk7XG4gICAgfVxuICAgIGVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUl0ZXJhdG9yKGl0ZW0gPT4gW2l0ZW1bMF0sIGl0ZW1bMV0uZGF0YV0pO1xuICAgIH1cbiAgICBmb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcpIHtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgdGhpcy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrZm4uYXBwbHkodGhpc0FyZywgW3ZhbHVlLCBrZXksIHRoaXNdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50cmllcygpO1xuICAgIH1cbiAgICAqY3JlYXRlSXRlcmF0b3IocHJvamVjdGlvbikge1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5kYXRhLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgeWllbGQgcHJvamVjdGlvbihpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gRXhwaXJ5TWFwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCBwRGVmZXIgPSByZXF1aXJlKFwicC1kZWZlclwiKTtcbmZ1bmN0aW9uIG1hcEFnZUNsZWFuZXIobWFwLCBwcm9wZXJ0eSA9ICdtYXhBZ2UnKSB7XG4gICAgbGV0IHByb2Nlc3NpbmdLZXk7XG4gICAgbGV0IHByb2Nlc3NpbmdUaW1lcjtcbiAgICBsZXQgcHJvY2Vzc2luZ0RlZmVycmVkO1xuICAgIGNvbnN0IGNsZWFudXAgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmIChwcm9jZXNzaW5nS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGFyZSBhbHJlYWR5IHByb2Nlc3NpbmcgYW4gaXRlbSwgd2UgY2FuIHNhZmVseSBleGl0XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2V0dXBUaW1lciA9IGFzeW5jIChpdGVtKSA9PiB7XG4gICAgICAgICAgICBwcm9jZXNzaW5nRGVmZXJyZWQgPSBwRGVmZXIoKTtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gaXRlbVsxXVtwcm9wZXJ0eV0gLSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKGRlbGF5IDw9IDApIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGl0ZW0gaW1tZWRpYXRlbHkgaWYgdGhlIGRlbGF5IGlzIGVxdWFsIHRvIG9yIGJlbG93IDBcbiAgICAgICAgICAgICAgICBtYXAuZGVsZXRlKGl0ZW1bMF0pO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NpbmdEZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gS2VlcCB0cmFjayBvZiB0aGUgY3VycmVudCBwcm9jZXNzZWQga2V5XG4gICAgICAgICAgICBwcm9jZXNzaW5nS2V5ID0gaXRlbVswXTtcbiAgICAgICAgICAgIHByb2Nlc3NpbmdUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgaXRlbSB3aGVuIHRoZSB0aW1lb3V0IGZpcmVzXG4gICAgICAgICAgICAgICAgbWFwLmRlbGV0ZShpdGVtWzBdKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc2luZ0RlZmVycmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NpbmdEZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnN0cmljdC10eXBlLXByZWRpY2F0ZXNcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvY2Vzc2luZ1RpbWVyLnVucmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgLy8gRG9uJ3QgaG9sZCB1cCB0aGUgcHJvY2VzcyBmcm9tIGV4aXRpbmdcbiAgICAgICAgICAgICAgICBwcm9jZXNzaW5nVGltZXIudW5yZWYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzaW5nRGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgbWFwKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2V0dXBUaW1lcihlbnRyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGFuIGVycm9yIG9jY3VycywgdGhpcyBtZWFucyB0aGUgdGltZXIgd2FzIGNsZWFuZWQgdXAgYW5kIHdlIHNob3VsZCBzdG9wIHByb2Nlc3NpbmdcbiAgICAgICAgfVxuICAgICAgICBwcm9jZXNzaW5nS2V5ID0gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgICAgIHByb2Nlc3NpbmdLZXkgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChwcm9jZXNzaW5nVGltZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHByb2Nlc3NpbmdUaW1lcik7XG4gICAgICAgICAgICBwcm9jZXNzaW5nVGltZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2Nlc3NpbmdEZWZlcnJlZCAhPT0gdW5kZWZpbmVkKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6ZWFybHktZXhpdFxuICAgICAgICAgICAgcHJvY2Vzc2luZ0RlZmVycmVkLnJlamVjdCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgcHJvY2Vzc2luZ0RlZmVycmVkID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBvcmlnaW5hbFNldCA9IG1hcC5zZXQuYmluZChtYXApO1xuICAgIG1hcC5zZXQgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAobWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUga2V5IGFscmVhZHkgZXhpc3QsIHJlbW92ZSBpdCBzbyB3ZSBjYW4gYWRkIGl0IGJhY2sgYXQgdGhlIGVuZCBvZiB0aGUgbWFwLlxuICAgICAgICAgICAgbWFwLmRlbGV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhbGwgdGhlIG9yaWdpbmFsIGBtYXAuc2V0YFxuICAgICAgICBjb25zdCByZXN1bHQgPSBvcmlnaW5hbFNldChrZXksIHZhbHVlKTtcbiAgICAgICAgLy8gSWYgd2UgYXJlIGFscmVhZHkgcHJvY2Vzc2luZyBhIGtleSBhbmQgdGhlIGtleSBhZGRlZCBpcyB0aGUgY3VycmVudCBwcm9jZXNzZWQga2V5LCBzdG9wIHByb2Nlc3NpbmcgaXRcbiAgICAgICAgaWYgKHByb2Nlc3NpbmdLZXkgJiYgcHJvY2Vzc2luZ0tleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICByZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFsd2F5cyBydW4gdGhlIGNsZWFudXAgbWV0aG9kIGluIGNhc2UgaXQgd2Fzbid0IHN0YXJ0ZWQgeWV0XG4gICAgICAgIGNsZWFudXAoKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgY2xlYW51cCgpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgcmV0dXJuIG1hcDtcbn1cbm1vZHVsZS5leHBvcnRzID0gbWFwQWdlQ2xlYW5lcjtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuXHRjb25zdCByZXQgPSB7fTtcblxuXHRyZXQucHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRyZXQucmVzb2x2ZSA9IHJlc29sdmU7XG5cdFx0cmV0LnJlamVjdCA9IHJlamVjdDtcblx0fSk7XG5cblx0cmV0dXJuIHJldDtcbn07XG4iLCJjb25zdCByYW5kb21VVUlEID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLnJhbmRvbVVVSUQgJiYgY3J5cHRvLnJhbmRvbVVVSUQuYmluZChjcnlwdG8pO1xuZXhwb3J0IGRlZmF1bHQge1xuICByYW5kb21VVUlEXG59OyIsImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbmxldCBnZXRSYW5kb21WYWx1ZXM7XG5jb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc2xpY2UoMSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgcmV0dXJuIChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICBjb25zdCB1dWlkID0gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0KTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgbmF0aXZlIGZyb20gJy4vbmF0aXZlLmpzJztcbmltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHsgdW5zYWZlU3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBpZiAobmF0aXZlLnJhbmRvbVVVSUQgJiYgIWJ1ZiAmJiAhb3B0aW9ucykge1xuICAgIHJldHVybiBuYXRpdmUucmFuZG9tVVVJRCgpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gdW5zYWZlU3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCJmdW5jdGlvbiBjcmVhdGVQYXJzZXIob25QYXJzZSkge1xuICBsZXQgaXNGaXJzdENodW5rO1xuICBsZXQgYnVmZmVyO1xuICBsZXQgc3RhcnRpbmdQb3NpdGlvbjtcbiAgbGV0IHN0YXJ0aW5nRmllbGRMZW5ndGg7XG4gIGxldCBldmVudElkO1xuICBsZXQgZXZlbnROYW1lO1xuICBsZXQgZGF0YTtcbiAgcmVzZXQoKTtcbiAgcmV0dXJuIHtcbiAgICBmZWVkLFxuICAgIHJlc2V0XG4gIH07XG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGlzRmlyc3RDaHVuayA9IHRydWU7XG4gICAgYnVmZmVyID0gXCJcIjtcbiAgICBzdGFydGluZ1Bvc2l0aW9uID0gMDtcbiAgICBzdGFydGluZ0ZpZWxkTGVuZ3RoID0gLTE7XG4gICAgZXZlbnRJZCA9IHZvaWQgMDtcbiAgICBldmVudE5hbWUgPSB2b2lkIDA7XG4gICAgZGF0YSA9IFwiXCI7XG4gIH1cbiAgZnVuY3Rpb24gZmVlZChjaHVuaykge1xuICAgIGJ1ZmZlciA9IGJ1ZmZlciA/IGJ1ZmZlciArIGNodW5rIDogY2h1bms7XG4gICAgaWYgKGlzRmlyc3RDaHVuayAmJiBoYXNCb20oYnVmZmVyKSkge1xuICAgICAgYnVmZmVyID0gYnVmZmVyLnNsaWNlKEJPTS5sZW5ndGgpO1xuICAgIH1cbiAgICBpc0ZpcnN0Q2h1bmsgPSBmYWxzZTtcbiAgICBjb25zdCBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xuICAgIGxldCBwb3NpdGlvbiA9IDA7XG4gICAgbGV0IGRpc2NhcmRUcmFpbGluZ05ld2xpbmUgPSBmYWxzZTtcbiAgICB3aGlsZSAocG9zaXRpb24gPCBsZW5ndGgpIHtcbiAgICAgIGlmIChkaXNjYXJkVHJhaWxpbmdOZXdsaW5lKSB7XG4gICAgICAgIGlmIChidWZmZXJbcG9zaXRpb25dID09PSBcIlxcblwiKSB7XG4gICAgICAgICAgKytwb3NpdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBkaXNjYXJkVHJhaWxpbmdOZXdsaW5lID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBsZXQgbGluZUxlbmd0aCA9IC0xO1xuICAgICAgbGV0IGZpZWxkTGVuZ3RoID0gc3RhcnRpbmdGaWVsZExlbmd0aDtcbiAgICAgIGxldCBjaGFyYWN0ZXI7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IHN0YXJ0aW5nUG9zaXRpb247IGxpbmVMZW5ndGggPCAwICYmIGluZGV4IDwgbGVuZ3RoOyArK2luZGV4KSB7XG4gICAgICAgIGNoYXJhY3RlciA9IGJ1ZmZlcltpbmRleF07XG4gICAgICAgIGlmIChjaGFyYWN0ZXIgPT09IFwiOlwiICYmIGZpZWxkTGVuZ3RoIDwgMCkge1xuICAgICAgICAgIGZpZWxkTGVuZ3RoID0gaW5kZXggLSBwb3NpdGlvbjtcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyYWN0ZXIgPT09IFwiXFxyXCIpIHtcbiAgICAgICAgICBkaXNjYXJkVHJhaWxpbmdOZXdsaW5lID0gdHJ1ZTtcbiAgICAgICAgICBsaW5lTGVuZ3RoID0gaW5kZXggLSBwb3NpdGlvbjtcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyYWN0ZXIgPT09IFwiXFxuXCIpIHtcbiAgICAgICAgICBsaW5lTGVuZ3RoID0gaW5kZXggLSBwb3NpdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGxpbmVMZW5ndGggPCAwKSB7XG4gICAgICAgIHN0YXJ0aW5nUG9zaXRpb24gPSBsZW5ndGggLSBwb3NpdGlvbjtcbiAgICAgICAgc3RhcnRpbmdGaWVsZExlbmd0aCA9IGZpZWxkTGVuZ3RoO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXJ0aW5nUG9zaXRpb24gPSAwO1xuICAgICAgICBzdGFydGluZ0ZpZWxkTGVuZ3RoID0gLTE7XG4gICAgICB9XG4gICAgICBwYXJzZUV2ZW50U3RyZWFtTGluZShidWZmZXIsIHBvc2l0aW9uLCBmaWVsZExlbmd0aCwgbGluZUxlbmd0aCk7XG4gICAgICBwb3NpdGlvbiArPSBsaW5lTGVuZ3RoICsgMTtcbiAgICB9XG4gICAgaWYgKHBvc2l0aW9uID09PSBsZW5ndGgpIHtcbiAgICAgIGJ1ZmZlciA9IFwiXCI7XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvbiA+IDApIHtcbiAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5zbGljZShwb3NpdGlvbik7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHBhcnNlRXZlbnRTdHJlYW1MaW5lKGxpbmVCdWZmZXIsIGluZGV4LCBmaWVsZExlbmd0aCwgbGluZUxlbmd0aCkge1xuICAgIGlmIChsaW5lTGVuZ3RoID09PSAwKSB7XG4gICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgIG9uUGFyc2Uoe1xuICAgICAgICAgIHR5cGU6IFwiZXZlbnRcIixcbiAgICAgICAgICBpZDogZXZlbnRJZCxcbiAgICAgICAgICBldmVudDogZXZlbnROYW1lIHx8IHZvaWQgMCxcbiAgICAgICAgICBkYXRhOiBkYXRhLnNsaWNlKDAsIC0xKVxuICAgICAgICAgIC8vIHJlbW92ZSB0cmFpbGluZyBuZXdsaW5lXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhdGEgPSBcIlwiO1xuICAgICAgICBldmVudElkID0gdm9pZCAwO1xuICAgICAgfVxuICAgICAgZXZlbnROYW1lID0gdm9pZCAwO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBub1ZhbHVlID0gZmllbGRMZW5ndGggPCAwO1xuICAgIGNvbnN0IGZpZWxkID0gbGluZUJ1ZmZlci5zbGljZShpbmRleCwgaW5kZXggKyAobm9WYWx1ZSA/IGxpbmVMZW5ndGggOiBmaWVsZExlbmd0aCkpO1xuICAgIGxldCBzdGVwID0gMDtcbiAgICBpZiAobm9WYWx1ZSkge1xuICAgICAgc3RlcCA9IGxpbmVMZW5ndGg7XG4gICAgfSBlbHNlIGlmIChsaW5lQnVmZmVyW2luZGV4ICsgZmllbGRMZW5ndGggKyAxXSA9PT0gXCIgXCIpIHtcbiAgICAgIHN0ZXAgPSBmaWVsZExlbmd0aCArIDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ZXAgPSBmaWVsZExlbmd0aCArIDE7XG4gICAgfVxuICAgIGNvbnN0IHBvc2l0aW9uID0gaW5kZXggKyBzdGVwO1xuICAgIGNvbnN0IHZhbHVlTGVuZ3RoID0gbGluZUxlbmd0aCAtIHN0ZXA7XG4gICAgY29uc3QgdmFsdWUgPSBsaW5lQnVmZmVyLnNsaWNlKHBvc2l0aW9uLCBwb3NpdGlvbiArIHZhbHVlTGVuZ3RoKS50b1N0cmluZygpO1xuICAgIGlmIChmaWVsZCA9PT0gXCJkYXRhXCIpIHtcbiAgICAgIGRhdGEgKz0gdmFsdWUgPyBcIlwiLmNvbmNhdCh2YWx1ZSwgXCJcXG5cIikgOiBcIlxcblwiO1xuICAgIH0gZWxzZSBpZiAoZmllbGQgPT09IFwiZXZlbnRcIikge1xuICAgICAgZXZlbnROYW1lID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmIChmaWVsZCA9PT0gXCJpZFwiICYmICF2YWx1ZS5pbmNsdWRlcyhcIlxcMFwiKSkge1xuICAgICAgZXZlbnRJZCA9IHZhbHVlO1xuICAgIH0gZWxzZSBpZiAoZmllbGQgPT09IFwicmV0cnlcIikge1xuICAgICAgY29uc3QgcmV0cnkgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgaWYgKCFOdW1iZXIuaXNOYU4ocmV0cnkpKSB7XG4gICAgICAgIG9uUGFyc2Uoe1xuICAgICAgICAgIHR5cGU6IFwicmVjb25uZWN0LWludGVydmFsXCIsXG4gICAgICAgICAgdmFsdWU6IHJldHJ5XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuY29uc3QgQk9NID0gWzIzOSwgMTg3LCAxOTFdO1xuZnVuY3Rpb24gaGFzQm9tKGJ1ZmZlcikge1xuICByZXR1cm4gQk9NLmV2ZXJ5KChjaGFyQ29kZSwgaW5kZXgpID0+IGJ1ZmZlci5jaGFyQ29kZUF0KGluZGV4KSA9PT0gY2hhckNvZGUpO1xufVxuZXhwb3J0IHsgY3JlYXRlUGFyc2VyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcbmltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgRGF0YVZpZXcgPSBnZXROYXRpdmUocm9vdCwgJ0RhdGFWaWV3Jyk7XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFWaWV3O1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpO1xuXG5leHBvcnQgZGVmYXVsdCBNYXA7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5pbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFByb21pc2UgPSBnZXROYXRpdmUocm9vdCwgJ1Byb21pc2UnKTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvbWlzZTtcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcbmltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgU2V0ID0gZ2V0TmF0aXZlKHJvb3QsICdTZXQnKTtcblxuZXhwb3J0IGRlZmF1bHQgU2V0O1xuIiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5leHBvcnQgZGVmYXVsdCBTeW1ib2w7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5pbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKTtcblxuZXhwb3J0IGRlZmF1bHQgV2Vha01hcDtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBnZXRSYXdUYWcgZnJvbSAnLi9fZ2V0UmF3VGFnLmpzJztcbmltcG9ydCBvYmplY3RUb1N0cmluZyBmcm9tICcuL19vYmplY3RUb1N0cmluZy5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0VGFnO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0FyZ3VtZW50c2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICovXG5mdW5jdGlvbiBiYXNlSXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gYXJnc1RhZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzQXJndW1lbnRzO1xuIiwiaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi9pc0Z1bmN0aW9uLmpzJztcbmltcG9ydCBpc01hc2tlZCBmcm9tICcuL19pc01hc2tlZC5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQgdG9Tb3VyY2UgZnJvbSAnLi9fdG9Tb3VyY2UuanMnO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IGlzRnVuY3Rpb24odmFsdWUpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNOYXRpdmU7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc0xlbmd0aCBmcm9tICcuL2lzTGVuZ3RoLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0YVZpZXdUYWddID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPVxudHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPVxudHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tiYXNlR2V0VGFnKHZhbHVlKV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc1R5cGVkQXJyYXk7XG4iLCJpbXBvcnQgaXNQcm90b3R5cGUgZnJvbSAnLi9faXNQcm90b3R5cGUuanMnO1xuaW1wb3J0IG5hdGl2ZUtleXMgZnJvbSAnLi9fbmF0aXZlS2V5cy5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUtleXM7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VVbmFyeTtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG5leHBvcnQgZGVmYXVsdCBjb3JlSnNEYXRhO1xuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuZXhwb3J0IGRlZmF1bHQgZnJlZUdsb2JhbDtcbiIsImltcG9ydCBiYXNlSXNOYXRpdmUgZnJvbSAnLi9fYmFzZUlzTmF0aXZlLmpzJztcbmltcG9ydCBnZXRWYWx1ZSBmcm9tICcuL19nZXRWYWx1ZS5qcyc7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldE5hdGl2ZTtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRSYXdUYWc7XG4iLCJpbXBvcnQgRGF0YVZpZXcgZnJvbSAnLi9fRGF0YVZpZXcuanMnO1xuaW1wb3J0IE1hcCBmcm9tICcuL19NYXAuanMnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnLi9fUHJvbWlzZS5qcyc7XG5pbXBvcnQgU2V0IGZyb20gJy4vX1NldC5qcyc7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuL19XZWFrTWFwLmpzJztcbmltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IHRvU291cmNlIGZyb20gJy4vX3RvU291cmNlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHByb21pc2VUYWcgPSAnW29iamVjdCBQcm9taXNlXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKipcbiAqIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG52YXIgZ2V0VGFnID0gYmFzZUdldFRhZztcblxuLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEgYW5kIHByb21pc2VzIGluIE5vZGUuanMgPCA2LlxuaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnKSB8fFxuICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZykgfHxcbiAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgKFNldCAmJiBnZXRUYWcobmV3IFNldCkgIT0gc2V0VGFnKSB8fFxuICAgIChXZWFrTWFwICYmIGdldFRhZyhuZXcgV2Vha01hcCkgIT0gd2Vha01hcFRhZykpIHtcbiAgZ2V0VGFnID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gYmFzZUdldFRhZyh2YWx1ZSksXG4gICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnID8gdmFsdWUuY29uc3RydWN0b3IgOiB1bmRlZmluZWQsXG4gICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiAnJztcblxuICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld0N0b3JTdHJpbmc6IHJldHVybiBkYXRhVmlld1RhZztcbiAgICAgICAgY2FzZSBtYXBDdG9yU3RyaW5nOiByZXR1cm4gbWFwVGFnO1xuICAgICAgICBjYXNlIHByb21pc2VDdG9yU3RyaW5nOiByZXR1cm4gcHJvbWlzZVRhZztcbiAgICAgICAgY2FzZSBzZXRDdG9yU3RyaW5nOiByZXR1cm4gc2V0VGFnO1xuICAgICAgICBjYXNlIHdlYWtNYXBDdG9yU3RyaW5nOiByZXR1cm4gd2Vha01hcFRhZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0VGFnO1xuIiwiLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFZhbHVlO1xuIiwiaW1wb3J0IGNvcmVKc0RhdGEgZnJvbSAnLi9fY29yZUpzRGF0YS5qcyc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzTWFza2VkO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1Byb3RvdHlwZTtcbiIsImltcG9ydCBvdmVyQXJnIGZyb20gJy4vX292ZXJBcmcuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5hdGl2ZUtleXM7XG4iLCJpbXBvcnQgZnJlZUdsb2JhbCBmcm9tICcuL19mcmVlR2xvYmFsLmpzJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHByb2Nlc3NgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlUHJvY2VzcyA9IG1vZHVsZUV4cG9ydHMgJiYgZnJlZUdsb2JhbC5wcm9jZXNzO1xuXG4vKiogVXNlZCB0byBhY2Nlc3MgZmFzdGVyIE5vZGUuanMgaGVscGVycy4gKi9cbnZhciBub2RlVXRpbCA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICAvLyBVc2UgYHV0aWwudHlwZXNgIGZvciBOb2RlLmpzIDEwKy5cbiAgICB2YXIgdHlwZXMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUucmVxdWlyZSAmJiBmcmVlTW9kdWxlLnJlcXVpcmUoJ3V0aWwnKS50eXBlcztcblxuICAgIGlmICh0eXBlcykge1xuICAgICAgcmV0dXJuIHR5cGVzO1xuICAgIH1cblxuICAgIC8vIExlZ2FjeSBgcHJvY2Vzcy5iaW5kaW5nKCd1dGlsJylgIGZvciBOb2RlLmpzIDwgMTAuXG4gICAgcmV0dXJuIGZyZWVQcm9jZXNzICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcgJiYgZnJlZVByb2Nlc3MuYmluZGluZygndXRpbCcpO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgbm9kZVV0aWw7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0VG9TdHJpbmc7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3ZlckFyZztcbiIsImltcG9ydCBmcmVlR2xvYmFsIGZyb20gJy4vX2ZyZWVHbG9iYWwuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3Q7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvU291cmNlO1xuIiwiaW1wb3J0IGJhc2VJc0FyZ3VtZW50cyBmcm9tICcuL19iYXNlSXNBcmd1bWVudHMuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FyZ3VtZW50cyA9IGJhc2VJc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA/IGJhc2VJc0FyZ3VtZW50cyA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpc0FyZ3VtZW50cztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5leHBvcnQgZGVmYXVsdCBpc0FycmF5O1xuIiwiaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi9pc0Z1bmN0aW9uLmpzJztcbmltcG9ydCBpc0xlbmd0aCBmcm9tICcuL2lzTGVuZ3RoLmpzJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzQXJyYXlMaWtlO1xuIiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5pbXBvcnQgc3R1YkZhbHNlIGZyb20gJy4vc3R1YkZhbHNlLmpzJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0J1ZmZlciA9IEJ1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG5leHBvcnQgZGVmYXVsdCBpc0J1ZmZlcjtcbiIsImltcG9ydCBiYXNlS2V5cyBmcm9tICcuL19iYXNlS2V5cy5qcyc7XG5pbXBvcnQgZ2V0VGFnIGZyb20gJy4vX2dldFRhZy5qcyc7XG5pbXBvcnQgaXNBcmd1bWVudHMgZnJvbSAnLi9pc0FyZ3VtZW50cy5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuaW1wb3J0IGlzQnVmZmVyIGZyb20gJy4vaXNCdWZmZXIuanMnO1xuaW1wb3J0IGlzUHJvdG90eXBlIGZyb20gJy4vX2lzUHJvdG90eXBlLmpzJztcbmltcG9ydCBpc1R5cGVkQXJyYXkgZnJvbSAnLi9pc1R5cGVkQXJyYXkuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYW4gZW1wdHkgb2JqZWN0LCBjb2xsZWN0aW9uLCBtYXAsIG9yIHNldC5cbiAqXG4gKiBPYmplY3RzIGFyZSBjb25zaWRlcmVkIGVtcHR5IGlmIHRoZXkgaGF2ZSBubyBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWRcbiAqIHByb3BlcnRpZXMuXG4gKlxuICogQXJyYXktbGlrZSB2YWx1ZXMgc3VjaCBhcyBgYXJndW1lbnRzYCBvYmplY3RzLCBhcnJheXMsIGJ1ZmZlcnMsIHN0cmluZ3MsIG9yXG4gKiBqUXVlcnktbGlrZSBjb2xsZWN0aW9ucyBhcmUgY29uc2lkZXJlZCBlbXB0eSBpZiB0aGV5IGhhdmUgYSBgbGVuZ3RoYCBvZiBgMGAuXG4gKiBTaW1pbGFybHksIG1hcHMgYW5kIHNldHMgYXJlIGNvbnNpZGVyZWQgZW1wdHkgaWYgdGhleSBoYXZlIGEgYHNpemVgIG9mIGAwYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBlbXB0eSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRW1wdHkobnVsbCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0VtcHR5KHRydWUpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNFbXB0eSgxKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRW1wdHkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0VtcHR5KHsgJ2EnOiAxIH0pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChpc0FycmF5TGlrZSh2YWx1ZSkgJiZcbiAgICAgIChpc0FycmF5KHZhbHVlKSB8fCB0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlLnNwbGljZSA9PSAnZnVuY3Rpb24nIHx8XG4gICAgICAgIGlzQnVmZmVyKHZhbHVlKSB8fCBpc1R5cGVkQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSkpIHtcbiAgICByZXR1cm4gIXZhbHVlLmxlbmd0aDtcbiAgfVxuICB2YXIgdGFnID0gZ2V0VGFnKHZhbHVlKTtcbiAgaWYgKHRhZyA9PSBtYXBUYWcgfHwgdGFnID09IHNldFRhZykge1xuICAgIHJldHVybiAhdmFsdWUuc2l6ZTtcbiAgfVxuICBpZiAoaXNQcm90b3R5cGUodmFsdWUpKSB7XG4gICAgcmV0dXJuICFiYXNlS2V5cyh2YWx1ZSkubGVuZ3RoO1xuICB9XG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0VtcHR5O1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhc3luY1RhZyA9ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHByb3h5VGFnID0gJ1tvYmplY3QgUHJveHldJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA5IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5cyBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gYmFzZUdldFRhZyh2YWx1ZSk7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnIHx8IHRhZyA9PSBhc3luY1RhZyB8fCB0YWcgPT0gcHJveHlUYWc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzRnVuY3Rpb247XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzTGVuZ3RoO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzT2JqZWN0TGlrZTtcbiIsImltcG9ydCBiYXNlSXNUeXBlZEFycmF5IGZyb20gJy4vX2Jhc2VJc1R5cGVkQXJyYXkuanMnO1xuaW1wb3J0IGJhc2VVbmFyeSBmcm9tICcuL19iYXNlVW5hcnkuanMnO1xuaW1wb3J0IG5vZGVVdGlsIGZyb20gJy4vX25vZGVVdGlsLmpzJztcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNUeXBlZEFycmF5ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNUeXBlZEFycmF5ID0gbm9kZUlzVHlwZWRBcnJheSA/IGJhc2VVbmFyeShub2RlSXNUeXBlZEFycmF5KSA6IGJhc2VJc1R5cGVkQXJyYXk7XG5cbmV4cG9ydCBkZWZhdWx0IGlzVHlwZWRBcnJheTtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50aW1lcygyLCBfLnN0dWJGYWxzZSk7XG4gKiAvLyA9PiBbZmFsc2UsIGZhbHNlXVxuICovXG5mdW5jdGlvbiBzdHViRmFsc2UoKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R1YkZhbHNlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbmltcG9ydCB7IENoYXRHUFRQcm92aWRlciwgZ2V0Q2hhdEdQVEFjY2Vzc1Rva2VuIH0gZnJvbSAnLi9jaGF0Z3B0JztcbmNvbnNvbGUuZGVidWcoXCJiYWNrZ3JvdW5kLmpzIHJ1bm5pbmdcIik7XG52YXIgbGFzdFRpdGxlID0gbnVsbDtcbnZhciBzdGFydFRpbWUgPSBudWxsO1xudmFyIHRpbWVUcmFja2VyID0gbmV3IE1hcCgpO1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQW5zd2Vycyhwb3J0LCBxdWVzdGlvbikge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRva2VuLCBwcm92aWRlciwgY29udHJvbGxlciwgY2xlYW51cDtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgZ2V0Q2hhdEdQVEFjY2Vzc1Rva2VuKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyID0gbmV3IENoYXRHUFRQcm92aWRlcih0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHByb3ZpZGVyLmdlbmVyYXRlQW5zd2VyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9tcHQ6IHF1ZXN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FdmVudDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSAnZG9uZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyBldmVudDogJ0RPTkUnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyBhY3Rpb246ICdwcmludFBvcHVwJywgdGV4dDogZXZlbnQuZGF0YS50ZXh0IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmRlYnVnKFwiZGVidWdcIiwgZXZlbnQuZGF0YS50ZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBjbGVhbnVwID0gKF9hLnNlbnQoKSkuY2xlYW51cDtcbiAgICAgICAgICAgICAgICAgICAgcG9ydC5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYW51cCA9PT0gbnVsbCB8fCBjbGVhbnVwID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjbGVhbnVwKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuY2hyb21lLnJ1bnRpbWUub25Db25uZWN0LmFkZExpc3RlbmVyKGZ1bmN0aW9uIChwb3J0KSB7XG4gICAgcG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKG1zZykgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0ciwgaW5zdHJ1Y3Rpb24sIGVycl8xLCBjb3VudDtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnYmFja2dyb3VuZCByZWNlaXZlZCBtc2cnLCBtc2cpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShtc2cuYWN0aW9uID09PSAncHJpbnRNYXAnKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMV07XG4gICAgICAgICAgICAgICAgICAgIC8vIENhbGwgdGhlIHByaW50TWFwIGZ1bmN0aW9uIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgcHJpbnRNYXAodGltZVRyYWNrZXIpO1xuICAgICAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgYWN0aW9uOiAncHJpbnRQb3B1cCcsIHRleHQ6IHRvU3RyaW5nKHRpbWVUcmFja2VyKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgN107XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIShtc2cuYWN0aW9uID09PSAnZ2VuZXJhdGUnKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XG4gICAgICAgICAgICAgICAgICAgIHN0ciA9IHRvU3RyaW5nKHRpbWVUcmFja2VyKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcInRvU3RyaW5nIFRpbWVUcmFja2VyOiBcIiwgc3RyKTtcbiAgICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb24gPSBcImluIHRoZSBwZXJzcGVjdGl2ZSBvZiBhIG1lbnRvciBvciBndXJ1IHRvIGFsbG93IHRoZSB1c2VyIHRvIHVuZGVyc3RhbmQgd2hhdCB0aGUgdXNlcidzIGZvY3VzIGlzIG9uIGFuZCB3aGF0IHRoZSB1c2VyIHJvdWdobHkgYWNjb21wbGlzaGVkIHRvZGF5LiBsaW1pdCB0byAxMDAtMjAwIHdvcmRzIGFuZCBtYWtlIG5lY2Vzc2FyeSBzdWdnZXN0aW9ucyBvbiB3aGF0IHRvIGRvIHRvIG1ha2UgdXNlciBpbXByb3ZlIGFuZCBhbHNvIGdpdmUgYSBwcm9kdWN0aXZpdHkgcmF0aW5nIG91dCBvZiAxMDA6IFwiO1xuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzIsIDQsICwgNV0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBnZW5lcmF0ZUFuc3dlcnMocG9ydCwgaW5zdHJ1Y3Rpb24gKyBzdHIpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBlcnJfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUjogXCIsIGVycl8xKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzMgLypicmVhayovLCA3XTtcbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgIGlmIChtc2cuYWN0aW9uID09PSAnY2xlYW5UaW1lVHJhY2tlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ID0gY2xlYW5NYXAodGltZVRyYWNrZXIsIG1zZy5taW5UaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyBhY3Rpb246ICdwcmludFBvcHVwJywgdGV4dDogXCJtYXAgY2xlYW5lZCBcIiArIGNvdW50ICsgXCIgaXRlbXNcIiB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDc7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pOyB9KTtcbn0pO1xuZnVuY3Rpb24gaGFuZGxlQWN0aXZlVGFiQ2hhbmdlKCkge1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuICAgICAgICB2YXIgdGFiVGl0bGUgPSBhY3RpdmVUYWIudGl0bGU7XG4gICAgICAgIHZhciBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIGlmICghbGFzdFRpdGxlKSB7XG4gICAgICAgICAgICBsYXN0VGl0bGUgPSB0YWJUaXRsZTtcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IGN1cnJlbnRUaW1lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGVsYXBzZWRUaW1lID0gKGN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lKSAvIDEwMDA7XG4gICAgICAgICAgICBpZiAodGltZVRyYWNrZXIuaGFzKGxhc3RUaXRsZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG90YWxUaW1lID0gdGltZVRyYWNrZXIuZ2V0KGxhc3RUaXRsZSkgKyBlbGFwc2VkVGltZTtcbiAgICAgICAgICAgICAgICB0aW1lVHJhY2tlci5zZXQobGFzdFRpdGxlLCB0b3RhbFRpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGltZVRyYWNrZXIuc2V0KGxhc3RUaXRsZSwgZWxhcHNlZFRpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdFRpdGxlID0gdGFiVGl0bGU7XG4gICAgICAgICAgICBzdGFydFRpbWUgPSBjdXJyZW50VGltZTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gRXZlbnQgbGlzdGVuZXIgZm9yIHRhYiBhY3RpdmF0aW9uIGNoYW5nZVxuY2hyb21lLnRhYnMub25BY3RpdmF0ZWQuYWRkTGlzdGVuZXIoaGFuZGxlQWN0aXZlVGFiQ2hhbmdlKTtcbi8vIEV2ZW50IGxpc3RlbmVyIGZvciB0YWIgdGl0bGUgdXBkYXRlXG5jaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHRhYklkLCBjaGFuZ2VJbmZvLCB0YWIpIHtcbiAgICBpZiAoY2hhbmdlSW5mby50aXRsZSkge1xuICAgICAgICAvLyBJZiB0aGUgdGFiIHRpdGxlIGlzIHVwZGF0ZWQsIGNhbGwgdGhlIGhhbmRsZUFjdGl2ZVRhYkNoYW5nZSBmdW5jdGlvblxuICAgICAgICBoYW5kbGVBY3RpdmVUYWJDaGFuZ2UoKTtcbiAgICB9XG59KTtcbmZ1bmN0aW9uIHByaW50TWFwKG1hcCkge1xuICAgIG1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoa2V5ICsgJyA9PiAnICsgdmFsdWUpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gdG9TdHJpbmcobWFwKSB7XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIG1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgIGFyci5wdXNoKGtleSArIFwiIHVzZWQgZm9yIFwiICsgdmFsdWUgKyBcIiBzZWNvbmRzXCIpO1xuICAgIH0pO1xuICAgIGlmIChhcnIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBhcnIuam9pbignXFxuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJubyB0YWIgcmVjb3JkZWRcIjtcbiAgICB9XG59XG5mdW5jdGlvbiBjbGVhbk1hcChtYXAsIG1pblRpbWUpIHtcbiAgICB2YXIgY291bnQgPSAwO1xuICAgIG1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgIGlmICh2YWx1ZSA8IG1pblRpbWUpIHtcbiAgICAgICAgICAgIHRpbWVUcmFja2VyLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb3VudDtcbn1cbiJdLCJuYW1lcyI6WyJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJhZG9wdCIsInZhbHVlIiwicmVzb2x2ZSIsIlByb21pc2UiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJfX2dlbmVyYXRvciIsImJvZHkiLCJfIiwibGFiZWwiLCJzZW50IiwidCIsInRyeXMiLCJvcHMiLCJmIiwieSIsImciLCJ2ZXJiIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJuIiwidiIsIm9wIiwiVHlwZUVycm9yIiwiY2FsbCIsInBvcCIsImxlbmd0aCIsInB1c2giLCJFeHBpcnlNYXAiLCJ2NCIsInV1aWR2NCIsImZldGNoU1NFIiwicmVxdWVzdCIsInRva2VuIiwibWV0aG9kIiwicGF0aCIsImRhdGEiLCJfYSIsImZldGNoIiwiY29uY2F0IiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJ1bmRlZmluZWQiLCJKU09OIiwic3RyaW5naWZ5Iiwic2VuZE1lc3NhZ2VGZWVkYmFjayIsInNldENvbnZlcnNhdGlvblByb3BlcnR5IiwiY29udmVyc2F0aW9uSWQiLCJwcm9wZXJ0eU9iamVjdCIsIktFWV9BQ0NFU1NfVE9LRU4iLCJjYWNoZSIsImdldENoYXRHUFRBY2Nlc3NUb2tlbiIsInJlc3AiLCJnZXQiLCJzdGF0dXMiLCJFcnJvciIsImpzb24iLCJjYXRjaCIsImFjY2Vzc1Rva2VuIiwic2V0IiwiQ2hhdEdQVFByb3ZpZGVyIiwicHJvdG90eXBlIiwiZmV0Y2hNb2RlbHMiLCJyIiwibW9kZWxzIiwiZ2V0TW9kZWxOYW1lIiwiZXJyXzEiLCJzbHVnIiwiY29uc29sZSIsImVycm9yIiwiZ2VuZXJhdGVBbnN3ZXIiLCJwYXJhbXMiLCJjbGVhbnVwIiwibW9kZWxOYW1lIiwiX3RoaXMiLCJpc192aXNpYmxlIiwiZGVidWciLCJzaWduYWwiLCJhY3Rpb24iLCJtZXNzYWdlcyIsImlkIiwicm9sZSIsImNvbnRlbnQiLCJjb250ZW50X3R5cGUiLCJwYXJ0cyIsInByb21wdCIsIm1vZGVsIiwicGFyZW50X21lc3NhZ2VfaWQiLCJvbk1lc3NhZ2UiLCJtZXNzYWdlIiwiX2IiLCJfYyIsIm9uRXZlbnQiLCJ0eXBlIiwicGFyc2UiLCJlcnIiLCJsb2ciLCJ0ZXh0IiwiY29udmVyc2F0aW9uX2lkIiwibWVzc2FnZUlkIiwiX19yZXN0IiwicyIsInAiLCJPYmplY3QiLCJoYXNPd25Qcm9wZXJ0eSIsImluZGV4T2YiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJpIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJfX2FzeW5jVmFsdWVzIiwibyIsImFzeW5jSXRlcmF0b3IiLCJtIiwiX192YWx1ZXMiLCJzZXR0bGUiLCJkIiwiY3JlYXRlUGFyc2VyIiwiaXNFbXB0eSIsInN0cmVhbUFzeW5jSXRlcmFibGUiLCJyZXNvdXJjZSIsIm9wdGlvbnMiLCJlXzEiLCJmZXRjaE9wdGlvbnMiLCJwYXJzZXIiLCJfZCIsIl9lIiwiX2YiLCJjaHVuayIsInN0ciIsImVfMV8xIiwiX2ciLCJvayIsInN0YXR1c1RleHQiLCJldmVudCIsIlRleHREZWNvZGVyIiwiZGVjb2RlIiwiZmVlZCIsInJldHVybiIsIl9fYXdhaXQiLCJfX2FzeW5jR2VuZXJhdG9yIiwicSIsImEiLCJiIiwicmVzdW1lIiwiZnVsZmlsbCIsInNoaWZ0Iiwic3RyZWFtIiwiYXJndW1lbnRzIiwic3RyZWFtQXN5bmNJdGVyYWJsZV8xIiwicmVhZGVyIiwiZ2V0UmVhZGVyIiwicmVhZCIsInJlbGVhc2VMb2NrIiwibGFzdFRpdGxlIiwic3RhcnRUaW1lIiwidGltZVRyYWNrZXIiLCJNYXAiLCJnZW5lcmF0ZUFuc3dlcnMiLCJwb3J0IiwicXVlc3Rpb24iLCJwcm92aWRlciIsImNvbnRyb2xsZXIiLCJBYm9ydENvbnRyb2xsZXIiLCJwb3N0TWVzc2FnZSIsIm9uRGlzY29ubmVjdCIsImFkZExpc3RlbmVyIiwiYWJvcnQiLCJjaHJvbWUiLCJydW50aW1lIiwib25Db25uZWN0IiwibXNnIiwiaW5zdHJ1Y3Rpb24iLCJjb3VudCIsInByaW50TWFwIiwidG9TdHJpbmciLCJjbGVhbk1hcCIsIm1pblRpbWUiLCJoYW5kbGVBY3RpdmVUYWJDaGFuZ2UiLCJ0YWJzIiwicXVlcnkiLCJhY3RpdmUiLCJjdXJyZW50V2luZG93IiwiYWN0aXZlVGFiIiwidGFiVGl0bGUiLCJ0aXRsZSIsImN1cnJlbnRUaW1lIiwiRGF0ZSIsIm5vdyIsImVsYXBzZWRUaW1lIiwiaGFzIiwidG90YWxUaW1lIiwib25BY3RpdmF0ZWQiLCJvblVwZGF0ZWQiLCJ0YWJJZCIsImNoYW5nZUluZm8iLCJ0YWIiLCJtYXAiLCJmb3JFYWNoIiwia2V5IiwiYXJyIiwiam9pbiIsImRlbGV0ZSJdLCJzb3VyY2VSb290IjoiIn0=