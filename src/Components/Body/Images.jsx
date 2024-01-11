import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getImages } from "../../Redux/Action/imageAction";
import { Link, useParams } from "react-router-dom";
const mapStateToProps = (state) => {
  return {
    categoryImages: state.imageReducer.categoryImages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getImages: (category) => dispatch(getImages(category)),
  };
};

const Images = (props) => {
  const [FilterdCountry, setFilterdCountry] = useState([]);
  let { category } = useParams();

  useEffect(() => {
    props.getImages(category);
  }, [category, props]);

  useEffect(() => {
    if (props.categoryImages !== null) {
      setFilterdCountry(
        props.categoryImages
      );
    }
  }, [props.categoryImages]);

  const handleSearch = (searchValue) => {
    let value = searchValue.toLowerCase();
    const newCountry =
      props.categoryImages &&
      props.categoryImages.filter((country) => {
        const countryName = country.name.toLowerCase();
        return countryName.startsWith(value);
      });
    setFilterdCountry(newCountry);
  };
  let imageElement =
    FilterdCountry &&
    FilterdCountry.map((image) => {
      return (
        <Link to={`${image.id}`} key={image.id} className="images-container">
          <p className="imageName">Photo: {image.name}</p>
          <img src={image.image} alt={image.name} />
        </Link>
      );
    });
  return (
    <div className="images">
      <Link className="back-button" style={{ top: "-65px" }} to="/">
        <i className="fa-solid fa-arrow-left fa-2x"></i>
      </Link>
      <div className="container w-100 d-flex flex">
        <input
          style={{
            padding: "5px",
            fontSize: "20px",
            margin: "1rem auto",
            border: "1px solid black",
            outline: "none",
            borderRadius: "5px",
            background: "rgba(22, 129, 120, 0.4)",
          }}
          placeholder="Search Image"
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {imageElement}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Images);
