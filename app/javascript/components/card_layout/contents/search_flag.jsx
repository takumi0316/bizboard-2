import React, { useRef, useState } from 'react'

import Style from './style.sass'

const SearchFlag = props => {
  
  const init = {
    show: false,
    flags: [],
  }
  
  const [state, setState] = useState(init)
  
  const inputEl = useRef(null)
  
  /**
   *  モーダルを表示する
   *  @version 2018/06/10
   *
   */
  const open = () => search('')
  
  /**
   *  モーダルを閉じる
   *  @version 2018/06/10
   *
   */
  const close = () => setState({ ...init })
  
  /**
   * 検索
   * @version 2020/03/23
   *
   */
  const onChange = () => {
    
    const value = inputEl.current.value
    
    if(value) search(value)
    if(!value) setState({ ...state, flags: [] })
  }
  
  /**
   *  フリーワード検索
   *  @version 2018/06/10
   *
   */
  const search = prop => {
    
    // 記事内容を送信
    const url = '/content_flags.json?name=' + prop + '&content_type=&request_action=card_layout'
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
    props.applyFlag(flag)
    close()
  }
  
  /**
   *  表示処理
   *  @version 2018/06/10
   */
  return (
    <div>
      { state.show ?
        <div className={ Style.SearchFlag }>
          <div className={ Style.SearchFlag__inner }>
            <div>
              <div className='c-flex c-flex-alignItems__center'>
                <input type='text' ref={ inputEl } className={ Style.SearchFlag__input } placeholder='フラグ名で検索' onChange={ onChange }/>
                <div className='u-ml-10'><button onClick={ onChange } className='c-btnMain'>検索</button></div>
              </div>
              { state.flags.length > 0 ?
                <ul className={ Style.SearchFlag__list }>
                  { state.flags.map((flag, index) => {
                    const key = `flag-${ index }`
                    return (
                      <li { ...{key} } className={ Style.SearchFlag__item }>
                        <h2 className={ Style.SearchFlag__itemName } data-number={ index } onClick={ onSelect }>{ flag.name }</h2>
                      </li>
                    )
                  }) }
                </ul>
                : <div className='c-attention u-mt-30'>フラグが見つかりませんでした。</div>
              }
            </div>
            <div onClick={ close } className={ Style.SearchFlag__closeIcon }>×</div>
          </div>
        </div>
        : <input className='c-form-text' defaultValue={ props.flag_name } onClick={ open }/>
      }
    </div>
  )
}

export default SearchFlag