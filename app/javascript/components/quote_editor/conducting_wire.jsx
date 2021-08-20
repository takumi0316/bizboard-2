import React, { Fragment } from 'react'

const ConductingWire = props => {
 
  return(
    <Fragment>
 
      <div>
        <a className='c-btnMain' href={ `/quotations/${ props.quote.id }/edit` } target='_blank'>見積書</a>
      </div>

      { props.quote.status === 'end_work' && !props.invoice.id ?
        <div className='u-ml-10'>
          <a
            className='c-btnMain c-btn-blue'
            href={ `/invoices/new?quote_id=${ props.quote.id }` }
            target='_blank'
          >
            請求書作成
          </a>
        </div>
        : null
      }
  
      { props.quote.status === 'invoicing' && props.invoice.id ?
        <Fragment>
          <div className='u-ml-10'>
            <a
              className='c-btnMain'
              href={ `/invoices/${props.invoice.id}/edit` }
              target='_blank'
            >
              請求書
            </a>
          </div>
        </Fragment>
        : null
      }
      { props.work ?
        <Fragment>
          { props.work.status === 'completed' ?
            <Fragment>
              <div className='u-ml-10'>
                <a
                  className='c-btnMain'
                  href={ `/delivery_notes/${ props.quote.id }/edit` }
                  target='_blank'
                >
                  納品書
                </a>
              </div>
            </Fragment>
            : null
          }
        </Fragment>
        : null
      }

      { props.work ?
        <div className='u-ml-10'>
          <a
            className='c-btnMain'
            href={ `/works/${ props.work.id }` }
          >
            作業書
          </a>
        </div>
        :
        <Fragment>
          { props.activity ?
            <Fragment>
              { props.activity.status === 'lost' || props.activity.status === 'rejection' ?
                null
                :
                <div className='u-ml-10'>
                  <a
                    className='c-btnMain c-btn-blue'
                    rel='nofollow'
                    data-method='post'
                    href={ `/quotes/${ props.quote.id }/status?status=working` }
                  >
                    作業書作成
                  </a>
                </div>
              }
            </Fragment>
            :
            <div className='u-ml-10'>
              <a
                className='c-btnMain c-btn-blue'
                rel='nofollow'
                data-method='post'
                href={ `/quotes/${ props.quote.id }/status?status=working` }
              >
                作業書作成
              </a>
            </div>
          }
        </Fragment>
      }
  
      <div className='u-ml-10'>
        <a
          className='c-btnMain'
          href={ `/activities?quote_id=${ props.quote.id }` }
        >
          活動履歴
        </a>
      </div>
      { props.task ?
        <div className='u-ml-10'>
          <a
            className='c-btnMain'
            href={ `/tasks/${ props.task.id }` }
          >
            チャット
          </a>
        </div>
        : null
      }
      { props.quote.drive_folder_id ?
        <div className='u-ml-10'>
          <a
            className='c-btnMain'
            target='_blank'
            href={ `https://drive.google.com/drive/u/0/folders/${ props.quote.drive_folder_id }` }
          >
            ドライブ
          </a>
        </div>
        : null
      }

    </Fragment>
  )
}

export default ConductingWire