import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'

const labelProps = {
  fontWeight: 'bold'
}

const Index = props => {
  
  return(
    <Fragment>
      <Typography variant='h6' { ...labelProps }>{ props.name }</Typography>
      { props.required ?
        <Typography variant='h6' color='secondary'>&nbsp;※必須</Typography>
        : null
      }
    </Fragment>
  )
}

export default Index