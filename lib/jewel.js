export default class Jewel {
  constructor(pos, board, grid) {
    this.types = [
      'orange', 'green', 'blue',
      'cyan', 'pink', 'yellow',
      'round_rainbow'
    ];
    this.grid = grid;
    this.board = board;
    this.pos = pos;
    this.row = pos.y;
    this.col = pos.x;
    this.type = this.types[Math.floor(Math.random() * (0, 7))];
    this.div = document.createElement('div');
    this.div.style.top = `0px`; //`${this.pos.y * GAP - 1000}px`;
    this.div.style.left = `0px`; //`${this.pos.px().x}px`;
    this.div.data = pos;
    this.div.className = `${this.type} jewel`;
  }

  matches(otherJewel) {
    return this.type === otherJewel.type;
  }

  select() {
    this.div.classList.add('selected');
  }

  reject(delay) {
    setTimeout(() => {
      this.div.classList.remove('selected');
    }, delay);
  }

  animate(newPos, delay) {
    setTimeout(() => {
      this.div.style.left = `${newPos.px().x}px`;
      this.div.style.top = `${newPos.px().y}px`;
    }, delay);
  }

  placeJewel(delay = 1000) {
    this.board.appendChild(this.div);
    this.grid.moved.push(this);
    setTimeout(() => {
      this.div.style.top = `${this.pos.px().y}`;
    }, delay - (this.row * 120) + this.col % 3 * 30);

    return this;
  }

  remove(delay) {
    this.grid.moved.splice(this.grid.moved.indexOf(this), 1);
    setTimeout(() => {
      this.div.classList.remove('removed');
      setTimeout(() => {
        this.div.remove();
      }, 300);
    }, delay);
  }

  move(newPos, delay) {
    this.pos = newPos;
    this.div.data = newPos;
    this.grid.moved.push(this);
    this.animate(newPos, delay);
  }

  moveDown(delay) {
    this.move(this.pos.down(), delay);
  }

  switchWith(otherJewel, delay) {
    this.move(otherJewel.pos, delay);
    otherJewel.move(this.pos, delay);
  }
}
