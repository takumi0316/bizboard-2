import React, { Fragment } from 'react';

import Division       from '../division';
import Client         from './customer/client';
import Card           from './customer/card';
import Template       from './customer/card/template';
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

    Ts.loadFont();

    this.state = {
      cards: props.cards,
      card: props.card,
      company: props.company,
      divisions: props.divisions,
      division: props.division,
      clients: props.clients,
      client: props.client,
      template: props.template,
      status: true,
      default: props.card_client.status == 'default' ? true : false,
      change_status: false,
      card_client_id: props.card_client.id
    };
  };

  /**
   * React LifeCycle
   * @version 2020/04/28
   *
   */
  componentDidMount = () => {

    this.loadingRef.start();
 
    const field = new FormData();
    field.append('url', this.state.template.file);
    const request = window.xhrRequest.post('/cards/transfer', field, { responseType: 'blob' });
    request.then(res => {

      if(res.data.status != 'error') {
        const file = res.data;
          new Promise(resolve => {
            setPDFValue(file, document.getElementById('pdf'), document.getElementById('draw'), this.state.template.values);
            resolve(true);
          }).then(res => this.loadingRef.finish());
        };
      if(res.data.status == 'error') window.alertable({ icon: 'error', message: res.data.message, close_callback: () => this.loadingRef.finish() });
    }).catch(err => window.alertable({ icon: 'error', message: err, close_callback: () => this.loadingRef.finish() }));
  };

  /**
   * ヘッダーセット
   * @version 2020/03/30
   *
   */
  onChangeValue = (e, value_index) => {

    let template = JSON.parse(JSON.stringify(this.state.template));
    const value = e.target.value;

    if(!value) window.alertable({ icon: 'info', message: '値を入力して下さい。'});

    template.values[value_index].value = value;
    const values = template.values;
    this.setState({ template: template, change_status: true }, () => drawTextValue(values, document.getElementById('draw')));
  };
  
  /**
   * 裏面ページへ遷移
   * @version 2020/05/28
   *
   */
  front_transition = e => {
    
    e.stopPropagation();
    
    const file = this.state.template.file;
    if(!file) {
      
      window.alertable({ icon: 'error', message: 'テンプレートを登録してください。' });
      return
    };
    
    if(this.state.change_status) {
      
      window.alertable({ icon: 'error', message: '変更内容を保存してください。' });
      return;
    };
    
    location.href = `/card_clients/${this.props.card_client.id}/front_preview`;
  };
  
  /* 裏面ページへ遷移
   * @version 2020/05/28
   *
   */
  reverse_transition = e => {
    
    e.stopPropagation();
    
    const file = this.state.template.file;
    if(!file) {
      
      window.alertable({ icon: 'error', message: 'テンプレートを登録してください。' });
      return
    };
  
    if(this.state.change_status) {
    
      window.alertable({ icon: 'error', message: '変更内容を保存してください。' });
      return;
    };
  
    location.href = `/card_clients/${this.props.card_client.id}/reverse_preview`;
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
    field.append('card_client[templates_attributes][][id]', this.state.template.id);
    field.append('card_client[templates_attributes][][card_client_id]', this.state.card_client_id);
    field.append('card_client[templates_attributes][][card_template_id]', this.state.template.card_template_id);
    this.state.template.values.forEach(value => {
      field.append('card_client[templates_attributes][][values_attributes][][id]', value.id);
      field.append('card_client[templates_attributes][][values_attributes][][client_template_id]', value.client_template_id);
      field.append('card_client[templates_attributes][][values_attributes][][template_detail_id]', value.template_detail_id);
      field.append('card_client[templates_attributes][][values_attributes][][value]', value.value);
    });

    const url = `/card_clients/${this.props.card_client.id}`;
    const request = window.xhrRequest.put(url, field);
    request.then(res => {

      this.setState({ change_status: res.data.status == 'success' ? false : true }, () => {
        
        window.alertable({ icon: res.data.status, message: res.data.status == 'success' ? '更新に成功しました。' : res.data.messsage, close_callback: () => this.loadingRef.finish() });
      });
    }).catch(error => {

      window.alertable({ icon: 'error', message: error.message, close_callback: () => this.loadingRef.finish() });
    });
    this.loadingRef.start();
  };

  render() {
    return(
      <div>
        <div className='u-mt-20'>
          { this.state.default ?
            <button className='c-btnMain' onClick={ () => this.setState({ default: !this.state.default })}>デフォルト設定を解除する</button>
            :
            <button className='c-btnMain' onClick={ () => this.setState({ default: !this.state.default })}>デフォルトに設定する</button>
          }
        </div>
        <Division company={ this.state.company } division={ this.state.division } typeName={ DIVISION_TYPE_NAME } notFound={ DIVISION_NOT_FOUND } applyDivision={ this.applyDivision }/>
        <Client clients={ this.state.clients } client={ this.state.client } typeName={ CLIENT_TYPE_NAME } notFound={ CLIENT_NOT_FOUND } applyClient={ this.applyClient }/>
        <Card cards={ this.state.cards } card={ this.state.card } typeName={ CARD_TYPE_NAME } notFound={ CARD_NOT_FOUND } applyCard={ this.applyCard }/>
        <Fragment>
        { this.props.both == 2 ?
          <div className='u-mt-10'>
            <button className='c-btnMain'
              onClick={ e => this.props.template_type ? this.reverse_transition(e) : this.front_transition(e) }>{ this.props.template_type ? '裏面を設定する' : '表面を設定する' }</button>
          </div>
          : null
        }
         <Template client_template={ this.state.template } onChangeValue={ this.onChangeValue }/>
        </Fragment>
        <div className='c-overlay-submit'>
          <button className='c-btnMain c-btn-blue' onClick={ e => this.save(e) }>更新する</button>
        </div>
        <Loading ref={ node => this.loadingRef = node }/>
      </div>
    );
  };
};
