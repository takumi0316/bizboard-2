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
		};
		
	};
	
	/**
	 * 請求合算値変更
	 * @versions 2019/12/27
	 */
  setPrice = () => {

    let url = '/works/' + this.state.work.id;
    let field = {
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

          this.setState({ work_price: res.body.price });
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
													prefectures={ this.props.prefectures } 
				/>
				<SalesTable project_price={ this.state.project_price } work_price={ this.state.work.price }/>
      </Fragment>
    );
  };
};