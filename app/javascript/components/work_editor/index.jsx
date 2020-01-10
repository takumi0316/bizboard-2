import React, { Fragment }	from 'react';

// import components
import WorkDivisionInfo	from './work_division_info';
import AddSubcontractor	from './add_subcontractor';
import WorkDetails			from './work_details';
import SalesTable				from './sales_table'; 

// Ajax
import Request from 'superagent';
require('superagent-rails-csrf')(Request);

export default class WorkEditor extends React.Component {

	/**
   *  コンストラクタ
   *
   */
  constructor (props) {

    super(props);

    this.state = {
			work: props.work,
			division: props.division,
			work_details: props.work_details,
			work_subcontractors: props.work_subcontractors,
      project_price: props.project_price,
      work_detail_cost: props.work_detail_actual_cost,
			subcontractor_detail_cost: props.subcontractor_detail_actual_cost,
			work_subcontractors_iterate: props.work_subcontractors_iterate
		};
	};
	
	/**
	 * 請求合算値変更
	 * @versions 2019/12/27
	 */
  setPrice = () => {

    const url = '/works/' + this.state.work.id;
    const field = {
      'price': this.state.work_detail_cost + this.state.subcontractor_detail_cost,
      'status': 'price',
		};

    Request
      .put(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === 'success') {

					let work = Object.assign({}, JSON.parse(JSON.stringify(this.state.work)));
					work = { ...work, price: res.body.price };
          this.setState({ work: work });
        } else {

          this.setState({ work_price: res.body.price });
        };
      });
	};

	/**
	 * 作業詳細作成
	 * @versions 2019/12/27
	 */
  onWorkDetailCreate = e => {

		e.preventDefault();
		let work_details = this.state.work_details.slice();
    let url = '/work_details';
    let field = {
      'work_detail[work_id]': this.state.work.id,
    };
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === "success") {

					work_details.push(res.body.detail);
          this.setState({ work_details: work_details });
        } else {

          this.setState({ work_details: work_details });
        }
      });
  };

	/**
	 * 作業詳細更新
	 * @versions 2019/12/27
	 */
  onWorkDetailUpdate = e => {

		let work_details = this.state.work_details.slice();
		let send_array = [];
		let field = {};
    let actual_cost = 0;
    let count = this.props.work_details.length;
    if(count !== 0){

			work_details.map((detail) => {
				send_array.push(JSON.stringify({ ...detail }));
				actual_cost = Number(actual_cost) + Number(detail.actual_cost);
			});
      field = {
        'work_detail_update[]': send_array,
        'work_detail[work_id]': '',
        'token': 'value',
        'work_id': this.state.work.id,
      };
    } else {
      field = {
        'work_detail_update[]': '',
        'work_detail[work_id]': '',
        'token': 'empty',
        'work_id': this.state.work.id,
      };
    };

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
	};
	
	/**
	 * 作業書備考更新
	 * @versions 2019/12/27
	 */
  onWorkNoticesUpdate = (actual_cost, type) => {

    let field = {};
    let url = '/works/' + this.state.work.id;
    field = {
      'work_id': this.state.work.id,
      'work_notices': this.state.work.notices,
      'status': 'notices',
		};
    Request
      .put(url)
      .field(field)
      .set('X-Request-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {

        if (!err && res.body.status === 'success') {

          this.setState({ show: false }, this.passedPrice(Number(actual_cost), type));
        };
      });
	};

	/**
	 * 作業書詳細消去
	 * @versions 2019/12/27
	 */
	onWorkDetailDestroy = (passIndex) => {

		let work_details = this.state.work_details.slice();
		work_details.splice(passIndex, 1);
    let url = '/work_details/' + this.state.work_details[passIndex].id;
    let field = {
      'work_detail[work_id]': this.state.work.id,
    };
    Request
      .del(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === "success") {

          this.setState({ work_details: work_details });
        } else {

          this.setState({ work_details: res.body.detail });
        }
      });
	};

	/**
	 * 
	 * @version 2020/01/09
	 * 
	 */
  workSubcontractorCreate = e => {

		e.preventDefault();

		let work_subcontractors_iterate = Object.assign(JSON.parse(JSON.stringify(this.state.work_subcontractors_iterate)));
    let url = '/work_subcontractors';
    let field = {
      'work_subcontractors[work_id]': this.state.work.id,
      'contents': 'create',
		};

    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if(!err && res.body.status == 'success') {

					const subcontractor = res.body.subcontractor;
					const copy = {
						id: subcontractor.id,
						client: null,
						division: null,
						subcontractor: null,
						order_date: subcontractor.order_date,
						delivery_date: subcontractor.delivery_date,
						delivery_destination: '',
						notices: '',
						details: null
					};
					work_subcontractors_iterate.push(copy);
          this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
        } else {

          this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
        };
      });
  };

	/**
	 * 新規作成
	 * @version 2020/01/09
	 * 
	 */
  workSubcontractorDetailCreate = (e, passIndex) => {

		e.preventDefault();
		let work_subcontractors_iterate = Object.assign(JSON.parse(JSON.stringify(this.state.work_subcontractors_iterate)));
    const url = '/work_subcontractor_details';
    const field = {
      'subcontractor_detail[subcontractor_id]': e.target.value,
      'work_id': this.state.work.id,
    };
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === "success") {

					work_subcontractors_iterate[passIndex].details.push(res.body.detail);
          this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
        } else {

          this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
        }
      });
  };

	/**
	 * 更新
	 * @version 2020/01/07
	 * 
	 */
  workSubcontractorDetailUpdate = () => {

		let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
		let send_array_details = [];
		let send_array_subcontractors = [];
    let field = {};
    let actual_cost = 0;

    if(work_subcontractors_iterate.length > 0) {
			work_subcontractors_iterate.map((subcontractor) => {
				subcontractor.details.map((detail) => {
	
					const result = detail.actual_cost ? true : false;
					if(!result) {
	
						window.confirm('空欄の実績原価が存在しています。半角数字を入力しなおしてください。');
						return false;
					};
	
					send_array_details.push(JSON.stringify({ ...detail }));
					actual_cost = Number(actual_cost) + Number(detail.actual_cost);
				});

				const id = subcontractor.id;
				const order_date = subcontractor.order_date;
				const delivery_date = subcontractor.delivery_date;
				const delivery_destination = subcontractor.delivery_destination;
				const notices = subcontractor.notices;
				send_array_subcontractors.push(JSON.stringify({ 
					id: id, order_date: order_date, delivery_date: delivery_date, delivery_destination: delivery_destination, notices: notices
				}));
			});

      field = {
				'subcontractor_details[]':                send_array_details,
				'subcontractors[]':                       send_array_subcontractors,
        'subcontractor_detail[subcontractor_id]': '',
        'token':                                  'value',
        'work_id':                                 this.state.work.id,
      };
    } else {
      field = {
        'subcontractor_detail[work_subcontractor_id]': '',
        'token':                                       'empty',
        'work_id':                                     this.props.work_id,
      };
    };

    const url = '/work_subcontractor_details';
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {

				const type = 'subcontractor_detail_cost';
        if (!err && res.body.status === "success") {

					this.setState({ show: false, work_subcontractors_iterate: res.body.work_subcontractors_iterate }, this.passedPrice(actual_cost, type));
        } else if (!err && res.body.status === 'nothing') {

          this.setState({ show: false });
        } else {

          this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
        };
      });
  };

	/**
	 * 削除
	 * @version 2020/01/09
	 * 
	 */
  workSubcontractorDetailDestroy = (e, passIndex, passIndex1) => {

		e.preventDefault();
		const result = this.windowConfirm();
		if(!result) {

			return false;
		};

		let subcontractors = [];
		let work_subcontractors_iterate = Object.assign([], JSON.parse(JSON.stringify(this.state.work_subcontractors_iterate)));
		work_subcontractors_iterate[passIndex].details.splice(passIndex1, 1);

		work_subcontractors_iterate.map((sub) => {
			const id = sub.id;
			const client = sub.client ? { ...sub.client } : null;
			const division = sub.division ? { ...sub.division } : null;
			const subcontractor = sub.subcontractor ? { ...sub.subcontractor } : null;
			const order_date = sub.order_date;
			const delivery_date = sub.delivery_date;
			const delivery_destination = sub.delivery_destination;
			const notices = sub.notices;
			const details = sub.details ? sub.details : null;
			subcontractors.push({ 
				id: id,
				client: client,
				division: division,
				subcontractor: subcontractor,
				order_date: order_date,
				delivery_date: delivery_date,
				delivery_destination: delivery_destination,
				notices: notices,
				details: details,
			});
		});

    const url = '/work_subcontractor_details/' + e.target.value;
    const field = { 
			'work_id': this.state.work.id,
		};
    Request
      .del(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === "success") {

					this.setState({ work_subcontractors_iterate: subcontractors });
        } else {

          this.setState({ work_subcontractors_iterate: subcontractors });
        };
      });
  };

	/**
	 * 外注先削除
	 * @version 2020/01/07
	 * 
	 */
  workSubcontractorDestroy = (e, passIndex) => {

		e.preventDefault();
		const result = this.windowConfirm();
		if(!result) {

			return false;
		};

		let work_subcontractors_iterate = Object.assign([], JSON.parse(JSON.stringify(this.state.work_subcontractors_iterate)));
		work_subcontractors_iterate.splice(passIndex, 1);

    const url = '/work_subcontractors/' + e.target.value;
		const field = { 'work_id': this.state.work.id };
		
    Request
      .del(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === 'success'){

          this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
        } else {

          this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
        };
      });
	};
	
	/**
	 * アラート処理
	 * @version 2020/01/07
	 * 
	 */
	windowConfirm = () => {

		const result = window.confirm('削除しますか？');
		if(!result) {

			window.confirm('キャンセルしました。');
			return false;
		};
		
		return true;
	};

	/**
   *  お客様選択時
   *  @version
   */
  applyClient = (client, passIndex) => {

		let work_subcontractors_iterate = Object.assign([], JSON.parse(JSON.stringify(this.state.work_subcontractors_iterate)));
		const id = work_subcontractors_iterate[passIndex].id;
    const url = '/work_subcontractors/' + id;
    const field = {
      'client': client.id,
      'contents': 'client',
      'work_id': this.state.work.id,
    };
    Request
      .put(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status === 'success') {

					work_subcontractors_iterate[passIndex].client        = res.body.client;
					work_subcontractors_iterate[passIndex].division      = res.body.division;
					work_subcontractors_iterate[passIndex].subcontractor = res.body.subcontractor;
          this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
        } else {

					this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
        };
      });
  };

  passedPrice = (price, type) => {

    if (type === 'work_detail_cost') {

      this.setState({ work_detail_cost: price });
    } else if (type === 'subcontractor_detail_cost') {

      this.setState({ subcontractor_detail_cost: price });
    }
    this.setPrice();
  }

  passedDivision = (division) => {

    let url = '/works/' + this.state.work.id;
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
	};

	/**
	 * Int正規表現
	 * 現状必要なし
	 * @versions 2019/12/26
	 */
	checkIntRegex = value => {

		const match_result = value.match(/[^0-9]+$/);
		if(match_result) this.callConfirm('半角数字以外を入力しないで下さい。');
	};

	/**
	 * 発注内容更新
	 * @versions 2019/12/26
	 */
	setDeOrderContents = (passIndex, value) => {

		let work_details = this.state.work_details.slice();
		work_details[passIndex].order_contents = value;
		this.setState({ work_details: work_details });
	};

	/**
	 * 入稿物更新
	 * @versions 2019/12/26
	 */
	setDeDeliverMethod = (passIndex, value) => {

		let work_details = this.state.work_details.slice();
		work_details[passIndex].deliver_method = value;
		this.setState({ work_details: work_details });
	};

	/**
	 * 仕様更新
	 * @versions 2019/12/26
	 */
	setDeSpecification = (passIndex, value) => {

		let work_details = this.state.work_details.slice();
		work_details[passIndex].specification = value;
		this.setState({ work_details: work_details });
	};

	/**
	 * 期日更新
	 * @versions 2019/12/26
	 */
	setDeDeliverAt = (passIndex, value) => {

		let work_details = this.state.work_details.slice();
		work_details[passIndex].deliver_at = value;
		this.setState({ work_details: work_details });
	};

	/**
	 * 担当者更新
	 * @versions 2019/12/26
	 */
	setDeClientName = (passIndex, value) => {

		let work_details = this.state.work_details.slice();
		work_details[passIndex].client_name = value;
		this.setState({ work_details: work_details });
	};

	/**
	 * 原稿枚数・合計金額更新
	 * @versions 2019/12/26
	 */
  setDeNumberOfCopies = (passIndex, value) => {

		let work_details = this.state.work_details.slice();
		const count = work_details[passIndex].count;
		const cost = work_details[passIndex].estimated_cost;
		const actual_cost = value * Number(count) * Number(cost);

		work_details[passIndex].actual_cost = actual_cost;
		work_details[passIndex].number_of_copies = value;
		this.setState({ work_details: work_details });
  };

	/**
	 * 部数数量・合計金額更新
	 * @versions 2019/12/26
	 */
	setDeCount = (passIndex, value) => {

		let work_details = this.state.work_details.slice();
		const number_of_copies = work_details[passIndex].number_of_copies;
		const cost = work_details[passIndex].estimated_cost;
		const actual_cost = Number(number_of_copies) * value * Number(cost);

		work_details[passIndex].count = value;
		work_details[passIndex].actual_cost = actual_cost;
		this.setState({ work_details: work_details });
	};

	/**
	 * 原単価・合計金額更新
	 * @versions 2019/12/26
	 */
	setDeCost = (passIndex, value) => {

		let work_details = this.state.work_details.slice();
		const number_of_copies = work_details[passIndex].number_of_copies;
		const count = work_details[passIndex].count;
		const actual_cost = Number(number_of_copies) * Number(count) * value;

		work_details[passIndex].actual_cost = actual_cost;
		work_details[passIndex].estimated_cost = value;
		this.setState({ work_details: work_details });
	};
	
	/**
	 * 特記事項更新
	 * @versions 2019/12/26
	 */
	setDeNotices = (value) => {

		let work = Object.assign([], this.state.work);
		work.notices = value;
		this.setState({ work: work });
	};

	/**
	 * 
	 * @version 2020/01/07
	 * 
	 */
	setOrderContents = (e, passIndex, passIndex1) => {

		let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
		work_subcontractors_iterate[passIndex].details[passIndex1].order_contents = e.target.value;
		this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
	};

	/**
	 * 
	 * @version 2020/01/07
	 * 
	 */
	setDeliverMethod = (e, passIndex, passIndex1) => {

		let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
		work_subcontractors_iterate[passIndex].details[passIndex1].deliver_method = e.target.value;
		this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
	};

	/**
	 * 
	 * @version 2020/01/07
	 * 
	 */
	setSpecification = (e, passIndex, passIndex1) => {

		let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
		work_subcontractors_iterate[passIndex].details[passIndex1].specification = e.target.value;
		this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
	};

	/**
	 * 
	 * @version 2020/01/07
	 * 
	 */
	setCount = (e, passIndex, passIndex1) => {

		let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
		work_subcontractors_iterate[passIndex].details[passIndex1].count = e.target.value;
		this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
	};

	/**
	 * 
	 * @version 2020/01/07
	 * 
	 */
	setNumberOfCopies = (e, passIndex, passIndex1) => {

		let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
		work_subcontractors_iterate[passIndex].details[passIndex1].number_of_copies = e.target.value;
		this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
	};

	/**
	 * 
	 * @version 2020/01/07
	 * 
	 */
	setActualCost = (e, passIndex, passIndex1) => {

		let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
		work_subcontractors_iterate[passIndex].details[passIndex1].actual_cost = e.target.value;
		this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
	};

	/**
	 * 
	 * @version 2020/01/07
	 * 
	 */
	setOrderDate = prop => {

		let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
		work_subcontractors_iterate[prop.index].order_date = prop.value;
	
		this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
	};

	/**
	 * 
	 * @version 2020/01/07
	 * 
	 */
	setDeliveryDate = prop => {

		let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
		work_subcontractors_iterate[prop.index].delivery_date = prop.value;
		this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
	};

	/**
	 * 
	 * @version 2020/01/08
	 * 
	 */
	setDeliveryDestination = (passIndex, value) => {

		let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
		work_subcontractors_iterate[passIndex].delivery_destination = value;
		this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
	};

	/**
	 * 
	 * @version 2020/01/08
	 * 
	 */
	setNotices = (passIndex, value) => {

		let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
		work_subcontractors_iterate[passIndex].notices = value;
		this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
	};

	
	/**
	 * htmlを埋め込む
	 * @version 2019/12/26
	 */
	setDangerHtml = (text, style) => {

		const setText = text ? text.replace(/\n/g, '<br />') : text;
		return(
			<div className={ `${style}` } dangerouslySetInnerHTML={{ __html: setText }}/>
		);
	};

  /**
   * 表示処理
   */
  render() {
    return (
      <Fragment>
				<WorkDivisionInfo division={ this.state.division } passedDivision={ this.passedDivision }/>
				<WorkDetails	work_notices={ this.state.work.notices } work_details={ this.state.work_details } 
											work_id={ this.state.work.id } user_id={ this.props.user_id } users={ this.props.users } 
											passedPrice={ this.passedPrice } setDeOrderContents={ this.setDeOrderContents } setDangerHtml={ this.setDangerHtml }
											setDeDeliverMethod={ this.setDeDeliverMethod } setDeSpecification={ this.setDeSpecification }
											setDeDeliverAt={ this.setDeDeliverAt } setDeClientName={ this.setDeClientName }
											setDeNumberOfCopies={ this.setDeNumberOfCopies } setDeCount={ this.setDeCount } 
											setDeCost={ this.setDeCost } setDeNotices={ this.setDeNotices } onWorkDetailUpdate={ this.onWorkDetailUpdate }
											onWorkDetailCreate={ this.onWorkDetailCreate } onWorkNoticesUpdate={ this.onWorkNoticesUpdate }
											onWorkDetailDestroy={ this.onWorkDetailDestroy }
				/>
				<AddSubcontractor	work_subcontractors={ this.state.work_subcontractors } subcontractor_details={ this.props.subcontractor_details } 
													work_id={ this.state.work.id } subcontractors={ this.props.subcontractors } divisions={ this.props.divisions } 
													clients={ this.props.clients } passedPrice={ this.passedPrice } users={ this.props.users } 
													prefectures={ this.props.prefectures } setDangerHtml={ this.setDangerHtml } work_subcontractors_iterate={ this.state.work_subcontractors_iterate }
													setOrderContents={ this.setOrderContents } setOrderContents={ this.setOrderContents } setDeliverMethod={ this.setDeliverMethod }
													setSpecification={ this.setSpecification } setCount={ this.setCount } setNumberOfCopies={ this.setNumberOfCopies }
													setActualCost={ this.setActualCost } setOrderDate={ this.setOrderDate } setDeliveryDate={ this.setDeliveryDate }
													setDeliveryDestination={ this.setDeliveryDestination } setNotices={ this.setNotices }
													workSubcontractorDetailDestroy={ this.workSubcontractorDetailDestroy } workSubcontractorCreate={ this.workSubcontractorCreate }
													workSubcontractorDetailCreate={ this.workSubcontractorDetailCreate } workSubcontractorDetailUpdate={ this.workSubcontractorDetailUpdate }
													workSubcontractorDestroy={ this.workSubcontractorDestroy } windowConfirm={ this.windowConfirm } applyClient={ this.applyClient }
				/>
				<SalesTable project_price={ this.state.project_price } work_price={ this.state.work.price }/>
      </Fragment>
    );
  };
};