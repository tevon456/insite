/**
 * Component: Details
 * Purpose: Displays Machine Details Section of UI
 * Properties:
 *  device: Host's name
 *  system: Host's operating system
 *  version: Host's OS version
 **/

//React and React Bootstrap imports
import React, { Component } from "react";

import styled from "styled-components";
import { Flex, Grid, Box } from "grid-styled";

//Axios import, HTTP Promise library
import { get } from "axios";

import idCard from "./id-card.svg";
import monitor from "./monitor.svg";
import settings from "./settings.svg";

const Panel = styled("Flex")`
  margin-top: 10px;
  padding-top: 10px;
  display: inline-flex;
  min-width: 1024px;
  text-align: center;
  box-shadow: 3px 3px 5px 3px #ccc;
`;

const CenterBox = styled("Box")`
text-align: center;
`;

class DetailsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: "",
      system: "",
      version: ""
    };
  }

  componentDidMount() {
    var _this = this;
    get("initial")
      .then(function(response) {
        console.log(response.data);
        _this.setState({
          host: response.data[2],
          system: response.data[1],
          version: response.data[0]
        });
      })
      .catch(function(error) {
        console.log("Error from fetch");
        console.log(error);
      });
  }

  render() {
    return (
      <Panel align="center" p={10}>
        <Box width={1}>
          <img src={idCard} height="35px" />
          <p><b>Host</b> {this.state.host}</p>
        </Box>
        <Box width={1}>
          <img src={monitor} height="35px" />
          <p><b>OS</b> {this.state.system}</p>
        </Box>
        <Box width={1}>
          <img src={settings} height="35px" />
          <p><b>Version</b> {this.state.version}</p>
        </Box>
      </Panel>
    );
  }
}

//Default properties of Component
DetailsBox.defaultProps = {
  device: "",
  system: "",
  version: ""
};
//Exports Component to Global namespace
export default DetailsBox;
