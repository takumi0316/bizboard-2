import React      from 'react'
import Style      from './style.sass'
// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

// datetime
import Dayjs from 'dayjs'
import { ENUM_STATUS } from '../properties.es6'

/**
 *  記事エディター
 *  @version
 */
export default class AddDetails extends React.Component {

  /**
   *  コンストラクタ
   *  @version
   */
  constructor (props) {

    super(props);

    this.state = {

      show: false,
      work_details: this.props.details,
      startDate: new Date(),
    }

  }

  _editable = () => {

    this.setState({ show: true });
  }

  onChangeCost = (e, detail_id, index) => {

    let url = '/work_details';
    let field = {
      'id': detail_id,
      'work_detail[work_id]': '',
      'work_id': this.props.work_id,
      'estimated_cost': document.getElementById('estimated_cost' + index).value,
      'token': 'cost',
    };
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === "success") {
          this.setState({ work_details: res.body.detail });
        } else {
          this.setState({ work_details: res.body.detail });
        }
      });
  }

  onChangeCount = (e, detail_id, index) => {

    let url = '/work_details';
    let field = {
      'id': detail_id,
      'work_detail[work_id]': '',
      'work_id': this.props.work_id,
      'count': document.getElementById('count' + index).value,
      'token': 'count',
    };
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === "success") {
          this.setState({ work_details: res.body.detail });
        } else {
          this.setState({ work_details: res.body.detail });
        }
      });
  }

  onWorkDetailCreate = () => {

    let url = '/work_details';
    let field = {
      'work_detail[work_id]': this.props.work_id,
    };
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === "success") {
          this.setState({ work_details: res.body.detail });
        } else {
          this.setState({ work_details: res.body.detail });
        }
      });

  }

  onWorkDetailDestroy = (e, id, index) => {

    let url = '/work_details/' + id;
    let field = {
      'work_detail[work_id]': this.props.work_id,
    };
    Request
      .del(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === "success") {
          this.setState({ work_details: res.body.detail });
        } else {
          this.setState({ work_details: res.body.detail });
        }
      });
  }

  onWorkDetailUpdate = () => {

    let array_rails = [];
    let field = {};
    let actual_cost = 0;
    let count = this.state.work_details.length;
    if( count !== 0 ){
      for(var i = 0; i < count; i++) {
        let replace_datetime =  document.getElementById('deliver_at' + i).value;
        replace_datetime = replace_datetime.replace(/年/g, '/');
        replace_datetime = replace_datetime.replace(/月/g, '/');
        replace_datetime = replace_datetime.replace(/日/g, '');
        replace_datetime = replace_datetime.replace(/時/g, ':');
        replace_datetime = replace_datetime.replace(/分/g, '');
        array_rails.push(JSON.stringify({
          'id': document.getElementById('detail_id' + i).innerHTML,
          'work_id': this.props.work_id,
          'count': document.getElementById('count' + i).value,
          'deliver_at': replace_datetime,
          'client_name': document.getElementById('client_name' + i).value,
          'status': Number(document.getElementById('status' + i).value),
          'estimated_cost': document.getElementById('estimated_cost' + i).value,
          'actual_man_hours': document.getElementById('actual_man_hours' + i).value,
          'actual_cost': document.getElementById('actual_cost' + i).value,
        }));
        actual_cost = actual_cost + Number(document.getElementById('actual_cost' + i).value);
      }
      field = {
        'work_detail_update[]': array_rails,
        'work_detail[work_id]': '',
        'token': 'value',
        'work_id': this.props.work_id,
        };
    } else {
      field = {
        'work_detail_update[]': '',
        'work_detail[work_id]': '',
        'token': 'empty',
        'work_id': this.props.work_id,
      };
    }

    let url = '/work_details';
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        let type = 'work_detail_cost';
        if (!err && res.body.status === "success") {

          this.setState({ show: false, work_details: res.body.detail });
          this.props.applyPrice(actual_cost, type);
        } else if (!err && res.body.status === 'nothing') {

          this.setState({ show: false, });
          this.props.applyPrice(actual_cost, type);
        } else {

          this.setState({ work_details: res.body.detail });
        }
      });
  }

  /**
   *  表示処理
   *  @version
   */
  render() {
    return (
      <div>
        { this.state.show ?
          <div className={ Style.AddDetails__WorkEdit }>
            <button className={ 'c-btnMain-standard' } id='finish' onClick={ this.onWorkDetailUpdate }>作業詳細[編集終了]</button>
          </div>
          :
          <div className={ Style.AddDetails__WorkEdit }>
            <button className={ 'c-btnMain-standard' } id='editable' onClick={ this._editable }>作業詳細[編集]</button>
          </div>
        }
        { this.state.show ?
          <div className={ 'c-table' }>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>No.</th>
                  <th>作業内容</th>
                  <th>数量</th>
                  <th>期日</th>
                  <th>担当者</th>
                  <th>ステータス</th>
                  <th>想定原価(税抜)</th>
                  <th>実績工数(時間)</th>
                  <th>実績単価(税抜)</th>
                </tr>
              </thead>
              <tbody>
                { this.state.work_details.map((detail, index) => {
                  return (
                    <tr>
                      <td><button className={ 'c-btnMain-primaryA' } onClick={e => this.onWorkDetailDestroy(e, detail.id, index) }>−</button></td>
                      <td id={ 'detail_id' + index } >{ detail.id }</td>
                      <td>{ this.props.category }</td>
                      <td><input className={ 'c-form-text__work-show-input2' } onChange={ e => this.onChangeCount(e, detail.id, index) } type='text' id={ 'count' + index } defaultValue={ detail.count } /></td>
                      <td><input className={ 'c-form-text__work-show-input1' } type='text' id={ 'deliver_at' + index } defaultValue={ detail.deliver_at === null ? detail.deliver_at : Dayjs(detail.deliver_at).format('YYYY年MM月DD日 HH時mm分') }/></td>
                      <td>
                        <select className={ 'c-form-select__work-show' } id={ 'client_name' + index }>
                          { detail.client_name === "" ? <option></option> : <option value={ detail.client_name }>{ detail.client_name }</option> }
                          { this.props.users.map((user) => {
                            return(
                              detail.client_name !== user['name'] ? <option value={ user['name'] }>{ user['name'] }</option> : null
                            );
                          }) }
                        </select>
                      </td>
                      <td>
                        <select className={ 'c-form-select__work-show' } id={ 'status' + index }>
                          <option value={ detail.status }>{ ENUM_STATUS[detail.status] }</option>
                          { Object.keys(ENUM_STATUS).map((status) => {
                            return (
                              detail.status === Number(status) ?
                                null
                              :
                                <option value={ status }>{ ENUM_STATUS[status] }</option>
                            );
                          }) }
                        </select>
                      </td>
                      <td><input className={ 'c-form-text__work-show-input2' } onChange={ e => this.onChangeCost(e, detail.id, index) } type='text' id={ 'estimated_cost' + index } defaultValue={ detail.estimated_cost } /></td>
                      <td><input className={ 'c-form-text__work-show-input2' } type='text' id={ 'actual_man_hours' + index } defaultValue={ detail.actual_man_hours } /></td>
                      <td><input readOnly className={ 'c-form-text__work-show-input2' } type='text' id={ 'actual_cost' + index } value={ detail.count * detail.estimated_cost } /></td>
                    </tr>
                  );
                }) }
                <tr>
                  <td colSpan={ '11' }><button className={ 'c-btnMain-primaryB' } onClick={ this.onWorkDetailCreate }>作業詳細[追加]</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        :
          <div className={ 'c-table' }>
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>作業内容</th>
                  <th>数量</th>
                  <th>期日</th>
                  <th>担当者</th>
                  <th>ステータス</th>
                  <th>想定原価(税抜)</th>
                  <th>実績工数(時間)</th>
                  <th>実績原価(税抜)</th>
                </tr>
              </thead>
              <tbody>
                { this.state.work_details.map((detail, index) => {
                  return (
                    <tr>
                      <td style={{ textAlign: 'center' }}>{ detail.id }</td>
                      <td style={{ textAlign: 'center' }}>{ this.props.category }</td>
                      <td style={{ textAlign: 'right', width: '55px' }} id={ 'count' + index }>{ detail.count }</td>
                      <td style={{ textAlign: 'center' }}>{ detail.deliver_at === null ? detail.deliver_at : Dayjs(detail.deliver_at).format('YYYY年MM月DD日 HH時mm分') }</td>
                      <td style={{ textAlign: 'center' }}>{ detail.client_name }</td>
                      <td style={{ textAlign: 'center' }}>{ ENUM_STATUS[detail.status] }</td>
                      <td style={{ textAlign: 'right' }}>{ detail.estimated_cost }円</td>
                      <td style={{ textAlign: 'right' }}>{ detail.actual_man_hours }時間</td>
                      <td style={{ textAlign: 'right' }}>{ detail.actual_cost }円</td>
                    </tr>
                  );
                }) }
              </tbody>
            </table>
          </div>
          }
      </div>
    );
  }
}
