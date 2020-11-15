import { makeAutoObservable } from "mobx";
import Timer from "./timer";
import { ATMOSPHERE_COMPOSITION_BREAKDOWN } from "./atmosphere-constants";
const Chance = require("chance");

const BREATH_PERIOD_IN_SECONDS = 3; // A human takes ~20 breaths in 1 minute = 1 breath per 3 seconds
const VOLUME_OF_A_BREATH = 0.00175;
const EXHALED_AIR_COMPOSITION = {
  NITROGEN: 0.78,
  OXYGEN: 0.13,
  CARBON_DIOXIDE: 0.04,
  WATER_VAPOR: 0.05,
};

function respire() {
  const respired = {};
  Object.entries(EXHALED_AIR_COMPOSITION).forEach(
    ([key, value]) =>
      (respired[key] = value - ATMOSPHERE_COMPOSITION_BREAKDOWN[key])
  );
  return respired;
}

export default class Human {
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
        starship.atmosphereChange(VOLUME_OF_A_BREATH, respire());
      }
    });
    this.timer.startTimer();
  }

  stopTimer() {
    this.timer.stopTimer();
  }
}
