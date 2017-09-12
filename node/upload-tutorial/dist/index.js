(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.LivelyUpload = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["LivelyAuth"] = factory();
	else
		root["LivelyAuth"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _events = __webpack_require__(1);\n\n__webpack_require__(2);\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar defaultOptions = {\n\ttimeout: 5000,\n\theaders: {}\n};\n\nvar defaultHeaders = {\n\tAccept: 'application/json'\n};\n\n/**\n * @class Lively Video authorization client\n */\n\nvar Authorization = function (_EventEmitter) {\n\t_inherits(Authorization, _EventEmitter);\n\n\t/**\n  * @constructs Authorization\n  * @param {string} scope - Scope of the authorization\n  * @param {string} url - Url of your company's authorization endpoint. The expected response is {'token': 'unique token', 'expire': 'RFC3339 expiration time'}\n  * @param {Config} [options] - Configurable options for the Authorization class\n  * @param {string} [options.timeout=5000] - Authenticated request timeout in milliseconds. Timed out errors will return an Error('authorization: timeout')\n  * @param {Object} [options.headers] - Additional headers to use for the request\n  * @throws Will throw an error if no scope or no url is provided\n  */\n\tfunction Authorization(scope, url) {\n\t\tvar options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n\n\t\t_classCallCheck(this, Authorization);\n\n\t\tvar _this = _possibleConstructorReturn(this, (Authorization.__proto__ || Object.getPrototypeOf(Authorization)).call(this));\n\n\t\tif (!scope) {\n\t\t\tthrow new Error('scope is required');\n\t\t}\n\n\t\tif (!url) {\n\t\t\tthrow new Error('authorization server url is required');\n\t\t}\n\n\t\t// require parameters\n\t\t_this._options = Object.assign({}, defaultOptions, options);\n\n\t\tif (url.indexOf('?') === -1) {\n\t\t\t_this._url = url + '?scope=' + scope;\n\t\t} else {\n\t\t\t_this._url = url + '&scope=' + scope;\n\t\t}\n\n\t\t// internal\n\t\t_this._stopped = false;\n\t\t_this._fatalError = null;\n\t\t_this._token = null;\n\t\t_this._retries = [0, // immediate\n\t\t200, // 200ms\n\t\t1000, // 1s\n\t\t3000 // 3s\n\t\t];\n\t\t_this._retry = 0;\n\t\t_this._autorefresh = null;\n\n\t\t_this._headers = Object.assign({}, defaultHeaders, options.headers);\n\t\t_this._retryRequest();\n\t\treturn _this;\n\t}\n\n\t_createClass(Authorization, [{\n\t\tkey: 'destroy',\n\t\tvalue: function destroy() {\n\t\t\tthis._stopped = true;\n\t\t}\n\n\t\t/**\n   * This callback will execute a request which requires the auth token.\n   * @callback cbRequest\n   * @param {Error} e - Returns a timeout error (Error('authorization: timeout')) or a fatal error\n   * @param {string} token - The authorization bearer token to use in Lively Video API requests\n   */\n\n\t\t/**\n   * Execute a request which requires an authorization token when the token is available\n   * @param {cbRequest} cb - The callback that executes the request.\n   */\n\n\t}, {\n\t\tkey: 'request',\n\t\tvalue: function request() {\n\t\t\tvar _this2 = this;\n\n\t\t\tvar cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};\n\n\t\t\tif (this._fatalError) {\n\t\t\t\tcb(this._fatalError);\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tif (this._token !== null) {\n\t\t\t\tcb(null, this._token);\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tvar done = false;\n\t\t\tvar pass = function pass() {\n\t\t\t\tif (!done) {\n\t\t\t\t\tdone = true;\n\t\t\t\t\tcb(null, _this2._token);\n\t\t\t\t}\n\t\t\t};\n\n\t\t\tvar timeout = function timeout() {\n\t\t\t\tif (!done) {\n\t\t\t\t\tdone = true;\n\t\t\t\t\tcb(new Error('authorization: timeout'));\n\t\t\t\t}\n\t\t\t};\n\n\t\t\tvar t = setTimeout(function () {\n\t\t\t\t_this2.removeListener('ready', pass);\n\t\t\t\ttimeout();\n\t\t\t}, this._options.timeout);\n\n\t\t\tthis.once('ready', function () {\n\t\t\t\tclearTimeout(t);\n\t\t\t\tpass();\n\t\t\t});\n\t\t}\n\n\t\t/**\n   * Should be called if a Lively Video endpoint returned an 401 error. A new request will be issued to the authorization server's endpoint to get a new token.\n   */\n\n\t}, {\n\t\tkey: 'refreshToken',\n\t\tvalue: function refreshToken() {\n\t\t\tvar _this3 = this;\n\n\t\t\tif (this._token !== null) {\n\t\t\t\tif (this._autorefresh !== null) {\n\t\t\t\t\tclearTimeout(this._autorefresh);\n\t\t\t\t\tthis._autorefresh = null;\n\t\t\t\t}\n\t\t\t\tthis._token = null;\n\t\t\t\t(function () {\n\t\t\t\t\t_this3._retryRequest();\n\t\t\t\t})();\n\t\t\t}\n\t\t}\n\n\t\t/**\n   * Make a request or retry after the current retry number's delay\n   * @ignore\n   */\n\n\t}, {\n\t\tkey: '_retryRequest',\n\t\tvalue: function _retryRequest() {\n\t\t\tvar _this4 = this;\n\n\t\t\tvar retry = this._retries[this._retry];\n\t\t\tif (retry) {\n\t\t\t\tsetTimeout(function () {\n\t\t\t\t\t_this4._makeRequest();\n\t\t\t\t}, retry);\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tthis._makeRequest();\n\t\t}\n\n\t\t/**\n   * Make a request to the authorization server.\n   * @ignore\n   */\n\n\t}, {\n\t\tkey: '_makeRequest',\n\t\tvalue: function _makeRequest() {\n\t\t\tvar _this5 = this;\n\n\t\t\tfetch(this._url, {\n\t\t\t\tcredentials: 'same-origin',\n\t\t\t\theaders: this._headers\n\t\t\t}).then(function (response) {\n\t\t\t\tif (response.status >= 200 && response.status < 300) {\n\t\t\t\t\treturn response.json();\n\t\t\t\t}\n\t\t\t\tif (response.status === 401) {\n\t\t\t\t\tvar e = new Error('authorization: unauthorized');\n\t\t\t\t\te.fatal = true;\n\t\t\t\t\tthrow e;\n\t\t\t\t}\n\t\t\t\tif (response.status === 403) {\n\t\t\t\t\tvar _e = new Error('authorization: forbidden');\n\t\t\t\t\t_e.fatal = true;\n\t\t\t\t\tthrow _e;\n\t\t\t\t}\n\t\t\t\tthrow new Error('authorization: non-200 response code from auth server');\n\t\t\t}).then(function (json) {\n\t\t\t\t_this5._token = json.token;\n\t\t\t\t_this5._retry = 0;\n\t\t\t\t_this5.emit('ready', {\n\t\t\t\t\ttoken: json.token\n\t\t\t\t});\n\n\t\t\t\t// re-request a minute before expiration\n\t\t\t\tvar retryAfter = new Date(json.expire).getTime() - Date.now() - 60 * 1000;\n\t\t\t\t_this5._autorefresh = setTimeout(function () {\n\t\t\t\t\t_this5._autorefresh = null;\n\t\t\t\t\tif (!_this5._stopped) {\n\t\t\t\t\t\t_this5._retryRequest();\n\t\t\t\t\t}\n\t\t\t\t}, retryAfter);\n\t\t\t}).catch(function (e) {\n\t\t\t\t_this5._token = null;\n\n\t\t\t\tif (e.fatal) {\n\t\t\t\t\t_this5._fatalError = e;\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\t_this5._retryRequest();\n\t\t\t\tif (_this5._retry < _this5._retries.length - 1) {\n\t\t\t\t\t_this5._retry++;\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\t}]);\n\n\treturn Authorization;\n}(_events.EventEmitter);\n\nexports.default = Authorization;\nmodule.exports = exports['default'];\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/index.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./src/index.js?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nfunction EventEmitter() {\n  this._events = this._events || {};\n  this._maxListeners = this._maxListeners || undefined;\n}\nmodule.exports = EventEmitter;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nEventEmitter.defaultMaxListeners = 10;\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function(n) {\n  if (!isNumber(n) || n < 0 || isNaN(n))\n    throw TypeError('n must be a positive number');\n  this._maxListeners = n;\n  return this;\n};\n\nEventEmitter.prototype.emit = function(type) {\n  var er, handler, len, args, i, listeners;\n\n  if (!this._events)\n    this._events = {};\n\n  // If there is no 'error' event listener then throw.\n  if (type === 'error') {\n    if (!this._events.error ||\n        (isObject(this._events.error) && !this._events.error.length)) {\n      er = arguments[1];\n      if (er instanceof Error) {\n        throw er; // Unhandled 'error' event\n      } else {\n        // At least give some kind of context to the user\n        var err = new Error('Uncaught, unspecified \"error\" event. (' + er + ')');\n        err.context = er;\n        throw err;\n      }\n    }\n  }\n\n  handler = this._events[type];\n\n  if (isUndefined(handler))\n    return false;\n\n  if (isFunction(handler)) {\n    switch (arguments.length) {\n      // fast cases\n      case 1:\n        handler.call(this);\n        break;\n      case 2:\n        handler.call(this, arguments[1]);\n        break;\n      case 3:\n        handler.call(this, arguments[1], arguments[2]);\n        break;\n      // slower\n      default:\n        args = Array.prototype.slice.call(arguments, 1);\n        handler.apply(this, args);\n    }\n  } else if (isObject(handler)) {\n    args = Array.prototype.slice.call(arguments, 1);\n    listeners = handler.slice();\n    len = listeners.length;\n    for (i = 0; i < len; i++)\n      listeners[i].apply(this, args);\n  }\n\n  return true;\n};\n\nEventEmitter.prototype.addListener = function(type, listener) {\n  var m;\n\n  if (!isFunction(listener))\n    throw TypeError('listener must be a function');\n\n  if (!this._events)\n    this._events = {};\n\n  // To avoid recursion in the case that type === \"newListener\"! Before\n  // adding it to the listeners, first emit \"newListener\".\n  if (this._events.newListener)\n    this.emit('newListener', type,\n              isFunction(listener.listener) ?\n              listener.listener : listener);\n\n  if (!this._events[type])\n    // Optimize the case of one listener. Don't need the extra array object.\n    this._events[type] = listener;\n  else if (isObject(this._events[type]))\n    // If we've already got an array, just append.\n    this._events[type].push(listener);\n  else\n    // Adding the second element, need to change to array.\n    this._events[type] = [this._events[type], listener];\n\n  // Check for listener leak\n  if (isObject(this._events[type]) && !this._events[type].warned) {\n    if (!isUndefined(this._maxListeners)) {\n      m = this._maxListeners;\n    } else {\n      m = EventEmitter.defaultMaxListeners;\n    }\n\n    if (m && m > 0 && this._events[type].length > m) {\n      this._events[type].warned = true;\n      console.error('(node) warning: possible EventEmitter memory ' +\n                    'leak detected. %d listeners added. ' +\n                    'Use emitter.setMaxListeners() to increase limit.',\n                    this._events[type].length);\n      if (typeof console.trace === 'function') {\n        // not supported in IE 10\n        console.trace();\n      }\n    }\n  }\n\n  return this;\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.once = function(type, listener) {\n  if (!isFunction(listener))\n    throw TypeError('listener must be a function');\n\n  var fired = false;\n\n  function g() {\n    this.removeListener(type, g);\n\n    if (!fired) {\n      fired = true;\n      listener.apply(this, arguments);\n    }\n  }\n\n  g.listener = listener;\n  this.on(type, g);\n\n  return this;\n};\n\n// emits a 'removeListener' event iff the listener was removed\nEventEmitter.prototype.removeListener = function(type, listener) {\n  var list, position, length, i;\n\n  if (!isFunction(listener))\n    throw TypeError('listener must be a function');\n\n  if (!this._events || !this._events[type])\n    return this;\n\n  list = this._events[type];\n  length = list.length;\n  position = -1;\n\n  if (list === listener ||\n      (isFunction(list.listener) && list.listener === listener)) {\n    delete this._events[type];\n    if (this._events.removeListener)\n      this.emit('removeListener', type, listener);\n\n  } else if (isObject(list)) {\n    for (i = length; i-- > 0;) {\n      if (list[i] === listener ||\n          (list[i].listener && list[i].listener === listener)) {\n        position = i;\n        break;\n      }\n    }\n\n    if (position < 0)\n      return this;\n\n    if (list.length === 1) {\n      list.length = 0;\n      delete this._events[type];\n    } else {\n      list.splice(position, 1);\n    }\n\n    if (this._events.removeListener)\n      this.emit('removeListener', type, listener);\n  }\n\n  return this;\n};\n\nEventEmitter.prototype.removeAllListeners = function(type) {\n  var key, listeners;\n\n  if (!this._events)\n    return this;\n\n  // not listening for removeListener, no need to emit\n  if (!this._events.removeListener) {\n    if (arguments.length === 0)\n      this._events = {};\n    else if (this._events[type])\n      delete this._events[type];\n    return this;\n  }\n\n  // emit removeListener for all listeners on all events\n  if (arguments.length === 0) {\n    for (key in this._events) {\n      if (key === 'removeListener') continue;\n      this.removeAllListeners(key);\n    }\n    this.removeAllListeners('removeListener');\n    this._events = {};\n    return this;\n  }\n\n  listeners = this._events[type];\n\n  if (isFunction(listeners)) {\n    this.removeListener(type, listeners);\n  } else if (listeners) {\n    // LIFO order\n    while (listeners.length)\n      this.removeListener(type, listeners[listeners.length - 1]);\n  }\n  delete this._events[type];\n\n  return this;\n};\n\nEventEmitter.prototype.listeners = function(type) {\n  var ret;\n  if (!this._events || !this._events[type])\n    ret = [];\n  else if (isFunction(this._events[type]))\n    ret = [this._events[type]];\n  else\n    ret = this._events[type].slice();\n  return ret;\n};\n\nEventEmitter.prototype.listenerCount = function(type) {\n  if (this._events) {\n    var evlistener = this._events[type];\n\n    if (isFunction(evlistener))\n      return 1;\n    else if (evlistener)\n      return evlistener.length;\n  }\n  return 0;\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  return emitter.listenerCount(type);\n};\n\nfunction isFunction(arg) {\n  return typeof arg === 'function';\n}\n\nfunction isNumber(arg) {\n  return typeof arg === 'number';\n}\n\nfunction isObject(arg) {\n  return typeof arg === 'object' && arg !== null;\n}\n\nfunction isUndefined(arg) {\n  return arg === void 0;\n}\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/events/events.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./~/events/events.js?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("(function(self) {\n  'use strict';\n\n  if (self.fetch) {\n    return\n  }\n\n  var support = {\n    searchParams: 'URLSearchParams' in self,\n    iterable: 'Symbol' in self && 'iterator' in Symbol,\n    blob: 'FileReader' in self && 'Blob' in self && (function() {\n      try {\n        new Blob()\n        return true\n      } catch(e) {\n        return false\n      }\n    })(),\n    formData: 'FormData' in self,\n    arrayBuffer: 'ArrayBuffer' in self\n  }\n\n  function normalizeName(name) {\n    if (typeof name !== 'string') {\n      name = String(name)\n    }\n    if (/[^a-z0-9\\-#$%&'*+.\\^_`|~]/i.test(name)) {\n      throw new TypeError('Invalid character in header field name')\n    }\n    return name.toLowerCase()\n  }\n\n  function normalizeValue(value) {\n    if (typeof value !== 'string') {\n      value = String(value)\n    }\n    return value\n  }\n\n  // Build a destructive iterator for the value list\n  function iteratorFor(items) {\n    var iterator = {\n      next: function() {\n        var value = items.shift()\n        return {done: value === undefined, value: value}\n      }\n    }\n\n    if (support.iterable) {\n      iterator[Symbol.iterator] = function() {\n        return iterator\n      }\n    }\n\n    return iterator\n  }\n\n  function Headers(headers) {\n    this.map = {}\n\n    if (headers instanceof Headers) {\n      headers.forEach(function(value, name) {\n        this.append(name, value)\n      }, this)\n\n    } else if (headers) {\n      Object.getOwnPropertyNames(headers).forEach(function(name) {\n        this.append(name, headers[name])\n      }, this)\n    }\n  }\n\n  Headers.prototype.append = function(name, value) {\n    name = normalizeName(name)\n    value = normalizeValue(value)\n    var list = this.map[name]\n    if (!list) {\n      list = []\n      this.map[name] = list\n    }\n    list.push(value)\n  }\n\n  Headers.prototype['delete'] = function(name) {\n    delete this.map[normalizeName(name)]\n  }\n\n  Headers.prototype.get = function(name) {\n    var values = this.map[normalizeName(name)]\n    return values ? values[0] : null\n  }\n\n  Headers.prototype.getAll = function(name) {\n    return this.map[normalizeName(name)] || []\n  }\n\n  Headers.prototype.has = function(name) {\n    return this.map.hasOwnProperty(normalizeName(name))\n  }\n\n  Headers.prototype.set = function(name, value) {\n    this.map[normalizeName(name)] = [normalizeValue(value)]\n  }\n\n  Headers.prototype.forEach = function(callback, thisArg) {\n    Object.getOwnPropertyNames(this.map).forEach(function(name) {\n      this.map[name].forEach(function(value) {\n        callback.call(thisArg, value, name, this)\n      }, this)\n    }, this)\n  }\n\n  Headers.prototype.keys = function() {\n    var items = []\n    this.forEach(function(value, name) { items.push(name) })\n    return iteratorFor(items)\n  }\n\n  Headers.prototype.values = function() {\n    var items = []\n    this.forEach(function(value) { items.push(value) })\n    return iteratorFor(items)\n  }\n\n  Headers.prototype.entries = function() {\n    var items = []\n    this.forEach(function(value, name) { items.push([name, value]) })\n    return iteratorFor(items)\n  }\n\n  if (support.iterable) {\n    Headers.prototype[Symbol.iterator] = Headers.prototype.entries\n  }\n\n  function consumed(body) {\n    if (body.bodyUsed) {\n      return Promise.reject(new TypeError('Already read'))\n    }\n    body.bodyUsed = true\n  }\n\n  function fileReaderReady(reader) {\n    return new Promise(function(resolve, reject) {\n      reader.onload = function() {\n        resolve(reader.result)\n      }\n      reader.onerror = function() {\n        reject(reader.error)\n      }\n    })\n  }\n\n  function readBlobAsArrayBuffer(blob) {\n    var reader = new FileReader()\n    reader.readAsArrayBuffer(blob)\n    return fileReaderReady(reader)\n  }\n\n  function readBlobAsText(blob) {\n    var reader = new FileReader()\n    reader.readAsText(blob)\n    return fileReaderReady(reader)\n  }\n\n  function Body() {\n    this.bodyUsed = false\n\n    this._initBody = function(body) {\n      this._bodyInit = body\n      if (typeof body === 'string') {\n        this._bodyText = body\n      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {\n        this._bodyBlob = body\n      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {\n        this._bodyFormData = body\n      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {\n        this._bodyText = body.toString()\n      } else if (!body) {\n        this._bodyText = ''\n      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {\n        // Only support ArrayBuffers for POST method.\n        // Receiving ArrayBuffers happens via Blobs, instead.\n      } else {\n        throw new Error('unsupported BodyInit type')\n      }\n\n      if (!this.headers.get('content-type')) {\n        if (typeof body === 'string') {\n          this.headers.set('content-type', 'text/plain;charset=UTF-8')\n        } else if (this._bodyBlob && this._bodyBlob.type) {\n          this.headers.set('content-type', this._bodyBlob.type)\n        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {\n          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')\n        }\n      }\n    }\n\n    if (support.blob) {\n      this.blob = function() {\n        var rejected = consumed(this)\n        if (rejected) {\n          return rejected\n        }\n\n        if (this._bodyBlob) {\n          return Promise.resolve(this._bodyBlob)\n        } else if (this._bodyFormData) {\n          throw new Error('could not read FormData body as blob')\n        } else {\n          return Promise.resolve(new Blob([this._bodyText]))\n        }\n      }\n\n      this.arrayBuffer = function() {\n        return this.blob().then(readBlobAsArrayBuffer)\n      }\n\n      this.text = function() {\n        var rejected = consumed(this)\n        if (rejected) {\n          return rejected\n        }\n\n        if (this._bodyBlob) {\n          return readBlobAsText(this._bodyBlob)\n        } else if (this._bodyFormData) {\n          throw new Error('could not read FormData body as text')\n        } else {\n          return Promise.resolve(this._bodyText)\n        }\n      }\n    } else {\n      this.text = function() {\n        var rejected = consumed(this)\n        return rejected ? rejected : Promise.resolve(this._bodyText)\n      }\n    }\n\n    if (support.formData) {\n      this.formData = function() {\n        return this.text().then(decode)\n      }\n    }\n\n    this.json = function() {\n      return this.text().then(JSON.parse)\n    }\n\n    return this\n  }\n\n  // HTTP methods whose capitalization should be normalized\n  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']\n\n  function normalizeMethod(method) {\n    var upcased = method.toUpperCase()\n    return (methods.indexOf(upcased) > -1) ? upcased : method\n  }\n\n  function Request(input, options) {\n    options = options || {}\n    var body = options.body\n    if (Request.prototype.isPrototypeOf(input)) {\n      if (input.bodyUsed) {\n        throw new TypeError('Already read')\n      }\n      this.url = input.url\n      this.credentials = input.credentials\n      if (!options.headers) {\n        this.headers = new Headers(input.headers)\n      }\n      this.method = input.method\n      this.mode = input.mode\n      if (!body) {\n        body = input._bodyInit\n        input.bodyUsed = true\n      }\n    } else {\n      this.url = input\n    }\n\n    this.credentials = options.credentials || this.credentials || 'omit'\n    if (options.headers || !this.headers) {\n      this.headers = new Headers(options.headers)\n    }\n    this.method = normalizeMethod(options.method || this.method || 'GET')\n    this.mode = options.mode || this.mode || null\n    this.referrer = null\n\n    if ((this.method === 'GET' || this.method === 'HEAD') && body) {\n      throw new TypeError('Body not allowed for GET or HEAD requests')\n    }\n    this._initBody(body)\n  }\n\n  Request.prototype.clone = function() {\n    return new Request(this)\n  }\n\n  function decode(body) {\n    var form = new FormData()\n    body.trim().split('&').forEach(function(bytes) {\n      if (bytes) {\n        var split = bytes.split('=')\n        var name = split.shift().replace(/\\+/g, ' ')\n        var value = split.join('=').replace(/\\+/g, ' ')\n        form.append(decodeURIComponent(name), decodeURIComponent(value))\n      }\n    })\n    return form\n  }\n\n  function headers(xhr) {\n    var head = new Headers()\n    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\\n')\n    pairs.forEach(function(header) {\n      var split = header.trim().split(':')\n      var key = split.shift().trim()\n      var value = split.join(':').trim()\n      head.append(key, value)\n    })\n    return head\n  }\n\n  Body.call(Request.prototype)\n\n  function Response(bodyInit, options) {\n    if (!options) {\n      options = {}\n    }\n\n    this.type = 'default'\n    this.status = options.status\n    this.ok = this.status >= 200 && this.status < 300\n    this.statusText = options.statusText\n    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)\n    this.url = options.url || ''\n    this._initBody(bodyInit)\n  }\n\n  Body.call(Response.prototype)\n\n  Response.prototype.clone = function() {\n    return new Response(this._bodyInit, {\n      status: this.status,\n      statusText: this.statusText,\n      headers: new Headers(this.headers),\n      url: this.url\n    })\n  }\n\n  Response.error = function() {\n    var response = new Response(null, {status: 0, statusText: ''})\n    response.type = 'error'\n    return response\n  }\n\n  var redirectStatuses = [301, 302, 303, 307, 308]\n\n  Response.redirect = function(url, status) {\n    if (redirectStatuses.indexOf(status) === -1) {\n      throw new RangeError('Invalid status code')\n    }\n\n    return new Response(null, {status: status, headers: {location: url}})\n  }\n\n  self.Headers = Headers\n  self.Request = Request\n  self.Response = Response\n\n  self.fetch = function(input, init) {\n    return new Promise(function(resolve, reject) {\n      var request\n      if (Request.prototype.isPrototypeOf(input) && !init) {\n        request = input\n      } else {\n        request = new Request(input, init)\n      }\n\n      var xhr = new XMLHttpRequest()\n\n      function responseURL() {\n        if ('responseURL' in xhr) {\n          return xhr.responseURL\n        }\n\n        // Avoid security warnings on getResponseHeader when not allowed by CORS\n        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {\n          return xhr.getResponseHeader('X-Request-URL')\n        }\n\n        return\n      }\n\n      xhr.onload = function() {\n        var options = {\n          status: xhr.status,\n          statusText: xhr.statusText,\n          headers: headers(xhr),\n          url: responseURL()\n        }\n        var body = 'response' in xhr ? xhr.response : xhr.responseText\n        resolve(new Response(body, options))\n      }\n\n      xhr.onerror = function() {\n        reject(new TypeError('Network request failed'))\n      }\n\n      xhr.ontimeout = function() {\n        reject(new TypeError('Network request failed'))\n      }\n\n      xhr.open(request.method, request.url, true)\n\n      if (request.credentials === 'include') {\n        xhr.withCredentials = true\n      }\n\n      if ('responseType' in xhr && support.blob) {\n        xhr.responseType = 'blob'\n      }\n\n      request.headers.forEach(function(value, name) {\n        xhr.setRequestHeader(name, value)\n      })\n\n      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)\n    })\n  }\n  self.fetch.polyfill = true\n})(typeof self !== 'undefined' ? self : this);\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/whatwg-fetch/fetch.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./~/whatwg-fetch/fetch.js?");

/***/ }
/******/ ])
});
;
},{}],2:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.LivelyLocales=t():e.LivelyLocales=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(t){if("object"!==("undefined"==typeof t?"undefined":i(t)))throw new Error("Lively Localization instantiated with something other than a messages object",{messages:t});return new f(e,t)}return e&&c[e]?c[e]:l}Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();"function"!=typeof Object.assign&&(Object.assign=function(e,t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),o=1;o<arguments.length;o++){var r=arguments[o];if(null!=r)for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(n[i]=r[i])}return n});var s={},c={},f=function(){function e(t,n){return o(this,e),t&&s[t]||n?(this.name=t,this.data=s[t]||{},void(n&&Object.assign(this.data,n))):void(this.localize=function(e){return e})}return a(e,[{key:"localize",value:function(e){var t=void 0;return(t=this.data[e])?t:(this.name?console.warn("'"+e+"' has no translation in the provided '"+this.name+"' locale files or localization messages"):console.warn("'"+e+"' has no translation in the provided localization messages."),e)}}]),e}(),u=n(1);u.keys().forEach(function(e){var t=e.split("/");3===t.length&&(s[t[1]]||(s[t[1]]={}),s[t[1]]=Object.assign(s[t[1]],u(e)))});var l=new f;Object.keys(s).forEach(function(e){c[e]=new f(e)}),t.default=r,e.exports=t.default},function(e,t){function n(e){throw new Error("Cannot find module '"+e+"'.")}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=1}])});
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var EVENTS = {
	/**
  * The start event is emitted on the start of an upload
  *
  * @event UploadCore#start
  * @type {object}
  * @param {object} file - File object passed to upload
  */
	UPLOAD_START: 'start',
	/**
  * The success event is emitted on the completion of an upload
  *
  * @event UploadCore#success
  * @param {object} file - File object passed to upload
  */
	UPLOAD_SUCCESS: 'success',
	/**
  * The failure event is emitted on failure of an upload
  *
  * @event UploadCore#failure
  * @param {object} file - File object passed to upload
  * @param {object} reason - Reason object for failure
  * @param {string} reason.message - Message key describing failure
  */
	UPLOAD_FAILURE: 'failure',
	/**
  * The addedfile event is emitted on failure of an upload
  *
  * @event UploadCore#addedfile
  * @param {object} file - File object passed to upload
  */
	UPLOAD_ADDEDFILE: 'addedfile',
	/**
  * The config event is emitted on successful request of upload config
  *
  * @event UploadCore#config
  * @param {object} data - Data retrieved from config request
  * @param {number} data.maxFileSize - Max file size allowed for upload
  */
	UPLOAD_CONFIG: 'config',
	/**
  * The progress event is emitted on each successful uploaded chunk
  *
  * @event UploadCore#progress
  * @param {number} currentBytes - Current bytes uploaded
  * @param {number} totalBytes - Total bytes to upload
  * @param {number} percent - Percentage of upload completed 0-100
  */
	UPLOAD_PROGRESS: 'progress',
	/**
  * The thumbnail event is emitted when File API has retrieved a dataUrl from file (Not supported in legacy)
  *
  * @event UploadCore#config
  * @param {object} file - File object passed to upload
  * @param {string} dataUrl - Url of image retrieved by File API
  */
	UPLOAD_THUMBNAIL: 'thumbnail',
	/**
  * The reconnecting event is emitted when chunk has failed due to network issues and is attempting to retry
  *
  * @event UploadCore#reconnecting
  * @param {object} file - File object passed to upload
  * @param {number} attempts - Number of attempts made
  */
	UPLOAD_RECONNECTING: 'reconnecting',
	/**
  * The connected event is emitted when a request has been successfully made after a reconnecting event
  *
  * @event UploadCore#connected
  * @param {object} file - File object passed to upload
  */
	UPLOAD_CONNECTED: 'connected'
};

