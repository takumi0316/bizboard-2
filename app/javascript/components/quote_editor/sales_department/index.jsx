import React, { Fragment } from 'react';

const SalesDepartment = (props) => {

  return(
    <div className='u-mt-15'>
      <div className='c-form-label'>
        <label>売り上げ部署情報</label>
      </div>
      { props.home_division !== null ?
        <div className='c-attention'>
          <p>部署名:{ props.home_division.name }</p>
        </div>
        : null
      }
    </div>
  );
};

export default SalesDepartment;
