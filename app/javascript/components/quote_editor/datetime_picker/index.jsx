import React from 'react';
import Style from '../style.sass';
import Icon  from 'react-evil-icons';
import Dayjs from 'dayjs';

import {
  YEARS,
  MONTHS,
  DATES,
  HOURS,
  MINUTES,
} from '../properties.es6';

/**
 *  @version 2018/06/10
 */
export default class DatetimePicker extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    this.state = { show: false };
  }

  /**
   *  モーダルを表示する
   *  @version 2018/06/10
   */
  _open() {

    this.setState({ show: true }, () => {

      const defaultDatetime = this.props.defaultDatetime || new Date();

      const datetime = Dayjs(defaultDatetime);
      this.refs.published_year.value = datetime.year();
      this.refs.published_month.value = datetime.month() + 1;
      this.refs.published_date.value = datetime.date();
      this.refs.published_hour.value = datetime.hour();
      this.refs.published_minute.value = Math.floor(datetime.minute() / 10) * 10;
    });
  }

  /**
   *  モーダルを閉じる
   *  @version 2018/06/10
   */
  _close() {

    this.setState({ show: false });
  }

  /**
   *  日時を適用する
   *  @version 2018/06/10
   */
  _apply(e) {

    e.stopPropagation();

    const year = this.refs.published_year.value;
    const month = this.refs.published_month.value;
    const date = this.refs.published_date.value;
    const hour = this.refs.published_hour.value;
    const minute = this.refs.published_minute.value;

    const datetime = `${year}-${month}-${date} ${hour}:${minute}:00`;

    this.props.apply({
      datetime: datetime,
      year: year,
      month: month,
      date: date,
      hour: hour,
      minute: minute,
    });

    this.setState({ show: false });
  }

  /**
   *  親要素のクリックイベントを引き継がない
   *  @version 2018/06/10
   */
  _stopPropagation(event) {

    event.stopPropagation();
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render () {

    return (this.state.show ?
      <div className={Style.DatetimePicker} onMouseDown={::this._close}>

        <div className={Style.DatetimePicker__inner} onMouseDown={this._stopPropagation}>

          { /* 年 */ }
          <div className={Style.DatetimePicker__year}>
            <div className='c-form-selectWrap'>
              <select className='c-form-select' ref='published_year'>
                { YEARS.map((year, index) => {
                  const key = `year-${index}`;
                  return (
                    <option {...{key}} value={year.value}>{year.name}</option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={Style.DatetimePicker__label}>年</div>

          { /* 月 */ }
          <div className={Style.DatetimePicker__month}>
            <div className='c-form-selectWrap'>
              <select className='c-form-select' ref='published_month'>
                { MONTHS.map((month, index) => {
                  const key = `month-${index}`;
                  return (
                    <option {...{key}} value={month.value + 1}>{month.name}</option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={Style.DatetimePicker__label}>月</div>

          { /* 日 */ }
          <div className={Style.DatetimePicker__date}>
            <div className='c-form-selectWrap'>
              <select className='c-form-select' ref='published_date'>
                { DATES.map((date, index) => {
                  const key = `date-${index}`;
                  return (
                    <option {...{key}} value={date.value}>{date.name}</option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={Style.DatetimePicker__label}>日</div>

          { /* 時 */ }
          <div className={Style.DatetimePicker__hour}>
            <div className='c-form-selectWrap'>
              <select className='c-form-select' ref='published_hour'>
                { HOURS.map((hour, index) => {
                  const key = `hour-${index}`;
                  return (
                    <option {...{key}} value={hour.value}>{hour.name}</option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={Style.DatetimePicker__label}>時</div>

          { /* 分 */ }
          <div className={Style.DatetimePicker__minute}>
            <div className='c-form-selectWrap'>
              <select className='c-form-select' ref='published_minute'>
                { MINUTES.map((minute, index) => {
                  const key = `minute-${index}`;
                  return (
                    <option {...{key}} value={minute.value}>{minute.name}</option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={Style.DatetimePicker__label}>分</div>

          <div className='u-mt-30 u-ta-right'>
            <div onClick={::this._apply} className='c-btnMain'>適用する</div>
          </div>

          <div className={Style.DatetimePicker__close} onClick={::this._close}>
            <Icon name='ei-close' size='m'/>
          </div>
        </div>
      </div>
      :
      <div className='c-btnMain' onClick={::this._open}>日時を指定する</div>
    );
  }
}
