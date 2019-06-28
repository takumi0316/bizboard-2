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

      expendables: this.props.details,
      startDate: new Date(),
    }

  }

  onIntCheck = (index, funcName) => {

		switch (funcName) {
    	case 'number_of_copies':

				if (document.getElementById('price' + index).value.match(/[^0-9]+/)) {

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

		let arrayWorkDetails = this.state.work_details.slice();
		arrayWorkDetails.forEach((detail, i) => {

			if ( i === index ) {

				detail.order_contents = document.getElementById('order_contents' + index).value
			}
		});
		this.setState({ work_details: arrayWorkDetails })
	}

	onChangeDeliverMethod = (index) => {

		let arrayWorkDetails = this.state.work_details.slice();
		arrayWorkDetails.forEach((detail, i) => {

			if ( i === index ) {

				detail.deliver_method = document.getElementById('deliver_method' + index).value
			}
		});
		this.setState({ work_details: arrayWorkDetails })
	}

	onChangeSpecification = (index) => {

		let arrayWorkDetails = this.state.work_details.slice();
		arrayWorkDetails.forEach((detail, i) => {

			if ( i === index ) {

				detail.specification = document.getElementById('specification' + index).value
			}
		});
		this.setState({ work_details: arrayWorkDetails })
	}

	onChangeDeliverAt = (index) => {

		let arrayWorkDetails = this.state.work_details.slice();
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
		this.setState({ work_details: arrayWorkDetails })
	}

	onChangeClientName = (index) => {

		let arrayWorkDetails = this.state.work_details.slice();
		arrayWorkDetails.forEach((detail, i) => {

			if ( i === index ) {

				detail.client_name = document.getElementById('client_name' + index).value
			}
		});
		this.setState({ work_details: arrayWorkDetails })
	}

	onChangeNumberOfCopies = (index) => {

		let arrayWorkDetails = this.state.work_details.slice();
		arrayWorkDetails.forEach((detail, i) => {

			if ( i === index ) {

				detail.number_of_copies = document.getElementById('number_of_copies' + index).value
			}
		});
		this.setState({ work_details: arrayWorkDetails });
  }

	onChangeCost = (index) => {

		let arrayWorkDetails = this.state.work_details.slice();
		arrayWorkDetails.forEach((detail, i) => {

			if ( i === index ) {

				detail.estimated_cost = document.getElementById('estimated_cost' + index).value
			}
		});
		this.setState({ work_details: arrayWorkDetails });
  }

	onChangeCount = (index) => {

		let arrayWorkDetails = this.state.work_details.slice();
		arrayWorkDetails.forEach((detail, i) => {

			if ( i === index ) {

				detail.count = Number(document.getElementById('count' + index).value)
			}
		});
		this.setState({ work_details: arrayWorkDetails });
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

    let url = '/work_details';
    let field = {
      'work_detail[work_id]': this.props.work_id,
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
					const detail_length = this.state.work_details.length;
					for ( let i = 0; i < detail_length; i++ ) {

						let replace_datetime =  document.getElementById('deliver_at' + i).value;
        		replace_datetime = replace_datetime.replace(/年/g, '/');
        		replace_datetime = replace_datetime.replace(/月/g, '/');
        		replace_datetime = replace_datetime.replace(/日/g, '');
        		replace_datetime = replace_datetime.replace(/時/g, ':');
        		replace_datetime = replace_datetime.replace(/分/g, '');
						field = {
         		 'work_id': Number(this.props.work_id),
         		 'id': Number(document.getElementById('detail_id' + i).value),
         		 'order_contents': document.getElementById('order_contents' + i).value,
         		 'deliver_method': document.getElementById('deliver_method' + i).value,
         		 'specification': document.getElementById('specification' + i).value,
         		 'deliver_at': replace_datetime,
         		 'client_name': document.getElementById('client_name' + i).value,
         		 'number_of_copies': document.getElementById('number_of_copies' + i).value,
         		 'count': document.getElementById('count' + i).value,
         		 'estimated_cost': document.getElementById('estimated_cost' + i).value,
						 'actual_cost': document.getElementById('actual_cost' + i).innerHTML,
						};
						detail_array.push(field);
					}
					detail_array.push(res.body.detail)
          this.setState({ work_details: detail_array });
        } else {
          this.setState({ work_details: res.body.detail });
        }
      });

  }

  onWorkDetailDestroy = (e, id, index) => {

    let url = '/work_details/' + id;
    let field = {
      'work_detail[work_id]': this.props.work_id,
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
					const detail_length = this.state.work_details.length;
					for ( let i = 0; i < detail_length; i++ ) {

						if(i != index){
							let replace_datetime =  document.getElementById('deliver_at' + i).value;
        			replace_datetime = replace_datetime.replace(/年/g, '/');
        			replace_datetime = replace_datetime.replace(/月/g, '/');
        			replace_datetime = replace_datetime.replace(/日/g, '');
        			replace_datetime = replace_datetime.replace(/時/g, ':');
        			replace_datetime = replace_datetime.replace(/分/g, '');
							field = {
         			 'work_id': Number(this.props.work_id),
         			 'id': Number(document.getElementById('detail_id' + i).value),
         			 'order_contents': document.getElementById('order_contents' + i).value,
         			 'deliver_method': document.getElementById('deliver_method' + i).value,
         			 'specification': document.getElementById('specification' + i).value,
         			 'deliver_at': replace_datetime,
         			 'client_name': document.getElementById('client_name' + i).value,
         			 'number_of_copies': document.getElementById('number_of_copies' + i).value,
         			 'count': document.getElementById('count' + i).value,
         			 'estimated_cost': document.getElementById('estimated_cost' + i).value,
							 'actual_cost': document.getElementById('actual_cost' + i).innerHTML,
							};
							detail_array.push(field);
						}
					}

          this.setState({ work_details: detail_array });
        } else {
          this.setState({ work_details: res.body.detail });
        }
      });
  }

  onWorkDetailUpdate = () => {

    let array_rails = [];
    let field = {};
    let actual_cost = 0;
    let count = this.state.work_details.length;
    if( count !== 0 ){
      for(var i = 0; i < count; i++) {
        let replace_datetime =  document.getElementById('deliver_at' + i).value;
        replace_datetime = replace_datetime.replace(/年/g, '/');
        replace_datetime = replace_datetime.replace(/月/g, '/');
        replace_datetime = replace_datetime.replace(/日/g, '');
        replace_datetime = replace_datetime.replace(/時/g, ':');
        replace_datetime = replace_datetime.replace(/分/g, '');
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

    let url = '/work_details';
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        let type = 'work_detail_cost';
        if (!err && res.body.status === "success") {

          this.setState({ work_details: res.body.detail }, this.onWorkNoticesUpdate(actual_cost, type));
        } else if (!err && res.body.status === 'nothing') {

          this.onWorkNoticesUpdate(actual_cost, type);
        } else {

          this.setState({ work_details: res.body.detail });
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
        { this.state.show ?

          <div className={ 'u-mt-10' }>
            <button className={ 'c-btnMain-standard' } id='finish' onClick={ this.onWorkDetailUpdate }>作業詳細[編集終了]</button>
          </div>
          :
          <div className={ 'u-mt-10' }>
            <button className={ 'c-btnMain-standard u-mr-10' } id='editable' onClick={ this._editable }>作業詳細[編集]</button>
            <a className={ 'c-btnMain-primaryB' } href={ '/works/' + this.props.work_id + '/directions'   } target='_blank'>指示書発行[社内用]</a>
          </div>
        }
        { this.state.show ?

          <React.Fragment>
            <div className={ 'u-mt-10 c-table' }>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>No.</th>
                    <th>ステータス</th>
                    <th>名前</th>
                    <th>金額</th>
                    <th>日付</th>
                  </tr>
                </thead>
                <div className={ 'c-table' }>
                  <table>
                    <thead>
                      <tr>
                        <th>会社名</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={ 'u-va-top' }>
                          <select key={ detail.subcontractor + index } onChange={ e => this.onChangeClientName(index) } className={ 'c-form-select__work-show' } id={ 'subcontractor' + index } value={ detail.subcontractor }>
                            { this.props.subcontractor.map((subcontractor, index) => {
                              const key = 'subcontractor' + index;
                              return(
                                <option key={ key } value={ subcontractor['name'] }>{ subcontractor['id'] }</option>
                              );
                            }) }
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <tbody>
                  { this.state.expendables.map((detail, index) => {
                    const key = 'detail' + index;
                    return (
											<React.Fragment key={ key }>
                      	<tr>
                        	<td className={ 'u-va-top' }><button key={ 'button' + index } className={ 'c-btnMain2-primaryA' } onClick={ e => this.onConfirm(e, detail.id, index) }>−</button></td>
                        	<td className={ 'u-va-top' }>{ index + 1 }<input key={ detail.id + index } type='hidden' id={ 'expendable_id' + index } defaultValue={ detail.id }/></td>
                          <td className={ 'u-va-top' }>
                            <select key={ detail.status + index } onChange={ e => this.onChangeClientName(index) } className={ 'c-form-select__work-show' } id={ 'status' + index } value={ detail.status }>
                              { Object.keys(ENUM_STATUS).map((item, index) =>{
                                const key = 'status-' + index;
                                return(
                                  <option {...{key}} value={item}>{ENUM_STATUS[item]}</option>
                                );
                              }) }
                            </select>
                          </td>
													<td className={ 'u-va-top' }><textarea key={ detail.name + index } id={ 'deliver_method' + index } className={ 'c-form-textarea__work-show-input__textarea' } onBlur={ e => this.onSetStateBlur('onChangeDeliverMethod', index) } rows='3' cols='30' placeholder={ 'AIデータ, アウトライン済み1ファイル' } defaultValue={ detail.deliver_method } /></td>
													<td className={ 'u-va-top' }><textarea key={ detail.price + index } id={ 'specification' + index } className={ 'c-form-textarea__work-show-input__textarea' } onBlur={ e => this.onSetStateBlur('onChangeSpecification', index) } rows='3' cols='30' placeholder={ '表紙:ダイヤボード' } defaultValue={ detail.specification } /></td>
													<td><input key={ detail.date + index } className={ 'c-form-text__work-show-input1' } onBlur={ e => this.onSetStateBlur('onChangeDeliverAt', index) } type='text' id={ 'date' + index } defaultValue={ Dayjs(detail.deliver_at).format('YYYY年MM月DD日') }/></td>
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
          :
          <React.Fragment>
            <div className={ 'u-mt-10 c-table' }>
              <table>
                <thead>
                  <tr>
                    <th className={ 'u-va-middle' }>No.</th>
                    <th className={ 'u-va-middle' }>発注内容</th>
                    <th className={ 'u-va-middle' }>入稿物</th>
                    <th className={ 'u-va-middle' }>仕様</th>
                    <th className={ 'u-va-middle' }>期日</th>
                    <th className={ 'u-va-middle' }>担当者</th>
                    <th>原稿<br />枚数</th>
                    <th>部数<br />数量</th>
                    <th className={ 'u-va-middle' }>原単価(税抜)</th>
                    <th className={ 'u-va-middle' }>実績原価(税抜)</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.work_details.map((detail, index) => {
                    const key = 'work_details' + index;
                    return (
                      <tr key={ key }>
                        <td className={ 'u-va-top u-ta-center' }>{ index + 1 }</td>
                        { this.contentOrder(detail.order_contents) }
                        { this.contentDeliver(detail.deliver_method) }
                        { this.contentSpecification(detail.specification) }
                        <td className={ 'u-va-top u-ta-center' }>{ detail.deliver_at === null ? detail.deliver_at : Dayjs(detail.deliver_at).format('YYYY年MM月DD日') }</td>
                        <td className={ 'u-va-top u-ta-center' }>{ detail.client_name }</td>
                        <td className={ 'u-va-top u-ta-right' }>{ detail.number_of_copies }</td>
                        <td className={ 'u-va-top u-ta-right' } id={ 'count' + index }>{ detail.count }</td>
                        <td className={ 'u-va-top u-ta-right' }>{ detail.estimated_cost }円</td>
                        <td className={ 'u-va-top u-ta-right' }>{ detail.actual_cost }円</td>
                      </tr>
                    );
                  }) }
                </tbody>
              </table>
            </div>
          </React.Fragment>
          }
      </div>
    );
  }
}
