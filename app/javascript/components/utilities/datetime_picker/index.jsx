import React   from 'react'
import Style   from './style.sass'
import Dayjs   from 'dayjs'
import Icon    from 'react-evil-icons'

import {
  WEEKS,
  HOURS,
  MINUTES,
} from './properties.es6'

/**
 *  @version 2018/06/10
 */
export default class DatetimePicker extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor(props) {

    super(props)

    this.devise = props.devise || 'pc'

    this.state = {
      show: false,
      current_month: Dayjs(this.props.default_datetime || new Date()),
      current_datetime: Dayjs(this.props.default_datetime || new Date()),
    }
  }

  /**
   *  日時を適用する
   *  @version 2018/06/10
   */
  _apply = e => {

    // e.stopPropagation()

    let datetime = this.state.current_datetime

    if (this.props.show_time) {

      datetime = datetime.set('hour', this.publishedHourRef.value)
      datetime = datetime.set('minute', this.publishedMinuteRef.value)
    } else {

      datetime = datetime.set('hour', 0)
      datetime = datetime.set('minute', 0)
    }

    document.body.style.overflow = 'auto'

    // typeによって処理分け
    if (this.props.type == 'button') {

      this.props.apply({ datetime: datetime })
    } else {

      this.inputRef.value = this.state.current_datetime.format('YYYY-MM-DD')
    }

		this.close()
  }

  /**
   *  日時を適用する
   *  @version 2018/06/10
   */
  _clear = e => {

    //e.stopPropagation()

    document.body.style.overflow = 'auto'

    // typeによって処理分け
    if (this.props.type == 'button') {

      this.props.apply({ datetime: null })
    } else {

      this.inputRef.value = ''
    }

    this.close()
  }

  /**
   *  フォームモーダルを表示する
   *  @version 2018/06/10
   */
  open = position => {

    this.setState({ show: true, position: position }, () => {
      document.body.style.overflow = 'hidden'
    })
  }

  /**
   *  フォームモーダルを閉じる
   *  @version 2018/06/10
   */
  close = () => {

    this.setState({ show: false }, () => {
      document.body.style.overflow = 'auto'
    })

    if(this.props.sortingAction) {

      const send = {
        action: this.props.action,
        value: this.state.current_datetime.format('YYYY-MM-DD'),
        index: this.props.index
      }

      this.props.sortingAction(send)
    }
  }

  /**
   *  前の月
   *  @version 2018/06/10
   */
  _prev = () => {

    this.setState({
      current_month: this.state.current_month.subtract(1, 'month'),
    })
  }

  /**
   *  次の月
   *  @version 2018/06/10
   */
  _next = () => {

    this.setState({
      current_month: this.state.current_month.add(1, 'month'),
    })
  }

  /**
   *  日付を選択する
   *  @version 2018/06/10
   */
  _onChangeDate = e => {

    let current_datetime = this.state.current_datetime
    current_datetime = current_datetime.set('year', this.state.current_month.year())
    current_datetime = current_datetime.set('month', this.state.current_month.month())
    current_datetime = current_datetime.set('date', e.target.innerText)

    this.setState({current_datetime: current_datetime}, () => {

      if (!this.props.show_time) this._apply(e)
    })
	}

	range = (start, end) => {
    return Array.from({length: (end + 1 - start)}, (v, k) => k + start )
	}

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render() {

    const datetime = this.state.current_month
    const start = datetime.startOf('month')
    const end_of_month = datetime.endOf('month').date()
    const current_week = start.day()

    const current_date = this.state.current_datetime.date()
    const is_current_month = this.state.current_month.month() == this.state.current_datetime.month()
    const is_current_year = this.state.current_month.year() == this.state.current_datetime.year()

    return (
      <React.Fragment>
        { this.state.show ?
          <div className={Style[this.devise]}>
            <div className={Style.DatetimePicker} onMouseDown={this.close}>
              <div className={Style.DatetimePicker__body} onMouseDown={ e => { e.stopPropagation() } }>

                <div className={Style.DatetimePicker__header}>
                  { /* 月 */ }
                  <div className={Style.DatetimePicker__year}>{ datetime.year() }年</div>
                  <div className={Style.DatetimePicker__month}>{ datetime.month() + 1 }月</div>

                  <div onClick={this.close} className={Style.DatetimePicker__closeIcon}>
                    <Icon name='ei-close' size='s' color='white'/>
                  </div>
                </div>
                <div className={Style.DatetimePicker__main}>
                  <div onClick={this._prev} className={Style.DatetimePicker__prev}>前の月</div>
                  <div onClick={this._next} className={Style.DatetimePicker__next}>次の月</div>
                  <table className={Style.DatetimePicker__calendar}>
                    <thead>
                      <tr>
                        { /* 曜日 */ }
                        { this.range(0, 6).map(week => {
                          return <th key={`week-${week}`}>{WEEKS[week]}</th>
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      { /* 週ごとのレコード */ }
                      <React.Fragment>
                        <tr>
                          { this.range(0, 6).map(week => {

                            const target_date = week - current_week + 1
                            const is_active = current_date == target_date && is_current_month && is_current_year
                            return ( current_week > week ?
                              <td key={`week-${week}`}></td>
                              :
                              <td key={`week-${week}`}>
                                <div className={`${is_active ? Style.DatetimePicker__active : Style.DatetimePicker__date}`} onClick={this._onChangeDate}>
                                  {target_date}
                                </div>
                              </td>
                            )
                          })}
                        </tr>

                        { /* 日付 */ }
                        { this.range(1, Math.ceil(end_of_month / 7)).map(weeks => {

                          const start_of_date = (weeks * 7) - current_week + 1

                          return (
                            <tr key={`weeks-${start_of_date}`}>
                              { this.range(start_of_date, start_of_date + 6).map(date => {

                                const is_active = current_date == date && is_current_month && is_current_year
                                return ( end_of_month >= date ?
                                  <td key={`date-${date}`}>
                                    <div className={`${is_active ? Style.DatetimePicker__active : Style.DatetimePicker__date}`} onClick={this._onChangeDate}>
                                      {date}
                                    </div>
                                  </td>
                                  :
                                  <td key={`date-${date}`}></td>
                                )
                              })}
                            </tr>
                          )
                        })}
                      </React.Fragment>
                    </tbody>
                  </table>

                  { this.props.show_time ?

                    <div className={Style.DatetimePicker__time}>
                      { /* 時 */ }
                      <div className={Style.DatetimePicker__hours}>
                        <div className='c-form-selectWrap'>
                          <select className='c-form-select' defaultValue={datetime.hour()} ref={ node => this.publishedHourRef = node}>
                            { HOURS.map((hour, index) => {
                              const key = `hour-${index}`
                              return (
                                <option {...{key}} value={hour.value}>{hour.name}</option>
                              )
                            })}
                          </select>
                        </div>
                      </div>

                      <div className={Style.DatetimePicker__label}>時</div>

                      { /* 分 */ }
                      <div className={Style.DatetimePicker__minutes}>
                        <div className='c-form-selectWrap'>
                          <select className='c-form-select' defaultValue={Math.floor(datetime.minute() / 10) * 10} ref={ node => this.publishedMinuteRef = node}>
                            { MINUTES.map((minute, index) => {
                              const key = `minute-${index}`
                              return (
                                <option {...{key}} value={minute.value}>{minute.name}</option>
                              )
                            })}
                          </select>
                        </div>
                      </div>

                      <div className={Style.DatetimePicker__label}>分</div>
                    </div>
                    : null
                  }

                  { this.props.show_time ? <div onClick={this._apply} className='u-mt-30 c-btnMain u-display-block'>適用する</div> : null }
                  <div className='c-flex__center'>
                    <button onClick={this._clear} className='c-btnMain u-display-block'>クリアする</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : null
        }
        { this.props.type == 'button' ?
          <div className='c-btn-main u-display-block' onClick={this.open}>公開日を指定する</div>
          :
          <div className={Style.DatetimePicker__input}>
            <input type='text' className= 'u-ta-center c-form-text' name={ this.props.name } ref={ node => this.inputRef = node} defaultValue={ Dayjs(this.props.default_datetime).format("YYYY-MM-DD")  || '' } onClick={this.open} readOnly={true} placeholder='日付を選択' />
          </div>
        }
      </React.Fragment>
    )
  }
}
