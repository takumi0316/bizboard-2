import React, { Fragment } from 'react';

import DivisionSearch     from './division_search/index';
import CustomerInfomation from './customer_infomation/index';
import TempalteStatus     from './template_status/index';
import CardTemplate       from './card_template/index';
import Loading            from '../../../loading';

import pdfjsLib from 'pdfjs-dist/webpack';
// Ajax
import Request from 'superagent';
require('superagent-rails-csrf')(Request);

import {
  validProperty,
  ptTomm,
  mmTopx,
} from './util';

import {
  HEADERS
} from './properties.es6';

export default class EditTemplateGenerate extends React.Component {

  constructor(props) {

    super(props);

    this.template_front_file = '';
    this.template_reverse_file = '';

    const init = [
      { ...props.front_side },
      { ...props.reverse_side },
    ];

    this.state = {
      card_id: props.card.id || '',
      company: props.company || '',
      division: props.division || '',
      templates: [...init],
      status: true
    };
  };

  componentDidMount = () => {

    this.loadingRef.start();
    const templates = this.state.templates;
    if(!templates[0].file) return;
    templates.forEach(template => {

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

  componentDidUpdate = (prevProps, prevState) => {

    const details = this.state.status ? this.state.templates[0].details : this.state.templates[1].details;
    const file = this.state.status ? this.template_front_file : this.template_reverse_file;
    const state_file = this.state.status ? this.state.templates[0].file : this.state.templates[1].file;

    if(this.state.status == prevState.status && file != state_file) return;

    if(file) this.setPDF(file, this.loadingRef, details);
  };

  toBoolean = data => {

    return data.toLowerCase() === 'true';
  };

  /**
   *  ファイルドロップ時
   *  @version 2018/06/10
   */
  onDrop = files => {

    const file = files[0];
    let templates = this.state.templates;

    if(this.state.status) {

      templates[0].file = file;
      this.template_front_file = file;
    };

    if(!this.state.status) {

      templates[1].file = file;
      this.template_reverse_file = file;
    };

    this.setState({ ...templates });
  };

  /**
   * 会社・部署セット
   * @version 2020/03/23
   **/
  applyDivision = props => {

    this.setState({ company: props.company, division: props.division });
  };

  /**
   * ステータスセット
   * @version 2020/03/27
   */
  setStatus = () => {

    this.setState({ status: !this.state.status });
  };

  /**
   * 名刺ヘッダーカラム追加
   * @version 2020/03/30
   */
  addDetail = e => {

    e.preventDefault();

    const templates = this.state.templates;

    const init = {
      id: '',
      card_template_id: '',
      name: '',
      font: 'Osaka',
      font_size: '14',
      font_color: 'black',
      coord_y: '0',
      coord_x: '10',
      length: '15',
      line_space: '2'
    };

    this.state.status ? templates[0].details.push(init) : templates[1].details.push(init);
    this.setState({ ...templates });
  };

  /**
   * ヘッダーセット
   * @version 2020/03/30
   */
  onChangeDetail = e => {

    const status = this.state.status;
    let templates = { ...this.state.templates };
    let file = '';
    const detail_id = e.target.getAttribute('index');
    const detail_name =  e.target.id;
    const value = e.target.value;

    if(!value) {

      window.alertable({ icon: 'info', message: `ID: ${detail_id}の${HEADERS[detail_name]}を入力して下さい。`});
      return;
    };

    if(status) {

      templates[0].details[detail_id][detail_name] = value;
      file = templates[0].file;
    };

    if(!status) {

      templates[1].details[detail_id][detail_name] = value;
      file = templates[1].file;
    };

    if(file) this.setState({ ...templates }, this.drawText());
    if(!file) this.setState({ ...templates });
  };

  /**
   * PDFにテキストを展開
   * @version 2020/04/06
   */
  drawText = () => {

    const details = this.state.status ? this.state.templates[0].details : this.state.templates[1].details;

    let draw_canvas = document.getElementById('draw');
    let draw_ctx = draw_canvas.getContext('2d')

    draw_ctx.beginPath();
    draw_ctx.clearRect(0,0,draw_canvas.width,draw_canvas.height);
    draw_ctx.save();
    draw_ctx.setTransform(1,0,0,1,0,0);
    draw_ctx.restore();

    details.forEach(detail => {

      draw_ctx.font = `${mmTopx(ptTomm(detail.font_size)) * 2}px ${detail.font}`;
      const y = mmTopx(detail.coord_y) * 2;
      const x =	mmTopx(detail.coord_x) * 2;
      const fontSize = mmTopx(ptTomm(detail.font_size)) * 2;
      const lineSpace = mmTopx(detail.line_space);
      const name = `ここに${detail.name}が入ります。`;

      for(let lines=name.split( "\n" ), i=0, l=lines.length; l>i; i++ ) {
        let line = lines[i] ;
        let addY = fontSize ;
        if (i) addY += fontSize * lineSpace * i ;
        draw_ctx.fillText(line, x, y + addY);
      };
    });
  };

  /**
   * PDFをリセットする
   * @version 2020/04/04
   */
  unSetPDF = () => {

    let templates = this.state.templates;

    if(this.state.status) {

      templates[0].file = '';
      this.template_front_file = '';
    };

    if(!this.state.status) {

      templates[1].file = '';
      this.template_reverse_file = '';
    };

    this.setState({ ...templates })
  };

  /**
   * PDFを展開する
   * @version 2020/03/30
   */
  setPDF = (file, loadingRef, details) => {

    const blob = new Blob([file]);
    const blob_path = (window.URL || window.webkitURL).createObjectURL(blob);
    const getPDF = pdfjsLib.getDocument(blob_path);

    getPDF.promise.then(function(pdf) {
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

      details.forEach(detail => {

        draw_ctx.font = `${mmTopx(ptTomm(detail.font_size)) * 2}px ${detail.font}`;
        const y = mmTopx(detail.coord_y) * 2;
        const x =	mmTopx(detail.coord_x) * 2;
        const fontSize = mmTopx(ptTomm(detail.font_size)) * 2;
        const lineSpace = mmTopx(detail.line_space);
        const name = `ここに${detail.name}が入ります。`;

        console.log(x)
        console.log(y)
        for(let lines=name.split( "\n" ), i=0, l=lines.length; l>i; i++ ) {
          let line = lines[i] ;
          let addY = fontSize ;
          if ( i ) addY += fontSize * lineSpace * i ;
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
    }).catch(error =>{

      window.alertable({
        icon: 'error',
        message: error
      })
    });
  };

  /**
   * 保存
   * @version 2020/03/26
   */
  save = e => {

    e.stopPropagation();

    if(!validProperty(this.inputRef.value.trim(), 'タイトル')) return;
    if(!validProperty(this.state.division, '部署')) return;
    if(!validProperty(this.template_front_file, 'テンプレート')) return;

    const field = new FormData();

    field.append('card[name]', this.inputRef.value);
    field.append('card[company_division_id]', this.state.division.id);
    this.state.templates.forEach((template) => {

      field.append('card[templates_attributes][][id]', template.id);
      field.append('card[templates_attributes][][card_id]', template.card_id);
      field.append('card[templates_attributes][][status]', template.status);
      if(this.toBoolean(template.status)) field.append('card[templates_attributes][][file]', this.template_front_file);
      if(!this.toBoolean(template.status)) field.append('card[templates_attributes][][file]', this.template_reverse_file);
      template.details.forEach(detail => {

        field.append('card[templates_attributes][][details_attributes][][id]', detail.id);
        field.append('card[templates_attributes][][details_attributes][][card_template_id]', template.id);
        field.append('card[templates_attributes][][details_attributes][][name]', detail.name);
        field.append('card[templates_attributes][][details_attributes][][font]', detail.font);
        field.append('card[templates_attributes][][details_attributes][][font_size]', detail.font_size);
        field.append('card[templates_attributes][][details_attributes][][font_color]', detail.font_color);
        field.append('card[templates_attributes][][details_attributes][][coord_x]', detail.coord_x);
        field.append('card[templates_attributes][][details_attributes][][coord_y]', detail.coord_y);
        field.append('card[templates_attributes][][details_attributes][][length]', detail.length);
        field.append('card[templates_attributes][][details_attributes][][line_space]', detail.line_space);
      });
    });

    const request = window.xhrRequest.put(this.props.action, field);
    // 保存処理
    request.then(res => {

      this.loadingRef.finish();
      window.alertable({ icon: 'success', message: '更新に成功しました。' });
    }).catch(error => {

      this.loadingRef.finish();
      window.alertable({ icon: 'error', message: error.message });
    });
    this.loadingRef.start();
	};

  render() {
    return (
      <Fragment>
        <div className='u-mt-10'>
          <label className='c-form-label'>テンプレート名</label>
          <input type='text' className='c-form-text' defaultValue={ this.props.card.name || '' } ref={node => this.inputRef = node} placeholder='テンプレート名'/>
        </div>
        <CustomerInfomation company={ this.state.company } division={ this.state.division }/>
        <DivisionSearch applyDivision={ this.applyDivision } type_name={ '会社・部署情報を登録' } not_found={ '会社・部署情報が見つかりませんでした。'}/>
        <TempalteStatus status={ this.state.status } setStatus={ this.setStatus }/>
        { this.state.status ?
          <CardTemplate template={ this.state.templates[0] } status={ this.state.status } onDrop={ this.onDrop } addDetail={ this.addDetail } onChangeDetail={ this.onChangeDetail } unSetPDF={ this.unSetPDF }/>
          :
          <CardTemplate template={ this.state.templates[1] } status={ this.state.status } onDrop={ this.onDrop } addDetail={ this.addDetail } onChangeDetail={ this.onChangeDetail } unSetPDF={ this.unSetPDF }/>
        }
        <div className='u-mt-10'>
          <button className='c-btnMain-primaryB' onClick={ e => this.save(e) }>{ '更新する' }</button>
        </div>
        <Loading ref={node => this.loadingRef = node}/>
      </Fragment>
    );
  };
};

