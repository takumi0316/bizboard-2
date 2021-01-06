import React, { useEffect, useRef, useState } from 'react'
import Style from './style.sass'
import Dayjs  from 'dayjs'

// component
import InputSuggestion from './suggestion/c_d_client'
import ItemTable from './item/table'
import Help from '../../utilities/help'
import DetailConfigModal from './modal/config'
import DatetimePicker from './datetime_picker'

import {
  currentDate,
  addProject,
  handleOpenDetailConfig,
  handleFocusRed,
} from './function'

import {
  defaultItems,
} from './properties.es6'

const EditingViewer = props => {

  const clientRef = useRef(null)
  const divisionRef = useRef(null)
  const subjectRef = useRef(null)
  const remarksRef = useRef(null)
  const memoRef = useRef(null)

  const init = {
    open_detail_config: false,
    projects: props.quote.projects || [defaultItems],
    detail_config_values: {}
  }
 
  const [state, setState] = useState(init)
 
  useEffect(() => {
    //console.log(state)
  }, [state])
 
  const saveContents = e => {

    e.preventDefault()
    let setContents = {
      division_id: divisionRef.current.value,
      issues_date: document.getElementById('issues_date').value,
      expiration: document.getElementById('expiration').value,
      remarks: remarksRef.current.value || '',
      memo: memoRef.current.value || '',
    }

    const clientDOM = clientRef.current
    if(clientDOM.dataset.set) setContents = { ...setContents, client_id: clientDOM.dataset.set }
    if(!clientDOM.dataset.set) {

      mf_like_modal({
        icon: 'error',
        message: 'お客様情報を入力してください。',
        close_callback: () => handleFocusRed(clientDOM)
      })
      return
    }

    const subjectDOM = subjectRef.current
    if(subjectDOM.value) setContents = { ...setContents, subject: subjectDOM.value }
    if(!subjectDOM.value) {
    
      mf_like_modal({
        icon: 'error',
        message: '件名を入力して下さい。',
        close_callback: () => handleFocusRed(subjectDOM)
      })
      return
    }
 
  }

  return (
    <div className={ Style.EditingViewer }>
      <div className={ Style.EditingViewer__header }>見積書編集</div>
      <div className={ Style.EditingViewer__inner }>

        <div className={ Style.EditingViewer__innerColumn }>
          <div>
            <strong>
              お客様情報
              <div className={ Style.EditingViewer__innerColumn__must }>必須</div>
            </strong>
          </div>
          <div className='u-mt-5'>
            <InputSuggestion clientRef={ clientRef }/>
          </div>
        </div>

        <div className={ Style.EditingViewer__innerColumn }>
          <div>
            <strong>
              売上部署
              <div className={ Style.EditingViewer__innerColumn__must }>必須</div>
            </strong>
          </div>
          <div className='u-mt-5 c-form-selectWrap'>
            <select className='c-form-select' ref={ divisionRef } defaultValue={ props.quote.division_id || '' }>
              { props.divisions.map(division => <option key={ division[1] } value={ division[1] }>{ division[0] }</option>)}
            </select>
          </div>
        </div>

        <div className={ Style.EditingViewer__innerColumn }>
          <div className={ Style.EditingViewer__innerColumn__three }>
            <strong>見積書番号</strong>
            <input className='c-form-text' defaultValue={ props.quote.quote_number } readOnly='readonly'/>
          </div>
          <div
            className={ `${ Style.EditingViewer__innerColumn__three } ${ Style.EditingViewer__innerColumn__threeDate }` }>
            <strong>発行日</strong>
            <DatetimePicker id='issues_date' default_datetime={ currentDate }/>
          </div>
          <div
            className={ `${ Style.EditingViewer__innerColumn__three } ${ Style.EditingViewer__innerColumn__threeDate }` }>
            <strong>有効期限</strong>
            <div>
              <DatetimePicker id='expiration' key={ props.quote.expiration } default_datetime={ props.quote.expiration }/>
              <div className='u-mt-5 c-flex__between'>
                <span
                  className={ Style.EditingViewer__btnFreeze }
                  data-set={ Dayjs(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format('YYYY-MM-DD') }
                  onClick={ e => props.setQuote({ ...props.quote, expiration: e.target.dataset.set }) }
                >
                  今月末
                </span>
                <span
                  className={ Style.EditingViewer__btnFreeze }
                  data-set={ Dayjs(new Date(new Date().getFullYear(), new Date().getMonth() + 2, 0)).format('YYYY-MM-DD') }
                  onClick={ e => props.setQuote({ ...props.quote, expiration: e.target.dataset.set }) }
                >
                  来月末
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={ Style.EditingViewer__innerColumn }>
          <div>
            <strong>
              件名
              <div className={ Style.EditingViewer__innerColumn__must }>必須</div>
            </strong>
            <div className='u-mt-5'>
              <input className='c-form-text' ref={ subjectRef } defaultValue={ props.quote ? props.quote.subject : '' }/>
            </div>
          </div>
        </div>

        <div className={ Style.EditingViewer__innerColumn }>
          <div>
            <strong>明細</strong>
            <ItemTable parentState={ state } parentSetState={ setState }/>
          </div>

          <div className='u-ta-right u-mt-5'>
            <button className={ Style.EditingViewer__btnNormal } onClick={ e => addProject(e, state, setState) }>
              <i/>
              行を追加
            </button>
          </div>
        </div>

        <div className={ Style.EditingViewer__innerColumn }>
          <div>
            <strong>
              備考
              <Help content='見積もりに記載されます'/>
            </strong>
            <div className='u-mt-5'>
              <textarea className='c-form-textarea' ref={ remarksRef }/>
            </div>
          </div>
        </div>

        <div className={ Style.EditingViewer__innerColumn }>
          <div>
            <strong>
              メモ
              <Help content='見積もりに記載されません'/>
            </strong>
            <div className='u-mt-5'>
              <textarea className='c-form-textarea' ref={ memoRef }/>
            </div>
          </div>
        </div>

        <div className='u-mt-15 c-flex__center c-flex-alignItems__center'>
          <div>
            <button className='c-btnMain' onClick={ e => handleOpenDetailConfig(e, state, setState) }>詳細設定</button>
          </div>
          <div className='u-ml-5'>
            <button className='c-btnMain c-btn-blue' onClick={ saveContents }>保存</button>
          </div>
        </div>

      </div>

      { state.open_detail_config ?
        <DetailConfigModal quote={ props.quote } setQuote={ props.setQuote } parentState={ state } parentSetState={ setState }/>
        : null
      }
    </div>
  )
}

export default EditingViewer
