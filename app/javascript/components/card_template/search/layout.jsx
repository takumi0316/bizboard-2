import React, { Fragment, useRef, useState } from 'react';
import Style from './style.sass';

const Layout = props => {
  
  const init = {
    show: false,
    layouts: [],
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
    const url = '/card_layouts.json?name=' + name;
    const request = window.xhrRequest.get(url);
    request.then(res => {
      setState({ ...state, show: true, layouts: res.data.layouts });
    }).catch(error => window.alertable({ icon: 'error', message: error }));
  };
  
  /**
   *  選択時
   *  @version 2018/06/10
   */
  const onSelect = e => {
    
    const layout = state.layouts[e.target.dataset.number];
    props.applyLayout({ ...layout, status: props.status });
    close();
  };
  
  return(
    <Fragment>
      { state.show ?
        <div className={ Style.Search }>
          <div className={ Style.Search__inner }>
            <div>
              <div className={ Style.Search__form }>
                <input type='text' ref={ inputEl } className={ Style.Search__input } placeholder='レイアウト名で検索' onChange={ onChange }/>
                <div onClick={ onChange } className='c-btnMain-standard u-ml-10'>検索</div>
              </div>
              { state.layouts.length > 0 ?
                <ul className={ Style.Search__list }>
                  { state.layouts.map((layout, index) => {
              
                    const key = `layout-${ index }`;
                    return (
                      <li { ...{key} } className={ Style.Search__item }>
                        <h2 className={ Style.Search__itemName } data-number={ index } onClick={ onSelect }>{ layout.name }</h2>
                      </li>
                    );
                  }) }
                </ul>
                : <div className='c-attention u-mt-30'>レイアウトが見つかりませんでした。</div>
              }
            </div>
            <div onClick={ close } className={ Style.Search__closeIcon }>×</div>
          </div>
         </div>
        : <div className='u-mt-10 c-btnMain-standard' onClick={ open }>レイアウト登録</div>
      }
    </Fragment>
  );
};

export default Layout;