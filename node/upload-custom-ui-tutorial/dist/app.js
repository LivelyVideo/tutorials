(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _lib = require('@livelyvideo/upload/lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import StockPlayer from '@livelyvideo/stock-vod-player';
// import xhr from 'xhr';
// import text from 'text-content';

/**
 * This is a guide building a custom upload ui
 */

/**
 * Example 1: Vanilla Upload
 *
 * This is an example implementation using basic settings.
 * Vanilla upload requires 'upload.min.css' to be styled properly
 * Include in your html <link type="text/css" rel="stylesheet" href="/upload.min.css">
 *
 * The only required options are 'host' and 'authUrl'.
 * @param {string} options.host - Destination host of your uploads
 * @param {string} options.authUrl - Route to retreive access tokens that authorize you to use host
 */
var uploadVanilla = new _lib2.default(document.querySelector('#upload-vanilla'), {
  host: 'dev.livelyvideo.tv',
  authUrl: '/access-token',
  bemPrefix: 'upload'
});
window.uploadVanilla = uploadVanilla;

/**
 * Example 2: Custom Multiple Upload
 *
 * This is an example implementation of a custom multiple upload interface.
 * 
 * Step 1: 
 * To not overlap styles with the vanilla upload we are going to give our upload the bemPrefix 'upload-multiple'
 * This will prefix all of the upload class names with 'upload-multiple'
 *
 * Step 2:
 * In this example we want to disable 'drag and drop' and only use a button to select files
 * If we pass a DOM element in the 'selectTarget' option, that element will now open file selection on 'click'
 *
 * Step 3:
 * We want to append our previews somewhere else, not in our constructor div 
 * To achieve this we pass a DOM element to the 'previewsTarget' option
 *
 * Step 4: 
 * We now have all the parts in place to style our custom interface
 * Check out 'dist/upload-multiple' for an example styling
 *
 * @param {string} [options.bemPrefix=upload] - Prefix for DOM classes
 * @param {object} [options.selectTarget] - Select a custom DOM element to open file select on click, disables drag and drop
 * @param {object} [options.previewsTarget] - Select a custom DOM element for previews to be appended to
 */

var uploadMultipleSelectTarget = document.querySelector('#upload-multiple__select-target');
var uploadMultiplePreviewsTarget = document.querySelector('#upload-multiple__previews-target');
var uploadMultiple = new _lib2.default(document.querySelector('#upload-multiple'), {
  host: 'dev.livelyvideo.tv',
  authUrl: '/access-token',
  bemPrefix: 'upload-multiple',
  selectTarget: uploadMultipleSelectTarget,
  previewsTarget: uploadMultiplePreviewsTarget
});
window.uploadMultiple = uploadMultiple;

/**
 * Example 2: Custom Avatar Upload
 *
 * This is an example implementation of a custom single upload interface.
 * 
 * Step 1: 
 * To not overlap styles with the vanilla upload we are going to give our upload the bemPrefix 'upload-single'
 * This will prefix all of the upload class names with 'upload-single'
 *
 * Step 2:
 * We will set the 'multiple' option to false which allow selection for only one file and keep a single preview
 *
 * Step 3:
 * We will set the 'accept' option to 'image/*' to only allow image files to be added to upload
 *
 * Step 4: ***See Code Below***
 * We will use the 'success' event listener to manage our interface state 
 * In this case we will change the avatar to whatever image was successfully uploaded
 *
 * Step 5: 
 * We now have all the parts in place to style our custom interface
 * Check out 'dist/upload-avatar' for an example styling
 *
 * @param {string} [options.bemPrefix=upload] - Prefix for DOM classes
 * @param {string} [options.accept] - Accept field for upload accept attribute
 * @param {bool} [options.multiple=true] - Allow multiple files for upload
 */
var uploadAvatar = new _lib2.default(document.querySelector('#upload-avatar'), {
  host: 'dev.livelyvideo.tv',
  authUrl: '/access-token',
  bemPrefix: 'upload-avatar',
  multiple: false,
  accept: 'image/*'
});

// Step 4:
window.uploadAvatar = uploadAvatar;
window.uploadAvatar.on('success', function (file, fileURI, fileID) {
  var uploadAvatarImage = document.querySelector('#upload-avatar__image');
  uploadAvatarImage.style.backgroundImage = 'url(' + fileURI + '?token=' + uploadAvatar.upload.options.token + ')';
});

},{"@livelyvideo/upload/lib":8}],2:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.LivelyLocales=t():e.LivelyLocales=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(t){if("object"!==("undefined"==typeof t?"undefined":i(t)))throw new Error("Lively Localization instantiated with something other than a messages object",{messages:t});return new f(e,t)}return e&&c[e]?c[e]:l}Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();"function"!=typeof Object.assign&&(Object.assign=function(e,t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),o=1;o<arguments.length;o++){var r=arguments[o];if(null!=r)for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(n[i]=r[i])}return n});var s={},c={},f=function(){function e(t,n){return o(this,e),t&&s[t]||n?(this.name=t,this.data=s[t]||{},void(n&&Object.assign(this.data,n))):void(this.localize=function(e){return e})}return a(e,[{key:"localize",value:function(e){var t=void 0;return(t=this.data[e])?t:(this.name?console.warn("'"+e+"' has no translation in the provided '"+this.name+"' locale files or localization messages"):console.warn("'"+e+"' has no translation in the provided localization messages."),e)}}]),e}(),u=n(1);u.keys().forEach(function(e){var t=e.split("/");3===t.length&&(s[t[1]]||(s[t[1]]={}),s[t[1]]=Object.assign(s[t[1]],u(e)))});var l=new f;Object.keys(s).forEach(function(e){c[e]=new f(e)}),t.default=r,e.exports=t.default},function(e,t){function n(e){throw new Error("Cannot find module '"+e+"'.")}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=1}])});
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _serializeError = require('serialize-error');

var _serializeError2 = _interopRequireDefault(_serializeError);

var _browserInfo = require('browser-info');

var _browserInfo2 = _interopRequireDefault(_browserInfo);

var _instance = require('./instance');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Default Options
 */
var defaultOptions = {
	level: 'warn',
	silent: true,
	packageName: null,
	packageVersion: null
};

/**
 * Supported Levels
 * Logging levels are prioritized from 0-3
 */
var supportedLevels = {
	error: 0,
	warn: 1,
	info: 2,
	debug: 3,
	deprecated: 3,
	timing: 3,
	network: 3
};

/**
 * @class LoggerCore
 */

