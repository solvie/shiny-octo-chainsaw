import { makeAutoObservable } from "mobx";
import Timer from "./timer";
const Chance = require("chance");

const VOLUME_OF_A_BREATH = 0.00175;
const RESPIRE_PERCENT_CHANGE_IN_COMPOSITION = {
  NITROGEN: 0,
  OXYGEN: 0.13 - 0.2095,
  CARBON_DIOXIDE: 0.04 - 0.0005,
  WATER_VAPOR: 0.05 - 0.01,
};
const BREATH_PERIOD_IN_SECONDS = 3; // A human takes ~20 breaths in 1 minute = 1 breath per 3 seconds

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
        starship.calculateAtmosphereComposition(); //todo if this doesn't have enough oxygen, or if it has too much C02, human gets sick
        starship.atmosphereChange(
          VOLUME_OF_A_BREATH,
          RESPIRE_PERCENT_CHANGE_IN_COMPOSITION
        );
      }
    });
    this.timer.startTimer();
  }

  stopTimer() {
    this.timer.stopTimer();
  }
}
