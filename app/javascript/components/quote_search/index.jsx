import React, { Component } from "react";

// import libraries
import Icon           from 'react-evil-icons';
import DatetimePicker from '../utilities/datetime_picker';

// Ajax
import Request from "superagent";
require("superagent-rails-csrf")(Request);

// enum_status
import { ENUM_STATUS, } from './properties.es6';

export default class QuoteSearch extends Component {
  constructor(props) {

		super(props);
		
    const date = new Date();
    const year = date.getFullYear();
    const last_month = date.getMonth() - 1;
    const next_month = date.getMonth() + 2;
		const day = date.getDate();

    this.state = {
      startDate: new Date(year, last_month, day),
      endDate: new Date(year, next_month, day),
      status: 'ステータス',
    };
	};
	
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

        this.setState({ startDate: new Date(result['date1']), endDate: new Date(result['date2']) });
      };
    }
  };

	/**
	 *
	 * @version 2020/01/08
	 *
	 */
  setStartDate = prop => {

    this.setState({
      startDate: prop.value
    });
  };

	/**
	 *
	 * @version 2020/01/08
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
      };
      return result[params];
    } else {

      return null;
    }
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
        <div>
          <label>フリーワード検索 ※スペース区切り単語2つまで 日付検索は納期で検索されます</label>
  	      <span className={ 'c-form__required u-ml-10' }>現在{this.props.count_number}件表示されています</span>
        </div>
        <form method='get' action='/quotes?count='>
        	<div className={ 'u-mt-10 c-flex' }>
            <input className={ 'c-form-text__work-index' } type='text' name='name' defaultValue={ this.onSearchParams('name') } placeholder='件名/お客様/自社部署名/納期' />
            <select name='status' className={ 'u-ml-10 c-form-select__work-index' }>
              <option value={ this.state.status }>{ this.state.status === 'ステータス' ? 'ステータス' : ENUM_STATUS[this.state.status] }</option>
              { Object.keys(ENUM_STATUS).map((item, index) =>{
                const key = 'status-' + index;
                return (
                  this.state.status === 'ステータス' ?
                  <option {...{key}} value={item}>{ENUM_STATUS[item]}</option>
                  :
                  this.state.status === item ? <option>ステータス</option> : <option {...{key}} value={item}>{ENUM_STATUS[item]}</option>
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
            <input type='hidden' name='count' value='1'/>
            <input type='submit' name='commit' value='検索' className={ 'u-ml-10 c-btnMain-standard' }/>
            <a className={ 'u-va-middle u-ml-10 c-btnMain-primaryA' } href={ '/quotes' } >元に戻す</a>
          </div>
        </form>
      </div>
    );
  }
}
// import React, { Fragment, useState, useEffect } from "react";
// 
// // import libraries
// import Icon           from 'react-evil-icons';
// import DatetimePicker from '../utilities/datetime_picker';
// 
// // Ajax
// import Request from "superagent";
// require("superagent-rails-csrf")(Request);
// 
// // enum_status
// import { ENUM_STATUS, } from './properties.es6';
// 
// const QuoteSearch = props => {
// 		
//   const date = new Date();
//   const year = date.getFullYear();
//   const last_month = date.getMonth() - 1;
//   const next_month = date.getMonth() + 2;
// 	const day = date.getDate();
// 
//   const init = {
// 		name: '',
//     startDate: new Date(year, last_month, day),
//     endDate: new Date(year, next_month, day),
//     status: 'ステータス',
// 	};
// 
// 	const [state, setState] = useState(init);
// 	
// 	useEffect(() => {
// 
// 		const values = onSearchParams();
// 		if(!values) return;
// 
// 		setState({ 
// 			...state,
// 			name: values['name'],
// 			startDate: values['date1'],
// 			endDate: values['date2'],
// 			status: values['status']
// 		});
// 	}, []);
// 
// 	/**
// 	 *
// 	 * @version 2020/01/08
// 	 *
// 	 */
//   const setStartDate = prop => {
// 
//     setState({ ...state, startDate: prop.value });
//   };
// 
// 	/**
// 	 *
// 	 * @version 2020/01/08
// 	 *
// 	 */
//   const setEndDate = prop => {
// 
//     setState({ ...state, endDate: prop.value });
//   };
// 
//   const onSearchParams = () => {
// 
// 		const isPresent = location.search.length > 0;
//     if(!isPresent) return;
// 
//     // 最初の1文字 (?記号) を除いた文字列を取得する
//     const query = document.location.search.substring(1);
// 		const parameters = query.split('&');
// 		let value = new Object();
// 		parameters.map((parameter, index) => {
// 
// 			// パラメータ名とパラメータ値に分割する
// 			let element = parameter.split('=');
// 			let paramName = decodeURIComponent(element[0]);
// 			let paramValue = decodeURIComponent(element[1]);
// 
// 			// パラメータ名をキーとして連想配列に追加する
// 			value[paramName] = decodeURIComponent(paramValue);
// 		});
// 
//     return value;
// 	};
// 
// 	/**
// 	 * DatetimePickerから渡ってきた値を振り分けてsetStateする
// 	 * @version 2020/01/08
// 	 * 
// 	 */
// 	const sortingAction = prop => {
// 
// 		switch(prop.action) {
// 		  case 'start_date':
// 				setStartDate(prop);
// 				break;
// 			case 'end_date':
// 				setEndDate(prop);
// 				break;
// 			default:
// 					break;
// 		};
// 	};
// 
//   return (
//     <div className={ 'c-search__work-index u-mt-20' }>
//       <Fragment>
//         <label>フリーワード検索 ※スペース区切り単語2つまで 日付検索は納期で検索されます</label>
//   	    <span className={ 'c-form__required u-ml-10' }>現在{ props.count_number }件表示されています</span>
//       </Fragment>
//       <form method='get' action='/quotes?count='>
//         <div className={ 'u-mt-10 c-flex' }>
//           <input className={ 'c-form-text__work-index' } type='text' name='name' defaultValue={ state.name } placeholder='件名/お客様/自社部署名/納期' />
//           <select name='status' className={ 'u-ml-10 c-form-select__work-index' } value={ state.status } onChange={ e => setState({ ...state, status: e.target.value }) }>
//             <option value=''>ステータス</option>
//             { Object.keys(ENUM_STATUS).map((item, index) =>{
// 
// 							const key = 'status-' + index;
//               return (
//                 <option key={ key } value={ item }>{ ENUM_STATUS[item] }</option>
//               );
//             }) }
//           </select>
// 					<DatetimePicker key={ state.startDate } type={ 'text' } name={ 'date1' } default_datetime={ state.startDate } class={ 'c-form-text__work-index__datepicker u-ml-10' }
// 					                action={ 'start_date' } sortingAction={ sortingAction } index={ true }
// 					/>
//           <Icon name='ei-calendar' size='m'/>
//           <p className={ 'c-search__tilde' }>〜</p>
// 					<DatetimePicker key={ state.endDate } type={ 'text' } name={ 'date2' } default_datetime={ state.endDate } class={ 'c-form-text__work-index__datepicker' }
// 						              action={ 'end_date' } sortingAction={ sortingAction } index={ false }
// 					/>
// 					<Icon name='ei-calendar' size='m'/>
//           <input type='hidden' name='count' value='1'/>
//           <input type='submit' name='commit' value='検索' className={ 'u-ml-10 c-btnMain-standard' }/>
//           <a className={ 'u-va-middle u-ml-10 c-btnMain-primaryA' } href={ '/quotes' } >元に戻す</a>
//         </div>
//       </form>
//     </div>
//   );
// };
// 
// export default QuoteSearch;
