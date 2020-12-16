import React from 'react'
import Style from './style.sass'

/**
 *  モーダル
 *  @version 2018/06/10
 */
export default class Modal extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor(props) {

    super(props);

    // キーバインドイベントを一時保存用
    this.previousKeyDownEvent = null;

    this.state = { show: props.show || false };
  }

  /**
   *  レンダリング成功時
   *  @version 2018/06/10
   */
  componentDidMount() {

    this.bindKeyEvents();
  }

  /**
   *  レンダリング削除時
   *  @version 2018/06/10
   */
  componentWillUnmount() {

    this.unBindKeyEvents();
  }

  /**
   *  モーダルを開く
   *  @version 2018/06/10
   */
  open() {

    this.bindKeyEvents();

    this.setState({ show: true });
  }

  /**
   *  モーダルを閉じる
   *  @version 2018/06/10
   */
  close() {

    this.unBindKeyEvents();

    this.setState({ show: false });
  }

  /**
   *  キーバインドイベントの登録
   *  @version 2018/06/10
   */
  bindKeyEvents() {

    // エンター押下イベント登録
    if (document.onkeydown != ::this._onEnter) {

      this.previousKeyDownEvent = document.onkeydown;
      document.onkeydown = ::this._onEnter;
    }
  }

  /**
   *  キーバインドイベントの削除
   *  @version 2018/06/10
   */
  unBindKeyEvents() {
    
    document.onkeydown = this.previousKeyDownEvent
  }

  /**
   *  親要素のクリックイベントを引き継がない
   *  @version 2018/06/10
   */
  _stopPropagation(event) {

    event.stopPropagation();
  }

  /**
   *  エンター押下時
   *  @version 2018/06/10
   */
  _onEnter(e) {

    if (e.keyCode == 13) this.close();
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render() {

    return (
      <div className={ Style.Modal }>
        { this.state.show ?
          <div className={ Style.Modal__overlay } onClick={ ::this.close }>
            <div className={ Style.Modal__inner } onClick={ this._stopPropagation }>
              { this.props.yield }
              <div className='c-flex c-flex__center'>
                <div onClick={ ::this.close } className={ `c-btnMain ${Style.Modal__button}` }>閉じる</div>
              </div>
              <div onClick={ ::this.close } className={ Style.Modal__closeIcon }>×</div>
            </div>
          </div>
          : null
        }
      </div>
    );
  }
}
