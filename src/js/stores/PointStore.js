import { EventEmitter } from "events";

class PointStore extends EventEmitter {
  constructor() {
    super();
    this.points = 0;
  }

  addPoints(value) {
    this.points += value;
    this.emit("CHANGE");
  }

  gotWord() {
    this.addPoints(1);
  }

  solvedQuote() {
    this.addPoints(10);
  }

  wrongGuess() {
    this.addPoints(-1);
  }

  cheat() {
    this.addPoints(-5);
    this.emit("BAD_CHANGE");
  }

  getPoints() {
    return this.points;
  }
}

const pointStore = new PointStore();
export default pointStore;
