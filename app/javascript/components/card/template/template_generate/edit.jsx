import React, { Fragment } from 'react';
import Promise             from 'core-js/es6/promise';

import DivisionSearch     from './division_search/index';
import CustomerInfomation from './customer_infomation/index';
import TempalteStatus     from './template_status/index';
import CardTemplate       from './card_template/index';
import Loading            from '../../../loading';

import {
  validProperty,
  toBoolean,
  setPDF,
  drawText
} from '../../util';

export default class EditTemplateGenerate extends React.Component {

  constructor(props) {

    super(props);

    this.front_file = '';
    this.reverse_file = '';

    this.canvas = '';
    this.draw_canvas = '';
    const init = [
      { ...props.front_side },
      { ...props.reverse_side },
    ];

    this.state = {
      card_id: props.card.id || '',
      company: props.company,
      templates: [...init],
      status: true
    };
  };

  /**
   * React LifeCycle 
   * @version 2020/04/30 
   * 
   */
  componentDidMount = () => {

    const templates = this.state.templates;
    const isBlank = templates.every(template => !template.file);
    const fil_templates = templates.filter(template => template.file);

    if(isBlank) return;
    this.loadingRef.start();
    fil_templates.map(template => {
      const field = new FormData();
      field.append('url', template.file);
      const request = window.xhrRequest.post('/cards/transfer', field, { responseType: 'blob' });
      request.then(res => {
        if(res.data.status != 'error') {
          const file = res.data;
          const bool = toBoolean(template.status);
          if(bool) {
            this.front_file = file;
            this.canvas = document.getElementById('pdf');
            this.draw_canvas = document.getElementById('draw');
            new Promise(resolve => {
              setPDF(file, templates[0].details, this.canvas, this.draw_canvas);
              resolve(true);
            }).then(() => this.loadingRef.finish());
          };
          if(!bool) this.reverse_file = file;
        };
        if(res.data.status == 'error') window.alertable({ icon: 'error', message: res.data.message, close_callback: () => bool ? this.loadingRef.finish() : null });
      }).catch(err => window.alertable({ icon: 'error', message: err, close_callback: this.loadingRef.finish() }));
    });
  };

  /**
   * React LifeCycle 
   * @version 2020/04/30 
   * 
   */
  componentDidUpdate = (prevProps, prevState) => {

    const details = this.state.status ? this.state.templates[0].details : this.state.templates[1].details;
    const file = this.state.status ? this.front_file : this.reverse_file;
    const state_file = this.state.status ? this.state.templates[0].file : this.state.templates[1].file;

    if(this.state.status == prevState.status && file != state_file) return;
    if(file) {

      this.loadingRef.start();
      new Promise(resolve => {
        setPDF(file, details, this.canvas, this.draw_canvas);
        resolve(true);
      }).then(() => this.loadingRef.finish());
    };
  };

  /**
   *  ファイルドロップ時
   *  @version 2018/06/10
   * 
   */
  onDrop = files => {

    const file = files[0];
    let parse_templates = JSON.parse(JSON.stringify(this.state.templates));

    parse_templates[status ? 0 : 1].file = file;
    status ? this.front_file : this.reverse_file = file;
    if(status) this.front_file = file;
    if(!status) this.reverse_file = file;

    this.setState({ templates: parse_templates });
  };

  /**
   * 会社・部署セット
   * @version 2020/03/23
   * 
   **/
  applyCompany = props => this.setState({ company: props });

  /**
   * ステータスセット
   * @version 2020/03/27
   * 
   */
  setStatus = () => this.setState({ status: !this.state.status });

  /**
   * 名刺ヘッダーカラム追加
   * @version 2020/03/30
   * 
   */
  addDetail = e => {

    e.preventDefault();

    const parse_templates = JSON.parse(JSON.stringify(this.state.templates));
    const status = this.state.status;
    const file = status ? parse_templates[0].file : parse_templates[1].file;

    if(!file) {

      window.alertable({ icon: 'info', message: `${ status ? '表面' : '裏面' }のテンプレートを設定して下さい。`});
      return;
    };

    const init = {
      id: '',
      card_template_id: '',
      name: '',
      font: '新ゴR',
      font_size: '9',
      font_color: 'black',
      coord_y: '10',
      coord_x: '28',
      length: '15',
      line_space: '9'
    };

    parse_templates[status ? 0 : 1].details.push(init);
    this.setState({ templates: parse_templates });
  };

