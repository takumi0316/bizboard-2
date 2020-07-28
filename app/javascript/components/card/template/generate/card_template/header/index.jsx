import React from 'react';
import Style from './style.sass';

import { FONT_STYLE, ITEM_TYPE } from '../../../../properties.es6';

import { generateKey } from '../../../../util.js';

const Header = props => {

  return(
    <div className={ Style.CardTemplate }>
      <div className='c-table'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>名称</th>
              <th>テキスト種別</th>
              <th>書体</th>
              <th>サイズ</th>
              <th>色</th>
              <th>座標(x)</th>
              <th>座標(y)</th>
              <th>長さ</th>
              <th>行間</th>
            </tr>
          </thead>
          <tbody>
            { props.template.details.map((detail, index) => {
              const key = `detail-${props.status}-${generateKey(index)}`;
              return(
                <tr key={ key }>
                  <td className='u-va-middle u-va-center u-ta-center'>{ index + 1 }</td>
                  <td className='u-va-middle'><input type='text' className='c-form-text' defaultValue={ detail.name } onBlur={ e => props.onChangeDetail(e, index, 0) }/></td>
                  <td className='u-va-middle c-form-selectWrap'>
                    <select name='item_type' className='c-form-select' defaultValue={ detail.item_type } onChange={ e => props.onChangeDetail(e, index, 1 )}>
                      { Object.keys(ITEM_TYPE).map((item_type, index) => {
                        const key = `font-${ index }-${ item_type }`;
                        return(
                          <option { ...{ key } } value={ ITEM_TYPE[item_type] }>{ item_type }</option>
                        );
                      })};
                    </select>
                  </td>
                  <td className='u-va-middle c-form-selectWrap'>
                    <select name='font' className='c-form-select' defaultValue={ FONT_STYLE[detail.font] } onChange={ e => props.onChangeDetail(e, index, 2) }>
                      { /* <option value='nothing'>会社名を選択してください</option> */}
                      { Object.keys(FONT_STYLE).map((font, index) => {
                        const key = `font-${ index }-${ detail.font }`;
                        return (
                          <option { ...{ key } } value={ font }>{ font }</option>
                        );
                      })};
                    </select>
                  </td>
                  <td className='u-va-middle'><input className='u-ta-right c-form-text' defaultValue={ detail.font_size } onBlur={ e => props.onChangeDetail(e, index, 3) }/></td>
                  <td className='u-va-middle'><input className='u-ta-center c-form-text' defaultValue={ detail.font_color } onBlur={ e => props.onChangeDetail(e, index, 4) }/></td>
                  <td className='u-va-middle'><input className='u-ta-right c-form-text' defaultValue={ detail.coord_x } onBlur={ e => props.onChangeDetail(e, index, 5) }/></td>
                  <td className='u-va-middle'><input className='u-ta-right c-form-text' defaultValue={ detail.coord_y } onBlur={ e => props.onChangeDetail(e, index, 6) }/></td>
                  <td className='u-va-middle'><input className='u-ta-right c-form-text' defaultValue={ detail.length } onBlur={ e => props.onChangeDetail(e, index, 7) }/></td>
                  <td className='u-va-middle'><input className='u-ta-right c-form-text' defaultValue={ detail.line_space } onBlur={ e => props.onChangeDetail(e, index, 8) }/></td>
                </tr>
              );
              })  
            }
          </tbody>
        </table>
      </div>

      <div className='u-mt-10'>
        <button className='c-btnMain-primaryB' onClick={ e => props.addDetail(e) }>＋</button>
      </div>
    </div>
  );
};

export default Header;
