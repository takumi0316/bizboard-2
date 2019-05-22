import React      from 'react'
import Style      from './style.sass'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

import DatetimePicker from './datetime_picker'
import ClientSearch from './client_search'
import ProjectSearch from './project_search'

// datetime
import Dayjs from 'dayjs'

import {
  QUOTE_TYPES,
  CHANNELS,
} from './properties.es6'

/**
 *  記事エディター
 *  @version 2018/06/10
 */
export default class QuoteEditor extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    this.state = {
      quotes: props.quote,
      projects: props.projects,
      project_unit: {},
      company: props.company,
      division: props.division,
      client: props.client,
      user_id: props.user_id,
      quote_type: props.quote_type || 'contract',
      deliver_type: props.deliver_type || 'seat',
      deliver_at: props.quote.deliver_at,
      discount: props.quote.discount,
      total_cost: 0,
      date: props.quote.date,
      project_type: false,
      project_map: false,
      show: false,
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
   *  見積もり作成日時を適用するcallback
   *  @version 2018/06/10
   */
  setDate(datetime) {

    this.setState({
      date: datetime.datetime,
    });
  }

  /**
   *  見積もり期日を適用するcallback
   *  @version 2018/06/10
   */
  setExpiration(datetime) {

    this.setState({
      expiration: datetime.datetime,
    });
  }

