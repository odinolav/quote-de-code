import React from "react";

import Title from "./header/Title"

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <Title title={this.props.title}/>
      </header>
    );
  }
}
