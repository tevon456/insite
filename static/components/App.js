/**
 * Component: App
 * Purpose: Main entry component
 * Properties: None
 **/

import React, {Component} from 'react';
import Dashboard from './Dashboard/Dashboard.js';

import {Router, Route, hashHistory} from 'react-router';

/**
 * App entry point.
 * @return Main component
 */
class App extends Component {
  /**
   * App entry point.
   * @return Main component
   */
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Dashboard} />
      </Router>
    );
  }
}

// Exports class to Global namespace
export default App;
