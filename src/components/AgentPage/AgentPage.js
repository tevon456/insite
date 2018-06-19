/**
 * Component: AgentPage
 * Purpose: Show agents that are collectng data
 * Properties:
 *  data: Data object from API request
 **/

import React, { Component, Text } from "react";
import { get } from "axios";

import styled from "styled-components";
import { Flex, Grid, Box } from "grid-styled";
import NavBar from "Components/Navbar/Navbar.js";
import Footer from "Components/Dashboard/Footer/Footer.js";
import AgentPanel from "./AgentPanel/AgentPanel.js";

const Container = styled(Box)`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  padding-top: 30px;
  padding-bottom: 30px;
  box-shadow: 3px 3px 5px 3px #ccc;
`;

class AgentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agents: []
    };
  }

  fetchAgentPanels = agents => {
    var agentPanels = [];
    var key = 0;
    console.log(agents);
    for (var agent of agents) {
      agentPanels.push(
        <AgentPanel
          key={key++}
          agentName={agent.agent}
          enabled={agent.enabled}
          agentId={agent.idx_agent}
          agentIdx={agent.idx_agentname}
        />
      );
    }
    return agentPanels;
  };

  componentDidMount() {
    var _this = this;
    get(this.props.agentRoute).then(function(response) {
      var data = response.data;
      //Times each time by 100 to prep for conversion
      _this.setState({
        agents: _this.fetchAgentPanels(data)
      });
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <Container>
          {this.state.agents}
        </Container>
        <Footer />
      </div>
    );
  }
}

//Default properties
AgentPage.defaultProps = {
  agentRoute: "/agents"
};

//Exports class to Global namespace
export default AgentPage;
