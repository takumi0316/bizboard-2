import React, { Fragment } from 'react';

const Information = props => {

	return(
		<Fragment>
      <div className='c-form-label u-mt-10'>
        <label>名刺情報</label>
      </div>
      { props.card ?
        <div className='c-attention'>
          <div>テンプレート名: { props.card.name || 'テンプレート名なし' }</div>
        </div>
				:
				<div className='c-attention'>
          <div>名刺はまだ選択されていません。</div>
				</div>
      }
		</Fragment>
	);
};

export default Information;