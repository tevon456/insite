/**
 * Component: App
 * Purpose: Main entry component
 * Properties: None
 **/


import React, {Component} from 'react';
import Dashboard from './Dashboard/Dashboard.js';
import Settings from './Settings/Settings.js';
import Loading from './Loading/Loading.js';
import Agents from './Agents/Agents.js';

import Loadable from 'react-loadable';
import {Router, Route, hashHistory} from 'react-router';



/**
 * App entry point.
 * @return Main component
 */
const AsyncDashboard = Loadable({
  loader: () => import("./Dashboard/Dashboard.js"),
  loading: () => null
});

const AsyncSettings = Loadable({
  loader: () => import("./Settings/Settings.js"),
  loading: () => null
});

const AsyncDataPage = Loadable({
  loader: () => import("./DataPage/DataPage.js"),
  loading: () => null
});

class App extends Component {
  /**
   * App entry point.
   * @return Main component
   */
  render () {
    return (
      <Router history={hashHistory}>
        <Route path="/agents" component={Agents} />
        <Route path="/" component={Dashboard} />
        <Route path="/settings" component={Settings} />
        <Route path="/data" component={AsyncDataPage} />
      </Router>
    );
  }
}

// Exports class to Global namespace
export default App;
