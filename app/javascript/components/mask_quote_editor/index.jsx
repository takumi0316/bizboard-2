import React, { Fragment, useEffect, useState } from 'react'
import Style from './style.sass'

// components
import EditingViewer from './editing_viewer'
import DocumentPreviewer from './document_preview'
import ConductingWire from './conducting_wire'
import ButtonsBelow from '../quote_editor/buttons_below';

const Index = props => {
 
  const [quote, setQuote] = useState( { ...props.quote,  quote_projects: props.quote_projects, company_name: props.company_name || '', client_name: props.client_name || '' })

  useEffect(() => {
    document.getElementsByClassName('l-dashboard__main')[0].style = 'padding-left: 104px;'
    document.getElementsByClassName('l-dashboard__rootExcept')[0].style = 'padding: 0 0'
  }, [])
 
  return(
    <div>
      <div id='quote_editor' className={ Style.QuoteEditor }>
        <EditingViewer divisions={ props.divisions } quote={ quote } setQuote={ setQuote } action={ props.action } user_id={ props.user_id }/>
        <DocumentPreviewer quote={ quote } jii_address={ props.jii_address } jii_tel={ props.jii_tel }/>
      </div>
      <div className={ Style.Footer }>
        <ConductingWire quote={ quote } work={ props.work } invoice={ props.invoice } activity={ props.activity } quotation={ props.quotation } delivery_note={ props.delivery_note } task={ props.task }/>
      </div>
    </div>
  )
}

export default Index
