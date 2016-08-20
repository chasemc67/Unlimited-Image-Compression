import React, { Component } from 'react';

export default class UploaderOutput extends Component {

	render() {
		console.log(this.props);
		return (
			<div className="uploaderOutput" onClick={this.props.onClick}>
				<img src={this.props.source} />
				Upload Output
			</div>
		); 
	}
}

UploaderOutput.propTypes = {
	onClick: React.PropTypes.func
};