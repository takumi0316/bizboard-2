import React, { Fragment } from 'react';

const ButtonsBelow = props => {

  return(
    <div className='c-overlay-submit'>
      { props.quote.id ?
        <div>
          { !props.quote.lock ?
            <div className='c-btnMain-standard c-btn-blue u-ml-30' onClick={ e => props.onSubmit(e) }>更新する</div>
            : null
          }
          <Fragment>
            { props.quotation.pdf_exist ?
              <a className='c-btnMain-standard c-btn-blue u-ml-30' href={ `/quotations/${ props.quote.id }` } target='_blank'>見積書</a>
              : <a className='c-btnMain-standard c-btn-blue u-ml-30' href={ `/quotations/${ props.quote.id }/edit` } target='_blank'>見積書</a>
            }
          </Fragment>
          { props.quote.status === 'end_work' && !props.invoice.id ?
            <a className='c-btnMain-standard c-btn-orange u-ml-30' href={ `/invoices/new?quote_id=${ props.quote.id }` } target='_blank'>請求書作成</a>
            : null
          }
          { props.quote.status === 'invoicing' && props.invoice.id ?
            <Fragment>
              { props.invoice.pdf_exist ?
                <a className='c-btnMain-standard c-btn-blue u-ml-30' href={ `/invoices/${props.invoice.id}` } target='_blank'>請求書</a>
                : <a className='c-btnMain-standard c-btn-blue u-ml-30' href={ `/invoices/${props.invoice.id}/edit` } target='_blank'>請求書</a>
              }
            </Fragment>
            : null
          }
          <Fragment>
            { props.invoice.id ?
              <Fragment>
                { props.delivery_note.pdf_exist ?
                  <a className='c-btnMain-standard c-btn-blue u-ml-30' href={ `/delivery_notes/${ props.quote.id }` } target='_blank'>納品書</a>
                  : <a className='c-btnMain-standard c-btn-blue u-ml-30' href={ `/delivery_notes/${ props.quote.id }/edit` } target='_blank'>納品書</a>
                }
              </Fragment>
              : null
            }
          </Fragment>
          { props.work ?
            <a className='c-btnMain-standard c-btn-blue u-ml-30' href={ `/works/${ props.work.id }` }>作業書</a>
            :
            <Fragment>
              { props.activity ?
                <Fragment>
                  { props.activity.status === 'lost' || props.activity.status === 'rejection' ?
                    null
                    : <a className='c-btnMain-standard c-btn-orange u-ml-30' rel="nofollow" data-method="post" href={ `/quotes/${ props.quote.id }/status?status=working` }>作業書作成</a>
                  }
                </Fragment>
                : <a className='c-btnMain-standard c-btn-orange u-ml-30' rel="nofollow" data-method="post" href={ `/quotes/${ props.quote.id }/status?status=working` }>作業書作成</a>
              }
            </Fragment>
          }
          <a className='c-btnMain-standard c-btn-blue u-ml-30' href={ `/activities?quote_id=${ props.quote.id }` }>活動履歴</a>
          { props.task ?
            <a className='c-btnMain-standard c-btn-blue u-ml-30' href={ `/tasks/${ props.task.id }` }>チャット</a>
            : null
          }
          { props.quote.drive_folder_id ?
            <a className='c-btnMain-standard c-btn-blue u-ml-30' target='_blank' href={ `https://drive.google.com/drive/u/0/folders/${ props.quote.drive_folder_id }` }>ドライブ</a>
            : null
          }
        </div>
        : <div className='c-btnMain-standard c-btn-blue' onClick={ e => props.onSubmit(e) }>作成する</div>
      }
    </div>
  );
};

export default ButtonsBelow
