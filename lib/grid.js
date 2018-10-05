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

  start() {
    this.handleMatch(Jewel.getMoved());
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
    this.selectJewel(new Position(x,y));
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
    return pos.isValid() ? this.columns[pos.x][pos.y] : new emptyTile(pos);
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
