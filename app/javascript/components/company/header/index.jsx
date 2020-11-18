import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import { AppBar } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import blueGrey from '@material-ui/core/colors/blueGrey'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  bar_color: {
    backGroundColor: grey['600']
  },
  title: {
    flexGrow: 3,
    fontWeight: 'bold'
  },
  button_color: {
     backgroundColor: blueGrey['300'],
  },
  button_label: {
    fontWeight: 'bold',
    color: 'white',
    margin: theme.spacing(1)
  }
}))

const Header = props => {
  const classes = useStyles()
  
  return(
    <div className={ classes.root }>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5' className={ classes.title }>
            取引先情報
          </Typography>
          <Button variant='contained' href='/companies' className={ classes.button_color }>
            <Typography variant='h5' className={ classes.button_label }>戻る</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header