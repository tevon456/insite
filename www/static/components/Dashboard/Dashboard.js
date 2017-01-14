import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

import DetailsBox from './DetailsBox/DetailsBox.js';
import GraphBox from './GraphBox/GraphBox.js';

class Dashboard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Col xs={12} md={12}>
        <Col xs={12} md={4}>
          <DetailsBox></DetailsBox>
        </Col>
        <Col xs={12} md={8}>
          <GraphBox></GraphBox>
        </Col>
      </Col>
    )
  }
}

export default Dashboard;
