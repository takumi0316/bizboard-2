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

  onWorkSubcontractorCreate = () => {

    let url = '/work_subcontractors';
    let field = {
      'work_subcontractors[work_id]': this.props.work_id,
      'contents': 'create',
    }
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if(!err && res.body.status == 'success') {

          this.setState({ work_subcontractors: res.body.subcontractors })
        } else {

          this.setState({ work_subcontractors: res.body.subcontractors })
        }
      })
  }

  onWorkSubcontractorDetailCreate = (e, id) => {

    let url = '/work_subcontractor_details';
    let field = {
      'subcontractor_detail[subcontractor_id]': id,
      'work_id': this.props.work_id,
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

  onWorkSubcontractorDetailUpdate = () => {

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
          'deliver_method': document.getElementById('deliver_method' + subcontractor_value_count[i]).value,
          'specification': document.getElementById('specification' + subcontractor_value_count[i]).value,
          'count': document.getElementById('test-count' + subcontractor_value_count[i]).value,
          'number_of_copies': document.getElementById('number_of_copies' + subcontractor_value_count[i]).value,
          'deliver_at': replace_datetime,
          'actual_cost': document.getElementById('actual_cost' + subcontractor_value_count[i]).value,
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

          this.setState({ subcontractor_details: res.body.detail }, this.onWorkSubcontractorNoticesUpdate(actual_cost, type));
        } else if (!err && res.body.status === 'nothing') {

          if (this.state.work_subcontractors.length < 0) {

            this.setState({ show: false });
          } else {

            this.onWorkSubcontractorNoticesUpdate(actual_cost, type);
          }
        } else {

          this.setState({ subcontractor_details: res.body.detail });
        }
      });
  }

  onWorkSubcontractorNoticesUpdate = (actual_cost, type) => {

    let array_rails = [];
    let field = {};
    let work_subcontractor_length = this.state.work_subcontractors.length;
    let url = '/work_subcontractors'
    for(let i = 0; i < work_subcontractor_length; i++) {

      array_rails.push(JSON.stringify({

        'id': Number(document.getElementById('work_subcontractor_id' + i).value),
        'notices': document.getElementById('notices' + i).value,
      }));
    }
    field = {
      'work_subcontractor_notices_update[]': array_rails,
      'work_id': this.props.work_id,
      'contents': 'notices',
    };
    Request
      .post(url)
      .field(field)
      .set('X-Request-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {

        if (!err && res.body.status === 'success') {

          this.props.applyPrice(actual_cost, type);
          this.setState({ show: false, work_subcontractors: res.body.work_subcontractors });
        } else {

          this.setState({ work_subcontractors: res.body.work_subcontractors });
        }
      });
  }

    onWorkSubcontractorDetailDestroy = (e, id, index) => {

    let url = '/work_subcontractor_details/' + id;
    let field = { 'work_id': this.props.work_id };
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

    onIntCheck = (e, index, funcName ) => {

    if (funcName === 'count') {
   	  if(document.getElementById('test-count' + index).value.match(/[^0-9]+/)){

        window.confirm('半角数字以外を入力しないで下さい。')
      } else {

        return
      }

    } else if (funcName === 'actual_cost') {

      if(document.getElementById('actual_cost' + index).value.match(/[^0-9]+/)){

        window.confirm('半角数字以外を入力しないで下さい。')
      } else {

        return
      }
    } else if (funcName === 'number_of_copies') {

      if(document.getElementById('number_of_copies' + index).value.match(/[^0-9]+/)){

        window.confirm('半角数字以外を入力しないで下さい。')
      } else {

        return
      }
    }
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

  disp(e, id, index, type) {

    if (window.confirm('削除します。')){

      if (type) {

        this.onWorkSubcontractorDestroy(e, id);
      } else {

        this.onWorkSubcontractorDetailDestroy(e, id, index);
      }
    } else {

      window.confirm('キャンセルしました。');
    }
  }

	contentNotices = (notices) => {

		let replace_notices = '';
    if (notices !== null) {

      replace_notices = notices.replace(/\n/g, '<br />')
    } else {

      replace_notices = notices;
    }

		return (
			<React.Fragment>
				<td dangerouslySetInnerHTML={{ __html: replace_notices }} />
			</React.Fragment>
		);
	}

	contentOrder = (order_content) => {

    let replace_order_content = '';
    if (order_content !== null) {

      replace_order_content = order_content.replace(/\n/g, '<br /<')
    } else {

      replace_order_content = order_content;
    }
		return (
			<React.Fragment>
				<td dangerouslySetInnerHTML={{ __html: replace_order_content }} />
			</React.Fragment>
		);
	}

	contentDeliver = (deliver_method) => {

    let replace_deliver_method = '';
    if (deliver_method !== null) {

      replace_deliver_method = deliver_method.replace(/\n/g, '<br /<')
    } else {

      replace_deliver_method = deliver_method;
    }
		return (
			<React.Fragment>
				<td dangerouslySetInnerHTML={{ __html: replace_deliver_method }} />
			</React.Fragment>
		);
	}

	contentSpecification = (specification) => {

		let replace_specification = '';
    if (specification !== null) {

      replace_specification = specification.replace(/\n/g, '<br /<')
    } else {

      replace_specification = specification;
    }

		return (
			<React.Fragment>
				<td dangerouslySetInnerHTML={{ __html: replace_specification }} />
			</React.Fragment>
		);
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
              <button className={ 'c-btnMain-standard' } onClick={ this.onWorkSubcontractorDetailUpdate }>作業外注先[編集終了]</button>
            </div>
            { this.state.work_subcontractors.length > 0 ?
              <React.Fragment>
                { this.state.work_subcontractors.map((work_subcontractor, index) => {
                  return(
                    <React.Fragment>
                      { this.props.work_id == work_subcontractor.work_id ?
                        <React.Fragment>
                          <div key={ 'work_subcontractor_division_client_label' + index } className={ 'c-form-label u-mt-20' }>
                            <label htmlFor='work_subcontractor_division_client_id'>外注先情報</label>
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
                          <div className={ 'u-mt-10 c-flex__start' } key={ 'client_search' + index }>
                            <ClientSearch work_subcontractor_id={ work_subcontractor.id } applyClient={ ::this.applyClient } />
														<div>
                            	<button className={ 'u-mt-10 c-btnMain-primaryA' } onClick={ e => this.disp(e, work_subcontractor.id, index, true) }>外注先[削除]</button>
														</div>
                          </div>
                          <div key={ 'table' + index } className={ 'c-table2 u-mt-10' }>
                            <table>
                              <thead>
                                <tr>
                                  <th></th>
                                  <th className={ 'u-va-middle' }>No.</th>
                                  <th className={ 'u-va-middle' }>発注内容</th>
                                  <th className={ 'u-va-middle' }>納品物</th>
                                  <th className={ 'u-va-middle' }>仕様</th>
                                  <th>原稿<br />数量</th>
                                  <th>部数<br />数量</th>
                                  <th className={ 'u-va-middle' }>工程期日</th>
                                  <th className={ 'u-va-middle' }>実績原価</th>
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
                                                  <td className={ 'u-va-top' }><button className={ 'c-btnMain2-primaryA' } onClick={ e => this.disp(e, subcontractor_detail.id, index1, false) }>ー</button></td>
                                                  <td className={ 'u-va-top' } id={ 'detail_id' + index1 }>{ subcontractor_detail.id }</td>
																									<td className={ 'u-va-top' }><textarea rows='3' cols='30' className={ 'c-form-text__work-show-input__textarea' } id={ 'order_contents' + index1 } defaultValue={ subcontractor_detail.order_contents } placeholder={ '図面製本' } /></td>
																									<td><textarea id={ 'deliver_method' + index1 } className={ 'c-form-textarea__work-show-input__textarea' } rows='3' cols='30' placeholder={ 'AIデータ, アウトライン済み1ファイル' } defaultValue={ subcontractor_detail.deliver_method } /></td>
																									<td><textarea id={ 'specification' + index1 } className={ 'c-form-textarea__work-show-input__textarea' } rows='3' cols='30' placeholder={ '表紙:ダイヤボード' } defaultValue={ subcontractor_detail.specification } /></td>
                                                  <td className={ 'u-va-top' }><input className={ 'c-form-text__work-show-input6' } type='text' onChange={ e => this.onIntCheck(e, index1, 'count') } id={ 'test-count' + index1 } defaultValue={ subcontractor_detail.count }></input></td>
                                                  <td className={ 'u-va-top' }><input className={ 'c-form-text__work-show-input6' } type='text' onChange={ e => this.onIntCheck(e, index1, 'number_of_copies') } id={ 'number_of_copies' + index1 } defaultValue={ subcontractor_detail.number_of_copies }></input></td>
                                                  <td className={ 'u-va-top' }><input className={ 'c-form-text__work-show-input1' } type='text' id={ 'deliver_at' + index1 } defaultValue={ Dayjs(subcontractor_detail.deliver_at).format('YYYY年MM月DD日') }></input></td>
                                                  <td className={ 'u-va-top' }><input className={ 'c-form-text__work-show-input2' } type='text' onChange={ e => this.onIntCheck(e, index1, 'actual_cost') } id={ 'actual_cost' + index1 } defaultValue={ subcontractor_detail.actual_cost } ></input></td>
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
                               <tr>
                                  <td id={ 'onCreate-td' + index } colSpan='12'><button className={ 'c-btnMain2-primaryB' } onClick={ e => this.onWorkSubcontractorDetailCreate(e, work_subcontractor.id) }>＋</button></td>
                                </tr>
                              </tbody>
                            </table>
                            </div>
                            <div className={ 'c-table' }>
                              <table>
                                <thead>
                                  <tr>
                                    <th>特記事項</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td colSpan='13'><textarea id={ 'notices' + index } rows='3' className={ 'c-form-textarea__work-show-input__textarea2' } defaultValue={ work_subcontractor.notices }></textarea></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <input type='hidden' id={ 'work_subcontractor_id' + index } value={ work_subcontractor.id } />
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
            <div className={ Style.AddSubcontractor__EditButton }>
              <button className={ 'c-btnMain-primaryB' } onClick={ this.onWorkSubcontractorCreate }>外注先[追加]</button>
            </div>
          </div>
          :
          <div>
            <div className={ Style.AddSubcontractor__EditButton }>
              <button className={ 'c-btnMain-standard' } onClick={ this._editable }>外注先[編集]</button>
            </div>
            { this.state.work_subcontractors.length > 0 ?
              <React.Fragment>
                { this.state.work_subcontractors.map((work_subcontractor, index) => {
                  return(
                    <React.Fragment>
                      { this.props.work_id == work_subcontractor.work_id ?
                        <React.Fragment>
													{ work_subcontractor.subcontractor_division_client_id === null ?
                          	null
                          	:
                          	<a className={ 'c-btnMain-primaryB u-mt-20' } href={ '/work_subcontractors/' + work_subcontractor.id } target='_blank'>外注指示書発行</a>
                        	}
                          <div className={ Style.AddSubcontractor__ReadOnly }>
                            <div key={ 'work_subcontractor_division_client_label' + index } className={ 'c-form-label u-mt-20' }>
                              <label htmlFor='work_subcontractor_division_client_id'>外注先情報</label>
                            </div>
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
                          <div key={ 'table' + index } className={ 'c-table u-mt-20' }>
                            <table>
                              <thead>
                                <tr>
                                  <th className={ 'u-va-middle' }>No.</th>
                                  <th className={ 'u-va-middle' }>発注内容</th>
                                  <th className={ 'u-va-middle' }>納品物</th>
                                  <th className={ 'u-va-middle' }>仕様</th>
                                  <th>原稿<br />数量</th>
                                  <th>部数<br />数量</th>
                                  <th className={ 'u-va-middle' }>期日</th>
                                  <th className={ 'u-va-middle' }>実績原価</th>
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
                                                <td className={ 'u-va-top u-ta-center' }>{ subcontractor_detail.id }</td>
                                                { this.contentOrder(subcontractor_detail.order_contents) }
                                                { this.contentDeliver(subcontractor_detail.deliver_method) }
                                                { this.contentSpecification(subcontractor_detail.specification) }
                                                <td className={ 'u-va-top u-ta-right' }>{ subcontractor_detail.count }</td>
                                                <td className={ 'u-va-top u-ta-right' }>{ subcontractor_detail.number_of_copies }</td>
                                                <td className={ 'u-va-top u-ta-center' }>{ Dayjs(subcontractor_detail.deliver_at).format('YYYY年MM月DD日') }</td>
                                                <td className={ 'u-va-top u-ta-right' }>{ subcontractor_detail.actual_cost }円</td>
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
                          <div className={ 'c-table' }>
                            <table>
                              <thead>
                                <tr>
                                  <th>特記事項</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  { this.contentNotices(work_subcontractor.notices) }
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
              null
            }
          </div>
        }
      </div>
    );
  }
}

