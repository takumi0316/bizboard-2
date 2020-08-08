import React, { Fragment } from 'react';

import Style from './style.sass';

const RightSide = props => {
  
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
              <td className='u-ta-center'><label className='c-form-label'>コンテンツタイトル</label></td>
              <td className='u-ta-center'><input className='c-form-text' defaultValue={ props.layout_content.name }/></td>
            </tr>
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>フォントファミリー</label></td>
              <td className='u-ta-center'><input className='c-form-text' defaultValue={ props.layout_content.font_family }/></td>
            </tr>
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>フォントサイズ</label></td>
              <td className='u-ta-center'><input className='c-form-text' defaultValue={ props.layout_content.font_size }/></td>
            </tr>
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>フォントカラー</label></td>
              <td className='u-ta-center'><input className='c-form-text' defaultValue={ props.layout_content.font_color }/></td>
            </tr>
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>座標(X)</label></td>
              <td className='u-ta-center'><input className='c-form-text' defaultValue={ props.layout_content.x_coordinate }/></td>
            </tr>
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>座標(Y)</label></td>
              <td className='u-ta-center'><input className='c-form-text' defaultValue={ props.layout_content.y_coordinate }/></td>
            </tr>
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>長さ</label></td>
              <td className='u-ta-center'><input className='c-form-text' defaultValue={ props.layout_content.layout_length } /></td>
            </tr>
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>縮小対応</label></td>
              <td>
                <label className='c-form-toggle'>
                  <input name='content_is_reduction_rate' type='hidden' defaultValue='false'/>
                  <input name='content_is_reduction_rate' type='checkbox' defaultChecked={ true } defaultValue='true' onChange={ e => console.log(e) }/>
                  <span data-on='縮小対応' data-off='縮小非対応'/>
                </label>
              </td>
            </tr>
            <tr>
              <td className='u-ta-center'><label className='c-form-label'>最大</label></td>
              <td className='u-ta-center'><input className='c-form-text' defaultValue={ props.layout_content.reduction_rate } /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='u-mt-30 c-flex__center'>
        <button className='c-btnMain-standard' onClick={ props.saveContent }>保存する</button>
      </div>
    </div>
  );
};

export default RightSide;