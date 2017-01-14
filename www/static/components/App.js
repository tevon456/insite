import React, { Component } from 'react';
import Dashboard from './Dashboard/Dashboard.js';

import { Router, Route, IndexRoute ,hashHistory } from 'react-router';
const About = () => <div>About</div>;

class App extends Component {

  render() {
    return (
      <Router history={ hashHistory }>
        <Route path="/" component={ Dashboard }></Route>
      </Router>
    )
  }
}

export default App;