var LoggerCore = function () {
	/**
  * @constructs Logger
  * @param {object} options
  * @param {string} [options.level=warn] - package name
  * @param {bool} [options.silent=true] - Output to window.console if available
  * @param {string} [options.packageName] - package name
  * @param {string} [options.packageVersion] - package version
  */
	function LoggerCore(options) {
		_classCallCheck(this, LoggerCore);

		this.options = _extends({}, defaultOptions, options);

		this.instance = new _instance2.default();
		this._browserInfo = (0, _browserInfo2.default)();

		this.enable();
	}

	/**
  * Sets Options
  * @param {object} options
  * @param {string} [options.level=warn] - package name
  * @param {bool} [options.silent=true] - Output to window.console if available
  * @param {string} [options.packageName] - package name
  * @param {string} [options.packageVersion] - package version
  */


	_createClass(LoggerCore, [{
		key: 'setOptions',
		value: function setOptions(options) {
			this.options = _extends({}, this.options, options);
		}

		/**
   * Set global instance options
   * @param {object} options
   * @param {string} [options.host] - Scope of the authorization
   * @param {number} [options.interval=30000] - Interval at which logger sends batches.
   * @param {number} [options.limit=100] - Limit at which the logger will send stored logs regardless of interval.
   * @param {number} [options.maxRequestSize=1048576] - Max byte size of batched log request.
   */

	}, {
		key: 'setInstanceOptions',
		value: function setInstanceOptions(options) {
			if (this.instance.options.host && options.host && this.instance.options.host !== options.host) {
				this.warn('Unable to set instance options. Host set to ' + this.instance.options.host + ' and cannot be set ' + options.host + '.');
				return;
			}

			this.instance.setOptions(options);
		}

		/**
   * Helper method for enabling instance requests.
   */

	}, {
		key: 'enableInstance',
		value: function enableInstance() {
			this.instance.enable();
		}

		/**
   * Helper method for disabling instance requests.
   */

	}, {
		key: 'disableInstance',
		value: function disableInstance() {
			this.instance.disable();
		}

		/**
   * Helper method for immediately sending current logs in instance.
   */

	}, {
		key: 'instanceSend',
		value: function instanceSend() {
			this.instance.send();
		}

		/**
   * Set log levels
   * @param {string} level
   */

	}, {
		key: 'setLevel',
		value: function setLevel(level) {
			if (!supportedLevels[level]) {
				this.warn(level + ' level is unsupported.');
				return;
			}

			this.options.level = level;
		}

		/**
   * Generic log function
   * @param {string} level
   * @param {...args} Message and other data to be sent with log
   */

	}, {
		key: 'log',
		value: function log(level) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			if (this._isWritable(level)) {
				var _writer;

				(_writer = this.writer)[level].apply(_writer, args);
			}

			var log = this._validateLog(level, args);

			if (log) {
				this.instance.add(log);
			}
		}

		/**
   * Public interface for debug logging. Logs any arguments
   * @return {void}
   */

	}, {
		key: 'debug',
		value: function debug() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			this.log.apply(this, ['debug'].concat(args));
		}

		/**
   * Public interface for error logging. Logs any arguments
   * @return {void}
   */

	}, {
		key: 'error',
		value: function error() {
			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			this.log.apply(this, ['error'].concat(args));
		}

		/**
   * Public interface for info logging. Logs any arguments
   * @return {void}
   */

	}, {
		key: 'info',
		value: function info() {
			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			this.log.apply(this, ['info'].concat(args));
		}

		/**
   * Public interface for warning logging. Logs any arguments
   * @return {void}
   */

	}, {
		key: 'warn',
		value: function warn() {
			for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				args[_key5] = arguments[_key5];
			}

			this.log.apply(this, ['warn'].concat(args));
		}

		/**
   * Public interface for deprecated logging. Logs any arguments
   * @return {void}
   */

	}, {
		key: 'deprecated',
		value: function deprecated() {
			for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
				args[_key6] = arguments[_key6];
			}

			this.log.apply(this, ['deprecated'].concat(args));
		}

		/**
   * Public interface for timing logging. Logs any arguments
   * @return {void}
   */

	}, {
		key: 'timing',
		value: function timing() {
			for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
				args[_key7] = arguments[_key7];
			}

			this.log.apply(this, ['timing'].concat(args));
		}

		/**
   * Public interface for timing logging. Logs any arguments
   * @return {void}
   */

	}, {
		key: 'network',
		value: function network() {
			for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
				args[_key8] = arguments[_key8];
			}

			this.log.apply(this, ['network'].concat(args));
		}

		/**
   * Send current batch state and remove events
   */

	}, {
		key: 'enable',
		value: function enable() {
			if (window.console) {
				this.writer = window.console;
				this.writer.timing = this.writer.info;
				this.writer.deprecated = this.writer.warn;
				this.writer.network = this.writer.warn;
			}
		}

		/**
   * Send current batch state and remove events
   */

	}, {
		key: 'disable',
		value: function disable() {
			this.writer = {};
		}

		/**
   * Check if level is writable
   * @param {string} level
   */

	}, {
		key: '_isWritable',
		value: function _isWritable(level) {
			return !this.options.silent && this.writer[level] && this.writer[level].apply && supportedLevels[level] <= supportedLevels[this.options.level];
		}

		/**
   * Helper method to format and valid logs
   * @param {string} level
   * @param {array} args
   * @returns {object} - Valid log
   */

	}, {
		key: '_validateLog',
		value: function _validateLog(level, args) {
			var log = {
				timestamp: new Date().toISOString(),
				package: {
					name: this.options.packageName,
					version: this.options.packageVersion
				},
				browser: this._browserInfo,
				source: 'client',
				level: level
			};

			// Format Meta
			var lastArg = args[args.length - 1];
			var lastArgMeta = Object.prototype.toString.call(lastArg);

			switch (lastArgMeta) {
				case '[object Object]':
					log = _extends({}, log, args.pop());
					break;
				case '[object Error]':
					log.error = (0, _serializeError2.default)(args.pop());
					break;
				case '[object Array]':
					log.array = args.pop();
					break;
				default:
					break;
			}

			// Log Message
			log.message = args.join(' ');

			try {
				JSON.stringify(log);
			} catch (err) {
				this.error('Dropped log due to invalid data structure', err);
				return null;
			}

			return log;
		}
	}]);

	return LoggerCore;
}();

exports.default = LoggerCore;
module.exports = exports['default'];
},{"./instance":4,"browser-info":21,"serialize-error":28}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Legacy IE


require('es6-promise/auto');

require('whatwg-fetch');

var _serializeError = require('serialize-error');

var _serializeError2 = _interopRequireDefault(_serializeError);

var _packageInfo = require('./package-info');

var _packageInfo2 = _interopRequireDefault(_packageInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
	host: null,
	interval: 30000,
	limit: 500,
	maxRequestSize: 1024 * 1024
};

var instance = null;

/**
 * @class Instance
 */

var Instance = function () {
	/**
  * @constructs Logger
  * @returns {object} Instance class
  */
	function Instance() {
		_classCallCheck(this, Instance);

		if (instance) {
			return instance;
		}

		instance = this;

		this.options = defaultOptions;
		this.storage = [];

		return instance;
	}

	/**
  * Set global instance options
  * @param {object} options
  * @param {string} [options.host] - Scope of the authorization
  * @param {number} [options.interval=30000] - Interval at which logger sends batches.
  * @param {number} [options.limit=100] - Limit at which the logger will send stored logs regardless of interval.
  * @param {number} [options.maxRequestSize=1048576] - Max byte size of batched log request.
  */


	_createClass(Instance, [{
		key: 'setOptions',
		value: function setOptions(options) {
			this.options = _extends({}, defaultOptions, options);

			if (this.options.host && this._uri) {
				return;
			}

			this._uri = 'https://' + this.options.host + '/client-logs';

			this.enable();
		}

		/**
   * Adds a log to storage
   */

	}, {
		key: 'add',
		value: function add(log) {
			this.storage.push(log);
			this.checkStorageLimit();
		}

		/**
   * Send and reset current batch of logs
   * DTO:
   *
   * 	{
   * 		messages: [
   * 			{ level: "info", message: "", timestamp: "ISOstring", packages: [{version: '', name: ''}], browser: { name: '', version: '' } },
   * 			{ level: "info", message: "", timestamp: "ISOstring", packages: [{version: '', name: ''}], browser: { name: '', version: '' } },
   * 			{ level: "info", message: "", timestamp: "ISOstring", packages: [{version: '', name: ''}], browser: { name: '', version: '' } },
   * 			{ level: "info", message: "", timestamp: "ISOstring", packages: [{version: '', name: ''}], browser: { name: '', version: '' } },
   * 		]
   * 	}
   */

	}, {
		key: 'send',
		value: function send() {
			var _this = this;

			if (!this.storage.length || !this._uri) {
				return;
			}

			var messages = this.storage;
			this.storage = [];

			var data = {
				messages: messages
			};

			var body = void 0;
			try {
				body = JSON.stringify(data);
			} catch (err) {
				this.storage.push({
					level: 'error',
					package: {
						name: _packageInfo2.default.name,
						version: _packageInfo2.default.name
					},
					source: 'client',
					message: 'Error stringifying batch. Dropped ' + messages.length + ' logs.',
					error: (0, _serializeError2.default)(err)
				});
				return;
			}

			if (this._byteLength(body) > this.options.maxRequestSize) {
				this.storage.push({
					level: 'error',
					package: {
						name: _packageInfo2.default.name,
						version: _packageInfo2.default.name
					},
					source: 'client',
					message: 'Body exceeds maxRequestSize. Dropped ' + messages.length + ' logs.'
				});
				return;
			}

			fetch(this._uri, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			}).then(this._handleFetchError).catch(function (error) {
				_this.storage.push({
					level: 'network',
					package: {
						name: _packageInfo2.default.name,
						version: _packageInfo2.default.name
					},
					source: 'client',
					message: 'Network failure. Dropped ' + messages.length + ' logs.',
					error: (0, _serializeError2.default)(error)
				});
			});
		}

		/**
   * Enable requests
   */

	}, {
		key: 'enable',
		value: function enable() {
			var _this2 = this;

			if (!this._uri) {
				return;
			}

			this._watchInterval = setInterval(function () {
				return _this2.send();
			}, this.options.interval);
			if (window) {
				this._watchUnload = this._eventHelper(window, 'unload', function () {
					return _this2.send();
				});
			}
		}

		/**
   * Disable requests
   */

	}, {
		key: 'disable',
		value: function disable() {
			if (this._watchInterval) {
				this._watchInterval();
			}

			if (this._watchUnload) {
				this._watchUnload();
			}
		}

		/**
   * Send logs if length is over limit
   */

	}, {
		key: 'checkStorageLimit',
		value: function checkStorageLimit() {
			if (this.options.limit && this.storage.length > this.options.limit) {
				this.send();
			}
		}

		/**
   * Helper method for handling fetch errors.
   */

	}, {
		key: '_handleFetchError',
		value: function _handleFetchError(response) {
			if (!response.ok) {
				throw new TypeError(response.status, response.statusText);
			}

			return response;
		}

		/**
   * Helper method for converting byte length.
   * @returns {string} - Byte length of an utf8 string
   */

	}, {
		key: '_byteLength',
		value: function _byteLength(str) {
			var s = str.length;
			for (var i = str.length - 1; i >= 0; i--) {
				var code = str.charCodeAt(i);
				if (code > 0x7f && code <= 0x7ff) s++;else if (code > 0x7ff && code <= 0xffff) s += 2;
				if (code >= 0xDC00 && code <= 0xDFFF) i--;
			}
			return s;
		}

		/**
   * Helper method for removing event listeners
   * @return {function} - Function to remove event listener
   */

	}, {
		key: '_eventHelper',
		value: function _eventHelper(target, evt, cb) {
			target.addEventListener(evt, cb);
			var removeEvent = function removeEvent() {
				target.removeEventListener(evt, cb);
			};
			return removeEvent;
		}
	}]);

	return Instance;
}();