  /**
   *  バリデーション
   *  @version 2018/06/10
   */
  validation() {

    let message = [];

    if (this.refs.subject.value == '') {
      message.push('見積りタイトルを入力してください。');
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
    const request = this.props.quote.id ? Request.put(this.props.action) : Request.post(this.props.action);

    let field = {
      'quote[company_division_client_id]': this.refs.company_division_client_id.value,
      'quote[subject]': this.refs.subject.value,
      'quote[quote_type]': this.refs.quote_type.value,
      'quote[channel]': this.refs.channel.value,
      'quote[date]': this.state.date || '',
      'quote[expiration]': this.state.expiration || '',
      'quote[deliver_at]': this.state.deliver_at || '',
      'quote[deliver_type]': this.state.deliver_type,
      'quote[remarks]': this.refs.remarks.value,
      'quote[memo]': this.refs.memo.value,
      'quote[price]': this.refs.price.value,
      'quote[user_id]': this.refs.user_id.value,
      'quote[discount]': this.refs.discount.value,
    };

    // 納品方法
    if (this.state.deliver_type == 'location' || this.state.deliver_type == 'other') {

      if (this.refs.deliver_type_note.value == '') messages.push('納品方法を記入してください');

      field['quote[deliver_type_note]'] = this.refs.deliver_type_note.value;
    }

    // エラーが存在する場合
    if (messages.length > 0) {

      alert(messages.join('\n'));
      return false;
    }


    // 記事内容を送信
    request
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((error, response) => {

        if (response.body.status == 'success' && response.body.quote.id) {

          // 新規作成時は編集画面はリダイレクト
          if (!this.props.quote.id) {
            alert('見積り情報を作成しました');
            location.href = `${response.body.quote.id}/edit`;
          } else {
            alert('見積り情報を更新しました');
          }

        } else {

          alert('見積り情報の保存に失敗しました。');
        }
      });
  }

  /**
   *  モーダルを表示する
   *  @version 2018/06/10
   */
  discount_from_open() {

    this.setState({ show: true });
  }

  /**
   *  モーダルを表示する
   *  @version 2018/06/10
   */
  discount_from_close() {

    let copyProjects = Object.assign([], this.state.projects);
    let totalCost = 0;
    copyProjects.map((project, index) => {

      totalCost = totalCost + (Number(document.getElementById('projectPrice' + index).value) * Number(document.getElementById('projectUnit' + index).value))
    })
    this.setState({ show: false, discount: 0, total_cost: totalCost});
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
   *  品目選択時
   *  @version 2018/06/10
   */
  applyProject(project) {

    // StateのProjectオブジェクトをコピー
    let copyProjects = Object.assign([], this.state.projects);
    // applyProjectに代入された引数を追加
    copyProjects.push(project);

    // StateのProjectUnit(連想配列)をコピー
    let copyProjectUnit = Object.assign([], this.state.project_unit);
    // StateのProjectオブジェクトの個数代入
    const projects_count = Number(copyProjects.length) - 1;
    // ProjectUnitにProjectの個数分の初期値を追加
    copyProjectUnit[projects_count] = 1;

    let totalCost = 0;
    copyProjects.map((mapProject, index) => {

      if ( project.id === mapProject.id ) {

        totalCost = totalCost + project.price;
      } else {

        totalCost = totalCost + (Number(document.getElementById('projectPrice' + index).value) * Number(document.getElementById('projectUnit' + index).value));
      }
    })
    this.state.discount !== null ? totalCost = totalCost - this.state.discount : null
    this.setState({ projects: copyProjects, project_unit: copyProjectUnit, total_cost: totalCost });
  }

  /**
   * 指定されたprojectを消す
   *
   */
  _projectDestroy = (passIndex) => {

    let pushProjects = [];
    let field = {};
    let totalCost = 0;
    this.state.projects.map((project, index) => {

      if ( passIndex !== index ) {

        field = {
          'id': document.getElementById('projectId' + index).value,
          'name': document.getElementById('projectName' + index).value,
          'price': Number(document.getElementById('projectPrice' + index).value),
        }
        totalCost = totalCost + (Number(document.getElementById('projectPrice' + index).value) * Number(document.getElementById('projectUnit' + index).value));
        pushProjects.push(field);
      }
    })
    this.state.discount !== null ? totalCost = totalCost - this.state.discount : null
    this.setState({ projects: pushProjects, total_cost: totalCost });
  }

  /**
   * Priceを変更する
   *
   */
  _changePrice = (passIndex) => {

    let copyProjects = Object.assign([], this.state.projects);
    let totalCost = 0;
    copyProjects.forEach((project, index) => {

      passIndex === index ? project.price = document.getElementById('projectPrice' + passIndex).value : null
      totalCost = totalCost + (Number(project.price) * Number(document.getElementById('projectUnit' + index).value));
    })
    this.state.discount !== null ? totalCost = totalCost - this.state.discount : null
    this.setState({ projects: copyProjects, total_cost: totalCost });
  }

  /**
   * Unitを変更する
   *
   */
  _changeUnit = (passIndex) => {

    let copyProjectUnit = Object.assign({}, this.state.project_unit);
    copyProjectUnit[passIndex] = Number(document.getElementById('projectUnit' + passIndex).value);

    let copyProjects = Object.assign([], this.state.projects);
    let totalCost = 0;
    copyProjects.map((project, index) => {

      totalCost = totalCost + (Number(project.price) * Number(copyProjectUnit[index]));
    })
    this.setState({ project_unit: copyProjectUnit, total_cost: totalCost });
  }

  /**
   * 値引き金額を変更
   *
   */
  _changeDiscount = () => {

    const refDiscount = this.refs.discount.value;
    let totalCost = 0;
    if ( Object.keys(this.state.projects).length > 0 ) {

      let copyProjectUnit = Object.assign({}, this.state.project_unit);
      let copyProjects = Object.assign([], this.state.projects);
      copyProjects.map((project, index) => {

        totalCost = totalCost + (Number(project.price) * Number(copyProjectUnit[index]));
      })
      totalCost = totalCost - refDiscount;
    } else {

      totalCost = totalCost - refDiscount;
    }
    this.setState({ discount: refDiscount, total_cost: totalCost });
  }
  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render() {
    console.log(this.state.projects)
    return (
      <div>
        <h1 className='l-dashboard__heading'>見積書作成</h1>
        <input type='hidden' name='authenticity_token' value={'test'} />
        <div className='c-form-label u-mt-30'>
          <label htmlFor='quote_name'>見積書タイトル</label>
          <span className='c-form__required u-ml-10'>必須</span>
        </div>
        <input placeholder='見積書タイトル' className='c-form-text' required='required' autoComplete='off' spellCheck='false' type='text' ref='subject' defaultValue={this.props.quote.subject} />
        <div className='c-form-label u-mt-30'>
          <label htmlFor='quote_company_division_client_id'>お客様情報</label>
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
        <input type='hidden' ref='company_division_client_id' value={this.state.client ? this.state.client.id : this.props.quote.company_division_client_id} />
        <input type='hidden' ref='user_id' value={this.state.client ? this.state.client.user_id: this.props.quote.user_id} />
        <div className='u-mt-15'>
          <ClientSearch applyClient={::this.applyClient} users={ this.props.users } prefectures={ this.props.prefectures } />
        </div>
        <div className='u-mt-30 c-table'>
          <table>
            <tbody>
              <tr>
                <td className='u-fw-bold'>見積もり発行日</td>
                <td>
                  <span className='u-mr-30'>{ this.state.date ? Dayjs(this.state.date).format('YYYY年MM月DD日') : '未定' }</span>
                  <DatetimePicker apply={::this.setDate} defaultDatetime={this.props.quote.date} />
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>見積もり有効期間</td>
                <td>
                  <span className='u-mr-30'>{ this.state.expiration ? Dayjs(this.state.expiration).format('YYYY年MM月DD日') : '未定' }</span>
                  <DatetimePicker apply={::this.setExpiration} defaultDatetime={this.props.quote.expiration} />
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>納期</td>
                <td>
                  <span className='u-mr-30'>{ this.state.deliver_at ? Dayjs(this.state.deliver_at).format('YYYY年MM月DD日 HH時mm分') : '未定' }</span>
                  <DatetimePicker apply={::this.setDeliverAt} defaultDatetime={this.props.quote.deliver_at} />
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
                      <textarea placeholder='納品方法を記入てください' className='c-form-textarea' row={5} autoComplete='off' spellCheck='false' type='text' ref='deliver_type_note' defaultValue={this.props.quote.deliver_type_note}></textarea>
                      : null
                    }
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>受注経路</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='channel' defaultValue={this.props.channel}>
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
                    <select className='c-form-select' ref='quote_type' defaultValue={this.props.quote_type}>
                      { Object.keys(QUOTE_TYPES).map((item, index) => {
                        const key = 'quote_type-'+index;
                        return (
                          <option {...{key}} value={QUOTE_TYPES[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={ 'c-table u-mt-30' }>
          <table>
            <thead>
              <tr>
                <th>品目</th>
                <th>単価</th>
                <th>数量</th>
                <th>価格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { this.props.quote.id === null ?
                <React.Fragment>
                  { this.state.projects.length < 0 ?
                    null
                    :
                    <React.Fragment>
                      { this.state.projects.map((project, index) => {

                        const key = 'project-' + index;
                        return (
                          <tr key={ key }>
                            <td><input className={ 'c-form-text' } type='text' id={ 'projectName' + index } defaultValue={ project.name } /><input type='hidden' id={ 'projectId' + index } defaultValue={ project.id } /></td>
                            <td><input className={ 'c-form-text' } type='text' id={ 'projectPrice' + index } defaultValue={ project.price } onChange={ e => this._changePrice(index) } /></td>
                            <td><input className={ 'c-form-text' } type='text' id={ 'projectUnit' + index } defaultValue={ this.state.project_unit[index] } onChange={ e => this._changeUnit(index) } /></td>
                            <td><input readOnly className={ 'c-form-text' } type='text' id={ 'projectTotalPrice' + index } value={ project.price * this.state.project_unit[index] } /></td>
                            <td className={ 'u-va-top' }><button className={ 'c-btnMain2-primaryA' } onClick={ e => this._projectDestroy(index) }>ー</button></td>
                          </tr>
                        )
                      }) }
                    </React.Fragment>
                  }
                </React.Fragment>
                :
                <React.Fragment>
                  { this.state.projects.length < 0 ?
                    null
                    :
                    <React.Fragment>
                      { this.state.projects.map((project, index) => {

                        const key = 'project-' + index;
                        return (
                          <tr {...{key}}>
                            <td><input className={ 'c-form-text' } type='text' id={ 'projectName' + index } defaultValue={ project.name } /></td>
                            <td><input className={ 'c-form-text' } type='text' id={ 'projectPrice' + index } defaultValue={ project.price } onChange={ e => this._changePrice(index) } /></td>
                            <td><input className={ 'c-form-text' } type='text' id={ 'projectUnit' + index } defaultValue={ 1 } /></td>
                            <td><input readOnly className={ 'c-form-text' } type='text' id={ 'projectTotalPrice' + index } value={ project.price * 1 } /></td>
                            <td><button className={ 'c-btnMain2-primaryA' } onClick={ e => this._projectDestroy(index) }>ー</button></td>
                          </tr>
                        )
                      }) }
                    </React.Fragment>
                  }
                </React.Fragment>
              }
            </tbody>
          </table>
        </div>
        <div className='u-mt-15'>
          <ProjectSearch applyProject={::this.applyProject} prefectures={ this.props.prefectures } />
        </div>
        <div className={ 'c-table u-mt-10' }>
          <table>
            <tbody>
              <tr>
                <td className='u-fw-bold'>値引き
                </td>
                <td>
                  <div className='u-mt-15'>
                    <label className='c-form-radioLabel'>
                      <input name='discount_from_button' type='radio' onChange={::this.discount_from_close} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>値引きなし</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-15'>
                      <input name='discount_from_button' type='radio' onChange={::this.discount_from_open} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>値引きあり</span>
                    </label>
                  </div>
                  <div className='u-mt-15'>
                    { this.state.show ?
                      <textarea placeholder='2000' className='c-form-textarea' onChange={ e  => this._changeDiscount() } type='text' ref='discount' defaultValue={ this.state.discount === null ? 0 : this.state.discount }></textarea>
                      : null
                    }
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>合計金額</td>
                <td>
                  <textarea readOnly placeholder='合計金額' className='c-form-textarea' autoComplete='off' spellCheck='false' type='text' ref='price' value={ this.state.total_cost * gon.consumption_tax }></textarea>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>備考 ※見積もりに記載されます</td>
                <td>
                  <textarea placeholder='案件に関する備考を入力してください ※見積もりに記載されます' className='c-form-textarea' row={5} autoComplete='off' spellCheck='false' type='text' ref='remarks' defaultValue={this.props.quote.remarks}></textarea>
                </td>
              </tr>

              <tr>
                <td className='u-fw-bold'>メモ ※見積もりに記載されません</td>
                <td>
                  <textarea placeholder='案件に関するメモを入力してください ※見積もりに記載されません' className='c-form-textarea' row={5} autoComplete='off' spellCheck='false' type='text' ref='memo' defaultValue={this.props.quote.memo}></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='c-overlay-submit'>
          <div className='c-btnMain-standard c-btn-blue' onClick={::this.onSubmit}>{this.props.quote.id ? '更新する' : '作成する'}</div>
        </div>
      </div>
    );
  }
}
