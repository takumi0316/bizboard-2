import React, { useEffect, useState, useRef, Fragment } from 'react';
import Style                                            from './style.sass';

// child component
import Loading        from '../loading';
import FormTitle      from './form/title';
import LayoutDropZone from './drop_zone';
import Contents       from './contents';
import RightSide      from './contents/right_side';
import Canvas         from './canvas';

import { FontColors, LayoutTypes, IsReductionRated } from './contents/properties';

import { setPDF } from './util';

// 左サイドバーを閉じる
const closeLeftSidebar = drawerElement => drawerElement.click();

//　右サイドバーの使用有無
const rightSidebarExist = () => window.alertable({ icon: 'info', message: '編集パネルを終了してください。' });

const Index = props => {
  
  const title_ref = useRef(null);
  
  const pdf_ref = useRef(null);
  
  const loading_ref = useRef(null);
  
  const init = {
    layout_contents: props.layout_contents || [],
    layout_exist: !!props.pdf,
    right_panel_exist: false,
    content_id_being_edited: '',
    layout_png: ''
  };
  
  const [state, setState] = useState(init);
  
  const prevState = useRef(state);
  
  // 初回のみ作動 = componentDidMount
  useEffect(() => {
    
    closeLeftSidebar(document.getElementById('js-drawerOpen'));
    
    if(!props.new_record_type) {
  
      const fil_contents = JSON.parse(JSON.stringify(state.layout_contents));
      // const fil_contents = JSON.parse(JSON.stringify(state.layout_contents)).map(content => {
      //   return { ...content, layout_type: LayoutTypes[content.layout_type], font_color: FontColors[content.font_color], is_reduction_rated: IsReductionRated[content.is_reduction_rated] };
      // });
      
      if(props.pdf) {
        
        console.log(props)
        const field = new FormData();
        field.append('url', props.pdf);
        const request = window.xhrRequest.post('/card_layouts/transfer', field, { responseType: 'blob' });
        request.then(res => {
          
          pdf_ref.current = res.data;
          setState({ ...init, layout_contents: fil_contents });
        });
        
      } else {
  
        setState({ ...init, layout_contents: fil_contents });
      };
      
    };
  }, [props]);
  
  // state更新時
  useEffect(() => {
    
    if(pdf_ref.current) setPDF(pdf_ref.current, state.layout_contents);
  }, [state]);
  
  
  // 右サイドバーを表示
  const openRightPanel = e => {
    
    e.preventDefault();
    
    if(state.right_panel_exist){
      
      rightSidebarExist();
      return;
    };
    
    // right panelを出現させる
    let split = document.getElementById('split');
    split.classList.add('c-flex');
    
    setState({ ...state, right_panel_exist: true, content_id_being_edited: e.target.dataset.number });
  };
  
  // コンテンツの追加
  const addContent = e => {
    
    e.preventDefault();
    
    if(state.right_panel_exist) {
      
      rightSidebarExist();
      return;
    };
    
    const stateContent = JSON.parse(JSON.stringify(state.layout_contents));
    const initContent = {
      id: '',
      name: '',
      x_coordinate: '10',
      y_coordinate: '10',
      font_family: '0',
      font_size: '4',
      font_color: '0',
      layout_length: '10',
      letter_spacing: '1',
      reduction_rate: '0',
      is_reduction_rated: '0',
      layout_type: '0',
      content_flag_name: '',
      content_flag_id: '',
      uploads: []
    };
    
    stateContent.push(initContent);
    
    setState({ ...state, layout_contents: stateContent });
  };
  
  // コンテンツの編集
  const saveContent = content => {
    
    if(!content.name) {
      
      window.alertable({ icon: 'info', message: 'コンテントタイトルを入力してください。' });
      return;
    };
    
    let parse = JSON.parse(JSON.stringify(state.layout_contents));
    parse[state.content_id_being_edited].name = content.name;
    parse[state.content_id_being_edited].x_coordinate = content.x_coordinate;
    parse[state.content_id_being_edited].y_coordinate = content.y_coordinate;
    parse[state.content_id_being_edited].font_family = content.font_family;
    parse[state.content_id_being_edited].font_size = content.font_size;
    parse[state.content_id_being_edited].font_color = content.font_color;
    parse[state.content_id_being_edited].layout_length = content.layout_length;
    parse[state.content_id_being_edited].letter_spacing = content.letter_spacing;
    parse[state.content_id_being_edited].reduction_rate = content.reduction_rate;
    parse[state.content_id_being_edited].is_reduction_rated = content.is_reduction_rated;
    parse[state.content_id_being_edited].layout_type = content.layout_type;
    parse[state.content_id_being_edited].content_flag_name = content.content_flag_name;
    parse[state.content_id_being_edited].content_flag_id = content.content_flag_id;
    parse[state.content_id_being_edited].uploads = content.uploads;
    
    setState({ ...state, layout_contents: parse, right_panel_exist: false });
  };
  
  // コンテンツの削除
  const removeContent = e => {
  
    e.preventDefault();
    
    const filter_contents = JSON.parse(JSON.stringify(state.layout_contents));
    filter_contents.splice(e.target.dataset.number, 1);
    setState({ ...state, layout_contents: filter_contents });
  };
  
  // レイアウトの追加
  const addLayout = layout => {
    
    pdf_ref.current = layout[0];
    setState({ ...state, layout_exist: true });
  };
  
  // レイアウトの削除
  const removeLayout = e => {
    
    e.preventDefault();
    pdf_ref.current = null;
    setState({ ...state, layout_exist: false });
  };
  
  // レイアウトの保存
  const saveCardLayout = e => {
    
    e.preventDefault();
    
    if(state.right_panel_exist) {
      
      rightSidebarExist();
      return;
    };
    
    if(!title_ref.current.value) {
      
      window.alertable({ icon: 'info', message: 'レイアウトタイトルを入力してください。' });
      return;
    };
    
    if(!state.content_id_being_edited && props.new_record_type) {
      
      window.alertable({ icon: 'info', message: 'コンテントタイトルを入力してください。' });
      return;
    };
    
    const field = new FormData();
    
    field.append('card_layout[name]', title_ref.current.value);
    field.append('card_layout[pdf]', pdf_ref.current);
  
    state.layout_contents.map(content => {

       // フォントカラーのカラー名を抽出
      const fil_color = Object.entries(FontColors).find(([key, val]) => val == content.font_color);
      const fil_is_reduction_rated = Object.entries(IsReductionRated).find(([key, val]) => val == content.is_reduction_rated);
      const fil_type = Object.entries(LayoutTypes).find(([key, val]) => val == content.layout_type);
      
      // :content_logo_id, :content_flag_id
      field.append('card_layout[contents_attributes][][id]', content.id);
      field.append('card_layout[contents_attributes][][name]', content.name);
      field.append('card_layout[contents_attributes][][x_coordinate]', content.x_coordinate);
      field.append('card_layout[contents_attributes][][y_coordinate]', content.y_coordinate);
      field.append('card_layout[contents_attributes][][font_family]', content.font_family);
      field.append('card_layout[contents_attributes][][font_color]', fil_color[0]);
      field.append('card_layout[contents_attributes][][font_size]', content.font_size);
      field.append('card_layout[contents_attributes][][layout_length]', content.layout_length);
      field.append('card_layout[contents_attributes][][letter_spacing]', content.letter_spacing);
      field.append('card_layout[contents_attributes][][reduction_rate]', content.reduction_rate);
      field.append('card_layout[contents_attributes][][is_reduction_rated]', fil_is_reduction_rated[0]);
      field.append('card_layout[contents_attributes][][layout_type]', fil_type[0]);
      field.append('card_layout[contents_attributes][][content_flag_id]', content.content_flag_id);
      console.log(content.uploads)
      content.uploads.map(upload => {
        field.append('card_layout[contents_attributes][][content_uploads_attributes][][id]', upload.id);
        field.append('card_layout[contents_attributes][][content_uploads_attributes][][layout_content_id]', content.id);
        field.append('card_layout[contents_attributes][][content_uploads_attributes][][upload_id]', upload.upload_id);
      });
    });
    
    const result = props.new_record_type ?  window.xhrRequest.post(props.action, field) : window.xhrRequest.put(props.action, field);
    result.then(res => {
      
      const message = props.new_record_type ? 'レイアウトを作成しました。' : 'レイアウトを更新しました。';
      const redirect = () => location.href = `/card_layouts/${ res.data.card_layout_id }/edit`;
      window.alertable({ icon: res.data.status, message: message, close_callback: res.data.card_layout_id ? redirect : '' });
    }).catch(err => window.alertable({ icon: 'error', message: '保存に失敗しました。', close_callback: () => console.log(err) }));
  };
  
  return(
    <Fragment>
      <div id='split'>
        <div className={ Style.CardLayout }>
          <FormTitle ref={ title_ref } defaultTitle={ props.card_layout ? props.card_layout.name : '' }/>
          { state.layout_exist ?
            <Fragment>
              <Canvas />
              <div>
                <button className='u-mt-10 c-btnMain-standard' onClick={ removeLayout }>レイアウト変更</button>
              </div>
            </Fragment>
            : <LayoutDropZone addLayout={ addLayout }/>
          }
          <Contents layout_contents={ state.layout_contents } addContent={ addContent } removeContent={ removeContent } openRightPanel={ openRightPanel }/>
        </div>
        { state.right_panel_exist ?
          <RightSide layout_content={ state.layout_contents[state.content_id_being_edited] } saveContent={ saveContent }/>
          : null
        }
      </div>
      <div className={ Style.CardLayout__overlay }>
        <button className='c-btnMain-standard' onClick={ saveCardLayout }>保存する</button>
      </div>
      <Loading ref={ loading_ref }/>
    </Fragment>
  );
};

export default Index;