import React from 'react'
import Style from './style.sass'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

// Properties
import { TITLES } from './properties.es6';

/**
 * 記事エディター
 *
 */
export default class SubcontractorBulk extends React.Component {

  /**
   * コンストラクタ
   *
   */
  constructor(props) {

    super(props);
    this.state = { prefecture_id: null, user_id: null, title_id: 10 }
  }


  /**
   * モーダルを閉じる
   *
   */
  _close = () => {

    this.props.closeBulk();
  }

  /**
   * 親要素のクリックイベントを引き継がない
   *
   */
  _stopPropagation = (event) => {

    event.stopPropagation();
  }

  /**
   * フォーマットチェック
   *
   */
  _formatCheck = (refsName) => {

    switch (refsName) {
      case 'companyPost':
        if (this.refs.companyPost.value.match(/^\d{3}-?\d{5}$/)) {

          alert('正しい形式の郵便番号で入力してください！(***-****あるいは*******)');
        }
        break;
    }
  }

  /**
   * nullチェック
   *
   */
  _nullCheck = () => {

    if ( this.refs.companyName.value === '' ) {

      alert('会社名を入力してください！！！！！！！！！！！！！');
      exit
    }

    if ( this.refs.companyDivisionName.value === '' ) {

      alert('部署名を入力してください！！！！！！！！！！！！！');
      exit
    }

    if ( this.refs.companyPost.value === '' ) {

      alert('郵便番号を入力してください！！！！！！！！！！！！');
      exit
    }

    if ( this.refs.companyAddress1.value === '' ) {

      alert('住所1を入力してください！！！！！！！！！！！！！');
      exit
    }

    if ( this.refs.companyClientName.value === '' ) {

      alert('担当者を入力するのが一番大事！！！！！！！！！！！！！');
      exit
    }

    if ( this.refs.companyClientTel.value === '' ) {

      alert('電話番号を入力してください！！！！！！！！！！！！！');
      exit
    }

    if ( this.refs.companyClientEmail.value === '' ) {

      alert('メールアドレスを入力してください！！！！！！！！！！！！！');
      exit
    }
  }

  /**
   * 担当者を作成
   *
   */
  _onBulkCreate = () => {

    this._nullCheck();
    const url = '/subcontractors/bulk';
    let field = {};
    field = {
      companyName: this.refs.companyName.value,
      companyDivisionName: this.refs.companyDivisionName.value,
      companyPost: this.refs.companyPost.value,
      companyPrefecture: this.refs.companyPrefecture.value,
      companyAddress1: this.refs.companyAddress1.value,
      currentClientName: this.refs.currentClientName.value,
      companyClientName: this.refs.companyClientName.value,
      companyClientTel: this.refs.companyClientTel.value,
      companyClientEmail: this.refs.companyClientEmail.value,
    }
    Request.post(url)
      .set('X-Requested-With', 'XMLHttpRequest')
      .field(field)
      .setCsrfToken()
      .end((err, res) => {

        if (!err && res.body.status === 'success') {

          alert('正常に作成できました。')
          this.props.closeBulk();
          this.props.applyClient(res.body.client, this.props.work_subcontractor_id);
          this.props.close();
        } else if (err && res.body.status === 'error') {

          alert('正常に作成できませんでした。');
        }
      });
  }

  /**
   * 表示処理
   *
   */
  render() {

    return (

      <React.Fragment>
          <div className={ Style.SubcontractorBulk }>
            <div className={ Style.SubcontractorBulk__inner } onClick={ e => this._stopPropagation(e) } >
              <h1 className={ 'l-dashboard__heading-jsx' }>外注先担当者</h1>
              <div className={ 'c-form-label' } >
                <label>会社名</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div><input id='companyName' placeholder='会社名' ref='companyName' className={ Style.SubcontractorBulk__input } /></div>
              <div className={ 'c-form-label' } >
                <label>部署名</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div><input id='companyDivisionName' placeholder='部署名' ref='companyDivisionName' className={ Style.SubcontractorBulk__input } /></div>
              <div className={ 'c-form-label' } >
                <label>郵便番号</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div><input onChange={ e => this._formatCheck('companyPost') } id='companyPost' placeholder='郵便番号' ref='companyPost' className={ Style.SubcontractorBulk__input } /></div>
              <div className={ 'c-form-label' } >
                <label>都道府県</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div className={ 'c-form-selectWrap' }>
                <select defaultValue={ this.state.prefecture_id } ref='companyPrefecture' className={ 'c-form-select' }>
                  { this.props.prefectures.map((prefecture, index) => {
                    const key = 'prefecture-' + index;
                    return (
                      <option {...{key}} value={ prefecture.attributes.id }>{ prefecture.attributes.name }</option>
                    );
                  }) }
                </select>
              </div>
              <div className={ 'c-form-label' } >
                <label>住所1</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div><input id='commpanyAddress1' placeholder='住所' ref='companyAddress1' className={ Style.SubcontractorBulk__input } /></div>
              <div className={ 'c-form-label' } >
                <label>自社担当者</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div>
                <select defaultValue={ this.state.user_id } ref='currentClientName' className={ 'c-form-select' }>
                  { this.props.users.map((user, index) => {
                    const key = 'user-' + index;
                    return (
                      <option {...{key}} value={ user.id }>{ user.name }</option>
                    );
                  }) }
                </select>
              </div>
              <div className={ 'c-form-label' } >
                <label>担当者</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div><input id='companyClientName' placeholder='担当者名' ref='companyClientName' className={ Style.SubcontractorBulk__input } /></div>
              <div className={ 'c-form-label' } >
                <label>電話番号</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div><input placeholder='電話番号' ref='companyClientTel' className={ Style.SubcontractorBulk__input } /></div>
<div className={ 'c-form-label' } >
                <label>メールアドレス</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div><input placeholder='メールアドレス' ref='companyClientEmail' className={ Style.SubcontractorBulk__input } /></div>
              <div className={ 'u-ta-center' }>
                <button onClick={ e => this._onBulkCreate() } className={ 'c-btnMain-standard c-btn-blue u-mt-20' }>作成</button>
              </div>
              <div onClick={ e => this.props.closeBulk() } className={ Style.SubcontractorBulk__closeIcon }>×</div>
            </div>
          </div>
      </React.Fragment>
    );
  }
}
