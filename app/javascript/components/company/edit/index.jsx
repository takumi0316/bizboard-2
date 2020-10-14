import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import brown from '@material-ui/core/colors/brown'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

// components
import Text from '../form/text'
import Label from '../form/label'
import ApprovalSelect from '../form/select/approval_select'
import OnlineWebBusinessCard from '../form/select/online_web_business_card_select'
import TextArea from '../form/text_area'
import Submit from '../../form/submit'

const configStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    backgroundColor: brown['200'],
    '& > *': {
    },
  },
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

const Edit = props => {
  const configClasses = configStyles()
  
  return(
    <form id={ `edit_company_${ props.company.id }` } className={ configClasses.root } action={ `/companies/${ props.company.id }` } acceptCharset='utf8' method='post'>
  
      <input name='utf8' type='hidden' value='✓'/>
      <input type='hidden' name='_method' value='patch'/>
      <input type='hidden' name={ props.csrf_params } value={ props.csrf_token }/>
 
      <Paper className={ configClasses.inner }>
        <Box borderColor='text.primary' { ...boxProps }>
          <Label name='名称' required={ true }/>
          <div className='u-ml-15'>
            <Text
              id='company_name'
              name='company[name]'
              label='名称'
              placeholder='日本工業社'
              value={ props.company.name }
            />
          </div>
        </Box>
  
        <Box borderColor='text.primary' { ...boxProps }>
          <Label name='名称(カナ)'/>
          <div className='u-ml-15'>
            <Text
              id='company_kana'
              name='company[kana]'
              label='名称(カナ)'
              placeholder='カブシキガイシャニホンコウギョウシャ'
              value={ props.company.kana }
            />
          </div>
        </Box>
      </Paper>

      <Paper className={ configClasses.inner }>
        <Box borderColor='text.primary' { ...boxProps }>
          <Label name='名刺承認機能'/>
          <div className='u-ml-15'>
            <ApprovalSelect id='company_approval_status' name='company[approval_status]' value={ props.company.approval_status || 'nothing' }/>
          </div>
        </Box>
  
        <Box borderColor='text.primary' { ...boxProps }>
          <Label name='オンラインWeb名刺機能'/>
          <div className='u-ml-15'>
            <OnlineWebBusinessCard id='company_online_web_business_card' name='company[online_web_business_card]' value={ props.company.online_web_business_card || 'disabled' }/>
          </div>
        </Box>
      </Paper>
  
      <Paper className={ configClasses.inner }>
        <Box borderColor='text.primary' { ...boxProps }>
          <Label name='メモ'/>
          <div className='u-ml-15'>
            <TextArea id='company_note' name='company[note]' value={ props.company.note || '' } placeholder='メモを入力してください。'/>
          </div>
        </Box>
      </Paper>

      <Paper className={ configClasses.inner }>
        <Box borderColor='text.primary' { ...boxProps }>
          <Submit word={ '更新する' }/>
        </Box>
      </Paper>
 
    </form>
  )
}

export default Edit