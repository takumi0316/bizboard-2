import React, { Fragment } from 'react';
import Papa                from 'papaparse';
import Encoding            from 'encoding-japanese';

import CardClient from './card_client';
import Division   from './customer/division';
import Card       from './customer/card';
import CSVImport  from './csv_import';
import Loading    from '../../../../loading';

// Ajax
import Request from 'superagent';
require('superagent-rails-csrf')(Request);

import {
  DivisionTypeName,
  CardTypeName,
  DivisionNotFound,
  CardNotFound,
} from './properties.es6'

import {
  ptTomm,
  mmTopx,
} from './util';

export default class UploadCardClient extends React.Component {

  constructor(props) {
    super(props);

    this.template_front_file = '';
    this.template_reverse_file = '';

    this.state = {
      company: '',
      divisions: props.divisions || '',
      division: '',
      clients: '',
      client: '',
      card: '',
      card_clients: '',
    };
  };

  componentDidUpdate = (prevProps, prevState) => {

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

    this.setState({ card: card }, () => this.parsePDF(card));
  };

  /**
   * 名刺セット
   * @version 2020/04/07
   */
  cardSearch = props => {

    const url = '/card_clients/upload.json?company_division_id=' + props.division.id;
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
  parsePDF = card => {

    const templates = [{ 'file': card.front_template, 'status': true }, { 'file': card.reverse_template || '', 'status': false }];
    templates.forEach(template => {

      if(!template.file) {
        this.template_reverse_file = '';
        this.loadingRef.finish();
        return;
      };
      Request.get('/cards/transfer')
        .query({url: template.file})
        .responseType('blob')
        .end((error, res) => {

          const file = res.body;
          const bool = template.status;
          if(bool) this.template_front_file = file;
          if(!bool) {
            this.template_reverse_file = file;
            this.loadingRef.finish();
          };
        });
    })
    // this.loadingRef.start();
  };

  /**
   * 名刺担当者情報一括セット
   * @version 2020/04/13
   *
   */
  setCardClients = card_clients => {

    this.setState({ card_clients: card_clients }, () => {
      window.alertable({ icon:'success', message: 'ファイルのアップロードが正常に成功しました。'});
    });
  };

  /**
   * CSVを適当な形式に整形
   * @version 2020/04/14
   *
   */
  formatCSV = data => {

    let parse = JSON.parse(JSON.stringify(data));
    let card_clients = [];
    const clients = [];

    let front_template = {
      'id': '',
      'card_client_id': '',
      'card_template_id': '',
      'values': []
    };

    let reverse_template = {
      'id': '',
      'card_client_id': '',
      'card_template_id': '',
      'values': []
    };

    let cardClientObj = {
      'id': '',
      'card_id': this.state.card.id,
      'company_division_id': this.state.division.id,
      'company_division_client_id': '',
      'client_name': '',
      'client_templates': [
        Object.assign({}, front_template),
        this.template_reverse_file ? Object.assign({}, reverse_template) : ''
      ]
    };

    let prevCompanyDivisionClientId = '';
    Object.assign([], parse).map((card_client, index) => {

      if(card_client.company_division_id != this.state.division.id) {

        window.alertable({ icon: 'error', message: '選択された部署が違います。選択し直して下さい。' });
        return;
      };

      if(index == 0) {

        clients.push(card_client.company_division_client_id);
        cardClientObj.company_division_client_id = card_client.company_division_client_id;
        cardClientObj.client_name = card_client.client_name;
        cardClientObj.client_templates[0].card_template_id = card_client.card_template_id;
        cardClientObj.client_templates[0].values.push(Object.assign({}, card_client));

        if(this.template_reverse_file) {

          cardClientObj.client_templates[1].card_template_id = card_client.card_template_id;
          cardClientObj.client_templates[1].values.push(Object.assign({}, card_client));
        };
      } else if(prevCompanyDivisionClientId == card_client.company_division_client_id) {

        if(card_client.template_status) {

          cardClientObj.client_templates[0].values.push(Object.assign({}, card_client));
        } else {

          cardClientObj.client_templates[1].values.push(Object.assign({}, card_client));
        };
      } else if(prevCompanyDivisionClientId != card_client.company_division_client_id) {

        clients.push(card_client.company_division_client_id);
        card_clients.push(Object.assign({}, cardClientObj));
        cardClientObj.company_division_client_id = card_client.company_division_client_id;
        cardClientObj.client_name = card_client.client_name;
        cardClientObj.client_templates[0].card_template_id = card_client.card_template_id;
        cardClientObj.client_templates[0].values = [];

        if(this.template_reverse_file) {

          cardClientObj.client_templates[1].card_template_id = card_client.card_template_id;
          cardClientObj.client_templates[1].values = [];
        };
      };

      if(parse.length == index + 1) {

        clients.push(card_client.company_division_client_id);
        card_clients.push(Object.assign({}, cardClientObj));
      };

      prevCompanyDivisionClientId = card_client.company_division_client_id;
    });
    this.setCardClients(Object.assign([], card_clients));
  };

  /**
   * ヘッダーセット
   * @version 2020/03/30
   */
  onChangeValue = (e, count, status) => {

    let card_clients = Object.assign([], this.state.card_clients);
    const value_id = e.target.getAttribute('index');
    const value = e.target.value;

    if(!value) window.alertable({ icon: 'info', message: '値を入力して下さい。'});

    if(status) card_clients[count].client_templates[0].values[value_id].value = value;

    if(!status) card_clients[count].client_templates[1].values[value_id].value = value;

    this.setState({ card_clients: card_clients }, this.drawText(status, card_clients[count].client_templates));
    // this.setState({ ...client_templates });
  };

  /**
   * PDFにテキストを展開
   * @version 2020/04/06
   */
  drawText = (status, client_templates) => {

    const values = status ? client_templates[0].values : client_templates[1].values;

    let draw_canvas = document.getElementById('draw');
    let draw_ctx = draw_canvas.getContext('2d');

    draw_ctx.beginPath();
    draw_ctx.clearRect(0,0,draw_canvas.width,draw_canvas.height);
    draw_ctx.save();
    draw_ctx.setTransform(1,0,0,1,0,0);
    draw_ctx.restore();

    values.forEach(value => {

      draw_ctx.font = `${mmTopx(ptTomm(value.font_size)) * 2}px ${value.font}`;
      const y = mmTopx(value.coord_y) * 2;
      const x =	mmTopx(value.coord_x) * 2;
      const fontSize = mmTopx(ptTomm(value.font_size)) * 2;
      const lineSpace = mmTopx(value.line_space);
      const card_value = value.value;

      if(!card_value) return;
      for(let lines = card_value.split("\n"), i = 0, l = lines.length; l > i; i++) {
        let line = lines[i] ;
        let addY = fontSize ;
        if (i) addY += fontSize * lineSpace * i ;
        draw_ctx.fillText(line, x, y + addY);
      };
    });
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
        to: 'uncode',
        from: encoding,
        type: 'string'
      });
      Papa.parse(unicodeString, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          this.formatCSV(results.data);
        },
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
    this.state.card_clients.map((card_client, index) => {
      field.append('card_client[card_id]', this.state.card.id);
      field.append('card_client[company_division_id]', this.state.division.id);
      field.append('card_client[company_division_client_id]', card_client.company_division_client_id);
      field.append('company_division_client_ids[]', card_client.company_division_client_id);
      company_division_client_ids.push(card_client.company_division_client_id);
      card_client.client_templates.map(template => {
        if(template) {
          field.append('card_client[templates_attributes][][id]', '');
          field.append('card_client[templates_attributes][][card_client_id]', '');
          field.append('card_client[templates_attributes][][card_template_id]', template.card_template_id);
          template.values.map(value => {
            field.append('card_client[templates_attributes][][values_attributes][][id]', '');
            field.append('card_client[templates_attributes][][values_attributes][][client_template_id]', value.client_template_id || '');
            field.append('card_client[templates_attributes][][values_attributes][][template_detail_id]', value.template_detail_id || '');
            field.append('card_client[templates_attributes][][values_attributes][][value]', value.value || '');
          });
        };
      });
    });

