import React, { Fragment } from 'react';

import Division       from '../division';
import Client         from './customer/client';
import Card           from './customer/card';
import Template       from './customer/card/template';
import TempalteStatus from './template_status';
import Loading        from '../../../loading';

import {
  DivisionTypeName,
  ClientTypeName,
  CardTypeName,
  DivisionNotFound,
  ClientNotFound,
  CardNotFound,
} from '../../properties.es6';

import {
  toBoolean,
  drawTextValue,
  setPDFValue,
} from '../../util';

export default class ClientGenerate extends React.Component {

  constructor(props) {
    super(props);

    const clientTemplateInit = [
      { ...props.front_value },
      { ...props.reverse_value }
    ].filter(template => template.id);

    this.front_file = '';
    this.reverse_file = '';

    this.state = {
      cards: props.cards,
      card: props.card,
      company: props.company,
      divisions: props.divisions,
      division: props.division,
      clients: props.clients,
      client: props.client,
      templates: [...clientTemplateInit],
      status: true,
      card_client_id: this.props.card_client.id
    };
	};

  /**
   * React LifeCycle
   * @version 2020/04/28
   *
   */
  componentDidMount = () => {

    this.loadingRef.start();
    const templates = this.state.templates.filter(card_template => card_template.file);
    this.state.templates.map(template => {

      const field = new FormData();
      field.append('url', template.file);
      const request = window.xhrRequest.post('/cards/transfer', field, { responseType: 'blob' });
      request.then(res => {

        if(res.data.status != 'error') {
          const file = res.data;
          const bool = toBoolean(template.status);
          if(bool) {
            this.front_file = file;
            new Promise(resolve => {
              setPDFValue(file, document.getElementById('pdf'), document.getElementById('draw'), templates[0].values);
              resolve(true);
            }).then(res => this.loadingRef.finish());
          };
          if(!bool) this.reverse_file = file;
        };
        if(res.data.status == 'error') window.alertable({ icon: 'error', message: res.data.message, close_callback: () => this.loadingRef.finish() });

      }).catch(err => window.alertable({ icon: 'error', message: err, close_callback: () => this.loadingRef.finish() }));
    });
  };

  /**
   * React LifeCycle
   * @version 2020/04/28
   *
   */
  componentDidUpdate = (prevProps, prevState) => {

    const status = this.state.status;
    if(status == prevState.status || !this.state.templates) return;

    const file = status ? this.front_file : this.reverse_file;
    const values = this.state.templates[status ? 0 : 1].values;

    if(file) {
      this.loadingRef.start();
      new Promise(resolve => {
        setPDFValue(file, document.getElementById('pdf'), document.getElementById('draw'), values);
        resolve(true);
      }).then(res => this.loadingRef.finish());
    };
  };

  /**
   * ヘッダーセット
   * @version 2020/03/30
   *
   */
  onChangeValue = (e, value_index) => {

    let templates = JSON.parse(JSON.stringify(this.state.templates));
    const status = this.state.status;
    const value = e.target.value;

    if(!value) window.alertable({ icon: 'info', message: '値を入力して下さい。'});

    templates[status ? 0 : 1].values[value_index].value = value;
    const values = templates[status ? 0 : 1].values;
    this.setState({ templates: templates }, () => drawTextValue(values, document.getElementById('draw')));
  };

  /**
   * ステータスセット
   * @version 2020/03/27
   *
   */
  setStatus = () => this.setState({ status: !this.state.status });

  /**
   * 保存
   * @version 2020/04/08
   *
   */
  save = e => {

    e.stopPropagation();
    const field = new FormData();

    field.append('card_client[card_id]', this.state.card.id);
    field.append('card_client[company_division_id]', this.state.division.id);
    field.append('card_client[company_division_client_id]', this.state.client.id);
    this.state.templates.map(template => {
      field.append('card_client[templates_attributes][][id]', template.id);
      field.append('card_client[templates_attributes][][card_client_id]', this.state.card_client_id);
      field.append('card_client[templates_attributes][][card_template_id]', template.card_template_id);
      template.values.forEach(value => {
        field.append('card_client[templates_attributes][][values_attributes][][id]', value.id);
        field.append('card_client[templates_attributes][][values_attributes][][client_template_id]', value.client_template_id);
        field.append('card_client[templates_attributes][][values_attributes][][template_detail_id]', value.template_detail_id);
        field.append('card_client[templates_attributes][][values_attributes][][value]', value.value);
      });
    });

    const request = window.xhrRequest.put(this.props.action, field);
    request.then(res => {

      this.loadingRef.finish();
      if(res.data.status == 'success') window.alertable({ icon: 'success', message: '更新に成功しました。' });
      if(res.data.status != 'success') window.alertable({ icon: 'error', message: res.data.message });
    }).catch(error => {

      this.loadingRef.finish();
      window.alertable({ icon: 'error', message: error.message });
    });
    this.loadingRef.start();
  };

  render() {
    return(
      <div>
        <Division company={ this.state.company } division={ this.state.division } typeName={ DivisionTypeName } notFound={ DivisionNotFound } applyDivision={ this.applyDivision }/>
        <Client clients={ this.state.clients } client={ this.state.client } typeName={ ClientTypeName } notFound={ ClientNotFound } applyClient={ this.applyClient }/>
        <Card cards={ this.state.cards } card={ this.state.card } typeName={ CardTypeName } notFound={ CardNotFound } applyCard={ this.applyCard }/>
        <Fragment>
          { this.state.templates[1] ?
            <TempalteStatus status={ this.state.status } setStatus={ this.setStatus }/>
            : null
          }
          { this.state.status ?
            <Template client_template={ this.state.templates[0] } status={ this.state.status } onChangeValue={ this.onChangeValue }/>
            :
            <Template client_template={ this.state.templates[1] } status={ this.state.status } onChangeValue={ this.onChangeValue }/>
          }
        </Fragment>
        <div className='u-mt-30'>
          <button className='c-btnMain-primaryB' onClick={ e => this.save(e) }>更新する</button>
        </div>
        <Loading ref={ node => this.loadingRef = node }/>
      </div>
		);
  };
};
