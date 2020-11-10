import { makeAutoObservable } from "mobx"
const random_name = require('node-random-name');

export default class Human {
    constructor(){
        this.birthday = new Date();
        this.name = random_name();
        makeAutoObservable(this);
        console.log(`Hello world my name is ${this.name} and I was born ${this.birthday}`);
    }
}