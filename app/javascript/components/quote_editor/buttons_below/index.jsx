import React, { Fragment } from 'react';

const ButtonsBelow = props => {

  return(
    <div className='c-overlay-submit'>
      <div className='c-flex c-flex__center'>
        { props.quote.id ?
          <Fragment>
            { !props.quote.lock ?
              <button className='c-btnMain c-btn-blue' onClick={ props.onSubmit }>更新する</button>
              : null
            }
            <Fragment>
              { props.quotation.pdf_exist ?
                <a className='u-ml-10 c-btnMain' href={ `/quotations/${ props.quote.id }` } target='_blank'>見積書</a>
                : <a className='u-ml-10 c-btnMain' href={ `/quotations/${ props.quote.id }/edit` } target='_blank'>見積書</a>
              }
            </Fragment>
            { props.quote.status === 'end_work' && !props.invoice.id ?
              <a className='u-ml-10 c-btnMain c-btn-blue' href={ `/invoices/new?quote_id=${ props.quote.id }` } target='_blank'>請求書作成</a>
              : null
            }
            { props.quote.status === 'invoicing' && props.invoice.id ?
              <Fragment>
                { props.invoice.pdf_exist ?
                  <a className='u-ml-10 c-btnMain' href={ `/invoices/${props.invoice.id}` } target='_blank'>請求書</a>
                  : <a className='u-ml-10 c-btnMain' href={ `/invoices/${props.invoice.id}/edit` } target='_blank'>請求書</a>
                }
              </Fragment>
              : null
            }
            <Fragment>
              { props.invoice.id ?
                <Fragment>
                  { props.delivery_note.pdf_exist ?
                    <a className='u-ml-10 c-btnMain' href={ `/delivery_notes/${ props.quote.id }` } target='_blank'>納品書</a>
                    : <a className='u-ml-10 c-btnMain' href={ `/delivery_notes/${ props.quote.id }/edit` } target='_blank'>納品書</a>
                  }
                </Fragment>
                : null
              }
            </Fragment>
            { props.work ?
              <a className='u-ml-10 c-btnMain' href={ `/works/${ props.work.id }` }>作業書</a>
              :
              <Fragment>
                { props.activity ?
                  <Fragment>
                    { props.activity.status === 'lost' || props.activity.status === 'rejection' ?
                      null
                      : <a className='u-ml-10 c-btnMain c-btn-blue' rel='nofollow' data-method='post' href={ `/quotes/${ props.quote.id }/status?status=working` }>作業書作成</a>
                    }
                  </Fragment>
                  : <a className='u-ml-10 c-btnMain c-btn-blue' rel='nofollow' data-method='post' href={ `/quotes/${ props.quote.id }/status?status=working` }>作業書作成</a>
                }
              </Fragment>
            }
            <a className='u-ml-10 c-btnMain' href={ `/activities?quote_id=${ props.quote.id }` }>活動履歴</a>
            { props.task ?
              <a className='u-ml-10 c-btnMain' href={ `/tasks/${ props.task.id }` }>チャット</a>
              : null
            }
            { props.quote.drive_folder_id ?
              <a className='u-ml-10 c-btnMain' target='_blank' href={ `https://drive.google.com/drive/u/0/folders/${ props.quote.drive_folder_id }` }>ドライブ</a>
              : null
            }
          </Fragment>
          : <button className='c-btnMain c-btn-blue' onClick={ e => props.onSubmit(e) }>作成する</button>
        }
      </div>
    </div>
  );
};

export default ButtonsBelow
