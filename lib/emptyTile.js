import Jewel from './jewel';

export default class EmptyTile extends Jewel {
  constructor(pos) {
    super(pos, null, 'NULL');
  }

  matches() {
    return false;
  }
}
