import React      from 'react'
import Style      from '../style.sass'

import {
  CROSS_COLORS,
  WRAP_BACK_TEXTS,
  SECRET_STITCHS,
  SECRET_STITCH_PAPERS,
  RADIO_STITCHS,
  RADIO_CUTS,
} from '../properties.es6'

/**
 *  記事エディター
 *  @version 2018/06/10
 */
export default class ProjectBindingWork extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    this.state = {
      bind_type: props.project_binding_work.bind_type || 'original_bind_type',
    };
  }

  /**
   *  詳細情報を取得する
   *  @version 2018/06/10
   */
  getDetail() {

    let result = {
      'project[project_binding_work_attributes][bind_type]': this.state.bind_type,
      'project[project_binding_work_attributes][cross_front]': '',
      'project[project_binding_work_attributes][cross_back]': '',
      'project[project_binding_work_attributes][cross_color]': '',
      'project[project_binding_work_attributes][wrap_front]': '',
      'project[project_binding_work_attributes][wrap_back_text]': '',
      'project[project_binding_work_attributes][stitching_paper]': '',
      'project[project_binding_work_attributes][secret_stitch]': '',
      'project[project_binding_work_attributes][secret_stitch_paper]': '',
      'project[project_binding_work_attributes][radio_stitch]': '',
      'project[project_binding_work_attributes][radio_cut]': '',
      'project[project_binding_work_attributes][radio_cut_note]': '',
      'project[project_binding_work_attributes][note]': '',
      'project[project_binding_work_attributes][price]': this.refs.price.value,
    };

    if (this.state.bind_type == 'cross_bind_type') {

      result['project[project_binding_work_attributes][cross_front]'] =  this.refs.cross_front.value;
      result['project[project_binding_work_attributes][cross_back]'] =  this.refs.cross_back.value;
      result['project[project_binding_work_attributes][cross_color]'] =  this.refs.cross_color.value;
    }

    if (this.state.bind_type == 'wrap_bind_type') {

      result['project[project_binding_work_attributes][wrap_front]'] =  this.refs.wrap_front.value;
      result['project[project_binding_work_attributes][wrap_back_text]'] =  this.refs.wrap_back_text.value;
    }

    if (this.state.bind_type == 'stitching_bind_type') {

      result['project[project_binding_work_attributes][stitching_paper]'] =  this.refs.stitching_paper.value;
    }

    if (this.state.bind_type == 'secret_bind_type') {

      result['project[project_binding_work_attributes][secret_stitch]'] =  this.refs.secret_stitch.value;
      result['project[project_binding_work_attributes][secret_stitch_paper]'] =  this.refs.secret_stitch_paper.value;
    }

    if (this.state.bind_type == 'radio_bind_type') {

      result['project[project_binding_work_attributes][radio_stitch]'] =  this.refs.radio_stitch.value;
      result['project[project_binding_work_attributes][radio_cut]'] =  this.refs.radio_cut.value;
      result['project[project_binding_work_attributes][radio_cut_note]'] =  this.refs.radio_cut_note.value;
    }

    if (this.state.bind_type == 'other_bind_type') {

      result['project[project_binding_work_attributes][note]'] =  this.refs.note.value;
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
                <td className='u-fw-bold'>製本方法</td>
                <td>
                  <div>
                    <label className='c-form-radioLabel'>
                      <input name='bind_type' type='radio' defaultChecked={this.state.bind_type == 'original_bind_type'} onChange={() => this.setState({bind_type: 'original_bind_type'})} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>原稿通り</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-15'>
                      <input name='bind_type' type='radio' defaultChecked={this.state.bind_type == 'cross_bind_type'} onChange={() => this.setState({bind_type: 'cross_bind_type'})} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>クロス巻き</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-15'>
                      <input name='bind_type' type='radio' defaultChecked={this.state.bind_type == 'wrap_bind_type'} onChange={() => this.setState({bind_type: 'wrap_bind_type'})} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>くるみ</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-15'>
                      <input name='bind_type' type='radio' defaultChecked={this.state.bind_type == 'stitching_bind_type'} onChange={() => this.setState({bind_type: 'stitching_bind_type'})} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>中綴じ</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-15'>
                      <input name='bind_type' type='radio' defaultChecked={this.state.bind_type == 'secret_bind_type'} onChange={() => this.setState({bind_type: 'secret_bind_type'})} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>袋とじ</span>
                    </label>
                  </div>
                  <div className='u-mt-15'>
                    <label className='c-form-radioLabel'>
                      <input name='bind_type' type='radio' defaultChecked={this.state.bind_type == 'radio_bind_type'} onChange={() => this.setState({bind_type: 'radio_bind_type'})} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>無線綴じ</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-15'>
                      <input name='bind_type' type='radio' defaultChecked={this.state.bind_type == 'double_door_bind_type'} onChange={() => this.setState({bind_type: 'double_door_bind_type'})} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>観音</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-15'>
                      <input name='bind_type' type='radio' defaultChecked={this.state.bind_type == 'gold_letter_bind_type'} onChange={() => this.setState({bind_type: 'gold_letter_bind_type'})} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>金文字</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-15'>
                      <input name='bind_type' type='radio' defaultChecked={this.state.bind_type == 'no_bind_type'} onChange={() => this.setState({bind_type: 'no_bind_type'})} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>なし</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-15'>
                      <input name='bind_type' type='radio' defaultChecked={this.state.bind_type == 'other_bind_type'} onChange={() => this.setState({bind_type: 'other_bind_type'})} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>その他</span>
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      { this.state.bind_type == 'cross_bind_type' ?
        <div className='u-mt-30'>
          <h2 className={Style.ProjectEditor__heading}>クロス巻き</h2>
          <div className='u-mt-30 c-table'>
            <table>
              <tbody>
                <tr>
                  <td className='u-fw-bold'>表紙</td>
                  <td>
                    <textarea placeholder='テキストを入力してください' className='c-form-textarea' row={5} autoComplete='off' spellCheck='false' type='text' ref='cross_front' defaultValue={this.props.project_binding_work.cross_front}></textarea>
                  </td>
                </tr>
                <tr>
                  <td className='u-fw-bold'>裏紙</td>
                  <td>
                  <textarea placeholder='テキストを入力してください' className='c-form-textarea' row={5} autoComplete='off' spellCheck='false' type='text' ref='cross_back' defaultValue={this.props.project_binding_work.cross_back}></textarea>
                  </td>
                </tr>
                <tr>
                  <td className='u-fw-bold'>クロス色</td>
                  <td>
                    <div className='c-form-selectWrap'>
                      <select className='c-form-select' ref='cross_color' defaultValue={this.props.project_binding_work.cross_color}>
                        { Object.keys(CROSS_COLORS).map((item, index) => {
                          const key = 'cross_color-'+index;
                          return (
                            <option {...{key}} value={CROSS_COLORS[item]}>{item}</option>
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
        : null 
      }

      { this.state.bind_type == 'wrap_bind_type' ?
        <div className='u-mt-30'>
          <h2 className={Style.ProjectEditor__heading}>くるみ</h2>
          <div className='u-mt-30 c-table'>
            <table>
              <tbody>
                <tr>
                  <td className='u-fw-bold'>表紙</td>
                  <td>
                    <textarea placeholder='テキストを入力してください' className='c-form-textarea' row={5} autoComplete='off' spellCheck='false' type='text' ref='wrap_front' defaultValue={this.props.project_binding_work.wrap_front}></textarea>
                  </td>
                </tr>
                <tr>
                  <td className='u-fw-bold'>背文字</td>
                  <td>
                    <div className='c-form-selectWrap'>
                      <select className='c-form-select' ref='wrap_back_text' defaultValue={this.props.project_binding_work.wrap_back_text}>
                        { Object.keys(WRAP_BACK_TEXTS).map((item, index) => {
                          const key = 'wrap_back_text-'+index;
                          return (
                            <option {...{key}} value={WRAP_BACK_TEXTS[item]}>{item}</option>
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
        : null 
      }

      { this.state.bind_type == 'stitching_bind_type' ?
        <div className='u-mt-30'>
          <h2 className={Style.ProjectEditor__heading}>中綴じ</h2>
          <div className='u-mt-30 c-table'>
            <table>
              <tbody>
                <tr>
                  <td className='u-fw-bold'>用紙</td>
                  <td>
                    <textarea placeholder='テキストを入力してください' className='c-form-textarea' row={5} autoComplete='off' spellCheck='false' type='text' ref='stitching_paper' defaultValue={this.props.project_binding_work.stitching_paper}></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        : null 
      }

      { this.state.bind_type == 'secret_bind_type' ?
        <div className='u-mt-30'>
          <h2 className={Style.ProjectEditor__heading}>袋とじ</h2>
          <div className='u-mt-30 c-table'>
            <table>
              <tbody>
                <tr>
                  <td className='u-fw-bold'>袋とじ</td>
                  <td>
                    <div className='c-form-selectWrap'>
                      <select className='c-form-select' ref='secret_stitch' defaultValue={this.props.project_binding_work.secret_stitch}>
                        { Object.keys(SECRET_STITCHS).map((item, index) => {
                          const key = 'secret_stitch-'+index;
                          return (
                            <option {...{key}} value={SECRET_STITCHS[item]}>{item}</option>
                          );
                        })}
                      </select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='u-fw-bold'>白紙</td>
                  <td>
                    <div className='c-form-selectWrap'>
                      <select className='c-form-select' ref='secret_stitch_paper' defaultValue={this.props.project_binding_work.secret_stitch_paper}>
                        { Object.keys(SECRET_STITCH_PAPERS).map((item, index) => {
                          const key = 'secret_stitch_paper-'+index;
                          return (
                            <option {...{key}} value={SECRET_STITCH_PAPERS[item]}>{item}</option>
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
        : null 
      }

      { this.state.bind_type == 'radio_bind_type' ?
        <div className='u-mt-30'>
          <h2 className={Style.ProjectEditor__heading}>無線綴じ</h2>
          <div className='u-mt-30 c-table'>
            <table>
              <tbody>
                <tr>
                  <td className='u-fw-bold'>綴じ</td>
                  <td>
                    <div className='c-form-selectWrap'>
                      <select className='c-form-select' ref='radio_stitch' defaultValue={this.props.project_binding_work.radio_stitch}>
                        { Object.keys(RADIO_STITCHS).map((item, index) => {
                          const key = 'radio_stitch-'+index;
                          return (
                            <option {...{key}} value={RADIO_STITCHS[item]}>{item}</option>
                          );
                        })}
                      </select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='u-fw-bold'>断裁</td>
                  <td>
                    <div className='c-form-selectWrap'>
                      <select className='c-form-select' ref='radio_cut' defaultValue={this.props.project_binding_work.radio_cut}>
                        { Object.keys(RADIO_CUTS).map((item, index) => {
                          const key = 'radio_cut-'+index;
                          return (
                            <option {...{key}} value={RADIO_CUTS[item]}>{item}</option>
                          );
                        })}
                      </select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='u-fw-bold'>カット</td>
                  <td>
                  <input placeholder='部数を記入してください' className='c-form-text' required='required' autoComplete='off' spellCheck='false' type='text' ref='radio_cut_note' defaultValue={this.props.project_binding_work.radio_cut_note} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        : null 
      }

      { this.state.bind_type == 'other_bind_type' ?
        <div className='u-mt-30'>
          <h2 className={Style.ProjectEditor__heading}>その他</h2>
          <div className='u-mt-30 c-table'>
            <table>
              <tbody>
                <tr>
                  <td className='u-fw-bold'>備考</td>
                  <td>
                    <textarea placeholder='内容を入力してください' className='c-form-textarea' row={5} autoComplete='off' spellCheck='false' type='text' ref='note' defaultValue={this.props.project_binding_work.note}></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        : null
      }

      <div className=''>
        <div className='c-table'>
          <table>
            <tbody>
              <tr>
                <td className='u-fw-bold'>製本仕様代金</td>
                <td>
                <input className='c-form-text' ref='price' type='text' defaultValue={this.props.project_binding_work.price || 0} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </div>
    );
  }
}
