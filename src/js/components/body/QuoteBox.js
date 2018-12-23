import React from "react";

import MagicWord from "./MagicWord";
import QuoteStore from "../../stores/QuoteStore";

export default class QuoteBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      magicWordArray: this.createMagicWordArray(QuoteStore.getLoadedQuote(), true),
      author: QuoteStore.getAuthor()
    }
  }

  componentWillMount() {
    QuoteStore.on("NEW_QUOTE", () => {
      document.getElementById("newbutton").classList.remove("textpulse");
      this.setState({
        magicWordArray: this.createMagicWordArray(QuoteStore.getLoadedQuote()),
        author: QuoteStore.getAuthor()
      });
    });
  }

  createMagicWordArray(loadedQuote, initial) {
    let newMagicWordArray = loadedQuote.map((magicWord, i) => {
      return <MagicWord
                key={magicWord.trueWord+i+magicWord.displayWord}
                index={i}
                displayWord={magicWord.displayWord}
                trueWord={magicWord.trueWord}
                encoded={magicWord.encoded}
                encoding={magicWord.encoding}
              />;
    });
    return newMagicWordArray;
  }

  render() {

    return (
        <blockquote>
          <span>
            <span id="quotebody">
              <span className="quotationmark">“</span>{ this.state.magicWordArray }<span className="quotationmark">”</span>
            </span>
            <small id="author">—{this.state.author}</small>
          </span>
        </blockquote>
    );
  }
}
