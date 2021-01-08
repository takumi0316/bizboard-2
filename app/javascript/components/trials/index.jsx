import React, { Fragment } from 'react'
import QuoteEditor from './mask_quote_editor'

const Index = props => {
 
  return(
    <div>
      { /* <InputSuggestion /> */ }
      <QuoteEditor divisions={ props.divisions }/>
    </div>
  )
}

export default Index