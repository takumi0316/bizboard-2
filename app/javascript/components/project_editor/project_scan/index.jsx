import React      from 'react'
import Style      from '../style.sass'

import {
  POSTING_STATES,
  SCAN_SIZES,
  DRAFT_SPLITS,
  DRAFT_RESTORES,
  SCAN_COLORS,
  BACK_CUTS,
  RESOLUTIONS,
  EXTENSIONS,
  SIZE_MIXES,
  ADFS,
  ODRS,
  BOOKMARKS,
  EDIT_FILENAMES,
} from '../properties.es6'

/**
 *  記事エディター
 *  @version 2018/06/10
 */
export default class ProjectScan extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    this.state = {
      back_cut: props.project_scan.back_cut || 'back_cut_unnecessary',
    };
  }

  /**
   *  詳細情報を取得する
   *  @version 2018/06/10
   */
  getDetail() {

    let result = {
      'project[scan_attributes][print_size]': this.refs.print_size.value,
      'project[scan_attributes][posting_state]': this.refs.posting_state.value,
      'project[scan_attributes][draft_split]': this.refs.draft_split.value,
      'project[scan_attributes][draft_restore]': this.refs.draft_restore.value,
      'project[scan_attributes][back_cut]': this.state.back_cut,
      'project[scan_attributes][color]': this.refs.color.value,
      'project[scan_attributes][resolution]': this.refs.resolution.value,
      'project[scan_attributes][file_extension]': this.refs.file_extension.value,
      'project[scan_attributes][size_mix]': this.refs.size_mix.value,
      'project[scan_attributes][adf]': this.refs.adf.value,
      'project[scan_attributes][odr]': this.refs.odr.value,
      'project[scan_attributes][bookmark]': this.refs.bookmark.value,
      'project[scan_attributes][edit_filename]': this.refs.edit_filename.value,
      'project[scan_attributes][back_cut_note]': '',
    };

    if (this.state.back_cut == 'back_cut_necessary') {
      
      result['project[scan_attributes][back_cut_note]'] = this.refs.back_cut_note.value;
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
                <td className='u-fw-bold'>原稿サイズ</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='print_size' defaultValue={this.props.project_scan.print_size}>
                      { Object.keys(SCAN_SIZES).map((item, index) => {
                        const key = 'print_size-'+index;
                        return (
                          <option {...{key}} value={SCAN_SIZES[item]}>{item}</option>
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
                    <select className='c-form-select' ref='posting_state' defaultValue={this.props.project_scan.posting_state}>
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
              <tr>
                <td className='u-fw-bold'>入稿バラシ</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='draft_split' defaultValue={this.props.project_scan.draft_split}>
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
                    <select className='c-form-select' ref='draft_restore' defaultValue={this.props.project_scan.draft_restore}>
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
              <tr>
                <td className='u-fw-bold'>背表紙裁断</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='back_cut' defaultValue={this.props.project_scan.back_cut} onChange={(e) => this.setState({back_cut: e.target.value})}>
                      { Object.keys(BACK_CUTS).map((item, index) => {
                        const key = 'back_cut-'+index;
                        return (
                          <option {...{key}} value={BACK_CUTS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
              { this.state.back_cut == 'back_cut_necessary' ?
                <tr>
                  <td className='u-fw-bold'>背表紙裁断(備考)</td>
                  <td>
                    <textarea placeholder='背表紙裁断の備考を記述してください' className='c-form-textarea' row={5} autoComplete='off' spellCheck='false' type='text' ref='back_cut_note' defaultValue={this.props.project_scan.back_cut_note}></textarea>
                  </td>
                </tr>
                : null
              }
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
                    <select className='c-form-select' ref='color' defaultValue={this.props.project_scan.color}>
                      { Object.keys(SCAN_COLORS).map((item, index) => {
                        const key = 'color-'+index;
                        return (
                          <option {...{key}} value={SCAN_COLORS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>解像度</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='resolution' defaultValue={this.props.project_scan.resolution}>
                      { Object.keys(RESOLUTIONS).map((item, index) => {
                        const key = 'resolution-'+index;
                        return (
                          <option {...{key}} value={RESOLUTIONS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>ファイル形式</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='file_extension' defaultValue={this.props.project_scan.file_extension}>
                      { Object.keys(EXTENSIONS).map((item, index) => {
                        const key = 'extension-'+index;
                        return (
                          <option {...{key}} value={EXTENSIONS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>サイズ混合具合</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='size_mix' defaultValue={this.props.project_scan.size_mix}>
                      { Object.keys(SIZE_MIXES).map((item, index) => {
                        const key = 'size_mix-'+index;
                        return (
                          <option {...{key}} value={SIZE_MIXES[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>ADF使用可否</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='adf' defaultValue={this.props.project_scan.adf}>
                      { Object.keys(ADFS).map((item, index) => {
                        const key = 'adf-'+index;
                        return (
                          <option {...{key}} value={ADFS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>OCR</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='odr' defaultValue={this.props.project_scan.odr}>
                      { Object.keys(ODRS).map((item, index) => {
                        const key = 'odr-'+index;
                        return (
                          <option {...{key}} value={ODRS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>しおり作成</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='bookmark' defaultValue={this.props.project_scan.bookmark}>
                      { Object.keys(BOOKMARKS).map((item, index) => {
                        const key = 'bookmark-'+index;
                        return (
                          <option {...{key}} value={BOOKMARKS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>ファイル名編集</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='edit_filename' defaultValue={this.props.project_scan.edit_filename}>
                      { Object.keys(EDIT_FILENAMES).map((item, index) => {
                        const key = 'edit_filename-'+index;
                        return (
                          <option {...{key}} value={EDIT_FILENAMES[item]}>{item}</option>
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
