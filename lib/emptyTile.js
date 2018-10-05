import Jewel from './jewel';

export default class EmptyTile {
  constructor(pos) {
    super(pos, null, 'NULL');
  }

  matches() {
    return false;
  }
}
