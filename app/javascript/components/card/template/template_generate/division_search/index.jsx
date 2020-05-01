import React, { useState } from 'react';
import Style from './style.sass';

/**
 *  @version
 *
 */
const DivisionSearch = props => {

  const init = {
    show: false,
    companies: [],
    body: null
  };

  const [state, setState] = useState(init);

  /**
   *  モーダルを表示する
   *  @version 2018/06/10
   *
   */
  const open = e => {

    e.preventDefault();
    search('');
  };

  /**
   *  モーダルを閉じる
   *  @version 2018/06/10
   *
   */
  const close = () => setState({ ...init });

  /**
   * 検索
   * @version 2020/03/23
   *
   */
  const _onChange = e => {

    if(!e.target.value) {

      setState({ ...state, companies: [] });
      return false;
    };

    search(e.target.value);
  };

  /**
   *  フリーワード検索
   *  @version 2018/06/10
   *
   */
  const search = search => {

    // 記事内容を送信
    const url = '/companies.json?search=' + search;
    const request = window.xhrRequest.get(url);
    request.then(res => {

      if(res.data.status == 'success') setState({ ...state, show: true, companies: res.data.companies });
      if(res.data.status != 'success') window.alertable({ icon: 'error', message: '会社情報が取得出来ませんでした。'});
    }).catch(error => window.alertable({ icon: 'error', message: error }));
  };

  /**
   *  親要素のクリックイベントを引き継がない
   *  @version 2018/06/10
   *
   */
  const stopPropagation = e => e.stopPropagation();

  /**
   *  選択時
   *  @version 2018/06/10
   */
  const _onSelect = e => {

    const comapany = state.companies[e.target.dataset.number];
    props.applyCompany(comapany);
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
            <div>
              <div className={ Style.DivisionSearch__form }>
                <input type='text' className={ Style.DivisionSearch__input } placeholder='会社名で検索' onChange={ e => _onChange(e) }/>
                <div onClick={ e => _onChange(e) } className='c-btnMain-standard u-ml-10'>検索</div>
              </div>
              { state.companies ?
                <ul className={ Style.DivisionSearch__list }>
                  { state.companies.map((company, i) => {
                    const key = `company-${ i }`;
                    return (
                      <li { ...{key} } className={ Style.DivisionSearch__item }>
                        <h2 className={ Style.DivisinoSearch__itemName } data-number={ i }
                            onClick={ e => _onSelect(e) }>{ company ? company.name : '会社名なし' }</h2>
                      </li>
                    );
                  }) }
                </ul>
                : <div className='c-attention u-mt-30'>{ props.not_found }</div>
              }
            </div>
            <div onClick={ e => close(e) } className={ Style.DivisionSearch__closeIcon }>×</div>
          </div>
        </div>
        : <div className='c-btnMain-standard' onClick={ e => open(e) }>{ props.type_name }</div>
      }
    </div>
  );
};

export default DivisionSearch;
