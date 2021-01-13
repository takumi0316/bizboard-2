import React, { useEffect, useState } from 'react'
import Style from './style.sass'
import { setCompanyName } from '../function'

const CDClientSuggestion = props => {
 
  const init = {
    searchTxt: props.inputTxt || '',
    clientId: props.client_id || '',
    clients: '',
  }
  
  const [state, setState] = useState(init)
  
  useEffect(() => { setCompanyName(state.company_name, props.quote, props.setQuote) }, [state.clientId])
  
  const handleSelect = e => {

    const target_client = state.clients[e.target.dataset.number]

    setState({ ...state, clientId: target_client.client.id, clients: '', searchTxt: `会社名: ${ target_client.company.name }\n部署名: ${ target_client.division.name }\n担当者名: ${ target_client.client.name }`, company_name: target_client.company.name })
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
    }).catch(err => window.mf_like_modal({ icon: 'info', message: '担当者を取得出来ませんでした。', close_callback: () => console.log(err) }))
  }
  
  return(
    <div className={ Style.Style }>
      <textarea
        key={ state.clientId }
        rows='3'
        type='textarea'
        data-set={ state.clientId }
        ref={ props.clientRef }
        placeholder='担当者名を入力'
        autoComplete='off'
        defaultValue={ state.searchTxt }
        disabled={ props.quote.lock }
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

export default CDClientSuggestion