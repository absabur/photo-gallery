import React, { Component } from "react";
import { connect } from "react-redux";
import ImageCategory from "./Body/ImageCategory";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Images from "./Body/Images";
import Image from "./Body/Image";
import Header from "./Header/Header";
import LoadingPage from "./loading/LoadingPage";
import { authCheck, loginPage } from "../Redux/Action/authAction";
import { Alert, Modal, ModalHeader } from "reactstrap";
import LoginSignup from "./Body/LoginSignup";

const mapStateToProps = (state) => {
  return {
    images: state.imageReducer.images,
    categoryImages: state.imageReducer.categoryImages,
    loginPage: state.loginSignupReducer.loginPage,
    warnMessage: state.loginSignupReducer.warnMessage,
    isLoading: state.loginSignupReducer.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    authCheck: () => dispatch(authCheck()),
    loginPageToggle: (tf) => dispatch(loginPage(tf)),
  };
};
export class Main extends Component {
  state = {
    loaded: false,
  };
  componentDidMount = () => {
    this.props.authCheck();
    this.setState({
      loaded: true,
    });
  };
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          {this.state.loaded && (
            <Routes>
              <Route path="*" element={<Navigate replace to="/" />} />
              <Route
                path="/"
                element={<Navigate replace to="/gallery" />}
              />
              <Route
                path="/gallery"
                element={<ImageCategory images={this.props.images} />}
              />
              <Route path="/gallery/:category" element={<Images />} />
              <Route path="/gallery/:category/:id" element={<Image />} />
            </Routes>
          )}

          <Modal
            isOpen={this.props.loginPage}
            style={{ height: "100vh", width: "100vw" }}
          >
            <ModalHeader
              style={{ background: "red", color: "white", cursor: "pointer" }}
              onClick={() => this.props.loginPageToggle(false)}
            >
              Close
            </ModalHeader>
            {this.props.warnMessage !== null && (
              <Alert style={{margin: "0"}} color="warning">{this.props.warnMessage}</Alert>
            )}
            {this.props.isLoading ? <LoadingPage /> :<LoginSignup />}
            
          </Modal>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
