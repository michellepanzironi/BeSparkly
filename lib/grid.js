import Position from './position';
import Jewel from './jewel';
import emptyTile from './emptyTile';

export default class Grid {
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
    this.selectJewel = this.selectJewel.bind(this);
    this.updateColumns = this.updateColumns.bind(this);
    this.select = this.select.bind(this);
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
    this.handleMatches();
  }

  handleSelect(e) {
    const chosen = e.target.data;
    this.selectJewel(new Position(chosen.x, chosen.y));
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
    this.handleMatches() || this.switchJewels(jewel, otherJewel, 300);
  }

  switchJewels(jewel, otherJewel, delay) {
    jewel.switchWith(otherJewel, delay);
    this.updateColumns(jewel);
    this.updateColumns(otherJewel);
  }

  updateColumns(jewel) {
    this.columns[jewel.pos.y][jewel.pos.x] = jewel;
  }

  select(jewel) {
    if (this.selected) this.selected.reject();
    this.selected = jewel;
    jewel.select();
  }

  handleMatches() {
    let found = true;
    while (found) {
      let matches = this.getMatchedJewels();
      if (matches.length === 0) {
        console.log("Bye, Brendon");
        console.log(matches);
        found = false;
      } else {
        found = true;
        this.removeJewels(matches);
        console.log("Hi, Brendon");
        console.log(matches);
      }
    }
  }

  getMatchedJewels() {
    let matches = [];
    //vert matches
    for (let j = 0; j < 8; j++) {
      for (let i = 0; i < 6; i++) {
        let one = this.columns[i][j];
        let two = this.columns[i+1][j];
        let three = this.columns[i+2][j];
        if (one.type === two.type && two.type === three.type) {
          matches = matches.concat([one, two, three]);
        }
      }
    }
    //horiz matches
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 6; j++) {
        let won = this.columns[i][j];
        let too = this.columns[i][j+1];
        let there = this.columns[i][j+2];
        if (won.type === too.type && too.type === there.type) {
          matches = matches.concat([won, too, there]);
        }
      }
    }
    let result = [];
    for (let i = 0; i < matches.length; i++) {
        if (!result.includes(matches[i])) {
            result.push(matches[i]);
        }
    }
    return result;
  }

  getJewel(pos) {
    // return pos.isValid() ? this.columns[pos.x][pos.y] : new emptyTile(pos);
    if (pos.isValid()) return this.columns[pos.x][pos.y];
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

  clearGrid() {
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

  removeJewels(jewels) {
    const removePositions = jewels.map(jewel => Object.assign(jewel.pos))
      .sort((a, b) => a.y < b.y ? -1 : 1);
    jewels.forEach(jewel => jewel.remove(500));
    this.refillTile(removePositions);
    return removePositions;
  }
}
