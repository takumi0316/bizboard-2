import Dayjs from 'dayjs'

import {
  QUOTE_PROJECT,
  LOCATION,
  OTHER,
  BPR_ERP
} from './properties.es6'

export const addQuoteProject = (e, quote, setQuote) => {
  
  //e.preventDefault()
  e.target.blur()

  const quoteProjects = JSON.parse(JSON.stringify(quote.quote_projects))
  quoteProjects.push(QUOTE_PROJECT)
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

  const projectAfterOmission = quote.quote_projects.filter((project, pi) => index !== pi)
  setQuote({ ...quote, quote_projects: projectAfterOmission })
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

export const handleChangeDiscount = (state, setState) => setState({ ...state, active_discount: !state.active_discount })

export const handleFocusRed = tarDOM => {

  tarDOM.focus()
  tarDOM.style = 'border: solid 2px red'
}

export const setIssuesDate = (value, quote, setQuote) => setQuote({ ...quote, issues_date: value })

export const setExpiration = (value, quote, setQuote) => setQuote({ ...quote, expiration: value })

export const setDate = (value, quote, setQuote) => setQuote({ ...quote, date: value })

export const setDeliveryNoteDate = (value, quote, setQuote) => setQuote({ ...quote, delivery_note_date: value })

export const setDeliverAt = (value, quote, setQuote) => setQuote({ ...quote, deliver_at: value })

export const setReception = (value, state, setState) => setState({ ...state, reception: value })

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

export const setQuoteProjectUnit = (e, passIndex, quote, setQuote) => {
  
  let quote_projects = JSON.parse(JSON.stringify(quote.quote_projects))
  quote_projects[passIndex].unit = e.target.value
  setQuote({ ...quote, quote_projects: quote_projects })
}

export const setQuoteProjectUnitPrice = (e, passIndex, quote, setQuote) => {
  
  let quote_projects = JSON.parse(JSON.stringify(quote.quote_projects))
  quote_projects[passIndex].unit_price = e.target.value
  setQuote({ ...quote, quote_projects: quote_projects })
}

export const setQuoteProjectRemarks = (e, passIndex, quote, setQuote) => {
  
  let quote_projects = JSON.parse(JSON.stringify(quote.quote_projects))
  quote_projects[passIndex].remarks = e.target.value
  setQuote({ quote_projects: quote_projects })
}