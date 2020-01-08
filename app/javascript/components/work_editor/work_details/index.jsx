import React, { Fragment, useState }  from 'react';

// import components
import ReadTable from './read_table';
import EditTable from './edit_table';

// libraries
import Request	from 'superagent';
require('superagent-rails-csrf')(Request);

/**
 *  記事エディター
 *  @version
 */
const AddDetails = props => {

	const [show, setShow] = useState(false);

	const onClosable = e => {

		e.preventDefault();
		setShow(false);
		props.onWorkDetailUpdate();
	};

  const onEditable = e => {

		e.preventDefault();
    setShow(true);
  };

  const onConfirm = (e, passIndex) => {

		e.preventDefault();
    window.confirm('削除します。') ? props.onWorkDetailDestroy(passIndex) : alert('キャンセルしました。');
  };

  /**
   *  表示処理
   *  @version 2019/12/24
   */
  return (
    <Fragment>
      { show ?
        <div className={ 'u-mt-10' }>
          <button className={ 'c-btnMain-standard c-btn-red' } onClick={ onClosable }>作業詳細[編集終了]</button>
        </div>
        :
        <div className={ 'u-mt-10' }>
          <button className={ 'c-btnMain-standard u-mr-10' } onClick={ onEditable }>作業詳細[編集]</button>
          <a className={ 'c-btnMain-primaryB' } href={ '/works/' + props.work_id + '/directions' } target='_blank'>指示書発行[社内用]</a>
        </div>
      }
      { show ?
				<EditTable	work_details={ props.work_details } work_notices={ props.work_notices } setDeOrderContents={ props.setDeOrderContents } 
										setDeDeliverMethod={ props.setDeDeliverMethod } setDeSpecification={ props.setDeSpecification } 
										setDeDeliverAt={ props.setDeDeliverAt } setDeClientName={ props.setDeClientName } setDeNotices={ props.setDeNotices }
										setDeNumberOfCopies={ props.setDeNumberOfCopies } setDeCount={ props.setDeCount } setDeCost={ props.setDeCost }
										onConfirm={ onConfirm } users={ props.users } onWorkDetailCreate={ props.onWorkDetailCreate }
				/>
        :
				<ReadTable work_details={ props.work_details } work_notices={ props.work_notices } setDangerHtml={ props.setDangerHtml }/>
      }
    </Fragment>
  );
};

export default AddDetails;