import React, { Component } from 'react';

export default class UploaderOutput extends Component {

	render() {
		return (
			<div className="uploaderOutput" onClick={this.props.onClick}>
				Upload Output
			</div>
		); 
	}
}

UploaderOutput.propTypes = {
	onClick: React.PropTypes.func
};