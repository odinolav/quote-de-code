import React from "react";

import MagicWord from "./MagicWord";
import QuoteStore from "../../stores/QuoteStore";

export default class QuoteBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loadedQuote: QuoteStore.getAll()
    }

    this.quoteList = React.createRef();
  }

  componentWillMount() {
    QuoteStore.on("NEW_QUOTE", () => {
      document.getElementById("newbutton").classList.remove("buttonalert");
      this.setState({
        loadedQuote: QuoteStore.getAll(),
      });
    });
  }

  cleanWord(word) {
    return word.toLowerCase().replace(",", "");
  }

  render() {
    let quoteArray = this.state.loadedQuote.quote.map((magicWord, i) => {
      console.log(magicWord);
      console.log(this.state.loadedQuote.quote);
      console.log("THESE TWO ABOVE");
      return <MagicWord
                key={magicWord.trueWord+i}
                index={i}
                displayWord={magicWord.displayWord}
                trueWord={magicWord.trueWord}
                encoded={magicWord.encoded}
                encoding={magicWord.encoding}
              />;
    });

    return (
        <blockquote>
          <span>
            <span id="quotebody" ref={this.quoteList}>
              <span className="quotationmark">“</span>{ quoteArray }<span className="quotationmark">”</span>
            </span>
            <small id="author">—{this.state.loadedQuote.author}</small>
          </span>
        </blockquote>
    );
  }
}
