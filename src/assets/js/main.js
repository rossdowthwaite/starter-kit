(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _module_one = require('./custom/modules/module_one.js');

var _module_two = require('./custom/modules/module_two.js');

var _module_two2 = _interopRequireDefault(_module_two);

var _module_three = require('./custom/modules/module_three.js');

var _module_three2 = _interopRequireDefault(_module_three);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _module_one.starter)();
(0, _module_one.pack)();

var module_two = new _module_two2.default('hello', 'world');
module_two.sayThings();

_module_three2.default.hello();
_module_three2.default.world();

function getUser() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      return resolve({ user: 'Ross' });
    }, 2000);
  });
}

var user = getUser().then(function (user) {
  console.log(user);
});

async function handleGetUser() {
  var user = await getUser();
  console.log('await/sync', user);
}

handleGetUser();

},{"./custom/modules/module_one.js":2,"./custom/modules/module_three.js":3,"./custom/modules/module_two.js":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.starter = starter;
exports.pack = pack;
// utils.js
function starter() {
  console.log('starter');
}

function pack() {
  console.log('pack');
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModuleThree = function () {
  function ModuleThree() {
    _classCallCheck(this, ModuleThree);

    console.log('hello');
  }

  _createClass(ModuleThree, null, [{
    key: 'hello',
    value: function hello() {
      console.log('hello');
    }
  }, {
    key: 'world',
    value: function world() {
      console.log('world');
    }
  }]);

  return ModuleThree;
}();

exports.default = ModuleThree;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModuleTwo = function () {
  function ModuleTwo(one, two) {
    _classCallCheck(this, ModuleTwo);

    this.one;
    this.two;
  }

  _createClass(ModuleTwo, [{
    key: "sayThings",
    value: function sayThings() {
      console.log(this.one + ", " + this.two);
    }
  }]);

  return ModuleTwo;
}();

exports.default = ModuleTwo;

},{}]},{},[1]);
