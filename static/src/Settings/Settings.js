/**
 * Component: Settings
 * Purpose: Configuration and Validation of yaml file.
 * Properties:
 *  data: Data object from API request
 **/

 //React and React Bootstrap imports
import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar.js'
import Footer from '../Dashboard/Footer/Footer.js'


class Settings extends Component {
  constructor() {
    super();
    this.state = {
      data:[]
    }
  }

  

  render() {
    return (
     <div>
      <Navbar></Navbar>

      <h1>Settings</h1>

      <Footer></Footer>
     </div>


    );
  }
}

//Default properties
Settings.defaultProps = {
  data:[]
}

//Exports class to Global namespace
export default Settings;
