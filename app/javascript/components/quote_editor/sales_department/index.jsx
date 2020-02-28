import React, { Fragment } from 'react';

const SalesDepartment = (props) => {

  return(
    <Fragment>
      <div className={ 'c-form-label u-mt-30' }>
        <label>売り上げ部署情報</label>
      </div>
      { props.home_division !== null ?
        <div className={ 'c-attention' }>
          <div className={ 'u-mt-10' }>部署名:{ props.home_division.name }</div>
        </div>
        : null
      }
    </Fragment>
  );
};

export default SalesDepartment;
