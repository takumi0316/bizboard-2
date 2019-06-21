import React      from 'react'
import Style      from './style.sass'
// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

// datetime
import Dayjs from 'dayjs'
import { ENUM_STATUS } from './properties.es6'

/**
 *  記事エディター
 *  @version
 */
export default class ExpendablesEditor extends React.Component {

  /**
   *  コンストラクタ
   *  @version
   */
  constructor (props) {

    super(props);

    this.state = {

      expendable: props.expendable,
      divisions_id: props.division_id,
      subcontractors_id: props.subcontractor,
      status: props.expendable.status,
      name: props.expendable.name,
      price: props.expendable.price,
    }

  }

  onIntCheck = (index, funcName) => {

		switch (funcName) {
    	case 'number_of_copies':

				if (document.getElementById('number_of_copies' + index).value.match(/[^0-9]+/)) {

					window.confirm('半角数字以外を入力しないで下さい。')
				} else {

					return
				}
				break;
		}
	}

	onSetStateBlur = (funcName, index) => {

		switch (funcName) {
			case 'onChangeOrderContents':
				this.onChangeOrderContents(index);
				break;
			case 'onChangeDeliverMethod':
				this.onChangeDeliverMethod(index);
				break;
			case 'onChangeSpecification':
				this.onChangeSpecification(index);
				break;
			case 'onChangeDeliverAt':
				this.onChangeDeliverAt(index);
				break;
			case 'onChangeClientName':
				this.onChangeClientName(index);
				break;
			case 'onChangeNumberOfCopies':
				this.onChangeNumberOfCopies(index);
				break;
			case 'onChangeCost':
				this.onChangeCost(index);
				break;
    	case 'onChangeCount':
				this.onChangeCount(index);
				break;
		}
	}

	onChangeOrderContents = (index) => {

		let arrayWorkDetails = this.state.expendable.slice();
		arrayWorkDetails.forEach((detail, i) => {

			if ( i === index ) {

				detail.order_contents = document.getElementById('order_contents' + index).value
			}
		});
		this.setState({ expendable: arrayWorkDetails })
	}

	onChangeDeliverMethod = (index) => {

		let arrayWorkDetails = this.state.expendable.slice();
		arrayWorkDetails.forEach((detail, i) => {

			if ( i === index ) {

				detail.deliver_method = document.getElementById('deliver_method' + index).value
			}
		});
		this.setState({ expendable: arrayWorkDetails })
	}

	onChangeSpecification = (index) => {

		let arrayWorkDetails = this.state.expendable.slice();
		arrayWorkDetails.forEach((detail, i) => {

			if ( i === index ) {

				detail.specification = document.getElementById('specification' + index).value
			}
		});
		this.setState({ expendable: arrayWorkDetails })
	}

	onChangeDeliverAt = (index) => {

		let arrayWorkDetails = this.state.expendable.slice();
		arrayWorkDetails.forEach((detail, i) => {

			if ( i === index ) {

				let replace_datetime =  document.getElementById('deliver_at' + index).value;
   			replace_datetime = replace_datetime.replace(/年/g, '/');
   			replace_datetime = replace_datetime.replace(/月/g, '/');
   			replace_datetime = replace_datetime.replace(/日/g, '');
   			replace_datetime = replace_datetime.replace(/時/g, ':');
   			replace_datetime = replace_datetime.replace(/分/g, '');
				detail.deliver_at = replace_datetime
			}
		});
		this.setState({ expendable: arrayWorkDetails })
	}

	onChangeClientName = (index) => {

		let arrayWorkDetails = this.state.expendable.slice();
		arrayWorkDetails.forEach((detail, i) => {

			if ( i === index ) {

				detail.client_name = document.getElementById('client_name' + index).value
			}
		});
		this.setState({ expendable: arrayWorkDetails })
	}

	onChangeNumberOfCopies = (index) => {

		let arrayWorkDetails = this.state.expendable.slice();
		arrayWorkDetails.forEach((detail, i) => {

			if ( i === index ) {

				detail.number_of_copies = document.getElementById('number_of_copies' + index).value
			}
		});
		this.setState({ expendable: arrayWorkDetails });
  }

	onChangeCost = (index) => {

		let arrayWorkDetails = this.state.expendable.slice();
		arrayWorkDetails.forEach((detail, i) => {

			if ( i === index ) {

				detail.estimated_cost = document.getElementById('estimated_cost' + index).value
			}
		});
		this.setState({ expendable: arrayWorkDetails });
  }

