import React, { Fragment } from 'react';

const ButtonsBelow = props => {

  return(
    <div className='c-overlay-submit'>
      <div className='u-va-middle c-flex c-flex__center'>
        { props.quote.id ?
          <Fragment>
            { !props.quote.lock ?
            <a className='c-btnMain-standard c-btn-blue u-ml-30' href={ `/quotations/${ props.quote.id }/edit` } target='_blank'>見積書</a>
          </Fragment>
          { props.quote.status === 'end_work' && !props.invoice.id ?
            <a className='c-btnMain-standard c-btn-orange u-ml-30' href={ `/invoices/new?quote_id=${ props.quote.id }` } target='_blank'>請求書作成</a>
            : null
          }
          { props.quote.status === 'invoicing' && props.invoice.id ?
            <Fragment>
              <a className='c-btnMain-standard c-btn-blue u-ml-30' href={ `/invoices/${props.invoice.id}/edit` } target='_blank'>請求書</a>
            </Fragment>
            { props.quote.status === 'end_work' && !props.invoice.id ?
              <div className='u-ml-10'><a className='c-btnMain c-btn-blue' href={ `/invoices/new?quote_id=${ props.quote.id }` } target='_blank'>請求書作成</a></div>
              : null
            }
            { props.quote.status === 'invoicing' && props.invoice.id ?
              <Fragment>
                <a className='c-btnMain-standard c-btn-blue u-ml-30' href={ `/delivery_notes/${ props.quote.id }/edit` } target='_blank'>納品書</a>
              </Fragment>
              : null
            }
            <Fragment>
              { props.invoice.id ?
                <Fragment>
                  { props.delivery_note.pdf_exist ?
                    <div className='u-ml-10'><a className='u-ml-10 c-btnMain' href={ `/delivery_notes/${ props.quote.id }` } target='_blank'>納品書</a></div>
                    : <div className='u-ml-10'><a className='u-ml-10 c-btnMain' href={ `/delivery_notes/${ props.quote.id }/edit` } target='_blank'>納品書</a></div>
                  }
                </Fragment>
                : null
              }
            </Fragment>
            { props.work ?
              <div className='u-ml-10'><a className='c-btnMain' href={ `/works/${ props.work.id }` }>作業書</a></div>
              :
              <Fragment>
                { props.activity ?
                  <Fragment>
                    { props.activity.status === 'lost' || props.activity.status === 'rejection' ?
                      null
                      : <div className='u-ml-10'><a className='c-btnMain c-btn-blue' rel='nofollow' data-method='post' href={ `/quotes/${ props.quote.id }/status?status=working` }>作業書作成</a></div>
                    }
                  </Fragment>
                  : <div className='u-ml-10'><a className='c-btnMain c-btn-blue' rel='nofollow' data-method='post' href={ `/quotes/${ props.quote.id }/status?status=working` }>作業書作成</a></div>
                }
              </Fragment>
            }
            <div className='u-ml-10'><a className='c-btnMain' href={ `/activities?quote_id=${ props.quote.id }` }>活動履歴</a></div>
            { props.task ?
              <div className='u-ml-10'><a className='c-btnMain' href={ `/tasks/${ props.task.id }` }>チャット</a></div>
              : null
            }
            { props.quote.drive_folder_id ?
              <div><a className='c-btnMain' target='_blank' href={ `https://drive.google.com/drive/u/0/folders/${ props.quote.drive_folder_id }` }>ドライブ</a></div>
              : null
            }
          </Fragment>
          : <div><button className='c-btnMain c-btn-blue' onClick={ e => props.onSubmit(e) }>作成する</button></div>
        }
      </div>
    </div>
  );
};

export default ButtonsBelow
