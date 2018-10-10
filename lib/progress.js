export default class Progress {
  constructor() {
    this.bar = document.getElementById('progress');
    this.total = document.getElementById('score');
    this.points = 0;
  }

  reset(total = 100000) {
    this.points = 0;
    this.ratio = 100/total;
    this.bar.style.width = '0%';
  }

  update(jewels) {
    if (jewels.length === 0) return;
    const jewelCount = jewels.length;
    const scoredPoints = (jewelCount ^ 3) * 100;
    this.points += scoredPoints;
    this.total += scoredPoints;
    setTimeout(() => {
      this.display(scoredPoints, jewels[1].pos);
      this.bar.classList.add('updating');
      this.bar.style.width = `${Math.min(this.points * this.ratio, 100)}%`;
      this.total.innerHTML = this.total;
    }, 500);
    if (this.points * this.ratio >= 100 && !this.freeze) {
      this.wholeNothaLevel();
      this.freeze = true;
    }
  }

  wholeNothaLevel() {
    const event = new CustomEvent('wholeNothaLevel', {});
    setTimeout(() =>  document.getElementById('board').dispatchEvent(event), 1000);
  }
}
