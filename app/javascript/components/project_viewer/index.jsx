import React      from 'react'
import Style      from './style.sass'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

// datetime
import Dayjs from 'dayjs'

import { } from './properties.es6'

/**
 *  記事エディター
 *  @version 2018/06/10
 */
export default class ProjectViewer extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    this.state = {
      show: false,
      body: null,
    };
  }

  /**
   *  検索モーダルを表示する
   *  @version 2018/06/10
   */
  _open() {

    this.setState({ show: true }, ::this.show);
  }

  /**
   *  画像の検索
   *  @version 2018/06/10
   */
  show() {

    Request.get(`/projects/${this.props.project.id}`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .end((error, response) => {

        this.setState({body: response.text});
      });

  }

  /**
   *  検索モーダルを閉じる
   *  @version 2018/06/10
   */
  _close() {

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
  render() {

    return ( this.state.show ?
      <div className={Style.ProjectViewer} onClick={::this._close}>
        <div className={Style.ProjectViewer__body} onClick={this._stopPropagation} dangerouslySetInnerHTML={{__html : this.state.body}}>
        </div>
      </div>
      :
      <div className='c-btnMain' onClick={::this._open}>詳細を確認</div>
    );
  }
}
