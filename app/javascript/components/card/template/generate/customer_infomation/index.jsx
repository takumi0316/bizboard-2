import React, { Fragment } from 'react';

const CustomerInformation = props => {

  return(
    <Fragment>
      <div className='c-form-label u-mt-10'>
        <label>お客様情報</label>
      </div>
      { props.company ?
        <div className='c-attention'>
          <div>会社名: { props.company.name || '会社名なし' }</div>
        </div>
        :
        <div className='c-attention'>
          <div>会社はまだ選択されていません。</div>
        </div>
      }
    </Fragment>
  );
};

export default CustomerInformation;
