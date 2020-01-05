import React from 'react';

import {
  TAX_TYPES,
  PAYMENT_TERMS,
} from '../properties.es6';

const PaymentDetails = props => {

	return(
		<div className={ 'c-table u-mt-10' }>
      <table>
        <tbody>
          <tr>
            <td className='u-fw-bold'>値引き</td>
            <td>
              <div className='u-mt-15'>
              	<label className='c-form-radioLabel'>
                	<input type='radio' checked={ !props.show } onChange={ () => props.setShow(false) } className='c-form-radio' />
                	<i className='c-form-radioIcon' />
                	<span>値引きなし</span>
                </label>
                <label className='c-form-radioLabel u-ml-15'>
                  <input type='radio' checked={ props.show } onChange={ () => props.setShow(true) } className='c-form-radio' />
                  <i className='c-form-radioIcon' />
                  <span>値引きあり</span>
                </label>
              </div>
              <div className='u-mt-15'>
                { props.show ?
									<textarea placeholder='2000' className='c-form-textarea' onChange={ e => props.setDiscount(e.target.value) }
														type='text' defaultValue={ props.discount } />
                  : null
                }
              </div>
            </td>
          </tr>
          <tr>
            <td className='u-fw-bold'>課税対象</td>
            <td>
              <div className='c-form-selectWrap'>
                <select className='c-form-select' defaultValue={ props.tax_type } onChange={ e => props.setTaxType(e.target.value) }>
                  { Object.keys(TAX_TYPES).map((item, index) => {
                    const key = 'tax-'+index;
                    return (
                      <option {...{key}} value={TAX_TYPES[item]}>{item}</option>
                    );
                  }) }
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td className='u-fw-bold'>支払い方法</td>
            <td>
              <div className='c-form-selectWrap'>
                <select className='c-form-select' defaultValue={ props.payment_terms } onChange={ e => props.setPaymentTerms(e.target.value) }>
                  { Object.keys(PAYMENT_TERMS).map((item, index) => {
										const key = 'payment-'+index;
                    return (
                      <option {...{key}} value={PAYMENT_TERMS[item]}>{item}</option>
                    );
                  })}
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td className='u-fw-bold'>合計金額</td>
            <td>
							<textarea readOnly placeholder='合計金額' className='c-form-textarea' autoComplete='off' spellCheck='false'
												type='text' value={ props.price }
							/>
            </td>
          </tr>
          <tr>
          	<td className='u-fw-bold'>備考 ※見積もりに記載されます</td>
            <td>
							<textarea placeholder='案件に関する備考を入力してください ※見積もりに記載されます' className='c-form-textarea' row={5}
												autoComplete='off' spellCheck='false' type='text' defaultValue={ props.remarks } onBlur={ e => props.setRemarks(e.target.value) }
							/>
            </td>
          </tr>
          <tr>
          	<td className='u-fw-bold'>メモ ※見積もりに記載されません</td>
            <td>
							<textarea placeholder='案件に関するメモを入力してください ※見積もりに記載されません' className='c-form-textarea' row={5}
												autoComplete='off' spellCheck='false' type='text' defaultValue={ props.memo } onBlur={ e => props.setMemo(e.target.value) }
							/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
	);
};

export default PaymentDetails;
