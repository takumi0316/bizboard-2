import React      from 'react'
import Style from './style.sass'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);


/**
 *  記事エディター
 *  @version
 */
export default class StatusVisualization extends React.Component {


  constructor(props) {

    super(props);

    this.state = {
      work_status: this.props.status,
      work_id: this.props.id,
      status_draft: 'draft',
      status_working: 'working',
      status_deliverd: 'delivered',
      status_complete: 'completed',
    }
  }

  onUpdate = (e, status_type) => {

    let url = '/works/' + this.state.work_id;
    let field = {
      'work[status]': status_type,
      'status': 'status',
    }

    Request
      .put(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === "success") {

          this.setState({ work_status: res.body.work });
        } else {

          this.setState({ work_status: res.body.work });
        }
      });

 }

  render() {
    return(
      <div className={ Style.WorkStatus }>
        { this.state.work_status === 'draft' ?
          <div><button className={ 'c-btnMain-primaryC' } onClick={ e => this.onUpdate(e, this.state.status_draft) }>未作業</button></div> 
            :
          <button className={ 'c-btnMain-negative' } onClick={ e => this.onUpdate(e, this.state.status_draft) }>未作業</button>

        }
        { this.state.work_status === 'working' ?
          <div><button className={ 'c-btnMain-primaryC' } onClick={ e => this.onUpdate(e, this.state.status_working) }>作業中</button></div>
            :
          <button className={ 'c-btnMain-negative' } onClick={ e => this.onUpdate(e, this.state.status_working) }>作業中</button> 
        }
        { this.state.work_status === 'delivered' ?
          <div><button className={ 'c-btnMain-primaryC' } onClick={ e => this.onUpdate(e, this.state.status_deliverd) }>発送済み</button></div>
            :
          <button className={ 'c-btnMain-negative' } onClick={ e => this.onUpdate(e, this.state.status_deliverd) }>発送済み</button> 
        }
        { this.state.work_status === 'completed' ?
        <div><button className={ 'c-btnMain-primaryC' } onClick={ e => this.onUpdate(e, this.state.status_complete) }>納品済み</button></div>
          :
        <button className={ 'c-btnMain-negative' } onClick={ e => this.onUpdate(e, this.state.status_complete) }>納品済み</button>
        }
      </div>
    );
  }

}
