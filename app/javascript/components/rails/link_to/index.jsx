import React from 'react'
import { indigo } from '@material-ui/core/colors'
import Button from '@material-ui/core/Button'

const LinkTo = props => {
  
  const sizes = {
    small: 8,
    medium: 12,
    large: 15
  }

  return(
    <Button
      name='submit'
      type='submit'
      size={ props.size }
      variant='contained'
      style={{ fontSize: sizes[props.size], backgroundColor: indigo[900], color: 'white' }}
      href={ props.action }
    >
      { props.word }
    </Button>
  )
}

export default LinkTo