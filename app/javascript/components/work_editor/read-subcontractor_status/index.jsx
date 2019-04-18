import React      from 'react'
import Style from './style.sass'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);


/**
 *  記事エディター
 *  @version
 */
export default class ReadSubcontractorStatus extends React.Component {


  constructor(props) {

    super(props);

    this.state = {

      subcontractor_status: this.props.status,
      subcontractor_id: this.props.id,
      status_draft: 0,
      status_deliverd: 10,
      status_complete: 20,
    }
  }

  render() {
    return(
      <div className={ Style.WorkStatus }>
        { this.state.subcontractor_status == 0 ?
          <button className={ 'c-btnMain-primaryC' }>見作業</button>
          :
          <button className={ 'c-btnMain-negative' }>見発注</button>

        }
        { this.state.subcontractor_status == 10 ?
          <button className={ 'c-btnMain-primaryC' }>発注済み</button>
          :
          <button className={ 'c-btnMain-negative' }>発注済み</button>
        }
        { this.state.subcontractor_status == 20 ?
        <button className={ 'c-btnMain-primaryC' }>納品済み</button>
        :
        <button className={ 'c-btnMain-negative' }>納品済み</button>
        }
      </div>
    );
  }

}
