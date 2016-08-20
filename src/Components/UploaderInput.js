import React, { Component } from 'react';

export default class UploaderInput extends Component {
	
	render() {
		return (
			<div className="uploaderInput" onClick={this.props.onClick}>
			</div>
		); 
	}
}

UploaderInput.propTypes = {
	onClick: React.PropTypes.func
};