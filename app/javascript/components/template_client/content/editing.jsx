import React, { Fragment, useState } from 'react'

// components
import NoImage from './no_image'
import SearchImg from './search_img';

const Editing = props => {

  const init = { contents: props.contents };

  const [state, setState] = useState(init);

  const applyUpload = props => {

    const contents = JSON.parse(JSON.stringify(state.contents)).map((content, index) => {

      if(index !== props.index) return content

      if(index === props.index)  return { ...content, upload_id: props.upload_id, no_image: props.no_image }
    })

    setState({ ...state, contents: contents });
  };

  return(
    <Fragment>
      { state.contents.map((content, index) => {

        const key = `content-${ index }`
        const content_type = content.content_type === 'image'
        const upload = () => {

          if(content_type) {

            let re_upload;
            if(content.upload_id) {

              const upload = content.uploads.filter(upload => upload.upload_id === content.upload_id)
              re_upload = upload[0]
            }

            if(!content.upload_id || !re_upload) re_upload = content.uploads[0]

            return re_upload
          }
        }

        return(
          <tr { ...{ key } }>
            <td className='u-ta-center u-va-middle'>{ content_type ? upload().name : content.flag_name }</td>
            <td className='u-ta-center'>
              { content_type ?
                <Fragment>
                  { content.no_image ?
                    <NoImage id={ content.flag_name } style={{ height: '150px', width: '150px' }}/>
                    : <img id={ content.flag_name } data-set={ upload().upload_id } src={ upload().url } style={{ height: '150px', width: '150px' }}/>
                  }
                  <SearchImg index={ index } uploads={ content.uploads } applyUpload={ applyUpload }/>
                </Fragment>
                :
                <Fragment>
                  { content.content_type === 'text' ?
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