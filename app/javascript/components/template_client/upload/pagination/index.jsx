import React, { Fragment, useEffect, useState } from 'react'

const Pagination = props => {

  useEffect(() => {

  }, [props]);

  return(
    <Fragment>
      <button className='c-btnMain' onClick={ props.prevPagination } disabled={ props.paginate_index === 0 }>前へ</button>
      <button className='u-ml-30 c-btnMain' onClick={ props.nextPagination } disabled={ props.paginate_index === props.length }>次へ</button>
    </Fragment>
  );
};

export default Pagination;