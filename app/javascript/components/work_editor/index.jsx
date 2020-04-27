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
   * 作業詳細作成
   * @versions 2019/12/27
   */
  onWorkDetailCreate = e => {

    e.preventDefault();

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    let work_details = this.state.work_details.slice();
    const field = new FormData();
    field.append('work_detail[work_id]', this.state.work.id);
    field.append('work_detail[count]', 0);
    field.append('work_detail[deliver_at]', new Date(year, month, day));
    field.append('work_detail[estimated_cost]', 0);
    field.append('work_detail[number_of_copies]', 0);
    field.append('work_detail[actual_cost]', 0);
    field.append('work_detail[client_name]', this.props.user_name);

    const url = '/work_details';
    const request = window.xhrRequest.post(url, field);
    request.then(res => {

      if(res.data.status == 'success') {

        work_details.push(res.data.work_detail);
        this.setState({ work_details: work_details }, () => {
          window.alertable({ icon: 'success', message: '作成しました。' });
        });
      };
      if(res.data.status != 'success') window.alertable({ icon: 'error', message: res.data.message });
    }).catch(err => {

      window.alertable({ icon: 'error', message: err });
    });
  };

  /**
   * 作業詳細更新
   * @versions 2019/12/27
   */
  onWorkDetailUpdate = e => {

    const work_details = this.state.work_details.slice();
    let actual_cost = 0;
    const field = new FormData();

    field.append('work[notices]', this.state.work.notices || '');

    work_details.forEach((detail) => {
      if(detail) {
        actual_cost = actual_cost + Number(detail.actual_cost);
        field.append('work[work_details_attributes][][id]', detail.id);
        field.append('work[work_details_attributes][][work_id]', detail.work_id);
        field.append('work[work_details_attributes][][order_contents]', detail.order_contents || '');
        field.append('work[work_details_attributes][][deliver_method]', detail.deliver_method || '');
        field.append('work[work_details_attributes][][specification]', detail.specification || '');
        field.append('work[work_details_attributes][][number_of_copies]', detail.number_of_copies);
        field.append('work[work_details_attributes][][count]', detail.count);
        field.append('work[work_details_attributes][][deliver_at]', detail.deliver_at);
        field.append('work[work_details_attributes][][client_name]', detail.client_name);
        field.append('work[work_details_attributes][][estimated_cost]', detail.estimated_cost);
        field.append('work[wokr_details_attributes][][actual_cost]', detail.actual_cost);
      };
    });

    const url = '/works/' + this.state.work.id;
    const request = window.xhrRequest.put(url, field);
    request.then(res => {

      if(res.data.status === 'success') {

        const type = 'work_detail_cost';
        const message = '更新しました。';
        this.passedPrice(actual_cost, type, message);
      };

      if(res.data.status != 'success') window.alertable({ icon: 'error', message: res.data.message });
    }).catch(err => {

      window.alertable({ icon: 'error', message: err });
    });
  };

  /**
   * 作業書詳細消去
   * @versions 2019/12/27
   */
  onWorkDetailDestroy = (index, e) => {

    let work_details = this.state.work_details.slice();
    work_details.splice(index, 1);

    const url = '/work_details/' + e.target.value;
    const request = window.xhrRequest.delete(url);
    request.then(res => {

      if(res.data.status === 'success') this.setState({ work_details: work_details }, () => {
          window.alertable({ icon: 'success', message: '削除しました。' });
        });

      if(res.data.status != 'success') window.alertable({ icon: 'error', message: res.data.message });
    }).catch(err => {

      window.alertable({ icon: 'error', message: err });
    });
  };

  /**
   * 作業外注作成
   * @version 2020/01/09
   *
   */
  workSubcontractorCreate = (e, state) => {

    e.preventDefault();

    if(state.subcontractor_id) {

      window.alertable({ icon: 'info', message: '編集中の作業外注を更新して下さい。' });
      return false;
    };

    let work_subcontractors_iterate = Object.assign(JSON.parse(JSON.stringify(this.state.work_subcontractors_iterate)));

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const field = new FormData();

    field.append('work_subcontractor[work_id]', this.state.work.id);
    field.append('work_subcontractor[order_date]', new Date(year, month, day));
    field.append('work_subcontractor[delivery_date]', new Date(year, month, day));
    const url = '/work_subcontractors';
    const request = window.xhrRequest.post(url, field);
    request.then(res => {
      if(res.data.status == 'success') {

        const subcontractor = res.data.subcontractor;
        const copy = {
          id: subcontractor.id,
          client: null,
          division: null,
          subcontractor: null,
          order_date: subcontractor.order_date,
          delivery_date: subcontractor.delivery_date,
          delivery_destination: '',
          notices: '',
          details: []
        };
        work_subcontractors_iterate.push(JSON.parse(JSON.stringify(copy)));
        this.setState({ work_subcontractors_iterate: work_subcontractors_iterate }, () => {
          window.alertable({ icon: 'success', message: '作成しました。' });
        });
      };

      if(res.data.status != 'success') window.alertable({ icon: 'error', message: res.data.message });
    }).catch(err => {

      window.alertable({ icon: 'error', message: error });
    });
  };

  /**
   * 作業外注更新
   * @version 2020/03/11
   *
   */
  workSubcontractorUpdate = (index, id) => {

    const work_subcontractors_iterate = Object.assign(JSON.parse(JSON.stringify(this.state.work_subcontractors_iterate)));
    const work_subcontractor = work_subcontractors_iterate[index];
    let actual_cost = 0;

    const field = new FormData();

    field.append('work_subcontractor[work_id]', this.state.work.id);
    field.append('work_subcontractor[subcontractor_division_client_id]', work_subcontractor.client.id);
    field.append('work_subcontractor[notices]', work_subcontractor.notices || '');
    field.append('work_subcontractor[order_date]',  work_subcontractor.order_date);
    field.append('work_subcontractor[delivery_date]',  work_subcontractor.delivery_date);
    field.append('work_subcontractor[delivery_destination]', work_subcontractor.delivery_destination || '');

    work_subcontractors_iterate.forEach((subcontractor, index1) => {
      if(subcontractor.details) {
        subcontractor.details.forEach((detail) => {
          actual_cost = actual_cost + Number(detail.actual_cost);
          if(index == index1) {

            field.append('work_subcontractor[details_attributes][][id]', detail.id);
            field.append('work_subcontractor[details_attributes][][work_subcontractor_id]', detail.work_subcontractor_id);
            field.append('work_subcontractor[details_attributes][][order_contents]', detail.order_contents || '');
            field.append('work_subcontractor[details_attributes][][deliver_method]', detail.deliver_method || '');
            field.append('work_subcontractor[details_attributes][][specification]', detail.specification || '');
            field.append('work_subcontractor[details_attributes][][count]', detail.count);
            field.append('work_subcontractor[details_attributes][][number_of_copies]', detail.number_of_copies);
            field.append('work_subcontractor[details_attributes][][actual_cost]', detail.actual_cost);
          };
        });
      };
    });

    const url = '/work_subcontractors/' + id;
    const request = window.xhrRequest.put(url, field);
    request.then(res => {
      if(res.data.status === 'success') {

        const type = 'subcontractor_detail_cost';
        this.passedPrice(actual_cost, type);
        window.alertable({ icon: 'success', message: '更新しました。' });
      };

      if(res.data.status != 'success') window.alertable({ icon: 'error', message: res.data.message });
    }).catch(err => {

      window.alertable({ icon: 'error', message: error });
    });
  };

  /**
   * 外注先削除
   * @version 2020/01/07
   *
   */
  workSubcontractorDestroy = (e, index, state, setState) => {

    e.preventDefault();

    const result = this.windowConfirm();
    if(!result) return false;

    let work_subcontractors_iterate = Object.assign([], JSON.parse(JSON.stringify(this.state.work_subcontractors_iterate)));
    work_subcontractors_iterate.splice(index, 1);
    let actual_cost = 0;

    work_subcontractors_iterate.forEach((subcontractor) => {
      if(subcontractor.details) {
        subcontractor.details.forEach((detail) => {
          actual_cost = actual_cost + Number(detail.actual_cost);
        });
      };
    });

    const url = '/work_subcontractors/' + e.target.value;
    const request = window.xhrRequest.delete(url);
    request.then(res => {
      if(res.data.status === 'success') {

        const type = 'subcontractor_detail_cost';
        const message = '削除しました。';
        setState({ ...state, subcontractor_id: '' });
        this.setState({ work_subcontractors_iterate: work_subcontractors_iterate }, this.passedPrice(actual_cost, type, message));
      };

      if(res.data.status != 'success') window.alertable({ icon: 'error', message: res.data.message });
    }).catch(err => {

      window.alertable({ icon: 'error', message: err });
    });
  };

  /**
   * 新規作成
   * @version 2020/01/09
   *
   */
  workSubcontractorDetailCreate = (e, index) => {

    e.preventDefault();

    let work_subcontractors_iterate = Object.assign(JSON.parse(JSON.stringify(this.state.work_subcontractors_iterate)));
    const url = '/work_subcontractor_details';

    const field = new FormData();

    field.append('work_subcontractor_detail[work_subcontractor_id]', e.target.value);
    field.append('work_subcontractor_detail[work_id]', this.state.work.id);
    field.append('work_subcontractor_detail[deliver_at]', new Date());
    field.append('work_subcontractor_detail[count]', 0);
    field.append('work_subcontractor_detail[number_of_copies]', 0);
    field.append('work_subcontractor_detail[actual_cost]', 0);
    const request = window.xhrRequest.post(url, field);
    request.then(res => {
      if(res.data.status == 'success') {

          work_subcontractors_iterate[index].details.push(res.data.work_subcontractor_detail);
          this.setState({ work_subcontractors_iterate: work_subcontractors_iterate }, () => {
            window.alertable({ icon: 'success', message: '作成しました。' });
          });
      };

      if(res.data.status != 'success') window.alertable({ icon: 'error', message: res.data.message });
    }).catch(err => {

      window.alertable({ icon: 'error', message: err });
    });
  };

  /**
   * 削除
   * @version 2020/01/09
   *
   */
  workSubcontractorDetailDestroy = (e, index, index1) => {

    e.preventDefault();

    const result = this.windowConfirm();
    if(!result) return false;

    let work_subcontractors_iterate = Object.assign([], JSON.parse(JSON.stringify(this.state.work_subcontractors_iterate)));
    work_subcontractors_iterate[index].details.splice(index1, 1);

    const url = '/work_subcontractor_details/' + e.target.value;
    const request = window.xhrRequest.delete(url);
    request.then(res => {
      if(res.data.status === 'success') this.setState({ work_subcontractors_iterate: work_subcontractors_iterate }, () => {
          window.alertable({ icon: 'success', message: '削除しました。' });
        });
      if(res.data.status != 'success') window.alertable({ icon: 'error', message: res.data.message });
    }).catch(err => {

      window.alertable({ icon: 'error', message: err });
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
  applyClient = (client, index) => {

    let work_subcontractors_iterate = Object.assign([], JSON.parse(JSON.stringify(this.state.work_subcontractors_iterate)));

    work_subcontractors_iterate[index].client        = { id: client.id, tel: client.tel, email: client.email };
    work_subcontractors_iterate[index].division      = client.division;
    work_subcontractors_iterate[index].subcontractor = client.company;

    this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
  };

  /**
   * 請求合算値変更
   * @versions 2019/12/27
   */
  setPrice = (message) => {

    const price = this.state.work_detail_cost + this.state.subcontractor_detail_cost;
    const field = new FormData();
    field.append('work[price]', price);
    const url = '/works/' + this.state.work.id;
    const request = window.xhrRequest.put(url, field);
    request.then(res => {
      if(res.data.status == 'success') {

        let work = Object.assign({}, JSON.parse(JSON.stringify(this.state.work)));
        work = { ...work, price: res.data.work.price, notices: res.data.work.notices };
        this.setState({ work: work }, () => {
          if(message) window.alertable({ icon: 'success', message: message });
        });
      };

      if(res.data.status != 'success') window.alertable({ icon: 'error', message: res.data.message });
    }).catch(err => {

      window.alertable({ icon: 'error', message: err });
    });
  };

  /**
  * 作業部署更新
  * @version 2020/03/13
  */
  passedDivision = division => {

    const url = '/works/' + this.state.work.id;
    const field = new FormData();
    field.append('work[division_id]', division.id);
    const request = window.xhrRequest.put(url, field);
    request.then(res => {
      if(res.data.status == 'success') {

        this.setState({ division: res.data.work.division }, () => {
          window.alertable({ icon: 'success', message: '作業部署を登録出来ました' });
        });
      } else {

        window.alertable({ icon: 'error', message: res.data.message });
      };
    }).catch(err => {

      window.alertable({ icon: 'error', message: err });
    });
  };

  /**
  * 各原価合算
  * @version 2020/03/13
  */
  passedPrice = (price, type, message) => {

    if (type === 'work_detail_cost') this.setState({ work_detail_cost: price });

    if (type === 'subcontractor_detail_cost') this.setState({ subcontractor_detail_cost: price });

    this.setPrice(message);
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
  setDeOrderContents = (index, value) => {

    let work_details = this.state.work_details.slice();
    work_details[index].order_contents = value;
    this.setState({ work_details: work_details });
  };

  /**
   * 入稿物更新
   * @versions 2019/12/26
   */
  setDeDeliverMethod = (index, value) => {

    let work_details = this.state.work_details.slice();
    work_details[index].deliver_method = value;
    this.setState({ work_details: work_details });
  };

  /**
   * 仕様更新
   * @versions 2019/12/26
   */
  setDeSpecification = (index, value) => {

    let work_details = this.state.work_details.slice();
    work_details[index].specification = value;
    this.setState({ work_details: work_details });
  };

  /**
   * 期日更新
   * @versions 2019/12/26
   */
  setDeDeliverAt = (index, value) => {

    let work_details = this.state.work_details.slice();
    work_details[index].deliver_at = value;
    this.setState({ work_details: work_details });
  };

  /**
   * 担当者更新
   * @versions 2019/12/26
   */
  setDeClientName = (index, value) => {

    let work_details = this.state.work_details.slice();
    work_details[index].client_name = value;
    this.setState({ work_details: work_details });
  };

  /**
   * 原稿枚数・合計金額更新
   * @versions 2019/12/26
   */
  setDeNumberOfCopies = (index, value) => {

    let work_details = this.state.work_details.slice();
    const count = work_details[index].count;
    const cost = work_details[index].estimated_cost;
    const actual_cost = value * Number(count) * Number(cost);

    work_details[index].actual_cost = actual_cost;
    work_details[index].number_of_copies = value;
    this.setState({ work_details: work_details });
  };

  /**
   * 部数数量・合計金額更新
   * @versions 2019/12/26
   */
  setDeCount = (index, value) => {

    let work_details = this.state.work_details.slice();
    const number_of_copies = work_details[index].number_of_copies;
    const cost = work_details[index].estimated_cost;
    const actual_cost = Number(number_of_copies) * value * Number(cost);

    work_details[index].count = value;
    work_details[index].actual_cost = actual_cost;
    this.setState({ work_details: work_details });
  };

  /**
   * 原単価・合計金額更新
   * @versions 2019/12/26
   */
  setDeCost = (index, value) => {

    let work_details = this.state.work_details.slice();
    const number_of_copies = work_details[index].number_of_copies;
    const count = work_details[index].count;
    const actual_cost = Number(number_of_copies) * Number(count) * value;

    work_details[index].actual_cost = actual_cost;
    work_details[index].estimated_cost = value;
    this.setState({ work_details: work_details });
  };

  /**
   * 特記事項更新
   * @versions 2019/12/26
   */
  setDeNotices = value => {

    let work = Object.assign({}, this.state.work);
    work.notices = value;
    this.setState({ work: work });
  };

  /**
   *
   * @version 2020/01/07
   *
   */
  setOrderContents = (e, index, index1) => {

    let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
    work_subcontractors_iterate[index].details[index1].order_contents = e.target.value;
    this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
  };

  /**
   *
   * @version 2020/01/07
   *
   */
  setDeliverMethod = (e, index, index1) => {

    let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
    work_subcontractors_iterate[index].details[index1].deliver_method = e.target.value;
    this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
  };

  /**
   *
   * @version 2020/01/07
   *
   */
  setSpecification = (e, index, index1) => {

    let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
    work_subcontractors_iterate[index].details[index1].specification = e.target.value;
    this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
  };

  /**
   *
   * @version 2020/01/07
   *
   */
  setCount = (e, index, index1) => {

    let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
    work_subcontractors_iterate[index].details[index1].count = e.target.value;
    this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
  };

  /**
   *
   * @version 2020/01/07
   *
   */
  setNumberOfCopies = (e, index, index1) => {

    let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
    work_subcontractors_iterate[index].details[index1].number_of_copies = e.target.value;
    this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
  };

  /**
   *
   * @version 2020/01/07
   *
   */
  setActualCost = (e, index, index1) => {

    let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
    work_subcontractors_iterate[index].details[index1].actual_cost = e.target.value;
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
  setDeliveryDestination = (index, value) => {

    let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
    work_subcontractors_iterate[index].delivery_destination = value;
    this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
  };

  /**
   *
   * @version 2020/01/08
   *
   */
  setNotices = (index, value) => {

    let work_subcontractors_iterate = this.state.work_subcontractors_iterate.slice();
    work_subcontractors_iterate[index].notices = value;
    this.setState({ work_subcontractors_iterate: work_subcontractors_iterate });
  };


  /**
   * htmlを埋め込む
   * @version 2019/12/26
   */
  setDangerHtml = (text, style) => {

    const setText = text ? text.replace(/\n/g, '<br />') : text;
    return(
      <div className={`${style}`} dangerouslySetInnerHTML={{ __html: setText }}/>
    );
  };

  /**
   *
   * 表示処理
   */
  render() {
    return (
      <Fragment>
        <WorkDivisionInfo division={ this.state.division } passedDivision={ this.passedDivision }/>
        <WorkDetails  work_notices={ this.state.work.notices } work_details={ this.state.work_details }
                      work_id={ this.state.work.id } user_id={ this.props.user_id } users={ this.props.users }
                      passedPrice={ this.passedPrice } setDeOrderContents={ this.setDeOrderContents } setDangerHtml={ this.setDangerHtml }
                      setDeDeliverMethod={ this.setDeDeliverMethod } setDeSpecification={ this.setDeSpecification }
                      setDeDeliverAt={ this.setDeDeliverAt } setDeClientName={ this.setDeClientName }
                      setDeNumberOfCopies={ this.setDeNumberOfCopies } setDeCount={ this.setDeCount }
                      setDeCost={ this.setDeCost } setDeNotices={ this.setDeNotices } onWorkDetailUpdate={ this.onWorkDetailUpdate }
                      onWorkDetailCreate={ this.onWorkDetailCreate } onWorkNoticesUpdate={ this.onWorkNoticesUpdate }
                      onWorkDetailDestroy={ this.onWorkDetailDestroy }
        />
        <AddSubcontractor work_subcontractors={ this.state.work_subcontractors } subcontractor_details={ this.props.subcontractor_details }
                          work_id={ this.state.work.id } divisions={ this.props.divisions }
                          clients={ this.props.clients } passedPrice={ this.passedPrice } users={ this.props.users }
                          prefectures={ this.props.prefectures } setDangerHtml={ this.setDangerHtml } work_subcontractors_iterate={ this.state.work_subcontractors_iterate }
                          setOrderContents={ this.setOrderContents } setOrderContents={ this.setOrderContents } setDeliverMethod={ this.setDeliverMethod }
                          setSpecification={ this.setSpecification } setCount={ this.setCount } setNumberOfCopies={ this.setNumberOfCopies }
                          setActualCost={ this.setActualCost } setOrderDate={ this.setOrderDate } setDeliveryDate={ this.setDeliveryDate }
                          setDeliveryDestination={ this.setDeliveryDestination } setNotices={ this.setNotices }
                          workSubcontractorDetailDestroy={ this.workSubcontractorDetailDestroy } workSubcontractorCreate={ this.workSubcontractorCreate }
                          workSubcontractorDetailCreate={ this.workSubcontractorDetailCreate } workSubcontractorUpdate={ this.workSubcontractorUpdate }
                          workSubcontractorDestroy={ this.workSubcontractorDestroy } windowConfirm={ this.windowConfirm } applyClient={ this.applyClient }
        />
        <SalesTable project_price={ this.state.project_price } work_price={ this.state.work.price }/>
      </Fragment>
    );
  };
};
