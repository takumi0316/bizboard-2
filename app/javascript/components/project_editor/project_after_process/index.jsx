import React      from 'react'
import Style      from '../style.sass'

import {
  FOLDINGS,
  STAPLERS,
  HOLES,
  CLIPS,
  BINDS,
  BACK_TEXTS,
} from '../properties.es6'

/**
 *  記事エディター
 *  @version 2018/06/10
 */
export default class ProjectAfterProcess extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    this.state = {
      stapler: this.props.project_after_process.stapler || 'no_stapler',
      folding: this.props.project_after_process.folding || 'no_folding',
      clip: this.props.project_after_process.clip || 'clip_unnecessary',
      hole: this.props.project_after_process.hole || 'hole_unnecessary',
      bind: this.props.project_after_process.bind || 'file_unnecessary',
      back_text: this.props.project_after_process.back_text || 'back_text_unnecessary',
    };
  }

  /**
   *  バリデーション
   *  @version 2018/06/10
   */
  validation() {

    let message = [];

    if (this.refs.back_text.value == 'back_text_necessary' && this.refs.back_text_note.value == '') {
      message.push('背文字を入力してください。');
    }

    if ((this.refs.bind.value == 'king_file' || this.refs.bind.value == 'other_file') && this.refs.bind_note.value == '') {
      message.push('ファイル綴じの内容を入力してください。');
    }

    if (this.refs.hole.value == 'hole_other' && this.refs.hole_note.value == '') {
      message.push('穴あけの内容を入力してください。');
    }

    return message;
  }

  /**
   *  詳細情報を取得する
   *  @version 2018/06/10
   */
  getDetail() {

    let result = {
      'project[project_after_process_attributes][folding]': this.refs.folding.value,
      'project[project_after_process_attributes][stapler]': this.refs.stapler.value,
      'project[project_after_process_attributes][hole]': this.state.hole,
      'project[project_after_process_attributes][clip]': this.refs.clip.value,
      'project[project_after_process_attributes][bind]': this.state.bind,
      'project[project_after_process_attributes][back_text]': this.state.back_text,
      'project[project_after_process_attributes][hole_note]': '',
      'project[project_after_process_attributes][bind_note]': '',
      'project[project_after_process_attributes][back_text_note]': '',

      // それぞれの価格(初期値は0円)
      'project[project_after_process_attributes][folding_price]': 0,
      'project[project_after_process_attributes][stapler_price]': 0,
      'project[project_after_process_attributes][hole_price]': 0,
      'project[project_after_process_attributes][clip_price]': 0,
      'project[project_after_process_attributes][bind_price]': 0,
      'project[project_after_process_attributes][back_text_price]': 0,
    };

    if (this.state.folding != 'no_folding') {
      result['project[project_after_process_attributes][folding_price]'] = this.refs.folding_price.value;
    }
    if (this.state.stapler != 'no_stapler') {
      result['project[project_after_process_attributes][stapler_price]'] = this.refs.stapler_price.value;
    }
    if (this.state.hole != 'hole_unnecessary') {
      result['project[project_after_process_attributes][hole_price]'] = this.refs.hole_price.value;
    }
    if (this.state.clip != 'clip_unnecessary') {
      result['project[project_after_process_attributes][clip_price]'] = this.refs.clip_price.value;
    }
    if (this.state.bind != 'file_unnecessary') {
      result['project[project_after_process_attributes][bind_price]'] = this.refs.bind_price.value;
    }
    if (this.state.back_text != 'back_text_unnecessary') {
      result['project[project_after_process_attributes][back_text_price]'] = this.refs.back_text_price.value;
    }

    if (this.state.hole == 'hole_other') {

      result['project[project_after_process_attributes][hole_note]'] = this.refs.hole_note.value;
    }

    if (this.state.bind != 'file_unnecessary') {

      result['project[project_after_process_attributes][bind_note]'] = this.refs.bind_note.value;
    }

    if (this.state.back_text == 'back_text_necessary') {

      result['project[project_after_process_attributes][back_text_note]'] = this.refs.back_text_note.value;
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

        <div className='c-table u-mt-10'>
          <table>
            <tbody>
              <tr>
                <td className='u-fw-bold'>折り</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='folding' value={this.state.folding} onChange={(e) => this.setState({folding: e.target.value})}>
                      { Object.keys(FOLDINGS).map((item, index) => {
                        const key = 'folding-'+index;
                        return (
                          <option {...{key}} value={FOLDINGS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                  { this.state.folding != 'no_folding' ?
                    <div className='u-mt-15'>
                      <input className='c-form-text' ref='folding_price' type='text' defaultValue={this.props.project_after_process.folding_price || 0} />
                    </div>
                    : null
                  }
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>ホチキス留</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='stapler' value={this.state.stapler} onChange={(e) => this.setState({stapler: e.target.value})}>
                      { Object.keys(STAPLERS).map((item, index) => {
                        const key = 'stapler-'+index;
                        return (
                          <option {...{key}} value={STAPLERS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                  { this.state.stapler != 'no_stapler' ?
                    <div className='u-mt-15'>
                      <input className='c-form-text' ref='stapler_price' type='text' defaultValue={this.props.project_after_process.stapler_price || 0} />
                    </div>
                    : null
                  }
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>穴あけ</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='hole' value={this.state.hole} onChange={(e) => this.setState({hole: e.target.value})}>
                      { Object.keys(HOLES).map((item, index) => {
                        const key = 'hole-'+index;
                        return (
                          <option {...{key}} value={HOLES[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                  { this.state.hole == 'hole_other' ?
                    <div className='u-mt-15'>
                      <textarea placeholder='穴あけについての備考を入力してください' className='c-form-textarea' row={5} autoComplete='off' spellCheck='false' type='text' ref='hole_note' defaultValue={this.props.project_after_process.hole_note}></textarea>
                    </div>
                    : null
                  }
                  { this.state.hole != 'hole_unnecessary' ?
                    <div className='u-mt-15'>
                      <input className='c-form-text' ref='hole_price' type='text' defaultValue={this.props.project_after_process.hole_price || 0} />
                    </div>
                    : null
                  }
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>クリップ留</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='clip' value={this.state.clip} onChange={(e) => this.setState({clip: e.target.value})}>
                      { Object.keys(CLIPS).map((item, index) => {
                        const key = 'clip-'+index;
                        return (
                          <option {...{key}} value={CLIPS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                  { this.state.clip != 'clip_unnecessary' ?
                    <div className='u-mt-15'>
                      <input className='c-form-text' ref='clip_price' type='text' defaultValue={this.props.project_after_process.clip_price || 0} />
                    </div>
                    : null
                  }
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>ファイル綴じ</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='bind' value={this.state.bind} onChange={(e) => this.setState({bind: e.target.value})}>
                      { Object.keys(BINDS).map((item, index) => {
                        const key = 'bind-'+index;
                        return (
                          <option {...{key}} value={BINDS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>

                  { this.state.bind == 'king_file' || this.state.bind == 'other_file' || this.state.bind == 'flat_file' ?
                    <div className='u-mt-15'>
                      <textarea placeholder='大きさ等を指定してください' className='c-form-textarea' row={5} autoComplete='off' spellCheck='false' type='text' ref='bind_note' defaultValue={this.props.project_after_process.bind_note}></textarea>
                    </div>
                    : null
                  }

                  { this.state.bind != 'file_unnecessary' ?
                    <div className='u-mt-15'>
                      <input className='c-form-text' ref='bind_price' type='text' defaultValue={this.props.project_after_process.bind_price || 0} />
                    </div>
                    : null
                  }
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>背文字</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='back_text' value={this.state.back_text} onChange={(e) => this.setState({back_text: e.target.value})}>
                      { Object.keys(BACK_TEXTS).map((item, index) => {
                        const key = 'back_text-'+index;
                        return (
                          <option {...{key}} value={BACK_TEXTS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>

                  { this.state.back_text == 'back_text_necessary' ?
                    <div className='u-mt-15'>
                      <textarea placeholder='テキストを入力してください' className='c-form-textarea' row={5} autoComplete='off' spellCheck='false' type='text' ref='back_text_note' defaultValue={this.props.project_after_process.back_text_note}></textarea>
                    </div>
                    : null
                  }

                  { this.state.back_text != 'back_text_unnecessary' ?
                    <div className='u-mt-15'>
                      <input className='c-form-text' ref='back_text_price' type='text' defaultValue={this.props.project_after_process.back_text_price || 0} />
                    </div>
                    : null
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
