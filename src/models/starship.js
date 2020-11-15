import { makeAutoObservable } from "mobx";
import Human from "./human";

const ATMOSPHERE_COMPOSITION_BREAKDOWN = {
  NITROGEN: 0.78,
  OXYGEN: 0.2095,
  CARBON_DIOXIDE: 0.0005,
  WATER_VAPOR: 0.01,
};

const AIR_CAPACITY = 15000; //in cubic meters;

export default class Starship {
  constructor(timer) {
    this.humans = [];
    this.timer = timer;
    makeAutoObservable(this);
    this.air = {
      NITROGEN: ATMOSPHERE_COMPOSITION_BREAKDOWN.NITROGEN * AIR_CAPACITY,
      OXYGEN: ATMOSPHERE_COMPOSITION_BREAKDOWN.OXYGEN * AIR_CAPACITY,
      CARBON_DIOXIDE:
        ATMOSPHERE_COMPOSITION_BREAKDOWN.CARBON_DIOXIDE * AIR_CAPACITY,
      WATER_VAPOR: ATMOSPHERE_COMPOSITION_BREAKDOWN.WATER_VAPOR * AIR_CAPACITY,
    };
  }

  getAtmosphereComponentAsPercentage(component) {
    return (component * 100) / AIR_CAPACITY;
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

  atmosphereChange(volume, percentChangeInComposition) {
    this.air.NITROGEN = this.air.NITROGEN +=
      volume * percentChangeInComposition.NITROGEN;
    this.air.OXYGEN = this.air.OXYGEN +=
      volume * percentChangeInComposition.OXYGEN;
    this.air.CARBON_DIOXIDE = this.air.CARBON_DIOXIDE +=
      volume * percentChangeInComposition.CARBON_DIOXIDE;
    this.air.WATER_VAPOR = this.air.WATER_VAPOR +=
      volume * percentChangeInComposition.WATER_VAPOR;
    // if level is too low and starship is grounded, 'vent' reset.
  }

  calculateAtmosphereComposition() {
    //todo.
    console.log(this.air);
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
