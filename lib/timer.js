export default class Timer {
  constructor() {
    this.clock = document.getElementById('timer');
  }

  reset(time) {
    this.startTime = new Date().getTime();
    this.time = time;
  }

  start() {
    this.startTime = new Date().getTime();
    this.paused = false;
  }

  stop() {
    this.time = this.remaining();
    this.paused = true;
  }

  remaining() {
    return this.time - (new Date.getTime() - this.startTime);
  }
}
