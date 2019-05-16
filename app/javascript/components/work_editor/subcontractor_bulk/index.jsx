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

    if ( this.refs.companyAddress2.value === '' ) {

      alert('住所2を入力してください！！！！！！！！！！！！！');
      exit
    }

    if ( this.refs.companyClientName.value === '' ) {

      alert('担当者を入力するのが一番大事！！！！！！！！！！！！！');
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
      companyAddress2: this.refs.companyAddress2.value,
      currentClientName: this.refs.currentClientName.value,
      companyClientName: this.refs.companyClientName.value,
      companyClientNameTitle: this.refs.companyClientNameTitle.value,
    }
    console.log('field: ', field)
    Request.post(url)
      .set('X-Requested-With', 'XMLHttpRequest')
      .field(field)
      .setCsrfToken()
      .end((err, res) => {

        if (!err && res.body.status === 'success') {

          alert('いけてんで');
          this.props.closeBulk();
          console.log('clinet_id: ', res.body.client)
          this.props.applyClient(res.body.client, this.props.work_subcontractor_id);
          this.props.close();
        } else if (err && res.body.status === 'error') {

          alert('いけてないで');
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
              <h1 className={ 'l-dashboard__heading' }>外注先担当者</h1>
              <div className={ 'c-form-label' } >
                <label>会社名</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div><input id='companyName' ref='companyName' className={ Style.SubcontractorBulk__input } /></div>
              <div className={ 'c-form-label' } >
                <label>部署名</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div><input id='companyDivisionName' ref='companyDivisionName' className={ Style.SubcontractorBulk__input } /></div>
              <div className={ 'c-form-label' } >
                <label>郵便番号</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div><input onChange={ e => this._formatCheck('companyPost') } id='companyPost' ref='companyPost' className={ Style.SubcontractorBulk__input } /></div>
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
              <div><input id='commpanyAddress1' ref='companyAddress1' className={ Style.SubcontractorBulk__input } /></div>
              <div className={ 'c-form-label' } >
                <label>住所2</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div><input id='companyAddress2' ref='companyAddress2' className={ Style.SubcontractorBulk__input } /></div>
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
              <div><input id='companyClientName' ref='companyClientName' className={ Style.SubcontractorBulk__input } /></div>
              <div className={ 'c-form-label' } >
                <label>敬称</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div>
                <select defaultValue={ this.state.title_id } ref='companyClientNameTitle' className={ 'c-form-select' } >
                  { [0, 10, 20].map((title, index) => {
                    const key = 'title-' + index;
                    return (
                      <option {...{key}} value={ title }>{ TITLES[title] }</option>
                    );
                  }) }
                </select>
              </div>
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
