import React, { Component } from "react"
import PropTypes from "prop-types"

import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';

// Ajax
import Request from "superagent"
require("superagent-rails-csrf")(Request);

// enum_status
import { ENUM_STATUS, } from '../properties.es6'

export default class WorksSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: new Date(),
      startDate2: new Date()
    };
    // クラス単位で参照をしている
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);

  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  handleChange2(date) {
    this.setState({
      startDate2: date
    })
  }


  onSubmit = () => {
    let field = this.refs.searchWord;
    let url = "/works";
    Request.get(url)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end(function(err, res){ 
        console.log(res.body.work_detail);
      });
  }


  render() {
    return (
      <div>
        <form method='get' action='/works'>
          <input type='text' name='name' />
          <select name='status'>
            <option>status</option>
            { Object.keys(ENUM_STATUS).map((item, index) =>{
              const key = 'status-' + index;
              return (
                <option {...{key}} value={item}>{ENUM_STATUS[item]}</option>
              );
            }) }
          </select>
          <DatePicker
              selected={ this.state.startDate }
              onChange={ this.handleChange }
              name='date1'
              dateFormat="YYYY/MM/dd"
          />
          <DatePicker
              selected={ this.state.startDate2 }
              onChange={ this.handleChange2 }
              name='date2'
              dateFormat="YYYY/MM/dd"
          />
          <input type='submit' value='検索' />
        </form> 
      </div>
    );
  }
}
