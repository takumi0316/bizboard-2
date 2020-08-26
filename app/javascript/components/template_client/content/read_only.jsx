import React, { Fragment } from 'react'

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
                <img src={ upload().url } style={{ height: '150px', width: '150px' }}/>
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
