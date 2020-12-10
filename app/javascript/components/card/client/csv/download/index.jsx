import React, { Fragment } from 'react';

import Division          from '../../division';
import Card              from './card';
import CheckDownloadCSV  from './check_download_csv';
import CSVDownloadButton from './csv_download_button';
import Loading           from '../../../../loading';

import {
  DIVISION_TYPE_NAME,
  CARD_TYPE_NAME,
  DIVISION_NOT_FOUND,
  CARD_NOT_FOUND,
} from '../../../properties.es6'

import { validProperty } from '../../../util';

export default class DownloadCardClient extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      company: props.company || '',
      divisions: props.divisions || '',
      division: props.division || '',
      card: '',
      card_clients: ''
    };
  };

  /**
   * 会社・部署セット
   * @version 2020/03/23
   *
   **/
  applyDivision = props => this.cardSearch(props);

  /**
   * 会社・部署セット
   * @version 2020/03/23
   *
   **/
  applyCard = card => this.cardClientSearch(card);

  /**
   * 名刺セット
   * @version 2020/04/07
   *
   */
  cardSearch = props => {

    this.loadingRef.start();
    const url = '/card_clients/download.json?company_id=' + props.company.id;
    const request = window.xhrRequest.get(url);
    request.then(res => {

      this.loadingRef.finish();
      if(res.data.status == 'success') this.state.card_clients ? this.setState({ company: props.company, division: props.division, cards: res.data.cards, card: '', card_clients: '' }) : this.setState({ company: props.company, division: props.division, cards: res.data.cards });
      if(res.data.status != 'success') window.mf_like_modal({ icon: 'error', message: res.data.message });
    }).catch(error => {

      this.loadingRef.finish();
      window.mf_like_modal({ icon: 'error', message: error });
    });
  };

  /**
   * 名刺担当者セット
   * @version 2020/04/07
   *
   */
  cardClientSearch = card => {

    this.loadingRef.start();
    const url = '/card_clients.json?company_division_id=' + this.state.division.id + '&card_id=' + card.id;
    const request = window.xhrRequest.get(url);
    request.then(res => {

      this.loadingRef.finish();
      if(res.data.status == 'success') this.setState({ card: card, card_clients: res.data.card_clients });
      if(res.data.status != 'success') window.mf_like_modal({ icon: 'error', message: '担当者情報を取得出来ませんでした。もう一度テンプレートを選択してください。' });
    }).catch(error => {

      this.loadingRef.finish();
      window.mf_like_modal({ icon: 'error', message: error });
    });
  };

  /**
   * ダウンロード有無
   * @version 2020/04/27
   *
   */
  isClientDownload = e => {

    const card_clients = this.state.card_clients.map( card_client => {
      if(e.target.value == card_client.id) card_client.status = !card_client.status;
      return card_client;
    });

    this.setState({ card_clients: card_clients });
  };

  /**
   * CSVダウンロード
   * @version 2020/04/13
   *
   */
  download = e => {

    e.stopPropagation();

    const card_clients = this.state.card_clients.filter(card_client => card_client.status == true);
    if(!validProperty(this.state.division, '部署情報を選択して下さい。')) return;
    if(!validProperty(this.state.card, '名刺情報を選択してください。')) return;
    if(!validProperty(card_clients.length > 0, '担当者を選択してください。')) return;

    const field = new FormData();
    field.append('card_id', this.state.card.id);
    card_clients.map(card_client => {
      field.append('card_clients[][id]', card_client.id);
      field.append('card_clients[][name]', card_client.name);
    });

    const request = window.xhrRequest.post('/card_clients/csv_download', field, { responseType: 'blob' });
    request.then(res => {

      this.loadingRef.finish();

      if(res.data) {
        // for IE,Edge
        if(window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(res.data, '担当者情報ダウンロード.csv');

        // for chrome, firefox
        if(!window.navigator.msSaveOrOpenBlob) {
          const url = URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', '担当者情報ダウンロード.csv');
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(url);
          link.parentNode.removeChild(link);
        };

        window.mf_like_modal({ icon: 'success', message: 'ダウンロードしました。' });
      };
    }).catch(err => {

      this.loadingRef.finish();
      window.mf_like_modal({ icon: 'error', message: err });
    });
    this.loadingRef.start();
  };

  render() {
    return(
      <Fragment>
        <Division download={ this.props.download } company={ this.state.company } divisions={ this.state.divisions } division={ this.state.division } typeName={ DIVISION_TYPE_NAME } notFound={ DIVISION_NOT_FOUND } applyDivision={ this.applyDivision }/>
        <Card cards={ this.state.cards } card={ this.state.card } typeName={ CARD_TYPE_NAME } notFound={ CARD_NOT_FOUND } applyCard={ this.applyCard }/>
        <CheckDownloadCSV card_clients={ this.state.card_clients } company={ this.state.company } division={ this.state.division } isClientDownload={ this.isClientDownload }/>
        <CSVDownloadButton card_clients={ this.state.card_clients } download={ this.download }/>
        <Loading ref={ node => this.loadingRef = node }/>
      </Fragment>
    );
  };
};
