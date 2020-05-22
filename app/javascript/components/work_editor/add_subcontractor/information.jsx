import React, { useState } from 'react';

const Information = props => {

  return(
    <div className='c-attention'>
      <div className='u-mt-10'>会社名: { props.work_subcontractor.subcontractor.name || '部署名なし' }</div>
      <div className='u-mt-10'>部署名: { props.work_subcontractor.division.name }</div>
      <div className='u-mt-10'>担当者名: { props.work_subcontractor.client.name }</div>
      <div className='u-mt-10'>担当者TEL: { props.work_subcontractor.client.tel }</div>
      <div className='u-mt-10'>担当者email: { props.work_subcontractor.client.email }</div>
    </div>
  );
};

export default Information;
