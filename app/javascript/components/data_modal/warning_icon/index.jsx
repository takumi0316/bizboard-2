import React from 'react'
import Style from './style.sass'

/**
 *  @version 2018/06/10
 */
export default class WarningIcon extends React.Component {

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render () {

    return (
      <div className={Style.WarningIcon}>
        <span className={Style.WarningIcon__body}>
          <span className={Style.WarningIcon__dot}></span>
        </span>
      </div>
    );
  }
}
