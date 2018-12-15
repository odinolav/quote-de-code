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

  getPoints() {
    return this.points;
  }
}

const pointStore = new PointStore();
export default pointStore;
