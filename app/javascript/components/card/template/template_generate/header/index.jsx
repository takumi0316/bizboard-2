import React from 'react';
import Style from './style.sass';

import {
  generateKey
} from '../util.js';

const Header = props => {

  return(
    <div className={ `u-ml-30 ${Style.Header}` }>
      <div className='c-table'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>名称</th>
              <th>フォント</th>
              <th>フォントサイズ</th>
              <th>フォントカラー</th>
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
                    <td className='u-va-center u-ta-center'>{ index + 1 }</td>
                    <td><input id='name' index={ index } className='u-ta-center c-form-text' defaultValue={ detail.name } onBlur={ e => props.onChangeDetail(e) }/></td>
                    <td><input id='font' index={ index } className='u-ta-center c-form-text' defaultValue={ detail.font } onBlur={ e => props.onChangeDetail(e) }/></td>
                    <td><input id='font_size' index={ index } className='u-ta-right c-form-text' defaultValue={ detail.font_size } onBlur={ e => props.onChangeDetail(e) }/></td>
                    <td><input id='font_color' index={ index } className='u-ta-center c-form-text' defaultValue={ detail.font_color } onBlur={ e => props.onChangeDetail(e) }/></td>
                    <td><input id='coord_x' index={ index } className='u-ta-right c-form-text' defaultValue={ detail.coord_x } onBlur={ e => props.onChangeDetail(e) }/></td>
                    <td><input id='coord_y' index={ index } className='u-ta-right c-form-text' defaultValue={ detail.coord_y } onBlur={ e => props.onChangeDetail(e) }/></td>
                    <td><input id='length' index={ index } className='u-ta-right c-form-text' defaultValue={ detail.length } onBlur={ e => props.onChangeDetail(e) }/></td>
                    <td><input id='line_space' index={ index } className='u-ta-right c-form-text' defaultValue={ detail.line_space } onBlur={ e => props.onChangeDetail(e) }/></td>
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