import React, { Component } from 'react';

export default class Gallery extends Component {
	
	render() {
        const images = [];
        this.props.images.forEach((image) => {
            const src =  "data:image/png;base64," + image;
            images.push(<img src={src}/>)
        });

		return (
			<div className="gallery">
                <h2>{this.props.images.lenght()} images compressed</h2>
                {images}
			</div>
		); 
	}
}