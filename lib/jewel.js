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
    this.animateGoLeft = this.animateGoLeft.bind(this);
    this.animateGoRight = this.animateGoRight.bind(this);
    this.animateGoUp = this.animateGoUp.bind(this);
    this.animateGoDown = this.animateGoDown.bind(this);
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

  animateGoLeft(newPos) {
    console.log("animateGoLeft ran");
    this.div.classList.add('goLeft');
    setTimeout(() => {
      this.div.classList.remove('goLeft');
    }, 2000);
  }

  animateGoRight(newPos) {
    console.log("animateGoRight ran");
    this.div.classList.add('goRight');
    setTimeout(() => {
      this.div.classList.remove('goRight');
    }, 2000);
  }

  animateGoUp(newPos) {
    console.log("animateGoUp ran");
    this.div.classList.add('goUp');
    setTimeout(() => {
      this.div.classList.remove('goUp');
    }, 2000);
  }

  animateGoDown(newPos) {
    console.log("animateGoDown ran");
    this.div.classList.add('goDown');  
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
}
