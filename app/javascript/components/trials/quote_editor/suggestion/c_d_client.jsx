import React, { useEffect, useState } from 'react'
import Style from './style.sass'

const InputSuggestion = props => {
  
  const init = {
    searchTxt: props.inputTxt || '',
    selectClient: '',
    clients: '',
  }
  
  const [state, setState] = useState(init)
  
  useEffect(() => { /* props.setName(props.index, state.searchTxt) */ }, [state.searchTxt])
  
  const handleSelect = e => {
    
    const targetClient = { ...state.clients[e.target.dataset.number].client, name: `会社名: ${ state.clients[e.target.dataset.number].company.name } 部署名: ${ state.clients[e.target.dataset.number].division.name } 担当者名: ${ state.clients[e.target.dataset.number].client.name }` }
    //props.applyClient(targetClient, props.index)
    setState({ ...state, selectClient: targetClient, clients: '', searchTxt: targetClient.name })
  }
  
  const handleFocusOut = e => {
    if(!state.searchTxt) window.mf_like_modal({ icon: 'info', message: 'サジェストから担当者を選択して下さい。' })
    if(state.searchTxt) setState({ ...state, clients: '' })
  }
  
  const handleChange = e => {
    
    const inputTxt = e.target.value
    
    if(!inputTxt) {
      setState({ ...state, searchTxt: inputTxt, clients: '' })
      return
    }
    
    const request = window.xhrRequest.get(`/company_division_clients.json?name=${ inputTxt }`)
    request.then(res => {
      const resClients = res.data.clients.length === 0 ? '' : res.data.clients
      setState({ ...state, clients: resClients , searchTxt: inputTxt })
    }).catch(err => window.mf_like_modal({ icon: 'info', message: '担当者を取得出来ませんでした。' }))
  }
  
  return(
    <div className={ Style.Style }>
      <input
        key={ state.selectClient.id }
        className='c-form-text'
        placeholder='担当者名を入力'
        autoComplete='off'
        defaultValue={ state.searchTxt }
        onBlur={ handleFocusOut }
        onChange={ handleChange }
      />
      { state.clients ?
        <div className={ Style.Style__searchSuggestions }>
          { state.clients.map((r, index) => {
            const key = `${ r.client.name }-${ index }`
            return(
              <div
                {...{key}}
                data-number={ index }
                className={ Style.Style__searchSuggestion }
                onMouseDown={ handleSelect }
              >
                { `会社名: ${ r.company.name } 部署名: ${ r.division.name } 担当者名: ${ r.client.name }` }
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