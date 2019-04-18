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
      <div className={ 'c-search__work-index u-mt-20' }>
        <div className={ Style.Search }>
          <form method='get' action='/works'>
            <div>
              <label for='name'>フリーワード検索 ※スペース区切り単語2つまで</label>
            </div>
            <div className={ Style.Search__SideBySide }>
              <input className={ 'c-form-text__work-index' } type='text' name='name' placeholder='顧客名/担当者名/作業内容'/>
              <select name='status' className={ 'c-form-select__work-index' }>
                <option>ステータス</option>
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
              <input type='submit' name='commit' value='検索' className={ 'c-btnMain-standard' }/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
