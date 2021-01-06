import React, { Fragment } from 'react'

// components
import NoImage from './no_image'

const ReadOnly = props => {

  /**
   * htmlを埋め込む
   * @version 2019/12/26
   */
  const setDangerHtml = (text, style) => {

    const setText = text ? text.replace(/\n/g, '<br />') : text;
    return(
      <div className={ `${ style }` } dangerouslySetInnerHTML={{ __html: setText }}/>
    );
  };

  return(
    <Fragment>
      { props.contents.map((content, index) => {

        const key = `content-${ index }`;
        const content_type = content.content_type === 'image'
        const upload = () => {

          if(content_type) {

            let re_upload ;
            if(content.upload_id) {

              const upload = content.uploads.filter(upload => upload.upload_id === content.upload_id);
              re_upload = upload[0];
            };

            if(!content.upload_id || !re_upload) {

              re_upload = content.uploads[0];
            };

            return re_upload;
          };
        };

        return(
          <tr { ...{key} }>
            <td className='u-ta-center u-va-middle'>{ content_type ? content.no_image ? 'No Image' : upload().name : content.name }</td>
            <td className='u-ta-center u-va-middle'>
              { content_type ?
                <Fragment>
                  { content.no_image ?
                    <NoImage style={{ height: '150px', width: '150px' }}/>
                    : <img src={ upload().url } style={{ height: '150px', width: '150px' }}/>
                  }
                </Fragment>
                : <Fragment>
                  { content.content_type === 'text' ?
                    content.text_value
                    : <Fragment>{ setDangerHtml(content.textarea_value) }</Fragment>
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

export default ReadOnly;
