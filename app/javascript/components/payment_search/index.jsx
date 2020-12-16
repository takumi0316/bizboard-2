import React, { Fragment, useState, useEffect } from "react"

// import libraries
import Icon           from 'react-evil-icons'
import DatetimePicker from '../utilities/datetime_picker'

// Ajax
import Request from "superagent"
require("superagent-rails-csrf")(Request)

const PaymentSearch = props => {

  const init = {
    begginning: props.begginning,
    end: props.end
  }

  const [state, setState] = useState(init)

  useEffect(() => {

    const values = onSearchParams()
    if(!values) return

    setState({
      begginning: values['begginning'],
      end: values['end'],
    })
  }, [])

  const onSearchParams = () => {

    const isPresent = location.search.length > 0
    if(!isPresent) return

    // 最初の1文字 (?記号) を除いた文字列を取得する
    const query = document.location.search.substring(1)
    const parameters = query.split('&')
    let value = new Object()
    parameters.map((parameter, index) => {

      // パラメータ名とパラメータ値に分割する
      let element = parameter.split('=')
      let paramName = decodeURIComponent(element[0])
      let paramValue = decodeURIComponent(element[1])

      // パラメータ名をキーとして連想配列に追加する
      value[paramName] = decodeURIComponent(paramValue)
    })

    return value
	}

  return (
    <div className='c-search'>
      <Fragment>
        <label>日付検索 ※外注書に登録された時の日付が検索されます</label>
      </Fragment>
      <form method='get' action='/payments'>
        <div className='c-flex c-flex-alignItems__center'>
          <Icon name='ei-calendar' size='m'/>
          <DatetimePicker key={ `${state.begginning}-begginning` } type='text' name='begginning' default_datetime={ state.begginning } class='c-form-text'/>
          <p className='c-search__tilde'>〜</p>
          <DatetimePicker key={ `${state.date}-end` } type='text' name='end' default_datetime={ state.end } class='c-form-text'/>
          <input type='hidden' name='count' value='1'/>
          <div className='u-ml-10'><input type='submit' name='commit' value='検索' className='c-btnMain'/></div>
          <div className='u-ml-10'><a className='c-btnMain' href='/payments'>元に戻す</a></div>
        </div>
      </form>
    </div>
  )
}

export default PaymentSearch
