import React, { Fragment } from 'react';

export default class ClientGenerate extends React.Component {

  constructor(props) {

		super(props);
    this.state = {};
	};

  render() {
    return(
      <Fragment>
        <div>ClientGenerate</div>
        <div>actiion: { this.props.action }</div>
      </Fragment>
		);
  };
};