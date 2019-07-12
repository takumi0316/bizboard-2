import React, { Component } from 'react'
import Style from './style.sass'

import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend,
} from 'recharts'

export default class Target extends Component {

  constructor(props) {

    super(props)
  }

  render() {
    const data_event = [
      { name: this.props.label, '金額': this.props.value },
    ];

    return (
      <div className={Style.Target}>
        <ComposedChart
          width={380}
          height={80}
          layout="vertical"
          data={data_event}
        >
=======
          <XAxis
            type='number'
            domain={[0, this.props.target]}
            tickFormatter={val => val.toLocaleString()}
          />
          <YAxis type='category' dataKey='name' />
>>>>>>> ea54e27e8b6760ca70597b2b071888e696ca9c80
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar
            dataKey='金額'
            barSize={20}
            stroke={this.props.color}
            background={{ fill: '#eee' }}
            fillOpacity={1}
            fill={this.props.color}
          />
        </ComposedChart>
      </div>
    );
  }
}
