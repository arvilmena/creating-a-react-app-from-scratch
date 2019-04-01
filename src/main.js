/*  DON'T DELETE THIS CONDITION,
    THIS WILL HELP FOR HOTMODULEREPLACEMENT
 */
if (module.hot) {
  module.hot.accept();
}
/*  DON'T DELETE THIS CONDITION */

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./app.js";
//
// ReactDOM.render(<App />, document.getElementById("root"));

import $ from 'jquery';
import 'slick-carousel'
import './stylesheets/stylesheets.scss';

$('.some-element').slick();
