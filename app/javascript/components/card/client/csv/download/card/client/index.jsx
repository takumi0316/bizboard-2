import React from 'react';

import Information from './information';
import Check       from './check';

const CardClient = props => {

  return(
    <div>
      <Information card_clients={ props.card_clients }/>
      { props.card_clients ?
        <Check card_clients={ props.card_clients } company={ props.company } division={ props.division } isClientDownload={ props.isClientDownload }/>
        : null
      }
    </div>
  );
};

export default CardClient;