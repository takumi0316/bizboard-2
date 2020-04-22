import React, { Fragment, useState } from 'react';
import Style                         from './style.sass';

// Ajax
import Request from 'superagent';
require('superagent-rails-csrf')(Request);

/**
 *  @version
 */
const ClientSearch = props => {

  const init = {
    show: false,
    clients: [],
    body: null,
  };

  const [state, setState] = useState(init);

  /**
   *  モーダルを表示する
   *  @version 2018/06/10
   */
  const open = e => {

    e.preventDefault();
    const clients = search('');

    setState({ ...state, show: true, clients: clients });
  };

  /**
   *  モーダルを閉じる
   *  @version 2018/06/10
   */
  const close = () => {

    setState({ ...init });
  };

  const onChange = e => {

    if(e.target.value == '') {

      setState({ ...state, clients: []});
      return false
    };

    search(e.target.value);
  };

  /**
   *  フリーワード検索
   *  @version 2018/06/10
   */
  const search = search => {

		// 記事内容を送信
		const url = props.path + search;
    Request.get(url)
      .end((error, res) => {

        if(error) return false;
        setState({ ...state, show: true, clients: res.body.clients });
      });
  };

  /**
   *  親要素のクリックイベントを引き継がない
   *  @version 2018/06/10
   */
  const stopPropagation = e => {

    e.stopPropagation();
  };

  /**
   *  選択時
   *  @version 2018/06/10
   */
  const onSelect = e => {

    const client = state.clients[e.target.dataset.number];
    props.applyClient(client, props.index);
    close();
  };

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  return (
    <Fragment>
      { state.show ?
        <div className={ Style.ClientSearch } onMouseDown={ e => close(e) }>
          <div className={ Style.ClientSearch__inner } onMouseDown={ e => stopPropagation(e) }>
            { state.body == null ?
              <div>
                <div className={ Style.ClientSearch__form} >
                  <input type='text' className={ Style.ClientSearch__input } placeholder='お客様情報で検索' onChange={ e => onChange(e) }/>
                  <div onClick={ e => onChange(e)} className='c-btnMain-standard u-ml-10'>検索</div>
                </div>
                { state.clients ?
                  <ul className={ Style.ClientSearch__list }>
                    { state.clients.map((client, i) => {
                      const key = `clients-${i}`;
                      return (
                        <li { ...{key} } className={ Style.ClientSearch__item }>
                          <h2 className={ Style.ClientSearch__itemName } data-number={ i } onClick={ e => onSelect(e) }>{ client.company ? client.company.name : '会社名なし' } { client.division ? client.division.name : '部署名なし' } { client ? client.name : '担当者なし' } 様</h2>
                        </li>
                      );
                    })}
                  </ul>
                  : <div className='c-attention u-mt-30'>{ props.notFound }</div>
                }
              </div>
              : <div dangerouslySetInnerHTML={ { __html : state.body } }/>
            }
            <div onClick={ e => close(e) } className={ Style.ClientSearch__closeIcon }>×</div>
          </div>
        </div>
        : <div className='c-btnMain-standard' onClick={ e => open(e) }>{ props.typeName }</div>
      }
    </Fragment>
  );
};

export default ClientSearch;
