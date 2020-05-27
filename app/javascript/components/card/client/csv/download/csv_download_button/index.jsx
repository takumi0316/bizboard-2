import React from 'react';

/**
 * CSV Download
 * @version 2020/05/07
 *
 */
const CSVDownloadButton = props => {

  return(
    <div className='u-mt-10'>
      <button className='c-btnMain-standard c-btn-blue' onClick={ e => props.download(e) }>ダウンロード</button>
    </div>
  );
};

export default CSVDownloadButton;
