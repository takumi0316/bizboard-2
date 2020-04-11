import React from 'react';

import Infomation from './infomation';
import Search     from './search';

const Client = props => {

  return(
    <div>
      <Infomation client={ props.client }/>
      <Search clients={ props.clients } typeName={ props.typeName } notFound={ props.notFound } applyClient={ props.applyClient }/>
    </div>
  );
};

export default Client;