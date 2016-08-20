import React, { Component } from 'react';

export default class UploaderOutput extends Component {

	render() {
		let img = "";
		if (this.props.source !== "#") {
			img = <img src={this.props.source} />
		}
		return (
			<div className="uploaderOutput" onClick={this.props.onClick}>
			<div className="row">
				Upload Output
				</div>
			<div className="row">
				
				{img}
				</div>
			</div>
		);
	}
}

UploaderOutput.propTypes = {
	onClick: React.PropTypes.func
};