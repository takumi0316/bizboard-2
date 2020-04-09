import React, { Fragment, useState } from 'react';

const DetailForm = props => {

  return(
    <Fragment>
      <div className='c-table2 u-mt-10'>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='u-va-middle'>No.</th>
              <th className='u-va-middle'>発注内容</th>
              <th className='u-va-middle'>入稿物</th>
              <th className='u-va-middle'>仕様</th>
              <th>原稿<br />数量</th>
              <th>部数<br />数量</th>
              <th className='u-va-middle'>実績原価</th>
            </tr>
          </thead>
          <tbody>
            { props.work_subcontractor.details ?
              <Fragment>
                { props.work_subcontractor.details.map((detail, index1) => {
                  const key = detail ? 'subcontractor_detail' + detail.id + index1 : 'subcontractor_detail' + index1;
                  return (
                    <tr { ...{key} }>
                      <td className='u-va-top'><button className='c-btnMain2-primaryA' value={ detail.id } onClick={ e => props.workSubcontractorDetailDestroy(e, props.index, index1) }>ー</button></td>
                      <td className='u-va-top u-ta-center'>{ index1 + 1 }</td>
                      <td className='u-a-top'><textarea rows='3' cols='30' className='c-form-text__work-show-input__textarea' defaultValue={ detail.order_contents || '' } onChange={ e => props.setOrderContents(e, props.index, index1) } placeholder={ '図面製本' }/></td>
                      <td><textarea className='c-form-textarea__work-show-input__textarea' rows='3' cols='30' placeholder={ 'AIデータ, アウトライン済み1ファイル' } defaultValue={ detail.deliver_method || '' } onChange={ e => props.setDeliverMethod(e, props.index, index1) }/></td>
                      <td><textarea className='c-form-textarea__work-show-input__textarea' rows='3' cols='30' placeholder={ '表紙:ダイヤボード' } defaultValue={ detail.specification || '' } onChange={ e => props.setSpecification(e, props.index, index1) }/></td>
                      <td className='u-va-top'><input className='c-form-text__work-show-input6' type='number' defaultValue={ detail.count } onChange={ e => props.setCount(e, props.index, index1) }/></td>
                      <td className='u-va-top'><input className='c-form-text__work-show-input6' type='number' defaultValue={ detail.number_of_copies } onChange={ e => props.setNumberOfCopies(e, props.index, index1) }/></td>
                      <td className='u-va-top'><input className='c-form-text__work-show-input2' type='number' defaultValue={ detail.actual_cost } onChange={ e => props.setActualCost(e, props.index, index1) }/></td>
                    </tr>
                  );
                }) }
              </Fragment>
              : null
            }
            <tr>
              <td colSpan='8'><button className='c-btnMain2-primaryB' value={ props.work_subcontractor.id } onClick={ e => props.workSubcontractorDetailCreate(e, props.index) }>＋</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default DetailForm;
