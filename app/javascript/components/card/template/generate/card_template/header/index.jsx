import React from 'react';
import Style from './style.sass';

import { FONT_STYLE } from '../../../../properties.es6';

import { generateKey } from '../../../../util.js';

const Header = props => {

  return(
    <div className='u-ml-30'>
      <div className='c-table'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>名称</th>
              <th>書体</th>
              <th>サイズ</th>
              <th>色</th>
              <th>座標(x)</th>
              <th>座標(y)</th>
              { /* <th>長さ</th> */ }
              <th>行間</th>
            </tr>
          </thead>
          <tbody>
            { props.template.details.map((detail, index) => {
                const key = `detail-${props.status}-${generateKey(index)}`; 
                return(
                  <tr key={ key }>
                    <td className='u-va-center u-ta-center'>{ index + 1 }</td>
                    <td><input className='u-ta-center c-form-text' defaultValue={ detail.name } onBlur={ e => props.onChangeDetail(e, index, 0) }/></td>
                    <td className='c-form-selectWrap'>
                      <select name='font' className='c-form-select' defaultValue={ FONT_STYLE[detail.font] } onChange={ e => props.onChangeDetail(e, index, 1) }>
                        { /* <option value='nothing'>会社名を選択してください</option> */}
                        { Object.keys(FONT_STYLE).map((font, index) => {
                          const key = `font-${index}`;
                          return (
                            <option {...{key}} value={ font }>{ font }</option>
                          );
                        })}
                      </select>
                    </td>
                    <td><input className='u-ta-right c-form-text' defaultValue={ detail.font_size } onBlur={ e => props.onChangeDetail(e, index, 2) }/></td>
                    <td><input className='u-ta-center c-form-text' defaultValue={ detail.font_color } onBlur={ e => props.onChangeDetail(e, index, 3) }/></td>
                    <td><input className='u-ta-right c-form-text' defaultValue={ detail.coord_x } onBlur={ e => props.onChangeDetail(e, index, 4) }/></td>
                    <td><input className='u-ta-right c-form-text' defaultValue={ detail.coord_y } onBlur={ e => props.onChangeDetail(e, index, 5) }/></td>
                    { /* <td><input className='u-ta-right c-form-text' defaultValue={ detail.length } onBlur={ e => props.onChangeDetail(e, index, 6) }/></td> */ }
                    <td><input className='u-ta-right c-form-text' defaultValue={ detail.line_space } onBlur={ e => props.onChangeDetail(e, index, 7) }/></td>
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
