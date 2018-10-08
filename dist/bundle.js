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


class EmptyTile extends _jewel__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
  const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"]();
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
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timer */ "./lib/timer.js");




class Game {
  constructor() {
    this.board = document.getElementById('board');
    this.board.addEventListener('incrementLevel', this.incrementLevel.bind(this));
    this.board.addEventListener('timeout', this.gameOver.bind(this));
    this.levels = document.getElementById('level');
    this.modal = document.getElementById('modal');
    this.modal.addEventListener('click', this.play.bind(this));
    this.level = 1;
    this.modalContent = document.getElementById('modal-content');
    this.modalContent.innerHTML = `Level ${this.level}`;
    this.grid = new _grid__WEBPACK_IMPORTED_MODULE_0__["default"](this, this.level);
    this.timer = new _timer__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.pauseButton = document.getElementById('play-pause');
    this.pauseButton.addEventListener('click', this.pause.bind(this));
    this.newLevel();
    this.pause();
  }
  newLevel() {
    this.levels.innerHTML = `Level ${this.level}`;
    this.grid.reset();
    this.timer.reset(200 * 1000 - (20 * this.level));
    this.grid.frozen = false;
  }

  incrementLevel() {
    this.levelOver(3000);
    this.level += 1;
    this.modalContent.innerHTML = `Level ${this.level}`;
  }

  levelOver(delay) {
    this.grid.frozen = true;
    this.pause();
    this.grid.clearGrid();
    setTimeout(() => {
      this.newLevel();
    }, delay);
  }

  gameOver() {
    this.levelOver(3000);
    this.modalContent.innerHTML = `Game over :( <br /> Play again?`;
    this.grid.progress.total = 0;
    this.grid.level = 1;
  }

  pause() {
    this.timer.stop();
    this.modal.style.display = 'block';
  }

