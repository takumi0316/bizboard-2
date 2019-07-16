import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'ビジスタント', uv: 4000, pv: 2400
  },
  {
    name: '新川', uv: 3000, pv: 1398
  },
  {
    name: '丸の内', uv: 2000, pv: 9800
  },
  {
    name: '大崎', uv: 2780, pv: 3908
  },
  {
    name: 'JX', uv: 1890, pv: 4800
  },
  {
    name: 'カスタマーサービス', uv: 2390, pv: 3800
  },
];

export default class Example extends PureComponent {
  render() {
    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    );
  }
}
