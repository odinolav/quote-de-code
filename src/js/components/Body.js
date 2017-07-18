import React from "react";

import QuoteBox from "./body/QuoteBox";
import PointBox from "./body/PointBox";

import QuoteStore from "../stores/QuoteStore";

export default class Body extends React.Component {

  handleChange() {
    QuoteStore.newQuote();
  }

  handleKeyPress(e) {
    /*if(e.key === 'Enter') {
      let infield = document.getElementById("infield").value;
      this.props.attemptWordChange(infield);
      document.getElementById("infield").value = "";
    }*/
  }

  render() {
    return (
      <div id="bod">
        <PointBox />
        <QuoteBox />
        <div id="buttonrow">
          <button id="actionbutton" onClick={this.handleChange.bind(this)}>New</button>
          <input id="infield" onKeyPress={this.handleKeyPress.bind(this)}/>
          <button id="actionbutton">Cheat</button>
        </div>
        <br />
      </div>
    );
  }
}
