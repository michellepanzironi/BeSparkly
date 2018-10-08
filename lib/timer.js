export default class Timer {
  constructor() {
    this.clock = document.getElementById('time');
    setInterval(this.updateClock.bind(this), 100);
  }

  reset(time) {
    this.startTime = new Date().getTime();
    this.totalTime = time;
  }

  start() {
    this.startTime = new Date().getTime();
    this.stopped = false;
  }

  stop() {
    this.totalTime = this.timeLeft();
    this.stopped = true;
  }

  timeLeft() {
    return this.totalTime - (new Date.getTime() - this.startTime);
  }

  updateClock() {
    const timeLeft = Math.ceil(this.timeLeft() /1000);
    this.clock.innerHTML = timeLeft;
    if (timeLeft <= 0) {
      console.log('game over');
      this.stop();
      this.totalTime = 1000;
      this.startTime = new Date().getTime();
      document.getElementsByClass('board').dispatchEvent(new CustomEvent('timeout', {}));
    }
  }
}
