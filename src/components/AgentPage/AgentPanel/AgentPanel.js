import React, { Component } from "react";

import { Flex, Box, Grid } from "grid-styled";
import styled from "styled-components";

const AgentBox = styled(Grid)`
    min-width:350px;
    margin: 10px;
    padding 10px;
    border: 1px solid #ccc;
    &:hover {
         box-shadow: 3px 3px 5px 3px #ccc;
    }
`;

class AgentPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var enabled = "";
    if (this.props.enabled) enabled = "true";
    else enabled = "false";

    return (
      <AgentBox>
        <Flex direction="column">
          <Box width={1}>
            <Grid width={1 / 2}>
              <p>Agent Name</p>
            </Grid>
            <Grid width={1 / 2}>
              <p>{this.props.agentName}</p>
            </Grid>
          </Box>
          <Box width={1}>
            <Grid width={1 / 2}>
              <p>Enabled</p>
            </Grid>
            <Grid width={1 / 2}>
              <p>{enabled}</p>
            </Grid>
          </Box>
          <Box width={1}>
            <Grid width={1 / 2}>
              <p>Agent Id</p>
            </Grid>
            <Grid width={1 / 2}>
              <p>{this.props.agentId}</p>
            </Grid>
          </Box>
        </Flex>
      </AgentBox>
    );
  }
}
AgentPanel.defaultProps = {
  agentName: "Loading",
  exists: "loading",
  agentId: "loading"
};
export default AgentPanel;
