import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import lightBlue from '@material-ui/core/colors/lightBlue'
import grey from '@material-ui/core/colors/grey'
import { AppBar } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const Header = props => {

  const buttonStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 3,
      fontWeight: 'bold'
    },
    button_color: {
      backgroundColor: props.type === 'model' ? grey['400'] : lightBlue['500'],
    },
    button_label: {
      fontWeight: 'bold',
      margin: theme.spacing(1)
    }
  }))
 
  const buttonClasses = buttonStyles()
  
  return(
    <div className={ buttonClasses.root }>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5' className={ buttonClasses.title }>
            { props.type === 'model' ? '担当者情報' : '担当者一覧' }
          </Typography>
          <Button variant='contained' color='primary' className={ buttonClasses.button_color } href={ props.type === 'model' ? `/company_divisions/${ props.division_id }` : `/company_division_clients/new?company_division_id=${ props.division_id }` }>
            <Typography variant='h5' className={ buttonClasses.button_label }>{ props.type === 'model' ? '戻る' : '担当者追加' }</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header;