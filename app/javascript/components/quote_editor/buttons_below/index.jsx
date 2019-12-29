import React from 'react';

const ButtonsBelow = props => {

	return(
		<div className='c-overlay-submit'>
      { props.quote.id ?
        <div>
          <div className='c-btnMain-standard c-btn-blue u-ml-30' onClick={ e => props.onSubmit(e) }>更新する</div>
          <a className='c-btnMain-standard c-btn-blue u-ml-30' href={ `/quotes/${props.quote.id}/wicked_pdf `} target="_blank">見積書ダウンロード</a>
          { props.quote.status == 'end_work'?
            <a className='c-btnMain-standard c-btn-orange u-ml-30' href={ `/invoices/new?quote_id=${props.quote.id}` }>請求書作成</a>
            : null
          }
          { props.quote.status == 'invoicing'?
            <a className='c-btnMain-standard c-btn-blue u-ml-30' href={ `/invoices/${props.invoice.id}'/edit` } >請求書</a>
            : null
          }
        	{ props.invoice ?
          	<a className='c-btnMain-standard c-btn-blue u-ml-30' href={ `/quotes/${props.quote.id}/delivery_note_pdf` } target="_blank">納品書ダウンロード</a>
        		: null 
          }
        	{ props.work ?
          	<a className='c-btnMain-standard c-btn-blue u-ml-30' href={ `/works/${props.work.id}` }>作業書</a>
          	: <a className='c-btnMain-standard c-btn-orange u-ml-30' rel="nofollow" data-method="post" href={ `/quotes/${props.quote.id}/status?status=working` }>作業書作成</a>
          }
          <a className='c-btnMain-standard c-btn-blue u-ml-30' href={	`/activities?name=${props.quote.id}` } >活動履歴</a>
          { props.task ?
            <a className='c-btnMain-standard c-btn-blue u-ml-30' href={ `/tasks/${props.task.id}` }>チャット</a>
            : null 
          }
        </div>
      	: <div className='c-btnMain-standard c-btn-blue' onClick={ e => props.onSubmit(e) }>作成する</div>
    	}
		</div>
	);
};

export default ButtonsBelow;