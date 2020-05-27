import React, { useEffect, useState } from 'react';
import Style from './style.sass';

/**
 *  @version
 */
const Search = props => {
  
  const init = {
    show: false,
    clients: { ...props.clients }, 
  };
  
  const [state, setState] = useState(init);
  
  /**
   *  モーダルを表示する
   *  @version 2018/06/10
   */
  const open = e => {
    
    e.preventDefault();

    setState({ ...state, clients: props.clients, show: !state.show });
  };
  
  /**
   *  モーダルを閉じる
   *  @version 2018/06/10
   */
  const close = () => setState({ ...init });

  /**
   *  親要素のクリックイベントを引き継がない
   *  @version 2018/06/10
   */
  const stopPropagation = e => e.stopPropagation();

  /**
   *  選択時
   *  @version 2018/06/10
   */
  const onSelect = e => {
    
    const client = state.clients[e.target.dataset.number];
    props.applyClient(client);
    close();
  };

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  return (
    <div className='u-mt-10'>
      { state.show ?
        <div className={ Style.ClientSearch } onMouseDown={ e => close(e) }>
          <div className={ Style.ClientSearch__inner } onMouseDown={ e => stopPropagation(e) }>
            { state.clients ?
              <ul className={ Style.ClientSearch__list }>
                { state.clients.map((client, i) => {
                  const key = `client-${ i }`;
                  return (
                    <li { ...{key} } className={ Style.ClientSearch__item }>
                      <h2 className={ Style.ClientSearch__itemName } data-number={ i }
                          onClick={ e => onSelect(e) }>{ client.name || '担当者名なし' }</h2>
                    </li>
                  );
                }) }
              </ul>
              : <div className='c-attention u-mt-30'>{ props.notFound }</div>
            }
            <div onClick={ e => close(e) } className={ Style.ClientSearch__closeIcon }>×</div>
          </div>
        </div>
        : <div className='c-btnMain-standard' onClick={ e => open(e) }>{ props.typeName }</div>
      }
    </div>
  );
};

export default Search;