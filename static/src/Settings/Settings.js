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
} from 'react-bootstrap';
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Dashboard/Footer/Footer.js';
//import Fieldset from '../Dashboard/Form/Fieldset.js';
import nl2br from 'react-newline-to-break';

class Settings extends Component {
  constructor () {
    super ();
    this.state = {
      data: [],
    };
  }

  render () {
    let br2ln = '\n';
    return (
      <div>
        <Navbar />

        <h1>Settings</h1>

        <div>
          {nl2br (br2ln)}
        </div>
        <form>
          <h3>main</h3>

          <Grid>
            <Row className="show-grid">

              <Col xs={8} md={6}>
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
              </Col>

              <Col xs={8} md={6}>
                <ControlLabel>Agent Name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="_garnet"
                />

                <ControlLabel>Agent Enabled</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="other">True</option>
                  <option value="other">False</option>
                </FormControl>

                <ControlLabel>Agent Filename</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="bin/agents/_garnet.py"
                />

                <ControlLabel>Monitor Agent Pid</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="other">True</option>
                  <option value="other">False</option>
                </FormControl>

                <div>
                  {nl2br (br2ln)}
                </div>

                <ControlLabel>Agent Name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Linux"
                />

                <ControlLabel>Agent Enabled</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="other">False</option>
                  <option value="other">True</option>
                </FormControl>

                <ControlLabel>Agent Filename</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="bin/agents/linux.py"
                />

                <ControlLabel>Agent Port</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="5001"
                />

                <ControlLabel>Monitor Agent Pid</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="other">True</option>
                  <option value="other">False</option>
                </FormControl>

                <ControlLabel>Agent Devicenames</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="192.168.1.234"
                />

                <div>
                  {nl2br (br2ln)}
                </div>

                <ControlLabel>Agent Name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="remote_linux_active"
                />

                <ControlLabel>Agent Enabled</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="other">False</option>
                  <option value="other">True</option>
                </FormControl>

                <ControlLabel>Agent Filename</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="bin/agents/remote_linux_active.py"
                />

                <div>
                  {nl2br (br2ln)}
                </div>

                <ControlLabel>Agent Name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="remote_linux_passive"
                />

                <ControlLabel>Agent Enabled</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="other">False</option>
                  <option value="other">True</option>
                </FormControl>

                <ControlLabel>Agent Filename</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="bin/agents/remote_linux_passive.py"
                />

              </Col>
            </Row>
          </Grid>

        </form>

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
