import React, { Fragment } from 'react';

import Division       from './customer/division';
import Client         from './customer/client';
import Card           from './customer/card';
import Template       from './customer/card/template';
import TempalteStatus from './template_status';
import Loading        from '../../../loading';

import pdfjsLib from 'pdfjs-dist/webpack';
// Ajax
import Request from 'superagent';
require('superagent-rails-csrf')(Request);

import {
  DivisionTypeName,
  ClientTypeName,
  CardTypeName,
  DivisionNotFound,
  ClientNotFound,
  CardNotFound,
} from './properties.es6';

import {
  validProperty,
  ptTomm,
  mmTopx,
} from './util';


export default class ClientGenerate extends React.Component {

  constructor(props) {
    super(props);

    this.template_front_file = '';
    this.template_reverse_file = '';

    this.state = {
      cards: '',
      card: '',
      company: '',
      divisions: props.divisions || '',
      division: '',
      clients: '',
      client: '',
      client_templates: '',
      status: true,
      card_client_id: this.props.card_client.id || ''
    };
	};

  componentDidUpdate = (prevProps, prevState) => {

    if(this.state.status == prevState.status || !this.state.client_templates) return;

    const file = this.state.status ? this.template_front_file : this.template_reverse_file;
    const values = this.state.status ? this.state.client_templates[0].values : this.state.client_templates[1].values;

    if(file) this.setPDF(file, this.loadingRef, values);
  };

  toBoolean = data => {

    return data.toLowerCase() === 'true';
  };

  /**
   * ヘッダーセット
   * @version 2020/03/30
   */
  onChangeValue = e => {

    const status = this.state.status;
    let client_templates = { ...this.state.client_templates };
    const detail_id = e.target.getAttribute('index');
    const value = e.target.value;

    if(!value) window.alertable({ icon: 'info', message: '値を入力して下さい。'});

    if(status) client_templates[0].values[detail_id].value = value;

    if(!status) client_templates[1].values[detail_id].value = value;

    this.setState({ ...client_templates }, this.drawText());
  };

  /**
   * PDFにテキストを展開
   * @version 2020/04/06
   */
  drawText = () => {

    const values = this.state.status ? this.state.client_templates[0].values : this.state.client_templates[1].values;
    let draw_canvas = document.getElementById('draw'); 
    let draw_ctx = draw_canvas.getContext('2d');

    // Set dimensions to Canvas
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

      for(let lines=card_value.split( "\n" ), i=0, l=lines.length; l>i; i++ ) {
        let line = lines[i] ;
        let addY = fontSize ;
        if ( i ) addY += fontSize * lineSpace * i ;
        draw_ctx.fillText(line, x, y + addY);
      };
    });
  };

  /**
   * PDFを展開する
   * @version 2020/03/30
   */
  setPDF = (file, loadingRef, values) => {

    const blob = new Blob([file]);
    const blob_path = (window.URL || window.webkitURL).createObjectURL(blob);
    const getPDF = pdfjsLib.getDocument(blob_path);

    getPDF.then(function(pdf) {
      return pdf.getPage(1);
    }).then(function(page) {
      // Set scale (zoom) level
      let scale = 2;

      // Get viewport (dimensions)
      let viewport = page.getViewport(scale);

      // Get canvas#the-canvas
      let canvas = document.getElementById('pdf');
      let draw_canvas = document.getElementById('draw');

      // Fetch canvas' 2d context
      let ctx = canvas.getContext('2d');
      let draw_ctx = draw_canvas.getContext('2d');

      // Set dimensions to Canvas
      canvas.height = (mmTopx(55 * 2));
      // canvas.style.height = `${(mmTopx(55 * 2))}px`;
      // viewport.height = `${(mmTopx(55 * 2))}px`;

      canvas.width = (mmTopx(91 * 2));
      // canvas.style.width = `${(mmTopx(91 * 2))}px`;
      // viewport.width = `${(mmTopx(91 * 2))}px`;

      draw_canvas.height = (mmTopx(55 * 2));
      // draw_canvas.style.height = `${(mmTopx(55 * 2))}px`;
      draw_canvas.width = (mmTopx(91 * 2));
      // draw_canvas.style.width = `${(mmTopx(91 * 2))}px`;

      // Prepare object needed by render method
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      // Render PDF page
      page.render(renderContext);
      loadingRef.finish();
    });
  };

  /**
   * ステータスセット
   * @version 2020/03/27
   */
  setStatus = () => {

    this.setState({ status: !this.state.status });
  };

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

    this.cardSearch(card);
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
        { ...reverse_templates },
      ];

      let clientTemplatesInit = [];

      templatesInit.map(template => {

        if(!template.file) return;
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

  /**
   * サーバーからPDF取得
   * @version 2020/04/08
   */
  getConvertPDF = () => {

    this.loadingRef.start();
    const client_templates = this.state.client_templates;
    client_templates.forEach((client_template, index) => {

      if(!client_template.file) return;
      Request.get('/cards/transfer')
        .query({url: client_template.file})
        .responseType('blob')
        .end((error, res) => {

          const file = res.body;
          const bool = this.toBoolean(client_template.status);
          if(bool) this.template_front_file = file;
          if(bool) this.setPDF(file, this.loadingRef, client_templates[0].values);
          if(!bool) this.template_reverse_file = file;
        });
    });
  };

  /**
   * 保存
   * @version 2020/04/08
   */
  save = e => {

    e.stopPropagation();
    const field = new FormData();

    field.append('card_client[card_id]', this.state.card.id);
    field.append('card_client[company_division_id]', this.state.division.id);
    field.append('card_client[company_division_client_id]', this.state.client.id);
    this.state.client_templates.forEach((template, index) => {
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

    const request = window.xhrRequest.post(this.props.action, field);
    request.then(res => {

      this.loadingRef.finish();
      window.location.href = `/card_clients/${res.data.card_client.id}/edit/`;
    }).catch(error => {

      this.loadingRef.finish();
      window.alertable({ icon: 'error', message: error.message });
    });
    this.loadingRef.start();
  };

  render() {
    return(
      <div>
        <Division company={ this.state.company } divisions={ this.state.divisions } division={ this.state.division } new={ this.props.new } typeName={ DivisionTypeName } notFound={ DivisionNotFound } applyDivision={ this.applyDivision }/>
        <Client clients={ this.state.clients } client={ this.state.client } new={ this.props.new } typeName={ ClientTypeName } notFound={ ClientNotFound } applyClient={ this.applyClient }/>
        <Card cards={ this.state.cards } card={ this.state.card } new={ this.props.new } typeName={ CardTypeName } notFound={ CardNotFound } applyCard={ this.applyCard }/>
        { this.template_reverse_file ?
          <TempalteStatus status={ this.state.status } setStatus={ this.setStatus }/>
          : null
        }
        { this.state.client_templates ?
          <Fragment>
            { this.state.status ?
              <Template client_template={ this.state.client_templates[0] } status={ this.state.status } onChangeValue={ this.onChangeValue }/>
              :
              <Template client_template={ this.state.client_templates[1] } status={ this.state.status } onChangeValue={ this.onChangeValue }/>
            }
          </Fragment>
          : <div>テンプレートを選択してください。</div>
        }
        <div className='u-mt-30'>
          <button className='c-btnMain-primaryB' onClick={ e => this.save(e) }>作成する</button>
        </div>
        <Loading ref={ node => this.loadingRef = node } message='展開しています' />
      </div>
		);
  };
};