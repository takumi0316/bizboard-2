import React from 'react'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

/**
 *  @version 2018/06/10
 */
export default class CompanyDivisions extends React.Component {
  
  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    this.state = {
      divisions: this.props.divisions || []
    };
  }

  /**
   *  親要素のクリックイベントを引き継がない
   *  @version 2018/06/10
   */
  _onChange(e) {

    this._search(e.target.value);
  }

  /**
   *  検索
   *  @version 2018/06/10
   */
  _search(id) {
    
    // 記事内容を送信
    Request.get('/company_divisions.json?company_id=' + id)
      .end((error, response) => {

        console.log(response);

        if (error) return false;
        this.setState({divisions: response.body.divisions});
      });
  }

  /**
   *  内容の取得
   *  @version 2018/06/10
   */
  getResources(e) {

    return ({
      company_id: this.refs.company_id.value,
      company_division_id: this.refs.company_division_id.value,
    });
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render () {

    return (
      <div>
        <div className='c-form-label'>
          <label htmlFor='company_division_client_company_division_id'>会社</label>
          <span className='c-form__required u-ml-10'>必須</span>
        </div>
        <div className='c-form-selectWrap'>
          <select ref='company_id' name='company_id' id='company_id' className='c-form-select' defaultValue={this.props.company_id} onChange={::this._onChange}>
            <option value='nothing'>会社名を選択してください</option>
            { this.props.companies.map((company, index) => {
              const key = `company-${index}`;
              return (
                <option {...{key}} value={company.id}>{company.name}</option>
              );
            })}
          </select>
        </div>

        <div className='c-form-label'>
          <label htmlFor='company_division_client_company_division_id'>部署</label>
          <span className='c-form__required u-ml-10'>必須</span>
        </div>
        <div className='c-form-selectWrap'>
          <select ref='company_division_id' className='c-form-select' defaultValue={this.props.company_division_id} required='required' name='company_division_client[company_division_id]' id='company_division_client_company_division_id'>
            { this.state.divisions.map((division, index) => {
              const key = `division-${index}`;
              return (
                <option {...{key}} value={division.id}>{division.name || '部署名なし'}</option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}
