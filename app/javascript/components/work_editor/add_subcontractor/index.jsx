import React, { useState }  from 'react'

// import components
import EditTable    from './edit_table';
import ReadTable		from './read_table';

const AddSubcontractor = props => {

  const init = {
    show: false,
    subcontractor_id: ''
  };

  const [state, setState] = useState(init);

  const onClosable = e => {

    e.preventDefault();
    if(state.subcontractor_id) {

      window.confirm('作業外注詳細を更新してから編集を終了してください。');
      return false;
    };

    setState({ ...state, show: !state.show });
  };

  const onEditable = e => {

    e.preventDefault();

    if(state.subcontractor_id) {

      window.confirm('編集をしている他の作業外注詳細を終了してください。');
      return false;
    };

    setState({ ...state, show: !state.show });
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
      { state.show ?
        <EditTable  work_subcontractors_iterate={ props.work_subcontractors_iterate } users={ props.users } prefectures={ props.prefectures }
                    onClosable={ onClosable } state={ state } setState={ setState } applyClient={ props.applyClient } setDangerHtml={ props.setDangerHtml }
                    workSubcontractorDestroy={ props.workSubcontractorDestroy } workSubcontractorDetailDestroy={ props.workSubcontractorDetailDestroy }
                    setOrderContents={ props.setOrderContents } setDeliverMethod={ props.setDeliverMethod } setSpecification={ props.setSpecification }
                    setCount={ props.setCount } setNumberOfCopies={ props.setNumberOfCopies } setActualCost={ props.setActualCost }
                    workSubcontractorDetailCreate={ props.workSubcontractorDetailCreate } sortingAction={ sortingAction } workSubcontractorUpdate={ props.workSubcontractorUpdate }
                    setDeliveryDestination={ props.setDeliveryDestination } setNotices={ props.setNotices } workSubcontractorCreate={ props.workSubcontractorCreate }/>
        :
        <ReadTable	onEditable={ onEditable } work_id={ props.work_id } setDangerHtml={ props.setDangerHtml } work_subcontractors_iterate={ props.work_subcontractors_iterate }/>
      }
    </div>
  );
};

export default AddSubcontractor;
