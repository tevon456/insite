/**
 * Component: Footer
 * Purpose: Displays Footer Section of UI
 * Properties: None
 **/

//React and React Bootstrap imports

import React, { Component } from "react";
import styled from "styled-components";

//React-Router imports for..Routing
import { Link } from "react-router";
import { Flex, Box, Grid } from "grid-styled";

//Component's style
import logo from "./garnet_logo.png";

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  color: #bc3e3f;
  &:hover, &:active {
    text-decoration: underline;
  }
  &:visited {
    text-decoration: underline;
    color: #bc3e3f;
  }
`;

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const navStyles = {
      height: "50px",
      borderBottom: "1px solid #bc3e3f"
    };
    return (
      <Flex align="center" style={navStyles} pt={5}>
        <Box m="auto" mb={10}>
          <Grid p={5}>
            <StyledLink to="/data">Data</StyledLink>
          </Grid>
          <Grid p={5}>
            <StyledLink to="/hosts">Hosts</StyledLink>
          </Grid>
          <Grid pr={10} pl={10}>
            <StyledLink to="/">
              <img src={logo} style={{ height: "35px" }} />
            </StyledLink>
          </Grid>
          <Grid p={5}>
            <StyledLink to="/agents">Agents</StyledLink>
          </Grid>
          <Grid p={5}>
            <StyledLink to="/settings">Settings</StyledLink>
          </Grid>
        </Box>
      </Flex>
    );
  }
}

//Exports class to Global namespace
export default NavBar;
