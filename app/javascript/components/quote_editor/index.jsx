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
      quote: props.quote,
      quote_projects: props.quote_projects,
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
  onSubmit = () => {

    let arrayRails = [];
    let field = {};
    let quoteProjectsCount = Object.keys(this.state.quote_projects).length;
    let quoteProjects = Object.assign([], this.state.quote_projects);
    if (quoteProjectsCount === 0) {

      alert('品目を選択してください！！！！！！！！！！！')
      return
    }

    let messages = this.validation();

    // エラーが存在する場合
    if (messages.length > 0) {

      alert(messages.join('\n'));
      return false;
    }

    // 新規登録時、更新時とでmethodを分ける
    //const request = this.props.quote.id ? Request.put(this.props.action) : Request.post(this.props.action);

    for (let i = 0; i < quoteProjectsCount; i++) {

      // 品目を連想配列に入れる
      arrayRails.push(JSON.stringify({
        'projectSpecificationId': quoteProjects[i].id === null ? 'null' : Number(quoteProjects[i].id),
        'projectSpecificationName': document.getElementById('projectSpecificationName' + i).value,
        'projectSpecificationUnitPrice': Number(document.getElementById('projectSpecificationUnitPrice' + i).value),
        'projectSpecificationUnit': Number(document.getElementById('projectSpecificationUnit' + i).value),
        'projectSpecificationPrice': Number(document.getElementById('projectSpecificationPrice' + i).value),
      }));
    }
    field = {
      'id': this.state.quote.id === null ? 'null' : this.state.quote.id,
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
      'quote[user_id]': this.refs.user_id.value,
      'quote[discount]': this.state.discount === null ? 0 : this.state.discount,
      'quote[total_cost]': this.refs.total_cost.value,
      'specifications[]': arrayRails,
    };

    // 納品方法
    if (this.state.deliver_type == 'location' || this.state.deliver_type == 'other') {

      if (this.refs.deliver_type_note.value == '') messages.push('納品方法を記入してください');

      field['quote[deliver_type_note]'] = this.refs.deliver_type_note.value;
    }

    // quote-url
    let url = '/quotes';
    // 記事内容を送信
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (  !err && res.body.status == 'success'  ) {
          if (!this.props.quote.id) {

            alert('見積り情報を作成しました');
            location.href = `${res.body.quote.id}/edit`;
            console.log(res.body.quote)
            console.log(res.body.quote_projects)
            this.setState({ quote: res.body.quote, quote_projects: res.body.quote_projects })
          } else {

            alert('見積り情報を更新しました');
            console.log('quote_projects: ', res.body.quote_projects)
            this.setState({ quote: res.body.quote, quote_projects: res.body.quote_projects })
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
    let copyProjects = Object.assign([], this.state.quote_projects);
    // project.specifcationsを管理する配列
    let specificationArray = [];
    specificationArray = project.specifications;
    // project.specficationsの連想配列をcopyProjectsに追加
    specificationArray.map((specification, index) => {

      copyProjects.push(specification)
    })
    let totalCost = 0;
    // copyProjects.specificationsのpriceを取得
    copyProjects.map((specification, index) => {

      totalCost = totalCost + Number(specification.price);
    })
    this.state.discount !== null ? totalCost = Number(totalCost) - Number(this.state.discount) : null
    this.setState({ quote_projects: copyProjects, total_cost: totalCost });
  }

  /**
   * 指定されたprojectを消す
   *
   */
  _projectDestroy = (passIndex) => {

    console.log(this.state.quote_projects[passIndex])
    if ( this.state.quote.id !== null && this.state.quote_projects[passIndex].id !== null ) {

      let url = '/quote_projects/' + this.state.quote_projects[passIndex].id;
      let field = { 'quote_id': this.state.quote.id };
      Request
      .del(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if ( !err && res.body.status === 'success' ) {

          let totalCost = 0;
          res.body.quote_projects.map((project, index) => {

            totalCost = totalCost + Number(project.price);
          })
          this.setState({ quote: res.body.quote, quote_projects: res.body.quote_projects, total_cost: totalCost });
        } else {

          alert('正常に削除できませんでした')
        }
      });
    } else {

      let copyProjects = [];
      let totalCost = 0;
      this.state.quote_projects.map((project, index) => {

        if ( index !== passIndex ) {

          copyProjects.push(project)
          totalCost = totalCost + Number(project.price);
        }
      })
      this.state.discount !== null ? totalCost = Number(totalCost) - Number(this.state.discount) : null
      this.setState({ quote_projects: copyProjects, total_cost: totalCost });
    }
  }

  /**
   * Unitを変更する
   *
   */
  _changeUnit = (passIndex) => {

    let copyProjects = Object.assign([], this.state.quote_projects);
    let totalCost = 0;
    copyProjects.forEach((project, index) => {

      passIndex === index ? project.unit = Number(document.getElementById('projectSpecificationUnit' + passIndex).value) : null
      passIndex === index ? project.price = Number(project.unit_price) * project.unit : null
      totalCost = totalCost + Number(project.price);
    })
    this.setState({ quote_projects: copyProjects, total_cost: totalCost });
  }

  /**
   * 値引き金額を変更
   *
   */
  _changeDiscount = () => {

    const refDiscount = Number(this.refs.discount.value);
    let totalCost = Number(this.refs.total_cost.value);
    totalCost = totalCost - refDiscount;
    this.setState({ discount: refDiscount, total_cost: totalCost });
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render() {
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
              { this.state.quote.id === null ?
                <React.Fragment>
                  { this.state.quote_projects === undefined ?
                    null
                    :
                    <React.Fragment>
                      { this.state.quote_projects.map((specification, index) => {
                        const key = 'specification-' + index;
                        return (
                          <tr {...{key}}>
                            <td><input className={ 'c-form-text' } type='text' id={ 'projectSpecificationName' + index } defaultValue={ specification.name } /></td>
                            <td><input readOnly className={ 'c-form-text' } type='text' id={ 'projectSpecificationUnitPrice' + index } value={ specification.unit_price } /></td>
                            <td><input className={ 'c-form-text' } type='text' id={ 'projectSpecificationUnit' + index } defaultValue={ specification.unit } onChange={ e => this._changeUnit(index) } /></td>
                            <td><input readOnly className={ 'c-form-text' } type='text' id={ 'projectSpecificationPrice' + index } value={ specification.price } /></td>
                            <td><button className={ 'c-btnMain2-primaryA' } onClick={ e => this._projectDestroy(index) }>ー</button></td>
                          </tr>
                         )
                      }) }
                    </React.Fragment>
                  }
                </React.Fragment>
                :
                <React.Fragment>
                  { this.state.quote_projects === undefined ?
                    null
                    :
                    <React.Fragment>
                      { this.state.quote_projects.map((specification, index) => {

                        const key = 'project-' + index;
                        return (
                          <tr {...{key}}>
                            <td><input className={ 'c-form-text' } type='text' id={ 'projectSpecificationName' + index } defaultValue={ specification.name } /></td>
                            <td><input readOnly className={ 'c-form-text' } type='text' id={ 'projectSpecificationUnitPrice' + index } value={ specification.unit_price } /></td>
                            <td><input className={ 'c-form-text' } type='text' id={ 'projectSpecificationUnit' + index } defaultValue={ specification.unit } onChange={ e => this._changeUnit(index) } /></td>
                            <td><input readOnly className={ 'c-form-text' } type='text' id={ 'projectSpecificationPrice' + index } value={ specification.price } /></td>
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
                  <textarea readOnly placeholder='合計金額' className='c-form-textarea' autoComplete='off' spellCheck='false' type='text' ref='total_cost' value={ this.state.total_cost * gon.consumption_tax }></textarea>
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