exports.default = EVENTS;
module.exports = exports['default'];
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('classlist-polyfill');

require('es6-promise/auto');

require('whatwg-fetch');

var _authCore = require('@livelyvideo/auth-core');

var _authCore2 = _interopRequireDefault(_authCore);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _uploadChunked = require('./upload-chunked');

var _uploadChunked2 = _interopRequireDefault(_uploadChunked);

var _uploadLegacy = require('./upload-legacy');

var _uploadLegacy2 = _interopRequireDefault(_uploadLegacy);

var _createElement = require('./utils/createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var _events3 = require('./events');

var _events4 = _interopRequireDefault(_events3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Legacy IE
// Legacy IE
// Legacy fetch

// Imports


var defaultOptions = {
	host: null,
	authUrl: null,
	token: null,
	redirect: null,
	accept: null,
	bemPrefix: 'upload',
	supportLegacy: true,
	forceLegacy: false,
	autoSubmit: true,
	chunkSize: 102400,
	chunkConnections: 3,
	version: 'v2'
};

// @TODO: Add on Legacy Fix
// * @param {string} [options.redirect] - Redirect url for legacy support
// * @param {string} [options.supportLegacy=true] - Support legacy uploader
// * @param {string} [options.forceLegacy=false] - Force browser to use legacy uploder

/**
 * Class representing UploadCore
 */

var UploadCore = function (_EventEmitter) {
	_inherits(UploadCore, _EventEmitter);

	/**
  * Constructs an instance of UploadCore
  *
  * @param {object} el - The DOM element for Chat to be constructed on
  * @param {Config} [options] - Configurable options for the Chat class
  * @param {string} options.host - host of upload route
  * @param {string} options.authUrl - authUrl to connect to
  * @param {string} [options.token] - Manual token for authorization
  * @param {string} [options.accept] - Accept field for upload accept attribute
  * @param {string} [options.bemPrefix=upload] - Prefix for DOM classes
  * @param {string} [options.autoSubmit] - Auto submit upload on select
  * @param {number} [options.chunkSize=102400] - Size of chunks to be uploaded
  * @param {number} [options.chunkConnections=3] - Number of concurrent chunk connections
  * @param {number} [options.version=v2] - Api version
  * @constructs UploadCore
  */
	function UploadCore(el, options) {
		_classCallCheck(this, UploadCore);

		// Options
		var _this = _possibleConstructorReturn(this, (UploadCore.__proto__ || Object.getPrototypeOf(UploadCore)).call(this));

		_this.options = _extends({}, defaultOptions, options);
		_this.options.url = 'https://' + _this.options.host + '/api/upload/' + _this.options.version;

		if (!_this.options.host) {
			throw new Error('No "host" option provided. Option "url" has been deprecated.');
		}

		if (!_this.options.authUrl) {
			throw new Error('No "authUrl" option provided.');
		}

		// Methods
		_this.selectFileChange = _this.selectFileChange.bind(_this);

		// State
		_this.eventListeners = [];
		_this.currentFile = null;
		_this.isCurrentlyUploading = false;

		// Authorization
		if (!_this.options.token) {
			_this.auth = new _authCore2.default('upload', _this.options.authUrl);
			_this.auth.on('ready', function (response) {
				_this.options.token = response.token;

				// @TODO: Not a very good race condition
				if (_this.uploadAuth) {
					_this.uploadAuth.value = 'Bearer ' + _this.options.token;
				}
			});
		}

		// Mount
		_this.mount(el);

		// Render Legacy Mode
		_this.browserSupported = _this.isBrowserSupported();
		_this.legacyMode = _this.options.supportLegacy && !_this.browserSupported || _this.options.forceLegacy;
		if (!_this.browserSupported && !_this.legacyMode) {
			return _possibleConstructorReturn(_this);
		}

		// Render Modern Mode
		_this.render();
		return _this;
	}

	/**
  * Mounts element
  * @param {object} el - The DOM element for Chat to be constructed on
  */


	_createClass(UploadCore, [{
		key: 'mount',
		value: function mount(el) {
			switch (typeof el === 'undefined' ? 'undefined' : _typeof(el)) {
				case 'string':
					this.el = document.querySelector(el);
					break;
				case 'object':
					this.el = el;
					break;
				default:
					throw new Error('The constructor has not been given a valid element or selector.');
			}
		}

		/**
   * Checks if browser has modern technology
   */

	}, {
		key: 'isBrowserSupported',
		value: function isBrowserSupported() {
			var capableBrowser = false;
			if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
				capableBrowser = true;
			}

			return capableBrowser;
		}

		/**
   * Render Moder Elements
   */

	}, {
		key: 'render',
		value: function render() {
			this.uploadForm = (0, _createElement2.default)({
				tagName: 'form',
				className: this.options.bemPrefix + '__form',
				attributes: {
					action: this.options.url + '/multipart',
					method: 'POST',
					encoding: 'multipart/form-data',
					enctype: 'multipart/form-data',
					target: 'postform',
					file: this.file
				}
			});
			this.uploadInput = (0, _createElement2.default)({
				tagName: 'input',
				className: this.options.bemPrefix + '__input',
				attributes: {
					name: 'fileBegin',
					type: 'file'
				}
			});

			if (this.options.accept) {
				this.uploadInput.setAttribute('accept', this.options.accept);
			}

			this.uploadAuth = (0, _createElement2.default)({
				tagName: 'input',
				attributes: {
					type: 'hidden',
					name: 'Authorization',
					value: 'Bearer ' + this.options.token
				}
			});
			this.uploadName = (0, _createElement2.default)({
				tagName: 'input',
				attributes: {
					type: 'hidden',
					name: 'files'
				}
			});
			this.uploadRedirect = (0, _createElement2.default)({
				tagName: 'input',
				attributes: {
					type: 'hidden',
					name: 'redirect',
					value: this.options.redirect
				}
			});

			this.uploadForm.appendChild(this.uploadInput);
			this.uploadForm.appendChild(this.uploadAuth);
			this.uploadForm.appendChild(this.uploadName);
			this.uploadForm.appendChild(this.uploadRedirect);
			this.el.appendChild(this.uploadForm);
			this.eventHelper(this.uploadInput, 'change', this.selectFileChange);
		}

		/**
   * Gets configuration for chunked upload. maxFileSize.
   */

	}, {
		key: 'getConfig',
		value: function getConfig() {
			var _this2 = this;

			fetch(this.options.url + '/config', {
				method: 'GET',
				mode: 'cors',
				headers: {
					Authorization: 'Bearer ' + this.options.token
				}
			}).then(function (response) {
				if (!response.ok) {
					return _this2.emit(_events4.default.UPLOAD_FAILURE, _this2.file, {
						message: 'Network Error.'
					});
				}

				return response.json();
			}).then(function (response) {
				_this2.emit(_events4.default.UPLOAD_CONFIG, response);
				_this2.options.maxFileSize = response.maxFileSize;
			}).catch(function () {
				// eslint-disable-line
				return _this2.emit(_events4.default.UPLOAD_FAILURE, _this2.file, {
					message: 'Network Error.'
				});
			});
		}

		/**
   * Input File Select
   */

	}, {
		key: 'selectFile',
		value: function selectFile() {
			this.uploadInput.click();
		}

		/**
   * Select change handler
   * @param {object} e - event
   */

	}, {
		key: 'selectFileChange',
		value: function selectFileChange(e) {
			this.uploadName.setAttribute('value', e.target.files[0] ? e.target.files[0].name : '');
			var file = e.target.files[0];
			this.addFile(file);
		}

		/**
   * Add File to uploader
   * @param {object} file - File to be added to uploader
   */

	}, {
		key: 'addFile',
		value: function addFile(file) {
			this.currentFile = file;
			this.readFile(file);
			this.uploadFile(file);
			this.emit(_events4.default.UPLOAD_ADDEDFILE, file);
		}

		/**
   * Create new uploader and start upload
   * @param {object} file - File object to be uploaded
   */

	}, {
		key: 'uploadFile',
		value: function uploadFile(file) {
			if (this.currentUploader) {
				this.currentUploader.destroy();
				this.currentUploader = false;
			}

			this.currentUploader = !this.legacyMode ? new _uploadChunked2.default(file, this) : new _uploadLegacy2.default(file, this);

			if (this.options.autoSubmit) {
				this.currentUploader.start();
			}
		}

		/**
   * Starts current upload
   */

	}, {
		key: 'startUpload',
		value: function startUpload() {
			if (this.currentUploader) {
				this.currentUploader.start();
			}
		}

		/**
   * Toggles current upload
   */

	}, {
		key: 'toggleUpload',
		value: function toggleUpload() {
			if (this.currentUploader) {
				this.currentUploader.toggle();
			}
		}
	}, {
		key: 'cancelUpload',
		value: function cancelUpload() {
			if (this.currentUploader) {
				this.currentUploader.cancel();
			}
		}

		/**
   * Read file using FileReader
   * @param {object} file - File object to be read
   */

	}, {
		key: 'readFile',
		value: function readFile(file) {
			if (!this.browserSupported || file.type === '') {
				return;
			}

			var reader = new FileReader();
			var onLoad = function fileRead(event) {
				this.emit(_events4.default.UPLOAD_THUMBNAIL, file, event.target.result);
			}.bind(this);

			reader.onload = onLoad;
			reader.readAsDataURL(file);
		}

		/**
   * Helper for events
   * @param {object} target - DOM element to add listener to
   * @param {string} evt - Event name
   * @param {function} cb - Function to be executed on event
   */

	}, {
		key: 'eventHelper',
		value: function eventHelper(target, evt, cb) {
			target.addEventListener(evt, cb);
			var removeEvent = function removeEvent() {
				target.removeEventListener(evt, cb);
			};
			this.eventListeners.push(removeEvent);
		}

		/**
   * Destroy UploadCore unmount all events
   */

	}, {
		key: 'destroy',
		value: function destroy() {
			for (var i = 0; i < this.eventListeners.length; i++) {
				this.eventListeners.splice(i, 1)[0]();
			}
			this.el.parentNode.removeChild(this.el);
		}
	}]);

	return UploadCore;
}(_events2.default);

exports.default = UploadCore;
module.exports = exports['default'];
},{"./events":3,"./upload-chunked":6,"./upload-legacy":7,"./utils/createElement":8,"@livelyvideo/auth-core":1,"classlist-polyfill":9,"es6-promise/auto":10,"events":12,"whatwg-fetch":14}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var LEGACY_MESSAGES = {
	ERROR_DUP_FILE: 'This file has already been uploaded.',
	ERROR_FILE_NAME: 'This file does not have a name.',
	ERROR_FILE_EXT: 'This file extension is not supported.',
	ERROR_MISSING_BODY: 'This file does not have any data.',
	ERROR_FILE_SIZE: 'This file exceeds max file size.',
	ERROR_UNAUTH: 'The user is not authorized to perform this action.'
};

