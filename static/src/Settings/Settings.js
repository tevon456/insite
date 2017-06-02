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

class Settings extends Component {
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

                <ControlLabel>Log File</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="log/garnet.log"
                />

                <ControlLabel>Log Level</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="other">info</option>
                </FormControl>

                <ControlLabel>agent_cache_directory</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="cache"
                />

                <ControlLabel>language</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="other">en</option>
                </FormControl>

                <ControlLabel>interval</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="100"
                />

                <ControlLabel>agent_subprocesses</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="10"
                />

                <ControlLabel>listen_address</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="127.0.0.1"
                />

                <ControlLabel>bind_port</ControlLabel>
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
Settings.defaultProps = {
  data: [],
};

//Exports class to Global namespace
export default Settings;
