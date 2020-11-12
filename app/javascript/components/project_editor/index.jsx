import React, { useRef, useState } from 'react'
import Style from './style.sass'

/**
 *  記事エディター
 *  @version 2018/06/10
 */
const ProjectEditor = props => {

  const nameRef = useRef(null)
  const priceRef = useRef(null)
  const codeRef = useRef(null)
  const noteRef = useRef(null)

  const init = {
    company: props.company,
    division: props.division,
    client: props.client,
    price: props.project.price || 0,
    code: props.project.code,
  }
 
  const [state, setState] = useState(init)
  
  /**
   *  バリデーション
   *  @version 2018/06/10
   */
  const validation= () => {

    const message = []

    if(!nameRef.current.value) message.push('品目名を入力してください。')

    return message
  }

  /**
   *  登録処理
   *  @version 2018/06/10
   */
  const onSubmit = () => {

    const messages = validation()
  
    // エラーが存在する場合
    if (messages.length > 0) {
    
      alert(messages.join('\n'))
      return false
    }

    const field = new FormData()
    field.append('project[name]', nameRef.current.value)
    field.append('project[price]', priceRef.current.value)
    field.append('project[code]', codeRef.current.value)
    field.append('project[note]', noteRef.current.value)
    // 新規登録時、更新時とでmethodを分ける
    const request = props.project.id ? window.xhrRequest.put(props.action, field) : window.xhrRequest.post(props.action, field)
  
  
    // もっといい表現はありそう
    const err_message = props.project.id ? '品目の更新に失敗しました。' : '品目の作成に失敗しました。'
    const success_message = props.project.id ? '品目の更新に成功しました。' : '品目の作成に成功しました。'
    request.then(res => {
      
      if(res.data.status === 'success' && res.data.project.id) {

        const redirect = () => location.href = `/projects`
        window.alertable({ icon: 'success', message: success_message, close_callback: redirect })
        
      } else {
  
        window.alertable({ icon: 'info', message: err_message })
      }
    }).catch(err => {
      window.alertable({ icon: 'info', message: err_message })
      console.log('Error Log : ', err)
    })
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  return (
    <div className={ Style.ProjectEditor }>

      <h1 className='l-dashboard__heading'>品目作成</h1>

      <div className='c-form-label u-mt-30'>
        <label>品目名</label>
        <span className='c-form__required u-ml-10'>必須</span>
      </div>
      <input
        placeholder='品目名'
        className='c-form-text'
        required='required'
        autoComplete='off'
        spellCheck='false'
        type='text'
        ref={ nameRef }
        defaultValue={ props.project.name }
      />

      <div className='c-form-label u-mt-30'>
        <label>品目単価 <span className='u-fs-small u-fc-thinBlack'>※更新時に価格が自動計算されます</span></label>
      </div>
      <input
        placeholder='※更新時に価格が自動計算されます'
        readOnly={ true }
        className='c-form-text'
        required='required'
        autoComplete='off'
        spellCheck='false'
        type='text'
        value={ Utilities.numberWithDelimiter(state.price) }
      />

      <div className='c-form-label u-mt-30'>
        <label>品目コード <span className='u-fs-small u-fc-thinBlack'>※客先システムの番号がある場合は入力してください</span></label>
      </div>
      <input
        placeholder='品目コード'
        className='c-form-text'
        autoComplete='off'
        spellCheck='false'
        type='text'
        ref={ codeRef }
        defaultValue={ props.project.code }
      />

      <div className={ Style.ProjectEditor }>
        <div className='u-mt-30 c-table'>
          <table>
            <tbody>
              <tr>
                <td className='u-fw-bold'>備考</td>
                <td>
                  <textarea
                    placeholder='内容を入力してください'
                    className='c-form-textarea'
                    row={5}
                    autoComplete='off'
                    spellCheck='false'
                    type='text'
                    ref={ noteRef }
                    defaultValue={ props.project.note }
                  />
                </td>
              </tr>
              <tr>
                <td className='u-fw-bold'>金額</td>
                <td>
                  <input className='c-form-text' ref={ priceRef } type='text' defaultValue={ props.project.price || 0 }/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='c-overlay-submit'>
        <div className='c-btnMain-standard c-btn-blue' onClick={ onSubmit }>{ props.project.id ? '更新する' : '作成する' }</div>
      </div>
    </div>
  )
}

export default ProjectEditor
