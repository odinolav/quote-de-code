import React from "react";

import PointStore from "../../stores/PointStore";

export default class PointBox extends React.Component {

  constructor() {
    super();
    this.state = {
      points: PointStore.getPoints()
    }
  }

  componentWillMount() {
    PointStore.on("change", () => {
      this.setState({
        points: PointStore.getAll()
      });
    });
  }

  render() {
    return (
        <h4>Points: {this.state.points}</h4>
    );
  }
}
