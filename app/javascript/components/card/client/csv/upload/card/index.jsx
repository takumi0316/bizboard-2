import React from 'react';

import Infomation from './infomation';
import Search     from './search';

const Card = props => {

  return(
    <div>
      <Infomation card={ props.card }/>
      <Search cards={ props.cards } typeName={ props.typeName } notFound={ props.notFound } applyCard={ props.applyCard }/>
    </div>
  );
};

export default Card; 