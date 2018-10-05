JEWEL_TYPES = [
  'orange', 'green', 'blue',
  'cyan', 'pink', 'yellow',
  'round_rainbow', 'teardrop_rainbow'
];

export default class Jewel {
  constructor(pos, jewel_type, queue) {
    this.pos = pos;
    this.row = pos[0];
    this.col = pos[1];
    this.jewel_type = jewel_type;
    this.queue = queue;
    const jewel = new createjs.Bitmap(queue.getResult(type));
    this.jewel = jewel;
  }
}

export default Jewel;
