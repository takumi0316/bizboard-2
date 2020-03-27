import React, { Fragment } from 'react';

const CustomerInformation = props => {

	return(
		<Fragment>
      <div className='c-form-label u-mt-10'>
        <label>お客様情報</label>
      </div>
      { props.division ?
        <div className='c-attention'>
          <div>会社名: { props.company.name || '会社名なし' }</div>
          <div className='u-mt-10'>部署名: { props.division.name || '部署名なし' }</div>
        </div>
				:
				<div className='c-attention'>
          <div>会社・部署はまだ選択されていません。</div>
				</div>
      }
		</Fragment>
	);
};

export default CustomerInformation;