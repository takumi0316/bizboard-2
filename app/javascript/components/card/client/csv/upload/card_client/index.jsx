import React, { Fragment, useEffect, useState } from 'react';
import Promise                                  from 'core-js/es6/promise';

import Paginate          from './paginate';
import ClientInformation from './information';
import CardTemplate      from './template';
import TemplateStatus    from './template_status';

import { setPDFValue } from '../../../../util';

const CardClient = props => {

  const init = { status: true, paginate_count: 0, max_count: props.card_clients.length - 1 };
  const [state, setState] = useState(init);

  useEffect(() => {

    props.loadingRef.start();
    new Promise(resolve => {
      setPDFValue(state.status ? props.front_file : props.reverse_file, document.getElementById('pdf'), document.getElementById('draw'), props.card_clients[state.paginate_count].templates[state.status ? 0 : 1].values);
      resolve(true);
    }).then(res => props.loadingRef.finish());
  }, [state]);

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

  return(
    <Fragment>
      { props.template_reverse_file ?
        <TemplateStatus status={ state.status } setStatus={ setStatus }/> :
        null
      }
      <Paginate paginate_count={ state.paginate_count } max_count={ state.max_count } changePaginateCount={ changePaginateCount }/>
      <ClientInformation client_name={ props.card_clients[state.paginate_count].client_name }/>
      { state.status ?
        <CardTemplate client_template={ props.card_clients[state.paginate_count].templates[0] } paginate_count={ state.paginate_count } status={ state.status } onChangeValue={ props.onChangeValue }/> :
        <CardTemplate client_template={ props.card_clients[state.paginate_count].templates[1] } paginate_count={ state.paginate_count } status={ state.status } onChangeValue={ props.onChangevalue }/>
      }
      <button className='u-mt-10 c-btnMain-primaryB' onClick={ e => props.save(e) }>保存</button>
    </Fragment>
  );
};

export default CardClient;
