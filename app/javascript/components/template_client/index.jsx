import React, { Fragment, useEffect, useState, useRef } from 'react'

// components
import Button from './button';
import Canvas from './canvas';
import Layout from './layout';
import Popup  from './layout/popup';

// 左サイドバーを閉じる
const closeLeftSidebar = drawerElement => drawerElement.click();

const Index = props => {

	const init = {
		layouts: props.layouts,
		selected: false,
		select_layout: {},
		apply_layout: props.default_layout
	};

	const [state, setState] = useState(init);

	useEffect(() => {

		closeLeftSidebar(document.getElementById('js-drawerOpen'));
	}, [props]);

	useEffect(() => {
	}, [state])

	const selectLayout = e => {

		if(state.select_layout_id == e) {

			window.alertable({ icon: 'info', message: '既に選択されています。' });
			return;
		};

		const layout = state.layouts.filter(layout => layout.id == e);
		setState({ ...state, selected: true, select_layout: layout[0] });
	};

	const clearSelectLayout = () => setState({ ...state, selected: false, select_layout: {} });

	const applyLayout = () => {

		const url = `/company_division_clients/${ props.client_id }/set_layout?layout_id=${ state.select_layout.id }&layout_type=${ props.head ? 'head' : 'tail' }`;
		const request = window.xhrRequest.get(url);
		request.then(res => {

			const layout = state.layouts.filter(layout => layout.id == state.select_layout.id);
			setState({ ...state, selected: false, apply_layout: layout[0] });
		}).catch(err => window.alertable({ icon: 'error', message: 'レイアウトを適用できませんでした。', close_callback: () => console.log(err) }));
	};

	return(
		<Fragment>
      <Button head={ props.head } card_template_id={ props.card_template_id } client_id={ props.client_id }/>
      <Canvas apply_layout={ state.apply_layout }/>
			<Layout layouts={ state.layouts } apply_layout={ state.apply_layout } selectLayout={ selectLayout } selected={ state.selected }/>
      <Popup selected={ state.selected } applyLayout={ applyLayout } clearSelectLayout={ clearSelectLayout } select_layout={ state.select_layout }/>
		</Fragment>
	);
};

export default Index;