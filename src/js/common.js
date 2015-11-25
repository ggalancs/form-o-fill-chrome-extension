/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		2:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"background","1":"content"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/*!*************************!*\
  !*** ./debug/logger.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _utils = __webpack_require__(/*! ../global/utils */ 3);
	
	var Utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/* eslint no-unused-vars: 0 */
	var Logger = {
	  out: function out(level, msg, obj) {
	    // Port to background.js
	    var port = chrome.runtime.connect();
	    port.postMessage({
	      "action": "log",
	      "message": msg
	    });
	
	    // REMOVE START
	    if (typeof Testing !== "undefined") {}
	    // Takes too much of a performance hit
	    //Testing.appendTestLog(msg);
	
	    // REMOVE END
	
	    if (obj) {
	      console[level]("[*FOF*]%s %O", msg, obj);
	      return;
	    }
	    console[level]("[*FOF*]%s", msg);
	  },
	  info: function info(msg, obj) {
	    this.out("info", msg, obj);
	  },
	  debug: function debug(msg, obj) {
	    this.out("debug", msg, obj);
	  },
	  warn: function warn(msg, obj) {
	    this.out("warn", msg, obj);
	  },
	  error: function error(msg, obj) {
	    this.out("error", msg, obj);
	  },
	  delete: function _delete() {
	    chrome.storage.local.remove(Utils.keys.logs);
	  },
	  load: function load() {
	    return new Promise(function (resolve) {
	      chrome.storage.local.get(Utils.keys.logs, function (storage) {
	        if (typeof storage[Utils.keys.logs] === "undefined") {
	          resolve([]);
	          return;
	        }
	        resolve(storage[Utils.keys.logs]);
	      });
	    });
	  },
	  _dateOptions: function _dateOptions() {
	    return { year: "numeric", month: "numeric", day: "numeric",
	      hour: "numeric", minute: "numeric", second: "numeric",
	      hour12: false };
	  },
	  store: function store(msg) {
	    this.load().then(function (entries) {
	      var parts = msg.match(/\[(.*?)\](.*)/);
	
	      entries = entries.slice(-25);
	
	      if (parts !== null) {
	        entries.push({
	          "createdAt": new Date().toLocaleString(),
	          "location": parts[1].trim(),
	          "message": msg
	        });
	      }
	
	      var a = {};
	      a[Utils.keys.logs] = entries;
	      chrome.storage.local.set(a);
	    });
	  }
	};
	
	module.exports = Logger;

/***/ },
/* 3 */
/*!*************************!*\
  !*** ./global/utils.js ***!
  \*************************/
/***/ function(module, exports) {

	"use strict";
	
	/*global jQuery Logger*/
	/*eslint no-unused-vars: 0*/
	var Utils = {
	  // Will be set to false in BUILD:
	  debug: true,
	  version: "##VERSION##",
	  liveExtensionId: "iebbppibdpjldhohknhgjoapijellonp",
	  keys: {
	    extractedRule: "form-o-fill-extracted",
	    rules: "form-o-fill-rules",
	    errors: "form-o-fill-errors",
	    tabs: "form-o-fill-tabs",
	    logs: "form-o-fill-logs",
	    lastMatchingRules: "form-o-fill-lastmatchingrules",
	    workflows: "form-o-fill-workflows",
	    lastMatchingWorkflows: "form-o-fill-lastmatchingworkflows",
	    runningWorkflow: "form-o-fill-runningworkflow",
	    sessionStorage: "form-o-fill-sessionStorage",
	    tutorialDataBackup: "form-o-fill-tutorialDataBackup",
	    tutorialActive: "form-o-fill-tut-active",
	    settings: "form-o-fill-settings"
	  },
	  defaultSettings: {
	    alwaysShowPopup: false,
	    jpegQuality: 60,
	    reevalRules: false
	  },
	  reevalRulesInterval: 2000,
	  reservedLibNamespaces: ["h", "halt"],
	  vendoredLibs: {
	    "vendor/chance.js/chance.js": { detectWith: /Libs\.chance/, name: "chance", onWindowName: "chance" },
	    "vendor/moment.js/moment-with-locales.min.js": { detectWith: /Libs\.moment/, name: "moment", onWindowName: "moment" }
	  },
	  isLiveExtension: function isLiveExtension() {
	    return window.location.host === Utils.liveExtensionId;
	  },
	  onFormOFillSite: function onFormOFillSite() {
	    /*eslint-disable no-extra-parens*/
	    return window.location.host === "form-o-fill.github.io" || window.location.host === "localhost" && window.location.port === "4000";
	    /*eslint-enable no-extra-parens*/
	  },
	  showExtractOverlay: function showExtractOverlay(whenFinishedCallback) {
	    // Send message to content script
	    chrome.runtime.sendMessage({ "action": "lastActiveTabId" }, function (tabId) {
	      var message = {
	        "action": "showExtractOverlay"
	      };
	      chrome.tabs.sendMessage(tabId, message);
	      whenFinishedCallback();
	    });
	  },
	  openOptions: function openOptions(parameter) {
	    var optionsUrl = chrome.runtime.getURL("html/options.html");
	    if (parameter) {
	      optionsUrl += parameter;
	    }
	    chrome.runtime.sendMessage({ "action": "openIntern", "url": optionsUrl });
	  },
	  infoMsg: function infoMsg(msg) {
	    // A function to display a nice message in the rule editor
	    var fadeAfterMSec = 1000;
	    var $menuInfo = jQuery(".editor .menu .info, #workflows .info");
	    $menuInfo.html(msg).css({ "opacity": "1" });
	    setTimeout(function () {
	      $menuInfo.animate({ "opacity": 0 }, 1000, function () {
	        jQuery(this).html("");
	      });
	    }, fadeAfterMSec);
	  },
	  downloadImage: function downloadImage(base64, filename) {
	    var a = document.createElement("a");
	    a.download = filename;
	    a.href = base64;
	    document.querySelector("body").appendChild(a);
	    a.click();
	    document.querySelector("body").removeChild(a);
	    // REMOVE START
	    if (typeof Logger !== "undefined") {
	      Logger.info("[utils.js] Downloading image '" + filename + "'");
	    }
	    // REMOVE END
	  },
	  download: function download(data, filename, mimeType) {
	    // Creates and triggers a download from a string
	    var blob = new Blob([data], { type: mimeType });
	    var url = window.URL.createObjectURL(blob);
	    var a = document.createElement("a");
	    a.download = filename;
	    a.href = url;
	    document.querySelector("body").appendChild(a);
	    a.click();
	    window.URL.revokeObjectURL(url);
	    document.querySelector("body").removeChild(a);
	  },
	  parseUrl: function parseUrl(url) {
	    var parser = document.createElement('a');
	    parser.href = url;
	    return {
	      url: url,
	      protocol: parser.protocol,
	      host: parser.hostname,
	      port: parser.port,
	      path: parser.pathname,
	      query: parser.search,
	      hash: parser.hash
	    };
	  },
	  sortRules: function sortRules(unsortedRules) {
	    return unsortedRules.sort(function (a, b) {
	      if (a.name > b.name) {
	        return 1;
	      }
	      if (a.name < b.name) {
	        return -1;
	      }
	      return 0;
	    });
	  }
	};
	
	module.exports = Utils;

/***/ },
/* 4 */
/*!*************************!*\
  !*** ./global/rules.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _logger = __webpack_require__(/*! ../debug/logger */ 2);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _jsonf = __webpack_require__(/*! ../global/jsonf */ 5);
	
	var _jsonf2 = _interopRequireDefault(_jsonf);
	
	var _libs = __webpack_require__(/*! ../global/libs */ 6);
	
	var _libs2 = _interopRequireDefault(_libs);
	
	var _utils = __webpack_require__(/*! ../global/utils */ 3);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _rule = __webpack_require__(/*! ../global/rule */ 12);
	
	var _rule2 = _interopRequireDefault(_rule);
	
	var _storage = __webpack_require__(/*! ../global/storage */ 13);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	var _jsBeautifier = __webpack_require__(/*! jsBeautifier */ 14);
	
	var _jsBeautifier2 = _interopRequireDefault(_jsBeautifier);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; } /*eslint no-new-func:0, max-nested-callbacks:[1,4], complexity: 0, block-scoped-var: 0*/
	
	/* Multiple Rules */
	var Rules = {
	  match: function match(target) {
	    var rules = this;
	    return new Promise(function (resolve) {
	      rules.all().then(function (rulez) {
	        var matchingRules = rulez.filter(function (rule) {
	          return typeof rule.url !== "undefined" && target.match(rule.url);
	        });
	        resolve(matchingRules);
	      });
	    });
	  },
	  findByName: function findByName(target) {
	    var rules = this;
	    return new Promise(function (resolve) {
	      rules.all().then(function (rulez) {
	        var matchingRules = rulez.filter(function (rule) {
	          return typeof rule.name !== "undefined" && target === rule.name;
	        });
	        resolve(matchingRules[0]);
	      });
	    });
	  },
	  load: function load(forTabId, ruleIndex) {
	    var that = this;
	    return new Promise(function prRulesLoad(resolve) {
	      _storage2.default.load(that._nameForTabId(forTabId)).then(function prRulesLoadStorage(rulesData) {
	
	        var rules = [];
	        if (rulesData) {
	          var libs = _libs2.default.detectLibraries(rulesData.code);
	          _libs2.default.loadLibs(libs, "Rules.load").then(function prRulesLoadLibs() {
	            var ruleFunction = that.text2function(rulesData.code);
	
	            if (ruleFunction === null) {
	              resolve(rules);
	            }
	
	            rules = ruleFunction.map(function (ruleJson, index) {
	              return _rule2.default.create(ruleJson, forTabId, index);
	            });
	
	            if (typeof ruleIndex !== "undefined") {
	              resolve(rules[ruleIndex - 1]);
	            } else {
	              resolve(rules);
	            }
	          });
	        }
	      });
	    });
	  },
	  text2function: function text2function(codeText) {
	    // remove wrapper
	    // results in [ code ... code ]
	    var rulesCodeMatches = codeText.match(/^.*?(\[[\s\S]*\];)$/m);
	    if (!rulesCodeMatches || !rulesCodeMatches[1]) {
	      return false;
	    }
	    var ruleCode = "return " + rulesCodeMatches[1];
	
	    return new Function(ruleCode)();
	  },
	  all: function all() {
	    return new Promise(function prRulesAll(resolve) {
	      _logger2.default.info("[rules.js] Fetching all rules");
	      _storage2.default.load(_utils2.default.keys.tabs).then(function prRulesAllStorageLoad(tabSettings) {
	        var promises = [];
	        var rules = [];
	
	        // Generate a Promise for all tab to be loaded
	        tabSettings.forEach(function rulesAlltabSetting(tabSetting) {
	          promises.push(Rules.load(tabSetting.id));
	        });
	
	        // Wait until resolved
	        Promise.all(promises).then(function prRulesAllgenerateRuleSet(values) {
	          // Outer loop: An array of arrays of rules [[Rule, Rule], [Rule, Rule]]
	          values.forEach(function (ruleSetForTab) {
	            // Inner Loop: An array of rules [Rule, Rule]
	            ruleSetForTab.forEach(function (ruleSet) {
	              rules.push(ruleSet);
	            });
	          });
	          _logger2.default.info("[rules.js] Fetched " + rules.length + " rules");
	          resolve(rules);
	        });
	      });
	    });
	  },
	  save: function save(ruleCode, activeTabId) {
	    return new Promise(function (resolve) {
	      var rulesData = {
	        tabId: activeTabId,
	        code: ruleCode
	      };
	      _storage2.default.save(rulesData, Rules._nameForTabId(activeTabId)).then(function () {
	        resolve(true);
	      });
	    });
	  },
	  delete: function _delete(tabId) {
	    _storage2.default.delete(this._nameForTabId(tabId));
	  },
	  _nameForTabId: function _nameForTabId(tabId) {
	    return _utils2.default.keys.rules + "-tab-" + tabId;
	  },
	  format: function format(rulesCodeString) {
	    // Prettify code a little
	    var prettyCode = (0, _jsBeautifier2.default)(rulesCodeString, {
	      "indent_size": 2,
	      "indent_char": " ",
	      "preserve_newlines": false,
	      "brace_style": "collapse",
	      "space_before_conditional": true,
	      "keep_function_indentation": true,
	      "unescape_strings": false
	    });
	    if (/\}\];$/.test(prettyCode)) {
	      prettyCode = prettyCode.replace(/\}\];$/, "}\n];");
	    }
	    return prettyCode;
	  },
	  // Simple checks for the neccessary structure of the rules
	  syntaxCheck: function syntaxCheck(editor) {
	    var that = this;
	    var errors = [];
	    var lineCount = editor._document.getLength();
	    var lineStart = editor._document.getLine(0);
	    var lineEnd = editor._document.getLine(lineCount - 1);
	
	    // Detect if the first line does not correctly containing "var rules = ["
	    if (lineStart.match(/var\s+\w+\s*=\s*\[/) === null) {
	      errors.push("need-var-rules");
	    }
	
	    // Do the rules end with ] ?
	    if (lineEnd.match(/][;]?\s*$/) === null) {
	      errors.push("need-var-rules");
	    }
	
	    // Check if there are some ACE Annotations (aka. errors) present
	    var annotationCount = editor.session().getAnnotations().length;
	    if (annotationCount > 0) {
	      errors.push("annotations-present");
	    }
	
	    // Check used library function definitions, must not contain reserved
	    // library namespaces
	    var libMatches = editor.getValue().match(/export["']?\s*:\s*['"].*?['"]/g);
	    if (libMatches !== null) {
	      // There are library definitions
	      var foundReservedNs = libMatches.map(function (matchStr) {
	        return matchStr.match(/:\s*['"](.*?)['"]/)[1];
	      }).filter(function (matchStr) {
	        return _utils2.default.reservedLibNamespaces.indexOf(matchStr) !== -1;
	      });
	
	      if (foundReservedNs.length > 0) {
	        errors.push({ id: "libs-using-reserved-namespaces", extra: foundReservedNs });
	      }
	    }
	
	    if (errors.length === 0) {
	      // Check for before/after function structure
	      var ruleCodeCheck = this.text2function(editor.getValue());
	
	      ruleCodeCheck.forEach(function (ruleFunction) {
	        if (ruleFunction.hasOwnProperty("before")) {
	          _logger2.default.info("[rules.js] Found a before function in rule '" + ruleFunction.before.toString() + "'");
	          that.checkSurroundFunction(ruleFunction.before, errors);
	        }
	        if (ruleFunction.hasOwnProperty("after")) {
	          _logger2.default.info("[rules.js] Found a after function in rule '" + ruleFunction.after.toString() + "'");
	          that.checkSurroundFunction(ruleFunction.after, errors);
	        }
	      });
	    }
	    return errors;
	  },
	  checkSurroundFunction: function checkSurroundFunction(ruleFunction, errors) {
	    // before/after function can be either a function or an array of functions
	    // Not a function or an array of functions
	    if (typeof ruleFunction !== "function" && typeof ruleFunction.length === "undefined") {
	      errors.push("before-function-needs-to-be-a-function-or-array");
	    }
	
	    // Create an array to make checking easier
	    if (typeof ruleFunction === "function") {
	      ruleFunction = [ruleFunction];
	    }
	
	    var ruleFuncErrors = {
	      needResolveArg: false,
	      needResolveCall: false,
	      needFunctions: false
	    };
	
	    // Used an array? Check for t least one rule
	    if (ruleFunction.length === 0) {
	      ruleFuncErrors.needFunctions = true;
	    }
	
	    // If it is a function check if it uses resolve()
	    ruleFunction.forEach(function (ruleFunc) {
	      // Fetch the name of the first argument
	      var resolveMatches = ruleFunc.toString().match(/function[\s]*\((.*?)[,\)]/);
	      var resolveFunctionName = resolveMatches[1];
	
	      if (resolveFunctionName === "") {
	        ruleFuncErrors.needResolveArg = true;
	      } else {
	        // Look for usage of the first argument (presumly "resolve") in the code
	        var regex = "\\{[\\s\\S]*" + resolveFunctionName + "[\\s\\S)]*\\}.*$";
	        resolveMatches = ruleFunc.toString().match(regex);
	        // No call to resolve?
	        /*eslint-disable no-extra-parens*/
	        if (resolveMatches === null || resolveMatches && !resolveMatches[0].match(resolveFunctionName + "\\s*[\\(\\)]|\\(\\s*" + resolveFunctionName + "\\s*\\)")) {
	          ruleFuncErrors.needResolveCall = true;
	        }
	        /*eslint-enable no-extra-parens*/
	      }
	    });
	
	    if (ruleFuncErrors.needResolveArg) {
	      errors.push("before-function-needs-resolve-argument");
	    }
	    if (ruleFuncErrors.needResolveCall) {
	      errors.push("before-function-needs-resolve-call");
	    }
	    if (ruleFuncErrors.needFunctions) {
	      errors.push("before-function-needs-functions");
	    }
	  },
	  lastMatchingRules: function lastMatchingRules(rules) {
	    return new Promise(function (resolve) {
	      // Load or save rules
	      if (typeof rules === "undefined") {
	        _storage2.default.load(_utils2.default.keys.lastMatchingRules).then(function (serializedRules) {
	          resolve(_jsonf2.default.parse(serializedRules));
	        });
	      } else {
	        _storage2.default.save(_jsonf2.default.stringify(rules), _utils2.default.keys.lastMatchingRules).then(function () {
	          resolve(true);
	        });
	      }
	    });
	  },
	  //
	  // Imports a dump created by the option pages export functionality
	  // returns a promise that resolves when all rules/Wfs are imported
	  importAll: function importAll(dumpString) {
	    return new Promise(function (resolve) {
	      var promises = [];
	      var parsed;
	
	      if ((typeof dumpString === "undefined" ? "undefined" : _typeof(dumpString)) === "object") {
	        parsed = dumpString;
	      } else {
	        parsed = _jsonf2.default.parse(dumpString);
	      }
	
	      // Data contains (in case of combined format):
	      // parsed.workflows
	      // parsed.rules
	      //
	      // In case of old (rules only) format:
	      // parsed.tabSettings
	      // parsed.rules
	
	      // Old format with rules only?
	      // Convert so it can be imported
	      if (typeof parsed.tabSettings !== "undefined") {
	        parsed.rules = {
	          rules: parsed.rules,
	          tabSettings: parsed.tabSettings
	        };
	        parsed.workflows = [];
	      }
	
	      // Save workflows (if any)
	      if (typeof parsed.workflows !== "undefined" && parsed.workflows.length > 0) {
	        promises.push(_storage2.default.save(parsed.workflows, _utils2.default.keys.workflows));
	      }
	
	      // Save the rules in all tabs
	      parsed.rules.rules.forEach(function (editorTabAndRules) {
	        promises.push(Rules.save(editorTabAndRules.code, editorTabAndRules.tabId));
	      });
	      // save tabsetting
	      promises.push(_storage2.default.save(parsed.rules.tabSettings, _utils2.default.keys.tabs));
	
	      // resolve all saving promises
	      Promise.all(promises).then(resolve(parsed));
	    });
	  },
	  exportDataJson: function exportDataJson() {
	    return new Promise(function (resolve) {
	      var promises = [];
	      _storage2.default.load(_utils2.default.keys.tabs).then(function (tabSettings) {
	        tabSettings.forEach(function (setting) {
	          promises.push(_storage2.default.load(_utils2.default.keys.rules + "-tab-" + setting.id));
	        });
	
	        Promise.all(promises).then(function (rulesFromAllTabs) {
	          var exportJson = {
	            "tabSettings": tabSettings,
	            "rules": rulesFromAllTabs
	          };
	          resolve(exportJson);
	        });
	      });
	    });
	  },
	  unique: function unique(rules) {
	    var uniques = [];
	    var ids = [];
	    Object.keys(rules).forEach(function (key) {
	      if (ids.indexOf(rules[key].id) === -1) {
	        uniques.push(rules[key]);
	        ids.push(rules[key].id);
	      }
	    });
	    return uniques;
	  }
	};
	
	module.exports = Rules;

/***/ },
/* 5 */
/*!*************************!*\
  !*** ./global/jsonf.js ***!
  \*************************/
/***/ function(module, exports) {

	"use strict";
	
	/*eslint no-new-func:0, complexity: 0*/
	var JSONF = {
	  _undef: "**JSONF-UNDEFINED**",
	  stringify: function stringify(object) {
	    return JSON.stringify(object, this._serializer, 2);
	  },
	  parse: function parse(jsonString) {
	    return JSON.parse(jsonString, this._deserializer);
	  },
	  _serializer: function _serializer(key, value) {
	    // undefined
	    if (typeof value === "undefined") {
	      return JSONF._undef;
	    }
	
	    // Is a FUNCTION or REGEXP ?
	    if (value !== null && (typeof value === "function" || typeof value.test === "function")) {
	      return value.toString();
	    }
	    return value;
	  },
	  _deserializer: function _deserializer(key, value) {
	    if (key === "" && typeof value === "string" && value.indexOf("function") !== 0 && value.indexOf("/") !== 0) {
	      return value;
	    }
	
	    if (typeof value === "string") {
	      var rfunc = /^function\s*(\w*)\s*\(([\s\S]*?)\)[\s\S]*?\{([\s\S]*)\}/m;
	      var rregexp = /^\/(.*?)\/$/m;
	      var match = value.match(rfunc);
	
	      // Function?
	      if (match) {
	        var args = match[2].split(',').map(function (arg) {
	          return arg.replace(/\s+/, '');
	        });
	        return new Function(args, match[3].trim());
	      }
	
	      // RegEx?
	      match = value.match(rregexp);
	      if (match) {
	        return new RegExp(match[1]);
	      }
	
	      // Undefined?
	      if (value === JSONF._undef) {
	        return undefined;
	      }
	    }
	    return value;
	  }
	};
	
	module.exports = JSONF;

/***/ },
/* 6 */
/*!************************!*\
  !*** ./global/libs.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _logger = __webpack_require__(/*! ../debug/logger */ 2);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _utils = __webpack_require__(/*! ./utils */ 3);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _rules = __webpack_require__(/*! ./rules */ 4);
	
	var _rules2 = _interopRequireDefault(_rules);
	
	var _form_filler = __webpack_require__(/*! ../content/form_filler */ 7);
	
	var _form_filler2 = _interopRequireDefault(_form_filler);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// This creates a "safe" namespace for all libs
	var Libs = {
	  _libs: {},
	  add: function add(libraryName, librayTopLevelFunction, forceAdd) {
	    // Check if the method is already defined
	    forceAdd = forceAdd || false;
	    if ((this._libs[libraryName] || this.hasOwnProperty(libraryName)) && !forceAdd) {
	      _logger2.default.info("[libs.js] Can not add library named '" + libraryName + "' because it already exists as a function().");
	      return;
	    }
	    this[libraryName] = librayTopLevelFunction;
	    _logger2.default.info("[libs.js] Added library as Libs." + libraryName);
	  },
	  import: function _import() {
	    return new Promise(function (resolve) {
	      _rules2.default.all().then(function (rules) {
	        rules.forEach(function (rule) {
	          if (typeof rule.export !== "undefined" && typeof rule.lib === "function") {
	            // Add the rule into the scope of all library functions
	            Libs.add(rule.export, rule.lib, true);
	          }
	        });
	      }).then(resolve("libraries imported"));
	    });
	  },
	  // Dectects libraries used in a rulecode string
	  // returns an array of found libraries
	  detectLibraries: function detectLibraries(ruleCodeString) {
	    var detectedLibs = [];
	    Object.keys(_utils2.default.vendoredLibs).forEach(function dtctLib(vLibKey) {
	      if (ruleCodeString.match(_utils2.default.vendoredLibs[vLibKey].detectWith) !== null) {
	        // Found!
	        detectedLibs.push(vLibKey);
	      }
	    });
	    return detectedLibs;
	  },
	  loadLibs: function loadLibs(scriptPaths, whoCallsMe) {
	    /*eslint-disable complexity */
	    return new Promise(function (resolve) {
	      if (typeof scriptPaths === "string") {
	        scriptPaths = [scriptPaths];
	      }
	
	      // If there is no script to inject
	      // OR we run in the context of the content page
	      // resolve now
	      // The content page gets its libraries by using the chrome API (see background/form_util.js#injectAndAttachToLibs)
	      if (scriptPaths.length === 0 || typeof chrome.extension === "undefined" || typeof chrome.extension.getBackgroundPage === "undefined") {
	        resolve(0);
	        return;
	      }
	
	      var anchor = document.querySelector("body");
	      var fragment = document.createDocumentFragment();
	
	      var loadedScriptCount = 0;
	      var targetScriptCount = scriptPaths.length;
	      var scriptPath;
	
	      for (var i = 0; i < targetScriptCount; i++) {
	        scriptPath = scriptPaths[i];
	
	        // If the requested lbrary is not vendored, break loop
	        if (typeof _utils2.default.vendoredLibs[scriptPath] === "undefined") {
	          continue;
	        }
	
	        var libName = _utils2.default.vendoredLibs[scriptPath].name;
	
	        // If a lib with that name is already present, don't load it again
	        if (typeof Libs[libName] !== "undefined") {
	          loadedScriptCount++;
	          _logger2.default.info("[libs.js] Didn't load '" + scriptPath + "' again");
	          continue;
	        }
	
	        var script = document.createElement("script");
	        script.async = false;
	        script.dataset.who = whoCallsMe;
	        script.className = "injectedByFormOFill";
	        script.dataset.script = scriptPath;
	        script.src = chrome.extension.getURL(scriptPath);
	        /*eslint-disable no-loop-func*/
	        script.onload = function () {
	          // Add Library to Libs
	          Libs.add(libName, window[_utils2.default.vendoredLibs[scriptPath].onWindowName]);
	          loadedScriptCount++;
	          _logger2.default.info("[libs.js] Loaded '" + scriptPath + "'");
	
	          // If all script are loaded, resolve promise
	          if (loadedScriptCount >= targetScriptCount) {
	            resolve(loadedScriptCount);
	          }
	        };
	        script.onerror = function () {
	          resolve(loadedScriptCount);
	        };
	        /*eslint-enebale no-loop-func*/
	
	        // Since this is all async make sure nobody has already
	        // inserted it while we worked on this script:
	        if (document.querySelectorAll("script[data-script='" + scriptPath + "']").length === 0) {
	          fragment.appendChild(script);
	        }
	      }
	
	      // If the loop is ready and the count already matches,
	      // there was nothing to to and that's ok
	      if (loadedScriptCount >= targetScriptCount) {
	        resolve(loadedScriptCount);
	      }
	
	      // Only insert the fragment if it has something inside
	      if (fragment.childNodes.length > 0) {
	        anchor.appendChild(fragment);
	      }
	    });
	    /*eslint-enable complexity */
	  }
	};
	
	// helper for use in value functions
	//
	// "value" : Libs.h.click  => Clicks on the element specified by 'selector'
	var valueFunctionHelper = {
	  click: function click($domNode) {
	    $domNode.click();
	  },
	  screenshot: function screenshot(saveAs) {
	    chrome.runtime.sendMessage({ action: "takeScreenshot", value: _form_filler2.default.currentRuleMetadata, flag: saveAs });
	  }
	};
	Libs.add("h", valueFunctionHelper);
	
	// Change the text of the throbber
	var setThrobberText = function setThrobberText(text) {
	  // Since this is called from the background pages
	  // we need to send a message to the content.js
	  chrome.tabs.sendMessage(window.lastActiveTab.id, { action: "showOverlay", message: text });
	};
	Libs.add("displayMessage", setThrobberText);
	
	// Process control functions
	// Run in the context of the background page
	// thus lastActiveTab is available
	var processFunctionsHalt = function processFunctionsHalt(msg) {
	  return function () {
	    if (typeof window.lastActiveTab === "undefined") {
	      return null;
	    }
	
	    if (typeof msg === "undefined") {
	      msg = "Canceled by call to Libs.halt()";
	    }
	
	    setThrobberText(msg);
	    return null;
	  };
	};
	Libs.add("halt", processFunctionsHalt);
	
	module.exports = Libs;

/***/ },
/* 7 */
/*!********************************!*\
  !*** ./content/form_filler.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _form_errors = __webpack_require__(/*! ./form_errors */ 8);
	
	var _logger = __webpack_require__(/*! ../debug/logger */ 2);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _jsonf = __webpack_require__(/*! ../global/jsonf */ 5);
	
	var _jsonf2 = _interopRequireDefault(_jsonf);
	
	var _jquery = __webpack_require__(/*! jquery */ 9);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*eslint complexity:0, no-unused-vars: 0, max-params: [2, 5]*/
	
	var FormFiller = {
	  error: null,
	  // This fills the field with a value
	  fill: function fill(selector, value, beforeData, flags, meta) {
	    var domNodes = document.querySelectorAll(selector);
	    var domNode = null;
	    var fillMethod = null;
	    this.currentRuleMetadata = meta;
	
	    if (domNodes.length === 0) {
	      return new _form_errors.FormError(selector, value, "Could not find field");
	    }
	    _logger2.default.info("[form_filler.js] Filling " + domNodes.length + " fields on the page");
	
	    var parsedValue = _jsonf2.default.parse(value);
	
	    // Call field specific method on EVERY field found
	    //
	    // "_fill" + the camelized version of one of these:
	    // text , button , checkbox , image , password , radio , textarea , select-one , select-multiple , search
	    // email , url , tel , number , range , date , month , week , time , datetime , datetime-local , color
	    //
	    // eg. _fillDatetimeLocal(value)
	    var i;
	    var returnValue = null;
	
	    for (i = 0; i < domNodes.length; ++i) {
	      domNode = domNodes[i];
	      fillMethod = this._fillMethod(domNode);
	
	      // Check for "onlyEmpty" flag and break the loop
	      if (flags.onlyEmpty === true && domNode.value !== "") {
	        _logger2.default.info("[form_filler.js] Skipped the loop because the target was not empty");
	        break;
	      }
	
	      // if the value is a function, call it with the jQuery wrapped domNode
	      // The value for 'Libs' and 'context' are implicitly passed in by defining them on the sandboxed window object
	      if (typeof parsedValue === "function") {
	        try {
	          parsedValue = parsedValue((0, _jquery2.default)(domNode), beforeData);
	        } catch (e) {
	          _logger2.default.info("[form_filler.js] Got an exception executing value function: " + parsedValue);
	          _logger2.default.info("[form_filler.js] Original exception: " + e);
	          _logger2.default.info("[form_filler.js] Original stack: " + e.stack);
	          return new _form_errors.FormError(selector, value, "Error while executing value-function: " + _jsonf2.default.stringify(e.message));
	        }
	      }
	
	      // Fill field only if value is not null or not defined
	      if (parsedValue !== null && typeof parsedValue !== "undefined") {
	        // Fill field using the specialized method or default
	        returnValue = fillMethod(domNode, parsedValue, selector) || null;
	      }
	    }
	
	    // Screenshot?
	    if (flags.screenshot !== "undefined" && flags.screenshot !== false) {
	      // Only the BG page has the permissions to do a screenshot
	      // so here we send it the request to do so
	      _logger2.default.info("[form_filler.js] sending request to take a screenshot to bg.js");
	      chrome.runtime.sendMessage({ action: "takeScreenshot", value: meta, flag: flags.screenshot });
	    }
	
	    return returnValue;
	  },
	  _fillDefault: function _fillDefault(domNode, value) {
	    domNode.value = value;
	  },
	  _fillImage: function _fillImage(domNode, value) {
	    domNode.attributes.getNamedItem("src").value = value;
	  },
	  _fillCheckbox: function _fillCheckbox(domNode, value) {
	    var setValue;
	    if (value === true || domNode.value === value) {
	      setValue = true;
	    }
	    if (value === false) {
	      setValue = false;
	    }
	    domNode.checked = setValue;
	  },
	  _fillRadio: function _fillRadio(domNode, value) {
	    domNode.checked = domNode.value === value;
	  },
	  _fillSelectOne: function _fillSelectOne(domNode, value) {
	    var i = 0;
	    var optionNode = null;
	    for (i = 0; i < domNode.children.length; i++) {
	      optionNode = domNode.children[i];
	      if (optionNode.value === value) {
	        optionNode.selected = value;
	        return;
	      }
	    }
	  },
	  _fillSelectMultiple: function _fillSelectMultiple(domNode, value) {
	    var i = 0;
	    var optionNode = null;
	    var someFunction = function someFunction(targetValue) {
	      return optionNode.value === targetValue;
	    };
	    value = Array.isArray(value) ? value : [value];
	
	    for (i = 0; i < domNode.children.length; i++) {
	      optionNode = domNode.children[i];
	      optionNode.selected = value.some(someFunction);
	    }
	  },
	  _fillDate: function _fillDate(domNode, value, selector) {
	    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
	      domNode.value = value;
	    } else {
	      return new _form_errors.FormError(selector, value, "'date' field cannot be filled with this. See http://bit.ly/formofill-formats");
	    }
	  },
	  _fillMonth: function _fillMonth(domNode, value, selector) {
	    if (/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) {
	      domNode.value = value;
	    } else {
	      return new _form_errors.FormError(selector, value, "'month' field cannot be filled with this value. See http://bit.ly/formofill-format-month");
	    }
	  },
	  _fillWeek: function _fillWeek(domNode, value, selector) {
	    if (/^\d{4}-W(0[1-9]|[1-4][0-9]|5[0123])$/.test(value)) {
	      domNode.value = value;
	    } else {
	      return new _form_errors.FormError(selector, value, "'week' field cannot be filled with tihs value. See http://bit.ly/formofill-format-week");
	    }
	  },
	  _fillTime: function _fillTime(domNode, value, selector) {
	    if (/^(0\d|1\d|2[0-3]):([0-5]\d):([0-5]\d)(\.(\d{1,3}))?$/.test(value)) {
	      domNode.value = value;
	    } else {
	      return new _form_errors.FormError(selector, value, "'time' field cannot be filled with this value. See http://bit.ly/formofill-format-time");
	    }
	  },
	  _fillDatetime: function _fillDatetime(domNode, value, selector) {
	    if (/^\d{4}-\d{2}-\d{2}T(0\d|1\d|2[0-3]):([0-5]\d):([0-5]\d)([T|Z][^\d]|[+-][01][0-4]:\d\d)$/.test(value)) {
	      domNode.value = value;
	    } else {
	      return new _form_errors.FormError(selector, value, "'datetime' field cannot be filled with this value. See http://bit.ly/formofill-format-date-time");
	    }
	  },
	  _fillDatetimeLocal: function _fillDatetimeLocal(domNode, value, selector) {
	    if (/^\d{4}-\d{2}-\d{2}T(0\d|1\d|2[0-3]):([0-5]\d):([0-5]\d)(\.(\d{1,3}))?$/.test(value)) {
	      domNode.value = value;
	    } else {
	      return new _form_errors.FormError(selector, value, "'datetime-local' field cannot be filled with this value. See http://bit.ly/formofill-format-date-time-local");
	    }
	  },
	  _fillColor: function _fillColor(domNode, value, selector) {
	    if (/^#[0-9a-f]{6}$/i.test(value)) {
	      domNode.value = value;
	    } else {
	      return new _form_errors.FormError(selector, value, "'color' field cannot be filled with this value. See http://bit.ly/formofill-format-color");
	    }
	  },
	  _typeMethod: function _typeMethod(type) {
	    return ("_fill-" + type).replace(/(\-[a-z])/g, function ($1) {
	      return $1.toUpperCase().replace('-', '');
	    });
	  },
	  _fillMethod: function _fillMethod(domNode) {
	    var fillMethod = this[this._typeMethod(domNode.type)];
	    // Default is to set the value of the field if
	    // no special function is defined for that type
	    if (typeof fillMethod !== "function") {
	      fillMethod = this._fillDefault;
	    }
	    return fillMethod;
	  }
	};
	
	module.exports = FormFiller;

