import React, { Fragment, useEffect, useState, useRef, useMemo } from 'react';
import html2canvas from 'html2canvas';

// components
import Button  from './button';
import Canvas  from './canvas';
import Select  from './layout/select';
// import Layout      from './layout';
// import Popup       from './layout/popup';
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
    head: true,
  };

  const [state, setState] = useState(init);

  useEffect(() => {

    if(!props.upload) closeLeftSidebar(document.getElementById('js-drawerOpen'));
  }, [props]);

  useEffect(() => {

    if(props.upload) {

      if(state.content_editing) {

        window.alertable({ icon: 'info', message: '編集を終了してください。' });
        return;
      };

      setState({ ...state, layouts: props.layouts, selected: false, select_layout: {}, apply_layout: props.default_layout, contents: props.contents, content_editing: false, head: props.head })
    };

  }, [props.head])

  useEffect(() => {

    if(props.upload) {
      if(state.content_editing) {

        window.alertable({ icon: 'info', message: '編集を終了してください。' });
        return;
      };

      if(state.apply_layout.id !== props.default_layout.id) setState({ ...state, layouts: props.layouts, selected: false, select_layout: {}, apply_layout: props.default_layout, contents: props.contents, content_editing: false, head: props.head })
    };

  }, [props.default_layout.id]);

  useEffect(() => {

    if(props.upload) {
      if(state.content_editing) {

        window.alertable({ icon: 'info', message: '編集を終了してください。' });
        return;
      };

      setState({ ...state, layouts: props.layouts, selected: false, select_layout: {}, apply_layout: props.default_layout, contents: props.contents, content_editing: false, head: props.head })
    };

  }, [props.paginate_index]);

	/**
	 * レイアウトをクリック
	 * @version
	 *
	 */
  const selectLayout = layout_id => {

    if(state.apply_layout.id == layout_id) {

      window.alertable({ icon: 'info', message: '既に選択されています。' })
      return
		}

		if(state.content_editing) {

			window.alertable({ icon: 'info', message: '編集を終了してください。' })
			return
		}

    const url = `/template_clients/${ props.card_template_id }/set_layout?client_id=${ props.client_id }&layout_id=${ layout_id }&layout_type=${ props.head ? 'head' : 'tail' }`
    const request = window.xhrRequest.get(url)
    request.then(res => {

      const layout = state.layouts.filter(layout => layout.id == layout_id)

      if(props.upload) props.changeLayout(layout[0], res.data.contents)
      if(!props.upload) window.alertable({ icon: res.data.status, message: 'レイアウトを変更しました。', close_callback: () => {

        if(!props.upload) setState({ ...state, selected: false, apply_layout: layout[0], contents: res.data.contents })
      }})

    }).catch(err => window.alertable({ icon: 'error', message: 'レイアウトを適用できませんでした。', close_callback: () => console.log(err) }))

    // const layout = state.layouts.filter(layout => layout.id == e);
    // setState({ ...state, selected: true, select_layout: layout[0] });
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

      if(!props.upload) window.alertable({ icon: res.data.status, message: 'レイアウトを変更しました。', close_callback: () => {

        if(props.upload) props.changeLayout(layout[0], res.data.contents);
        if(!props.upload) setState({ ...state, selected: false, apply_layout: layout[0], contents: res.data.contents });
      }});

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

		e.preventDefault()
		const url = `/company_division_clients/${ props.client_id }/update_layout_values?layout_type=${ props.head ? 'head' : 'tail' }`
		const field = new FormData()
    field.append(`company_division_client[${ props.head ? 'head_layout_id' : 'tail_layout_id' }]`, state.apply_layout.id)
		state.contents.map((content, index) => {

			const doc = document.getElementById(content.flag_name)

      field.append('company_division_client[layout_values_attributes][][id]', content.layout_value_id || '')
      field.append('company_division_client[layout_values_attributes][][company_division_client_id]', props.client_id)
      field.append('company_division_client[layout_values_attributes][][content_flag_id]', content.flag_id)
      field.append('company_division_client[layout_values_attributes][][layout_type]', content.content_type)
        if(content.content_type === 'image') {
          
          const result = doc.dataset.set === 'no_image'
          field.append('layout_content[][id]', content.id)
          field.append('layout_content[][no_image]', result)
          field.append('company_division_client[layout_values_attributes][][layout_content_id]', content.id)
          if(!result) field.append('company_division_client[layout_values_attributes][][upload_id]', doc.dataset.set)
        }
      if(content.content_type === 'text') field.append('company_division_client[layout_values_attributes][][text_value]', doc.value || '')
      if(content.content_type === 'text_area') field.append('company_division_client[layout_values_attributes][][textarea_value]', doc.value || '')
		})

		const request = window.xhrRequest.post(url, field)
		request.then(res => {

      window.alertable({ icon: res.data.status, message: '保存しました！', close_callback: () => {

        if(props.upload) {

          setState({ ...state, content_editing: false });
          props.changeContents(res.data.contents, state, setState);
        };
        if(!props.upload) setState({ ...state, content_editing: false, contents: res.data.contents });
      }});
		}).catch(err => window.alertable({ icon: 'error', message: '保存に失敗しました。', close_callback: () => console.log(err) }));
	};

	return(
    <Fragment>
      <div>
        { !props.upload ?
          <Button head={ props.head } card_template_id={ props.card_template_id } client_id={ props.client_id }/>
          : null
        }
      </div>
      <div className='u-mt-15 c-flex'>
        <div>
          <Canvas apply_layout={ state.apply_layout } contents={ state.contents }/>
          <Select layouts={ state.layouts } apply_layout={ state.apply_layout } selectLayout={ selectLayout } />
          { /* <Layout layouts={ state.layouts } contents={ state.contents } selected={ state.selected } apply_layout={ state.apply_layout } selectLayout={ selectLayout }/> */ }
          { /* <Popup select_layout={ state.select_layout } selected={ state.selected } applyLayout={ applyLayout } clearSelectLayout={ clearSelectLayout }/> */ }
        </div>
        <div>
          <Content editing={ state.content_editing } contents={ state.contents } editContent={ editContent } saveContent={ saveContent }/>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;