  play() {
    if (this.grid.frozen) return;
    this.modal.style.display = 'none';
    this.modalContent.innerHTML = `Level ${this.level}`;
    this.grid.start();
    this.time.start();
  }
}


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
    this.progress = new _progress__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.frozen = false;
    this.moved = [];
    this.getMoved = this.getMoved.bind(this);
  }

  getMoved() {
    const result = this.moved;
    this.moved = [];
    return result;
  }

  reset() {
    this.level = this.game.level;
    this.game.board.innerHTML = '';

    this.columns = {};
    for (let i = 0; i < 8; i++) {
      this.columns[i] = {};
      for (let j = 0; j < 8; j++) {
        this.columns[i][j] = new _jewel__WEBPACK_IMPORTED_MODULE_1__["default"](
          new _position__WEBPACK_IMPORTED_MODULE_0__["default"](i, j),
          this.game.board,
          this
        ).placeJewel();
      }
    }
  }

  start() {
    this.frozen = false;
    this.handleMatch(this.getMoved());
  }

  handleSelect(e) {
    const chosen = e.target.data;
    this.selectJewel(new _position__WEBPACK_IMPORTED_MODULE_0__["default"](chosen.x, chosen.y));
  }

  selectJewel(pos) {
    const newJewel = this.getJewel(pos);
    if (this.selected) {
      if (pos.isNearby(this.selected)) {
        this.handleSwap(newJewel, this.selected);
        this.selected.reject(500);
        this.selected = null;
      }
    } else {
      this.select(newJewel);
    }
  }

  handleSwap(jewel, otherJewel) {
    this.switchJewels(jewel, otherJewel, 0);
    this.handleMatch([jewel, otherJewel]) || this.switchJewels(jewel, otherJewel, 300);
  }

  switchJewels(jewel, otherJewel, delay) {
    jewel.switchWith(otherJewel, delay);
    this.updateColumns(jewel);
    this.updateColumns(otherJewel);
  }

  updateColumns(jewel) {
    debugger
    this.columns[jewel.pos.y][jewel.pos.x] = jewel;
  }

  select(jewel) {
    if (this.selected) this.selected.reject();
    this.selected = jewel;
    jewel.select();
  }

  merge(jewels) {
    return jewels.filter((jewel, idx) => jewels.indexOf(jewel) === idx);
  }


  handleMatch(jewelsArr) {
    if (jewelsArr.length === 0) return false;
    let matched = [];
    jewelsArr.forEach(jewel => {
      matched = matched.concat(this.getAllRows(jewel));
    });
    this.removeJewels(this.merge(matched));
    setTimeout(() => {
      if (!this.frozen) this.handleMatch(this.getMoved());
    }, 1000);
    return !!matched.length;
  }

  getRow(jewel, otherJewel) {
    const start = this.getEnd([jewel, otherJewel]);
    const end = this.getEnd([jewel, otherJewel]).slice(2);
    end.reverse();
    return start.concat(end);
  }

  getAllRows(jewel) {
    let result = false;
    let pairs = [];
    let removeThese = [];
    jewel.pos.allNearbyJewels().forEach(pos => {
      if (this.getJewel(pos).matches(jewel)) {
        pairs.push(pos);
      }
    });
    pairs.forEach(pos => {
      const row = this.getRow(jewel, this.getJewel(pos));
      if (row.length >= 3) {
        result = true;
        removeThese = this.merge(removeThese.concat(row));
      }
    });
    return result ? removeThese : [];
  }

  getEnd(jewels = []) {
    let idxA = jewels.length - 2;
    let idxB = jewels.length - 1;
    const nextJewel = this.getJewel(
      jewels[idxA].pos.next(jewels[idxB].pos)
    );
    if (nextJewel.matches(idxA)) {
      jewels.push(nextJewel);
      return this.getEnd(jewels);
    }
    return jewels;
  }

  getJewel(pos) {
    return pos.isValid() ? this.columns[pos.x][pos.y] : new _emptyTile__WEBPACK_IMPORTED_MODULE_3__["default"](pos);
  }

  refillTile(positions) {
    positions.forEach(pos => {
      for (let y = pos.y - 1; y >= 0; y--) {
        const replacement = this.columns[pos.x][y];
        this.columns[pos.x][y + 1] = replacement;
        replacement.moveDown(700);
      }
      this.columns[pos.x][0] = new _jewel__WEBPACK_IMPORTED_MODULE_1__["default"](
        new _position__WEBPACK_IMPORTED_MODULE_0__["default"](pos.x, 0),
        this.game.board,
        this
      ).placeJewel(700);
    });
  }

  clearGrid() {
    this.getMoved();
    setTimeout(() => {
      const allTiles = [];
      for (let y = 7; y >= 0; y--) {
        for (let x = 0; x < 8; x++) {
          allTiles.push(this.columns[x][y]);
        }
      }
      const oneDown = (i = 0) => {
        if (i < 9) {
          setTimeout(() => {
            allTiles.forEach(jewel => {
              if (jewel.pos.y === 7) {
                jewel.remove(0);
              } else {
                jewel.moveDown();
              }
            });
            oneDown(i + 1);
          }, 200);
        }
      };
      oneDown();
    }, 1000);
  }

  removeJewels(row) {
    const removePositions = row.map(jewel => Object.assign(jewel.pos))
      .sort((a, b) => a.y < b.y ? -1 : 1);
    row.forEach(jewel => jewel.remove(500));
    this.refillTile(removePositions);
    this.progress.update(row);
    return removePositions;
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
class Jewel {
  constructor(pos, board, grid) {
    this.types = [
      'orange', 'green', 'blue',
      'cyan', 'pink', 'yellow',
      'round_rainbow'
    ];
    this.grid = grid;
    this.board = board;
    this.pos = pos;
    this.y = pos.y;
    this.x = pos.x;
    this.type = this.types[Math.floor(Math.random() * (0, 7))];
    this.div = document.createElement('div');
    this.div.style.top = `0px`; //`${this.pos.y * GAP - 1000}px`;
    this.div.style.left = `0px`; //`${this.pos.px().x}px`;
    this.div.data = pos;
    this.div.className = `${this.type} jewel`;
  }

  matches(otherJewel) {
    return this.type === otherJewel.type;
  }

  select() {
    this.div.classList.add('selected');
  }

  reject(delay) {
    setTimeout(() => {
      this.div.classList.remove('selected');
    }, delay);
  }

  animate(newPos, delay) {
    debugger
    setTimeout(() => {
      this.div.style.left = `${newPos.px().x}px`;
      this.div.style.top = `${newPos.px().y}px`;
    }, delay);
  }

  placeJewel(delay = 1000) {
    this.board.appendChild(this.div);
    this.grid.moved.push(this);
    setTimeout(() => {
      this.div.style.top = `${this.pos.px().y}`;
    }, delay - (this.y * 120) + this.x % 3 * 30);

    return this;
  }

  remove(delay) {
    this.grid.moved.splice(this.grid.moved.indexOf(this), 1);
    setTimeout(() => {
      this.div.classList.remove('removed');
      setTimeout(() => {
        this.div.remove();
      }, 300);
    }, delay);
  }

  move(newPos, delay) {
    this.pos = newPos;
    this.div.data = newPos;
    this.grid.moved.push(this);
    this.animate(newPos, delay);
  }

  moveDown(delay) {
    this.move(this.pos.down(), delay);
  }

  switchWith(otherJewel, delay) {
    this.move(otherJewel.pos, delay);
    otherJewel.move(this.pos, delay);
  }
}


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
    ].filter(pos => pos.isValid());
  }

  isValid() {
    return (this.x >= 0 && this.x < 8 && this.y >= 0 && this.y < 8);
  }

  isNearby(otherJewel) {
    if (this.x === otherJewel.x) {
      //same row
      if (this.y + 1 === otherJewel.y || this.y - 1 === otherJewel.y) return true;
    } else if (this.y === otherJewel.y) {
      //same col
      if (this.x + 1 === otherJewel.x || this.x - 1 === otherJewel.x) return true;
    } else {
      return false;
    }
  }

  down() {
    return new Position(this.x, this.y + 1);
  }

  px() {
    return new Position(this.x, this.y);
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
    this.flash = document.getElementById('points');
    this.points = 0;
  }

  reset(total = 100000) {
    this.points = 0;
    this.ratio = 100/total;
    this.bar.style.width = '0%';
  }

  update(jewels) {
    if (jewels.length === 0) return;
    const jewelCount = jewels.length;
    const scoredPoints = (jewelCount ^ 3) * 100;
    this.points += scoredPoints;
    this.total += scoredPoints;
    setTimeout(() => {
      this.display(scoredPoints, jewels[1].pos);
      this.bar.classList.add('updating');
      this.bar.style.width = `${Math.min(this.points * this.ratio, 100)}%`;
      this.total.innerHTML = this.total;
    }, 500);
    if (this.points * this.ratio >= 100 && !this.freeze) {
      this.wholeNothaLevel();
      this.freeze = true;
    }
  }

  wholeNothaLevel() {
    const event = new CustomEvent('wholeNothaLevel', {});
    setTimeout(() =>  document.getElementById('board').dispatchEvent(event), 1000);
  }

  display(points, pos) {
    this.flash.innerHTML = points;
    this.flash.style.top = `${pos.px().y}px`;
    this.flash.style.left = `${pos.px().x}px`;
    this.flash.classList.add('active');
    setTimeout(() => {
      this.bar.classList.remove('updating');
      this.bar.classList.remove('active');
    }, 600);
  }
}


/***/ }),

/***/ "./lib/timer.js":
/*!**********************!*\
  !*** ./lib/timer.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Timer; });
class Timer {
  constructor() {
    this.clock = document.getElementById('time');
    setInterval(this.updateClock.bind(this), 100);
    this.board = document.getElementById('board');
  }

  reset(time) {
    this.startTime = new Date().getTime();
    this.totalTime = time;
  }

  start() {
    this.startTime = new Date().getTime();
    this.stopped = false;
  }

  stop() {
    this.totalTime = this.timeLeft();
    this.stopped = true;
  }

  timeLeft() {
    return this.totalTime - (new Date().getTime() - this.startTime);
  }

  updateClock() {
    const timeLeft = Math.ceil(this.timeLeft() /1000);
    this.clock.innerHTML = timeLeft;
    if (timeLeft <= 0) {
      console.log('game over');
      this.stop();
      this.totalTime = 1000;
      this.startTime = new Date().getTime();
      this.board.dispatchEvent(new CustomEvent('timeout', {}));
    }
  }
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map