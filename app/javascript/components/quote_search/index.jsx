import React, { Component } from "react"
import Style from './style.sass'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Ajax
import Request from "superagent"
require("superagent-rails-csrf")(Request);


export default class QuoteSearch extends Component {
  constructor(props) {
    super(props)
    const date = new Date()
    const year = date.getFullYear()
    const last_month = date.getMonth() - 1
    const next_month = date.getMonth() + 1
    const day = date.getDate()
    this.state = {
      startDate: new Date(year, last_month, day),
      startDate2: new Date(year, next_month, day),
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

  componentWillMount = () => {

    if (location.search.length > 0) {
      // MF見積もり作成・更新なのか確認
      if (location.search.substring(1,4) == "id=") {
        return false;
      } else {
        // 最初の1文字 (?記号) を除いた文字列を取得する
        let query = document.location.search.substring(1);
        let parameters = query.split('&');
        let result = new Object();
        for (var i = 0; i < parameters.length; i++) {
          // パラメータ名とパラメータ値に分割する
          let element = parameters[i].split('=');
          let paramName = decodeURIComponent(element[0]);
          let paramValue = decodeURIComponent(element[1]);

          // パラメータ名をキーとして連想配列に追加する
          result[paramName] = decodeURIComponent(paramValue);
        }

        this.setState({ startDate: new Date(result['date1']), startDate2: new Date(result['date2']) });
      }
    }
  }

  onSearchParams = (params) => {

    if (location.search.length > 0) {

      // 最初の1文字 (?記号) を除いた文字列を取得する
      let query = document.location.search.substring(1);
      let parameters = query.split('&');
      let result = new Object();
      for (var i = 0; i < parameters.length; i++) {
        // パラメータ名とパラメータ値に分割する
        let element = parameters[i].split('=');
        let paramName = decodeURIComponent(element[0]);
        let paramValue = decodeURIComponent(element[1]);

        // パラメータ名をキーとして連想配列に追加する
        result[paramName] = decodeURIComponent(paramValue);
      }
      return result[params];
    } else {

      return null;
    }
  }

  render() {
    return (
      <div className={ 'c-search__work-index u-mt-20' }>
        <div className={ Style.Search }>
          <form method='get' action='/quotes?count=' >
            <div>
              <label for='name'>フリーワード検索 ※スペース区切り単語2つまで</label>
            </div>
            <div className={ Style.Search__SideBySide }>
              <input className={ 'c-form-text__work-index' } type='text' name='name' defaultValue={ this.onSearchParams('name') } placeholder='件名/担当者名/自社部署名/納期' />
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
              <input type='hidden' name='count' value='1'/>
              <input type='submit' name='commit' value='検索' className={ 'c-btnMain-standard' }/>
              <a className={ 'c-btnMain-standard' } href={ '/quotes' } >元に戻す</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
