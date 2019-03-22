import React      from 'react'
import Style from './style.sass'
import PropTypes from 'prop-types'

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
      status_draft: 0,
      status_working: 10,
      status_deliverd: 20,
      status_complete: 30,
    }
  }

  onUpdate = (e, status_type) => {
    console.log('nannyaomae', status_type);

    let url = '/works/' + this.props.id; 
    let field = {
      'work[status]': status_type, 
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
          console.log(err)
          this.setState({ work_status: res.body.work });
        }
      });

 } 

  render() {
    return(
      <div className={ Style.WorkStatus }>
        { this.state.work_status === 'draft' ? 
          <div className={ Style.WorkStatus__color }><button onClick={ e => this.onUpdate(e, this.state.status_draft) }>見作業</button></div> 
            : 
          <button onClick={ e => this.onUpdate(e, this.state.status_draft) }>見作業</button>

        }
        { this.state.work_status === 'working' ? 
          <div className={ Style.WorkStatus__color }><button onClick={ e => this.onUpdate(e, this.state.status_working) }>作業中</button></div>
            : 
          <button onClick={ e => this.onUpdate(e, this.state.status_working) }>作業中</button> 
        }
        { this.state.work_status === 'deliverd' ?
          <div className={ Style.WorkStatus__color }><button onClick={ e => this.onUpdate(e, this.state.status_deliverd) }>発送済み</button></div> 
            : 
          <button onClick={ e => this.onUpdate(e, this.state.status_deliverd) }>発送済み</button> 
        }
        { this.state.work_status === 'complete' ? 
        <div className={ Style.WorkStatus__color }><button onClick={ e => this.onUpdate(e, this.state.status_complete) }>納品済み</button></div>
          :
        <button onClick={ e => this.onUpdate(e, this.state.status_complete) }>納品済み</button>
        }
      </div>
    );
  }

}
