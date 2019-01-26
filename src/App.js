import React, { Component } from "react";
import Header from "./components/Header.js";
import GenericContainer from "./containers/GenericContainer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <GenericContainer />
      </>
    );
  }
}

export default App;