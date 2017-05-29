/**
 * Component: MemoryStackChart
 * Purpose: Displays MemoryStackChart of stacked data
 * Properties:
 *  url : local url prefix
 *  agentId : Agent Id in database
 *  stackType: Graph's stack type
 **/

 //React and React Bootstrap imports
import React, { Component } from 'react';
//HTTP Promise library import
import axios from 'axios';
//D3.js import
import * as d3 from 'd3';
//Moment.js import
import moment from 'moment';

//Recharts component imports
import { AreaChart, Area, Axis, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import { ResponsiveContainer } from 'recharts';

class MemoryStackChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  //Runs after Component is Loaded
  componentDidMount() {
    var _this = this;
    axios.get(this.props.url + this.props.agentId + '/' + this.props.stackType)
      .then(function (response) {
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
      .catch(function (error) {
        console.log(error);
      });
  }
  //Generates graph ticks for X Axis
  getTicks(data){
    if (!data || !data.length ) {return [];}
    const domain = [new Date(data[0].timestamp), new Date(data[data.length - 1].timstamp)];
    const scale = d3.scaleTime().domain(domain).range([0,1]);
    const ticks = scale.ticks(d3.timeHour, 1);
    return ticks.map(entry => +entry);
  };

  //Formats unix times to hours and minutes
  dateFormat(time) {
    return moment(time).format('HH:mm');
  }

  //Formats unix times to local Month/Day/Hour/Minutes format
  toolTipDateFormat(time) {
    return moment(time).format('lll');
  }

  render() {
    return(
      <ResponsiveContainer width="100%" height="100%" aspect={2}>
        <AreaChart width={600} height={300} data={this.state.data}
              margin={{top: 10, right: 0, left: 0, bottom: 30}}>
          <XAxis dataKey="timestamp" ticks={this.getTicks(this.state.data)} tickFormatter={this.dateFormat} />
          <YAxis/>
          <CartesianGrid strokeDasharray="1 1"/>
          <Tooltip labelFormatter={this.toolTipDateFormat}/>
          <Area type='monotone' dataKey='memory_buffers' stroke='#71d5c3' fill='#71d5c3' />
          <Area type='monotone' dataKey='memory_cached' stroke='#009db2' fill='#009db2' />
          <Area type='monotone' dataKey='memory_shared' stroke='#009db2' fill='#009db2' />
          <Area type='monotone' dataKey='memory_available' stroke='#98e1d4' fill='#98e1d4' />
          <Area type='monotone' dataKey='memory_free' stroke='#f0e0a0' fill='#f0e0a0' />
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}

//Default properties
MemoryStackChart.defaultProps = {
  url: '/fetch/agent/graph/stacked/',
  agentId: '2',
  stackType: 'memory'
}

//Exports class to Global namespace
export default MemoryStackChart;
