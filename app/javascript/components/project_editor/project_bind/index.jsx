import React      from 'react'
import Style      from '../style.sass'

import {
  POSTING_STATES,
  BIND_SIZES,
} from '../properties.es6'

/**
 *  記事エディター
 *  @version 2018/06/10
 */
export default class ProjectBind extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor(props) {

    super(props);

    this.state = {};
  }

  /**
   *  詳細情報を取得する
   *  @version 2018/06/10
   */
  getDetail() {

    return {
      'project[bind_attributes][print_size]': this.refs.print_size.value,
      'project[bind_attributes][posting_state]': this.refs.posting_state.value,
    };
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render() {

    return (
      <div className={Style.ProjectEditor}>

        <div className='u-mt-30 c-table'>
          <table>
            <tbody>
              <tr>
                <td className='u-fw-bold'>原稿サイズ</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='print_size' defaultValue={this.props.project_bind.print_size}>
                      { Object.keys(BIND_SIZES).map((item, index) => {
                        const key = 'print_size-'+index;
                        return (
                          <option {...{key}} value={BIND_SIZES[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>入稿状態</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='posting_state' defaultValue={this.props.project_bind.posting_state}>
                      { Object.keys(POSTING_STATES).map((item, index) => {
                        const key = 'posting_state-'+index;
                        return (
                          <option {...{key}} value={POSTING_STATES[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
