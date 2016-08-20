import React, {Component} from 'react';

export default class ImageUploader extends Component {
  constructor() {
    super();
    this.state = {
      image: ""
    };
  }

  handleFileChange = () => {
    const file = this.refs._file.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({image: reader.result});
      this.props.onClick(this.state.image);
    }
    reader.readAsDataURL(file);
  }

  handleClick = () => {
    this.refs._file.click();
  }

  render() {
    return (
    	<div>
          <div className="uploaderInput" onClick={this.handleClick}>
            Upload Image
            <img src={this.state.image}/>
          </div>
      		<input className="hidden-input" type="file" ref="_file" onChange={this.handleFileChange}/>
      	</div>
    );
  }
}

ImageUploader.propTypes = {
	onClick: React.PropTypes.func
};