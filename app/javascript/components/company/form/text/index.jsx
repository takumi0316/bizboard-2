import React, { Fragment } from 'react'
import TextField from '@material-ui/core/TextField';

const Index = props => {
  
  return(
    <Fragment>
      <TextField
        id={ props.id }
        name={ props.name }
        style={{ width: '300px' }}
        label={ props.label }
        placeholder={ props.placeholder }
        inputProps={{ style: { backgroundColor: 'white', fontSize: 15 }, readOnly: props.readOnly }}
        InputLabelProps={{ style: { fontSize: 15 } }}
        defaultValue={ props.value }
        required={ props.required }
        type={ props.password ? 'password' : 'text' }
        variant='outlined'
      />
    </Fragment>
  )
}

export default Index
