import React from 'react'
import Container from '@material-ui/core/Container'

// components
import CompanyHeader from '../header'
import CompanyEdit from '../edit'

const Show = props => {
  
  return(
    <Container maxWidth='lg' fixed>
      <CompanyHeader />
      <CompanyEdit company={ props.company } csrf_params={ props.csrf_params } csrf_token={ props.csrf_token } />
    </Container>
  )
}

export default Show
