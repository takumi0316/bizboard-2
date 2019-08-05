import React, { Component } from 'react';
import Style from './style.sass'

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class TargetGraph extends Component {

  render() {
    var data = [
      {
        name: this.props.label, '目標': this.props.target, '金額': this.props.value,
      },
    ];

    return (
      <div>
        <BarChart
          width={200}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type='category' dataKey='name' style={{fontSize: '15px'}} />
          <YAxis
            type='number'
            domain={[0, this.props.target]}
            tickFormatter={val => val.toLocaleString()}
            style={{fontSize: '10px'}}
          />
          <Tooltip />
          <Legend />
          { this.props.target == null?
            null            
            :
            <Bar dataKey="目標" fill="rgba(0,153,255,1)" />
          }
          <Bar dataKey="金額" fill={this.props.color} />
        </BarChart>
      </div>
    );
  }
}
