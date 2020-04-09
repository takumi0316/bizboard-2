import React from 'react';

const TempalteStatus = props => {

  return(
    <div className='u-mt-10'>
      { props.status ?
        <div className='c-btnMain-primaryC' onClick={ () => props.setStatus() }>裏面を設定する</div>
        :
        <div className='c-btnMain-primaryC' onClick={ () => props.setStatus() }>表面を設定する</div>
      }
    </div> 
  );
};

export default TempalteStatus;