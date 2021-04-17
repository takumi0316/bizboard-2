import React, { Fragment, useRef, useState } from 'react';
import Style from './style.sass'

const FlagSearch = props => {
  
  const init = {
    show: false,
    flags: [],
  };
  
  const [state, setState] = useState(init);
  
  const inputEl = useRef(null);
  
  /**
   *  モーダルを表示する
   *  @version 2018/06/10
   *
   */
  const open = e => {

    e.preventDefault()
    search('')
  }
  
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
    if(!value) setState({ ...state, flags: [] });
  };
  
  /**
   *  フリーワード検索
   *  @version 2018/06/10
   *
   */
  const search = name => {
    
    // 記事内容を送信
    const url = '/content_flags.json?name=' + name + '&content_type=image'
    const request = window.xhrRequest.get(url)
    request.then(res => {
      setState({ ...state, show: true, flags: res.data.flags })
    }).catch(error => window.mf_like_modal({ icon: 'error', message: error }))
  }
  
  /**
   *  選択時
   *  @version 2018/06/10
   */
  const onSelect = e => {
    
    const flag = state.flags[e.target.dataset.number]
    props.applyFlag({ ...flag, status: props.status })
    close()
  }
  
  return(
    <Fragment>
      { state.show ?
        <div className={ Style.Search }>
          <div className={ Style.Search__inner }>
            <div>
              <div className='c-flex c-flex-alignItems__center'>
                <div className='c-search__item'>
                  <input type='text' ref={ inputEl } className={ Style.Search__input } placeholder='フラグ名で検索' onChange={ onChange }/>
                </div>
                <div onClick={ onChange } className='c-btnMain u-ml-10'>検索</div>
              </div>
              { state.flags.length > 0 ?
                <ul className={ Style.Search__list }>
                  { state.flags.map((flag, index) => {
                    const key = `flag-${ index }`;
                    return (
                      <li { ...{key} } className={ Style.Search__item }>
                        <h2 className={ Style.Search__itemName } data-number={ index } onClick={ onSelect }>{ flag.name }</h2>
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
        : <div className='u-mt-10'><button className='c-btnMain c-btn-blue' onClick={ open }>フラグ登録</button></div>
      }
    </Fragment>
  );
}

export default FlagSearch