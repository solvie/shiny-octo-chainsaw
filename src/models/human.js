import { makeAutoObservable } from "mobx";
import Timer from "./timer";
const Chance = require("chance");

export default class Human {
  constructor(starship) {
    this.starship = starship;
    this.birthday = new Date();
    this.name = new Chance().name();
    this.timer = new Timer();
    makeAutoObservable(this);
  }

  init() {
    this.starship.takePod();
    console.log(`Hello world I was born ${this.birthday}`);
    const name = this.name;
    this.timer.setCallback(function () {
      console.log(`My name is ${name}`);
    });
    this.timer.startTimer();
  }

  stopTimer() {
    this.timer.stopTimer();
  }
}