    const request = window.xhrRequest.post('/card_clients/bulk', field);
    request.then(res => {

      this.loadingRef.finish();
      window.alertable({ icon: 'success', message: '保存に成功しました。' })
      //window.location.href = `/card_clients/${res.data.card_client.id}/edit/`;
    }).catch(error => {

      this.loadingRef.finish();
      window.alertable({ icon: 'error', message: error.message });
    });
    this.loadingRef.start();
  };


  render() {
    return(
      <Fragment>
        <Division company={ this.state.company } divisions={ this.state.divisions } division={ this.state.division } typeName={ DivisionTypeName } notFound={ DivisionNotFound } applyDivision={ this.applyDivision }/>
        <Card cards={ this.state.cards } card={ this.state.card } typeName={ CardTypeName } notFound={ CardNotFound } applyCard={ this.applyCard }/>
        { this.state.card_clients ?
          <CardClient card_clients={ this.state.card_clients } loadingRef={ this.loadingRef }  template_front_file={ this.template_front_file } template_reverse_file={ this.template_reverse_file } onChangeValue={ this.onChangeValue } save={ this.save }/> :
          <CSVImport card_clients={ this.state.card_clients } division={ this.state.division } card={ this.state.card } parseCSV={ this.parseCSV }/>
        }
        <Loading ref={ node => this.loadingRef = node }/>
      </Fragment>
    );
  };
};
