import React, { Fragment } from 'react'

const Index = props => {

	const goOtherLayout = e => {

		e.preventDefault()

		const redirect = () => location.href = `/template_clients/${ props.card_template_id }/${ props.head ? 'tail'  : 'head' }?client_id=${ props.client_id }`
		window.alertable({ icon: 'success', message: '遷移します。', close_callback: () => redirect() })
	}

	return(
    <div className='u-mt-30'>
      <button className='c-btnMain' onClick={ goOtherLayout }>{ props.head ? '裏面設定' : '表面設定' }</button>
    </div>
  )
}

export default Index