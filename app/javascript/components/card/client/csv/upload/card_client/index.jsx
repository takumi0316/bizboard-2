import React, { Fragment, useEffect, useState } from 'react';

import Paginate       from './paginate';
import CardTemplate   from '../customer/card/template';
import TemplateStatus from './template_status';

const CardClient = props => {

  const init = { status: true, paginate_count: 0, max_count: props.card_clients.length - 1 };
  const [state, setState] = useState(init);

  useEffect(() => {
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

  const onChangeDetail = () => {

  };

  return(
    <Fragment>
      <TemplateStatus status={ state.status } setStatus={ setStatus }/>
      <Paginate paginate_count={ state.paginate_count } max_count={ state.max_count } changePaginateCount={ changePaginateCount }/>
      { state.status ?
        <CardTemplate client_template={ props.card_clients[state.paginate_count].client_templates[0] } status={ state.status } onChangeDetail={ onChangeDetail }/> :
        <CardTemplate client_template={ props.card_clients[state.paginate_count].client_templates[1] } status={ state.status } onChangeDetail={ onChangeDetail }/>
      }
    </Fragment>
  );
};

export default CardClient;
