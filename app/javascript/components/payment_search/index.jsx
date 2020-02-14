import React, { Fragment, useState, useEffect } from "react";

// import libraries
import Icon           from 'react-evil-icons';
import DatetimePicker from '../utilities/datetime_picker';

// Ajax
import Request from "superagent";
require("superagent-rails-csrf")(Request);

const PaymentSearch = props => {

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
	const day = date.getDate();

  const init = {
   date: new Date(year, month, day),
	};

	const [state, setState] = useState(init);

	useEffect(() => {

		const values = onSearchParams();
		if(!values) return;

		setState({
			date: values['date'],
		});
	}, []);

  const onSearchParams = () => {

		const isPresent = location.search.length > 0;
    if(!isPresent) return;

    // 最初の1文字 (?記号) を除いた文字列を取得する
    const query = document.location.search.substring(1);
		const parameters = query.split('&');
		let value = new Object();
		parameters.map((parameter, index) => {

			// パラメータ名とパラメータ値に分割する
			let element = parameter.split('=');
			let paramName = decodeURIComponent(element[0]);
			let paramValue = decodeURIComponent(element[1]);

			// パラメータ名をキーとして連想配列に追加する
			value[paramName] = decodeURIComponent(paramValue);
		});

    return value;
	};

  return (
    <div className={ 'c-search__work-index u-mt-20' }>
      <Fragment>
        <label>日付検索 ※外注書に登録された時の日付が検索されます</label>
      </Fragment>
      <form method='get' action='/payments'>
        <div className={ 'u-mt-10 c-flex' }>
        <DatetimePicker key={ state.date } type={ 'text' } name={ 'date' } default_datetime={ state.date } class={ 'c-form-text__work-index__datepicker u-ml-10' }/>
        <Icon name='ei-calendar' size='m'/>
        <input type='hidden' name='count' value='1'/>
        <input type='submit' name='commit' value='検索' className={ 'u-ml-10 c-btnMain-standard' }/>
        <a className={ 'u-va-middle u-ml-10 c-btnMain-primaryA' } href={ '/payments' } >元に戻す</a>
        </div>
      </form>
    </div>
  );
};

export default PaymentSearch;
