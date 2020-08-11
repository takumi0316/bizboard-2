import React, { Fragment } from 'react';

const Index = props => {
  
  return(
    <Fragment>
      <div className='u-mt-10 c-table'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>名称</th>
              <th>フラグ</th>
              <th colSpan='2'/>
            </tr>
          </thead>
          <tbody>
          { props.layout_contents.map((layout_content, index) => {
            const key = `layout_content-${ layout_content.id }-${ index }`;
            return(
              <tr { ...{ key } }>
                <td className='u-ta-center'>{ index + 1 }</td>
                <td className='u-ta-center'>{ layout_content.name }</td>
                <td className='u-ta-center'>{ layout_content.flag_name }</td>
                <td className='u-ta-center'><button data-number={ index } className='c-btnMain-standard' onClick={ props.openRightPanel }>編集</button></td>
                <td className='u-ta-center'><button data-number={ index } className='c-btnMain-primaryA' onClick={ props.removeContent }>削除</button></td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
      <button className='u-mt-20 c-btnMain-primaryB' onClick={ props.addContent }>コンテンツを追加する</button>
    </Fragment>
  );
};

export default Index;