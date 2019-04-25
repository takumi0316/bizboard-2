import React      from 'react'
import Style      from './style.sass'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

import DatetimePicker from './datetime_picker'
import ClientSearch from './client_search'

import ProjectCopy from './project_copy'
import ProjectPrint from './project_print'
import ProjectBind from './project_bind'
import ProjectCard from './project_card'
import ProjectScan from './project_scan'
import ProjectAfterProcess from './project_after_process'
import ProjectBindingWork from './project_binding_work'

// datetime
import Dayjs from 'dayjs'

import {
  PROJECT_NAMES,
  PROJECT_TYPES,
  CHANNELS,
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

    console.log('props', props);

    this.state = {
      company: props.company,
      division: props.division,
      client: props.client,
      project_category: props.project.project_category || 'project_print',
      project_type: props.project.project_type || 'contract',
      deliver_at: props.project.deliver_at,
      deliver_type: props.project.deliver_type || 'seat',
      after_process: props.project.after_process || 'after_process_unnecessary',
      binding_work: props.project.binding_work || 'binding_works_unnecessary',
    }
  }

  /**
   *  公開日時を適用するcallback
   *  @version 2018/06/10
   */
  setDeliverAt(datetime) {

    this.setState({
      deliver_at: datetime.datetime,
    });
  }

  /**
   *  バリデーション
   *  @version 2018/06/10
   */
  validation() {

    let message = [];

    if (this.refs.name.value == '') {
      message.push('案件名を入力してください。');
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

    let field = {
      'project[company_division_client_id]': this.refs.company_division_client_id.value,
      'project[name]': this.refs.name.value,
      'project[project_category]': this.state.project_category,
      'project[project_type]': this.refs.project_type.value,
      'project[channel]': this.refs.channel.value,
      'project[deliver_at]': this.state.deliver_at || '',
      'project[deliver_type]': this.state.deliver_type,
      'project[note]': this.refs.note.value,
      'project[after_process]': this.state.after_process,
      'project[binding_work]': this.state.binding_work,
    };

    // 納品方法
    if (this.state.deliver_type == 'location' || this.state.deliver_type == 'other') {

      if (this.refs.deliver_type_note.value == '') messages.push('納品方法を記入してください');

      field['project[deliver_type_note]'] = this.refs.deliver_type_note.value;
    }

    // その他案件
    if (this.state.project_category == 'project_other') {

      field['project[project_count]'] = 1;
      field['project[after_process]'] = 'after_process_unnecessary';
      field['project[binding_work]'] = 'binding_works_unnecessary';

    // プリント案件
    } else if (this.state.project_category == 'project_print') {

      field = Object.assign(field, this.refs.project_print.getDetail());

    // 名刺案件
    } else if (this.state.project_category == 'project_card') {

      field['project[after_process]'] = 'after_process_unnecessary';
      field['project[binding_work]'] = 'binding_works_unnecessary';

      field = Object.assign(field, this.refs.project_card.getDetail());
      
    // コピー案件
    } else if (this.state.project_category == 'project_copy') {

      field = Object.assign(field, this.refs.project_copy.getDetail());
      
    // 製本のみ案件
    } else if (this.state.project_category == 'project_bind') {

      field = Object.assign(field, this.refs.project_bind.getDetail());
      
    // スキャン案件
    } else if (this.state.project_category == 'project_scan') {

      field['project[after_process]'] = 'after_process_unnecessary';
      field['project[binding_work]'] = 'binding_works_unnecessary';

      field = Object.assign(field, this.refs.project_scan.getDetail());
    }

    // 後加工
    if (field['project[after_process]'] == 'after_process_necessary') {

      messages = messages.concat(this.refs.project_after_process.validation());
      field = Object.assign(field, this.refs.project_after_process.getDetail());
    }

    // 製本作業
    if (field['project[binding_work]'] == 'binding_works_necessary') {

      field = Object.assign(field, this.refs.project_binding_work.getDetail());
    }

    // エラーが存在する場合
    if (messages.length > 0) {

      alert(messages.join('\n'));
      return false;
    }

    console.log('field', field);

    // 記事内容を送信
    request
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((error, response) => {
        
        if (response.body.status == 'success' && response.body.project.id) {

          // 新規作成時は編集画面はリダイレクト
          if (!this.props.project.id) {
            alert('案件情報を作成しました');
            location.href = `${response.body.project.id}/edit`;
          } else {
            alert('案件情報を更新しました');
          }

        } else {

          alert('案件情報の保存に失敗しました。');
        }
      });
  }

  /**
   *  お客様選択時
   *  @version 2018/06/10
   */
  applyClient(client) {

    console.log('applyClient', client);
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

        <h1 className='l-contents__heading'>案件作成</h1>

        <input type='hidden' name='authenticity_token' value={'test'} />
        
        <div className='c-form-label'>
          <label htmlFor='project_name'>案件名</label>
          <span className='c-form__required u-ml-10'>必須</span>
        </div>
        <input placeholder='案件名' className='c-form-text' required='required' autoComplete='off' spellCheck='false' type='text' ref='name' defaultValue={this.props.project.name} />
        
        <div className='c-form-label'>
          <label htmlFor='project_company_division_client_id'>お客様情報</label>
        </div>
        
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

        <input type='hidden' ref='company_division_client_id' value={this.state.client ? this.state.client.id : this.props.project.company_division_client_id} />

        <div className='u-mt-15'>
          <ClientSearch applyClient={::this.applyClient} />
        </div>
        
        <div className='u-mt-30'>
          <div className='c-form-label'>
            <label>案件種別</label>
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

        <h2 className={Style.ProjectEditor__heading}>案件情報 ({PROJECT_NAMES[this.state.project_category]})</h2>

        <div className='u-mt-30 c-table'>

          <table>
            <tbody>
              <tr>
                <td className='u-fw-bold'>納期</td>
                <td>
                  <span className='u-mr-30'>{ this.state.deliver_at ? Dayjs(this.state.deliver_at).format('YYYY年MM月DD日 HH時mm分') : '未定' }</span>
                  <DatetimePicker apply={::this.setDeliverAt} defaultDatetime={this.state.deliver_at} />
                </td>
              </tr>

              <tr>
                <td className='u-fw-bold'>納品方法</td>
                <td>
                  <div className='u-mt-15'>
                    <label className='c-form-radioLabel'>
                      <input name='deliver_type' type='radio' defaultChecked={this.state.deliver_type == 'seat'} onChange={() => this.setState({deliver_type: 'seat'})} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>席まで配達</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-15'>
                      <input name='deliver_type' type='radio' defaultChecked={this.state.deliver_type == 'location'} onChange={() => this.setState({deliver_type: 'location'})} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>指定場所に配達</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-15'>
                      <input name='deliver_type' type='radio' defaultChecked={this.state.deliver_type == 'pickup'} onChange={() => this.setState({deliver_type: 'pickup'})} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>引取り</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-15'>
                      <input name='deliver_type' type='radio' defaultChecked={this.state.deliver_type == 'other'} onChange={() => this.setState({deliver_type: 'other'})} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>その他</span>
                    </label>
                  </div>
                  
                  <div className='u-mt-15'>
                    { this.state.deliver_type == 'location' || this.state.deliver_type == 'other' ?
                      <textarea placeholder='納品方法を記入てください' className='c-form-textarea' row={5} autoComplete='off' spellCheck='false' type='text' ref='deliver_type_note' defaultValue={this.props.project.deliver_type_note}></textarea>
                      : null
                    }
                  </div>
                </td>
              </tr>
              
              <tr>
                <td className='u-fw-bold'>受注経路</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='channel' defaultValue={this.props.project.channel}>
                      { Object.keys(CHANNELS).map((item, index) => {
                        const key = 'channel-'+index;
                        return (
                          <option {...{key}} value={CHANNELS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>

              <tr>
                <td className='u-fw-bold'>受注区分</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='project_type' defaultValue={this.props.project.project_type}>
                      { Object.keys(PROJECT_TYPES).map((item, index) => {
                        const key = 'project_type-'+index;
                        return (
                          <option {...{key}} value={PROJECT_TYPES[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>

              <tr>
                <td className='u-fw-bold'>備考</td>
                <td>
                  <textarea placeholder='案件に関する備考を入力してください' className='c-form-textarea' row={5} autoComplete='off' spellCheck='false' type='text' ref='note' defaultValue={this.props.project.note}></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        { this.state.project_category != 'project_other' ?
          <h2 className={Style.ProjectEditor__heading}>{PROJECT_NAMES[this.state.project_category]}仕様</h2>
          : null
        }

        { this.state.project_category == 'project_print' ? <ProjectPrint ref='project_print' {...{project}}  project_print={project_print || {}}/> : null }
        { this.state.project_category == 'project_copy'  ? <ProjectCopy  ref='project_copy'  {...{project}}  project_copy={project_copy   || {}}  /> : null }
        { this.state.project_category == 'project_card'  ? <ProjectCard  ref='project_card'  {...{project}}  project_card={project_card   || {}}  /> : null }
        { this.state.project_category == 'project_scan'  ? <ProjectScan  ref='project_scan'  {...{project}}  project_scan={project_scan   || {}}  /> : null }
        { this.state.project_category == 'project_bind'  ? <ProjectBind  ref='project_bind'  {...{project}}  project_bind={project_bind   || {}}  /> : null }

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
