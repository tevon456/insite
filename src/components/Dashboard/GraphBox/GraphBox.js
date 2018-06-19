/**
 * Component: GraphBox
 * Purpose: Displays graphs on home page
 * Properties:
 *  agentId: Agent number in database
 *  data: Data object from Parent
 **/

//React and React Bootstrap imports
import React, { Component } from "react";
import Loadable from "react-loadable";
import styled from "styled-components";
import { Flex, Box, Grid } from "grid-styled";

//Import sub components
import DetailsBox from "../DetailsBox/DetailsBox";

const AsyncCpuStackChart = Loadable({
  loader: () => import("./CpuStackChart/CpuStackChart.js"),
  loading: () => null
});

const AsyncLoadStackChart = Loadable({
  loader: () => import("./LoadStackChart/LoadStackChart.js"),
  loading: () => null
});

const AsyncMemoryStackChart = Loadable({
  loader: () => import("./MemoryStackChart/MemoryStackChart.js"),
  loading: () => null
});

const AsyncNetworkLineChart = Loadable({
  loader: () => import("./NetworkLineChart/NetworkLineChart.js"),
  loading: () => null
});

class GraphBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DetailsBox
          device={this.props.data.device}
          system={this.props.data.system}
          version={this.props.data.release}
        />

        <h4>Load Average</h4>
        <AsyncLoadStackChart agentId={this.props.data.agent} />

        <h4>CPU Utilization</h4>
        <AsyncCpuStackChart agentId={this.props.data.agent} />

        <h4>Memory Utilization</h4>
        <AsyncMemoryStackChart agentId={this.props.data.agent} />

        <h4>Network Average</h4>
        <AsyncNetworkLineChart agentId={this.props.data.agent} />
      </div>
    );
  }
}

//Default properties
GraphBox.defaultProps = {
  agentId: "2",
  data: {}
};

//Exports class to Global namespace
export default GraphBox;
