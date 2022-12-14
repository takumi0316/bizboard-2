import React from 'react'
import AddSubcontractor from './add_subcontractor'
import WorkDetails from './work_details'
import HomeDivision from './home_division'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);
export default class WorkEditor extends React.Component {

 /**
   *  コンストラクタ
   *
   */

  constructor (props) {

    super(props);

    this.state = {
      project_price: props.project_price,
      work_price: props.work_price,
      work_detail_cost: props.work_detail_actual_cost,
      subcontractor_detail_cost: props.subcontractor_detail_actual_cost,
      division: props.division,
    }
  }

  applyPrice = ( project_price, type) => {

    if ( type === 'work_detail_cost' ) {

      this.setState({ work_detail_cost: project_price });
    } else if ( type === 'subcontractor_detail_cost' ) {

       this.setState({ subcontractor_detail_cost: project_price });
    }
    this.onUpdatePrice()
  }

  onUpdatePrice = () => {

    let url = '/works/' + this.props.work_id;
    let field = {
      'price': this.state.work_detail_cost + this.state.subcontractor_detail_cost,
      'status': 'price',
    }
    Request
      .put(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === 'success') {

          this.setState({ work_price: res.body.price });
        } else {

          this.setState({ work_price: res.body.price });
        }
      });
  }

  _applyDivision = (division) => {

    let url = '/works/' + this.props.work_id;
    let field = {
      'division_id': division.id,
      'status': 'division',
    }
    Request
      .put(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === 'success') {

          alert('作業部署を登録出来ました')
          this.setState({ division: res.body.division });
        } else {

          alert('作業部署を登録出来ませんでした')
          this.setState({ work_price: res.body.division });
        }
      });

  }

  /**
   * 表示処理
   */
  render() {
    return (
      <div>

        <div className='c-form-label u-mt-10'>
          <label htmlFor='quote_company_division_client_id'>作業部署情報</label>
        </div>
        { this.state.division ?
          <div className='c-attention'>
            <div>部署名: {this.state.division.name}</div>
          </div>
          : null
        }
        <div className='u-mt-15'>
          <HomeDivision applyDivision={ ::this._applyDivision } />
        </div>
        <WorkDetails work_notices={ this.props.work_notices } details={ this.props.details } category={ this.props.category } work_id={ this.props.work_id } user_id={ this.props.user_id } users={ this.props.users } applyPrice={ ::this.applyPrice } />
        <AddSubcontractor work_subcontractors={ this.props.work_subcontractors } subcontractor_details={ this.props.subcontractor_details } work_id={ this.props.work_id } subcontractors={ this.props.subcontractors } divisions={ this.props.divisions } clients={ this.props.clients } applyPrice={ ::this.applyPrice } users={ this.props.users } prefectures={ this.props.prefectures } />
        <div className={ 'c-form-label u-mt-20' }>
          <label>受注/粗利</label>
        </div>
         <div className={ 'c-table3 u-mt-20' }>
          <table>
            <thead>
              <tr>
                <th>受注額</th>
                <th>原価</th>
                <th>粗利</th>
                <th>粗利率</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ this.state.project_price }円</td>
                <td>{ this.state.work_price }円</td>
                <td>{ this.state.project_price - this.state.work_price }円</td>
                <td>{ (Number(this.state.work_price) / Number(this.state.project_price)) * 100 }%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
