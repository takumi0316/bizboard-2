import React, { Fragment } from 'react';

const Specifications = (props) => {

	return(
		<Fragment>
      { props.quote_projects.length > 0 ?
        <Fragment>
          { props.quote_projects.map((specification, index) => {
            const key = 'specification-' + index;
            return (
              <tr {...{key}}>
              	<td><textarea className={ 'c-form-textarea__work-show-input__textarea2' } value={ specification.name } onChange={ e => props.setName(index, e.target.value) } /></td>
    	          <td><textarea className={ 'c-form-textarea__work-show-input__textarea2' } type='textarea' value={ specification.remarks } onChange={ e => props.setQuoteRemarks(index, e.target.value)} /></td>
              	<td><input className={ 'c-form-text' } type='number' step='0.1' value={ specification.unit_price } onChange={ e => props.setUnitPrice(index, e.target.value) } /></td>
              	<td><input className={ 'c-form-text' } type='number' value={ specification.unit } onChange={ e => props.setUnit(index, e.target.value) } /></td>
              	<td><input readOnly className={ 'c-form-text' } type='text' value={ specification.price } /></td>
              	<td><button className={ 'c-btnMain2-primaryA' } onClick={ e => props._projectDestroy(e, index) }>ー</button></td>
              </tr>
            );
          }) }
        </Fragment>
			: null
      }
		</Fragment>
	);
};

export default Specifications;