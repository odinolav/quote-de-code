import EventEmitter from "events";

import allQuotes from '../../allQuotes.js';

class QuoteStore extends EventEmitter {
  constructor() {
    super();
    this.id = 12345;
    this.quote = {
      0: {
        displayWord: "Fix the quotes! Red means synonym, yellow means antonym, and blue means rhyme. Click New to begin!",
        trueWord: "Fix the quotes! Red means synonym, yellow means antonym, and blue means rhyme. Click New to begin!",
        encoded: [],
        encoding: ""
      },
    };
    this.fullLength = 1;
    this.currentLength = 1;
    this.solved = true;
    this.cheatMode = false;
    this.author = "James Miller";
    this.currentQuoteIndex = -1;
    this.codes = {
      rhyme: "rhyme",
      synonym: "synonym",
      antonym: "antonym"
    }
    this.setMaxListeners(25);
  }

  encodeWord(i, word) {
    let self = this;
    switch (word) {
      case "a" || "an":
        this.pushNewWordToQuote(i, {
          encodedArray: [],
          encoding: ""
        }, word); break;
      case "be":
        this.pushNewWordToQuote(i, {
          encodedArray: ["exist", "abide", "act"],
          encoding: "synonym"
        }, word); break;
      case "has":
        this.pushNewWordToQuote(i, {
          encodedArray: ["bears", "carries", "contains", "posesses"],
          encoding: "synonym"
        }, word); break;
      case "foolish":
        this.pushNewWordToQuote(i, {
          encodedArray: ["stupid", "dumb", "irrational", "ludicrous", "silly", "unreasonable"],
          encoding: "synonym"
        }, word); break;
      case "forget":
        this.pushNewWordToQuote(i, {
          encodedArray: ["disremember", "fail to remember"],
          encoding: "synonym"
        }, word); break;
      case "have":
        this.pushNewWordToQuote(i, {
          encodedArray: ["bear", "carry", "contain", "posess"],
          encoding: "synonym"
        }, word); break;
      case "hear":
        this.pushNewWordToQuote(i, {
          encodedArray: ["listen", "overhear", "apprehend", "make out"],
          encoding: "synonym"
        }, word); break;
      case "joy":
        this.pushNewWordToQuote(i, {
          encodedArray: ["happiness", "amusement", "bliss", "cheer", "pride", "satisfaction"],
          encoding: "synonym"
        }, word); break;
      case "look":
        this.pushNewWordToQuote(i, {
          encodedArray: ["gaze", "peek", "glance", "review", "stare"],
          encoding: "synonym"
        }, word); break;
      case "love":
        this.pushNewWordToQuote(i, {
          encodedArray: ["passion", "yearning", "devotion"],
          encoding: "synonym"
        }, word); break;
      case "many":
        this.pushNewWordToQuote(i, {
          encodedArray: ["numerous", "profuse", "abundant"],
          encoding: "synonym"
        }, word); break;
      case "will":
        this.pushNewWordToQuote(i, {
          encodedArray: ["shall", "tend to", "have a tendency to", "are going to", "must", "resolution", "resolve"],
          encoding: "synonym"
        }, word); break;
      case "wish":
        this.pushNewWordToQuote(i, {
          encodedArray: ["ambition", "aspiration", "hope", "inclination", "yearning", "desire", "will that"],
          encoding: "synonym"
        }, word); break;
      case "see":
        this.pushNewWordToQuote(i, {
          encodedArray: ["view", "detect", "understand", "watch", "behold"],
          encoding: "synonym"
        }, word); break;
      case "seem":
        this.pushNewWordToQuote(i, {
          encodedArray: ["imply", "look", "give the feeling of"],
          encoding: "synonym"
        }, word); break;
      case "seems":
        this.pushNewWordToQuote(i, {
          encodedArray: ["implies", "looks", "gives the feeling of"],
          encoding: "synonym"
        }, word); break;
      case "make":
        this.pushNewWordToQuote(i, {
          encodedArray: ["construct", "build", "assemble", "put together", "manufacture", "produce", "fabricate", "create", "form", "fashion", "model"],
          encoding: "synonym"
        }, word); break;
      case "better":
        this.pushNewWordToQuote(i, {
          encodedArray: ["superior", "finer", "of higher quality", "healthier", "surpass", "beat"],
          encoding: "synonym"
        }, word); break;
      case "world":
        this.pushNewWordToQuote(i, {
          encodedArray: ["twirled", "hurled", "unfurled"],
          encoding: "rhyme"
        }, word); break;
      case "them":
        this.pushNewWordToQuote(i, {
          encodedArray: ["hem", "phlegm", "gem", "lem", "femme"],
          encoding: "rhyme"
        }, word); break;
      case "strong":
        this.pushNewWordToQuote(i, {
          encodedArray: ["powerful", "muscular", "brawny", "powerfully built", "strapping", "sturdy", "burly", "heavily built", "meaty", "robust", "athletic", "tough", "rugged"],
          encoding: "synonym"
        }, word); break;
      case "live":
        this.pushNewWordToQuote(i, {
          encodedArray: ["survive", "walk the earth", "exist", "be alive", "be", "have life"],
          encoding: "synonym"
        }, word); break;
      case "magic":
        this.pushNewWordToQuote(i, {
          encodedArray: ["sorcery", "witchcraft", "wizardry", "necromancy", "enchantment", "the supernatural", "occultism", "the occult", "the black arts", "voodoo", "hoodoo", "shamanism"],
          encoding: "synonym"
        }, word); break;
      default:
        break;
    }

    if (word.length <= 3) {

      let encodingObj = self.makeEncodingObj([], '');
      this.pushNewWordToQuote(i, encodingObj, word);
    }

    /*
    // For handling punctuation
    var encodedSet = new Set();
    var encodingType = "";
    var punctuation = "";
    if (",.;:".includes(word.substr(-1))) {
      punctuation = word.substr(-1);
    }
    */


    let randChance = Math.random();
    if (randChance > .5) {           // 30% chance of attempting synonym
      self.wordAPICall('synonym', word, i);
    } else if (randChance > .2) {   // 30% chance of attempting antonym
      self.wordAPICall('antonym', word, i);
    } else {                        // 40% chance of attempting rhyme
      self.wordAPICall('rhyme', word, i);
    }
  }

