export default class Jewel {
  constructor(pos, board, grid) {
    this.types = [
      'orange', 'green', 'blue',
      'cyan', 'pink', 'yellow',
      'round_rainbow'
    ];
    this.type = this.types[Math.floor(Math.random() * (0, 7))];
    this.grid = grid;
    this.board = board;
    this.pos = pos;
    this.y = pos.y;
    this.x = pos.x;
    this.div = document.createElement('div');
    this.div.style.top = `0px`; //`${this.pos.y * GAP - 1000}px`;
    this.div.style.left = `0px`; //`${this.pos.px().x}px`;
    this.div.data = pos;
    this.div.className = `${this.type} jewel`;
    this.div.id = `[${this.pos.x}, ${this.pos.y}]`;
  }

  matches(otherJewel) {
    return this.type === otherJewel.type;
  }

  select() {
    this.div.classList.add('selected');
  }

  reject() {
    this.div.classList.remove('selected');
  }

  animate(newPos, delay) {
    console.log("animate ran");
    setTimeout(() => {
      this.div.style.left = `${newPos.px().x}px`;
      this.div.style.top = `${newPos.px().y}px`;
    }, delay);
  }

  placeJewel(delay = 500) {
    this.board.appendChild(this.div);
    // setTimeout(() => {
    //   this.div.style.top = `${this.pos.px().y}`;
    // }, delay - (this.y * 120) + this.x % 3 * 30);

    return this;
  }

  remove(delay) {
    setTimeout(() => {
      this.div.classList.remove('removed');
      setTimeout(() => {
        this.div.remove();
      }, 300);
    }, delay);
  }

  move(newPos, delay) {
    console.log("move ran");
    this.pos = newPos;
    this.div.data = newPos;
    this.animate(newPos, delay);
  }

  moveDown(delay) {
    console.log("moveDown ran");
    this.move(this.pos.down(), delay);
  }

  switchWith(otherJewel, delay) {
    console.log("switchWith ran");
    this.move(otherJewel.pos, delay);
    otherJewel.move(this.pos, delay);
  }
}
