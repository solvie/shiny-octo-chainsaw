import { makeAutoObservable } from "mobx";
import Human from "./human";

export default class Starship {
  constructor(timer) {
    this.humans = [];
    this.timer = timer;
    this.pods = 5;
    makeAutoObservable(this);
  }

  start() {
    this.timer.startTimer();
  }

  stop() {
    this.timer.stopTimer();
    for (var human of this.humans) {
      human.stopTimer();
    }
  }

  takePod() {
    if (this.pods > 0) {
      this.pods = this.pods - 1;
    } else {
      throw new Error("No more pods");
    }
  }

  addHuman() {
    try {
      const human = new Human(this);
      human.init();
      this.humans.push(human);
      console.log("added a human: " + this.humans.length);
    } catch (e) {
      console.log("Error adding human: ", e.message);
    }
  }
}
