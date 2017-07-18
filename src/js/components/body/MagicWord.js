import React from "react";

export default class MagicWord extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayWord: this.props.displayWord,
      trueWord: this.props.trueWord,
      synonyms: this.props.synonyms,
      index: this.props.index
    };
  }

  handleKeyPress(e) {
    var synonyms = this.state.synonyms;
    if (this.state.displayWord !== this.state.trueWord && synonyms.length > 1) {
      let newWord = synonyms[Math.floor(Math.random()*synonyms.length)];
      this.setState({displayWord: newWord});
    }
    console.log(this.state.trueWord);
  }

  render() {
    return (
      <span className={"magicword " + (this.state.displayWord === this.state.trueWord ? "" : "highlighted")} onClick={() => {this.handleKeyPress()}}>{this.state.displayWord}</span>
    );
  }
}
