import React, { Fragment } from 'react'

const Index = props => {

	const goOtherLayout = e => {

		e.preventDefault();

		const redirect = () => location.href = `/template_clients/${ props.card_template_id }/${ props.head ? 'edit_tail'  : 'edit_head' }`;
		window.alertable({ icon: 'success', message: '遷移します。', close_callback: () => redirect() });
	};

	return(
		<Fragment>
			<div className='u-mt-15 '>
        <button className='c-btnMain-standard' onClick={ goOtherLayout }>{ props.head ? '裏面設定' : '表面設定' }</button>
			</div>
		</Fragment>
	);
};

export default Index;