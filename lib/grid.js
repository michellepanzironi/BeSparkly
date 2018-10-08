import Position from './position';
import Jewel from './jewel';
import Progress from './progress';
import emptyTile from './emptyTile';

export default class Grid {
  constructor(game, level) {
    this.game = game;
    game.board.addEventListener('mousedown', this.handleSelect.bind(this));
    this.progress = new Progress();
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
        this.columns[i][j] = new Jewel(
          new Position(i, j),
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

  handleMatch(jewels) {
    if (jewels.length === 0) return false;
    let matched = [];
    jewels.forEach(jewel => {
      matched = matched.concat(this.getAllRows(jewel));
    });
    this.removeJewels(this.merge(matched));
    setTimeout(() => {
      if (!this.frozen) this.handleMatch(this.getMoved());
    }, 1000);
    return !!matched.length;
  }

  handleSelect(e) {
    if (e.target.id === 'board' || this.frozen) return;
    const {x, y} = e.target.data;
    this.selectJewel(new Position(x, y));
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
    if (this.handleMatch([jewel, otherJewel])) {
      this.handleMatch([jewel, otherJewel]);
    } else {
      this.switchJewels(jewel, otherJewel, 500);
    }
  }

  switchJewels(jewel, otherJewel, delay) {
    jewel.switchWith(otherJewel, delay);
    this.updateColumns(jewel, delay);
    this.updateColumns(otherJewel, delay);
  }

  select(jewel) {
    if (this.selected) this.selected.reject();
    this.selected = jewel;
    jewel.select();
  }

  merge(jewels) {
    return jewels.filter((jewel, idx) => jewels.indexOf(jewel) === idx);
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
    return pos.isValid() ? this.columns[pos.x][pos.y] : new emptyTile(pos);
  }

  refillTile(positions) {
    positions.forEach(pos => {
      for (let y = pos.y - 1; y >= 0; y--) {
        const replacement = this.columns[pos.x][y];
        this.columns[pos.x][y + 1] = replacement;
        replacement.moveDown(700);
      }
      this.columns[pos.x][0] = new Jewel(
        new Position(pos.x, 0),
        this.game.board,
        this
      ).placeJewel(700);
    });
  }

  updateColumns(jewel) {
    this.columns[jewel.pos.x][jewel.pos.y] = jewel;
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
              if (jewels.pos.y === 7) {
                jewels.remove(0);
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
