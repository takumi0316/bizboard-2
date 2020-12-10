import React, { Fragment, useEffect, useRef, useState } from 'react'
import Style from './style.sass'

const MFLikeModal = props => {

  const prevKeyDownRef = useRef(null)

  //const { show, message, icon } = props

  const init = {
    show: '',
    message: '',
    icon: '',
  }

  const [state, setState] = useState(init)

  useEffect(() => {
    const { show } = props
    if(show) {

      const { icon, message } = props
      setState({ ...state, show: show, icon: icon, message: message })
    }
  }, [])

  useEffect(() => {
    window.mf_like_modal = options => {

      let args = {}
  
      // 引数が文字列の場合
      if (typeof options == 'string' || options instanceof String) {
    
        args['message'] = options
      } else {
    
        args = options
      }
  
      open(args)
    }
  }, [props])

  useEffect(() => {
    if(state.show && state.icon !== 'error') setTimeout(close, 2 * 1000)
    if(!state.show && state.close_callback) state.close_callback()
  }, [state.show])
 
  const open = (options={}) => {

    bindKeyEvents()
    document.activeElement.blur()
    setState({ ...state, ...options, show: true })
  }
  /**
   *  モーダルを閉じる
   *  @version 2018/06/10
   */
  const close = () => {
    
    unBindKeyEvents()
    
    setState({ ...init, close_callback: state.close_callback })
  }

  /**
   *  キーバインドイベントの登録
   *  @version 2018/06/10
   */
  const bindKeyEvents = () => {
    
    // エンター押下イベント登録
    if(document.onkeydown !== _onEnter) {
      
      prevKeyDownRef.current = document.onkeydown
      document.onkeydown = _onEnter
    }
  }
  /**
   *  キーバインドイベントの削除
   *  @version 2018/06/10
   */
  const unBindKeyEvents = () => {
    
    document.onkeydown = prevKeyDownRef.current
  }
  
  /**
   *  親要素のクリックイベントを引き継がない
   *  @version 2018/06/10
   */
  const _stopPropagation = e => e.stopPropagation()
  
  /**
   *  エンター押下時
   *  @version 2018/06/10
   */
  const _onEnter = event => {
    
    if(event.keyCode === 13) close()
    return false
  }

  return(
    <div className={ Style.MFLikeModal }>
      { state.show ?
        <div className={ `${ state.icon === 'error' ? Style['MFLikeModal__overlay-error'] : Style['MFLikeModal__overlay'] }` } onClick={ state.icon === 'error' ? close : null }>
          <div className={ `${ Style.MFLikeModal__inner } ${ state.icon ? Style['MFLikeModal__' + state.icon] : null }` } onClick={ _stopPropagation }>
            <div className={ Style.MFLikeModal__message } dangerouslySetInnerHTML={{ __html: state.message }}/>
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default MFLikeModal