import React, { Fragment, useState } from 'react'
import Style from '../style.sass'
import Icon from '../../../icon'

// components
import ItemModal from '../modal/item'
import InputSuggestion from '../suggestion/project'

import {
  handleOpenDetailItem,
  handleCloseDetailItem,
  removeProject
} from '../function'
const Table = props => {
 
  const init = {
    open_modal: false
  }

  const [state, setState] = useState(init)

  return(
    <Fragment>
      <table className={ Style.EditingViewer__table }>
        <colgroup>
          <col width='32%'/>
          <col width='16%'/>
          <col width='14%'/>
          <col width='16%'/>
          <col width='11%'/>
          <col width='11%'/>
        </colgroup>
        <thead>
        <tr>
          <th>品目</th>
          <th>単価</th>
          <th>数量</th>
          <th>価格</th>
          <th>詳細</th>
          <th>削除</th>
        </tr>
        </thead>
        <tbody>
          { props.parentState.projects.map((project, index) => {
            const key = 'project' + index
              return(
                <tr key={ key }>
                  <td><InputSuggestion inputTxt={ project.name } applyProject={ '' } setName={ '' } index={ index }/></td>
                  <td><input className='c-form-text' defaultValue={ project.cost }/></td>
                  <td><input className='c-form-text' defaultValue={ project.size }/></td>
                  <td className='u-va-middle u-ta-right'>{ project.cost * project.size }</td>
                  <td className={ `u-ta-center u-va-middle ${ Style.EditingViewer__svgIcon }` }><Icon name='detail_item' size='m' action={ () => handleOpenDetailItem(state, setState) }/></td>
                  <td className={ `u-ta-center u-va-middle ${ Style.EditingViewer__svgIcon }` }><Icon index={ index } name='destroy_item' size='m' action={ () => removeProject(index, props.parentState, props.parentSetState) }/></td>
                </tr>
              )
          })}
        </tbody>
      </table>
      { state.open_modal ?
        <ItemModal closeDetailItem={ () => handleCloseDetailItem(state, setState) }/>
        : null
      }
    </Fragment>
  )
}

export default Table