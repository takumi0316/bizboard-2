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
      work_notices: this.props.work_notices,
      read_work_notices: this.props.work_notices,
      startDate: new Date(),
    }

  }

  _editable = () => {

    this.setState({ show: true });
  }

  onIntCheck = (e, detail_id, index, funcName ) => {

    if (funcName === 'onChangeCost') {
   	  if(document.getElementById('estimated_cost' + index).value.match(/[^0-9]+/)){

        window.confirm('半角数字以外を入力しないで下さい。')
      } else {

        this.onChangeCost(e, detail_id, index);
      }

    } else if (funcName === 'onChangeCount') {

      if(document.getElementById('count' + index).value.match(/[^0-9]+/)){

        window.confirm('半角数字以外を入力しないで下さい。')
      } else {

        this.onChangeCount(e, detail_id, index);
      }
    } else if (funcName === 'number_of_copies') {

      if(document.getElementById('number_of_copies' + index).value.match(/[^0-9]+/)){

        window.confirm('半角数字以外を入力しないで下さい。')
      } else {

        return
      }
    }
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
          'work_id': this.props.work_id,
          'id': document.getElementById('detail_id' + i).value,
          'order_contents': document.getElementById('order_contents' + i).value,
          'deliver_method': document.getElementById('deliver_method' + i).value,
          'specification': document.getElementById('specification' + i).value,
          'deliver_at': replace_datetime,
          'client_name': document.getElementById('client_name' + i).value,
          'number_of_copies': document.getElementById('number_of_copies' + i).value,
          'count': document.getElementById('count' + i).value,
          'estimated_cost': document.getElementById('estimated_cost' + i).value,
          'actual_cost': document.getElementById('actual_cost' + i).innerHTML,
        }));
        actual_cost = actual_cost + Number(document.getElementById('actual_cost' + i).innerHTML);
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

          this.setState({ work_details: res.body.detail }, this.onWorkNoticesUpdate(actual_cost, type));
        } else if (!err && res.body.status === 'nothing') {

          this.onWorkNoticesUpdate(actual_cost, type);
        } else {

          this.setState({ work_details: res.body.detail });
        }
      });
  }

  onWorkNoticesUpdate = (actual_cost, type) => {

    let field = {};
    let url = '/works/' + this.props.work_id;
    field = {
      'work_id': this.props.work_id,
      'work_notices': document.getElementById('notices').value,
      'status': 'notices',
    };
    Request
      .put(url)
      .field(field)
      .set('X-Request-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {

        if (!err && res.body.status === 'success') {

          this.setState({ show: false,read_work_notices: res.body.notices , work_notices: res.body.notices }, this.props.applyPrice(Number(actual_cost), type));
        } else {

          this.setState({ work_notices: res.body.notices });
        }
      });
  }


  disp = (e, detail_id, index) => {

    if(window.confirm('削除します。')){

      this.onWorkDetailDestroy(e, detail_id, index);
    } else {

      window.confirm('キャンセルしました。')
    }
  }

  contentNotices = (work_notices) => {

    let replace_work_notices = '';
    if (work_notices !== null) {

      replace_work_notices = work_notices.replace(/\n/g, '<br />')
    } else {

      replace_work_notices = work_notices;
    }

    return (
      <React.Fragment>
        <td dangerouslySetInnerHTML={{ __html: replace_work_notices }} />
      </React.Fragment>
    );
  }

  contentOrder = (order_content) => {

    let replace_order_content = '';
    if (order_content !== null) {

      replace_order_content = order_content.replace(/\n/g, '<br />')
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

        replace_deliver_method = deliver_method.replace(/\n/g, '<br />')
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

      replace_specification = specification.replace(/\n/g, '<br />')
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
   *  表示処理
   *  @version
   */
  render() {
    return (
      <div>
        { this.state.show ?
          <div className={ 'u-mt-10' }>
            <button className={ 'c-btnMain-standard' } id='finish' onClick={ this.onWorkDetailUpdate }>作業詳細[編集終了]</button>
          </div>
          :
          <div className={ 'u-mt-10' }>
            <button className={ 'c-btnMain-standard u-mr-10' } id='editable' onClick={ this._editable }>作業詳細[編集]</button>
            <a className={ 'c-btnMain-primaryB' } href={ '/works/' + this.props.work_id + '/directions'   } target='_blank'>指示書発行[社内用]</a>
          </div>
        }
        { this.state.show ?
          <React.Fragment>
            <div className={ 'u-mt-10 c-table' }>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>No.</th>
                    <th>発注内容</th>
                    <th>入稿物</th>
                    <th>仕様</th>
                    <th>期日</th>
                    <th>担当者</th>
                    <th>原稿<br />枚数</th>
                    <th>部数<br />数量</th>
                    <th>想定原価(税抜)</th>
                    <th>実績原価(税抜)</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.work_details.map((detail, index) => {
                    return (
                      <tr>
                        <input type='hidden' id={ 'detail_id' + index } defaultValue={ detail.id } />
                        <td className={ 'u-va-top' }><button className={ 'c-btnMain2-primaryA' } onClick={ e => this.disp(e, detail.id, index) }>−</button></td>
                        <td id={ 'detail_id' + index } className={ 'u-va-top' } >{ index + 1 }</td>
                        <td className={ 'u-va-top' }><textarea rows='3' cols='30' className={ 'c-form-text__work-show-input__textarea' } type='text' id={ 'order_contents' + index } defaultValue={ detail.order_contents } placeholder={ '図面製本' } /></td>
                        <td className={ 'u-va-top' }><textarea id={ 'deliver_method' + index } className={ 'c-form-textarea__work-show-input__textarea' } rows='3' cols='30' placeholder={ 'AIデータ, アウトライン済み1ファイル' } defaultValue={ detail.deliver_method } /></td>
                        <td className={ 'u-va-top' }><textarea id={ 'specification' + index } className={ 'c-form-textarea__work-show-input__textarea' } rows='3' cols='30' placeholder={ '表紙:ダイヤボード' } defaultValue={ detail.specification } /></td>
                        <td><input className={ 'c-form-text__work-show-input1' } type='text' id={ 'deliver_at' + index } defaultValue={ detail.deliver_at === null ? detail.deliver_at : Dayjs(detail.deliver_at).format('YYYY年MM月DD日') }/></td>
                        <td className={ 'u-va-top' }>
                          <select className={ 'c-form-select__work-show' } id={ 'client_name' + index }>
                            { detail.client_name === "" ? <option></option> : <option value={ detail.client_name }>{ detail.client_name }</option> }
                            { this.props.users.map((user) => {
                              return(
                                detail.client_name !== user['name'] ? <option value={ user['name'] }>{ user['name'] }</option> : null
                              );
                            }) }
                          </select>
                        </td>
                        <td className={ 'u-va-top' }><input type='text' className={ 'c-form-text__work-show-input6' } onChange={ e => this.onIntCheck(e, detail.id, index, 'number_of_copies') } id={ 'number_of_copies' + index } defaultValue={ detail.number_of_copies } /></td>
                        <td className={ 'u-va-top' }><input className={ 'c-form-text__work-show-input6' } onChange={ e => this.onIntCheck(e, detail.id, index, 'onChangeCount') } type='text' id={ 'count' + index } defaultValue={ detail.count } /></td>
                        <td className={ 'u-va-top' }><input className={ 'c-form-text__work-show-input2' } onChange={ e => this.onIntCheck(e, detail.id, index, 'onChangeCost') } type='text' id={ 'estimated_cost' + index } defaultValue={ detail.estimated_cost } /></td>
                        <td className={ 'u-va-top u-ta-right' } id={ 'actual_cost' + index } value={ detail.count * detail.estimated_cost }>{ detail.count * detail.estimated_cost }</td>
                      </tr>
                    );
                  }) }
                  <tr>
                     <td colSpan='13'><button className={ 'c-btnMain2-primaryB' } onClick={ this.onWorkDetailCreate }>＋</button></td>
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
                    <td><textarea id='notices' rows='3' className={ 'c-form-textarea__work-show-input__textarea2' } defaultValue={ this.state.work_notices }></textarea></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </React.Fragment>
          :
          <React.Fragment>
            <div className={ 'u-mt-10 c-table' }>
              <table>
                <thead>
                  <tr>
                    <th className={ 'u-va-middle' }>No.</th>
                    <th className={ 'u-va-middle' }>発注内容</th>
                    <th className={ 'u-va-middle' }>納品物</th>
                    <th className={ 'u-va-middle' }>仕様</th>
                    <th className={ 'u-va-middle' }>期日</th>
                    <th className={ 'u-va-middle' }>担当者</th>
                    <th>原稿<br />枚数</th>
                    <th>部数<br />数量</th>
                    <th className={ 'u-va-middle' }>想定原価(税抜)</th>
                    <th className={ 'u-va-middle' }>実績原価(税抜)</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.work_details.map((detail, index) => {
                    return (
                      <tr>
                        <td className={ 'u-va-top u-ta-center' }>{ index + 1 }</td>
                        { this.contentOrder(detail.order_contents) }
                        { this.contentDeliver(detail.deliver_method) }
                        { this.contentSpecification(detail.specification) }
                        <td className={ 'u-va-top u-ta-center' }>{ detail.deliver_at === null ? detail.deliver_at : Dayjs(detail.deliver_at).format('YYYY年MM月DD日') }</td>
                        <td className={ 'u-va-top u-ta-center' }>{ detail.client_name }</td>
                        <td className={ 'u-va-top u-ta-right' }>{ detail.number_of_copies }</td>
                        <td className={ 'u-va-top u-ta-right' } id={ 'count' + index }>{ detail.count }</td>
                        <td className={ 'u-va-top u-ta-right' }>{ detail.estimated_cost }円</td>
                        <td className={ 'u-va-top u-ta-right' }>{ detail.actual_cost }円</td>
                      </tr>
                    );
                  }) }
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
                    { this.contentNotices(this.state.work_notices) }
                  </tr>
                </tbody>
              </table>
            </div>
          </React.Fragment>
          }
      </div>
    );
  }
}
