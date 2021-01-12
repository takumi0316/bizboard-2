import React, { Fragment, useState, useRef } from 'react'
import Style from '../style.sass'
import Icon from 'react-evil-icons'

// components
import DatetimePicker from '../datetime_picker'
import Help from '../../utilities/help'

import {
  handleCloseDetailConfig,
  handleChangeDeliverType,
  handleChangeChannel,
  handleChangeDiscount,
  handleFocusRed,
  setDeliverAt,
  setDeliveryNoteDate,
  setDate,
  setReception,
  currentDateTime
} from '../function'

import {
  DELIVER_TYPES,
  CHANNELS,
  QUOTE_TYPES,
  GOOGLE_DRIVE,
  TAX_TYPES,
  PAYMENT_TERMS,
  PATTERN,
  LOCATION,
  OTHER,
  BPR_ERP
} from '../properties.es6'

const ConfigModal = props => {
 
  const divisionRef = useRef(null)
  const deliverTypeRef = useRef(null)
  const deliverTypeNoteRef = useRef(null)
  const channelRef = useRef(null)
  const quoteNumberRef = useRef(null)
  const temporaryPriceRef = useRef(null)
  const googleDriveExistRef = useRef(null)
  const quoteTypeRef = useRef(null)
  const discountRef = useRef(null)
  const taxTypeRef = useRef(null)
  const paymentTermsRef = useRef(null)
  const profitPriceRef = useRef(null)

  const init = {
    show_deliver_type: props.quote.deliver_type === LOCATION || props.quote.deliver_type === OTHER,
    show_detail_channel: props.quote.channel === BPR_ERP,
    reception: props.quote.reception || '',
    drive_folder_exist: false,
    active_discount: props.quote.discount > 0
  }

  const [state, setState] = useState(init)
 
  const saveDetailConfig = e => {
 
    e.preventDefault()

    let setValues = {
      division_id: divisionRef.current.value,
      deliver_type: deliverTypeRef.current.value,
      deliver_type_note: state.show_deliver_type ? deliverTypeNoteRef.current.value : '',
      channel: channelRef.current.value,
      quote_number: state.show_detail_channel ? quoteNumberRef.current.value : '',
      reception: state.reception,
      quote_type: quoteTypeRef.current.value,
      tax_type: taxTypeRef.current.value,
      payment_terms: paymentTermsRef.current.value
    }

    let profit_price = profitPriceRef.current.value
    profit_price = profit_price.replace(/[ー]/, '-')
    const cast_profit_price = profit_price.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0)-0xFEE0))
    const res_profit_price = cast_profit_price.replace(PATTERN, '')
    if(res_profit_price) setValues = { ...setValues, profit_price: res_profit_price }
    if(!res_profit_price) {

      mf_like_modal({
        icon: 'error',
        message: '整数・小数のみ入力してください。',
        close_callback: () => handleFocusRed(profitPriceRef.current)
      })
      return
    }

    if(state.show_detail_channel) {

      let temporary_price = temporaryPriceRef.current.value
      temporary_price = temporary_price.replace(/[ー]/, '-')
      const cast_temporary_price = temporary_price.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0)-0xFEE0))
      const res_temporary_price = cast_temporary_price.replace(PATTERN, '')
      if(res_temporary_price) setValues = { ...setValues, temporary_price: res_temporary_price }
      if(!res_temporary_price) {

        mf_like_modal({
          icon: 'error',
          message: '整数・小数のみ入力してください。',
          close_callback: () => handleFocusRed(temporaryPriceRef.current)
        })
        return
      }
    }
  
    if(!props.quote.drive_folder_id) setValues = { ...setValues, drive_folder_exist: googleDriveExistRef.current.value }
 
    { /*
      if(state.active_discount) {
      
        const discount = discountRef.current.value
        const matchDiscount = discount.match(PATTERN)[0]
        if(matchDiscount.length === discount.length) setValues = { ...setValues, discount: parseFloat(discount) }
        if(matchDiscount.length !== discount.length) {
        
          mf_like_modal({
            icon: 'error',
            message: '整数・小数のみ入力してください。',
            close_callback: () => handleFocusRed(discountRef.current)
          })
          return
        }
      }
     */ }

    props.parentSetState({ ...props.parentState, open_detail_config: false })
    props.setQuote({ ...props.quote, ...setValues })
  }
 
  return(
    <div className={ Style.EditingViewer__modal }>
      <div className={ Style.EditingViewer__modalDialog }>
        <div className={ Style.EditingViewer__modalContent }>
          
          <div className={ `u-va-middle c-flex__between c-flex-alignItems__center ${ Style.EditingViewer__modalHeader }` }>
            <p>
              詳細設定
            </p>
            <div onClick={ () => handleCloseDetailConfig(props.parentState, props.parentSetState) }>
              <Icon name='ei-close' size='m' color='white'/>
            </div>
          </div>
          
          <div className={ Style.EditingViewer__modalBody }>
            <table>
              <tbody>

              <tr>
                <th>案件作成日</th>
                <td>
                  <DatetimePicker
                    id='date'
                    default_datetime={ props.quote.date || currentDateTime }
                    show_time={ true }
                    state={ props.quote }
                    setState={ props.setQuote }
                    applyDateTime={ setDate }
                  />
                </td>
              </tr>

              <tr>
                <th>納品日</th>
                <td>
                  <DatetimePicker
                    id='delivery_note_date'
                    default_datetime={ props.quote.delivery_note_date || currentDateTime }
                    show_time={ true }
                    state={ props.quote }
                    setState={ props.setQuote }
                    applyDateTime={ setDeliveryNoteDate }
                  />
                </td>
              </tr>

              <tr>
                <th>納期</th>
                <td>
                  <DatetimePicker
                    id='deliver_at'
                    default_datetime={ props.quote.deliver_at || currentDateTime }
                    show_time={ true }
                    state={ props.quote }
                    setState={ props.setQuote }
                    applyDateTime={ setDeliverAt }
                  />
                </td>
              </tr>

              <tr>
                <th>売り上げ部署</th>
                <td>
                  <div className='c-form-selectWrap'>
                    <select
                      className='c-form-select'
                      defaultValue={ props.division_id }
                      ref={ divisionRef }
                    >
                      { props.divisions.map(division => <option key={ division[1] } value={ division[1] }>{ division[0] }</option>) }
                    </select>
                  </div>
                </td>
              </tr>

              <tr>
                <th>納品方法</th>
                <td>
                  <div className='c-form-selectWrap'>
                    <select
                      className='c-form-select'
                      defaultValue={ props.quote.deliver_type }
                      onChange={ e => handleChangeDeliverType(e, state, setState) }
                      ref={ deliverTypeRef }
                    >
                      { DELIVER_TYPES.map(type => <option key={ type.key } value={ type.key }>{ type.value }</option>) }
                    </select>
                  </div>
                  { state.show_deliver_type ?
                    <div className='u-mt-5'>
                      <textarea className='c-form-textarea' defaultValue={ props.quote.deliver_type_note } ref={ deliverTypeNoteRef }/>
                    </div>
                    : null
                  }
                </td>
              </tr>
 
              <tr>
                <th>受注経路</th>
                <td>
                  <div className='c-form-selectWrap'>
                    <select
                      className='c-form-select'
                      defaultValue={ props.quote.channel }
                      onChange={ e => handleChangeChannel(e, state, setState) }
                      ref={ channelRef }
                    >
                      { CHANNELS.map(type => <option key={ type.key } value={ type.key }>{ type.value }</option>) }
                    </select>
                  </div>
                </td>
              </tr>

              { state.show_detail_channel ?
                <Fragment>
                  <tr>
                    <th>案件番号</th>
                    <td>
                      <input
                        className='c-form-text'
                        type='text'
                        placeholder='BPR/ERP番号を入れてください。'
                        defaultValue={ props.quote.quote_number || '' }
                        ref={ quoteNumberRef }
                      />
                    </td>
                  </tr>
    
                  <tr>
                    <th>
                      合計金額
                      <Help content='※金額を入力する場合は品目は選択しないでください'/>
                    </th>
                    <td>
                      <input
                        className='c-form-text'
                        type='text'
                        defaultValue={ props.quote.temporary_price || 0 }
                        ref={ temporaryPriceRef }
                      />
                    </td>
                  </tr>
                </Fragment>
                : null
              }

              <tr>
                <th className='u-fw-bold'>受注方法</th>
                <td className='c-flex c-flex__column'>
                  <div>
                    <label className='c-form-radioLabel'>
                      <input
                        className='c-form-radio'
                        type='radio'
                        value='acceptance'
                        checked={ state.reception === 'acceptance' }
                        disabled={ '' }
                        onChange={ e => setReception(e.target.value, state, setState) }
                      />
                      <i className='c-form-radioIcon'/>
                      <span>受付</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-10'>
                      <input
                        className='c-form-radio'
                        type='radio'
                        value='mail'
                        checked={ state.reception === 'mail' }
                        disabled={ '' }
                        onChange={ e => setReception(e.target.value, state, setState) }
                      />
                      <i className='c-form-radioIcon'/>
                      <span>メール</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-10'>
                      <input
                        className='c-form-radio'
                        type='radio'
                        value='delivery'
                        checked={ state.reception === 'delivery' }
                        disabled={ '' }
                        onChange={ e => setReception(e.target.value, state, setState) }
                      />
                      <i className='c-form-radioIcon'/>
                      <span>集配</span>
                    </label>
                  </div>
                  <div className='u-mt-10'>
                    <label className='c-form-radioLabel'>
                      <input
                        className='c-form-radio'
                        type='radio'
                        value='reservation'
                        checked={ state.reception === 'reservation' }
                        disabled={ '' }
                        onChange={ e => setReception(e.target.value, state, setState) }
                      />
                      <i className='c-form-radioIcon'/>
                      <span>予約</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-10'>
                      <input
                        className='c-form-radio'
                        type='radio'
                        value='bizstant'
                        checked={ state.reception === 'bizstant' }
                        disabled={ '' }
                        onChange={ e => setReception(e.target.value, state, setState) }
                      />
                      <i className='c-form-radioIcon'/>
                      <span>ビジスタント</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-10'>
                      <input
                        className='c-form-radio'
                        type='radio'
                        value='reception_other'
                        checked={ state.reception === 'reception_other' }
                        disabled={ '' }
                        onChange={ e => setReception(e.target.value, state, setState) }
                      />
                      <i className='c-form-radioIcon'/>
                      <span>その他</span>
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                <th>受注区分</th>
                <td>
                  <div className='c-form-selectWrap'>
                    <select
                      className='c-form-select'
                      defaultValue={ props.quote.quote_type || '' }
                      ref={ quoteTypeRef }
                    >
                      { QUOTE_TYPES.map(type => <option key={ type.key } value={ type.key }>{ type.value }</option>) }
                    </select>
                  </div>
                </td>
              </tr>

              <tr>
                <th>Google Drive</th>
                <td>
                  { props.quote.drive_folder_id ?
                    <input
                      className='c-form-text'
                      value={ `作成済み(フォルダID: ${ props.quote.drive_folder_id })` }
                      readOnly
                    />
                    :
                    <div className='c-form-selectWrap'>
                      <select
                        className='c-form-select'
                        defaultValue={ props.quote.drive_folder_exist }
                        ref={ googleDriveExistRef }
                      >
                        { GOOGLE_DRIVE.map(type => <option key={ type.key } value={ type.key }>{ type.value }</option> ) }
                      </select>
                    </div>
                  }
                </td>
              </tr>

              { /* MEMO: 品目にマイナス金額を入力することで同等の処理を実現
                <tr>
                  <th>値引き</th>
                  <td>
                    <div>
                      <label className='c-form-radioLabel'>
                        <input
                          className='c-form-radio'
                          type='radio'
                          checked={ !state.active_discount }
                          disabled={ '' }
                          onChange={ () => handleChangeDiscount(state, setState) }
                        />
                        <i className='c-form-radioIcon'/>
                        <span>値引きなし</span>
                      </label>
                      <label className='c-form-radioLabel u-ml-15'>
                        <input
                          className='c-form-radio'
                          type='radio'
                          checked={ state.active_discount }
                          disabled={ '' }
                          onChange={ () => handleChangeDiscount(state, setState) }
                        />
                        <i className='c-form-radioIcon'/>
                        <span>値引きあり</span>
                      </label>
                    </div>
                    { state.active_discount ?
                      <div className='u-mt-5'>
                        <input
                          className='c-form-text'
                          type='text'
                          defaultValue={ props.quote.discount || 0 }
                          ref={ discountRef }
                        />
                      </div>
                      : null
                    }
                  </td>
                </tr>
              */ }

              <tr>
                <th>課税対象</th>
                <td>
                  <div className='c-form-selectWrap'>
                    <select
                      className='c-form-select'
                      defaultValue={ props.quote.tax_type || '' }
                      ref={ taxTypeRef }
                    >
                      { TAX_TYPES.map(type => <option key={ type.key } value={ type.key }>{ type.value }</option>) }
                    </select>
                  </div>
                </td>
              </tr>
 
              <tr>
                <th>支払い方法</th>
                <td>
                  <div className='c-form-selectWrap'>
                    <select
                      className='c-form-select'
                      defaultValue={ props.quote.payment_terms }
                      ref={ paymentTermsRef }
                    >
                      { PAYMENT_TERMS.map(type => <option key={ type.key } value={ type.key }>{ type.value }</option>) }
                    </select>
                  </div>
                </td>
              </tr>

              <tr>
                <th>利益額(暫定)</th>
                <td>
                  <input
                    className='c-form-text'
                    type='text'
                    defaultValue={ props.quote.profit_price || 0 }
                    ref={ profitPriceRef }
                  />
                </td>
              </tr>

              </tbody>
            </table>
          </div>
          
          <div className='u-ta-center u-mt-15 u-mb-20'>
            <button className='c-btnMain c-btn-blue' onClick={ saveDetailConfig }>保存</button>
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default ConfigModal