exports.default = LEGACY_MESSAGES;
module.exports = exports['default'];
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var _legacyMessages = require('./legacy-messages');

var _legacyMessages2 = _interopRequireDefault(_legacyMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing UploadChunked
 */
var UploadChunked = function () {
	/**
  * Constructs an instance of UploadChunked
  *
  * @param {object} file - File object to be uploaded
  * @param {object} Upload - Reference to UploadCore
  * @constructs UploadChunked
  */
	function UploadChunked(file, Upload) {
		_classCallCheck(this, UploadChunked);

		this.file = file;
		this.Upload = Upload;
		this.options = Upload.options;

		// Upload state
		this.fileID = undefined;
		this.fileURI = undefined;

		this.fileSize = this.file.size;
		this.fileIdentifier = this.generateUniqueIdentifier();
		this.chunkSize = this.options.chunkSize;

		this.is_paused = false;

		// Methods
		this._handleFetchError = this._handleFetchError.bind(this);

		// Firefox < 12, Safari
		// https://developer.mozilla.org/en-US/docs/Web/API/Blob/slice
		if ('mozSlice' in this.file) {
			this.sliceMethod = 'mozSlice';
		} else if ('webkitSlice' in this.file) {
			this.sliceMethod = 'webkitSlice';
		} else {
			this.sliceMethod = 'slice';
		}

		// Get Ready To Rumble
		this.chunkTotal = Math.ceil(this.fileSize / this.chunkSize, this.chunkSize) - 1;
		this.currentChunk = 0;
		this.chunks = this.sliceFileToChunks();
	}

	/**
  * Slice file into chunks
  */


	_createClass(UploadChunked, [{
		key: 'sliceFileToChunks',
		value: function sliceFileToChunks() {
			var chunks = [];

			var chunkIndex = 0;

			while (chunkIndex <= this.chunkTotal) {
				var offset = chunkIndex * this.chunkSize;
				var blob = this.file[this.sliceMethod](offset, (chunkIndex + 1) * this.chunkSize);

				var data = {
					chunkIndex: chunkIndex,
					chunkOffset: offset,
					chunkTotal: this.chunkTotal,
					chunkData: blob,
					chunkSize: blob.size,
					chunkLast: chunkIndex === this.chunkTotal,
					totalSize: this.fileSize,
					processing: false,
					processed: false
				};

				chunks.push(data);

				chunkIndex++;
			}

			return chunks;
		}

		/**
   * Remove already completedChunks
   */

	}, {
		key: 'trimChunks',
		value: function trimChunks(completedChunks) {
			// Set processed
			for (var i = 0; i < completedChunks.length; i++) {
				// If for some reason all chunks are completed on server, save last chunk for completion
				if (i !== this.chunkTotal) {
					this.chunks[completedChunks[i]].processed = true;
				}
			}

			// Removed processed
			var l = this.chunks.length;
			while (l--) {
				if (this.chunks[l].processed) {
					this.chunks.splice(l, 1);
				}
			}

			this.calculateProgress();
		}

		/**
   * Sends initial post request
   */

	}, {
		key: 'sendOptions',
		value: function sendOptions() {
			var _this = this;

			fetch('' + this.options.url, {
				method: 'post',
				mode: 'cors',
				headers: {
					Authorization: 'Bearer ' + this.options.token,
					'X-File-Name': this.file.name,
					'X-File-Size': this.file.size,
					'X-File-Identifier': this.fileIdentifier,
					'X-File-Status': true,
					'X-Chunk-Total': this.chunkTotal
				}
			}).then(function (response) {
				if (!response.ok) {
					return _this._parseJSON(response);
				}

				_this.Upload.emit(_events2.default.UPLOAD_PROGRESS, 0, _this.fileSize);
				_this.Upload.emit(_events2.default.UPLOAD_START, _this.file);
				var completedChunks = JSON.parse(response.headers.get('X-Chunks-Completed'));
				if (completedChunks) {
					_this.trimChunks(completedChunks);
				}
				return _this.sendChunks();
			}).then(this._handleFetchError);
		}

		/**
   * Start chunk connections
   */

	}, {
		key: 'sendChunks',
		value: function sendChunks() {
			for (var i = 0; i < this.options.chunkConnections; i++) {
				this.spawnChunkConnection();
			}
		}

		/**
   * Unique identifier for resumable upload
   */

	}, {
		key: 'generateUniqueIdentifier',
		value: function generateUniqueIdentifier() {
			var relativePath = this.file.relativePath || this.file.webkitRelativePath || this.file.fileName || this.file.name;
			return this.fileSize + '-' + relativePath.replace(/[^0-9a-zA-Z_-]/img, '');
		}

		/**
   * Spawn a repeating connection
   */

	}, {
		key: 'spawnChunkConnection',
		value: function spawnChunkConnection(forceChunk) {
			var _this2 = this;

			var chunk = this.getUnprocessedChunk() || forceChunk;

			if (!chunk || this.is_paused) {
				// No more chunks to be processed
				return;
			}

			chunk.processing = true;

			if (chunk.chunkLast && this.chunks.length > 1) {
				return setTimeout(function () {
					return _this2.spawnChunkConnection(chunk);
				}, 500);
			}

			this.foreverFetch(this.options.url, {
				method: 'POST',
				mode: 'cors',
				body: chunk.chunkData,
				headers: {
					Authorization: 'Bearer ' + this.options.token,
					'Content-Type': 'application/octet-stream',
					'X-File-Name': this.file.name,
					'X-File-Size': this.file.size,
					'X-File-Identifier': this.fileIdentifier,
					'X-Chunk-Last': chunk.chunkLast,
					'X-Chunk-Index': chunk.chunkIndex,
					'X-Chunk-Total': chunk.chunkTotal
				}
			}).then(function (response) {
				if (!response.ok) {
					if (response.status === 503) {
						chunk.processing = false;
						return setTimeout(function () {
							return _this2.spawnChunkConnection();
						}, 100);
					}
					return _this2._parseJSON(response);
				}

				_this2.chunks.splice(_this2.chunks.indexOf(chunk), 1);
				_this2.calculateProgress(chunk.chunkLast);

				if (chunk.chunkLast) {
					_this2.fileURI = response.headers.get('X-File-Retrieve-URL');
					_this2.fileID = response.headers.get('X-File-ID');
					_this2.Upload.emit(_events2.default.UPLOAD_SUCCESS, _this2.file, _this2.fileURI, _this2.fileID);
				}

				return _this2.spawnChunkConnection();
			}).then(this._handleFetchError);
		}

		/**
   * Get current progress
   */

	}, {
		key: 'calculateProgress',
		value: function calculateProgress(lastChunk) {
			var zeroChunkTotal = this.chunkTotal + 1;
			var percent = 100 - Math.round(this.chunks.length / zeroChunkTotal * 100);
			var currentBytes = (zeroChunkTotal - this.chunks.length) * this.chunkSize;
			if (lastChunk) {
				currentBytes = this.fileSize;
			}
			this.Upload.emit(_events2.default.UPLOAD_PROGRESS, currentBytes, this.fileSize, percent);
		}

		/**
   * Grab chunk for processing
   */

	}, {
		key: 'getUnprocessedChunk',
		value: function getUnprocessedChunk() {
			for (var i = 0; i < this.chunks.length; i++) {
				var chunk = this.chunks[i];
				if (!chunk.processing && !chunk.processed) {
					return chunk;
				}
			}

			return false;
		}

		/**
   * Handle JSON error responses from upload api
   */

	}, {
		key: '_handleFetchError',
		value: function _handleFetchError(response) {
			if (!response || !response.message) {
				return;
			}

			if (_legacyMessages2.default[response.message]) {
				response.message = _legacyMessages2.default[response.message];
			}

			this.Upload.emit(_events2.default.UPLOAD_FAILURE, this.file, response);
		}

		/**
   * Custom fetch JSON parser that accounts for empty bodies
   */

	}, {
		key: '_parseJSON',
		value: function _parseJSON(response) {
			return response.text().then(function (text) {
				// eslint-disable-line
				return text ? JSON.parse(text) : {};
			});
		}

		/**
   * Continually make fetch requests on network errors
   */

	}, {
		key: 'foreverFetch',
		value: function foreverFetch(url, options) {
			var _this4 = this;

			var delay = 1000;
			var reconnecting = false;

			return new Promise(function (resolve) {
				function wrappedFetch(n) {
					var _this3 = this;

					if (n > 2) {
						delay = 30000;
					} else if (n === 2) {
						delay = 5000;
					}

					fetch(url, options).then(function (response) {
						if (reconnecting) {
							_this3.Upload.emit(_events2.default.UPLOAD_CONNECTED, _this3.file);
						}

						resolve(response);
					}).catch(function () {
						_this3.Upload.emit(_events2.default.UPLOAD_RECONNECTING, _this3.file, n);
						reconnecting = true;

						setTimeout(function () {
							wrappedFetch(++n);
						}, delay);
					});
				}

				wrappedFetch = wrappedFetch.bind(_this4); // eslint-disable-line
				wrappedFetch(1);
			});
		}

		/**
   * Kick off upload by requesting options
   */

	}, {
		key: 'start',
		value: function start() {
			this.sendOptions();
		}

		/**
   * Toggle upload state
   */

	}, {
		key: 'toggle',
		value: function toggle() {
			this.is_paused = !this.is_paused;
			this.Upload.emit(_events2.default.UPLOAD_PAUSE, this.file, this.is_paused);
			if (!this.is_paused) {
				this.sendChunk();
			}
		}

		/**
   * Cancel upload
   */

	}, {
		key: 'cancel',
		value: function cancel() {
			this.Upload.emit(_events2.default.UPLOAD_FAILURE, this.file, {
				message: 'Network Error.'
			});

			this.destroy();
		}

		/**
   * Destroy UploadChunked
   */

	}, {
		key: 'destroy',
		value: function destroy() {
			this.is_paused = true;
			this.file = false;
		}
	}]);

	return UploadChunked;
}();

exports.default = UploadChunked;
module.exports = exports['default'];
},{"./events":3,"./legacy-messages":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createElement = require('./utils/createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var _legacyMessages = require('./legacy-messages');

var _legacyMessages2 = _interopRequireDefault(_legacyMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing UploadLegacy
 */
var UploadLegacy = function () {
	/**
  * Constructs an instance of UploadLegacy
  *
  * @param {object} file - File object to be uploaded
  * @param {object} Upload - Reference to UploadCore
  * @constructs UploadLegacy
  */
	function UploadLegacy(file, Upload) {
		_classCallCheck(this, UploadLegacy);

		this.file = file;
		this.Upload = Upload;
		this.options = Upload.options;

		// Methods
		this.responseHandler = this.responseHandler.bind(this);

		// State
		this.firstLoad = true;

		// Render
		this.renderIframe();
	}

	/**
  * Render response Iframe
  */


	_createClass(UploadLegacy, [{
		key: 'renderIframe',
		value: function renderIframe() {
			this.iframe = (0, _createElement2.default)({
				tagName: 'iframe',
				className: 'upload__iframe',
				attributes: {
					name: 'postform',
					src: 'about:none;',
					style: 'display:none;'
				}
			});

			this.iframe.onload = this.responseHandler;

			// The Submit Form
			this.Upload.el.appendChild(this.iframe);
		}

		/**
   * Start upload
   */

	}, {
		key: 'start',
		value: function start() {
			this.Upload.uploadForm.submit();
			this.Upload.emit(_events2.default.UPLOAD_START, this.file);
		}

		/**
   * Handle Iframe response
   */

	}, {
		key: 'responseHandler',
		value: function responseHandler() {
			// Hack for initial options request
			if (this.firstLoad) {
				this.firstLoad = false;
				return;
			}

			try {
				var response = JSON.parse(this.iframe.contentWindow.document.body.innerText);
				if (response.status === 200) {
					this.Upload.emit(_events2.default.UPLOAD_SUCCESS, this.file);
					return;
				}

				// @NOTE: Response from server
				if (_legacyMessages2.default[response.message]) {
					response.message = _legacyMessages2.default[response.message]; // eslint-disable-line
				}
				this.Upload.emit(_events2.default.UPLOAD_FAILURE, this.file, response);
			} catch (err) {
				this.Upload.emit(_events2.default.UPLOAD_FAILURE, this.file, {
					message: 'Network Error.'
				});
			}
		}

		/**
   * Destroy UploadLegacy
   */

	}, {
		key: 'destroy',
		value: function destroy() {
			this.iframe.parentNode.removeChild(this.iframe);
		}
	}]);

	return UploadLegacy;
}();

exports.default = UploadLegacy;
module.exports = exports['default'];
},{"./events":3,"./legacy-messages":5,"./utils/createElement":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
// Helper for creating elements
// https://gist.github.com/MoOx/8614711
//
// USAGE:
//
// createElement({
// 	tagName: "div",
// 	className: "my-class",
// 	text: "Blah blah",
// 	attributes: {
// 		"id": "element id",
// 		"data-truc": "value"
// 	},
// 	childs: [{ /* recursif call **/}]
// })

function createElement(options) {
	var el = void 0;
	var a = void 0;
	var i = void 0;

	if (!options.tagName) {
		el = document.createDocumentFragment();
	} else {
		el = document.createElement(options.tagName);
		if (options.className) {
			el.className = options.className;
		}

		if (options.attributes) {
			for (a in options.attributes) {
				// eslint-disable-line
				el.setAttribute(a, options.attributes[a]);
			}
		}

		if (options.html !== undefined) {
			el.innerHTML = options.html;
		}
	}

	if (options.text) {
		el.appendChild(document.createTextNode(options.text));
	}

	// IE 8 doesn"t have HTMLElement
	if (window.HTMLElement === undefined) {
		window.HTMLElement = Element;
	}

	if (options.childs && options.childs.length) {
		for (i = 0; i < options.childs.length; i++) {
			el.appendChild(options.childs[i] instanceof window.HTMLElement ? options.childs[i] : createElement(options.childs[i]));
		}
	}

	return el;
}

exports.default = createElement;
module.exports = exports["default"];
},{}],9:[function(require,module,exports){
/*
 * classList.js: Cross-browser full element.classList implementation.
 * 2014-07-23
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

/* Copied from MDN:
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 */

if ("document" in window.self) {

  // Full polyfill for browsers with no classList support
  // Including IE < Edge missing SVGElement.classList
  if (!("classList" in document.createElement("_"))
    || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

  (function (view) {

    "use strict";

    if (!('Element' in view)) return;

    var
        classListProp = "classList"
      , protoProp = "prototype"
      , elemCtrProto = view.Element[protoProp]
      , objCtr = Object
      , strTrim = String[protoProp].trim || function () {
        return this.replace(/^\s+|\s+$/g, "");
      }
      , arrIndexOf = Array[protoProp].indexOf || function (item) {
        var
            i = 0
          , len = this.length
        ;
        for (; i < len; i++) {
          if (i in this && this[i] === item) {
            return i;
          }
        }
        return -1;
      }
      // Vendors: please allow content code to instantiate DOMExceptions
      , DOMEx = function (type, message) {
        this.name = type;
        this.code = DOMException[type];
        this.message = message;
      }
      , checkTokenAndGetIndex = function (classList, token) {
        if (token === "") {
          throw new DOMEx(
              "SYNTAX_ERR"
            , "An invalid or illegal string was specified"
          );
        }
        if (/\s/.test(token)) {
          throw new DOMEx(
              "INVALID_CHARACTER_ERR"
            , "String contains an invalid character"
          );
        }
        return arrIndexOf.call(classList, token);
      }
      , ClassList = function (elem) {
        var
            trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
          , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
          , i = 0
          , len = classes.length
        ;
        for (; i < len; i++) {
          this.push(classes[i]);
        }
        this._updateClassName = function () {
          elem.setAttribute("class", this.toString());
        };
      }
      , classListProto = ClassList[protoProp] = []
      , classListGetter = function () {
        return new ClassList(this);
      }
    ;
    // Most DOMException implementations don't allow calling DOMException's toString()
    // on non-DOMExceptions. Error's toString() is sufficient here.
    DOMEx[protoProp] = Error[protoProp];
    classListProto.item = function (i) {
      return this[i] || null;
    };
    classListProto.contains = function (token) {
      token += "";
      return checkTokenAndGetIndex(this, token) !== -1;
    };
    classListProto.add = function () {
      var
          tokens = arguments
        , i = 0
        , l = tokens.length
        , token
        , updated = false
      ;
      do {
        token = tokens[i] + "";
        if (checkTokenAndGetIndex(this, token) === -1) {
          this.push(token);
          updated = true;
        }
      }
      while (++i < l);

      if (updated) {
        this._updateClassName();
      }
    };
    classListProto.remove = function () {
      var
          tokens = arguments
        , i = 0
        , l = tokens.length
        , token
        , updated = false
        , index
      ;
      do {
        token = tokens[i] + "";
        index = checkTokenAndGetIndex(this, token);
        while (index !== -1) {
          this.splice(index, 1);
          updated = true;
          index = checkTokenAndGetIndex(this, token);
        }
      }
      while (++i < l);

      if (updated) {
        this._updateClassName();
      }
    };
    classListProto.toggle = function (token, force) {
      token += "";

      var
          result = this.contains(token)
        , method = result ?
          force !== true && "remove"
        :
          force !== false && "add"
      ;

      if (method) {
        this[method](token);
      }

      if (force === true || force === false) {
        return force;
      } else {
        return !result;
      }
    };
    classListProto.toString = function () {
      return this.join(" ");
    };

    if (objCtr.defineProperty) {
      var classListPropDesc = {
          get: classListGetter
        , enumerable: true
        , configurable: true
      };
      try {
        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
      } catch (ex) { // IE 8 doesn't support enumerable:true
        if (ex.number === -0x7FF5EC54) {
          classListPropDesc.enumerable = false;
          objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        }
      }
    } else if (objCtr[protoProp].__defineGetter__) {
      elemCtrProto.__defineGetter__(classListProp, classListGetter);
    }

    }(window.self));

    } else {
    // There is full or partial native classList support, so just check if we need
    // to normalize the add/remove and toggle APIs.

    (function () {
      "use strict";

      var testElement = document.createElement("_");

      testElement.classList.add("c1", "c2");

      // Polyfill for IE 10/11 and Firefox <26, where classList.add and
      // classList.remove exist but support only one argument at a time.
      if (!testElement.classList.contains("c2")) {
        var createMethod = function(method) {
          var original = DOMTokenList.prototype[method];

          DOMTokenList.prototype[method] = function(token) {
            var i, len = arguments.length;

            for (i = 0; i < len; i++) {
              token = arguments[i];
              original.call(this, token);
            }
          };
        };
        createMethod('add');
        createMethod('remove');
      }

      testElement.classList.toggle("c3", false);

      // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
      // support the second argument.
      if (testElement.classList.contains("c3")) {
        var _toggle = DOMTokenList.prototype.toggle;

        DOMTokenList.prototype.toggle = function(token, force) {
          if (1 in arguments && !this.contains(token) === !force) {
            return force;
          } else {
            return _toggle.call(this, token);
          }
        };

      }

      testElement = null;
    }());
  }
}

},{}],10:[function(require,module,exports){
// This file can be required in Browserify and Node.js for automatic polyfill
// To use it:  require('es6-promise/auto');
'use strict';
module.exports = require('./').polyfill();

},{"./":11}],11:[function(require,module,exports){
(function (process,global){
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.0
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  return typeof x === 'function' || typeof x === 'object' && x !== null;
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
} else {
  _isArray = Array.isArray;
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = r('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && typeof require === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        _resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      _reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      _reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    _reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return _resolve(promise, value);
    }, function (reason) {
      return _reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$) {
  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$ === GET_THEN_ERROR) {
      _reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$ === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$)) {
      handleForeignThenable(promise, maybeThenable, then$$);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function _resolve(promise, value) {
  if (promise === value) {
    _reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      _reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate();
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    _reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
};

Enumerator.prototype._enumerate = function () {
  var length = this.length;
  var _input = this._input;

  for (var i = 0; this._state === PENDING && i < length; i++) {
    this._eachEntry(_input[i], i);
  }
};

Enumerator.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$ = c.resolve;

  if (resolve$$ === resolve) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$) {
        return resolve$$(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$(entry), i);
  }
};

Enumerator.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      _reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}

Promise.all = all;
Promise.race = race;
Promise.resolve = resolve;
Promise.reject = reject;
Promise._setScheduler = setScheduler;
Promise._setAsap = setAsap;
Promise._asap = asap;

Promise.prototype = {
  constructor: Promise,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise;
}

// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;

return Promise;

})));


}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":13}],12:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],13:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],14:[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (typeof input === 'string') {
      this.url = input
    } else {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split('\r\n').forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var EVENTS = exports.EVENTS = {
	UPLOAD_START: 'start',
	UPLOAD_SUCCESS: 'success',
	UPLOAD_FAILURE: 'failure',
	UPLOAD_ADDEDFILE: 'addedfile',
	UPLOAD_CONFIG: 'config',
	UPLOAD_PROGRESS: 'progress',
	UPLOAD_THUMBNAIL: 'thumbnail',
	// Upload Form Events
	FORM_DROP: 'drop',
	FORM_DRAG: 'drag',
	FORM_DRAGSTART: 'dragstart',
	FORM_DRAGEND: 'dragend',
	FORM_DRAGENTER: 'dragenter',
	FORM_DRAGOVER: 'dragover',
	FORM_DRAGLEAVE: 'dragleave'
};

},{}],16:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('classlist-polyfill');

