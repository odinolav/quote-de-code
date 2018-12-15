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
    QuoteStore.on("SOLVED", () => {
      this.pointText.classList.add("flash");
    });
    QuoteStore.on("NEW_QUOTE", () => {
      this.pointText.classList.remove("flash");
    });
  }

  render() {
    return (
        <h4 id="points" ref={pointText => { this.pointText = pointText; }}>Points: {this.state.points}</h4>
    );
  }
}
