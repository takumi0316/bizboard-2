import React, { Fragment } from 'react'
import InputSuggestion from './input_suggestion'

const Specifications = (props) => {

  return(
    <Fragment>
      { props.quote_projects ?
        <Fragment>
          { props.quote_projects.map((specification, index) => {
            const key = `specification-${ specification.id ? specification.id : specification.uid }-${ index }-${ specification.price }`
            return (
              <tr { ...{key} }>
                <td><InputSuggestion inputTxt={ specification.name } applyProject={ props.applyProject } setName={ props.setName } index={ index }/></td>
                <td><textarea className='c-form-textarea__work-show-input__textarea2' type='textarea' defaultValue={ specification.remarks } onChange={ e => props.setQuoteRemarks(index, e.target.value)}/></td>
                <td><input className='c-form-text' type='number' step='0.1' defaultValue={ specification.unit_price } onChange={ e => props.setUnitPrice(index, e.target.value) } /></td>
                <td><input className='c-form-text' type='number' step='1' defaultValue={ specification.unit } onChange={ e => props.setUnit(index, e.target.value) } /></td>
                <td><input readOnly className='c-form-text' type='text' defaultValue={ specification.price }/></td>
                <td><button className='c-btnMain2-primaryA' value={ index } disabled={props.lock ? 'disabled' : null} onClick={ e => props.projectDestroy(e) }>ー</button></td>
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
