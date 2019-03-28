import React, { Component } from "react"
import Style from './style.sass'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    })
  }

  handleChange2 = (date) => {
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
        <form className={ 'c-search u-mt-30' } method='get' action='/works'>
          <label style={{ fontSize: '1.2rem', height: '18px' }} for='name'>フリーワード検索 ※スペース区切り単語2つまで</label>
          <div className={ 'c-search__work-index' }> 
            <input className={ 'c-form-text__work-index' } type='text' name='name' placeholder='顧客名/担当者名/作業内容'/>
            <select name='status' className={ 'c-form-select__work-index' }>
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
              onChange={ ::this.handleChange }
              name='date1'
              dateFormat="YYYY/MM/dd"
              className={ 'c-form-text__work-index__datepicker' }
            />
            <DatePicker
              selected={ this.state.startDate2 }
              onChange={ ::this.handleChange2 }
              name='date2'
              dateFormat="YYYY/MM/dd"
              className={ 'c-form-text__work-index__datepicker' }
            />
          </div>
          <input type='submit' name='commit' value='検索' className={ 'c-btnMain-standard u-mt-20' }/>
        </form>
      </div>
    );
  }
}
