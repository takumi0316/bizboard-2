import React from 'react'
import { blueGrey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

// components
import Text from '../text'
import Submit from '../submit'

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1, color: "#388e3c" },
  paper: {
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    backgroundColor: blueGrey[100]
  },
  submit: {
    verticalAlign: 'middle'
  }
}))

const Search = props => {
  
  const classes = useStyles()

  return(
    <form action={ props.action } acceptCharset='utf8' method='get'>
      <input name='utf8' type='hidden' value='✓'/>
      <Paper className={ classes.paper }>
        <div className={ classes.root }>
          <Grid container spacing={ 1 }>
            <Grid item xs={ 12 } sm={ 6 }>
              <Text label={ props.label } placeholder={ props.placeholder } search_value={ props.search_value }/>
            </Grid>
            <Grid className={ classes.submit } item xs={ 1 } sm={ 1 }>
              <Submit word={ props.word }/>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </form>
  )
}

export default Search
