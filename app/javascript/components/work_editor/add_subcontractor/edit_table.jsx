import React, { Fragment, useState } from 'react'
import Style 	             from '../style.sass'

// import components
import Information  from './information'
import DetailForm   from './detail_form'
import SubForm      from './sub_form'
import DetailRead   from './detail_read'
import SubRead      from './sub_read'
import ClientSearch from '../../utilities/client_search'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request)

const EditTable = props => {

  const _edit = e => {

    e.preventDefault()
    props.setState({ ...props.state, subcontractor_id: e.target.value })
	}

  const _update = (e, index) => {

    e.preventDefault()

    if(!props.work_subcontractors_iterate[index].client) {

      window.confirm('外注先を仮でもいいので登録して下さい。')
      return false
    }

    const id = props.state.subcontractor_id
    props.setState({ ...props.state, subcontractor_id: e.target.value })
    props.workSubcontractorUpdate(index, id)
  }

  return(
    <Fragment>
      <div className={ Style.AddSubcontractor__EditButton }>
        <div className='u-mt-15'>
          <button className='c-btnMain' onClick={ e => props.onClosable(e) }>作業外注先[編集終了]</button>
        </div>
      </div>
      { props.work_subcontractors_iterate ?
        <Fragment>
          { props.work_subcontractors_iterate.map((work_subcontractor, index) => {
            const key = 'work_subcontractor' + work_subcontractor.id + index
            const client_key = work_subcontractor.client ? 'client' + work_subcontractor.client.id + work_subcontractor.id : 'client' + index
            return(
              <div { ...{key} }>
                <div className='c-form-label u-mt-20'>
                  <label>外注先情報</label>
                </div>
                { work_subcontractor.client ?
                    <Information key={ client_key } work_subcontractor={ work_subcontractor }/>
                  : null
                }
                { props.state.subcontractor_id == work_subcontractor.id ?
                  <Fragment>
                    <div className='u-mt-10 c-flex c-flex-alignItems__center'>
                      <ClientSearch applyClient={ props.applyClient } index={ index } path={ '/subcontractor_division_clients.json?search=' } notFound={ '外注先情報が見つかりませんでした' } typeName={ '外注先情報' }/>
                      <div className='u-ml-10'><button className='c-btnMain c-btn-blue' value='' onClick={ e => _update(e, index) }>外注先[更新]</button></div>
                      <div className='u-ml-10'><button className='c-btnMain c-btn-red' value={ work_subcontractor.id } onClick={ e => props.workSubcontractorDestroy(e, index, props.state, props.setState) }>外注先[削除]</button></div>
                    </div>
                    <DetailForm index={ index } work_subcontractor={ work_subcontractor } workSubcontractorDetailDestroy={ props.workSubcontractorDetailDestroy } setOrderContents={ props.setOrderContents } setDeliverMethod={ props.setDeliverMethod } setSpecification={ props.setSpecification } setCount={ props.setCount } setNumberOfCopies={ props.setNumberOfCopies } setActualCost={ props.setActualCost } workSubcontractorDetailCreate={ props.workSubcontractorDetailCreate }/>
                    <SubForm index={ index } work_subcontractor={ work_subcontractor } sortingAction={ props.sortingAction } setDeliveryDestination={ props.setDeliveryDestination } setNotices={ props.setNotices }/>
                  </Fragment>
                  :
                  <Fragment>
                    <div className='u-mt-15'>
                      <button className='c-btnMain c-btn-blue' value={ work_subcontractor.id } onClick={ e => _edit(e) }>外注先[編集]</button>
                    </div>
                    <DetailRead work_subcontractor={ work_subcontractor } setDangerHtml={ props.setDangerHtml }/>
                    <SubRead work_subcontractor={ work_subcontractor } setDangerHtml={ props.setDangerHtml }/>
                  </Fragment>
                }
              </div>
            )
          }) }
        </Fragment>
        : null
      }
      <div className={ Style.AddSubcontractor__EditButton }>
        <div className='u-mt-15'>
          <button className='c-btnMain c-btn-blue' onClick={ e => props.workSubcontractorCreate(e, props.state) }>外注先[追加]</button>
        </div>
      </div>
    </Fragment>
  )
}

export default EditTable
