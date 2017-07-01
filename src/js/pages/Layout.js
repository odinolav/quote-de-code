import React from "react";

import Body from "../components/Body";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "I begynnelsen skapte Gud himmelen og jorden.",
    };
  }

  changeMessage(inWord) {
    if (inWord) {
      let messageArray = this.state.message.split(" ");
      let i = 0;
      for (let word of messageArray) {
        if (word !== inWord && word.charAt(0) === inWord.charAt(0)) {
          messageArray[i] = inWord;
        }
        i++;
      }
      this.setState({message: messageArray.join(' ')});
    }
  }

  render() {
    return (
      <div>
        <Header title="Shaman" />
        <Body children={this.props.children} changeMessage={this.changeMessage.bind(this)} message={this.state.message}/>
        <Footer />
      </div>
    );
  }
}
