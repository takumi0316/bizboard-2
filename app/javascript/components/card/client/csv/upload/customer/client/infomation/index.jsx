import React, { Fragment } from 'react';

const Information = props => {

	return(
		<Fragment>
      <div className='c-form-label u-mt-10'>
        <label>担当者情報</label>
      </div>
      { props.client ?
        <div className='c-attention'>
          <div>担当者名: { props.client.name || '担当者名なし' }</div>
        </div>
				:
				<div className='c-attention'>
          <div>担当者はまだ選択されていません。</div>
				</div>
      }
		</Fragment>
	);
};

export default Information;