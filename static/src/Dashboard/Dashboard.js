/**
 * Component: Dashboard
 * Purpose: Displays home page
 * Properties:
 *  data: Data object from API request
 **/

 //React and React Bootstrap imports
import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
//HTTP Promise library import
import axios from 'axios';

//Import sub components
import NavBar from '../Navbar/Navbar.js';
import DetailsBox from './DetailsBox/DetailsBox.js';
import GraphBox from './GraphBox/GraphBox.js';
import Footer from './Footer/Footer';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data:[]
    }
  }

  componentDidMount(){
    var _this = this;

    axios.get('/initial')
    .then(function (response) {
      var data = response.data;
      console.log(data);
      _this.setState({
        data: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <NavBar></NavBar>
        <div className="container" style={{'marginBottom':'75px'}}>
          <GraphBox agentId={this.state.data.agent} data={this.state.data}></GraphBox>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

//Default properties
Dashboard.defaultProps = {
  data:[]
}

//Exports class to Global namespace
export default Dashboard;
