import React from "react";

import QuoteBox from "./body/QuoteBox";
import PointBox from "./body/PointBox";

import QuoteStore from "../stores/QuoteStore";

export default class Body extends React.Component {

  handleChange() {
    QuoteStore.newQuote();
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      let infield = document.getElementById("infield").value;
      this.quoteBox.attemptWordChange(infield);
      document.getElementById("infield").value = "";
    }
  }

  componentDidMount() {
   this.inputField.focus();
  }

  render() {
    return (
      <div id="bod">
        <PointBox />
        <QuoteBox ref={instance => { this.quoteBox = instance; }} />
        <div id="buttonrow">
          <button id="newbutton" className="actionbutton" onClick={this.handleChange.bind(this)}>New</button>
          <input id="infield" ref={input => { this.inputField = input; }} onKeyPress={this.handleKeyPress.bind(this)}/>
          <button className="actionbutton">Cheat</button>
        </div>
        <br />
      </div>
    );
  }
}
