import React from 'react';
import Style from './style.sass';

import Header from '../header';

const Template = props => {

  return(
    <div className='u-mt-30'>
      <div className='c-flex__center'>
        <div className={ `${ Style.CardTemplate__layer } ${ Style.CardTemplate__layer_top }` }>
          <div className='c-position'>
            <canvas id='draw' className='c-position__canvas'/>
            <canvas id='pdf'/>
          </div>
        </div>
      </div>
 
      <div className='u-mt-30'>
        <Header client_template={ props.client_template } paginate_count={ props.paginate_count } status={ props.status } onChangeValue={ props.onChangeValue }/>
      </div>
    </div>
  );
};

export default Template;
