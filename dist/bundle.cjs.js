/*!
 * Dots and Line Connect v1.0.0
 * (c) 2018-2019 NW
 * Released under the MIT License.
 */
'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

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

var LineConnect =
/*#__PURE__*/
function () {
  function LineConnect(_ref) {
    var canvas = _ref.canvas,
        color = _ref.color,
        r = _ref.r,
        distance = _ref.distance,
        isAnim = _ref.isAnim,
        isOnClick = _ref.isOnClick,
        isOnMove = _ref.isOnMove;

    classCallCheck(this, LineConnect);

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

    for (var i = 0; i < Math.floor(this.dots_count / 1.5); i++) {
      this.initDot();
    }

    if (isAnim) {
      this.anim();
    }

    if (isOnClick) {
      this.onClick();
    }

    if (isOnMove) {
      this.onMove();
    } // this.onClick()

  }

  createClass(LineConnect, [{
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
      this.dots_arr.push(dot);
      console.log(this.dots_arr);
    }
  }, {
    key: "anim",
    value: function anim() {
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

        for (var i = 0; i < arr.length; i++) {
          arr[i].update(function () {
            if (arr.length > _this.dots_count) {
              arr.splice(i, 1);
            } else {
              arr[i].init();
            }
          });

          for (var j = i + 1; j < arr.length; j++) {
            var dot_ix = arr[i].dot.x;
            var dot_iy = arr[i].dot.y;
            var dot_jx = arr[j].dot.x;
            var dot_jy = arr[j].dot.y; // console.log(arr[i])

            var s = Math.sqrt(Math.pow(dot_ix - dot_jx, 2) + Math.pow(dot_iy - dot_jy, 2)); // right triangle
            // console.log(s, d)

            if (s < d) {
              var ctx = _this.ctx; // draw a line

              ctx.beginPath();
              ctx.moveTo(dot_ix, dot_iy);
              ctx.lineTo(dot_jx, dot_jy);
              ctx.strokeStyle = 'rgba(' + _this.color + ',' + (d - s) / d + ')';
              ctx.strokeWidth = 1;
              ctx.stroke();
              ctx.closePath();
            }
          } // console.log(this.dotsArr.length)

        }

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

        _this2.initDot(tx, ty);

        if (_this2.dots_arr.length > _this2.dots_count) {
          _this2.dots_arr.shift();
        }
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

        _this3.dots_arr[0].init(tx, ty);
      };

      document.addEventListener(e_down, function () {
        document.addEventListener(e_move, _moveDot);
      });
      document.addEventListener(e_up, function () {
        document.removeEventListener(e_move, _moveDot);
      });
    }
  }]);

  return LineConnect;
}();

var dotsConnect = function dotsConnect(_ref) {
  var canvas = _ref.canvas,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? '255, 255, 255' : _ref$color,
      _ref$r = _ref.r,
      r = _ref$r === void 0 ? 4 : _ref$r,
      _ref$distance = _ref.distance,
      distance = _ref$distance === void 0 ? 100 : _ref$distance,
      _ref$isAnim = _ref.isAnim,
      isAnim = _ref$isAnim === void 0 ? true : _ref$isAnim,
      _ref$isOnClick = _ref.isOnClick,
      isOnClick = _ref$isOnClick === void 0 ? true : _ref$isOnClick,
      _ref$isOnMove = _ref.isOnMove,
      isOnMove = _ref$isOnMove === void 0 ? true : _ref$isOnMove;
  return new LineConnect({
    canvas: canvas,
    color: color,
    r: r,
    distance: distance,
    isAnim: isAnim,
    isOnClick: isOnClick,
    isOnMove: isOnMove
  });
};

module.exports = dotsConnect;
