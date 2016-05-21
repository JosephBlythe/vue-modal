/******/ (function(modules) { // webpackBootstrap
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2);

	module.exports = {
	    modalSlide: __webpack_require__(44)
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _defineProperties = __webpack_require__(3);

	var _defineProperties2 = _interopRequireDefault(_defineProperties);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function () {

	    function Modal() {
	        this.set = false;

	        this.modals = {};
	    }

	    function _toCamelCase(val) {
	        return val.replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2, offset) {
	            if (p2) {
	                return p2.toUpperCase();
	            }

	            return p1.toLowerCase();
	        });
	    }

	    Modal.prototype.register = function (name) {
	        var i,
	            ccName = _toCamelCase(name),
	            modals = {};

	        for (i in this.modals) {
	            modals[i] = this.modals[i];
	        }

	        modals[ccName] = {
	            visible: false,
	            name: name,
	            data: {}
	        };

	        this.modals = modals;

	        return ccName;
	    };

	    Modal.prototype.show = function (name, data, overlap) {
	        name = _toCamelCase(name);
	        overlap = overlap === true ? true : false;

	        if (!overlap) {
	            this.hide(null, true);
	        }

	        this.modals[name].visible = true;
	        this.modals[name].data = data || {};

	        document.body.style.overflow = 'hidden';
	    };

	    Modal.prototype.hide = function (name, reset) {
	        var i;

	        if (name) {
	            name = _toCamelCase(name);

	            this.modals[name].visible = false;

	            // If there is still a modal open we don't
	            // want to restore the body's overflow.
	            for (i in this.modals) {
	                if (this.modals[i].visible === true) {
	                    return;
	                }
	            }
	        } else {
	            for (i in this.modals) {
	                this.modals[i].visible = false;
	            }
	        }

	        if (!reset) {

	            // Since our transitions are .4s
	            // This will avoid seeing double scrollbars (nicer transition).
	            setTimeout(function () {
	                document.body.style.overflow = '';
	            }, 450);
	        }
	    };

	    Modal.prototype.data = function (name) {
	        name = _toCamelCase(name);

	        return this.modals[name].data || {};
	    };

	    Modal.prototype.visible = function (name) {
	        name = _toCamelCase(name);

	        return this.modals[name].visible;
	    };

	    Modal.prototype.context = function (ctx) {
	        if (!this.set) {
	            ctx[ctx.set ? 'set' : '$set']('__modal', this);
	            this.set = true;
	        }
	    };

	    function install(Vue) {
	        if (Vue.modal) {
	            return true;
	        }

	        var modal = new Modal();

	        Vue.modal = Modal;

	        Vue.component('modal', __webpack_require__(37));

	        (0, _defineProperties2.default)(Vue.prototype, {
	            $modal: {
	                get: function get() {
	                    modal.context(this);

	                    return modal;
	                }
	            }
	        });
	    }

	    Vue.use(install);

	    return install;
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	var $Object = __webpack_require__(8).Object;
	module.exports = function defineProperties(T, D){
	  return $Object.defineProperties(T, D);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !__webpack_require__(16), 'Object', {defineProperties: __webpack_require__(21)});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(8)
	  , ctx       = __webpack_require__(9)
	  , hide      = __webpack_require__(11)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 7 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(10);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(12)
	  , createDesc = __webpack_require__(20);
	module.exports = __webpack_require__(16) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(13)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , toPrimitive    = __webpack_require__(19)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(16) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(16) && !__webpack_require__(17)(function(){
	  return Object.defineProperty(__webpack_require__(18)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14)
	  , document = __webpack_require__(7).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(14);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(12)
	  , anObject = __webpack_require__(13)
	  , getKeys  = __webpack_require__(22);

	module.exports = __webpack_require__(16) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(23)
	  , enumBugKeys = __webpack_require__(36);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(24)
	  , toIObject    = __webpack_require__(25)
	  , arrayIndexOf = __webpack_require__(29)(false)
	  , IE_PROTO     = __webpack_require__(33)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(26)
	  , defined = __webpack_require__(28);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(27);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(25)
	  , toLength  = __webpack_require__(30)
	  , toIndex   = __webpack_require__(32);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(31)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(31)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(34)('keys')
	  , uid    = __webpack_require__(35);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(38)
	__vue_script__ = __webpack_require__(42)
	__vue_template__ = __webpack_require__(43)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vagrant/Code/plugins/Vue.js/vue-modal/src/modals/Shell.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(39);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(41)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-cd37da96&file=Shell.vue!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Shell.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-cd37da96&file=Shell.vue!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Shell.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(40)();
	// imports


	// module
	exports.push([module.id, "\r\n    .vue-modal-mask {\r\n        position: fixed;\r\n        z-index: 10000;\r\n        top: 0;\r\n        left: 0;\r\n        width: 100%;\r\n        height: 100%;\r\n        background-color: rgba(0, 0, 0, .7);\r\n        -webkit-transition: opacity .3s ease;\r\n        transition: opacity .3s ease;\r\n        overflow-y: scroll;\r\n    }\r\n    .vue-modal-mask > .vue-modal-wrapper {\r\n        display:table;\r\n        margin: 0 auto;\r\n        height: 100%;\r\n        max-width: 600px;\r\n        -webkit-transition: margin-top .4s ease;\r\n        transition: margin-top .4s ease;\r\n        overflow: hidden;\r\n    }\r\n    .vue-modal-mask > .vue-modal-wrapper > .vue-modal-container {\r\n        display:table-cell;\r\n        vertical-align:middle;\r\n    }\r\n    .vue-modal-mask > .vue-modal-close {\r\n        position: fixed;\r\n        right: 30px;\r\n        top: 10px;\r\n        color: #fff;\r\n        font-weight: bold;\r\n        font-size: 16px;\r\n        font-family: verdana;\r\n        cursor: pointer;\r\n        z-index: 10001;\r\n    }\r\n\r\n    /* transitions */\r\n    .slide-down-enter.vue-modal-mask,\r\n    .slide-down-leave.vue-modal-mask {\r\n        opacity: 0;\r\n    }\r\n    .slide-down-enter .vue-modal-wrapper,\r\n    .slide-down-leave .vue-modal-wrapper {\r\n        margin-top: -500px;\r\n    }\r\n\r\n    /*.center-pop-enter.vue-modal-mask,\r\n    .center-pop-leave.vue-modal-mask {\r\n        opacity: 0;\r\n    }\r\n    .center-pop-enter .vue-modal-wrapper,\r\n    .center-pop-leave .vue-modal-wrapper {\r\n        max-width: 0px;\r\n    }*/\r\n", ""]);

	// exports


/***/ },
/* 40 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div v-show="show" class="vue-modal-mask" v-on:click.stop="hide()" :transition="transition">
	//         <div class="vue-modal-close">x</div>
	//
	//         <div class="vue-modal-wrapper">
	//             <div class="vue-modal-container" v-on:click.stop="nothing()">
	//                 <slot name="content"></slot>
	//             </div>
	//         </div>
	//     </div>
	// </template>
	//
	// <script>
	exports.default = {
	    props: ['name', 'transition'],
	    data: function data() {
	        return {
	            show: false,
	            transition: this.transition || 'slide-down'
	        };
	    },
	    ready: function ready() {
	        var name = this.$modal.register(this.name),
	            funcs = this.$parent.$options.modals;

	        this.$watch('$modal.modals.' + name + '.visible', function (newVal, oldVal) {
	            this.show = newVal;

	            if (!funcs || !funcs[this.name]) {
	                return;
	            }

	            if (newVal === true && oldVal === false && funcs[this.name].onShow) {
	                funcs[this.name].onShow.call(this.$parent);
	            } else if (newVal === false && oldVal === true && funcs[this.name].onHide) {
	                funcs[this.name].onHide.call(this.$parent);
	            }
	        });
	    },

	    methods: {
	        hide: function hide() {
	            this.$modal.hide(this.name);
	        },
	        nothing: function nothing() {
	            // Null;
	        }
	    }
	};
	// </script>
	//
	// <style>
	//     .vue-modal-mask {
	//         position: fixed;
	//         z-index: 10000;
	//         top: 0;
	//         left: 0;
	//         width: 100%;
	//         height: 100%;
	//         background-color: rgba(0, 0, 0, .7);
	//         transition: opacity .3s ease;
	//         overflow-y: scroll;
	//     }
	//     .vue-modal-mask > .vue-modal-wrapper {
	//         display:table;
	//         margin: 0 auto;
	//         height: 100%;
	//         max-width: 600px;
	//         transition: margin-top .4s ease;
	//         overflow: hidden;
	//     }
	//     .vue-modal-mask > .vue-modal-wrapper > .vue-modal-container {
	//         display:table-cell;
	//         vertical-align:middle;
	//     }
	//     .vue-modal-mask > .vue-modal-close {
	//         position: fixed;
	//         right: 30px;
	//         top: 10px;
	//         color: #fff;
	//         font-weight: bold;
	//         font-size: 16px;
	//         font-family: verdana;
	//         cursor: pointer;
	//         z-index: 10001;
	//     }
	//
	//     /* transitions */
	//     .slide-down-enter.vue-modal-mask,
	//     .slide-down-leave.vue-modal-mask {
	//         opacity: 0;
	//     }
	//     .slide-down-enter .vue-modal-wrapper,
	//     .slide-down-leave .vue-modal-wrapper {
	//         margin-top: -500px;
	//     }
	//
	//     /*.center-pop-enter.vue-modal-mask,
	//     .center-pop-leave.vue-modal-mask {
	//         opacity: 0;
	//     }
	//     .center-pop-enter .vue-modal-wrapper,
	//     .center-pop-leave .vue-modal-wrapper {
	//         max-width: 0px;
	//     }*/
	// </style>

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div v-show=\"show\" class=\"vue-modal-mask\" v-on:click.stop=\"hide()\" :transition=\"transition\">\r\n        <div class=\"vue-modal-close\">x</div>\r\n\r\n        <div class=\"vue-modal-wrapper\">\r\n            <div class=\"vue-modal-container\" v-on:click.stop=\"nothing()\">\r\n                <slot name=\"content\"></slot>\r\n            </div>\r\n        </div>\r\n    </div>\r\n";

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(45)
	__vue_script__ = __webpack_require__(47)
	__vue_template__ = __webpack_require__(48)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vagrant/Code/plugins/Vue.js/vue-modal/src/modals/SlideShow.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(46);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(41)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-26fc0353&file=SlideShow.vue!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./SlideShow.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-26fc0353&file=SlideShow.vue!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./SlideShow.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(40)();
	// imports


	// module
	exports.push([module.id, "\r\n    .modal-slide-show-next,\r\n    .modal-slide-show-previous {\r\n        position: fixed;\r\n        display: table;\r\n        top: 0px;\r\n        height: 100%;\r\n        font-size: 30px;\r\n        text-align: center;\r\n        color: #fff;\r\n        font-weight: bold;\r\n        font-size: 40px;\r\n        font-family: verdana;\r\n    }\r\n\r\n    .modal-slide-show-next > div,\r\n    .modal-slide-show-previous > div {\r\n        display: table-cell;\r\n        vertical-align: middle;\r\n    }\r\n    .modal-slide-show-next > div > div,\r\n    .modal-slide-show-previous > div > div {\r\n        height: 100px;\r\n        line-height: 100px;\r\n        cursor: pointer;\r\n    }\r\n\r\n    .modal-slide-show-next {\r\n        right: 20px;\r\n        width: 80px;\r\n    }\r\n\r\n    .modal-slide-show-previous {\r\n        width: 100px;\r\n        left: 0px;\r\n    }\r\n    .modal-slide-show-no-data {\r\n        font-size:16px;\r\n        color: #fff;\r\n    }\r\n    .modal-slide-show-iframe {\r\n        background: #333;\r\n    }\r\n", ""]);

	// exports


/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <modal :name="name" :transition="transition || 'slide-down'">
	//         <div slot="content">
	//             <iframe v-if="data"
	//                 src="{{ src }}"
	//                 class="modal-slide-show-iframe"
	//                 width="{{ this.width || 400 }}"
	//                 height="{{ this.width || 300 }}"
	//                 marginwidth="0"
	//                 marginheight="0"
	//                 align="top"
	//                 scrolling="No"
	//                 frameborder="0"
	//                 hspace="0"
	//                 vspace="0"
	//             >
	//             </iframe>
	//
	//             <div v-if="!data" class="modal-slide-show-no-data">
	//                 No data loaded.
	//             </div>
	//
	//             <div class="modal-slide-show-previous">
	//                 <div>
	//                     <div v-on:click.stop="previous()">&lsaquo;</div>
	//                 </div>
	//             </div>
	//             <div class="modal-slide-show-next">
	//                 <div>
	//                     <div v-on:click.stop="next()">&rsaquo;</div>
	//                 </div>
	//             </div>
	//         </div>
	//     </modal>
	// </template>
	//
	// <script>
	exports.default = {
	    props: ['name', 'transition', 'data', 'width', 'height'],
	    data: function data() {
	        return {
	            index: 0,
	            src: null
	        };
	    },
	    ready: function ready() {
	        var modals = this.$parent.$options.modals;

	        this.$options.modals[this.name] = {
	            onShow: function onShow() {
	                this.index = this.$modal.data(this.name).index || this.index;

	                if (modals && modals[this.name] && modals[this.name].onShow) {
	                    modals[this.name].onShow.call(this.$parent);
	                }
	            },
	            onHide: function onHide() {
	                this.src = null;

	                if (modals && modals[this.name] && modals[this.name].onHide) {
	                    modals[this.name].onHide.call(this.$parent);
	                }
	            }
	        };
	    },

	    watch: {
	        index: function index() {
	            this.src = this.data[this.index].link;
	        }
	    },
	    methods: {
	        previous: function previous() {
	            if (this.index === 0) {
	                this.index = this.data.length - 1;
	            } else {
	                this.index = this.index - 1;
	            }
	        },
	        next: function next() {
	            if (this.index === this.data.length - 1) {
	                this.index = 0;
	            } else {
	                this.index = this.index + 1;
	            }
	        }
	    },
	    modals: {}
	};
	// </script>
	//
	// <style>
	//     .modal-slide-show-next,
	//     .modal-slide-show-previous {
	//         position: fixed;
	//         display: table;
	//         top: 0px;
	//         height: 100%;
	//         font-size: 30px;
	//         text-align: center;
	//         color: #fff;
	//         font-weight: bold;
	//         font-size: 40px;
	//         font-family: verdana;
	//     }
	//
	//     .modal-slide-show-next > div,
	//     .modal-slide-show-previous > div {
	//         display: table-cell;
	//         vertical-align: middle;
	//     }
	//     .modal-slide-show-next > div > div,
	//     .modal-slide-show-previous > div > div {
	//         height: 100px;
	//         line-height: 100px;
	//         cursor: pointer;
	//     }
	//
	//     .modal-slide-show-next {
	//         right: 20px;
	//         width: 80px;
	//     }
	//
	//     .modal-slide-show-previous {
	//         width: 100px;
	//         left: 0px;
	//     }
	//     .modal-slide-show-no-data {
	//         font-size:16px;
	//         color: #fff;
	//     }
	//     .modal-slide-show-iframe {
	//         background: #333;
	//     }
	// </style>

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = "\r\n    <modal :name=\"name\" :transition=\"transition || 'slide-down'\">\r\n        <div slot=\"content\">\r\n            <iframe v-if=\"data\"\r\n                src=\"{{ src }}\"\r\n                class=\"modal-slide-show-iframe\"\r\n                width=\"{{ this.width || 400 }}\"\r\n                height=\"{{ this.width || 300 }}\"\r\n                marginwidth=\"0\"\r\n                marginheight=\"0\"\r\n                align=\"top\"\r\n                scrolling=\"No\"\r\n                frameborder=\"0\"\r\n                hspace=\"0\"\r\n                vspace=\"0\"\r\n            >\r\n            </iframe>\r\n            \r\n            <div v-if=\"!data\" class=\"modal-slide-show-no-data\">\r\n                No data loaded.\r\n            </div>\r\n\r\n            <div class=\"modal-slide-show-previous\">\r\n                <div>\r\n                    <div v-on:click.stop=\"previous()\">&lsaquo;</div>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-slide-show-next\">\r\n                <div>\r\n                    <div v-on:click.stop=\"next()\">&rsaquo;</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </modal>\r\n";

/***/ }
/******/ ]);