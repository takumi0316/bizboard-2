import React, { Fragment } from 'react';

import Division    from './division';
import Card        from './card';
import CardClient  from './card/client';
import CSVDownload from './csv';
import Loading     from '../../../../loading';

import {
  DivisionTypeName,
  CardTypeName,
  DivisionNotFound,
  CardNotFound,
} from './properties.es6'

import {
  validProperty
} from './util';

export default class DownloadCardClient extends React.Component {

  constructor(props) {

    super(props);

    this.replace_values = [];
    this.state = {
      company: props.company || '',
      divisions: props.divisions || '',
      division: props.division || '',
      clients: '',
      client: props.client || '',
      card: '',
      card_clients: ''
    };
  };

  /**
   * 会社・部署セット
   * @version 2020/03/23
   **/
  applyDivision = props => {

    this.cardSearch(props);
  };

  /**
   * 会社・部署セット
   * @version 2020/03/23
   **/
  applyCard = card => {

    this.cardClientSearch(card);
  };

  /**
   *  検索
   *  @version 2018/06/10
   */
  clientSearch = props => {

    const url = '/company_division_clients/search_clients?company_division_id=' + props.division.id;
    const request = window.xhrRequest.get(url);
    request.then(res => {

      this.setState({ company: props.company, division: props.division, clients: res.data.clients, cards: res.data.cards });
    }).catch(error => {

      window.alertable({ icon: 'error', message: error.message });
    });
  };

  /**
   * 名刺セット 
   * @version 2020/04/07
   */
  cardSearch = props => {

    const url = '/card_clients.json?cardSearch=true&company_division_id=' + props.division.id;
    const request = window.xhrRequest.get(url);
    request.then(res => {

      this.loadingRef.finish();
      this.setState({ company: props.company, division: props.division, cards: res.data.cards });
    }).catch(error => {

      this.loadingRef.finish();
      window.alertable({ icon: 'error', message: error.message });
    });
    this.loadingRef.start();
  };

  /**
   * 名刺担当者セット 
   * @version 2020/04/07
   */
  cardClientSearch = card => {

    const url = '/card_clients.json?cardClientSearch=true&division_id=' + this.state.division.id + '&card_id=' + card.id;
    const request = window.xhrRequest.get(url);
    request.then(res => {

      let card_clients = [];
      res.data.card_clients.forEach(card_client => {

        const obj = {
          'id': card_client.id,
          'client_name': card_client.client_name,
          'status': true,
          'replace': card_client.replace,
          'values': card_client.values
        };
        card_client.values.forEach(value => {

          this.replace_values.push(value);
        });
        card_clients.push(obj);
      });

      this.loadingRef.finish();
      this.setState({ card: card, card_clients: card_clients });
    }).catch(error => {

      this.loadingRef.finish();
      window.alertable({ icon: 'error', message: error.message });
    });

    this.loadingRef.start();
  };

  changeRaidoStatus = e => {

    const card_clients = [];
    this.replace_values = [];
    this.state.card_clients.forEach(card_client => {

      if(card_client.id == e.target.value) card_client.status = !card_client;
      if(card_client.status) {

        card_client.values.forEach(value => {

          this.replace_values.push(value);
        });
      };
      card_clients.push(card_client);
    });

    this.setState({ card_clients: card_clients});
  };

  /**
   * CSVダウンロード 
   * @version 2020/04/13 
   * 
   */
  download = e => {

    e.stopPropagation();

    const card_clients = this.state.card_clients;
    if(!validProperty(this.state.division, '部署情報を選択して下さい。')) return;
    if(!validProperty(this.state.card, '名刺情報を選択してください。')) return;
    let i = 0;
    card_clients.map(card_client => {
      if(card_client.status) i++;
    });
    if(!validProperty(i == card_clients.length, '担当者を選択してください。')) return;
  };

  render() {
    return(
      <Fragment>
        <Division company={ this.state.company } divisions={ this.state.divisions } division={ this.state.division } typeName={ DivisionTypeName } notFound={ DivisionNotFound } applyDivision={ this.applyDivision }/>
        <Card cards={ this.state.cards } card={ this.state.card } typeName={ CardTypeName } notFound={ CardNotFound } applyCard={ this.applyCard }/>
        <CardClient card_clients={ this.state.card_clients } company={ this.state.company } division={ this.state.division } changeRaidoStatus={ this.changeRaidoStatus }/>
        <CSVDownload division={ this.state.division } card={ this.state.card } card_clients={ this.state.card_clients } replace_values={ this.replace_values }/>
        <Loading ref={ node => this.loadingRef = node }/>
      </Fragment>
    );
  };
};