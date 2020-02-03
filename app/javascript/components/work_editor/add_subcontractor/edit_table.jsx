import React, { Fragment } from 'react';
import Style 	             from '../style.sass';

// import components
import ClientSearch	   from '../../utilities/client_search';
import DatetimePicker  from '../../utilities/datetime_picker';
const EditTable = props => {

	return(
		<div>
		  <div className={ Style.AddSubcontractor__EditButton }>
			  <button className={ 'c-btnMain-standard c-btn-red' } onClick={ e => props.onClosable(e) }>作業外注先[編集終了]</button>
		  </div>
		  { props.work_subcontractors_iterate ?
			  <Fragment>
				  { props.work_subcontractors_iterate.map((work_subcontractor, index) => {
						const key = 'work_subcontractor' + work_subcontractor.id;
						const client_key = work_subcontractor.client ? 'client' + work_subcontractor.client.id : 'client' + index;
					  return(
						  <div { ...{key} }>
							  <div className={ 'c-form-label u-mt-20' }>
								  <label>外注先情報</label>
							  </div>
								  { work_subcontractor.client ?
									  <div key={ client_key } className={ 'c-attention' }>
										  <div className={ 'u-mt-10' }>会社名: { work_subcontractor.subcontractor.name || '部署名なし' }</div>
										  <div className={ 'u-mt-10' }>部署名: { work_subcontractor.division.name }</div>
										  <div className={ 'u-mt-10' }>担当者名: { work_subcontractor.client.name }</div>
										  <div className={ 'u-mt-10' }>担当者TEL: { work_subcontractor.client.tel }</div>
										  <div className={ 'u-mt-10' }>担当者email: { work_subcontractor.client.email }</div>
									  </div>
									  : null
								  }
							  <div className={ 'u-mt-10 c-flex__start' }>
								  <ClientSearch applyClient={ props.applyClient } index={ index } path={ '/subcontractor_division_clients.json?search=' } notFound={ '外注先情報が見つかりませんでした' } typeName={ '外注先情報' }/>
								  <div>
									  <button className={ 'u-mt-10 c-btnMain-primaryA' } value={ work_subcontractor.id } onClick={ e => props.workSubcontractorDestroy(e, index) }>外注先[削除]</button>
								  </div>
							  </div>
							  <div className={ 'c-table2 u-mt-10' }>
								  <table>
									  <thead>
										  <tr>
											  <th></th>
											  <th className={ 'u-va-middle' }>No.</th>
											  <th className={ 'u-va-middle' }>発注内容</th>
											  <th className={ 'u-va-middle' }>入稿物</th>
											  <th className={ 'u-va-middle' }>仕様</th>
											  <th>原稿<br />数量</th>
											  <th>部数<br />数量</th>
											  <th className={ 'u-va-middle' }>実績原価</th>
										  </tr>
									  </thead>
									  <tbody>
										  { work_subcontractor.details ?
											  <Fragment>
												  { work_subcontractor.details.map((detail, index1) => {
														const key = detail ? 'subcontractor_detail' + detail.id : 'subcontractor_detail' + index1;
													  return (
														  <tr { ...{key} }>
															  <td className={ 'u-va-top' }><button className={ 'c-btnMain2-primaryA' } value={ detail.id } onClick={ e => props.workSubcontractorDetailDestroy(e, index, index1) }>ー</button></td>
															  <td className={ 'u-va-top u-ta-center' }>{ index1 + 1 }</td>
															  <td className={ 'u-a-top' }><textarea rows='3' cols='30' className={ 'c-form-text__work-show-input__textarea' } defaultValue={ detail.order_contents } onChange={ e => props.setOrderContents(e, index, index1) } placeholder={ '図面製本' }/></td>
															  <td><textarea className={ 'c-form-textarea__work-show-input__textarea' } rows='3' cols='30' placeholder={ 'AIデータ, アウトライン済み1ファイル' } defaultValue={ detail.deliver_method } onChange={ e => props.setDeliverMethod(e, index, index1) }/></td>
															  <td><textarea className={ 'c-form-textarea__work-show-input__textarea' } rows='3' cols='30' placeholder={ '表紙:ダイヤボード' } defaultValue={ detail.specification } onChange={ e => props.setSpecification(e, index, index1) }/></td>
															  <td className={ 'u-va-top' }><input className={ 'c-form-text__work-show-input6' } type='number' defaultValue={ detail.count } onChange={ e => props.setCount(e, index, index1) }/></td>
															  <td className={ 'u-va-top' }><input className={ 'c-form-text__work-show-input6' } type='number' defaultValue={ detail.number_of_copies } onChange={ e => props.setNumberOfCopies(e, index, index1) }/></td>
															  <td className={ 'u-va-top' }><input className={ 'c-form-text__work-show-input2' } type='number' defaultValue={ detail.actual_cost } onChange={ e => props.setActualCost(e, index, index1) }/></td>
														  </tr>
													  );
												  }) }
											  </Fragment>
											  : null
										  }
										  <tr>
											  <td colSpan='8'><button className={ 'c-btnMain2-primaryB' } value={ work_subcontractor.id } onClick={ e => props.workSubcontractorDetailCreate(e, index) }>＋</button></td>
										  </tr>
									  </tbody>
								  </table>
							  </div>
							  <div className={ 'c-table' }>
								  <table>
									  <thead>
										  <tr>
											  <th>発注日</th>
											  <th>納期</th>
											  <th>納品先</th>
										  </tr>
									  </thead>
									  <tbody>
										  <tr>
											  <td className={ 'u-ta-center' }>
												  <DatetimePicker type={ 'text' } name={ 'start_at' } default_datetime={ work_subcontractor.order_date } action={ 'order_date' }
													  							sortingAction={ props.sortingAction } index={ index } class={ 'c-form-text__work-index__datepicker' } 
												  />
											  </td>
											  <td className={ 'u-ta-center' }>
												  <DatetimePicker type={ 'text' } name={ 'start_at' } default_datetime={ work_subcontractor.delivery_date } action={ 'delivery_date' }
													  							sortingAction={ props.sortingAction } index={ index } class={ 'c-form-text__work-index__datepicker' }
												  />
											  </td>
											  <td className={ 'u-ta-center' }>
												  <input className={ 'c-form-text__work-show-input7' } type='text' defaultValue={ work_subcontractor.delivery_destination } onChange={ e => props.setDeliveryDestination(index, e.target.value) }/>
											  </td>
										  </tr>
									  </tbody>
								  </table>
							  </div>
							  <div className={ 'c-table' }>
								  <table>
									  <thead>
										  <tr>
											  <th>特記事項</th>
										  </tr>
									  </thead>
									  <tbody>
										  <tr>
											  <td colSpan='8'><textarea rows='3' className={ 'c-form-textarea__work-show-input__textarea2' } defaultValue={ work_subcontractor.notices } onChange={ e => props.setNotices(index, e.target.value) }/></td>
										  </tr>
									  </tbody>
								  </table>
							  </div>
							  <input type='hidden' value={ work_subcontractor.id } />
						  </div>
					  );
				  }) }
			  </Fragment>
			  : null
		  }
		  <div className={ Style.AddSubcontractor__EditButton }>
			  <button className={ 'c-btnMain-primaryB' } onClick={ e => props.workSubcontractorCreate(e) }>外注先[追加]</button>
		  </div>
	  </div>
	);
};

export default EditTable;