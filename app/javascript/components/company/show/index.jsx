import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

// components
import CompanyHeader from '../header'
import CompanyEdit from '../edit'
import CompanyDivisionHeader from '../division/header'

const Update = props => {
  
  return(
    <Fragment>
      <Container maxWidth='lg' fixed>
        <CompanyHeader />
        <CompanyEdit company={ props.company } csrf_params={ props.csrf_params } csrf_token={ props.csrf_token } />
        <Box mt={ 10 }>
          <CompanyDivisionHeader />
        </Box>
      </Container>
    </Fragment>
  )
}

export default Update
