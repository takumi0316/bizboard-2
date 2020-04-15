import React, { Fragment } from 'react';

const Paginate = props => {

  return(
    <div className='u-mt-10'>
      <button className='c-btnMain-primaryB' disabled={ props.paginate_count == 0 ? true : false } onClick={ e => props.changePaginateCount(e, false) }>前へ</button>
      <button className='c-btnMain-primaryB' disabled={ props.paginate_count == props.max_count ? true : false } onClick={ e => props.changePaginateCount(e, true) }>次へ</button>
    </div>
  );
};

export default Paginate;