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
    const x = this.x;
    const y = this.y;
    return [
      new Position(x - 1, y),
      new Position(x + 1, y),
      new Position(x, y - 1),
      new Position(x, y + 1)
    ].filter(pos => pos.isValid());
    //returns an array of valid pos for nearby jewels
  }

  isValid() {
    return (this.x >= 0 && this.x < 8 && this.y >= 0 && this.y < 8);
  }

  isNearby(otherJewel) {
    if (this.x === otherJewel.x) {
      //same row
      if (this.y + 1 === otherJewel.y || this.y - 1 === otherJewel.y) return true;
    } else if (this.y === otherJewel.y) {
      //same col
      if (this.x + 1 === otherJewel.x || this.x - 1 === otherJewel.x) return true;
    } else {
      return false;
    }
  }

  down() {
    return new Position(this.x, this.y + 1);
  }

  px() {
    return new Position(this.x, this.y);
  }

  inLine(otherJewel) {
    return this.x === otherJewel.x || this.x === otherJewel.y;
  }
}
