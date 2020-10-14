import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import lightBlue from '@material-ui/core/colors/lightBlue'
import { AppBar } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

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

const Header = props => {
  const classes = useStyles();
  
  return(
    <div className={ classes.root }>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5' className={ classes.title }>
            部署一覧
          </Typography>
          <Button variant='contained' color='primary' className={ classes.button_color }>
            <Typography variant='h5' className={ classes.button_label }>部署追加</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header;