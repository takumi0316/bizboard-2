import React, { Fragment } from 'react';

import CompanySearch     from './company_search';
import CustomerInfomation from './customer_infomation/index';
import TempalteStatus     from './template_status/index';
import CardTemplate       from './card_template/index';
import Loading            from '../../../loading'

import {
  validProperty,
  setPDF,
  drawText,
  toBoolean,
} from '../../util';

import { HEADERS } from '../../properties.es6';

export default class NewTemplateGenerate extends React.Component {

  constructor(props) {

    super(props);

    const init = [
      { ...props.front_side },
      { ...props.reverse_side },
    ];

    this.front_file = '';
    this.reverse_file = '';

    this.canvas = '';
    this.draw_canvas = ''

    this.state = {
      card_id: '',
      company: '',
      templates: [...init],
      status: true
    };
  };

  /**
   * React LifeCycle
   * @version 2020/04/03
   *
   */
  componentDidUpdate = (prevProps, prevState) => {

    this.canvas = document.getElementById('pdf');
    this.draw_canvas = document.getElementById('draw');
    const status = this.state.status;
    const file = status ? this.front_file : this.reverse_file;
    const prevFile = prevState.templates[status ? 0 : 1].file;
    const details = this.state.templates[status ? 0 : 1].details;

    if(status == prevState.status) if(!prevFile && file) setPDF(file, details, this.canvas, this.draw_canvas);

    if(status != prevState.status) if(file) setPDF(file, details, this.canvas, this.draw_canvas);
  };

  /**
   *  ファイルドロップ時
   *  @version 2018/06/10
   *
   */
  onDrop = files => {

    let parse_templates = JSON.parse(JSON.stringify(this.state.templates));
    const file = files[0];
    const status = this.state.status;
    parse_templates[status ? 0 : 1].file = file;
    if(status) this.front_file = file
    if(!status) this.reverse_file = file

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
    const file = parse_templates[status ? 0 : 1].file;

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
  onChangeDetail = (e, index, header_index) => {

    let parse_templates = JSON.parse(JSON.stringify(this.state.templates));
    const status = this.state.status;
    const file = parse_templates[status ? 0 : 1].file;
    const details = parse_templates[status ? 0 : 1].details;
    const name = HEADERS[header_index];
    const value = e.target.value;

    parse_templates[status ? 0 : 1].details[index][name] = value;

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
    const status = this.state.status;

    templates[status ? 0 : 1].file = '';
    templates[!status ? 0 : 1].file = this.state.templates[!status ? 0 : 1].file;
    if(status) this.front_file = '';
    if(!status) this.reverse_file = '';

    this.setState({ templates: parse_templates });
  };

  /**
   * 保存
   * @version 2020/03/26
   */
  save = e => {

    e.stopPropagation();

    if(!validProperty(this.inputRef.value.trim(), 'タイトル')) return;
    if(!validProperty(this.state.company, '会社')) return;
    if(!validProperty(this.state.templates[0].file, 'テンプレート')) return;

    const field = new FormData();

    field.append('card[name]', this.inputRef.value);
    field.append('card[company_id]', this.state.company.id);
    const templates = this.state.templates.filter(template => template.file);
    templates.map((template) => {
      field.append('card[templates_attributes][][id]', template.id || '');
      field.append('card[templates_attributes][][card_id]', template.card_id || '');
      field.append('card[templates_attributes][][status]', template.status);
      field.append('card[templates_attributes][][file]', toBoolean(template.status) ? this.front_file : this.reverse_file);
      template.details.map(detail => {
        field.append('card[templates_attributes][][details_attributes][][id]', detail.id || '');
        field.append('card[templates_attributes][][details_attributes][][card_template_id]', template.id || '');
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

    const request = window.xhrRequest.post(this.props.action, field);

    // 保存処理
    request.then(res => {

      this.loadingRef.finish();
      if(res.data.status == 'success') {

        const redirect = window.location.href = `/cards/${res.data.card.id}/front_preview`;
        if(res.data.status == 'success') window.alertable({ icon: 'success', message: 'テンプレートを保存しました。', close_callback: () => redirect() });
        if(res.data.status != 'success') window.alertable({ icon: 'error', message: res.data.message });
      } else {

        window.alertable({ icon: 'error', message: res.data.message });
      };
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
        <CustomerInfomation company={ this.state.company }/>
        <CompanySearch applyCompany={ this.applyCompany } type_name={ '会社情報を登録' } not_found={ '会社情報が見つかりませんでした。'}/>
        <TempalteStatus status={ this.state.status } setStatus={ this.setStatus }/>
        { this.state.status ?
          <CardTemplate template={ this.state.templates[0] } status={ this.state.status } onDrop={ this.onDrop } addDetail={ this.addDetail } onChangeDetail={ this.onChangeDetail } unSetPDF={ this.unSetPDF }/>
          :
          <CardTemplate template={ this.state.templates[1] } status={ this.state.status } onDrop={ this.onDrop } addDetail={ this.addDetail } onChangeDetail={ this.onChangeDetail } unSetPDF={ this.unSetPDF }/>
        }
        <div className='u-mt-10'>
          <button className='c-btnMain-primaryB' onClick={ e => this.save(e) }>保存する</button>
        </div>
        <Loading ref={ node => this.loadingRef = node }/>
      </Fragment>
    );
  };
};
