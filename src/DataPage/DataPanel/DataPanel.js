import React, { Component } from "react";

import BasicAreaChart from "./BasicAreaChart/BasicAreaChart";

const day_in_seconds = 86400;
const week_in_seconds = 604800;
const month_in_seconds = 2629746;

class DataPanel extends Component {
  constructor(props) {
    super(props);
  }
  getStartOfDay = date => {
    return Date.parse(date) - day_in_seconds;
  };

  getStartOfWeek = date => {
    return Date.parse(date) - week_in_seconds;
  };

  getStartOfMonth = date => {
    return Date.parse(date) - month_in_seconds;
  };

  getStartOfYear = date => {
    return Math.floor(Date.parse(new Date(date.setMonth(1))) / 1000);
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default DataPanel;
