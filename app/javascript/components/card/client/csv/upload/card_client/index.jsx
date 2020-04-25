import React, { Fragment, useEffect, useState } from 'react';

import Paginate          from './paginate';
import ClientInformation from '../customer/client';
import CardTemplate      from '../customer/card/template';
import TemplateStatus    from './template_status';

import pdfjsLib from '../../../../../utilities/pdfjs-dist/webpack';

import {
  ptTomm,
  mmTopx,
} from '../util';

const CardClient = props => {

  const init = { status: true, paginate_count: 0, max_count: props.card_clients.length - 1 };
  const [state, setState] = useState(init);

  useEffect(() => {

    state.status ? setPDF(props.template_front_file, props.loadingRef, props.card_clients[state.paginate_count].client_templates[0].values) : setPDF(props.template_reverse_file, props.loadingRef, props.card_clients[state.paginate_count].client_templates[1].values)
  }, [state])

  /**
   * @version 2020/04/14
   * @param {*} e => button action
   * @param {*} status => prev or next
   * ページネーション
   */
  const changePaginateCount = (e, status) => {

    e.preventDefault();

    const result = status ? state.paginate_count + 1 : state.paginate_count - 1;
    const init = {
      status: !state.status ? !state.status : state.status,
      paginate_count: result,
      max_count: state.max_count
    };
    setState({ ...init });
  };

  /**
   * @version 2020/04/14
   * テンプレートを動的に変更する
   *
   */
  const setStatus = () => {

    const init = {
      status: !state.status,
      paginate_count: state.paginate_count,
      max_count: state.max_count
    };

    setState({ ...init });
  };

  /**
   * PDFを展開する
   * @version 2020/03/30
   */
  const setPDF = (file, loadingRef, values) => {

    loadingRef.start();
    const blob = new Blob([file]);
    const blob_path = (window.URL || window.webkitURL).createObjectURL(blob);
    const getPDF = pdfjsLib.getDocument(blob_path);

    getPDF.then(function(pdf) {
      return pdf.getPage(1);
    }).then(function(page) {
      // Set scale (zoom) level
      let scale = 2;

      // Get viewport (dimensions)
      let viewport = page.getViewport(scale);

      // Get canvas#the-canvas
      let canvas = document.getElementById('pdf');
      let draw_canvas = document.getElementById('draw');

      // Fetch canvas' 2d context
      let ctx = canvas.getContext('2d');
      let draw_ctx = draw_canvas.getContext('2d');

      // Set dimensions to Canvas
      canvas.height = (mmTopx(55 * 2));
      // canvas.style.height = `${(mmTopx(55 * 2))}px`;
      // viewport.height = `${(mmTopx(55 * 2))}px`;

      canvas.width = (mmTopx(91 * 2));
      // canvas.style.width = `${(mmTopx(91 * 2))}px`;
      // viewport.width = `${(mmTopx(91 * 2))}px`;

      draw_canvas.height = (mmTopx(55 * 2));
      // draw_canvas.style.height = `${(mmTopx(55 * 2))}px`;
      draw_canvas.width = (mmTopx(91 * 2));
      // draw_canvas.style.width = `${(mmTopx(91 * 2))}px`;

      values.forEach(value => {

        draw_ctx.font = `${mmTopx(ptTomm(value.font_size)) * 2}px ${value.font}`;
        const y = mmTopx(value.coord_y) * 2;
        const x =	mmTopx(value.coord_x) * 2;
        const fontSize = mmTopx(ptTomm(value.font_size)) * 2;
        const lineSpace = mmTopx(value.line_space);
        const card_value = value.value;

        if(!card_value) return;
        for(let lines = card_value.split("\n"), i = 0, l = lines.length; l > i; i++) {
          let line = lines[i] ;
          let addY = fontSize ;
          if (i) addY += fontSize * lineSpace * i ;
          draw_ctx.fillText(line, x, y + addY);
        };
      });

      // Prepare object needed by render method
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      // Render PDF page
      page.render(renderContext);
      loadingRef.finish();
    }).catch(error => {

      loadingRef.finish();;
      window.alertable({ 'icon': 'error', message: error});
    });
  };

  return(
    <Fragment>
      { props.template_reverse_file ?
        <TemplateStatus status={ state.status } setStatus={ setStatus }/> :
        null
      }
      <Paginate paginate_count={ state.paginate_count } max_count={ state.max_count } changePaginateCount={ changePaginateCount }/>
      <ClientInformation client_name={ props.card_clients[state.paginate_count].client_name }/>
      { state.status ?
        <CardTemplate client_template={ props.card_clients[state.paginate_count].client_templates[0] } paginate_count={ state.paginate_count } status={ state.status } onChangeValue={ props.onChangeValue }/> :
        <CardTemplate client_template={ props.card_clients[state.paginate_count].client_templates[1] } paginate_count={ state.paginate_count } status={ state.status } onChangeValue={ props.onChangevalue }/>
      }
      <button className='u-mt-10 c-btnMain-primaryB' onClick={ e => props.save(e) }>保存</button>
    </Fragment>
  );
};

export default CardClient;
