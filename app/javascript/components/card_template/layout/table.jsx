import React, { Fragment } from 'react';

const Table = props => {
  
  // レイアウトの紐付けを解除
  const unlinkLayout = e => {
    
    e.preventDefault();
    props.unlinkLayout(props.status, e.target.dataset.number);
  };
  
  return(
    <div className='u-mt-30 c-table'>
      <table>
        <thead>
          <tr>
            <th className='u-ta-center'>レイアウトID</th>
            <th className='u-ta-center'>レイアウトタイトル</th>
            <th colSpan='2'/>
          </tr>
        </thead>
        <tbody>
          { props.template_layouts.map((template_layout, index) => {
            
            const key = 'template_layout-' + index;
            return(
              <Fragment { ...{key} }>
                { !template_layout._destroy ?
                  <tr>
                    <td className='u-ta-center u-va-middle'>{ template_layout.card_layout_id }</td>
                    <td className='u-ta-center u-va-middle'>{ template_layout.layout_name }</td>
                    <td className='u-ta-center u-va-middle'><a className='c-btnMain c-btn-blue' href={ `/card_layouts/${ template_layout.card_layout_id }/edit` }>編集</a></td>
                    <td className='u-ta-center u-va-middle'><button className='c-btnMain c-btn-red' data-number={ index } onClick={ unlinkLayout }>削除</button></td>
                  </tr>
                  : null
                }
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;