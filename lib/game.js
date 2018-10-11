import Grid from './grid';
import Jewel from './jewel';
import Timer from './timer';

export default class Game {
  constructor() {
    this.board = document.getElementById('board');
    this.board.addEventListener('incrementLevel', this.incrementLevel.bind(this));
    this.board.addEventListener('timeout', this.gameOver.bind(this));
    // this.levels = document.getElementById('level');
    this.level = 1;
    this.grid = new Grid(this, this.level);
    this.timer = new Timer();
    this.newLevel();
    this.play();
  }
  newLevel() {
    // this.levels.innerHTML = `Level ${this.level}`;
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
    this.grid.points = 100;
  }

  play() {
    this.grid.start();
    this.timer.start();
  }
}
