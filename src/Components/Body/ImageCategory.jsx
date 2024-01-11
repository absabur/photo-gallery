import React, { Component } from "react";
import './body.css'
import { Link } from "react-router-dom";

export class ImageCategory extends Component {
  render() {
    let imageCategory = [];
    for (let key in this.props.images) {
      imageCategory.push(key);
    }
    let category = imageCategory.map((image, index) => {
      return (
        <Link to={`/gallery/${imageCategory[index]}`} className="image-category" key={image}>
          <div className="shadow"></div>
          <img src={this.props.images[image][0].image} alt={imageCategory[index]} />
          <div className="cover">
            <p>{imageCategory[index].toUpperCase()}</p>
          </div>
        </Link>
      );
    });
    return (
      <div>
        <div className="categories">{category}</div>
      </div>
    );
  }
}

export default ImageCategory;
