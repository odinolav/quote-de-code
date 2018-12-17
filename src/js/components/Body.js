import React from "react";

import QuoteBox from "./body/QuoteBox";
import PointBox from "./body/PointBox";
import QuoteStore from "../stores/QuoteStore";

export default class Body extends React.Component {

  constructor() {
    super();

    this.inputField = React.createRef();
    this.cheatButton = React.createRef();
  }

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
    this.inputField.current.focus();

    QuoteStore.on("ENABLE_CHEAT_MODE", () => {
     this.cheatButton.current.classList.add("textpulse");
    });
    QuoteStore.on("DISABLE_CHEAT_MODE", () => {
     this.cheatButton.current.classList.remove("textpulse");
    });
  }

  render() {
    return (
      <div id="maincontent">
        <PointBox />
        <QuoteBox ref={instance => { this.quoteBox = instance; }} />
        <button id="newbutton" className="actionbutton" onClick={this.handleChange.bind(this)}>New</button>
        <input id="infield" ref={this.inputField} onKeyPress={this.handleKeyPress.bind(this)}/>
        <button id="cheatbutton" ref={this.cheatButton} className="actionbutton" onClick={this.startCheatMode}>Cheat</button>
      </div>
    );
  }
}
