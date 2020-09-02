import React, { Fragment, useEffect, useState, useRef } from 'react';
import Papa                                             from 'papaparse';
import Encoding                                         from 'encoding-japanese';

// components
import Import         from './csv_import/index';
import TemplateClient from '../';
import Pagination     from './pagination';
import Loading        from '../../loading';

// 左サイドバーを閉じる
const closeLeftSidebar = drawerElement => drawerElement.click();

const Upload = props => {

  const loading_ref = useRef(null);

  const init = {
    uploaded: false,
    paginate_index: 0,
    head: true,
    head_layouts: [],
    tail_layouts: [],
    clients: []
  };

  const [state, setState] = useState(init);

  useEffect(() => {

    closeLeftSidebar(document.getElementById('js-drawerOpen'));
  }, [props])

  useEffect(() => {
  }, [state])

  const openCSV = file => {

    const reader = new FileReader();
    reader.onload = e => {
      const codes = new Uint8Array(e.target.result);
      const encoding = Encoding.detect(codes);
      const unicodeString = Encoding.convert(codes, {
        to: 'unicode',
        from: encoding,
        type: 'string'
      });
      Papa.parse(unicodeString, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: res => formatCSV(res.data),
      });;
    };
    reader.readAsArrayBuffer(file);
  };

  /**
   * CSVを適当な形式に整形
   * @version 2020/04/14
   *
   */
  const formatCSV = datas => {

    loading_ref.current.start();

    const field = new FormData();
    const parse_datas = JSON.parse(JSON.stringify(datas));
    const isTemplateID = parse_datas.every(data => data['テンプレートID'] == props.card_template.id);

    if(!isTemplateID) {

      window.alertable({ icon: 'info', message: 'テンプレートIDが違います。', close_callback: () => loading_ref.current.finish() });
      return;
    };

    field.append('id', props.card_template.id);
    props.flag_names.map((flag_name) => field.append('flag_names[]', flag_name));

    parse_datas.map((data, index) => {

      Object.entries(data).map(([key, val]) => field.append(`template_clients[][${ key }]`, val || ''));
    });

    const url = '/template_clients/import_csv';
    const request = window.xhrRequest.post(url, field);
    request.then(res => {

      loading_ref.current.finish();
      console.log(res.data)
      setState({ ...state, uploaded: true,  head_layouts: res.data.head_layouts, tail_layouts: res.data.tail_layouts, clients: res.data.clients });
    }).catch(err => window.alertable({ icon: 'info', message: err, close_callback: () => loading_ref.current.finish() }));
  };

  const prevPagination = e => {

    e.preventDefault();

    const prev_paginate_index = state.paginate_index - 1;
    setState({ ...state, paginate_index: prev_paginate_index, head: true });
  };

  const nextPagination = e => {

    e.preventDefault();

    const next_paginate_index = state.paginate_index + 1;
    setState({ ...state, paginate_index: next_paginate_index, head: true });
  };

  /**
   * レイアウトの表・裏を変更
   *
   * @param {*} e
   */
  const changeLayoutType = e => {

    e.preventDefault();
    setState({ ...state, head: !state.head });
  };

  const changeContents = contents => {

    const re_clients = state.clients.map((client, index) => {

      if(index === state.paginate_index) {

        if(state.head) return { ...client, head_layout_contents: contents };

        if(!state.head) return { ...client, tail_layout_contents: contents };
      };

      if(index !== state.paginate_index) return client;
    });

    setState({ ...state, clients: re_clients });
  };

  const changeLayout = (layout, contents)=> {

    const re_clients = state.clients.map((client, index) => {

      if(index === state.paginate_index) {

        if(state.head) return { ...client, default_head_layout: layout, head_layout_contents: contents };

        if(!state.head) return { ...client, default_tail_layout: layout, tail_layout_contents: contents };
      };

      if(index !== state.paginate_index) return client;
    });

    setState({ ...state, clients: re_clients });
  };

  const redirect = e => {

    e.preventDefault();

    const url = () => location.href = `/template_clients?id=${ props.card_template.id }`;
    window.alertable({ icon: 'success', message: '保存しました。', close_callback: () => url() })
  };

  return(
    <Fragment>
      <div className='u-mt-30'>
        <label className='c-form-label'>| 会社名</label>
        <div className='u-mt-10 c-attention'>
          <p>{ props.company.name }</p>
        </div>
      </div>

      <div className='u-mt-20'>
        <label className='c-form-label'>| テンプレート名</label>
        <div className='u-mt-10 c-attention'>
          <p>{ props.card_template.name }</p>
        </div>
      </div>
      { state.uploaded ?
        <Fragment>
          <div className='u-mt-15'>
            <label className='c-form-label'>| 担当者名</label>
            <div className='u-mt-10 c-attention'><p>{ state.clients[state.paginate_index].client_name }</p></div>
          </div>
          <div className='u-mt-15'>
            <Pagination length={ state.clients.length - 1 } paginate_index={ state.paginate_index } prevPagination={ prevPagination } nextPagination={ nextPagination }/>
          </div>
          <div className='u-mt-15'>
            <button className='c-btnMain-standard' onClick={ changeLayoutType }>{ state.head ? '裏面設定' : '表面設定' }</button>
          </div>
          <TemplateClient upload={ true } head={ state.head } card_template_id={ props.card_template.id } client_id={ state.clients[state.paginate_index].client_id } paginate_index={ state.paginate_index }
                          layouts={ state.head ? state.head_layouts : state.tail_layouts } contents={ state.head ? state.clients[state.paginate_index].head_layout_contents : state.clients[state.paginate_index].tail_layout_contents }
                          default_layout={ state.head ? state.clients[state.paginate_index].default_head_layout : state.clients[state.paginate_index].default_tail_layout }
                          changeContents={ changeContents } changeLayout={ changeLayout }
          />

        <div className='c-flex__center'>
          <button className='c-btnMain-standard' onClick={ redirect }>保存する</button>
        </div>

        </Fragment>
        : <Import openCSV={ openCSV } />
      }
      <Loading ref={ loading_ref } />
    </Fragment>
  );
};

export default Upload;