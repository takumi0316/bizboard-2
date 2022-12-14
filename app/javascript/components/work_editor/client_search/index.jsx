import React from 'react'
import Style from './style.sass'
import Icon  from 'react-evil-icons'
import SubcontractorBulk from '../subcontractor_bulk/index.jsx'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

/**
 *  @version
 */
export default class ClientSearch extends React.Component {

  /**
   *  コンストラクタ
   *  @version
   */
  constructor (props) {

    super(props);

    // キーバインドイベントを一時保存用
    this.previousKeyDownEvent = null;

    this.state = { show: false, clients: [], body: null, type: false, companies: [], };
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

  _onChange(e) {

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
    Request.get('/subcontractor_division_clients.json?search=' + search)
      .end((error, response) => {

        if (error) return false;
        this.setState({clients: response.body.clients});
      });
  }

  /**
   *  日時を適用する
   *  @version 2018/06/10
   */
  _apply(e) {

    e.stopPropagation();

    let client = {};

    this.props.apply({ client: client });

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

    const client = this.state.clients[e.target.dataset.number];
    const work_subcontractor_id = this.props.work_subcontractor_id;
    this.props.applyClient(client, work_subcontractor_id);
    this._close();
  }

  /**
   *  担当者作成を表示
   *  @version 2018/06/10
   */
  _openBulk = () => {

    Request.get('/companies.json?search=')
      .end((err, res) => {

      if (err) return false;
      this.setState({companies: res.body.companies, type: true});
    });
    this.setState({ companies: [], type: true });
  }

  /**
   * 担当者作成を閉じる
   *
   */
  _closeBulk = () => {

    this.setState({ type: false });
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render () {

    return (this.state.show ?
      <div className={Style.ClientSearch} onClick={::this._close}>

          { this.state.type ? <SubcontractorBulk closeBulk={ e => this._closeBulk() } users={ this.props.users } prefectures={ this.props.prefectures } applyClient={ ::this.props.applyClient } work_subcontractor_id={ this.props.work_subcontractor_id } close={ e => this._close() } companies={ this.state.companies } /> : null}
        <div className={Style.ClientSearch__inner} onClick={this._stopPropagation}>

          { this.state.body == null ?
            <div>
              <div className={Style.ClientSearch__form}>
                <input type='text' className={Style.ClientSearch__input} placeholder='お客様情報で検索' ref='word' onChange={::this._onChange}/>
                <div onClick={ e => this._onChange()} className='c-btnMain-standard u-ml-10'>検索</div>
                <div onClick={ e => this._openBulk() } className='c-btnMain-standard c-btn-blue u-ml-50'>外注先情報を作成する</div>
              </div>

              { this.state.clients.length > 0 ?

                <ul className={Style.ClientSearch__list}>
                  {this.state.clients.map((client, i) => {
                    var key = `clients-${i}`;
                    return (
                      <li {...{key}} className={Style.ClientSearch__item}>
                        <h2 className={Style.ClientSearch__itemName} data-number={i} onClick={::this._onSelect}>{client.company.name} {client.division.name} {client.name} 様</h2>
                      </li>
                    );
                  })}
                </ul>
                :
                <div className='c-attention u-mt-30'>外注先情報が見つかりませんでした</div>
              }
            </div>
            :
            <div dangerouslySetInnerHTML={{__html : this.state.body}} />
          }
          <div onClick={::this._close} className={Style.ClientSearch__closeIcon}>×</div>
        </div>
      </div>
      :
      <div className='c-btnMain-standard' onClick={::this._open}>外注先情報</div>
    );
  }
}
