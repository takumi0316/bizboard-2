import React, { Fragment, useEffect, useRef, useState } from 'react'

// components
import SearchImg from './search_img';

const Editing = props => {

  const init = { contents: props.contents };

  const [state, setState] = useState(init);

  useEffect(() => {
  }, [props])

  useEffect(() => {
  }, [state])

  const applyUpload = props => {

    const contents = JSON.parse(JSON.stringify(state.contents)).map((content, index) => {

      if(index != props.index) return content;

      if(index == props.index)  {

        return {...content, upload_id: props.upload_id};
      };
    });

    setState({ ...state, contents: contents });
  };

  return(
    <Fragment>
      { state.contents.map((content, index) => {

        const key = `content-${ index }`;
        const content_type = content.layout_type === 'image'
        const upload = () => {

          if(content_type) {

            if(content.upload_id) {

              const upload = content.uploads.filter(upload => upload.id === content.upload_id);
              return upload[0];
            };

            if(!content.upload_id) return content.uploads[0];
          };
        };

        return(
          <tr { ...{key} }>
            <td className='u-ta-center u-va-middle'>{ content.flag_name }</td>
            <td className='u-ta-center'>
              { content_type ?
                <Fragment>
                  <img id={ content.flag_name } data-set={ upload().id } src={ upload().url } style={{ height: '150px', width: '150px' }}/>
                  <SearchImg index={ index } uploads={ content.uploads } applyUpload={ applyUpload }/>
                </Fragment>
                : <Fragment>
                  { content.layout_type === 'text' ?
                    <input id={ content.flag_name } type='text' className='c-form-text' defaultValue={ content.text_value }/>
                    : <textarea id={ content.flag_name } className='c-form-textarea' defaultValue={ content.textarea_value }/>
                  }
                  </Fragment>
              }
            </td>
          </tr>
        );
      })}
    </Fragment>
  );
};

export default Editing;