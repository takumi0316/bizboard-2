import React, { Fragment } from 'react';

import Dayjs from 'dayjs';
const SubRead = props => {

  return(
    <Fragment>
      <div className={ 'c-table' }>
        <table>
          <thead>
            <tr>
              <th>発注日</th>
              <th>納期</th>
              <th>納品先</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='u-va-middle u-ta-center'>{ Dayjs(props.work_subcontractor.order_date).format('YYYY年MM月DD日') }</td>
              <td className='u-va-middle u-ta-center'>{ props.work_subcontractor.delivery_date === null ? null : Dayjs(props.work_subcontractor.delivery_date).format('YYYY年MM月DD日') }</td>
              <td className='u-va-middle u-ta-left'>{ props.work_subcontractor.delivery_destination }</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='c-table'>
        <table>
          <thead>
            <tr>
              <th>特記事項</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ props.setDangerHtml(props.work_subcontractor.notices, 'u-ml-10') }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default SubRead;
