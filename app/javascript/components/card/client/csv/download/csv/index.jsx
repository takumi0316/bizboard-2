import React, { Fragment } from 'react';
import { CSVLink }         from 'react-csv';

import {
  validProperty
} from '../util';

const CSVDownload = props => {

  /**
   * CSVダウンロード 
   * @version 2020/04/13 
   * 
   */
  const download = e => {

    e.stopPropagation();

    const card_clients = props.card_clients;
    if(!validProperty(props.division, '部署情報を選択して下さい。')) return;
    if(!validProperty(props.card, '名刺情報を選択してください。')) return;
    let i = 0;
    card_clients.map(card_client => {
      if(card_client.status) i++;
    });
    if(!validProperty(i == card_clients.length, '担当者を選択してください。')) return;
  };

  return(
    <div className='u-mt-10'>
      { props.card_clients ?
        <CSVLink data={ props.replace_values }>
          <button className='c-btnMain-standard c-btn-blue'>ダウンロード</button>
        </CSVLink>
        :
        <button className='c-btnMain-standard c-btn-blue' onClick={ e => download(e) }>ダウンロード</button>
      }
    </div>
  );
};

export default CSVDownload;