	onChangeCount = (index) => {

		let arrayWorkDetails = this.state.expendable.slice();
		arrayWorkDetails.forEach((detail, i) => {

			if ( i === index ) {

				detail.count = Number(document.getElementById('count' + index).value)
			}
		});
		this.setState({ expendable: arrayWorkDetails });
  }

	  onConfirm = (e, detail_id, index) => {

    window.confirm('削除します。') ? this.onWorkDetailDestroy(e, detail_id, index) : alert('キャンセルしました。')
  }

  contentNotices = (work_notices) => {

    let replace_work_notices = '';
    work_notices !== null ? replace_work_notices = work_notices.replace(/\n/g, '<br />') : replace_work_notices = work_notices

    return (
      <React.Fragment>
        <td dangerouslySetInnerHTML={{ __html: replace_work_notices }} />
      </React.Fragment>
    );
  }

  contentOrder = (order_content) => {

    let replace_order_content = '';
    order_content !== null ? replace_order_content = order_content.replace(/\n/g, '<br />') : replace_order_content = order_content

    return (
      <React.Fragment>
        <td dangerouslySetInnerHTML={{ __html: replace_order_content }} />
      </React.Fragment>
    );
  }

  contentDeliver = (deliver_method) => {

    let replace_deliver_method = '';
    deliver_method !== null ? replace_deliver_method = deliver_method.replace(/\n/g, '<br />') : replace_deliver_method = deliver_method

    return (
      <React.Fragment>
        <td dangerouslySetInnerHTML={{ __html: replace_deliver_method }} />
      </React.Fragment>
    );
  }

  contentSpecification = (specification) => {

    let replace_specification = '';
    specification !== null ? replace_specification = specification.replace(/\n/g, '<br />') : replace_specification = specification

    return (
      <React.Fragment>
        <td dangerouslySetInnerHTML={{ __html: replace_specification }} />
      </React.Fragment>
    );
  }

