import React, { Fragment, useEffect, useState, useRef } from 'react'
import Style from './style.sass'

const InputSuggestion = props => {

  const init = {
    searchTxt: '',
    projects: '',
    focus: false
  }

  const [state, setState] = useState(init)

  const handleFocusIn = e => setState({ ...state, focus: true })

  const handleSelect = e => {
 
    const targetProject = state.projects[e.target.dataset.number]
    props.applyProject(targetProject, props.index)
    setState({ ...state, focus: false, projects: '' })
  }
 
  const handleFocusOut = e => setState({ ...state, focus: false })

  const handleChange = e => {

    const inputTxt = e.target.value
    if(!inputTxt) {
      setState({ ...state, searchTxt: inputTxt, projects: '' })
      return
    }
    const request = window.xhrRequest.get(`/projects.json?free_word=${inputTxt}`)
    request.then(res => {
      setState({ ...state, projects: res.data.projects, searchTxt: inputTxt })
    }).catch(err => window.alertable({ icon: 'info', message: '品目を取得出来ませんでした。' }))
  }

  return(
    <div key={ props.inputTxt } className={ Style.Style }>
      <textarea
        placeholder='品目名を入力'
        autoComplete='off'
        defaultValue={ props.inputTxt || '' }
        onFocus={ handleFocusIn }
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