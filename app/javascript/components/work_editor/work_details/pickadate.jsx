import React from 'react';
import Style from '../style.sass';

// import libraries
import Pickadate from './pickadate/builds/react-dom';

const PickaDate = props => {

	return(
		<div className={ Style.Pickadate }>
			<div className={ Style.Pickadate__inner }>
				<div className={ Style.Pickadate__closeIcon } onClick={ () => props.setState({ ...props.state, show: false }) }>×</div>
				<Pickadate.DatePicker
					initialTranslation={ 'ja_JP' }
					onChangeValue={({ value }) => {
						props.setDeDeliverAt(props.state.index, value);
					}}
				/>
			</div>
		</div>
	);
};

export default PickaDate;