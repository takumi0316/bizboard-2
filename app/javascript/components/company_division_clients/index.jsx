import { KeyBindingUtil } from 'draft-js';
import React from 'react'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

/**
 *  @version 2018/06/10
 */
export default class Company_Division_Clients extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    this.state = {
      companies: this.props.companies,
      divisions: this.props.divisions,
      users: this.props.users,
      current_user_id: this.props.current_user_id,
      clients: this.props.clients || '',
      division: this.props.division || '',
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
  setClientdivison = (e) => {
    const new_clients = Object.assign(this.state.clients)
    new_clients.company_division_id = e.target.value
    this.setState({clients: new_clients})
  }

    /**
   *
   * @version 2019/12/20
   *
   */
    setClientUser = (e) => {
      const new_clients = Object.assign(this.state.clients)
      new_clients.user_id = e.target.value
      this.setState({clients: new_clients})
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
   * 担当者作成
   * @versions 2019/12/27
   */
    onClientCreate = e => {
      e.preventDefault();

      const field = new FormData();
      field.append('company_division_client[company_division_id]', this.props.division.id);
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

      const url = '/company_division_clients';
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
      field.append('company_division_client[company_division_id]', this.state.clients.company_division_id);
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


      const url = '/company_division_clients/' + this.props.clients.id;
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
                <form class="u-mt-30" id="new_company_division_client" action="/company_division_clients" accept-charset="UTF-8" method="post"/>
                  { this.state.clients.company_division_id == null ?
                    <div>
                      <h2 class="l-dashboard__heading">担当者</h2>
                      <div className='c-form-label'>
                        <label>会社</label>
                        <span className='u-ml-10 c-form__required'>必須</span>
                      </div>
                      <div className='c-form-selectWrap u-mb-30'>
                        <select name='company_id' className='c-form-select' defaultValue={ this.props.division.company_id } disabled>
                          <option value='nothing'>会社名を選択してください</option>
                            { this.props.companies.map((company, index) => {
                              const key = `company-${index}`;
                              return (
                                <option {...{key}} value={ company.id }>{ company.name }</option>
                              );
                            })}
                        </select>
                      </div>
                      <div className='c-form-label'>
                        <label>部署</label>
                        <span className='u-ml-10 c-form__required'>必須</span>
                      </div>
                      <div className='u-mb-30 c-form-selectWrap'>
                        <select className='c-form-select' defaultValue={ this.props.division.id } required='required' name='company_division_client[company_division_id]' disabled>
                          { this.state.divisions.map((division, index) => {
                            const key = `division-${index}`;
                            return (
                              <option { ...{key} } value={ division.id }>{ division.name || '部署名なし' }</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  : 
                    <div>
                      <h2 class="l-dashboard__heading">担当者</h2>
                      <div className='c-form-label'>
                        <label>会社</label>
                        <span className='u-ml-10 c-form__required'>必須</span>
                      </div>
                      <div className='c-form-selectWrap u-mb-30'>
                        <select name='company_id' className='c-form-select' defaultValue={ this.props.division.company_id } >
                          <option value='nothing'>会社名を選択してください</option>
                            { this.props.companies.map((company, index) => {
                              const key = `company-${index}`;
                              return (
                                <option {...{key}} value={ company.id }>{ company.name }</option>
                              );
                            })}
                        </select>
                      </div>
                      <div className='c-form-label'>
                        <label>部署</label>
                        <span className='u-ml-10 c-form__required'>必須</span>
                      </div>
                      <div className='u-mb-30 c-form-selectWrap'>
                        <select className='c-form-select' defaultValue={ this.props.division.id } onChange={this.setClientdivison} required='required' name='company_division_client[company_division_id]'>
                          { this.state.divisions.map((division, index) => {
                            const key = `division-${index}`;
                            return (
                              <option { ...{key} } value={ division.id }>{ division.name || '部署名なし' }</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  }
                  <div class="c-form-label">
                    <label>自社担当者</label>
                    <span class="u-ml-10 c-form__required">必須</span>
                  </div>
                  <div class="u-mb-30 c-form-selectWrap">
                    <select class="c-form-select" defaultValue={ this.props.current_user_id } onChange={this.setClientUser} required="required" name="company_division_client[user_id]" id="company_division_client_user_id" >
                    { this.state.users.map((user, index) => {
                        const key = `user-${index}`;
                        return (
                          <option { ...{key} } value={ user.id }>{ user.name || '弊社担当者なし' }</option>
                        );
                      })}
                    </select>
                  </div>
                  <div class="c-form-label">
                    <label>氏名</label>
                    <span class="u-ml-10 c-form__required">必須</span>
                  </div>
                  <input placeholder="氏名" class="c-form-text u-mb-30" required="required" autocomplete="off" spellcheck="false" type="text" name="company_division_client[name]" id="company_division_client_name" defaultValue={this.state.clients.name} onChange={this.setClientName} />
                  <div class="c-form-label">
                    <label for="company_division_client_kana">氏名(カナ)</label>
                  </div>
                  <input placeholder="氏名(カナ)" class="c-form-text u-mb-30" autocomplete="off" spellcheck="false" type="text" name="company_division_client[kana]" id="company_division_client_kana" defaultValue={ this.state.clients.kana } onChange={this.setClientKana} ></input>
                  <div class="c-form-label">
                    <label for="company_division_client_title">敬称</label>
                  </div>
                  <select class="c-form-select u-mb-30" name="company_division_client[title]" id="company_division_client_title" defaultValue={ this.state.clients.tel } onChange={this.setClientTitle}>
                    <option selected="selected" value="honorific">様</option>
                    <option value="normal">さん</option>
                  </select>
                  <div class="c-form-label">
                    <label for="company_division_client_tel">電話番号</label>
                    <span class="c-form__recommend u-ml-10">入力推奨</span>
                  </div>
                  <input placeholder="電話番号" class="c-form-text u-mb-30" autocomplete="off" spellcheck="false" type="text" name="company_division_client[tel]" id="company_division_client_tel" defaultValue={ this.state.clients.tel } onChange={this.setClientTel}/>
                  <div class="c-form-label">
                    <label for="company_division_client_tel">メールアドレス</label>
                    <span class="c-form__recommend u-ml-10">入力推奨</span>
                  </div>
                  <input placeholder="メールアドレス" class="c-form-text u-mb-30" required="required" autocomplete="off" spellcheck="false" type="text" name="company_division_client[email]" id="company_division_client_email" defaultValue={ this.state.clients.email }　onChange={this.setClientMail} />
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
                    <select class="c-form-select" name="company_division_client[user_type]" id="company_division_client_user_type" defaultValue={ this.state.clients.user_type } onChange={this.setClientUserType}>
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
                  <textarea placeholder="メモを入力してください" class="c-form-textarea u-mb-30" rows="4" autocomplete="off" spellcheck="false" name="company_division_client[note]" id="company_division_client_note" defaultValue={ this.state.clients.note } onChange={this.setClientNote}/>
                  <div class="c-flex__center">
                  { this.state.clients.company_division_id == null ?
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
          { this.state.clients.company_division_id == null ?
            <div>
              <button className='c-btnMain c-btn-blue' onClick={(client_id) => {this._openModal(client_id)}}>担当者を追加</button>
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