/***/ },
/* 8 */
/*!********************************!*\
  !*** ./content/form_errors.js ***!
  \********************************/
/***/ function(module, exports) {

	"use strict";
	
	var FormError = function FormError(selector, value, message) {
	  this.selector = selector;
	  this.value = value;
	  this.message = message;
	};
	
	var FormErrors = function FormErrors(rule) {
	  this._errors = [];
	  this.rule = rule;
	};
	
	FormErrors.prototype.add = function (selector, value, message) {
	  var formError = new FormError(selector, value, message);
	  this._errors.push(formError);
	  return this;
	};
	
	FormErrors.prototype.get = function () {
	  return this._errors;
	};
	
	module.exports = {
	  FormErrors: FormErrors,
	  FormError: FormError
	};

/***/ },
/* 9 */
/*!********************************************!*\
  !*** ../vendor/jquery/jquery-2.1.4.min.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {"use strict";
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
	!(function (a, b) {
	  "object" == ( false ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = a.document ? b(a, !0) : function (a) {
	    if (!a.document) throw new Error("jQuery requires a window with a document");return b(a);
	  } : b(a);
	})("undefined" != typeof window ? window : undefined, function (a, b) {
	  var c = [],
	      d = c.slice,
	      e = c.concat,
	      f = c.push,
	      g = c.indexOf,
	      h = {},
	      i = h.toString,
	      j = h.hasOwnProperty,
	      k = {},
	      l = a.document,
	      m = "2.1.4",
	      n = function n(a, b) {
	    return new n.fn.init(a, b);
	  },
	      o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	      p = /^-ms-/,
	      q = /-([\da-z])/gi,
	      r = function r(a, b) {
	    return b.toUpperCase();
	  };n.fn = n.prototype = { jquery: m, constructor: n, selector: "", length: 0, toArray: function toArray() {
	      return d.call(this);
	    }, get: function get(a) {
	      return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this);
	    }, pushStack: function pushStack(a) {
	      var b = n.merge(this.constructor(), a);return b.prevObject = this, b.context = this.context, b;
	    }, each: function each(a, b) {
	      return n.each(this, a, b);
	    }, map: function map(a) {
	      return this.pushStack(n.map(this, function (b, c) {
	        return a.call(b, c, b);
	      }));
	    }, slice: function slice() {
	      return this.pushStack(d.apply(this, arguments));
	    }, first: function first() {
	      return this.eq(0);
	    }, last: function last() {
	      return this.eq(-1);
	    }, eq: function eq(a) {
	      var b = this.length,
	          c = +a + (0 > a ? b : 0);return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
	    }, end: function end() {
	      return this.prevObject || this.constructor(null);
	    }, push: f, sort: c.sort, splice: c.splice }, n.extend = n.fn.extend = function () {
	    var a,
	        b,
	        c,
	        d,
	        e,
	        f,
	        g = arguments[0] || {},
	        h = 1,
	        i = arguments.length,
	        j = !1;for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == (typeof g === "undefined" ? "undefined" : _typeof(g)) || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++) {
	      if (null != (a = arguments[h])) for (b in a) {
	        c = g[b], d = a[b], g !== d && (j && d && (n.isPlainObject(d) || (e = n.isArray(d))) ? (e ? (e = !1, f = c && n.isArray(c) ? c : []) : f = c && n.isPlainObject(c) ? c : {}, g[b] = n.extend(j, f, d)) : void 0 !== d && (g[b] = d));
	      }
	    }return g;
	  }, n.extend({ expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""), isReady: !0, error: function error(a) {
	      throw new Error(a);
	    }, noop: function noop() {}, isFunction: function isFunction(a) {
	      return "function" === n.type(a);
	    }, isArray: Array.isArray, isWindow: function isWindow(a) {
	      return null != a && a === a.window;
	    }, isNumeric: function isNumeric(a) {
	      return !n.isArray(a) && a - parseFloat(a) + 1 >= 0;
	    }, isPlainObject: function isPlainObject(a) {
	      return "object" !== n.type(a) || a.nodeType || n.isWindow(a) ? !1 : a.constructor && !j.call(a.constructor.prototype, "isPrototypeOf") ? !1 : !0;
	    }, isEmptyObject: function isEmptyObject(a) {
	      var b;for (b in a) {
	        return !1;
	      }return !0;
	    }, type: function type(a) {
	      return null == a ? a + "" : "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || "function" == typeof a ? h[i.call(a)] || "object" : typeof a === "undefined" ? "undefined" : _typeof(a);
	    }, globalEval: function globalEval(a) {
	      var b,
	          c = eval;a = n.trim(a), a && (1 === a.indexOf("use strict") ? (b = l.createElement("script"), b.text = a, l.head.appendChild(b).parentNode.removeChild(b)) : c(a));
	    }, camelCase: function camelCase(a) {
	      return a.replace(p, "ms-").replace(q, r);
	    }, nodeName: function nodeName(a, b) {
	      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
	    }, each: function each(a, b, c) {
	      var d,
	          e = 0,
	          f = a.length,
	          g = s(a);if (c) {
	        if (g) {
	          for (; f > e; e++) {
	            if ((d = b.apply(a[e], c), d === !1)) break;
	          }
	        } else for (e in a) {
	          if ((d = b.apply(a[e], c), d === !1)) break;
	        }
	      } else if (g) {
	        for (; f > e; e++) {
	          if ((d = b.call(a[e], e, a[e]), d === !1)) break;
	        }
	      } else for (e in a) {
	        if ((d = b.call(a[e], e, a[e]), d === !1)) break;
	      }return a;
	    }, trim: function trim(a) {
	      return null == a ? "" : (a + "").replace(o, "");
	    }, makeArray: function makeArray(a, b) {
	      var c = b || [];return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c;
	    }, inArray: function inArray(a, b, c) {
	      return null == b ? -1 : g.call(b, a, c);
	    }, merge: function merge(a, b) {
	      for (var c = +b.length, d = 0, e = a.length; c > d; d++) {
	        a[e++] = b[d];
	      }return a.length = e, a;
	    }, grep: function grep(a, b, c) {
	      for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) {
	        d = !b(a[f], f), d !== h && e.push(a[f]);
	      }return e;
	    }, map: function map(a, b, c) {
	      var d,
	          f = 0,
	          g = a.length,
	          h = s(a),
	          i = [];if (h) for (; g > f; f++) {
	        d = b(a[f], f, c), null != d && i.push(d);
	      } else for (f in a) {
	        d = b(a[f], f, c), null != d && i.push(d);
	      }return e.apply([], i);
	    }, guid: 1, proxy: function proxy(a, b) {
	      var c, e, f;return "string" == typeof b && (c = a[b], b = a, a = c), n.isFunction(a) ? (e = d.call(arguments, 2), f = function () {
	        return a.apply(b || this, e.concat(d.call(arguments)));
	      }, f.guid = a.guid = a.guid || n.guid++, f) : void 0;
	    }, now: Date.now, support: k }), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
	    h["[object " + b + "]"] = b.toLowerCase();
	  });function s(a) {
	    var b = "length" in a && a.length,
	        c = n.type(a);return "function" === c || n.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a;
	  }var t = (function (a) {
	    var b,
	        c,
	        d,
	        e,
	        f,
	        g,
	        h,
	        i,
	        j,
	        k,
	        l,
	        m,
	        n,
	        o,
	        p,
	        q,
	        r,
	        s,
	        t,
	        u = "sizzle" + 1 * new Date(),
	        v = a.document,
	        w = 0,
	        x = 0,
	        y = ha(),
	        z = ha(),
	        A = ha(),
	        B = function B(a, b) {
	      return a === b && (l = !0), 0;
	    },
	        C = 1 << 31,
	        D = ({}).hasOwnProperty,
	        E = [],
	        F = E.pop,
	        G = E.push,
	        H = E.push,
	        I = E.slice,
	        J = function J(a, b) {
	      for (var c = 0, d = a.length; d > c; c++) {
	        if (a[c] === b) return c;
	      }return -1;
	    },
	        K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	        L = "[\\x20\\t\\r\\n\\f]",
	        M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
	        N = M.replace("w", "w#"),
	        O = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + N + "))|)" + L + "*\\]",
	        P = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + O + ")*)|.*)\\)|)",
	        Q = new RegExp(L + "+", "g"),
	        R = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
	        S = new RegExp("^" + L + "*," + L + "*"),
	        T = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
	        U = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
	        V = new RegExp(P),
	        W = new RegExp("^" + N + "$"),
	        X = { ID: new RegExp("^#(" + M + ")"), CLASS: new RegExp("^\\.(" + M + ")"), TAG: new RegExp("^(" + M.replace("w", "w*") + ")"), ATTR: new RegExp("^" + O), PSEUDO: new RegExp("^" + P), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"), bool: new RegExp("^(?:" + K + ")$", "i"), needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i") },
	        Y = /^(?:input|select|textarea|button)$/i,
	        Z = /^h\d$/i,
	        $ = /^[^{]+\{\s*\[native \w/,
	        _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	        aa = /[+~]/,
	        ba = /'|\\/g,
	        ca = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
	        da = function da(a, b, c) {
	      var d = "0x" + b - 65536;return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
	    },
	        ea = function ea() {
	      m();
	    };try {
	      H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType;
	    } catch (fa) {
	      H = { apply: E.length ? function (a, b) {
	          G.apply(a, I.call(b));
	        } : function (a, b) {
	          var c = a.length,
	              d = 0;while (a[c++] = b[d++]) {}a.length = c - 1;
	        } };
	    }function ga(a, b, d, e) {
	      var f, h, j, k, l, o, r, s, w, x;if (((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], k = b.nodeType, "string" != typeof a || !a || 1 !== k && 9 !== k && 11 !== k)) return d;if (!e && p) {
	        if (11 !== k && (f = _.exec(a))) if (j = f[1]) {
	          if (9 === k) {
	            if ((h = b.getElementById(j), !h || !h.parentNode)) return d;if (h.id === j) return d.push(h), d;
	          } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j) return d.push(h), d;
	        } else {
	          if (f[2]) return H.apply(d, b.getElementsByTagName(a)), d;if ((j = f[3]) && c.getElementsByClassName) return H.apply(d, b.getElementsByClassName(j)), d;
	        }if (c.qsa && (!q || !q.test(a))) {
	          if ((s = r = u, w = b, x = 1 !== k && a, 1 === k && "object" !== b.nodeName.toLowerCase())) {
	            o = g(a), (r = b.getAttribute("id")) ? s = r.replace(ba, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;while (l--) {
	              o[l] = s + ra(o[l]);
	            }w = aa.test(a) && pa(b.parentNode) || b, x = o.join(",");
	          }if (x) try {
	            return H.apply(d, w.querySelectorAll(x)), d;
	          } catch (y) {} finally {
	            r || b.removeAttribute("id");
	          }
	        }
	      }return i(a.replace(R, "$1"), b, d, e);
	    }function ha() {
	      var a = [];function b(c, e) {
	        return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e;
	      }return b;
	    }function ia(a) {
	      return a[u] = !0, a;
	    }function ja(a) {
	      var b = n.createElement("div");try {
	        return !!a(b);
	      } catch (c) {
	        return !1;
	      } finally {
	        b.parentNode && b.parentNode.removeChild(b), b = null;
	      }
	    }function ka(a, b) {
	      var c = a.split("|"),
	          e = a.length;while (e--) {
	        d.attrHandle[c[e]] = b;
	      }
	    }function la(a, b) {
	      var c = b && a,
	          d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);if (d) return d;if (c) while (c = c.nextSibling) {
	        if (c === b) return -1;
	      }return a ? 1 : -1;
	    }function ma(a) {
	      return function (b) {
	        var c = b.nodeName.toLowerCase();return "input" === c && b.type === a;
	      };
	    }function na(a) {
	      return function (b) {
	        var c = b.nodeName.toLowerCase();return ("input" === c || "button" === c) && b.type === a;
	      };
	    }function oa(a) {
	      return ia(function (b) {
	        return b = +b, ia(function (c, d) {
	          var e,
	              f = a([], c.length, b),
	              g = f.length;while (g--) {
	            c[e = f[g]] && (c[e] = !(d[e] = c[e]));
	          }
	        });
	      });
	    }function pa(a) {
	      return a && "undefined" != typeof a.getElementsByTagName && a;
	    }c = ga.support = {}, f = ga.isXML = function (a) {
	      var b = a && (a.ownerDocument || a).documentElement;return b ? "HTML" !== b.nodeName : !1;
	    }, m = ga.setDocument = function (a) {
	      var b,
	          e,
	          g = a ? a.ownerDocument || a : v;return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = g.documentElement, e = g.defaultView, e && e !== e.top && (e.addEventListener ? e.addEventListener("unload", ea, !1) : e.attachEvent && e.attachEvent("onunload", ea)), p = !f(g), c.attributes = ja(function (a) {
	        return a.className = "i", !a.getAttribute("className");
	      }), c.getElementsByTagName = ja(function (a) {
	        return a.appendChild(g.createComment("")), !a.getElementsByTagName("*").length;
	      }), c.getElementsByClassName = $.test(g.getElementsByClassName), c.getById = ja(function (a) {
	        return o.appendChild(a).id = u, !g.getElementsByName || !g.getElementsByName(u).length;
	      }), c.getById ? (d.find.ID = function (a, b) {
	        if ("undefined" != typeof b.getElementById && p) {
	          var c = b.getElementById(a);return c && c.parentNode ? [c] : [];
	        }
	      }, d.filter.ID = function (a) {
	        var b = a.replace(ca, da);return function (a) {
	          return a.getAttribute("id") === b;
	        };
	      }) : (delete d.find.ID, d.filter.ID = function (a) {
	        var b = a.replace(ca, da);return function (a) {
	          var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");return c && c.value === b;
	        };
	      }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
	        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0;
	      } : function (a, b) {
	        var c,
	            d = [],
	            e = 0,
	            f = b.getElementsByTagName(a);if ("*" === a) {
	          while (c = f[e++]) {
	            1 === c.nodeType && d.push(c);
	          }return d;
	        }return f;
	      }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
	        return p ? b.getElementsByClassName(a) : void 0;
	      }, r = [], q = [], (c.qsa = $.test(g.querySelectorAll)) && (ja(function (a) {
	        o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]");
	      }), ja(function (a) {
	        var b = g.createElement("input");b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:");
	      })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function (a) {
	        c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", P);
	      }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function (a, b) {
	        var c = 9 === a.nodeType ? a.documentElement : a,
	            d = b && b.parentNode;return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
	      } : function (a, b) {
	        if (b) while (b = b.parentNode) {
	          if (b === a) return !0;
	        }return !1;
	      }, B = b ? function (a, b) {
	        if (a === b) return l = !0, 0;var d = !a.compareDocumentPosition - !b.compareDocumentPosition;return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === g || a.ownerDocument === v && t(v, a) ? -1 : b === g || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1);
	      } : function (a, b) {
	        if (a === b) return l = !0, 0;var c,
	            d = 0,
	            e = a.parentNode,
	            f = b.parentNode,
	            h = [a],
	            i = [b];if (!e || !f) return a === g ? -1 : b === g ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;if (e === f) return la(a, b);c = a;while (c = c.parentNode) {
	          h.unshift(c);
	        }c = b;while (c = c.parentNode) {
	          i.unshift(c);
	        }while (h[d] === i[d]) {
	          d++;
	        }return d ? la(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0;
	      }, g) : n;
	    }, ga.matches = function (a, b) {
	      return ga(a, null, null, b);
	    }, ga.matchesSelector = function (a, b) {
	      if (((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b)))) try {
	        var d = s.call(a, b);if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
	      } catch (e) {}return ga(b, n, null, [a]).length > 0;
	    }, ga.contains = function (a, b) {
	      return (a.ownerDocument || a) !== n && m(a), t(a, b);
	    }, ga.attr = function (a, b) {
	      (a.ownerDocument || a) !== n && m(a);var e = d.attrHandle[b.toLowerCase()],
	          f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;
	    }, ga.error = function (a) {
	      throw new Error("Syntax error, unrecognized expression: " + a);
	    }, ga.uniqueSort = function (a) {
	      var b,
	          d = [],
	          e = 0,
	          f = 0;if ((l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l)) {
	        while (b = a[f++]) {
	          b === a[f] && (e = d.push(f));
	        }while (e--) {
	          a.splice(d[e], 1);
	        }
	      }return k = null, a;
	    }, e = ga.getText = function (a) {
	      var b,
	          c = "",
	          d = 0,
	          f = a.nodeType;if (f) {
	        if (1 === f || 9 === f || 11 === f) {
	          if ("string" == typeof a.textContent) return a.textContent;for (a = a.firstChild; a; a = a.nextSibling) {
	            c += e(a);
	          }
	        } else if (3 === f || 4 === f) return a.nodeValue;
	      } else while (b = a[d++]) {
	        c += e(b);
	      }return c;
	    }, d = ga.selectors = { cacheLength: 50, createPseudo: ia, match: X, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(a) {
	          return a[1] = a[1].replace(ca, da), a[3] = (a[3] || a[4] || a[5] || "").replace(ca, da), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
	        }, CHILD: function CHILD(a) {
	          return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a;
	        }, PSEUDO: function PSEUDO(a) {
	          var b,
	              c = !a[6] && a[2];return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3));
	        } }, filter: { TAG: function TAG(a) {
	          var b = a.replace(ca, da).toLowerCase();return "*" === a ? function () {
	            return !0;
	          } : function (a) {
	            return a.nodeName && a.nodeName.toLowerCase() === b;
	          };
	        }, CLASS: function CLASS(a) {
	          var b = y[a + " "];return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function (a) {
	            return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "");
	          });
	        }, ATTR: function ATTR(a, b, c) {
	          return function (d) {
	            var e = ga.attr(d, a);return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(Q, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0;
	          };
	        }, CHILD: function CHILD(a, b, c, d, e) {
	          var f = "nth" !== a.slice(0, 3),
	              g = "last" !== a.slice(-4),
	              h = "of-type" === b;return 1 === d && 0 === e ? function (a) {
	            return !!a.parentNode;
	          } : function (b, c, i) {
	            var j,
	                k,
	                l,
	                m,
	                n,
	                o,
	                p = f !== g ? "nextSibling" : "previousSibling",
	                q = b.parentNode,
	                r = h && b.nodeName.toLowerCase(),
	                s = !i && !h;if (q) {
	              if (f) {
	                while (p) {
	                  l = b;while (l = l[p]) {
	                    if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
	                  }o = p = "only" === a && !o && "nextSibling";
	                }return !0;
	              }if ((o = [g ? q.firstChild : q.lastChild], g && s)) {
	                k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) {
	                  if (1 === l.nodeType && ++m && l === b) {
	                    k[a] = [w, n, m];break;
	                  }
	                }
	              } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w) m = j[1];else while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) {
	                if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b)) break;
	              }return m -= e, m === d || m % d === 0 && m / d >= 0;
	            }
	          };
	        }, PSEUDO: function PSEUDO(a, b) {
	          var c,
	              e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function (a, c) {
	            var d,
	                f = e(a, b),
	                g = f.length;while (g--) {
	              d = J(a, f[g]), a[d] = !(c[d] = f[g]);
	            }
	          }) : function (a) {
	            return e(a, 0, c);
	          }) : e;
	        } }, pseudos: { not: ia(function (a) {
	          var b = [],
	              c = [],
	              d = h(a.replace(R, "$1"));return d[u] ? ia(function (a, b, c, e) {
	            var f,
	                g = d(a, null, e, []),
	                h = a.length;while (h--) {
	              (f = g[h]) && (a[h] = !(b[h] = f));
	            }
	          }) : function (a, e, f) {
	            return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop();
	          };
	        }), has: ia(function (a) {
	          return function (b) {
	            return ga(a, b).length > 0;
	          };
	        }), contains: ia(function (a) {
	          return a = a.replace(ca, da), function (b) {
	            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
	          };
	        }), lang: ia(function (a) {
	          return W.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(ca, da).toLowerCase(), function (b) {
	            var c;do {
	              if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
	            } while ((b = b.parentNode) && 1 === b.nodeType);return !1;
	          };
	        }), target: function target(b) {
	          var c = a.location && a.location.hash;return c && c.slice(1) === b.id;
	        }, root: function root(a) {
	          return a === o;
	        }, focus: function focus(a) {
	          return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
	        }, enabled: function enabled(a) {
	          return a.disabled === !1;
	        }, disabled: function disabled(a) {
	          return a.disabled === !0;
	        }, checked: function checked(a) {
	          var b = a.nodeName.toLowerCase();return "input" === b && !!a.checked || "option" === b && !!a.selected;
	        }, selected: function selected(a) {
	          return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
	        }, empty: function empty(a) {
	          for (a = a.firstChild; a; a = a.nextSibling) {
	            if (a.nodeType < 6) return !1;
	          }return !0;
	        }, parent: function parent(a) {
	          return !d.pseudos.empty(a);
	        }, header: function header(a) {
	          return Z.test(a.nodeName);
	        }, input: function input(a) {
	          return Y.test(a.nodeName);
	        }, button: function button(a) {
	          var b = a.nodeName.toLowerCase();return "input" === b && "button" === a.type || "button" === b;
	        }, text: function text(a) {
	          var b;return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
	        }, first: oa(function () {
	          return [0];
	        }), last: oa(function (a, b) {
	          return [b - 1];
	        }), eq: oa(function (a, b, c) {
	          return [0 > c ? c + b : c];
	        }), even: oa(function (a, b) {
	          for (var c = 0; b > c; c += 2) {
	            a.push(c);
	          }return a;
	        }), odd: oa(function (a, b) {
	          for (var c = 1; b > c; c += 2) {
	            a.push(c);
	          }return a;
	        }), lt: oa(function (a, b, c) {
	          for (var d = 0 > c ? c + b : c; --d >= 0;) {
	            a.push(d);
	          }return a;
	        }), gt: oa(function (a, b, c) {
	          for (var d = 0 > c ? c + b : c; ++d < b;) {
	            a.push(d);
	          }return a;
	        }) } }, d.pseudos.nth = d.pseudos.eq;for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
	      d.pseudos[b] = ma(b);
	    }for (b in { submit: !0, reset: !0 }) {
	      d.pseudos[b] = na(b);
	    }function qa() {}qa.prototype = d.filters = d.pseudos, d.setFilters = new qa(), g = ga.tokenize = function (a, b) {
	      var c,
	          e,
	          f,
	          g,
	          h,
	          i,
	          j,
	          k = z[a + " "];if (k) return b ? 0 : k.slice(0);h = a, i = [], j = d.preFilter;while (h) {
	        (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({ value: c, type: e[0].replace(R, " ") }), h = h.slice(c.length));for (g in d.filter) {
	          !(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({ value: c, type: g, matches: e }), h = h.slice(c.length));
	        }if (!c) break;
	      }return b ? h.length : h ? ga.error(a) : z(a, i).slice(0);
	    };function ra(a) {
	      for (var b = 0, c = a.length, d = ""; c > b; b++) {
	        d += a[b].value;
	      }return d;
	    }function sa(a, b, c) {
	      var d = b.dir,
	          e = c && "parentNode" === d,
	          f = x++;return b.first ? function (b, c, f) {
	        while (b = b[d]) {
	          if (1 === b.nodeType || e) return a(b, c, f);
	        }
	      } : function (b, c, g) {
	        var h,
	            i,
	            j = [w, f];if (g) {
	          while (b = b[d]) {
	            if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
	          }
	        } else while (b = b[d]) {
	          if (1 === b.nodeType || e) {
	            if ((i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f)) return j[2] = h[2];if ((i[d] = j, j[2] = a(b, c, g))) return !0;
	          }
	        }
	      };
	    }function ta(a) {
	      return a.length > 1 ? function (b, c, d) {
	        var e = a.length;while (e--) {
	          if (!a[e](b, c, d)) return !1;
	        }return !0;
	      } : a[0];
	    }function ua(a, b, c) {
	      for (var d = 0, e = b.length; e > d; d++) {
	        ga(a, b[d], c);
	      }return c;
	    }function va(a, b, c, d, e) {
	      for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) {
	        (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
	      }return g;
	    }function wa(a, b, c, d, e, f) {
	      return d && !d[u] && (d = wa(d)), e && !e[u] && (e = wa(e, f)), ia(function (f, g, h, i) {
	        var j,
	            k,
	            l,
	            m = [],
	            n = [],
	            o = g.length,
	            p = f || ua(b || "*", h.nodeType ? [h] : h, []),
	            q = !a || !f && b ? p : va(p, m, a, h, i),
	            r = c ? e || (f ? a : o || d) ? [] : g : q;if ((c && c(q, r, h, i), d)) {
	          j = va(r, n), d(j, [], h, i), k = j.length;while (k--) {
	            (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
	          }
	        }if (f) {
	          if (e || a) {
	            if (e) {
	              j = [], k = r.length;while (k--) {
	                (l = r[k]) && j.push(q[k] = l);
	              }e(null, r = [], j, i);
	            }k = r.length;while (k--) {
	              (l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));
	            }
	          }
	        } else r = va(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r);
	      });
	    }function xa(a) {
	      for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = sa(function (a) {
	        return a === b;
	      }, h, !0), l = sa(function (a) {
	        return J(b, a) > -1;
	      }, h, !0), m = [function (a, c, d) {
	        var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));return b = null, e;
	      }]; f > i; i++) {
	        if (c = d.relative[a[i].type]) m = [sa(ta(m), c)];else {
	          if ((c = d.filter[a[i].type].apply(null, a[i].matches), c[u])) {
	            for (e = ++i; f > e; e++) {
	              if (d.relative[a[e].type]) break;
	            }return wa(i > 1 && ta(m), i > 1 && ra(a.slice(0, i - 1).concat({ value: " " === a[i - 2].type ? "*" : "" })).replace(R, "$1"), c, e > i && xa(a.slice(i, e)), f > e && xa(a = a.slice(e)), f > e && ra(a));
	          }m.push(c);
	        }
	      }return ta(m);
	    }function ya(a, b) {
	      var c = b.length > 0,
	          e = a.length > 0,
	          f = function f(_f, g, h, i, k) {
	        var l,
	            m,
	            o,
	            p = 0,
	            q = "0",
	            r = _f && [],
	            s = [],
	            t = j,
	            u = _f || e && d.find.TAG("*", k),
	            v = w += null == t ? 1 : Math.random() || .1,
	            x = u.length;for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
	          if (e && l) {
	            m = 0;while (o = a[m++]) {
	              if (o(l, g, h)) {
	                i.push(l);break;
	              }
	            }k && (w = v);
	          }c && ((l = !o && l) && p--, _f && r.push(l));
	        }if ((p += q, c && q !== p)) {
	          m = 0;while (o = b[m++]) {
	            o(r, s, g, h);
	          }if (_f) {
	            if (p > 0) while (q--) {
	              r[q] || s[q] || (s[q] = F.call(i));
	            }s = va(s);
	          }H.apply(i, s), k && !_f && s.length > 0 && p + b.length > 1 && ga.uniqueSort(i);
	        }return k && (w = v, j = t), r;
	      };return c ? ia(f) : f;
	    }return h = ga.compile = function (a, b) {
	      var c,
	          d = [],
	          e = [],
	          f = A[a + " "];if (!f) {
	        b || (b = g(a)), c = b.length;while (c--) {
	          f = xa(b[c]), f[u] ? d.push(f) : e.push(f);
	        }f = A(a, ya(e, d)), f.selector = a;
	      }return f;
	    }, i = ga.select = function (a, b, e, f) {
	      var i,
	          j,
	          k,
	          l,
	          m,
	          n = "function" == typeof a && a,
	          o = !f && g(a = n.selector || a);if ((e = e || [], 1 === o.length)) {
	        if ((j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type])) {
	          if ((b = (d.find.ID(k.matches[0].replace(ca, da), b) || [])[0], !b)) return e;n && (b = b.parentNode), a = a.slice(j.shift().value.length);
	        }i = X.needsContext.test(a) ? 0 : j.length;while (i--) {
	          if ((k = j[i], d.relative[l = k.type])) break;if ((m = d.find[l]) && (f = m(k.matches[0].replace(ca, da), aa.test(j[0].type) && pa(b.parentNode) || b))) {
	            if ((j.splice(i, 1), a = f.length && ra(j), !a)) return H.apply(e, f), e;break;
	          }
	        }
	      }return (n || h(a, o))(f, b, !p, e, aa.test(a) && pa(b.parentNode) || b), e;
	    }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function (a) {
	      return 1 & a.compareDocumentPosition(n.createElement("div"));
	    }), ja(function (a) {
	      return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
	    }) || ka("type|href|height|width", function (a, b, c) {
	      return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
	    }), c.attributes && ja(function (a) {
	      return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
	    }) || ka("value", function (a, b, c) {
	      return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;
	    }), ja(function (a) {
	      return null == a.getAttribute("disabled");
	    }) || ka(K, function (a, b, c) {
	      var d;return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
	    }), ga;
	  })(a);n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;var u = n.expr.match.needsContext,
	      v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	      w = /^.[^:#\[\.,]*$/;function x(a, b, c) {
	    if (n.isFunction(b)) return n.grep(a, function (a, d) {
	      return !!b.call(a, d, a) !== c;
	    });if (b.nodeType) return n.grep(a, function (a) {
	      return a === b !== c;
	    });if ("string" == typeof b) {
	      if (w.test(b)) return n.filter(b, a, c);b = n.filter(b, a);
	    }return n.grep(a, function (a) {
	      return g.call(b, a) >= 0 !== c;
	    });
	  }n.filter = function (a, b, c) {
	    var d = b[0];return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function (a) {
	      return 1 === a.nodeType;
	    }));
	  }, n.fn.extend({ find: function find(a) {
	      var b,
	          c = this.length,
	          d = [],
	          e = this;if ("string" != typeof a) return this.pushStack(n(a).filter(function () {
	        for (b = 0; c > b; b++) {
	          if (n.contains(e[b], this)) return !0;
	        }
	      }));for (b = 0; c > b; b++) {
	        n.find(a, e[b], d);
	      }return d = this.pushStack(c > 1 ? n.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d;
	    }, filter: function filter(a) {
	      return this.pushStack(x(this, a || [], !1));
	    }, not: function not(a) {
	      return this.pushStack(x(this, a || [], !0));
	    }, is: function is(a) {
	      return !!x(this, "string" == typeof a && u.test(a) ? n(a) : a || [], !1).length;
	    } });var y,
	      z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	      A = n.fn.init = function (a, b) {
	    var c, d;if (!a) return this;if ("string" == typeof a) {
	      if ((c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b)) return !b || b.jquery ? (b || y).find(a) : this.constructor(b).find(a);if (c[1]) {
	        if ((b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : l, !0)), v.test(c[1]) && n.isPlainObject(b))) for (c in b) {
	          n.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
	        }return this;
	      }return d = l.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), this.context = l, this.selector = a, this;
	    }return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? "undefined" != typeof y.ready ? y.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this));
	  };A.prototype = n.fn, y = n(l);var B = /^(?:parents|prev(?:Until|All))/,
	      C = { children: !0, contents: !0, next: !0, prev: !0 };n.extend({ dir: function dir(a, b, c) {
	      var d = [],
	          e = void 0 !== c;while ((a = a[b]) && 9 !== a.nodeType) {
	        if (1 === a.nodeType) {
	          if (e && n(a).is(c)) break;d.push(a);
	        }
	      }return d;
	    }, sibling: function sibling(a, b) {
	      for (var c = []; a; a = a.nextSibling) {
	        1 === a.nodeType && a !== b && c.push(a);
	      }return c;
	    } }), n.fn.extend({ has: function has(a) {
	      var b = n(a, this),
	          c = b.length;return this.filter(function () {
	        for (var a = 0; c > a; a++) {
	          if (n.contains(this, b[a])) return !0;
	        }
	      });
	    }, closest: function closest(a, b) {
	      for (var c, d = 0, e = this.length, f = [], g = u.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++) {
	        for (c = this[d]; c && c !== b; c = c.parentNode) {
	          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
	            f.push(c);break;
	          }
	        }
	      }return this.pushStack(f.length > 1 ? n.unique(f) : f);
	    }, index: function index(a) {
	      return a ? "string" == typeof a ? g.call(n(a), this[0]) : g.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
	    }, add: function add(a, b) {
	      return this.pushStack(n.unique(n.merge(this.get(), n(a, b))));
	    }, addBack: function addBack(a) {
	      return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
	    } });function D(a, b) {
	    while ((a = a[b]) && 1 !== a.nodeType) {}return a;
	  }n.each({ parent: function parent(a) {
	      var b = a.parentNode;return b && 11 !== b.nodeType ? b : null;
	    }, parents: function parents(a) {
	      return n.dir(a, "parentNode");
	    }, parentsUntil: function parentsUntil(a, b, c) {
	      return n.dir(a, "parentNode", c);
	    }, next: function next(a) {
	      return D(a, "nextSibling");
	    }, prev: function prev(a) {
	      return D(a, "previousSibling");
	    }, nextAll: function nextAll(a) {
	      return n.dir(a, "nextSibling");
	    }, prevAll: function prevAll(a) {
	      return n.dir(a, "previousSibling");
	    }, nextUntil: function nextUntil(a, b, c) {
	      return n.dir(a, "nextSibling", c);
	    }, prevUntil: function prevUntil(a, b, c) {
	      return n.dir(a, "previousSibling", c);
	    }, siblings: function siblings(a) {
	      return n.sibling((a.parentNode || {}).firstChild, a);
	    }, children: function children(a) {
	      return n.sibling(a.firstChild);
	    }, contents: function contents(a) {
	      return a.contentDocument || n.merge([], a.childNodes);
	    } }, function (a, b) {
	    n.fn[a] = function (c, d) {
	      var e = n.map(this, b, c);return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), this.length > 1 && (C[a] || n.unique(e), B.test(a) && e.reverse()), this.pushStack(e);
	    };
	  });var E = /\S+/g,
	      F = {};function G(a) {
	    var b = F[a] = {};return n.each(a.match(E) || [], function (a, c) {
	      b[c] = !0;
	    }), b;
	  }n.Callbacks = function (a) {
	    a = "string" == typeof a ? F[a] || G(a) : n.extend({}, a);var b,
	        c,
	        d,
	        e,
	        f,
	        g,
	        h = [],
	        i = !a.once && [],
	        j = function j(l) {
	      for (b = a.memory && l, c = !0, g = e || 0, e = 0, f = h.length, d = !0; h && f > g; g++) {
	        if (h[g].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
	          b = !1;break;
	        }
	      }d = !1, h && (i ? i.length && j(i.shift()) : b ? h = [] : k.disable());
	    },
	        k = { add: function add() {
	        if (h) {
	          var c = h.length;!(function g(b) {
	            n.each(b, function (b, c) {
	              var d = n.type(c);"function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && g(c);
	            });
	          })(arguments), d ? f = h.length : b && (e = c, j(b));
	        }return this;
	      }, remove: function remove() {
	        return h && n.each(arguments, function (a, b) {
	          var c;while ((c = n.inArray(b, h, c)) > -1) {
	            h.splice(c, 1), d && (f >= c && f--, g >= c && g--);
	          }
	        }), this;
	      }, has: function has(a) {
	        return a ? n.inArray(a, h) > -1 : !(!h || !h.length);
	      }, empty: function empty() {
	        return h = [], f = 0, this;
	      }, disable: function disable() {
	        return h = i = b = void 0, this;
	      }, disabled: function disabled() {
	        return !h;
	      }, lock: function lock() {
	        return i = void 0, b || k.disable(), this;
	      }, locked: function locked() {
	        return !i;
	      }, fireWith: function fireWith(a, b) {
	        return !h || c && !i || (b = b || [], b = [a, b.slice ? b.slice() : b], d ? i.push(b) : j(b)), this;
	      }, fire: function fire() {
	        return k.fireWith(this, arguments), this;
	      }, fired: function fired() {
	        return !!c;
	      } };return k;
	  }, n.extend({ Deferred: function Deferred(a) {
	      var b = [["resolve", "done", n.Callbacks("once memory"), "resolved"], ["reject", "fail", n.Callbacks("once memory"), "rejected"], ["notify", "progress", n.Callbacks("memory")]],
	          c = "pending",
	          d = { state: function state() {
	          return c;
	        }, always: function always() {
	          return e.done(arguments).fail(arguments), this;
	        }, then: function then() {
	          var a = arguments;return n.Deferred(function (c) {
	            n.each(b, function (b, f) {
	              var g = n.isFunction(a[b]) && a[b];e[f[1]](function () {
	                var a = g && g.apply(this, arguments);a && n.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments);
	              });
	            }), a = null;
	          }).promise();
	        }, promise: function promise(a) {
	          return null != a ? n.extend(a, d) : d;
	        } },
	          e = {};return d.pipe = d.then, n.each(b, function (a, f) {
	        var g = f[2],
	            h = f[3];d[f[1]] = g.add, h && g.add(function () {
	          c = h;
	        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
	          return e[f[0] + "With"](this === e ? d : this, arguments), this;
	        }, e[f[0] + "With"] = g.fireWith;
	      }), d.promise(e), a && a.call(e, e), e;
	    }, when: function when(a) {
	      var b = 0,
	          c = d.call(arguments),
	          e = c.length,
	          f = 1 !== e || a && n.isFunction(a.promise) ? e : 0,
	          g = 1 === f ? a : n.Deferred(),
	          h = function h(a, b, c) {
	        return function (e) {
	          b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
	        };
	      },
	          i,
	          j,
	          k;if (e > 1) for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) {
	        c[b] && n.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
	      }return f || g.resolveWith(k, c), g.promise();
	    } });var H;n.fn.ready = function (a) {
	    return n.ready.promise().done(a), this;
	  }, n.extend({ isReady: !1, readyWait: 1, holdReady: function holdReady(a) {
	      a ? n.readyWait++ : n.ready(!0);
	    }, ready: function ready(a) {
	      (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (H.resolveWith(l, [n]), n.fn.triggerHandler && (n(l).triggerHandler("ready"), n(l).off("ready"))));
	    } });function I() {
	    l.removeEventListener("DOMContentLoaded", I, !1), a.removeEventListener("load", I, !1), n.ready();
	  }n.ready.promise = function (b) {
	    return H || (H = n.Deferred(), "complete" === l.readyState ? setTimeout(n.ready) : (l.addEventListener("DOMContentLoaded", I, !1), a.addEventListener("load", I, !1))), H.promise(b);
	  }, n.ready.promise();var J = n.access = function (a, b, c, d, e, f, g) {
	    var h = 0,
	        i = a.length,
	        j = null == c;if ("object" === n.type(c)) {
	      e = !0;for (h in c) {
	        n.access(a, b, h, c[h], !0, f, g);
	      }
	    } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
	      return j.call(n(a), c);
	    })), b)) for (; i > h; h++) {
	      b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
	    }return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
	  };n.acceptData = function (a) {
	    return 1 === a.nodeType || 9 === a.nodeType || ! +a.nodeType;
	  };function K() {
	    Object.defineProperty(this.cache = {}, 0, { get: function get() {
	        return {};
	      } }), this.expando = n.expando + K.uid++;
	  }K.uid = 1, K.accepts = n.acceptData, K.prototype = { key: function key(a) {
	      if (!K.accepts(a)) return 0;var b = {},
	          c = a[this.expando];if (!c) {
	        c = K.uid++;try {
	          b[this.expando] = { value: c }, Object.defineProperties(a, b);
	        } catch (d) {
	          b[this.expando] = c, n.extend(a, b);
	        }
	      }return this.cache[c] || (this.cache[c] = {}), c;
	    }, set: function set(a, b, c) {
	      var d,
	          e = this.key(a),
	          f = this.cache[e];if ("string" == typeof b) f[b] = c;else if (n.isEmptyObject(f)) n.extend(this.cache[e], b);else for (d in b) {
	        f[d] = b[d];
	      }return f;
	    }, get: function get(a, b) {
	      var c = this.cache[this.key(a)];return void 0 === b ? c : c[b];
	    }, access: function access(a, b, c) {
	      var d;return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, n.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b);
	    }, remove: function remove(a, b) {
	      var c,
	          d,
	          e,
	          f = this.key(a),
	          g = this.cache[f];if (void 0 === b) this.cache[f] = {};else {
	        n.isArray(b) ? d = b.concat(b.map(n.camelCase)) : (e = n.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(E) || [])), c = d.length;while (c--) {
	          delete g[d[c]];
	        }
	      }
	    }, hasData: function hasData(a) {
	      return !n.isEmptyObject(this.cache[a[this.expando]] || {});
	    }, discard: function discard(a) {
	      a[this.expando] && delete this.cache[a[this.expando]];
	    } };var L = new K(),
	      M = new K(),
	      N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	      O = /([A-Z])/g;function P(a, b, c) {
	    var d;if (void 0 === c && 1 === a.nodeType) if ((d = "data-" + b.replace(O, "-$1").toLowerCase(), c = a.getAttribute(d), "string" == typeof c)) {
	      try {
	        c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : N.test(c) ? n.parseJSON(c) : c;
	      } catch (e) {}M.set(a, b, c);
	    } else c = void 0;return c;
	  }n.extend({ hasData: function hasData(a) {
	      return M.hasData(a) || L.hasData(a);
	    }, data: function data(a, b, c) {
	      return M.access(a, b, c);
	    }, removeData: function removeData(a, b) {
	      M.remove(a, b);
	    }, _data: function _data(a, b, c) {
	      return L.access(a, b, c);
	    }, _removeData: function _removeData(a, b) {
	      L.remove(a, b);
	    } }), n.fn.extend({ data: function data(a, b) {
	      var c,
	          d,
	          e,
	          f = this[0],
	          g = f && f.attributes;if (void 0 === a) {
	        if (this.length && (e = M.get(f), 1 === f.nodeType && !L.get(f, "hasDataAttrs"))) {
	          c = g.length;while (c--) {
	            g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), P(f, d, e[d])));
	          }L.set(f, "hasDataAttrs", !0);
	        }return e;
	      }return "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? this.each(function () {
	        M.set(this, a);
	      }) : J(this, function (b) {
	        var c,
	            d = n.camelCase(a);if (f && void 0 === b) {
	          if ((c = M.get(f, a), void 0 !== c)) return c;if ((c = M.get(f, d), void 0 !== c)) return c;if ((c = P(f, d, void 0), void 0 !== c)) return c;
	        } else this.each(function () {
	          var c = M.get(this, d);M.set(this, d, b), -1 !== a.indexOf("-") && void 0 !== c && M.set(this, a, b);
	        });
	      }, null, b, arguments.length > 1, null, !0);
	    }, removeData: function removeData(a) {
	      return this.each(function () {
	        M.remove(this, a);
	      });
	    } }), n.extend({ queue: function queue(a, b, c) {
	      var d;return a ? (b = (b || "fx") + "queue", d = L.get(a, b), c && (!d || n.isArray(c) ? d = L.access(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0;
	    }, dequeue: function dequeue(a, b) {
	      b = b || "fx";var c = n.queue(a, b),
	          d = c.length,
	          e = c.shift(),
	          f = n._queueHooks(a, b),
	          g = function g() {
	        n.dequeue(a, b);
	      };"inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
	    }, _queueHooks: function _queueHooks(a, b) {
	      var c = b + "queueHooks";return L.get(a, c) || L.access(a, c, { empty: n.Callbacks("once memory").add(function () {
	          L.remove(a, [b + "queue", c]);
	        }) });
	    } }), n.fn.extend({ queue: function queue(a, b) {
	      var c = 2;return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function () {
	        var c = n.queue(this, a, b);n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a);
	      });
	    }, dequeue: function dequeue(a) {
	      return this.each(function () {
	        n.dequeue(this, a);
	      });
	    }, clearQueue: function clearQueue(a) {
	      return this.queue(a || "fx", []);
	    }, promise: function promise(a, b) {
	      var c,
	          d = 1,
	          e = n.Deferred(),
	          f = this,
	          g = this.length,
	          h = function h() {
	        --d || e.resolveWith(f, [f]);
	      };"string" != typeof a && (b = a, a = void 0), a = a || "fx";while (g--) {
	        c = L.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
	      }return h(), e.promise(b);
	    } });var Q = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
	      R = ["Top", "Right", "Bottom", "Left"],
	      S = function S(a, b) {
	    return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a);
	  },
	      T = /^(?:checkbox|radio)$/i;!(function () {
	    var a = l.createDocumentFragment(),
	        b = a.appendChild(l.createElement("div")),
	        c = l.createElement("input");c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue;
	  })();var U = "undefined";k.focusinBubbles = "onfocusin" in a;var V = /^key/,
	      W = /^(?:mouse|pointer|contextmenu)|click/,
	      X = /^(?:focusinfocus|focusoutblur)$/,
	      Y = /^([^.]*)(?:\.(.+)|)$/;function Z() {
	    return !0;
	  }function $() {
	    return !1;
	  }function _() {
	    try {
	      return l.activeElement;
	    } catch (a) {}
	  }n.event = { global: {}, add: function add(a, b, c, d, e) {
	      var f,
	          g,
	          h,
	          i,
	          j,
	          k,
	          l,
	          m,
	          o,
	          p,
	          q,
	          r = L.get(a);if (r) {
	        c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = n.guid++), (i = r.events) || (i = r.events = {}), (g = r.handle) || (g = r.handle = function (b) {
	          return (typeof n === "undefined" ? "undefined" : _typeof(n)) !== U && n.event.triggered !== b.type ? n.event.dispatch.apply(a, arguments) : void 0;
	        }), b = (b || "").match(E) || [""], j = b.length;while (j--) {
	          h = Y.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o && (l = n.event.special[o] || {}, o = (e ? l.delegateType : l.bindType) || o, l = n.event.special[o] || {}, k = n.extend({ type: o, origType: q, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && n.expr.match.needsContext.test(e), namespace: p.join(".") }, f), (m = i[o]) || (m = i[o] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, p, g) !== !1 || a.addEventListener && a.addEventListener(o, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), n.event.global[o] = !0);
	        }
	      }
	    }, remove: function remove(a, b, c, d, e) {
	      var f,
	          g,
	          h,
	          i,
	          j,
	          k,
	          l,
	          m,
	          o,
	          p,
	          q,
	          r = L.hasData(a) && L.get(a);if (r && (i = r.events)) {
	        b = (b || "").match(E) || [""], j = b.length;while (j--) {
	          if ((h = Y.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o)) {
	            l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = i[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;while (f--) {
	              k = m[f], !e && q !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
	            }g && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete i[o]);
	          } else for (o in i) {
	            n.event.remove(a, o + b[j], c, d, !0);
	          }
	        }n.isEmptyObject(i) && (delete r.handle, L.remove(a, "events"));
	      }
	    }, trigger: function trigger(b, c, d, e) {
	      var f,
	          g,
	          h,
	          i,
	          k,
	          m,
	          o,
	          p = [d || l],
	          q = j.call(b, "type") ? b.type : b,
	          r = j.call(b, "namespace") ? b.namespace.split(".") : [];if ((g = h = d = d || l, 3 !== d.nodeType && 8 !== d.nodeType && !X.test(q + n.event.triggered) && (q.indexOf(".") >= 0 && (r = q.split("."), q = r.shift(), r.sort()), k = q.indexOf(":") < 0 && "on" + q, b = b[n.expando] ? b : new n.Event(q, "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b), b.isTrigger = e ? 2 : 3, b.namespace = r.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : n.makeArray(c, [b]), o = n.event.special[q] || {}, e || !o.trigger || o.trigger.apply(d, c) !== !1))) {
	        if (!e && !o.noBubble && !n.isWindow(d)) {
	          for (i = o.delegateType || q, X.test(i + q) || (g = g.parentNode); g; g = g.parentNode) {
	            p.push(g), h = g;
	          }h === (d.ownerDocument || l) && p.push(h.defaultView || h.parentWindow || a);
	        }f = 0;while ((g = p[f++]) && !b.isPropagationStopped()) {
	          b.type = f > 1 ? i : o.bindType || q, m = (L.get(g, "events") || {})[b.type] && L.get(g, "handle"), m && m.apply(g, c), m = k && g[k], m && m.apply && n.acceptData(g) && (b.result = m.apply(g, c), b.result === !1 && b.preventDefault());
	        }return b.type = q, e || b.isDefaultPrevented() || o._default && o._default.apply(p.pop(), c) !== !1 || !n.acceptData(d) || k && n.isFunction(d[q]) && !n.isWindow(d) && (h = d[k], h && (d[k] = null), n.event.triggered = q, d[q](), n.event.triggered = void 0, h && (d[k] = h)), b.result;
	      }
	    }, dispatch: function dispatch(a) {
	      a = n.event.fix(a);var b,
	          c,
	          e,
	          f,
	          g,
	          h = [],
	          i = d.call(arguments),
	          j = (L.get(this, "events") || {})[a.type] || [],
	          k = n.event.special[a.type] || {};if ((i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1)) {
	        h = n.event.handlers.call(this, a, j), b = 0;while ((f = h[b++]) && !a.isPropagationStopped()) {
	          a.currentTarget = f.elem, c = 0;while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped()) {
	            (!a.namespace_re || a.namespace_re.test(g.namespace)) && (a.handleObj = g, a.data = g.data, e = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== e && (a.result = e) === !1 && (a.preventDefault(), a.stopPropagation()));
	          }
	        }return k.postDispatch && k.postDispatch.call(this, a), a.result;
	      }
	    }, handlers: function handlers(a, b) {
	      var c,
	          d,
	          e,
	          f,
	          g = [],
	          h = b.delegateCount,
	          i = a.target;if (h && i.nodeType && (!a.button || "click" !== a.type)) for (; i !== this; i = i.parentNode || this) {
	        if (i.disabled !== !0 || "click" !== a.type) {
	          for (d = [], c = 0; h > c; c++) {
	            f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) >= 0 : n.find(e, this, null, [i]).length), d[e] && d.push(f);
	          }d.length && g.push({ elem: i, handlers: d });
	        }
	      }return h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g;
	    }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function filter(a, b) {
	        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a;
	      } }, mouseHooks: { props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function filter(a, b) {
	        var c,
	            d,
	            e,
	            f = b.button;return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || l, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a;
	      } }, fix: function fix(a) {
	      if (a[n.expando]) return a;var b,
	          c,
	          d,
	          e = a.type,
	          f = a,
	          g = this.fixHooks[e];g || (this.fixHooks[e] = g = W.test(e) ? this.mouseHooks : V.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new n.Event(f), b = d.length;while (b--) {
	        c = d[b], a[c] = f[c];
	      }return a.target || (a.target = l), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a;
	    }, special: { load: { noBubble: !0 }, focus: { trigger: function trigger() {
	          return this !== _() && this.focus ? (this.focus(), !1) : void 0;
	        }, delegateType: "focusin" }, blur: { trigger: function trigger() {
	          return this === _() && this.blur ? (this.blur(), !1) : void 0;
	        }, delegateType: "focusout" }, click: { trigger: function trigger() {
	          return "checkbox" === this.type && this.click && n.nodeName(this, "input") ? (this.click(), !1) : void 0;
	        }, _default: function _default(a) {
	          return n.nodeName(a.target, "a");
	        } }, beforeunload: { postDispatch: function postDispatch(a) {
	          void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
	        } } }, simulate: function simulate(a, b, c, d) {
	      var e = n.extend(new n.Event(), c, { type: a, isSimulated: !0, originalEvent: {} });d ? n.event.trigger(e, null, b) : n.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
	    } }, n.removeEvent = function (a, b, c) {
	    a.removeEventListener && a.removeEventListener(b, c, !1);
	  }, n.Event = function (a, b) {
	    return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? Z : $) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void (this[n.expando] = !0)) : new n.Event(a, b);
	  }, n.Event.prototype = { isDefaultPrevented: $, isPropagationStopped: $, isImmediatePropagationStopped: $, preventDefault: function preventDefault() {
	      var a = this.originalEvent;this.isDefaultPrevented = Z, a && a.preventDefault && a.preventDefault();
	    }, stopPropagation: function stopPropagation() {
	      var a = this.originalEvent;this.isPropagationStopped = Z, a && a.stopPropagation && a.stopPropagation();
	    }, stopImmediatePropagation: function stopImmediatePropagation() {
	      var a = this.originalEvent;this.isImmediatePropagationStopped = Z, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation();
	    } }, n.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (a, b) {
	    n.event.special[a] = { delegateType: b, bindType: b, handle: function handle(a) {
	        var c,
	            d = this,
	            e = a.relatedTarget,
	            f = a.handleObj;return (!e || e !== d && !n.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c;
	      } };
	  }), k.focusinBubbles || n.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
	    var c = function c(a) {
	      n.event.simulate(b, a.target, n.event.fix(a), !0);
	    };n.event.special[b] = { setup: function setup() {
	        var d = this.ownerDocument || this,
	            e = L.access(d, b);e || d.addEventListener(a, c, !0), L.access(d, b, (e || 0) + 1);
	      }, teardown: function teardown() {
	        var d = this.ownerDocument || this,
	            e = L.access(d, b) - 1;e ? L.access(d, b, e) : (d.removeEventListener(a, c, !0), L.remove(d, b));
	      } };
	  }), n.fn.extend({ on: function on(a, b, c, d, e) {
	      var f, g;if ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a))) {
	        "string" != typeof b && (c = c || b, b = void 0);for (g in a) {
	          this.on(g, b, c, a[g], e);
	        }return this;
	      }if ((null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1)) d = $;else if (!d) return this;return 1 === e && (f = d, d = function (a) {
	        return n().off(a), f.apply(this, arguments);
	      }, d.guid = f.guid || (f.guid = n.guid++)), this.each(function () {
	        n.event.add(this, a, d, c, b);
	      });
	    }, one: function one(a, b, c, d) {
	      return this.on(a, b, c, d, 1);
	    }, off: function off(a, b, c) {
	      var d, e;if (a && a.preventDefault && a.handleObj) return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;if ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a))) {
	        for (e in a) {
	          this.off(e, b, a[e]);
	        }return this;
	      }return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = $), this.each(function () {
	        n.event.remove(this, a, c, b);
	      });
	    }, trigger: function trigger(a, b) {
	      return this.each(function () {
	        n.event.trigger(a, b, this);
	      });
	    }, triggerHandler: function triggerHandler(a, b) {
	      var c = this[0];return c ? n.event.trigger(a, b, c, !0) : void 0;
	    } });var aa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	      ba = /<([\w:]+)/,
	      ca = /<|&#?\w+;/,
	      da = /<(?:script|style|link)/i,
	      ea = /checked\s*(?:[^=]|=\s*.checked.)/i,
	      fa = /^$|\/(?:java|ecma)script/i,
	      ga = /^true\/(.*)/,
	      ha = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	      ia = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };ia.optgroup = ia.option, ia.tbody = ia.tfoot = ia.colgroup = ia.caption = ia.thead, ia.th = ia.td;function ja(a, b) {
	    return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
	  }function ka(a) {
	    return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a;
	  }function la(a) {
	    var b = ga.exec(a.type);return b ? a.type = b[1] : a.removeAttribute("type"), a;
	  }function ma(a, b) {
	    for (var c = 0, d = a.length; d > c; c++) {
	      L.set(a[c], "globalEval", !b || L.get(b[c], "globalEval"));
	    }
	  }function na(a, b) {
	    var c, d, e, f, g, h, i, j;if (1 === b.nodeType) {
	      if (L.hasData(a) && (f = L.access(a), g = L.set(b, f), j = f.events)) {
	        delete g.handle, g.events = {};for (e in j) {
	          for (c = 0, d = j[e].length; d > c; c++) {
	            n.event.add(b, e, j[e][c]);
	          }
	        }
	      }M.hasData(a) && (h = M.access(a), i = n.extend({}, h), M.set(b, i));
	    }
	  }function oa(a, b) {
	    var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], c) : c;
	  }function pa(a, b) {
	    var c = b.nodeName.toLowerCase();"input" === c && T.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue);
	  }n.extend({ clone: function clone(a, b, c) {
	      var d,
	          e,
	          f,
	          g,
	          h = a.cloneNode(!0),
	          i = n.contains(a.ownerDocument, a);if (!(k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a))) for (g = oa(h), f = oa(a), d = 0, e = f.length; e > d; d++) {
	        pa(f[d], g[d]);
	      }if (b) if (c) for (f = f || oa(a), g = g || oa(h), d = 0, e = f.length; e > d; d++) {
	        na(f[d], g[d]);
	      } else na(a, h);return g = oa(h, "script"), g.length > 0 && ma(g, !i && oa(a, "script")), h;
	    }, buildFragment: function buildFragment(a, b, c, d) {
	      for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, o = a.length; o > m; m++) {
	        if ((e = a[m], e || 0 === e)) if ("object" === n.type(e)) n.merge(l, e.nodeType ? [e] : e);else if (ca.test(e)) {
	          f = f || k.appendChild(b.createElement("div")), g = (ba.exec(e) || ["", ""])[1].toLowerCase(), h = ia[g] || ia._default, f.innerHTML = h[1] + e.replace(aa, "<$1></$2>") + h[2], j = h[0];while (j--) {
	            f = f.lastChild;
	          }n.merge(l, f.childNodes), f = k.firstChild, f.textContent = "";
	        } else l.push(b.createTextNode(e));
	      }k.textContent = "", m = 0;while (e = l[m++]) {
	        if ((!d || -1 === n.inArray(e, d)) && (i = n.contains(e.ownerDocument, e), f = oa(k.appendChild(e), "script"), i && ma(f), c)) {
	          j = 0;while (e = f[j++]) {
	            fa.test(e.type || "") && c.push(e);
	          }
	        }
	      }return k;
	    }, cleanData: function cleanData(a) {
	      for (var b, c, d, e, f = n.event.special, g = 0; void 0 !== (c = a[g]); g++) {
	        if (n.acceptData(c) && (e = c[L.expando], e && (b = L.cache[e]))) {
	          if (b.events) for (d in b.events) {
	            f[d] ? n.event.remove(c, d) : n.removeEvent(c, d, b.handle);
	          }L.cache[e] && delete L.cache[e];
	        }delete M.cache[c[M.expando]];
	      }
	    } }), n.fn.extend({ text: function text(a) {
	      return J(this, function (a) {
	        return void 0 === a ? n.text(this) : this.empty().each(function () {
	          (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a);
	        });
	      }, null, a, arguments.length);
	    }, append: function append() {
	      return this.domManip(arguments, function (a) {
	        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
	          var b = ja(this, a);b.appendChild(a);
	        }
	      });
	    }, prepend: function prepend() {
	      return this.domManip(arguments, function (a) {
	        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
	          var b = ja(this, a);b.insertBefore(a, b.firstChild);
	        }
	      });
	    }, before: function before() {
	      return this.domManip(arguments, function (a) {
	        this.parentNode && this.parentNode.insertBefore(a, this);
	      });
	    }, after: function after() {
	      return this.domManip(arguments, function (a) {
	        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
	      });
	    }, remove: function remove(a, b) {
	      for (var c, d = a ? n.filter(a, this) : this, e = 0; null != (c = d[e]); e++) {
	        b || 1 !== c.nodeType || n.cleanData(oa(c)), c.parentNode && (b && n.contains(c.ownerDocument, c) && ma(oa(c, "script")), c.parentNode.removeChild(c));
	      }return this;
	    }, empty: function empty() {
	      for (var a, b = 0; null != (a = this[b]); b++) {
	        1 === a.nodeType && (n.cleanData(oa(a, !1)), a.textContent = "");
	      }return this;
	    }, clone: function clone(a, b) {
	      return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
	        return n.clone(this, a, b);
	      });
	    }, html: function html(a) {
	      return J(this, function (a) {
	        var b = this[0] || {},
	            c = 0,
	            d = this.length;if (void 0 === a && 1 === b.nodeType) return b.innerHTML;if ("string" == typeof a && !da.test(a) && !ia[(ba.exec(a) || ["", ""])[1].toLowerCase()]) {
	          a = a.replace(aa, "<$1></$2>");try {
	            for (; d > c; c++) {
	              b = this[c] || {}, 1 === b.nodeType && (n.cleanData(oa(b, !1)), b.innerHTML = a);
	            }b = 0;
	          } catch (e) {}
	        }b && this.empty().append(a);
	      }, null, a, arguments.length);
	    }, replaceWith: function replaceWith() {
	      var a = arguments[0];return this.domManip(arguments, function (b) {
	        a = this.parentNode, n.cleanData(oa(this)), a && a.replaceChild(b, this);
	      }), a && (a.length || a.nodeType) ? this : this.remove();
	    }, detach: function detach(a) {
	      return this.remove(a, !0);
	    }, domManip: function domManip(a, b) {
	      a = e.apply([], a);var c,
	          d,
	          f,
	          g,
	          h,
	          i,
	          j = 0,
	          l = this.length,
	          m = this,
	          o = l - 1,
	          p = a[0],
	          q = n.isFunction(p);if (q || l > 1 && "string" == typeof p && !k.checkClone && ea.test(p)) return this.each(function (c) {
	        var d = m.eq(c);q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b);
	      });if (l && (c = n.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 1 === c.childNodes.length && (c = d), d)) {
	        for (f = n.map(oa(c, "script"), ka), g = f.length; l > j; j++) {
	          h = c, j !== o && (h = n.clone(h, !0, !0), g && n.merge(f, oa(h, "script"))), b.call(this[j], h, j);
	        }if (g) for (i = f[f.length - 1].ownerDocument, n.map(f, la), j = 0; g > j; j++) {
	          h = f[j], fa.test(h.type || "") && !L.access(h, "globalEval") && n.contains(i, h) && (h.src ? n._evalUrl && n._evalUrl(h.src) : n.globalEval(h.textContent.replace(ha, "")));
	        }
	      }return this;
	    } }), n.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) {
	    n.fn[a] = function (a) {
	      for (var c, d = [], e = n(a), g = e.length - 1, h = 0; g >= h; h++) {
	        c = h === g ? this : this.clone(!0), n(e[h])[b](c), f.apply(d, c.get());
	      }return this.pushStack(d);
	    };
	  });var qa,
	      ra = {};function sa(b, c) {
	    var d,
	        e = n(c.createElement(b)).appendTo(c.body),
	        f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : n.css(e[0], "display");return e.detach(), f;
	  }function ta(a) {
	    var b = l,
	        c = ra[a];return c || (c = sa(a, b), "none" !== c && c || (qa = (qa || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = qa[0].contentDocument, b.write(), b.close(), c = sa(a, b), qa.detach()), ra[a] = c), c;
	  }var ua = /^margin/,
	      va = new RegExp("^(" + Q + ")(?!px)[a-z%]+$", "i"),
	      wa = function wa(b) {
	    return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null);
	  };function xa(a, b, c) {
	    var d,
	        e,
	        f,
	        g,
	        h = a.style;return c = c || wa(a), c && (g = c.getPropertyValue(b) || c[b]), c && ("" !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), va.test(g) && ua.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g;
	  }function ya(a, b) {
	    return { get: function get() {
	        return a() ? void delete this.get : (this.get = b).apply(this, arguments);
	      } };
	  }!(function () {
	    var b,
	        c,
	        d = l.documentElement,
	        e = l.createElement("div"),
	        f = l.createElement("div");if (f.style) {
	      (function () {
	        var g = function g() {
	          f.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", f.innerHTML = "", d.appendChild(e);var g = a.getComputedStyle(f, null);b = "1%" !== g.top, c = "4px" === g.width, d.removeChild(e);
	        };
	
	        f.style.backgroundClip = "content-box", f.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === f.style.backgroundClip, e.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", e.appendChild(f);a.getComputedStyle && n.extend(k, { pixelPosition: function pixelPosition() {
	            return g(), b;
	          }, boxSizingReliable: function boxSizingReliable() {
	            return null == c && g(), c;
	          }, reliableMarginRight: function reliableMarginRight() {
	            var b,
	                c = f.appendChild(l.createElement("div"));return c.style.cssText = f.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", f.style.width = "1px", d.appendChild(e), b = !parseFloat(a.getComputedStyle(c, null).marginRight), d.removeChild(e), f.removeChild(c), b;
	          } });
	      })();
	    }
	  })(), n.swap = function (a, b, c, d) {
	    var e,
	        f,
	        g = {};for (f in b) {
	      g[f] = a.style[f], a.style[f] = b[f];
	    }e = c.apply(a, d || []);for (f in b) {
	      a.style[f] = g[f];
	    }return e;
	  };var za = /^(none|table(?!-c[ea]).+)/,
	      Aa = new RegExp("^(" + Q + ")(.*)$", "i"),
	      Ba = new RegExp("^([+-])=(" + Q + ")", "i"),
	      Ca = { position: "absolute", visibility: "hidden", display: "block" },
	      Da = { letterSpacing: "0", fontWeight: "400" },
	      Ea = ["Webkit", "O", "Moz", "ms"];function Fa(a, b) {
	    if (b in a) return b;var c = b[0].toUpperCase() + b.slice(1),
	        d = b,
	        e = Ea.length;while (e--) {
	      if ((b = Ea[e] + c, b in a)) return b;
	    }return d;
	  }function Ga(a, b, c) {
	    var d = Aa.exec(b);return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
	  }function Ha(a, b, c, d, e) {
	    for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) {
	      "margin" === c && (g += n.css(a, c + R[f], !0, e)), d ? ("content" === c && (g -= n.css(a, "padding" + R[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + R[f] + "Width", !0, e))) : (g += n.css(a, "padding" + R[f], !0, e), "padding" !== c && (g += n.css(a, "border" + R[f] + "Width", !0, e)));
	    }return g;
	  }function Ia(a, b, c) {
	    var d = !0,
	        e = "width" === b ? a.offsetWidth : a.offsetHeight,
	        f = wa(a),
	        g = "border-box" === n.css(a, "boxSizing", !1, f);if (0 >= e || null == e) {
	      if ((e = xa(a, b, f), (0 > e || null == e) && (e = a.style[b]), va.test(e))) return e;d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0;
	    }return e + Ha(a, b, c || (g ? "border" : "content"), d, f) + "px";
	  }function Ja(a, b) {
	    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) {
	      d = a[g], d.style && (f[g] = L.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && S(d) && (f[g] = L.access(d, "olddisplay", ta(d.nodeName)))) : (e = S(d), "none" === c && e || L.set(d, "olddisplay", e ? c : n.css(d, "display"))));
	    }for (g = 0; h > g; g++) {
	      d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
	    }return a;
	  }n.extend({ cssHooks: { opacity: { get: function get(a, b) {
	          if (b) {
	            var c = xa(a, "opacity");return "" === c ? "1" : c;
	          }
	        } } }, cssNumber: { columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": "cssFloat" }, style: function style(a, b, c, d) {
	      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
	        var e,
	            f,
	            g,
	            h = n.camelCase(b),
	            i = a.style;return b = n.cssProps[h] || (n.cssProps[h] = Fa(i, h)), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c === "undefined" ? "undefined" : _typeof(c), "string" === f && (e = Ba.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(n.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || n.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0);
	      }
	    }, css: function css(a, b, c, d) {
	      var e,
	          f,
	          g,
	          h = n.camelCase(b);return b = n.cssProps[h] || (n.cssProps[h] = Fa(a.style, h)), g = n.cssHooks[b] || n.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = xa(a, b, d)), "normal" === e && b in Da && (e = Da[b]), "" === c || c ? (f = parseFloat(e), c === !0 || n.isNumeric(f) ? f || 0 : e) : e;
	    } }), n.each(["height", "width"], function (a, b) {
	    n.cssHooks[b] = { get: function get(a, c, d) {
	        return c ? za.test(n.css(a, "display")) && 0 === a.offsetWidth ? n.swap(a, Ca, function () {
	          return Ia(a, b, d);
	        }) : Ia(a, b, d) : void 0;
	      }, set: function set(a, c, d) {
	        var e = d && wa(a);return Ga(a, c, d ? Ha(a, b, d, "border-box" === n.css(a, "boxSizing", !1, e), e) : 0);
	      } };
	  }), n.cssHooks.marginRight = ya(k.reliableMarginRight, function (a, b) {
	    return b ? n.swap(a, { display: "inline-block" }, xa, [a, "marginRight"]) : void 0;
	  }), n.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
	    n.cssHooks[a + b] = { expand: function expand(c) {
	        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) {
	          e[a + R[d] + b] = f[d] || f[d - 2] || f[0];
	        }return e;
	      } }, ua.test(a) || (n.cssHooks[a + b].set = Ga);
	  }), n.fn.extend({ css: function css(a, b) {
	      return J(this, function (a, b, c) {
	        var d,
	            e,
	            f = {},
	            g = 0;if (n.isArray(b)) {
	          for (d = wa(a), e = b.length; e > g; g++) {
	            f[b[g]] = n.css(a, b[g], !1, d);
	          }return f;
	        }return void 0 !== c ? n.style(a, b, c) : n.css(a, b);
	      }, a, b, arguments.length > 1);
	    }, show: function show() {
	      return Ja(this, !0);
	    }, hide: function hide() {
	      return Ja(this);
	    }, toggle: function toggle(a) {
	      return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
	        S(this) ? n(this).show() : n(this).hide();
	      });
	    } });function Ka(a, b, c, d, e) {
	    return new Ka.prototype.init(a, b, c, d, e);
	  }n.Tween = Ka, Ka.prototype = { constructor: Ka, init: function init(a, b, c, d, e, f) {
	      this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px");
	    }, cur: function cur() {
	      var a = Ka.propHooks[this.prop];return a && a.get ? a.get(this) : Ka.propHooks._default.get(this);
	    }, run: function run(a) {
	      var b,
	          c = Ka.propHooks[this.prop];return this.options.duration ? this.pos = b = n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Ka.propHooks._default.set(this), this;
	    } }, Ka.prototype.init.prototype = Ka.prototype, Ka.propHooks = { _default: { get: function get(a) {
	        var b;return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = n.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop];
	      }, set: function set(a) {
	        n.fx.step[a.prop] ? n.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[n.cssProps[a.prop]] || n.cssHooks[a.prop]) ? n.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;
	      } } }, Ka.propHooks.scrollTop = Ka.propHooks.scrollLeft = { set: function set(a) {
	      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
	    } }, n.easing = { linear: function linear(a) {
	      return a;
	    }, swing: function swing(a) {
	      return .5 - Math.cos(a * Math.PI) / 2;
	    } }, n.fx = Ka.prototype.init, n.fx.step = {};var La,
	      Ma,
	      Na = /^(?:toggle|show|hide)$/,
	      Oa = new RegExp("^(?:([+-])=|)(" + Q + ")([a-z%]*)$", "i"),
	      Pa = /queueHooks$/,
	      Qa = [Va],
	      Ra = { "*": [function (a, b) {
	      var c = this.createTween(a, b),
	          d = c.cur(),
	          e = Oa.exec(b),
	          f = e && e[3] || (n.cssNumber[a] ? "" : "px"),
	          g = (n.cssNumber[a] || "px" !== f && +d) && Oa.exec(n.css(c.elem, a)),
	          h = 1,
	          i = 20;if (g && g[3] !== f) {
	        f = f || g[3], e = e || [], g = +d || 1;do {
	          h = h || ".5", g /= h, n.style(c.elem, a, g + f);
	        } while (h !== (h = c.cur() / d) && 1 !== h && --i);
	      }return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c;
	    }] };function Sa() {
	    return setTimeout(function () {
	      La = void 0;
	    }), La = n.now();
	  }function Ta(a, b) {
	    var c,
	        d = 0,
	        e = { height: a };for (b = b ? 1 : 0; 4 > d; d += 2 - b) {
	      c = R[d], e["margin" + c] = e["padding" + c] = a;
	    }return b && (e.opacity = e.width = a), e;
	  }function Ua(a, b, c) {
	    for (var d, e = (Ra[b] || []).concat(Ra["*"]), f = 0, g = e.length; g > f; f++) {
	      if (d = e[f].call(c, b, a)) return d;
	    }
	  }function Va(a, b, c) {
	    var d,
	        e,
	        f,
	        g,
	        h,
	        i,
	        j,
	        k,
	        l = this,
	        m = {},
	        o = a.style,
	        p = a.nodeType && S(a),
	        q = L.get(a, "fxshow");c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
	      h.unqueued || i();
	    }), h.unqueued++, l.always(function () {
	      l.always(function () {
	        h.unqueued--, n.queue(a, "fx").length || h.empty.fire();
	      });
	    })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = n.css(a, "display"), k = "none" === j ? L.get(a, "olddisplay") || ta(a.nodeName) : j, "inline" === k && "none" === n.css(a, "float") && (o.display = "inline-block")), c.overflow && (o.overflow = "hidden", l.always(function () {
	      o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2];
	    }));for (d in b) {
	      if ((e = b[d], Na.exec(e))) {
	        if ((delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show"))) {
	          if ("show" !== e || !q || void 0 === q[d]) continue;p = !0;
	        }m[d] = q && q[d] || n.style(a, d);
	      } else j = void 0;
	    }if (n.isEmptyObject(m)) "inline" === ("none" === j ? ta(a.nodeName) : j) && (o.display = j);else {
	      q ? "hidden" in q && (p = q.hidden) : q = L.access(a, "fxshow", {}), f && (q.hidden = !p), p ? n(a).show() : l.done(function () {
	        n(a).hide();
	      }), l.done(function () {
	        var b;L.remove(a, "fxshow");for (b in m) {
	          n.style(a, b, m[b]);
	        }
	      });for (d in m) {
	        g = Ua(p ? q[d] : 0, d, l), d in q || (q[d] = g.start, p && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0));
	      }
	    }
	  }function Wa(a, b) {
	    var c, d, e, f, g;for (c in a) {
	      if ((d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g)) {
	        f = g.expand(f), delete a[d];for (c in f) {
	          c in a || (a[c] = f[c], b[c] = e);
	        }
	      } else b[d] = e;
	    }
	  }function Xa(a, b, c) {
	    var d,
	        e,
	        f = 0,
	        g = Qa.length,
	        h = n.Deferred().always(function () {
	      delete i.elem;
	    }),
	        i = function i() {
	      if (e) return !1;for (var b = La || Sa(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) {
	        j.tweens[g].run(f);
	      }return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1);
	    },
	        j = h.promise({ elem: a, props: n.extend({}, b), opts: n.extend(!0, { specialEasing: {} }, c), originalProperties: b, originalOptions: c, startTime: La || Sa(), duration: c.duration, tweens: [], createTween: function createTween(b, c) {
	        var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);return j.tweens.push(d), d;
	      }, stop: function stop(b) {
	        var c = 0,
	            d = b ? j.tweens.length : 0;if (e) return this;for (e = !0; d > c; c++) {
	          j.tweens[c].run(1);
	        }return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this;
	      } }),
	        k = j.props;for (Wa(k, j.opts.specialEasing); g > f; f++) {
	      if (d = Qa[f].call(j, a, k, j.opts)) return d;
	    }return n.map(k, Ua, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, { elem: a, anim: j, queue: j.opts.queue })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
	  }n.Animation = n.extend(Xa, { tweener: function tweener(a, b) {
	      n.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");for (var c, d = 0, e = a.length; e > d; d++) {
	        c = a[d], Ra[c] = Ra[c] || [], Ra[c].unshift(b);
	      }
	    }, prefilter: function prefilter(a, b) {
	      b ? Qa.unshift(a) : Qa.push(a);
	    } }), n.speed = function (a, b, c) {
	    var d = a && "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? n.extend({}, a) : { complete: c || !c && b || n.isFunction(a) && a, duration: a, easing: c && b || b && !n.isFunction(b) && b };return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function () {
	      n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue);
	    }, d;
	  }, n.fn.extend({ fadeTo: function fadeTo(a, b, c, d) {
	      return this.filter(S).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d);
	    }, animate: function animate(a, b, c, d) {
	      var e = n.isEmptyObject(a),
	          f = n.speed(b, c, d),
	          g = function g() {
	        var b = Xa(this, n.extend({}, a), f);(e || L.get(this, "finish")) && b.stop(!0);
	      };return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
	    }, stop: function stop(a, b, c) {
	      var d = function d(a) {
	        var b = a.stop;delete a.stop, b(c);
	      };return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
	        var b = !0,
	            e = null != a && a + "queueHooks",
	            f = n.timers,
	            g = L.get(this);if (e) g[e] && g[e].stop && d(g[e]);else for (e in g) {
	          g[e] && g[e].stop && Pa.test(e) && d(g[e]);
	        }for (e = f.length; e--;) {
	          f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
	        }(b || !c) && n.dequeue(this, a);
	      });
	    }, finish: function finish(a) {
	      return a !== !1 && (a = a || "fx"), this.each(function () {
	        var b,
	            c = L.get(this),
	            d = c[a + "queue"],
	            e = c[a + "queueHooks"],
	            f = n.timers,
	            g = d ? d.length : 0;for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) {
	          f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
	        }for (b = 0; g > b; b++) {
	          d[b] && d[b].finish && d[b].finish.call(this);
	        }delete c.finish;
	      });
	    } }), n.each(["toggle", "show", "hide"], function (a, b) {
	    var c = n.fn[b];n.fn[b] = function (a, d, e) {
	      return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(Ta(b, !0), a, d, e);
	    };
	  }), n.each({ slideDown: Ta("show"), slideUp: Ta("hide"), slideToggle: Ta("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (a, b) {
	    n.fn[a] = function (a, c, d) {
	      return this.animate(b, a, c, d);
	    };
	  }), n.timers = [], n.fx.tick = function () {
	    var a,
	        b = 0,
	        c = n.timers;for (La = n.now(); b < c.length; b++) {
	      a = c[b], a() || c[b] !== a || c.splice(b--, 1);
	    }c.length || n.fx.stop(), La = void 0;
	  }, n.fx.timer = function (a) {
	    n.timers.push(a), a() ? n.fx.start() : n.timers.pop();
	  }, n.fx.interval = 13, n.fx.start = function () {
	    Ma || (Ma = setInterval(n.fx.tick, n.fx.interval));
	  }, n.fx.stop = function () {
	    clearInterval(Ma), Ma = null;
	  }, n.fx.speeds = { slow: 600, fast: 200, _default: 400 }, n.fn.delay = function (a, b) {
	    return a = n.fx ? n.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
	      var d = setTimeout(b, a);c.stop = function () {
	        clearTimeout(d);
	      };
	    });
	  }, (function () {
	    var a = l.createElement("input"),
	        b = l.createElement("select"),
	        c = b.appendChild(l.createElement("option"));a.type = "checkbox", k.checkOn = "" !== a.value, k.optSelected = c.selected, b.disabled = !0, k.optDisabled = !c.disabled, a = l.createElement("input"), a.value = "t", a.type = "radio", k.radioValue = "t" === a.value;
	  })();var Ya,
	      Za,
	      $a = n.expr.attrHandle;n.fn.extend({ attr: function attr(a, b) {
	      return J(this, n.attr, a, b, arguments.length > 1);
	    }, removeAttr: function removeAttr(a) {
	      return this.each(function () {
	        n.removeAttr(this, a);
	      });
	    } }), n.extend({ attr: function attr(a, b, c) {
	      var d,
	          e,
	          f = a.nodeType;if (a && 3 !== f && 8 !== f && 2 !== f) return _typeof(a.getAttribute) === U ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), d = n.attrHooks[b] || (n.expr.match.bool.test(b) ? Za : Ya)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = n.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void n.removeAttr(a, b));
	    }, removeAttr: function removeAttr(a, b) {
	      var c,
	          d,
	          e = 0,
	          f = b && b.match(E);if (f && 1 === a.nodeType) while (c = f[e++]) {
	        d = n.propFix[c] || c, n.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c);
	      }
	    }, attrHooks: { type: { set: function set(a, b) {
	          if (!k.radioValue && "radio" === b && n.nodeName(a, "input")) {
	            var c = a.value;return a.setAttribute("type", b), c && (a.value = c), b;
	          }
	        } } } }), Za = { set: function set(a, b, c) {
	      return b === !1 ? n.removeAttr(a, c) : a.setAttribute(c, c), c;
	    } }, n.each(n.expr.match.bool.source.match(/\w+/g), function (a, b) {
	    var c = $a[b] || n.find.attr;$a[b] = function (a, b, d) {
	      var e, f;return d || (f = $a[b], $a[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, $a[b] = f), e;
	    };
	  });var _a = /^(?:input|select|textarea|button)$/i;n.fn.extend({ prop: function prop(a, b) {
	      return J(this, n.prop, a, b, arguments.length > 1);
	    }, removeProp: function removeProp(a) {
	      return this.each(function () {
	        delete this[n.propFix[a] || a];
	      });
	    } }), n.extend({ propFix: { "for": "htmlFor", "class": "className" }, prop: function prop(a, b, c) {
	      var d,
	          e,
	          f,
	          g = a.nodeType;if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !n.isXMLDoc(a), f && (b = n.propFix[b] || b, e = n.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b];
	    }, propHooks: { tabIndex: { get: function get(a) {
	          return a.hasAttribute("tabindex") || _a.test(a.nodeName) || a.href ? a.tabIndex : -1;
	        } } } }), k.optSelected || (n.propHooks.selected = { get: function get(a) {
	      var b = a.parentNode;return b && b.parentNode && b.parentNode.selectedIndex, null;
	    } }), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
	    n.propFix[this.toLowerCase()] = this;
	  });var ab = /[\t\r\n\f]/g;n.fn.extend({ addClass: function addClass(a) {
	      var b,
	          c,
	          d,
	          e,
	          f,
	          g,
	          h = "string" == typeof a && a,
	          i = 0,
	          j = this.length;if (n.isFunction(a)) return this.each(function (b) {
	        n(this).addClass(a.call(this, b, this.className));
	      });if (h) for (b = (a || "").match(E) || []; j > i; i++) {
	        if ((c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ab, " ") : " "))) {
	          f = 0;while (e = b[f++]) {
	            d.indexOf(" " + e + " ") < 0 && (d += e + " ");
	          }g = n.trim(d), c.className !== g && (c.className = g);
	        }
	      }return this;
	    }, removeClass: function removeClass(a) {
	      var b,
	          c,
	          d,
	          e,
	          f,
	          g,
	          h = 0 === arguments.length || "string" == typeof a && a,
	          i = 0,
	          j = this.length;if (n.isFunction(a)) return this.each(function (b) {
	        n(this).removeClass(a.call(this, b, this.className));
	      });if (h) for (b = (a || "").match(E) || []; j > i; i++) {
	        if ((c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ab, " ") : ""))) {
	          f = 0;while (e = b[f++]) {
	            while (d.indexOf(" " + e + " ") >= 0) {
	              d = d.replace(" " + e + " ", " ");
	            }
	          }g = a ? n.trim(d) : "", c.className !== g && (c.className = g);
	        }
	      }return this;
	    }, toggleClass: function toggleClass(a, b) {
	      var c = typeof a === "undefined" ? "undefined" : _typeof(a);return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(n.isFunction(a) ? function (c) {
	        n(this).toggleClass(a.call(this, c, this.className, b), b);
	      } : function () {
	        if ("string" === c) {
	          var b,
	              d = 0,
	              e = n(this),
	              f = a.match(E) || [];while (b = f[d++]) {
	            e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
	          }
	        } else (c === U || "boolean" === c) && (this.className && L.set(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : L.get(this, "__className__") || "");
	      });
	    }, hasClass: function hasClass(a) {
	      for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++) {
	        if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(ab, " ").indexOf(b) >= 0) return !0;
	      }return !1;
	    } });var bb = /\r/g;n.fn.extend({ val: function val(a) {
	      var b,
	          c,
	          d,
	          e = this[0];{
	        if (arguments.length) return d = n.isFunction(a), this.each(function (c) {
	          var e;1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function (a) {
	            return null == a ? "" : a + "";
	          })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
	        });if (e) return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(bb, "") : null == c ? "" : c);
	      }
	    } }), n.extend({ valHooks: { option: { get: function get(a) {
	          var b = n.find.attr(a, "value");return null != b ? b : n.trim(n.text(a));
	        } }, select: { get: function get(a) {
	          for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) {
	            if ((c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && n.nodeName(c.parentNode, "optgroup")))) {
	              if ((b = n(c).val(), f)) return b;g.push(b);
	            }
	          }return g;
	        }, set: function set(a, b) {
	          var c,
	              d,
	              e = a.options,
	              f = n.makeArray(b),
	              g = e.length;while (g--) {
	            d = e[g], (d.selected = n.inArray(d.value, f) >= 0) && (c = !0);
	          }return c || (a.selectedIndex = -1), f;
	        } } } }), n.each(["radio", "checkbox"], function () {
	    n.valHooks[this] = { set: function set(a, b) {
	        return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) >= 0 : void 0;
	      } }, k.checkOn || (n.valHooks[this].get = function (a) {
	      return null === a.getAttribute("value") ? "on" : a.value;
	    });
	  }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
	    n.fn[b] = function (a, c) {
	      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
	    };
	  }), n.fn.extend({ hover: function hover(a, b) {
	      return this.mouseenter(a).mouseleave(b || a);
	    }, bind: function bind(a, b, c) {
	      return this.on(a, null, b, c);
	    }, unbind: function unbind(a, b) {
	      return this.off(a, null, b);
	    }, delegate: function delegate(a, b, c, d) {
	      return this.on(b, a, c, d);
	    }, undelegate: function undelegate(a, b, c) {
	      return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
	    } });var cb = n.now(),
	      db = /\?/;n.parseJSON = function (a) {
	    return JSON.parse(a + "");
	  }, n.parseXML = function (a) {
	    var b, c;if (!a || "string" != typeof a) return null;try {
	      c = new DOMParser(), b = c.parseFromString(a, "text/xml");
	    } catch (d) {
	      b = void 0;
	    }return (!b || b.getElementsByTagName("parsererror").length) && n.error("Invalid XML: " + a), b;
	  };var eb = /#.*$/,
	      fb = /([?&])_=[^&]*/,
	      gb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
	      hb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	      ib = /^(?:GET|HEAD)$/,
	      jb = /^\/\//,
	      kb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
	      lb = {},
	      mb = {},
	      nb = "*/".concat("*"),
	      ob = a.location.href,
	      pb = kb.exec(ob.toLowerCase()) || [];function qb(a) {
	    return function (b, c) {
	      "string" != typeof b && (c = b, b = "*");var d,
	          e = 0,
	          f = b.toLowerCase().match(E) || [];if (n.isFunction(c)) while (d = f[e++]) {
	        "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
	      }
	    };
	  }function rb(a, b, c, d) {
	    var e = {},
	        f = a === mb;function g(h) {
	      var i;return e[h] = !0, n.each(a[h] || [], function (a, h) {
	        var j = h(b, c, d);return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1);
	      }), i;
	    }return g(b.dataTypes[0]) || !e["*"] && g("*");
	  }function sb(a, b) {
	    var c,
	        d,
	        e = n.ajaxSettings.flatOptions || {};for (c in b) {
	      void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
	    }return d && n.extend(!0, a, d), a;
	  }function tb(a, b, c) {
	    var d,
	        e,
	        f,
	        g,
	        h = a.contents,
	        i = a.dataTypes;while ("*" === i[0]) {
	      i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
	    }if (d) for (e in h) {
	      if (h[e] && h[e].test(d)) {
	        i.unshift(e);break;
	      }
	    }if (i[0] in c) f = i[0];else {
	      for (e in c) {
	        if (!i[0] || a.converters[e + " " + i[0]]) {
	          f = e;break;
	        }g || (g = e);
	      }f = f || g;
	    }return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
	  }function ub(a, b, c, d) {
	    var e,
	        f,
	        g,
	        h,
	        i,
	        j = {},
	        k = a.dataTypes.slice();if (k[1]) for (g in a.converters) {
	      j[g.toLowerCase()] = a.converters[g];
	    }f = k.shift();while (f) {
	      if ((a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())) if ("*" === f) f = i;else if ("*" !== i && i !== f) {
	        if ((g = j[i + " " + f] || j["* " + f], !g)) for (e in j) {
	          if ((h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]]))) {
	            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));break;
	          }
	        }if (g !== !0) if (g && a["throws"]) b = g(b);else try {
	          b = g(b);
	        } catch (l) {
	          return { state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f };
	        }
	      }
	    }return { state: "success", data: b };
	  }n.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: ob, type: "GET", isLocal: hb.test(pb[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": nb, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": n.parseJSON, "text xml": n.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function ajaxSetup(a, b) {
	      return b ? sb(sb(a, n.ajaxSettings), b) : sb(n.ajaxSettings, a);
	    }, ajaxPrefilter: qb(lb), ajaxTransport: qb(mb), ajax: function ajax(a, b) {
	      "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) && (b = a, a = void 0), b = b || {};var c,
	          d,
	          e,
	          f,
	          g,
	          h,
	          i,
	          j,
	          k = n.ajaxSetup({}, b),
	          l = k.context || k,
	          m = k.context && (l.nodeType || l.jquery) ? n(l) : n.event,
	          o = n.Deferred(),
	          p = n.Callbacks("once memory"),
	          q = k.statusCode || {},
	          r = {},
	          s = {},
	          t = 0,
	          u = "canceled",
	          v = { readyState: 0, getResponseHeader: function getResponseHeader(a) {
	          var b;if (2 === t) {
	            if (!f) {
	              f = {};while (b = gb.exec(e)) {
	                f[b[1].toLowerCase()] = b[2];
	              }
	            }b = f[a.toLowerCase()];
	          }return null == b ? null : b;
	        }, getAllResponseHeaders: function getAllResponseHeaders() {
	          return 2 === t ? e : null;
	        }, setRequestHeader: function setRequestHeader(a, b) {
	          var c = a.toLowerCase();return t || (a = s[c] = s[c] || a, r[a] = b), this;
	        }, overrideMimeType: function overrideMimeType(a) {
	          return t || (k.mimeType = a), this;
	        }, statusCode: function statusCode(a) {
	          var b;if (a) if (2 > t) for (b in a) {
	            q[b] = [q[b], a[b]];
	          } else v.always(a[v.status]);return this;
	        }, abort: function abort(a) {
	          var b = a || u;return c && c.abort(b), x(0, b), this;
	        } };if ((o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || ob) + "").replace(eb, "").replace(jb, pb[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = n.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (h = kb.exec(k.url.toLowerCase()), k.crossDomain = !(!h || h[1] === pb[1] && h[2] === pb[2] && (h[3] || ("http:" === h[1] ? "80" : "443")) === (pb[3] || ("http:" === pb[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = n.param(k.data, k.traditional)), rb(lb, k, b, v), 2 === t)) return v;i = n.event && k.global, i && 0 === n.active++ && n.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !ib.test(k.type), d = k.url, k.hasContent || (k.data && (d = k.url += (db.test(d) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = fb.test(d) ? d.replace(fb, "$1_=" + cb++) : d + (db.test(d) ? "&" : "?") + "_=" + cb++)), k.ifModified && (n.lastModified[d] && v.setRequestHeader("If-Modified-Since", n.lastModified[d]), n.etag[d] && v.setRequestHeader("If-None-Match", n.etag[d])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + nb + "; q=0.01" : "") : k.accepts["*"]);for (j in k.headers) {
	        v.setRequestHeader(j, k.headers[j]);
	      }if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) return v.abort();u = "abort";for (j in { success: 1, error: 1, complete: 1 }) {
	        v[j](k[j]);
	      }if (c = rb(mb, k, b, v)) {
	        v.readyState = 1, i && m.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function () {
	          v.abort("timeout");
	        }, k.timeout));try {
	          t = 1, c.send(r, x);
	        } catch (w) {
	          if (!(2 > t)) throw w;x(-1, w);
	        }
	      } else x(-1, "No Transport");function x(a, b, f, h) {
	        var j,
	            r,
	            s,
	            u,
	            w,
	            x = b;2 !== t && (t = 2, g && clearTimeout(g), c = void 0, e = h || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, f && (u = tb(k, v, f)), u = ub(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (n.lastModified[d] = w), w = v.getResponseHeader("etag"), w && (n.etag[d] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, i && m.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), i && (m.trigger("ajaxComplete", [v, k]), --n.active || n.event.trigger("ajaxStop")));
	      }return v;
	    }, getJSON: function getJSON(a, b, c) {
	      return n.get(a, b, c, "json");
	    }, getScript: function getScript(a, b) {
	      return n.get(a, void 0, b, "script");
	    } }), n.each(["get", "post"], function (a, b) {
	    n[b] = function (a, c, d, e) {
	      return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax({ url: a, type: b, dataType: e, data: c, success: d });
	    };
	  }), n._evalUrl = function (a) {
	    return n.ajax({ url: a, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 });
	  }, n.fn.extend({ wrapAll: function wrapAll(a) {
	      var b;return n.isFunction(a) ? this.each(function (b) {
	        n(this).wrapAll(a.call(this, b));
	      }) : (this[0] && (b = n(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
	        var a = this;while (a.firstElementChild) {
	          a = a.firstElementChild;
	        }return a;
	      }).append(this)), this);
	    }, wrapInner: function wrapInner(a) {
	      return this.each(n.isFunction(a) ? function (b) {
	        n(this).wrapInner(a.call(this, b));
	      } : function () {
	        var b = n(this),
	            c = b.contents();c.length ? c.wrapAll(a) : b.append(a);
	      });
	    }, wrap: function wrap(a) {
	      var b = n.isFunction(a);return this.each(function (c) {
	        n(this).wrapAll(b ? a.call(this, c) : a);
	      });
	    }, unwrap: function unwrap() {
	      return this.parent().each(function () {
	        n.nodeName(this, "body") || n(this).replaceWith(this.childNodes);
	      }).end();
	    } }), n.expr.filters.hidden = function (a) {
	    return a.offsetWidth <= 0 && a.offsetHeight <= 0;
	  }, n.expr.filters.visible = function (a) {
	    return !n.expr.filters.hidden(a);
	  };var vb = /%20/g,
	      wb = /\[\]$/,
	      xb = /\r?\n/g,
	      yb = /^(?:submit|button|image|reset|file)$/i,
	      zb = /^(?:input|select|textarea|keygen)/i;function Ab(a, b, c, d) {
	    var e;if (n.isArray(b)) n.each(b, function (b, e) {
	      c || wb.test(a) ? d(a, e) : Ab(a + "[" + ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? b : "") + "]", e, c, d);
	    });else if (c || "object" !== n.type(b)) d(a, b);else for (e in b) {
	      Ab(a + "[" + e + "]", b[e], c, d);
	    }
	  }n.param = function (a, b) {
	    var c,
	        d = [],
	        e = function e(a, b) {
	      b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
	    };if ((void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a))) n.each(a, function () {
	      e(this.name, this.value);
	    });else for (c in a) {
	      Ab(c, a[c], b, e);
	    }return d.join("&").replace(vb, "+");
	  }, n.fn.extend({ serialize: function serialize() {
	      return n.param(this.serializeArray());
	    }, serializeArray: function serializeArray() {
	      return this.map(function () {
	        var a = n.prop(this, "elements");return a ? n.makeArray(a) : this;
	      }).filter(function () {
	        var a = this.type;return this.name && !n(this).is(":disabled") && zb.test(this.nodeName) && !yb.test(a) && (this.checked || !T.test(a));
	      }).map(function (a, b) {
	        var c = n(this).val();return null == c ? null : n.isArray(c) ? n.map(c, function (a) {
	          return { name: b.name, value: a.replace(xb, "\r\n") };
	        }) : { name: b.name, value: c.replace(xb, "\r\n") };
	      }).get();
	    } }), n.ajaxSettings.xhr = function () {
	    try {
	      return new XMLHttpRequest();
	    } catch (a) {}
	  };var Bb = 0,
	      Cb = {},
	      Db = { 0: 200, 1223: 204 },
	      Eb = n.ajaxSettings.xhr();a.attachEvent && a.attachEvent("onunload", function () {
	    for (var a in Cb) {
	      Cb[a]();
	    }
	  }), k.cors = !!Eb && "withCredentials" in Eb, k.ajax = Eb = !!Eb, n.ajaxTransport(function (a) {
	    var b;return k.cors || Eb && !a.crossDomain ? { send: function send(c, d) {
	        var e,
	            f = a.xhr(),
	            g = ++Bb;if ((f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)) for (e in a.xhrFields) {
	          f[e] = a.xhrFields[e];
	        }a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");for (e in c) {
	          f.setRequestHeader(e, c[e]);
	        }b = function (a) {
	          return function () {
	            b && (delete Cb[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Db[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? { text: f.responseText } : void 0, f.getAllResponseHeaders()));
	          };
	        }, f.onload = b(), f.onerror = b("error"), b = Cb[g] = b("abort");try {
	          f.send(a.hasContent && a.data || null);
	        } catch (h) {
	          if (b) throw h;
	        }
	      }, abort: function abort() {
	        b && b();
	      } } : void 0;
	  }), n.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function textScript(a) {
	        return n.globalEval(a), a;
	      } } }), n.ajaxPrefilter("script", function (a) {
	    void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET");
	  }), n.ajaxTransport("script", function (a) {
	    if (a.crossDomain) {
	      var b, c;return { send: function send(d, e) {
	          b = n("<script>").prop({ async: !0, charset: a.scriptCharset, src: a.url }).on("load error", c = function (a) {
	            b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type);
	          }), l.head.appendChild(b[0]);
	        }, abort: function abort() {
	          c && c();
	        } };
	    }
	  });var Fb = [],
	      Gb = /(=)\?(?=&|$)|\?\?/;n.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
	      var a = Fb.pop() || n.expando + "_" + cb++;return this[a] = !0, a;
	    } }), n.ajaxPrefilter("json jsonp", function (b, c, d) {
	    var e,
	        f,
	        g,
	        h = b.jsonp !== !1 && (Gb.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Gb.test(b.data) && "data");return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Gb, "$1" + e) : b.jsonp !== !1 && (b.url += (db.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
	      return g || n.error(e + " was not called"), g[0];
	    }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
	      g = arguments;
	    }, d.always(function () {
	      a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Fb.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0;
	    }), "script") : void 0;
	  }), n.parseHTML = function (a, b, c) {
	    if (!a || "string" != typeof a) return null;"boolean" == typeof b && (c = b, b = !1), b = b || l;var d = v.exec(a),
	        e = !c && [];return d ? [b.createElement(d[1])] : (d = n.buildFragment([a], b, e), e && e.length && n(e).remove(), n.merge([], d.childNodes));
	  };var Hb = n.fn.load;n.fn.load = function (a, b, c) {
	    if ("string" != typeof a && Hb) return Hb.apply(this, arguments);var d,
	        e,
	        f,
	        g = this,
	        h = a.indexOf(" ");return h >= 0 && (d = n.trim(a.slice(h)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && (e = "POST"), g.length > 0 && n.ajax({ url: a, type: e, dataType: "html", data: b }).done(function (a) {
	      f = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a);
	    }).complete(c && function (a, b) {
	      g.each(c, f || [a.responseText, b, a]);
	    }), this;
	  }, n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
	    n.fn[b] = function (a) {
	      return this.on(b, a);
	    };
	  }), n.expr.filters.animated = function (a) {
	    return n.grep(n.timers, function (b) {
	      return a === b.elem;
	    }).length;
	  };var Ib = a.document.documentElement;function Jb(a) {
	    return n.isWindow(a) ? a : 9 === a.nodeType && a.defaultView;
	  }n.offset = { setOffset: function setOffset(a, b, c) {
	      var d,
	          e,
	          f,
	          g,
	          h,
	          i,
	          j,
	          k = n.css(a, "position"),
	          l = n(a),
	          m = {};"static" === k && (a.style.position = "relative"), h = l.offset(), f = n.css(a, "top"), i = n.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m);
	    } }, n.fn.extend({ offset: function offset(a) {
	      if (arguments.length) return void 0 === a ? this : this.each(function (b) {
	        n.offset.setOffset(this, a, b);
	      });var b,
	          c,
	          d = this[0],
	          e = { top: 0, left: 0 },
	          f = d && d.ownerDocument;if (f) return b = f.documentElement, n.contains(b, d) ? (_typeof(d.getBoundingClientRect) !== U && (e = d.getBoundingClientRect()), c = Jb(f), { top: e.top + c.pageYOffset - b.clientTop, left: e.left + c.pageXOffset - b.clientLeft }) : e;
	    }, position: function position() {
	      if (this[0]) {
	        var a,
	            b,
	            c = this[0],
	            d = { top: 0, left: 0 };return "fixed" === n.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], "html") || (d = a.offset()), d.top += n.css(a[0], "borderTopWidth", !0), d.left += n.css(a[0], "borderLeftWidth", !0)), { top: b.top - d.top - n.css(c, "marginTop", !0), left: b.left - d.left - n.css(c, "marginLeft", !0) };
	      }
	    }, offsetParent: function offsetParent() {
	      return this.map(function () {
	        var a = this.offsetParent || Ib;while (a && !n.nodeName(a, "html") && "static" === n.css(a, "position")) {
	          a = a.offsetParent;
	        }return a || Ib;
	      });
	    } }), n.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (b, c) {
	    var d = "pageYOffset" === c;n.fn[b] = function (e) {
	      return J(this, function (b, e, f) {
	        var g = Jb(b);return void 0 === f ? g ? g[c] : b[e] : void (g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f);
	      }, b, e, arguments.length, null);
	    };
	  }), n.each(["top", "left"], function (a, b) {
	    n.cssHooks[b] = ya(k.pixelPosition, function (a, c) {
	      return c ? (c = xa(a, b), va.test(c) ? n(a).position()[b] + "px" : c) : void 0;
	    });
	  }), n.each({ Height: "height", Width: "width" }, function (a, b) {
	    n.each({ padding: "inner" + a, content: b, "": "outer" + a }, function (c, d) {
	      n.fn[d] = function (d, e) {
	        var f = arguments.length && (c || "boolean" != typeof d),
	            g = c || (d === !0 || e === !0 ? "margin" : "border");return J(this, function (b, c, d) {
	          var e;return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g);
	        }, b, f ? d : void 0, f, null);
	      };
	    });
	  }), n.fn.size = function () {
	    return this.length;
	  }, n.fn.andSelf = n.fn.addBack, "function" == "function" && __webpack_require__(/*! !webpack amd options */ 11) && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return n;
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var Kb = a.jQuery,
	      Lb = a.$;return n.noConflict = function (b) {
	    return a.$ === n && (a.$ = Lb), b && a.jQuery === n && (a.jQuery = Kb), n;
	  }, (typeof b === "undefined" ? "undefined" : _typeof(b)) === U && (a.jQuery = a.$ = n), n;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../~/webpack/buildin/module.js */ 10)(module)))

