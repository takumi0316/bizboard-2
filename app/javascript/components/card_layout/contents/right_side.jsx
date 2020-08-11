import React, { useEffect, useRef, useState } from 'react';
import Style                       from './style.sass';

// ライブラリ
import SearchFlag from './search_flag';

// import プロパティ
import {
  LayoutTypes,
  FontColors,
  FontFamilies
} from './properties';

const RightSide = props => {
  
  const init = {
    is_reduction_rated: props.layout_content.is_reduction_rated,
    content_flag_name: props.layout_content.content_flag_name,
    content_flag_id: props.layout_content.content_flag_id,
    content_logo_name: props.layout_content.content_logo_name,
    content_logo_id: props.layout_content.content_logo_id,
  };
  
  const [state, setState] = useState(init);
  
  const type_ref = useRef(null);
  const name_ref = useRef(null);
  const font_family_ref = useRef(null);
  const font_size_ref = useRef(null);
  const font_color_ref = useRef(null);
  const x_coordinate_ref = useRef(null);
  const y_coordinate_ref = useRef(null);
  const reduction_rate_ref = useRef(null);
  const length_ref = useRef(null);
  const letter_spacing_ref = useRef(null);
  
  useEffect(() => {
  }, [state]);
  
  
  // フラグ検索反映
  const applyFlag = flag => setState({ ...state, content_flag_name: flag.name, content_flag_id: flag.id });
  
  const closeRightSide = e => {
    
    e.preventDefault();
  
    if(!name_ref.current.value) {
    
      window.alertable({ icon: 'info', message: 'コンテンツタイトルを入力してください。' });
      return
    };
  
    if(!state.content_flag_id) {
      
      window.alertable({ icon: 'info', message: 'フラグを登録してください。' });
      return;
    };
   
    const content = {
      'id': props.layout_content.id,
      'name': name_ref.current.value,
      'x_coordinate': x_coordinate_ref.current.value,
      'y_coordinate': y_coordinate_ref.current.value,
      'font_family': font_family_ref.current.value,
      'font_size': font_size_ref.current.value,
      'font_color': font_color_ref.current.value,
      'layout_length': length_ref.current.value,
      'letter_spacing': letter_spacing_ref.current.value,
      'reduction_rate': reduction_rate_ref.current ? reduction_rate_ref.current.value : props.layout_content.reduction_rate,
      'is_reduction_rated': state.is_reduction_rated,
      'layout_type': type_ref.current.value,
      'content_flag_name': state.content_flag_name,
      'content_flag_id': state.content_flag_id,
      'content_logo_name': state.content_logo_name,
      'content_logo_id': state.content_logo_id
    };
    
    props.saveContent(content);
  };
  
  return(
    <div className={ Style.RightSide }>
      <div className='u-mt-30 c-table'>
        <table>
          <thead>
            <tr>
              <th width='35%'>設定</th>
              <th>値</th>
            </tr>
          </thead>
          <tbody>
          
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>レイアウトタイプ</label></td>
              <td className='c-form-selectWrap'>
                <select name='layout_type' className='c-form-select' ref={ type_ref } defaultValue={ props.layout_content.layout_type }>
                  { Object.keys(LayoutTypes).map((layout_type, index) => {
                    const key = `layout_type-${ index }-${ layout_type }`;
                    return (
                      <option { ...{ key } } value={ LayoutTypes[layout_type] }>{ layout_type === 'text' ? 'テキスト' : 'テキストエリア' }</option>
                    );
                  })}
                </select>
              </td>
            </tr>
            
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>コンテンツタイトル</label></td>
              <td><input className='c-form-text' ref={ name_ref } defaultValue={ props.layout_content.name }/></td>
            </tr>
            
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>フォントファミリー</label></td>
              <td className='c-form-selectWrap'>
                <select name='font_family' className='c-form-select' ref={ font_family_ref } defaultValue={ props.layout_content.font_family }>
                  { Object.keys(FontFamilies).map((font_family, index) => {
                    const key = `layout_type-${ index }-${ font_family }`;
                    return (
                      <option { ...{ key } } value={ FontFamilies[font_family] }>{ font_family }</option>
                    );
                  })}
                </select>
              </td>
            </tr>
            
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>フォントサイズ</label></td>
              <td><input className='c-form-text' ref={ font_size_ref } defaultValue={ props.layout_content.font_size }/></td>
            </tr>
            
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>フォントカラー</label></td>
              <td className='c-form-selectWrap'>
                <select name='font_color' className='c-form-select' ref={ font_color_ref } defaultValue={ props.layout_content.font_color }>
                  { Object.keys(FontColors).map((font_color, index) => {
                    const key = `layout_type-${ index }-${ font_color }`;
                    return (
                      <option { ...{ key } } value={ FontColors[font_color] }>{ font_color }</option>
                    );
                  })}
                </select>
              </td>
            </tr>
            
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>座標(X)</label></td>
              <td><input className='c-form-text' ref={ x_coordinate_ref } defaultValue={ props.layout_content.x_coordinate }/></td>
            </tr>
            
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>座標(Y)</label></td>
              <td><input className='c-form-text' ref={ y_coordinate_ref } defaultValue={ props.layout_content.y_coordinate }/></td>
            </tr>
            
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>長さ</label></td>
              <td><input className='c-form-text' ref={ length_ref } defaultValue={ props.layout_content.layout_length } /></td>
            </tr>
            
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>文字間</label></td>
              <td><input className='c-form-text' ref={ letter_spacing_ref } defaultValue={ props.layout_content.letter_spacing } /></td>
            </tr>
            
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>縮小対応</label></td>
              <td>
                <label className='c-form-toggle'>
                  <input name='content_is_reduction_rate' type='hidden' defaultValue='false'/>
                  <input
                         name='content_is_reduction_rate' type='checkbox' defaultChecked={ props.layout_content.is_reduction_rated === '0' }
                         defaultValue={ state.is_reduction_rated === '0' } onClick={ () => setState({ ...state, is_reduction_rated: state.is_reduction_rated === '0' ? '10' : '0'}) }
                  />
                  <span data-on='縮小対応' data-off='縮小非対応'/>
                </label>
              </td>
            </tr>

            { state.is_reduction_rated === '0' ?
              <tr>
                <td className='u-ta-center'><label className='c-form-label'>最大</label></td>
                <td><input className='c-form-text' ref={ reduction_rate_ref } defaultValue={ props.layout_content.reduction_rate }/></td>
              </tr>
              : null
            }

            <tr>
              <td className='u-ta-center'><label className='c-form-label'>フラグ</label></td>
              <td><SearchFlag applyFlag={ applyFlag } flag_name={ state.content_flag_name }/></td>
            </tr>
          
          </tbody>
        </table>
      </div>
      <div className='u-mt-30 c-flex__center'>
        <button className='c-btnMain-standard' onClick={ closeRightSide }>保存する</button>
      </div>
    </div>
  );
};

export default RightSide;