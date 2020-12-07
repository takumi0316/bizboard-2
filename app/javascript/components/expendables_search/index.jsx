import React, { useState, useEffect } from 'react';

// import libraries
import Icon           from 'react-evil-icons';
import DatetimePicker from '../utilities/datetime_picker';

// Ajax
import Request from "superagent";
require("superagent-rails-csrf")(Request);

// enum_status
import { ENUM_STATUS } from './properties.es6';

const ExpendableSearch = props => {

  const date = new Date();
  const year = date.getFullYear();
  const last_month = date.getMonth() - 1;
  const next_month = date.getMonth() + 2;
  const day = date.getDate();

  const init = {
    startDate: new Date(year, last_month, day),
    endDate: new Date(year, next_month, day),
    division: '負担部署',
    subcontractor: '仕入先',
    status: '勘定科目',
    divisions: props.division,
    subcontractors: props.subcontractor,
  };

  const [state, setState] = useState(init);

  useEffect(() => {

    const values = onSearchParams();
    if(!values) return;

    setState({
      ...state,
      name: values['name'],
      startDate: values['date1'],
      endDate: values['date2'],
      division: values['division'],
      subcontractor: values['subcontractor'],
      status: values['status'],
    });
  }, []);

  /**
   *
   * @version 2020/01/08
   *
   */
  const setStartDate = prop => {

    setState({ ...state, startDate: prop.value });
  };

  /**
   *
   * @version 2020/01/08
   *
   */
  const setEndDate = prop => {

    setState({ ...state, endDate: prop.value });
  };

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

  /**
   * DatetimePickerから渡ってきた値を振り分けてsetStateする
   * @version 2020/01/08
   *
   */
  const sortingAction = prop => {

    switch(prop.action) {
      case 'start_date':
        setStartDate(prop);
        break;
      case 'end_date':
        setEndDate(prop);
        break;
      default:
        break;
    };
  };

  return (
    <div className='c-search__work-index u-mt-15'>
      <form method='get' action='/expendables?'>
        <div className='c-flex c-flex-alignItems__center'>
          <select name='division' className='c-form-select__work-index' value={ state.division } onChange={ e => setState({ ...state, division: e.target.value }) }>
            <option value=''>負担部署</option>
            { props.division.map((division, index) => {

              const key = 'division-' + index;
              return(
           	    <option key={ key } value={ division['id'] }>{ division['name'] }</option>
              );
            }) }
          </select>
          <select name='subcontractor' className='u-ml-10 c-form-select__expendable-index' value={ state.subcontractor } onChange={ e => setState({ ...state, subcontractor: e.target.value }) }>
            <option value=''>仕入れ先</option>
            { state.subcontractors.map((subcontractor, index) => {

              const key = 'subcontractor-' + index;
              return(
                <option key={ key } value={ subcontractor['id'] }>{ subcontractor['name'] }</option>
              );
            }) }
          </select>
          <select name='status' className='u-ml-10 c-form-select__work-index' value={ state.status } onChange={ e => setState({ ...state, status: e.target.value }) }>
            <option value=''>勘定科目</option>
            { Object.keys(ENUM_STATUS).map((item, index) =>{

              const key = 'status-' + index;
              return (
                <option key={ key } value={ item }>{ ENUM_STATUS[item] }</option>
              );
            }) }
          </select>
          <Icon name='ei-calendar' size='m'/>
          <DatetimePicker key={ state.startDate } type='text' name='date1' default_datetime={ state.startDate } class='c-form-text__work-index__datepicker' action='start_date' sortingAction={ sortingAction } index={ true }/>
          <p className='c-search__tilde'>〜</p>
          <DatetimePicker key={ state.endDate } type='text' name='date2' default_datetime={ state.endDate } class='c-form-text__work-index__datepicker'
                          action='end_date' sortingAction={ sortingAction } index={ false }/>
          <input type='hidden' name='count' value='1'/>
          <input type='submit' name='commit' value='検索' className='u-ml-10 c-btnMain'/>
          <a className='u-ml-10 c-btnMain' href='/expendables' >元に戻す</a>
        </div>
      </form>
    </div>
  );
};

export default ExpendableSearch;
