import React, { Fragment }	from 'react';
import Style								from '../style.sass';

// import components
import CompanyBulk	from '../company_bulk/index.jsx';

// Ajax
import Request from 'superagent';
require('superagent-rails-csrf')(Request);

/**
 *  @version 2018/06/10
 */
export default class ClientSearch extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    // キーバインドイベントを一時保存用
    this.previousKeyDownEvent = null;

    this.state = { show: false, clients: [], body: null, type: false };
  }


  /**
   *  モーダルを表示する
   *  @version 2018/06/10
   */
  _open = (e) => {

		e.preventDefault();
    this._search('');

    this.setState({ show: true });
  };

  /**
   *  モーダルを閉じる
   *  @version 2018/06/10
   */
  _close = (e) => {

		e.preventDefault();
    this.setState({ show: false, show_create_form: false, clients: [] });
  };

  _onChange = (e) => {

    if (this.refs.word.value == '') {

      this.setState({clients: []});
      return false;
    };

    this._search(this.refs.word.value);
  };

  /**
   *  フリーワード検索
   *  @version 2018/06/10
   */
  _search = (search) => {

    // 記事内容を送信
    Request.get('/company_division_clients.json?search=' + search)
      .end((err, res) => {

        if (err) return false;
        this.setState({ clients: res.body.clients });
      });
  };

  /**
   *  日時を適用する
   *  @version 2018/06/10
   */
  _apply = (e) => {

    e.stopPropagation();

    let client = {};

    this.props.apply({ client: client });

    this.setState({ show: false });
  };

  /**
   *  親要素のクリックイベントを引き継がない
   *  @version 2018/06/10
   */
  _stopPropagation = (e) => {

    e.stopPropagation();
  };

  /**
   *  選択時
   *  @version 2018/06/10
   */
  _onSelect = (e) => {

    const client = this.state.clients[e.target.dataset.number];

    this.props.applyClient(client);
    this._close();
  };

	/**
   *  担当者作成を表示
   *  @version 2018/06/10
   */
  _openBulk = () => {

    this.setState({ type: true });
  };

  /**
   * 担当者作成を閉じる
   *
   */
  _closeBulk = (e) => {

		e.preventDefault();
    this.setState({ type: false });
  };

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render () {

		const bool_clients = this.state.clients.length > 0 ? true : false;
    return (
			<Fragment>
				{ this.state.show ?
      		<div className={Style.ClientSearch} onMouseDown={ this._close }>
        		{ this.state.type ? 
							<CompanyBulk 	closeBulk={ this._closeBulk } users={ this.props.users } prefectures={ this.props.prefectures } 
														applyClient={ this.props.applyClient } close={ this._close }
							/> 
							: null 
						}
      			<div className={ Style.ClientSearch__inner } onMouseDown={ e => this._stopPropagation(e) }>
          		<Fragment>
              	<div className={ Style.ClientSearch__form }>
          				<input type='text' className={ Style.ClientSearch__input } placeholder='お客様情報で検索' ref='word' onChange={ e => this._onChange(e) }/>
        					<div onClick={ e => this._onChange(e) } className='c-btnMain-standard u-ml-10'>検索</div>
          				<div onClick={ e => this._openBulk(e) } className='c-btnMain-standard c-btn-blue u-ml-50'>お客様情報を作成する</div>
          			</div>
								{ bool_clients ?
              		<ul className={ Style.ClientSearch__list }>
          					{ this.state.clients.map((client, i) => {
            					const key = `clients-${i}`;
              				return (
                  			<li { ...{key} } className={ Style.ClientSearch__item }>
                    			<h2 className={ Style.ClientSearch__itemName } data-number={ i } onClick={ e => this._onSelect(e) }>
														{ client.company.name || '会社名なし' } { client.division.name || '部署名なし' } { client.name || '担当者なし' } 様
													</h2>
                  			</li>
                			);
                  	}) }
                	</ul>
                	: <div className='c-attention u-mt-30'>お客様情報が見つかりませんでした</div>
            		}
          		</Fragment>
        			<div onClick={ e => this._close(e) } className={ Style.ClientSearch__closeIcon }>×</div>
      			</div>
    			</div>
      		: <div className='c-btnMain-standard' onClick={ e => this._open(e) }>お客様情報を検索</div>
				}
			</Fragment>
  	);
	}
}
