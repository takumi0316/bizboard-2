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
//import { ENUM_STATUS } from '../properties.es6'

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
   *　表示処理
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
                  <button className={ 'c-btnMain-standard c-btn-blue' } >作成する</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
