import React from 'react'

const NoImage = props => {
  
  return(
    <svg onClick={ props.onSelect ? props.onSelect : null } style={ props.style }>
      <use id={ props.id } data-set='no_image' xlinkHref='#application-noimage'></use>
    </svg>
  )
}

export default NoImage