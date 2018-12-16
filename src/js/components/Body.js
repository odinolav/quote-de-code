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
      if (QuoteStore.solved) {
        this.handleChange();
      } else {
        let infield = document.getElementById("infield").value;
        infield.split(" ").forEach((attemptWord) => {
          this.quoteBox.attemptWordChange(attemptWord);
          console.log(attemptWord);
        });
      }
      document.getElementById("infield").value = "";
    }
  }

  startCheatMode() {
    QuoteStore.enableCheatMode();
  }

  componentDidMount() {
   this.inputField.focus();
  }

  render() {
    return (
      <div id="maincontent">
        <PointBox />
        <QuoteBox ref={instance => { this.quoteBox = instance; }} />
        <button id="newbutton" className="actionbutton" onClick={this.handleChange.bind(this)}>New</button>
        <input id="infield" ref={input => { this.inputField = input; }} onKeyPress={this.handleKeyPress.bind(this)}/>
        <button id="cheatbutton" className="actionbutton" onClick={this.startCheatMode}>Cheat</button>
      </div>
    );
  }
}
