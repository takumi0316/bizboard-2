import React, { Fragment }	from 'react';
import Style								from '../style.sass';

// import libraries
import Dayjs from 'dayjs';
const ReadTable = props => {

  return(
    <div>
      <div className={ Style.AddSubcontractor__EditButton }>
        <button className={ 'c-btnMain-standard' } onClick={ e => props.onEditable(e) }>外注先[編集]</button>
      </div>
      { props.work_subcontractors_iterate ?
        <Fragment>
          { props.work_subcontractors_iterate.map((work_subcontractor, index) => {
            const key = 'work_subcontractor' + index;
            return(
              <Fragment key={ key }>
                { work_subcontractor.client ?
                  <a className={ 'c-btnMain-primaryB u-mt-20' } href={ '/work_subcontractors/' + work_subcontractor.id } target='_blank'>外注指示書発行</a>
                  : null
                }
                <div className={ Style.AddSubcontractor__ReadOnly }>
                  <div key={ 'work_subcontractor_division_client_label' + index } className={ 'c-form-label u-mt-20' }>
                    <label>外注先情報</label>
                  </div>
                </div>
                <Fragment>
                  { work_subcontractor.client ?
                    <div className={ 'c-attention' }>
                      <div className={ 'u-mt-10' }>会社名: { work_subcontractor.subcontractor.name || '部署名なし' }</div>
                      <div className={ 'u-mt-10' }>部署名: { work_subcontractor.division.name }</div>
                      <div className={ 'u-mt-10' }>担当者名: { work_subcontractor.client.name }</div>
                      <div className={ 'u-mt-10' }>担当者TEL: { work_subcontractor.client.tel }</div>
                      <div className={ 'u-mt-10' }>担当者email: { work_subcontractor.client.email }</div>
                    </div>
                    : null
                  }
                </Fragment>
                <div className={ 'c-table u-mt-20' }>
                  <table>
                    <thead>
                      <tr>
                        <th className={ 'u-va-middle' }>No.</th>
                        <th className={ 'u-va-middle' }>発注内容</th>
                        <th className={ 'u-va-middle' }>入稿物</th>
                        <th className={ 'u-va-middle' }>仕様</th>
                        <th>原稿<br />数量</th>
                        <th>部数<br />数量</th>
                        <th className={ 'u-va-middle' }>実績原価</th>
                      </tr>
                    </thead>
                    <tbody>
                      { work_subcontractor.details ?
                        <Fragment>
                          { work_subcontractor.details.map((detail, index) => {
                            const key = 'subcontractor' + index;
                            return(
                              <tr key={ key }>
                                <td className={ 'u-va-top u-ta-center' }>{ index + 1 }</td>
                                <td>{ props.setDangerHtml(detail.order_contents, 'u-ml-10') }</td>
                                <td>{ props.setDangerHtml(detail.deliver_method, 'u-ml-10') }</td>
                                <td>{ props.setDangerHtml(detail.specification, 'u-ml-10') }</td>
                                <td className={ 'u-va-top u-ta-right' }>{ detail.count }</td>
                                <td className={ 'u-va-top u-ta-right' }>{ detail.number_of_copies }</td>
                                <td className={ 'u-va-top u-ta-right' }>{ detail.actual_cost }円</td>
                              </tr>
                            );
                          }) }
                        </Fragment>
                        : null
                      }
                    </tbody>
                  </table>
                </div>
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
                        <td className={ 'u-ta-center' }>{ Dayjs(work_subcontractor.order_date).format('YYYY年MM月DD日') }</td>
                        <td className={ 'u-ta-center' }>{ work_subcontractor.delivery_date === null ? null : Dayjs(work_subcontractor.delivery_date).format('YYYY年MM月DD日') }</td>
                        <td className={ 'u-ta-left' }>{ work_subcontractor.delivery_destination }</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={ 'c-table' }>
                  <table>
                    <thead>
                      <tr>
                        <th>特記事項</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{ props.setDangerHtml(work_subcontractor.notices, 'u-ml-10') }</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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