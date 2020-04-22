import React, { Fragment } from 'react';

import Infomation from './infomation';
import Search      from './search';

const Division = props => {

  return(
    <Fragment>
      <Infomation company={ props.company } division={ props.division }/>
      { props.new ?
        <Search divisions={ props.divisions } typeName={ props.typeName } notFound={ props.notFound  } applyDivision={ props.applyDivision }/>
        : null
      }
    </Fragment>
  );
};

export default Division;