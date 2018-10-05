/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/emptyTile.js":
/*!**************************!*\
  !*** ./lib/emptyTile.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EmptyTile; });
/* harmony import */ var _jewel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jewel */ "./lib/jewel.js");


class EmptyTile {
  constructor(pos) {
    super(pos, null, 'NULL');
  }

  matches() {
    return false;
  }
}


/***/ }),

/***/ "./lib/entry.js":
/*!**********************!*\
  !*** ./lib/entry.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./lib/game.js");


document.addEventListener('DOMContentLoaded', () => {
  const game = Object(_game__WEBPACK_IMPORTED_MODULE_0__["default"])();
});


/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid */ "./lib/grid.js");
/* harmony import */ var _jewel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jewel */ "./lib/jewel.js");



class Game {
  constructor() {
    this.board = document.getElementById('board');
    this.levelBar = document.getElementById('level-bar');
    this.modal = document.getElementById('modal');
    this.modalContent = document.getElementById('modalContent');
    this.level = 1;
    this.modalContent.innerHTML = `Level ${this.level}`;
    this.grid = new _grid__WEBPACK_IMPORTED_MODULE_0__["default"](this, this.level);
    this.newLevel = newLevel();
  }
}

  const newLevel = () => {
    undefined.level.innerHTML = `Level ${undefined.level}`;
  };

  const incrementLevel = () => {
    undefined.levelOver(3000);
    undefined.level += 1;
    undefined.modalContent.innerHTML = `Level ${undefined.level}`;
  };

  const levelOver = delay => {
    undefined.grid.clear();
    setTimeout(() => {
      undefined.nextLevel();
    }, delay);
  };

  const gameOver = () => {
    undefined.levelOver(3000);
    undefined.modalContent.innerHTML = `Game over :( <br /> Play again?`;
    };


/***/ }),

/***/ "./lib/grid.js":
/*!*********************!*\
  !*** ./lib/grid.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Grid; });
/* harmony import */ var _position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./position */ "./lib/position.js");
/* harmony import */ var _jewel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jewel */ "./lib/jewel.js");
/* harmony import */ var _progress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./progress */ "./lib/progress.js");
/* harmony import */ var _emptyTile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./emptyTile */ "./lib/emptyTile.js");





class Grid {
  constructor(game, level) {
    this.game = game;
    game.board.addEventListener('mousedown', this.handleSelect.bind(this));
  }

  reset() {
    this.level = this.game.level;
    this.game.board.innerHTML = '';

    this.columns = {};
    for (let i = 0; i < 8; i++) {
      this.columns[i] = {};
      for (let j = 0; j < array.length; j++) {
        this.columns[i][j] = _jewel__WEBPACK_IMPORTED_MODULE_1__["default"].random(new _position__WEBPACK_IMPORTED_MODULE_0__["default"](x, y), this.game.board, this.level).place();
      }
    }
  }

  start() {
    this.handleMatch(_jewel__WEBPACK_IMPORTED_MODULE_1__["default"].getMoved());
  }

  handleMatch(jewels) {
    if (jewels.length === 0) return false;
    let matched = [];
    jewels.forEach(jewel => {
      matched.concat(this.getAllRows(jewel));
    });
    this.remove(this.merge(matched));
    return !!matched.length;
  }

  handleSelect(e) {
    if (target.id === 'board') return;
    const {x, y} = e.target.data;
    this.selectJewel(new _position__WEBPACK_IMPORTED_MODULE_0__["default"](x,y));
  }

  selectJewel(pos) {
    const newJewel = this.getJewel(pos);
    if (this.selected && this.selected.pos.isNearby(newJewel.pos)) {
      this.handleSwap(this.selected, newJewel);
      this.selected.reject(500);
      this.selected = null;
    } else {
      this.select(newJewel);
    }
  }

  handleSwap(jewel, otherJewel) {
    this.switchJewels(jewel, otherJewel, 0);
    if (this.handleMatch([jewel, newJewel])) {
      this.handleMatch([jewel, newJewel]);
    } else {
      this.switchJewels(jewel, otherJewel, 500);
    }
  }

  select(jewel) {
    if (this.selected) this.selected.reject();
    this.selected = jewel;
    jewel.select();
  }

  reject() {

  }

  remove(row) {

  }

  merge(jewels) {

  }

  getRow() {

  }

  getAllRows(jewel) {

  }

  getEnd() {

  }

  getJewel(pos) {
    return pos.isValid() ? this.columns[pos.x][pos.y] : new _emptyTile__WEBPACK_IMPORTED_MODULE_3__["default"](pos);
  }

  switchJewels(jewel, otherJewel, delay) {

  }

  refillTile(pos) {

  }

  updateColumns(jewel) {
    this.columns[jewel.pos.x][jewel.pos.y] = jewel;
  }

  clear() {

  }

}


/***/ }),

