import Position from './position';
import Jewel from './jewel';
import Progress from './progress';
import emptyTile from './emptyTile';

export default class Grid {
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
        this.columns[i][j] = Jewel.random(new Position(x, y), this.game.board, this.level).place();
      }
    }
  }

  handleSelect(e) {
    if (target.id === 'board') return;
    const {x, y} = e.target.data;
    this.selectJewel(new Position(x,y));
  }


}
