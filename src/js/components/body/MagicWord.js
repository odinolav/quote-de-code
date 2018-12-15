import React from "react";

import QuoteStore from "../../stores/QuoteStore";
import PointStore from "../../stores/PointStore";

export default class MagicWord extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayWord: this.props.displayWord,
      trueWord: this.props.trueWord,
      encoded: this.props.encoded,
      encoding: this.props.encoding,
      index: this.props.index,
      classes: 'okay'
    };
  }

  componentDidMount() {
    QuoteStore.on("UPDATE_QUOTE@"+this.state.index, () => {
      PointStore.gotWord();
      this.setState({
        displayWord: QuoteStore.getDisplayWord(this.state.index),
        classes: 'wiggle'
      });
    });
  }

  handleKeyPress(e) {
    var synonyms = this.state.encoded;
    if (this.state.displayWord !== this.state.trueWord && this.state.encoded.length > 1) {
      let newWord = synonyms[Math.floor(Math.random()* this.state.encoded.length)];
      this.setState({
        displayWord: newWord,
      });
      PointStore.wrongGuess();
    }
    document.getElementById("infield").focus();
    console.log(this.state.trueWord);
  }

  render() {

    let color = "";
    if (this.state.displayWord !== this.state.trueWord) {
      color += "highlighted ";
      color += this.state.encoding;
    }

    return (
      <span className={this.state.classes + " magicword " + color} onClick={() => {this.handleKeyPress()}}>{this.state.displayWord}</span>
    );
  }
}
