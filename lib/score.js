class Score {
  constructor() {
    this.add = this.add.bind(this);
    this.score = 0;
    this.scoreBoard = new createjs.Text(this.score, '', 'ffffff');
  }

  receiveMatches(matches) {
    switch (matches.length) {
      case 3:
        this.add(200);
        break;
      case 4:
        this.add(500);
        break;
      case 5:
        this.add(1000);
        break;
      default:
    }
  }

  add(points) {
    this.score += points;
    this.scoreBoard.text = this.score;
  }
}

export default Score;
