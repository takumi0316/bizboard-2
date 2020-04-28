import React from 'react';

const CSVDownload = props => {

  return(
    <div className='u-mt-10'>
      <button className='c-btnMain-standard c-btn-blue' onClick={ e => props.download(e) }>ダウンロード</button>
    </div>
  );
};

export default CSVDownload;