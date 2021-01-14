import React from 'react';

import {
  TAX_TYPES,
  PAYMENT_TERMS,
} from '../properties.es6';

const PaymentDetails = props => {

	return(
		<div className='c-table u-mt-10'>
      <table>
        <tbody>
          <tr>
            <td className='u-va-middle u-fw-bold'>値引き</td>
            <td>
              <div className='u-mt-15'>
              	<label className='c-form-radioLabel'>
                	<input type='radio' checked={ !props.show } disabled={ props.lock && props.show ? 'disabled' : null} onChange={ () => props.setShow(false) } className='c-form-radio' />
                	<i className='c-form-radioIcon' />
                	<span>値引きなし</span>
                </label>
                <label className='c-form-radioLabel u-ml-15'>
                  <input type='radio' checked={ props.show } disabled={ props.lock && !props.show ? 'disabled' : null} onChange={ () => props.setShow(true) } className='c-form-radio' />
                  <i className='c-form-radioIcon' />
                  <span>値引きあり</span>
                </label>
              </div>
              <div className='u-mt-15'>
                { props.show ?
                  <input placeholder='2000' className='c-form-text' disabled={ props.lock? 'disabled' : null} onChange={ e => props.setDiscount(e.target.value) } type='text' defaultValue={ props.discount } />
                  : null
                }
              </div>
            </td>
          </tr>
          <tr>
            <td className='u-va-middle u-fw-bold'>課税対象</td>
            <td>
              <div className='c-form-selectWrap'>
                <select className='c-form-select' defaultValue={ props.tax_type } disabled={ props.lock? 'disabled' : null} onChange={ e => props.setTaxType(e.target.value) }>
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
            <td className='u-va-middle u-fw-bold'>支払い方法</td>
            <td>
              <div className='c-form-selectWrap'>
                <select className='c-form-select' defaultValue={ props.payment_terms } disabled={ props.lock? 'disabled' : null} onChange={ e => props.setPaymentTerms(e.target.value) }>
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
            <td className='u-va-middle u-fw-bold'>合計金額</td>
            <td>
							<input readOnly placeholder='合計金額' className='c-form-text' type='text' autoComplete='off' spellCheck='false' value={ props.price }/>
            </td>
          </tr>
          <tr>
            <td className='u-va-middle u-fw-bold'>利益額(暫定)</td>
            <td>
              <input placeholder='利益額' className='c-form-text' disabled={ props.lock? 'disabled' : null} onChange={ e => props.setProfitPrice(e.target.value) } type='text' defaultValue={ props.profit_price } />
            </td>
          </tr>
          <tr>
          	<td className='u-va-middle u-fw-bold'>備考 ※見積もりに記載されます</td>
            <td>
							<textarea placeholder='案件に関する備考を入力してください ※見積もりに記載されます' className='c-form-textarea' row={5}
												autoComplete='off' spellCheck='false' defaultValue={ props.remarks } disabled={ props.lock ? 'disabled' : null} onBlur={ e => props.setRemarks(e.target.value) }
							/>
            </td>
          </tr>
          <tr>
          	<td className='u-va-middle u-fw-bold'>メモ ※見積もりに記載されません</td>
            <td>
							<textarea placeholder='案件に関するメモを入力してください ※見積もりに記載されません' className='c-form-textarea' row={5}
												autoComplete='off' spellCheck='false' type='text' defaultValue={ props.memo } disabled={ props.lock? 'disabled' : null} onBlur={ e => props.setMemo(e.target.value) }
							/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
	);
};

export default PaymentDetails;
