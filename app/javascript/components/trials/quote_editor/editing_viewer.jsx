import React from 'react'
import Style from './style.sass'

const EditingViewer = props => {
 
  return(
    <div className={ Style.EditingViewer }>
      <div className={ Style.EditingViewer__header  }>見積書編集</div>
      <div className={ Style.EditingViewer__inner  }>
        <div className={ Style.EditingViewer__innerColumn }>
          <div>
            <strong>
              取引先
              <div className={ Style.EditingViewer__innerColumn__must }>必須</div>
            </strong>
          </div>
          <div>
            <input className='c-form-text'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditingViewer