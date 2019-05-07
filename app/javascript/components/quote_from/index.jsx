import React      from 'react'
// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

export default class QuoteFrom extends React.Component {

  constructor (props) {

    super(props);

    this.state = {
      show: false,
      unit_price: null,
      quantity: null,
    };
  }

  onChangeQuote = (e, detail_id, index) => {
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === "success") {
          this.setState({ work_details: res.body.detail });
        } else {
          this.setState({ work_details: res.body.detail });
        }
      });
  }

  render() {
    const unit_price = this.state.unit_price;
    const quantity = this.state.quantity;

    return (
      <div>
        <div className={'c-form-group'}>
          <div className={'c-form-line u-mr-50'}>
            <div className={'c-form-label'}>
              <label> 案件ID </label>
            </div>
            <select className={ 'c-form-dateselect' } >
            </select>
          </div>
          <div className={'c-form-line u-mr-50'}>
            <div className={'c-form-label'}>
              <label> 発行日 </label>
            </div>
            <div className={'c-form-group'}>
            <select className={ 'c-form-dateselect' } >
            </select>
            <select className={ 'c-form-dateselect' } >
            </select>
            <select className={ 'c-form-dateselect' } >
            </select>
            </div>
          </div>
          <div className={'c-form-line u-mr-50'}>
            <div className={'c-form-label'}>
              <label> 発行期限 </label>
            </div>
            <div className={'c-form-group'}>
            <select className={ 'c-form-dateselect' } >
            </select>
            <select className={ 'c-form-dateselect' } >
            </select>
            <select className={ 'c-form-dateselect' } >
            </select>
            </div>
          </div>
        </div>
      <div className={'c-form-label'}>
        <label> 件名 </label>
      </div>
      <input className={ 'c-form-textarea' } type='text' placeholder={ '件名を入力してください' } />
      <div className={'c-table u-mt-30'}>
        <table>
          <thead>
            <tr>
              <th>品目</th>
              <th>単価</th>
              <th>数量</th>
              <th>価格</th>
              <th>原価</th>
              <th>粗利</th>
              <th>詳細</th>
              <th>削除</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input className={ 'c-form-textarea' } type='text' id={ 'quote_quote_items_attributes_' + 0 + '_name'} placeholder={ 'モノクロコピー' } /></td>
              <td>
              <input
                className={ 'c-form-textarea' }
                type="text"
                value={unit_price}
                onChange={ e  => {
                  this.setState({
                    unit_price: e.target.value
                  })
                }}
              />
              </td>
              <td>
              <input
              className={ 'c-form-textarea' }
                type="text"
                value={quantity}
                onChange={ e  => {
                  this.setState({
                    quantity: e.target.value
                  })
                }}
              />
              </td>
              <td><input className={ 'c-form-textarea' } type='text' value={unit_price * quantity} /></td>
              <td><input className={ 'c-form-textarea' } type='text' id={ 'quote_quote_items_attributes_' + 0 + '_cost'} placeholder={ '5' } /></td>
              <td><input className={ 'c-form-textarea' } type='text' id={ 'quote_quote_items_attributes_' + 0 + '_gross_profit'} placeholder={ '0.7' } /></td>
              <td><input className={ 'c-form-textarea' } type='text' id={ 'quote_quote_items_attributes_' + 0 + '_detail'} placeholder={ '詳細' } /></td>
              <td><button className={'c-btnMain-standard c-btn-red'} >行を削除する</button></td>
            </tr>
            <tr>
               <td colSpan='8'><button className={'c-btnMain-standard'} >行を追加する</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={'c-form-label'}>
        <label> 合計金額 </label>
      </div>
      <input className={ 'c-form-textarea' } type='text' placeholder={ 'とりあえずテキストフィールド' } />
      <div className={'c-form-label'}>
        <label> 備考　※見積書に記載されます </label>
      </div>
      <textarea rows='4' className={ 'c-form-textarea' } type='text' placeholder={ '備考' } />
      <div className={'c-form-label'}>
        <label> メモ　※見積書に記載されません </label>
      </div>
      <textarea rows='4' className={ 'c-form-textarea' } type='text' placeholder={ 'メモ' } />
    <div className={'c-overlay-submit'}>
      <input className={'c-btnMain-standard c-btn-blue u-va-middle'} type='submit' />
    </div>
    </div>
    )
  }
}
