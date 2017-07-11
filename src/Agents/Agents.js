/**
 * Component: Settings
 * Purpose: Configuration and Validation of yaml file.
 * Properties:
 *  data: Data object from API request
 **/

//React and React Bootstrap imports
import React, {Component, Text} from 'react';
import {
  Col,
  Row,
  ControlLabel,
  FormControl,
  Grid,
  Panel,
  Well,
  Button,
} from 'react-bootstrap';
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Dashboard/Footer/Footer.js';

class Agents extends Component {
  constructor () {
    super ();
    this.state = {
      data: [],
    };
  }

  render () {
    return (
      <div>
        <Navbar />

        <form className="container">
          <Grid>
            <Row className="show-grid">
              <Well>

                <ControlLabel>Agent 0</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="log/garnet.log"
                />

                <ControlLabel>Agent 1</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="other">info</option>
                </FormControl>

                <ControlLabel>Agent 2</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="cache"
                />

                <ControlLabel>Agent 3</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="other">en</option>
                </FormControl>

                <ControlLabel>Agent 4</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="100"
                />

                <ControlLabel>Agent 5</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="10"
                />

                <ControlLabel>Agent 6</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="127.0.0.1"
                />

                <ControlLabel>Agent 7</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="5000"
                />
              </Well>
            </Row>
          </Grid>
        </form>

        <Col xs={8} xsOffset={2}>
          <Button
            bsStyle="success"
            bsSize="large"
            block
            style={{marginBottom: '30px'}}
          >
            Save
          </Button>
        </Col>

        <Footer />
      </div>
    );
  }
}

//Default properties
Agents.defaultProps = {
  data: [],
};

//Exports class to Global namespace
export default Agents;
