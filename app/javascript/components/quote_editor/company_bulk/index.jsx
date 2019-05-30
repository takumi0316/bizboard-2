import React from 'react'
import Style from './style.sass'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

/**
 * 記事エディター
 *
 */
export default class CompanyBulk extends React.Component {

  /**
   * コンストラクタ
   *
   */
  constructor(props) {

    super(props);
    this.state = {
      prefecture_id: null,
      user_id: null,
      companies: [],
      divisions: [],
      company_name: '',
      companyDivision: {},
      company_type: false,
      division_type: false,
    }
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
    const url = '/companies/bulk';
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
          const client = {
            id: res.body.client.id,
            name: res.body.client.name,
            tel: res.body.client.tel,
            email: res.body.client.email,
            division: res.body.division,
            company: res.body.company,
          }
          this.props.closeBulk();
          this.props.applyClient(client);
          this.props.close();
        } else if (err && res.body.status === 'error') {

          alert('正常に作成できませんでした。');
        }
      });
  }

 /**
   *  フリーワード検索
   *  @version 2018/06/10
   */
  _companySearch = () => {

    const search = this.refs.companyName.value;
    // 記事内容を送信
    Request.get('/companies.json?search=' + search)
      .end((err, res) => {

        if (err) return false;
        let companyName = this.refs.companyName.value;
        this.setState({companies: res.body.companies, company_name: companyName});
      });
  }

  /**
   *
   *
   */
  _closeCompany = () => {

    setTimeout(() => { this.setState({ companies: []}) }, 500);
  }

  _changeCompany = () => {

    let companyName = this.refs.companyName.value;
    this.setState({ company_name: companyName }, this._companySearch());
  }

  _changeDivision = () => {

    if (this.state.companyDivision.length > 0) {

      let copyDivision = Object.assign([], this.state.companyDivision);
      copyDivision.name = this.refs.companyDivisionName.value;
      console.log(copyDivision)
      this.setState({ companyDivision: copyDivision });
    } else {

      let copyDivision = { 'name': this.refs.companyDivisionName.value };
      this.setState({ companyDivision: copyDivision });
    }
  }
  /**
   *
   *
   */
  _openCompany = () => {

    this.setState({ company_type: true });
  }

  /**
   *
   *
   */
  _onSelectCompany = (companyName, companyDivisions) => {

    this.setState({ company_name: companyName, companies: [], divisions: companyDivisions, company_type: false });
  }

  /**
   *
   *
   */
  _onSelectDivision = (division) => {

    this.setState({ companyDivision: division, division_type: false });
  }

  /**
   *
   *
   */
  _openDivision = () => {

    this.setState({ division_type: true });
  }

  /**
   *
   *
   */
  _closeDivision = () => {

    setTimeout(() => { this.setState({ division_type: false }) }, 500);
  }

  /**
   *  親要素のクリックイベントを引き継がない
   *  @version 2018/06/10
   */
  _stopPropagation(event) {

    event.stopPropagation();
  }

  /**
   * 表示処理
   *
   */
  render() {
    return (

      <React.Fragment key={'bulk'}>
          <div className={ Style.SubcontractorBulk }>
            <div className={ Style.SubcontractorBulk__inner } onMouseDown={ e => this._stopPropagation(e) } >
              <h1 className={ 'l-dashboard__heading-jsx' }>取引先担当者</h1>
              <div className={ 'c-form-label' } >
                <label>会社名</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div><input id='companyName' placeholder='会社名' ref='companyName' autoComplete='off' className={ Style.SubcontractorBulk__input } onChange={::this._changeCompany} onFocus={ ::this._openCompany } onBlur={ ::this._closeCompany } onClick={ ::this._companySearch } value={ this.state.company_name } /></div>

              { this.state.companies.length > 0 && this.state.company_type ?

                <div className={ Style.SubcontractorBulk__candidateCompany__modal }>
                  <ul className={ Style.SubcontractorBulk__candidateCompany }>
                    { this.state.companies.map((company, index) => {

                      const key = 'company-' + index;
                      return(
                        <li {...{key}} className={ Style.SubcontractorBulk__item }>
                          <h2 className={ Style.SubcontractorBulk__itemName } onClick={ e => this._onSelectCompany(company.name, company.divisions) }>{ company.name }</h2>
                        </li>
                      )
                    }) }
                  </ul>
                </div>
                :
                null
              }
              <div className={ 'c-form-label' } >
                <label>部署名</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div><input id='companyDivisionName' placeholder='部署名' ref='companyDivisionName' autoComplete='off' className={ Style.SubcontractorBulk__input } onFocus={ ::this._openDivision } onBlur={ ::this._closeDivision } value={ this.state.companyDivision.name } onChange={ ::this._changeDivision }/></div>
              { this.state.divisions.length > 0 && this.state.division_type ?

                <div className={ Style.SubcontractorBulk__candidateDivisions__modal }>
                  <ul className={ Style.SubcontractorBulk__candidateDivisions }>
                    { this.state.divisions.map((division, index) => {

                      const key = 'divisoion-' + index;
                      return(
                        <li {...{key}} className={ Style.SubcontractorBulk__item }>
                          <h2 className={ Style.SubcontractorBulk__itemName } onClick={ e => this._onSelectDivision(division) } >{ division.name }</h2>
                        </li>
                      )
                    }) }
                  </ul>
                </div>
                :
                null
              }
              <div className={ 'c-form-label' } >
                <label>郵便番号</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div><input onChange={ e => this._formatCheck('companyPost') } id='companyPost' placeholder='郵便番号' ref='companyPost' autoComplete='off' className={ Style.SubcontractorBulk__input } defaultValue={ this.state.companyDivision.zip } /></div>
              <div className={ 'c-form-label' } >
                <label>都道府県</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div>
                <select defaultValue={ this.state.companyDivision.prefecture_id } ref='companyPrefecture' className={ 'c-form-select__bulk-jsx' }>
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
              <div><input id='commpanyAddress1' placeholder='住所' ref='companyAddress1' className={ Style.SubcontractorBulk__input } defaultValue={ this.state.companyDivision.address1 } /></div>
              <div className={ 'c-form-label' } >
                <label>自社担当者</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div>
                <select defaultValue={ this.state.user_id } ref='currentClientName' className={ 'c-form-select__bulk-jsx' }>
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
              <div><input id='companyClientName' placeholder='担当者名' ref='companyClientName' autoComplete='off' className={ Style.SubcontractorBulk__input } /></div>
              <div className={ 'c-form-label' } >
                <label>電話番号</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div><input placeholder='電話番号' ref='companyClientTel' autoComplete='off' className={ Style.SubcontractorBulk__input } /></div>
<div className={ 'c-form-label' } >
                <label>メールアドレス</label>
                <span className={ 'c-form__required u-ml-10' }>必須</span>
              </div>
              <div><input placeholder='メールアドレス' ref='companyClientEmail' autoComplete='off' className={ Style.SubcontractorBulk__input } /></div>
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
