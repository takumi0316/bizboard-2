import React, { Fragment } from 'react';

const SalesTables = props => {

	return(
		<Fragment>
			<div className={ 'c-form-label u-mt-20' }>
        <label>受注/粗利</label>
      </div>
      <div className={ 'c-table3 u-mt-20' }>
        <table>
        	<thead>
            <tr>
              <th>受注額</th>
              <th>原価</th>
              <th>粗利</th>
              <th>粗利率</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ props.project_price }円</td>
              <td>{ props.work_price }円</td>
              <td>{ props.project_price - props.work_price }円</td>
              { isNaN(Math.floor((props.project_price - props.work_price / props.project_price) * 100)) ?
                <td>0%</td>
                : <td>{ Math.floor(((props.project_price - props.work_price) / props.project_price) * 100) }%</td>
              }
            </tr>
          </tbody>
        </table>
      </div>
		</Fragment>
	);
};

export default SalesTables;