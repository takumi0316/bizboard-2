import React from 'react'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

/**
 *  @version 2018/06/10
 */
export default class SubcontractorDivisions extends React.Component {

  /**
   *  コンストラクタ
   *  @version
   */
  constructor (props) {

    super(props);

    this.state = {
      divisions: this.props.divisions || []
    };
  }

  /**
   *  親要素のクリックイベントを引き継がない
   *  @version
   */
  _onChange(e) {

    this._search(e.target.value);
  }

  /**
   *  検索
   *  @version
   */
  _search(id) {

    // 記事内容を送信
    Request.get('/subcontractor_divisions.json?subcontractor_id=' + id)
      .end((error, response) => {

        console.log(response);

        if (error) return false;
        this.setState({divisions: response.body.divisions});
      });
  }

  /**
   *  表示処理
   *  @version
   */
  render () {

    return (
      <div>
        <div className='c-form-label'>
          <label htmlFor='subcontractor_division_client_subcontractor_division_id'>会社</label>
          <span className='c-form__required u-ml-10'>必須</span>
        </div>
        <div className='c-form-selectWrap u-mb-30'>
          <select name='subcontractor_id' id='subcontractor_id' className='c-form-select' defaultValue={this.props.subcontractor_id} onChange={::this._onChange}>
            { this.props.subcontractors.map((subcontractor, index) => {
              const key = `subcontrator-${index}`;
              return (
                <option {...{key}} value={subcontractor.id}>{subcontractor.name}</option>
              );
            })}
          </select>
        </div>

        <div className='c-form-label'>
          <label htmlFor='subcontractor_division_client_subcontractor_division_id'>部署</label>
          <span className='c-form__required u-ml-10'>必須</span>
        </div>
        <div className='c-form-selectWrap u-mb-30'>
          <select className='c-form-select' defaultValue={this.props.subcontractor_division_id} required='required' name='subcontractor_division_client[subcontractor_division_id]' id='subcontractor_division_client_subcontractor_division_id'>
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
