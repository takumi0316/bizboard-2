import React, { createRef, Fragment }  from 'react'

// import Component
import ClientSearch         from '../utilities/client_search'
import HomeDivision         from './home_division'
import Subject              from './subject/index.jsx'
import CustomerInformation  from './customer_information'
import SalesDepartment      from './sales_department'
import CaseDetails          from './case_details'
import PaymentDetails       from './payment_details'
import ButtonsBelow         from './buttons_below'
import ItemTables           from './item_tables'
import Loading              from '../loading'
import AddProject           from './project_search'

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

    super(props)

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    this.googleDriveFolderRef = createRef()
    this.state = {
      quote_id: props.quote.id || '',
      quote: props.quote,
      quote_subject: props.quote.subject || '',
      quote_projects: props.quote_projects,
      company: props.company || '',
      division: props.division || '',
      home_division: props.home_division,
      client: props.client || '',
      work: props.work || '',
      invoice: props.invoice || '',
      user_id: props.user_id || '',
      quote_type: props.quote.quote_type || 'contract',
      quote_number: props.quote.quote_number || '',
      tax_type: props.quote.tax_type || 'taxation',
      tax: props.quote.tax || 1.08,
      payment_terms:  props.quote.payment_terms || 'postpaid',
      reception: props.quote.reception || 'acceptance',
      deliver_type: props.quote.deliver_type || 'seat',
      deliver_at: props.quote.deliver_at || new Date(year, month, day),
      discount: props.quote.discount || 0,
      temporary_price: props.quote.temporary_price || 0,
      profit_price: props.quote.profit_price || 0,
      channel: props.quote.channel || '',
      issues_date: props.quote.issues_date,
      expiration: props.quote.expiration,
      deliver_type_note: props.quote.deliver_type_note || '',
      delivery_note_date: props.quote.delivery_note_date,
      price: props.quote.price ? props.quote.price : 0,
      date: props.quote.date,
      show: props.quote.discount === 0 ? false : true,
      show_quote_number: props.quote.channel == 'bpr_erp' ? true : false,
      task: props.task || '',
      users: props.users,
      prefectures: props.prefectures,
      remarks: props.quote.remarks || '',
      memo: props.quote.memo || '',
      drive_folder_id: props.quote.drive_folder_id || '',
      itemStatus: true,
    }
  }

  /**
   *  公開日時を適用するcallback
   *  @version 2018/06/10
   *
   */
  setDeliverAt = datetime => this.setState({ deliver_at: datetime.datetime });

  /**
   *  見積もり作成日時を適用するcallback
   *  @version 2018/06/10
   *
   */
  setDate = datetime => this.setState({ date: datetime.datetime });

  /**
   *  見積もり期日を適用するcallback
   *  @version 2018/06/10
   *
   */
  setExpiration = datetime => this.setState({ expiration: datetime.datetime });

  /**
   *  見積もり発行日を適用するcallback
   *  @version 2018/06/10
   *
   */
  setIssuesDate = datetime => this.setState({ issues_date: datetime.datetime });

  /**
   *  納品日を適用するcallback
   *  @version 2018/06/10
   *
   */
  setDeliveryNoteDate = datetime => this.setState({ delivery_note_date: datetime.datetime });

  /**
  * タイトルの変更処理
  * @version 2019/12/20
  *
  */
  setSubject = subject => this.setState({ quote_subject: subject });

  /**
  *
  * @version 2019/12/20
  *
  */
  setDeliverType = deliver_type => this.setState({ deliver_type: deliver_type });

  /**
  *
  * @version 2019/12/20
  *
  */
  setDeliverTypeNote = deliver_type_note => this.setState({ deliver_type_note: deliver_type_note });

  /**
   *
   * @version 2019/12/20
   *
   */
  setChannel = channel => this.setState({ channel: channel, show_quote_number: channel == 'bpr_erp' });

  /**
   *
   * @version 2019/12/20
   *
   */
  setQuoteNumber = quote_number => this.setState({ quote_number: quote_number });

  /**
   *
   * @version 2019/12/20
   *
   */
  setReception = reception => this.setState({ reception: reception });

  /**
   *
   * @version 2019/12/20
   *
   */
  setQuoteType = quote_type => this.setState({ quote_type: quote_type });

  /**
   *
   * @version 2019/12/23
   *
   */
  setRemarks = remarks => this.setState({ remarks: remarks });

  /**
   *
   * @version 2019/12/23
   *
   */
  setMemo = memo => this.setState({ memo: memo });

  /**
   *
   * @version 2019/12/23
   *
   */
  setDriveFolderId = drive_folder_id => this.setState({ drive_folder_id: drive_folder_id });

  /**
   *
   * @version 2019/12/23
   *
   */
  setPaymentTerms = payment_terms => this.setState({ payment_terms: payment_terms });

  /**
   *
   * @version 2019/12/23
   *
   */
  setTaxType = tax_type => this.setState({ tax_type: tax_type });


  /**
   *  モーダルを表示する
   *  @version 2019/12/23
   *
   */
  setShow = bool => {

    const undoPrice = Number(this.state.price) + Number(this.state.discount);
    bool ? this.setState({ show: bool }) : this.setState({ show: bool, discount: 0, price: undoPrice });
  };

  /**
   * 値引き金額を変更
   * @version 2019/12/23
   *
   */
  setDiscount = discount => {

    const castDiscount = Number(discount);
    const copyProjects = this.state.quote_projects.slice();
    let price = 0;
    copyProjects.map((project) => {

      price = price + Number(project.price);
    });
    price = price - castDiscount;
    this.setState({ discount: castDiscount, price: price });
  };

  /**
   * 利益額を変更
   * @version 2019/12/23
   *
   */
  setProfitPrice = profit_price => this.setState({ profit_price: Number(profit_price) });

  /**
   * 合計金額を変更
   * @version 2019/12/23
   *
   */
  setTemporaryPrice = temporary_price => {

    const castTemporaryPrice = Number(temporary_price);
    const copyProjects = this.state.quote_projects.slice();
    let price = 0;
    copyProjects.map((project) => {

      price = price + Number(project.price);
    });
    price = castTemporaryPrice;
    this.setState({ temporary_price: castTemporaryPrice, price: price });
  };

  /**
   * Unitを変更する
   * @version 2020/06/01
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
   * @version 2020/06/01
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
   * 品目名更新
   * @version 2020/06/01
   *
   */
  setName = (passIndex, name) => {

    let quote_projects = this.state.quote_projects.slice();
    quote_projects[passIndex].name = name;
    this.setState({ quote_projects: quote_projects });
  };

  /**
   * 品目備考更新
   * @version 2020/06/01
   *
   */
  setQuoteRemarks = (passIndex, remarks) => {

    let quote_projects = this.state.quote_projects.slice();
    quote_projects[passIndex].remarks = remarks;
    this.setState({ quote_projects: quote_projects });
  };

  /**
   * 品目検索中？　品目中じゃない？
   * @version 2020/01/20
   *
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
  reorderQuoteProjects = props => this.setState({ quote_projects: props });

  /**
   *  バリデーション
   *  @version 2018/06/10
   *
   */
  validation = () => {

    let message = [];
    let deliver_type = this.state.deliver_type;
    deliver_type = deliver_type === 'location' || deliver_type === 'other' && this.state.deliver_type_note === '';
    const deliver_type_note = this.state.deliver_type_note === '';

    if(!this.state.quote_subject) message.push('案件タイトルを入力してください。');

    if(this.state.quote.lock) message.push('案件がロックされている為、更新できません。');

    if(deliver_type) {

      if(deliver_type_note) message.push('納品方法を記入してください');
    };

    return message;
  };

  /**
   *  お客様選択時
   *  @version 2018/06/10
   *
   */
  applyClient = client => this.setState({
      client: client.client,
      company: client.company,
      division: client.division,
    });

  /**
   * 売り上げ部署
   * @version 2020/05/25
   * @param division
   *
   */
  applyHomeDivision = division => this.setState({ home_division: division });

  addQuoteProject = () => {

    const quote_projects = JSON.parse(JSON.stringify(this.state.quote_projects));
 
    const uid = new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16)
 
    const field = {
      'id': '',
      'uid': uid,
      'project_id': '',
      'quote_id': this.state.quote_id,
      'name': '',
      'unit_price': '',
      'unit': '',
      'price': '',
      'project_name': '',
      'remarks': ''
    }

    quote_projects.push(field)
 
    this.setState({ quote_projects: quote_projects })
  }

  /**
   *  品目選択時
   *  @version 2018/06/10
   *
   */
  applyProject = (project, index) => {

    let quote_projects = JSON.parse(JSON.stringify(this.state.quote_projects))
    const price = (Number(this.state.price) - Number(quote_projects[index].price)) + Number(project.price)
 
    quote_projects[index].project_id = project.id
    quote_projects[index].name = project.name
    quote_projects[index].remarks = project.note || ''
    quote_projects[index].unit_price = project.price
    quote_projects[index].price = project.price

    this.setState({ quote_projects: quote_projects, price: price })
  }

  /**
   * 指定されたprojectを消す
   * @version 2019/12/23
   *
   */
  projectDestroy = e => {

    e.preventDefault();
    const index = e.target.value;
    window.confirmable({ icon: 'warning', message: '本当に削除しますか？', callback: () => {

      const quote_projects = JSON.parse(JSON.stringify(this.state.quote_projects));
      quote_projects.splice(index, 1);
      const delProjectPrice = Number(this.state.quote_projects[index].price);
      const minusPrice = Number(this.state.price) - delProjectPrice;

      if(!this.state.quote_projects[index].id) this.setState({ quote_projects: quote_projects, price: minusPrice }, () => window.alertable({ icon: 'success', message: '削除しました。' }));

      if(this.state.quote.id && this.state.quote_projects[index].id) {

        const url = `/quote_projects/${this.state.quote_projects[index].id}`;
        const request = window.xhrRequest.delete(url);
        request.then(res => {

          if(res.data.status == 'success') this.setState({ quote_projects: quote_projects, price: minusPrice }, () => window.alertable({ icon: 'success', message: '削除しました。' }) );
          if(res.data.status != 'success') window.alertable({ icon: 'error', message: '品目の削除に失敗しました。' });
        }).catch(err => window.alertable({ icon: 'error', message: err }));
      };
    }});
  };

  /**
   *  登録処理
   *  @version 2018/06/10
   *
   */
  onSubmit = e => {

    e.preventDefault();

    this.loadingRef.start();

    const messages = this.validation();

    // エラーが存在する場合
    if(messages.length > 0) {

      window.alertable({ icon: 'error', message: messages.join('\n') });
      return false;
    };

    this.setState({ is_update: !this.state.is_update });
    let price = 0;
    this.state.quote_projects.map(quote_project => price += Number(quote_project.price));

    const field = new FormData();

    field.append('quote[id]', this.state.quote_id);
    field.append('quote[division_id]', this.state.home_division ? this.state.home_division.id : this.props.division_id);
    field.append('quote[company_division_client_id]', this.state.client ? this.state.client.id : '');
    field.append('quote[subject]', this.state.quote_subject || '');
    field.append('quote[quote_type]', this.state.quote_type);
    field.append('quote[quote_number]', this.state.quote_number || '');
    field.append('quote[temporary_price]', this.state.temporary_price || '');
    field.append('quote[profit_price]', this.state.profit_price);
    field.append('quote[tax_type]', this.state.tax_type);
    field.append('quote[tax]', this.state.tax);
    field.append('quote[payment_terms]', this.state.payment_terms);
    field.append('quote[channel]', this.state.channel);
    field.append('quote[date]', this.state.date || '');
    field.append('quote[issues_date]', this.state.issues_date || '');
    field.append('quote[expiration]', this.state.expiration || '');
    field.append('quote[delivery_note_date]', this.state.delivery_note_date || '');
    field.append('quote[deliver_at]', this.state.deliver_at || '');
    field.append('quote[reception]', this.state.reception);
    field.append('quote[remarks]', this.state.remarks);
    field.append('quote[memo]', this.state.memo);
    field.append('quote[drive_folder_id]', this.state.drive_folder_id);
    field.append('quote[user_id]', this.props.user_id);
    field.append('quote[discount]', this.state.discount);
    field.append('quote[price]', this.state.discount === 0 ? price : price - this.state.discount);
    field.append('quote[deliver_type]', this.state.deliver_type)
    if(!this.props.quote.drive_folder_id && this.googleDriveFolderRef.current !== null) field.append('quote[google_drive_exist]', this.googleDriveFolderRef.current.value)
    this.state.quote_projects.map(project => {

      field.append('quote[quote_projects_attributes][][id]', project.id);
      field.append('quote[quote_projects_attributes][][project_id]', project.project_id);
      field.append('quote[quote_projects_attributes][][quote_id]', project.quote_id);
      field.append('quote[quote_projects_attributes][][name]', project.name);
      field.append('quote[quote_projects_attributes][][remarks]', project.remarks);
      field.append('quote[quote_projects_attributes][][unit_price]', project.unit_price);
      field.append('quote[quote_projects_attributes][][unit]', project.unit);
      field.append('quote[quote_projects_attributes][][price]', project.price);
      field.append('quote[quote_projects_attributes][][project_name]', project.project_name);
    });

    // 納品方法
    field.append('quote[deliver_type_note]', this.state.deliver_type === 'location' || this.state.deliver_type === 'other' ? this.state.deliver_type_note : '')

    const request = this.state.quote_id ? window.xhrRequest.put(this.props.action, field) : window.xhrRequest.post(this.props.action, field)
    request.then(res => {

      if(res.data.status === 'success') {

        if(this.state.quote_id) {

          this.setState({ price: price, quote: { ...this.state.quote, drive_folder_id: res.data.drive_folder_id } }, () => {
            window.alertable({ icon: 'success', message: '案件を更新しました。', close_callback: () => this.loadingRef.finish() })
          })
        }

        // 編集ページへリダイレクト
        if(!this.state.quote_id) {

          const redirect = () => location.href = `${res.data.quote.id}/edit`
          window.alertable({ icon: 'success', message: '案件を作成しました。', close_callback: () => redirect() })
        }
      }

      if(res.data.status !== 'success') {

        // エラー文
        console.log(res.data.message)
        window.alertable({ icon: 'error', message: `案件の${ this.state.quote_id ? '更新' : '作成' }に失敗しました。` })
      }
    }).catch(err => window.alertable({ icon: 'error', message: err, close_callback: this.loadingRef.finish() }))
  };

  /**
   *  表示処理
   *  @version 2018/06/10
   *
   */
  render() {
    return (
      <Fragment>
        <Subject subject={ this.state.quote_subject } setSubject={ this.setSubject } />
        <CustomerInformation client={ this.state.client } company_name={ this.state.company ? this.state.company.name : '' }
                             division_name={ this.state.division ? this.state.division.name : '' } applyClient={ this.applyClient }
                             users={ this.state.users } prefectures={ this.state.prefectures }
        />
        <div className='u-mt-15'>
          <ClientSearch applyClient={ this.applyClient } path={ '/company_division_clients.json?name=' } notFound={ 'お客様情報が見つかりませんでした' } typeName={ 'お客様情報を検索' }/>
        </div>
        <SalesDepartment home_division={ this.state.home_division } />
        <div className='u-mt-10'>
          <HomeDivision applyHomeDivision={ this.applyHomeDivision } />
        </div>
        <CaseDetails date={ this.state.date } temporary_price={ this.state.temporary_price } setDate={ this.setDate } setIssuesDate={ this.setIssuesDate }
                     google_drive_folder_id={ this.state.quote.drive_folder_id || '' } googleDriveFolderRef={ this.googleDriveFolderRef } issues_date={ this.state.issues_date } setExpiration={ this.setExpiration }
                     expiration={ this.state.expiration } setDeliveryNoteDate={ this.setDeliveryNoteDate }
                     delivery_note_date={ this.state.delivery_note_date } deliver_at={ this.state.deliver_at } deliver_type={ this.state.deliver_type }
                     deliver_type_note={ this.state.deliver_type_note } channel={ this.state.channel } quote_number={ this.state.quote_number }
                     quote_type={ this.state.quote_type } reception={ this.state.reception } show_quote_number={ this.state.show_quote_number }
                     setDeliverTypeNote={ this.setDeliverTypeNote } setChannel={ this.setChannel } setQuoteNumber={ this.setQuoteNumber }
                     setDeliverType={ this.setDeliverType } setDeliverAt={ this.setDeliverAt } setReception={ this.setReception }
                     setQuoteType={ this.setQuoteType } setTemporaryPrice={ this.setTemporaryPrice }
        />
        <ItemTables quote_projects={ this.state.quote_projects } quote_id={ this.state.quote_id } setName={ this.setName } setQuoteRemarks={ this.setQuoteRemarks }
                    setUnitPrice={ this.setUnitPrice } setUnit={ this.setUnit } projectDestroy={ this.projectDestroy } itemStatus={ this.state.itemStatus }
                    reorderQuoteProjects={ this.reorderQuoteProjects } applyProject={ this.applyProject }
        />
        <div className='u-mt-15'>
          <button className='c-btnMain-standard' onClick={ this.addQuoteProject }>行を追加</button>
          { /* <AddProject applyProject={ this.applyProject } prefectures={ this.props.prefectures } /> */ }
          <div className={ `u-ml-10 ${ this.state.itemStatus ? 'c-btnMain-standard' : 'c-btnMain-primaryA'}` } onClick={ e => this.setItemStatus(e, !this.state.itemStatus) }>{ this.state.itemStatus ? '品目を移動させる' : '移動を終了する' }</div>
        </div>
        <PaymentDetails quote={ this.state.quote } discount={ this.state.discount } profit_price={ this.state.profit_price } tax_type={ this.state.tax_type } remarks={ this.state.remarks }
                        memo={ this.state.memo } payment_terms={ this.state.payment_terms } price={ this.state.price } drive_folder_id={ this.state.drive_folder_id }
                        show={ this.state.show } setPaymentTerms={ this.setPaymentTerms } setTaxType={ this.setTaxType }
                        setRemarks={ this.setRemarks } setMemo={ this.setMemo } setDriveFolderId={ this.setDriveFolderId } setShow={ this.setShow } setDiscount={ this.setDiscount } setProfitPrice={ this.setProfitPrice }
        />
        <ButtonsBelow quote={ this.state.quote } work={ this.state.work } invoice={ this.state.invoice } quotation={ this.props.quotation } delivery_note={ this.props.delivery_note } task={ this.state.task } onSubmit={ this.onSubmit }/>
        <Loading ref={ node => this.loadingRef = node }/>
      </Fragment>
    );
  };
};
