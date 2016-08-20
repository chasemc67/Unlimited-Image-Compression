import React, { Component } from 'react';

export default class UploaderOutput extends Component {

	render() {
		console.log(this.props);
		return (
			<div className="uploaderOutput" onClick={this.props.onClick}>
				Upload Output
				<img src={this.props.source} />
			</div>
		); 
	}
}

UploaderOutput.propTypes = {
	onClick: React.PropTypes.func
};