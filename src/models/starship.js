import { makeAutoObservable } from "mobx";
import Human from "./human";

export default class Starship {
  constructor(timer) {
    this.humans = [];
    this.timer = timer;
    makeAutoObservable(this);
  }

  start() {
    this.timer.startTimer();
  }

  stop() {
    this.timer.stopTimer();
  }

  addHuman() {
    this.humans.push(new Human(this.timer));
    console.log("added a human: " + this.humans.length);
  }
}
