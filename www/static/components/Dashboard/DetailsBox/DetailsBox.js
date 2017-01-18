import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import axios from 'axios';

class DetailsBox extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  
  }

  render() {
    return (
      <Table striped bordered condensed hover>
        <tbody>
          <tr>
            <td>Version</td>
          </tr>
          <tr>
            <td>Operating System</td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

export default DetailsBox;
