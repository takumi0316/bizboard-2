import React from 'react'
import Box from '@material-ui/core/Box'
import brown from '@material-ui/core/colors/brown'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import lightBlue from '@material-ui/core/colors/lightBlue'
import red from '@material-ui/core/colors/red'
import lightGreen from '@material-ui/core/colors/lightGreen'
import green from '@material-ui/core/colors/green'
import Typography from '@material-ui/core/Typography'

// components
import Search from '../../../form/search'
import CompanyDivisionHeader from '../header'
import Label from '../../form/label'
import SubHeader from '../sub_header'

// property
import { PREFECTURES } from './properties.es6'

const baseStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    backgroundColor: brown['200'],
  },
}))

const paperStyles = makeStyles(theme => ({
  inner: {
    margin: theme.spacing(1),
    display: 'flex',
  },
}))

const boxStyles = makeStyles(() => ({
  row: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  innerText: {
    width: '700px'
  },
  innerTextArea: {
    width: '100%'
  }
}))

const buttonStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 3,
    fontWeight: 'bold'
  },
  edit_color: {
    backgroundColor: green['900'],
  },
  del_color: {
    backgroundColor: red['700'],
  },
  button_label: {
    fontWeight: 'bold',
    margin: theme.spacing(1)
  }
}))

const Index = props => {
  
  const baseClasses = baseStyles()
  const paperClasses = paperStyles()
  const boxClasses = boxStyles()
  const buttonClasses = buttonStyles()

  return(
    <Container container='lg' fixed>
      <Box mt={ 5 }>
        <CompanyDivisionHeader company_id={ props.company_id }/>
        <Box mt={ 5 }>
          <Search label='部署名' placeholder='経営管理部' word='検索' action={ `/companies/${ props.company_id }` } search_value={ props.params_name }/>
        </Box>
        { props.divisions.map((division, index) => {
  
          return(
            <Box key={ index } mt={ 8 }>
              <SubHeader name={ division.name || '' }/>
              <Box className={ baseClasses.root }>
  
                <Box className={ boxClasses.row }>
                  <Box m={ 2 } className={ boxClasses.innerText }>
                    <Paper className={ paperClasses.inner }>
                      <Box m={ 2 }>
                        <Label variant={ 'h4' } name={ `部署名: ${ division.name }` }/>
                      </Box>
                    </Paper>
                  </Box>
  
                  <Box m={ 2 } className={ boxClasses.innerText }>
                    <Paper className={ paperClasses.inner }>
                      <Box m={ 2 }>
                        <Label variant={ 'h4' } name={ `部署名(カナ): ${ division.kana || '' }` }/>
                      </Box>
                    </Paper>
                  </Box>
                </Box>
  
                <Box className={ boxClasses.row }>
                  <Box m={ 2 } className={ boxClasses.innerText }>
                    <Paper className={ paperClasses.inner }>
                      <Box m={ 2 }>
                        <Label variant={ 'h4' } name={ `郵便番号: ${ division.zip || '' }` }/>
                      </Box>
                    </Paper>
                  </Box>
            
                  <Box m={ 2 } className={ boxClasses.innerText }>
                    <Paper className={ paperClasses.inner }>
                      <Box m={ 2 }>
                        <Label variant={ 'h4' } name={ `住所: ${ PREFECTURES[division.prefecture_id] } ${ division.address1 || '' } ${ division.address2 || '' }` }/>
                      </Box>
                    </Paper>
                  </Box>
                </Box>
  
                <Box className={ boxClasses.row }>
                  <Box m={ 2 } className={ boxClasses.innerTextArea }>
                    <Paper className={ paperClasses.inner }>
                      <Box m={ 2 }>
                        <Label variant={ 'h4' } name={ `電話番号: ${ division.tel || '' }` }/>
                      </Box>
                    </Paper>
                  </Box>
                </Box>
  
                <Box className={ boxClasses.row }>
                  <Box m={ 2 } className={ boxClasses.innerTextArea }>
                    <Paper className={ paperClasses.inner }>
                      <Box m={ 2 }>
                        <Label variant={ 'h4' } name={ `メモ: ${ division.note || '' }` }/>
                      </Box>
                    </Paper>
                  </Box>
                </Box>
  
                <Box className={ boxClasses.row }>
                  <Box m={ 2 } className={ boxClasses.innerTextArea }>
                    <Paper className={ paperClasses.inner }>
                      <Box m={ 2 }>
                        <Button variant='contained' className={ buttonClasses.edit_color } href={ `/company_divisions/${ division.id }` }>
                          <Typography variant='h5' className={ buttonClasses.button_label }>編集</Typography>
                        </Button>
                      </Box>
                      <Box m={ 2 }>
                        <Button variant='contained' className={ buttonClasses.del_color } data-confirmable='本当に削除しますか？'  data-method='delete' href={ `/company_divisions/${ division.id }` }>
                          <Typography variant='h5' className={ buttonClasses.button_label }>削除</Typography>
                        </Button>
                      </Box>
                    </Paper>
                  </Box>
                </Box>

              </Box>
            </Box>
          )
        })}
      </Box>
    </Container>
  )
}

export default Index