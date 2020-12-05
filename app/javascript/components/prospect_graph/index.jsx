import React, { Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class ProspectGraph extends Component {

  constructor (props) {

    super(props);

    this.state = {
      graph_type: 'status',
      quote: this.props.quotes,
      label: this.props.label,
      accurary_a: this.props.accurary_a,
      accurary_b: this.props.accurary_b,
      accurary_c: this.props.accurary_c,
      status_contact: this.props.status_contact,
      status_hearing: this.props.status_hearing,
      status_proposal: this.props.status_proposal,
      status_estimate: this.props.status_estimate,
      status_closing: this.props.status_closing,
      status_order: this.props.status_order,
    };

  }

  onClickButton_status = () => {
    // setState で state を更新する
    // this.setState() の引数には、変更したい state の対象を
    // オブジェクトで指定する
    this.setState({ graph_type: 'status' });
  };

  onClickButton_accurary = () => {
    // setState で state を更新する
    // this.setState() の引数には、変更したい state の対象を
    // オブジェクトで指定する
    this.setState({ graph_type: 'accurary' });
  };

  render() {
    var data = [
      {
        name: this.props.label, A: this.props.accurary_a, B: this.props.accurary_b, C: this.props.accurary_c,'問い合わせ': this.props.status_contact, 'ヒアリング': this.props.status_hearing, '提案': this.props.status_proposal, '見積もり': this.props.status_estimate, 'クロージング': this.props.status_closing, '受注': this.props.status_order,
      },
    ];

    return (

      <div>
      <button className='c-btnMain u-mr-10' onClick={this.onClickButton_status}>ステータス</button>
      <button className='c-btnMain u-ml-10' onClick={this.onClickButton_accurary}>確度</button>
        { this.state.graph_type === 'accurary' ?
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
              type='number'
              tickFormatter={val => val.toLocaleString()}
              style={{fontSize: '10px'}}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="A" stackId="a" fill="rgba(34, 80, 162, 0.6)" />
            <Bar dataKey="B" stackId="a" fill="rgba(0, 204, 204, 0.6)" />
            <Bar dataKey="C" stackId="a" fill="rgba(64, 127, 94, 0.6)" />
          </BarChart>
          : null
        }
        { this.state.graph_type === 'status' ?
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
              type='number'
              tickFormatter={val => val.toLocaleString()}
              style={{fontSize: '10px'}}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="問い合わせ" stackId="b" fill="rgba(34, 80, 162, 0.6)" />
            <Bar dataKey="ヒアリング" stackId="b" fill="rgba(0, 204, 204, 0.6)" />
            <Bar dataKey="提案" stackId="b" fill="rgba(64, 127, 94, 0.6)" />
            <Bar dataKey="見積もり" stackId="b" fill="rgba(255,25,240,0.6)" />
            <Bar dataKey="クロージング" stackId="b" fill="rgba(255,3,3,0.6)" />
            <Bar dataKey="受注" stackId="b" fill="rgb(191,191,63,0.6)" />
          </BarChart>
          : null
        }
      </div>
    );
  }
}