require('es6-promise/auto');

var _lib = require('@livelyvideo/upload-core/lib');

var _lib2 = _interopRequireDefault(_lib);

var _localization = require('@livelyvideo/localization');

var _localization2 = _interopRequireDefault(_localization);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _createElement = require('./utils/createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var _formatBytes = require('./utils/formatBytes');

var _formatBytes2 = _interopRequireDefault(_formatBytes);

var _forwardEvents = require('./utils/forwardEvents');

var _forwardEvents2 = _interopRequireDefault(_forwardEvents);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Legacy IE
// Legacy IE

// Imports


var defaultOptions = {
	host: null,
	authUrl: null,
	token: null,
	redirect: null,
	accept: null,
	bemPrefix: 'upload',
	supportLegacy: true,
	forceLegacy: false,
	autoSubmit: true,
	pause: false,
	cancel: false,
	messages: null,
	chunkSize: 102400,
	chunkConnections: 3,
	version: 'v2'
};

// @TODO: Add on Legacy Fix
// * @param {string} [options.redirect] - Redirect url for legacy support
// * @param {string} [options.supportLegacy=true] - Support legacy uploader
// * @param {string} [options.forceLegacy=false] - Force browser to use legacy uploder

/**
 * Class representing UploadClient
 */

var UploadClient = function (_EventEmitter) {
	_inherits(UploadClient, _EventEmitter);

	/**
  * Constructs an instance of UploadClient
  *
  * @param {object} el - The DOM element for Chat to be constructed on
  * @param {Config} [options] - Configurable options for the Chat class
  * @param {string} options.host - host of upload route
  * @param {string} options.authUrl - authUrl to connect to
  * @param {string} [options.token] - Manual token for authorization
  * @param {string} [options.redirect] - Redirect url for legacy support
  * @param {string} [options.accept] - Accept field for upload accept attribute
  * @param {string} [options.bemPrefix=upload] - Prefix for DOM classes
  * @param {string} [options.autoSubmit=true] - Auto submit upload on select
  * @param {string} [options.pause=false] - Render pause button
  * @param {string} [options.cancel=false] - Render cancel button
  * @param {string} [options.messages] - Hard code message strings
  * @param {number} [options.chunkSize=102400] - Size of chunks to be uploaded
  * @param {number} [options.chunkConnections=3] - Number of concurrent chunk connections
  * @param {number} [options.version=v2] - Api version
  * @constructs UploadClient
  */
	function UploadClient(el, options) {
		_classCallCheck(this, UploadClient);

		var _this = _possibleConstructorReturn(this, (UploadClient.__proto__ || Object.getPrototypeOf(UploadClient)).call(this));

		_this.options = _extends({}, defaultOptions, options);

		if (!_this.options.host) {
			throw new Error('No "host" option provided. Option "url" has been deprecated.');
		}

		if (!_this.options.authUrl) {
			throw new Error('No "authUrl" option provided.');
		}

		// Support old MESSAGES key (Seattle)
		if (_this.options.MESSAGES) {
			_this.options.messages = _this.options.MESSAGES;
		}

		// Localization
		var localization = new _localization2.default(_this.options.locale, _this.options.messages);
		_this.localize = localization.localize.bind(localization);

		_this.mount(el);

		// State
		_this.eventListeners = [];

		// Init Upload
		_this.upload = new _lib2.default(_this.el, _this.options);
		(0, _forwardEvents2.default)(_this.upload, _this);

		// Unsupported
		if (!_this.upload.browserSupported && !_this.upload.legacyMode) {
			_this.renderUnsupported();
			return _possibleConstructorReturn(_this);
		}

		// Modern
		if (!_this.upload.legacyMode) {
			_this.initModern();
			_this.startHandler = _this.startHandler.bind(_this);
			_this.progressHandler = _this.progressHandler.bind(_this);
			_this.successHandler = _this.successHandler.bind(_this);
			_this.failureHandler = _this.failureHandler.bind(_this);
			_this.thumbnailHandler = _this.thumbnailHandler.bind(_this);
			_this.addedfileHandler = _this.addedfileHandler.bind(_this);
			_this.pauseHandler = _this.pauseHandler.bind(_this);
			_this.upload.on(_constants.EVENTS.UPLOAD_START, _this.startHandler);
			_this.upload.on(_constants.EVENTS.UPLOAD_PROGRESS, _this.progressHandler);
			_this.upload.on(_constants.EVENTS.UPLOAD_SUCCESS, _this.successHandler);
			_this.upload.on(_constants.EVENTS.UPLOAD_FAILURE, _this.failureHandler);
			_this.upload.on(_constants.EVENTS.UPLOAD_THUMBNAIL, _this.thumbnailHandler);
			_this.upload.on(_constants.EVENTS.UPLOAD_ADDEDFILE, _this.addedfileHandler);
			_this.upload.on(_constants.EVENTS.UPLOAD_PAUSE, _this.pauseHandler);
			return _possibleConstructorReturn(_this);
		}

		// Legacy
		_this.initLegacy();
		_this.legacyStartHandler = _this.legacyStartHandler.bind(_this);
		_this.legacySuccessHandler = _this.legacySuccessHandler.bind(_this);
		_this.legacyFailureHandler = _this.legacyFailureHandler.bind(_this);
		_this.upload.on(_constants.EVENTS.UPLOAD_START, _this.legacyStartHandler);
		_this.upload.on(_constants.EVENTS.UPLOAD_SUCCESS, _this.legacySuccessHandler);
		_this.upload.on(_constants.EVENTS.UPLOAD_FAILURE, _this.legacyFailureHandler);
		return _this;
	}

	/**
  * Mounts element
  * @param {object} el - The DOM element for Chat to be constructed on
  */


	_createClass(UploadClient, [{
		key: 'mount',
		value: function mount(el) {
			switch (typeof el === 'undefined' ? 'undefined' : _typeof(el)) {
				case 'string':
					this.el = document.querySelector(el);
					break;
				case 'object':
					this.el = el;
					break;
				default:
					throw new Error('The constructor has not been given a valid element or selector.');
			}

			this.el.classList.add(this.options.bemPrefix);
		}

		/**
   * Render unsupported upload message
   */

	}, {
		key: 'renderUnsupported',
		value: function renderUnsupported() {
			this.uploadUnsupported = (0, _createElement2.default)({
				tagName: 'p',
				className: this.options.bemPrefix + '__unsupported',
				text: this.localize('Your browser does not support HTML5 upload. We recommend upgrading your browser.')
			});
			this.el.appendChild(this.uploadUnsupported);
		}

		/**
   * Render upload ui
   */

	}, {
		key: 'render',
		value: function render(legacy) {
			this.uploadContainer = (0, _createElement2.default)({
				tagName: 'div',
				className: this.options.bemPrefix + '__container'
			});
			this.uploadPreview = (0, _createElement2.default)({
				tagName: 'div',
				className: this.options.bemPrefix + '__preview'
			});
			this.uploadTitle = (0, _createElement2.default)({
				tagName: 'label',
				className: this.options.bemPrefix + '__title',
				text: legacy ? this.localize('Click to upload.') : this.localize('Drop files here or click to upload.')
			});
			this.uploadSubTitle = (0, _createElement2.default)({
				tagName: 'label',
				className: this.options.bemPrefix + '__sub-title',
				text: legacy ? this.localize('File preview and drag and drop unavailable. Please upgrade your browser for a better experience.') : this.localize('Max file size 48Mb.')
			});
			this.uploadError = (0, _createElement2.default)({
				tagName: 'div',
				className: this.options.bemPrefix + '__error'
			});

			this.uploadContainer.appendChild(this.uploadPreview);
			this.uploadContainer.appendChild(this.uploadTitle);
			this.uploadContainer.appendChild(this.uploadSubTitle);
			this.uploadContainer.appendChild(this.uploadError);
			this.el.appendChild(this.uploadContainer);
		}

		/**
   * Render Cancel/Pause controls
   */

	}, {
		key: 'renderControls',
		value: function renderControls() {
			var _this2 = this;

			if (!this.options.pause && !this.options.cancel) {
				return;
			}

			this.uploadControls = (0, _createElement2.default)({
				tagName: 'div',
				className: this.options.bemPrefix + '__controls'
			});

			// Pause Button
			if (this.options.pause) {
				this.uploadPauseButton = (0, _createElement2.default)({
					tagName: 'button',
					className: this.options.bemPrefix + '__pause-button',
					text: 'Pause Upload',
					attributes: {
						disabled: true
					}
				});
				this.eventHelper(this.uploadPauseButton, 'click', function (e) {
					e.preventDefault();
					e.stopPropagation();
					_this2.upload.toggleUpload();
				});
				this.uploadControls.appendChild(this.uploadPauseButton);
			}

			// Cancel Button
			if (this.options.cancel) {
				this.uploadCancelButton = (0, _createElement2.default)({
					tagName: 'button',
					className: this.options.bemPrefix + '__cancel-button',
					text: 'Cancel Upload',
					attributes: {
						disabled: true
					}
				});
				this.eventHelper(this.uploadCancelButton, 'click', function (e) {
					e.preventDefault();
					e.stopPropagation();
					_this2.upload.cancelUpload();
				});
				this.uploadControls.appendChild(this.uploadCancelButton);
			}

			this.uploadContainer.appendChild(this.uploadControls);
		}

		/**
   * Render upload progress
   */

	}, {
		key: 'renderProgress',
		value: function renderProgress() {
			if (this.uploadProgress) {
				this.uploadProgress.parentNode.removeChild(this.uploadProgress);
			}

			this.uploadProgress = (0, _createElement2.default)({
				tagName: 'div',
				className: this.options.bemPrefix + '__progress'
			});

			this.uploadPreview.appendChild(this.uploadProgress);
		}

		/*
   * Initialize modern upload
   */

	}, {
		key: 'initModern',
		value: function initModern() {
			var _this3 = this;

			this.render();
			this.renderControls();

			// FORM LISTENERS
			this.eventHelper(this.el, _constants.EVENTS.FORM_DROP, function (e) {
				e.preventDefault();
				e.stopPropagation();
				_this3.emit(_constants.EVENTS.FORM_DROP, e);
				_this3.el.classList.remove(_this3.options.bemPrefix + '--is-dragover');
				_this3.upload.addFile(e.dataTransfer.files[0]);
			});
			this.eventHelper(this.el, _constants.EVENTS.FORM_DRAG, function (e) {
				e.preventDefault();
				e.stopPropagation();
				_this3.emit(_constants.EVENTS.FORM_DRAG, e);
			});
			this.eventHelper(this.el, _constants.EVENTS.FORM_DRAGSTART, function (e) {
				e.preventDefault();
				e.stopPropagation();
				_this3.emit(_constants.EVENTS.FORM_DRAGSTART, e);
			});
			this.eventHelper(this.el, _constants.EVENTS.FORM_DRAGEND, function (e) {
				e.preventDefault();
				e.stopPropagation();
				_this3.emit(_constants.EVENTS.FORM_DRAGEND, e);
				_this3.el.classList.remove(_this3.options.bemPrefix + '--is-dragover');
			});
			this.eventHelper(this.el, _constants.EVENTS.FORM_DRAGENTER, function (e) {
				e.preventDefault();
				e.stopPropagation();
				_this3.emit(_constants.EVENTS.FORM_DRAGENTER, e);
				_this3.el.classList.add(_this3.options.bemPrefix + '--is-dragover');
			});
			this.eventHelper(this.el, _constants.EVENTS.FORM_DRAGOVER, function (e) {
				e.preventDefault();
				e.stopPropagation();
				_this3.emit(_constants.EVENTS.FORM_DRAGOVER, e);
				_this3.el.classList.add(_this3.options.bemPrefix + '--is-dragover');
			});
			this.eventHelper(this.el, _constants.EVENTS.FORM_DRAGLEAVE, function (e) {
				e.preventDefault();
				e.stopPropagation();
				_this3.emit(_constants.EVENTS.FORM_DRAGLEAVE, e);
				_this3.el.classList.remove(_this3.options.bemPrefix + '--is-dragover');
			});

			this.eventHelper(this.el, 'click', function () {
				_this3.upload.selectFile();
			});
		}

		/*
   * Initialize legacy upload
   */

	}, {
		key: 'initLegacy',
		value: function initLegacy() {
			var _this4 = this;

			this.render(true);
			this.el.classList.add('upload--is-legacy');

			this.eventHelper(this.el, 'click', function () {
				_this4.upload.selectFile();
			});
		}

		/*
   * Modern 'start' event handler
   */

	}, {
		key: 'startHandler',
		value: function startHandler() {
			this.renderProgress();
			this.uploadError.innerText = '';
			this.uploadError.classList.remove('upload__error--active');

			// Controls
			if (this.uploadPauseButton) {
				this.uploadPauseButton.classList.add('upload__pause-button--is-enabled');
				this.uploadPauseButton.disabled = false;
			}

			if (this.uploadCancelButton) {
				this.uploadCancelButton.classList.add('upload__cancel-button--is-enabled');
				this.uploadCancelButton.disabled = false;
			}
		}

		/*
   * Modern 'progress' event handler
   */

	}, {
		key: 'progressHandler',
		value: function progressHandler(currentBytes, totalBytes) {
			if (!this.uploadProgress) {
				return;
			}

			this.uploadProgress.style.paddingBottom = parseFloat(Math.round(currentBytes / totalBytes * 100)) + '%';
		}

		/*
   * Modern 'success' event handler
   */

	}, {
		key: 'successHandler',
		value: function successHandler() {
			var _this5 = this;

			setTimeout(function () {
				_this5.uploadProgress.classList.add(_this5.options.bemPrefix + '__progress--complete');

				// Controls
				if (_this5.uploadPauseButton) {
					_this5.uploadPauseButton.classList.remove('upload__pause-button--is-enabled');
					_this5.uploadPauseButton.disabled = true;
				}

				if (_this5.uploadCancelButton) {
					_this5.uploadCancelButton.classList.remove('upload__cancel-button--is-enabled');
					_this5.uploadCancelButton.disabled = true;
				}
			}, 1000);
		}

		/*
   * Modern 'failure' event handler
   */

	}, {
		key: 'failureHandler',
		value: function failureHandler(file, error) {
			this.renderProgress();
			this.uploadError.innerText = this.localize(error.message);
			this.uploadError.classList.add('upload__error--active');
			this.uploadProgress.classList.add('upload__progress--error');

			// Controls
			if (this.uploadPauseButton) {
				this.uploadPauseButton.classList.remove('upload__pause-button--is-enabled');
				this.uploadPauseButton.disabled = true;
			}

			if (this.uploadCancelButton) {
				this.uploadCancelButton.classList.remove('upload__cancel-button--is-enabled');
				this.uploadCancelButton.disabled = true;
			}
		}

		/*
   * Modern 'thumbnail' event handler
   */

	}, {
		key: 'thumbnailHandler',
		value: function thumbnailHandler(file, dataUrl) {
			this.uploadPreview.style.backgroundImage = dataUrl ? 'url(' + (dataUrl ? dataUrl : '') + ')' : null; // eslint-disable-line
			this.uploadPreview.style.backgroundSize = dataUrl ? 'cover' : null;
		}

		/*
   * Modern 'addedfile' event handler
   */

	}, {
		key: 'addedfileHandler',
		value: function addedfileHandler(file) {
			this.uploadTitle.innerText = file.name;
			this.uploadSubTitle.innerText = (0, _formatBytes2.default)(file.size);
		}

		/*
   * Modern 'pause' event handler
   */

	}, {
		key: 'pauseHandler',
		value: function pauseHandler(file, paused) {
			if (paused) {
				this.uploadPauseButton.classList.add('upload__pause-button--paused');
				this.uploadProgress.classList.add('upload__progress--paused');
				return;
			}

			this.uploadPauseButton.classList.remove('upload__pause-button--paused');
			this.uploadProgress.classList.remove('upload__progress--paused');
		}

		/*
   * Legacy 'start' event handler
   */

	}, {
		key: 'legacyStartHandler',
		value: function legacyStartHandler() {
			this.renderProgress();
			this.uploadProgress.classList.add(this.options.bemPrefix + '__progress--loading');
			this.uploadError.innerText = '';
		}

		/*
   * Legacy 'success' event handler
   */

	}, {
		key: 'legacySuccessHandler',
		value: function legacySuccessHandler() {
			var _this6 = this;

			setTimeout(function () {
				_this6.uploadProgress.classList.remove(_this6.options.bemPrefix + '__progress--loading');
				_this6.uploadProgress.classList.add(_this6.options.bemPrefix + '__progress--complete');
			}, 1000);
		}

		/*
   * Legacy 'failure' event handler
   */

	}, {
		key: 'legacyFailureHandler',
		value: function legacyFailureHandler(file, error) {
			this.renderProgress();
			this.uploadError.innerText = this.localize(error.message);
			this.uploadError.classList.add('upload__error--active');
			this.uploadProgress.classList.add('upload__progress--error');
		}

		/**
   * Helper function that returns removeEventListener function
   */

	}, {
		key: 'eventHelper',
		value: function eventHelper(target, evt, cb) {
			target.addEventListener(evt, cb);
			var removeEvent = function removeEvent() {
				target.removeEventListener(evt, cb);
			};
			this.eventListeners.push(removeEvent);
		}

		/*
   * Destroy UploadClient
   */

	}, {
		key: 'destroy',
		value: function destroy() {
			for (var i = 0; i < this.eventListeners.length; i++) {
				this.eventListeners.splice(i, 1)[0]();
			}
			this.el.parentNode.removeChild(this.el);
		}
	}]);

	return UploadClient;
}(_events2.default);

module.exports = UploadClient;

},{"./constants":15,"./utils/createElement":17,"./utils/formatBytes":18,"./utils/forwardEvents":19,"@livelyvideo/localization":2,"@livelyvideo/upload-core/lib":4,"classlist-polyfill":9,"es6-promise/auto":10,"events":12}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
// Helper for creating elements
// https://gist.github.com/MoOx/8614711
//
// USAGE:
//
// createElement({
// 	tagName: "div",
// 	className: "my-class",
// 	text: "Blah blah",
// 	attributes: {
// 		"id": "element id",
// 		"data-truc": "value"
// 	},
// 	childs: [{ /* recursif call **/}]
// })

