import React, { useEffect, useState, useRef, Fragment } from 'react';

// child component
import FormTitle from './form/title';
import LayoutDropZone  from './drop_zone';
import Contents  from './contents';

// 左サイドバーを閉じる
const closeLeftSidebar = drawerElement => drawerElement.click();

const Index = props => {
  
  const title_ref = useRef(null);
  
  const layout_ref = useRef(props.layout || null);
  
  const init = {
    layout_contents: props.layout_contents ? props.layout_contents : [],
    layout_exist: !!props.layout,
  };
  
  const [state, setState] = useState(init);
  
  // 初回のみ作動 = componentDidMount
  useEffect(() => closeLeftSidebar(document.getElementById('js-drawerOpen')), [props]);
  
  useEffect(() => console.log(state, layout_ref, title_ref), [props]);
  
  // コンテンツの追加
  const addContent = e => {
    
    e.preventDefault();
    console.log(e);
  };
  
  // コンテンツの削除
  const removeContent = e => {
  
    e.preventDefault();
    console.log(e);
  };
  
  // レイアウトの追加
  const addLayout = layout => {
    
    layout_ref.current = layout[0];
    setState({ ...init, layout_exist: true });
  };
  
  // レイアウトの削除
  const removeLayout = e => {
    
    e.preventDefault();
    layout_ref.current = null;
    setState({ ...init, layout_exist: false });
  };
  
  return(
    <div>
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
      <Contents layout_contents={ state.layout_contents } addContent={ addContent } removeContent={ removeContent }/>
    </div>
  );
};

export default Index;