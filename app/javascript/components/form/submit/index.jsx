import React from 'react'
import { deepOrange } from '@material-ui/core/colors'
import Button from '@material-ui/core/Button'

const styles = {
  style: { fontSize: 15, backgroundColor: deepOrange[900], color: 'white' }
}

const Submit = props => {

  return(
    <Button
      name='submit'
      type='submit'
      size='large'
      variant='contained'
      style={ styles.style }
    >
      { props.word }
    </Button>
  )
}

export default Submit