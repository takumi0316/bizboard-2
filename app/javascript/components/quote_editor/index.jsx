import React, { Fragment, useEffect, useState } from 'react'
import Style from './style.sass'

// components
import EditingViewer from './editing_viewer'
import DocumentPreviewer from './document_preview'
import ConductingWire from './conducting_wire'

const QuoteEditor = props => {

  const { zip, address1, address2, prefecture_id } = props.company_division
  const [quote, setQuote] = useState( {
    ...props.quote,
    division_id: props.quote.division_id || props.division_id,
    quote_projects: props.quote_projects,
    company_name: props.company_name,
    company_division: { zip: zip || '', address1: address1 || '', address2: address2 || '', prefecture_id: prefecture_id || '' },
    client_name: props.client_name,
    client_info: props.client_info
  })

  useEffect(() => {
    document.getElementsByClassName('l-dashboard__rootExcept')[0].style = 'padding: 0 0'
    document.getElementById('js-drawerOpen').click()
  }, [])

  return(
    <div id='quote_editor'>
      <div className={ Style.QuoteEditor }>
        <div className='c-flex'>
          <EditingViewer
            divisions={ props.divisions }
            quote={ quote }
            setQuote={ setQuote }
            action={ props.action }
            user_id={ props.user_id }
          />
          <DocumentPreviewer
            quote={ quote }
            jii_address={ props.jii_address }
            jii_tel={ props.jii_tel }
          />
        </div>
        <div className={ Style.QuoteEditor__footer }>
          <div className={ Style.QuoteEditor__footer__innerContents }>
            { props.quote.id ?
              <ConductingWire
                quote={ quote }
                work={ props.work }
                invoice={ props.invoice }
                activity={ props.activity }
                quotation={ props.quotation }
                delivery_note={ props.delivery_note }
                task={ props.task }
              />
              : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuoteEditor