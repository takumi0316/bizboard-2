import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import brown from '@material-ui/core/colors/brown'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

// components
import Text from '../../form/text'
import Label from '../../form/label'
import TextArea from '../../form/text_area'
import Submit from '../../../form/submit'
import CompanyDivisionHeader from '../header'
import PrefectureSelect from '../../form/select/prefecture'

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
    margin: theme.spacing(2),
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  }
}))

const boxProps = {
  bgcolor: 'background.paper',
  m: 1,
  display: 'flex',
  alignItems: 'center'
}

const RegistorDivision = props => {
  
  const baseClasses = baseStyles()
  
  const paperClasses = paperStyles()
  
  return(
    <Fragment>
      <CompanyDivisionHeader type='model' company_id={ props.company.id }/>
      <form id='new_company_division' className={ baseClasses.root } action='/company_divisions' acceptCharset='utf8' method='post'>
        
        <input name='utf8' type='hidden' value='✓'/>
        <input type='hidden' name={ props.csrf_params } value={ props.csrf_token }/>
        <input type='hidden' id='company_division_company_id' name='company_division[company_id]' value={ props.company.id }/>
  
        <Paper className={ paperClasses.inner }>
          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='取引先' required={ true }/>
            <div className='u-ml-15'>
              <Text
                label='取引先'
                value={ props.company.name }
                required
                readOnly={ true }
              />
            </div>
          </Box>
        </Paper>
  
        <Paper className={ paperClasses.inner }>

          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='部署名' required={ true }/>
            <div className='u-ml-15'>
              <Text
                id='company_division_name'
                name='company_division[name]'
                label='部署名'
                placeholder='経営管理部'
                required
              />
            </div>
          </Box>

          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='部署名(カナ)'/>
            <div className='u-ml-15'>
              <Text
                id='company_division_kana'
                name='company_division[kana]'
                label='部署名(カナ)'
                placeholder='ケイエイカンリブ'
              />
            </div>
          </Box>

        </Paper>
        
        <Paper className={ paperClasses.inner }>

          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='郵便番号' required={ true }/>
            <div className='u-ml-15'>
              <Text
                id='company_division_zip'
                name='company_division[zip]'
                label='郵便番号'
                placeholder='111-1111'
                required
              />
            </div>
          </Box>
 
          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='都道府県'/>
            <div className='u-ml-15'>
              <PrefectureSelect id='company_division_prefecture_id' name='company_division[prefecture_id]' value='1'/>
            </div>
          </Box>
   
        </Paper>

        <Paper className={ paperClasses.inner }>

          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='住所1' required={ true }/>
            <div className='u-ml-15'>
              <Text
                id='company_division_address1'
                name='company_division[address1]'
                label='住所1'
                placeholder='中央区新川2-10'
                required
              />
            </div>
          </Box>
  
          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='住所2'/>
            <div className='u-ml-15'>
              <Text
                id='company_division_address2'
                name='company_division[address2]'
                label='住所2'
                placeholder='住友不動産茅場町ビル号館5F'
              />
            </div>
          </Box>
 
        </Paper>
        
        <Paper className={ paperClasses.inner }>
          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='メモ'/>
            <div className='u-ml-15'>
              <TextArea id='company_note' name='company_division[note]' value='' placeholder='メモを入力してください。'/>
            </div>
          </Box>
        </Paper>
        
        <Paper className={ paperClasses.inner }>
          <Box borderColor='text.primary' { ...boxProps }>
            <Submit word={ '作成する' }/>
          </Box>
        </Paper>
      
      </form>
    </Fragment>
  )
}

export default RegistorDivision