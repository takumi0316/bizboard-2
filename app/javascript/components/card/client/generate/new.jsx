import React, { Fragment } from 'react';

import Division       from '../division';
import Client         from './customer/client';
import Card           from './customer/card';
import Template       from './customer/card/template';
import TempalteStatus from './template_status';
import Loading        from '../../../loading';

import {
  DIVISION_TYPE_NAME,
  CLIENT_TYPE_NAME,
  CARD_TYPE_NAME,
  DIVISION_NOT_FOUND,
  CLIENT_NOT_FOUND,
  CARD_NOT_FOUND,
} from '../../properties.es6';

import {
  toBoolean,
  drawTextValue,
  setPDFValue,
} from '../../util';

export default class ClientGenerate extends React.Component {

  constructor(props) {
    super(props);

    this.front_file = '';
    this.reverse_file = '';

    Ts.loadFont();
  
    this.state = {
      cards: '',
      card: '',
      company: '',
      divisions: props.divisions || '',
      division: '',
      clients: '',
      client: '',
      templates: '',
      status: true,
      default: false,
      card_client_id: this.props.card_client.id || ''
    };
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
   * ステータスセット
   * @version 2020/03/27
   */
  setStatus = () => this.setState({ status: !this.state.status });

  /**
   * 会社・部署セット
   * @version 2020/03/23
   *
   **/
  applyDivision = props => this.clientSearch(props);

  /**
   * 担当者セット
   * @version 2020/04/07
   */
  applyClient = client =>this.setState({ client: client });

  /**
   * 名刺セット
   * @version 2020/04/07
   *
   */
  applyCard = card => this.cardSearch(card);

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

    this.setState({ templates: templates }, () => drawTextValue(values[value_index], document.getElementById('pdf'), document.getElementById('draw'), value_index));
  };

  /**
   *  検索
   *  @version 2018/06/10
   *
   */
  clientSearch = props => {

    const url = '/company_division_clients/search_clients?company_division_id=' + props.division.id + '&company_id=' + props.company.id;
    const request = window.xhrRequest.get(url);
    request.then(res => {

      if(res.data.status == 'success') {

        if(this.state.client) this.setState({ company: props.company, division: props.division, clients: res.data.clients, client: '', cards: res.data.cards, card: '', templates: '' });
        if(!this.state.client) this.setState({ company: props.company, division: props.division, clients: res.data.clients, cards: res.data.cards });
      };

      if(res.data.status != 'success') window.alertable({ icon: 'error', message: res.data.message });
    }).catch(error => window.alertable({ icon: 'error', message: error.message }));
  };

  /**
   * 名刺セット
   * @version 2020/04/07
   *
   */
  cardSearch = card => {

    const url = '/cards.json?id=' + card.id;
    const request = window.xhrRequest.get(url);
    request.then(res => {

      const templatesInit = [
        { ...res.data.front_templates },
        { ...res.data.reverse_templates },
      ].filter(template => template.file);

      const mapTemplatesInit = templatesInit.map(template => {

        const templateObj = {
          'id': '',
          'card_template_id': template.id,
          'status': template.status,
          'file': template.file,
          'values': []
        };

        templateObj.values = template.details.map(detail => {
          return {
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
            'length': detail.length,
            'line_space': detail.line_space,
            'item_type': detail.item_type
          };
        });

        return JSON.parse(JSON.stringify(templateObj));
      });

      this.setState({ card: card, templates: mapTemplatesInit }, () => this.getConvertPDF());
    }).catch(error =>  window.alertable({ icon: 'error', message: error.message }));
  };

  /**
   * サーバーからPDF取得
   * @version 2020/04/08
   *
   */
  getConvertPDF = () => {

    this.loadingRef.start();
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
            const values = this.state.templates[this.state.status ? 0 : 1].values;
            new Promise(resolve => {
              setPDFValue(file, document.getElementById('pdf'), document.getElementById('draw'), values);
              resolve(true);
            }).then(res => this.loadingRef.finish());
          };
          if(!bool) this.reverse_file = file;
        };
        if(res.data.status == 'error') window.alertable({ icon: 'error', message: res.data.message });
      }).catch(err => window.alertable({ icon: 'error', message: err }));
    });
  };

  /**
   * 保存
   * @version 2020/04/08
   *
   */
  save = e => {

    e.stopPropagation();
    const field = new FormData();

    field.append('card_client[card_id]', this.state.card.id);
    field.append('card_client[status]', this.state.default ? 'default' : 'custom');
    field.append('card_client[company_division_id]', this.state.division.id);
    field.append('card_client[company_division_client_id]', this.state.client.id);
    this.state.templates.map(template => {
      field.append('card_client[templates_attributes][][id]', template.id);
      field.append('card_client[templates_attributes][][card_client_id]', this.state.card_client_id);
      field.append('card_client[templates_attributes][][card_template_id]', template.card_template_id);
      template.values.map(value => {
        field.append('card_client[templates_attributes][][values_attributes][][id]', value.id);
        field.append('card_client[templates_attributes][][values_attributes][][client_template_id]', value.client_template_id);
        field.append('card_client[templates_attributes][][values_attributes][][template_detail_id]', value.template_detail_id);
        field.append('card_client[templates_attributes][][values_attributes][][value]', value.value);
      });
    });

    const request = window.xhrRequest.post(this.props.action, field);
    request.then(res => {

      this.loadingRef.finish();
      const redirect = window.location.href = `/card_clients/${res.data.card_client.id}/front_preview/`;
      if(res.data.status == 'success') window.alertable({ icon: 'success', message: '作成に成功しました。', close_callback: () => redirect() });
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
        <div className='u-mt-20'>
          { this.state.default ?
            <button className='c-btnMain-primaryA' onClick={ () => this.setState({ default: !this.state.default })}>デフォルト設定を解除する</button>
            :
            <button className='c-btnMain-primaryB' onClick={ () => this.setState({ default: !this.state.default })}>デフォルトに設定する</button>
          }
        </div>
        <Division company={ this.state.company } divisions={ this.state.divisions } division={ this.state.division } new={ this.props.new } typeName={ DIVISION_TYPE_NAME } notFound={ DIVISION_NOT_FOUND } applyDivision={ this.applyDivision }/>
        <Client clients={ this.state.clients } client={ this.state.client } new={ this.props.new } typeName={ CLIENT_TYPE_NAME } notFound={ CLIENT_NOT_FOUND } applyClient={ this.applyClient }/>
        <Card cards={ this.state.cards } card={ this.state.card } new={ this.props.new } typeName={ CARD_TYPE_NAME } notFound={ CARD_NOT_FOUND } applyCard={ this.applyCard }/>
        { this.state.templates ?
          <Fragment>
            { this.state.templates.length === 2 ?
              <TempalteStatus status={ this.state.status } setStatus={ this.setStatus }/>
              : null
            }
            { this.state.status ?
              <Template client_template={ this.state.templates[0] } status={ this.state.status } onChangeValue={ this.onChangeValue }/>
              :
              <Template client_template={ this.state.templates[1] } status={ this.state.status } onChangeValue={ this.onChangeValue }/>
            }
          </Fragment>
          : <div>テンプレートを選択してください。</div>
        }
        <div className='c-overlay-submit'>
          <button className='c-btnMain-primaryB' onClick={ e => this.save(e) }>作成する</button>
        </div>
        <Loading ref={ node => this.loadingRef = node } message='展開しています' />
      </div>
    );
  };
};
