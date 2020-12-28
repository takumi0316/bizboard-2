import React from 'react'
import Style from '../style.sass'
import Icon    from 'react-evil-icons'

const ItemModal = props => {

  return(
    <div className={ Style.EditingViewer__modal }>
      <div className={ Style.EditingViewer__modalDialog }>
        <div className={ Style.EditingViewer__modalContent }>

          <div className={ `u-va-middle c-flex__between c-flex-alignItems__center ${ Style.EditingViewer__modalHeader }` }>
            <p>
              品目詳細
            </p>
            <div onClick={ props.closeDetailItem }>
              <Icon name='ei-close' size='m' color='white'/>
            </div>
          </div>

          <div className={ Style.EditingViewer__modalBody }>
            <table>
              <tbody>
                <tr>
                  <th>備考</th>
                  <td><textarea className='c-form-textarea'/></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='u-ta-center u-mt-15 u-mb-20'>
            <button className='c-btnMain c-btn-blue'>保存</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ItemModal