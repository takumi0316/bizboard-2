import React from 'react';

const Information = props => {

  return(
    <div className='c-form-label u-mt-10'>
      { props.card_clients ?
        <label>ダウンロードする担当者を選択して下さい。</label>
        :
        <label>部署・名刺情報を選択して下さい。</label>
      }
    </div>
  );
};

export default Information;