import React, { Fragment }	from 'react';
import Style								from '../style.sass';

import Information from './information';
import DetailRead  from './detail_read';
import SubRead     from './sub_read';

const ReadTable = props => {

  return(
    <div>
      <div className={ Style.AddSubcontractor__EditButton }>
        <div className='u-mt-15'>
          <button className='c-btnMain' onClick={ props.onEditable }>外注先[編集]</button>
        </div>
      </div>
      { props.work_subcontractors_iterate ?
        <Fragment>
          { props.work_subcontractors_iterate.map((work_subcontractor, index) => {
            const key = 'work_subcontractor' + index;
            return(
              <Fragment key={ key }>
                { work_subcontractor.client ?
                  <div className='u-mt-15'>
                    <a className='c-btnMain' href={ '/work_subcontractors/' + work_subcontractor.id } target='_blank'>外注指示書発行</a>
                  </div>
                  : null
                }
                <div className={ Style.AddSubcontractor__ReadOnly }>
                  <div key={ 'work_subcontractor_division_client_label' + index } className='c-form-label u-mt-15'>
                    <label>外注先情報</label>
                  </div>
                </div>
                <Fragment>
                  { work_subcontractor.client ?
                    <Information work_subcontractor={ work_subcontractor }/>
                    : null
                  }
                </Fragment>
                <DetailRead work_subcontractor={ work_subcontractor } setDangerHtml={ props.setDangerHtml }/>
                <SubRead work_subcontractor={ work_subcontractor } setDangerHtml={ props.setDangerHtml }/>
              </Fragment>
            );
          }) }
        </Fragment>
        : null
      }
    </div>
  );
};

export default ReadTable;
