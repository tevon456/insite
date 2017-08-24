/**
 * Component: AgentPage
 * Purpose: Show agents that are collectng data
 * Properties:
 *  data: Data object from API request
 **/

import React, {Component, Text} from 'react';
import {get} from 'axios';
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Dashboard/Footer/Footer.js';

class AgentPage extends Component {
  constructor () {
    super ();
    this.state = {
      data: [],
    };
  }

  componentDidMount () {
    get (this.props.route).then (function (response) {
      var data = response.data;
      //Times each time by 100 to prep for conversion
      data.forEach (function (d) {
        d.timestamp = d.timestamp * 1000;
      });
      _this.setState ({
        data: response.data,
      });
    });
  }

  render () {
    return (
      <div>
        <Navbar />
        <h3>Agents</h3>

        <h3>Agen name:</h3>
        <h3>Agent ID</h3>
        <h3>Last contact</h3>
        <Footer />
      </div>
    );
  }
}

//Default properties
AgentPage.defaultProps = {
  route: 'agents',
};

//Exports class to Global namespace
export default AgentPage;
