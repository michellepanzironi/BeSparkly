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
  window.grid = game.grid;
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
    this.level = 1;
    this.grid = new _grid__WEBPACK_IMPORTED_MODULE_0__["default"](this, this.level);
    this.timer = new _timer__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.newLevel();
    this.play();
  }
  newLevel() {
    this.levels.innerHTML = `Level ${this.level}`;
    this.grid.reset();
    this.timer.reset(200 * 1000 - (20 * this.level));
  }

  incrementLevel() {
    this.levelOver(3000);
    this.level += 1;
  }

  levelOver(delay) {
    this.grid.clearGrid();
    setTimeout(() => {
      this.newLevel();
    }, delay);
  }

  gameOver() {
    this.levelOver(3000);
    this.grid.level = 1;
  }

  play() {
    this.grid.start();
    this.timer.start();
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
/* harmony import */ var _emptyTile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emptyTile */ "./lib/emptyTile.js");




class Grid {
  constructor(game, level) {
    this.game = game;
    game.board.addEventListener('mousedown', this.handleSelect.bind(this));
    this.removeJewels = this.removeJewels.bind(this);
    this.handleSwap = this.handleSwap.bind(this);
    this.refillTile = this.refillTile.bind(this);
    this.switchJewels = this.switchJewels.bind(this);
    this.getJewel = this.getJewel.bind(this);
    this.clearGrid = this.clearGrid.bind(this);
    this.getMatchedJewels = this.getMatchedJewels.bind(this);
    this.handleMatches = this.handleMatches.bind(this);
    this.start = this.start.bind(this);
    this.reset = this.reset.bind(this);
    this.rebuild = this.rebuild.bind(this);
    this.selectJewel = this.selectJewel.bind(this);
    this.newJewelPositions = this.newJewelPositions.bind(this);
    this.select = this.select.bind(this);
  }

  reset() {
    this.level = this.game.level;
    this.game.board.innerHTML = '';
    this.rows = {};
    for (let i = 0; i < 8; i++) {
      this.rows[i] = {};
      for (let j = 0; j < 8; j++) {
        this.rows[i][j] = new _jewel__WEBPACK_IMPORTED_MODULE_1__["default"](
          new _position__WEBPACK_IMPORTED_MODULE_0__["default"](i, j),
          this.game.board,
          this
        ).placeJewel();
      }
    }
    this.handleMatches();
  }

