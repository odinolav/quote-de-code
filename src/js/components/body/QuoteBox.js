import React from "react";

import MagicWord from "./MagicWord";
import QuoteStore from "../../stores/QuoteStore";
import PointStore from "../../stores/PointStore";

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
      document.getElementById("newbutton").classList.remove("buttonalert");
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
        if (inWord.toLowerCase() === tempQ[i].trueWord.toLowerCase() && inWord.toLowerCase() !== tempQ[i].displayWord.toLowerCase()) {
          QuoteStore.revealAtIndex(i);

          let allGood = true;
          // Checking to see if completely solved
          for (let word of this.state.loadedQuote.quote) {
            if (word.trueWord !== word.displayWord) {
              allGood = false;
            }
          }
          if (allGood) {
            PointStore.solvedQuote();
            QuoteStore.makeSolved();
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
      return <MagicWord key={magicWord.trueWord+i} index={i} displayWord={magicWord.displayWord} trueWord={magicWord.trueWord} encoded={magicWord.encoded} encoding={magicWord.encoding} />;
    });

    return (
      <div>
        <blockquote><span ref={instance => { this.quoteList = instance; }}>{ quoteArray }</span><small id="author">—{this.state.loadedQuote.author}</small></blockquote>
      </div>
    );
  }
}