exports.default = Instance;
module.exports = exports['default'];
},{"./package-info":5,"es6-promise/auto":25,"serialize-error":28,"whatwg-fetch":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = { version: '1.0.9', name: '@livelyvideo/logger-core' };
module.exports = exports['default'];
},{}],6:[function(require,module,exports){
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
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
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
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
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

    if (input instanceof Request) {
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
    } else {
      this.url = String(input)
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
    rawHeaders.split(/\r?\n/).forEach(function(line) {
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

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var EVENTS = {
	/**
  * The start event is emitted on the start of an upload
  *
  * @event UploadCore#start
  * @param {object} file - File API object
  */
	UPLOAD_START: 'start',
	/**
  * The success event is emitted on the completion of an upload
  *
  * @event UploadCore#success
  * @param {object} file - File API object
  */
	UPLOAD_SUCCESS: 'success',
	/**
  * The failure event is emitted on failure of an upload
  *
  * @event UploadCore#failure
  * @param {object} file - File API object
  * @param {object} reason - Reason object for failure
  * @param {string} reason.message - Message key describing failure
  */
	UPLOAD_FAILURE: 'failure',
	/**
  * The addedfile event is emitted on failure of an upload
  *
  * @event UploadCore#addedfile
  * @param {object} file - File API object
  */
	UPLOAD_ADDEDFILE: 'addedfile',
	/**
  * The removedfile event is emitted on when a file has been removed from queue
  *
  * @event UploadCore#removedfile
  * @param {object} file - File API object
  */
	UPLOAD_REMOVEDFILE: 'removedfile',
	/**
  * The progress event is emitted on each successful uploaded chunk
  *
  * @event UploadCore#progress
  * @param {object} file - File API object
  * @param {number} currentBytes - Current bytes uploaded
  * @param {number} totalBytes - Total bytes to upload
  * @param {number} percent - Percentage of upload completed 0-100
  */
	UPLOAD_PROGRESS: 'progress',
	/**
  * The thumbnail event is emitted when File API has retrieved a dataUrl from file (Not supported in legacy)
  *
  * @event UploadCore#config
  * @param {object} file - File API object
  * @param {string} dataUrl - Url of image retrieved by File API
  */
	UPLOAD_THUMBNAIL: 'thumbnail',
	/**
  * The reconnecting event is emitted when chunk has failed due to network issues and is attempting to retry
  *
  * @event UploadCore#reconnecting
  * @param {object} file - File API object
  * @param {number} attempts - Number of attempts made
  */
	UPLOAD_RECONNECTING: 'reconnecting',
	/**
  * The connected event is emitted when a request has been successfully made after a reconnecting event
  *
  * @event UploadCore#connected
  * @param {object} file - File API object
  */
	UPLOAD_CONNECTED: 'connected',
	/**
  * The drop event is emitted when a dragged file has been dropped into the upload form
  *
  * @event UploadClient#drop
  * @param {object} event
  */
	FORM_DROP: 'drop',
	/**
  * The drag event is emitted when a file is dragged across the upload form
  *
  * @event UploadClient#drag
  * @param {object} event
  */
	FORM_DRAG: 'drag',
	/**
  * The dragstart event is emitted when a file starts a drag across the upload form
  *
  * @event UploadClient#dragstart
  * @param {object} event
  */
	FORM_DRAGSTART: 'dragstart',
	/**
  * The dragend event is emitted when a file ends a drag across the upload form
  *
  * @event UploadClient#dragend
  * @param {object} event
  */
	FORM_DRAGEND: 'dragend',
	/**
  * The dragenter event is emitted when a dragged file enters the upload form
  *
  * @event UploadClient#dragenter
  * @param {object} event
  */
	FORM_DRAGENTER: 'dragenter',
	/**
  * The dragover event is emitted when a file is dragged over the upload form
  *
  * @event UploadClient#dragover
  * @param {object} event
  */
	FORM_DRAGOVER: 'dragover',
	/**
  * The dragleave event is emitted when a dragged file leaves the upload form
  *
  * @event UploadClient#dragleave
  * @param {object} event
  */
	FORM_DRAGLEAVE: 'dragleave'
};

exports.default = EVENTS;
module.exports = exports['default'];
},{}],8:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('classlist-polyfill');

var _lib = require('@livelyvideo/upload-core/lib');

var _lib2 = _interopRequireDefault(_lib);

var _localization = require('@livelyvideo/localization');

var _localization2 = _interopRequireDefault(_localization);

var _lib3 = require('@livelyvideo/logger-core/lib');

var _lib4 = _interopRequireDefault(_lib3);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _createElement = require('./utils/createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var _formatBytes = require('./utils/formatBytes');

var _formatBytes2 = _interopRequireDefault(_formatBytes);

var _forwardEvents = require('./utils/forwardEvents');

var _forwardEvents2 = _interopRequireDefault(_forwardEvents);

var _events3 = require('./events');

var _events4 = _interopRequireDefault(_events3);

var _packageInfo = require('./package-info');

var _packageInfo2 = _interopRequireDefault(_packageInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Legacy IE

// Imports


var logger = new _lib4.default({
	packageName: _packageInfo2.default.name,
	packageVersion: _packageInfo2.default.version
});

var defaultOptions = {
	host: null,
	authUrl: null,
	token: null,
	accept: null,
	bemPrefix: 'upload',
	autoSubmit: true,
	messages: null,
	chunkSize: 102400,
	chunkConnections: 3,
	version: 'v2',
	multiple: true,
	selectTarget: null,
	previewsTarget: null,
	loggerOptions: {}
};

/**
 * Class representing UploadClient
 */

var UploadClient = function (_EventEmitter) {
	_inherits(UploadClient, _EventEmitter);

	/**
  * Constructs an instance of UploadClient
  *
  * @param {object} el - The DOM element for UploadClient to be constructed on
  * @param {Config} [options] - Configurable options for the UploadClient class
  * @param {string} options.host - Destination host of your uploads
  * @param {string} options.authUrl - Route to retreive access tokens that authorize you to use host
  * @param {string} [options.token] - Manual token for authorization
  * @param {string} [options.accept] - Accept field for upload accept attribute
  * @param {string} [options.bemPrefix=upload] - Prefix for DOM classes
  * @param {string} [options.version=v2] - Api version
  * @param {bool} [options.autoSubmit=true] - Auto submit upload on select. If false you must call
  * @param {bool} [options.multiple=true] - Allow multiple files for upload
  * @param {number} [options.chunkSize=102400] - Size of chunks to be uploaded
  * @param {number} [options.chunkConnections=3] - Number of concurrent chunk connections
  * @param {object} [options.messages] - Hard code message strings
  * @param {object} [options.selectTarget] - Select a custom DOM element to open file select on click, disables drag and drop
  * @param {object} [options.previewsTarget] - Select a custom DOM element for previews to be appended to
  * @constructs UploadClient
  */
	function UploadClient(el, options) {
		_classCallCheck(this, UploadClient);

		var _this = _possibleConstructorReturn(this, (UploadClient.__proto__ || Object.getPrototypeOf(UploadClient)).call(this));

		if (!_this.validOptions(options)) {
			return _possibleConstructorReturn(_this);
		}

		// Options
		_this.options = (0, _deepmerge2.default)(defaultOptions, options);

		_this.mount(el);

		logger.setOptions(_this.options.loggerOptions);
		logger.setInstanceOptions({
			host: _this.options.host
		});

		// Support old MESSAGES key (Seattle)
		if (_this.options.MESSAGES) {
			_this.options.messages = _this.options.MESSAGES;
		}

		// Localization
		var localization = new _localization2.default(_this.options.locale, _this.options.messages);
		_this.localize = localization.localize.bind(localization);

		// State
		_this._eventListeners = [];

		// Upload
		_this.upload = new _lib2.default(_this.el, _this.options);
		(0, _forwardEvents2.default)(_this.upload, _this);

		// Unsupported
		if (!_this.upload.browserSupported) {
			_this.renderUnsupported();
			return _possibleConstructorReturn(_this);
		}

		// Events
		_this.startHandler = _this.startHandler.bind(_this);
		_this.successHandler = _this.successHandler.bind(_this);
		_this.failureHandler = _this.failureHandler.bind(_this);
		_this.addedfileHandler = _this.addedfileHandler.bind(_this);
		_this.removedfileHandler = _this.removedfileHandler.bind(_this);
		_this.progressHandler = _this.progressHandler.bind(_this);
		_this.thumbnailHandler = _this.thumbnailHandler.bind(_this);
		_this.reconnectingHandler = _this.reconnectingHandler.bind(_this);
		_this.connectedHandler = _this.connectedHandler.bind(_this);

		_this.upload.on(_events4.default.UPLOAD_START, _this.startHandler);
		_this.upload.on(_events4.default.UPLOAD_SUCCESS, _this.successHandler);
		_this.upload.on(_events4.default.UPLOAD_FAILURE, _this.failureHandler);
		_this.upload.on(_events4.default.UPLOAD_ADDEDFILE, _this.addedfileHandler);
		_this.upload.on(_events4.default.UPLOAD_REMOVEDFILE, _this.removedfileHandler);
		_this.upload.on(_events4.default.UPLOAD_PROGRESS, _this.progressHandler);
		_this.upload.on(_events4.default.UPLOAD_THUMBNAIL, _this.thumbnailHandler);
		_this.upload.on(_events4.default.UPLOAD_RECONNECTING, _this.reconnectingHandler);
		_this.upload.on(_events4.default.UPLOAD_CONNECTED, _this.connectedHandler);

		_this.render();
		return _this;
	}

	/**
  * Validate options
  * @param {object} options
  */


	_createClass(UploadClient, [{
		key: 'validOptions',
		value: function validOptions(options) {
			var valid = true;

			if (!options) {
				logger.error('No options provided to constructor, "host" and "authUrl" required.');
				valid = false;
			}

			if (options.url) {
				logger.deprecated('Option "url" has been deprecated.');
				valid = false;
			}

			if (!options.host) {
				logger.error('No "host" option provided.');
				valid = false;
			}

			if (!options.authUrl) {
				logger.error('No "authUrl" option provided.');
				valid = false;
			}

			return valid;
		}

		/**
   * Mounts element
   * @param {object} el - The DOM element for Chat to be constructed on
   */

	}, {
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
					logger.error('The constructor has not been given a valid element or selector.');
					return;
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
		value: function render() {
			this.uploadTitle = (0, _createElement2.default)({
				tagName: 'div',
				className: this.options.bemPrefix + '__title',
				text: this.localize('Drop files here or click to upload.')
			});
			this.uploadInfo = (0, _createElement2.default)({
				tagName: 'div',
				className: this.options.bemPrefix + '__info',
				childs: [this.uploadTitle]
			});

			this.el.appendChild(this.uploadInfo);

			// Previews Container
			if (this.options.previewsTarget) {
				this.uploadPreviews = this.options.previewsTarget;
			} else {
				this.uploadPreviews = (0, _createElement2.default)({
					tagName: 'div',
					className: this.options.bemPrefix + '__previews'
				});
				this.el.appendChild(this.uploadPreviews);
			}

			this.initFormListeners();
		}

		/*
   * Initialize upload
   */

	}, {
		key: 'initFormListeners',
		value: function initFormListeners() {
			var _this2 = this;

			if (this.options.selectTarget) {
				this.eventHelper(this.options.selectTarget, 'click', function () {
					_this2.upload.selectFile();
				});
				return;
			}

			this.eventHelper(this.el, 'click', function () {
				_this2.upload.selectFile();
			});

			// FORM LISTENERS
			this.eventHelper(this.el, _events4.default.FORM_DROP, function (e) {
				e.preventDefault();
				e.stopPropagation();
				_this2.emit(_events4.default.FORM_DROP, e);
				_this2.el.classList.remove(_this2.options.bemPrefix + '--is-dragover');
				_this2.upload.addFile(e.dataTransfer.files[0]);
			});
			this.eventHelper(this.el, _events4.default.FORM_DRAG, function (e) {
				e.preventDefault();
				e.stopPropagation();
				_this2.emit(_events4.default.FORM_DRAG, e);
			});
			this.eventHelper(this.el, _events4.default.FORM_DRAGSTART, function (e) {
				e.preventDefault();
				e.stopPropagation();
				_this2.emit(_events4.default.FORM_DRAGSTART, e);
			});
			this.eventHelper(this.el, _events4.default.FORM_DRAGEND, function (e) {
				e.preventDefault();
				e.stopPropagation();
				_this2.emit(_events4.default.FORM_DRAGEND, e);
				_this2.el.classList.remove(_this2.options.bemPrefix + '--is-dragover');
			});
			this.eventHelper(this.el, _events4.default.FORM_DRAGENTER, function (e) {
				e.preventDefault();
				e.stopPropagation();
				_this2.emit(_events4.default.FORM_DRAGENTER, e);
				_this2.el.classList.add(_this2.options.bemPrefix + '--is-dragover');
			});
			this.eventHelper(this.el, _events4.default.FORM_DRAGOVER, function (e) {
				e.preventDefault();
				e.stopPropagation();
				_this2.emit(_events4.default.FORM_DRAGOVER, e);
				_this2.el.classList.add(_this2.options.bemPrefix + '--is-dragover');
			});
			this.eventHelper(this.el, _events4.default.FORM_DRAGLEAVE, function (e) {
				e.preventDefault();
				e.stopPropagation();
				_this2.emit(_events4.default.FORM_DRAGLEAVE, e);
				_this2.el.classList.remove(_this2.options.bemPrefix + '--is-dragover');
			});
		}

		/*
   * Construct preview and add file information
   */

	}, {
		key: 'constructUploadPreview',
		value: function constructUploadPreview(file) {
			var preview = this.constructPreviewDOM();
			var previewInfoName = preview.querySelector('.' + this.options.bemPrefix + '__preview-info-name');
			var previewInfoSize = preview.querySelector('.' + this.options.bemPrefix + '__preview-info-size');

			preview.id = 'id-' + file.fileIdentifier;
			previewInfoName.textContent = file.name;
			previewInfoSize.textContent = (0, _formatBytes2.default)(file.size);

			return preview;
		}

		/*
   * Construct nodes for a preview, return clone if created
   */

	}, {
		key: 'constructPreviewDOM',
		value: function constructPreviewDOM() {
			if (this._previewClone) {
				return this._previewClone.cloneNode(true);
			}

			var thumbnail = (0, _createElement2.default)({
				tagName: 'div',
				className: this.options.bemPrefix + '__preview-thumbnail ' + this.options.bemPrefix + '__preview-thumbnail--loading'
			});

			var previewInfoName = (0, _createElement2.default)({
				tagName: 'div',
				className: this.options.bemPrefix + '__preview-info-name'
			});

			var previewInfoSize = (0, _createElement2.default)({
				tagName: 'div',
				className: this.options.bemPrefix + '__preview-info-size'
			});

			var previewInfo = (0, _createElement2.default)({
				tagName: 'div',
				className: this.options.bemPrefix + '__preview-info',
				childs: [previewInfoName, previewInfoSize]
			});

			var previewStatus = (0, _createElement2.default)({
				tagName: 'div',
				className: this.options.bemPrefix + '__preview-status',
				text: this.localize('Initializing')
			});

			var progressFill = (0, _createElement2.default)({
				tagName: 'div',
				className: this.options.bemPrefix + '__preview-progress-fill'
			});

			var progress = (0, _createElement2.default)({
				tagName: 'div',
				className: this.options.bemPrefix + '__preview-progress',
				childs: [progressFill]
			});

			var preview = (0, _createElement2.default)({
				tagName: 'div',
				className: this.options.bemPrefix + '__preview',
				childs: [thumbnail, previewInfo, progress, previewStatus]
			});

			this._previewClone = preview;

			return this._previewClone.cloneNode(true);
		}

		/*
   * 'addedfile' event handler
   */

	}, {
		key: 'addedfileHandler',
		value: function addedfileHandler(file) {
			var preview = this.constructUploadPreview(file);
			this.uploadPreviews.appendChild(preview);

			this.checkCurrentFiles();
		}

		/*
   * 'removedfile' event handler
   */

	}, {
		key: 'removedfileHandler',
		value: function removedfileHandler(file) {
			var preview = this.uploadPreviews.querySelector('#id-' + file.fileIdentifier);
			preview.parentElement.removeChild(preview);
		}

		/*
   * Check if currently added files
   */

	}, {
		key: 'checkCurrentFiles',
		value: function checkCurrentFiles() {
			var previews = this.uploadPreviews.children.length;

			if (previews) {
				this.el.classList.add(this.options.bemPrefix + '--added-files');
				return;
			}

			this.el.classList.remove(this.options.bemPrefix + '--added-files');
		}

		/*
   * 'start' event handler
   */

	}, {
		key: 'startHandler',
		value: function startHandler(file) {
			var preview = this.uploadPreviews.querySelector('#id-' + file.fileIdentifier);
			var status = preview.querySelector('.' + this.options.bemPrefix + '__preview-status');

			preview.className = this.options.bemPrefix + '__preview  ' + this.options.bemPrefix + '__preview--uploading';
			status.textContent = this.localize('Uploading');
		}

		/*
   * 'progress' event handler
   */

	}, {
		key: 'progressHandler',
		value: function progressHandler(file, currentBytes, totalBytes, progress) {
			var preview = this.uploadPreviews.querySelector('#id-' + file.fileIdentifier);
			var progressFill = preview.querySelector('.' + this.options.bemPrefix + '__preview-progress-fill');
			var status = preview.querySelector('.' + this.options.bemPrefix + '__preview-status');

			progressFill.style.width = progress + '%';
			status.textContent = this.localize('Uploading');
		}

		/*
   * 'success' event handler
   */

	}, {
		key: 'successHandler',
		value: function successHandler(file) {
			var preview = this.uploadPreviews.querySelector('#id-' + file.fileIdentifier);
			var status = preview.querySelector('.' + this.options.bemPrefix + '__preview-status');

			preview.className = this.options.bemPrefix + '__preview  ' + this.options.bemPrefix + '__preview--success';
			status.textContent = this.localize('Completed');
		}

		/*
   * 'failure' event handler
   */

	}, {
		key: 'failureHandler',
		value: function failureHandler(file, error) {
			var preview = this.uploadPreviews.querySelector('#id-' + file.fileIdentifier);
			var status = preview.querySelector('.' + this.options.bemPrefix + '__preview-status');

			preview.className = this.options.bemPrefix + '__preview  ' + this.options.bemPrefix + '__preview--failure';
			status.textContent = error.message;
		}

		/*
   * 'thumbnail' event handler
   */

	}, {
		key: 'thumbnailHandler',
		value: function thumbnailHandler(file, dataUrl) {
			var preview = this.uploadPreviews.querySelector('#id-' + file.fileIdentifier);
			var thumbnail = preview.querySelector('.' + this.options.bemPrefix + '__preview-thumbnail');

			if (!dataUrl) {
				thumbnail.className = this.options.bemPrefix + '__preview-thumbnail';
				return;
			}

			thumbnail.className = this.options.bemPrefix + '__preview-thumbnail';
			thumbnail.style.backgroundImage = 'url(' + dataUrl + ')';
		}

		/*
   * 'reconnecting' event handler
   */

	}, {
		key: 'reconnectingHandler',
		value: function reconnectingHandler(file) {
			var preview = this.uploadPreviews.querySelector('#id-' + file.fileIdentifier);
			var status = preview.querySelector('.' + this.options.bemPrefix + '__preview-status');

			status.textContent = this.localize('Reconnecting');
			preview.className = this.options.bemPrefix + '__preview  ' + this.options.bemPrefix + '__preview--reconnecting';
		}

		/*
   * 'connected' event handler
   */

	}, {
		key: 'connectedHandler',
		value: function connectedHandler(file) {
			var preview = this.uploadPreviews.querySelector('#id-' + file.fileIdentifier);
			var status = preview.querySelector('.' + this.options.bemPrefix + '__preview-status');

			preview.className = this.options.bemPrefix + '__preview  ' + this.options.bemPrefix + '__preview--uploading';
			status.textContent = this.localize('Uploading');
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
			this._eventListeners.push(removeEvent);
		}

		/*
   * Destroy UploadClient
   */

	}, {
		key: 'destroy',
		value: function destroy() {
			for (var i = 0; i < this._eventListeners.length; i++) {
				this._eventListeners.splice(i, 1)[0]();
			}
			this.el.parentNode.removeChild(this.el);
		}

		/*
   * Helper
   */

	}, {
		key: 'startUploadConnections',
		value: function startUploadConnections() {
			this.upload.startUploadConnections();
		}
	}]);

	return UploadClient;
}(_events2.default);

module.exports = UploadClient;
},{"./events":7,"./package-info":9,"./utils/createElement":10,"./utils/formatBytes":11,"./utils/forwardEvents":12,"@livelyvideo/localization":2,"@livelyvideo/logger-core/lib":3,"@livelyvideo/upload-core/lib":15,"classlist-polyfill":23,"deepmerge":24,"events":27}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = { version: '3.0.0-multiple.10', name: '@livelyvideo/upload' };
module.exports = exports['default'];
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
module.exports = exports['default'];
},{}],12:[function(require,module,exports){
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
module.exports = exports['default'];
},{"events":27}],13:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.LivelyAuthCore=e()}}(function(){return function e(t,r,n){function o(s,a){if(!r[s]){if(!t[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);var h=new Error("Cannot find module '"+s+"'");throw h.code="MODULE_NOT_FOUND",h}var f=r[s]={exports:{}};t[s][0].call(f.exports,function(e){var r=t[s][1][e];return o(r?r:e)},f,f.exports,e,t,r,n)}return r[s].exports}for(var i="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(e,t){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function n(e){return"function"==typeof e}function o(e){return"number"==typeof e}function i(e){return"object"==typeof e&&null!==e}function s(e){return void 0===e}t.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(e){if(!o(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},r.prototype.emit=function(e){var t,r,o,a,u,h;if(this._events||(this._events={}),"error"===e&&(!this._events.error||i(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;var f=new Error('Uncaught, unspecified "error" event. ('+t+")");throw f.context=t,f}if(r=this._events[e],s(r))return!1;if(n(r))switch(arguments.length){case 1:r.call(this);break;case 2:r.call(this,arguments[1]);break;case 3:r.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),r.apply(this,a)}else if(i(r))for(a=Array.prototype.slice.call(arguments,1),h=r.slice(),o=h.length,u=0;o>u;u++)h[u].apply(this,a);return!0},r.prototype.addListener=function(e,t){var o;if(!n(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,n(t.listener)?t.listener:t),this._events[e]?i(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,i(this._events[e])&&!this._events[e].warned&&(o=s(this._maxListeners)?r.defaultMaxListeners:this._maxListeners,o&&o>0&&this._events[e].length>o&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())),this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(e,t){function r(){this.removeListener(e,r),o||(o=!0,t.apply(this,arguments))}if(!n(t))throw TypeError("listener must be a function");var o=!1;return r.listener=t,this.on(e,r),this},r.prototype.removeListener=function(e,t){var r,o,s,a;if(!n(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(r=this._events[e],s=r.length,o=-1,r===t||n(r.listener)&&r.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(i(r)){for(a=s;a-->0;)if(r[a]===t||r[a].listener&&r[a].listener===t){o=a;break}if(0>o)return this;1===r.length?(r.length=0,delete this._events[e]):r.splice(o,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},r.prototype.removeAllListeners=function(e){var t,r;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(r=this._events[e],n(r))this.removeListener(e,r);else if(r)for(;r.length;)this.removeListener(e,r[r.length-1]);return delete this._events[e],this},r.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?n(this._events[e])?[this._events[e]]:this._events[e].slice():[]},r.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(n(t))return 1;if(t)return t.length}return 0},r.listenerCount=function(e,t){return e.listenerCount(t)}},{}],2:[function(){!function(e){"use strict";function t(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function r(e){return"string"!=typeof e&&(e=String(e)),e}function n(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return _.iterable&&(t[Symbol.iterator]=function(){return t}),t}function o(e){this.map={},e instanceof o?e.forEach(function(e,t){this.append(t,e)},this):Array.isArray(e)?e.forEach(function(e){this.append(e[0],e[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function i(e){return e.bodyUsed?Promise.reject(new TypeError("Already read")):void(e.bodyUsed=!0)}function s(e){return new Promise(function(t,r){e.onload=function(){t(e.result)},e.onerror=function(){r(e.error)}})}function a(e){var t=new FileReader,r=s(t);return t.readAsArrayBuffer(e),r}function u(e){var t=new FileReader,r=s(t);return t.readAsText(e),r}function h(e){for(var t=new Uint8Array(e),r=new Array(t.length),n=0;n<t.length;n++)r[n]=String.fromCharCode(t[n]);return r.join("")}function f(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function l(){return this.bodyUsed=!1,this._initBody=function(e){if(this._bodyInit=e,e)if("string"==typeof e)this._bodyText=e;else if(_.blob&&Blob.prototype.isPrototypeOf(e))this._bodyBlob=e;else if(_.formData&&FormData.prototype.isPrototypeOf(e))this._bodyFormData=e;else if(_.searchParams&&URLSearchParams.prototype.isPrototypeOf(e))this._bodyText=e.toString();else if(_.arrayBuffer&&_.blob&&b(e))this._bodyArrayBuffer=f(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!_.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(e)&&!w(e))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=f(e)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):_.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},_.blob&&(this.blob=function(){var e=i(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?i(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(a)}),this.text=function(){var e=i(this);if(e)return e;if(this._bodyBlob)return u(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(h(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},_.formData&&(this.formData=function(){return this.text().then(d)}),this.json=function(){return this.text().then(JSON.parse)},this}function c(e){var t=e.toUpperCase();return g.indexOf(t)>-1?t:e}function p(e,t){t=t||{};var r=t.body;if(e instanceof p){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new o(e.headers)),this.method=e.method,this.mode=e.mode,r||null==e._bodyInit||(r=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"omit",(t.headers||!this.headers)&&(this.headers=new o(t.headers)),this.method=c(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function d(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var r=e.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(n),decodeURIComponent(o))}}),t}function y(e){var t=new o;return e.split(/\r?\n/).forEach(function(e){var r=e.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();t.append(n,o)}}),t}function v(e,t){t||(t={}),this.type="default",this.status="status"in t?t.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new o(t.headers),this.url=t.url||"",this._initBody(e)}if(!e.fetch){var _={searchParams:"URLSearchParams"in e,iterable:"Symbol"in e&&"iterator"in Symbol,blob:"FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in e,arrayBuffer:"ArrayBuffer"in e};if(_.arrayBuffer)var m=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],b=function(e){return e&&DataView.prototype.isPrototypeOf(e)},w=ArrayBuffer.isView||function(e){return e&&m.indexOf(Object.prototype.toString.call(e))>-1};o.prototype.append=function(e,n){e=t(e),n=r(n);var o=this.map[e];this.map[e]=o?o+","+n:n},o.prototype["delete"]=function(e){delete this.map[t(e)]},o.prototype.get=function(e){return e=t(e),this.has(e)?this.map[e]:null},o.prototype.has=function(e){return this.map.hasOwnProperty(t(e))},o.prototype.set=function(e,n){this.map[t(e)]=r(n)},o.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this)},o.prototype.keys=function(){var e=[];return this.forEach(function(t,r){e.push(r)}),n(e)},o.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),n(e)},o.prototype.entries=function(){var e=[];return this.forEach(function(t,r){e.push([r,t])}),n(e)},_.iterable&&(o.prototype[Symbol.iterator]=o.prototype.entries);var g=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];p.prototype.clone=function(){return new p(this,{body:this._bodyInit})},l.call(p.prototype),l.call(v.prototype),v.prototype.clone=function(){return new v(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new o(this.headers),url:this.url})},v.error=function(){var e=new v(null,{status:0,statusText:""});return e.type="error",e};var E=[301,302,303,307,308];v.redirect=function(e,t){if(-1===E.indexOf(t))throw new RangeError("Invalid status code");return new v(null,{status:t,headers:{location:e}})},e.Headers=o,e.Request=p,e.Response=v,e.fetch=function(e,t){return new Promise(function(r,n){var o=new p(e,t),i=new XMLHttpRequest;i.onload=function(){var e={status:i.status,statusText:i.statusText,headers:y(i.getAllResponseHeaders()||"")};e.url="responseURL"in i?i.responseURL:e.headers.get("X-Request-URL");var t="response"in i?i.response:i.responseText;r(new v(t,e))},i.onerror=function(){n(new TypeError("Network request failed"))},i.ontimeout=function(){n(new TypeError("Network request failed"))},i.open(o.method,o.url,!0),"include"===o.credentials&&(i.withCredentials=!0),"responseType"in i&&_.blob&&(i.responseType="blob"),o.headers.forEach(function(e,t){i.setRequestHeader(t,e)}),i.send("undefined"==typeof o._bodyInit?null:o._bodyInit)})},e.fetch.polyfill=!0}}("undefined"!=typeof self?self:this)},{}],3:[function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(r,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),u=e("events");e("whatwg-fetch");var h={timeout:5e3,headers:{},bootstrap:{}},f={Accept:"application/json"},l=function(e){function t(e,r){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};n(this,t);var a=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));if(!e)throw new Error("scope is required");if(!r)throw new Error("authorization server url is required");if(a._options=s({},h,i),a._url=-1===r.indexOf("?")?r+"?scope="+e:r+"&scope="+e,a._stopped=!1,a._fatalError=null,a._token=a._options.bootstrap.token||null,a._retries=[0,200,1e3,3e3],a._retry=0,a._autorefresh=null,a._headers=Object.assign({},f,i.headers),null===a._token)a._retryRequest();else if(a._options.bootstrap&&a._options.bootstrap.expire){var u=a._options.bootstrap.expire-Date.now()-6e4;a._autorefresh=setTimeout(function(){a._autorefresh=null,a._stopped||a._retryRequest()},u)}return a}return i(t,e),a(t,[{key:"destroy",value:function(){this._stopped=!0}},{key:"request",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};if(this._fatalError)return void t(this._fatalError);if(null!==this._token)return void t(null,this._token);var r=!1,n=function(){r||(r=!0,t(null,e._token))},o=function(){r||(r=!0,t(new Error("authorization: timeout")))},i=setTimeout(function(){e.removeListener("ready",n),o()},this._options.timeout);this.once("ready",function(){clearTimeout(i),n()})}},{key:"refreshToken",value:function(){var e=this;null!==this._token&&(null!==this._autorefresh&&(clearTimeout(this._autorefresh),this._autorefresh=null),this._token=null,function(){e._retryRequest()}())}},{key:"_retryRequest",value:function(){var e=this,t=this._retries[this._retry];return t?void setTimeout(function(){e._makeRequest()},t):void this._makeRequest()}},{key:"_makeRequest",value:function(){var e=this;fetch(this._url,{credentials:"same-origin",headers:this._headers}).then(function(e){if(e.status>=200&&e.status<300)return e.json();if(401===e.status){var t=new Error("authorization: unauthorized");throw t.fatal=!0,t}if(403===e.status){var r=new Error("authorization: forbidden");throw r.fatal=!0,r}throw new Error("authorization: non-200 response code from auth server")}).then(function(t){e._token=t.token,e._retry=0,e.emit("ready",{token:t.token});var r=new Date(t.expire).getTime()-Date.now()-6e4;e._autorefresh=setTimeout(function(){e._autorefresh=null,e._stopped||e._retryRequest()},r)})["catch"](function(t){return console.warn("authentication request error: "+t),e._token=null,t.fatal?void(e._fatalError=t):(e._retryRequest(),void(e._retry<e._retries.length-1&&e._retry++))})}}]),t}(u.EventEmitter);r["default"]=l},{events:1,"whatwg-fetch":2}]},{},[3])(3)});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var EVENTS = {
	/**
  * The start event is emitted on the start of an upload
  *
  * @event UploadCore#start
  * @param {object} file - File API object
  */
	UPLOAD_START: 'start',
	/**
  * The success event is emitted on the completion of an upload
  *
  * @event UploadCore#success
  * @param {object} file - File API object
  */
	UPLOAD_SUCCESS: 'success',
	/**
  * The failure event is emitted on failure of an upload
  *
  * @event UploadCore#failure
  * @param {object} file - File API object
  * @param {object} reason - Reason object for failure
  * @param {string} reason.message - Message key describing failure
  */
	UPLOAD_FAILURE: 'failure',
	/**
  * The addedfile event is emitted on failure of an upload
  *
  * @event UploadCore#addedfile
  * @param {object} file - File API object
  */
	UPLOAD_ADDEDFILE: 'addedfile',
	/**
  * The removedfile event is emitted on when a file has been removed from queue
  *
  * @event UploadCore#removedfile
  * @param {object} file - File API object
  */
	UPLOAD_REMOVEDFILE: 'removedfile',
	/**
  * The progress event is emitted on each successful uploaded chunk
  *
  * @event UploadCore#progress
  * @param {object} file - File API object
  * @param {number} currentBytes - Current bytes uploaded
  * @param {number} totalBytes - Total bytes to upload
  * @param {number} percent - Percentage of upload completed 0-100
  */
	UPLOAD_PROGRESS: 'progress',
	/**
  * The thumbnail event is emitted when File API has retrieved a dataUrl from file (Not supported in legacy)
  *
  * @event UploadCore#config
  * @param {object} file - File API object
  * @param {string} dataUrl - Url of image retrieved by File API
  */
	UPLOAD_THUMBNAIL: 'thumbnail',
	/**
  * The reconnecting event is emitted when chunk has failed due to network issues and is attempting to retry
  *
  * @event UploadCore#reconnecting
  * @param {object} file - File API object
  * @param {number} attempts - Number of attempts made
  */
	UPLOAD_RECONNECTING: 'reconnecting',
	/**
  * The connected event is emitted when a request has been successfully made after a reconnecting event
  *
  * @event UploadCore#connected
  * @param {object} file - File API object
  */
	UPLOAD_CONNECTED: 'connected'
};

