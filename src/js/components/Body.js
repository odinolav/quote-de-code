import React from "react";

export default class Body extends React.Component {

  handleChange(e) {
    let infield = document.getElementById("infield").value;
    this.props.changeMessage(infield);
    document.getElementById("infield").value = "";
  }

  handleKeyPress(e) {
    if(e.key === 'Enter') {
      document.getElementById("actionbutton").click();
    }
  }

  render() {
    return (
      <div id="bod">
        {this.props.children}
        <h3>{this.props.message}</h3>
        <input id="infield" onKeyPress={this.handleKeyPress.bind(this)}/>
        <br />
        <button id="actionbutton" onClick={this.handleChange.bind(this)}></button>
      </div>
    );
  }
}
