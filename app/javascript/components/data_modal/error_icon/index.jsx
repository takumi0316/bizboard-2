import React from 'react'
import Style from './style.sass'

/**
 *  @version 2018/06/10
 */
export default class ErrorIcon extends React.Component {

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render () {

    return (
      <div className={Style.ErrorIcon}>
        <div className={Style.ErrorIcon__xmark}>
          <span className={`${Style.ErrorIcon__line} ${Style.ErrorIcon__lineLeft}`}></span>
          <span className={`${Style.ErrorIcon__line} ${Style.ErrorIcon__lineRight}`}></span>
        </div>
      </div>
    );
  }
}
