import React      from 'react'
import Style      from './style.sass'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

import DatetimePicker from './datetime_picker'
import ClientSearch from './client_search'
import ProjectSearch from './project_search'
import HomeDivision from './home_division'


// datetime
import Dayjs from 'dayjs'

import {
  QUOTE_TYPES,
  CHANNELS,
  TAX_TYPES,
  PAYMENT_TERMS,
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

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    this.state = {
      quote: props.quote,
      quote_projects: props.quote_projects,
      company: props.company,
      division: props.division,
      home_division: props.home_division,
      client: props.client,
      work: props.work,
      user_id: props.user === null ? null : props.user.id,
      quote_type: props.quote.quote_type === null ? 'contract' : props.quote.quote_type,
      tax_type: props.quote.tax_type === null ? 'taxation' : props.quote.tax_type,
      tax: props.quote.tax === null ? 1.08 : props.quote.tax,
      payment_terms: props.quote.payment_terms === null ? 'postpaid' : props.quote.tax_type,
      deliver_type: props.quote.deliver_type === null ? 'seat' : props.quote.deliver_type,
      deliver_at: props.quote.deliver_at === null ? new Date(year, month, day) : props.quote.deliver_at,
      discount: props.quote.discount === null ? 0 : props.quote.discount,
      date: props.quote.date,
      channel: props.quote.channel,
      quote_type: props.quote.quote_type,
      expiration: props.quote.expiration,
      total_cost: props.quote.price === null ? 0 : props.quote.price,
      date: props.quote.date,
      show: props.quote.discount === 0 || props.quote.discount === null ? false : true,
      task: props.task,
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
      message.push('案件タイトルを入力してください。');
    }

    return message;
  }

  onPDF = (passQuoteId) => {

    location.href = `/quotes/` + passQuoteId + '/wicked_pdf';
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
        'projectSpecificationRemarks': document.getElementById('projectSpecificationRemarks' + i).value,
        'projectSpecificationUnitPrice': Number(document.getElementById('projectSpecificationUnitPrice' + i).value),
        'projectSpecificationUnit': Number(document.getElementById('projectSpecificationUnit' + i).value),
        'projectSpecificationPrice': Number(document.getElementById('projectSpecificationPrice' + i).value),
        'projectName': quoteProjects[i].project_name,
        'projectId': quoteProjects[i].project_id,
      }));
      console.log(Number(document.getElementById('projectSpecificationUnitPrice' + i).value))
      console.log(Number(document.getElementById('projectSpecificationPrice' + i).value))
    }
    field = {
      'id': this.state.quote.id === null ? 'null' : this.state.quote.id,
      'quote[division_id]': this.state.home_division === null ? this.props.division_id : this.state.home_division.id,
      'quote[company_division_client_id]': this.refs.company_division_client_id.value || '',
      'quote[subject]': this.refs.subject.value,
      'quote[quote_type]': this.refs.quote_type.value,
      'quote[tax_type]': this.refs.tax_type.value,
      'quote[tax]': this.state.tax,
      'quote[payment_terms]': this.refs.payment_terms.value,
      'quote[channel]': this.refs.channel.value,
      'quote[date]': this.state.date || '',
      'quote[expiration]': this.state.expiration || '',
      'quote[deliver_at]': this.state.deliver_at || '',
      'quote[deliver_type]': this.state.deliver_type,
      'quote[remarks]': this.refs.remarks.value,
      'quote[memo]': this.refs.memo.value,
      'quote[user_id]': this.props.user_id,
      'quote[discount]': this.state.discount,
      'quote[total_cost]': Number(this.state.total_cost),

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

            alert('案件情報を作成しました');
            this.setState({ quote: res.body.quote, quote_projects: res.body.quote_projects })
            location.href = `${res.body.quote.id}/edit`;
          } else {

            alert('案件情報を更新しました');
            this.setState({ quote: res.body.quote, quote_projects: res.body.quote_projects })
          }
        } else {

          alert('案件情報の保存に失敗しました。');
          this.setState({ quote: res.body.quote, quote_projects: res.body.quote_projects })
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

    this.setState({ show: false, discount: 0});
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

  applyHomeDivision = (division) => {

    this.setState({ home_division: division })
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
  _projectDestroy = (passIndex, passName) => {

    if (window.confirm('本当に消しますか？')) {

      alert('消します！')
    }

    const delProjectPrice = Number(this.state.quote_projects[passIndex].price);
    let copyProjects = Object.assign([], this.state.quote_projects);
    let minusCost = Number(this.state.total_cost) - delProjectPrice;
    let totalCost = 0;
    let pushProjects = [];
    if ( this.state.quote.id !== null && this.state.quote_projects[passIndex].id !== null ) {

      let url = '/quote_projects/' + this.state.quote_projects[passIndex].id;
      let field = { 'quote_id': this.state.quote.id, 'quote_price': Math.floor(minusCost) };
      Request
      .del(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if ( !err && res.body.status === 'success' ) {

          copyProjects.map((project, index) => {

            index !== passIndex ? pushProjects.push(project) : null
            index !== passIndex ? totalCost = totalCost + Number(project.price) : null
            if ( index !== passIndex && project.id === null ) {

              res.body.quote_projects.push(project)
            }
          })
          this.state.discount !== null ? totalCost = Number(totalCost) - Number(this.state.discount) : null
          this.setState({ quote_projects: res.body.quote_projects, total_cost: totalCost });
        } else {

          alert('正常に削除できませんでした')
        }
      });
    } else {

      copyProjects.map((project, index) => {

        // 条件文をproject.nameではなく、project.id != this.state.quote_projects[passIndex].idにする
        //if ( project.name != passName ) {
        console.log('project: ', project)
        console.log('quote_projects', this.state.quote_projects[passIndex])
        if ( index != passIndex ) {

          pushProjects.push(project);
          totalCost = totalCost + Number(project.price);
       }
      })
      this.state.discount !== null ? totalCost = Number(totalCost) - Number(this.state.discount) : null
      this.setState({ quote_projects: pushProjects, total_cost: totalCost });
    }
  }

  /**
   * Unitを変更する
   *
   */
  _changeUnitPrice = (passIndex) => {

    const vali_unit = document.getElementById('projectSpecificationUnitPrice' + passIndex).value;
    if (vali_unit != 0) {

      if ( !vali_unit.match(/^[0-9\.]+$/) ) {

        alert('半角数字以外を入力しないで下さい。');
        return false
      }
      let copyProjects = Object.assign([], this.state.quote_projects);
      let totalCost = 0;
      copyProjects.forEach((project, index) => {

        passIndex === index ? project.unit_price = Number(document.getElementById('projectSpecificationUnitPrice' + passIndex).value) : null
        passIndex === index ? project.price = Number(project.unit_price) * Number(project.unit) : null
        totalCost = totalCost + Number(project.price);
      })
      totalCost = totalCost - Number(this.state.discount);
      this.setState({ quote_projects: copyProjects, total_cost: totalCost });
    } else {

      let copyProjects = Object.assign([], this.state.quote_projects);
      let totalCost = 0;
      copyProjects.forEach((project, index) => {

        passIndex === index ? project.unit_price = '' : null
        passIndex === index ? project.price = Number(project.unit_price) * 0 : null
        totalCost = totalCost + Number(project.price);
      })
      totalCost = totalCost - Number(this.state.discount);
      this.setState({ quote_projects: copyProjects, total_cost: totalCost });
    }
  }

  /**
   * Unitを変更する
   *
   */
  _changeUnit = (passIndex) => {

    const vali_unit = document.getElementById('projectSpecificationUnit' + passIndex).value;
    if (vali_unit != 0) {

      if ( !vali_unit.match(/^[0-9]+$/) ) {

        alert('半角数字以外を入力しないで下さい。');
        return false
      }
      let copyProjects = Object.assign([], this.state.quote_projects);
      let totalCost = 0;
      copyProjects.forEach((project, index) => {

        passIndex === index ? project.unit = Number(document.getElementById('projectSpecificationUnit' + passIndex).value) : null
        passIndex === index ? project.price = Number(project.unit_price) * project.unit : null
        totalCost = totalCost + Number(project.price);
      })
        totalCost = totalCost - Number(this.state.discount);
      this.setState({ quote_projects: copyProjects, total_cost: totalCost });
    } else {

      let copyProjects = Object.assign([], this.state.quote_projects);
      let totalCost = 0;
      copyProjects.forEach((project, index) => {

        passIndex === index ? project.unit = '' : null
        passIndex === index ? project.price = Number(project.unit_price) * 0 : null
        totalCost = totalCost + Number(project.price);
      })
        totalCost = totalCost - Number(this.state.discount);
      this.setState({ quote_projects: copyProjects, total_cost: totalCost });
    }

  }
  /**
   *
   *
   */
  _changeName = (passIndex) => {

    let copyProjects = Object.assign([], this.state.quote_projects);
    copyProjects.forEach((project, index) => {

      passIndex === index ? project.name = document.getElementById('projectSpecificationName' + passIndex).value : null
    })
    this.setState({ quote_projects: copyProjects });
  }

  /**
   *
   *
   */
  _changeRemarks = (passIndex) => {

    let copyProjects = Object.assign([], this.state.quote_projects);
    copyProjects.forEach((project, index) => {

      passIndex === index ? project.remarks = document.getElementById('projectSpecificationRemarks' + passIndex).value : null
    })
    this.setState({ quote_projects: copyProjects });
  }

  /**
   * 値引き金額を変更
   *
   */
  _changeDiscount = () => {

    const refDiscount = Number(this.refs.discount.value);
    let copyProjects = Object.assign([], this.state.quote_projects);
    let totalCost = 0;
    copyProjects.map((project) => {

      totalCost = totalCost + Number(project.price);
    });
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
        <h1 className='l-dashboard__heading'>案件作成</h1>
        <div className='c-form-label u-mt-30'>
          <label htmlFor='quote_name'>案件タイトル</label>
          <span className='c-form__required u-ml-10'>必須</span>
        </div>
        <input placeholder='案件タイトル' className='c-form-text' required='required' autoComplete='off' spellCheck='false' type='text' ref='subject' defaultValue={this.props.quote.subject} />
        <div className='c-form-label u-mt-30'>
          <label htmlFor='quote_company_division_client_id'>お客様情報</label>
        </div>
        { this.state.client ?
          <div className='c-attention'>
            <div>会社名: {this.state.company.name}</div>
            <div className='u-mt-10'>部署名: {this.state.division.name || '部署名なし'}</div>
            <div className='u-mt-10'>担当者名: {this.state.client.name || '担当者なし'}</div>
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
        <div className={ 'c-form-label u-mt-30' }>
          <label>売り上げ部署情報</label>
        </div>
        { this.state.home_division !== null ?
          <div className={ 'c-attention' }>
            <div className={ 'u-mt-10' }>部署名:{ this.state.home_division.name }</div>
          </div>
          :
          null
        }
        <div className={ 'u-mt-10' }>
          <HomeDivision applyHomeDivision={ ::this.applyHomeDivision } />
        </div>
        <div className='u-mt-30 c-table'>
          <table>
            <tbody>
              <tr>
                <td className='u-fw-bold'>案件作成日</td>
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
                      <input name='deliver_type' type='radio' defaultChecked={this.state.quote.deliver_type == 'seat' || this.state.quote.deliver_type === null} onChange={() => this.setState({deliver_type: 'seat'})} className='c-form-radio' />
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
                      <input name='deliver_type' type='radio' defaultChecked={this.state.deliver_type == 'bizstant'} onChange={() => this.setState({deliver_type: 'bizstant'})} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>ビジスタント部</span>
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
                    <select className='c-form-select' ref='channel' defaultValue={this.state.channel}>
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
                    <select className='c-form-select' ref='quote_type' defaultValue={this.state.quote_type}>
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
                <th>備考</th>
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
                            <td><textarea className={ 'c-form-textarea__work-show-input__textarea2' } type='textarea' id={ 'projectSpecificationName' + index } value={ specification.name } onChange={ e => this._changeName(index) } /></td>
                            <td><textarea className={ 'c-form-textarea__work-show-input__textarea2' } type='textarea' id={ 'projectSpecificationRemarks' + index } value={ specification.remarks } onChange={ e => this._changeRemarks(index)} /></td>
                            <td><input className={ 'c-form-text' } type='number' step='0.1' id={ 'projectSpecificationUnitPrice' + index } value={ specification.unit_price } onChange={ e => this._changeUnitPrice(index) } /></td>
                            <td><input className={ 'c-form-text' } type='number' id={ 'projectSpecificationUnit' + index } value={ specification.unit } onChange={ e => this._changeUnit(index) } /></td>
                            <td><input readOnly className={ 'c-form-text' } type='text' id={ 'projectSpecificationPrice' + index } value={ specification.price } /></td>
                            <td><button className={ 'c-btnMain2-primaryA' } onClick={ e => this._projectDestroy(index, specification.name) }>ー</button></td>
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
                        console.log(specification)
                        const key = 'project-' + index;
                        return (
                          <tr {...{key}}>
                            <td><textarea className={ 'c-form-textarea__work-show-input__textarea2' } type='text' id={ 'projectSpecificationName' + index } value={ specification.name } onChange={ e => this._changeName(index) } /></td>
                            <td><textarea className={ 'c-form-textarea__work-show-input__textarea2' } type='textarea' id={ 'projectSpecificationRemarks' + index } value={ specification.remarks } onChange={ e => this._changeRemarks(index)} /></td>
                            <td className={ 'u-va-top' }><input className={ 'c-form-text' } type='number' step='0.1' id={ 'projectSpecificationUnitPrice' + index } value={ specification.unit_price } onChange={ e => this._changeUnitPrice(index) } /></td>
                            <td className={ 'u-va-top' }><input className={ 'c-form-text' } type='number' id={ 'projectSpecificationUnit' + index } value={ specification.unit } onChange={ e => this._changeUnit(index) } /></td>
                            <td className={ 'u-va-top' }><input readOnly className={ 'c-form-text' } type='text' id={ 'projectSpecificationPrice' + index } value={ specification.price } /></td>
                            <td className={ 'u-va-top' }><button className={ 'c-btnMain2-primaryA' } onClick={ e => this._projectDestroy(index, specification.name) }>ー</button></td>
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
                      <input name='discount_from_button' type='radio' defaultChecked={ this.state.discount === 0 || this.state.discount === null } onChange={::this.discount_from_close} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>値引きなし</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-15'>
                      <input name='discount_from_button' type='radio' defaultChecked={ this.state.discount > 0 } onChange={::this.discount_from_open} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>値引きあり</span>
                    </label>
                  </div>
                  <div className='u-mt-15'>
                    { this.state.show ?
                      <textarea placeholder='2000' className='c-form-textarea' onChange={ e  => this._changeDiscount() } type='text' ref='discount' defaultValue={ this.state.discount }></textarea>
                      : null
                    }
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>課税対象</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='tax_type' defaultValue={this.state.tax_type}>
                      { Object.keys(TAX_TYPES).map((item, index) => {
                        const key = 'tax-'+index;
                        return (
                          <option {...{key}} value={TAX_TYPES[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>税率
                </td>
                <td>
                  <div className='u-mt-15'>
                    <label className='c-form-radioLabel'>
                      <input name='tax' type='radio' defaultChecked={this.state.quote.tax == 1.08 || this.state.quote.tax === null} onChange={() => this.setState({tax: 1.08})} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>8％</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-15'>
                      <input name='tax' type='radio' defaultChecked={this.state.quote.tax == 1.10 || this.state.quote.tax === null} onChange={() => this.setState({tax: 1.10})} className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>10%</span>
                    </label>
                  </div>
                  <div className='u-mt-15'>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>支払い方法</td>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' ref='payment_terms' defaultValue={this.state.payment_terms}>
                      { Object.keys(PAYMENT_TERMS).map((item, index) => {
                        const key = 'payment-'+index;
                        return (
                          <option {...{key}} value={PAYMENT_TERMS[item]}>{item}</option>
                        );
                      })}
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>合計金額</td>
                <td>
                  <textarea readOnly placeholder='合計金額' className='c-form-textarea' autoComplete='off' spellCheck='false' type='text' ref='total_cost' value={ this.state.total_cost }></textarea>
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
        <React.Fragment>
          <div className='c-overlay-submit'>
            { this.props.quote.id ?
              <div>
                <div className='c-btnMain-standard c-btn-blue' onClick={::this.onSubmit}>更新する</div>
                <a className='c-btnMain-standard c-btn-blue u-ml-30' href={'/quotes/' + this.props.quote.id + '/wicked_pdf'} target="_blank">見積書ダウンロード</a>
                { this.props.work == null?
                  <a class='c-btnMain-standard c-btn-orange u-ml-30' rel="nofollow" data-method="post" href={'/quotes/' + this.props.quote.id +'/status?status=working'}>作業書作成</a>
                  :
                  <a class='c-btnMain-standard c-btn-blue u-ml-30' href={'/works/' + this.props.work.id}>作業書</a>
                }
                <a class='c-btnMain-standard c-btn-blue u-ml-30' href={'/activities?name=' + this.props.quote.id} >活動履歴</a>
                { this.props.task == null?
                  null
                  :
                  <a class='c-btnMain-standard c-btn-blue u-ml-30' href={'/tasks/' + this.props.task.id}>チャット</a>
                }
              </div>
              :
              <div className='c-btnMain-standard c-btn-blue' onClick={::this.onSubmit}>作成する</div>
            }
          </div>
        </React.Fragment>
      </div>
    );
  }
}
