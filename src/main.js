/*  DON'T DELETE THIS CONDITION,
    THIS WILL HELP FOR HOTMODULEREPLACEMENT
 */
if (module.hot) {
  module.hot.accept();
}
/*  DON'T DELETE THIS CONDITION */

import './stylesheets/stylesheets.scss';

import React from "react";
import ReactDOM from "react-dom";
import App from "./javascripts/App";

ReactDOM.render(<App />, document.getElementById("root"));
