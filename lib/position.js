window.GAP = 1;

export default class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  shift(otherJewel) {
    return { x: otherJewel.x - this.x, y: otherJewel.y - this.y };
  }

  next(otherJewel) {
    const shift = this.shift(otherJewel);
    return new Position(shift.x + otherJewel.x, shift.y + otherJewel.y);
  }

  allNearbyJewels() {
    const {x, y} = this;
    return [
      new Position(x - 1, y),
      new Position(x + 1, y),
      new Position(x, y - 1),
      new Position(x, y + 1)
    ].filter(pos => pos.isValid());
  }

  isValid() {
    return (this.x >= 0 && this.x < 8 && this.y >= 0 && this.y < 8);
  }

  isNearby(otherJewel) {
    const {x, y} = this;
    return (x === otherJewel.x || y === otherJewel.y) &&
      (x + 1 === otherJewel.x || x - 1 === otherJewel.x ||
        y + 1 === otherJewel.y || y -1 === otherJewel.y);
  }

  down() {
    return new Position(this.x, this.y + 1);
  }

  px() {
    return new Position(this.x * GAP, this.y * GAP);
  }

  inLine(otherJewel) {
    return this.x === otherJewel.x || this.x === otherJewel.y;
  }
}
