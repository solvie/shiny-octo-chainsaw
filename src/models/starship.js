import { makeAutoObservable } from "mobx";
import Human from "./human";
import { ATMOSPHERE_COMPOSITION_BREAKDOWN } from "./atmosphere-constants";

const AIR_CAPACITY = 15000; //in cubic meters;

export default class Starship {
  constructor(timer) {
    this.humans = [];
    this.timer = timer;
    this.air = {};
    console.log(ATMOSPHERE_COMPOSITION_BREAKDOWN);
    Object.entries(ATMOSPHERE_COMPOSITION_BREAKDOWN).forEach(
      ([key, value]) => (this.air[key] = value * AIR_CAPACITY)
    );
    makeAutoObservable(this);
  }

  getAtmosphereComponentAsPercentage(component) {
    return (component * 100) / AIR_CAPACITY;
  }

  getAtmosphereAsPieChart() {
    const data = [];
    Object.entries(this.air).forEach(([key, value]) =>
      data.push({
        x: `${key}: ${+this.getAtmosphereComponentAsPercentage(value).toFixed(
          2
        )}%`,
        y: this.getAtmosphereComponentAsPercentage(value),
      })
    );
    return data;
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
    Object.entries(percentChangeInComposition).forEach(([key, value]) => {
      this.air[key] = this.air[key] += volume * value;
    });
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