/***/ "./lib/jewel.js":
/*!**********************!*\
  !*** ./lib/jewel.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Jewel; });
JEWEL_TYPES = [
  'orange', 'green', 'blue',
  'cyan', 'pink', 'yellow',
  'round_rainbow', 'teardrop_rainbow'
];

class Jewel {
  constructor(pos, jewel_type, board) {
    this.board = board;
    this.pos = pos;
    this.row = pos.y;
    this.col = pos.x;
    this.type = jewel_type;
    this.div = document.createElement('div');
    this.div.style.top = `0px`; //`${this.pos.y * GAP - 1000}px`;
    this.div.style.left = `0px`; //`${this.pos.px().x}px`;
    this.div.data = pos;
    this.div.className = `${jewel_type} jewel`;
  }

  matches(otherJewel) {
    return this.type === otherJewel.type;
  }

  select() {
    this.div.classList.add('selected');
  }

  reject(delay) {
    setTimeOut(() => {
      this.div.classList.remove('selected');
    });
  }

  placeJewel(delay = 1000) {
    grid.appendChild(this.div);
    Jewel.moved.push(this);
    setTimeOut(() => {
      this.div.style.top = `${this.pos.px().y}`;
    }, delay - (this.row * 120) + this.col % 3 * 30);

    return this;
  }

  remove(delay) {
    Jewel.moved.splice(Jewel.moved.indexOf(this), 1);
    setTimeOut(() => {
      this.div.remove();
      setTimeOut(() => {
        this.div.remove();
      }, 300);
    }, delay);
  }

  move(newPos, delay) {
    this.pos = newPos;
    this.div.data = newPos;
    Jewel.moved.push(this);
    this.animate(newPos, delay);
  }

  animate(newPos, delay) {
    setTimeOut(() => {
      this.div.style.left = `${newPos.px().x}px`;
      this.div.style.top = `${newPos.px().y}px`;
    }, delay);
  }

  moveDown(delay) {
    this.move(this.pos.down(), delay);
  }

  switch(otherJewel, delay) {
    this.move(otherJewel.pos, delay);
    otherJewel.move(this.pos, delay);
  }
}

Jewel.moved = [];

Jewel.getMoved = () => {
  result = undefined.moved;
  undefined.moved = [];
  return result;
};

Jewel.random = (pos, level = JEWEL_TYPES.length, board) => {
  return new Jewel(pos, JEWEL_TYPES[Math.floor(Math.random() * level) % 8], board);
};


/***/ }),

/***/ "./lib/position.js":
/*!*************************!*\
  !*** ./lib/position.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Position; });
class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  shift(otherJewel) {
    return { x: otherJewel.x - this.x, y: otherJewel.y - this.y };
  }

  next(otherJewel) {
    const shift = this.shift(otherJewel);
    return new Position(shift.x + otherJewel.x, shift.y + otherJewel.y);
  }

  allNearbyJewels() {
    const {x, y} = this;
    return [
      new Position(x - 1, y),
      new Position(x + 1, y),
      new Position(x, y - 1),
      new Position(x, y + 1)
    ].filter(pos => pos.isValid);
  }

  isValid() {
    return (this.x >= 0 && this.x < 8 && this.y >= 0 && this.y < 8);
  }

  isNearby(otherJewel) {
    const {x, y} = this;
    return (x === otherJewel.x || y === otherJewel.y) &&
      (x + 1 === otherJewel.x || x - 1 === otherJewel.x ||
        y + 1 === otherJewel.y || y -1 === otherJewel.y);
  }

  down() {
    return new Position(this.x, this.y + 1);
  }

  px() {
    return new Position(this.x * 60, this.y * 60);
  }

  inLine(otherJewel) {
    return this.x === otherJewel.x || this.x === otherJewel.y;
  }
}


/***/ }),

/***/ "./lib/progress.js":
/*!*************************!*\
  !*** ./lib/progress.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Progress; });
class Progress {
  constructor() {
    this.bar = document.getElementById('progress');
    this.total = document.getElementById('score');
    this.flash = document.getElementById('points-flash');
    this.points = 0;
  }

  reset(total = 10000) {
    this.points = 0;
    this.ratio = 100/total;
    this.bar.style.width = '0%';
  }

  update(jewels) {
    if (jewels.length === 0) return;
    const jewelCount = jewels.length;
    const scoredPoints = (jewelCount ^ 3) * 100;
    this.points += scoredPoints;
    setTimeOut(() => {
      this.display(scoredPoints, jewels[1].pos);
      this.bar.classList.add('updating');
      this.bar.style.width = `${Math.min(this.points * this.ratio, 100)}%`;
      this.total.innerHTML = this.points;
    }, 500);
    if (this.points * this.ratio >= 100) {
      this.wholeNothaLevel();
    }
  }

  wholeNothaLevel() {
    const event = new CustomEvent(wholeNothaLevel, {});
    setTimeOut(() => document.getElementById('grid').dispatchEvent(event), 1000);
  }

  display(points, pos) {
    this.flash.innerHTML = points;
    this.flash.style.top = `${pos.px().y}px`;
    this.flash.style.left = `${pos.px().x}px`;
    this.flash.classList.add('active');
    setTimeOut(() => {
      this.bar.classList.remove('updating');
      this.bar.classList.remove('active');
    }, 600);
  }
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map