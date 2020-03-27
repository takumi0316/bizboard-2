import React, { Fragment } from 'react';

import DivisionSearch     from './division_search/index';
import CustomerInfomation from './customer_infomation/index';

export default class TemplateGenerate extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      company: props.company || '',
      division: props.division || ''
    };
  };

  /**
   * 会社・部署セット
   * @version 2020/03/23
   **/
  applyDivision = props => {

    this.setState({ company: props.company, division: props.division });
  };

  /**
   * 保存
   * @version 2020/03/26
   */
  _save = e => {

    e.stopPropagation();

    const field = new FormData();

    field.append('card[name]', this.cardNameRef.value);
    field.append('card[company_division_id]', this.state.division.id);
    const request = this.props.card.id ? window.xhrRequest.put(this.props.action, field) : window.xhrRequest.post(this.props.action, field)

    // 保存処理
    request.then(response => {

      const card = response.data.card;

      // 新規作成時は編集画面はリダイレクト
      if(!this.state.card.id) {

        window.alert('テンプレート情報を保存しました。');
        window.location.href = `/cards/${card.id}/edit/`;
      };

      this.setState({ card: card, eyecatch_changed: false });
    }).catch(error => {

      window.alert('作成に失敗しました。');
    });
	};

  render() {
    return (
      <Fragment>
        <div className='u-mt-10'>
          <label className='c-form-label'>テンプレート名</label>
          <input type='text' className='c-form-text' defaultValue={ this.props.card.name || '' } ref={node => this.cardNameRef = node} placeholder='テンプレート名'/>
        </div>
        <CustomerInfomation company={ this.state.company } division={ this.state.division }/>
        <DivisionSearch applyDivision={ this.applyDivision } type_name={ '会社・部署情報を登録' } not_found={ '会社・部署情報が見つかりませんでした。'}/>
        <div className='u-mt-10'>
          <button className='c-btnMain-standard' onClick={ e => this._save(e) }>保存する</button>
        </div>
      </Fragment>
    );
  };
};
