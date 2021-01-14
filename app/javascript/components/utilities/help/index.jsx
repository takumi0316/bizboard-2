import React from 'react'
import Style from './style.sass'
import Icon  from '../../icon'

/**
 *  @version 2018/06/10
 */
const Help = props => {

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  return (
    <div className={`u-ml-5 ${Style.Help}`}>
      <Icon name='question' size='s'/>
      <div className={Style.Help__tooltip}>
        { props.content }
        { props.url ?
          <a href={ props.url } target='_blank'>詳しくはこちら</a>
          : null
        }
      </div>
    </div>
  )
}

export default Help