  rebuild() {
    console.log("rebuild ran");
    this.level = this.game.level;
    this.game.board.innerHTML = '';
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.rows[i][j].placeJewel();
      }
    }
    this.handleMatches();
  }

  start() {
    this.handleMatches();
  }

  handleSelect(e) {
    const chosen = e.target.data;
    this.selectJewel(new _position__WEBPACK_IMPORTED_MODULE_0__["default"](chosen.x, chosen.y));
  }

  selectJewel(pos) {
    const newJewel = this.getJewel(pos);
    if (this.selected === newJewel) {
      this.selected.reject();
      this.selected = null;
    } else if (this.selected && this.selected.pos.isNearby(pos)) {
      this.rebuild();
      this.selected.reject(); //removes selected class
      this.handleSwap(newJewel, this.selected);
      this.selected = null;
      this.rebuild();
    } else {
      this.select(newJewel);
      this.rebuild();
    }
  }

  select(jewel) {
    if (this.selected) this.selected.reject();
    this.selected = jewel;
    jewel.select(); //adds div class
  }

  handleSwap(jewel, otherJewel) {
    this.switchJewels(jewel, otherJewel);
    this.rebuild();
    if (this.getMatchedJewels()) {
      console.log("found matches");
      this.handleMatches();
      this.rebuild();
    } else {
      this.switchJewels(jewel, otherJewel, 300); //switch them back
      this.rebuild();
    }
  }


  switchJewels(jewel, otherJewel, delay) {
    setTimeout(() => {
      this.newJewelPositions(jewel, otherJewel); //swaps pos on jewels
      console.log("newJewelPositions ran");
      this.newGridPositions(jewel, otherJewel);
      console.log("newGridPositions ran");
      this.rebuild();
    }, delay);
  }

  newJewelPositions(jewel, otherJewel) {
    const jewelAPos = new _position__WEBPACK_IMPORTED_MODULE_0__["default"](jewel.pos.x, jewel.pos.y);
    const jewelBPos = new _position__WEBPACK_IMPORTED_MODULE_0__["default"](otherJewel.pos.x, otherJewel.pos.y);
    jewel.pos = jewelBPos;
    otherJewel.pos = jewelAPos;
  }

  newGridPositions(jewel, otherJewel) {
    const jewelAPos = jewel.pos;
    const jewelBPos = otherJewel.pos;
    this.rows[jewelAPos.x][jewelAPos.y] = jewel; //swaps pos on grid object
    this.rows[jewelBPos.x][jewelBPos.y] = otherJewel;
    this.rebuild();
  }

  handleMatches() {
    console.log("handleMatches ran");
    let found = true;
    while (found) {
      let matches = this.getMatchedJewels();
      if (matches.length === 0) {
        found = false;
        return false;
      } else {
        found = true;
        console.log(matches);
        //setTimeout after animation time
        this.removeJewels(matches);
        console.log(this);
        this.rebuild();
      }
    }
    this.rebuild();
  }

  getMatchedJewels() {
    let matches = [];
    //vert matches
    for (let j = 0; j < 8; j++) {
      for (let i = 0; i < 6; i++) {
        let one = this.rows[i][j];
        let two = this.rows[i+1][j];
        let three = this.rows[i+2][j];
        if (one.type === two.type && two.type === three.type) {
          matches = matches.concat([one, two, three]);
        }
      }
    }
    //horiz matches
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 6; j++) {
        let won = this.rows[i][j];
        let too = this.rows[i][j+1];
        let there = this.rows[i][j+2];
        if (won.type === too.type && too.type === there.type) {
          matches = matches.concat([won, too, there]);
        }
      }
    }
    //remove dups
    let result = [];
    for (let i = 0; i < matches.length; i++) {
        if (!result.includes(matches[i])) {
            result.push(matches[i]);
        }
    }
    return result;
  }

  getJewel(pos) {
    if (pos.isValid()) return this.rows[pos.x][pos.y];
  }

  refillTile(pos) {
    console.log("refillTile ran");
    let shiftDownJewels = [];
    for (let x = pos.x-1; x >= 0; x--) {
      shiftDownJewels.push(this.rows[x][pos.y]);
    } //get all jewels above removed position
    shiftDownJewels.forEach(jewel => {
      jewel.animateGoDown();
      console.log("animateGoDown ran");
    });
    shiftDownJewels.forEach(jewel => {
      jewel.pos.x = jewel.pos.x+1; //reset jewel pos property to x+1
      this.rows[jewel.pos.x][pos.y] = jewel; //place on grid
    });
    let newJewel = new _jewel__WEBPACK_IMPORTED_MODULE_1__["default"](
      new _position__WEBPACK_IMPORTED_MODULE_0__["default"](0, pos.y),
      this.game.board,
      this //create a new jewel for the top of column
    );
    this.rows[0][pos.y] = newJewel;
    setTimeout(() => {
      this.rebuild();
      console.log("timeout rebuild ran");
    }, 2000);

  }

  removeJewels(jewels) {
    console.log("removeJewels called");
    //takes a jewel object array arg
    //return an array of positions to pass to refillTile
    jewels.forEach(jewel => {
      this.rows[jewel.pos.x][jewel.pos.y] = null;
      this.refillTile(jewel.pos);
    });
  }

  clearGrid() {
    setTimeout(() => {
      const allTiles = [];
      for (let y = 7; y >= 0; y--) {
        for (let x = 0; x < 8; x++) {
          allTiles.push(this.rows[x][y]);
        }
      }
      const oneDown = (i = 0) => {
        if (i < 9) {
          setTimeout(() => {
            allTiles.forEach(jewel => {
              if (jewel.pos.y === 7) {
                jewel.remove(0);
              // } else {
              //   jewel.moveDown();
              }
            });
            oneDown(i + 1);
          }, 200);
        }
      };
      oneDown();
    }, 1000);
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
    this.type = this.types[Math.floor(Math.random() * (0, 7))];
    this.grid = grid;
    this.board = board;
    this.pos = pos;
    this.y = pos.y;
    this.x = pos.x;
    this.div = document.createElement('div');
    this.div.style.top = `0px`; //`${this.pos.y * GAP - 1000}px`;
    this.div.style.left = `0px`; //`${this.pos.px().x}px`;
    this.div.data = pos;
    this.div.className = `${this.type} jewel`;
    this.div.id = `[${this.pos.x}, ${this.pos.y}]`;
    this.animateGoLeft = this.animateGoLeft.bind(this);
    this.animateGoRight = this.animateGoRight.bind(this);
    this.animateGoUp = this.animateGoUp.bind(this);
    this.animateGoDown = this.animateGoDown.bind(this);
  }

  matches(otherJewel) {
    return this.type === otherJewel.type;
  }

  select() {
    this.div.classList.add('selected');
  }

  reject() {
    this.div.classList.remove('selected');
  }

  animateGoLeft(newPos) {
    console.log("animateGoLeft ran");
    this.div.classList.add('goLeft');
    setTimeout(() => {
      this.div.classList.remove('goLeft');
    }, 2000);
  }

  animateGoRight(newPos) {
    console.log("animateGoRight ran");
    this.div.classList.add('goRight');
    setTimeout(() => {
      this.div.classList.remove('goRight');
    }, 2000);
  }

  animateGoUp(newPos) {
    console.log("animateGoUp ran");
    this.div.classList.add('goUp');
    setTimeout(() => {
      this.div.classList.remove('goUp');
    }, 2000);
  }

  animateGoDown(newPos) {
    console.log("animateGoDown ran");
    this.div.classList.add('goDown');
    setTimeout(() => {
      this.div.classList.remove('goDown');
    }, 2000);
  }

  placeJewel(delay = 500) {
    this.board.appendChild(this.div);
    // setTimeout(() => {
    //   this.div.style.top = `${this.pos.px().y}`;
    // }, delay - (this.y * 120) + this.x % 3 * 30);

    return this;
  }

  remove(delay) {
    setTimeout(() => {
      this.div.classList.remove('removed');
      setTimeout(() => {
        this.div.remove();
      }, 300);
    }, delay);
  }

  move(newPos, delay) {
    console.log("move ran");
    this.pos = newPos;
    this.div.data = newPos;
  }

  moveDown(delay) {
    console.log("moveDown ran");
    this.move(this.pos.down(), delay);
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
    const x = this.x;
    const y = this.y;
    return [
      new Position(x - 1, y),
      new Position(x + 1, y),
      new Position(x, y - 1),
      new Position(x, y + 1)
    ].filter(pos => pos.isValid());
    //returns an array of valid pos for nearby jewels
  }

  isValid() {
    return (this.x >= 0 && this.x < 8 && this.y >= 0 && this.y < 8);
  }

  isNearby(otherPos) {
    console.log("isNearby ran");
    if (this.x === otherPos.x) {
      //same row
      if (this.y + 1 === otherPos.y || this.y - 1 === otherPos.y){
        return true;
      }
    } else if (this.y === otherPos.y) {
      //same col
      if (this.x + 1 === otherPos.x || this.x - 1 === otherPos.x) {
        return true;
      }
    } else {
      return false;
    }
  }

  down() {
    console.log("pos.down ran");
    return new Position(this.x, this.y + 1);
  }

  px() {
    // console.log("pos.px ran");
    return new Position(this.x, this.y);
  }

  inLine(otherJewel) {
    return this.x === otherJewel.x || this.x === otherJewel.y;
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