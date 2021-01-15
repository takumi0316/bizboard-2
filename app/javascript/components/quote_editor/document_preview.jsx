import React, { Fragment, useEffect, useRef, useState } from 'react'
import Style from './style.sass'
import Dayjs from 'dayjs'

// Rails Assets
import JiiLogo from '../../../assets/images/jii-log.png'
import ElectronicSeal from '../../../assets/images/electronic-seal.png'

const DocumentPreviewer = props => {
 
  const taxRef = useRef(parseInt(props.quote.tax * 100) - 100)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {

    const selectedQuoteProjects = props.quote.quote_projects.filter(quote_project => !quote_project._destroy).filter(quote_project => quote_project.unit && quote_project.unit_price)
    if(selectedQuoteProjects === []) return
  
    let sumPrice = 0
    selectedQuoteProjects.map(quote_project => {
     const price = parseFloat(quote_project.unit) * parseFloat(quote_project.unit_price)
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
            <p className={ `${ Style.DocumentPreview__innerContents__border } u-fw-bold` }>{ `御見積金額\b ${ Math.round(totalPrice * props.quote.tax).toLocaleString() }円` }</p>
          </div>
 
          <div className='u-mt-30'>
            <table style={{ width: '100%' }}>
              <colgroup>
                <col width='62%'/>
                <col width='14%'/>
                <col width='8%'/>
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
                { props.quote.quote_projects.filter(quote_project => !quote_project._destroy).map((quote_project, index) => {
                  const key = 'quote_project' + quote_project.uid + quote_project.id
                  const setText = quote_project.remarks ? quote_project.remarks.replace(/\n/g, '<br />') : ''
                  return(
                    <Fragment key={ key }>
                      { quote_project.name || quote_project.unit_price || quote_project.unit ?
                        <Fragment>
                          { !quote_project._destroy ?
                            <Fragment>
                              <tr className={ Style.DocumentPreview__innerContents__items } style={{ backgroundColor: `${ index % 2 ? '#ddd' : '#fff' }` }}>
                                <td>{ quote_project.name }</td>
                                <td className='u-ta-right'>{ quote_project.unit_price.toLocaleString() }</td>
                                <td className='u-ta-right'>{ quote_project.unit.toLocaleString() }</td>
                                <td className='u-ta-right'>{ quote_project.unit && quote_project.unit_price ? (parseFloat(quote_project.unit_price) * parseFloat(quote_project.unit)).toLocaleString() : '' }</td>
                              </tr>
                              { quote_project.remarks ?
                                <tr className={ Style.DocumentPreview__innerContents__items} style={{ backgroundColor: `${ index % 2 ? '#ddd' : '#fff' }`, width: '100%' }}>
                                  <td dangerouslySetInnerHTML={{ __html: setText }}/>
                                  <td/>
                                  <td/>
                                  <td/>
                                </tr>
                                : null
                              }
                            </Fragment>
                            : null
                          }
                        </Fragment>
                        : null
                      }
                    </Fragment>
                  )
                }) }
              </tbody>
            </table>
          </div>

          <div className='u-mt-30'>
            <div className={ Style.DocumentPreview__innerContents__billingTotal }>
              <div className=''><p>小計<span>{ totalPrice.toLocaleString() }円</span></p></div>
              <div className=''><p>消費税<span>{ (totalPrice * (props.quote.tax === 1.1 ? 0.1 : 0.08)).toLocaleString()  }円</span></p></div>
              <div className={ Style.DocumentPreview__innerContents__billingTotal__price }>
                <p>合計<span>{ Math.round(totalPrice * props.quote.tax).toLocaleString() }円</span></p>
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
                        <p>{ `${ taxRef.current }%対象` }</p>
                      </div>
                      <div className={ Style.DocumentPreview__innerContents__breakDown__subtotalContainer }>
                        <p>{ totalPrice.toLocaleString() }円</p>
                      </div>
                    </div>
                    <div className='c-flex__end'>
                      <p>{ `消費税\b${ (totalPrice * (props.quote.tax === 1.1 ? 0.1 : 0.08)).toLocaleString() }円` }</p>
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