  onWorkDetailCreate = () => {

    let url = '/expendable';
    let field = {
      'expendable[subcontractors_id]': this.props.subcontractors_id,
      'expendable[divisions_id]': this.props.division_id,
    };
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === "success") {

					let detail_array = [];
					let field = {};
					const detail_length = this.state.expendable.length;
					for ( let i = 0; i < detail_length; i++ ) {

						field = {
         		 'subcontractors_id': Number(this.props.subcontractors_id),
             'divisions_id': Number(this.props.division_id),
         		 'id': Number(document.getElementById('id' + i).value),
         		 'status': document.getElementById('status' + i).value,
         		 'name': document.getElementById('name' + i).value,
         		 'price': document.getElementById('price' + i).value,
						};
						detail_array.push(field);
					}
					detail_array.push(res.body.detail)
          this.setState({ expendable: detail_array });
        } else {
          this.setState({ expendable: res.body.detail });
        }
      });

  }

  onWorkDetailDestroy = (e, id, index) => {

    let url = '/expendable/' + id;
    let field = {
      'expendable[subcontractors_id]': this.props.subcontractors_id,
      'expendable[divisions_id]': this.props.division_id,
    };
    Request
      .del(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === "success") {
					let detail_array = [];
					let field = {};
					const detail_length = this.state.expendable.length;
					for ( let i = 0; i < detail_length; i++ ) {

						if(i != index){
              field = {
           		 'subcontractors_id': Number(this.props.subcontractors_id),
               'divisions_id': Number(this.props.division_id),
           		 'id': Number(document.getElementById('id' + i).value),
           		 'status': document.getElementById('status' + i).value,
           		 'name': document.getElementById('name' + i).value,
           		 'price': document.getElementById('price' + i).value,
  						};
							detail_array.push(field);
						}
					}

          this.setState({ expendable: detail_array });
        } else {
          this.setState({ expendable: res.body.detail });
        }
      });
  }

  onWorkDetailUpdate = () => {

    let array_rails = [];
    let field = {};
    let actual_cost = 0;
    let count = this.state.expendable.length;
    if( count !== 0 ){
      for(var i = 0; i < count; i++) {
        array_rails.push(JSON.stringify({
          'work_id': this.props.work_id,
          'id': document.getElementById('detail_id' + i).value,
          'order_contents': document.getElementById('order_contents' + i).value,
          'deliver_method': document.getElementById('deliver_method' + i).value,
          'specification': document.getElementById('specification' + i).value,
          'deliver_at': replace_datetime,
          'client_name': document.getElementById('client_name' + i).value,
          'number_of_copies': document.getElementById('number_of_copies' + i).value,
          'count': document.getElementById('count' + i).value,
          'estimated_cost': document.getElementById('estimated_cost' + i).value,
          'actual_cost': document.getElementById('actual_cost' + i).innerHTML,
        }));
        actual_cost = actual_cost + Number(document.getElementById('actual_cost' + i).innerHTML);
      }
      field = {
        'work_detail_update[]': array_rails,
        'work_detail[work_id]': '',
        'token': 'value',
        'work_id': this.props.work_id,
        };
    } else {
      field = {
        'work_detail_update[]': '',
        'work_detail[work_id]': '',
        'token': 'empty',
        'work_id': this.props.work_id,
      };
    }

    let url = '/expendable';
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        let type = 'work_detail_cost';
        if (!err && res.body.status === "success") {

          this.setState({ expendable: res.body.detail }, this.onWorkNoticesUpdate(actual_cost, type));
        } else if (!err && res.body.status === 'nothing') {

          this.onWorkNoticesUpdate(actual_cost, type);
        } else {

          this.setState({ expendable: res.body.detail });
        }
      });
  }

  onWorkNoticesUpdate = (actual_cost, type) => {

    let field = {};
    let url = '/works/' + this.props.work_id;
    field = {
      'work_id': this.props.work_id,
      'work_notices': document.getElementById('notices').value,
      'status': 'notices',
    };
    Request
      .put(url)
      .field(field)
      .set('X-Request-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {

        if (!err && res.body.status === 'success') {

          this.setState({ show: false, read_work_notices: res.body.notices , work_notices: res.body.notices }, this.props.applyPrice(Number(actual_cost), type));
        } else {

          this.setState({ work_notices: res.body.notices });
        }
      });
  }

  /**
   *  表示処理
   *  @version
   */
  render() {
    return (

      <div>
        <React.Fragment>
          <div className={ 'u-mt-10 c-table' }>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>No.</th>
                  <th>ステータス</th>
                  <th>品名</th>
                  <th>金額</th>
                </tr>
              </thead>
              <tbody>
                { this.state.expendable.map((detail, index) => {
                  const key = 'detail' + index;
                  return (
										<React.Fragment key={ key }>
                    	<tr>
                      	<td className={ 'u-va-top' }><button key={ 'button' + index } className={ 'c-btnMain2-primaryA' } onClick={ e => this.onConfirm(e, detail.id, index) }>−</button></td>
                      	<td className={ 'u-va-top' }>{ index + 1 }<input key={ detail.id + index } type='hidden' id={ 'detail_id' + index } defaultValue={ detail.id }/></td>
												<td className={ 'u-va-top' }><textarea key={ detail.order_contents + index } rows='3' cols='30' className={ 'c-form-text__work-show-input__textarea' } onBlur={ e => this.onSetStateBlur('onChangeOrderContents', index) } type='text' id={ 'order_contents' + index } defaultValue={ detail.order_contents } placeholder={ '図面製本' } /></td>
												<td className={ 'u-va-top' }><textarea key={ detail.deliver_method + index } id={ 'deliver_method' + index } className={ 'c-form-textarea__work-show-input__textarea' } onBlur={ e => this.onSetStateBlur('onChangeDeliverMethod', index) } rows='3' cols='30' placeholder={ 'AIデータ, アウトライン済み1ファイル' } defaultValue={ detail.deliver_method } /></td>
												<td className={ 'u-va-top' }><textarea key={ detail.specification + index } id={ 'specification' + index } className={ 'c-form-textarea__work-show-input__textarea' } onBlur={ e => this.onSetStateBlur('onChangeSpecification', index) } rows='3' cols='30' placeholder={ '表紙:ダイヤボード' } defaultValue={ detail.specification } /></td>
                    	</tr>
										</React.Fragment>
                  );
                }) }
                <tr>
                   <td colSpan='13'><button className={ 'c-btnMain2-primaryB' } onClick={ this.onWorkDetailCreate }>＋</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </React.Fragment>
      </div>
    );
  }
}
