import React from "react";

import Body from "../components/Body";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default class Layout extends React.Component {


  render() {
    return (
      <div id="layout">
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
}
