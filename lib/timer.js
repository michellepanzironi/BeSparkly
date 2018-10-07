export default class Timer {
  constructor() {
    this.clock = document.getElementById('timer');
  }

  reset(time) {
    this.startTime = new Date().getTime();
    this.totalTime = time;
  }

  start() {
    this.startTime = new Date().getTime();
    this.paused = false;
  }

  stop() {
    this.totalTime = this.timeLeft();
    this.paused = true;
  }

  timeLeft() {
    return this.totalTime - (new Date.getTime() - this.startTime);
  }

  updateClock() {
    if (this.paused) return;
    const timeLeft = Math.ceil(this.timeLeft() /1000);
    this.clock.innerHTML = timeLeft;
  }
}
