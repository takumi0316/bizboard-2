import React, { Fragment } from 'react';

// libraries
import Dayjs	from 'dayjs';
const ReadTable = props => {

	return(
		<Fragment>
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
						{ props.work_details.length > 0 ?
							<Fragment>
								{ props.work_details.map((detail, index) => {
									const key = 'work_details' + detail.id;
									return (
										<tr { ...{key} }>
											<td className={ 'u-va-top u-ta-center' }>{ index + 1 }</td>
											<td>{ props.setDangerHtml(detail.order_contents, 'u-ml-10') }</td>
											<td>{ props.setDangerHtml(detail.deliver_method, 'u-ml-10') }</td>
											<td>{ props.setDangerHtml(detail.specification, 'u-ml-10') }</td>
											<td className={ 'u-va-middle u-ta-center' }>
												{ detail.deliver_at ? Dayjs(detail.deliver_at).format('YYYY年MM月DD日') : detail.deliver_at }
											</td>
											<td className={ 'u-va-middle u-ta-center' }>{ detail.client_name }</td>
											<td className={ 'u-va-middle u-ta-right' }>{ detail.number_of_copies }</td>
											<td className={ 'u-va-middle u-ta-right' }>{ detail.count }</td>
											<td className={ 'u-va-middle u-ta-right' }>{ detail.estimated_cost }円</td>
											<td className={ 'u-va-middle u-ta-right' }>{ detail.actual_cost }円</td>
										</tr>
									);
								}) }
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
							<td>{ props.setDangerHtml(props.work_notices, 'u-ml-10') }</td>
						</tr>
					</tbody>
				</table>
			</div>
		</Fragment>
	);
};

export default ReadTable;