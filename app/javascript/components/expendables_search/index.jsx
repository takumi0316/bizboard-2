import React, { Component } from "react"
import Style from './style.sass'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Ajax
import Request from "superagent"
require("superagent-rails-csrf")(Request);

// enum_status
import { ENUM_STATUS, } from './properties.es6'

export default class ExpendablesSearch extends Component {
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
      division: '負担部署',
      subcontractor: '仕入先',
      status: '勘定科目',
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
          <form method='get' action='/expendables?' >
            <div className={ Style.Search__SideBySide }>
            <select name='division' className={ 'c-form-select__expendable-index' }>
              <option value={ this.state.division }>{ this.state.division === '負担部署' ? '負担部署' : [this.state.division] }</option>
              { this.props.division.map((division, index) => {
                const key = 'division' + index;
                return(
                  this.state.division === '負担部署' ?
                  <option key={ key } value={ division['id'] }>{ division['name'] }</option>
                  :
                  this.state.division === division ? <option>負担部署</option> : <option {...{key}} value={ division['id'] }>{ division['name'] }</option>
                );
              }) }
            </select>
            <select name='subcontractor' className={ 'c-form-select__expendable-index' }>
              <option value={ this.state.subcontractor }>{ this.state.subcontractor === '仕入先' ? '仕入先' : [this.state.subcontractor] }</option>
              { this.props.subcontractor.map((subcontractor, index) => {
                const key = 'subcontractor' + index;
                return(
                  this.state.subcontractor === '仕入先' ?
                  <option key={ key } value={ subcontractor['id'] }>{ subcontractor['name'] }</option>
                  :
                  this.state.subcontractor === subcontractor ? <option>仕入先</option> : <option {...{key}} value={ subcontractor['id'] }>{ subcontractor['name'] }</option>
                );
              }) }
            </select>
              <select name='status' className={ 'c-form-select__work-index' }>
                <option value={ this.state.status }>{ this.state.status === '勘定科目' ? '勘定科目' : ENUM_STATUS[this.state.status] }</option>
                { Object.keys(ENUM_STATUS).map((item, index) =>{
                  const key = 'status-' + index;
                  return (
                    this.state.status === '勘定科目' ?
                    <option {...{key}} value={item}>{ENUM_STATUS[item]}</option>
                    :
                    this.state.status === item ? <option>勘定科目</option> : <option {...{key}} value={item}>{ENUM_STATUS[item]}</option>
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
              <a className={ 'c-btnMain-standard' } href={ '/expendables' } >元に戻す</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
