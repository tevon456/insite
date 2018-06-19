/**
 * Component: Dashboard
 * Purpose: Displays home page
 * Properties:
 *  data: Data object from API request
 **/

//React and React Bootstrap imports
import React, { Component } from "react";
import { Col } from "react-bootstrap";
//HTTP Promise library import
import axios from "axios";
import styled from "styled-components";
import { Box } from "grid-styled";

//Import sub components
import NavBar from "Components/Navbar/Navbar.js";
import DetailsBox from "./DetailsBox/DetailsBox.js";
import GraphBox from "./GraphBox/GraphBox.js";
import Footer from "./Footer/Footer";

const Container = styled(Box)`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`;

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <GraphBox />
        </Container>
        <Footer />
      </div>
    );
  }
}

//Default properties
Dashboard.defaultProps = {
  data: []
};

//Exports class to Global namespace
export default Dashboard;
