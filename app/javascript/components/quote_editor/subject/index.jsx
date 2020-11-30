import React, { Fragment } from 'react';

const Subject = (props) => {

  return(
    <Fragment>
      <h1 className='l-dashboard__heading'>案件作成</h1>
      <div className='c-form-label u-mt-30'>
        <label>案件タイトル</label>
        <span className='c-form__required u-ml-10'>必須</span>
      </div>
      <input placeholder='案件タイトル' className='c-form-text' required='required' autoComplete='off' spellCheck='false' type='text' disabled={props.lock ? 'disabled' : null}
             onBlur={ e => props.setSubject(e.target.value) } defaultValue={ props.subject }
      />
    </Fragment>
  );
};

export default Subject;
