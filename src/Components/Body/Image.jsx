import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import date from "date-and-time";
import { getImage, getImages } from "../../Redux/Action/imageAction";
import { Link, useParams } from "react-router-dom";
import { loginPage } from "../../Redux/Action/authAction";
import {
  feedBackDone,
  getFeedback,
  submitFeedback,
} from "../../Redux/Action/feedbackAction";
import { Modal, ModalBody } from "reactstrap";
const mapStateToProps = (state) => {
  return {
    image: state.imageReducer.image,
    categoryImages: state.imageReducer.categoryImages,
    token: state.loginSignupReducer.token,
    feedback: state.feedBackReducer.feedback,
    submitted: state.feedBackReducer.feedBackSubmitted,
    error: state.feedBackReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getImage: (category, id) => dispatch(getImage(category, id)),
    getImages: (category) => dispatch(getImages(category)),
    login: (tf, warn) => dispatch(loginPage(tf, warn)),
    submitFeedback: (imageId, name, comment) =>
      dispatch(submitFeedback(imageId, name, comment)),
    getFeedback: (imageId) => dispatch(getFeedback(imageId)),
    feedBackDone: (tf) => dispatch(feedBackDone(tf)),
  };
};

const Image = (props) => {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  let { category, id } = useParams();
  useEffect(() => {
    props.getImage(category, id);
    props.getImages(category);
    props.getFeedback(category + id);
  }, [category, id, props.submitted]);

  const checkLogin = (e) => {
    if (props.token == null) {
      props.login(true, "You must Login First");
    } else {
      if (e.target.name === "name") {
        setName(e.target.value);
      }
      if (e.target.name === "feedback") {
        setFeedback(e.target.value);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.token == null) {
      props.login(true, "You must Login First");
    } else {
      props.submitFeedback(category + id, name, feedback);
    }
  };

  const submitted = () => {
    props.getFeedback(category + id);
    props.feedBackDone(false);
    setName("");
    setFeedback("");
  };
  return (
    <div>
      <Link className="back-button" to={`/gallery/${category}`}>
        <i className="fa-solid fa-arrow-left fa-2x"></i>
      </Link>
      {props.image && (
        <>
          <div className="full-image">
            {props.image.id !== 1 ? (
              <Link
                className="active-button left-button"
                to={`/gallery/${category}/${parseInt(id) - 1}`}
              >
                <i className="fa-solid fa-angle-left fa-2x"></i>
              </Link>
            ) : (
              <p className="deactive-button left-button">
                <i className="fa-solid fa-angle-left fa-2x"></i>
              </p>
            )}
            <img src={props.image.image} alt={props.image.name} />
            {props.categoryImages.length > props.image.id ? (
              <Link
                className="active-button right-button"
                to={`/gallery/${category}/${parseInt(id) + 1}`}
              >
                <i className="fa-solid fa-angle-right fa-2x"></i>
              </Link>
            ) : (
              <p className="deactive-button right-button">
                <i className="fa-solid fa-angle-right fa-2x"></i>
              </p>
            )}
          </div>
          <h3 className="image-name">Photo: {props.image.name}</h3>
          {props.image.area && (
            <div className="more-details container">
              <h3>More Deatils</h3>
              <div className="more-details">
                <p>Area: {props.image.area} Square Kilo Meter</p>
                <p>Capital: {props.image.capital[0]}</p>
                <p>Population: {props.image.population}</p>
              </div>
            </div>
          )}
          <h3
            style={{
              textAlign: "center",
              background: "rgba(0, 0,0, 0.6)",
              padding: "10px",
              borderTop: "2px solid black",
              color: "white",
            }}
          >
            FeedBack
          </h3>
          <div className="feedback">
            <form
              style={{
                width: "350px",
                margin: "40px 20px",
                boxShadow: "0 0 5px black",
                padding: "15px",
                flex: "1",
              }}
              onSubmit={handleSubmit}
            >
              <h1>Write Feedback</h1>

              <input
                className="form-control"
                required
                value={name}
                name="name"
                type="text"
                onChange={(e) => checkLogin(e)}
                placeholder="Your Name"
              />
              <br />
              <textarea
                className="form-control"
                required
                value={feedback}
                name="feedback"
                onChange={(e) => checkLogin(e)}
                placeholder="Your Feedback"
              ></textarea>
              <br />
              <button className="form-control btn btn-primary" type="submit">
                Submit
              </button>
            </form>
            <div className="show-feedback p-4" style={{ flex: "2" }}>
              {props.feedback.length > 0 ? (
                props.feedback.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 mt-3"
                    style={{ boxShadow: "0 0 5px black", borderRadius: "10px" }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <h5>Name: {item.name}</h5>
                      <p style={{ margin: 0 }}>
                        Date:{" "}
                        {date.format(
                          new Date(item.date),
                          "ddd, MMM DD YYYY, hh:mm A"
                        )}
                      </p>
                    </div>
                    <hr style={{ color: "red" }} />
                    <p style={{ textAlign: "justify", marginTop: "1rem" }}>
                      <span style={{fontWeight: 'bolder'}}>Comment:</span> {item.comment}
                    </p>
                  </div>
                ))
              ) : (
                <h1 style={{ textAlign: "center" }}>No Feedback To Show</h1>
              )}
            </div>
          </div>
        </>
      )}
      <Modal isOpen={props.submitted || props.error.length > 0}>
        {props.submitted ? (
          <>
            <ModalBody>
              <h2>FeedBack Submitted Successfully!</h2>
            </ModalBody>
            <button className="btn btn-primary" onClick={submitted}>
              Close
            </button>
          </>
        ) : (
          <>
            <ModalBody>
              <h2>Unable To Submit FeedBack</h2>
            </ModalBody>
            <button className="btn btn-danger" onClick={submitted}>
              Close
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Image);
