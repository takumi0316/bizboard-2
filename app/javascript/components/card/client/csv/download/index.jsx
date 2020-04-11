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

export default class EditTemplateGenerate extends React.Component {

  constructor(props) {

    super(props);

    console.log(props.divisions)
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

    const url = '/cards.json?id=' + card.id;
    const request = window.xhrRequest.get(url);
    request.then(res => {

      const front_templates = res.data.front_templates;
      const reverse_templates = res.data.reverse_templates;
      const templatesInit = [
        { ...front_templates },
        { ...reverse_templates }
      ];
      let clientTemplatesInit = [];

      templatesInit.map((template, index) => {

        let templateObj = {
          'id': '',
          'card_client_id': '',
          'card_template_id': template.id,
          'status': template.status,
          'file': template.file,
          'values': []
        };

        template.details.map(detail => {
          const valueObj = {
            'id': '',
            'client_template_id': template.id,
            'template_detail_id': detail.id,
            'value': '',
            'name': detail.name,
            'font': detail.font,
            'font_size': detail.font_size,
            'font_color': detail.font_color,
            'coord_x': detail.coord_x,
            'coord_y': detail.coord_y,
            'length': detail.lenght,
            'line_space': detail.line_space

          };
          templateObj.values.push({ ...valueObj });
        });

        clientTemplatesInit.push({ ...templateObj });
      });

      this.setState({ card: card, client_templates: clientTemplatesInit }, () => this.getConvertPDF());
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