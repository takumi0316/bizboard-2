import React, { Fragment } from 'react';

const Information = props => {

  return(
    <Fragment>
      { props.status ?
        <div className='u-mt-10 c-form-label'>CSVファイルをアップロードしてください。</div>
      :
        <div className='u-mt-10 c-form-label'>部署・名刺情報を選択してください。</div>
      }
    </Fragment>
  );
};

export default Information;