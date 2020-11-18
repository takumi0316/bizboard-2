import React from 'react'
import Container from '@material-ui/core/Container'

// components
import CompanyDivisionHeader from '../header'
import CompanyDivisionEdit from '../edit'

const Show = props => {
  
  return(
    <Container maxWidth='lg' fixed>
      <CompanyDivisionHeader type='model' company_id={ props.division.company_id }/>
      <CompanyDivisionEdit company_name={ props.company_name } division={ props.division } csrf_params={ props.csrf_params } csrf_token={ props.csrf_token } />
    </Container>
  )
}

export default Show