import React, { Component } from "react";
import { hot } from "react-hot-loader";

class App extends Component {

  constructor(props) {
    super(props);
    console.log("test");
  }

  render() {
    return (
      <div className="App">
        <h1>asdasdasd?!</h1>
      </div>
    );
  }
}

export default hot(module)(App);
