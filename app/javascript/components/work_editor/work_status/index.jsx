import React from 'react';

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

    if (window.confirm('ステータスを変更しますがよろしいですか？')) {

      const url = '/works/' + this.state.work_id;
      const field = new FormData();
      field.append('work[status]', status_type);
      const request = window.xhrRequest.put(url, field);
      request.then(res => {

        if(res.data.status == 'success') {

          this.setState({ work_status: res.data.work.status });
        } else {

          window.alert(res.data.message);
        };
      }).catch(err => {

        window.alert(err);
      });

      window.alert('ステータスを変更しました。');
    }else{

      window.alert('キャンセルしました');
    };
 };

  render() {
    return(
      <div className='c-flex__end'>
        <div>
          { this.state.work_status === 'draft' ?
            <button className='c-btnMain' onClick={ e => this.onUpdate(e, this.state.status_draft) }>未作業</button>
            :
            <button className='c-btnMain' onClick={ e => this.onUpdate(e, this.state.status_draft) }>未作業</button>
          }
        </div>
        <div className='u-ml-10'>
          { this.state.work_status === 'working' ?
            <button className='c-btnMain' onClick={ e => this.onUpdate(e, this.state.status_working) }>作業中</button>
            :
            <button className='c-btnMain' onClick={ e => this.onUpdate(e, this.state.status_working) }>作業中</button>
          }
        </div>
        <div className='u-ml-10'>
          { this.state.work_status === 'delivered' ?
            <button className='c-btnMain' onClick={ e => this.onUpdate(e, this.state.status_deliverd) }>発送済み</button>
            :
            <button className='c-btnMain' onClick={ e => this.onUpdate(e, this.state.status_deliverd) }>発送済み</button>
          }
        </div>
        <div className='u-ml-10'>
          { this.state.work_status === 'completed' ?
            <button className='c-btnMain' onClick={ e => this.onUpdate(e, this.state.status_complete) }>納品済み</button>
            :
            <button className='c-btnMain' onClick={ e => this.onUpdate(e, this.state.status_complete) }>納品済み</button>
          }
        </div>
      </div>
    )
  }

}
