import Dayjs from 'dayjs'

/* ------------------------------------ quote_editor/index.jsx ------------------------------------ */
export const defaultItems = {
  id: 1,
  name: 'test1',
  cost: 100,
  size: 1,
  memo: ''
}

export const addProject = (e, state, setState) => {
  
  e.preventDefault()
  e.target.blur()

  const reProjects = JSON.parse(JSON.stringify(state.projects))
  reProjects.push({
    ...defaultItems,
    id: state.projects[state.projects.length - 1].id + 1,
    name: `test${ state.projects.length + 1 }`,
    size: state.projects[state.projects.length - 1].size + 1
  })
  setState({ ...state, projects: reProjects})
}

export const handleOpenDetailConfig = (e, state, setState) => {
  
  e.preventDefault()
  e.target.blur()
  setState({ ...state, open_detail_config: true })
}

export const currentDate = Dayjs(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).format('YYYY-MM-DD')
/* ------------------------------------ quote_editor/index.jsx ------------------------------------ */


/* --------------------- quote_editor/item/table.jsx --------------------- */
export const handleOpenDetailItem = (state, setState) => setState({ ...state, open_modal: true })

export const handleCloseDetailItem = (state, setState) => setState({ ...state, open_modal: false })

export const removeProject = (index, state, setState) => {

  const projectAfterOmission = state.projects.filter((project, pi) => index !== pi)
  setState({ ...state, projects: projectAfterOmission })
}
/* --------------------- quote_editor/item/table.jsx --------------------- */


/* --------------------- quote_editor/modal/config.jsx --------------------- */
export const handleCloseDetailConfig = (state, setState) => setState({ ...state, open_detail_config: false })

export const handleChangeDeliveryType = (e, state, setState) => {

  console.log(e.target.dataset)
}
/* --------------------- quote_editor/modal/config.jsx --------------------- */
