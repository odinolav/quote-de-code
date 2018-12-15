import { EventEmitter } from "events";

import $ from 'jquery';
import synonyms from "synonyms";
import rhymes from "rhymes";

class QuoteStore extends EventEmitter {
  constructor() {
    super();
    this.id = 12345;
    this.quote = [
      {displayWord: "Them", trueWord: "These", encoded: ["These here", "Them"], encoding: "synonym"},
      {displayWord: "quotations", trueWord: "quotes", encoded: ["quotations", "citations"], encoding: "synonym"},
      {displayWord: "stone.", trueWord: "rock", encoded: ["stone", "hard object"], encoding: "synonym"}
    ];
    this.solved = false;
    this.author = "James Miller";
  }

  encodeQuote(word) {
    switch(word) {
      case "a" || "an":
        return {encodedArray: ["a", "an", "one"], encoding: "synonym"};
      case "be":
        return {encodedArray: ["exist", "abide", "act"], encoding: "synonym"};
      case "has":
        return {encodedArray: ["bears", "carries", "contains", "posesses"], encoding: "synonym"};
      case "foolish":
        return {encodedArray: ["stupid", "dumb", "irrational", "ludicrous", "silly", "unreasonable"], encoding: "synonym"};
      case "forget":
        return {encodedArray: ["disremember", "fail to remember"], encoding: "synonym"};
      case "have":
        return {encodedArray: ["bear", "carry", "contain", "posess"], encoding: "synonym"};
      case "hear":
        return {encodedArray: ["listen", "overhear", "apprehend", "make out"], encoding: "synonym"};
      case "joy":
        return {encodedArray: ["happiness", "amusement", "bliss", "cheer", "pride", "satisfaction"], encoding: "synonym"};
      case "look":
        return {encodedArray: ["gaze", "peek", "glance", "review", "stare"], encoding: "synonym"};
      case "love":
        return {encodedArray: ["passion", "yearning", "devotion"], encoding: "synonym"};
      case "many":
        return {encodedArray: ["numerous", "profuse", "abundant"], encoding: "synonym"};
      case "will":
        return {encodedArray: ["shall", "tend to", "have a tendency to", "are going to", "must", "resolution", "resolve"], encoding: "synonym"};
      case "wish":
        return {encodedArray: ["ambition", "aspiration", "hope", "inclination", "yearning", "desire", "will that"], encoding: "synonym"};
      case "see":
        return {encodedArray: ["view", "detect", "understand", "watch", "behold"], encoding: "synonym"};
      case "seem":
        return {encodedArray: ["imply", "look", "give the feeling of"], encoding: "synonym"};
      case "seems":
        return {encodedArray: ["implies", "looks", "gives the feeling of"], encoding: "synonym"};
      default: ;
    }
    if (word.length <= 3) {
      return {encodedArray: [], encoding: ""};
    }

    var encodedSet = new Set();
    var encodingType = "";
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

    /*
    fetch("http://api.datamuse.com/words?rel_syn="+word)
    .then(response => response.json())
    .then(data => {
      console.log(word);
      console.log("Data from here:");
      console.log(data);

      var isCapitalized = word.charAt(0) === word.charAt(0).toUpperCase();
      if (data && data.length >= 1) {
        console.log("WE IN HERRRR");
        data.forEach((wordObj, i) => {
          let potentialWord = wordObj.word;
          if (potentialWord.length > 2) {
            // Check for synonyms in lowercase and only if they are longer than two letters
            let w = isCapitalized ? potentialWord.charAt(0).toUpperCase() + potentialWord.slice(1) : potentialWord;
            if (!w.includes(word)) {
              synonymSet.add(w);
              console.log("added!!!!!!!!!!!");
            }
          }
        });
        console.log(synonymSet);
      }
      return [...synonymSet];
    });
  }*/

    // Get synonyms from weak js library
    var wordObj = synonyms(word);
    var isCapitalized = word.charAt(0) === word.charAt(0).toUpperCase();
    if (wordObj) {
      encodingType = "synonym";
      for (var cat of Object.keys(wordObj)) {
        for (let w of wordObj[cat]) {
          // Check for synonyms in lowercase and only if they are longer than two letters
          if (!w.toLowerCase().includes(word.toLowerCase()) && !word.toLowerCase().includes(w.toLowerCase()) && w.length > 2) {
            w = isCapitalized ? w.charAt(0).toUpperCase() + w.slice(1) : w;
            encodedSet.add(w);
          }
        }
      }
    } else {
      // If no synonyms found, chance of encoding word with rhyme instead
      if (Math.random() > .3) {
          let rhymingObj = rhymes(word);
          if (rhymingObj) {
            encodingType = "rhyme";
          }
          rhymingObj.forEach((rhymeObj, i) => {
            let w = rhymeObj.word.replace(/ *\([^)]*\) */g, "");
            if (!w.toLowerCase().includes(word.toLowerCase()) && !word.toLowerCase().includes(w.toLowerCase())) {
              w = isCapitalized ? w.charAt(0).toUpperCase() + w.slice(1) : w;
              encodedSet.add(w);
            }
          });
      }
    }
    return {encodedArray: [...encodedSet], encoding: encodingType};
  }

  newQuote() {
    this.solved = false;
    var self = this;
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?")
    .done((response) => {
      self.quote = [];
      response.quoteText.split(" ").forEach((responseWord, i) => {
        responseWord = responseWord.replace('"', '/"');
        var encodingObj = this.encodeQuote(responseWord);
        var {encodedArray, encoding} = encodingObj;
        self.quote.push(
          {
            displayWord: encodedArray.length ? encodedArray[Math.floor(Math.random()*encodedArray.length)] : responseWord,
            trueWord: responseWord,
            encoded: encodedArray,
            encoding: encoding
          }
        );
      });
      // Assign new quote's author to response author, or "unknown" if not specified
      self.author = response.quoteAuthor ? response.quoteAuthor : "unknown";
      self.emit("NEW_QUOTE");
    })
    .fail(() => {console.log("New quote error")});
  }

  getAll() {
    return {id: this.id, quote: this.quote, author: this.author};
  }

  revealAtIndex(i) {
    console.log("UPDATE_QUOTE@"+i);
    this.quote[i].displayWord = this.quote[i].trueWord;
    this.emit("UPDATE_QUOTE@"+i);
  }

  getDisplayWord(index) {
    return this.quote[index].displayWord;
  }

  getTrueWord(index) {
    return this.quote[index].trueWord;
  }

  getSyonyms(index) {
    return this.quote[index].encoded;
  }

  wordHasSynonyms(index) {
    return this.quote[index].encoded.length > 0;
  }

  makeSolved() {
    this.solved = true;
    this.emit("SOLVED");
  }
}

const quoteStore = new QuoteStore();
export default quoteStore;
