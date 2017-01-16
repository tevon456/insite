import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

import BasicAreaChart from './BasicAreaChart/BasicAreaChart';

class GraphBox extends Component{
  constructor() {
    super();
  }

  render(){
    return (
      <Col xs={12} md={12}>
        <Col xs={12} sm={12} md={12} lg={6}>
          <BasicAreaChart></BasicAreaChart>
          <BasicAreaChart></BasicAreaChart>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6}>
          <BasicAreaChart></BasicAreaChart>
          <BasicAreaChart></BasicAreaChart>
        </Col>
      </Col>
    )
  }
}

export default GraphBox;
