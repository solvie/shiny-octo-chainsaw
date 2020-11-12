import { makeAutoObservable } from "mobx";

export default class Timer {
  secondsPassed = 0;
  interval;

  constructor() {
    makeAutoObservable(this);
    this.takeAction = () => {};
  }

  setCallback(callback) {
    this.takeAction = callback;
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.increase();
      this.takeAction();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  increase() {
    this.secondsPassed += 1;
  }

  reset() {
    this.secondsPassed = 0;
  }
}
