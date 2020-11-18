import React from 'react'
import { indigo } from '@material-ui/core/colors'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 3,
    fontWeight: 'bold'
  },
  button_color: {
    backgroundColor: lightBlue['500'],
  },
  button_label: {
    fontWeight: 'bold',
    margin: theme.spacing(1)
  }
}))

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
      style={{ backgroundColor: indigo[900], color: 'white' }}
      href={ props.action }
    >
      <Typography variant='h5'>{ props.word }</Typography>
    </Button>
  )
}

export default LinkTo