function createElement(options) {
	var el = void 0;
	var a = void 0;
	var i = void 0;

	if (!options.tagName) {
		el = document.createDocumentFragment();
	} else {
		el = document.createElement(options.tagName);
		if (options.className) {
			el.className = options.className;
		}

		if (options.attributes) {
			for (a in options.attributes) {
				// eslint-disable-line
				el.setAttribute(a, options.attributes[a]);
			}
		}

		if (options.html !== undefined) {
			el.innerHTML = options.html;
		}
	}

	if (options.text) {
		el.appendChild(document.createTextNode(options.text));
	}

	// IE 8 doesn"t have HTMLElement
	if (window.HTMLElement === undefined) {
		window.HTMLElement = Element;
	}

	if (options.childs && options.childs.length) {
		for (i = 0; i < options.childs.length; i++) {
			el.appendChild(options.childs[i] instanceof window.HTMLElement ? options.childs[i] : createElement(options.childs[i]));
		}
	}

	return el;
}

exports.default = createElement;

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
// Helper function for human readable bytes
// http://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript

function formatBytes(bytes, decimals) {
	if (bytes === 0) return '0 Byte';
	var k = 1000; // or 1024 for binary
	var dm = decimals + 1 || 3;
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	var i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

exports.default = formatBytes;

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
function forwardEvents(src, dest) {
	if (!(src instanceof _events2.default) || !(dest instanceof _events2.default)) {
		return;
	}

	var emitter = src.emit;

	src.emit = function () {
		dest.emit.apply(dest, arguments);
		return emitter.apply(this, arguments);
	}.bind(src);
};

exports.default = forwardEvents;

},{"events":12}]},{},[16])(16)
});