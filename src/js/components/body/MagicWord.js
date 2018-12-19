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
      classes: '',
      otherClasses: ''
    };
  }

  componentDidMount() {

    QuoteStore.on("GUESS_WORD", (inWord) => {
      if (inWord.toLowerCase() === this.state.trueWord.toLowerCase()) {
        PointStore.gotWord();
        QuoteStore.solveWordAtIndex(this.state.index);
        this.reveal();
      }
    });

    QuoteStore.on("ENABLE_CHEAT_MODE", () => {
      this.setState({classes: "crosshair"});
    });

    QuoteStore.on("DISABLE_CHEAT_MODE", () => {
      this.setState({classes: ""});
    });
  }

  reveal() {
    this.setState({
      displayWord: this.state.trueWord,
      classes: 'wiggle'
    });
  }

  click() {
    if (QuoteStore.cheatMode) {
      this.setState({otherClasses: "cheat-word"});
      PointStore.cheat();
      this.reveal();
      QuoteStore.solveWordAtIndex(this.state.index);
      QuoteStore.disableCheatMode();
    } else {
      var synonyms = this.state.encoded;
      if (this.state.displayWord !== this.state.trueWord && this.state.encoded.length > 1) {
        let newWord = synonyms[Math.floor(Math.random()* this.state.encoded.length)];
        this.setState({
          displayWord: newWord,
        });
        PointStore.wrongGuess();
      }
    }
  }

  render() {

    let color = "";
    if (this.state.displayWord !== this.state.trueWord) {
      color += "highlighted ";
      color += this.state.encoding;
    }

    return (
      <span className={this.state.otherClasses + " " + this.state.classes + " magicword " + color}
            onClick={this.click.bind(this)}>
        {this.state.displayWord}
      </span>
    );
  }
}
