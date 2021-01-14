import React from 'react'

/**
 *  @version 2018/06/10
 */
export default class Icon extends React.Component {

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render () {

    const color = this.props.color ? `u-svg-${this.props.color}` : ''
    const size = this.props.size ? `u-svg-${this.props.size}` : ''
    const { action } = this.props

    const handleClick = () => {
      action ? action() : ''
    }

    return (
      <div onClick={ handleClick } data-set={ this.props.index || '' }>
        <svg className={`${color} ${size} ${this.props.className || ''}`}>
          <use xlinkHref={`#application-${this.props.name}`} />
        </svg>
      </div>
    )
  }
}
