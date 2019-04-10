import React      from 'react'
import Style from './style.sass'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);


/**
 *  記事エディター
 *  @version 
 */
export default class SubcontractorStatus extends React.Component {


  constructor(props) {

    super(props);

    this.state = {
      subcontractor_status: this.props.status,
      subcontractor_id: this.props.work_subcontractor_id,
      status_draft: 0,
      status_deliverd: 10,
      status_complete: 20,
    }
  }

  onUpdate = (e, status_type) => {

    let url = '/work_subcontractors/' + this.state.subcontractor_id; 
    let field = {
      'subcontractor[status]': status_type, 
      'contents': 'status',
    }

    Request
      .put(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === "success") {
          this.setState({ subcontractor_status: res.body.subcontractor_status });
          this.props.applyStatus(res.body.work_subcontractors);
        } else {
          this.setState({ subcontractor_status: res.body.subcontractor_status });
        }
      });

 } 

  render() {
    return(
      <div className={ Style.WorkStatus }>
        { console.log(this.state.subcontractor_status) }
        { this.state.subcontractor_status == 0 ? 
          <button className={ 'c-btnMain-primaryC' } onClick={ e => this.onUpdate(e, this.state.status_draft) }>見作業</button> 
          : 
          <button className={ 'c-btnMain-negative' } onClick={ e => this.onUpdate(e, this.state.status_draft) }>見作業</button>

        }
        { this.state.subcontractor_status == 10 ?
          <button className={ 'c-btnMain-primaryC' } onClick={ e => this.onUpdate(e, this.state.status_deliverd) }>発注済み</button> 
          : 
          <button className={ 'c-btnMain-negative' } onClick={ e => this.onUpdate(e, this.state.status_deliverd) }>発注済み</button> 
        }
        { this.state.subcontractor_status == 20 ? 
        <button className={ 'c-btnMain-primaryC' } onClick={ e => this.onUpdate(e, this.state.status_complete) }>納品済み</button>
        :
        <button className={ 'c-btnMain-negative' } onClick={ e => this.onUpdate(e, this.state.status_complete) }>納品済み</button>
        }
      </div>
    );
  }

}
