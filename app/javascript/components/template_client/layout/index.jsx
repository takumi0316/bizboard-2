import React, { Fragment, useEffect, useState, useRef } from 'react'
import Style from './style.sass';

import {
  mmTopx
} from '../util';

const Index = props => {

  useEffect(() => {

    if(props.selected) return;
    let layout_box;
    const apply_layout_id = props.apply_layout.id;

    props.layouts.map((layout, index) => {

      if((index % 3) == 0) {

        layout_box = document.getElementById(`layout-box${ index }`);
        if(layout_box.childElementCount > 0) layout_box.textContent = null;

        let layer1 = document.createElement('div');
        let layer2 = document.createElement('div');
        let img = document.createElement('img');

        layer1.onclick = () => props.selectLayout(layout.id);
        layer1.className = Style.Layout__box;
        layer1.style = `height: ${ mmTopx(55) }px; width: ${ (mmTopx(91)) }px;`;

        if(apply_layout_id == layout.id) {

          layer2.className = Style.Layout__checked;
          layer1.appendChild(layer2);
        };

        img.src = layout.url;
        img.className = `${Style.Layout__img}`;

        const uploads = props.contents.filter(content => !content.name).map(content => {
          const upload = content.uploads.filter(upload => content.upload_id == upload.upload_id)

          if(!upload) return { ...content, url: contents.uploads[0].url };

          return { ...content, url: upload[0].url };
        });

        uploads.map(upload => {

          const url = upload.url;
          const logoHeight = mmTopx(upload.logo_height);
          const logoWidth = mmTopx(upload.logo_width);
          const y = mmTopx(upload.y_coordinate);
          const x = mmTopx(upload.x_coordinate);
          let logo = document.createElement('img');

          logo.src = url;
          logo.style = `position: absolute; width: ${ logoWidth }px; height: ${ logoHeight }px; transform: translate(${ x }px, ${ y }px);`;
          layer1.appendChild(logo);
        });

        layout_box.appendChild(layer1);
        layer1.appendChild(img);
      } else {

        let layer1 = document.createElement('div');
        let layer2 = document.createElement('div');

        layer1.onclick = () => props.selectLayout(layout.id);
        layer1.className = Style.Layout__box;
        layer1.style = `margin-left: 10px; height: ${ mmTopx(55) }px; width: ${ (mmTopx(91)) }px;`;

        if(apply_layout_id == layout.id) {
          layer2.className = Style.Layout__checked;
          layer1.appendChild(layer2);
        };

        let img = document.createElement('img');
        img.src = layout.url;
        img.className = Style.Layout__img;

        layout_box.appendChild(layer1);
        layer1.appendChild(img);
      };

    });
  }, [props]);

  return(
    <Fragment>
      <div className='u-mt-30'>
				<label className='c-form-label'>| レイアウト選択</label>
			</div>
      { props.layouts.map((layout, index) => {

        const key = `layout-${ index }`;
          return(
            <Fragment { ...{key} }>
              { (index % 3) == 0 ?
                <div id={ `layout-box${ index }` } style={{ display: 'flex', flexWrap: 'noWrap', marginTop: '10px' }} />
                : null
              }
            </Fragment>
          );
      })}
    </Fragment>
  )
};

export default Index;