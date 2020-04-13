import React, { Fragment } from 'react';

import DropZone    from './drop_zone';
import Information from './information';

const CSVImport = props => {

  return(
    <Fragment>
      { props.division && props.card ?
        <Fragment>
          <Information status={ true }/>
          <DropZone parseCSV={ props.parseCSV }/>
        </Fragment>
        : <Information status={ false }/>
      }
    </Fragment>
  );
};

export default CSVImport;