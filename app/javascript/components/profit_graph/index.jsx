import React, { Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class ProfitGraph extends Component {

  constructor (props) {

    super(props);

    this.state = {
      label: this.props.label,
      plans: this.props.plans,
      orders: this.props.orders,
      targets: this.props.targets,
    };

  }

  render() {
    var data = [
      {
        name: this.props.label, '予定金額': this.props.plans, '受注確定額': this.props.orders,'目標額': this.props.targets,
      },
    ];

    return (

      <div>
          <BarChart
            width={200}
            height={500}
            data={data}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" style={{fontSize: '15px'}} />
            <YAxis
              style={{fontSize: '10px'}}
              type='number'
              domain={[0, this.props.target]}
              tickFormatter={val => val.toLocaleString()}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="目標額" fill="rgba(65, 105, 255, 0.8)" />
            <Bar dataKey="予定金額" stackId="a" fill="rgba(255, 215, 0, 0.8)" />
            <Bar dataKey="受注確定額" stackId="a" fill="rgba(255, 105, 180, 0.8)" />
          </BarChart>
      </div>
    );
  }
}