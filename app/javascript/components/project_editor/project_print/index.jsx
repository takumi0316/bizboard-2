import React      from 'react'
import Style      from '../style.sass'

import {
  DRAFT_DATAS,
  WORK_PROCESSES,
  WORK_TYPES,
  PRINT_WORKS,
  COLORS,
  PRINT_SIZES,
  SURFACES,
  OPEN_TYPES,
} from '../properties.es6'

/**
 *  記事エディター
 *  @version 2018/06/10
 */
export default class ProjectPrint extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    this.state = {
      work_process: props.project_print.work_process || 'work_process_unnecessary',
      print_work: props.project_print.print_work || 'print_work_unnecessary',
      surface: props.project_print.surface || 'both_side',
    };
  }

  /**
   *  詳細情報を取得する
   *  @version 2018/06/10
   */
  getDetail() {

    let result = {
      'project[project_count]': this.refs.project_count.value,
      'project[print_attributes][draft_data]': this.refs.draft_data.value,
      'project[print_attributes][url]': this.refs.url.value,
      'project[print_attributes][work_process]': this.state.work_process,
      'project[print_attributes][print_work]': this.state.print_work,
      'project[print_attributes][work_type]': '',
      'project[print_attributes][work_note]': '',
      'project[print_attributes][work_time]': '',
      'project[print_attributes][color]': '',
      'project[print_attributes][print_size]': '',
      'project[print_attributes][surface]': '',
      'project[print_attributes][open_type]': '',
    };

    if (this.state.work_process == 'work_process_necessary') {

      result['project[print_attributes][work_type]'] = this.refs.work_type.value;
      result['project[print_attributes][work_note]'] = this.refs.work_note.value;
      result['project[print_attributes][work_time]'] = this.refs.work_time.value;
    }

    if (this.state.print_work == 'print_work_necessary') {

      result['project[print_attributes][color]'] = this.refs.color.value;
      result['project[print_attributes][print_size]'] = this.refs.print_size.value;
      result['project[print_attributes][surface]'] = this.state.surface;

      if (this.state.surface == 'both_side') {
        result['project[print_attributes][open_type]'] = this.refs.open_type.value;
      }
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
                <td className='u-fw-bold'>部数</td>
                <td>
                  <input placeholder='100' className='c-form-text' autoComplete='off' spellCheck='false' type='text' ref='project_count' defaultValue={this.props.project.project_count} />
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>入稿データ</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='draft_data' defaultValue={this.props.project_print.draft_data}>
                      { Object.keys(DRAFT_DATAS).map((item, index) => {
                        const key = 'draft_data-'+index;
                        return (
                          <option {...{key}} value={DRAFT_DATAS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>データURL</td>
                <td>
                  <input placeholder='URLを入力してください' className='c-form-text' autoComplete='off' spellCheck='false' type='text' ref='url' defaultValue={this.props.project_print.url} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className={Style.ProjectEditor__heading}>データ仕様</h2>

        <div className='u-mt-30 c-table'>
          <table>
            <tbody>
              <tr>
                <td className='u-fw-bold'>データ作成作業</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='work_process' defaultValue={this.state.work_process} onChange={(e) => this.setState({work_process: e.target.value})}>
                      { Object.keys(WORK_PROCESSES).map((item, index) => {
                        const key = 'work_process-'+index;
                        return (
                          <option {...{key}} value={WORK_PROCESSES[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>

              { this.state.work_process == 'work_process_necessary' ?
                <tr>
                  <td className='u-fw-bold'>作業項目</td>
                  <td>
                    <div className='c-form-selectWrap'>
                      <select className='c-form-select' ref='work_type' defaultValue={this.props.project_print.work_type}>
                        { Object.keys(WORK_TYPES).map((item, index) => {
                          const key = 'work_type-'+index;
                          return (
                            <option {...{key}} value={WORK_TYPES[item]}>{item}</option>
                          );
                        })}
                      </select>
                    </div>
                  </td>
                </tr>
                : null
              }
              { this.state.work_process == 'work_process_necessary' ?
                <tr>
                  <td className='u-fw-bold'>作業内容</td>
                  <td>
                    <textarea placeholder='作業内容を入力してください' className='c-form-textarea' row={5} autoComplete='off' spellCheck='false' type='text' ref='work_note' defaultValue={this.props.project_print.work_note}></textarea>
                  </td>
                </tr>
                : null
              }
              { this.state.work_process == 'work_process_necessary' ?
                <tr>
                  <td className='u-fw-bold'>作業想定時間</td>
                  <td>
                    <input placeholder='2' className='c-form-text' autoComplete='off' spellCheck='false' type='text' ref='work_time' defaultValue={this.props.project_print.work_time} />
                  </td>
                </tr>
                : null
              }
            </tbody>
          </table>
        </div>

        <h2 className={Style.ProjectEditor__heading}>プリント仕様</h2>

        <div className='u-mt-30 c-table'>
          <table>
            <tbody>
              <tr>
                <td className='u-fw-bold'>プリント作業</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='print_work' defaultValue={this.state.print_work} onChange={(e) => this.setState({print_work: e.target.value})}>
                      { Object.keys(PRINT_WORKS).map((item, index) => {
                        const key = 'print_work-'+index;
                        return (
                          <option {...{key}} value={PRINT_WORKS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>

              { this.state.print_work == 'print_work_necessary' ?
                <tr>
                  <td className='u-fw-bold'>カラー区分</td>
                  <td>
                    <div className='c-form-selectWrap'>
                      <select className='c-form-select' ref='color' defaultValue={this.props.project_print.color}>
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
                : null
              }

              { this.state.print_work == 'print_work_necessary' ?
                <tr>
                  <td className='u-fw-bold'>サイズ</td>
                  <td>
                    <div className='c-form-selectWrap'>
                      <select className='c-form-select' ref='print_size' defaultValue={this.props.project_print.print_size}>
                        { Object.keys(PRINT_SIZES).map((item, index) => {
                          const key = 'print_size-'+index;
                          return (
                            <option {...{key}} value={PRINT_SIZES[item]}>{item}</option>
                          );
                        })}
                      </select>
                    </div>
                  </td>
                </tr>
                : null
              }
              
              { this.state.print_work == 'print_work_necessary' ?
                <tr>
                  <td className='u-fw-bold'>面付け</td>
                  <td>
                    <div className='c-form-selectWrap'>
                      <select className='c-form-select' ref='surface' defaultValue={this.props.project_print.surface} onChange={(e) => this.setState({surface: e.target.value})}>
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
                : null
              }

              { this.state.print_work == 'print_work_necessary' && this.state.surface == 'both_side' ?
                <tr>
                  <td className='u-fw-bold'>開き (両面の場合)</td>
                  <td>
                    <div className='c-form-selectWrap'>
                      <select className='c-form-select' ref='open_type' defaultValue={this.props.project_print.open_type}>
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
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
