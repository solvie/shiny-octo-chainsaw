import { makeAutoObservable } from "mobx";
import Timer from "./timer";
const Chance = require("chance");

const BREATH_PERIOD_IN_SECONDS = 3; // A human takes ~20 breaths in 1 minute = 1 breath per 3 seconds
function respireVolumeChangeInOneBreath() {
  return {
    OXYGEN: -0.000139125,
    CARBON_DIOXIDE: 0.000069125,
    WATER_VAPOR: 0.00007
  };
}

export default class Human {
  getBreathPeriodInSeconds() {
    return BREATH_PERIOD_IN_SECONDS;
  }

  getRespirationResult() {
    return respireVolumeChangeInOneBreath();
  }

  constructor(starship) {
    this.starship = starship;
    this.birthday = new Date();
    this.name = new Chance().name();
    this.timer = new Timer();
    makeAutoObservable(this);
  }

  init() {
    console.log(`Hello world I was born ${this.birthday}`);
    const name = this.name;
    const starship = this.starship;
    this.timer.setCallback(function breathe() {
      if (this.secondsPassed % BREATH_PERIOD_IN_SECONDS === 0) {
        starship.atmosphereChange(respireVolumeChangeInOneBreath());
      }
    });
    this.timer.startTimer();
  }

  stopTimer() {
    this.timer.stopTimer();
  }
}
