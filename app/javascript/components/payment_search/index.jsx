import React, { Component } from "react"
import Style from './style.sass'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Icon  from 'react-evil-icons'

// Ajax
import Request from "superagent"
require("superagent-rails-csrf")(Request);


export default class PaymentSearch extends Component {
  constructor(props) {
    super(props)
    const date = new Date()
    const date1 = date.setDate(1)
    const end_date = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    const year = date.getFullYear()
    const month = date.getMonth()
    const start_day = date.getDate()
    const end_day = end_date.getDate()
    this.state = {
      startDate: new Date(year, month, start_day),
      startDate2: new Date(year, month, end_day),
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
      if (location.search.substring(1,4) == "fal") {
        return false;
      }
      else if (location.search.substring(1,6) == "page=") {
        return false;
      }
      else {
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
          <form method='get' action='/payments?' >
            <div>
              <label for='name'>日付検索 ※外注書に登録された時の日付が検索されます</label>
            </div>
            <div className={ Style.Search__SideBySide }>
              <DatePicker
                selected={ this.state.startDate }
                onChange={ ::this.handleChange }
                name='date1'
                dateFormat="YYYY/MM/dd"
                className={ 'c-form-text__work-index__datepicker' }
              />
              <div className={ Style.Search__date1 }><Icon name='ei-calendar' size='s'/></div>
              <p className={ 'c-search__tilde' }>〜</p>
              <DatePicker
                selected={ this.state.startDate2 }
                onChange={ ::this.handleChange2 }
                name='date2'
                dateFormat="YYYY/MM/dd"
                className={ 'c-form-text__work-index__datepicker' }
              />
              <div className={ Style.Search__date2 }><Icon name='ei-calendar' size='s'/></div>
              <input type='submit' name='commit' value='検索' className={ 'c-btnMain-standard' }/>
              <a className={ 'c-btnMain-standard' } href={ '/payments' } >元に戻す</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
