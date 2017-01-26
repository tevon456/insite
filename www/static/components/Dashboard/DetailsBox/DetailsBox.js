/**
 * Component: Details
 * Purpose: Displays Machine Details Section of UI
 * Properties:
 *  device: Host's name
 *  system: Host's operating system
 *  version: Host's OS version
 **/

//React and React Bootstrap imports
import React, { Component } from 'react';
import { Table, Panel, Col } from 'react-bootstrap';

//Axios import, HTTP Promise library
import axios from 'axios';

//Component's style
import './DetailsBox.less';

class DetailsBox extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    //Additional inline styles
    var style= {
      'textAlign':'center',
    };

    return (
      <Panel className="DetailsBox" style={style}>
        <Col sm={4} md={4}>
          <img src="static/img/id-card.svg"></img>
          <p><b>Host</b> {this.props.device}</p>
        </Col>
        <Col sm={4} md={4}>
          <img src="static/img/monitor.svg"></img>
          <p><b>Operating System</b> {this.props.system}</p>
        </Col>
        <Col sm={4} md={4}>
          <img src="static/img/settings.svg"></img>
          <p><b>Version</b> {this.props.version}</p>
        </Col>
      </Panel>
    )
  }
}

//Default properties of Component
DetailsBox.defaultProps = {
  device:"",
  system:"",
  version:""
}
//Exports Component to Global namespace
export default DetailsBox;
