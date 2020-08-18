import React, { Fragment, useState, useEffect } from 'react'

import Button from './button';

const Index = props => {

	const init = {
		layouts: props.layouts,
	};

	const [state, setState] = useState(init);

	useEffect(() => {
	}, [props]);

	return(
		<Fragment>
      <Button head={ props.head } card_template_id={ props.card_template_id }/>
			{ state.layouts.map((layout, index) => {
				const key = `layout-${ index }`;
				return(
          <div { ...{key} } style={{ width: '100px', height: '100px' }}>
						<img src={ layout.url }/>
					</div>
				);
			})}
		</Fragment>
	);
};

export default Index;