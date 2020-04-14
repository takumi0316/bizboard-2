import React, { Fragment } from 'react';
import Style from './style.sass';

import {
  generateKey
} from '../../util';

const Header = props => {

  return(
    <div className={ `u-ml-30 ${Style.Header}` }>
      <div className='c-table'>
        <table>
          <tr>
            <th className='u-ta-center' colSpan='2'>表面</th>
          </tr>
          <tr>
            <th>名称</th>
            <th>入力値</th>
          </tr>
          { props.client_template.values.map((value, index) => {
            const key = `value-${props.status}-${generateKey(index)}`;

            return(
              <tr key={ key }>
                <th>{ value.name }</th>
                <td className='u-ta-center'><input id={ value.id } index={ index } className='u-ta-center c-form-text' defaultValue={ value.value } onBlur={ e => props.onChangeValue(e) }/></td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Header;