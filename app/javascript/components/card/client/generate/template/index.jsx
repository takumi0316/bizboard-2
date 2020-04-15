import React from 'react';
import Style from './style.sass';

const Canvas = props => {

  return(
    <div className='u-mt-30 c-flex c-flex__alignItems_start'>
      <canvas className='c-border c-border-top c-border-left c-border-right'/>
      <div className={ `u-ml-30 ${Style.Template}` }>
        <div>
          <tr>
            <th colSpan='2'>表面</th>
          </tr>
          <tr>
            <th>名称</th>
            <td></td>
          </tr>
          <tr>
            <th>姓</th>
            <td>Oshima</td>
          </tr>
          <tr>
            <th>名</th>
            <td>Yuto</td>
          </tr>
          <tr>
            <th>会社名</th>
            <td>Oshima.inc</td>
          </tr>
          <tr>
            <th>部門名</th>
            <td>hogehoge</td>
          </tr>
        </div>
      </div>
    </div>
  );
};

export default Canvas;