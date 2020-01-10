import React, { Component } from "react";

// Ajax
import Request from "superagent"
require("superagent-rails-csrf")(Request);

// import libraries
import Icon           from 'react-evil-icons';
import DatetimePicker from '../utilities/datetime_picker';

// import properties
import { ENUM_STATUS, } from './properties.es6'

export default class ExpendablesSearch extends Component {
  constructor(props) {
    super(props)
    const date = new Date()
    const year = date.getFullYear();
    const last_month = date.getMonth() - 1;
    const next_month = date.getMonth() + 2;
		const day = date.getDate();

    this.state = {
      startDate: new Date(year, last_month, day),
      endDate: new Date(year, next_month, day),
      division: '負担部署',
      subcontractor: '仕入先',
      status: '勘定科目',
    };
  }

  componentWillMount = () => {

    if (location.search.length > 0) {
      // MF見積もり作成・更新なのか確認
      if (location.search.substring(1,4) == "id=") {
        return false;
			} else if (location.search.substring(1,6) == "page=") {
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
        };

        this.setState({ startDate: new Date(result['date1']), startDate2: new Date(result['date2']) });
      };
    };
  };

	/**
	 * 
	 * @version 2020/01/09
	 * 
	 */
  setStartDate = prop => {

    this.setState({
      startDate: prop.value
    });
  };

	/**
	 * 
	 * @version 2020/01/09
	 * 
	 */
  setEndDate = prop => {

    this.setState({
      endDate: prop.endDate
    });
  };


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
    };
	};

	/**
	 * DatetimePickerから渡ってきた値を振り分けてsetStateする
	 * @version 2020/01/08
	 * 
	 */
	sortingAction = prop => {

		switch(prop.action) {
		  case 'start_date':
				this.setStartDate(prop);
				break;
			case 'end_date':
				this.setEndDate(prop);
				break;
			default:
					break;
		};
	};

  render() {
    return (
      <div className={ 'c-search__work-index u-mt-20' }>
        <form method='get' action='/expendables?' >
					<div className={ 'c-flex' }>
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
						<DatetimePicker type={ 'text' } name={ 'date1' } default_datetime={ this.state.startDate } class={ 'c-form-text__work-index__datepicker u-ml-10' }
							              action={ 'start_date' } sortingAction={ this.sortingAction } index={ true }
						/>
          	<Icon name='ei-calendar' size='m'/>
          	<p className={ 'c-search__tilde' }>〜</p>
						<DatetimePicker type={ 'text' } name={ 'date2' } default_datetime={ this.state.endDate } class={ 'c-form-text__work-index__datepicker' }
						              	action={ 'end_date' } sortingAction={ this.sortingAction } index={ false }
						/>
          	<Icon name='ei-calendar' size='m'/>
          	<input type='submit' name='commit' value='検索' className={ 'c-btnMain-standard' }/>
          	<a className={ 'c-btnMain-primaryA' } href={ '/expendables' } >元に戻す</a>
					</div>
        </form>
      </div>
    );
  }
}
