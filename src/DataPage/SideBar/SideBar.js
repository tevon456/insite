import React, { Component } from "react";
import { Flex, Box, Grid } from "grid-styled";
import styled from "styled-components";

import { get } from "axios";
import Loadable from "react-loadable";

import DatapointLink from "./DatapointLink/DatapointLink.js";

const Container = styled(Box)`
  height:100%;
`;

const SideBarBox = styled(Box)`
  min-width: 300px;
  box-shadow: 3px 0px 5px -2px #ccc;
`;

const ScrollPanel = styled(Box)`
  max-height:900px;
  overflow-y: scroll;
`;

const Title = styled.h4`
  color: #bc3e3f;
  margin-right: 10px;
`;

const SubTitle = styled.p`
  display: inline-block
`;

const AsyncDataPanel = Loadable({
  loader: () => import("../DataPanel/DataPanel.js"),
  loading: () => null
});

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datapoints: [],
      currentDatapoint: 130,
      currentLabel: "Loading"
    };
  }

  onDatapointChange = (datapoint, datapointLabel) => {
    this.setState({
      currentDatapoint: datapoint,
      currentLabel: datapointLabel
    });
  };

  getDatapointLinks = datapoints => {
    var links = [];
    var key = 0;
    for (let datapoint of datapoints) {
      links.push(
        <DatapointLink
          key={key++}
          onDatapointChange={this.onDatapointChange}
          datapointId={datapoint.idx_datapoint}
          datapointLabel={datapoint.agent_label}
        />
      );
    }
    return links;
  };

  componentDidMount() {
    var _this = this;

    get("datapoints")
      .then(function(response) {
        var data = response.data;

        _this.setState({
          datapoints: _this.getDatapointLinks(data),
          currentDatapoint: data[1].idx_datapoint,
          currentLabel: data[1].agent_label
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps);
    return true;
  }

  render() {
    return (
      <Container>
        <Flex>
          <SideBarBox>
            <Title>Datapoints</Title>
            <ScrollPanel>
              {this.state.datapoints}
            </ScrollPanel>
          </SideBarBox>
          <Box width={1} pl={10} pr={10}>
            <Title style={{ display: "inline" }}>Graphs</Title>
            <SubTitle>
              {this.state.currentLabel}
            </SubTitle>
            <Box pr={50} pb={50}>
              <AsyncDataPanel
                datapointId={this.state.currentDatapoint}
                datapointLabel={this.state.currentLabel}
              />
            </Box>
          </Box>
        </Flex>
      </Container>
    );
  }
}

export default SideBar;
