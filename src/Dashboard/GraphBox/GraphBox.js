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
import { Col, Panel } from "react-bootstrap";

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
      <div className="GraphBox">
        <Col xs={12} md={12}>
          <Col xs={12} md={12}>
            <DetailsBox
              device={this.props.data.device}
              system={this.props.data.system}
              version={this.props.data.release}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h4>Load Average</h4>
            <AsyncLoadStackChart agentId={this.props.data.agent} />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h4>CPU Utilization</h4>
            <AsyncCpuStackChart agentId={this.props.data.agent} />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h4>Memory Utilization</h4>
            <AsyncMemoryStackChart agentId={this.props.data.agent} />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h4>Network Average</h4>
            <AsyncNetworkLineChart agentId={this.props.data.agent} />
          </Col>
        </Col>
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
