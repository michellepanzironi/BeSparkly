export default class Progress {
  constructor() {
    this.bar = document.getElementById('progress');
    this.total = document.getElementById('score');
    this.flash = document.getElementById('points-flash');
    this.points = 0;
  }

  reset(total = 10000) {
    this.points = 0;
    this.ratio = 100/total;
    this.bar.style.width = '0%';
  }

  update(jewels) {
    if (jewels.length === 0) return;
    const jewelCount = jewels.length;
    const scoredPoints = (jewelCount ^ 3) * 100;
    this.points += scoredPoints;
    setTimeOut(() => {
      this.display(scoredPoints, jewels[1].pos);
      this.bar.classList.add('updating');
      this.bar.style.width = `${Math.min(this.points * this.ratio, 100)}%`;
      this.total.innerHTML = this.points;
    }, 500);
    if (this.points * this.ratio >= 100) {
      this.wholeNothaLevel();
    }
  }

  wholeNothaLevel() {
    const event = new CustomEvent(wholeNothaLevel, {});
    setTimeOut(() => document.getElementById('board').dispatchEvent(event), 1000);
  }

  display(points, pos) {
    this.flash.innerHTML = points;
    this.flash.style.top = `${pos.px().y}px`;
    this.flash.style.left = `${pos.px().x}px`;
    this.flash.classList.add('active');
    setTimeOut(() => {
      this.bar.classList.remove('updating');
      this.bar.classList.remove('active');
    }, 600);
  }
}
