import React, { Fragment }  from 'react'

// Ajax
import Request from 'superagent';
require('superagent-rails-csrf')(Request);

// import Component
import ClientSearch 				from '../utilities/client_search';
import ProjectSearch 				from './project_search';
import HomeDivision 				from './home_division';
import Subject 							from './subject/index.jsx';
import CustomerInformation	from './customer_information';
import SalesDepartment			from './sales_department';
import CaseDetails					from './case_details';
import PaymentDetails				from './payment_details';
import ButtonsBelow					from './buttons_below';
import ItemTables           from './item_tables';

/**
 *  記事エディター
 *  @version 2018/06/10
 */
export default class QuoteEditor extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    this.state = {
			quote: props.quote,
			quote_subject: props.quote.subject,
      quote_projects: props.quote_projects,
      company: props.company,
      division: props.division,
      home_division: props.home_division,
      client: props.client,
      work: props.work,
      invoice: props.invoice,
      user_id: props.user_id || '',
      quote_type: props.quote.quote_type || 'contract',
      quote_number: props.quote.quote_number || null ,
      tax_type: props.quote.tax_type || 'taxation',
      tax: props.quote.tax || 1.08,
      payment_terms:  props.quote.payment_terms || 'postpaid',
      reception: props.quote.reception || 'acceptance',
      deliver_type: props.quote.deliver_type || 'seat',
      deliver_at: props.quote.deliver_at || new Date(year, month, day),
      discount: props.quote.discount || 0,
      temporary_price: props.quote.temporary_price || 0,
      date: props.quote.date,
      channel: props.quote.channel || '',
      issues_date: props.quote.issues_date,
      expiration: props.quote.expiration,
      delivery_note_date: props.quote.delivery_note_date,
      price: props.quote.price ? props.quote.price : 0,
      date: props.quote.date,
      show: props.quote.discount === 0 || props.quote.discount === null ? false : true,
      show_quote_number: props.quote.channel == 'bpr_erp' ? true : false,
			task: props.task,
			users: props.users,
			prefectures: props.prefectures,
			deliver_type_note: props.quote.deliver_type_note || '',
			remarks: props.quote.remarks || '',
			memo: props.quote.memo || '',
			itemStatus: true
    };
  };

  /**
   *  公開日時を適用するcallback
   *  @version 2018/06/10
   */
  setDeliverAt = (datetime) => {

    this.setState({
      deliver_at: datetime.datetime,
    });
  };

  /**
   *  見積もり作成日時を適用するcallback
   *  @version 2018/06/10
   */
  setDate = (datetime) => {

    this.setState({
      date: datetime.datetime,
    });
  };

  /**
   *  見積もり期日を適用するcallback
   *  @version 2018/06/10
   */
  setExpiration = (datetime) => {

    this.setState({
      expiration: datetime.datetime,
    });
	};

  /**
   *  見積もり発行日を適用するcallback
   *  @version 2018/06/10
   */
  setIssuesDate = (datetime) => {

    this.setState({
      issues_date: datetime.datetime,
    });
  };

  /**
   *  納品日を適用するcallback
   *  @version 2018/06/10
   */
  setDeliveryNoteDate = (datetime) => {

    this.setState({
      delivery_note_date: datetime.datetime,
    });
	};

	/**
	* タイトルの変更処理
	* @version 2019/12/20
	*/
	setSubject = (subject) => {

		this.setState({ quote_subject: subject });
	};

	/**
	*
	* @version 2019/12/20
	*/
	setDeliverType = (deliver_type) => {

		this.setState({ deliver_type: deliver_type });
	};

	/**
	*
	* @version 2019/12/20
	*/
	setDeliverTypeNote = (deliver_type_note) => {

		this.setState({ deliver_type_note: deliver_type_note });
	};

	/**
	 *
	 * @version 2019/12/20
	 */
	setChannel = (channel) => {

		const result = channel == 'bpr_erp' ? true : false;
    this.setState({ channel: channel, show_quote_number: result });
	};

	/**
	 *
	 * @version 2019/12/20
	 */
	setQuoteNumber = (quote_number) => {

		this.setState({ quote_number: quote_number });
	};

	/**
	 *
	 * @version 2019/12/20
	 */
	setReception = (reception) => {

		this.setState({ reception: reception });
	};

	/**
	 *
	 * @version 2019/12/20
	 */
	setQuoteType = (quote_type) => {

		this.setState({ quote_type: quote_type });
	};

	/**
	 *
	 * @version 2019/12/23
	 */
	setRemarks = (remarks) => {

		this.setState({ remarks: remarks });
	};

	/**
	 *
	 * @version 2019/12/23
	 */
	setMemo = (memo) => {

		this.setState({ memo: memo });
	};

	/**
	 *
	 * @version 2019/12/23
	 */
	setPaymentTerms = (payment_terms) => {

		this.setState({ payment_terms: payment_terms });
	};

	/**
	 *
	 * @version 2019/12/23
	 */
	setTaxType = (tax_type) => {

		this.setState({ tax_type: tax_type });
	};


  /**
   *  モーダルを表示する
   *  @version 2019/12/23
   */
  setShow = (bool) => {

		const undoPrice = Number(this.state.price) + Number(this.state.discount);
    bool ? this.setState({ show: bool }) : this.setState({ show: bool, discount: 0, price: undoPrice });
	};

  /**
   * 値引き金額を変更
   * @version 2019/12/23
   */
  setDiscount = (discount) => {

		const castDiscount = Number(discount);
		const	copyProjects = this.state.quote_projects.slice();
    let price = 0;
    copyProjects.map((project) => {

      price = price + Number(project.price);
    });
    price = price - castDiscount;
    this.setState({ discount: castDiscount, price: price });
	};

  /**
   * 合計金額を変更
   * @version 2019/12/23
   */
  setTemporaryPrice = (temporary_price) => {

    const castTemporaryPrice = Number(temporary_price);
    const	copyProjects = this.state.quote_projects.slice();
    let price = 0;
    copyProjects.map((project) => {

      price = price + Number(project.price);
    });
    price = castTemporaryPrice;
    this.setState({ temporary_price: castTemporaryPrice, price: price });
  };

  /**
   * Unitを変更する
   *
   */
  setUnitPrice = (passIndex, unitPrice) => {

  	if (unitPrice.match(/^([1-9]¥d*|0)(¥.¥d+)?$/)) {

      alert('半角数字以外を入力しないで下さい。');
      return false
    };

		let quote_projects = this.state.quote_projects.slice();
		let price = Number(this.state.price) - Number(quote_projects[passIndex].price);
		quote_projects[passIndex].unit_price = Number(unitPrice);
		quote_projects[passIndex].price = Number(quote_projects[passIndex].unit_price) * Number(quote_projects[passIndex].unit);
    price = Number(price) + Number(quote_projects[passIndex].price);
    this.setState({ quote_projects: quote_projects, price: price });
  };

  /**
   * Unitを変更する
   *
   */
  setUnit = (passIndex, unit) => {

    if (unit != 0) {

    	if (!unit.match(/^[0-9]+$/)) {

      	alert('半角数字以外を入力しないで下さい。');
				return false
			};

			let quote_projects = this.state.quote_projects.slice();
			let price = Number(this.state.price) - Number(quote_projects[passIndex].price);
			quote_projects[passIndex].unit = Number(unit);
			quote_projects[passIndex].price = Number(quote_projects[passIndex].unit_price) * Number(unit);
      price = Number(price) + Number(quote_projects[passIndex].price);
      this.setState({ quote_projects: quote_projects, price: price });
		} else {

			let quote_projects =  this.state.quote_projects.slice();
			let price = Number(this.state.price) - Number(quote_projects[passIndex].price);
			quote_projects[passIndex].unit = Number(unit);
			quote_projects[passIndex].price = Number(quote_projects[passIndex].unit_price) * Number(unit);
      price = Number(price) + Number(quote_projects[passIndex].price);
      this.setState({ quote_projects: quote_projects, price: price });
		};
	};

  /**
   *
   *
   */
  setName = (passIndex, name) => {

    let quote_projects = this.state.quote_projects.slice();
		quote_projects[passIndex].name = name;
    this.setState({ quote_projects: quote_projects });
  };

  /**
   *
   *
   */
  setQuoteRemarks = (passIndex, remarks) => {

    let quote_projects = this.state.quote_projects.slice();
		quote_projects[passIndex].remarks = remarks;
    this.setState({ quote_projects: quote_projects });
	};

	/**
	 *
	 * @version 2020/01/20
	 */
	setItemStatus = (e, bool) => {

		e.preventDefault();

		const isQuoteProjects = this.state.quote_projects.length > 0 ? true : false;
		if(!isQuoteProjects) {

			alert('品目を追加してください！');
			return false;
		};

		this.setState({ itemStatus: bool });
	};

	/**
	 * 品目を並べ直す
	 * @version 2020/01/20
	 */
	reorderQuoteProjects = props => {

		this.setState({ quote_projects: props });
	};

  /**
   *  バリデーション
   *  @version 2018/06/10
   */
  validation = () => {

		let message = [];
		let deliver_type = this.state.deliver_type;
		deliver_type = deliver_type === 'location' || deliver_type === 'other' && this.state.deliver_type_note === '';
		const deliver_type_note = this.state.deliver_type_note === '';

    if(this.state.quote_subject === '') message.push('案件タイトルを入力してください。');

    if(this.state.quote.lock) message.push('案件がロックされている為に更新できません。');

		if(deliver_type) {

			if(deliver_type_note) message.push('納品方法を記入してください');
		};

    return message;
  };

  onPDF = (passQuoteId) => {

    location.href = `/quotes/` + passQuoteId + '/wicked_pdf';
  }

  /**
   *  登録処理
   *  @version 2018/06/10
   */
  onSubmit = (e) => {

		e.preventDefault();
    let arrayRails = [];
    let field = {};
    let messages = this.validation();
    // エラーが存在する場合
    if (messages.length > 0) {

      alert(messages.join('\n'));
      return false;
    };

    this.state.quote_projects.map((project) => {

    	arrayRails.push(JSON.stringify({
      	'projectSpecificationId': project.id ? project.id : 'null',
        'projectSpecificationName': project.name,
        'projectSpecificationRemarks': project.remarks,
        'projectSpecificationUnitPrice': project.unit_price,
        'projectSpecificationUnit': project.unit,
        'projectSpecificationPrice': project.price,
        'projectName': project.project_name,
        'projectId': project.project_id,
			}));
		});

    field = {
      'id': this.state.quote.id === null ? 'null' : this.state.quote.id,
      'quote[division_id]': this.state.home_division ? this.state.home_division.id : this.props.division_id,
      'quote[company_division_client_id]': this.state.client ? this.state.client.id : this.props.quote.company_division_client_id || '',
      'quote[subject]': this.state.quote_subject || '',
      'quote[quote_type]': this.state.quote_type,
      'quote[quote_number]': this.state.quote_number || '',
      'quote[temporary_price]': this.state.temporary_price,
      'quote[tax_type]': this.state.tax_type,
      'quote[tax]': this.state.tax,
      'quote[payment_terms]': this.state.payment_terms,
      'quote[channel]': this.state.channel,
      'quote[date]': this.state.date || '',
      'quote[issues_date]': this.state.issues_date || '',
      'quote[expiration]': this.state.expiration || '',
      'quote[delivery_note_date]': this.state.delivery_note_date || '',
      'quote[deliver_at]': this.state.deliver_at || '',
      'quote[reception]': this.state.reception,
      'quote[deliver_type]': this.state.deliver_type,
      'quote[remarks]': this.state.remarks,
      'quote[memo]': this.state.memo,
      'quote[user_id]': this.props.user_id,
      'quote[discount]': this.state.discount,
      'quote[price]': this.state.price,
      'specifications[]': arrayRails,
    };

    // 納品方法
    if (this.state.deliver_type == 'location' || this.state.deliver_type == 'other') {

      field['quote[deliver_type_note]'] = this.state.deliver_type_note || '';
		};

    let url = '/quotes';
    Request
      .post(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if (!err && res.body.status == 'success') {
          if (!this.props.quote.id) {

						alert('案件情報を作成しました');
            this.setState({ quote: res.body.quote, quote_projects: res.body.quote_projects });
            location.href = `${res.body.quote.id}/edit`;
          } else {

            alert('案件情報を更新しました');
            this.setState({ quote: res.body.quote, quote_projects: res.body.quote_projects });
          }
        } else {

          alert('案件情報の保存に失敗しました。');
          this.setState({ quote: res.body.quote, quote_projects: res.body.quote_projects });
        };
      });
  };

  /**
   *  お客様選択時
   *  @version 2018/06/10
   */
  applyClient = (client) => {

    this.setState({
      client: client,
      company: client.company,
      division: client.division,
    });
  }

  applyHomeDivision = (division) => {

    this.setState({ home_division: division })
  };

  /**
   *  品目選択時(案件が既に存在している場合)
   *  @version 2018/06/10
   */
  applyProject = (project) => {

		const price = Number(this.state.price) + Number(project.price);
		const url = '/quote_projects';
		let quote_projects = this.state.quote_projects.slice();
		let mergeProjects = [];
		project.specifications.map((specification) => {

			const field = {
				'project_id': project.id,
				'quote_id': this.state.quote.id,
				'name': specification.name,
				'unit_price': specification.unit_price,
				'unit': 1,
				'price': specification.price,
				'project_name': specification.project_name ? specification.project_name : '',
				'remarks': specification.remarks ? specification.remarks : ''
			};
			mergeProjects.push(JSON.stringify({ ...field }));
		});
		const field = {
			'quote_id': this.state.quote.id,
			'projects[]': mergeProjects
		};

		Request
		  .post(url)
			.field(field)
			.set('X-Requested-With', 'XMLHttpRequest')
			.setCsrfToken()
			.end((err, res) => {
				if(!err && res.body.status === 'success') {

					let applyMergeProjects = [...quote_projects];
					res.body.projects.map((project) => {

						applyMergeProjects.push({ ...project });
					});
					this.setState({ quote_projects: applyMergeProjects, price: price });
			  } else {

					alert(res.body.message);
				};
			});
	};

  /**
   *  品目選択時(新規案件の場合)
   *  @version 2018/06/10
   */
  applyNewProject = (project) => {

		const price = Number(this.state.price) + Number(project.price);
		let quote_projects = this.state.quote_projects.slice();
		let mergeProjects = [...quote_projects];
		project.specifications.map((specification) => {

			const strong = 1000;
			// uniqueなidを生成
			const id = new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16);
			const field = {
				'id': id,
				'project_id': project.id,
				'name': specification.name,
				'unit_price': specification.unit_price,
				'unit': specification.unit,
				'price': specification.price,
				'project_name': specification.project_name ? specification.project_name : '',
				'remarks': specification.remarks ? specification.remarks : ''
			};
			mergeProjects = [...mergeProjects, { ...field }];
		});

		this.setState({ quote_projects: mergeProjects, price: price });
  };

  /**
   * 指定されたprojectを消す
   * @version 2019/12/23
   */
  _projectDestroy = (e, passIndex) => {

		e.preventDefault();
		const result = window.confirm('本当に消しますか？');
		if(result) {

			alert('消します！');
		} else {

			return
		};

		let quote_projects = this.state.quote_projects.slice();
		quote_projects.splice(passIndex, 1);
		const delProjectPrice = Number(this.state.quote_projects[passIndex].price);
		let minusPrice = Number(this.state.price) - delProjectPrice;

    if(this.state.quote.id !== null && this.state.quote_projects[passIndex].id !== null) {

      let url = '/quote_projects/' + this.state.quote_projects[passIndex].id;
      let field = { 'quote_id': this.state.quote.id, 'quote_price': minusPrice };
      Request
      .del(url)
      .field(field)
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {
        if ( !err && res.body.status === 'success' ) {

          this.setState({ quote_projects: quote_projects, price: minusPrice });
        } else {

          alert('正常に削除できませんでした');
        }
      });
    } else {

      this.setState({ quote_projects: quote_projects, price: minusPrice });
    };
  };

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render() {
    return (
      <Fragment>
    		<Subject subject={ this.state.quote_subject } setSubject={ this.setSubject } />
    		<CustomerInformation	client={ this.state.client } company_name={ this.state.company ? this.state.company.name : '' }
    													division_name={ this.state.division ? this.state.division.name : '' } applyClient={ this.applyClient }
    													users={ this.state.users } prefectures={ this.state.prefectures }
    		/>
    		<div className='u-mt-15'>
          <ClientSearch applyClient={ this.applyClient } path={ '/company_division_clients.json?search=' } notFound={ 'お客様情報が見つかりませんでした' } typeName={ 'お客様情報を検索' }/>
      	</div>
    		<SalesDepartment home_division={ this.state.home_division } />
        <div className='u-mt-10'>
          <HomeDivision applyHomeDivision={ this.applyHomeDivision } />
        </div>
    		<CaseDetails	date={ this.state.date } temporary_price={ this.state.temporary_price } setDate={ this.setDate } setIssuesDate={ this.setIssuesDate }
    									issues_date={ this.state.issues_date } setExpiration={ this.setExpiration }
    									expiration={ this.state.expiration } setDeliveryNoteDate={ this.setDeliveryNoteDate }
    									delivery_note_date={ this.state.delivery_note_date } deliver_at={ this.state.deliver_at } deliver_type={ this.state.deliver_type }
    									deliver_type_note={ this.state.deliver_type_note }channel={ this.state.channel } quote_number={ this.state.quote_number }
    									quote_type={ this.state.quote_type }reception={ this.state.reception } show_quote_number={ this.state.show_quote_number }
    									setDeliverTypeNote={ this.setDeliverTypeNote } setChannel={ this.setChannel } setQuoteNumber={ this.setQuoteNumber }
    									setDeliverType={ this.setDeliverType } setDeliverAt={ this.setDeliverAt } setReception={ this.setReception }
    									setQuoteType={ this.setQuoteType } setTemporaryPrice={ this.setTemporaryPrice }
    		/>
    		<ItemTables quote_projects={ this.state.quote_projects } setName={ this.setName } setQuoteRemarks={ this.setQuoteRemarks }
    								setUnitPrice={ this.setUnitPrice } setUnit={ this.setUnit } _projectDestroy={ this._projectDestroy } itemStatus={ this.state.itemStatus }
    								reorderQuoteProjects={ this.reorderQuoteProjects }
    		/>
        <div className='u-mt-15'>
          <ProjectSearch applyProject={ this.state.quote.id ? this.applyProject : this.applyNewProject } prefectures={ this.props.prefectures } />
    			<div className={ `u-ml-10 ${ this.state.itemStatus ? 'c-btnMain-standard' : 'c-btnMain-primaryA'}` } onClick={ e => this.setItemStatus(e, !this.state.itemStatus) }>{ this.state.itemStatus ? '品目を移動させる' : '移動を終了する' }</div>
        </div>
    		<PaymentDetails discount={ this.state.discount } tax_type={ this.state.tax_type } remarks={ this.state.remarks }
    										memo={ this.state.memo } payment_terms={ this.state.payment_terms } price={ this.state.price }
    										show={ this.state.show } setPaymentTerms={ this.setPaymentTerms } setTaxType={ this.setTaxType }
    										setRemarks={ this.setRemarks } setMemo={ this.setMemo } setShow={ this.setShow } setDiscount={ this.setDiscount }
    		/>
    		<ButtonsBelow quote={ this.state.quote } work={ this.state.work } invoice={ this.state.invoice }
    									task={ this.state.task } onSubmit={ this.onSubmit }
    		/>
      </Fragment>
    );
  }
}
