import React, { Fragment, useEffect, useState } from 'react'
import Style from './style.sass';

// import components
import ReadOnly from './read_only';
import Editing  from './editing';

const Index = props => {

  return(
    <div className={ Style.Content }>
      <div className='c-table'>
        <table>
          <thead>
            <tr>
              <th width='45%'>名称</th>
              <th>登録情報</th>
            </tr>
          </thead>
          <tbody>
            { props.editing ?
              <Editing contents={ props.contents }/>
              : <ReadOnly contents={ props.contents }/>
            }
          </tbody>
        </table>
      </div>
      <div className='u-mt-30 u-ta-center'>
        { props.editing ?
          <Fragment>
            { props.contents.length > 0 ?
              <button className='c-btnMain c-btn-blue' onClick={ props.saveContent }>保存</button>
              : null
            }
          </Fragment>
          :
          <Fragment>
            { props.contents.length > 0 ?
              <button className='c-btnMain' onClick={ props.editContent }>編集</button>
              : null
            }
          </Fragment>
        }
      </div>
    </div>
  );
};

export default Index;
