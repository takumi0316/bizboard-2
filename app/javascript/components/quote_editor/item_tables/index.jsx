import React, { Fragment } from 'react';

// import components
import Specifications   from './specifications';
import SpecificationDnD from './specification_dnd';

const ItemTables = props => {

  return(
    <Fragment>
      { props.itemStatus ?
        <div className='c-table u-mt-30'>
          <table>
            <thead>
              <tr>
                <th>品目</th>
                <th>備考</th>
                <th>単価</th>
                <th>数量</th>
                <th>価格</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              <Specifications quote_projects={ props.quote_projects } quote_id={ props.quote_id } setName={ props.setName } setQuoteRemarks={ props.setQuoteRemarks }
                              setUnitPrice={ props.setUnitPrice } setUnit={ props.setUnit } projectDestroy={ props.projectDestroy } applyProject={ props.applyProject }
              />
            </tbody>
          </table>
        </div>
        :
        <div className='u-mt-30'>
          <SpecificationDnD quote_projects={ props.quote_projects } reorderQuoteProjects={ props.reorderQuoteProjects }/>
        </div>
      }
    </Fragment>
  );
};

export default ItemTables;
