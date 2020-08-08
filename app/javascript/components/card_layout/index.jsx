import React, { useEffect, useState, useRef, Fragment } from 'react';

// child component
import FormTitle      from './form/title';
import LayoutDropZone from './drop_zone';
import Contents       from './contents';
import RightSide      from './contents/right_side';

import Style from './style.sass';

// 左サイドバーを閉じる
const closeLeftSidebar = drawerElement => drawerElement.click();

const Index = props => {
  
  const title_ref = useRef(null);
  
  const layout_ref = useRef(props.layout || null);
  
  const init = {
    layout_contents: props.layout_contents ? props.layout_contents : [],
    layout_exist: !!props.layout,
    open_right_panel: false,
    content_id_being_edited: ''
  };
  
  const [state, setState] = useState(init);
  
  // 初回のみ作動 = componentDidMount
  useEffect(() => closeLeftSidebar(document.getElementById('js-drawerOpen')), [props]);
  
  useEffect(() => console.log(state, layout_ref, title_ref), [props]);
  
  useEffect(() => {
    console.log(state)
  }, [state]);
  
  
  // 右側の編集パネルを表示
  const openRightPanel = e => {
    
    e.preventDefault();
    let split = document.getElementById('split');
    split.classList.add('c-flex');
    setState({ ...state, open_right_panel: true, content_id_being_edited: e.target.id });
  };
  
  // コンテンツの追加
  const addContent = e => {
    
    e.preventDefault();
    const stateContent = JSON.parse(JSON.stringify(state.layout_contents));
    const initContent = {
      id: '',
      name: '',
      x_coordinate: '10',
      y_coordinate: '10',
      font_family: '新ゴR',
      font_size: '4',
      font_color: 'black',
      layout_length: '10',
      letter_spacing: '1',
      reduction_rate: '0',
      is_reduction_rate: '0',
      layout_type: '0',
      flag_name: '',
      flag_id: '',
      logo_name: '',
      logo_id: ''
    };
    
    stateContent.push(initContent);
    
    setState({ ...state, layout_contents: stateContent });
  };
  
  // コンテンツの編集
  const saveContent = e => {
    
    e.preventDefault();
    setState({ ...state, open_right_panel: false });
  };
  
  // コンテンツの削除
  const removeContent = e => {
  
    e.preventDefault();
  };
  
  // レイアウトの追加
  const addLayout = layout => {
    
    layout_ref.current = layout[0];
    setState({ ...state, layout_exist: true });
  };
  
  // レイアウトの削除
  const removeLayout = e => {
    
    e.preventDefault();
    layout_ref.current = null;
    setState({ ...state, layout_exist: false });
  };
  
  const saveCardLayout = e => {
    
    e.preventDefault();
    
     if(state.open_right_panel) {
       
       window.alertable({ icon: 'error', message: 'コンテンツの編集を終了してください。' });
       return;
     };
     
     window.alertable({ icon: 'success', message: 'やったね' });
  };
  
  return(
    <Fragment>
      <div id='split'>
        <div className={ Style.CardLayout }>
          <FormTitle ref={ title_ref } defaultTitle={ props.card_layout ? props.card_layout.name : '' }/>
          { state.layout_exist ?
            <Fragment>
              <svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='1318' height='733'></svg>
              <div>
                <p>見えないけど、この上にレイアウトがあるよ！！！</p>
                <button className='u-mt-10 c-btnMain-standard' onClick={ removeLayout }>レイアウト変更</button>
              </div>
            </Fragment>
            : <LayoutDropZone addLayout={ addLayout }/>
          }
          <Contents layout_contents={ state.layout_contents } addContent={ addContent } removeContent={ removeContent } openRightPanel={ openRightPanel }/>
        </div>
        { state.open_right_panel ?
          <RightSide layout_content={ state.layout_contents[state.content_id_being_edited] } saveContent={ saveContent }/>
          : null
        }
      </div>
      <div className={ Style.CardLayout__overlay }>
        <button className='c-btnMain-standard' onClick={ saveCardLayout }>保存する</button>
      </div>
    </Fragment>
  );
};

export default Index;