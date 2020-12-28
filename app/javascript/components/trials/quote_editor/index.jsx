import React, { Fragment, useEffect } from 'react'
import Style from './style.sass'

// components
import EditingViewer from './editing_viewer'
import DocumentPreviewer from './document_preview'

const Index = props => {
 
  useEffect(() => {
    document.getElementsByClassName('l-dashboard__main')[0].style = 'padding-top: 41.5px; padding-left: 104px;'
    document.getElementsByClassName('l-dashboard__rootExcept')[0].style = 'padding: 0 0'
  }, [])
 
  return(
    <div className={ Style.QuoteEditor }>
      <EditingViewer divisions={ props.divisions }/>
      <DocumentPreviewer />
    </div>
  )
}

export default Index
