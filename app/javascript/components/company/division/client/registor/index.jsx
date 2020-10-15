import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import brown from '@material-ui/core/colors/brown'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

// components
import Text from '../../../form/text'
import Label from '../../../form/label'
import TextArea from '../../../form/text_area'
import Submit from '../../../../form/submit'
import CompanyDivisionClientHeader from '../header'
import PersonalSelect from '../../../form/select/personal_select'
import DivisionSelect from '../../../form/select/division_select'
import TitleSelect from '../../../form/select/title_select'
import UserTypeSelect from '../../../form/select/user_type_select'

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

const RegistorClient = props => {
  
  const baseClasses = baseStyles()
  
  const paperClasses = paperStyles()
  
  return(
    <Fragment>
      <CompanyDivisionClientHeader type='model' division_id={ props.division.id }/>
      <form id='new_company_division_client' className={ baseClasses.root } action='/company_division_clients' acceptCharset='utf8' method='post'>
        
        <input name='utf8' type='hidden' value='✓'/>
        <input type='hidden' name={ props.csrf_params } value={ props.csrf_token }/>
        <input type='hidden' id='company_division_client_company_division_id' name='company_division_client[company_division]' value={ props.division_id }/>
  
        <Paper className={ paperClasses.inner }>
          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='取引先' required={ true }/>
            <div className='u-ml-15'>
              <Text
                label='取引先'
                value={ props.company_name }
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
              <DivisionSelect
                id='company_division_client_company_division_id'
                name='company_division_client[company_division_id]'
                label='部署名'
                divisions={ props.divisions }
                value={ props.division.id }/>
            </div>
          </Box>
 
          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='自社担当者名' required={ true }/>
            <div className='u-ml-15'>
              <PersonalSelect
                id='company_division_client_user_id'
                name='company_division_client[user_id]'
                label='自社担当者名'
                users={ props.users }
                value={ '1' }
              />
            </div>
          </Box>
        </Paper>
 
        <Paper className={ paperClasses.inner }>
          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='敬称' required={ true }/>
            <div className='u-ml-15'>
              <TitleSelect
                id='company_division_client_title'
                name='company_division_client[title]'
                label='敬称'
                value='honorific'/>
            </div>
          </Box>
    
          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='ユーザータイプ' required={ true }/>
            <div className='u-ml-15'>
              <UserTypeSelect
                id='company_division_client_user_type'
                name='company_division_client[user_type]'
                label='ユーザータイプ'
                value='general'/>
            </div>
          </Box>
        </Paper>
  
        <Paper className={ paperClasses.inner }>
          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='担当者名' required={ true }/>
            <div className='u-ml-15'>
              <Text
                id='company_division_client_name'
                name='company_division_client[name]'
                label='担当者名'
                placeholder='サンプルhoge太郎'
                required
              />
            </div>
          </Box>

          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='担当者名(カナ)'/>
            <div className='u-ml-15'>
              <Text
                id='company_division_client_kana'
                name='company_division_client[kana]'
                label='担当者名(カナ)'
                placeholder='サンプルhogeタロウ'
              />
            </div>
          </Box>
        </Paper>
        
        <Paper className={ paperClasses.inner }>
          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='電話番号' required={ true }/>
            <div className='u-ml-15'>
              <Text
                id='company_division_client_tel'
                name='company_division_client[tel]'
                label='電話番号'
                placeholder='0123-2933-4933'
              />
            </div>
          </Box>
  
          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='メールアドレス' required={ true }/>
            <div className='u-ml-15'>
              <Text
                id='company_division_client_email'
                name='company_division_client[email]'
                label='メールアドレス'
                placeholder='hogehoge@jiinet.co.jp'
              />
            </div>
          </Box>
        </Paper>
  
        <Paper className={ paperClasses.inner }>
          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='パスワード' required={ true }/>
            <div className='u-ml-15'>
              <Text
                id='company_division_client_password'
                name='company_division_client[password]'
                label='パスワード'
                placeholder='変更しない場合は入力しないで下さい。'
                password={ true }
                required
              />
            </div>
          </Box>
    
          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='パスワード(確認)' required={ true }/>
            <div className='u-ml-15'>
              <Text
                id='company_division_client_password_confirmation'
                name='company_division_client[password_confirmation]'
                label='パスワード(確認)'
                placeholder='変更しない場合は入力しないで下さい。'
                password={ true }
                required
              />
            </div>
          </Box>
        </Paper>
        
        <Paper className={ paperClasses.inner }>
          <Box borderColor='text.primary' { ...boxProps }>
            <Label name='メモ'/>
            <div className='u-ml-15'>
              <TextArea
                id='company_division_client_note'
                name='company_division_client[note]'
                placeholder='メモを入力してください。'
                value=''
              />
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

export default RegistorClient