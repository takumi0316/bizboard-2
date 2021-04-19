import React, { Fragment } from 'react'

// components
import NoImage from './no_image'

const ReadOnly = props => {

  /**
   * htmlを埋め込む
   * @version 2019/12/26
   */
  const setDangerHtml = (text, style) => {
    const setText = text ? text.replace(/\n/g, '<br />') : text
    return <div className={ `${ style }` } dangerouslySetInnerHTML={{ __html: setText }}/>
  }

  return(
    <Fragment>
      { props.contents.map((content, index) => {
        const key = `content-${ index }`
        const content_type = content.content_type === 'image'
        const upload = () => content.uploads.find(upload => upload.id === content.upload_id)

        return(
          <tr { ...{key} }>
            { content_type ?
              <Fragment>
                { content.upload_id ?
                  <td className='u-ta-center u-va-middle'>{ upload().name }</td>
                  : <td className='u-ta-center u-va-middle'>No Image</td>
                }
              </Fragment>
              :
              <td className='u-ta-center u-va-middle'>{ content.name }</td>
            }
            <td className='u-ta-center u-va-middle'>
              { content_type ?
                <Fragment>
                  { content.upload_id ?
                    <img src={ upload().url } style={{ height: '150px', width: '150px' }}/>
                    : <NoImage style={{ height: '150px', width: '150px' }}/>
                  }
                </Fragment>
                :
                <Fragment>
                  { content.content_type === 'text' ?
                    content.text_value
                    : <Fragment>{ setDangerHtml(content.textarea_value) }</Fragment>
                  }
                </Fragment>
              }
            </td>
          </tr>
        )
      })}
    </Fragment>
  )
}

export default ReadOnly
