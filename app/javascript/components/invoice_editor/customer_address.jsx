import React, { Fragment, useState } from 'react'

const CustomerAddress = props => {

	const init = {
    honorific: true,
    person: true,
    company: props.company,
    division: props.division || {
      name: '',
      zip: '',
      address1: '',
      address2: ''
    },
    client: props.client
	}

  const [state, setState] = useState(init)

  const setHonorific = () => setState({ ...init, honorific: !state.honorific })

  const setPerson = () => setState({ ...state, person: !state.person })

	return(
    <Fragment>
      { state.honorific ?
        <Fragment>
          <div className='u-mt-10'><button className='c-btnMain' onClick={ setHonorific }>担当者ベースにする</button></div>
          <div className='u-mt-10'>
            <label className='c-form-label'>会社名</label>
            <input key={ `company_${ state.company }_${ state.honorific }` } type='text' name='company' className='c-form-text' placeholder='株式会社〇〇〇〇' defaultValue={ state.company }/>
          </div>
          <div className='u-mt-10'>
            <label className='u-mt-10 c-form-label'>郵便番号</label>
            <input key={ `division_zip_${ state.division.zip }_${ state.honorific }` } type='text' name='zip' className='c-form-text' placeholder='〇〇〇-〇〇〇〇' defaultValue={ state.division.zip }/>
          </div>
          <div className='u-mt-10'>
            <label className='c-form-label'>住所1</label>
            <input key={ `division_address1_${ state.division.address1 }_${ state.honorific }` } type='text' name='address1' className='c-form-text' placeholder='東京都中央区新川' defaultValue={ state.division.address1 }/>
          </div>
          <div className='u-mt-10'>
            <label className='c-form-label'>住所2</label>
            <input key={ `division_address2_${ state.division.address2 }_${ state.honorific }` } type='text' name='address2' className='c-form-text' placeholder='2丁目26番地3 茅場町不動産ビル2号館' defaultValue={ state.division.address2 }/>
          </div>
          <div className='u-mt-10'>
            <label className='c-form-label'>部署名</label>
            <input key={ `division_${ state.division.name }_${ state.honorific }` } type='text' name='division' className='c-form-text' placeholder='経営管理部' defaultValue={ state.division.name }/>
          </div>
          { !state.person ?
            <div className='u-mt-10'>
              <label className='c-form-label'>担当者名</label>
              <input key={ `client_${ state.client }_${ state.honorific }` } type='text' name='client' className='c-form-text' placeholder='米田昌悟' defaultValue={ state.client }/>
              <div className='u-mt-10'><button className='c-btnMain' onClick={ setPerson }>担当者を無効にする</button></div>
            </div>
            :
            <Fragment>
              <div className='u-mt-10 c-form-label'> ※担当者名の入力が必要な場合のみ押下してください。</div>
              <div><button className='c-btnMain' onClick={ setPerson }>担当者を有効にする</button></div>
            </Fragment>
          }
        </Fragment>
      :
        <Fragment>
          <div className='u-mt-10 '><button className='c-btnMain' onClick={ setHonorific }>会社ベースにする</button></div>
          <div className='u-mt-10'>
            <label className='c-form-label'>担当者名</label>
            <input key={ `company_${ state.company }_${ state.honorific }` } type='text' name='client' className='c-form-text' placeholder='米田昌悟' defaultValue={ state.client }/>
          </div>
          <div className='u-mt-10'>
            <label className='u-mt-10 c-form-label'>郵便番号</label>
            <input key={ `division_zip_${ state.division.zip }_${ state.honorific }` } type='text' name='zip' className='c-form-text' placeholder='〇〇〇-〇〇〇〇' defaultValue={ state.division.zip }/>
          </div>
          <div className='u-mt-10'>
            <label className='c-form-label'>住所1</label>
            <input key={ `division_address1_${ state.division.address1 }_${ state.honorific }` } type='text' name='address1' className='c-form-text' placeholder='東京都中央区新川' defaultValue={ state.division.address1 }/>
          </div>
          <div className='u-mt-10'>
            <label className='c-form-label'>住所2</label>
            <input key={ `division_address2_${ state.division.address2 }_${ state.honorific }` } type='text' name='address2' className='c-form-text' placeholder='2丁目26番地3 茅場町不動産ビル2号館' defaultValue={ state.division.address2 }/>
          </div>
          <div className='u-mt-10'>
            <label className='c-form-label'>部署名</label>
            <input key={ `division_${ state.division }_${ state.honorific }` } type='text' name='division' className='c-form-text' placeholder='経営管理部' defaultValue={ state.division.name }/>
          </div>
        </Fragment>
      }
    </Fragment>
  )
}

export default CustomerAddress
