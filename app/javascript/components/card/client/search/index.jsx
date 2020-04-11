import React from 'react';
import Style from './style.sass';

const Search = props => {

  return(
    <div className='u-mt-20 c-search__work-index'>
      <form method='get' action='/card_clients?'>
        <div className='c-flex'>
          <select name='division' className={ Style.Search }>
            <option value=''>部署選択</option>
            { props.divisions.map((division, index) => {
              const key ='division-' + index;
              return(
                <option key={ key } value={ division.id }>{ division.name }</option>
              );
            })}
          </select>
          <input type='submit' name='commit' value='検索' className='u-ml-10 c-btnMain-standard'/>
        </div>
      </form>
    </div>
  );
};

export default Search;