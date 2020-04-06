import React from 'react'
import Style from './style.sass'
import Icon  from '../icon'

import InfoIcon from './info_icon'
import SuccessIcon from './success_icon'
import WarningIcon from './warning_icon'
import ErrorIcon from './error_icon'

/**
 *  自動スクロールボタン
 *  @version 2018/06/10
 */
export default class DataModal extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    // キーバインドイベントを一時保存用
    this.previousKeyDownEvent = null;

    const {title, message, type} = props;

    this.state = {
      title: title,
      message: message,
      icon: type,
      confirm: false,
    };
  }

  /**
   *  レンダリング成功時
   *  @version 2018/06/10
   */
  componentDidMount() {

    // グローバルからの呼び出し
    window.alertable = (options) => {

      let args = {};

      // 引数が文字列の場合
      if (typeof options == 'string' || options instanceof String) {

        args['message'] = options;
      } else {

        args = options;
      }

      this.open(args);
    };

    // グローバルからの呼び出し
    window.confirmable = (options) => {

      this.open(Object.assign({ confirm: true }, options));
    };

    // フラッシュメッセージ等
    if (this.state.message) this.open();
  }

  /**
   *  モーダルを開く
   *  @version 2018/06/10
   */
  open = (options={}) => {

    this.bindKeyEvents();

    this.setState(Object.assign({ show: true }, options));
  }

  /**
   *  モーダルを閉じる
   *  @version 2018/06/10
   */
  close = () => {

    const {close_callback} = this.state;

    this.unBindKeyEvents();

    this.setState({ show: false, title: null, message: null, icon: null, callback: null, close_callback: null, confirm: false }, () => {

      if (close_callback) close_callback();
    });
  }

  /**
   *  confirm時の処理の続行
   *  @version 2018/06/10
   */
  do = () => {

    const {callback} = this.state;

    if (callback) callback();
    this.close();
  }

  /**
   *  親要素のクリックイベントを引き継がない
   *  @version 2018/06/10
   */
  _stopPropagation = (event) => {

    event.stopPropagation();
  }

  /**
   *  キーバインドイベントの登録
   *  @version 2018/06/10
   */
  bindKeyEvents = () => {

    // エンター押下イベント登録
    if (document.onkeydown != this._onEnter) {

      this.previousKeyDownEvent = document.onkeydown;
      document.onkeydown = this._onEnter;
    }
  }

  /**
   *  キーバインドイベントの削除
   *  @version 2018/06/10
   */
  unBindKeyEvents = () => {

    document.onkeydown = this.previousKeyDownEvent;
  }

  /**
   *  親要素のクリックイベントを引き継がない
   *  @version 2018/06/10
   */
  _stopPropagation = (event) => {

    event.stopPropagation();
  }

  /**
   *  エンター押下時
   *  @version 2018/06/10
   */
  _onEnter = event => {

    if (event.keyCode == 13) this.close();
    return false
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render() {

    const {show, title, message, icon, confirm} = this.state;

    return (
      <div className={Style.DataModal}>
        { show ?
          <div className={Style.DataModal__overlay} onClick={this.close}>
            <div className={`${Style.DataModal__inner} ${icon ? Style['DataModal__'+icon] : null}`} onClick={this._stopPropagation}>
              { icon && icon == 'info' ? <div className={Style.DataModal__icon}><InfoIcon /></div> : null }
              { icon && icon == 'success' ? <div className={Style.DataModal__icon}><SuccessIcon /></div> : null }
              { icon && icon == 'warning' ? <div className={Style.DataModal__icon}><WarningIcon /></div> : null }
              { icon && icon == 'error' ? <div className={Style.DataModal__icon}><ErrorIcon /></div> : null }
              { title ? <div className={Style.DataModal__title}>{title}</div> : null }
              <div className={Style.DataModal__message} dangerouslySetInnerHTML={{__html: message}}></div>
              { confirm ? <div onClick={this.do} className={`c-btnMain-primaryA ${Style.DataModal__button}`}>続行する</div> : null }
              <div onClick={this.close} className={`c-btnMain-negative ${Style.DataModal__button}`}>閉じる</div>
              <div onClick={this.close} className={Style.DataModal__closeIcon}>
                <Icon name='close' size='l' color='darkGray'/>
              </div>
            </div>
          </div>
          : null
        }
      </div>
    );
  }
}
