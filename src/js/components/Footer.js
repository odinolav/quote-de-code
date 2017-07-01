import React from "react";
import { Link } from "react-router-dom";

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
          <Link to="bones">bones</Link> <Link to="beasts">beasts</Link>
      </footer>
    );
  }
}
