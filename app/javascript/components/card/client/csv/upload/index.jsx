import React, { Fragment } from 'react';
import Papa                from 'papaparse';
import Encoding            from 'encoding-japanese';

import Division   from './division';
import Card       from './card';
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

export default class UploadCardClient extends React.Component {

  constructor(props) {
    super(props);

    this.template_front_file = '';
    this.template_reverse_file = '';

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

    this.setState({ card: card }, () => this.cardClientSearch(card));
  };

  /**
   * 名刺セット 
   * @version 2020/04/07
   */
  cardSearch = props => {

    const url = '/card_clients.json?cardSearch=false&company_division_id=' + props.division.id;
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

    const templates = [{ 'file': card.front_template, 'status': true }, { 'file': card.reverse_template, 'status': false }];
    templates.forEach(template => {

      if(!template.file) {
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
    this.loadingRef.start();
  };

  /**
   * 名刺担当者情報一括セット 
   * @version 2020/04/13 
   * 
   */
  setCardClients = data => {

    console.log(data);
    window.alertable({ icon:'success', message: 'ファイルのアップロードが正常に成功しました。'});
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
          this.setCardClients(results.data);
        },
      });
    };
    reader.readAsArrayBuffer(file);
  };

  render() {
    return(
      <Fragment>
        <Division company={ this.state.company } divisions={ this.state.divisions } division={ this.state.division } typeName={ DivisionTypeName } notFound={ DivisionNotFound } applyDivision={ this.applyDivision }/>
        <Card cards={ this.state.cards } card={ this.state.card } typeName={ CardTypeName } notFound={ CardNotFound } applyCard={ this.applyCard }/>
        <CSVImport division={ this.state.division } card={ this.state.card } parseCSV={ this.parseCSV }/>
        <Loading ref={ node => this.loadingRef = node }/>
      </Fragment>
    );
  };
};