exports.default = EVENTS;
module.exports = exports['default'];
},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('classlist-polyfill');

require('es6-promise/auto');

require('whatwg-fetch');

var _authCore = require('@livelyvideo/auth-core');

var _authCore2 = _interopRequireDefault(_authCore);

var _lib = require('@livelyvideo/logger-core/lib');

var _lib2 = _interopRequireDefault(_lib);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _uploadChunked = require('./upload-chunked');

var _uploadChunked2 = _interopRequireDefault(_uploadChunked);

var _createElement = require('./utils/createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var _packageInfo = require('./package-info');

var _packageInfo2 = _interopRequireDefault(_packageInfo);

var _events3 = require('./events');

var _events4 = _interopRequireDefault(_events3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // IE
// IE
// fetch

// Imports


var logger = new _lib2.default({
	packageName: _packageInfo2.default.name,
	packageVersion: _packageInfo2.default.version
});

var defaultOptions = {
	host: null,
	authUrl: null,
	token: null,
	accept: null,
	bemPrefix: 'upload',
	autoSubmit: true,
	chunkSize: 102400,
	chunkConnections: 3,
	version: 'v2',
	multiple: true,
	loggerOptions: {}
};

/**
 * Class representing UploadCore
 */

var UploadCore = function (_EventEmitter) {
	_inherits(UploadCore, _EventEmitter);

	/**
  * Constructs an instance of UploadCore
  *
  * @param {object} el - The DOM element for UploadCore to be constructed on
  * @param {Config} [options] - Configurable options for the UploadCore class
  * @param {string} options.host - Destination host of your uploads
  * @param {string} options.authUrl - Route to retreive access tokens that authorize you to use host
  * @param {string} [options.token] - Manual token for authorization
  * @param {string} [options.accept] - Accept field for upload accept attribute
  * @param {string} [options.bemPrefix=upload] - Prefix for DOM classes
  * @param {string} [options.version=v2] - Api version
  * @param {bool} [options.autoSubmit=true] - Auto submit upload on select. If false you must call
  * @param {bool} [options.multiple=true] - Allow multiple files for upload
  * @param {number} [options.chunkSize=102400] - Size of chunks to be uploaded
  * @param {number} [options.chunkConnections=3] - Number of concurrent chunk connections
  * @param {object} [options.messages] - Hard code message strings
  * @param {object} loggerOptions
  * @param {string} [loggerOptions.level=warn] - Set the level at which logs will be logged to console
  * @param {string} [loggerOptions.silent=true] - If true no logs will be written to console
  * @constructs UploadCore
  */
	function UploadCore(el, options) {
		_classCallCheck(this, UploadCore);

		var _this = _possibleConstructorReturn(this, (UploadCore.__proto__ || Object.getPrototypeOf(UploadCore)).call(this));

		if (!_this.validOptions(options)) {
			return _possibleConstructorReturn(_this);
		}

		// Options
		_this.options = (0, _deepmerge2.default)(defaultOptions, options);
		_this.options.url = 'https://' + _this.options.host + '/api/upload/' + _this.options.version;

		_this.mount(el);

		logger.setOptions(_this.options.loggerOptions);
		logger.setInstanceOptions({
			host: _this.options.host
		});

		// Methods
		_this.selectFileChange = _this.selectFileChange.bind(_this);

		// State
		_this.browserSupported = _this.isBrowserSupported();
		_this._eventListeners = [];
		_this._uploadConnections = _this.createUploadConnections();
		_this._uploadQueue = [];
		_this._uploadListing = [];

		// Initialize
		_this.authorize();

		// Render
		_this.render();
		return _this;
	}

	/**
  * Validate options
  * @param {object} options
  */


	_createClass(UploadCore, [{
		key: 'validOptions',
		value: function validOptions(options) {
			var valid = true;

			if (!options) {
				logger.error('No options provided to constructor, "host" and "authUrl" required.');
				valid = false;
			}

			if (options.url) {
				logger.deprecated('Option "url" has been deprecated.');
				valid = false;
			}

			if (!options.host) {
				logger.error('No "host" option provided.');
				valid = false;
			}

			if (!options.authUrl) {
				logger.error('No "authUrl" option provided.');
				valid = false;
			}

			return valid;
		}

		/**
   * Authorize upload
   */

	}, {
		key: 'authorize',
		value: function authorize() {
			var _this2 = this;

			if (this.options.token) {
				return;
			}

			this.auth = new _authCore2.default('upload', this.options.authUrl);

			this.auth.on('ready', function (response) {
				_this2.options.token = response.token;

				if (_this2.uploadAuth) {
					_this2.uploadAuth.value = 'Bearer ' + _this2.options.token;
				}
			});
		}

		/**
   * Mounts element
   * @param {object} el - The DOM element for Chat to be constructed on
   */

	}, {
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
					logger.error('The constructor has not been given a valid element or selector.');
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

			if (this.options.multiple) {
				this.uploadInput.setAttribute('multiple', '');
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

			this.uploadForm.appendChild(this.uploadInput);
			this.uploadForm.appendChild(this.uploadAuth);
			this.uploadForm.appendChild(this.uploadName);
			this.el.appendChild(this.uploadForm);
			this.eventHelper(this.uploadInput, 'change', this.selectFileChange);
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
			var files = e.target.files;
			for (var i = 0; i < files.length; i++) {
				this.addFile(files[i]);
			}
		}

		/**
   * Add File to uploader with fileIdentifier
   * @param {object} file - File to be added to uploader
   */

	}, {
		key: 'addFile',
		value: function addFile(file) {
			// Edit file
			var fileToAdd = file;
			fileToAdd.fileIdentifier = this.generateFileIdentifier(file);

			this.emit(_events4.default.UPLOAD_ADDEDFILE, fileToAdd);
			this.readFile(fileToAdd);

			// One Upload at a time functionality
			if (!this.options.multiple) {
				if (this._uploadQueue.length) {
					this._uploadQueue[0].destroy();
				}
				for (var i = 0; i < this._uploadListing.length; i++) {
					this.removeFileFromListing(this._uploadListing[i]);
				}
			}

			// Queue file
			var uploader = new _uploadChunked2.default(fileToAdd, this, this.options);
			this._uploadQueue.push(uploader);
			this._uploadListing.push(file);

			if (this.options.autoSubmit) {
				this.startUploadConnections();
			}
		}

		/**
   * Remove File from Queue
   * @param {object} file - File to be removed from uploadQueue
   */

	}, {
		key: 'removeFileFromQueue',
		value: function removeFileFromQueue(file) {
			for (var i = 0; i < this._uploadQueue.length; i++) {
				if (this._uploadQueue[i].file === file) {
					this._uploadQueue.splice(i, 1);
				}
			}
		}

		/**
   * Remove File from Listing
   * @param {object} file - File to be removed from uploadQueue
   */

	}, {
		key: 'removeFileFromListing',
		value: function removeFileFromListing(file) {
			for (var i = 0; i < this._uploadListing.length; i++) {
				if (this._uploadListing[i] === file) {
					this._uploadListing.splice(i, 1);
					this.emit(_events4.default.UPLOAD_REMOVEDFILE, file);
				}
			}
		}

		/**
   * File identifier for resumable upload
   */

	}, {
		key: 'generateFileIdentifier',
		value: function generateFileIdentifier(file) {
			var relativePath = file.relativePath || file.webkitRelativePath || file.fileName || file.name;
			return file.size + '-' + relativePath.replace(/[^0-9a-zA-Z_-]/img, '');
		}

		/**
   * Create connections
   */

	}, {
		key: 'createUploadConnections',
		value: function createUploadConnections() {
			var connections = [];
			for (var i = 0; i < this.options.chunkConnections; i++) {
				connections.push({
					id: 'connection-' + i,
					connected: false
				});
			}
			return connections;
		}

		/**
   * Start all connections not currently in use
   */

	}, {
		key: 'startUploadConnections',
		value: function startUploadConnections() {
			if (!this._uploadQueue.length) {
				return;
			}

			for (var i = 0; i < this._uploadConnections.length; i++) {
				var connection = this._uploadConnections[i];
				if (!connection.connected) {
					this.runConnection(connection);
				}
			}
		}

		/**
   * Run connections on uploaders in queue
   */

	}, {
		key: 'runConnection',
		value: function runConnection(connection) {
			var _this3 = this;

			connection.connected = true;

			var uploader = this.getValidUploader();

			if (!uploader) {
				connection.connected = false;
				return;
			}

			switch (uploader._state) {
				case 'errored':
					connection.connected = false;
					break;
				case 'uninitialized':
					uploader.sendOptions(function (error) {
						connection.connected = false;

						// Break loop
						if (error) {
							return;
						}

						_this3.runConnection(connection);
					});
					break;
				case 'initializing':
					setTimeout(function () {
						_this3.runConnection(connection);
					}, 500);
					break;
				default:
					uploader.sendChunk(function (error) {
						connection.connected = false;

						// Break loop
						if (error) {
							return;
						}

						_this3.runConnection(connection);
					});
			}
		}

		/**
   * Return an uploader that can utilize a connection
   * @returns {object}
   */

	}, {
		key: 'getValidUploader',
		value: function getValidUploader() {
			for (var i = 0; i < this._uploadQueue.length; i++) {
				var uploader = this._uploadQueue[i];

				if (uploader._state !== 'errored' && uploader._state !== 'finalizing') {
					return uploader;
				}
			}

			return null;
		}

		/**
   * Read file using FileReader, will emit a thumbnail event if one can be generated from file
   * @param {object} file - File object to be read
   */

	}, {
		key: 'readFile',
		value: function readFile(file) {
			var _this4 = this;

			// File Reader may crash if over 512 MB
			if (!this.browserSupported || file.type === '' || file.size > 1024 * 1024 * 512) {
				return;
			}

			if (file.type.indexOf('image') !== -1) {
				var reader = new FileReader();

				var onLoad = function fileRead(event) {
					this.emit(_events4.default.UPLOAD_THUMBNAIL, file, event.target.result);
				}.bind(this);

				reader.onload = onLoad;
				reader.readAsDataURL(file);
				return;
			}

			// Chrome Fallback
			var nativeURL = window.URL || window.webkitURL;

			if (file.type.indexOf('video') !== -1 && nativeURL && nativeURL.createObjectURL) {
				var url = nativeURL.createObjectURL(file);

				// DOM - Moved and hidden offscreen
				var video = (0, _createElement2.default)({
					tagName: 'video',
					attributes: {
						muted: '',
						playsInline: '',
						preload: 'metadata',
						mimeType: file.type,
						src: url,
						style: 'visibility: hidden; position: fixed; left: -9999px;'
					}
				});
				var canvas = (0, _createElement2.default)({
					tagName: 'canvas',
					attributes: {
						style: 'visibility: hidden; position: fixed; left: -9999px;'
					}
				});

				// Get the bounds of the video and match it to the canvas
				video.addEventListener('loadeddata', function () {
					var videoBounds = video.getBoundingClientRect();
					canvas.setAttribute('width', videoBounds.width);
					canvas.setAttribute('height', videoBounds.height);
				});

				// Draw video to canvas and convert canvas to thumbnail
				video.addEventListener('seeked', function () {
					window.requestAnimationFrame(function () {
						var videoBounds = video.getBoundingClientRect();
						canvas.getContext('2d').drawImage(video, 0, 0, videoBounds.width, videoBounds.height);
						_this4.emit(_events4.default.UPLOAD_THUMBNAIL, file, canvas.toDataURL('image/png'));

						// Clean up
						document.body.removeChild(video);
						document.body.removeChild(canvas);
						nativeURL.revokeObjectURL(url);
					});
				});

				document.body.appendChild(video);
				document.body.appendChild(canvas);

				video.currentTime = 18;
			}
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
			this._eventListeners.push(removeEvent);
		}

		/**
   * Destroy UploadCore unmount all events
   */

	}, {
		key: 'destroy',
		value: function destroy() {
			for (var i = 0; i < this._eventListeners.length; i++) {
				this._eventListeners.splice(i, 1)[0]();
			}
			this.el.parentNode.removeChild(this.el);
		}
	}]);

	return UploadCore;
}(_events2.default);

exports.default = UploadCore;
module.exports = exports['default'];
},{"./events":14,"./package-info":17,"./upload-chunked":18,"./utils/createElement":19,"@livelyvideo/auth-core":13,"@livelyvideo/logger-core/lib":3,"classlist-polyfill":23,"deepmerge":24,"es6-promise/auto":25,"events":27,"whatwg-fetch":20}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = { version: '3.0.0-multiple.10', name: '@livelyvideo/upload-core' };
module.exports = exports['default'];
},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lib = require('@livelyvideo/logger-core/lib');

