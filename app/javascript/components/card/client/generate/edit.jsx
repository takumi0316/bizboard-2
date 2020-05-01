import React, { Fragment } from 'react';

import Division       from './customer/division';
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
} from './properties.es6';

import {
  ptTomm,
  mmTopx,
} from './util';

export default class ClientGenerate extends React.Component {

  constructor(props) {
    super(props);

    console.log(props.reverse_value);
    const clientTemplateInit = [
      { ...props.front_value },
      { ...props.reverse_value }
    ].filter(template => template.id);

    this.template_front_file = '';
    this.template_reverse_file = '';

    this.state = {
      cards: props.cards,
      card: props.card,
      company: props.company,
      divisions: props.divisions,
      division: props.division,
      clients: props.clients,
      client: props.client,
      client_templates: [...clientTemplateInit],
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

    const client_templates = this.state.client_templates.filter(card_template => card_template.file);
    this.state.client_templates.map(client_template => {

      const field = new FormData();
      field.append('url', client_template.file);
      const request = window.xhrRequest.post('/cards/transfer', field, { responseType: 'blob' });
      request.then(res => {

        if(res.data.status != 'error') {
          const file = res.data;
          const bool = this.toBoolean(client_template.status);
          if(bool) {
            this.template_front_file = file;
            this.setPDF(file, this.loadingRef, client_templates[0].values);
          };
          if(!bool) this.template_reverse_file = file;
        };
        if(res.data.status == 'error') window.alertable({ icon: 'error', message: res.data.message });

      }).catch(err => window.alertable({ icon: 'error', message: err }));
    });
  };

  /**
   * React LifeCycle
   * @version 2020/04/28
   *
   */
  componentDidUpdate = (prevProps, prevState) => {

    if(this.state.status == prevState.status || !this.state.client_templates) return;

    const file = this.state.status ? this.template_front_file : this.template_reverse_file;
    const values = this.state.status ? this.state.client_templates[0].values : this.state.client_templates[1].values;

    if(file) this.setPDF(file, this.loadingRef, values);
  };

  /**
   * String => Bool
   * @version 2020/04/28
   *
   */
  toBoolean = data => data.toLowerCase() === 'true';

  /**
   * ヘッダーセット
   * @version 2020/03/30
   *
   */
  onChangeValue = e => {

    const status = this.state.status;
    let client_templates = JSON.parse(JSON.stringify(this.state.client_templates));
    const detail_id = e.target.getAttribute('index');
    const value = e.target.value;

    if(!value) window.alertable({ icon: 'info', message: '値を入力して下さい。'});

    if(status) client_templates[0].values[detail_id].value = value;

    if(!status) client_templates[1].values[detail_id].value = value;

    this.setState({ client_templates: client_templates }, () => this.drawText());
  };

  /**
   * PDFにテキストを展開
   * @version 2020/04/06
   *
   */
  drawText = () => {

    const values = this.state.status ? this.state.client_templates[0].values : this.state.client_templates[1].values;

    let draw_canvas = document.getElementById('draw')
    let draw_ctx = draw_canvas.getContext('2d');

    // Set dimensions to Canvas
    draw_ctx.beginPath();
    draw_ctx.clearRect(0, 0, draw_canvas.width, draw_canvas.height);
    draw_ctx.save();
    draw_ctx.setTransform(1, 0, 0, 1, 0, 0);
    draw_ctx.restore();

    values.forEach(value => {

      draw_ctx.font = `${mmTopx(ptTomm(value.font_size)) * 2}px ${value.font}`;
      const y = mmTopx(value.coord_y) * 2;
      const x =	mmTopx(value.coord_x) * 2;
      const fontSize = mmTopx(ptTomm(value.font_size)) * 2;
      const lineSpace = mmTopx(value.line_space);
      const card_value = value.value;

      for(let lines = card_value.split('\n'), i = 0, l = lines.length; l > i; i++) {
        let line = lines[i];
        let addY = fontSize;
        if (i) addY += fontSize * lineSpace * i;
        draw_ctx.fillText(line, x, y + addY);
      }
    });
  };

  /**
   * PDFを展開する
   * @version 2020/03/30
   */
  setPDF = (file, loadingRef, values) => {

    loadingRef.start();
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
      canvas.width = (mmTopx(91 * 2));

      draw_canvas.height = (mmTopx(55 * 2));
      draw_canvas.width = (mmTopx(91 * 2));

      values.forEach(value => {

        draw_ctx.font = `${mmTopx(ptTomm(value.font_size)) * 2}px ${value.font}`;
        const y = mmTopx(value.coord_y) * 2;
        const x =	mmTopx(value.coord_x) * 2;
        const fontSize = mmTopx(ptTomm(value.font_size)) * 2;
        const lineSpace = mmTopx(value.line_space);
        const card_value = value.value;

        for(let lines = card_value.split('\n'), i = 0, l = lines.length; l > i; i++) {
          let line = lines[i];
          let addY = fontSize;
          if (i) addY += fontSize * lineSpace * i;
          draw_ctx.fillText(line, x, y + addY);
        }
      });

      // Prepare object needed by render method
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      // Render PDF page
      page.render(renderContext);
      loadingRef.finish();
    }).catch(error => {

      loadingRef.finish();;
      window.alertable({ 'icon': 'error', message: error});
    });
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
    this.state.client_templates.map(template => {
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
        <Division company={ this.state.company } division={ this.state.division } typeName={ DivisionTypeName } notFound={ DivisionNotFound } applyDivision={ this.applyDivision }/>
        <Client clients={ this.state.clients } client={ this.state.client } typeName={ ClientTypeName } notFound={ ClientNotFound } applyClient={ this.applyClient }/>
        <Card cards={ this.state.cards } card={ this.state.card } typeName={ CardTypeName } notFound={ CardNotFound } applyCard={ this.applyCard }/>
        <Fragment>
          { this.state.client_templates[1] ?
            <TempalteStatus status={ this.state.status } setStatus={ this.setStatus }/>
            : null
          }
          { this.state.status ?
            <Template client_template={ this.state.client_templates[0] } status={ this.state.status } onChangeValue={ this.onChangeValue }/>
            :
            <Template client_template={ this.state.client_templates[1] } status={ this.state.status } onChangeValue={ this.onChangeValue }/>
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
