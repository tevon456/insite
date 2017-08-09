/**
 * Component: MemoryStackChart
 * Purpose: Displays MemoryStackChart of stacked data
 * Properties:
 *  url : local url prefix
 *  agentId : Agent Id in database
 *  stackType: Graph's stack type
 **/

//React and React Bootstrap imports
import React, { Component } from "react";
//HTTP Promise library import
import { get } from "axios";
//D3.js import
import { scaleTime } from "d3-scale";
import { timeHour } from "d3-time";
//Moment.js import
import moment from "moment";

//Recharts component imports
import {
  LineChart,
  Line,
  Axis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

class NetworkLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  //Runs after Component is Loaded
  componentDidMount() {
    var _this = this;
    get(this.props.url + this.props.agentId + "/" + this.props.stackType)
      .then(function(response) {
        var data = response.data;
        //Times each time by 100 to prep for conversion
        data.forEach(function(d) {
          d.timestamp = d.timestamp * 1000;
        });
        //Sets data in component
        _this.setState({
          data: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  //Generates graph ticks for X Axis
  getTicks(data) {
    if (!data || !data.length) {
      return [];
    }

    const domain = [
      new Date(data[0].timestamp),
      new Date(data[data.length - 1].timstamp)
    ];
    const scale = scaleTime().domain(domain).range([0, 1]);
    const ticks = scale.ticks(timeHour, 1);
    return ticks.map(entry => +entry);
  }

  //Formats unix times to hours and minutes
  dateFormat(time) {
    return moment(time).format("HH:mm");
  }

  //Formats unix times to local Month/Day/Hour/Minutes format
  toolTipDateFormat(time) {
    return moment(time).format("lll");
  }

  render() {
    return (
      <ResponsiveContainer width="100%" height="35%" minHeight={300}>
        <LineChart
          width={600}
          height={300}
          data={this.state.data}
          margin={{ top: 10, right: 0, left: 0, bottom: 30 }}
        >
          <XAxis
            dataKey="timestamp"
            ticks={this.getTicks(this.state.data)}
            tickFormatter={this.dateFormat}
          />
          <YAxis />
          <CartesianGrid strokeDasharray="1 1" />
          <Tooltip labelFormatter={this.toolTipDateFormat} />
          <Line
            dot={false}
            type="monotone"
            dataKey="network_bytes_recv"
            stroke="#71d5c3"
          />
          <Line
            dot={false}
            type="monotone"
            dataKey="network_bytes_sent"
            stroke="#9771d5"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

//Default properties
NetworkLineChart.defaultProps = {
  url: "/charts/stacked/",
  agentId: "2",
  stackType: "network"
};

//Exports class to Global namespace
export default NetworkLineChart;
