/**
 * Component: CpuStackChart
 * Purpose: Displays CpuStackChart of stacked data
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
import { AreaChart, Area, Axis, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { ResponsiveContainer } from 'recharts';

class CpuStackChart extends Component {

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

  render(){
    return(
      <ResponsiveContainer width="100%" height="100%" aspect={2}>
        <AreaChart width={600} height={300} data={this.state.data}
              margin={{top: 10, right: 0, left: 0, bottom: 30}}>
          <XAxis dataKey="timestamp" ticks={this.getTicks(this.state.data)} tickFormatter={this.dateFormat} />
          <YAxis/>
          <CartesianGrid strokeDasharray="1 1"/>
          <Tooltip labelFormatter={this.toolTipDateFormat}/>
          <Area type='monotone' dataKey='cpu_times_percent_iowait' stroke='#e4c857' fill='#e4c857' />
          <Area type='monotone' dataKey='cpu_times_percent_irq' stroke='#f0e0a0' fill='#f0e0a0' />
          <Area type='monotone' dataKey='cpu_times_percent_ctx_switches' stroke='#8884d8' fill='#8884d8' />
          <Area type='monotone' dataKey='cpu_times_percent_syscalls' stroke='#8884d8' fill='#8884d8' />
          <Area type='monotone' dataKey='cpu_times_percent_interrupts' stroke='#8884d8' fill='#8884d8' />
          <Area type='monotone' dataKey='cpu_times_percent_soft_interrupts' stroke='#8884d8' fill='#8884d8' />
          <Area type='monotone' dataKey='cpu_times_percent_softirq' stroke='#8884d8' fill='#8884d8' />
          <Area type='monotone' dataKey='cpu_times_percent_steal' stroke='#8884d8' fill='#8884d8' />
          <Area type='monotone' dataKey='cpu_times_percent_user' stroke='#f3b318' fill='#f3b318' />
          <Area type='monotone' dataKey='cpu_times_percent_nice' stroke='#8884d8' fill='#8884d8' />
          <Area type='monotone' dataKey='cpu_times_percent_system' stroke='#8884d8' fill='#8884d8' />
          <Area type='monotone' dataKey='cpu_times_percent_idle' stroke='#e4c857' fill='#e4c857' />
          <Area type='monotone' dataKey='cpu_times_percent_guest' stroke='#8884d8' fill='#8884d8' />
          <Area type='monotone' dataKey='cpu_times_percent_guest_nice' stroke='#8884d8' fill='#8884d8' />
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}

//Default properties
CpuStackChart.defaultProps = {
  url: '/fetch/agent/graph/stacked/',
  agentId: '2',
  stackType: 'cpu'
}

//Exports class to Global namespace
export default CpuStackChart;
