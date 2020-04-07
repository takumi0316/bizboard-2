import React, { Fragment } from 'react';

import Division from './customer/division';
import Client   from './customer/client';
import Card     from './customer/card';
import Template from './template/';

import {
  DivisionTypeName,
  ClientTypeName,
  CardTypeName,
  DivisionNotFound,
  ClientNotFound,
  CardNotFound,
} from './properties.es6';

export default class ClientGenerate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: '',
      card: '',
      templates: [1, 2],
      company: props.company || '',
      divisions: '',
      division: props.division || '',
      clients: '',
      client: props.client || '',
    };
	};

  componentDidMount = () => {

  };

  componentDidUpdate = (prevProps, prevState) => {

  }

  /**
   * 会社・部署セット
   * @version 2020/03/23
   **/
  applyDivision = props => {

    this.clientSearch(props);
  };

  /**
   * 担当者セット
   * @version 2020/04/07
   */
  applyClient = client => {

    this.setState({ client: client });
  };

  /**
   * 名刺セット
   * @version 2020/04/07
   */
  applyCard = card => {

    this.setState({ card: card });
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

  render() {
    return(
      <div>
        <Division company={ this.state.company } division={ this.state.division } typeName={ DivisionTypeName } notFound={ DivisionNotFound } applyDivision={ this.applyDivision }/>
        <Client clients={ this.state.clients } client={ this.state.client } typeName={ ClientTypeName } notFound={ ClientNotFound } applyClient={ this.applyClient }/>
        <Card cards={ this.state.cards } card={ this.state.card } typeName={ CardTypeName } notFound={ CardNotFound } applyCard={ this.applyCard }/>
        { this.state.templates.map(detail => {
          return(
            <Template key={ detail }/>
          );
        })}
      </div>
		);
  };
};
