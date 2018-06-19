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
  AreaChart,
  Area,
  Axis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

class CpuStackChart extends Component {
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
      new Date(data[data.length - 1].timestamp)
    ];
    const scale = scaleTime().domain(domain);
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
        <AreaChart
          width={600}
          height={150}
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
          <Area
            type="monotone"
            dataKey="cpu_times_percent_softirq"
            stroke="#fd9c04"
            fill="#fd9c04"
          />
          <Area
            type="monotone"
            dataKey="cpu_times_percent_user"
            stroke="#fdca04"
            fill="#fdca04"
          />
          <Area
            type="monotone"
            dataKey="cpu_times_percent_nice"
            stroke="#fdca04"
            fill="#fdca04"
          />
          <Area
            type="monotone"
            dataKey="cpu_times_percent_system"
            stroke="#51D408"
            fill="#51D408"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

//Default properties
CpuStackChart.defaultProps = {
  url: "/charts/stacked/",
  agentId: "2",
  stackType: "cpu"
};

//Exports class to Global namespace
export default CpuStackChart;
