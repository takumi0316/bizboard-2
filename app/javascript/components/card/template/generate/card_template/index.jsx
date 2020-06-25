import React from 'react';
import Style from './style.sass';

import DropZone from './drop_zone';
import Header   from './header'

const CardTemplate = props => {

  return(
    <div className='u-mt-30 c-flex c-flex-alignItems_start'>
      { props.template.file ?
        <div>
          <div className='c-position'>
            <canvas id='draw' className='c-border c-border-top c-border-left c-border-right c-position__canvas' />
            <canvas id='pdf' className='c-border c-border-top c-border-left c-border-right' />
          </div>
          <button className='c-btnMain-standard' onClick={ () => props.unSetPDF() }>テンプレートを変更する</button>
        </div>
        :
        <DropZone onDrop={ props.onDrop }/>
      }
      <Header template={ props.template } status={ props.status } addDetail={ props.addDetail } onChangeDetail={ props.onChangeDetail }/>
    </div>
  );
};

export default CardTemplate;