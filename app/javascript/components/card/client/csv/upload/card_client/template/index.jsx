import React from 'react';

import Header from '../header';

const Template = props => {

  return(
    <div className='u-mt-30 c-flex c-flex-alignItems_start'>
      <div>
        <div className='c-position'>
          <canvas id='draw' className='c-border c-border-top c-border-left c-border-right c-position__canvas'/>
          <canvas id='pdf' className='c-border c-border-top c-border-left c-border-right'/>
        </div>
      </div>
      <Header client_template={ props.client_template } paginate_count={ props.paginate_count } status={ props.status } onChangeValue={ props.onChangeValue }/>
    </div>
  );
};

export default Template;