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
    this.rebuild = this.rebuild.bind(this);
    this.selectJewel = this.selectJewel.bind(this);
    this.newJewelPositions = this.newJewelPositions.bind(this);
    this.select = this.select.bind(this);
    this.points = 100;
    this.score = document.getElementById('score');
  }

  reset() {
    this.level = this.game.level;
    this.game.board.innerHTML = '';
    this.rows = {};
    for (let i = 0; i < 8; i++) {
      this.rows[i] = {};
      for (let j = 0; j < 8; j++) {
        this.rows[i][j] = new Jewel(
          new Position(i, j),
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
    this.selectJewel(new Position(chosen.x, chosen.y));
  }

  selectJewel(pos) {
    const newJewel = this.getJewel(pos);
    if (this.selected === newJewel) {
      this.selected.reject(); //removes selected class
      this.selected = null;
    } else if (this.selected && this.selected.pos.isNearby(pos)) {
      this.selected.reject();
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
    if (this.getMatchedJewels()) {
      console.log("found matches");
      this.handleMatches();
    } else {
      this.switchJewels(jewel, otherJewel); //switch them back
    }
  }


  switchJewels(jewel, otherJewel) {
    this.newJewelPositions(jewel, otherJewel); //swaps pos on jewels
    console.log("newJewelPositions ran");
    this.newGridPositions(jewel, otherJewel);
    console.log("newGridPositions ran");
    this.rebuild();
  }

  newJewelPositions(jewel, otherJewel) {
    const jewelAPos = new Position(jewel.pos.x, jewel.pos.y);
    const jewelBPos = new Position(otherJewel.pos.x, otherJewel.pos.y);
    jewel.pos = jewelBPos;
    jewel.div.data = jewelBPos;
    jewel.x = jewelBPos.x;
    jewel.y = jewelBPos.y;
    otherJewel.pos = jewelAPos;
    otherJewel.div.data = jewelAPos;
    otherJewel.x = jewelAPos.x;
    otherJewel.y = jewelAPos.y;
    this.rebuild();
  }

  newGridPositions(jewel, otherJewel) {
    const jewelAPos = jewel.pos;
    const jewelBPos = otherJewel.pos;
    this.rows[jewelAPos.x][jewelAPos.y] = jewel; //swaps pos on grid object
    this.rows[jewelBPos.x][jewelBPos.y] = otherJewel;
    this.rebuild();
  }

  handleMatches() {
    let found = true;
    while (found) {
      let matches = this.getMatchedJewels();
      if (matches.length === 0) {
        found = false;
        return false;
      } else {
        found = true;
        //setTimeout after animation time
        matches.forEach(match => this.points += 100);
        this.score.innerHTML = `${this.points}`;
        console.log(this.points);
        this.removeJewels(matches);
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

  removeJewels(jewels) {
    console.log("removeJewels called");
    //takes a jewel object array arg
    //return an array of positions to pass to refillTile
    jewels.forEach(jewel => {
      this.rows[jewel.pos.x][jewel.pos.y] = null;
      this.refillTile(jewel.pos);
    });
  }

  refillTile(pos) {
    console.log("refillTile ran");
    let shiftDownJewels = [];
    for (let x = pos.x-1; x >= 0; x--) {
      shiftDownJewels.push(this.rows[x][pos.y]);
    } //get all jewels above removed position
    // shiftDownJewels.forEach(jewel => this.animateJewelDown(jewel));
    shiftDownJewels.forEach(jewel => {
      jewel.pos.x = jewel.pos.x+1; //reset jewel pos property to x+1
      jewel.x = jewel.x+1; //reset jewel x property to x+1
      this.rows[jewel.pos.x][pos.y] = jewel; //place on grid
    });
    let newJewel = new Jewel(
      new Position(0, pos.y),
      this.game.board,
      this //create a new jewel for the top of column
    );
    this.rows[0][pos.y] = newJewel;
    this.rebuild();
  }

  // animateJewelDown(jewel) {
  //   jewel.animateGoDown();
  //   let div = jewel.div;
  //   let pos = 0;
  //   let id = setInterval(frame, 3000);
  //   function frame() {
  //     if (pos === 55) {
  //       clearInterval(id);
  //     } else {
  //       pos++;
  //       div.style.top = `${pos}` + 'px';
  //     }
  //   }
  // }

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
