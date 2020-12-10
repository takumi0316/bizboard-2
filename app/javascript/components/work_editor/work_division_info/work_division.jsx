import React, { Fragment }	from 'react';
import Style 								from '../style.sass';

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
  };


  /**
   *  モーダルを表示する
   *  @version 2018/06/10
   */
  _open = () => {

    this._search();

    this.setState({ show: true });
  };

  /**
   *  モーダルを閉じる
   *  @version 2018/06/10
   */
  _close = () => this.setState({ show: false, clients: [] });

  /**
   *  フリーワード検索
   *  @version 2018/06/10
   */
  _search = () => {

    // 記事内容を送信
    const request = window.xhrRequest.get('/divisions.json');
    request.then(res => {
      this.setState({ divisions: res.data.divisions });
    }).catch(err => window.mf_like_modal({ icon: 'error', message: err, close_callback: () => false }));
  };

  /**
   *  親要素のクリックイベントを引き継がない
   *  @version 2018/06/10
   */
  _stopPropagation = (e) => e.stopPropagation();

  /**
   *  選択時
   *  @version 2018/06/10
   */
  _onSelect = e => {

    const division = this.state.divisions[e.target.dataset.number];

    this.props.passedDivision(division);
    this._close();
  };

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render() {

    return (
			<Fragment>
				{ this.state.show ?
      		<div className={ Style.ClientSearch } onClick={ this._close }>
        		<div className={ Style.ClientSearch__inner } onClick={ e => this._stopPropagation(e) }>
            	<div>
              	{ this.state.divisions ?
                	<ul className={ Style.ClientSearch__list }>
                  	{ this.state.divisions.map((division, i) => {
                    	const key = `clients-${i}`;
                    	return (
                      	<li { ...{key} } className={Style.ClientSearch__item}>
													<h2 className={ Style.ClientSearch__itemName } data-number={ i } onClick={ e => this._onSelect(e) }>
														{ division.name }
													</h2>
                      	</li>
                    	);
                  	}) }
                	</ul>
                	:
                	<div className='c-attention u-mt-30'>作業部署が見つかりませんでした</div>
              	}
            	</div>
          	<div onClick={ this._close } className={ Style.ClientSearch__closeIcon }>×</div>
        	</div>
      	</div>
      	: <div style={{ width: '110px' }}>
            <button className='c-btnMain' onClick={ this._open }>作業部署を選択</button>
      	</div>
				}
			</Fragment>
    );
  }
}
