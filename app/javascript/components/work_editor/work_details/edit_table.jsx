import React, { Fragment }	from 'react';

import DatetimePicker from '../../utilities/datetime_picker';

const EditTable = props => {

	const sortingAction = prop => {

		props.setDeDeliverAt(prop.index, prop.value);
	};

	return(
		<Fragment>
			<div className={ 'u-mt-10 c-table' }>
      	<table>
        	<thead>
          	<tr>
            	<th></th>
            	<th>No.</th>
  	        	<th>発注内容</th>
            	<th>入稿物</th>
            	<th>仕様</th>
            	<th>期日</th>
            	<th>担当者</th>
            	<th>原稿<br />枚数</th>
            	<th>部数<br />数量</th>
            	<th>原単価(税抜)</th>
            	<th>実績原価(税抜)</th>
          	</tr>
        	</thead>
        	<tbody>
						{ props.work_details ?
							<Fragment>
          		  { props.work_details.map((detail, index) => {
							 	 const key = 'detail' + detail.id;
            			return (
              			<tr { ...{key} }>
                			<td className={ 'u-va-top' }>
												<button className={ 'c-btnMain2-primaryA' } onClick={ e => props.onConfirm(e, index) }>−</button>
											</td>
                			<td className={ 'u-va-top' }>
												{ index + 1 }<input type='hidden' defaultValue={ detail.id }/>
											</td>
											<td className={ 'u-va-top' }>
												<textarea	className={ 'c-form-text__work-show-input__textarea' } rows='3' cols='30' placeholder={ '図面製本' }
																	defaultValue={ detail.order_contents } onChange={ e => props.setDeOrderContents(index, e.target.value) }
												/>
											</td>
											<td className={ 'u-va-top' }>
												<textarea className={ 'c-form-textarea__work-show-input__textarea' } rows='3' cols='30' placeholder={ 'AIデータ, アウトライン済み1ファイル' } 
																	defaultValue={ detail.deliver_method } onChange={ e => props.setDeDeliverMethod(index, e.target.value) }
												/>
											</td>
											<td className={ 'u-va-top' }>
												<textarea	className={ 'c-form-textarea__work-show-input__textarea' } rows='3' cols='30' placeholder={ '表紙:ダイヤボード' }
																	defaultValue={ detail.specification } onChange={ e => props.setDeSpecification(index, e.target.value) }
												/>
											</td>
											<td>
												<DatetimePicker type={ 'text' } name={ 'start_at' } default_datetime={ detail.deliver_at } action={ '' }
																		    sortingAction={ sortingAction } index={ index } class={ 'c-form-text__work-index__datepicker' }
												/>
											</td>
                			<td className={ 'u-va-top' }>
                				<select className={ 'c-form-select__work-show' } defaultValue={ detail.client_name } onChange={ e => props.setDeClientName(index, e.target.value) }>
                  				{ props.users.map((user) => {
														const key = 'user_name' + user.id;
                      			return(
															<option { ...{key} } value={ user.name }>{ user.name }</option>
                      			);
                    			}) }
                  			</select>
                			</td>
											<td className={ 'u-va-top' }>
												<input	className={ 'c-form-text__work-show-input6' } type='number'
																defaultValue={ detail.number_of_copies } onChange={ e => props.setDeNumberOfCopies(index, e.target.value) }
												/>
											</td>
											<td className={ 'u-va-top' }>
												<input	className={ 'c-form-text__work-show-input6' } type='number' defaultValue={ detail.count }
																onChange={ e => props.setDeCount(index, e.target.value) }
												/>
											</td>
											<td className={ 'u-va-top' }>
												<input	className={ 'c-form-text__work-show-input2' } type='number' defaultValue={ detail.estimated_cost }
																onChange={ e => props.setDeCost(index, e.target.value) }
												/>
											</td>
                			<td className={ 'u-va-top u-ta-right' }>
											<input readOnly className={ 'c-form-text' } type='text' value={ detail.actual_cost }/>
											</td>
              			</tr>
          				);
          			}) }
          			<tr>
            			<td colSpan='13'>
										<button className={ 'c-btnMain2-primaryB' } onClick={ e => props.onWorkDetailCreate(e) }>＋</button>
									</td>
          			</tr>
							</Fragment>
							: null	
						}
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
            	<td>
								<textarea rows='3' className={ 'c-form-textarea__work-show-input__textarea2' } 
													defaultValue={ props.work_notices } onChange={ e => props.setDeNotices(e.target.value) }
								/>
							</td>
          	</tr>
        	</tbody>
      	</table>
    	</div>
		</Fragment>
	);
};

export default EditTable;