import React      from 'react'
import Style      from '../style.sass'

import {
  POSTING_STATES,
  DRAFT_SPLITS,
  DRAFT_RESTORES,
  COLORS,
  PRINT_SIZES,
  SURFACES,
  OPEN_TYPES,
} from '../properties.es6'

/**
 *  記事エディター
 *  @version 2018/06/10
 */
export default class ProjectCopy extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    this.state = {
      posting_state: props.project_copy.posting_state || 'stapler',
      surface: props.project_copy.surface || 'original_surface',
      print_size: props.project_copy.print_size || 'original_size',
    };
  }

  /**
   *  詳細情報を取得する
   *  @version 2018/06/10
   */
  getDetail() {

    let result = {
      'project[copy_attributes][posting_state]': this.refs.posting_state.value,
      'project[copy_attributes][posting_state_note]': '',
      'project[copy_attributes][draft_split]': this.refs.draft_split.value,
      'project[copy_attributes][draft_restore]': this.refs.draft_restore.value,
      'project[copy_attributes][color]': this.refs.color.value,
      'project[copy_attributes][print_size]': this.refs.print_size.value,
      'project[copy_attributes][print_size_note]': '',
      'project[copy_attributes][surface]': this.state.surface,
      'project[copy_attributes][open_type]': '',
      'project[copy_attributes][price]': this.refs.price.value,
    };

    if (this.state.surface == 'both_side') {
      result['project[copy_attributes][open_type]'] = this.refs.open_type.value;
    }

    if (this.state.print_size == 'print_size_other') {
      result['project[copy_attributes][print_size_note]'] = this.refs.print_size_note.value;
    }

    if (this.refs.posting_state.value == 'other_state') {
      result['project[copy_attributes][posting_state_note]'] = this.refs.posting_state_note.value;
    }

    return result;
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
                <td className='u-fw-bold'>入稿状態</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='posting_state' defaultValue={this.props.project_copy.posting_state} onChange={(e) => this.setState({posting_state: e.target.value})}>
                      { Object.keys(POSTING_STATES).map((item, index) => {
                        const key = 'posting_state-'+index;
                        return (
                          <option {...{key}} value={POSTING_STATES[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>

                  { this.state.posting_state == 'other_state' ?

                    <textarea placeholder='入稿状態を入力してください' className='c-form-textarea u-mt-10' row={5} autoComplete='off' spellCheck='false' type='text' ref='posting_state_note' defaultValue={this.props.project_copy.posting_state_note}></textarea>
                    : null
                  }
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>入稿バラシ</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='draft_split' defaultValue={this.props.project_copy.draft_split}>
                      { Object.keys(DRAFT_SPLITS).map((item, index) => {
                        const key = 'draft_split-'+index;
                        return (
                          <option {...{key}} value={DRAFT_SPLITS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>入稿もどし</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='draft_restore' defaultValue={this.props.project_copy.draft_restore}>
                      { Object.keys(DRAFT_RESTORES).map((item, index) => {
                        const key = 'draft_restore-'+index;
                        return (
                          <option {...{key}} value={DRAFT_RESTORES[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className={Style.ProjectEditor__heading}>複写仕様</h2>

        <div className='u-mt-30 c-table'>
          <table>
            <tbody>
              <tr>
                <td className='u-fw-bold'>カラー区分</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='color' defaultValue={this.props.project_copy.color}>
                      { Object.keys(COLORS).map((item, index) => {
                        const key = 'color-'+index;
                        return (
                          <option {...{key}} value={COLORS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>

              <tr>
                <td className='u-fw-bold'>サイズ</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='print_size' defaultValue={this.props.project_copy.print_size} onChange={(e) => this.setState({print_size: e.target.value})}>
                      { Object.keys(PRINT_SIZES).map((item, index) => {
                        const key = 'print_size-'+index;
                        return (
                          <option {...{key}} value={PRINT_SIZES[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                  { this.state.print_size == 'print_size_other' ?

                    <textarea placeholder='サイズを入力してください' className='c-form-textarea u-mt-10' row={5} autoComplete='off' spellCheck='false' type='text' ref='print_size_note' defaultValue={this.props.project_copy.print_size_note}></textarea>
                    : null
                  }
                </td>
              </tr>

              <tr>
                <td className='u-fw-bold'>面付け</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='surface' defaultValue={this.props.project_copy.surface} onChange={(e) => this.setState({surface: e.target.value})}>
                      { Object.keys(SURFACES).map((item, index) => {
                        const key = 'surface-'+index;
                        return (
                          <option {...{key}} value={SURFACES[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>

              { this.state.surface == 'both_side' ?
                <tr>
                  <td className='u-fw-bold'>開き (両面の場合)</td>
                  <td>
                    <div className='c-form-selectWrap'>
                      <select className='c-form-select' ref='open_type' defaultValue={this.props.project_copy.open_type}>
                        { Object.keys(OPEN_TYPES).map((item, index) => {
                          const key = 'open_type-'+index;
                          return (
                            <option {...{key}} value={OPEN_TYPES[item]}>{item}</option>
                          );
                        })}
                      </select>
                    </div>
                  </td>
                </tr>
                : null
              }

              <tr>
                <td className='u-fw-bold'>金額</td>
                <td>
                <input className='c-form-text' ref='price' type='text' defaultValue={this.props.project_copy.price || 0} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
