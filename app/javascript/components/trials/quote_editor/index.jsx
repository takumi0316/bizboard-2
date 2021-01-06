import React, { Fragment, useEffect, useState } from 'react'
import Style from './style.sass'

// components
import EditingViewer from './editing_viewer'
import DocumentPreviewer from './document_preview'

import {
  QUOTE
} from './properties.es6'

const Index = props => {
 
  const [quote, setQuote] = useState(props.quote || QUOTE)

  useEffect(() => {
    document.getElementsByClassName('l-dashboard__main')[0].style = 'padding-top: 41.5px; padding-left: 104px;'
    document.getElementsByClassName('l-dashboard__rootExcept')[0].style = 'padding: 0 0'
  }, [])
 
  useEffect(() => console.log(quote), [quote])
  return(
    <div className={ Style.QuoteEditor }>
      <EditingViewer divisions={ props.divisions } quote={ quote } setQuote={ setQuote }/>
      <DocumentPreviewer />
    </div>
  )
}

export default Index
