import React, { useEffect } from 'react';
import Style from './style.sass';

// ライブラリ
import {
  setPDF
} from '../util.js';

const Index = props => {

  useEffect(() => {

    const field = new FormData();
    field.append('card_layout_id', props.apply_layout.id);
    const request = window.xhrRequest.post('/template_clients/transfer', field, { responseType: 'blob' });
    request.then(res => {

      setPDF(res.data, []);
    }).catch(err => window.alertable({ icon: 'error', message: 'PDFを取得できませんでした。', close_callback: () => console.log(err) }));
  }, [props])

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