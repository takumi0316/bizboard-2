import React, { Fragment } from 'react';
import Papa                from 'papaparse';
import Encoding            from 'encoding-japanese';

import CardClient from './card_client';
import Division   from '../../division';
import Card       from './card';
import CSVImport  from './csv_import';
import Loading    from '../../../../loading';

import {
  DIVISION_TYPE_NAME,
  CARD_TYPE_NAME,
  DIVISION_NOT_FOUND,
  CARD_NOT_FOUND,
} from '../../../properties.es6'

import { drawTextValue } from '../../../util';

export default class UploadCardClient extends React.Component {

  constructor(props) {
    super(props);

    this.front_file = '';
    this.reverse_file = '';

    Ts.loadFont();
 
    this.state = {
      company: '',
      divisions: props.divisions || '',
      division: '',
      clients: '',
      client: '',
      card: '',
      cards: '',
      card_clients: '',
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
  applyCard = card => this.setState({ card: card }, () => this.parsePDF(card));

  /**
   * 名刺セット
   * @version 2020/04/07
   *
   */
  cardSearch = props => {

    this.loadingRef.start();
    const url = '/card_clients/upload.json?company_id=' + props.company.id;
    const request = window.xhrRequest.get(url);
    request.then(res => {

      this.loadingRef.finish();
      if(res.data.status == 'success') this.setState({ company: props.company, division: props.division, cards: res.data.cards });
      if(res.data.status != 'success') window.alertable({ icon: 'error', message: res.data.message });
    }).catch(error => {

      this.loadingRef.finish();
      window.alertable({ icon: 'error', message: error.message });
    });
  };

  /**
   * 名刺 && 担当者セット
   * @version 2020/04/07
   *
   */
  parsePDF = card => {

    const templates = [{ 'file': card.front_template, 'status': true }, { 'file': card.reverse_template || '', 'status': false }].filter(template => template.file);
    templates.map(template => {

      const field = new FormData();
      field.append('url', template.file);
      const request = window.xhrRequest.post('/cards/transfer', field, { responseType: 'blob' });
      request.then(res => {

        if(res.data.status != 'error') {

          const file = res.data;
          const bool = template.status;
          if(bool) this.front_file = file;
          if(!bool) this.reverse_file = file;
        };

        if(res.data.status == 'error') window.alertable({ icon: 'error', message: res.data.message });
      }).catch(err => window.alertable({ icon: 'error', message: err }));
    })
  };

  /**
   * 名刺担当者情報一括セット
   * @version 2020/04/13
   *
   */
  setCardClients = card_clients => this.setState({ card_clients: card_clients }, () => {
      window.alertable({ icon:'success', message: 'ファイルのアップロードが正常に成功しました。'});
    });

  /**
   * CSVを適当な形式に整形
   * @version 2020/04/14
   *
   */
  formatCSV = data => {

    const parse_clients = JSON.parse(JSON.stringify(data));
    const isDivision = parse_clients.every(client => client['会社ID'] == this.state.company.id);

    if(!isDivision) {
      window.alertable({ icon: 'error', message: '部署の選択が間違っています。' });
      return;
    };

    const card_clients = parse_clients.map(card_client => {

      const card = this.state.card;
      const client = {
        id: '',
        card_id: card.id,
        company_division_id: this.state.division.id,
        company_division_client_id: card_client['担当者ID'],
        client_name: card_client['担当者名'],
        templates: [],
      };

      if(!card.reverse_values) {

        client.templates.push({ id: '', card_client_id: '', card_template_id: card.front_template_id, values: [] });
        client.templates[0].values = card.front_values.map(value => {
          return { ...value, value: card_client[value.name] };
        });
      };

      if(card.reverse_values) {

        client.templates.push({ id: '', card_client_id: '', card_template_id: card.front_template_id, values: [] });
        client.templates[0].values = card.front_values.map(value => {
          return { ...value, value: card_client[value.name] };
        });
        client.templates.push({ id: '', card_client_id: '', card_template_id: card.reverse_template_id, values: [] });
        client.templates[1].values = card.reverse_values.map(value => {
          return { ...value, value: card_client[value.name] };
        });
      };

      return JSON.parse(JSON.stringify(client));
    });

    this.setState({ card_clients: card_clients });
  };

  /**
   * ヘッダーセット
   * @version 2020/03/30
   *
   */
  onChangeValue = (e, count, status) => {

    let card_clients = JSON.parse(JSON.stringify(this.state.card_clients));
    const value_id = e.target.getAttribute('index');
    const value = e.target.value;

    if(!value) window.alertable({ icon: 'info', message: '値を入力して下さい。'});

    card_clients[count].templates[status ? 0 : 1].values[value_id].value = value;
    const values = card_clients[count].templates[status ? 0 : 1].values;
    this.setState({ card_clients: card_clients }, drawTextValue(card_clients[count].templates[status ? 0 : 1].values[value_id], document.getElementById('draw', ), value_id));
  };

  /**
   *  ファイルドロップ時
   *  @version 2018/06/10
   *
   */
  parseCSV = files => {

    const file = files[0];
    const reader = new FileReader();
    reader.onload = e => {
      const codes = new Uint8Array(e.target.result);
      const encoding = Encoding.detect(codes);
      const unicodeString = Encoding.convert(codes, {
        to: 'unicode',
        from: encoding,
        type: 'string'
      });
      Papa.parse(unicodeString, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: results => this.formatCSV(results.data),
      });
    };
    reader.readAsArrayBuffer(file);
  };

  /**
   * 保存
   * @version 2020/04/08
   */
  save = e => {

    e.stopPropagation();
    const field = new FormData();

    const company_division_client_ids = [];
    this.state.card_clients.map(card_client => {
      company_division_client_ids.push(card_client.company_division_client_id);
      field.append('card_client[card_id]', card_client.card_id);
      field.append('card_client[company_division_id]', card_client.company_division_id);
      field.append('card_client[company_division_client_id]', card_client.company_division_client_id);
      card_client.templates.map(template => {
        field.append('company_division_client_ids[]', card_client.company_division_client_id);
        field.append('card_client[templates_attributes][][id]', '');
        field.append('card_client[templates_attributes][][card_client_id]', '');
        field.append('card_client[templates_attributes][][card_template_id]', template.card_template_id);
        template.values.map(value => {
          field.append('card_client[templates_attributes][][values_attributes][][id]', '');
          field.append('card_client[templates_attributes][][values_attributes][][client_template_id]', '');
          field.append('card_client[templates_attributes][][values_attributes][][template_detail_id]', value.id);
          field.append('card_client[templates_attributes][][values_attributes][][value]', value.value || '');
        });
      });
    });

    const request = window.xhrRequest.post('/card_clients/bulk', field);
    request.then(res => {

      this.loadingRef.finish();
      const redirect = () => window.location.href = '/card_clients';
      if(res.data.status == 'success') window.alertable({ icon: 'success', message: '一括登録に成功しました。', close_callback: redirect });
      if(res.data.status != 'success') window.alertable({ icon: 'error', message: res.data.message });
    }).catch(error => {

      this.loadingRef.finish();
      window.alertable({ icon: 'error', message: error });
    });
    this.loadingRef.start();
  };


  render() {
    return(
      <Fragment>
        <Division upload={ this.props.upload } company={ this.state.company } divisions={ this.state.divisions } division={ this.state.division } typeName={ DIVISION_TYPE_NAME } notFound={ DIVISION_NOT_FOUND } applyDivision={ this.applyDivision }/>
        <Card cards={ this.state.cards } card={ this.state.card } typeName={ CARD_TYPE_NAME } notFound={ CARD_NOT_FOUND } applyCard={ this.applyCard }/>
        { this.state.card_clients ?
          <CardClient card_clients={ this.state.card_clients } loadingRef={ this.loadingRef } front_file={ this.front_file } reverse_file={ this.reverse_file } onChangeValue={ this.onChangeValue } save={ this.save }/> :
          <CSVImport card_clients={ this.state.card_clients } division={ this.state.division } card={ this.state.card } parseCSV={ this.parseCSV }/>
        }
        <Loading ref={ node => this.loadingRef = node }/>
      </Fragment>
    );
  };
};
