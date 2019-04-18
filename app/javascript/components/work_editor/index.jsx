import React from 'react'
import AddSubcontractor from './add_subcontractor'
import WorkDetails from './work_details'

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

      price: props.price,
      work_detail_cost: props.work_detail_actual_cost,
      subcontractor_detail_cost: props.subcontractor_detail_actual_cost
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
          this.setState({ price: res.body.price });
        } else {
          this.setState({ price: res.body.price });
        }
      });

  }

  /**
   * 表示処理
   */
  render() {
    return (
       <div>
         <WorkDetails details={ this.props.details } category={ this.props.category } work_id={ this.props.work_id } user_id={ this.props.user_id } users={ this.props.users } applyPrice= { ::this.applyPrice } />
         <AddSubcontractor work_subcontractors={ this.props.work_subcontractors } subcontractor_details={ this.props.subcontractor_details } work_id={ this.props.work_id } subcontractors={ this.props.subcontractors } divisions={ this.props.divisions } clients={ this.props.clients } applyPrice={ ::this.applyPrice } />
         <div className={ 'c-attention u-mt-20' }>
           <span>受注/粗利</span>
         </div>
          <div className={ 'c-table3 u-mt-20' }>
           <table>
             <thead>
               <tr>
                 <th>受注額</th>
                 <th>単価</th>
                 <th>粗利</th>
                 <th>粗利率</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td>円</td>
                 <td>{ this.state.price }円</td>
                 <td>円</td>
                 <td>%</td>
               </tr>
             </tbody>
           </table>
          </div>
        </div>
    );
  }
}