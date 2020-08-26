import React, { Fragment } from 'react';
import Style               from './style.sass';

const Index = props => {

  return(
    <div className='u-mt-10'>
      <div className='c-flex__center'>
        <div className={ `${ Style.Canvas__layer } ${ Style.Canvas__top }` }>
            <div className='c-position'>
              <div id='drawer' className='c-position__canvas'/>
              <canvas id='pdf'/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Index;