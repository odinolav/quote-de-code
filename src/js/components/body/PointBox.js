import React from "react";

import PointStore from "../../stores/PointStore";
import QuoteStore from "../../stores/QuoteStore";

export default class PointBox extends React.Component {

  constructor() {
    super();
    this.state = {
      points: PointStore.getPoints()
    }
  }

  componentWillMount() {
    PointStore.on("CHANGE", () => {
      this.setState({
        points: PointStore.getPoints()
      });
    });
    PointStore.on("BAD_CHANGE", () => {
      this.pointText.classList.add("darkflash");
    });
    QuoteStore.on("SOLVED", () => {
      this.pointText.classList.add("flash");
    });
    QuoteStore.on("NEW_QUOTE", () => {
      this.pointText.classList.remove("flash");
    });
    QuoteStore.on("ENABLE_CHEAT_MODE", () => {
      this.pointText.classList.remove("darkflash");
    });
  }

  render() {
    return (
        <h4 id="points" ref={pointText => { this.pointText = pointText; }}>Points: {this.state.points}</h4>
    );
  }
}