  wordAPICall(code, word, i) {
    let self = this;
    // Use code from this.encodedSet
    let rel = '';
    if (code === 'rhyme') {
      rel = 'rhy';
    } else if (code === 'synonym') {
      rel = 'syn';
    } else if (code === 'antonym') {
      rel = 'ant';
    } else {
      console.log("Undefined code in wordAPICall()");
    }
    fetch(`https://api.datamuse.com/words?&rel_${rel}=${word}&max=10`)
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Datamuse API problem. Status Code: ' +
              response.status);
            return;
          }

          let capitalized = word.charAt(0) === word.charAt(0).toUpperCase();

          response.json().then(function(data) {
            let rhymeArray = [];
            for (let row of data) {
              if (capitalized) {
                let capitalizedEncodedWord = row.word.charAt(0).toUpperCase() + row.word.slice(1);
                rhymeArray.push(capitalizedEncodedWord);
              } else {
                rhymeArray.push(row.word);
              }
            }

            let encodingObj = self.makeEncodingObj(rhymeArray, self.codes[code]);
            self.pushNewWordToQuote(i, encodingObj, word);
          });
        }
      )
      .catch(function(err) {
        console.log(`Error trying to fetch ${code}:`, err);
        let encodingObj = self.makeEncodingObj([], '');
        self.pushNewWordToQuote(i, encodingObj, word);
      });
  }

  hardcodeNewQuote(text, author) {
    this.solved = false;
    this.quote = {};
    this.fullLength = 0;
    this.currentLength = 0;
    let quoteText = text;
    this.author = author
    let quoteWords = quoteText.split(" ");
    this.fullLength = quoteWords.length;
    quoteWords.forEach((responseWord, i) => {
      var encodingObj;
      // 70% probability that a word will be encoded
      if (Math.random() > .3) {
        this.encodeWord(i, responseWord);
      } else {
        encodingObj = this.makeEncodingObj([], '');
        this.pushNewWordToQuote(i, encodingObj, responseWord);
      }
    });
  }

  startNewQuote() {
    this.solved = false;
    this.quote = {};
    this.fullLength = 0;
    this.currentLength = 0;
    let randQuoteIndex = Math.floor(Math.random() * parseInt(allQuotes[0]));
    if (randQuoteIndex === this.currentQuoteIndex) {
      randQuoteIndex -= 1;
    }
    this.currentQuoteIndex = randQuoteIndex;
    let data = allQuotes[randQuoteIndex];
    let quoteText = data[0];
    this.author = data[1];
    let quoteWords = quoteText.split(" ");
    this.fullLength = quoteWords.length;
    quoteWords.forEach((responseWord, i) => {
      var encodingObj;
      // 70% probability that a word will be encoded
      if (Math.random() > .3) {
        this.encodeWord(i, responseWord);
      } else {
        encodingObj = this.makeEncodingObj([], '');
        this.pushNewWordToQuote(i, encodingObj, responseWord);
      }
    });

  }

  makeEncodingObj(array, code) {
    return {
      'encodedArray': array,
      'encoding': code
    };
  }

  pushNewWordToQuote(i, encodingObj, newTrueWord) {
    if (this.currentLength >= this.fullLength || this.quote[i]) {
      return;
    }
    var {
      encodedArray,
      encoding
    } = encodingObj;
    this.quote[i] = {
      displayWord: encodedArray.length ? encodedArray[Math.floor(Math.random() * encodedArray.length)] : newTrueWord,
      trueWord: newTrueWord,
      encoded: encodedArray,
      encoding: encoding
    };
    this.currentLength += 1;
    if (this.currentLength === this.fullLength) {
      //this.removeAllListeners("GUESS_WORD");
      this.emit("NEW_QUOTE");
    }
  }

  checkForSolve() {
    // Checking to see if completely solved
    let allGood = true;
    for (let i = 0; i < this.currentLength; i++) {
      let word = this.quote[i];
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

  getAuthor() {
    return this.author;
  }

  getLoadedQuote() {
    let quoteArray = [];
    for (let i = 0; i < this.fullLength; i++) {
      quoteArray.push(this.quote[i]);
    }
    return quoteArray;
  }

  getAll() {
    return {
      id: this.id,
      quote: this.getLoadedQuote(),
      author: this.author
    };
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
