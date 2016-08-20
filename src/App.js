import React, { Component } from 'react';
import UploaderInput from "./Components/UploaderInput"
import UploaderOutput from "./Components/UploaderOutput"
import ImageUploader from "./Components/ImageUploader"

export default class App extends Component {

	constructor(props) {
		super(props);
		this.handleInputClick = this.handleInputClick.bind(this);
		this.handleOutputClick = this.handleOutputClick.bind(this);
	}

	handleInputClick(file) {
		console.log("input clicked");
		console.log("file",  file);
		const image = new Image();
		image.onload = function () {
			const canvas = document.createElement('canvas');
			canvas.width = image.width;
			canvas.height = image.height;

			const context = canvas.getContext('2d');
			context.drawImage(image, 0, 0);

			const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
			console.log("called", imageData);
			// Now you can access pixel data from imageData.data.
			// It's a one-dimensional array of RGBA values.
			// Here's an example of how to get a pixel's color at (x,y)
			const index = (y * imageData.width + x) * 4;
			const red = imageData.data[index];
			const green = imageData.data[index + 1];
			const blue = imageData.data[index + 2];
			const alpha = imageData.data[index + 3];
			console.log(red, green, blue, alpha);
		};
		image.src = file;
		document.body.appendChild(image);
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
	      			<ImageUploader onClick={this.handleInputClick}/>
	      			<UploaderOutput onClick={this.handleOutputClick} />
	      		</div>
	     	</div>
	    );
	}
}
