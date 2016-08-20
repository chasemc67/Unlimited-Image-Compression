import React, { Component } from 'react';

export default class UploaderOutput extends Component {

	render() {
		let img = "";
		if (this.props.source !== "#") {
			img = <img src={this.props.source} />
		}
		return (
			<div className="uploaderOutput" onClick={this.props.onClick}>
				Upload Output
				{img}
			</div>
		); 
	}
}

UploaderOutput.propTypes = {
	onClick: React.PropTypes.func
};