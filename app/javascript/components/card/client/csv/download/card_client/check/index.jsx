import React from 'react';
import Style from './style.sass';

const Check = props => {

  console.log(props.division)
  return(
    <div>
      { props.card_clients.map((card_client, index) => {
        const key = `card_client_${index}`;
        return(
          <li {...{key}} className={ Style.Check }>
            <input id={key} name='check' type='checkbox' onChange={ e => props.changeRaidoStatus(e) } defaultChecked value={card_client.id}/>
            <label className={ Style.Check_checkbox } htmlFor={key}>{ `${props.company.name} ${props.division.name} ${card_client.client_name}` }</label>
          </li>
        );
      }) }
    </div>
  );
};

export default Check;