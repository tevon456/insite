import React, { Component } from "react";
import styled from "styled-components";

import Loadable from "react-loadable";

const day_in_seconds = 86400;
const week_in_seconds = 604800;
const month_in_seconds = 2629746;

const Title = styled.h5`
  color: #bc3e3f;
`;

const AsyncBasicAreaChart = Loadable({
  loader: () => import("./BasicAreaChart/BasicAreaChart"),
  loading: () => null
});

class DataPanel extends Component {
  constructor(props) {
    super(props);
  }
  getStartOfDay = date => {
    return date - day_in_seconds;
  };

  getStartOfWeek = date => {
    return date - week_in_seconds;
  };

  getStartOfMonth = date => {
    return date - month_in_seconds;
  };

  getStartOfYear = date => {
    return 0;
  };

  render() {
    let date = Date.parse(new Date()) / 1000;
    let dailyStart = this.getStartOfDay(date);
    let weeklyStart = this.getStartOfWeek(date);
    let monthlyStart = this.getStartOfMonth(date);
    let yearlyStart = this.getStartOfYear(date);

    return (
      <div>
        <Title>Daily</Title>
        <AsyncBasicAreaChart
          key={0}
          datapointId={this.props.datapointId}
          datapointLabel={this.props.datapointLabel}
          timeStart={dailyStart}
          timeStop={date}
        />
        <Title>Weekly</Title>
        <AsyncBasicAreaChart
          key={1}
          datapointId={this.props.datapointId}
          datapointLabel={this.props.datapointLabel}
          timeStart={weeklyStart}
          timeStop={date}
        />
        <Title>Monthly</Title>
        <AsyncBasicAreaChart
          key={3}
          datapointId={this.props.datapointId}
          datapointLabel={this.props.datapointLabel}
          timeStart={monthlyStart}
          timeStop={date}
        />
      </div>
    );
  }
}

DataPanel.defaultProps = {
  datapointId: "130",
  datapointLabel: "Example"
};

export default DataPanel;
