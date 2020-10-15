import React from 'react'
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import grey from '@material-ui/core/colors/grey'

const boxStyles = makeStyles(() => ({
  subHeader: {
    width: '100%',
    paddingLeft: '24px',
    paddingRight: '24px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: grey['500'],
    minHeight: '45px'
  },
}))

const Index = props => {
  
  const boxClasses = boxStyles()
  
  const theme = createMuiTheme({
    typography: {
      h5: {
        color: 'white',
        fontWeight: 'bold'
      }
    }
  })
  
  return(
    <Box component='div' className={ boxClasses.subHeader }>
      <ThemeProvider theme={ theme }>
        <Typography variant='h5'>
          { props.name || '部門名称を付与して下さい。' }
        </Typography>
      </ThemeProvider>
    </Box>
  )
}

export default Index