/***/ },
/* 10 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 11 */
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 12 */
/*!************************!*\
  !*** ./global/rule.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _logger = __webpack_require__(/*! ../debug/logger */ 2);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _jquery = __webpack_require__(/*! jquery */ 9);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* A single Rule */
	var Rule = function Rule() {
	  this.prettyPrint = function () {
	    var clone = _jquery2.default.extend({}, this);
	    delete clone.matcher;
	    delete clone.nameClean;
	    delete clone.urlClean;
	    delete clone.id;
	    delete clone.tabId;
	    delete clone.type;
	    delete clone.autorun;
	    delete clone.screenshot;
	    delete clone.onlyEmpty;
	    delete clone.color;
	    delete clone._escapeForRegexp;
	    return JSON.stringify(clone, null, 2);
	  };
	
	  this._escapeForRegexp = function (str) {
	    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	  };
	};
	
	/*eslint-disable complexity*/
	Rule.create = function (options, tabId, ruleIndex) {
	  delete options.matcher;
	  delete options.nameClean;
	  delete options.urlClean;
	  delete options._escapeForRegexp;
	  delete options.prettyPrint;
	  var rule = new Rule();
	
	  Object.keys(options).forEach(function (key) {
	    rule[key] = options[key];
	  });
	
	  // RegExp in URL or string?
	  if (typeof rule.url !== "undefined" && typeof rule.url.test !== "undefined") {
	    // RegExp
	    rule.matcher = new RegExp(rule.url);
	  } else if (typeof rule.url !== "undefined") {
	    // String (match full url only)
	    rule.matcher = new RegExp("^" + rule._escapeForRegexp(rule.url) + "$");
	  }
	
	  if (typeof rule.url !== "undefined") {
	    rule.urlClean = rule.url.toString();
	  } else {
	    rule.urlClean = "n/a";
	  }
	
	  if (typeof rule.name !== "undefined") {
	    rule.nameClean = rule.name.replace("<", "&lt;");
	  }
	
	  if (typeof rule.id === "undefined") {
	    rule.id = tabId + "-" + ruleIndex;
	  }
	
	  if (typeof rule.autorun === "undefined") {
	    rule.autorun = false;
	  }
	
	  if (typeof rule.onlyEmpty === "undefined") {
	    rule.onlyEmpty = false;
	  }
	
	  rule.tabId = tabId;
	
	  // REMOVE START
	  if (rule.export && rule.lib) {
	    _logger2.default.debug("[rule.js] created rule (with lib named '" + rule.export + "' )", rule);
	  } else {
	    _logger2.default.debug("[rule.js] created rule", rule);
	  }
	  // REMOVE END
	
	  return rule;
	};
	/*eslint-enable complexity*/
	
	module.exports = Rule;