var _lib2 = _interopRequireDefault(_lib);

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
	function UploadChunked(file, Upload, options) {
		_classCallCheck(this, UploadChunked);

		this.file = file;
		this.Upload = Upload;
		this.options = options;

		// Firefox < 12, Safari
		// https://developer.mozilla.org/en-US/docs/Web/API/Blob/slice
		if ('mozSlice' in this.file) {
			this.sliceMethod = 'mozSlice';
		} else if ('webkitSlice' in this.file) {
			this.sliceMethod = 'webkitSlice';
		} else {
			this.sliceMethod = 'slice';
		}

		// Chunk State
		this.chunkSize = this.options.chunkSize;
		this.chunkTotal = Math.ceil(this.file.size / this.chunkSize, this.chunkSize) - 1;
		this.chunks = this.sliceFileToChunks();

		// State
		// [0] uninitialized - request options
		// [1] initializing - requesting options
		// [2] initialized - options successfully requested
		// [3] finalizing - sending last chunk
		this._state = 'uninitialized';
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
		value: function sendOptions(cb) {
			var _this = this;

			this._state = 'initializing';

			this.foreverFetch('' + this.options.url, {
				method: 'post',
				mode: 'cors',
				headers: {
					Authorization: 'Bearer ' + this.options.token,
					'X-File-Name': this.file.name,
					'X-File-Size': this.file.size,
					'X-File-Identifier': this.file.fileIdentifier,
					'X-File-Status': true,
					'X-Chunk-Total': this.chunkTotal
				}
			}).then(function (response) {
				if (!response.ok) {
					return _this._parseJSON(response);
				}

				_this.Upload.emit(_events2.default.UPLOAD_START, _this.file);

				var completedChunks = JSON.parse(response.headers.get('X-Chunks-Completed'));
				if (completedChunks) {
					_this.trimChunks(completedChunks);
				}

				_this.calculateProgress();

				_this._state = 'initialized';

				return cb();
			}).then(function (response) {
				// No errors / Upload destroyed during request
				if (!response || !response.message || !_this.file) {
					return cb();
				}

				// Errors
				if (_legacyMessages2.default[response.message]) {
					response.message = _legacyMessages2.default[response.message];
				}

				_lib2.default.error('Error on sendOptions request.', response);
				_this.Upload.emit(_events2.default.UPLOAD_FAILURE, _this.file, response);

				// Update State
				_this._state = 'errored';

				return cb(true);
			});
		}

		/**
   * Spawn a repeating connection
   */

	}, {
		key: 'sendChunk',
		value: function sendChunk(cb) {
			var _this2 = this;

			var chunk = this.getUnprocessedChunk();

			if (!chunk) {
				// No more chunks to be processed
				this._state = 'finalizing';
				cb();
				return;
			}

			chunk.processing = true;

			if (chunk.chunkLast && this.chunks.length > 1) {
				chunk.processing = false;
				setTimeout(function () {
					return cb();
				}, 500);
				return;
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
					'X-File-Identifier': this.file.fileIdentifier,
					'X-Chunk-Last': chunk.chunkLast,
					'X-Chunk-Index': chunk.chunkIndex,
					'X-Chunk-Total': chunk.chunkTotal
				}
			}).then(function (response) {
				if (!response.ok) {
					return _this2._parseJSON(response);
				}

				// Upload was destroyed during request
				if (!_this2.file) {
					return cb();
				}

				_this2.chunks.splice(_this2.chunks.indexOf(chunk), 1);
				_this2.calculateProgress(chunk.chunkLast);

				if (chunk.chunkLast) {
					var fileURI = response.headers.get('X-File-Retrieve-URL');
					var fileID = response.headers.get('X-File-ID');
					_this2.Upload.emit(_events2.default.UPLOAD_SUCCESS, _this2.file, fileURI, fileID);
					_this2.destroy();

					return cb();
				}

				return cb();
			}).then(function (response) {
				// No errors / Upload destroyed during request
				if (!response || !response.message || !_this2.file) {
					return cb();
				}

				// Errors
				if (_legacyMessages2.default[response.message]) {
					response.message = _legacyMessages2.default[response.message];
				}

				_lib2.default.error('Error on sendChunk request.', {
					fileName: _this2.file.name,
					fileSize: _this2.file.size,
					fileIdentifier: _this2.file.fileIdentifier,
					response: response,
					chunk: chunk
				});
				_this2.Upload.emit(_events2.default.UPLOAD_FAILURE, _this2.file, response);

				// Update state
				chunk.processing = false;
				_this2._state = 'errored';

				return cb(true);
			});
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
			this.Upload.emit(_events2.default.UPLOAD_PROGRESS, this.file, currentBytes, this.fileSize, percent);
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
							reconnecting = false;
							_this3.Upload.emit(_events2.default.UPLOAD_CONNECTED, _this3.file);
						}

						resolve(response);
					}).catch(function (err) {
						_lib2.default.network('Network error. Retried ' + n + ' times.', err);
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
   * Destroy UploadChunked
   */

	}, {
		key: 'destroy',
		value: function destroy() {
			// Remove file
			this.Upload.removeFileFromQueue(this.file);

			// File State
			this.file = undefined;
			this.Upload = undefined;
			this.options = undefined;

			// Chunk State
			this.chunkSize = undefined;
			this.chunkTotal = undefined;
			this.chunks = undefined;
		}
	}]);

	return UploadChunked;
}();

