/**
 * Component: Settings
 * Purpose: Configuration and Validation of yaml file.
 * Properties:
 *  data: Data object from API request
 **/

//React and React Bootstrap imports
import React, {Component, fieldset, legend} from 'react';
import {
  Col,
  FormGroup,
  ControlLabel,
  HelpBlock,
  FormControl,
} from 'react-bootstrap';
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Dashboard/Footer/Footer.js';
import Textbox from '../Dashboard/Form/Textbox.js';
import {render} from 'react-dom';

class Settings extends React.Component {
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

        <h1>Settings</h1>

        <form>

          <FormGroup controlId="formBasicText">

            <fieldset>
              <legend>main</legend>

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
            </fieldset>
          </FormGroup>

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
