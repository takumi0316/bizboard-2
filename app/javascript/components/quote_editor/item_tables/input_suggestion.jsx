import React, { useEffect, useState } from 'react'
import Style from './style.sass'

const InputSuggestion = props => {

  const init = {
    searchTxt: props.inputTxt || '',
    selectProject: '',
    projects: '',
  }

  const [state, setState] = useState(init)

  useEffect(() => { props.setName(props.index, state.searchTxt) }, [state.searchTxt])
  
  const handleSelect = e => {
 
    const targetProject = state.projects[e.target.dataset.number]
    props.applyProject(targetProject, props.index)
    setState({ ...state, selectProject: targetProject, projects: '', searchTxt: targetProject.name })
  }
 
  const handleFocusOut = e => {
    if(!state.searchTxt) window.mf_like_modal({ icon: 'info', message: 'サジェストから品目を選択して下さい。' })
    if(state.searchTxt) setState({ ...state, projects: '' })
  }

  const handleChange = e => {

    const inputTxt = e.target.value

    if(!inputTxt) {
      setState({ ...state, searchTxt: inputTxt, projects: '' })
      return
    }

    const request = window.xhrRequest.get(`/projects.json?free_word=${ inputTxt }`)
    request.then(res => {
      const resProjects = res.data.projects.length === 0 ? '' : res.data.projects
      setState({ ...state, projects: resProjects , searchTxt: inputTxt })
    }).catch(err => window.mf_like_modal({ icon: 'info', message: '品目を取得出来ませんでした。' }))
  }

  return(
    <div className={ Style.Style }>
      <textarea
        key={ state.selectProject.id }
        placeholder='品目名を入力'
        autoComplete='off'
        defaultValue={ state.searchTxt }
        onBlur={ handleFocusOut }
        onChange={ handleChange }
      />
      { state.projects ?
        <div className={ Style.Style__searchSuggestions }>
          { state.projects.map((project, index) => {
            const key = `${ project.name }-${ index }`
            return(
              <div
                {...{key}}
                data-number={ index }
                className={ Style.Style__searchSuggestion }
                onMouseDown={ handleSelect }
              >
                { project.name }
              </div>
            )
          })}
        </div>
      : null
      }
    </div>
  )
}

export default InputSuggestion