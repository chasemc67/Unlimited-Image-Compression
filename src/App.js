import React, { Component } from 'react';
import UploaderInput from "./Components/UploaderInput"
import UploaderOutput from "./Components/UploaderOutput"
import ImageUploader from "./Components/ImageUploader"

export default class App extends Component {

	constructor(props) {
		super(props);
		this.imageData = null;
		this.imageWidth = null;
		this.imageHeight = null;

		this.handleInputClick = this.handleInputClick.bind(this);
		this.handleOutputClick = this.handleOutputClick.bind(this);
		this.state = {
			outputSource: "#"
		}
	}

	getSinglePixelImage() {
		return this.getAveragePixel(0, 0, this.imageWidth, this.imageHeight);	
		
	}

	handleInputClick(file) {
		// console.log("input clicked");
		// console.log("file",  file);
		const image = new Image();
		image.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = image.width;
			canvas.height = image.height;

			this.imageWidth = canvas.width;
			this.imageHeight = canvas.height;

			const context = canvas.getContext('2d');
			context.drawImage(image, 0, 0);
			this.imageData = context.getImageData(0, 0, canvas.width, canvas.height);
			
			const newCanvas = document.createElement('canvas');
			const newContext = newCanvas.getContext('2d');
			this.getPixels(3, 3, this.imageData.width, this.imageData.height);
			// this.finishedInitialImageLoad(); // Once this fires, this.imageData should hold the new imageData
			newContext.putImageData(this.imageData, 0, 0);
			this.setState({outputSource: newCanvas.toDataURL("image/png")});
			this.postImageToServer(this.state.outputSource);
		};
		image.src = file;
		document.body.appendChild(image);
	}

	postImageToServer(base64Image) {
		const payload = {
			image: base64Image
		};
		return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:9000/api/images", true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.responseType = "json";
            xhr.onload = function() {
                if (xhr.status === 200) {
                    typeof xhr.response === "object" ? resolve(xhr.response) : resolve(JSON.parse(xhr.response));
                } else if (xhr.status === 400) {
                    reject(xhr.response.message);
                } else {
                    reject(`POST request failed with status = ${xhr.status} - ${xhr.statusText}`);
                }
            };
            xhr.onerror = function() {
                reject(`POST request failed with status = ${xhr.status} - ${xhr.statusText}`);
            };
            xhr.send(JSON.stringify(payload));
        });

	}

	getPixels(numXBlocks, numYBlocks, xsize, ysize) {
		const blockWidth = Math.ceil(xsize / numXBlocks);
		const blockHeight = Math.ceil(ysize / numYBlocks);
		const colorArray = [];
		for (let y = 0; y < numYBlocks; y++) {
			for (let x = 0; x < numXBlocks; x++) {
				const startX = x * blockWidth;
				const startY = y * blockHeight;
				const endX = Math.min((x + 1) * blockWidth, xsize);
				const endY = Math.min((y + 1) * blockHeight, ysize);
				const result = this.getAveragePixel(startX, startY, endX, endY);
				this.writeValueToImageSpan(startX, startY, endX, endY, result.red, result.green, result.blue, result.alpha);
			}
		}
		// return new ImageData(Uint8ClampedArray.from(colorArray), numXBlocks, numYBlocks);
	}

	getPixelFromImage(x, y, imageData){
		const index = (y * imageData.width + x) * 4;
		const pixel = {
			red: imageData.data[index],
			green: imageData.data[index + 1],
			blue: imageData.data[index + 2],
			alpha: imageData.data[index + 3]
		};

		// console.log(`Pixel at: ${x},${y}: ${JSON.stringify(pixel)}`);
		return pixel
	}

	// Write an individual rgba pixel to an x,y coord in imageData
	writePixelToImageImage(x, y, imageData, r, g, b, a){
		const index = (y * imageData.width + x) * 4;
		imageData.data[index] = r;
		imageData.data[index + 1] = g;
 		imageData.data[index + 2] = b;
 		imageData.data[index + 3] = a;
	}

	// Write an rgba pixel to some span in imageData
	writeValueToImageSpan(start_x, start_y, end_x, end_y, r, g, b, a) {
		for (var m = start_y; m < end_y; m++){
			for (var n = start_x; n < end_x; n++) {
				this.writePixelToImageImage(n, m, this.imageData, r, g, b, a);
			}
		}
	}

	finishedInitialImageLoad() {
		var rgbImage = this.getSinglePixelImage();
		this.convertSingleRGBToImage(rgbImage);
	}

	convertSingleRGBToImage(image) {
		console.log(`Converting Image ${JSON.stringify(image)}`);
		this.writeValueToImageSpan(0, 0, this.imageWidth, this.imageHeight, image.red, image.green, image.blue, image.alpha);

		
		// Ok, so now this.imageData is all our new pixel. so i need to write that to a canvas, so i can get it in base64.

	}

	getAveragePixel(start_x, start_y, end_x, end_y) {
		let pixelCount = 0;
		let averagePixel = {
			red: 0,
			green: 0,
			blue: 0,
			alpha: 0
		};	

		for (var i = start_y; i < end_y; i++){
			for (var j = start_x; j < end_x; j++) {
				pixelCount += 1;
				var pixel = this.getPixelFromImage(j, i, this.imageData);
				averagePixel.red += pixel.red;
				averagePixel.green += pixel.green;
				averagePixel.blue += pixel.blue;
				averagePixel.alpha += pixel.alpha;
			}
		}

		averagePixel.red = averagePixel.red / pixelCount;
		averagePixel.green = averagePixel.green / pixelCount;
		averagePixel.blue = averagePixel.blue / pixelCount;
		averagePixel.alpha = averagePixel.alpha / pixelCount;

		return averagePixel;
	}

	handleOutputClick() {
		// console.log("Output clicked");
	}

  	render() {
	    return (
	    	<div className="root">
	      		<div className="title">
	      			<h1>Excellent Image Compressor</h1>
					<p>compress photos down to 1 bit</p>
	      		</div>

				<div className="container">
					<p className="about">
						<b>Quickly</b> and <b>securely</b> compress <b id="emphasize">GIGABYTES</b> of photos down to bytes or less. <br />
						With our revolutionary one-way compression technology, you get state of the art security while using minimal disk space. <br />
						Safely share pictures with your friends, without worying about state sponsored hackers or foreign nationalists.
						<br />
						<br />
						Upload your image in the box below, select how much you want to compress your image, and watch the magic happen.
						In one click, either download your newly compressed image, or upload to our site to share with friends.
					</p>

					<div className="uploaderContainer row">
						<div className="col-md-6">
							<ImageUploader onClick={this.handleInputClick}/>
						</div>
						<div className="col-md-6">				  
							<UploaderOutput source={this.state.outputSource} onClick={this.handleOutputClick} />
						</div>
					</div>
				</div>
	     	</div>
	    );
	}
}
