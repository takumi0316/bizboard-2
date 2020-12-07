import React, { Fragment, useState, useEffect } from "react"

// import libraries
import Icon           from 'react-evil-icons'
import DatetimePicker from '../utilities/datetime_picker'

// Ajax
import Request from "superagent"
require("superagent-rails-csrf")(Request)

const ProfitSearch = props => {

  const date = new Date()
  const year = date.getFullYear()
  const last_month = date.getMonth() - 1
  const next_month = date.getMonth() + 2
	const day = date.getDate()

  const init = {
    startDate: new Date(year, last_month, day),
    endDate: new Date(year, next_month, day),
	}

	const [state, setState] = useState(init)

	useEffect(() => {

		const values = onSearchParams()
		if(!values) return

		setState({
			...state,
			startDate: values['date1'],
			endDate: values['date2']
		})
	}, [])

	/**
	 *
	 * @version 2020/01/08
	 *
	 */
  const setStartDate = prop => {

    setState({ ...state, startDate: prop.value })
  }

	/**
	 *
	 * @version 2020/01/08
	 *
	 */
  const setEndDate = prop => {

    setState({ ...state, endDate: prop.value })
  }

  const onSearchParams = () => {

		const isPresent = location.search.length > 0
    if(!isPresent) return

    // 最初の1文字 (?記号) を除いた文字列を取得する
    const query = document.location.search.substring(1)
		const parameters = query.split('&')
		let value = new Object()
		parameters.map((parameter) => {

			// パラメータ名とパラメータ値に分割する
			let element = parameter.split('=')
			let paramName = decodeURIComponent(element[0])
			let paramValue = decodeURIComponent(element[1])

			// パラメータ名をキーとして連想配列に追加する
			value[paramName] = decodeURIComponent(paramValue)
		})

    return value
	}

	/**
	 * DatetimePickerから渡ってきた値を振り分けてsetStateする
	 * @version 2020/01/08
	 *
	 */
	const sortingAction = prop => {

		switch(prop.action) {
		  case 'start_date':
				setStartDate(prop)
				break
			case 'end_date':
				setEndDate(prop)
				break
			default:
				break
		}
	}

  return (
    <div className='c-search__work-index u-mt-20'>
      <Fragment>
				<label>日付検索 ※外注書に登録された時の日付が検索されます</label>
      </Fragment>
      <form method='get' action='/profits?'>
        <div className='u-mt-10 c-flex c-flex-alignItems__center'>
					<Icon name='ei-calendar' size='m'/>
					<DatetimePicker key={ state.startDate } type='text' name='date1' default_datetime={ state.startDate } class='c-form-text__work-index__datepicker'
					                action='start_date' sortingAction={ sortingAction } index={ true }
					/>
          <p className='c-search__tilde'>〜</p>
					<DatetimePicker key={ state.endDate } type='text' name='date2' default_datetime={ state.endDate } class='c-form-text__work-index__datepicker'
						              action={ 'end_date' } sortingAction={ sortingAction } index={ false }
					/>
          <input type='hidden' name='count' value='1'/>
          <input type='submit' name='commit' value='検索' className='u-ml-10 c-btnMain'/>
					<a className='u-ml-10 c-btnMain' href='/profits'>元に戻す</a>
        </div>
      </form>
    </div>
  )
}

export default ProfitSearch
