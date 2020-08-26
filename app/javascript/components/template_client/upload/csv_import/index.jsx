import React, { Fragment } from 'react';

import DropZone    from './drop_zone';
import Information from './information';

const CSVImport = props => {

  return(
    <Fragment>
      <Fragment>
        <Information />
        <DropZone openCSV={ props.openCSV }/>
      </Fragment>
    </Fragment>
  );
};

export default CSVImport;