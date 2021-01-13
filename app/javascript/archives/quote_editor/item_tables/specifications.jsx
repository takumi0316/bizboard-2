import React, { Fragment } from 'react'
import InputSuggestion from './input_suggestion'

const Specifications = props => {

  return(
    <Fragment>
      { props.quote_projects ?
        <Fragment>
          { props.quote_projects.map((specification, index) => {
            const key = `specification-${ specification.id ? specification.id : specification.uid }-${ index }`
            return (
              <Fragment { ...{key} }>
                { !specification._destroy ?
                  <tr>
                    <td><InputSuggestion inputTxt={ specification.name } applyProject={ props.applyProject } setName={ props.setName } index={ index }/></td>
                    <td><textarea key={ specification.project_id } className='c-form-textarea' type='textarea' defaultValue={ specification.remarks } onChange={ e => props.setQuoteRemarks(index, e.target.value)}/></td>
                    <td className='u-va-top'><input key={ specification.project_id } className='c-form-text' type='number' step='0.1' defaultValue={ specification.unit_price || 0 } onChange={ e => props.setUnitPrice(index, e.target.value) } /></td>
                    <td className='u-va-top'><input key={ specification.project_id } className='c-form-text' type='number' step='1' defaultValue={ specification.unit || 0} onChange={ e => props.setUnit(index, e.target.value) } /></td>
                    <td className='u-va-top'><input key={ specification.price } readOnly className='c-form-text' type='text' defaultValue={ specification.price || 0 }/></td>
                    <td className='u-ta-center u-va-middle'><button className='c-btnMain c-btn-red' value={ index } disabled={ props.lock } onClick={ e => props.projectDestroy(e) }>削除</button></td>
                  </tr>
                  : null
                }
              </Fragment>
            )
          }) }
        </Fragment>
        : null
      }
    </Fragment>
  );
};

export default Specifications;
