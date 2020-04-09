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

export default class ClientGenerate extends React.Component {

  constructor(props) {
    super(props);

    this.template_front_file = '';
    this.template_reverse_file = '';

    this.state = {
      cards: '',
      card: '',
      templates: '',
      company: props.company || '',
      divisions: '',
      division: props.division || '',
      clients: '',
      client: props.client || '',
      client_templates: '',
      status: true,
      card_client_id: this.props.card_client.id || ''
    };
	};

  componentDidMount = () => {

  };

  componentDidUpdate = (prevProps, prevState) => {

    if(this.state.status == prevState.status || !this.state.templates) return;

    const file = this.state.status ? this.template_front_file : this.template_reverse_file;
    const details = this.state.status ? this.state.templates[0].details : this.state.templates[1].details;

    if(file) this.setPDF(file, this.loadingRef, details)
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
    const templates = { ...this.state.templates };
    let client_templates = { ...this.state.client_templates };
    const detail_id = e.target.getAttribute('index');
    const column = e.target.id;

    if(status) client_templates[0].values[detail_id].value = e.target.value;

    if(!status) client_templates[1].values[detail_id].value = e.target.value;

    this.setState({ ...client_templates }, this.drawText());
  };

  /**
   * PDFにテキストを展開
   * @version 2020/04/06
   */
  drawText = () => {

    const details = this.state.status ? this.state.templates[0].details : this.state.templates[1].details;

    let draw_ctx = document.getElementById('draw').getContext('2d');

    details.forEach((detail, index) => {

      draw_ctx.font = 10.625178 * 4;
      const height = (1.3281472327365 * detail.coord_y) * 4;
      const width =	(1.3281472327365 * detail.coord_x) * 4;
      draw_ctx.fillText(detail.name, width, height);
    });
  };

  /**
   * PDFを展開する
   * @version 2020/03/30
   */
  setPDF = (file, loadingRef, details) => {

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
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      draw_canvas.height = viewport.height;
      draw_canvas.width = viewport.width;
      draw_ctx.beginPath();
      draw_ctx.clearRect(0,0,draw_canvas.width,draw_canvas.height);
      draw_ctx.save();
      draw_ctx.setTransform(1,0,0,1,0,0);
      draw_ctx.restore();

      details.forEach(detail => {

        draw_ctx.font = 10.625178 * 4;
        const height = (1.3281472327365 * detail.coord_y) * 4;
        const width =	(1.3281472327365 * detail.coord_x) * 4;
        draw_ctx.strokeText(detail.name, width, height);
      });

      // Prepare object needed by render method
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      // Render PDF page
      page.render(renderContext);
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
        { ...reverse_templates }
      ];
      let clientTemplatesInit = [];

      templatesInit.map((template, index) => {

        let templateObj = {
          'id': '',
          'card_client_id': '',
          'card_template_id': template.id,
          'values': []
        };

        template.details.map(detail => {
          const detailObj = {
            'id': '',
            'client_template_id': template.id,
            'template_detail_id': detail.id,
            'value': ''
          };
          templateObj.values.push({ ...detailObj });
        });

        clientTemplatesInit.push({ ...templateObj });
      });

      this.setState({ card: card, templates: templatesInit, client_templates: clientTemplatesInit }, () => this.getConvertPDF());
    }).catch(error => {

      window.alertable({ icon: 'error', message: error.message });
    });
  };

  /**
   * サーバーからPDF取得
   * @version 2020/04/08 
   */
  getConvertPDF = () => {

    const templates = this.state.templates;
    templates.forEach((template, index) => {

      if(!template.file) return;
      Request.get('/cards/transfer')
        .query({url: template.file})
        .responseType('blob')
        .end((error, res) => {

          const file = res.body;
          const bool = this.toBoolean(template.status);
          if(bool) this.template_front_file = file;
          if(bool) this.setPDF(file, this.loadingRef, templates[0].details);
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

      window.location.href = `/card_clients/${res.data.card_client.id}/edit/`;
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
        <TempalteStatus status={ this.state.status } setStatus={ this.setStatus }/>
        { this.state.templates ?
          <Fragment>
            { this.state.status ?
              <Template template={ this.state.templates[0] } client_template={ this.state.client_templates[0] } status={ this.state.status } onChangeValue={ this.onChangeValue }/>
              :
              <Template template={ this.state.templates[1] } client_template={ this.state.client_templates[1] } status={ this.state.status } onChangeValue={ this.onChangeValue }/>
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
