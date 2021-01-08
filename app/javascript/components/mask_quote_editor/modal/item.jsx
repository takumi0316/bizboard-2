import React, { useRef } from 'react'
import Style from '../style.sass'
import Icon    from 'react-evil-icons'

import {
 handleCloseDetailItem
} from '../function'

const ItemModal = props => {

  const remarksRef = useRef(null)
  const saveContents = e => {

    e.preventDefault()
    const tarVal = remarksRef.current.value
    const quote_projects = JSON.parse(JSON.stringify(props.quote.quote_projects))
    quote_projects[props.state.tarIndex].remarks = tarVal
    props.setState({ ...props.state, open_modal: false })
    props.setQuote({ ...props.quote, quote_projects: quote_projects })
  }
 
  return(
    <div className={ Style.EditingViewer__modal }>
      <div className={ Style.EditingViewer__modalDialog }>
        <div className={ Style.EditingViewer__modalContent }>

          <div className={ `u-va-middle c-flex__between c-flex-alignItems__center ${ Style.EditingViewer__modalHeader }` }>
            <p>
              品目詳細
            </p>
            <div onClick={ () => handleCloseDetailItem(props.state, props.setState) }>
              <Icon name='ei-close' size='m' color='white'/>
            </div>
          </div>

          <div className={ Style.EditingViewer__modalBody }>
            <table>
              <tbody>
                <tr>
                  <th>備考</th>
                  <td>
                    <textarea
                      className='c-form-textarea'
                      ref={ remarksRef }
                      defaultValue={ props.quote.quote_projects[props.state.tarIndex].remarks }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='u-ta-center u-mt-15 u-mb-20'>
            <button className='c-btnMain c-btn-blue' onClick={ saveContents }>保存</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ItemModal