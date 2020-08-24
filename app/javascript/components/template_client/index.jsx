import React, { Fragment, useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';

// components
import Button from  './button';
import Canvas from  './canvas';
import Layout from  './layout';
import Popup  from  './layout/popup';
import Content from './content';

// 左サイドバーを閉じる
const closeLeftSidebar = drawerElement => drawerElement.click();

const Index = props => {

  const init = {
    layouts: props.layouts,
    selected: false,
    select_layout: {},
    apply_layout: props.default_layout,
    contents: props.contents,
    content_editing: false,
  };

  const [state, setState] = useState(init);

  useEffect(() => closeLeftSidebar(document.getElementById('js-drawerOpen')), [props]);

  useEffect(() => {
  }, [state])


	/**
	 * レイアウトをクリック
	 * @version
	 *
	 */
  const selectLayout = e => {

    if(state.select_layout_id == e) {

      window.alertable({ icon: 'info', message: '既に選択されています。' });
      return;
		};

		if(state.content_editing) {

			window.alertable({ icon: 'info', message: '編集を終了してください。' });
			return;
		};

    const layout = state.layouts.filter(layout => layout.id == e);
    setState({ ...state, selected: true, select_layout: layout[0] });
  };

  /**
	 * クリックしたレイアウトをクリアする
	 * @version
	 *
	 */
	const clearSelectLayout = () => setState({ ...state, selected: false, select_layout: {} });

	/**
	 * レイアウトを適用
	 * @version
	 *
	 */
	const applyLayout = () => {

    const url = `/template_clients/${ props.card_template_id }/set_layout?client_id=${ props.client_id }&layout_id=${ state.select_layout.id }&layout_type=${ props.head ? 'head' : 'tail' }`;
    const request = window.xhrRequest.get(url);
    request.then(res => {

			const layout = state.layouts.filter(layout => layout.id == state.select_layout.id);
			window.alertable({ icon: res.data.status, message: 'レイアウトを変更しました。', close_callback: () => setState({ ...state, selected: false, apply_layout: layout[0], contents: res.data.contents }) });
    }).catch(err => window.alertable({ icon: 'error', message: 'レイアウトを適用できませんでした。', close_callback: () => console.log(err) }));
  };

	/**
	 * コンテンツ編集
	 * @version
	 *
	 */
	const editContent = e => {

		e.preventDefault();
		setState({ ...state, content_editing: true });
	};

	/**
	 * コンテンツ保存
	 * @version
	 *
	 */
	const saveContent = e => {

		e.preventDefault();
		const url = `/company_division_clients/${ props.client_id }/update_layout_values?layout_type=${ props.head ? 'head' : 'tail' }`;
		const field = new FormData();
    field.append(`company_division_client[${ props.head ? 'head_layout_id' : 'tail_layout_id' }]`, state.apply_layout.id);
		state.contents.map((content, index) => {

			const doc = document.getElementById(content.flag_name);

      field.append('company_division_client[layout_values_attributes][][id]', content.layout_value_id || '');
      field.append('company_division_client[layout_values_attributes][][company_division_client_id]', props.client_id);
      field.append('company_division_client[layout_values_attributes][][content_flag_id]', content.flag_id);
      field.append('company_division_client[layout_values_attributes][][layout_type]', content.layout_type);
        if(content.layout_type === 'image') {
          field.append('company_division_client[layout_values_attributes][][upload_id]', doc.dataset.set);
          field.append('company_division_client[layout_values_attributes][][layout_content_id]', content.id);
        };
      if(content.layout_type === 'text') field.append('company_division_client[layout_values_attributes][][text_value]', doc.value || '');
      if(content.layout_type === 'text_area') field.append('company_division_client[layout_values_attributes][][textarea_value]', doc.value || '');
		});

		const request = window.xhrRequest.post(url, field);
		request.then(res => {

			console.log(res.data)
      window.alertable({ icon: res.data.status, message: '保存しました！', close_callback: () => setState({ ...state, content_editing: false, contents: res.data.contents }) });
		}).catch(err => window.alertable({ icon: 'error', message: '保存に失敗しました。', close_callback: () => console.log(err) }));
	};

	const sukusho = e => {

		e.preventDefault();
		html2canvas(document.getElementById('canvas'), {
      height: 1500,
      allowTaint: true,
      useCORS: true,
      logging: true,
      taintTest: false
		}).then(canvas => {
        var imgData = canvas.toDataURL();
        document.getElementById("ss").href = imgData;
    });
	};

	return(
    <Fragment>
      <div className='c-flex'>
        <div>
          <Button head={ props.head } card_template_id={ props.card_template_id } client_id={ props.client_id }/>
          <Canvas apply_layout={ state.apply_layout } contents={ state.contents }/>
          <Layout layouts={ state.layouts } selected={ state.selected } apply_layout={ state.apply_layout } selectLayout={ selectLayout }/>
          <Popup select_layout={ state.select_layout } selected={ state.selected } applyLayout={ applyLayout } clearSelectLayout={ clearSelectLayout }/>
        </div>
        <div>
          <Content editing={ state.content_editing } contents={ state.contents } editContent={ editContent } saveContent={ saveContent }/>
        </div>
      </div>
      <div className='u-mt-30'>
        <button className='c-btnMain-primaryB' onClick={ sukusho }>スクショ</button>
        <a href="" id="ss" download="html_ss.png">スクリーンショット(document.body全体)をダウンロード</a>
      </div>
    </Fragment>
  );
};

export default Index;