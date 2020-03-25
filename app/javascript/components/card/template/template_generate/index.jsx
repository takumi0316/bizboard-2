import React, { Fragment } from 'react';

export default class TemplateGenerate extends React.Component {

  constructor(props) {

		super(props);
    this.state = {};
	};

  render() {
    return(
      <Fragment>
        <div>TemplateGenerate</div>
        <div>actiion: { this.props.action }</div>
      </Fragment>
		);
  };
};