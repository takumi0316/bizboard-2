import Dayjs from 'dayjs'
import {
  defaultItems,
  LOCATION,
  OTHER,
  BPR_ERP
} from './properties.es6'

export const addProject = (e, state, setState) => {
  
  e.preventDefault()
  e.target.blur()

  const reProjects = JSON.parse(JSON.stringify(state.projects))
  const length = state.projects.length
 
  if(length > 0) reProjects.push({
    ...defaultItems,
    id: state.projects[length - 1].id + 1,
    name: `test${ length + 1 }`,
    size: state.projects[length - 1].size + 1
  })

  if(length === 0) reProjects.push({
    ...defaultItems,
    id: 1,
    name: `test${ 1 }`,
    size: 1
  })

  setState({ ...state, projects: reProjects})
}

export const handleOpenDetailConfig = (e, state, setState) => {
  
  e.preventDefault()
  e.target.blur()
  setState({ ...state, open_detail_config: true })
}

export const currentDate = Dayjs(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).format('YYYY-MM-DD')

export const handleOpenDetailItem = (state, setState) => setState({ ...state, open_modal: true })

export const handleCloseDetailItem = (state, setState) => setState({ ...state, open_modal: false })

export const removeProject = (index, state, setState) => {

  const projectAfterOmission = state.projects.filter((project, pi) => index !== pi)
  setState({ ...state, projects: projectAfterOmission })
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
