import { EventEmitter } from "events";

import synonyms from "synonyms";
import rhymes from "rhymes";
import allQuotes from '../../allQuotes.js';

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
    this.cheatMode = false;
    this.author = "James Miller";
    this.currentQuoteIndex = -1;
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
      case "make":
        return {encodedArray: ["construct", "build", "assemble", "put together", "manufacture", "produce", "fabricate", "create", "form", "fashion", "model"], encoding: "synonym"};
      case "better":
        return {encodedArray: ["superior", "finer", "of higher quality", "healthier", "surpass", "beat"], encoding: "synonym"};
      case "world":
        return {encodedArray: ["twirled", "hurled", "unfurled"], encoding: "rhyme"};
      case "them":
        return {encodedArray: ["hem", "phlegm", "gem", "lem", "femme"], encoding: "rhyme"};
      case "strong":
        return {encodedArray: ["powerful", "muscular", "brawny", "powerfully built", "strapping", "sturdy", "burly", "heavily built", "meaty", "robust", "athletic", "tough", "rugged"], encoding: "synonym"};
      case "live":
        return {encodedArray: ["survive", "walk the earth", "exist", "be alive", "be", "have life"], encoding: "synonym"};
      case "magic":
        return {encodedArray: ["sorcery", "witchcraft", "wizardry", "necromancy", "enchantment", "the supernatural", "occultism", "the occult", "the black arts", "voodoo", "hoodoo", "shamanism"], encoding: "synonym"};
      default: ;
    }
    if (word.length <= 3) {
      return {encodedArray: [], encoding: ""};
    }

    var encodedSet = new Set();
    var encodingType = "";
    var punctuation = "";
    if (",.;:".includes(word.substr(-1))) {
      punctuation = word.substr(-1);
    }

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
              encodedSet.add(w+punctuation);
            }
          });
      }
    }
    return {encodedArray: [...encodedSet], encoding: encodingType};
  }

  newQuote() {
    this.solved = false;
    var self = this;
      let randI = Math.floor(Math.random() * parseInt(allQuotes[0]));
      if (randI === this.currentQuoteIndex) {
        randI -= 1;
      }
      let data = allQuotes[randI];
      console.log(randI);
      console.log(data);
      self.quote = [];
      data[0].split(" ").forEach((responseWord, i) => {
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
      self.author = data[1];
      self.emit("NEW_QUOTE");
  }

  checkForSolve() {
    // Checking to see if completely solved
    let allGood = true;
    for (let word of this.quote) {
      if (word.trueWord !== word.displayWord) {
        allGood = false;
      }
    }
    if (allGood) {
      this.makeSolved();
    }
  }

  guessWord(inWord) {
    this.emit("GUESS_WORD", inWord);
  }

  getAll() {
    return {id: this.id, quote: this.quote, author: this.author};
  }

  solveWordAtIndex(i) {
    this.quote[i].displayWord = this.quote[i].trueWord;
    this.checkForSolve();
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

  enableCheatMode() {
    this.cheatMode = true;
    document.getElementsByTagName("html")[0].classList.add('crosshair');
    this.emit("ENABLE_CHEAT_MODE");
  }

  disableCheatMode() {
    this.cheatMode = false;
    document.getElementsByTagName("html")[0].classList.remove('crosshair');
    this.emit("DISABLE_CHEAT_MODE");
  }
}

const quoteStore = new QuoteStore();
export default quoteStore;
