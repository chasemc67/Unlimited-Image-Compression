import React, { Component } from 'react';
import {Image} from 'react-bootstrap';

export default class ImageUploader extends Component {
  constructor() {
    super();
    this.outputImagePixel = this.outputImagePixel.bind(this);
    this.state = {
      image: ""
    };
  }

  outputImagePixel() {
    var image = new Image();
    image.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);

      var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      console.log(`Image data: ${imageData}`);

      // Now you can access pixel data from imageData.data.
      // It's a one-dimensional array of RGBA values.
      // Here's an example of how to get a pixel's color at (x,y)
      var index = (y*imageData.width + x) * 4;
      var red = imageData.data[index];
      var green = imageData.data[index + 1];
      var blue = imageData.data[index + 2];
      var alpha = imageData.data[index + 3];
    };

    image.src = this.state.image;
  }

  handleFileChange = (event) => {
    const file = this.refs._file.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(`${reader.result}`);
      this.setState({image: reader.result});
    }
    reader.readAsDataURL(file);
  }

  render() {
    if (this.state.image) {
      this.outputImagePixel();
    }

    return (
    	<div className="root">
        <form encType="multipart/form-data" action="/upload/image" method="post">
      		  <input type="file" ref="_file" onChange={this.handleFileChange}/>
          </form>
          <Image src={this.state.image}/>
      	</div>
    );
  }
}
