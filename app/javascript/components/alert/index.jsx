import React from 'react'
import Modal from '../utilities/modal'
import Style from './style.sass'

/**
 *  自動スクロールボタン
 *  @version 2018/06/10
 */
const Alert = props => {

  /**
   *  アラートに表示するコンテンツ
   *  @version 2018/06/10
   */
  const content = () => {

    const { alert } = props

    return (
      <div className={ Style.Alert }>
        <div className={ Style.Alert__title }>{ alert.title }</div>
        <div className={ Style.Alert__message } dangerouslySetInnerHTML={{ __html: alert.message }}/>
      </div>
    );
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  return <Modal show={ true } yield={ content() }/>
}

export default Alert
