import Dayjs from 'dayjs'

import {
  QUOTE_PROJECT,
  LOCATION,
  OTHER,
  BPR_ERP,
  PATTERN
} from './properties.es6'

export const addQuoteProject = (e, quote, setQuote) => {
  
  //e.preventDefault()
  e.target.blur()

  const quoteProjects = JSON.parse(JSON.stringify(quote.quote_projects))
  quoteProjects.push({ ...QUOTE_PROJECT, uid: new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16) })
  setQuote({ ...quote, quote_projects: quoteProjects })
}

export const handleOpenDetailConfig = (e, state, setState) => {
  
  e.preventDefault()
  e.target.blur()
  setState({ ...state, open_detail_config: true })
}

export const currentDate = Dayjs(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).format('YYYY-MM-DD')

export const currentDateTime = Dayjs(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes())).format('YYYY-MM-DD HH:mm')

export const handleOpenDetailItem = (tarIndex, state, setState) => setState({ ...state, tarIndex: tarIndex, open_modal: true })

export const handleCloseDetailItem = (state, setState) => setState({ ...state, open_modal: false })

export const removeQuoteProject = (index, quote, setQuote) => {

  const quote_projects = JSON.parse(JSON.stringify(quote.quote_projects)).map((project, pi) => {

    if(index !== pi) return project
    
    if(index === pi) return { ...project, _destroy: true }
  })

  setQuote({ ...quote, quote_projects: quote_projects })
}

export const handleCloseDetailConfig = (state, setState) => setState({ ...state, open_detail_config: false })

export const handleChangeDeliverType = (e, state, setState) => {
  
  const tarVal = e.target.value
  setState({ ...state, show_deliver_type: tarVal === LOCATION || tarVal === OTHER })
}

export const handleChangeChannel = (e, state, setState) => {
  
  const tarVal = e.target.value

  if(tarVal === BPR_ERP && !state.show_detail_channel) setState({ ...state, show_detail_channel: true })
  if(tarVal !== BPR_ERP && state.show_detail_channel) setState({ ...state, show_detail_channel: false })
}

export const handleFocusRed = tarDOM => {

  tarDOM.focus()
  tarDOM.style = 'border: solid 2px red'
}

export const setIssuesDate = (value, quote, setQuote) => setQuote({ ...quote, issues_date: value })

export const setExpiration = (value, quote, setQuote) => setQuote({ ...quote, expiration: value })

export const setDate = (value, quote, setQuote) => setQuote({ ...quote, date: value })

export const setDeliveryNoteDate = (value, quote, setQuote) => setQuote({ ...quote, delivery_note_date: value })

export const setDeliverAt = (value, quote, setQuote) => setQuote({ ...quote, deliver_at: value })

export const applyQuoteProject = (index, tarProject, quote, setQuote) => {
  
  const quote_projects = JSON.parse(JSON.stringify(quote.quote_projects))

  quote_projects[index].project_id = tarProject.id
  quote_projects[index].name = tarProject.name
  quote_projects[index].remarks = tarProject.note || ''
  quote_projects[index].unit_price = tarProject.price
  quote_projects[index].unit = 1
  quote_projects[index].price = tarProject.price

  setQuote({ ...quote,  quote_projects: quote_projects })
}

export const setQuoteProjectName = (passIndex, name, quote, setQuote) => {
  
  let quote_projects = JSON.parse(JSON.stringify(quote.quote_projects))
  quote_projects[passIndex].name = name
  setQuote({ ...quote, quote_projects: quote_projects })
}

/*
   品目数量
   品目単価と品目数量は同じロジックにまとめれられそう
 */

export const setQuoteProjectUnit = (e, passIndex, quote, setQuote) => {

  let tar_unit = e.target.value.trim()
  let quote_projects = JSON.parse(JSON.stringify(quote.quote_projects))
  tar_unit = tar_unit.replace(/[ー]/, '-')
  const cast_unit = tar_unit.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0)-0xFEE0))
  const res_unit = cast_unit.replace(PATTERN, '')
  const unit = quote_projects[passIndex].unit

  if(unit !== res_unit) {
    const set_unit = isNaN(parseFloat(res_unit)) ? 0 : res_unit
    quote_projects[passIndex].unit = parseFloat(set_unit)
    setQuote({ ...quote, quote_projects: quote_projects })
  }
}

// 品目単価
export const setQuoteProjectUnitPrice = (e, passIndex, quote, setQuote) => {
  
  let tar_unit_price = e.target.value.trim()
  let quote_projects = JSON.parse(JSON.stringify(quote.quote_projects))
  tar_unit_price = tar_unit_price.replace(/[ー]/, '-')
  const cast_unit_price = tar_unit_price.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0)-0xFEE0))
  const res_unit_price = cast_unit_price.replace(PATTERN, '')
  const unit_price = quote_projects[passIndex].unit_price

  if(unit_price !== res_unit_price) {
    const set_unit_price = isNaN(parseFloat(res_unit_price)) ? 0 : res_unit_price
    quote_projects[passIndex].unit_price = parseFloat(set_unit_price)
    setQuote({ ...quote, quote_projects: quote_projects })
  }
}

export const setCompanyName = (company_name, company_division, client_name, quote, setQuote) => setQuote({ ...quote, company_name: company_name, company_division: company_division, client_name: client_name })

