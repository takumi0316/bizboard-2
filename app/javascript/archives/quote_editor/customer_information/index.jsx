import React, { Fragment } from 'react';

const CustomerInformation = (props) => {

	return(
		<Fragment>
      <div className='c-form-label u-mt-15'>
        <label>お客様情報</label>
      </div>
      { props.client ?
        <div className='c-attention'>
          <div>会社名: { props.company_name }</div>
          <div className='u-mt-5'>部署名: { props.division_name || '部署名なし' }</div>
          <div className='u-mt-5'>担当者名: { props.client.name || '担当者なし' }</div>
          <div className='u-mt-5'>担当者TEL: { props.client.tel }</div>
          <div className='u-mt-5'>担当者email: { props.client.email }</div>
        </div>
        : null
      }
		</Fragment>
	);
};

export default CustomerInformation;