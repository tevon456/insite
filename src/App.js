/**
 * Component: App
 * Purpose: Main entry component
 * Properties: None
 **/

import React, { Component } from "react";
import Loading from "Components/Loading/Loading.js";

import Loadable from "react-loadable";
import { Router, Route, hashHistory } from "react-router";

/**
 * App entry point.
 * @return Main component
 */
const AsyncDashboard = Loadable({
  loader: () => import("Components/Dashboard/Dashboard.js"),
  loading: () => null
});

const AsyncAgentPage = Loadable({
  loader: () => import("Components/AgentPage/AgentPage.js"),
  loading: () => null
});

const AsyncSettings = Loadable({
  loader: () => import("Components/Settings/Settings.js"),
  loading: () => null
});

const AsyncDataPage = Loadable({
  loader: () => import("Components/DataPage/DataPage.js"),
  loading: () => null
});

class App extends Component {
  /**
   * App entry point.
   * @return Main component
   */
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={AsyncDashboard} />
        <Route path="/agents" component={AsyncAgentPage} />
        <Route path="/settings" component={AsyncSettings} />
        <Route path="/data" component={AsyncDataPage} />
      </Router>
    );
  }
}

// Exports class to Global namespace
export default App;
