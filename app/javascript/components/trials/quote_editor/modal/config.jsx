import React, { useState } from 'react'
import Style from '../style.sass'
import Icon    from 'react-evil-icons'

// components
import DatetimePicker from '../datetime_picker'

import {
  handleCloseDetailConfig,
  handleChangeDeliveryType
} from '../function'

import {
  DELIVER_TYPES,
  CHANNELS,
  QUOTE_TYPES,
  GOOGLE_DRIVE,
  TAX_TYPES,
} from '../properties.es6'

const ConfigModal = props => {
 
  const init = {
    show_delivery_note: false,
    show_quote_number: false
  }

  const [state, setState] = useState(init)
 
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
                <td><DatetimePicker /></td>
              </tr>

              <tr>
                <th>納品日</th>
                <td><DatetimePicker /></td>
              </tr>

              <tr>
                <th>納期</th>
                <td><DatetimePicker /></td>
              </tr>

              <tr>
                <th>納品方法</th>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' defaultValue={ props.parentState.quote.deliver_type || '' } onChange={ e => handleChangeDeliveryType(e, state, setState) }>
                      { DELIVER_TYPES.map((type, index) => {
                        const key = 'deliver_type' + index
                        return(
                          <option key={ key } data-set={ type.key }>{ type.value }</option>
                        )
                      }) }
                    </select>
                  </div>
                  { state.show_delivery_note ?
                    <textarea className='c-form-textarea'/>
                    : null
                  }
                </td>
              </tr>
 
              <tr>
                <th>受注経路</th>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' defaultValue={ props.parentState.quote.channel || '' }>
                      { CHANNELS.map((type, index) => {
                        const key = 'channel' + index
                        return(
                          <option key={ key } data-set={ type.key }>{ type.value }</option>
                        )
                      }) }
                    </select>
                  </div>
                </td>
              </tr>

              <tr>
                <th>受注区分</th>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' defaultValue={ props.parentState.quote.quote_type || '' }>
                      { QUOTE_TYPES.map((type, index) => {
                        const key = 'quote_type' + index
                        return(
                          <option key={ key } data-set={ type.key }>{ type.value }</option>
                        )
                      }) }
                    </select>
                  </div>
                </td>
              </tr>

              <tr>
                <th>Google Drive</th>
                <td>
                  { props.parentState.quote.google_drive_folder_id ?
                    <input className='c-form-text' defaultValue={ `作成済み(フォルダID: ${ props.parentState.quote.google_drive_folder_id })` } readOnly/>
                    :
                    <div className='c-form-selectWrap'>
                      <select className='c-form-select' defaultValue={ props.parentState.quote ? props.parentState.quote.google_drive_folder_id : '' }>
                        { GOOGLE_DRIVE.map((type, index) => {
                          const key = 'google_drive' + index
                          return(
                            <option key={ key } data-set={ type.key }>{ type.value }</option>
                          )
                        }) }
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
                      <input type='radio' defaultChecked={ true } disabled={ '' } className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>値引きなし</span>
                    </label>
                    <label className='c-form-radioLabel u-ml-15'>
                      <input type='radio' defaultChecked={ false } disabled={ '' } className='c-form-radio' />
                      <i className='c-form-radioIcon' />
                      <span>値引きあり</span>
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                <th>課税対象</th>
                <td>
                  <div className='c-form-selectWrap'>
                    <select className='c-form-select' defaultValue={ props.parentState.quote.tax_type || '' }>
                      { TAX_TYPES.map((type, index) => {
                        const key = 'tax_type' + index
                        return(
                          <option key={ key } data-set={ type.key }>{ type.value }</option>
                        )
                      }) }
                    </select>
                  </div>
                </td>
              </tr>

              <tr>
                <th>利益額</th>
                <td><input className='c-form-text'/></td>
              </tr>

              </tbody>
            </table>
          </div>
          
          <div className='u-ta-center u-mt-15 u-mb-20'>
            <button className='c-btnMain c-btn-blue'>保存</button>
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default ConfigModal