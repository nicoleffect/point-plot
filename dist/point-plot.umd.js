/*!
 * point-plot v1.0.6
 * (c) 2019 Nicole Wong
 * Released under the MIT License.
 */

/*
 * github: https://github.com/nicolesite/point-plot
 * demo: https://nicolesite.github.io/point-plot/examples/index.html
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.pointPlot = factory());
}(this, function () { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
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
	var _export = $export;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)


	_export(_export.S, 'Array', { isArray: _isArray });

	var isArray = _core.Array.isArray;

	var isArray$1 = isArray;

	function _arrayWithoutHoles(arr) {
	  if (isArray$1(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  }
	}

	var arrayWithoutHoles = _arrayWithoutHoles;

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _redefine = _hide;

	var _iterators = {};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'pure',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator

	var ITERATOR$1 = _wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
	};

	var _createProperty = function (object, index, value) {
	  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
	  else object[index] = value;
	};

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var ITERATOR$2 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var ITERATOR$3 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$3]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$3] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	_export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = _toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = core_getIteratorMethod(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	var from_1 = _core.Array.from;

	var from_1$1 = from_1;

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	var TO_STRING_TAG = _wks('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = _global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	  _iterators[NAME] = _iterators.Array;
	}

	var ITERATOR$4 = _wks('iterator');

	var core_isIterable = _core.isIterable = function (it) {
	  var O = Object(it);
	  return O[ITERATOR$4] !== undefined
	    || '@@iterator' in O
	    // eslint-disable-next-line no-prototype-builtins
	    || _iterators.hasOwnProperty(_classof(O));
	};

	var isIterable = core_isIterable;

	var isIterable$1 = isIterable;

	function _iterableToArray(iter) {
	  if (isIterable$1(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]") return from_1$1(iter);
	}

	var iterableToArray = _iterableToArray;

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	var nonIterableSpread = _nonIterableSpread;

	function _toConsumableArray(arr) {
	  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
	}

	var toConsumableArray = _toConsumableArray;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	var $Object = _core.Object;
	var defineProperty = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$1 = defineProperty;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    defineProperty$1(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	var isMobile = function () {
	  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent);
	}();
	var getPixelRatio = function getPixelRatio(ctx) {
	  var backingStore = ctx.backingStorePixelRatio || ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
	  return (window.devicePixelRatio || 1) / backingStore;
	};
	var isOutside = function isOutside(x, y, d, rect) {
	  var left = rect.left,
	      right = rect.right,
	      top = rect.top,
	      bottom = rect.bottom;

	  if (x < left - d || x > right + d || y < top - d || y > bottom + d) {
	    // console.log(true)
	    return true;
	  } // console.log(false)


	  return false;
	};

	var paintDot = function paintDot(ctx, dot, color) {
	  // console.log(dot)
	  var x = dot.x,
	      y = dot.y,
	      r = dot.r;
	  ctx.fillStyle = 'rgba(' + color + ', 0.8)';
	  ctx.beginPath();
	  ctx.arc(x, y, r, 0, Math.PI * 2);
	  ctx.fill();
	  ctx.closePath();
	};

	var getDot = function getDot(_ref) {
	  var rect = _ref.rect,
	      r = _ref.r,
	      _ref$x = _ref.x,
	      x = _ref$x === void 0 ? '' : _ref$x,
	      _ref$y = _ref.y,
	      y = _ref$y === void 0 ? '' : _ref$y;
	  var width = rect.width,
	      height = rect.height;
	  return {
	    x: x || Math.random() * width,
	    y: y || Math.random() * height,
	    sx: Math.random() * 2 - 1,
	    sy: Math.random() * 2 - 1,
	    r: Math.random() * r
	  };
	};

	var Dot =
	/*#__PURE__*/
	function () {
	  function Dot(_ref2) {
	    var ctx = _ref2.ctx,
	        rect = _ref2.rect,
	        color = _ref2.color,
	        r = _ref2.r,
	        d = _ref2.d,
	        _ref2$tx = _ref2.tx,
	        tx = _ref2$tx === void 0 ? '' : _ref2$tx,
	        _ref2$ty = _ref2.ty,
	        ty = _ref2$ty === void 0 ? '' : _ref2$ty;

	    classCallCheck(this, Dot);

	    this.ctx = ctx; // canvas

	    this.rect = rect; // canvas rect

	    this.r = r; // radius for a basic dot

	    this.color = color; // color for dot

	    this.d = d;
	    this.dot = {};
	    this.init(tx, ty);
	  }

	  createClass(Dot, [{
	    key: "init",
	    value: function init() {
	      var tx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      var ty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	      this.dot = getDot({
	        rect: this.rect,
	        r: this.r,
	        x: tx,
	        y: ty
	      });
	      paintDot(this.ctx, this.dot, this.color);
	    }
	  }, {
	    key: "update",
	    value: function update(callback) {
	      var _this$dot = this.dot,
	          x = _this$dot.x,
	          y = _this$dot.y,
	          r = _this$dot.r,
	          sx = _this$dot.sx,
	          sy = _this$dot.sy; // console.log(x, y)
	      // out

	      var nx = x + sx;
	      var ny = y + sy;

	      if (isOutside(nx, ny, this.d, this.rect)) {
	        callback && callback(); // this.init()

	        return;
	      }

	      this.dot.x = nx;
	      this.dot.y = ny; // console.log(sx, sy)

	      paintDot(this.ctx, this.dot, this.color);
	    }
	  }]);

	  return Dot;
	}();

	var PointPlot =
	/*#__PURE__*/
	function () {
	  function PointPlot(_ref) {
	    var canvas = _ref.canvas,
	        color = _ref.color,
	        r = _ref.r,
	        distance = _ref.distance,
	        isConnect = _ref.isConnect,
	        isOnClick = _ref.isOnClick,
	        isOnMove = _ref.isOnMove;

	    classCallCheck(this, PointPlot);

	    // console.log(canvas.getBoundingClientRect())
	    var canvas_rect = canvas.getBoundingClientRect();
	    var canvas_width = canvas_rect.width;
	    var canvas_height = canvas_rect.height;
	    this.ctx = canvas.getContext('2d');
	    var pixelRatio = getPixelRatio(this.ctx); // console.log(pixelRatio)

	    canvas.width = canvas_width * pixelRatio;
	    canvas.height = canvas_height * pixelRatio;
	    this.rect = canvas_rect; // this.cw = canvas.width
	    // this.ch = canvas.height

	    this.dots_count = Math.floor(canvas_width * canvas_height / (distance * 100));
	    this.dots_distance = distance;
	    this.dots_arr = [];
	    this.color = color;
	    this.r = r;
	    this.ctx.scale(pixelRatio, pixelRatio);
	    this.ctx.translate(1 / pixelRatio, 1 / pixelRatio);

	    for (var i = 0; i < this.dots_count; i++) {
	      this.initDot();
	    }

	    this.anim(isConnect);

	    if (isOnClick) {
	      this.onClick();
	    }

	    if (isOnMove) {
	      this.onMove();
	    }
	  }

	  createClass(PointPlot, [{
	    key: "initDot",
	    value: function initDot(tx, ty) {
	      var dot = new Dot({
	        ctx: this.ctx,
	        rect: this.rect,
	        d: this.dots_distance,
	        color: this.color,
	        r: this.r,
	        tx: tx,
	        ty: ty
	      });
	      this.dots_arr.push(dot); // console.log(this.dots_arr)
	    }
	  }, {
	    key: "anim",
	    value: function anim(isConnect) {
	      var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	      var _this = this;

	      var _this$rect = this.rect,
	          width = _this$rect.width,
	          height = _this$rect.height;
	      var d = this.dots_distance;
	      var cw = width + d;
	      var ch = height + d;
	      return function _animateUpdate() {
	        _this.ctx.clearRect(-d, -d, cw, ch); // clear canvas


	        var arr = _this.dots_arr;
	        arr.forEach(function (item_i, i) {
	          item_i.update(function () {
	            if (arr.length > _this.dots_count) {
	              arr.splice(i, 1);
	            } else {
	              item_i.init();
	            }
	          });

	          if (isConnect) {
	            var cache = toConsumableArray(arr);

	            cache.splice(i, 1);
	            cache.forEach(function (item_j, j) {
	              var dot_i = item_i.dot;
	              var dot_j = item_j.dot;
	              var ix = dot_i.x;
	              var iy = dot_i.y;
	              var jx = dot_j.x;
	              var jy = dot_j.y; // console.log(arr[i])

	              var s = Math.sqrt(Math.pow(ix - jx, 2) + Math.pow(iy - jy, 2)); // right triangle
	              // console.log(s, d)

	              if (s < d) {
	                var ctx = _this.ctx; // draw a line

	                ctx.beginPath();
	                ctx.moveTo(ix, iy);
	                ctx.lineTo(jx, jy);
	                ctx.strokeStyle = "rgba(".concat(_this.color, ",").concat(Math.round((d - s) / d * 10) / 10, ")");
	                ctx.strokeWidth = 1;
	                ctx.stroke();
	                ctx.closePath();
	              }
	            });
	          }
	        });
	        requestAnimFrame(_animateUpdate);
	      }();
	    }
	  }, {
	    key: "onClick",
	    value: function onClick() {
	      var _this2 = this;

	      var event = isMobile ? 'touchstart' : 'click';

	      var _createDot = function _createDot(e) {
	        // console.log(e)
	        var touch = isMobile ? e.touches[0] : e;
	        var tx = touch.pageX;
	        var ty = touch.pageY;

	        if (isOutside(tx, ty, _this2.dots_distance, _this2.rect)) {
	          return;
	        }

	        _this2.initDot(tx, ty); // if (this.dots_arr.length > this.dots_count) {
	        //   this.dots_arr.shift()
	        // }

	      };

	      document.addEventListener(event, _createDot);
	    }
	  }, {
	    key: "onMove",
	    value: function onMove() {
	      var _this3 = this;

	      var e_down = isMobile ? 'touchstart' : 'mousedown';
	      var e_move = isMobile ? 'touchmove' : 'mousemove';
	      var e_up = isMobile ? 'touchend' : 'mouseup';

	      var _moveDot = function _moveDot(e) {
	        var touch = isMobile ? e.touches[0] : e;
	        var tx = touch.pageX;
	        var ty = touch.pageY;

	        if (isOutside(tx, ty, _this3.dots_distance, _this3.rect)) {
	          return;
	        }

	        _this3.dots_arr[_this3.dots_arr.length - 1].init(tx, ty);
	      };

	      document.addEventListener(e_down, function () {
	        document.addEventListener(e_move, _moveDot);
	      });
	      document.addEventListener(e_up, function () {
	        document.removeEventListener(e_move, _moveDot);
	      });
	    }
	  }]);

	  return PointPlot;
	}();

	var pointPlot = function pointPlot(_ref) {
	  var canvas = _ref.canvas,
	      _ref$color = _ref.color,
	      color = _ref$color === void 0 ? '255, 255, 255' : _ref$color,
	      _ref$r = _ref.r,
	      r = _ref$r === void 0 ? 3 : _ref$r,
	      _ref$distance = _ref.distance,
	      distance = _ref$distance === void 0 ? 100 : _ref$distance,
	      _ref$isConnect = _ref.isConnect,
	      isConnect = _ref$isConnect === void 0 ? true : _ref$isConnect,
	      _ref$isOnClick = _ref.isOnClick,
	      isOnClick = _ref$isOnClick === void 0 ? true : _ref$isOnClick,
	      _ref$isOnMove = _ref.isOnMove,
	      isOnMove = _ref$isOnMove === void 0 ? true : _ref$isOnMove;
	  return new PointPlot({
	    canvas: canvas,
	    color: color,
	    r: r,
	    distance: distance,
	    isConnect: isConnect,
	    isOnClick: isOnClick,
	    isOnMove: isOnMove
	  });
	};

	return pointPlot;

}));
