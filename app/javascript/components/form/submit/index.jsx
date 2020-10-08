import React from 'react'
import { deepOrange, lightGreen, green, teal } from '@material-ui/core/colors'
import Button from '@material-ui/core/Button'

const Submit = props => {

  return(
    <Button
      name='submit'
      type='submit'
      size='large'
      variant='contained'
      style={{ fontSize: 15, backgroundColor: deepOrange[900], color: 'white' }}
    >
      { props.word }
    </Button>
  )
}

export default Submit