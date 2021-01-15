import React, { Fragment, useState, useRef } from 'react'
import Style from '../style.sass'
import Icon from 'react-evil-icons'

// components
import DatetimePicker from '../datetime_picker'
import Help from '../../../utilities/help'

import {
  handleCloseDetailConfig,
  handleChangeDeliverType,
  handleChangeChannel,
  handleChangeDiscount,
  handleFocusRed,
  setDeliverAt,
  setDeliveryNoteDate,
  setDate,
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

// TODO: 保存ボタン押下時に親へ設定値を渡す
// TODO: QuoteをFirst Componentで管理する
const ConfigModal = props => {
 
  const deliverTypeRef = useRef(null)
  const deliverTypeNoteRef = useRef(null)
  const channelRef = useRef(null)
  const quoteNumberRef = useRef(null)
  const temporaryPriceRef = useRef(null)
  const googleDriveRef = useRef(null)
  const quoteTypeRef = useRef(null)
  const discountRef = useRef(null)
  const taxTypeRef = useRef(null)
  const paymentTermsRef = useRef(null)
  const profitPriceRef = useRef(null)

  const init = {
    show_deliver_type: props.quote.deliver_type === LOCATION || props.quote.deliver_type === OTHER,
    show_detail_channel: props.quote.channel === BPR_ERP,
    active_discount: props.quote.discount > 0
  }

  const [state, setState] = useState(init)
 
  const saveDetailConfig = e => {
 
    e.preventDefault()

    /*
      TODO: 浮動小数を正規表現
      CONCRETE-1: 文字列をtrim
      CONCRETE-2: 文字列が入力された場合は、setStateしない
     */

    let setValues = {
      deliver_type: deliverTypeRef.current.value,
      deliver_type_note: state.show_delivery_type ? deliverTypeNoteRef.current.value : '',
      channel: channelRef.current.value,
      quote_number: state.show_detail_channel ? quoteNumberRef.current.value : '',
      google_drive: googleDriveRef.current.value,
      quote_type: quoteTypeRef.current.value,
      tax_type: taxTypeRef.current.value,
      payment_terms: paymentTermsRef.current.value
    }

    const profitPrice = profitPriceRef.current.value
    const matchProfitPrice = profitPrice.match(PATTERN)[0]
    if(matchProfitPrice.length === profitPrice.length) setValues = { ...setValues, profit_price: parseFloat(matchProfitPrice) }
    if(matchProfitPrice.length !== profitPrice.length) {

      mf_like_modal({
        icon: 'error',
        message: '整数・小数のみ入力してください。',
        close_callback: () => handleFocusRed(profitPriceRef.current)
      })
      return
    }

    if(state.show_detail_channel) {

      const temporaryPrice = temporaryPriceRef.current.value
      const matchTemporaryPrice = temporaryPrice.match(PATTERN)[0]
      if(matchTemporaryPrice.length === temporaryPrice.length) setValues = { ...setValues, temporary_price: parseFloat(matchTemporaryPrice) }
      if(matchTemporaryPrice.length !== temporaryPrice.length) {
  
        mf_like_modal({
          icon: 'error',
          message: '整数・小数のみ入力してください。',
          close_callback: () => handleFocusRed(temporaryPriceRef.current)
        })
        return
      }
    }
  
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
                      <textarea className='c-form-textarea' ref={ deliverTypeNoteRef }/>
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
                  { props.quote.google_drive_folder_id ?
                    <input
                      className='c-form-text'
                      value={ `作成済み(フォルダID: ${ props.quote.google_drive_folder_id })` }
                      readOnly
                    />
                    :
                    <div className='c-form-selectWrap'>
                      <select
                        className='c-form-select'
                        defaultValue={ props.quote ? props.quote.google_drive_folder_id : '' }
                        ref={ googleDriveRef }
                      >
                        { GOOGLE_DRIVE.map(type => <option key={ type.key } value={ type.key }>{ type.value }</option> ) }
                      </select>
                    </div>
                  }
                </td>
              </tr>

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