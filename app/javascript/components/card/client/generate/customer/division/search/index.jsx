import React, { useState } from 'react';
import Style from './style.sass';

/**
 *  @version
 */
const Search = props => {
  
  const init = {
    show: false,
    divisions: [],
    body: null
  };
  
  const [state, setState] = useState(init);
  
  /**
   *  モーダルを表示する
   *  @version 2018/06/10
   */
  const open = e => {
    
    e.preventDefault();
    search('');
  };
  
  /**
   *  モーダルを閉じる
   *  @version 2018/06/10
   */
  const close = () => {

    setState({ ...init });
  };

  /**
   * 検索
   * @version 2020/03/23
   */
  const onChange = e => {

    if(!e.target.value) {

      setState({ ...state, divisions: [] });
      return false;
    };

    search(e.target.value);
  };

  /**
   *  フリーワード検索
   *  @version 2018/06/10
   */
  const search = search => {

    // 記事内容を送信
    const url = '/company_divisions.json?search=' + search;
    const request = window.xhrRequest.get(url);
    request.then(res => {

      setState({ ...state, show: true, divisions: res.data.divisions });
    }).catch(error => {

      window.alertable({ icon: 'error', message: '会社・部署情報を取得出来ませんでした。' });
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
    
    const division = state.divisions[e.target.dataset.number];
    props.applyDivision(division);
    close();
  };

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  return (
    <div className='u-mt-10'>
      { state.show ?
        <div className={ Style.DivisionSearch } onMouseDown={ e => close(e) }>
          <div className={ Style.DivisionSearch__inner } onMouseDown={ e => stopPropagation(e) }>
            { !state.body ?
              <div>
                <div className={ Style.DivisionSearch__form }>
                  <input type='text' className={ Style.DivisionSearch__input } placeholder='部署名で検索' onChange={ e => onChange(e) }/>
                  <div onClick={ e => onChange(e) } className='c-btnMain-standard u-ml-10'>検索</div>
                </div>
                { state.divisions ?
                  <ul className={ Style.DivisionSearch__list }>
                    { state.divisions.map((division, i) => {
                      const key = `divisions-${ i }`;
                      return (
                        <li { ...{key} } className={ Style.DivisionSearch__item }>
                          <h2 className={ Style.DivisinoSearch__itemName } data-number={ i }
                              onClick={ e => onSelect(e) }>{ division.company ? division.company.name : '会社名なし' } { division ? division.division.name : '部署名なし' }</h2>
                        </li>
                      );
                    }) }
                  </ul>
                  : <div className='c-attention u-mt-30'>{ props.notFound }</div>
                }
              </div>
              : <div dangerouslySetInnerHTML={ {__html:state.body} }/>
            }
            <div onClick={ e => close(e) } className={ Style.DivisionSearch__closeIcon }>×</div>
          </div>
        </div>
        : <div className='c-btnMain-standard' onClick={ e => open(e) }>{ props.typeName }</div>
      }
    </div>
  );
};

export default Search;
