import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class DetailsBox extends Component {
  constructor(props) {
    super(props);
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
          <tr>
            <td>System Name</td>
          </tr>
          <tr>
            <td>Contact</td>
          </tr>
          <tr>
            <td>Location</td>
          </tr>
          <tr>
            <td>Uptime</td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

export default DetailsBox;
