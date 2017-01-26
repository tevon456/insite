/**
 * Component: BasicAreaChart
 * Purpose: Displays BasicAreaChart
 * Properties:
 *  url : local url prefix
 *  did : Datapoint number for a specific set of data
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

class BasicAreaChart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    }
  }

  //Runs after Component is Loaded
  componentDidMount() {
    var _this = this;

    axios.get(this.props.url + '/' +this.props.did)
      .then(function (response) {
        var data = response.data;
        //Times each time by 100 to prep for conversion
        data.forEach(function(d) {
          d.x = d.x * 1000;
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
    const domain = [new Date(data[0].x), new Date(data[data.length - 1].x)];
  	const scale = d3.scaleTime().domain(domain).range([0,1]);
    const ticks = scale.ticks(d3.timeHour, 1);
    return ticks.map(entry => +entry);
  }

  //Formats unix times to hours and minutes
  dateFormat(time) {
    return moment(time).format('HH:mm');
  }

  render(){
    return(
      <ResponsiveContainer width="100%" height="100%" aspect={2}>
        <AreaChart width={600} height={300} data={this.state.data}
              margin={{top: 10, right: 0, left: 0, bottom: 30}}>
          <XAxis dataKey="x" ticks={this.getTicks(this.state.data)} tickFormatter={this.dateFormat} />
          <YAxis/>
          <CartesianGrid strokeDasharray="1 1"/>
          <Tooltip/>
          <Area type='monotone' dataKey='y' stroke='#8884d8' fill='#8884d8' />
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}

//Default properties
BasicAreaChart.defaultProps = {
  url: '/graphs/did/bytimestamp',
  did: '130'
}

//Exports class to Global namespace
export default BasicAreaChart;
