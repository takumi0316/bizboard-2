import React, { useEffect, useRef, useState } from 'react'
import Style from './style.sass'
import Dayjs  from 'dayjs'

// component
import CDClientSuggestion from './suggestion/c_d_client'
import ItemTable from './item/table'
import Help from '../utilities/help'
import DetailConfigModal from './modal/config'
import DatetimePicker from './datetime_picker'

import {
  currentDate,
  addQuoteProject,
  handleOpenDetailConfig,
  handleFocusRed,
  setIssuesDate,
  setExpiration,
} from './function'

import { DESTINATIONS } from './properties.es6'

const EditingViewer = props => {

  const clientRef = useRef(null)
  const subjectRef = useRef(null)
  const memoRef = useRef(null)

  const init = { open_detail_config: false }
 
  const [state, setState] = useState(init)

  const saveContents = e => {

    e.preventDefault()
    let setContents = {
      issues_date: document.getElementById('issues_date').value,
      expiration: document.getElementById('expiration').value,
      memo: memoRef.current.value || '',
    }

    const clientDOM = clientRef.current
    if(clientDOM.dataset.set) setContents = { ...setContents, client_id: clientDOM.dataset.set }
    if(!clientDOM.dataset.set) {

      mf_like_modal({
        icon: 'error',
        message: 'お客様情報を入力してください',
        close_callback: () => handleFocusRed(clientDOM)
      })
      return
    }

    const subject = props.quote.subject
    if(subject) setContents = { ...setContents, subject: subject }
    if(!subject) {
    
      mf_like_modal({
        icon: 'error',
        message: '件名を入力して下さい',
        close_callback: () => handleFocusRed(subjectRef.current)
      })
      return
    }
  
    const noSelectedProject = []
    const field = new FormData()

    let price = 0
 
    props.quote.quote_projects.map((project, index) => {
    
      if(project.id && noSelectedProject.length === 0 && !project.name && !project.project_id) noSelectedProject.push({ index: index })
      if(!project.id && project._destroy) return
 
      const sumPrice = Math.round(parseFloat(project.unit) * parseFloat(project.unit_price))
      field.append('quote[quote_projects_attributes][][id]', project.id)
      field.append('quote[quote_projects_attributes][][project_id]', project.project_id)
      field.append('quote[quote_projects_attributes][][quote_id]', project.quote_id)
      field.append('quote[quote_projects_attributes][][name]', project.name)
      field.append('quote[quote_projects_attributes][][remarks]', project.remarks)
      field.append('quote[quote_projects_attributes][][unit_price]', project.unit_price)
      field.append('quote[quote_projects_attributes][][unit]', project.unit)
      field.append('quote[quote_projects_attributes][][price]', sumPrice)
      field.append('quote[quote_projects_attributes][][project_name]', project.project_name)
      if(project.id && project._destroy) {
        field.append('quote[quote_projects_attributes][][_destroy]', 1)
        return
      }
      price = price + sumPrice
    })
 
    field.append('quote[id]', props.quote.id || '')
    field.append('quote[division_id]', props.quote.division_id)
    field.append('quote[company_division_client_id]', setContents.client_id)
    field.append('quote[destination]', props.quote.destination)
    field.append('quote[subject]', setContents.subject)
    field.append('quote[quote_type]', props.quote.quote_type || 'contract')
    field.append('quote[quote_number]', props.quote.quote_number || '')
    field.append('quote[temporary_price]', props.quote.temporary_price || 0)
    field.append('quote[profit_price]', props.quote.profit_price || 0)
    field.append('quote[tax_type]', props.quote.tax_type || 'taxation')
    field.append('quote[tax]', props.quote.tax)
    field.append('quote[payment_terms]', props.quote.payment_terms || 'postpaid')
    field.append('quote[channel]', props.quote.channel || 'estimate')
    field.append('quote[date]', props.quote.date || '')
    field.append('quote[issues_date]', props.quote.issues_date || '')
    field.append('quote[expiration]', props.quote.expiration || '')
    field.append('quote[delivery_note_date]', props.quote.delivery_note_date || '')
    field.append('quote[deliver_at]', props.quote.deliver_at || Dayjs(new Date(new Date().getFullYear(), new Date().getMonth() + 2, 0)).format('YYYY-MM-DD'))
    field.append('quote[reception]', props.quote.reception || 'acceptance')
    field.append('quote[remarks]', props.quote.remarks || '')
    field.append('quote[memo]', memoRef.current.value || '')
    field.append('quote[drive_folder_id]', props.quote.drive_folder_id || '')
    field.append('quote[user_id]', props.user_id)
    field.append('quote[discount]', props.quote.discount || 0)
    field.append('quote[price]', price)
    field.append('quote[deliver_type]', props.quote.deliver_type || 'seat')
    field.append('quote[deliver_type_note]', props.quote.deliver_type_note || '')

    if(!props.quote.drive_folder_id && props.quote.drive_folder_exist === 'true') field.append('quote[google_drive_exist]', 'true')

    const request = props.quote.id ? window.xhrRequest.put(props.action, field) : window.xhrRequest.post(props.action, field)
    request.then(res => {
    
      if(res.data.status === 'success') {
      
        if(props.quote.id) {
          props.setQuote({ ...props.quote, price: price, drive_folder_id: res.data.drive_folder_id })
          window.mf_like_modal({ icon: 'success', message: '案件を保存しました' })
        }
      
        // 編集ページへリダイレクト
        if(!props.quote.id) {
          const redirect = () => location.href = `${res.data.quote.id}/edit`
          window.mf_like_modal({ icon: 'success', message: '案件を保存しました', close_callback: () => redirect() })
        }
      }
    }).catch(err => window.mf_like_modal({ icon: 'error', message: '案件の保存に失敗しました', close_callback: () => console.log(err) }))
  }

  return (
    <div className={ Style.EditingViewer }>
      <div className={ Style.EditingViewer__header }>見積書編集</div>
      <div className={ Style.EditingViewer__inner }>

        <div className={ Style.EditingViewer__innerColumn }>
          <div className='c-flex'>

            <div style={{ width: '60%' }}>
              <div>
                <strong>
                  お客様情報
                  <div className={ Style.EditingViewer__innerColumn__must }>必須</div>
                </strong>
              </div>
              <div>
                <CDClientSuggestion
                  inputTxt={ props.quote.client_info }
                  client_id={ props.quote.company_division_client_id }
                  clientRef={ clientRef }
                  quote={ props.quote }
                  setQuote={ props.setQuote }
                />
              </div>
            </div>

            <div className='u-ml-20'>
              <div>
                <strong>
                  宛先
                  <Help content='帳票の宛先を指定してください'/>
                  <div className={ Style.EditingViewer__innerColumn__must }>必須</div>
                </strong>
              </div>
              <div className='c-form-selectWrap'>
                <select className='c-form-select' defaultValue={ props.quote.destination } onChange={ e => props.setQuote({ ...props.quote, destination: e.target.value }) }>
                  { DESTINATIONS.map(destination => {
                    return <option key={ destination.key } value={ destination.key }>{ destination.value }</option>
                  }) }
                </select>
              </div>
            </div>

          </div>
        </div>

        <div className={ `${ Style.EditingViewer__innerColumn } u-mt-5` }>
          <div className={ `${ Style.EditingViewer__innerColumn__three } ${ Style.EditingViewer__innerColumn__quoteNumber }` }>
            <strong>見積書番号</strong>
            <input className='c-form-text' defaultValue={ props.quote.quote_number } readOnly='readonly'/>
          </div>
          <div
            className={ `${ Style.EditingViewer__innerColumn__three } ${ Style.EditingViewer__innerColumn__threeDate }` }>
            <strong>発行日</strong>
            <DatetimePicker
              id='issues_date'
              default_datetime={ props.quote.issues_date || currentDate }
              state={ props.quote }
              setState={ props.setQuote }
              applyDateTime={ setIssuesDate }
              lock={ props.quote.lock }
            />
          </div>
          <div
            className={ `${ Style.EditingViewer__innerColumn__three } ${ Style.EditingViewer__innerColumn__threeDate }` }>
            <strong>有効期限</strong>
            <div>
              <DatetimePicker
                id='expiration'
                key={ props.quote.expiration }
                default_datetime={ props.quote.expiration || currentDate }
                state={ props.quote }
                setState={ props.setQuote }
                applyDateTime={ setExpiration }
                lock={ props.quote.lock }
              />
              { !props.quote.lock ?
                <div className='u-mt-5 c-flex__center'>
                  <span
                    className={ Style.EditingViewer__btnFreeze }
                    data-set={ Dayjs(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format('YYYY-MM-DD') }
                    onClick={ e => props.setQuote({ ...props.quote, expiration: e.target.dataset.set }) }
                  >
                    今月末
                  </span>
                  <div className='u-ml-5'>
                    <span
                      className={ Style.EditingViewer__btnFreeze }
                      data-set={ Dayjs(new Date(new Date().getFullYear(), new Date().getMonth() + 2, 0)).format('YYYY-MM-DD') }
                      onClick={ e => props.setQuote({ ...props.quote, expiration: e.target.dataset.set }) }
                    >
                      来月末
                    </span>
                  </div>
                </div>
                : null
              }
            </div>
          </div>
        </div>

        <div className={ `${ Style.EditingViewer__innerColumn } u-mt-5` }>
          <div>
            <strong>
              件名
              <div className={ Style.EditingViewer__innerColumn__must }>必須</div>
            </strong>
            <div className='u-mt-5'>
              <input
                className='c-form-text'
                ref={ subjectRef }
                defaultValue={ props.quote.subject || '' }
                disabled={ props.quote.lock }
                onChange={ e => props.setQuote({ ...props.quote, subject: e.target.value }) }
              />
            </div>
          </div>
        </div>

        <div className={ `${ Style.EditingViewer__innerColumn } u-mt-5` }>
          <div>
            <strong>明細</strong>
            <ItemTable quote={ props.quote } setQuote={ props.setQuote }/>
          </div>

          { !props.quote.lock ?
            <div className='u-ta-right u-mt-5'>
              <button className={ Style.EditingViewer__btnNormal } onClick={ e => addQuoteProject(e, props.quote, props.setQuote) }>
                <i/>
                行を追加
              </button>
            </div>
            : null
          }
        </div>

        <div className={ `${ Style.EditingViewer__innerColumn } u-mt-5` }>
          <div>
            <strong>
              備考
              <Help content='見積もりに記載されます'/>
            </strong>
            <div>
              <textarea
                className='c-form-textarea'
                rows={ props.quote.remarks ? props.quote.remarks.match(/\n/g) ? props.quote.remarks.match(/\n/g).length + 1 : 2 : '' }
                onChange={ e => props.setQuote({ ...props.quote, remarks: e.target.value }) }
                defaultValue={ props.quote.remarks }
                disabled={ props.quote.lock }
              />
            </div>
          </div>
        </div>

        <div className={ `${ Style.EditingViewer__innerColumn } u-mt-5` }>
          <div>
            <strong>
              メモ
              <Help content='見積もりに記載されません'/>
            </strong>
            <div>
              <textarea
                className='c-form-textarea'
                rows={ props.quote.memo ? props.quote.memo.match(/\n/g) ? props.quote.memo.match(/\n/g).length + 1 : 2 : '' }
                defaultValue={ props.quote.memo }
                ref={ memoRef }
                disabled={ props.quote.lock }
              />
            </div>
          </div>
        </div>

        <div className='u-mt-5 c-flex__center c-flex-alignItems__center'>
          <div>
            <button className='c-btnMain' onClick={ e => handleOpenDetailConfig(e, state, setState) }>詳細設定</button>
          </div>
          { !props.quote.lock ?
             <div className='u-ml-5'>
               <button className='c-btnMain c-btn-blue' onClick={ saveContents }>保存</button>
             </div>
            : null
          }
        </div>

      </div>

      { state.open_detail_config ?
        <DetailConfigModal
          quote={ props.quote }
          setQuote={ props.setQuote }
          parentState={ state }
          parentSetState={ setState }
          divisions={ props.divisions }
          division_id={ props.quote.division_id || props.division_id }
        />
        : null
      }
    </div>
  )
}

export default EditingViewer
