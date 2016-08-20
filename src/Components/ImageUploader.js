import React, { Component } from 'react';
import {Image} from 'react-bootstrap';

export default class ImageUploader extends Component {
  constructor() {
    super();
    this.state = {
      image: ""
    };
  }

  handleFileChange = (event) => {
    const file = this.refs._file.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      this.setState({image: reader.result});
    }
    reader.readAsDataURL(file);
  }

  render() {
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
