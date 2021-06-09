import { KeyBindingUtil } from 'draft-js';
import React from 'react'

// Ajax
import Request from 'superagent'
import { PREFECTURES } from './properties.es6'
import { APPROVAL_STATUS } from './properties.es6'
import { ONLINE_WEB_BUSINESS_CARD } from './properties.es6'
require('superagent-rails-csrf')(Request);

/**
 *  @version 2018/06/10
 */
export default class CompanyEdit extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    this.state = {
      companies: this.props.companies,
      company: this.props.company,
      divisions: this.props.divisions,
      division: this.props.division || '',
      clients: this.props.clients || '',
      show_modal: false,
    };
  }

  /**
   *  モーダル開く
   *  @version 2021/04/08
   */
  _openModal(client_id){
    this.setState({show_modal: true})
  }

    /**
   *  モーダル閉じる
   *  @version 2021/04/08
   */
  _closeModal(client_id){
    this.setState({show_modal: false})
  }

    /**
   *
   * @version 2019/12/20
   *
   */
  setDivisionName = (e) =>  {
    const new_division = Object.assign(this.state.division)
    new_division.name = e.target.value
    this.setState({division: new_division})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
  setDivisionKana = (e) =>  {
    const new_division = Object.assign(this.state.division)
    new_division.kana = e.target.value
    this.setState({division: new_division})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
  setDivisionZip = (e) =>  {
    const new_division = Object.assign(this.state.division)
    new_division.zip = e.target.value
    this.setState({division: new_division})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
  setDivisionPrefecture = (e) =>  {
    const new_division = Object.assign(this.state.division)
    new_division.prefecture_id = e.target.value
    this.setState({division: new_division})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
  setDivisionAddress1 = (e) =>  {
    const new_division = Object.assign(this.state.division)
    new_division.address1 = e.target.value
    this.setState({division: new_division})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
  setDivisionAddress2 = (e) =>  {
    const new_division = Object.assign(this.state.division)
    new_division.address2 = e.target.value
    this.setState({division: new_division})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
    setDivisionNote = (e) =>  {
    const new_division = Object.assign(this.state.division)
    new_division.note = e.target.value
    this.setState({division: new_division})
   }

       /**
   *
   * @version 2019/12/20
   *
   */
  setClientName = (e) =>  {
    const new_clients = Object.assign(this.state.clients)
    new_clients.name = e.target.value
    this.setState({clients: new_clients})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
  setClientKana = (e) =>  {
    const new_clients = Object.assign(this.state.clients)
    new_clients.kana = e.target.value
    this.setState({clients: new_clients})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
  setClientTitle = (e) =>  {
    const new_clients = Object.assign(this.state.clients)
    new_clients.title = e.target.value
    this.setState({clients: new_clients})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
  setClientTel = (e) =>  {
    const new_clients = Object.assign(this.state.clients)
    new_clients.tel = e.target.value
    this.setState({clients: new_clients})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
  setClientMail = (e) =>  {
    const new_clients = Object.assign(this.state.clients)
    new_clients.email = e.target.value
    this.setState({clients: new_clients})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
  setClientPassword = (e) =>  {
    const new_clients = Object.assign(this.state.clients)
    new_clients.password = e.target.value
    this.setState({clients: new_clients})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
  setClientPasswordConfirmation = (e) =>  {
    const new_clients = Object.assign(this.state.clients)
    new_clients.password = e.target.value
    this.setState({clients: new_clients})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
  setClientUserType = (e) =>  {
    const new_clients = Object.assign(this.state.clients)
    new_clients.user_type = e.target.value
    this.setState({clients: new_clients})
   }



    /**
   *
   * @version 2019/12/20
   *
   */
  setClientNote = (e) =>  {
    const new_clients = Object.assign(this.state.clients)
    new_clients.note = e.target.value
    this.setState({clients: new_clients})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
  setCompanyName = (e) =>  {
    const new_companies = Object.assign(this.state.company)
    new_companies.name = e.target.value
    this.setState({company: new_companies})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
  setCompanyKana = (e) =>  {
    const new_companies = Object.assign(this.state.company)
    new_companies.kana = e.target.value
    this.setState({company: new_companies})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
  setCompanyApprovalStatus = (e) =>  {
    const new_companies = Object.assign(this.state.company)
    new_companies.approval_status = e.target.value
    this.setState({company: new_companies})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
  setCompanyOnlineWebBusinessCard = (e) =>  {
    const new_companies = Object.assign(this.state.company)
    new_companies.online_web_business_card = e.target.value
    this.setState({company: new_companies})
   }

    /**
   *
   * @version 2019/12/20
   *
   */
  setCompanyNote = (e) =>  {
    const new_companies = Object.assign(this.state.company)
    new_companies.note = e.target.value
    this.setState({company: new_companies})
   }

    /**
   * 担当者作成
   * @versions 2019/12/27
   */
    onClientCreate = e => {
      e.preventDefault();

      const field = new FormData();
      field.append('company[name]', this.state.company.name);
      field.append('company[kana]', this.state.company.kana);
      field.append('company[approval_status]', this.state.company.approval_status);
      field.append('company[online_web_business_card]', this.state.company.online_web_business_card);
      field.append('company[note]', this.state.company.note);
      //新規作成時に部署も作成させる
      field.append('company_division[company_id]', this.props.company.id);
      field.append('company_division[name]', this.state.division.name);
      field.append('company_division[kana]', this.state.division.kana);
      field.append('company_division[zip]', this.state.division.zip);
      field.append('company_division[prefecture_id]', this.state.division.prefecture_id);
      field.append('company_division[address1]', this.state.division.address1);
      field.append('company_division[address2]', this.state.division.address2);
      field.append('company_division[note]', this.state.division.note);
      //新規作成時に担当者も作成させる
      field.append('company_division_client[company_division_id]', '');
      field.append('company_division_client[user_id]', this.state.clients.user_id);
      field.append('company_division_client[name]', this.state.clients.name);
      field.append('company_division_client[kana]', this.state.clients.kana);
      field.append('company_division_client[title]', this.state.clients.title);
      field.append('company_division_client[tel]', this.state.clients.tel);
      field.append('company_division_client[email]', this.state.clients.email);
      field.append('company_division_client[password]', this.state.clients.password);
      field.append('company_division_client[password_confirmation]', this.state.clients.password);
      field.append('company_division_client[user_type]', this.state.clients.user_type);
      field.append('company_division_client[note]', this.state.clients.note); 

      const url = '/companies';
      const request = window.xhrRequest.post(url, field);
      request.then(res => {

        
        location.reload()
      }).catch(err => {

        window.mf_like_modal({ icon: 'error', message: err });
      });
    };

      /**
     * 担当者更新
     * @versions 2019/12/27
     */
    onClientUpdate = e => {

      e.preventDefault();

      const field = new FormData();
      field.append('company[name]', this.state.company.name);
      field.append('company[kana]', this.state.company.kana);
      field.append('company[approval_status]', this.state.company.approval_status);
      field.append('company[online_web_business_card]', this.state.company.online_web_business_card);
      field.append('company[note]', this.state.company.note);

      const url = '/companies/' + this.state.company.id;
      const request = window.xhrRequest.put(url, field);
      request.then(res => {
      
        location.reload()
      }).catch(err => {

        window.mf_like_modal({ icon: 'error', message: err });
      });
    };





  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render () {
    return (
      <div>
        { this.state.show_modal ?
          <div className='c-overlay-edit'>
            <div className='c-overlay-content'>
              <div className='u-px-25'>
                <form class="u-mt-30" id="new_company" action="/companies" accept-charset="UTF-8" method="post"/>
                  <div>
                    <div>
                      <h2 class="l-dashboard__heading">会社</h2>
                      <div class="c-form-label">
                        <label>会社名</label>
                        <span class="u-ml-10 c-form__required">必須</span>
                      </div>
                      <input placeholder="会社名を入力してください" class="c-form-text u-mb-30" required="required" autocomplete="off" type="text" name="company[name]" id="company_name" defaultValue={this.state.company.name} onChange={this.setCompanyName} />
                      <div class="c-form-label">
                        <label>会社名(カナ)</label>
                        <span class="u-ml-10 c-form__required">必須</span>
                      </div>
                      <input placeholder="カイシャメイを入力してください" class="c-form-text u-mb-30" required="required" autocomplete="off" type="text" name="company[kana]" id="company_kana" defaultValue={this.state.company.kana} onChange={this.setCompanyKana} />
                      <div className='c-form-label'>
                        <label>名刺承認機能</label>
                        <span className='u-ml-10 c-form__required'>必須</span>
                      </div>
                      <div className='c-form-selectWrap u-mb-30'>
                        <select name='approval_status' className='c-form-select' defaultValue={ this.props.company.approval_status } onChange={this.setCompanyApprovalStatus}>
                          <option value='nothing'>なし</option>
                          <option value='approval'>あり</option>
                        </select>
                      </div>
                      <div className='c-form-label'>
                        <label>オンラインWeb名刺機能</label>
                        <span className='u-ml-10 c-form__required'>必須</span>
                      </div>
                      <div className='c-form-selectWrap u-mb-30'>
                        <select name='online_web_business_card' className='c-form-select' defaultValue={ this.props.company.online_web_business_card } onChange={this.setCompanyOnlineWebBusinessCard}>
                          <option value='disabled'>なし</option>
                          <option value='enabled'>あり</option>
                        </select>
                      </div>
                      <div class="c-form-label">
                        <label>メモ</label>
                      </div>
                      <input placeholder="メモを入力してください" class="c-form-text u-mb-30" autocomplete="off" type="text" name="company[note]" id="company_note" defaultValue={this.state.company.note} onChange={this.setCompanyNote} />
                    </div>
                    { this.state.company.id == null ?
                      <div>
                        <h2 class="l-dashboard__heading">部署</h2>
                        <div class="c-form-label">
                          <label>部署名</label>
                          <span class="u-ml-10 c-form__required">必須</span>
                        </div>
                        <input placeholder="部署名を入力してください" class="c-form-text u-mb-30" required="required" autocomplete="off" type="text" name="company_division[name]" id="company_division_name" defaultValue={this.state.division.name} onChange={this.setDivisionName} />
                        <div class="c-form-label">
                          <label>部署名(カナ)</label>
                        </div>
                        <input placeholder="ブショメイ" class="c-form-text u-mb-30" autocomplete="off" type="text" name="company_division[kana]" id="company_division_kana" defaultValue={this.state.division.kana} onChange={this.setDivisionKana} />
                        <div class="c-form-label">
                          <label>郵便番号</label>
                          <span class="u-ml-10 c-form__required">必須</span>
                        </div>
                        <input placeholder="102-0001" class="c-form-text u-mb-30" required="required" autocomplete="off" type="text" name="company_division[zip]" id="company_division_zip" defaultValue={this.state.division.zip} onChange={this.setDivisionZip} />
                        <div className='c-form-label'>
                          <label>都道府県</label>
                          <span className='u-ml-10 c-form__required'>必須</span>
                        </div>
                        <div className='c-form-selectWrap u-mb-30'>
                          <select name='prefecture_id' className='c-form-select' defaultValue={ this.props.division.prefecture_id } onChange={this.setDivisionPrefecture}>
                            { Object.keys(PREFECTURES).map((item, index) => {
                              const key = 'channel-'+index;
                              return (
                                <option {...{key}} value={index}>{PREFECTURES[item]}</option>
                              );
                            })}
                          </select>
                        </div>
                        <div class="c-form-label">
                          <label>住所1</label>
                          <span class="u-ml-10 c-form__required">必須</span>
                        </div>
                        <input placeholder="住所1を入力してください" class="c-form-text u-mb-30" required="required" autocomplete="off" type="text" name="company_division[address1]" id="company_division_address1" defaultValue={this.state.division.address1} onChange={this.setDivisionAddress1} />
                        <div class="c-form-label">
                          <label>住所2</label>
                        </div>
                        <input placeholder="住所2を入力してください" class="c-form-text u-mb-30" autocomplete="off" type="text" name="company_division[address2]" id="company_division_address2" defaultValue={this.state.division.address2} onChange={this.setDivisionAddress2} />
                        <div class="c-form-label">
                          <label>メモ</label>
                        </div>
                        <input placeholder="メモを入力してください" class="c-form-text u-mb-30" autocomplete="off" type="text" name="company_division[note]" id="company_division_note" defaultValue={this.state.division.note} onChange={this.setDivisionNote} />
                        <h2 class="l-dashboard__heading"> 担当者</h2>
                        <div class="c-form-label">
                          <label>氏名</label>
                          <span class="u-ml-10 c-form__required">必須</span>
                        </div>
                        <input placeholder="氏名" class="c-form-text u-mb-30" required="required" autocomplete="off" spellcheck="false" type="text" name="company_division_client[name]" id="company_division_client_name" onChange={this.setClientName} />
                        <div class="c-form-label">
                          <label for="company_division_client_kana">氏名(カナ)</label>
                        </div>
                        <input placeholder="氏名(カナ)" class="c-form-text u-mb-30" autocomplete="off" spellcheck="false" type="text" name="company_division_client[kana]" id="company_division_client_kana" onChange={this.setClientKana} ></input>
                        <div class="c-form-label">
                          <label for="company_division_client_title">敬称</label>
                        </div>
                        <select class="c-form-select u-mb-30" name="company_division_client[title]" id="company_division_client_title" onChange={this.setClientTitle}>
                          <option selected="selected" value="honorific">様</option>
                          <option value="normal">さん</option>
                        </select>
                        <div class="c-form-label">
                          <label for="company_division_client_tel">電話番号</label>
                          <span class="c-form__recommend u-ml-10">入力推奨</span>
                        </div>
                        <input placeholder="電話番号" class="c-form-text u-mb-30" autocomplete="off" spellcheck="false" type="text" name="company_division_client[tel]" id="company_division_client_tel"  onChange={this.setClientTel}/>
                        <div class="c-form-label">
                          <label for="company_division_client_tel">メールアドレス</label>
                          <span class="c-form__recommend u-ml-10">入力推奨</span>
                        </div>
                        <input placeholder="メールアドレス" class="c-form-text u-mb-30" required="required" autocomplete="off" spellcheck="false" type="text" name="company_division_client[email]" id="company_division_client_email"　onChange={this.setClientMail} />
                        <div class="c-form-label">
                          <label for="company_division_client_tel">パスワード</label>
                          <span class="c-form__recommend u-ml-10">入力推奨</span>
                        </div>
                        <input placeholder="変更しない場合は入力をしないでください" class="c-form-text u-mb-30" type="password" name="company_division_client[password]" id="company_division_client_password" onChange={this.setClientPassword}/>
                        <div class="c-form-label">
                          <label for="company_division_client_tel">パスワード(確認)</label>
                          <span class="c-form__recommend u-ml-10">入力推奨</span>
                        </div>
                        <input placeholder="変更しない場合は入力をしないでください" class="c-form-text u-mb-30" type="password" name="company_division_client[password_confirmation]" id="company_division_client_password_confirmation" onChange={this.setClientPasswordConfirmation}/>
                        <div class="c-form-label">
                          <label for="company_division_client_user_type">ユーザータイプ</label>
                        </div>
                        <div class="c-form-selectWrap u-mb-30">
                          <select class="c-form-select" name="company_division_client[user_type]" id="company_division_client_user_type" onChange={this.setClientUserType}>
                            <option selected="selected" value="general">一般</option>
                            <option value="division">部署</option>
                            <option value="admin">管理者</option>
                            <option value="jii">日本工業社管理</option>
                            <option value="card_manager">名刺担当者</option>
                          </select>
                        </div>
                        <div class="c-form-label"> 
                          <label for="company_division_client_note">メモ</label>
                        </div>
                        <textarea placeholder="メモを入力してください" class="c-form-textarea u-mb-30" rows="4" autocomplete="off" spellcheck="false" name="company_division_client[note]" id="company_division_client_note" onChange={this.setClientNote}/>
                      </div>
                      :
                      null
                    }
                  </div>
                  <div class="c-flex__center">
                    { this.state.company.id == null ?
                      <input type="submit" name="commit" value='作成する' class='c-btnMain c-btn-blue' onClick={ this.onClientCreate }/>
                      : 
                      <input type="submit" name="commit" value='更新する' class='c-btnMain c-btn-blue' onClick={ this.onClientUpdate }/>
                    }
                  </div>
              </div>
                <svg class=" u-svg-l " onClick={(client_id) => {this._closeModal(client_id)}}>
                  <use href="#application-close"/>
                </svg>
            </div>
          </div>
          :
          <div> 
            { this.state.company.id == null ?
              <div>
                <button className='c-btnMain c-btn-blue' onClick={(client_id) => {this._openModal(client_id)}}>取引先会社を作成する</button>
              </div>
            :
              <div>
                  <svg class=" u-svg-s " onClick={(client_id) => {this._openModal(client_id)}}>
                    <use href="#application-detail_item"/>
                  </svg>
              </div>
            }
        </div>
        }
      </div>
    );
  }
}
