import React, { Fragment } from 'react';

const Information = props => {

  return(
    <Fragment>
      <div className='c-form-label u-mt-10'>
        <label>担当者情報</label>
      </div>
      <div className='c-attention'>
        <div>担当者名: { props.client_name || '担当者名なし' }</div>
      </div>
    </Fragment>
  );
};

export default Information;
