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
      client: this.props.client || [],
      client_id: this.props.client.id || [],
      show_modal: false,
    };
  }

  /**
   *  親要素のクリックイベントを引き継がない
   *  @version 2018/06/10
   */
  _onChange = e => {

    this._search(e.target.value);
  }

  /**
   *  検索
   *  @version 2018/06/10
   */
  _search = id => {

    // 記事内容を送信
    Request.get('/company_division_clients.json?clients' + id)
      .end((error, res) => {

				if (error) return false;
        this.setState({client: res.body.clients});
      });
  };

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
   *  表示処理
   *  @version 2018/06/10
   */
  render () {
    return (
      <div>
        { this.state.show_modal ?
          <div className='c-overlay-edit'>
            <div className='c-overlay-content'>
              <div>
                <form class="u-mt-30" id="new_company_division_client" action="/company_division_clients" accept-charset="UTF-8" method="post"/>
                  <div class="c-form-label">
                    <label>会社</label>
                    <span class="u-ml-10 c-form__required">必須</span>
                  </div>
                  <div class="c-form-selectWrap u-mb-30">
                    <select name="company_id" class="c-form-select">
                      <option value="nothing">会社名を選択してください</option>
                      <option value="1">テスト会社</option>
                    </select>
                  </div>
                  <div class="c-form-label">
                    <label>部署</label>
                    <span class="u-ml-10 c-form__required">必須</span>
                  </div>
                  <div class="u-mb-30 c-form-selectWrap">
                    <select class="c-form-select" required="" name="company_division_client[company_division_id]">
                      <option value="1">テスト部署１</option>
                      <option value="2">テスト部署２</option>
                    </select>
                  </div>
                  <div class="c-form-label">
                    <label>自社担当者</label>
                    <span class="u-ml-10 c-form__required">必須</span>
                  </div>
                  <div class="u-mb-30 c-form-selectWrap">
                    <select class="c-form-select" required="required" name="company_division_client[user_id]" id="company_division_client_user_id">
                      <option value=""></option>
                      <option value="1">JiiFactory公式</option>
                      <option value="2">岡田</option>
                    </select>
                  </div>
                  <div class="c-form-label">
                    <label>氏名</label>
                    <span class="u-ml-10 c-form__required">必須</span>
                  </div>
                  <input placeholder="氏名" class="c-form-text u-mb-30" required="required" autocomplete="off" spellcheck="false" type="text" name="company_division_client[name]" id="company_division_client_name" />
                  <div class="c-form-label">
                    <label for="company_division_client_kana">氏名(カナ)</label>
                  </div>
                  <input placeholder="氏名(カナ)" class="c-form-text u-mb-30" autocomplete="off" spellcheck="false" type="text" name="company_division_client[kana]" id="company_division_client_kana" ></input>
                  <div class="c-form-label">
                    <label for="company_division_client_title">敬称</label>
                  </div>
                  <select class="c-form-select" name="company_division_client[title]" id="company_division_client_title">
                    <option value="nothing">なし</option>
                    <option selected="selected" value="honorific">様</option>
                    <option value="normal">さん</option>
                  </select>
                  <div class="c-form-label">
                    <label for="company_division_client_tel">電話番号</label>
                    <span class="c-form__recommend u-ml-10">入力推奨</span>
                  </div>
                  <input placeholder="電話番号" class="c-form-text u-mb-30" autocomplete="off" spellcheck="false" type="text" name="company_division_client[tel]" id="company_division_client_tel" ></input>
                  <div class="c-form-label">
                    <label for="company_division_client_tel">メールアドレス</label>
                    <span class="c-form__recommend u-ml-10">入力推奨</span>
                  </div>
                  <input placeholder="メールアドレス" class="c-form-text u-mb-30" required="required" autocomplete="off" spellcheck="false" type="text" name="company_division_client[email]" id="company_division_client_email" ></input>
                  <div class="c-form-label">
                    <label for="company_division_client_tel">パスワード</label>
                    <span class="c-form__recommend u-ml-10">入力推奨</span>
                  </div>
                  <input placeholder="変更しない場合は入力をしないでください" class="c-form-text u-mb-30" type="password" name="company_division_client[password]" id="company_division_client_password" ></input>
                  <div class="c-form-label">
                    <label for="company_division_client_tel">パスワード(確認)</label>
                    <span class="c-form__recommend u-ml-10">入力推奨</span>
                  </div>
                  <input placeholder="変更しない場合は入力をしないでください" class="c-form-text u-mb-30" type="password" name="company_division_client[password_confirmation]" id="company_division_client_password_confirmation" ></input>
                  <div class="c-form-label">
                    <label for="company_division_client_user_type">ユーザータイプ</label>
                  </div>
                  <div class="c-form-selectWrap u-mb-30">
                    <select class="c-form-select" name="company_division_client[user_type]" id="company_division_client_user_type">
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
                  <textarea placeholder="メモを入力してください" class="c-form-textarea u-mb-30" rows="4" autocomplete="off" spellcheck="false" name="company_division_client[note]" id="company_division_client_note" ></textarea>
                  <input type="submit" name="commit" value="作成する" class="c-btnMain c-btn-blue u-ta-center u-mt-30" data-disable-with="作成する"/>
              </div>

              <button className='c-btnMain c-btn-blue' onClick={(client_id) => {this._closeModal(client_id)}}>Close</button>
            </div>
          </div>
          : 
          <button className='c-btnMain c-btn-blue' onClick={(client_id) => {this._openModal(client_id)}}>担当者を追加</button>
        }
      </div>
    );
  }
}
