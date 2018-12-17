import React from "react";

import QuoteBox from "./body/QuoteBox";
import PointBox from "./body/PointBox";
import QuoteStore from "../stores/QuoteStore";

export default class Body extends React.Component {

  constructor() {
    super();

    this.inputField = React.createRef();
    this.cheatButton = React.createRef();
    this.container = React.createRef();

    document.addEventListener("backbutton", this.inputBlur.bind(this), false);
  }

  requestNewQuote() {
    QuoteStore.newQuote();
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      if (QuoteStore.solved) {
        this.requestNewQuote();
      } else {
        let infield = document.getElementById("infield").value;
        infield.split(" ").forEach((attemptWord) => {
          this.quoteBox.attemptWordChange(attemptWord);
        });
      }
      document.getElementById("infield").value = "";
    }
  }

  startCheatMode() {
    QuoteStore.enableCheatMode();
  }

  componentDidMount() {
    QuoteStore.on("ENABLE_CHEAT_MODE", () => {
     this.cheatButton.current.classList.add("textpulse");
    });
    QuoteStore.on("DISABLE_CHEAT_MODE", () => {
     this.cheatButton.current.classList.remove("textpulse");
    });
  }

  inputFocus() {
    document.getElementById("layout").classList.add("keyboard-open");
  }

  inputBlur() {
    document.getElementById("layout").classList.remove("keyboard-open");
  }

  render() {
    return (
      <div id="maincontent" ref={this.container}>
        <PointBox />
        <QuoteBox ref={instance => { this.quoteBox = instance; }} />
        <button id="newbutton" className="actionbutton" onClick={this.requestNewQuote.bind(this)}>New</button>
        <input id="infield" ref={this.inputField} onKeyPress={this.handleKeyPress.bind(this)} onFocus={this.inputFocus.bind(this)} onBlur={this.inputBlur.bind(this)}/>
        <button id="cheatbutton" ref={this.cheatButton} className="actionbutton" onClick={this.startCheatMode}>Cheat</button>
      </div>
    );
  }
}
