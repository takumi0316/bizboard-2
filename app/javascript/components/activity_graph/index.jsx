import React, { Component } from 'react'
import Style from './style.sass'

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

export default class ActivityGraph extends Component {

  constructor(props) {

    super(props)
  }

  render() {
    const data_event = [
      { name: this.props.label, '目標': this.props.target, '金額': this.props.value},
    ];

    return (
      <BarChart
        width={250}
        height={300}
        data={data_event}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="目標" fill="rgba(0,153,255,1)" />
        <Bar dataKey="金額" fill={this.props.color} />
      </BarChart>
    );
  }
}
