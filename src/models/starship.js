import { makeAutoObservable } from "mobx"
import Human from './human';

export default class Starship {
    humans = [];
    timer = null;

    constructor(timer){
        this.timer = timer;
        makeAutoObservable(this);
    }

    start(){
        this.timer.startTimer();
    }   

    stop(){
        this.timer.stopTimer();
    }

    addHuman(){
        this.humans.push(new Human(this.timer));
        console.log('added a human: '+ this.humans.length);
    }
}