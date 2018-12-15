import React from "react";

import QuoteStore from "../../stores/QuoteStore";
import PointStore from "../../stores/PointStore";

export default class MagicWord extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayWord: this.props.displayWord,
      trueWord: this.props.trueWord,
      synonyms: this.props.synonyms,
      index: this.props.index,
      classes: 'okay'
    };
  }

  componentWillMount() {
    QuoteStore.on("UPDATE_QUOTE@"+this.state.index, () => {
      PointStore.addPoints(2);
      this.setState({
        displayWord: QuoteStore.getDisplayWord(this.state.index),
        classes: 'wiggle'
      });
    });
  }

  handleKeyPress(e) {
    var synonyms = this.state.synonyms;
    if (this.state.displayWord !== this.state.trueWord && synonyms.length > 1) {
      let newWord = synonyms[Math.floor(Math.random()*synonyms.length)];
      this.setState({
        displayWord: newWord,
      });
      PointStore.addPoints(-1);
    }
    console.log(this.state.trueWord);
  }

  render() {
    return (
      <span className={this.state.classes + " magicword " + (this.state.displayWord === this.state.trueWord ? "" : "highlighted")} onClick={() => {this.handleKeyPress()}}>{this.state.displayWord}</span>
    );
  }
}
