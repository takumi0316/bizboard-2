import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import lightBlue from '@material-ui/core/colors/lightBlue'
import grey from '@material-ui/core/colors/grey'
import { AppBar } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import blueGrey from '@material-ui/core/colors/blueGrey'

const Header = props => {

  const buttonStyles = makeStyles(theme => ({
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
      backgroundColor: props.type === 'model' ? blueGrey['300'] : lightBlue['500'],
    },
    button_label: {
      fontWeight: 'bold',
      margin: theme.spacing(1)
    }
  }))
 
  const buttonClasses = buttonStyles()
  
  console.log(props.company_id)
  return(
    <div className={ buttonClasses.root }>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5' className={ buttonClasses.title }>
            { props.type === 'model' ? '部署情報' : '部署一覧' }
          </Typography>
          <Button variant='contained' color='primary' className={ buttonClasses.button_color } href={ props.type === 'model' ? `/companies/${ props.company_id }` : `/company_divisions/new?company_id=${ props.company_id }` }>
            <Typography variant='h5' className={ buttonClasses.button_label }>{ props.type === 'model' ? '戻る' : '部署追加' }</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header;