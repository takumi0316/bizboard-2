import React, { useRef, useState } from 'react';

import Style from './style.sass';

const Company = props => {
  
  const init = {
    show: false,
    companies: [],
  };
  
  const [state, setState] = useState(init);
  
  const inputEl = useRef(null);
  
  /**
   *  モーダルを表示する
   *  @version 2018/06/10
   *
   */
  const open = () => search('');
  
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
  const onChange = () => {
    
    const value = inputEl.current.value;
    
    if(value) search(value);
    if(!value) setState({ ...state, companies: [] });
  };
  
  /**
   *  フリーワード検索
   *  @version 2018/06/10
   *
   */
  const search = name => {
    
    // 記事内容を送信
    const url = '/companies.json?name=' + name;
    const request = window.xhrRequest.get(url);
    request.then(res => {
      setState({ ...state, show: true, companies: res.data.companies });
    }).catch(error => window.mf_like_modal({ icon: 'error', message: error }));
  };
  
  /**
   *  選択時
   *  @version 2018/06/10
   */
  const onSelect = e => {
    
    const company = state.companies[e.target.dataset.number];
    props.applyCompany(company);
    close();
  };
  
  /**
   *  表示処理
   *  @version 2018/06/10
   */
  return (
    <div>
      { state.show ?
        <div className={ Style.Search }>
          <div className={ Style.Search__inner }>
            <div>
              <div className={ Style.Search__form }>
                <input type='text' ref={ inputEl } className={ Style.Search__input } placeholder='フラグ名で検索' onChange={ onChange }/>
                <div onClick={ onChange } className='c-btnMain u-ml-10'>検索</div>
              </div>
              { state.companies.length > 0 ?
                <ul className={ Style.Search__list }>
                  { state.companies.map((company, index) => {
                    
                    const key = `company-${ index }`;
                    return (
                      <li { ...{key} } className={ Style.Search__item }>
                        <h2 className={ Style.Search__itemName } data-number={ index } onClick={ onSelect }>{ company.name || '' }</h2>
                      </li>
                    );
                  }) }
                </ul>
                : <div className='c-attention u-mt-30'>取引先が見つかりませんでした。</div>
              }
            </div>
            <div onClick={ close } className={ Style.Search__closeIcon }>×</div>
          </div>
        </div>
        : <button className='u-mt-10 c-btnMain' onClick={ open }>会社情報を検索</button>
      }
    </div>
  );
};

export default Company;