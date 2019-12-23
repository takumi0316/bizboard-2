import React from 'react';

import Specifications from './specifications';

const ItemTables = props => {

	return(
		<div className={ 'c-table u-mt-30' }>
		<table>
			<thead>
				<tr>
					<th>品目</th>
					<th>備考</th>
					<th>単価</th>
					<th>数量</th>
					<th>価格</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<Specifications quote_projects={ props.quote_projects } setName={ props.setName } setRemarks={ props.setRemarks } 
												setUnitPrice={ props.setUnitPrice } setUnit={ props.setUnit } _projectDestroy={ props._projectDestroy }
				/>
			</tbody>
		</table>
	</div>
	);
};

export default ItemTables;