/***/ },
/* 13 */
/*!***************************!*\
  !*** ./global/storage.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _logger = __webpack_require__(/*! ../debug/logger */ 2);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _utils = __webpack_require__(/*! ../global/utils */ 3);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _jsonf = __webpack_require__(/*! ../global/jsonf */ 5);
	
	var _jsonf2 = _interopRequireDefault(_jsonf);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint no-undef: 0, no-unused-vars: 0 */
	var Storage = {
	  load: function load(keyToLoadFrom) {
	    var key = keyToLoadFrom || _utils2.default.keys.rules;
	    return new Promise(function storageLoad(resolve) {
	      chrome.storage.local.get(key, function prStorageLoad(persistedData) {
	        _logger2.default.debug("[storage.js] loaded '" + key + "'", _jsonf2.default.stringify(persistedData));
	        resolve(persistedData[key]);
	      });
	    });
	  },
	  save: function save(rulesCode, keyToSaveTo) {
	    return new Promise(function (resolve, reject) {
	      var value = {};
	      var key = keyToSaveTo || _utils2.default.keys.rules;
	      value[key] = rulesCode;
	      chrome.storage.local.set(value, function storageSave() {
	        if (typeof chrome.runtime.lastError === "undefined") {
	          _logger2.default.debug("[storage.js] Saved '" + key + "'", _jsonf2.default.stringify(value[key]));
	          resolve(true);
	        } else {
	          reject(new Error(chrome.runtime.lastError));
	        }
	      });
	    });
	  },
	  delete: function _delete(key) {
	    return new Promise(function (resolve, reject) {
	      chrome.storage.local.remove(key, function storageDelete() {
	        if (typeof chrome.runtime.lastError === "undefined") {
	          _logger2.default.debug("[storage.js] Removed key '" + key + "'");
	          resolve(true);
	        } else {
	          reject(new Error(chrome.runtime.lastError));
	        }
	      });
	    });
	  }
	};
	
	module.exports = Storage;

