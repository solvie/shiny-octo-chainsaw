import { makeAutoObservable } from 'mobx';

export default class Timer {
    secondsPassed = 0
    interval;

    constructor() {
        makeAutoObservable(this)
    }

    startTimer(){
        this.interval = setInterval(() => {
            this.increase();
        }, 1000);
    }

    stopTimer(){
        clearInterval(this.interval);
    }
    
    increase() {
        this.secondsPassed += 1
    }

    reset() {
        this.secondsPassed = 0
    }
}