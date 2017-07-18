import { EventEmitter } from "events";

class PointStore extends EventEmitter {
  constructor() {
    super();
    this.points = 0;
  }

  changePoints(value) {
    this.points += value;
    this.emit("change");
  }

  getPoints() {
    return this.points;
  }
}

const pointStore = new PointStore();
export default pointStore;
