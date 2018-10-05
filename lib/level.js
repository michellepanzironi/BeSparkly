import Jewel from './jewel';

class Board {
  constructor(queue, score) {
    this.stage = stage;
    this.queue = queue;
    this.score = score;
    this.level = {
      x: 0,
      y: 0,
      columns: 8,
      rows: 8,
      tilewidth: 60,
      tileheight: 60,
      jewels: [],
      selectedtile: { selected: false, column: 0, row: 0 }
    };
    this.tiletypes = [
      'orange', 'green', 'blue',
      'cyan', 'pink', 'yellow',
      'round_rainbow', 'teardrop_rainbow'
    ];
    this.cleared = true;
    this.clusters = []; // { column, row, length, horizontal }
    this.moves = []; // { col1, row1, col2, row2 }
    this.grid = this.createLevel();
    this.fixClusters = fixClusters();
  }

  createLevel() {
    let done = false;
    while (!done) {
      for (let i = 0; i < levels.columns; i++) {
        for (let j = 0; j < level.rows; j++) {
          level.jewels[i][j].type = randomTile();
        }
      }
      fixClusters();
      findMoves();
      if (moves.length > 0) {
        done = true;
      }
    }
  }

  fixClusters() {
    checkForClusters(); // will return array of clusters
    while (clusters.length > 0) {
      removeClusters();
      shiftTiles();
      checkForClusters();
    }
  }

  checkForClusters() {
    findHorizontalClusters();
    findVerticalClusters();
  }

  findHorizontalClusters() {
    clusters = [];
    for (let j = 0; j < level.rows; j++) {
      let matchLength = 1;
      for (let i = 0; i < level.columns; i++) {
        let foundCluster = false;
        if (i == level.columns-1) {
          foundCluster = true;
        } else {
          if (level.jewels[i][j].type === level.jewels[i+1][j].type &&
            level.jewels[i][j].type != -1) {
            matchLength += 1;
          } else {
            foundCluster = true;
          }
        }
        if (foundCluster) {
          if (matchLength >= 3) {
            clusteres.push({
              column: i+1 - matchLength,
              row: j,
              length: matchLength,
              horizontal: true
            });
          }
          matchLength = 1;
        }
      }
    }
  }

  findVerticalClusters() {
    for (let i = 0; i < level.columns; i++) {
      let matchLength = 1;
      for (let j = 0; j < level.row; j++) {
        let foundCluster = false;
        if (j == level.rows-1) {
          foundCluster = true;
        } else {
          if (level.jewels[i][j].type === level.jewels[i][j+1].type &&
            level.jewels[i][j].type != -1) {
            matchLength += 1;
          } else {
            foundCluster = true;
          }
        }
        if (foundCluster) {
          if (matchLength >= 3) {
            clusters.push({
              column: i,
              row: j+1 - matchLength,
              length: matchLength,
              horizontal: false
            });
          }
          matchLength += 1;
        }
      }
    }
  }

  swap(x1, y1, x2, y2) {
    let swappedJewel = level.jewels[x1][y1].type;
    level.jewels[x1][y1].type = level.jewels[x2][y2].type;
    level.jewels[x2][y2].type = swappedJewel;
  }

  findMoves() {
    moves = [];
    findHorizontalMoves();
    findVerticalMoves();
    clusters = [];
  }

  findHorizontalMoves() {
    for (let j = 0; j < level.rows; j++) {
      for (let i = 0; i < level.columns; i++) {
        swap(i, j, i+1, j);
        checkForClusters();
        swap(i, j, i+1, j);
        if (clusters.length > 0) {
          moves.push({
            col1: i,
            row1: j,
            col2: i+1,
            row2: j
          });
        }
      }
    }
  }

  findVerticalMoves() {
    for (let i = 0; i < level.columns; i++) {
      for (let j = 0; j < level.rows; j++) {
        swap(i, j, i, j+1);
        checkForClusters();
        swap(i, j, i, j+1);
        if (clusters.length > 0) {
          moves.push({
            col1: i,
            row1: j,
            col2: i,
            row2: j+1
          });
        }
      }
    }
  }

  removeClusters() {
    loopClusters(function(index, column, row, cluster) {
      level.tiles[column][row].type = -1;
    });
    for (let i = 0; i < level.columns; i++) {
      let shift = 0;
      for (let j = level.rows; j >= 0; j--) {
        if (level.jewels[i][j].type === -1) {
          shift++;
          level.jewels[i][j].shift = 0;
        } else {
          level.jewels[i][j].shift = shift;
        }
      }
    }
  }

  shiftTiles() {
    for (var i = 0; i < level.columns; i++) {
      for (var j = level.rows; j >= 0; j--) {
        if (level.jewels[i][j].type == -1) {
          level.jewels[i][j].type = getRandomTile();
        } else {
          let shift = level.jewels[i][j].shift;
          if (shift > 0) {
            swap(i, j, i, j+shift);
          }
        }
        level.jewels[i][j].shift = 0;
      }
    }
  }

  getRandomTile() {
    return Math.floor(Math.random() * tiletypes.length);
  }
}

export default Board;
