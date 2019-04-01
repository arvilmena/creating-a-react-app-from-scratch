import React, { Component } from "react";

export default class App extends Component {

  constructor(props) {
    super(props);
    console.log('this.props', this.props);
  }

  render() {
    return (
      <div className="App">
        <h1>it still does!!</h1>
      </div>
    );
  }
}
