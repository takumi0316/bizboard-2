import React, { Fragment } from 'react'
import TextField from '@material-ui/core/TextField'

const styles = {
  style: { width: '700px' },
  input: { style: { backgroundColor: 'white', fontSize: 15 } },
  inputLabel: { style: { fontSize: 15 } }
}

const Index = props => {
  
  return(
    <Fragment>
      <TextField
        id={ props.id }
        name={ props.name }
        style={ styles.style }
        label={ props.label }
        placeholder={ props.placeholder }
        inputProps={ styles.input }
        InputLabelProps={ styles.inputLabel }
        defaultValue={ props.value || '' }
        required={ props.required }
        type='text'
        multiline
        rows={ props.value.split('\n').length >= 5 ? props.value.split('\n').length : props.value.split('\n').length + 2 }
        rowsMax='10'
        variant='outlined'
      />
    </Fragment>
  )
}

export default Index