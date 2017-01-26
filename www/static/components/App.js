/**
 * Component: App
 * Purpose: Main entry component
 * Properties: None
 **/

import React, { Component } from 'react';
import Dashboard from './Dashboard/Dashboard.js';

import { Router, Route, IndexRoute ,hashHistory } from 'react-router';

class App extends Component {

  render() {
    return (
      <Router history={ hashHistory }>
        <Route path="/" component={ Dashboard }></Route>
      </Router>
    )
  }
}

//Exports class to Global namespace
export default App;
