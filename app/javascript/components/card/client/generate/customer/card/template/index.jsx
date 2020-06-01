import React from 'react';
import Style from './style.sass';

import Header from '../header';

const Template = props => {

  return(
    <div className='u-mt-30 c-flex'>
      <div className={ Style.CardTemplate }>
        <div className='c-position'>
          <canvas id='draw' className='c-border c-border-top c-border-left c-border-right c-position__canvas'/>
          <canvas id='pdf' className='c-border c-border-top c-border-left c-border-right'/>
        </div>
      </div>
      <Header client_template={ props.client_template } status={ props.status } onChangeValue={ props.onChangeValue }/>
    </div>
  );
};

export default Template;