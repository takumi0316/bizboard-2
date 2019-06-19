import React from 'react'
//import SubcontractorStatus from '../subcontractor_status/index.jsx'
//import ReadSubcontractorStatus from '../read-subcontractor_status/index.jsx'
//import ClientSearch from '../client_search/index.jsx'
import Style from './style.sass'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

// Datetime
import Dayjs from 'dayjs'
import { STATUS } from './properties.es6'

export default class ExpendablesEditor extends React.Component {

  /**
   *  コンストラクタ
   *
   */

  constructor (props) {

    super(props);

    this.state = {

      subcontractors: props.subcontractors,
      divisions: props.divisions,
      clients: props.clients,
      work_subcontractors: props.work_subcontractors,
      subcontractor_details: props.subcontractor_details,
    }
  }

  /**
   *  登録処理
   *  @version 2018/06/10
   */
  onSubmit = () => {

    let arrayRails = [];
    let field = {};
    let quoteProjectsCount = Object.keys(this.state.quote_projects).length;
    let quoteProjects = Object.assign([], this.state.quote_projects);
    let messages = this.validation();
    // エラーが存在する場合
    if (messages.length > 0) {

      alert(messages.join('\n'));
      return false;
    }

    // 新規登録時、更新時とでmethodを分ける
    //const request = this.props.quote.id ? Request.put(this.props.action) : Request.post(this.props.action);

    for (let i = 0; i < quoteProjectsCount; i++) {

      // 品目を連想配列に入れる
      arrayRails.push(JSON.stringify({
        'projectSpecificationId': quoteProjects[i].id === null ? 'null' : Number(quoteProjects[i].id),
        'projectSpecificationName': document.getElementById('projectSpecificationName' + i).value,
        'projectSpecificationRemarks': document.getElementById('projectSpecificationRemarks' + i).value,
        'projectSpecificationUnitPrice': Number(document.getElementById('projectSpecificationUnitPrice' + i).value),
        'projectSpecificationUnit': Number(document.getElementById('projectSpecificationUnit' + i).value),
        'projectSpecificationPrice': Number(document.getElementById('projectSpecificationPrice' + i).value),
        'projectName': quoteProjects[i].project_name,
        'projectId': quoteProjects[i].project_id,
      }));
      console.log(Number(document.getElementById('projectSpecificationUnitPrice' + i).value))
      console.log(Number(document.getElementById('projectSpecificationPrice' + i).value))
    }
    field = {
      'id': this.state.quote.id === null ? 'null' : this.state.quote.id,
      'expendable[divisions_id]': this.props.division_id === null ? 'null' : this.props.division_id,
      'expendable[subcontractors_id]': this.refs.company_division_client_id.value,
      'expendable[status]': this.refs.subject.value,
      'expendable[name]': this.refs.quote_type.value,
      'expendable[price]': this.refs.channel.value,
      'expendable[date]': this.state.date || '',
      'specifications[]': arrayRails,
    };
  }

  /**
   * 表示処理
   */
  render() {
    return (
      <div>
        <div className={ 'c-table u-mt-30' } >
          <table>
            <thead>
              <tr>
                <th className={ 'u-va-middle' }>No.</th>
                <th className={ 'u-va-middle' }>種別</th>
                <th className={ 'u-va-middle' }>品目名</th>
                <th className={ 'u-va-middle' }>金額</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td><input className={ 'c-form-text' } type='text'/></td>
                <td><input className={ 'c-form-text' } type='text'/></td>
              </tr>
              <tr>
                <td colSpan='4'>
                  <button className={ 'c-btnMain2-primaryB' } >＋</button>
                </td>
              </tr>
              <tr>
                <td colSpan='4' align="right">
                  <button className={ 'c-btnMain-standard c-btn-blue' } onClick={::this.onSubmit} >作成する</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
