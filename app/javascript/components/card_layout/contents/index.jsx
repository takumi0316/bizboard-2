import React, { Fragment } from 'react';

// import ライブラリ
import { generateKey } from '../util';

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

            const key =  generateKey(`layout_content-${ index }`);
            return(
              <Fragment { ...{key} }>
                { !layout_content._destroy ?
                  <tr>
                    <td className='u-ta-center'>{ index + 1 }</td>
                    <td className='u-ta-center'>{ layout_content.content_type != 'image' ? layout_content.name : '画像' }</td>
                    <td className='u-ta-center'>{ layout_content.content_flag_name }</td>
                    <td className='u-ta-center'><button data-number={ index } className='c-btnMain-standard' onClick={ props.openRightPanel }>編集</button></td>
                    <td className='u-ta-center'><button data-number={ index } className='c-btnMain-primaryA' onClick={ props.removeContent }>削除</button></td>
                  </tr>
                  : null
                }
              </Fragment>
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