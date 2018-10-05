import Grid from './grid';
import Jewel from './jewel';
import Timer from './timer';

export default class Game {
  constructor() {
    this.board = document.getElementById('board');
    this.levelBar = document.getElementById('level-bar');
    this.modal = document.getElementById('modal');
    this.modalContent = document.getElementById('modalContent');
    this.level = 1;
    this.modalContent.innerHTML = `Level ${this.level}`;
    this.grid = new Grid(this, this.level);
    this.newLevel = newLevel();
    this.timer = new Timer();
  }
  newLevel() {
    this.level.innerHTML = `Level ${this.level}`;
  }

  incrementLevel() {
    this.levelOver(3000);
    this.level += 1;
    this.modalContent.innerHTML = `Level ${this.level}`;
  }

  levelOver(delay) {
    this.grid.clear();
    setTimeout(() => {
      this.nextLevel();
    }, delay);
  }

  gameOver() {
    this.levelOver(3000);
    this.modalContent.innerHTML = `Game over :( <br /> Play again?`;
  }

  // pause() {
  //   this.timer.stop();
  //   this.modal.style.display = 'block';
  // }
  //
  // play() {
  //
  // }
}
