import React from 'react';
import Style from './style.sass';

import { generateKey } from '../../../../../util';

const Header = props => {

  return(
    <div className={ Style.Header }>
      <div className='c-table'>
        <table>
          <thead>
            <tr>
              <th>名称</th>
              <th>入力値</th>
            </tr>
          </thead>
          <tbody>
            { props.client_template.values.map((value, index) => {
              const key = `value-${props.status}-${generateKey(index)}`;

              return(
                <tr key={ key }>
                  <td className='u-ta-center u-va-middle'>{ value.name }</td>
                  <td className='u-ta-center'>
                    { value.item_type === 'text_area' ?
                      <textarea className='u-ta-center c-form-text' defaultValue={ value.value } onBlur={ e => props.onChangeValue(e, index) }/>
                      :
                      <input type='text' className='u-ta-center c-form-text' defaultValue={ value.value } onBlur={ e => props.onChangeValue(e, index) }/>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Header;