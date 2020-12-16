import React, { Fragment, useEffect, useState } from 'react';

// import libraries
import Icon           from 'react-evil-icons';
import DatetimePicker from '../../../utilities/datetime_picker';

const search = props => {

  const action = props.action ? `/api/marunouchi/${props.action}` : '/api/marunouchi';

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = 0;

  const init = {
    sdate: new Date(year, month - 1),
    edate: new Date(year, month, day)
  };

  const [state, setState] = useState(init);

  useEffect(() => {

    const values = onSearchParams();
    if(!values) return;

    setState({
      sdate: values['sdate'],
      edate: values['edate'],
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

  return(
    <div className='c-search__work-index u-mt-20'>
      <Fragment>
        <label>日付検索 ※請求日を元に検索されます</label>
      </Fragment>
      <form method='get' action={ action }>
        <div className='u-mt-10 c-flex'>
        <DatetimePicker key={ `${state.sdate}-start` } type='text' name='sdate' default_datetime={ state.sdate } class='c-form-text__work-index__datepicker u-ml-10'/>
				<Icon name='ei-calendar' size='m'/>
				<p className='c-search__tilde'>〜</p>
        <DatetimePicker key={ `${state.edate}-end` } type='text' name='edate' default_datetime={ state.edate } class='c-form-text__work-index__datepicker u-ml-10'/>
        <Icon name='ei-calendar' size='m'/>
        <input type='hidden' name='count' value='1'/>
        <input type='submit' name='commit' value='検索' className='u-ml-10 c-btnMain'/>
        <a className='u-ml-10 c-btnMain' href={ action }>元に戻す</a>
        </div>
      </form>
    </div>
	);
};

export default search;