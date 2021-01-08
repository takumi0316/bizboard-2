import React, { Fragment, useEffect, useState } from 'react'
import Style from './style.sass'
import Dayjs from 'dayjs'

// Rails Assets
import JiiLogo from '../../../assets/images/jii-log.png'
import ElectronicSeal from '../../../assets/images/electronic-seal.png'

const DocumentPreviewer = props => {
 
  const [totalPrice, setTotalPrice] = useState(0)
 
  useEffect(() => {

    const selectedProjects = props.quote.quote_projects.filter(project => project.project_id)
    if(selectedProjects === []) return
  
    let sumPrice = 0
    selectedProjects.map(project => {
     const price = parseFloat(project.unit) * parseFloat(project.unit_price)
     sumPrice += price
    })

    setTotalPrice(sumPrice)
  }, [props.quote.quote_projects])

  return(
    <div className={ `${ Style.DocumentPreview } c-flex c-flex__center` }>
      <div className={ Style.DocumentPreview__innerContents }>

        <div className={ Style.DocumentPreview__innerContents__wrp }>

          <div className='c-flex__center'>
            <p className='u-fs-x-large'>見積書</p>
          </div>

          <div className='u-mt-20 c-flex__between'>
            <div>
              <p>{ `${ props.quote.company_name }\b御中` }</p>
            </div>
            <div>
              <img src={ JiiLogo } style={{ height: '40px', width: '289px' }} alt='日本工業社ロゴ'/>
              <div className='u-mt-20 c-flex__between'>
                <div>
                  <p>株式会社日本工業社</p>
                  <p>{ props.jii_address }</p>
                  <p>TEL: { props.jii_tel }</p>
                </div>
                <div>
                  <img src={ ElectronicSeal } style={{ height: '79.8px', width: '79.2px' }} alt='印影'/>
                </div>
              </div>
              <div className='u-mt-20'>
                <table>
                  <tbody>

                    <tr>
                      <th className='u-fw-bold u-ta-left'>見積書番号：</th>
                      <td>{ props.quote.quote_number }</td>
                    </tr>

                    <tr>
                      <th className='u-fw-bold u-ta-left'>発行日：</th>
                      <td>{ props.quote.issues_date ? Dayjs(props.quote.issues_date).format('YYYY年MM月DD日') : '' }</td>
                    </tr>

                    <tr>
                      <th className='u-fw-bold u-ta-left'>有効期限：</th>
                      <td>{ props.quote.expiration ? Dayjs(props.quote.expiration).format('YYYY年MM月DD日') : '' }</td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
 
          <div className='u-mt-20'>
            <p className={ `${ Style.DocumentPreview__innerContents__border } u-fw-bold` }>{ `御見積金額\b ${ totalPrice }円` }</p>
          </div>
 
          <div className='u-mt-30'>
            <table style={{ width: '100%' }}>
              <colgroup>
                <col width='57%'/>
                <col width='17%'/>
                <col width='10%'/>
                <col width='16%'/>
              </colgroup>
              <thead>
                <tr>
                  <td className={ `${ Style.DocumentPreview__innerContents__border } u-fw-bold` }>品目</td>
                  <td className={ `${ Style.DocumentPreview__innerContents__border } u-fw-bold u-ta-center` }>単価</td>
                  <td className={ `${ Style.DocumentPreview__innerContents__border } u-fw-bold u-ta-center` }>数量</td>
                  <td className={ `${ Style.DocumentPreview__innerContents__border } u-fw-bold u-ta-right` }>価格</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  { props.quote.quote_projects.map(quote_project => {
                    const key = 'quote_project' + quote_project.id
                    return(
                      <Fragment key={ key }>
                        <td>{ quote_project.name }</td>
                        <td className='u-ta-right'>{ quote_project.unit_price }</td>
                        <td>{ quote_project.unit }</td>
                        <td>{ quote_project.project_id ? parseFloat(quote_project.unit_price) * parseFloat(quote_project.unit) : '' }</td>
                      </Fragment>
                    )
                  }) }
                </tr>
              </tbody>
            </table>
          </div>

          <div className='u-mt-30'>
            <div className={ Style.DocumentPreview__innerContents__billingTotal }>
              <div className=''><p>小計<span>{ 3000 }円</span></p></div>
              <div className=''><p>消費税<span>{ 100 }円</span></p></div>
              <div className={ Style.DocumentPreview__innerContents__billingTotal__price }>
                <p>合計<span>{ 100 }円</span></p>
              </div>
            </div>
            <div className={ `${ Style.DocumentPreview__innerContents__breakDown } c-flex__between` }>
              <div className={ Style.DocumentPreview__innerContents__breakDown__header }>
                <p>内訳</p>
              </div>
              <div className={ Style.DocumentPreview__innerContents__breakDown__content }>
                <div className={ Style.DocumentPreview__innerContents__breakDown__itemContent }>
                  <div className='c-flex__column'>
                    <div className='c-flex__between'>
                      <div className={ Style.DocumentPreview__innerContetns__breakDown__exciseContainer }>
                        <p>10%対象</p>
                      </div>
                      <div className={ Style.DocumentPreview__innerContents__breakDown__subtotalContainer }>
                        <p>{ 1000 }円</p>
                      </div>
                    </div>
                    <div className='c-flex__end'>
                      <p>{ `消費税\b${100}円` }</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p>備考</p>
            <div className={ `${ Style.DocumentPreview__innerContents__remarks }` }>
              <div className='u-px-10 u-py-10' dangerouslySetInnerHTML={{ __html: props.quote.remarks ? props.quote.remarks.replace(/\n/g, '<br />') : '' }}/>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default DocumentPreviewer