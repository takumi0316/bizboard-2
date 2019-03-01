import React from 'react'
import Style from './style.sass'
import Icon  from 'react-evil-icons'
import CompanyDivisions from '../../company_divisions'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

/**
 *  @version 2018/06/10
 */
export default class ClientSearch extends React.Component {
  
  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    // キーバインドイベントを一時保存用
    this.previousKeyDownEvent = null;

    this.state = {
      show: false,
      show_create_form: false,
      clients: [],
    };
  }
  

  /**
   *  モーダルを表示する
   *  @version 2018/06/10
   */
  _open() {

    this._search('');

    this.setState({ show: true }, () => {

    });
  }

  /**
   *  モーダルを閉じる
   *  @version 2018/06/10
   */
  _close() {

    this.setState({ show: false, show_create_form: false, clients: [] });
  }

  _onChange() {

    if (this.refs.word.value == '') {

      this.setState({clients: []});
      return false
    }

    this._search(this.refs.word.value);
  }

  /**
   *  フリーワード検索
   *  @version 2018/06/10
   */
  _search(search) {

    // 記事内容を送信
    Request.get('/company_division_clients.json?search=' + search)
      .end((error, response) => {

        if (error) return false;
        this.setState({clients: response.body.clients});
      });
  }

  /**
   *  日時を適用する
   *  @version 2018/06/10
   */
  _apply(e) {

    e.stopPropagation();

    let client = {};

    this.props.apply({ client: client });

    this.setState({ show: false });
  }

  /**
   *  親要素のクリックイベントを引き継がない
   *  @version 2018/06/10
   */
  _stopPropagation(event) {

    event.stopPropagation();
  }
  
  /**
   *  選択時
   *  @version 2018/06/10
   */
  _onSelect(e) {

    const client = this.state.clients[e.target.dataset.number];

    this.props.applyClient(client);
    this._close();
  }

  /**
   *  担当者作成
   *  @version 2018/06/10
   */
  createView() {

    this.setState({show_create_form: true});
  }

  /**
   *  担当者を作成する
   *  @version 2018/06/10
   */
  createClient() {

    const resources = this.refs.company_divisions.getResources();

    console.log('resources', resources);

    // 担当者内容を送信
    Request.post('/company_division_clients')
      .field({
        'company_division_client[company_division_id]': resources.company_division_id,
        'company_division_client[user_id]':             this.refs.user_id.value,
        'company_division_client[name]':                this.refs.name.value,
        'company_division_client[kana]':                this.refs.kana.value,
        'company_division_client[title]':               this.refs.title.value,
        'company_division_client[tel]':                 this.refs.tel.value,
        'company_division_client[email]':               this.refs.email.value,
        'company_division_client[note]':                this.refs.note.value,
      })
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((error, response) => {
        
        if (response.body.status == 'success' && response.body.client.id) {

          let client = response.body.client;
          client.company = response.body.company;
          client.division = response.body.division;

          this.props.applyClient();
          this._close();

        } else {

          alert('担当者の保存に失敗しました。');
        }
      });
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render () {

    return (this.state.show ?
      <div className={Style.ClientSearch} onClick={::this._close}>

        <div className={Style.ClientSearch__inner} onClick={this._stopPropagation}>

          { this.state.show_create_form ?
            <div>
              <CompanyDivisions companies={this.props.companies || []} ref='company_divisions' />

              <div className='c-form-label'>
                <label htmlFor='company_division_client_user_id'>自社担当者</label>
                <span className='c-form__required u-ml-10'>必須</span>
              </div>
              <select ref='user_id' className='c-form-select' required='required'>
                { this.props.users.map((user, index) => {
                  const key = `user-${index}`;
                  return (
                    <option {...{key}} value={user.id}>{user.name}</option>
                  );
                })}
              </select>

              <div className='c-form-label'>
                <label htmlFor='company_division_client_name'>氏名</label>
                <span className='c-form__required u-ml-10'>必須</span>
              </div>
              <input ref='name' placeholder='氏名' className='c-form-text' required='required' autoComplete='off' spellCheck='false' type='text' defaultValue='' />
            
              <div className='c-form-label'>
                <label htmlFor='company_division_client_kana'>氏名(カナ)</label>
                <span className='c-form__required u-ml-10'>必須</span>
              </div>
              <input ref='kana' placeholder='氏名(カナ)' className='c-form-text' required='required' autoComplete='off' spellCheck='false' type='text' defaultValue='' />

              <div className='c-form-label'>
                <label htmlFor='company_division_client_title'>敬称</label>
              </div>
              <select ref='title' defaultValue='honorific' className='c-form-select'>
                <option value='nothing'>なし</option>
                <option value='honorific'>様</option>
                <option value='normal'>さん</option>
              </select>

              <div className='c-form-label'>
                <label htmlFor='company_division_client_tel'>電話番号</label>
              </div>
              <input ref='tel' placeholder='電話番号' className='c-form-text' autoComplete='off' spellCheck='false' type='text' defaultValue='' />
              
              <div className='c-form-label'>
                <label htmlFor='company_division_client_email'>メールアドレス</label>
              </div>
              <input ref='email' placeholder='メールアドレス' className='c-form-text' autoComplete='off' spellCheck='false' type='text' defaultValue='' />

              <div className='c-form-label'>
                <label htmlFor='company_division_client_note'>メモ</label>
              </div>
              <textarea ref='note' placeholder='メモを入力してください' className='c-form-textarea' rows='4' autoComplete='off' spellCheck='false' ></textarea>
              
              <div className='u-ta-center u-mt-30'>
                <div className='c-btnMain-standard c-btn-blue' onClick={::this.createClient}>作成する</div>
              </div>
            </div>
            :
            <div>
              <div className={Style.ClientSearch__form}>
                <input type='text' className={Style.ClientSearch__input} placeholder='お客様情報で検索' ref='word' onChange={::this._onChange}/>
                <div onClick={::this._onChange} className='c-btnMain-standard u-ml-10'>検索</div>
                <div onClick={::this.createView} className='c-btnMain-standard c-btn-blue u-ml-50'>お客様情報を作成する</div>
              </div>
              
              { this.state.clients.length > 0 ?

                <ul className={Style.ClientSearch__list}>
                  {this.state.clients.map((client, i) => {
                    var key = `clients-${i}`;
                    return (
                      <li {...{key}} className={Style.ClientSearch__item}>
                        <h2 className={Style.ClientSearch__itemName} data-number={i} onClick={::this._onSelect}>{client.company.name} {client.division.name} {client.name} 様</h2>
                      </li>
                    );
                  })}
                </ul>
                :
                <div className='c-attention u-mt-30'>お客様情報が見つかりませんでした</div>
              }
            </div>
          }
          <div onClick={::this._close} className={Style.ClientSearch__closeIcon}>×</div>
        </div>
      </div>
      :
      <div className='c-btnMain-standard' onClick={::this._open}>お客様情報</div>
    );
  }
}
