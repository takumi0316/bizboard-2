import React from 'react';
import Style from './style.sass';

import DropZone from './drop_zone';
import Header   from './header'

const CardTemplate = props => {

  return(
    <div className='u-mt-30'>
      { props.template.file ?
        <div className='c-flex__center'>
          <div className={ `${ Style.CardTemplate__layer } ${ Style.CardTemplate__layer_top }` }>
            <div className='c-position'>
              { /* <canvas id='draw' className='c-position__canvas'/> */ }
              <div id='draw' className='c-position__canvas'></div>
              <canvas id='pdf'/>
            </div>
          </div>
        </div>
        :
        <DropZone onDrop={ props.onDrop }/>
      }
      { /* <button className='u-mt-10 c-btnMain-standard' onClick={ () => props.unSetPDF() }>テンプレートを変更する</button> */ }
      <div className='u-mt-30'>
        <Header template={ props.template } status={ props.status } addDetail={ props.addDetail } onChangeDetail={ props.onChangeDetail }/>
      </div>
    </div>
  );
};

export default CardTemplate;
