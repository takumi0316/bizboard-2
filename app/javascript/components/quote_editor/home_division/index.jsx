import React from 'react'
import Style from './style.sass'
import Icon  from 'react-evil-icons'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

/**
 *  @version 2018/06/10
 */
export default class HomeDivision extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    // キーバインドイベントを一時保存用
    this.previousKeyDownEvent = null;

    this.state = { show: false, divisions: [], type: false };
  }


  /**
   *  モーダルを表示する
   *  @version 2018/06/10
   */
  _open() {

    this._search('');

    this.setState({ show: true }, () => {

    });
  }

  /**
   *  モーダルを閉じる
   *  @version 2018/06/10
   */
  _close() {

    this.setState({ show: false, clients: [] });
  }

  _onChange() {

    if (this.refs.word.value == '') {

      this.setState({clients: []});
      return false
    }

    this._search(this.refs.word.value);
  }

  /**
   *  フリーワード検索
   *  @version 2018/06/10
   */
  _search(search) {

    // 記事内容を送信
    Request.get('/divisions.json?search=' + search)
      .end((error, response) => {

        if (error) return false;
        this.setState({divisions: response.body.divisions});
      });
  }

  /**
   *  日時を適用する
   *  @version 2018/06/10
   */
  _apply(e) {

    e.stopPropagation();

    let divisions = {};

    this.props.apply({ divisions: divisions });

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
   *  選択時
   *  @version 2018/06/10
   */
  _onSelect(e) {

    const division = this.state.divisions[e.target.dataset.number];

    this.props.applyHomeDivision(division);
    this._close();
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render () {

    return (this.state.show ?
      <div className={Style.ClientSearch} onClick={::this._close}>

        <div className={Style.ClientSearch__inner} onClick={this._stopPropagation}>

          { this.state.body == null ?
            <div>
              { this.state.divisions.length > 0 ?

                <ul className={Style.ClientSearch__list}>
                  {this.state.divisions.map((division, i) => {
                    var key = `clients-${i}`;
                    return (
                      <li {...{key}} className={Style.ClientSearch__item}>
                        <h2 className={Style.ClientSearch__itemName} data-number={i} onClick={::this._onSelect}>{division.name}</h2>
                      </li>
                    );
                  })}
                </ul>
                :
                <div className='c-attention u-mt-30'>作業部署が見つかりませんでした</div>
              }
            </div>
            :
            <div dangerouslySetInnerHTML={{__html : this.state.body}} />
          }
          <div onClick={::this._close} className={Style.ClientSearch__closeIcon}>×</div>
        </div>
      </div>
      :
      <div className='c-btnMain-standard' onClick={::this._open}>作業部署を選択</div>
    );
  }
}
