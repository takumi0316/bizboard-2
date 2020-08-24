import React, { useEffect, useMemo } from 'react';
import Style from './style.sass';

// ライブラリ
import {
  setPDFValue
} from '../util.js';

const Index = props => {

  // レンダリング制御
  const deploy = useMemo(() => {

    const field = new FormData();
    field.append('card_layout_id', props.apply_layout.id);
    const request = window.xhrRequest.post('/template_clients/transfer', field, { responseType: 'blob' });
    request.then(res => {

      setPDFValue(res.data, props.contents);
    }).catch(err => window.alertable({ icon: 'error', message: 'レイアウトを取得できませんでした。', close_callback: () => console.log(err) }));
  }, [props.contents]);

  useEffect(() => deploy, [props])

  return(
    <div id='canvas' className='u-mt-10'>
      <div className='c-flex__right'>
        <div className={ `${ Style.Canvas__layer } ${ Style.Canvas__top }` }>
            <div className='c-position'>
              <canvas id='pdf' className='c-position__canvas'/>
              <div id='drawer'/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Index;