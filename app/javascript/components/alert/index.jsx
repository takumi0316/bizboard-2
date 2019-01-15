import React from 'react'
import Modal from '../utilities/modal'
import Style from './style.sass'

/**
 *  自動スクロールボタン
 *  @version 2018/06/10
 */
export default class Alert extends React.Component {

  /**
   *  アラートに表示するコンテンツ
   *  @version 2018/06/10
   */
  content() {

    const { alert } = this.props;

    return (
      <div className={Style.Alert}>
        <div className={Style.Alert__title}>{alert.title}</div>
        <div className={Style.Alert__message} dangerouslySetInnerHTML={{__html: alert.message}}></div>
      </div>
    );
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render() {

    return <Modal show={true} yield={this.content()}/>;
  }
}
