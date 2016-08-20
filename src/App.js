import React, { Component } from 'react';
import UploaderInput from "./Components/UploaderInput"
import UploaderOutput from "./Components/UploaderOutput"

export default class App extends Component {
  render() {
    return (
    	<div className="root">
      		<div className="title">
      			Excellent Image Compressor
      		</div>

      		<div className="about">
      			<b>Quickly</b> and <b>securely</b> compress <b id="emphasize">GIGABYTES</b> of photos down to bytes or less. <br />
      			With our revolutionary one-way compression algorithms, you get state of the art security while keeping disk space to an absolute minimum. <br />
      			Safely share pictures with your friends, without worying about state sponsored hackers or foreign nationalists.
      			<br />
      			<br />
      			Upload your image in the box below, select how much you want to compress your image, and watch the magic happen.
      			In one click, either download your newly compressed image, or upload to our site to share with friends.
      		</div>

      		<div className="uploaderContainer">
      			<UploaderInput />
      			<UploaderOutput />
      		</div>
     	</div>
    );
  }
}
