import React      from 'react'
import Style      from '../style.sass'

import {
  DRAFT_DATAS,
  COLORS,
  CARD_TYPES,
  CARD_WORK_TYPES,
  PAPERS,
  CARD_SURFACES,
  EMBOSSES,
} from '../properties.es6'

/**
 *  記事エディター
 *  @version 2018/06/10
 */
export default class ProjectCard extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    this.state = {
      card_type: props.project_card.card_type || 'template',
    };
  }

  /**
   *  詳細情報を取得する
   *  @version 2018/06/10
   */
  getDetail() {

    let result = {
      'project[project_count]': this.refs.project_count.value,
      'project[card_attributes][draft_data]': this.refs.draft_data.value,
      'project[card_attributes][url]': this.refs.url.value,
      'project[card_attributes][card_type]': this.state.card_type,
      'project[card_attributes][color]': this.refs.color.value,
      'project[card_attributes][paper]': this.refs.paper.value,
      'project[card_attributes][surface]': this.refs.surface.value,
      'project[card_attributes][emboss]': this.refs.emboss.value,
      'project[card_attributes][work_type]': '',
      'project[card_attributes][work_time]': '',
    };

    if (this.state.card_type == 'special') {
      
      result['project[card_attributes][work_type]'] = this.refs.work_type.value;
      result['project[card_attributes][work_time]'] = this.refs.work_time.value;
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
                <td className='u-fw-bold'>箱数</td>
                <td>
                  <input placeholder='2' className='c-form-text' autoComplete='off' spellCheck='false' type='text' ref='project_count' defaultValue={this.props.project.project_count} />
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>入稿データ</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='draft_data' defaultValue={this.props.project_card.draft_data}>
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
                  <input placeholder='URLを入力してください' className='c-form-text' autoComplete='off' spellCheck='false' type='text' ref='url' defaultValue={this.props.project_card.url} />
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>作業項目</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='card_type' defaultValue={this.state.card_type} onChange={(e) => this.setState({card_type: e.target.value})}>
                      { Object.keys(CARD_TYPES).map((item, index) => {
                        const key = 'card_type-'+index;
                        return (
                          <option {...{key}} value={CARD_TYPES[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>

              { this.state.card_type == 'special' ?
                <tr>
                  <td className='u-fw-bold'>作業内容</td>
                  <td>
                    <div className='c-form-selectWrap'>
                      <select className='c-form-select' ref='work_type' defaultValue={this.props.project_card.work_type}>
                        { Object.keys(CARD_WORK_TYPES).map((item, index) => {
                          const key = 'work_type-'+index;
                          return (
                            <option {...{key}} value={CARD_WORK_TYPES[item]}>{item}</option>
                          );
                        })}
                      </select>
                    </div>
                  </td>
                </tr>
                : null
              }
              { this.state.card_type == 'special' ?
                <tr>
                  <td className='u-fw-bold'>想定作業時間</td>
                  <td>
                    <input placeholder='2' className='c-form-text' autoComplete='off' spellCheck='false' type='text' ref='work_time' defaultValue={this.props.project_card.work_time} />
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
                <td className='u-fw-bold'>カラー区分</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='color' defaultValue={this.props.project_card.color}>
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
                <td className='u-fw-bold'>用紙</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='paper' defaultValue={this.props.project_card.paper}>
                      { Object.keys(PAPERS).map((item, index) => {
                        const key = 'paper-'+index;
                        return (
                          <option {...{key}} value={PAPERS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>両面</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='surface' defaultValue={this.props.project_card.surface}>
                      { Object.keys(CARD_SURFACES).map((item, index) => {
                        const key = 'surface-'+index;
                        return (
                          <option {...{key}} value={CARD_SURFACES[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>エンボス</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='emboss' defaultValue={this.props.project_card.emboss}>
                      { Object.keys(EMBOSSES).map((item, index) => {
                        const key = 'emboss-'+index;
                        return (
                          <option {...{key}} value={EMBOSSES[item]}>{item}</option>
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