exports.default = UploadChunked;
module.exports = exports['default'];
},{"./events":14,"./legacy-messages":16,"@livelyvideo/logger-core/lib":3}],19:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"dup":10}],20:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],21:[function(require,module,exports){
/* globals navigator*/

'use strict';


function info(){
  var ua = navigator.userAgent;
  var tem;
  var os;

  var match = ua.match(/(opera|chrome|safari|firefox|edge|trident(?=\/))\/?\s*?(\S+)/i) || [];


  if (ua.indexOf('Win') !== -1) {
    os = 'Windows';
  }
  if (ua.indexOf('Mac') !== -1) {
    os = 'OS X';
  }
  if (ua.indexOf('X11') !== -1) {
    os = 'UNIX';
  }
  if (ua.indexOf('Linux' ) !== -1) {
    os = 'Linux';
  }
  if (ua.indexOf('Android') !== -1) {
    os = 'Android';
  }
  if (/iPad|iPhone|iPod/.test(ua)) {
    os = 'iOS';
  }
  if (ua.indexOf('Windows Phone') !== -1) {
    os = 'Windows Phone';
  }

  tem = ua.match(/\bIEMobile\/(\S+[0-9])/);
  if (tem !== null) {
    return {
      name: 'IEMobile',
      version: tem[1].split('.')[0],
      fullVersion: tem[1],
      os: os
    };
  }

  if (/trident/i.test(match[1])) {
    tem = /\brv[ :]+(\S+[0-9])/g.exec(ua) || [];
    return {
      name: 'IE',
      version: tem[1].split('.')[0],
      fullVersion: tem[1],
      os: os
    };
  }

  if (match[1] === 'Chrome') {
    tem = ua.match(/\bOPR\/(\d+)/);
    if (tem !== null) {
      return {
        name: 'Opera',
        version: tem[1].split('.')[0],
        fullVersion: tem[1],
        os: os
      };
    }

    tem = ua.match(/\bEdge\/(\S+)/);
    if (tem !== null) {
      return {
        name: 'Edge',
        version: tem[1].split('.')[0],
        fullVersion: tem[1],
        os: os
      };
    }
  }
  match = match[2]? [match[1], match[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if (match[0] !== 'Chrome') {
    var tem = ua.match(/version\/(\S+)/i)
    if (tem !== null && tem !== '') {
      match.splice(1, 1, tem[1]);
    }
  }
  return {
    name: match[0],
    version: match[1].split('.')[0],
    fullVersion: match[1],
    os: os
  };
}

module.exports = info;

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.deepmerge = factory();
    }
}(this, function () {

function isMergeableObject(val) {
    var nonNullObject = val && typeof val === 'object'

    return nonNullObject
        && Object.prototype.toString.call(val) !== '[object RegExp]'
        && Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice()
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument)
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument)
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument))
        }
    })
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {}
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument)
        })
    }
    Object.keys(source).forEach(function (key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument)
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument)
        }
    })
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge }
    var arrayMerge = options.arrayMerge || defaultArrayMerge

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
}

