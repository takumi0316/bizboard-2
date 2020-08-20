import React, { Fragment, useEffect, useState } from 'react'
import Style from './style.sass';

const Popup = props => {

  const init = {
    show: false,
    layout: {},
  };

  const [state, setState] = useState(init);

  useEffect(() => {

    if(props.selected) start();
    if(!props.selected) finish();
    }, [props])

  useEffect(() => {
  }, [state])

  /**
   *  ローディング開始
   *
   * @version 2018/06/10
   * */
  const start = () => setState({ show: true, layout: props.select_layout });

  /**
   *  ローディング終了
   *  @version 2018/06/10
   */
  const finish = () => setState({ show: false });

  const stopPropagation = e => e.stopPropagation();

  const apply = e => {

    stopPropagation(e);
    props.applyLayout();
  };

  const clear = e => {

    stopPropagation(e);
    props.clearSelectLayout();
  };

  return(
    <Fragment>
      { state.show ?
        <div className={ Style.Select } onMouseDown={ stopPropagation } onClick={ stopPropagation }>
          <div className={ Style.Select__inner }>
            <img src={ state.layout.url }/>
            <div className='u-mt-30'>
              <button className='c-btnMain-standard' onClick={ apply }>適用する</button>
              <button className='u-ml-20 c-btnMain-primaryC' onClick={ clear }>やっぱやめる</button>
            </div>
          </div>
        </div>
        : null
      }
    </Fragment>
  );
};

export default Popup;