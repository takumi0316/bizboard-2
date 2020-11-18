import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({ root: { backgroundColor: blueGrey[100], color: theme.palette.text.secondary } }))

const Text = props => {

  const classes = useStyles()
  
  return(
    <TextField
      id='filled-search'
      name='name'
      className={ classes.root }
      style={{ backgroundColor: '#eceff1' }}
      label={ props.label }
      placeholder={ props.placeholder }
      inputProps={{ style: { fontSize: 15 } }}
      InputLabelProps={{ style: { fontSize: 15 } }}
      defaultValue={ props.search_value }
      fullWidth
      type='search'
      variant='outlined'
      size='medium'
    />
  )
}

export default Text