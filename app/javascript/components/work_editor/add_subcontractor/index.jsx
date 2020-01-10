import React, { useState }  from 'react'

// import components
import EditTable    from './edit_table';
import ReadTable		from './read_table';

const AddSubcontractor = props => {

	const [show, setShow] = useState(false);

	const onClosable = e => {

		e.preventDefault();
		setShow(false);
		props.workSubcontractorDetailUpdate();
	};

  const onEditable = e => {

		e.preventDefault();
    setShow(true);
  };

	/**
	 * 子componentに渡した処理を振り分ける
	 * @version 2020/01/09
	 * 
	 */
	const sortingAction = prop => {

		switch(prop.action) {
      case 'order_date':
				props.setOrderDate(prop);
				break;
			case 'delivery_date':
				props.setDeliveryDate(prop);
				break;
			default:
				break;
		};
	};

  /**
   *　表示処理
   */
  return (
    <div>
      { show ?
				<EditTable  work_subcontractors_iterate={ props.work_subcontractors_iterate } users={ props.users } prefectures={ props.prefectures }
										onClosable={ onClosable } applyClient={ props.applyClient }
										workSubcontractorDestroy={ props.workSubcontractorDestroy } workSubcontractorDetailDestroy={ props.workSubcontractorDetailDestroy }
										setOrderContents={ props.setOrderContents } setDeliverMethod={ props.setDeliverMethod } setSpecification={ props.setSpecification }
										setCount={ props.setCount } setNumberOfCopies={ props.setNumberOfCopies } setActualCost={ props.setActualCost }
										workSubcontractorDetailCreate={ props.workSubcontractorDetailCreate } sortingAction={ sortingAction }
										setDeliveryDestination={ props.setDeliveryDestination } setNotices={ props.setNotices } workSubcontractorCreate={ props.workSubcontractorCreate }
				/>
        :
				<ReadTable	onEditable={ onEditable } work_id={ props.work_id }
									  setDangerHtml={ props.setDangerHtml } work_subcontractors_iterate={ props.work_subcontractors_iterate }
				/>
      }
    </div>
  );
};

export default AddSubcontractor;
