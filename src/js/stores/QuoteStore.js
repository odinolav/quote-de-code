import { EventEmitter } from "events";

import $ from 'jquery';
import synonyms from "synonyms";

class QuoteStore extends EventEmitter {
  constructor() {
    super();
    this.id = 12345;
    this.quote = [
      {displayWord: "Them", trueWord: "These", synonyms: ["these here", "them"]},
      {displayWord: "quotations", trueWord: "quotes", synonyms: ["quotations", "citations"]},
      {displayWord: "stone.", trueWord: "rock", synonyms: ["stone", "hard object"]}
    ];
    this.author = "James Miller";
  }

  generateSynonyms(word) {
    switch(word) {
      case "a" || "an":
        return ["a", "an", "one"];
      case "be":
        return ["exist", "abide", "act"];
      case "has":
        return ["bears", "carries", "contains", "posesses"];
      case "foolish":
        return ["stupid", "dumb", "irrational", "ludicrous", "silly", "unreasonable"];
      case "forget":
        return ["disremember"];
      case "have":
        return ["bear", "carry", "contain", "posess"];
      case "hear":
        return ["listen", "overhear"];
      case "joy":
        return ["happiness", "amusement", "bliss", "cheer", "pride", "satisfaction"];
      case "look":
        return ["gaze", "peek", "glance", "review", "stare"];
      case "love":
        return ["passion", "yearning", "devotion"];
      case "many":
        return ["numerous", "profuse", "abundant"];
      case "will":
        return ["shall", "tend to", "have a tendency to", "are going to", "must", "resolution", "resolve"];
      case "wish":
        return ["ambition", "aspiration", "hope", "inclination", "yearning", "desire", "will that"];
      case "see":
        return ["view", "detect", "understand", "watch", "behold"];
      case "seem":
        return ["imply", "look", "give the feeling of"];
      case "seems":
        return ["implies", "looks", "gives the feeling of"];
      default: ;
    }
    if (word.length <= 4) {
      return [];
    }
  
    var synonymSet = new Set();
    /*
    // Get synonyms from big API
    $.getJSON("http://words.bighugelabs.com/api/2/4908c06a483b07a1cdfc86f013a86d93/"+word+"/json")
    .done((response) => {
      console.log(response);
      if (Object.keys(response).length >= 1) {
        console.log("WOW A WORD OBJ");
        console.log(word);
        Object.keys(response).forEach((cat) => {
          if (response[cat].syn) {
            response[cat].syn.forEach((w) => {
              console.log("IMPORTANT UNDER HERE");
              console.log(w);
              if (w !== word.toLowerCase() && w.length > 2) {
                synonymSet.add(w);
                console.log("New synonym!!!!", w);
              }
            });
          }
        });
      }

      // Get synonyms from weak js library
      var wordObj = synonyms(word);
      console.log(wordObj);
      if (wordObj) {
        for (var cat of Object.keys(wordObj)) {
          for (let w of wordObj[cat]) {
            if (w !== word.toLowerCase() && w.length > 2) {
              synonymSet.add(w);
              console.log("New synonym!!!!", w);
            }
          }
        }
      }
      var synonymArray = [...synonymSet];
      var swappedWord = (synonymArray.length ? self.chooseRandomDisplayWord(synonymArray) : word);
      this.quote.push(
        {
          displayWord: swappedWord,
          synonyms: synonymArray,
          trueWord: word
        }
      );
      this.emit("change");
    });
    */
    // Get synonyms from weak js library
    var wordObj = synonyms(word);
    console.log(wordObj);
    var isCapitalized = word.charAt(0) === word.charAt(0).toUpperCase();
    if (wordObj) {
      for (var cat of Object.keys(wordObj)) {
        for (let w of wordObj[cat]) {
          // Check for synonyms in lowercase and only if they are longer than two letters
          if (w !== word.toLowerCase() && w.length > 2) {
            w = isCapitalized ? w.charAt(0).toUpperCase() + w.slice(1) : w;
            synonymSet.add(w);
          }
        }
      }
    }
    return [...synonymSet];
  }

  newQuote() {
    var self = this;
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?")
    .done((response) => {
      self.quote = [];
      response.quoteText.split(" ").forEach((responseWord, i) => {
        responseWord = responseWord.replace('"', '/"');
        var synonymArray = this.generateSynonyms(responseWord);
        self.quote.push(
          {
            displayWord: synonymArray.length ? synonymArray[Math.floor(Math.random()*synonymArray.length)] : responseWord,
            trueWord: responseWord,
            synonyms: synonymArray
          }
        );
      });
      // Assign new quote's author to response author, or "unknown" if not specified
      self.author = response.quoteAuthor ? response.quoteAuthor : "unknown";
      self.emit("NEW_QUOTE");
    })
    .fail(() => {console.log("error")});
  }

  getAll() {
    return {id: this.id, quote: this.quote, author: this.author};
  }

  getDisplayWord(index) {
    return this.quote[index].displayWord;
  }

  getSyonyms(index) {
    return this.quote[index].synonyms;
  }

  wordHasSynonyms(index) {
    return this.quote[index].synonyms.length > 0;
  }
}

const quoteStore = new QuoteStore();
export default quoteStore;
