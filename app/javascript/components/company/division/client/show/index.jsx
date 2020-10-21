import React from 'react'
import Container from '@material-ui/core/Container'

// components
import CompanyDivisionClientHeader from '../header'
import CompanyDivisionClientEdit from '../edit'

const Show = props => {

  return(
    <Container maxWidth='lg' fixed>
      <CompanyDivisionClientHeader type='model' division_id={ props.division.id }/>
      <CompanyDivisionClientEdit company_name={ props.company_name } divisions={ props.divisions } division_id={ props.division.id } division_name={ props.division.name } client={ props.client } users={ props.users } csrf_params={ props.csrf_params } csrf_token={ props.csrf_token } />
    </Container>
  )
}

export default Show