/*  DON'T DELETE THIS CONDITION,
    THIS WILL HELP FOR HOTMODULEREPLACEMENT
 */
/*  DON'T DELETE THIS CONDITION */

import './stylesheets/stylesheets.scss';

import React from "react";
import ReactDOM from "react-dom";
import App from "./javascripts/App";

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById("root"));
