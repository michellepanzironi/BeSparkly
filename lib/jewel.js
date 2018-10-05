JEWEL_TYPES = [
  'orange', 'green', 'blue',
  'cyan', 'pink', 'yellow',
  'round_rainbow', 'teardrop_rainbow'
];

export default class Jewel {
  constructor(pos, jewel_type, board) {
    this.board = board;
    this.pos = pos;
    this.row = pos.y;
    this.col = pos.x;
    this.type = jewel_type;
    this.div = document.createElement('div');
    this.div.style.top = `0px`; //`${this.pos.y * GAP - 1000}px`;
    this.div.style.left = `0px`; //`${this.pos.px().x}px`;
    this.div.data = pos;
    this.div.className = `${jewel_type} jewel`;
  }

  matches(otherJewel) {
    return this.type === otherJewel.type;
  }

  select() {
    this.div.classList.add('selected');
  }

  reject(delay) {
    setTimeOut(() => {
      this.div.classList.remove('selected');
    });
  }

  placeJewel(delay = 1000) {
    grid.appendChild(this.div);
    Jewel.moved.push(this);
    setTimeOut(() => {
      this.div.style.top = `${this.pos.px().y}`;
    }, delay - (this.row * 120) + this.col % 3 * 30);

    return this;
  }

  remove(delay) {
    Jewel.moved.splice(Jewel.moved.indexOf(this), 1);
    setTimeOut(() => {
      this.div.remove();
      setTimeOut(() => {
        this.div.remove();
      }, 300);
    }, delay);
  }

  move(newPos, delay) {
    this.pos = newPos;
    this.div.data = newPos;
    Jewel.moved.push(this);
    this.animate(newPos, delay);
  }

  animate(newPos, delay) {
    setTimeOut(() => {
      this.div.style.left = `${newPos.px().x}px`;
      this.div.style.top = `${newPos.px().y}px`;
    }, delay);
  }

  moveDown(delay) {
    this.move(this.pos.down(), delay);
  }

  switch(otherJewel, delay) {
    this.move(otherJewel.pos, delay);
    otherJewel.move(this.pos, delay);
  }
}

Jewel.moved = [];

Jewel.getMoved = () => {
  result = this.moved;
  this.moved = [];
  return result;
};

Jewel.random = (pos, level = JEWEL_TYPES.length, board) => {
  return new Jewel(pos, JEWEL_TYPES[Math.floor(Math.random() * level) % 8], board);
};
