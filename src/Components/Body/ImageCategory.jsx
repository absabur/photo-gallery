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
        <h1 style={{width: "100%", textAlign: "center", padding: "10px", borderBottom: "2px solid black"}}>Albums</h1>
        <div className="categories">{category}</div>
      </div>
    );
  }
}

export default ImageCategory;
