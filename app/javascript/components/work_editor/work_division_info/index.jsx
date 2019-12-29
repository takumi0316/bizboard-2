import React, { Fragment }	from 'react';
import WorkDivision 				from './work_division';

const WorkDivisionInfo = props => {

	return(
		<Fragment>
			<div className='c-form-label u-mt-10'>
        <label>作業部署情報</label>
      </div>
      { props.division ?
        <div className='c-attention'>
          <div>部署名: { props.division.name }</div>
        </div>
        : null
      }
			<div className='u-mt-15'>
				<WorkDivision passedDivision={ props.passedDivision } />
      </div>
		</Fragment>
	);
};

export default WorkDivisionInfo;