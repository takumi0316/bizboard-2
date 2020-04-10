import React from 'react'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

/**
 *  @version 2018/06/10
 */
export default class InventoryDivisionsSelect extends React.Component {

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
  _onChange = e => {

    this._search(e.target.value);
  }

  /**
   *  検索
   *  @version 2018/06/10
   */
  _search = id => {

    // 記事内容を送信
    Request.get('/inventories.json?company_id=' + id)
      .end((error, res) => {

				if (error) return false;
        this.setState({divisions: res.body.divisions});
      });
  };

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render () {

    return (
      <div>
        <div className='c-form-label'>
          <label>会社</label>
          <span className='u-ml-10 c-form__required'>必須</span>
        </div>
        <div className='c-form-selectWrap u-mb-30'>
          <select name='company_id' className='c-form-select' defaultValue={ this.props.company_id } onChange={ e => this._onChange(e) }>
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
          <select className='c-form-select' defaultValue={ this.props.division_id } required='required' name='inventory[company_division_id]'>
            { this.state.divisions.map((division, index) => {
              const key = `division-${index}`;
              return (
                <option { ...{key} } value={ division.id }>{ division.name || '部署名なし' }</option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}