return deepmerge

}));

},{}],25:[function(require,module,exports){
// This file can be required in Browserify and Node.js for automatic polyfill
// To use it:  require('es6-promise/auto');
'use strict';
module.exports = require('./').polyfill();

},{"./":26}],26:[function(require,module,exports){
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
},{"_process":22}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
'use strict';

// Make a value ready for JSON.stringify() / process.send()
module.exports = function (value) {
	if (typeof value === 'object') {
		return destroyCircular(value, []);
	}

	// People sometimes throw things besides Error objects, so...

	if (typeof value === 'function') {
		// JSON.stringify discards functions. We do to, unless a function is thrown directly.
		return '[Function: ' + (value.name || 'anonymous') + ']';
	}

	return value;
};

// https://www.npmjs.com/package/destroy-circular
function destroyCircular(from, seen) {
	var to;
	if (Array.isArray(from)) {
		to = [];
	} else {
		to = {};
	}

	seen.push(from);

	Object.keys(from).forEach(function (key) {
		var value = from[key];

		if (typeof value === 'function') {
			return;
		}

		if (!value || typeof value !== 'object') {
			to[key] = value;
			return;
		}

		if (seen.indexOf(from[key]) === -1) {
			to[key] = destroyCircular(from[key], seen.slice(0));
			return;
		}

		to[key] = '[Circular]';
	});

	if (typeof from.name === 'string') {
		to.name = from.name;
	}

	if (typeof from.message === 'string') {
		to.message = from.message;
	}

	if (typeof from.stack === 'string') {
		to.stack = from.stack;
	}

	return to;
}

},{}]},{},[1]);
