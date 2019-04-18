import React from 'react'
import SubcontractorStatus from '../subcontractor_status/index.jsx'
import ReadSubcontractorStatus from '../read-subcontractor_status/index.jsx'
import ClientSearch from '../client_search/index.jsx'
import Style from './style.sass'
// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

// Datetime
import Dayjs from 'dayjs'
import { ENUM_STATUS } from '../properties.es6'

export default class AddSubcontractor extends React.Component {

  /**
   *  コンストラクタ
   *
   */

  constructor (props) {

    super(props);

    this.state = {

      show: false,
      subcontractors: props.subcontractors,
      divisions: props.divisions,
      clients: props.clients,
      work_subcontractors: props.work_subcontractors,
      subcontractor_details: props.subcontractor_details,
    }
  }

  _editable = () => {

    this.setState({ show: true })
  }

  onSubcontractorCreate = () => {

    let url = '/work_subcontractors';
    let field = {
      'work_subcontractors[work_id]': this.props.work_id,
    }
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if(!err && res.body.status == 'success') {
          this.setState({ work_subcontractors: res.body.subcontractors })
        }
      })
  }

  onCreate = (e, id) => {

    let url = '/work_subcontractor_details';
    let field = {
      'subcontractor_detail[subcontractor_id]': id,
      'subcontractor_detail[work_id]': this.props.work_id,
    };
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === "success") {
          this.setState({ subcontractor_details: res.body.detail });
        } else {
          this.setState({ subcontractor_details: res.body.detail });
        }
      });

  }

  onUpdate = () => {

    let array_rails = [];
    let field = {};
    let actual_cost = 0;
    let subcontractor_value_count = [];
    this.state.subcontractor_details.map((subcontractor_detail, index1) => {
      if ( this.props.work_id == subcontractor_detail.work_id ){
        this.state.work_subcontractors.map((work_subcontractor, index2) => {
          if (work_subcontractor.id === subcontractor_detail.work_subcontractor_id) {
            subcontractor_value_count.push(index1);
          }
        })
      }
    })
    if( subcontractor_value_count.length !== 0 ) {
      for(var i = 0; i < subcontractor_value_count.length; i++) {
        let replace_datetime =  document.getElementById('deliver_at' + subcontractor_value_count[i]).value;
        replace_datetime = replace_datetime.replace(/年/g, '/');
        replace_datetime = replace_datetime.replace(/月/g, '/');
        replace_datetime = replace_datetime.replace(/日/g, '');
        replace_datetime = replace_datetime.replace(/時/g, ':');
        replace_datetime = replace_datetime.replace(/分/g, '');
        array_rails.push(JSON.stringify({
          'id': document.getElementById('detail_id' + subcontractor_value_count[i]).innerHTML,
          'order_contents': document.getElementById('order_contents' + subcontractor_value_count[i]).value,
          'standard': document.getElementById('standard' + subcontractor_value_count[i]).value,
          'specification': document.getElementById('specification' + subcontractor_value_count[i]).value,
          'count': document.getElementById('test-count' + subcontractor_value_count[i]).value,
          'number_of_copies': document.getElementById('number_of_copies' + subcontractor_value_count[i]).value,
          'deliver_at': replace_datetime,
          'actual_cost': document.getElementById('actual_cost' + subcontractor_value_count[i]).value,
          'status': Number(document.getElementById('status' + subcontractor_value_count[i]).value),
        }));
        actual_cost = actual_cost + Number(document.getElementById('actual_cost' + subcontractor_value_count[i]).value);
      }
      field = {
        'subcontractor_detail_update[]': array_rails,
        'subcontractor_detail[subcontractor_id]': '',
        'token': 'value',
        'work_id': this.props.work_id,
      };
    } else {
      field = {
        'subcontractor_detail[work_subcontractor_id]': '',
        'token': 'empty',
        'work_id': this.props.work_id,
      };
    }

    let url = '/work_subcontractor_details';
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        let type = 'subcontractor_detail_cost';
        if (!err && res.body.status === "success") {

          this.setState({ show: false, subcontractor_details: res.body.detail });
          this.props.applyPrice(actual_cost, type);
        } else if (!err && res.body.status === 'nothing') {

          this.props.applyPrice(actual_cost, type);
          this.setState({ show: false });
        } else {

          this.setState({ subcontractor_details: res.body.detail });
        }
      });
  }

    onDestroy = (e, id, index) => {

    let url = '/work_subcontractor_details/' + id;
    let field = {
      'work_subcontractor_detail[work_id]': this.props.work_id,
    };
    Request
      .del(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === "success") {
          this.setState({ subcontractor_details: res.body.details });
        } else {
          this.setState({ subcontractor_details: res.body.details });
        }
      });
  }

  onWorkSubcontractorDestroy = (e, id) => {

    let url = '/work_subcontractors/' + id;
    let field = { 'work_id': this.props.work_id };
    Request
      .del(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === 'success'){

          res.body.actual_costs.map((cost) => {
            actual_cost = actual_cost + Number(cost);
          });
          this.setState({ work_subcontractors: res.body.work_subcontractors });
        } else {
          this.setState({ work_subcontractors: res.body.work_subcontractors });
        }
      });
  }

  /**
   *  お客様選択時
   *  @version
   */
  applyClient = (client, work_subcontractor_id) => {

    let url = '/work_subcontractors/' + work_subcontractor_id;
    let field = {
      'subcontractor_division_client_id': client.id,
      'contents': 'subcontractor_division_client_id',
      'work_id': this.props.work_id,
    };
    Request
      .put(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === 'success') {
          this.setState({ work_subcontractors: res.body.work_subcontractors, clients: res.body.clients, divisions: res.body.divisions, subcontractors: res.body.subcontractors });
        } else {
          this.setState({ clients: res.body.clients, divisions: res.body.divisions });
        }
      });
  }

  /**
   * WorkSubcontractorStatus更新時
   *
   */
  applyStatus = (work_subcontractors) => {

    let workSubcontractors = this.state.work_subcontractors;
    workSubcontractors.forEach((state_subcontractor) => {
      work_subcontractors.map((props_subcontractor) => {
        if( state_subcontractor.id === props_subcontractor.id && state_subcontractor.status !== props_subcontractor.status ){
          state_subcontractor.status = props_subcontractor.status
        }
      })
    })
    this.setState({ work_subcontractors: workSubcontractors });
  }

  /**
   *　表示処理
   */
  render() {
    return (
      <div>
        { this.state.show ?
          <div>
            <div className={ Style.AddSubcontractor__EditButton }>
              <button className={ 'c-btnMain-standard' } onClick={ this.onUpdate }>作業外注先[編集終了]</button>
            </div>
            { this.state.work_subcontractors.length > 0 ?
              <React.Fragment>
                <div className={ 'c-attention u-mt-10' }>
                  <span>外注区分: 作業詳細</span>
                </div>
                { this.state.work_subcontractors.map((work_subcontractor, index) => {
                  return(
                    <React.Fragment>
                      { this.props.work_id == work_subcontractor.work_id ?
                        <React.Fragment>
                          <div key={ 'work_subcontractor_division_client_label' + index } className={ 'c-form-label' }>
                            <label htmlFor='work_subcontractor_division_client_id'>お客様情報</label>
                          </div>
                          <React.Fragment>
                            { this.state.clients.length > 0 ?
                              <React.Fragment>
                                { this.state.clients.map((client, index) => {
                                  return(
                                    <React.Fragment>
                                      { work_subcontractor.subcontractor_division_client_id === client.id ?
                                        <React.Fragment>
                                          { this.state.divisions.map((division, index) => {
                                            return (
                                              <React.Fragment>
                                                { this.state.subcontractors.map((subcontractor, index) => {
                                                  return (
                                                    <React.Fragment>
                                                      { client.subcontractor_division_id === division.id && division.subcontractor_id === subcontractor.id  ?
                                                        <div key={ 'client' + index } className={ 'c-attention' }>
                                                          <div className={ 'u-mt-10' }>会社名: { subcontractor.name || '部署名なし' }</div>
                                                          <div className={ 'u-mt-10' }>部署名: { division.name }</div>
                                                          <div className={ 'u-mt-10' }>担当者名: { client.name }</div>
                                                          <div className={ 'u-mt-10' }>担当者TEL: { client.tel }</div>
                                                          <div className={ 'u-mt-10' }>担当者email: { client.email }</div>
                                                        </div>
                                                        :
                                                        null
                                                      }
                                                    </React.Fragment>
                                                  );
                                                }) }
                                              </React.Fragment>
                                            );
                                          }) }
                                        </React.Fragment>
                                        :
                                        null
                                      }
                                    </React.Fragment>
                                  );
                                }) }
                              </React.Fragment>
                              :
                              null
                            }
                          </React.Fragment>
                          <div key={ 'client_search' + index } className={ Style.AddSubcontractor__SideBySide }>
                            <div>
                              <ClientSearch work_subcontractor_id={ work_subcontractor.id } applyClient={ ::this.applyClient } />
                              <button className={ 'c-btnMain-primaryA' } onClick={ e => this.onWorkSubcontractorDestroy(e, work_subcontractor.id) }>作業外注[削除]</button>
                            </div>
                            <SubcontractorStatus key={ 'read-subcontractor-status' + index } work_id={ this.props.work_id } work_subcontractor_id={ work_subcontractor.id } status={ work_subcontractor.status } applyStatus={ ::this.applyStatus } />
                          </div>
                          <div key={ ' table' + index } className={ 'c-table2' }>
                            <table>
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>No.</th>
                                  <th>ステータス</th>
                                  <th>発注内容</th>
                                  <th>規格</th>
                                  <th>仕様</th>
                                  <th>原稿<br />数量</th>
                                  <th>部数<br />数量</th>
                                  <th>工程期日</th>
                                  <th>実績原価</th>
                                </tr>
                              </thead>
                              <tbody>
                                <React.Fragment>
                                  { this.state.subcontractor_details.length > 0 ?
                                    <React.Fragment>
                                      { this.state.subcontractor_details.map((subcontractor_detail, index1) => {
                                        return (
                                          <React.Fragment>
                                            { work_subcontractor.id === subcontractor_detail.work_subcontractor_id ?
                                              <tr key={ 'tr' + index }>
                                                  <td><button className={ 'c-btnMain-primaryA' } onClick={ e => this.onDestroy(e, subcontractor_detail.id, index1) }>ー</button></td>
                                                  <td id={ 'detail_id' + index1 }>{ subcontractor_detail.id }</td>
                                                  <td>
                                                    <select className={ 'c-form-select__work-show' } id={ 'status' + index1 }>
                                                      <option value={ subcontractor_detail.status }>{ ENUM_STATUS[subcontractor_detail.status] }</option>
                                                      { Object.keys(ENUM_STATUS).map((status) => {
                                                        return(
                                                          subcontractor_detail.status === Number(status) ?
                                                            null
                                                            :
                                                            <option value={ status }>{ ENUM_STATUS[status] }</option>
                                                          );
                                                      }) }
                                                    </select>
                                                  </td>
                                                  <td><input className={ 'c-form-text__work-show-input4' } type='text' id={ 'order_contents' + index1 } defaultValue={ subcontractor_detail.order_contents } placeholder={ '図面製本' }></input></td>
                                                  <td><input className={ 'c-form-text__work-show-input3-left'} type='text' id={ 'standard' + index1 } defaultValue={ subcontractor_detail.standard } placeholder={ 'A3' }></input></td>
                                                  <td><input className={ 'c-form-text__work-show-input5' } type='text' id={ 'specification' + index1 } defaultValue={ subcontractor_detail.specification } placeholder={ '表紙:ダイヤボード' }></input></td>
                                                  <td><input className={ 'c-form-text__work-show-input3-right' } type='text' id={ 'test-count' + index1 } defaultValue={ subcontractor_detail.count }></input></td>
                                                  <td><input className={ 'c-form-text__work-show-input3-right' } type='text' id={ 'number_of_copies' + index1 } defaultValue={ subcontractor_detail.number_of_copies }></input></td>
                                                  <td><input className={ 'c-form-text__work-show-input1' } type='text' id={ 'deliver_at' + index1 } defaultValue={ Dayjs(subcontractor_detail.deliver_at).format('YYYY年MM月DD日 HH時mm分') }></input></td>
                                                  <td><input className={ 'c-form-text__work-show-input2' } type='number' id={ 'actual_cost' + index1 } defaultValue={ subcontractor_detail.actual_cost } ></input></td>
                                              </tr>
                                              :
                                              null
                                            }
                                          </React.Fragment>
                                        );
                                      }) }
                                    </React.Fragment>
                                    :
                                    null
                                  }
                                </React.Fragment>
                                <tr key={ 'onCreate-td' + index }>
                                  <td colSpan='13'><button className={ 'c-btnMain-primaryB' } onClick={ e => this.onCreate(e, work_subcontractor.id) }>＋</button></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </React.Fragment>
                        :
                        null
                      }
                    </React.Fragment>
                  );
                }) }
              </React.Fragment>
              :
              <div className={ 'c-attention u-mt-10' }>
                <span>外注区分: 作業詳細</span>
              </div>
            }
            <div className={ Style.AddSubcontractor__EditButton }>
              <button className={ 'c-btnMain-primaryB' } onClick={ this.onSubcontractorCreate }>作業外注[追加]</button>
            </div>
          </div>
          :
          <div>
            <div className={ Style.AddSubcontractor__EditButton }>
              <button className={ 'c-btnMain-standard' } onClick={ this._editable }>作業外注先[編集]</button>
            </div>
            { this.state.work_subcontractors.length > 0 ?
              <React.Fragment>
                <div className={ 'c-attention u-mt-10' }>
                  <span>外注区分: 作業詳細</span>
                </div>
                { this.state.work_subcontractors.map((work_subcontractor, index) => {
                  return(
                    <React.Fragment>
                      { this.props.work_id == work_subcontractor.work_id ?
                        <React.Fragment>
                          <div className={ Style.AddSubcontractor__ReadOnly }>
                            <div key={ 'work_subcontractor_division_client_label' + index } className={ 'c-form-label' }>
                              <label htmlFor='work_subcontractor_division_client_id'>お客様情報</label>
                            </div>
                            <ReadSubcontractorStatus key={ 'read-subcontractor-status' + index } status={ work_subcontractor.status } />
                          </div>
                          <React.Fragment>
                            { this.state.clients.length > 0 ?
                              <React.Fragment>
                                { this.state.clients.map((client, index) => {
                                  return(
                                    <React.Fragment>
                                      { work_subcontractor.subcontractor_division_client_id === client.id ?
                                        <React.Fragment>
                                          { this.state.divisions.map((division, index) => {
                                            return (
                                              <React.Fragment>
                                                { this.state.subcontractors.map((subcontractor, index) => {
                                                  return (
                                                    <React.Fragment>
                                                      { client.subcontractor_division_id === division.id && division.subcontractor_id === subcontractor.id  ?
                                                        <div key={ 'client' + index } className={ 'c-attention' }>
                                                          <div className={ 'u-mt-10' }>会社名: { subcontractor.name || '部署名なし' }</div>
                                                          <div className={ 'u-mt-10' }>部署名: { division.name }</div>
                                                          <div className={ 'u-mt-10' }>担当者名: { client.name }</div>
                                                          <div className={ 'u-mt-10' }>担当者TEL: { client.tel }</div>
                                                          <div className={ 'u-mt-10' }>担当者email: { client.email }</div>
                                                        </div>
                                                        :
                                                        null
                                                      }
                                                    </React.Fragment>
                                                  );
                                                }) }
                                              </React.Fragment>
                                            );
                                          }) }
                                        </React.Fragment>
                                        :
                                        null
                                      }
                                    </React.Fragment>
                                  );
                                }) }
                              </React.Fragment>
                              :
                              null
                            }
                          </React.Fragment>
                          <div key={ ' table' + index } className={ 'c-table' }>
                            <table>
                              <thead>
                                <tr>
                                  <th>No.</th>
                                  <th>ステータス</th>
                                  <th>発注内容</th>
                                  <th>規格</th>
                                  <th>仕様</th>
                                  <th>原稿<br />数量</th>
                                  <th>部数<br />数量</th>
                                  <th>工程期日</th>
                                  <th>実績単価</th>
                                </tr>
                              </thead>
                              <tbody>
                                <React.Fragment>
                                  { this.state.subcontractor_details.length > 0 ?
                                    <React.Fragment>
                                      { this.state.subcontractor_details.map((subcontractor_detail, index) => {
                                        return (
                                          <React.Fragment>
                                            { work_subcontractor.id === subcontractor_detail.work_subcontractor_id ?
                                              <tr className={'tr' + index }>
                                                <td style={{ textAlign: 'center' }}>{ subcontractor_detail.id }</td>
                                                <td style={{ textAlign: 'center' }}>{ ENUM_STATUS[subcontractor_detail.status] }</td>
                                                <td style={{ textAlign: 'center' }}>{ subcontractor_detail.order_contents }</td>
                                                <td style={{ textAlign: 'center' }}>{ subcontractor_detail.standard }</td>
                                                <td style={{ textAlign: 'center' }}>{ subcontractor_detail.specification }</td>
                                                <td style={{ textAlign: 'right' }}>{ subcontractor_detail.count }</td>
                                                <td style={{ textAlign: 'right' }}>{ subcontractor_detail.number_of_copies }</td>
                                                <td style={{ textAlign: 'center' }}>{ Dayjs(subcontractor_detail.deliver_at).format('YYYY年MM月DD日 HH時mm分') }</td>
                                                <td style={{ textAlign: 'right' }}>{ subcontractor_detail.actual_cost }円</td>
                                              </tr>
                                              :
                                              null
                                            }
                                          </React.Fragment>
                                        );
                                      }) }
                                    </React.Fragment>
                                    :
                                    null
                                  }
                                </React.Fragment>
                              </tbody>
                            </table>
                          </div>
                        </React.Fragment>
                        :
                        null
                      }
                    </React.Fragment>
                  );
                }) }
              </React.Fragment>
              :
              <div className={ 'c-attention u-mt-10' }>
                <span>外注区分: 作業詳細</span>
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

