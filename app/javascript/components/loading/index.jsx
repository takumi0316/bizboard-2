import React   from 'react'
import Style   from './style.sass'

/**
 *  @version 2018/06/10
 */
export default class Loading extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    this.state = {
      loading: false,
    }
  }

  /**
   *  ローディング開始
   *  @version 2018/06/10
   */
  start = () => {

    this.setState({loading: true});
  }

  /**
   *  ローディング終了
   *  @version 2018/06/10
   */
  finish = () => {

    this.setState({loading: false});
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render() {

    return (this.state.loading ?
      <div className={Style.Loading} onMouseDown={e => { e.stopPropagation() }} onClick={e => { e.stopPropagation() }}>
        {this.props.message || 'Loading'}
      </div>
      : null
    );
  }
}
