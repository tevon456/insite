import React, { Component } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import moment from 'moment';

import { AreaChart, Area, Axis, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import { ResponsiveContainer } from 'recharts';

class BasicAreaChart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  //Runs after Component is Loaded
  componentDidMount() {
    var _this = this;

    axios.get('/graphs/did/bytimestamp/136')
      .then(function (response) {

        var data = response.data;

        data.forEach(function(d) {
          d.x = d.x * 1000;
         });

        _this.setState({
          data: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getTicks(data){
  	if (!data || !data.length ) {return [];}

    const domain = [new Date(data[0].x), new Date(data[data.length - 1].x)];
  	const scale = d3.scaleTime().domain(domain).range([0,1]);
    const ticks = scale.ticks(d3.timeHour, 1);
    return ticks.map(entry => +entry);
  };

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
          <Tooltip formatter={this.dateFormat}/>
          <Area name="Test" type='monotone' dataKey='y' stroke='#8884d8' fill='#8884d8' />
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}

export default BasicAreaChart;
