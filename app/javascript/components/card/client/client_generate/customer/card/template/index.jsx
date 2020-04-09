import React from 'react';

import Canvas from '../canvas';
import Header from '../header';

const Template = props => {

  return(
    <div className='u-mt-30 c-flex c-flex-alignItems_start'>
      <div>
        <div className='c-position'>
          <Canvas id='draw' class_name='c-border c-border-top c-border-left c-border-right c-position__canvas'/>
          <Canvas id='pdf' class_name='c-border c-border-top c-border-left c-border-righ'/>
        </div>
      </div>
      <Header template={ props.template } client_template={ props.client_template } status={ props.status } onChangeValue={ props.onChangeValue }/>
    </div>
  );
};

export default Template;