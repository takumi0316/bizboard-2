import React, { Fragment } from 'react';
import Promise             from 'core-js/es6/promise';

import CompanySearch     from './company_search';
import CustomerInfomation from './customer_infomation/index';
import CardTemplate       from './card_template/index';
import Loading            from '../../../loading';

import {
  validProperty,
  setPDF,
  drawText
} from '../../util';

import { HEADERS } from '../../properties.es6';

export default class EditTemplateGenerate extends React.Component {

  constructor(props) {

    super(props);

    Ts.loadFont();

    this.state = {
      card_id: props.card.id,
      company: props.company,
      template: props.template,
      backup_file: '',
      template_type: props.template_type,
      didmount_status: false,
    };
  };

  /**
   * React LifeCycle
   * @version 2020/04/30
   *
   */
  componentDidMount = () => {

    if(!this.state.template.file) return;

    this.loadingRef.start();

    const field = new FormData();
    field.append('url', this.state.template.file);
    const request = window.xhrRequest.post('/cards/transfer', field, { responseType: 'blob' });
    request.then(res => {

      if(res.data.status == 'error') {

        window.alertable({ icon: 'error', message: 'テンプレートの取得に失敗しました。もう一度ページを更新してください。', close_callback: () => this.loadingRef.finish() });
        return;
      };

      const file = res.data;
      new Promise(resolve => {
        setPDF(file, this.state.template.details, document.getElementById('pdf'), document.getElementById('draw'));
        resolve(true);
      }).then(() => {
        this.setState({ didmount_status: !this.state.didmount_status }, () => this.loadingRef.finish());
      }).catch(() => window.alertable({ icon: 'error', message: 'テンプレートの展開に失敗しました。もう一度ページを更新してください。', close_callback: () => this.loadingRef.finish() }));

    }).catch(err => window.alertable({ icon: 'error', message: err, close_callback: () => this.loadingRef.finish() }));
  };

  /**
   *  ファイルドロップ時
   *  @version 2018/06/10
   *
   */
  onDrop = files => {

    const file = files[0];
    let parse_template = JSON.parse(JSON.stringify(this.state.template));

    parse_template.file = file;
    this.setState({ template: parse_template }, () => setPDF(file, this.state.template.details, document.getElementById('pdf'), document.getElementById('draw')));
  };

  /**
   * 会社・部署セット
   * @version 2020/03/23
   *
   **/
  applyCompany = props => this.setState({ company: props });

  /**
   * 名刺ヘッダーカラム追加
   * @version 2020/03/30
   *
   */
  addDetail = e => {

    e.preventDefault();

    const parse_template = JSON.parse(JSON.stringify(this.state.template));
    const file = parse_template.file;

    if(!file) {

      window.alertable({ icon: 'info', message: `${ status ? '表面' : '裏面' }のテンプレートを設定して下さい。`});
      return;
    };

    const init = {
      id: '',
      card_template_id: '',
      name: '',
      font: '新ゴ R',
      font_size: '9',
      font_color: 'black',
      coord_y: '10',
      coord_x: '28',
      length: '15',
      line_space: '9'
    };

    parse_template.details.push(init);
    this.setState({ template: parse_template });
  };

  /**
   * ヘッダーセット
   * @version 2020/03/30
   *
   */
  onChangeDetail = (e, index, header_index) => {

    let parse_template = JSON.parse(JSON.stringify(this.state.template));
    const file = parse_template.file;
    const details = parse_template.details;
    const name = HEADERS[header_index];

    parse_template.details[index][name] = e.target.value;

    if(file) this.setState({ template: parse_template }, drawText(details, document.getElementById('draw')));
    if(!file) this.setState({ template: parse_template });
  };

  /**
   * PDFをリセットする
   * @version 2020/04/04
   *
   */
  unSetPDF = () => {

    let template = JSON.parse(JSON.stringify(this.state.template));
    template.file = '';

    this.setState({ template: template, backup_file: '' });
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

      window.alertable({ icon: 'error', message: 'テンプレートを登録して、保存してください。' });
      return
    };

    location.href = `/cards/${this.state.template.card_id}/front_preview`;
  };

  /* 裏面ページへ遷移
  * @version 2020/05/28
  *
  */
  reverse_transition = e => {

    e.stopPropagation();

    const file = this.state.template.file;
    if(!file) {

      window.alertable({ icon: 'error', message: 'テンプレートを登録して、保存してください。' });
      return
    };

    location.href = `/cards/${this.state.template.card_id}/reverse_preview`;
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
    if(!validProperty(this.state.template.file, 'テンプレート')) return;

    const field = new FormData();

    field.append('card[name]', this.inputRef.value);
    field.append('card[company_id]', this.state.company.id);
    field.append('card[templates_attributes][][id]', this.state.template.id);
    field.append('card[templates_attributes][][card_id]', this.state.template.card_id);
    field.append('card[templates_attributes][][status]', this.state.template_type);
    if(this.state.backup_file || !this.props.template.file) field.append('card[templates_attributes][][file]', this.state.template.file);
    this.state.template.details.map(detail => {
      field.append('card[templates_attributes][][details_attributes][][id]', detail.id);
      field.append('card[templates_attributes][][details_attributes][][card_template_id]', this.state.template.id);
      field.append('card[templates_attributes][][details_attributes][][name]', detail.name);
      field.append('card[templates_attributes][][details_attributes][][font]', detail.font);
      field.append('card[templates_attributes][][details_attributes][][font_size]', detail.font_size);
      field.append('card[templates_attributes][][details_attributes][][font_color]', detail.font_color);
      field.append('card[templates_attributes][][details_attributes][][coord_x]', detail.coord_x);
      field.append('card[templates_attributes][][details_attributes][][coord_y]', detail.coord_y);
      field.append('card[templates_attributes][][details_attributes][][length]', detail.length);
      field.append('card[templates_attributes][][details_attributes][][line_space]', detail.line_space);
    });

    this.loadingRef.start();
    const url = '/cards/' + this.state.card_id
    const request = window.xhrRequest.put(url, field);

    // 保存処理
    request.then(res => {

      window.alertable({ icon: res.data.status, message: res.data.status == 'success' ? '更新に成功しました。' : '更新に失敗しました。', close_callback: () => this.loadingRef.finish() });
    }).catch(error => {

      window.alertable({ icon: 'error', message: error.message, close_callback: () => this.loadingRef.finish()});
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
        <CompanySearch applyCompany={ this.applyCompany } type_name={ '会社情報を登録' } not_found={ '会社情報が見つかりませんでした。'}/>
        { this.props.both == 2 ?
          <div className='u-mt-10'>
            <button className='c-btnMain'
              onClick={ e => this.state.template_type ? this.reverse_transition(e) : this.front_transition(e) }>{ this.state.template_type ? '裏面を設定する' : '表面を設定する' }</button>
          </div>
          : null
        }
        <CardTemplate template={ this.state.template } didmount_type={ this.state.didmount_status } onDrop={ this.onDrop } addDetail={ this.addDetail } onChangeDetail={ this.onChangeDetail } unSetPDF={ this.unSetPDF }/>
        <div className='c-overlay-submit'>
          <button className='c-btnMain c-btn-blue' onClick={ e => this.save(e) }>更新する</button>
          <button className='u-ml-30 c-btnMain' onClick={ () => this.unSetPDF() }>テンプレートを変更する</button>
        </div>
        <Loading ref={ node => this.loadingRef = node }/>
      </Fragment>
    );
  };
};
