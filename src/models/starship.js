import { makeAutoObservable } from "mobx";
import Human from "./human";
import Tree from "./tree";
import { ATMOSPHERE_COMPOSITION_BREAKDOWN } from "./atmosphere-constants";

export default class Starship {
  constructor(timer) {
    this.AIR_CAPACITY = 15000; //in cubic meters;
    this.inhabitants = [];
    this.timer = timer;
    this.air = {};
    Object.entries(ATMOSPHERE_COMPOSITION_BREAKDOWN).forEach(
      ([key, value]) => (this.air[key] = value * this.AIR_CAPACITY)
    );
    makeAutoObservable(this);
  }

  getAtmosphereComponentAsPercentage(component) {
    return (component * 100) / this.AIR_CAPACITY;
  }

  getAtmosphereBreakdown() {
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
    for (var inhabitant of this.inhabitants) {
      inhabitant.stopTimer();
    }
  }

  atmosphereChange(volumeChangeInComposition) {
    Object.entries(volumeChangeInComposition).forEach(([key, value]) => {
      this.air[key] = this.air[key] += value;
    });
  }

  addHuman() {
    try {
      const human = new Human(this);
      human.init();
      this.inhabitants.push(human);
    } catch (e) {
      console.log("Error adding human: ", e.message);
    }
  }

  addPlant() {
    try {
      const plant = new Tree(this);
      plant.init();
      this.inhabitants.push(plant);
    } catch (e) {
      console.log("Error adding human: ", e.message);
    }
  }
}
