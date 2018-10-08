import Grid from './grid';
import Jewel from './jewel';
import Timer from './timer';

export default class Game {
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
    this.grid = new Grid(this, this.level);
    this.timer = new Timer();
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
