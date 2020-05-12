import React, { useEffect, useState } from 'react';
import Style from './style.sass';

/**
 *  @version
 */
const Search = props => {
  
  const init = {
    show: false,
    cards: { ...props.cards }, 
  };
  
  const [state, setState] = useState(init);
  
  /**
   *  モーダルを表示する
   *  @version 2018/06/10
   */
  const open = e => {
    
    e.preventDefault();

    setState({ ...state, cards: props.cards, show: !state.show });
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
    
    const card = state.cards[e.target.dataset.number];
    props.applyCard(card);
    close();
  };

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  return (
    <div className='u-mt-10'>
      { state.show ?
        <div className={ Style.CardSearch } onMouseDown={ e => close(e) }>
          <div className={ Style.CardSearch__inner } onMouseDown={ e => stopPropagation(e) }>
            { state.cards ?
              <ul className={ Style.CardSearch__list }>
                { state.cards.map((card, i) => {
                  const key = `card-${ i }`;
                  return (
                    <li { ...{key} } className={ Style.CardSearch__item }>
                      <h2 className={ Style.CardSearch__itemName } data-number={ i }
                          onClick={ e => onSelect(e) }>{ card.name || '名刺名なし' }</h2>
                    </li>
                  );
                }) }
              </ul>
              : <div className='c-attention u-mt-30'>{ props.notFound }</div>
            }
            <div onClick={ e => close(e) } className={ Style.CardSearch__closeIcon }>×</div>
          </div>
        </div>
        : <div className='c-btnMain-standard' onClick={ e => open(e) }>{ props.typeName }</div>
      }
    </div>
  );
};

export default Search;