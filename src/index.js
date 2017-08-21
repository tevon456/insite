import React from "react";
import ReactDOM from "react-dom";

import App from "./App.js";
import "./styles.css";

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById("root"));
