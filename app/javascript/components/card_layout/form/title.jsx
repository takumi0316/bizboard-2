import React, { Fragment } from 'react';

const FormTitle = React.forwardRef((props, ref) => {
  
  return(
    <Fragment>
      <p className='c-form-label'>テンプレート名</p>
      <input ref={ ref } className='c-form-text' placeholder='日本工業社テンプレ１' defaultValue={ props.defaultTitle }/>
    </Fragment>
  );
});

export default FormTitle;