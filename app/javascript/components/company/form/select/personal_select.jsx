import React, { useState } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import InputBase from '@material-ui/core/InputBase'
import withStyles from '@material-ui/core/styles/withStyles'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Select from '@material-ui/core/Select'

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '17px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase)

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}))

const PersonalSelect = props => {
  const classes = useStyles()
  
  const [value, setValue] = useState(props.value || '')
  
  const changeValue = e => setValue(e.target.value)
  
  return(
    <div className={ classes.margin }>
      <Select
        id={ props.id }
        name={ props.name }
        value={ value }
        input={<BootstrapInput />}
        onChange={ changeValue }
      >
        { props.users.map((user, index) => {
          const key = `user-${ index }`
          return(
            <MenuItem key={ key } value={ user.id }>{ user.name }</MenuItem>
          )
        })}
      </Select>
    </div>
  )
}

export default PersonalSelect