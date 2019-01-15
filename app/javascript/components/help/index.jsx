import React from 'react'
import Style from './style.sass'
import Icon  from 'react-evil-icons'

/**
 *  @version 2018/06/10
 */
export default class Help extends React.Component {
  
  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render () {

    return (
      <div className={`u-ml-5 ${Style.Help}`}>
        <Icon name='ei-question' size='s'/>
        <div className={Style.Help__tooltip}>
          { this.props.content }
          { this.props.url ?
            <a href={this.props.url} target='_blank'>詳しくはこちら</a>
            : null
          }
        </div>
      </div>
    );
  }
}
