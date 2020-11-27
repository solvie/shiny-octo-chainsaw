import { makeAutoObservable } from "mobx";
import Timer from "./timer";

const respireVolumeChangeInOneBreath = () => ({
  OXYGEN: 0.0001855,
  CARBON_DIOXIDE: -0.000034260182584,
});

export default class Tree {
  constructor(starship) {
    this.starship = starship;
    this.timer = new Timer();
    makeAutoObservable(this);
  }

  getBreathPeriodInSeconds() {
    //this should just be a timer step
    return 1;
  }

  getRespirationResult() {
    return respireVolumeChangeInOneBreath();
  }

  init() {
    console.log(`Hello world I am a tree. I was born ${this.birthday}`);
    const starship = this.starship;
    this.timer.setCallback(function breathe() {
      starship.atmosphereChange(respireVolumeChangeInOneBreath());
    });
    this.timer.startTimer();
  }

  stopTimer() {
    this.timer.stopTimer();
  }
}
