import React from "react";

import MagicWord from "./MagicWord";
import QuoteStore from "../../stores/QuoteStore";

export default class QuoteBox extends React.Component {

  constructor() {
    super();
    this.state = {
      loadedQuote: QuoteStore.getAll()
    }
  }

  componentWillMount() {
    QuoteStore.on("NEW_QUOTE", () => {
      console.log("NEW_QUOTE");
      this.setState({
        loadedQuote: QuoteStore.getAll()
      });
    });
  }

  attemptWordChange(inWord) {
    if (inWord) {
      let messageArray = this.state.quote.split(" ");
      let i = 0;
      for (let word of messageArray) {
        if (word !== inWord && word.charAt(0) === inWord.charAt(0)) {
          messageArray[i] = inWord;
        }
        i++;
      }
      this.setState({quote: messageArray.join(' ')});
    }

  }

  handleKeyPress(e) {
    if(e.key === 'Enter') {
      let infield = document.getElementById("infield").value;
      this.props.attemptWordChange(infield);
      document.getElementById("infield").value = "";
    }
  }

  render() {
    const quoteArray = this.state.loadedQuote.quote.map((magicWord, i) => {
      return <MagicWord key={magicWord.trueWord+i} index={i} displayWord={magicWord.displayWord} trueWord={magicWord.trueWord} synonyms={magicWord.synonyms} />;
    });

    return (
      <div>
        <blockquote>{ quoteArray }<small>—{this.state.loadedQuote.author}</small></blockquote>
      </div>
    );
  }
}