  /**
   * ヘッダーセット
   * @version 2020/03/30
   * 
   */
  onChangeDetail = e => {

    const status = this.state.status;
    let parse_templates = JSON.parse(JSON.stringify(this.state.templates));
    let file = '';
    const detail_id = e.target.getAttribute('index');
    const detail_name =  e.target.id;
    const value = e.target.value;

    parse_templates[status ? 0 : 1].details[detail_id][detail_name] = value;
    file = parse_templates[status ? 0 : 1].file;
    const details = parse_templates[status ? 0 : 1].details;

    if(file) this.setState({ templates: parse_templates }, drawText(details, this.draw_canvas));
    if(!file) this.setState({ templates: parse_templates });
  };

  /**
   * PDFをリセットする
   * @version 2020/04/04
   * 
   */
  unSetPDF = () => {

    let templates = JSON.parse(JSON.stringify(this.state.templates));

    templates[status ? 0 : 1].file = '';
    status ? this.front_file : this.reverse_file = '';

    this.setState({ templates: templates });
  };

  /**
   * 保存
   * @version 2020/03/26
   * 
   */
  save = e => {

    e.stopPropagation();

    if(!validProperty(this.inputRef.value.trim(), 'タイトル')) return;
    if(!validProperty(this.state.company, '会社')) return;
    if(!validProperty(this.front_file, 'テンプレート')) return;

    const field = new FormData();

    field.append('card[name]', this.inputRef.value);
    field.append('card[company_id]', this.state.company.id);
    const templates = this.state.templates.filter(template => template.file);
    templates.forEach(template => {
      field.append('card[templates_attributes][][id]', template.id);
      field.append('card[templates_attributes][][card_id]', template.card_id);
      field.append('card[templates_attributes][][status]', template.status);
      field.append('card[templates_attributes][][file]', toBoolean(template.status) ? this.front_file : this.reverse_file);
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

    this.loadingRef.start();
    const request = window.xhrRequest.put(this.props.action, field);
    // 保存処理
    request.then(res => {

      this.loadingRef.finish();
      if(res.data.status == 'success') window.alertable({ icon: res.data.status, message: res.data.status == 'success' ? '更新に成功しました。' : '更新に失敗しました。' });
    }).catch(error => {

      this.loadingRef.finish();
      window.alertable({ icon: 'error', message: error.message });
    });
	};

  render() {
    return (
      <Fragment>
        <div className='u-mt-10'>
          <label className='c-form-label'>テンプレート名</label>
          <input type='text' className='c-form-text' defaultValue={ this.props.card.name || '' } ref={ node => this.inputRef = node } placeholder='テンプレート名'/>
        </div>
        <CustomerInfomation company={ this.state.company }/>
        <DivisionSearch applyCompany={ this.applyCompany } type_name={ '会社情報を登録' } not_found={ '会社情報が見つかりませんでした。'}/>
        <TempalteStatus status={ this.state.status } setStatus={ this.setStatus }/>
        { this.state.status ?
          <CardTemplate template={ this.state.templates[0] } file={ this.front_file } status={ this.state.status } onDrop={ this.onDrop } addDetail={ this.addDetail } onChangeDetail={ this.onChangeDetail } unSetPDF={ this.unSetPDF }/>
          :
          <CardTemplate template={ this.state.templates[1] } file={ this.reverse_file } status={ this.state.status } onDrop={ this.onDrop } addDetail={ this.addDetail } onChangeDetail={ this.onChangeDetail } unSetPDF={ this.unSetPDF }/>
        }
        <div className='u-mt-10'>
          <button className='c-btnMain-primaryB' onClick={ e => this.save(e) }>{ '更新する' }</button>
        </div>
        <Loading ref={ node => this.loadingRef = node }/>
      </Fragment>
    );
  };
};
