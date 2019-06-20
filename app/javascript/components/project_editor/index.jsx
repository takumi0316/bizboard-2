import React      from 'react'
import Style      from './style.sass'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

import ProjectCopy from './project_copy'
import ProjectPrint from './project_print'
import ProjectBind from './project_bind'
import ProjectCard from './project_card'
import ProjectScan from './project_scan'
import ProjectAfterProcess from './project_after_process'
import ProjectBindingWork from './project_binding_work'

import {
  PROJECT_NAMES,
  BINDING_WORKS,
  AFTER_PROCESSES,
} from './properties.es6'

/**
 *  記事エディター
 *  @version 2018/06/10
 */
export default class ProjectEditor extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    this.state = {
      company: props.company,
      division: props.division,
      client: props.client,
      price: props.project.price || 0,
      project_category: props.project.project_category || 'project_print',
      after_process: props.project.after_process || 'after_process_unnecessary',
      binding_work: props.project.binding_work || 'binding_works_unnecessary',
    }
  }

  /**
   *  バリデーション
   *  @version 2018/06/10
   */
  validation() {

    let message = [];

    if (this.refs.name.value == '') {
      message.push('品目名を入力してください。');
    }

    return message;
  }

  /**
   *  登録処理
   *  @version 2018/06/10
   */
  onSubmit() {

    let messages = this.validation();

    // 新規登録時、更新時とでmethodを分ける
    const request = this.props.project.id ? Request.put(this.props.action) : Request.post(this.props.action);

    // 品目価格
    let price = 0;

    let field = {
      'project[company_division_client_id]': this.refs.company_division_client_id.value,
      'project[name]': this.refs.name.value,
      'project[price]': this.refs.price.value,
      'project[project_category]': this.state.project_category,
      'project[after_process]': this.state.after_process,
      'project[binding_work]': this.state.binding_work,
    };

    // プリント案件
    if (this.state.project_category == 'project_print') {

      field = Object.assign(field, this.refs.project_print.getDetail());

      price += Number(field['project[print_attributes][work_price]']);
      price += Number(field['project[print_attributes][price]']);

    // 名刺案件
    } else if (this.state.project_category == 'project_card') {

      field['project[after_process]'] = 'after_process_unnecessary';
      field['project[binding_work]'] = 'binding_works_unnecessary';

      field = Object.assign(field, this.refs.project_card.getDetail());

      price += Number(field['project[card_attributes][work_price]']);
      price += Number(field['project[card_attributes][price]']);

    // コピー案件
    } else if (this.state.project_category == 'project_copy') {

      field = Object.assign(field, this.refs.project_copy.getDetail());

      price += Number(field['project[copy_attributes][price]']);

    // 製本のみ案件
    } else if (this.state.project_category == 'project_bind') {

      field = Object.assign(field, this.refs.project_bind.getDetail());

    // スキャン案件
    } else if (this.state.project_category == 'project_scan') {

      field['project[after_process]'] = 'after_process_unnecessary';
      field['project[binding_work]'] = 'binding_works_unnecessary';

      field = Object.assign(field, this.refs.project_scan.getDetail());

      price += Number(field['project[scan_attributes][price]']);

    // その他
    } else if (this.state.project_category == 'project_other') {

      field['project[after_process]'] = 'after_process_unnecessary';
      field['project[binding_work]'] = 'binding_works_unnecessary';
      field['project[note]'] = this.refs.note.value;

      price += Number(this.refs.other_price.value);
    }

    // 後加工
    if (field['project[after_process]'] == 'after_process_necessary') {

      messages = messages.concat(this.refs.project_after_process.validation());
      field = Object.assign(field, this.refs.project_after_process.getDetail());

      price += Number(field['project[project_after_process_attributes][folding_price]']);
      price += Number(field['project[project_after_process_attributes][stapler_price]']);
      price += Number(field['project[project_after_process_attributes][hole_price]']);
      price += Number(field['project[project_after_process_attributes][clip_price]']);
      price += Number(field['project[project_after_process_attributes][bind_price]']);
      price += Number(field['project[project_after_process_attributes][back_text_price]']);
    }

    // 製本作業
    if (field['project[binding_work]'] == 'binding_works_necessary') {

      field = Object.assign(field, this.refs.project_binding_work.getDetail());

      price += Number(field['project[project_binding_work_attributes][price]']);
    }

    // エラーが存在する場合
    if (messages.length > 0) {

      alert(messages.join('\n'));
      return false;
    }

    console.log('price', price);
    console.log('field', field);

    // 価格の適用
    field['project[price]'] = price;
    this.setState({ price: price }, () => {

      // 品目内容を送信
      request
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((error, response) => {

        if (response.body.status == 'success' && response.body.project.id) {

          // 新規作成時は編集画面はリダイレクト
          if (!this.props.project.id) {
            alert('品目情報を作成しました');
            console.log(location.href = `/projects`);
          } else {
            alert('品目情報を更新しました');
            console.log(location.href = `/projects`);
          }

        } else {

          alert('品目情報の保存に失敗しました。');
        }
      });
    });
  }

  /**
   *  お客様選択時
   *  @version 2018/06/10
   */
  applyClient(client) {

    this.setState({
      client: client,
      company: client.company,
      division: client.division,
    });
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render() {

    const { project, project_copy, project_card, project_print, project_scan, project_bind, project_after_process, project_binding_work } = this.props;

    return (
      <div className={Style.ProjectEditor}>

        <h1 className='l-dashboard__heading'>品目作成</h1>

        <div className='c-form-label u-mt-30'>
          <label htmlFor='project_name'>品目名</label>
          <span className='c-form__required u-ml-10'>必須</span>
        </div>
        <input placeholder='品目名' className='c-form-text' required='required' autoComplete='off' spellCheck='false' type='text' ref='name' defaultValue={this.props.project.name} />

        <div className='c-form-label u-mt-30'>
          <label htmlFor='project_name'>品目単価 <span className='u-fs-small u-fc-thinBlack'>※更新時に価格が自動計算されます</span></label>
        </div>
        <input placeholder='※更新時に価格が自動計算されます' readOnly={true} className='c-form-text' required='required' autoComplete='off' spellCheck='false' type='text' ref='price' value={Utilities.numberWithDelimiter(this.state.price)} />

        { this.state.client ?
          <div className='c-attention'>
            <div>会社名: {this.state.company.name}</div>
            <div className='u-mt-10'>部署名: {this.state.division.name || '部署名なし'}</div>
            <div className='u-mt-10'>担当者名: {this.state.client.name}</div>
            <div className='u-mt-10'>担当者TEL: {this.state.client.tel}</div>
            <div className='u-mt-10'>担当者email: {this.state.client.email}</div>
          </div>
          : null
        }

        <input type='hidden' ref='company_division_client_id' defaultValue={this.state.client ? this.state.client.id : this.props.project.company_division_client_id} />

        <div className='u-mt-30'>
          <div className='c-form-label'>
            <label>品目種別</label>
          </div>
          <label className='c-form-radioLabel'>
            <input name='project_category' type='radio' defaultChecked={this.state.project_category == 'project_print'} onChange={() => this.setState({project_category: 'project_print'})} className='c-form-radio' />
            <i className='c-form-radioIcon' />
            <span>プリント</span>
          </label>
          <label className='c-form-radioLabel u-ml-15'>
            <input name='project_category' type='radio' defaultChecked={this.state.project_category == 'project_copy'} onChange={() => this.setState({project_category: 'project_copy'})} className='c-form-radio' />
            <i className='c-form-radioIcon' />
            <span>コピー</span>
          </label>
          <label className='c-form-radioLabel u-ml-15'>
            <input name='project_category' type='radio' defaultChecked={this.state.project_category == 'project_card'} onChange={() => this.setState({project_category: 'project_card'})} className='c-form-radio' />
            <i className='c-form-radioIcon' />
            <span>名刺</span>
          </label>
          <label className='c-form-radioLabel u-ml-15'>
            <input name='project_category' type='radio' defaultChecked={this.state.project_category == 'project_scan'} onChange={() => this.setState({project_category: 'project_scan'})} className='c-form-radio' />
            <i className='c-form-radioIcon' />
            <span>スキャン</span>
          </label>
          <label className='c-form-radioLabel u-ml-15'>
            <input name='project_category' type='radio' defaultChecked={this.state.project_category == 'project_bind'} onChange={() => this.setState({project_category: 'project_bind'})} className='c-form-radio' />
            <i className='c-form-radioIcon' />
            <span>製本のみ</span>
          </label>
          <label className='c-form-radioLabel u-ml-15'>
            <input name='project_category' type='radio' defaultChecked={this.state.project_category == 'project_other'} onChange={() => this.setState({project_category: 'project_other'})} className='c-form-radio' />
            <i className='c-form-radioIcon' />
            <span>その他</span>
          </label>
        </div>

        { this.state.project_category != 'project_other' ?
          <h2 className={Style.ProjectEditor__heading}>概要</h2>
          : null
        }

        { this.state.project_category == 'project_print' ? <ProjectPrint ref='project_print' {...{project}}  project_print={project_print || {}}/> : null }
        { this.state.project_category == 'project_copy'  ? <ProjectCopy  ref='project_copy'  {...{project}}  project_copy={project_copy   || {}}  /> : null }
        { this.state.project_category == 'project_card'  ? <ProjectCard  ref='project_card'  {...{project}}  project_card={project_card   || {}}  /> : null }
        { this.state.project_category == 'project_scan'  ? <ProjectScan  ref='project_scan'  {...{project}}  project_scan={project_scan   || {}}  /> : null }
        { this.state.project_category == 'project_bind'  ? <ProjectBind  ref='project_bind'  {...{project}}  project_bind={project_bind   || {}}  /> : null }

        {/** その他の場合 */}
        { this.state.project_category == 'project_other'  ?

          <div className={Style.ProjectEditor}>
            <div className='u-mt-30 c-table'>
              <table>
                <tbody>
                  <tr>
                    <td className='u-fw-bold'>備考</td>
                    <td>
                      <textarea placeholder='内容を入力してください' className='c-form-textarea' row={5} autoComplete='off' spellCheck='false' type='text' ref='note' defaultValue={this.props.project.note}></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td className='u-fw-bold'>金額</td>
                    <td>
                      <input className='c-form-text' ref='other_price' type='text' defaultValue={this.props.project.price || 0} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          : null
        }

        {/** 後加工 / 製本仕様 */}
        { this.state.project_category == 'project_print' || this.state.project_category == 'project_copy' || this.state.project_category == 'project_bind' ?

          <div>

            <h2 className={Style.ProjectEditor__heading}>後加工仕様</h2>

            <div className='c-table u-mt-30'>
              <table>
                <tbody>
                  <tr>
                    <td className='u-fw-bold'>後加工作業</td>
                    <td>
                      <div className='c-form-selectWrap'>
                        <select className='c-form-select' ref='after_process' defaultValue={this.state.after_process} onChange={(e) => this.setState({after_process: e.target.value})}>
                          { Object.keys(AFTER_PROCESSES).map((item, index) => {
                            const key = 'after_process-'+index;
                            return (
                              <option {...{key}} value={AFTER_PROCESSES[item]}>{item}</option>
                            );
                          })}
                        </select>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            { this.state.after_process == 'after_process_necessary' ? <ProjectAfterProcess ref='project_after_process' {...{project}}  project_after_process={project_after_process || {}}/> : null}

            <h2 className={Style.ProjectEditor__heading}>製本仕様</h2>

            <div className='c-table u-mt-30'>
              <table>
                <tbody>
                  <tr>
                    <td className='u-fw-bold'>製本作業</td>
                    <td>
                      <div className='c-form-selectWrap'>
                        <select className='c-form-select' ref='binding_work' defaultValue={this.state.binding_work} onChange={(e) => this.setState({binding_work: e.target.value})}>
                          { Object.keys(BINDING_WORKS).map((item, index) => {
                            const key = 'binding_work-'+index;
                            return (
                              <option {...{key}} value={BINDING_WORKS[item]}>{item}</option>
                            );
                          })}
                        </select>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            { this.state.binding_work == 'binding_works_necessary' ? <ProjectBindingWork ref='project_binding_work' {...{project}}  project_binding_work={project_binding_work || {}}/> : null}
          </div>
          : null
        }

        <div className='c-overlay-submit'>
          <div className='c-btnMain-standard c-btn-blue' onClick={::this.onSubmit}>{this.props.project.id ? '更新する' : '作成する'}</div>
        </div>
      </div>
    );
  }
}
