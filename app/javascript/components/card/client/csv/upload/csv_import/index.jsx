import React, { Fragment } from 'react';

import DropZone    from './drop_zone';
import Information from './information';

const CSVImport = props => {

  return(
    <Fragment>
      { props.division && props.card ?
        <Fragment>
          <Information status={ true }/>
          <DropZone onDrop={ props.onDrop }/>
        </Fragment>
        : <Information status={ false }/>
      }
    </Fragment>
  );
};

export default CSVImport;