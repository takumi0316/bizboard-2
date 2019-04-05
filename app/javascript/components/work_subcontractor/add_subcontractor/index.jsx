import React from 'react'
import SubcontractorStatus from '../subcontractor_status/index.jsx'
import ReadSubcontractorStatus from '../read-subcontractor_status/index.jsx'
import ClientSearch from '../client_search/index.jsx'
// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

// Datetime
import Dayjs from 'dayjs'
import { ENUM_STATUS } from '../../work_management/properties.es6'

export default class Index extends React.Component {

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
      subcontractor_details: props.subcontractor_details
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
    };
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === "success") {
          console.log(res.body.detail);
          this.setState({ subcontractor_details: res.body.detail });
        } else {
          console.log(err)
          this.setState({ subcontractor_details: res.body.detail });
        }
      });
      
  } 

  onUpdate = () => {
    let array_rails = [];
    let field = {};
    let count = this.state.subcontractor_details.length;
    console.log('count: ', this.state.subcontractor_details.length);
    if( count !== 0 ) {
      for(var i = 0; i < count; i++) {
        let replace_datetime =  document.getElementById('deliver_at' + i).value;
        replace_datetime = replace_datetime.replace(/年/g, '/');
        replace_datetime = replace_datetime.replace(/月/g, '/');
        replace_datetime = replace_datetime.replace(/日/g, '');
        replace_datetime = replace_datetime.replace(/時/g, ':');
        replace_datetime = replace_datetime.replace(/分/g, '');
        array_rails.push(JSON.stringify({
          'id': document.getElementById('detail_id' + i).innerHTML,
          'order_contents': document.getElementById('order_contents' + i).value,
          'standard': document.getElementById('standard' + i).value,
          'specification': document.getElementById('specification' + i).value,
          'count': document.getElementById('test-count' + i).value,
          'number_of_copies': document.getElementById('number_of_copies' + i).value,
          'deliver_at': replace_datetime,
          'cost_unit_price': document.getElementById('cost_unit_price' + i).value,
          'estimated_cost': document.getElementById('estimated_cost' + i).value,
          'actual_count': document.getElementById('actual_count' + i).value,
          'actual_cost': document.getElementById('actual_cost' + i).value,
          'status': Number(document.getElementById('status' + i).value),
        }));
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
        if (!err && res.body.status === "success") {
          this.setState({ show: false, subcontractor_details: res.body.detail });
        } else if (!err && res.body.status === 'nothing') {
          this.setState({ show: false });
        } else {
          this.setState({ subcontractor_details: res.body.detail });
        }
      });
  }

    onDestroy = (e, id) => {

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
          console.log(err)
          this.setState({ subcontractor_details: res.body.details });
        }
      });
  }

  /**
   *  お客様選択時
   *  @version 2018/06/10
   */
  applyClient(client, work_subcontractor_id) {

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
          console.log('res.body.clients: ', res.body.clients);
          this.setState({ work_subcontractors: res.body.work_subcontractors, clients: res.body.clients, divisions: res.body.divisions, subcontractors: res.body.subcontractors });
        } else {
          this.setState({ clients: res.body.clients, divisions: res.body.divisions });
        }
      });
  }

  /**
   *　表示処理
   */
  render() {
    return (
      <div>
        { this.state.show ?
          <div>
            <button className={ 'c-btnMain-standard' } onClick={ this.onUpdate }>完了</button>
            <button className={ 'c-btnMain-standard' } onClick={ this.onSubcontractorCreate }>＋</button>
          </div>
          :
          <div><button className={ 'c-btnMain-standard' } onClick={ this._editable }>編集</button></div>
        }
        { this.state.show ?
          <div>
            { this.state.work_subcontractors.length > 0 ?
              <div>
                { this.state.work_subcontractors.map((subcontractor, index) => {
                  console.log( this.state.clients.length );
                  return (
                    <div>
                      <div className={ 'c-attention u-mt-10' }>
                        <span className={ 'u-ml-10' }>外注区分: 作業詳細</span>
                      </div>
                      <React.Fragment>
                        <SubcontractorStatus id={ subcontractor.id } status={ subcontractor.status } />
                      </React.Fragment>
                      <div className={ 'c-form-label' }>
                        <label htmlFor='work_subcontractor_division_client_id'>お客様情報</label>
                      </div>
                      <React.Fragment>
                        { this.state.clients.length > 0 ?
                          <React.Fragment>
                            { this.state.clients.map((client, index) => {
                              return (
                                <React.Fragment>
                                  { subcontractor.subcontractor_division_client_id === client.id ?
                                    <React.Fragment>
                                      { this.state.divisions.map((division, index) => {
                                        return(
                                          <React.Fragment>
                                            { this.state.subcontractors.map((subcont, index) => {
                                              return (
                                                <React.Fragment>
                                                  { division.id === client.subcontractor_division_id ? 
                                                    <React.Fragment>
                                                      { division.subcontractor_id === subcont.id ?
                                                        <div className={ 'c-attention' }>
                                                          <div className={ 'u-mt-10' }>会社名: { subcont.name || '部署名なし' }</div>
                                                          <div className={ 'u-mt-10' }>部署名: { division.name }</div>
                                                          <div className={ 'u-mt-10' }>担当者名: { client.name }</div>
                                                          <div className={ 'u-mt-10' }>担当者TEL: { client.tel }</div>
                                                          <div className={ 'u-mt-10' }>担当者email: { client.email }</div>
                                                        </div> 
                                                        :
                                                        null
                                                      }
                                                    </React.Fragment>
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
                      <div className={ 'u-mt-15' }>
                        <ClientSearch work_subcontractor_id={ subcontractor.id } applyClient={::this.applyClient} />
                      </div>
                      <div className={ 'c-table' }>
                        <table>
                          <thead>
                            <tr>
                              <th></th>
                              <th>No.</th>
                              <th>発注内容</th>
                              <th>規格</th>
                              <th>仕様</th>
                              <th>数量</th>
                              <th>部数</th>
                              <th>工程期日</th>
                              <th>原価単価(想定)</th>
                              <th>積算単価(想定)</th>
                              <th>実績数量</th>
                              <th>実績単価</th>
                              <th>ステータス</th>
                            </tr>
                          </thead>
                          <tbody>
                            { this.state.subcontractor_details.map((detail, index1) => {
                              return(
                                <tr>
                                  <React.Fragment>
                                    { subcontractor.id === detail.work_subcontractor_id ?
                                      <td><button className={ 'c-btnMain-standard' } onClick={ e => this.onDestroy(e, detail.id) }>＋</button></td>
                                      :
                                      null
                                    }
                                  </React.Fragment>
                                  <React.Fragment>
                                    { subcontractor.id === detail.work_subcontractor_id ?
                                      <td id={ 'detail_id' + index1 }>{ detail.id }</td>
                                      :
                                      null
                                    }
                                  </React.Fragment>
                                  <React.Fragment>
                                    { subcontractor.id === detail.work_subcontractor_id ?
                                      <td><input className={ 'c-form-text__work-show' } type='text' id={ 'order_contents' + index1 } defaultValue={ detail.order_contents }></input></td>
                                      :
                                      null
                                    }
                                  </React.Fragment>
                                  <React.Fragment>
                                    { subcontractor.id === detail.work_subcontractor_id ?
                                      <td><input className={ 'c-form-text__work-show' } type='text' id={ 'standard' + index1 } defaultValue={ detail.standard }></input></td>
                                      :
                                      null
                                    }
                                  </React.Fragment>
                                  <React.Fragment>
                                    { subcontractor.id === detail.work_subcontractor_id ?
                                      <td><input className={ 'c-form-text__work-show' } type='text' id={ 'specification' + index1 } defaultValue={ detail.specification }></input></td>
                                      :
                                      null
                                    }
                                  </React.Fragment>
                                  <React.Fragment>
                                    { subcontractor.id === detail.work_subcontractor_id ?
                                      <td><input className={ 'c-form-text__work-show' } type='text' id={ 'test-count' + index1 } defaultValue={ detail.count }></input></td>
                                      :
                                      null
                                    }
                                  </React.Fragment>

                                  <React.Fragment>
                                    { subcontractor.id === detail.work_subcontractor_id ?
                                      <td><input className={ 'c-form-text__work-show' } type='text' id={ 'number_of_copies' + index1 } defaultValue={ detail.number_of_copies }></input></td>
                                      :
                                      null
                                    }
                                  </React.Fragment>
                                  <React.Fragment>
                                    { subcontractor.id === detail.work_subcontractor_id ?
                                      <td><input className={ 'c-form-text__work-show' } type='text' id={ 'deliver_at' + index1 } defaultValue={ Dayjs(detail.deliver_at).format('YYYY年MM月DD日 HH時mm分') }></input></td>
                                      :
                                      null
                                    }
                                  </React.Fragment>
                                  <React.Fragment>
                                    { subcontractor.id === detail.work_subcontractor_id ?
                                      <td><input className={ 'c-form-text__work-show' } type='text' id={ 'cost_unit_price' + index1 } defaultValue={ detail.cost_unit_price }></input></td>
                                      :
                                      null
                                    }
                                  </React.Fragment>
                                  <React.Fragment>
                                    { subcontractor.id === detail.work_subcontractor_id ?
                                      <td><input className={ 'c-form-text__work-show' } type='text' id={ 'estimated_cost' + index1 } defaultValue={ detail.estimated_cost }></input></td>
                                      :
                                      null
                                    }
                                  </React.Fragment>
                                  <React.Fragment>
                                    { subcontractor.id === detail.work_subcontractor_id ?
                                      <td><input className={ 'c-form-text__work-show' } type='text' id={ 'actual_count' + index1 } defaultValue={ detail.actual_count }></input></td>
                                      :
                                      null
                                    }
                                  </React.Fragment>
                                  <React.Fragment>
                                    { subcontractor.id === detail.work_subcontractor_id ?
                                      <td><input className={ 'c-form-text__work-show' } type='text' id={ 'actual_cost' + index1 } defaultValue={ detail.actual_cost }></input></td>
                                      :
                                      null
                                    }
                                  </React.Fragment>
                                  <React.Fragment>
                                    { subcontractor.id === detail.work_subcontractor_id ?
                                      <td>
                                        <select className={ 'c-form-select__work-show' } id={ 'status' + index1 }>
                                          <option value={ detail.status }>{ ENUM_STATUS[detail.status] }</option>
                                          { Object.keys(ENUM_STATUS).map((status) => {
                                            return(
                                              detail.status === Number(status) ? 
                                                null
                                                :
                                                <option value={ status }>{ ENUM_STATUS[status] }</option>
                                              );
                                          }) }
                                        </select>
                                      </td>
                                      :
                                      null
                                    }
                                  </React.Fragment>
                               </tr>
                              );
                            }) }
                            <tr>
                              <td colSpan='13'><button className={ 'c-btnMain-standard' } onClick={ e => this.onCreate(e, subcontractor.id) }>＋</button></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                }) }
              </div>
              :
              <div className={ 'c-attention u-mt-10' }>
                <span className={ 'u-ml-10' }>外注区分: 作業詳細</span>
              </div>
            }
          </div>
          :
          <div>
            { this.state.work_subcontractors.length > 0 && this.state.subcontractor_details.length > 0 ? 
              <div>
                { this.state.work_subcontractors.map((subcontractor, index) => {
                  return (
                    <div>
                      <div className={ 'c-attention u-mt-10' }>
                        <span className={ 'u-ml-10' }>外注区分: 作業詳細</span>
                      </div>
                      <React.Fragment>
                        <ReadSubcontractorStatus status={ subcontractor.status } />
                      </React.Fragment>
                      <div className={ 'c-form-label' }>
                        <label htmlFor='work_subcontractor_division_client_id'>お客様情報</label>
                      </div>
                      { this.state.clients.map((client) => { return client.name }).join(',') }
                      <React.Fragment>
                        { this.state.clients.length > 0 ?
                          <React.Fragment>
                            { this.state.clients.map((client, index) => {
                              return (
                                <React.Fragment>
                                  { subcontractor.subcontractor_division_client_id === client.id ?
                                    <React.Fragment>
                                      { this.state.divisions.map((division, index) => {
                                        return(
                                          <React.Fragment>
                                            { this.state.subcontractors.map((subcont, index) => {
                                              return (
                                                <React.Fragment>
                                                  { division.id === client.subcontractor_division_id ? 
                                                    <React.Fragment>
                                                      { division.subcontractor_id === subcont.id ?
                                                        <div className={ 'c-attention' }>
                                                          <div className={ 'u-mt-10' }>会社名: { subcont.name || '部署名なし' }</div>
                                                          <div className={ 'u-mt-10' }>部署名: { division.name }</div>
                                                          <div className={ 'u-mt-10' }>担当者名: { client.name }</div>
                                                          <div className={ 'u-mt-10' }>担当者TEL: { client.tel }</div>
                                                          <div className={ 'u-mt-10' }>担当者email: { client.email }</div>
                                                        </div> 
                                                        :
                                                        null
                                                      }
                                                    </React.Fragment>
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
                      <div className={ 'c-table' }>
                        <table>
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>発注内容</th>
                              <th>規格</th>
                              <th>仕様</th>
                              <th>数量</th>
                              <th>部数</th>
                              <th>工程期日</th>
                              <th>原価単価(想定)</th>
                              <th>積算単価(想定)</th>
                              <th>実績数量</th>
                              <th>実績単価</th>
                              <th>ステータス</th>
                            </tr>
                          </thead>
                        <tbody>
                        { this.state.subcontractor_details.map((detail, index) => {
                          return (
                            <tr>
                              <React.Fragment>
                                { subcontractor.id === detail.work_subcontractor_id ? 
                                  <td style={{ textAlign: 'center' }}>{ detail.id }</td>
                                  :
                                  null
                                }
                              </React.Fragment>
                              <React.Fragment>
                                { subcontractor.id === detail.work_subcontractor_id ?
                                  <td style={{ textAlign: 'center' }}>{ detail.order_contents }</td>
                                  : 
                                  null
                                }
                              </React.Fragment>
                              <React.Fragment>
                                { subcontractor.id === detail.work_subcontractor_id ?
                                  <td style={{ textAlign: 'center' }}>{ detail.standard }</td>
                                  :
                                  null 
                                }
                              </React.Fragment>
                              <React.Fragment>
                                { subcontractor.id === detail.work_subcontractor_id ?
                                  <td style={{ textAlign: 'center' }}>{ detail.specification }</td>
                                  :
                                  null
                                }
                              </React.Fragment>
                              <React.Fragment>
                                { subcontractor.id === detail.work_subcontractor_id ?
                                  <td style={{ textAlign: 'right' }}>{ detail.count }</td>
                                  :
                                  null
                                }
                              </React.Fragment>
                              <React.Fragment>
                                { subcontractor.id === detail.work_subcontractor_id ?
                                  <td style={{ textAlign: 'right' }}>{ detail.number_of_copies }</td>
                                  :
                                  null
                                }
                              </React.Fragment>
                              <React.Fragment>
                                { subcontractor.id === detail.work_subcontractor_id ?
                                  <td style={{ textAlign: 'center' }}>{ Dayjs(detail.deliver_at).format('YYYY年MM月DD日 HH時mm分') }</td>
                                  :
                                  null
                                }
                              </React.Fragment>
                              <React.Fragment>
                                { subcontractor.id === detail.work_subcontractor_id ?
                                  <td style={{ textAlign: 'right' }}>{ detail.cost_unit_price }</td>
                                  :
                                  null
                                }
                              </React.Fragment>
                              <React.Fragment>
                                { subcontractor.id === detail.work_subcontractor_id ?
                                  <td style={{ textAlign: 'right' }}>{ detail.estimated_cost }</td>
                                  :
                                  null
                                }
                              </React.Fragment>
                              <React.Fragment>
                                { subcontractor.id === detail.work_subcontractor_id ?
                                  <td style={{ textAlign: 'right' }}>{ detail.actual_count }</td>
                                  :
                                  null
                                }
                              </React.Fragment>
                              <React.Fragment>
                                { subcontractor.id === detail.work_subcontractor_id ?
                                  <td style={{ textAlign: 'right' }}>{ detail.actual_cost }</td>
                                  :
                                  null
                                }
                              </React.Fragment>
                              <React.Fragment>
                                { subcontractor.id === detail.work_subcontractor_id ?
                                  <td style={{ textAlign: 'center' }}>{ ENUM_STATUS[detail.status] }</td>
                                  :
                                  null
                                }
                              </React.Fragment>
                            </tr>
                          );
                        }) }
                      </tbody>
                    </table>
                  </div>
                  </div>
                  );
                }) }
              </div>
              :
              <div>
                { this.state.work_subcontractors.length > 0 && this.state.subcontractor_details.length === 0 ?
                  <div>
                    { this.state.work_subcontractors.map((subcontractor, index) => {
                      return ( 
                        <div>
                          <div className={ 'c-attention u-mt-10' }>
                            <span className={ 'c-ml-10' }>外注区分: 作業詳細</span>
                          </div>
                          <React.Fragment>
                            <ReadSubcontractorStatus status={ subcontractor.status } />
                          </React.Fragment>
                          <div className={ 'c-form-label' }>
                            <label htmlFor='work_subcontractor_division_client_id'>お客様情報</label>
                          </div>
                          <React.Fragment>
                            { this.state.clients.length > 0 ?
                              <React.Fragment>
                                { this.state.clients.map((client, index) => {
                                  return (
                                    <React.Fragment>
                                      { subcontractor.subcontractor_division_client_id === client.id ?
                                        <React.Fragment>
                                          { this.state.divisions.map((division, index) => {
                                            return(
                                              <React.Fragment>
                                                { this.state.subcontractors.map((subcont, index) => {
                                                  return (
                                                    <React.Fragment>
                                                      { division.id === client.subcontractor_division_id ? 
                                                        <React.Fragment>
                                                          { division.subcontractor_id === subcont.id ?
                                                            <div className={ 'c-attention' }>
                                                              <div className={ 'u-mt-10' }>会社名: { subcont.name || '部署名なし' }</div>
                                                              <div className={ 'u-mt-10' }>部署名: { division.name }</div>
                                                              <div className={ 'u-mt-10' }>担当者名: { client.name }</div>
                                                              <div className={ 'u-mt-10' }>担当者TEL: { client.tel }</div>
                                                              <div className={ 'u-mt-10' }>担当者email: { client.email }</div>
                                                            </div> 
                                                            :
                                                            null
                                                          }
                                                        </React.Fragment>
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
                          <div className={ 'c-table' }>
                            <table>
                              <thead>
                                <tr>
                                  <th>No.</th>
                                  <th>発注内容</th>
                                  <th>規格</th>
                                  <th>仕様</th>
                                  <th>数量</th>
                                  <th>部数</th>
                                  <th>工程期日</th>
                                  <th>原価単価(想定)</th>
                                  <th>積算単価(想定)</th>
                                  <th>実績数量</th>
                                  <th>実績単価</th>
                                  <th>ステータス</th>
                                </tr>
                              </thead>
                            </table>
                          </div>
                        </div>
                      );
                    }) }
                  </div>
                  :
                  <div className={ 'c-attention u-mt-10' }>
                    <span className={ 'c-ml-10' }>外注区分: 作業詳細</span>
                  </div>
                }
              </div>
            }
          </div>    
        }
      </div>
    )
  }
} 

