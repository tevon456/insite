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

  getTicks = data => {
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
  };

  dateFormat = time => {
    return moment(time).format("HH:mm");
  };

  componentWillReceiveProps(nextProps) {
    var _this = this;
    get(
      nextProps.url +
        nextProps.datapointId +
        "?timeStart=" +
        nextProps.timeStart +
        "&timeStop=" +
        nextProps.timeStop
    )
      .then(function(response) {
        var data = response.data;
        //Times each time by 100 to prep for conversion
        data.forEach(function(d) {
          d.timestamp = d.timestamp * 1000;
        });
        _this.setState({
          data: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  //Runs after Component is Loaded
  componentDidMount() {
    var _this = this;

    get(
      this.props.url +
        this.props.datapointId +
        "?timeStart=" +
        this.props.timeStart +
        "&timeStop=" +
        this.props.timeStop
    )
      .then(function(response) {
        var data = response.data;
        //Times each time by 100 to prep for conversion
        data.forEach(function(d) {
          d.timestamp = d.timestamp * 1000;
        });
        _this.setState({
          data: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <ResponsiveContainer height="35%" minHeight={300}>
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
          <Tooltip />
          <Area type="monotone" dataKey="y" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

BasicAreaChart.defaultProps = {
  url: "/charts/area/",
  datapointId: "113",
  datapointLabel: "Example",
  type: "current",
  timeStop: 0,
  timeStart: 0
};

export default BasicAreaChart;
