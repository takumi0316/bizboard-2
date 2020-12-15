import React, { Fragment } from 'react';

// import libraries
import DatetimePicker from '../../utilities/datetime_picker';

const QuotationPdfGenrator = props => {

	return(
    <Fragment>
      <h1 className='l-dashboard__heading'>見積書: { props.quote.subject }</h1>
        <div className='u-mt-15 c-attention'>
          <p>会社名: { props.company }</p>
          <p>部署名: { props.division }</p>
          <p>担当者名: { props.client }</p>
        </div>
      <form method='get' target='_blank' action={ `/quotations/${props.quote.id}/generate_pdf` }>
        <div className='u-mt-30 c-flex'>
          <div className='c-flex__column'>
            <label className='c-form-label'>案件番号</label>
            <div>{ props.quote.quote_number }</div>
          </div>
          <div className='u-ml-30 c-flex__column'>
            <label className='c-form-label'>発行日</label>
						<div>{ props.quote.issues_date }</div>
          </div>
            <div className='u-ml-30 c-flex__column'>
            <label className='c-form-label'>有効期限</label>
						<div>{ props.quote.expiration }</div>
          </div>
        </div>
        <div className='u-mt-30'>
          <label className='c-form-label'>件名</label>
					<div>{ props.quote.subject }</div>
        </div>
        <div className='u-mt-30 c-table'>
          <table>
            <thead>
              <tr>
                <th>品目</th>
                <th>単価</th>
                <th>数量</th>
                <th>価格</th>
              </tr>
            </thead>
            <tbody>
              <Fragment>
                { props.projects ?
                  <Fragment>
                   { props.projects.map((project, index) => {
                   	const key = 'project' + new Date().getTime().toString(16) + index;
                   	return(
                      <Fragment { ...{key} }>
                        <tr>
                          <td>{ project.name }</td>
                          <td>{ Number(project.unit_price).toLocaleString() }</td>
                          <td>{ project.unit }</td>
                          <td>{ (Number(project.unit_price) * Number(project.unit)).toLocaleString() }</td>
                        </tr>
                        { project.remarks != '' ?
                          <tr>
                            <td colSpan='4'>{ project.remarks }</td>
                          </tr>
                         : null
                        }
                      </Fragment>
                   	);
                   }) }
                  </Fragment>
                : null
                }
              </Fragment>
              <tr>
                <td>値引金額</td>
                <td/>
                <td/>
                <td>{ Number(props.quote.discount).toLocaleString() }</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='u-mt-10 c-table'>
          <table>
            <tbody>
              <tr>
                { props.quote.tax_type == 'exemption' ?
                  <Fragment>
                    <td>合計金額</td>
                    <td>¥ { Math.floor(props.quote.price || 0).toLocaleString() }</td>
                  </Fragment>
                  :
                  <Fragment>
                    <td>合計金額(税込)</td>
                    <td>{ Math.floor((props.quote.price || 0) * parseFloat(props.quote.tax)).toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }) }</td>
                  </Fragment>
                }
              </tr>
            </tbody>
          </table>
        </div>
        <div className='c-overlay-submit'>
          <Fragment>
            { props.pdf_exist ? <a className='c-btnMain-standard' href={ `/quotations/${ props.quote.id }` } target='_blank'>作成済みPDF</a> : null }
            <input type='submit' name='commit' value='見積書ダウンロード' className='u-ml-30 c-btnMain-primaryB'/>
          </Fragment>
        </div>
      </form>
    </Fragment>
	);
};

export default QuotationPdfGenrator;
