(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var moduleOne = require('./custom/modules/module_one.js');
var moduleTwo = require('./custom/modules/module_two.js');

moduleOne.starter();
moduleOne.pack();

moduleTwo.hello();
moduleTwo.world();

},{"./custom/modules/module_one.js":2,"./custom/modules/module_two.js":3}],2:[function(require,module,exports){
'use strict';

// utils.js
var starter = function starter() {
  console.log('starter');
};

var pack = function pack() {
  console.log('pack');
};

module.exports = {
  starter: starter,
  pack: pack
};

},{}],3:[function(require,module,exports){
'use strict';

// utils.js
var hello = function hello() {
  console.log('hello');
};

var world = function world() {
  console.log('world');
};

module.exports = {
  hello: hello,
  world: world
};

},{}]},{},[1]);
