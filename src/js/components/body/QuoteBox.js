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
        loadedQuote: QuoteStore.getAll(),
      });
    });
  }

  attemptWordChange(inWord) {
    if (inWord) {
      console.log(this.state.loadedQuote.quote);
      let tempQ = this.state.loadedQuote.quote;
      for (let i = 0; i < tempQ.length; i++) {
        if (inWord.toLowerCase() === tempQ[i].trueWord.toLowerCase() && inWord.toLowerCase() != tempQ[i].displayWord.toLowerCase()) {
          QuoteStore.revealAtIndex(i);

          let allGood = true;
          for (let word of this.state.loadedQuote.quote) {
            if (word.trueWord != word.displayWord) {
              allGood = false;
            }
          }
          if (allGood) {
            document.getElementById("newbutton").classList.add("buttonalert");
          }
        } else {
          // Wrong guess
        }
      }
    }
  }

  render() {
    let quoteArray = this.state.loadedQuote.quote.map((magicWord, i) => {
      return <MagicWord key={magicWord.trueWord+i} index={i} displayWord={magicWord.displayWord} trueWord={magicWord.trueWord} synonyms={magicWord.synonyms} />;
    });

    return (
      <div>
        <blockquote><span ref={instance => { this.quoteList = instance; }}>{ quoteArray }</span><small>—{this.state.loadedQuote.author}</small></blockquote>
      </div>
    );
  }
}
