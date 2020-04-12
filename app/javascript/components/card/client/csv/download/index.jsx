import React from 'react';

import Division from './division';
import Client   from './client';
import Loading  from '../../../../loading';

import {
  DivisionTypeName,
  ClientTypeName,
  CardTypeName,
  DivisionNotFound,
  ClientNotFound,
  CardNotFound,
} from './properties.es6'

export default class DownloadCardClient extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      company: props.company || '',
      divisions: props.divisions || '',
      division: props.division || '',
      clients: '',
      client: props.client || '',
    };
  };

  componentDidMount = () => {

  };

  /**
   * 会社・部署セット
   * @version 2020/03/23
   **/
  applyDivision = props => {

    this.clientSearch(props);
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
  cardSearch = card => {

    const url = '/card_clients.json?company_division_id=' + card.id;
    const request = window.xhrRequest.get(url);
    request.then(res => {

    }).catch(error => {

      window.alertable({ icon: 'error', message: error.message });
    });
  };

  render() {
    return(
      <div>
        <Division company={ this.state.company } divisions={ this.state.divisions } division={ this.state.division } typeName={ DivisionTypeName } notFound={ DivisionNotFound } applyDivision={ this.applyDivision }/>
        <Client clients={ this.state.clients } cient={ this.state.client } typeName={ ClientTypeName } notFound={ ClientNotFound } applyClient={ this.applyClient }/>
      </div>
    );
  };
};