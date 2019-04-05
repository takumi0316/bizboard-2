import React      from 'react'
import Style from './style.sass'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);


/**
 *  記事エディター
 *  @version 
 */
export default class Index extends React.Component {


  constructor(props) {

    super(props);

    this.state = {
      subcontractor_status: this.props.status,
      subcontractor_id: this.props.id,
      status_draft: 0,
      status_deliverd: 10,
      status_complete: 20,
    }
    console.log(props.id, props.status);
  }

  render() {
    return(
      <div className={ Style.WorkStatus }>
        { this.state.subcontractor_status === 'draft' ? 
          <div className={ Style.WorkStatus__color }><button>見作業</button></div> 
          : 
          <button>見発注</button>

        }
        { this.state.subcontractor_status === 'deliverd' ?
          <div className={ Style.WorkStatus__color }><button>発注済み</button></div> 
          : 
          <button>発注済み</button> 
        }
        { this.state.subcontractor_status === 'complete' ? 
        <div className={ Style.WorkStatus__color }><button>納品済み</button></div>
        :
        <button>納品済み</button>
        }
      </div>
    );
  }

}
