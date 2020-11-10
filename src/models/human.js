import { makeAutoObservable } from "mobx";
const Chance = require("chance");

export default class Human {
  constructor() {
    this.birthday = new Date();
    this.name = new Chance().name();
    makeAutoObservable(this);
    console.log(
      `Hello world my name is ${this.name} and I was born ${this.birthday}`
    );
  }
}
