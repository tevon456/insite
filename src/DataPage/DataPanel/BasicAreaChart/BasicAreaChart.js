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

class BasicAreaChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  getTicks(data) {
    if (!data || !data.length) {
      return [];
    }

    const domain = [new Date(data[0].x), new Date(data[data.length - 1].x)];
    const scale = scaleTime().domain(domain).range([0, 1]);
    const ticks = scale.ticks(timeHour, 1);
    return ticks.map(entry => +entry);
  }

  dateFormat(time) {
    return moment(time).format("HH:mm");
  }
  //Runs after Component is Loaded
  componentDidMount() {
    var _this = this;

    get(
      this.props.url +
        this.props.datapointId +
        "?ts_start=" +
        timeStart.toString() +
        "&ts_stop=" +
        timeStop.toString()
    )
      .then(function(response) {
        var data = response.data;

        data.forEach(function(d) {
          d.x = d.x * 1000;
        });

        _this.setState({
          data: response.data,
          timeStart: timeStart,
          timeStop: timeStop
        });
      })
      .catch(function(error) {
        console.log("error");
      });
  }

  render() {
    return (
      <ResponsiveContainer width="100%" height="35%">
        <AreaChart
          width={600}
          height={300}
          data={this.state.data}
          margin={{ top: 10, right: 0, left: 0, bottom: 30 }}
        >
          <XAxis
            dataKey="x"
            ticks={this.getTicks(this.state.data)}
            tickFormatter={this.dateFormat}
          />
          <YAxis />
          <CartesianGrid strokeDasharray="1 1" />
          <Tooltip />
          <Area type="monotone" dataKey="y" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

BasicAreaChart.defaultProps = {
  url: "/charts/area/",
  datapointId: "130",
  type: "current",
  timeStop: 0,
  timeStart: 0
};

export default BasicAreaChart;
