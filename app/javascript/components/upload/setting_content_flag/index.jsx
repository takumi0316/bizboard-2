import React, { Fragment, useState } from 'react';

// components
import FlagSearch from './flag_search'

const SettingContentFlag = props => {
 
  const init = { content_flag_uploads: props.content_flag_uploads }

  const [state, setState] = useState(init)

  const applyFlag = flag => {
    
    const parse_content_flag_uploads = JSON.parse(JSON.stringify(state.content_flag_uploads))
    parse_content_flag_uploads.push({ id: '', content_flag_id: flag.id, content_flag_name: flag.name, upload_id: props.upload_id, _destroy: '' })
    setState({ ...state, content_flag_uploads: parse_content_flag_uploads })
  }

  // フラグの紐付けを解除
  const unlinkFlag = (e, num) => {
    e.preventDefault()
    setState({ ...state, content_flag_uploads: state.content_flag_uploads.map((content_flag_upload, index) => index === num ? { ...content_flag_upload, _destroy: '1' } : content_flag_upload) })
  }
  
  return(
    <div>
      <div className='u-mt-15'>
        <label className='c-form-label'>| フラグ</label>
      </div>
      <div className='u-mt-15 c-table'>
        <table>
          <thead>
            <tr>
              <th className='u-ta-center'>フラグID</th>
              <th className='u-ta-center'>フラグタイトル</th>
              <th colSpan='2'/>
            </tr>
          </thead>
          <tbody>
            { state.content_flag_uploads.map((content_flag_upload, index) => {
              const key = 'content_flag_upload-' + index
              return(
                <Fragment { ...{key} }>
                  { !content_flag_upload._destroy ?
                    <tr>
                      <td className='u-ta-center u-va-middle'>{ content_flag_upload.content_flag_id }</td>
                      <td className='u-ta-center u-va-middle'>{ content_flag_upload.content_flag_name }</td>
                      <td className='u-ta-center u-va-middle'><button className='c-btnMain c-btn-red' onClick={ e => unlinkFlag(e, index) }>削除</button></td>
                    </tr>
                    : null
                  }
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
      <FlagSearch applyFlag={ applyFlag }/>
      { state.content_flag_uploads.map((content_flag_upload, index) => {
        const key = 'hidden_content_flag_upload-' + index
        return(
          <Fragment { ...{key} }>
            <input type='hidden' name='upload[content_flag_uploads_attributes][][id]' value={ content_flag_upload.id || '' }/>
            <input type='hidden' name='upload[content_flag_uploads_attributes][][content_flag_id]' value={ content_flag_upload.content_flag_id }/>
            <input type='hidden' name='upload[content_flag_uploads_attributes][][upload_id]' value={ content_flag_upload.upload_id }/>
            <input type='hidden' name='upload[content_flag_uploads_attributes][][_destroy]' value={ content_flag_upload._destroy }/>
          </Fragment>
        )
      })}
    </div>
  )
}

export default SettingContentFlag