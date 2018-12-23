import React from "react";

import QuoteStore from "../../stores/QuoteStore";
import PointStore from "../../stores/PointStore";

export default class MagicWord extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 'mw'+this.props.index,
      displayWord: this.props.displayWord,
      trueWord: this.props.trueWord,
      encoded: this.props.encoded,
      encoding: this.props.encoding,
      index: this.props.index,
      animation: '',
      highlighted: this.props.displayWord === this.props.trueWord ? '' : 'highlighted',
    };

    this.self = React.createRef();
  }

  componentDidMount() {
    // Check to see if word is encoded
    if (this.state.trueWord !== this.state.displayWord) {
      QuoteStore.on("GUESS_WORD", (inWord) => this.guessWord(inWord));
      QuoteStore.on("NEW_QUOTE", () => this.removeListeners());
    }
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  removeListeners() {
    // GUESS_WORD removed automatically in QuoteStore before emitting NEW_WORD
    QuoteStore.removeListener("NEW_QUOTE", this.removeListeners);
  }

  guessWord(inWord) {
    if (inWord.toLowerCase() === this.state.trueWord.toLowerCase()) {
      PointStore.gotWord();
      QuoteStore.solveWordAtIndex(this.state.index);
      this.reveal();
    }
  }

  reveal() {
    this.setState({
      displayWord: this.state.trueWord,
    });
    this.setState({animation: "wiggle", encoding: ""});
    this.removeListeners();
  }

  click() {
    console.log(this.state.displayWord, this.state.trueWord, this.state.encoding);
    if (QuoteStore.cheatMode && this.state.trueWord !== this.state.displayWord) {
      this.setState({animation: "cheat-word"});
      PointStore.cheat();
      this.reveal();
      QuoteStore.solveWordAtIndex(this.state.index);
      QuoteStore.disableCheatMode();
    } else {
      QuoteStore.disableCheatMode();
      var synonyms = this.state.encoded;
      if (this.state.displayWord !== this.state.trueWord && this.state.encoded.length > 1) {
        let newWord = synonyms[Math.floor(Math.random() * this.state.encoded.length)];
        this.setState({
          displayWord: newWord,
        });
        PointStore.wrongGuess();
      }
    }
  }

  render() {

    return (
      <span className={`magicword ${this.state.highlighted} ${this.state.encoding} ${this.state.animation}`}
        onClick={this.click.bind(this)}>
            {this.state.displayWord}
      </span>
    );
  }
}
