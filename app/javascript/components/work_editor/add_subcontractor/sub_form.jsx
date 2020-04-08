import React, { Fragment } from 'react';

import DatetimePicker  from '../../utilities/datetime_picker';
const SubForm = props => {

  return(
    <Fragment>
      <div className='c-table'>
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
              <td className='u-ta-center'>
                <DatetimePicker type='text' name='start_at' default_datetime={ props.work_subcontractor.order_date } action='order_date'
                                sortingAction={ props.sortingAction } index={ props.index } class='c-form-text__work-index__datepicker'
                />
              </td>
              <td className='u-ta-center'>
                <DatetimePicker type='text' name='start_at' default_datetime={ props.work_subcontractor.delivery_date } action='delivery_date'
                                sortingAction={ props.sortingAction } index={ props.index } class='c-form-text__work-index__datepicker'
                />
              </td>
              <td className='u-ta-center'>
                <input className='c-form-text__work-show-input7' type='text' defaultValue={ props.work_subcontractor.delivery_destination } onChange={ e => props.setDeliveryDestination(props.index, e.target.value) }/>
              </td>
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
              <td colSpan='8'><textarea rows='3' className='c-form-textarea__work-show-input__textarea2' defaultValue={ props.work_subcontractor.notices } onChange={ e => props.setNotices(props.index, e.target.value) }/></td>
            </tr>
          </tbody>
        </table>
      </div>
      <input type='hidden' value={ props.work_subcontractor.id } />
    </Fragment>
	);
};

export default SubForm;
