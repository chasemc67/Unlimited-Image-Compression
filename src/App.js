import React, { Component } from 'react';
import UploaderInput from "./Components/UploaderInput"
import UploaderOutput from "./Components/UploaderOutput"
import ImageUploader from "./ImageUploader"

export default class App extends Component {

	constructor(props) {
		super(props);
		this.handleInputClick = this.handleInputClick.bind(this);
		this.handleOutputClick = this.handleOutputClick.bind(this);
	}

	handleInputClick() {
		console.log("input clicked");
	}

	handleOutputClick() {
		console.log("Output clicked");
	}

  	render() {
	    return (
	    	<div className="root">
	      		<div className="title">
	      			Excellent Image Compressor
	      		</div>

	      		<div className="about">
	      			<b>Quickly</b> and <b>securely</b> compress <b id="emphasize">GIGABYTES</b> of photos down to bytes or less. <br />
	      			With our revolutionary one-way compression technology, you get state of the art security while using minimal disk space. <br />
	      			Safely share pictures with your friends, without worying about state sponsored hackers or foreign nationalists.
	      			<br />
	      			<br />
	      			Upload your image in the box below, select how much you want to compress your image, and watch the magic happen.
	      			In one click, either download your newly compressed image, or upload to our site to share with friends.
	      		</div>

	      		<div className="uploaderContainer">
	      			<UploaderInput onClick={this.handleInputClick} />
	      			<UploaderOutput onClick={this.handleOutputClick} />
	      		</div>
						<ImageUploader/>
	     	</div>
	    );
	}
}
