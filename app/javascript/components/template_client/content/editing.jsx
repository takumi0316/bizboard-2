import React, { Fragment, useState } from 'react'

// components
import NoImage from './no_image'
import SearchImg from './search_img'

const Editing = props => {

  const init = { contents: props.contents }

  const [state, setState] = useState(init)

  const applyUpload = props => {

    const contents = JSON.parse(JSON.stringify(state.contents)).map((content, index) => {

      if(index !== props.index) return content

      if(index === props.index)  return { ...content, upload_id: props.upload_id }
    })

    setState({ ...state, contents: contents })
  }

  return(
    <Fragment>
      { state.contents.map((content, index) => {
        const key = `content-${ index }`
        const content_type = content.content_type === 'image'
        const upload = () => content.uploads.find(upload => upload.upload_id === content.upload_id)

        console.log({ ...content })
        return(
          <tr { ...{ key } }>
            <td className='u-ta-center u-va-middle'>{ content.flag_name }</td>
            { /* content_type ?
              <Fragment>
                { content.upload_id ?
                  <td className='u-ta-center u-va-middle'>{ upload().name }</td>
                  : <td className='u-ta-center u-va-middle'>No Image</td>
                }
              </Fragment>
              : <td className='u-ta-center u-va-middle'>{ content.flag_name }</td>
            */ }
            <td className='u-ta-center'>
              { content_type ?
                <Fragment>
                  { content.upload_id ?
                    <img id={ content.flag_name } data-set={ upload().upload_id } src={ upload().url } style={{ height: '150px', width: '150px' }}/>
                    : <NoImage id={ content.flag_name } style={{ height: '150px', width: '150px' }}/>
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
        )
      })}
    </Fragment>
  )
}

export default Editing