/***/ },
/* 14 */
/*!*******************************************!*\
  !*** ../vendor/js-beautifier/beautify.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
	/*
	
	  The MIT License (MIT)
	
	  Copyright (c) 2007-2013 Einar Lielmanis and contributors.
	
	  Permission is hereby granted, free of charge, to any person
	  obtaining a copy of this software and associated documentation files
	  (the "Software"), to deal in the Software without restriction,
	  including without limitation the rights to use, copy, modify, merge,
	  publish, distribute, sublicense, and/or sell copies of the Software,
	  and to permit persons to whom the Software is furnished to do so,
	  subject to the following conditions:
	
	  The above copyright notice and this permission notice shall be
	  included in all copies or substantial portions of the Software.
	
	  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
	  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
	  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	  SOFTWARE.
	
	 JS Beautifier
	---------------
	
	
	  Written by Einar Lielmanis, <einar@jsbeautifier.org>
	      http://jsbeautifier.org/
	
	  Originally converted to javascript by Vital, <vital76@gmail.com>
	  "End braces on own line" added by Chris J. Shull, <chrisjshull@gmail.com>
	  Parsing improvements for brace-less statements by Liam Newman <bitwiseman@gmail.com>
	
	
	  Usage:
	    js_beautify(js_source_text);
	    js_beautify(js_source_text, options);
	
	  The options are:
	    indent_size (default 4)          - indentation size,
	    indent_char (default space)      - character to indent with,
	    preserve_newlines (default true) - whether existing line breaks should be preserved,
	    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk,
	
	    jslint_happy (default false) - if true, then jslint-stricter mode is enforced.
	
	            jslint_happy       !jslint_happy
	            ---------------------------------
	            function ()        function()
	
	    brace_style (default "collapse") - "collapse" | "expand" | "end-expand"
	            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line.
	
	    space_before_conditional (default true) - should the space before conditional statement be added, "if(true)" vs "if (true)",
	
	    unescape_strings (default false) - should printable characters in strings encoded in \xNN notation be unescaped, "example" vs "\x65\x78\x61\x6d\x70\x6c\x65"
	
	    wrap_line_length (default unlimited) - lines should wrap at next opportunity after this number of characters.
	          NOTE: This is not a hard limit. Lines will continue until a point where a newline would
	                be preserved if it were present.
	
	    e.g
	
	    js_beautify(js_source_text, {
	      'indent_size': 1,
	      'indent_char': '\t'
	    });
	
	*/
	
	(function () {
	
	    var acorn = {};
	    (function (exports) {
	        // This section of code is taken from acorn.
	        //
	        // Acorn was written by Marijn Haverbeke and released under an MIT
	        // license. The Unicode regexps (for identifiers and whitespace) were
	        // taken from [Esprima](http://esprima.org) by Ariya Hidayat.
	        //
	        // Git repositories for Acorn are available at
	        //
	        //     http://marijnhaverbeke.nl/git/acorn
	        //     https://github.com/marijnh/acorn.git
	
	        // ## Character categories
	
	        // Big ugly regular expressions that match characters in the
	        // whitespace, identifier, and identifier-start categories. These
	        // are only applied when a character is found to actually have a
	        // code point above 128.
	
	        var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
	        var nonASCIIidentifierStartChars = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ";
	        var nonASCIIidentifierChars = "̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ؚؠ-ىٲ-ۓۧ-ۨۻ-ۼܰ-݊ࠀ-ࠔࠛ-ࠣࠥ-ࠧࠩ-࠭ࡀ-ࡗࣤ-ࣾऀ-ःऺ-़ा-ॏ॑-ॗॢ-ॣ०-९ঁ-ঃ়া-ৄেৈৗয়-ৠਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢ-ૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୟ-ୠ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఁ-ఃె-ైొ-్ౕౖౢ-ౣ౦-౯ಂಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢ-ೣ೦-೯ംഃെ-ൈൗൢ-ൣ൦-൯ංඃ්ා-ුූෘ-ෟෲෳิ-ฺเ-ๅ๐-๙ິ-ູ່-ໍ໐-໙༘༙༠-༩༹༵༷ཁ-ཇཱ-྄྆-྇ྍ-ྗྙ-ྼ࿆က-ဩ၀-၉ၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜎ-ᜐᜠ-ᜰᝀ-ᝐᝲᝳក-ឲ៝០-៩᠋-᠍᠐-᠙ᤠ-ᤫᤰ-᤻ᥑ-ᥭᦰ-ᧀᧈ-ᧉ᧐-᧙ᨀ-ᨕᨠ-ᩓ᩠-᩿᩼-᪉᪐-᪙ᭆ-ᭋ᭐-᭙᭫-᭳᮰-᮹᯦-᯳ᰀ-ᰢ᱀-᱉ᱛ-ᱽ᳐-᳒ᴀ-ᶾḁ-ἕ‌‍‿⁀⁔⃐-⃥⃜⃡-⃰ⶁ-ⶖⷠ-ⷿ〡-〨゙゚Ꙁ-ꙭꙴ-꙽ꚟ꛰-꛱ꟸ-ꠀ꠆ꠋꠣ-ꠧꢀ-ꢁꢴ-꣄꣐-꣙ꣳ-ꣷ꤀-꤉ꤦ-꤭ꤰ-ꥅꦀ-ꦃ꦳-꧀ꨀ-ꨧꩀ-ꩁꩌ-ꩍ꩐-꩙ꩻꫠ-ꫩꫲ-ꫳꯀ-ꯡ꯬꯭꯰-꯹ﬠ-ﬨ︀-️︠-︦︳︴﹍-﹏０-９＿";
	        var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
	        var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
	
	        // Whether a single character denotes a newline.
	
	        var newline = /[\n\r\u2028\u2029]/;
	
	        // Matches a whole line break (where CRLF is considered a single
	        // line break). Used to count lines.
	
	        var lineBreak = /\r\n|[\n\r\u2028\u2029]/g;
	
	        // Test whether a given character code starts an identifier.
	
	        var isIdentifierStart = exports.isIdentifierStart = function (code) {
	            if (code < 65) return code === 36;
	            if (code < 91) return true;
	            if (code < 97) return code === 95;
	            if (code < 123) return true;
	            return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
	        };
	
	        // Test whether a given character is part of an identifier.
	
	        var isIdentifierChar = exports.isIdentifierChar = function (code) {
	            if (code < 48) return code === 36;
	            if (code < 58) return true;
	            if (code < 65) return false;
	            if (code < 91) return true;
	            if (code < 97) return code === 95;
	            if (code < 123) return true;
	            return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
	        };
	    })(acorn);
	
	    function js_beautify(js_source_text, options) {
	        "use strict";
	
	        var beautifier = new Beautifier(js_source_text, options);
	        return beautifier.beautify();
	    }
	
	    function Beautifier(js_source_text, options) {
	        "use strict";
	
	        var input, output_lines;
	        var token_text, token_type, last_type, last_last_text, indent_string;
	        var flags, previous_flags, flag_store;
	        var whitespace, wordchar, punct, parser_pos, line_starters, reserved_words, digits;
	        var prefix;
	        var input_wanted_newline;
	        var output_space_before_token;
	        var input_length, n_newlines, whitespace_before_token;
	        var handlers, MODE, opt;
	        var preindent_string = '';
	
	        whitespace = "\n\r\t ".split('');
	        wordchar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$'.split('');
	        digits = '0123456789'.split('');
	
	        punct = '+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! ~ , : ? ^ ^= |= :: =>';
	        punct += ' <%= <% %> <?= <? ?>'; // try to be a good boy and try not to break the markup language identifiers
	        punct = punct.split(' ');
	
	        // words which should always start on new line.
	        line_starters = 'continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,yield'.split(',');
	        reserved_words = line_starters.concat(['do', 'in', 'else', 'get', 'set', 'new', 'catch', 'finally', 'typeof']);
	
	        MODE = {
	            BlockStatement: 'BlockStatement', // 'BLOCK'
	            Statement: 'Statement', // 'STATEMENT'
	            ObjectLiteral: 'ObjectLiteral', // 'OBJECT',
	            ArrayLiteral: 'ArrayLiteral', //'[EXPRESSION]',
	            ForInitializer: 'ForInitializer', //'(FOR-EXPRESSION)',
	            Conditional: 'Conditional', //'(COND-EXPRESSION)',
	            Expression: 'Expression' //'(EXPRESSION)'
	        };
	
	        handlers = {
	            'TK_START_EXPR': handle_start_expr,
	            'TK_END_EXPR': handle_end_expr,
	            'TK_START_BLOCK': handle_start_block,
	            'TK_END_BLOCK': handle_end_block,
	            'TK_WORD': handle_word,
	            'TK_RESERVED': handle_word,
	            'TK_SEMICOLON': handle_semicolon,
	            'TK_STRING': handle_string,
	            'TK_EQUALS': handle_equals,
	            'TK_OPERATOR': handle_operator,
	            'TK_COMMA': handle_comma,
	            'TK_BLOCK_COMMENT': handle_block_comment,
	            'TK_INLINE_COMMENT': handle_inline_comment,
	            'TK_COMMENT': handle_comment,
	            'TK_DOT': handle_dot,
	            'TK_UNKNOWN': handle_unknown
	        };
	
	        function create_flags(flags_base, mode) {
	            var next_indent_level = 0;
	            if (flags_base) {
	                next_indent_level = flags_base.indentation_level;
	                if (!just_added_newline() && flags_base.line_indent_level > next_indent_level) {
	                    next_indent_level = flags_base.line_indent_level;
	                }
	            }
	
	            var next_flags = {
	                mode: mode,
	                parent: flags_base,
	                last_text: flags_base ? flags_base.last_text : '', // last token text
	                last_word: flags_base ? flags_base.last_word : '', // last 'TK_WORD' passed
	                declaration_statement: false,
	                declaration_assignment: false,
	                in_html_comment: false,
	                multiline_frame: false,
	                if_block: false,
	                else_block: false,
	                do_block: false,
	                do_while: false,
	                in_case_statement: false, // switch(..){ INSIDE HERE }
	                in_case: false, // we're on the exact line with "case 0:"
	                case_body: false, // the indented case-action block
	                indentation_level: next_indent_level,
	                line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
	                start_line_index: output_lines.length,
	                had_comment: false,
	                ternary_depth: 0
	            };
	            return next_flags;
	        }
	
	        // Using object instead of string to allow for later expansion of info about each line
	
	        function create_output_line() {
	            return {
	                text: []
	            };
	        }
	
	        // Some interpreters have unexpected results with foo = baz || bar;
	        options = options ? options : {};
	        opt = {};
	
	        // compatibility
	        if (options.space_after_anon_function !== undefined && options.jslint_happy === undefined) {
	            options.jslint_happy = options.space_after_anon_function;
	        }
	        if (options.braces_on_own_line !== undefined) {
	            //graceful handling of deprecated option
	            opt.brace_style = options.braces_on_own_line ? "expand" : "collapse";
	        }
	        opt.brace_style = options.brace_style ? options.brace_style : opt.brace_style ? opt.brace_style : "collapse";
	
	        // graceful handling of deprecated option
	        if (opt.brace_style === "expand-strict") {
	            opt.brace_style = "expand";
	        }
	
	        opt.indent_size = options.indent_size ? parseInt(options.indent_size, 10) : 4;
	        opt.indent_char = options.indent_char ? options.indent_char : ' ';
	        opt.preserve_newlines = options.preserve_newlines === undefined ? true : options.preserve_newlines;
	        opt.break_chained_methods = options.break_chained_methods === undefined ? false : options.break_chained_methods;
	        opt.max_preserve_newlines = options.max_preserve_newlines === undefined ? 0 : parseInt(options.max_preserve_newlines, 10);
	        opt.space_in_paren = options.space_in_paren === undefined ? false : options.space_in_paren;
	        opt.space_in_empty_paren = options.space_in_empty_paren === undefined ? false : options.space_in_empty_paren;
	        opt.jslint_happy = options.jslint_happy === undefined ? false : options.jslint_happy;
	        opt.keep_array_indentation = options.keep_array_indentation === undefined ? false : options.keep_array_indentation;
	        opt.space_before_conditional = options.space_before_conditional === undefined ? true : options.space_before_conditional;
	        opt.unescape_strings = options.unescape_strings === undefined ? false : options.unescape_strings;
	        opt.wrap_line_length = options.wrap_line_length === undefined ? 0 : parseInt(options.wrap_line_length, 10);
	        opt.e4x = options.e4x === undefined ? false : options.e4x;
	
	        if (options.indent_with_tabs) {
	            opt.indent_char = '\t';
	            opt.indent_size = 1;
	        }
	
	        //----------------------------------
	        indent_string = '';
	        while (opt.indent_size > 0) {
	            indent_string += opt.indent_char;
	            opt.indent_size -= 1;
	        }
	
	        while (js_source_text && (js_source_text.charAt(0) === ' ' || js_source_text.charAt(0) === '\t')) {
	            preindent_string += js_source_text.charAt(0);
	            js_source_text = js_source_text.substring(1);
	        }
	        input = js_source_text;
	        // cache the source's length.
	        input_length = js_source_text.length;
	
	        last_type = 'TK_START_BLOCK'; // last token type
	        last_last_text = ''; // pre-last token text
	        output_lines = [create_output_line()];
	        output_space_before_token = false;
	        whitespace_before_token = [];
	
	        // Stack of parsing/formatting states, including MODE.
	        // We tokenize, parse, and output in an almost purely a forward-only stream of token input
	        // and formatted output.  This makes the beautifier less accurate than full parsers
	        // but also far more tolerant of syntax errors.
	        //
	        // For example, the default mode is MODE.BlockStatement. If we see a '{' we push a new frame of type
	        // MODE.BlockStatement on the the stack, even though it could be object literal.  If we later
	        // encounter a ":", we'll switch to to MODE.ObjectLiteral.  If we then see a ";",
	        // most full parsers would die, but the beautifier gracefully falls back to
	        // MODE.BlockStatement and continues on.
	        flag_store = [];
	        set_mode(MODE.BlockStatement);
	
	        parser_pos = 0;
	
	        this.beautify = function () {
	            /*jshint onevar:true */
	            var t, i, keep_whitespace, sweet_code;
	
	            while (true) {
	                t = get_next_token();
	                token_text = t[0];
	                token_type = t[1];
	
	                if (token_type === 'TK_EOF') {
	                    // Unwind any open statements
	                    while (flags.mode === MODE.Statement) {
	                        restore_mode();
	                    }
	                    break;
	                }
	
	                keep_whitespace = opt.keep_array_indentation && is_array(flags.mode);
	                input_wanted_newline = n_newlines > 0;
	
	                if (keep_whitespace) {
	                    for (i = 0; i < n_newlines; i += 1) {
	                        print_newline(i > 0);
	                    }
	                } else {
	                    if (opt.max_preserve_newlines && n_newlines > opt.max_preserve_newlines) {
	                        n_newlines = opt.max_preserve_newlines;
	                    }
	
	                    if (opt.preserve_newlines) {
	                        if (n_newlines > 1) {
	                            print_newline();
	                            for (i = 1; i < n_newlines; i += 1) {
	                                print_newline(true);
	                            }
	                        }
	                    }
	                }
	
	                handlers[token_type]();
	
	                // The cleanest handling of inline comments is to treat them as though they aren't there.
	                // Just continue formatting and the behavior should be logical.
	                // Also ignore unknown tokens.  Again, this should result in better behavior.
	                if (token_type !== 'TK_INLINE_COMMENT' && token_type !== 'TK_COMMENT' && token_type !== 'TK_BLOCK_COMMENT' && token_type !== 'TK_UNKNOWN') {
	                    last_last_text = flags.last_text;
	                    last_type = token_type;
	                    flags.last_text = token_text;
	                }
	                flags.had_comment = token_type === 'TK_INLINE_COMMENT' || token_type === 'TK_COMMENT' || token_type === 'TK_BLOCK_COMMENT';
	            }
	
	            sweet_code = output_lines[0].text.join('');
	            for (var line_index = 1; line_index < output_lines.length; line_index++) {
	                sweet_code += '\n' + output_lines[line_index].text.join('');
	            }
	            sweet_code = sweet_code.replace(/[\r\n ]+$/, '');
	            return sweet_code;
	        };
	
	        function trim_output(eat_newlines) {
	            eat_newlines = eat_newlines === undefined ? false : eat_newlines;
	
	            if (output_lines.length) {
	                trim_output_line(output_lines[output_lines.length - 1], eat_newlines);
	
	                while (eat_newlines && output_lines.length > 1 && output_lines[output_lines.length - 1].text.length === 0) {
	                    output_lines.pop();
	                    trim_output_line(output_lines[output_lines.length - 1], eat_newlines);
	                }
	            }
	        }
	
	        function trim_output_line(line) {
	            while (line.text.length && (line.text[line.text.length - 1] === ' ' || line.text[line.text.length - 1] === indent_string || line.text[line.text.length - 1] === preindent_string)) {
	                line.text.pop();
	            }
	        }
	
	        function trim(s) {
	            return s.replace(/^\s+|\s+$/g, '');
	        }
	
	        // we could use just string.split, but
	        // IE doesn't like returning empty strings
	
	        function split_newlines(s) {
	            //return s.split(/\x0d\x0a|\x0a/);
	
	            s = s.replace(/\x0d/g, '');
	            var out = [],
	                idx = s.indexOf("\n");
	            while (idx !== -1) {
	                out.push(s.substring(0, idx));
	                s = s.substring(idx + 1);
	                idx = s.indexOf("\n");
	            }
	            if (s.length) {
	                out.push(s);
	            }
	            return out;
	        }
	
	        function just_added_newline() {
	            var line = output_lines[output_lines.length - 1];
	            return line.text.length === 0;
	        }
	
	        function just_added_blankline() {
	            if (just_added_newline()) {
	                if (output_lines.length === 1) {
	                    return true; // start of the file and newline = blank
	                }
	
	                var line = output_lines[output_lines.length - 2];
	                return line.text.length === 0;
	            }
	            return false;
	        }
	
	        function allow_wrap_or_preserved_newline(force_linewrap) {
	            force_linewrap = force_linewrap === undefined ? false : force_linewrap;
	            if (opt.wrap_line_length && !force_linewrap) {
	                var line = output_lines[output_lines.length - 1];
	                var proposed_line_length = 0;
	                // never wrap the first token of a line.
	                if (line.text.length > 0) {
	                    proposed_line_length = line.text.join('').length + token_text.length + (output_space_before_token ? 1 : 0);
	                    if (proposed_line_length >= opt.wrap_line_length) {
	                        force_linewrap = true;
	                    }
	                }
	            }
	            if ((opt.preserve_newlines && input_wanted_newline || force_linewrap) && !just_added_newline()) {
	                print_newline(false, true);
	            }
	        }
	
	        function print_newline(force_newline, preserve_statement_flags) {
	            output_space_before_token = false;
	
	            if (!preserve_statement_flags) {
	                if (flags.last_text !== ';' && flags.last_text !== ',' && flags.last_text !== '=' && last_type !== 'TK_OPERATOR') {
	                    while (flags.mode === MODE.Statement && !flags.if_block && !flags.do_block) {
	                        restore_mode();
	                    }
	                }
	            }
	
	            if (output_lines.length === 1 && just_added_newline()) {
	                return; // no newline on start of file
	            }
	
	            if (force_newline || !just_added_newline()) {
	                flags.multiline_frame = true;
	                output_lines.push(create_output_line());
	            }
	        }
	
	        function print_token_line_indentation() {
	            if (just_added_newline()) {
	                var line = output_lines[output_lines.length - 1];
	                if (opt.keep_array_indentation && is_array(flags.mode) && input_wanted_newline) {
	                    // prevent removing of this whitespace as redundant
	                    line.text.push('');
	                    for (var i = 0; i < whitespace_before_token.length; i += 1) {
	                        line.text.push(whitespace_before_token[i]);
	                    }
	                } else {
	                    if (preindent_string) {
	                        line.text.push(preindent_string);
	                    }
	
	                    print_indent_string(flags.indentation_level);
	                }
	            }
	        }
	
	        function print_indent_string(level) {
	            // Never indent your first output indent at the start of the file
	            if (output_lines.length > 1) {
	                var line = output_lines[output_lines.length - 1];
	
	                flags.line_indent_level = level;
	                for (var i = 0; i < level; i += 1) {
	                    line.text.push(indent_string);
	                }
	            }
	        }
	
	        function print_token_space_before() {
	            var line = output_lines[output_lines.length - 1];
	            if (output_space_before_token && line.text.length) {
	                var last_output = line.text[line.text.length - 1];
	                if (last_output !== ' ' && last_output !== indent_string) {
	                    // prevent occassional duplicate space
	                    line.text.push(' ');
	                }
	            }
	        }
	
	        function print_token(printable_token) {
	            printable_token = printable_token || token_text;
	            print_token_line_indentation();
	            print_token_space_before();
	            output_space_before_token = false;
	            output_lines[output_lines.length - 1].text.push(printable_token);
	        }
	
	        function indent() {
	            flags.indentation_level += 1;
	        }
	
	        function deindent() {
	            if (flags.indentation_level > 0 && (!flags.parent || flags.indentation_level > flags.parent.indentation_level)) flags.indentation_level -= 1;
	        }
	
	        function remove_redundant_indentation(frame) {
	            // This implementation is effective but has some issues:
	            //     - less than great performance due to array splicing
	            //     - can cause line wrap to happen too soon due to indent removal
	            //           after wrap points are calculated
	            // These issues are minor compared to ugly indentation.
	
	            if (frame.multiline_frame) return;
	
	            // remove one indent from each line inside this section
	            var index = frame.start_line_index;
	            var splice_index = 0;
	            var line;
	
	            while (index < output_lines.length) {
	                line = output_lines[index];
	                index++;
	
	                // skip empty lines
	                if (line.text.length === 0) {
	                    continue;
	                }
	
	                // skip the preindent string if present
	                if (preindent_string && line.text[0] === preindent_string) {
	                    splice_index = 1;
	                } else {
	                    splice_index = 0;
	                }
	
	                // remove one indent, if present
	                if (line.text[splice_index] === indent_string) {
	                    line.text.splice(splice_index, 1);
	                }
	            }
	        }
	
	        function set_mode(mode) {
	            if (flags) {
	                flag_store.push(flags);
	                previous_flags = flags;
	            } else {
	                previous_flags = create_flags(null, mode);
	            }
	
	            flags = create_flags(previous_flags, mode);
	        }
	
	        function is_array(mode) {
	            return mode === MODE.ArrayLiteral;
	        }
	
	        function is_expression(mode) {
	            return in_array(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
	        }
	
	        function restore_mode() {
	            if (flag_store.length > 0) {
	                previous_flags = flags;
	                flags = flag_store.pop();
	                if (previous_flags.mode === MODE.Statement) {
	                    remove_redundant_indentation(previous_flags);
	                }
	            }
	        }
	
	        function start_of_object_property() {
	            return flags.parent.mode === MODE.ObjectLiteral && flags.mode === MODE.Statement && flags.last_text === ':' && flags.ternary_depth === 0;
	        }
	
	        function start_of_statement() {
	            if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && token_type === 'TK_WORD' || last_type === 'TK_RESERVED' && flags.last_text === 'do' || last_type === 'TK_RESERVED' && flags.last_text === 'return' && !input_wanted_newline || last_type === 'TK_RESERVED' && flags.last_text === 'else' && !(token_type === 'TK_RESERVED' && token_text === 'if') || last_type === 'TK_END_EXPR' && (previous_flags.mode === MODE.ForInitializer || previous_flags.mode === MODE.Conditional) || last_type === 'TK_WORD' && flags.mode === MODE.BlockStatement && !flags.in_case && !(token_text === '--' || token_text === '++') && token_type !== 'TK_WORD' && token_type !== 'TK_RESERVED' || flags.mode === MODE.ObjectLiteral && flags.last_text === ':' && flags.ternary_depth === 0) {
	
	                set_mode(MODE.Statement);
	                indent();
	
	                if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && token_type === 'TK_WORD') {
	                    flags.declaration_statement = true;
	                }
	
	                // Issue #276:
	                // If starting a new statement with [if, for, while, do], push to a new line.
	                // if (a) if (b) if(c) d(); else e(); else f();
	                if (!start_of_object_property()) {
	                    allow_wrap_or_preserved_newline(token_type === 'TK_RESERVED' && in_array(token_text, ['do', 'for', 'if', 'while']));
	                }
	
	                return true;
	            }
	            return false;
	        }
	
	        function all_lines_start_with(lines, c) {
	            for (var i = 0; i < lines.length; i++) {
	                var line = trim(lines[i]);
	                if (line.charAt(0) !== c) {
	                    return false;
	                }
	            }
	            return true;
	        }
	
	        function is_special_word(word) {
	            return in_array(word, ['case', 'return', 'do', 'if', 'throw', 'else']);
	        }
	
	        function in_array(what, arr) {
	            for (var i = 0; i < arr.length; i += 1) {
	                if (arr[i] === what) {
	                    return true;
	                }
	            }
	            return false;
	        }
	
	        function unescape_string(s) {
	            var esc = false,
	                out = '',
	                pos = 0,
	                s_hex = '',
	                escaped = 0,
	                c;
	
	            while (esc || pos < s.length) {
	
	                c = s.charAt(pos);
	                pos++;
	
	                if (esc) {
	                    esc = false;
	                    if (c === 'x') {
	                        // simple hex-escape \x24
	                        s_hex = s.substr(pos, 2);
	                        pos += 2;
	                    } else if (c === 'u') {
	                        // unicode-escape, \u2134
	                        s_hex = s.substr(pos, 4);
	                        pos += 4;
	                    } else {
	                        // some common escape, e.g \n
	                        out += '\\' + c;
	                        continue;
	                    }
	                    if (!s_hex.match(/^[0123456789abcdefABCDEF]+$/)) {
	                        // some weird escaping, bail out,
	                        // leaving whole string intact
	                        return s;
	                    }
	
	                    escaped = parseInt(s_hex, 16);
	
	                    if (escaped >= 0x00 && escaped < 0x20) {
	                        // leave 0x00...0x1f escaped
	                        if (c === 'x') {
	                            out += '\\x' + s_hex;
	                        } else {
	                            out += "\\u" + s_hex;
	                        }
	                        continue;
	                    } else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
	                        // single-quote, apostrophe, backslash - escape these
	                        out += '\\' + String.fromCharCode(escaped);
	                    } else if (c === 'x' && escaped > 0x7e && escaped <= 0xff) {
	                        // we bail out on \x7f..\xff,
	                        // leaving whole string escaped,
	                        // as it's probably completely binary
	                        return s;
	                    } else {
	                        out += String.fromCharCode(escaped);
	                    }
	                } else if (c === '\\') {
	                    esc = true;
	                } else {
	                    out += c;
	                }
	            }
	            return out;
	        }
	
	        function is_next(find) {
	            var local_pos = parser_pos;
	            var c = input.charAt(local_pos);
	            while (in_array(c, whitespace) && c !== find) {
	                local_pos++;
	                if (local_pos >= input_length) {
	                    return false;
	                }
	                c = input.charAt(local_pos);
	            }
	            return c === find;
	        }
	
	        function get_next_token() {
	            var i, resulting_string;
	
	            n_newlines = 0;
	
	            if (parser_pos >= input_length) {
	                return ['', 'TK_EOF'];
	            }
	
	            input_wanted_newline = false;
	            whitespace_before_token = [];
	
	            var c = input.charAt(parser_pos);
	            parser_pos += 1;
	
	            while (in_array(c, whitespace)) {
	
	                if (c === '\n') {
	                    n_newlines += 1;
	                    whitespace_before_token = [];
	                } else if (n_newlines) {
	                    if (c === indent_string) {
	                        whitespace_before_token.push(indent_string);
	                    } else if (c !== '\r') {
	                        whitespace_before_token.push(' ');
	                    }
	                }
	
	                if (parser_pos >= input_length) {
	                    return ['', 'TK_EOF'];
	                }
	
	                c = input.charAt(parser_pos);
	                parser_pos += 1;
	            }
	
	            // NOTE: because beautifier doesn't fully parse, it doesn't use acorn.isIdentifierStart.
	            // It just treats all identifiers and numbers and such the same.
	            if (acorn.isIdentifierChar(input.charCodeAt(parser_pos - 1))) {
	                if (parser_pos < input_length) {
	                    while (acorn.isIdentifierChar(input.charCodeAt(parser_pos))) {
	                        c += input.charAt(parser_pos);
	                        parser_pos += 1;
	                        if (parser_pos === input_length) {
	                            break;
	                        }
	                    }
	                }
	
	                // small and surprisingly unugly hack for 1E-10 representation
	                if (parser_pos !== input_length && c.match(/^[0-9]+[Ee]$/) && (input.charAt(parser_pos) === '-' || input.charAt(parser_pos) === '+')) {
	
	                    var sign = input.charAt(parser_pos);
	                    parser_pos += 1;
	
	                    var t = get_next_token();
	                    c += sign + t[0];
	                    return [c, 'TK_WORD'];
	                }
	
	                if (!(last_type === 'TK_DOT' || last_type === 'TK_RESERVED' && in_array(flags.last_text, ['set', 'get'])) && in_array(c, reserved_words)) {
	                    if (c === 'in') {
	                        // hack for 'in' operator
	                        return [c, 'TK_OPERATOR'];
	                    }
	                    return [c, 'TK_RESERVED'];
	                }
	                return [c, 'TK_WORD'];
	            }
	
	            if (c === '(' || c === '[') {
	                return [c, 'TK_START_EXPR'];
	            }
	
	            if (c === ')' || c === ']') {
	                return [c, 'TK_END_EXPR'];
	            }
	
	            if (c === '{') {
	                return [c, 'TK_START_BLOCK'];
	            }
	
	            if (c === '}') {
	                return [c, 'TK_END_BLOCK'];
	            }
	
	            if (c === ';') {
	                return [c, 'TK_SEMICOLON'];
	            }
	
	            if (c === '/') {
	                var comment = '';
	                // peek for comment /* ... */
	                var inline_comment = true;
	                if (input.charAt(parser_pos) === '*') {
	                    parser_pos += 1;
	                    if (parser_pos < input_length) {
	                        while (parser_pos < input_length && !(input.charAt(parser_pos) === '*' && input.charAt(parser_pos + 1) && input.charAt(parser_pos + 1) === '/')) {
	                            c = input.charAt(parser_pos);
	                            comment += c;
	                            if (c === "\n" || c === "\r") {
	                                inline_comment = false;
	                            }
	                            parser_pos += 1;
	                            if (parser_pos >= input_length) {
	                                break;
	                            }
	                        }
	                    }
	                    parser_pos += 2;
	                    if (inline_comment && n_newlines === 0) {
	                        return ['/*' + comment + '*/', 'TK_INLINE_COMMENT'];
	                    } else {
	                        return ['/*' + comment + '*/', 'TK_BLOCK_COMMENT'];
	                    }
	                }
	                // peek for comment // ...
	                if (input.charAt(parser_pos) === '/') {
	                    comment = c;
	                    while (input.charAt(parser_pos) !== '\r' && input.charAt(parser_pos) !== '\n') {
	                        comment += input.charAt(parser_pos);
	                        parser_pos += 1;
	                        if (parser_pos >= input_length) {
	                            break;
	                        }
	                    }
	                    return [comment, 'TK_COMMENT'];
	                }
	            }
	
	            if (c === '`' || c === "'" || c === '"' || // string
	            (c === '/' || // regexp
	            opt.e4x && c === "<" && input.slice(parser_pos - 1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])\s*([-a-zA-Z:0-9_.]+=('[^']*'|"[^"]*"|{[^{}]*})\s*)*\/?\s*>/) // xml
	            ) && ( // regex and xml can only appear in specific locations during parsing
	            last_type === 'TK_RESERVED' && is_special_word(flags.last_text) || last_type === 'TK_END_EXPR' && in_array(previous_flags.mode, [MODE.Conditional, MODE.ForInitializer]) || in_array(last_type, ['TK_COMMENT', 'TK_START_EXPR', 'TK_START_BLOCK', 'TK_END_BLOCK', 'TK_OPERATOR', 'TK_EQUALS', 'TK_EOF', 'TK_SEMICOLON', 'TK_COMMA']))) {
	
	                var sep = c,
	                    esc = false,
	                    has_char_escapes = false;
	
	                resulting_string = c;
	
	                if (parser_pos < input_length) {
	                    if (sep === '/') {
	                        //
	                        // handle regexp
	                        //
	                        var in_char_class = false;
	                        while (esc || in_char_class || input.charAt(parser_pos) !== sep) {
	                            resulting_string += input.charAt(parser_pos);
	                            if (!esc) {
	                                esc = input.charAt(parser_pos) === '\\';
	                                if (input.charAt(parser_pos) === '[') {
	                                    in_char_class = true;
	                                } else if (input.charAt(parser_pos) === ']') {
	                                    in_char_class = false;
	                                }
	                            } else {
	                                esc = false;
	                            }
	                            parser_pos += 1;
	                            if (parser_pos >= input_length) {
	                                // incomplete string/rexp when end-of-file reached.
	                                // bail out with what had been received so far.
	                                return [resulting_string, 'TK_STRING'];
	                            }
	                        }
	                    } else if (opt.e4x && sep === '<') {
	                        //
	                        // handle e4x xml literals
	                        //
	                        var xmlRegExp = /<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])\s*([-a-zA-Z:0-9_.]+=('[^']*'|"[^"]*"|{[^{}]*})\s*)*(\/?)\s*>/g;
	                        var xmlStr = input.slice(parser_pos - 1);
	                        var match = xmlRegExp.exec(xmlStr);
	                        if (match && match.index === 0) {
	                            var rootTag = match[2];
	                            var depth = 0;
	                            while (match) {
	                                var isEndTag = !!match[1];
	                                var tagName = match[2];
	                                var isSingletonTag = !!match[match.length - 1] || tagName.slice(0, 8) === "![CDATA[";
	                                if (tagName === rootTag && !isSingletonTag) {
	                                    if (isEndTag) {
	                                        --depth;
	                                    } else {
	                                        ++depth;
	                                    }
	                                }
	                                if (depth <= 0) {
	                                    break;
	                                }
	                                match = xmlRegExp.exec(xmlStr);
	                            }
	                            var xmlLength = match ? match.index + match[0].length : xmlStr.length;
	                            parser_pos += xmlLength - 1;
	                            return [xmlStr.slice(0, xmlLength), "TK_STRING"];
	                        }
	                    } else {
	                        //
	                        // handle string
	                        //
	                        while (esc || input.charAt(parser_pos) !== sep) {
	                            resulting_string += input.charAt(parser_pos);
	                            if (esc) {
	                                if (input.charAt(parser_pos) === 'x' || input.charAt(parser_pos) === 'u') {
	                                    has_char_escapes = true;
	                                }
	                                esc = false;
	                            } else {
	                                esc = input.charAt(parser_pos) === '\\';
	                            }
	                            parser_pos += 1;
	                            if (parser_pos >= input_length) {
	                                // incomplete string/rexp when end-of-file reached.
	                                // bail out with what had been received so far.
	                                return [resulting_string, 'TK_STRING'];
	                            }
	                        }
	                    }
	                }
	
	                parser_pos += 1;
	                resulting_string += sep;
	
	                if (has_char_escapes && opt.unescape_strings) {
	                    resulting_string = unescape_string(resulting_string);
	                }
	
	                if (sep === '/') {
	                    // regexps may have modifiers /regexp/MOD , so fetch those, too
	                    while (parser_pos < input_length && in_array(input.charAt(parser_pos), wordchar)) {
	                        resulting_string += input.charAt(parser_pos);
	                        parser_pos += 1;
	                    }
	                }
	                return [resulting_string, 'TK_STRING'];
	            }
	
	            if (c === '#') {
	
	                if (output_lines.length === 1 && output_lines[0].text.length === 0 && input.charAt(parser_pos) === '!') {
	                    // shebang
	                    resulting_string = c;
	                    while (parser_pos < input_length && c !== '\n') {
	                        c = input.charAt(parser_pos);
	                        resulting_string += c;
	                        parser_pos += 1;
	                    }
	                    return [trim(resulting_string) + '\n', 'TK_UNKNOWN'];
	                }
	
	                // Spidermonkey-specific sharp variables for circular references
	                // https://developer.mozilla.org/En/Sharp_variables_in_JavaScript
	                // http://mxr.mozilla.org/mozilla-central/source/js/src/jsscan.cpp around line 1935
	                var sharp = '#';
	                if (parser_pos < input_length && in_array(input.charAt(parser_pos), digits)) {
	                    do {
	                        c = input.charAt(parser_pos);
	                        sharp += c;
	                        parser_pos += 1;
	                    } while (parser_pos < input_length && c !== '#' && c !== '=');
	                    if (c === '#') {
	                        //
	                    } else if (input.charAt(parser_pos) === '[' && input.charAt(parser_pos + 1) === ']') {
	                            sharp += '[]';
	                            parser_pos += 2;
	                        } else if (input.charAt(parser_pos) === '{' && input.charAt(parser_pos + 1) === '}') {
	                            sharp += '{}';
	                            parser_pos += 2;
	                        }
	                    return [sharp, 'TK_WORD'];
	                }
	            }
	
	            if (c === '<' && input.substring(parser_pos - 1, parser_pos + 3) === '<!--') {
	                parser_pos += 3;
	                c = '<!--';
	                while (input.charAt(parser_pos) !== '\n' && parser_pos < input_length) {
	                    c += input.charAt(parser_pos);
	                    parser_pos++;
	                }
	                flags.in_html_comment = true;
	                return [c, 'TK_COMMENT'];
	            }
	
	            if (c === '-' && flags.in_html_comment && input.substring(parser_pos - 1, parser_pos + 2) === '-->') {
	                flags.in_html_comment = false;
	                parser_pos += 2;
	                return ['-->', 'TK_COMMENT'];
	            }
	
	            if (c === '.') {
	                return [c, 'TK_DOT'];
	            }
	
	            if (in_array(c, punct)) {
	                while (parser_pos < input_length && in_array(c + input.charAt(parser_pos), punct)) {
	                    c += input.charAt(parser_pos);
	                    parser_pos += 1;
	                    if (parser_pos >= input_length) {
	                        break;
	                    }
	                }
	
	                if (c === ',') {
	                    return [c, 'TK_COMMA'];
	                } else if (c === '=') {
	                    return [c, 'TK_EQUALS'];
	                } else {
	                    return [c, 'TK_OPERATOR'];
	                }
	            }
	
	            return [c, 'TK_UNKNOWN'];
	        }
	
	        function handle_start_expr() {
	            if (start_of_statement()) {
	                // The conditional starts the statement if appropriate.
	            }
	
	            var next_mode = MODE.Expression;
	            if (token_text === '[') {
	
	                if (last_type === 'TK_WORD' || flags.last_text === ')') {
	                    // this is array index specifier, break immediately
	                    // a[x], fn()[x]
	                    if (last_type === 'TK_RESERVED' && in_array(flags.last_text, line_starters)) {
	                        output_space_before_token = true;
	                    }
	                    set_mode(next_mode);
	                    print_token();
	                    indent();
	                    if (opt.space_in_paren) {
	                        output_space_before_token = true;
	                    }
	                    return;
	                }
	
	                next_mode = MODE.ArrayLiteral;
	                if (is_array(flags.mode)) {
	                    if (flags.last_text === '[' || flags.last_text === ',' && (last_last_text === ']' || last_last_text === '}')) {
	                        // ], [ goes to new line
	                        // }, [ goes to new line
	                        if (!opt.keep_array_indentation) {
	                            print_newline();
	                        }
	                    }
	                }
	            } else {
	                if (last_type === 'TK_RESERVED' && flags.last_text === 'for') {
	                    next_mode = MODE.ForInitializer;
	                } else if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['if', 'while'])) {
	                    next_mode = MODE.Conditional;
	                } else {
	                    // next_mode = MODE.Expression;
	                }
	            }
	
	            if (flags.last_text === ';' || last_type === 'TK_START_BLOCK') {
	                print_newline();
	            } else if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR' || last_type === 'TK_END_BLOCK' || flags.last_text === '.') {
	                // TODO: Consider whether forcing this is required.  Review failing tests when removed.
	                allow_wrap_or_preserved_newline(input_wanted_newline);
	                // do nothing on (( and )( and ][ and ]( and .(
	            } else if (!(last_type === 'TK_RESERVED' && token_text === '(') && last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR') {
	                    output_space_before_token = true;
	                } else if (last_type === 'TK_RESERVED' && (flags.last_word === 'function' || flags.last_word === 'typeof') || flags.last_text === '*' && last_last_text === 'function') {
	                    // function() vs function ()
	                    if (opt.jslint_happy) {
	                        output_space_before_token = true;
	                    }
	                } else if (last_type === 'TK_RESERVED' && (in_array(flags.last_text, line_starters) || flags.last_text === 'catch')) {
	                    if (opt.space_before_conditional) {
	                        output_space_before_token = true;
	                    }
	                }
	
	            // Support of this kind of newline preservation.
	            // a = (b &&
	            //     (c || d));
	            if (token_text === '(') {
	                if (last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
	                    if (!start_of_object_property()) {
	                        allow_wrap_or_preserved_newline();
	                    }
	                }
	            }
	
	            set_mode(next_mode);
	            print_token();
	            if (opt.space_in_paren) {
	                output_space_before_token = true;
	            }
	
	            // In all cases, if we newline while inside an expression it should be indented.
	            indent();
	        }
	
	        function handle_end_expr() {
	            // statements inside expressions are not valid syntax, but...
	            // statements must all be closed when their container closes
	            while (flags.mode === MODE.Statement) {
	                restore_mode();
	            }
	
	            if (flags.multiline_frame) {
	                allow_wrap_or_preserved_newline(token_text === ']' && is_array(flags.mode) && !opt.keep_array_indentation);
	            }
	
	            if (opt.space_in_paren) {
	                if (last_type === 'TK_START_EXPR' && !opt.space_in_empty_paren) {
	                    // () [] no inner space in empty parens like these, ever, ref #320
	                    trim_output();
	                    output_space_before_token = false;
	                } else {
	                    output_space_before_token = true;
	                }
	            }
	            if (token_text === ']' && opt.keep_array_indentation) {
	                print_token();
	                restore_mode();
	            } else {
	                restore_mode();
	                print_token();
	            }
	            remove_redundant_indentation(previous_flags);
	
	            // do {} while () // no statement required after
	            if (flags.do_while && previous_flags.mode === MODE.Conditional) {
	                previous_flags.mode = MODE.Expression;
	                flags.do_block = false;
	                flags.do_while = false;
	            }
	        }
	
	        function handle_start_block() {
	            set_mode(MODE.BlockStatement);
	
	            var empty_braces = is_next('}');
	            var empty_anonymous_function = empty_braces && flags.last_word === 'function' && last_type === 'TK_END_EXPR';
	
	            if (opt.brace_style === "expand") {
	                if (last_type !== 'TK_OPERATOR' && (empty_anonymous_function || last_type === 'TK_EQUALS' || last_type === 'TK_RESERVED' && is_special_word(flags.last_text) && flags.last_text !== 'else')) {
	                    output_space_before_token = true;
	                } else {
	                    print_newline(false, true);
	                }
	            } else {
	                // collapse
	                if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR') {
	                    if (last_type === 'TK_START_BLOCK') {
	                        print_newline();
	                    } else {
	                        output_space_before_token = true;
	                    }
	                } else {
	                    // if TK_OPERATOR or TK_START_EXPR
	                    if (is_array(previous_flags.mode) && flags.last_text === ',') {
	                        if (last_last_text === '}') {
	                            // }, { in array context
	                            output_space_before_token = true;
	                        } else {
	                            print_newline(); // [a, b, c, {
	                        }
	                    }
	                }
	            }
	            print_token();
	            indent();
	        }
	
	        function handle_end_block() {
	            // statements must all be closed when their container closes
	            while (flags.mode === MODE.Statement) {
	                restore_mode();
	            }
	            var empty_braces = last_type === 'TK_START_BLOCK';
	
	            if (opt.brace_style === "expand") {
	                if (!empty_braces) {
	                    print_newline();
	                }
	            } else {
	                // skip {}
	                if (!empty_braces) {
	                    if (is_array(flags.mode) && opt.keep_array_indentation) {
	                        // we REALLY need a newline here, but newliner would skip that
	                        opt.keep_array_indentation = false;
	                        print_newline();
	                        opt.keep_array_indentation = true;
	                    } else {
	                        print_newline();
	                    }
	                }
	            }
	            restore_mode();
	            print_token();
	        }
	
	        function handle_word() {
	            if (start_of_statement()) {
	                // The conditional starts the statement if appropriate.
	            } else if (input_wanted_newline && !is_expression(flags.mode) && (last_type !== 'TK_OPERATOR' || flags.last_text === '--' || flags.last_text === '++') && last_type !== 'TK_EQUALS' && (opt.preserve_newlines || !(last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const', 'set', 'get'])))) {
	
	                    print_newline();
	                }
	
	            if (flags.do_block && !flags.do_while) {
	                if (token_type === 'TK_RESERVED' && token_text === 'while') {
	                    // do {} ## while ()
	                    output_space_before_token = true;
	                    print_token();
	                    output_space_before_token = true;
	                    flags.do_while = true;
	                    return;
	                } else {
	                    // do {} should always have while as the next word.
	                    // if we don't see the expected while, recover
	                    print_newline();
	                    flags.do_block = false;
	                }
	            }
	
	            // if may be followed by else, or not
	            // Bare/inline ifs are tricky
	            // Need to unwind the modes correctly: if (a) if (b) c(); else d(); else e();
	            if (flags.if_block) {
	                if (!flags.else_block && token_type === 'TK_RESERVED' && token_text === 'else') {
	                    flags.else_block = true;
	                } else {
	                    while (flags.mode === MODE.Statement) {
	                        restore_mode();
	                    }
	                    flags.if_block = false;
	                    flags.else_block = false;
	                }
	            }
	
	            if (token_type === 'TK_RESERVED' && (token_text === 'case' || token_text === 'default' && flags.in_case_statement)) {
	                print_newline();
	                if (flags.case_body || opt.jslint_happy) {
	                    // switch cases following one another
	                    deindent();
	                    flags.case_body = false;
	                }
	                print_token();
	                flags.in_case = true;
	                flags.in_case_statement = true;
	                return;
	            }
	
	            if (token_type === 'TK_RESERVED' && token_text === 'function') {
	                if (in_array(flags.last_text, ['}', ';']) || just_added_newline() && !in_array(flags.last_text, ['{', ':', '=', ','])) {
	                    // make sure there is a nice clean space of at least one blank line
	                    // before a new function definition
	                    if (!just_added_blankline() && !flags.had_comment) {
	                        print_newline();
	                        print_newline(true);
	                    }
	                }
	                if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD') {
	                    if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set', 'new', 'return'])) {
	                        output_space_before_token = true;
	                    } else {
	                        print_newline();
	                    }
	                } else if (last_type === 'TK_OPERATOR' || flags.last_text === '=') {
	                    // foo = function
	                    output_space_before_token = true;
	                } else if (is_expression(flags.mode)) {
	                    // (function
	                } else {
	                        print_newline();
	                    }
	            }
	
	            if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
	                if (!start_of_object_property()) {
	                    allow_wrap_or_preserved_newline();
	                }
	            }
	
	            if (token_type === 'TK_RESERVED' && token_text === 'function') {
	                print_token();
	                flags.last_word = token_text;
	                return;
	            }
	
	            prefix = 'NONE';
	
	            if (last_type === 'TK_END_BLOCK') {
	                if (!(token_type === 'TK_RESERVED' && in_array(token_text, ['else', 'catch', 'finally']))) {
	                    prefix = 'NEWLINE';
	                } else {
	                    if (opt.brace_style === "expand" || opt.brace_style === "end-expand") {
	                        prefix = 'NEWLINE';
	                    } else {
	                        prefix = 'SPACE';
	                        output_space_before_token = true;
	                    }
	                }
	            } else if (last_type === 'TK_SEMICOLON' && flags.mode === MODE.BlockStatement) {
	                // TODO: Should this be for STATEMENT as well?
	                prefix = 'NEWLINE';
	            } else if (last_type === 'TK_SEMICOLON' && is_expression(flags.mode)) {
	                prefix = 'SPACE';
	            } else if (last_type === 'TK_STRING') {
	                prefix = 'NEWLINE';
	            } else if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD' || flags.last_text === '*' && last_last_text === 'function') {
	                prefix = 'SPACE';
	            } else if (last_type === 'TK_START_BLOCK') {
	                prefix = 'NEWLINE';
	            } else if (last_type === 'TK_END_EXPR') {
	                output_space_before_token = true;
	                prefix = 'NEWLINE';
	            }
	
	            if (token_type === 'TK_RESERVED' && in_array(token_text, line_starters) && flags.last_text !== ')') {
	                if (flags.last_text === 'else') {
	                    prefix = 'SPACE';
	                } else {
	                    prefix = 'NEWLINE';
	                }
	            }
	
	            if (token_type === 'TK_RESERVED' && in_array(token_text, ['else', 'catch', 'finally'])) {
	                if (last_type !== 'TK_END_BLOCK' || opt.brace_style === "expand" || opt.brace_style === "end-expand") {
	                    print_newline();
	                } else {
	                    trim_output(true);
	                    var line = output_lines[output_lines.length - 1];
	                    // If we trimmed and there's something other than a close block before us
	                    // put a newline back in.  Handles '} // comment' scenario.
	                    if (line.text[line.text.length - 1] !== '}') {
	                        print_newline();
	                    }
	                    output_space_before_token = true;
	                }
	            } else if (prefix === 'NEWLINE') {
	                if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
	                    // no newline between 'return nnn'
	                    output_space_before_token = true;
	                } else if (last_type !== 'TK_END_EXPR') {
	                    if ((last_type !== 'TK_START_EXPR' || !(token_type === 'TK_RESERVED' && in_array(token_text, ['var', 'let', 'const']))) && flags.last_text !== ':') {
	                        // no need to force newline on 'var': for (var x = 0...)
	                        if (token_type === 'TK_RESERVED' && token_text === 'if' && flags.last_word === 'else' && flags.last_text !== '{') {
	                            // no newline for } else if {
	                            output_space_before_token = true;
	                        } else {
	                            print_newline();
	                        }
	                    }
	                } else if (token_type === 'TK_RESERVED' && in_array(token_text, line_starters) && flags.last_text !== ')') {
	                    print_newline();
	                }
	            } else if (is_array(flags.mode) && flags.last_text === ',' && last_last_text === '}') {
	                print_newline(); // }, in lists get a newline treatment
	            } else if (prefix === 'SPACE') {
	                    output_space_before_token = true;
	                }
	            print_token();
	            flags.last_word = token_text;
	
	            if (token_type === 'TK_RESERVED' && token_text === 'do') {
	                flags.do_block = true;
	            }
	
	            if (token_type === 'TK_RESERVED' && token_text === 'if') {
	                flags.if_block = true;
	            }
	        }
	
	        function handle_semicolon() {
	            if (start_of_statement()) {
	                // The conditional starts the statement if appropriate.
	                // Semicolon can be the start (and end) of a statement
	                output_space_before_token = false;
	            }
	            while (flags.mode === MODE.Statement && !flags.if_block && !flags.do_block) {
	                restore_mode();
	            }
	            print_token();
	            if (flags.mode === MODE.ObjectLiteral) {
	                // if we're in OBJECT mode and see a semicolon, its invalid syntax
	                // recover back to treating this as a BLOCK
	                flags.mode = MODE.BlockStatement;
	            }
	        }
	
	        function handle_string() {
	            if (start_of_statement()) {
	                // The conditional starts the statement if appropriate.
	                // One difference - strings want at least a space before
	                output_space_before_token = true;
	            } else if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD') {
	                output_space_before_token = true;
	            } else if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
	                if (!start_of_object_property()) {
	                    allow_wrap_or_preserved_newline();
	                }
	            } else {
	                print_newline();
	            }
	            print_token();
	        }
	
	        function handle_equals() {
	            if (start_of_statement()) {
	                // The conditional starts the statement if appropriate.
	            }
	
	            if (flags.declaration_statement) {
	                // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
	                flags.declaration_assignment = true;
	            }
	            output_space_before_token = true;
	            print_token();
	            output_space_before_token = true;
	        }
	
	        function handle_comma() {
	            if (flags.declaration_statement) {
	                if (is_expression(flags.parent.mode)) {
	                    // do not break on comma, for(var a = 1, b = 2)
	                    flags.declaration_assignment = false;
	                }
	
	                print_token();
	
	                if (flags.declaration_assignment) {
	                    flags.declaration_assignment = false;
	                    print_newline(false, true);
	                } else {
	                    output_space_before_token = true;
	                }
	                return;
	            }
	
	            print_token();
	            if (flags.mode === MODE.ObjectLiteral || flags.mode === MODE.Statement && flags.parent.mode === MODE.ObjectLiteral) {
	                if (flags.mode === MODE.Statement) {
	                    restore_mode();
	                }
	                print_newline();
	            } else {
	                // EXPR or DO_BLOCK
	                output_space_before_token = true;
	            }
	        }
	
	        function handle_operator() {
	            // Check if this is a BlockStatement that should be treated as a ObjectLiteral
	            if (token_text === ':' && flags.mode === MODE.BlockStatement && last_last_text === '{' && (last_type === 'TK_WORD' || last_type === 'TK_RESERVED')) {
	                flags.mode = MODE.ObjectLiteral;
	            }
	
	            if (start_of_statement()) {
	                // The conditional starts the statement if appropriate.
	            }
	
	            var space_before = true;
	            var space_after = true;
	            if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
	                // "return" had a special handling in TK_WORD. Now we need to return the favor
	                output_space_before_token = true;
	                print_token();
	                return;
	            }
	
	            // hack for actionscript's import .*;
	            if (token_text === '*' && last_type === 'TK_DOT' && !last_last_text.match(/^\d+$/)) {
	                print_token();
	                return;
	            }
	
	            if (token_text === ':' && flags.in_case) {
	                flags.case_body = true;
	                indent();
	                print_token();
	                print_newline();
	                flags.in_case = false;
	                return;
	            }
	
	            if (token_text === '::') {
	                // no spaces around exotic namespacing syntax operator
	                print_token();
	                return;
	            }
	
	            // http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
	            // if there is a newline between -- or ++ and anything else we should preserve it.
	            if (input_wanted_newline && (token_text === '--' || token_text === '++')) {
	                print_newline();
	            }
	
	            // Allow line wrapping between operators
	            if (last_type === 'TK_OPERATOR') {
	                allow_wrap_or_preserved_newline();
	            }
	
	            if (in_array(token_text, ['--', '++', '!', '~']) || in_array(token_text, ['-', '+']) && (in_array(last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS', 'TK_OPERATOR']) || in_array(flags.last_text, line_starters) || flags.last_text === ',')) {
	                // unary operators (and binary +/- pretending to be unary) special cases
	
	                space_before = false;
	                space_after = false;
	
	                if (flags.last_text === ';' && is_expression(flags.mode)) {
	                    // for (;; ++i)
	                    //        ^^^
	                    space_before = true;
	                }
	
	                if (last_type === 'TK_RESERVED') {
	                    space_before = true;
	                }
	
	                if ((flags.mode === MODE.BlockStatement || flags.mode === MODE.Statement) && (flags.last_text === '{' || flags.last_text === ';')) {
	                    // { foo; --i }
	                    // foo(); --bar;
	                    print_newline();
	                }
	            } else if (token_text === ':') {
	                if (flags.ternary_depth === 0) {
	                    if (flags.mode === MODE.BlockStatement) {
	                        flags.mode = MODE.ObjectLiteral;
	                    }
	                    space_before = false;
	                } else {
	                    flags.ternary_depth -= 1;
	                }
	            } else if (token_text === '?') {
	                flags.ternary_depth += 1;
	            } else if (token_text === '*' && last_type === 'TK_RESERVED' && flags.last_text === 'function') {
	                space_before = false;
	                space_after = false;
	            }
	            output_space_before_token = output_space_before_token || space_before;
	            print_token();
	            output_space_before_token = space_after;
	        }
	
	        function handle_block_comment() {
	            var lines = split_newlines(token_text);
	            var j; // iterator for this case
	            var javadoc = false;
	
	            // block comment starts with a new line
	            print_newline(false, true);
	            if (lines.length > 1) {
	                if (all_lines_start_with(lines.slice(1), '*')) {
	                    javadoc = true;
	                }
	            }
	
	            // first line always indented
	            print_token(lines[0]);
	            for (j = 1; j < lines.length; j++) {
	                print_newline(false, true);
	                if (javadoc) {
	                    // javadoc: reformat and re-indent
	                    print_token(' ' + trim(lines[j]));
	                } else {
	                    // normal comments output raw
	                    output_lines[output_lines.length - 1].text.push(lines[j]);
	                }
	            }
	
	            // for comments of more than one line, make sure there's a new line after
	            print_newline(false, true);
	        }
	
	        function handle_inline_comment() {
	            output_space_before_token = true;
	            print_token();
	            output_space_before_token = true;
	        }
	
	        function handle_comment() {
	            if (input_wanted_newline) {
	                print_newline(false, true);
	            } else {
	                trim_output(true);
	            }
	
	            output_space_before_token = true;
	            print_token();
	            print_newline(false, true);
	        }
	
	        function handle_dot() {
	            if (start_of_statement()) {
	                // The conditional starts the statement if appropriate.
	            }
	
	            if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
	                output_space_before_token = true;
	            } else {
	                // allow preserved newlines before dots in general
	                // force newlines on dots after close paren when break_chained - for bar().baz()
	                allow_wrap_or_preserved_newline(flags.last_text === ')' && opt.break_chained_methods);
	            }
	
	            print_token();
	        }
	
	        function handle_unknown() {
	            print_token();
	
	            if (token_text[token_text.length - 1] === '\n') {
	                print_newline();
	            }
	        }
	    }
	
	    if (true) {
	        // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return { js_beautify: js_beautify };
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        // Add support for CommonJS. Just put this file somewhere on your require.paths
	        // and you will be able to `var js_beautify = require("beautify").js_beautify`.
	        exports.js_beautify = js_beautify;
	    } else if (typeof window !== "undefined") {
	        // If we're running a web page and don't have either of the above, add our one global
	        window.js_beautify = js_beautify;
	    } else if (typeof global !== "undefined") {
	        // If we don't even have window, try global.
	        global.js_beautify = js_beautify;
	    }
	})();

/***/ }
/******/ ]);
//# sourceMappingURL=common.js.map