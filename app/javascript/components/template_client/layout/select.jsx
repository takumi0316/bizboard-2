import React, { Fragment } from 'react';

const Select = props => {

  const selectLayout = e => props.selectLayout(e.target.value);

  return(
    <Fragment>
      <div className='u-mt-30'>
        <label className='c-form-label'>| レイアウト</label>
      </div>
      <div className='u-mt-10 c-form-selectWrap'>
        <select className='c-form-select' defaultValue={ props.apply_layout.id } onChange={ selectLayout }>
          { props.layouts.map((layout, index) => {

            const key = `layout-${ index }`;
            return (
              <option { ...{ key } } value={ layout.id }>{ layout.name }</option>
            );
          }) }
        </select>
      </div>
    </Fragment>
  );
};

export default Select;
