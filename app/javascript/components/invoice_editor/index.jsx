import React, { Fragment, useState } from 'react'

// import libraries
import CustomerAddress from './customer_address'
import DatetimePicker  from '../utilities/datetime_picker'

const InvoicePdfGenrator = props => {

  const attentions = ['請求書', '納品・請求書']

  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 2

  const init = {
    date: props.invoice ? props.invoice.date : date,
    expiration: props.invoice ? props.invoice.expiration : new Date(year, month, 0),
    subject: props.quote.subject,
    remarks: props.invoice ? props.invoice.remarks : props.quote.remarks,
    memo: props.invoice ? props.invoice.memo : props.quote.memo,
    attention: props.invoice ? props.invoice.attention || '請求書' : '請求書'
  }

  const [state, setState] = useState(init)

  /**
   * 取引先が登録されているか確認
   * @version 2020/02/18
   */
  const checkClient = () => {

    let send = {
      check: false,
      message: ''
    }

    if(!props.client) {

      send = {
        check: true,
        message: '取引先を案件で登録してください。'
      }
	  }

    return send
  }

  /**
   * 件名が登録されているか確認
   * @version 2020/02/18
   */
  const checkSubject = () => {

    let send = {
      check: false,
      message: ''
    }

    if(!state.subject) {

      send = {
        check: true,
        message: '件名を入力してください。'
      }
    }

    return send
  }

  /**
   *
   * @version 2020/02/18
   */
  const setDate = prop => setState({ ...state, date: prop.value })

  /**
   *
   * @version 2020/02/18
   */
  const setExpiration = prop => setState({ ...state, expiration: prop.value })

  /**
   * 件名を更新する
   * @version 2020/02/18
   */
  const setSubject = e => setState({ ...state, subject: e.target.value })

  /**
   * 備考を更新する
   * @version 2020/02/18
   */
  const setRemarks = e => setState({ ...state, remarks: e.target.value })

  /**
   * メモを更新する
   * @version 2020/02/18
   */
  const setMemo = e => setState({ ...state, memo: e.target.value })

  /**
   * 形式を更新する
   * @version 2020/02/28
   */
  const setAttention = e => setState({ ...state, attention: e.target.value })

  /**
   * 請求書を作成
   * @version 2020/02/18
   */
  const setNewInvoice = e => {

    e.preventDefault()

    let validation = checkClient()
    if(validation.check) {

      alert(validation.message)
      return
    }

    validation = checkSubject()
    if(validation.check) {

      alert(validation.message)
      return
    }

    const url = '/invoices'
    const field = new FormData()
    field.append('invoice[quote_id]', props.quote.id)
    field.append('invoice[date]', state.date)
    field.append('invoice[expiration]', state.expiration)
    field.append('invoice[subject]', state.subject)
    field.append('invoice[remarks]', state.remarks)
    field.append('invoice[memo]', state.memo)
    field.append('invoice[attention]', state.attention)

    const request = window.xhrRequest.post(url, field)
    request.then(res => {
      const redirect = () => window.location.href = `${ res.data.invoice.id }/edit`
      window.mf_like_modal({ icon: 'success', message: '案件の作成に成功しました。', close_callback: () => redirect() })
    }).catch(err => window.mf_like_modal({ icon: 'error', message: '請求書の更新に失敗しました。', close_callback: () => console.log(err) }))
  }

  /**
   * 請求書を更新
   * @version 2020/02/18
   */
  const setUpdateInvoice = e => {

    e.preventDefault()
  
    const url = `/invoices/${ props.invoice.id }`
    const field = new FormData()
    field.append('invoice[quote_id]', props.quote.id)
    field.append('invoice[date]', state.date)
    field.append('invoice[expiration]', state.expiration)
    field.append('invoice[subject]', state.subject)
    field.append('invoice[remarks]', state.remarks)
    field.append('invoice[memo]', state.memo)
    field.append('invoice[attention]', state.attention)
  
    const request = window.xhrRequest.put(url, field)
    request.then(res => {
      window.mf_like_modal({ icon: 'success', message: '案件の更新に成功しました。' })
    }).catch(err => window.mf_like_modal({ icon: 'error', message: '請求書の更新に失敗しました。', close_callback: () => console.log(err) }))
  }

  /**
   * DatetimePickerから渡ってきた値を振り分けてsetStateする
   * @version 2020/02/18
   */
  const sortingAction = prop => {

    switch(prop.action) {
      case 'date':
        setDate(prop)
        break
      case 'expiration':
        setExpiration(prop)
        break
      default:
        break
    }
  }

	return(
    <Fragment>
      <h1 className='l-dashboard__heading'>請求書: { props.quote.subject }</h1>
      { props.invoice ?
        <form method='get' target='_blank' action={ `/invoices/${ props.invoice.id }/generate_pdf` }>
          <CustomerAddress company={ props.company } division={ props.division } client={ props.client }/>
          <div className='u-mt-30 c-flex'>
            <div className='c-flex__column'>
              <label className='c-form-label'>請求書番号</label>
              <div>{ props.quote.quote_number }</div>
            </div>
            <div className='u-ml-30 c-flex__column'>
              <label className='c-form-label'>請求日</label>
              <DatetimePicker type='text' default_datetime={ state.date } class='c-form-text__work-index__datepicker' action='date' name='date' sortingAction={ sortingAction }/>
            </div>
            <div className='u-ml-30 c-flex__column'>
              <label className='c-form-label'>支払い期限</label>
              <DatetimePicker type='text' default_datetime={ state.expiration } class='c-form-text__work-index__datepicker' action='expiration' name='expiration' sortingAction={ sortingAction }/>
            </div>
          </div>
          <div className='u-mt-30'>
            <label className='c-form-label'>件名</label>
            <input type='text' name='subject' className='c-form-text' defaultValue={ props.invoice.subject } onChange={ e => setSubject(e) }/>
          </div>
          <div className='u-mt-30'>
            <label className='c-form-label'>形式</label>
            <div className='c-form-selectWrap'>
              <select className='c-form-select' defaultValue={ state.attention } onChange={ e => setAttention(e) }>
                { attentions.map((att, index) => {
                  const key = 'attention' + index
                  return(
                    <option {...{key}} value={ att }>{ att }</option>
                  )
                }) }
              </select>
            </div>
          </div>
          <div className='u-mt-30 c-table'>
            <table>
              <thead>
                <tr>
                  <th>品目</th>
                  <th>単価</th>
                  <th>数量</th>
                  <th>価格</th>
                </tr>
              </thead>
              <tbody>
                <Fragment>
                  { props.projects ?
                    <Fragment>
                      { props.projects.map((project, index) => {
                        const key = 'project' + new Date().getTime().toString(16) + index
                        return(
                          <Fragment { ...{key} }>
                            <tr>
                              <td>{ project.name }</td>
                              <td>{ Number(project.unit_price).toLocaleString() }</td>
                              <td>{ project.unit }</td>
                              <td>{ (Number(project.unit_price) * Number(project.unit)).toLocaleString() }</td>
                            </tr>
                            { project.remarks != '' ?
                              <tr>
                                <td colSpan='4'>{ project.remarks }</td>
                              </tr>
                              : null
                            }
                          </Fragment>
                        )
                      }) }
                    </Fragment>
                    : null
                  }
                </Fragment>
                <tr>
                  <td>値引金額</td>
                  <td></td>
                  <td></td>
                  <td>{ Number(props.quote.discount).toLocaleString() }</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='u-mt-10 c-table'>
            <table>
              <tbody>
                <tr>
                  { props.quote.tax_type == 'exemption' ?
                    <Fragment>
                      <td>合計金額</td>
                      <td>¥ { Math.floor(props.quote.price || 0).toLocaleString() }</td>
                    </Fragment>
                    :
                    <Fragment>
                      <td>合計金額(税込)</td>
                      <td>{ Math.floor((props.quote.price || 0) * parseFloat(props.quote.tax)).toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }) }</td>
                    </Fragment>
                  }
                </tr>
              </tbody>
            </table>
          </div>
          <div className='u-mt-30'>
            <label name='remarks' className='c-form-label'>備考　※請求書に記載されます</label>
            <textarea name='remarks' placeholder='備考を入力してください' className='c-form-text' rows='4' defaultValue={ state.remarks } onChange={ e => setRemarks(e) }/>
          </div>
          <div className='u-mt-10'>
            <label className='c-form-label'>メモ　※請求書に記載されません</label>
            <textarea name='memo' placeholder='メモを入力してください' className='c-form-text' rows='4' defaultValue={ state.memo } onChange={ e => setMemo(e) }/>
	        </div>
          <div className='c-overlay-submit'>
            <div className='c-flex c-flex__center c-flex-alignItems__center'>
              <div>
                <a className='c-btnMain c-btn-blue' onClick={ setUpdateInvoice }>更新する</a>
              </div>
              <div className='u-ml-10'>
                <input type='submit' name='commit' value='請求書ダウンロード' className='c-btnMain'/>
              </div>
              <div className='u-ml-10'>
                <a className='c-btnMain' href={ `/quotes/${ props.quote.id }/edit` }>案件に戻る</a>
              </div>
            </div>
          </div>
        </form>
	      :
        <div>
          <CustomerAddress company={ props.company} division={ props.division } client={ props.client }/>
          <div className='u-mt-30 c-flex'>
            <div className='c-flex__column'>
              <label className='c-form-label'>請求書番号</label>
              <div>{ props.quote.quote_number }</div>
            </div>
            <div className='u-ml-30 c-flex__column'>
              <label className='c-form-label'>請求日</label>
              <DatetimePicker type='text' default_datetime={ state.date } class='c-form-text__work-index__datepicker' action='date' name='date' sortingAction={ sortingAction }/>
            </div>
            <div className='u-ml-30 c-flex__column'>
              <label className='c-form-label'>支払い期限</label>
              <DatetimePicker type='text' default_datetime={ state.expiration } class='c-form-text__work-index__datepicker' action='expiration' name='expiration' sortingAction={ sortingAction }/>
            </div>
          </div>
          <div className='u-mt-30'>
            <label className='c-form-label'>件名</label>
            <input type='text' name='subject' className='c-form-text' defaultValue={ props.quote.subject } onChange={ e => setSubject(e) }/>
          </div>
          <div className='u-mt-30'>
            <label className='c-form-label'>形式</label>
            <div className='c-form-selectWrap'>
              <select className='c-form-select' defaultValue={ state.attention } onChange={ e => setAttention(e) }>
                { attentions.map((att, index) => {
                  const key = 'attention' + index
                  return(
                    <option {...{key}} value={ att }>{ att }</option>
                  )
                }) }
              </select>
            </div>
          </div>
          <div className='u-mt-30 c-table'>
            <table>
              <thead>
                <tr>
                  <th>品目</th>
                  <th>単価</th>
                  <th>数量</th>
                  <th>価格</th>
                </tr>
              </thead>
              <tbody>
                <Fragment>
                  { props.projects ?
                    <Fragment>
                      { props.projects.map((project, index) => {
                        const key = 'project' + new Date().getTime().toString(16) + index
                        return(
                          <Fragment { ...{key} }>
                            <tr>
                              <td>{ project.name }</td>
                              <td>{ Number(project.unit_price).toLocaleString() }</td>
                              <td>{ project.unit }</td>
                              <td>{ (Number(project.unit_price) * Number(project.unit)).toLocaleString() }</td>
                            </tr>
                            { project.remarks != '' ?
                              <tr>
                                <td colSpan='4'>{ project.remarks }</td>
                              </tr>
                              : null
                            }
                          </Fragment>
                        )
                      }) }
                    </Fragment>
                    : null
                  }
                </Fragment>
                <tr>
                  <td>値引金額</td>
                  <td/>
                  <td/>
                  <td>{ Number(props.quote.discount).toLocaleString() }</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='u-mt-10 c-table'>
            <table>
              <tbody>
                <tr>
                  { props.quote.tax_type === 'exemption' ?
                    <Fragment>
                      <td>合計金額</td>
                      <td>¥ { Math.floor(props.quote.price || 0).toLocaleString() }</td>
                    </Fragment>
                    :
                    <Fragment>
                      <td>合計金額(税込)</td>
                      <td>{ Math.floor((props.quote.price || 0) * parseFloat(props.quote.tax)).toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }) }</td>
                    </Fragment>
                  }
                </tr>
              </tbody>
            </table>
          </div>
          <div className='u-mt-30'>
            <label name='remarks' className='c-form-label'>備考　※請求書に記載されます</label>
            <textarea name='remarks' placeholder='備考を入力してください' className='c-form-text' rows='4' defaultValue={ state.remarks } onChange={ setRemarks }/>
          </div>
          <div className='u-mt-10'>
	          <label className='c-form-label'>メモ　※請求書に記載されません</label>
	          <textarea name='memo' placeholder='メモを入力してください' className='c-form-text' rows='4' defaultValue={ state.memo } onChange={ setMemo }/>
          </div>
          <div className='c-overlay-submit'>
            <div className='c-flex c-flex__center'>
              <div>
	              <a className='c-btnMain c-btn-blue' onClick={ setNewInvoice }>作成する</a>
              </div>
              <div className='u-ml-10'>
                <a className='c-btnMain' href={ `/quotes/${props.quote.id}/edit` }>案件に戻る</a>
              </div>
            </div>
          </div>
        </div>
        }
    </Fragment>
	)
}

export default InvoicePdfGenrator
