import React, { Fragment } from 'react';

const DetailRead = props => {

  return(
    <div className='c-table u-mt-15'>
      <table>
        <thead>
          <tr>
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
              { props.work_subcontractor.details.map((detail, index) => {
                const key = 'subcontractor' + index;
                return(
                  <tr key={ key }>
                    <td className='u-ta-center'>{ index + 1 }</td>
                    <td className='u-va-middle'>{ props.setDangerHtml(detail.order_contents || '', 'u-ml-10') }</td>
                    <td className='u-va-middle'>{ props.setDangerHtml(detail.deliver_method || '', 'u-ml-10') }</td>
                    <td className='u-va-middle'>{ props.setDangerHtml(detail.specification || '', 'u-ml-10') }</td>
                    <td className='u-ta-right u-va-middle'>{ detail.count }</td>
                    <td className='u-ta-right u-va-middle'>{ detail.number_of_copies }</td>
                    <td className='u-ta-right u-va-middle'>{ detail.actual_cost }円</td>
                  </tr>
                );
              }) }
            </Fragment>
            : null
          }
        </tbody>
      </table>
    </div>
  );
};

export default DetailRead;
